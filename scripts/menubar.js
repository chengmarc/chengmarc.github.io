// ─────────────────────────────────────────────────────────────────────
// Menu-bar clock
// ─────────────────────────────────────────────────────────────────────
function startClock() {
	const el = $('menuClock');
	let last = '';
	function tick() {
		const now = new Date();
		const t = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		const d = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
		const s = t + ' · ' + d;
		if (s !== last) { el.textContent = s; last = s; }
	}
	tick();
	setInterval(tick, 1000);
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
			? 'Online' + (c && c.effectiveType ? ' · ' + c.effectiveType.toUpperCase() : '')
			: 'Offline';
	}
	updateNet();
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
				bat.title = 'Battery ' + lvl + '%' + (b.charging ? ' · charging' : '');
			}
			updateBat();
			b.addEventListener('levelchange', updateBat);
			b.addEventListener('chargingchange', updateBat);
		}).catch(() => { bat.title = 'Battery unavailable'; });
	} else {
		bat.title = 'Battery unavailable';
	}

	const locEl = $('mbLoc');
	const ipEl  = $('mbIP');
	let currentIP = '';
	ipEl.addEventListener('click', () => {
		if (!currentIP || !navigator.clipboard) return;
		navigator.clipboard.writeText(currentIP).then(() => {
			ipEl.textContent = 'Copied!';
			ipEl.classList.add('copied');
			clearTimeout(ipEl._copyT);
			ipEl._copyT = setTimeout(() => {
				ipEl.textContent = currentIP;
				ipEl.classList.remove('copied');
			}, 1000);
		}).catch(() => {});
	});

	// One lookup feeds both the location chip and the IP chip: ipwho.is returns
	// the caller's IP alongside the geo data, so a second dedicated IP service
	// (api.ipify.org) was a redundant round-trip on every page load.
	fetch('https://ipwho.is/')
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
			locEl.title = [d.city, d.region, d.country].filter(Boolean).join(', ');

			if (d.ip) { currentIP = d.ip; ipEl.textContent = d.ip; ipEl.title = 'Click to copy IP'; }
			else      { ipEl.textContent = ''; ipEl.title = 'IP unavailable'; }
		})
		.catch(() => {
			locEl.textContent = ''; locEl.title = 'Location unavailable';
			ipEl.textContent  = ''; ipEl.title  = 'IP unavailable';
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
		title.textContent = first.toLocaleDateString([], { month: 'long', year: 'numeric' });
		grid.innerHTML = '';
		['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
			const el = document.createElement('div');
			el.className = 'cal-dow'; el.textContent = d.slice(0, 2);
			grid.appendChild(el);
		});
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
function centerAboutPanel() {
	const p = $('aboutPanel');
	const uplift = window.innerHeight * 0.08;
	p.style.left = Math.round((window.innerWidth  - p.offsetWidth)  / 2) + 'px';
	p.style.top  = Math.round(Math.max(40, (window.innerHeight - uplift - p.offsetHeight) / 2)) + 'px';
}
function openAboutPanel() {
	$('aboutPanel').classList.add('open');
	centerAboutPanel();
}
function closeAboutPanel() {
	$('aboutPanel').classList.remove('open');
}
function toggleAboutPanel() {
	$('aboutPanel').classList.contains('open') ? closeAboutPanel() : openAboutPanel();
}
function setupAboutPanel() {
	const panel = $('aboutPanel');

	$('aboutClose').addEventListener('click', e => { e.stopPropagation(); closeAboutPanel(); });
	$('aboutMin').addEventListener('click',   e => { e.stopPropagation(); closeAboutPanel(); });

	// Positioned with absolute left/top; the `grabbing` cursor lives on the panel.
	makeWindowDraggable($('aboutBar'), panel, panel, (left, top) => {
		panel.style.left = left + 'px';
		panel.style.top  = top  + 'px';
	});
}
