// ─────────────────────────────────────────────────────────────────────
// Menu-bar clock
// ─────────────────────────────────────────────────────────────────────
function startClock() {
	const el = $('menuClock');
	let last = '';
	function tick() {
		const now = new Date();
		const time = now.toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' });
		const d = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
		const s = time + ' · ' + d;
		if (s !== last) { el.textContent = s; last = s; }
	}
	tick();
	setInterval(tick, 1000);
	onLanguageChange(tick);
}

// ─────────────────────────────────────────────────────────────────────
// Menu-bar status: network, battery, public IP
// ─────────────────────────────────────────────────────────────────────
function startStatus() {
	const wifi = $('mbWifi');
	function updateNet() {
		const online = navigator.onLine;
		wifi.classList.toggle('offline', !online);
		const c = navigator.connection;
		wifi.title = online
			? t('status.online') + (c && c.effectiveType ? ' · ' + c.effectiveType.toUpperCase() : '')
			: t('status.offline');
	}
	updateNet();
	onLanguageChange(updateNet);
	window.addEventListener('online', updateNet);
	window.addEventListener('offline', updateNet);
	if (navigator.connection) navigator.connection.addEventListener('change', updateNet);

	const bat  = $('mbBattery');
	const fill = $('mbBatteryFill');
	const bolt = $('mbBatteryBolt');
	const FILL_MAX = 18;
	if (navigator.getBattery) {
		navigator.getBattery().then(b => {
			function updateBat() {
				const lvl = Math.round(b.level * 100);
				fill.setAttribute('width', Math.max(1, b.level * FILL_MAX).toFixed(1));
				fill.setAttribute('fill', (lvl <= 15 && !b.charging) ? '#ff5b5b' : 'currentColor');
				bolt.style.display = b.charging ? '' : 'none';
				bat.title = t('status.batteryLevel', { level: lvl }) + (b.charging ? ' · ' + t('status.charging') : '');
			}
			updateBat();
			onLanguageChange(updateBat);
			b.addEventListener('levelchange', updateBat);
			b.addEventListener('chargingchange', updateBat);
		}).catch(() => { bat.dataset.i18nTitle = 'status.batteryUnavailable'; bat.title = t('status.batteryUnavailable'); });
	} else {
		bat.dataset.i18nTitle = 'status.batteryUnavailable'; bat.title = t('status.batteryUnavailable');
	}

	setupIPChip();
	showIPInfo(settings.showIP);
}

// ─────────────────────────────────────────────────────────────────────
// Menu-bar location and IP — everything that needs the user's IP. Settings
// can hide both; while hidden, ipwho.is, api.ipify.org and flagcdn.com are
// never asked, and turning them back on asks then.
// ─────────────────────────────────────────────────────────────────────
let currentIP = '';
let ipLooked  = false;   // the lookups run once, the first time they're shown

// The IP chip copies the address on click.
function setupIPChip() {
	const ipEl = $('mbIP');
	ipEl.addEventListener('click', () => {
		if (!currentIP || !navigator.clipboard) return;
		navigator.clipboard.writeText(currentIP).then(() => {
			ipEl.textContent = t('status.copied');
			ipEl.classList.add('copied');
			clearTimeout(ipEl._copyT);
			ipEl._copyT = setTimeout(() => {
				ipEl.textContent = currentIP;
				ipEl.classList.remove('copied');
			}, 1000);
		}).catch(() => {});
	});
}

