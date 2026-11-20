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
// Menu-bar status: country, network, battery
// ─────────────────────────────────────────────────────────────────────
function startStatus(showCountry) {
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

	showLocation(showCountry);
}

// ─────────────────────────────────────────────────────────────────────
// Menu-bar country: the flag and the country's name, from the user's IP.
// Settings can hide it; while hidden, ipwho.is and flagcdn.com are never
// asked, and turning it back on asks then.
// ─────────────────────────────────────────────────────────────────────
let countryCode = '';      // e.g. 'US', once looked up
let countryLooked = false; // the lookup runs once, the first time it's shown

// The country's name in the page's language, from the browser's own table
// (ipwho.is answers in English only); its English name if that's missing.
function countryName(code, fallback) {
	try { return new Intl.DisplayNames([locale()], { type: 'region' }).of(code) || fallback; }
	catch (_) { return fallback; }
}

function showLocation(on) {
	const locEl = $('mbLoc');
	locEl.hidden = !on;
	if (!on || countryLooked) return;
	countryLooked = true;

	fetch('https://ipwho.is/')
		.then(r => r.json())
		.then(d => {
			if (!d || d.success === false || !d.country_code) throw new Error('lookup failed');
			countryCode = d.country_code.toUpperCase();
			const code = countryCode.toLowerCase();
			const img = document.createElement('img');
			img.src    = 'https://flagcdn.com/40x30/' + code + '.png';
			img.srcset = 'https://flagcdn.com/80x60/' + code + '.png 2x';
			img.alt    = '';
			img.decoding = 'async';
			const label = document.createElement('span');
			locEl.replaceChildren(img, label);
			locEl.removeAttribute('data-i18n-title');   // a place name, not a word to translate
			const name = () => { label.textContent = locEl.title = countryName(countryCode, d.country || countryCode); };
			name();
			onLanguageChange(name);
		})
		.catch(() => {
			locEl.textContent = ''; locEl.dataset.i18nTitle = 'status.locationUnavailable'; locEl.title = t('status.locationUnavailable');
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
	registerWindow('about', { el: $('aboutPanel'), bar: $('aboutBar'), menuItem: $('mbBrand') });
}