function showIPInfo(on) {
	const locEl = $('mbLoc');
	const ipEl  = $('mbIP');
	locEl.hidden = ipEl.hidden = !on;
	if (!on || ipLooked) return;
	ipLooked = true;

	// ipwho.is is dual-stack, so on an IPv6 network it sees (and returns) the
	// IPv6 address. api.ipify.org has no AAAA record — reaching it forces IPv4 —
	// so it supplies the IP chip, and ipwho.is supplies location. Both run in
	// parallel; on an IPv6-only network ipify fails and ipwho.is's IP is used.
	const ipv4 = fetch('https://api.ipify.org?format=json')
		.then(r => r.json())
		.then(d => d && d.ip)
		.catch(() => null);

	const geo = fetch('https://ipwho.is/')
		.then(r => r.json())
		.then(d => {
			if (!d || d.success === false) throw new Error('lookup failed');
			const code = (d.country_code || '').toLowerCase();
			const city = d.city || d.region || d.country || '';
			locEl.innerHTML = '';
			if (code) {
				const img = document.createElement('img');
				img.src    = 'https://flagcdn.com/40x30/' + code + '.png';
				img.srcset = 'https://flagcdn.com/80x60/' + code + '.png 2x';
				img.alt    = d.country || code.toUpperCase();
				img.decoding = 'async';
				locEl.appendChild(img);
			}
			if (city) locEl.appendChild(document.createTextNode(city));
			locEl.removeAttribute('data-i18n-title');   // a place name, not a word to translate
			locEl.title = [d.city, d.region, d.country].filter(Boolean).join(', ');
			return d.ip;
		})
		.catch(() => {
			locEl.textContent = ''; locEl.dataset.i18nTitle = 'status.locationUnavailable'; locEl.title = t('status.locationUnavailable');
			return null;
		});

	ipv4.then(ip => ip || geo).then(ip => {
		ipEl.dataset.i18nTitle = ip ? 'status.copyIP' : 'status.ipUnavailable';
		ipEl.title = t(ipEl.dataset.i18nTitle);
		if (ip) { currentIP = ip; ipEl.textContent = ip; }
		else    { ipEl.textContent = ''; }
	});
}

// ─────────────────────────────────────────────────────────────────────
// Menu-bar calendar popover
// ─────────────────────────────────────────────────────────────────────
function setupCalendar() {
	const clockBtn = $('menuClock');
	const pop      = $('calPopover');
	const grid     = $('calGrid');
	const title    = $('calTitle');
	let y, m;

	function render() {
		const now   = new Date();
		const first = new Date(y, m, 1);
		const start = first.getDay();
		const dim   = new Date(y, m + 1, 0).getDate();
		const cells = Math.ceil((start + dim) / 7) * 7;
		title.textContent = first.toLocaleDateString(locale(), { month: 'long', year: 'numeric' });
		grid.innerHTML = '';
		// Weekday heads in the page's language, Sunday first; English keeps two letters.
		for (let i = 0; i < 7; i++) {
			const name = new Date(2023, 0, 1 + i).toLocaleDateString(locale(), { weekday: 'short' });
			const el = document.createElement('div');
			el.className = 'cal-dow'; el.textContent = LANG === 'en' ? name.slice(0, 2) : name;
			grid.appendChild(el);
		}
		for (let i = 0; i < cells; i++) {
			const date = new Date(y, m, i - start + 1);
			const cell = document.createElement('div');
			cell.className   = 'cal-day';
			cell.textContent = date.getDate();
			if (date.getMonth() !== m) cell.classList.add('other');
			if (date.toDateString() === now.toDateString()) cell.classList.add('today');
			grid.appendChild(cell);
		}
	}

	function open() {
		const n = new Date(); y = n.getFullYear(); m = n.getMonth();
		render();
		pop.classList.add('open');
		clockBtn.classList.add('active');
	}
	function close() {
		pop.classList.remove('open');
		clockBtn.classList.remove('active');
	}
	onLanguageChange(() => { if (pop.classList.contains('open')) render(); });

	clockBtn.addEventListener('click', e => { e.stopPropagation(); pop.classList.contains('open') ? close() : open(); });
	pop.addEventListener('click', e => e.stopPropagation());
	$('calPrev').addEventListener('click',  () => { if (--m < 0)  { m = 11; y--; } render(); });
	$('calNext').addEventListener('click',  () => { if (++m > 11) { m = 0;  y++; } render(); });
	$('calToday').addEventListener('click', () => { const n = new Date(); y = n.getFullYear(); m = n.getMonth(); render(); });
	document.addEventListener('click',   () => { if (pop.classList.contains('open')) close(); });
	document.addEventListener('keydown', e => { if (e.key === 'Escape' && pop.classList.contains('open')) close(); });
}

// ─────────────────────────────────────────────────────────────────────
// About panel
// ─────────────────────────────────────────────────────────────────────
function setupAboutPanel() {
	registerWindow('about', { el: $('aboutPanel'), bar: $('aboutBar') });
}
