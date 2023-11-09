(self.webpackChunkextract_css = self.webpackChunkextract_css || []).push([
	[80276], {
		132453: function(b, f, l) {
			var o = b.exports = l(91508);
			o.tz.load(l(448627))
		},
		91508: function(b, f, l) {
			var o, t, s; //! moment-timezone.js
			//! version : 0.5.26
			//! Copyright (c) JS Foundation and other contributors
			//! license : MIT
			//! github.com/moment/moment-timezone
			(function(n, r) {
				"use strict";
				b.exports ? b.exports = r(l(572063)) : (t = [l(572063)], o = r, s = typeof o == "function" ? o.apply(f, t) : o, s !== void 0 && (b.exports = s))
			})(this, function(n) {
				"use strict";
				var r = "0.5.26",
					i = {},
					d = {},
					u = {},
					m = {},
					A;
				(!n || typeof n.version != "string") && d0("Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/");
				var W = n.version.split("."),
					q = +W[0],
					g = +W[1];
				(q < 2 || q === 2 && g < 6) && d0("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + n.version + ". See momentjs.com");

				function r0(L) {
					return L > 96 ? L - 87 : L > 64 ? L - 29 : L - 48
				}

				function T(L) {
					var Y = 0,
						h = L.split("."),
						D = h[0],
						w = h[1] || "",
						H = 1,
						J, Z = 0,
						I = 1;
					for (L.charCodeAt(0) === 45 && (Y = 1, I = -1), Y; Y < D.length; Y++) J = r0(D.charCodeAt(Y)), Z = 60 * Z + J;
					for (Y = 0; Y < w.length; Y++) H = H / 60, J = r0(w.charCodeAt(Y)), Z += J * H;
					return Z * I
				}

				function G(L) {
					for (var Y = 0; Y < L.length; Y++) L[Y] = T(L[Y])
				}

				function k0(L, Y) {
					for (var h = 0; h < Y; h++) L[h] = Math.round((L[h - 1] || 0) + L[h] * 6e4);
					L[Y - 1] = 1 / 0
				}

				function m0(L, Y) {
					var h = [],
						D;
					for (D = 0; D < Y.length; D++) h[D] = L[Y[D]];
					return h
				}

				function U0(L) {
					var Y = L.split("|"),
						h = Y[2].split(" "),
						D = Y[3].split(""),
						w = Y[4].split(" ");
					return G(h), G(D), G(w), k0(w, D.length), {
						name: Y[0],
						abbrs: m0(Y[1].split(" "), D),
						offsets: m0(h, D),
						untils: w,
						population: Y[5] | 0
					}
				}

				function L0(L) {
					L && this._set(U0(L))
				}
				L0.prototype = {
					_set: function(L) {
						this.name = L.name, this.abbrs = L.abbrs, this.untils = L.untils, this.offsets = L.offsets, this.population = L.population
					},
					_index: function(L) {
						var Y = +L,
							h = this.untils,
							D;
						for (D = 0; D < h.length; D++)
							if (Y < h[D]) return D
					},
					parse: function(L) {
						var Y = +L,
							h = this.offsets,
							D = this.untils,
							w = D.length - 1,
							H, J, Z, I;
						for (I = 0; I < w; I++)
							if (H = h[I], J = h[I + 1], Z = h[I && I - 1], H < J && E.moveAmbiguousForward ? H = J : H > Z && E.moveInvalidForward && (H = Z), Y < D[I] - H * 6e4) return h[I];
						return h[w]
					},
					abbr: function(L) {
						return this.abbrs[this._index(L)]
					},
					offset: function(L) {
						return d0("zone.offset has been deprecated in favor of zone.utcOffset"), this.offsets[this._index(L)]
					},
					utcOffset: function(L) {
						return this.offsets[this._index(L)]
					}
				};

				function l0(L) {
					var Y = L.toTimeString(),
						h = Y.match(/\([a-z ]+\)/i);
					h && h[0] ? (h = h[0].match(/[A-Z]/g), h = h ? h.join("") : void 0) : (h = Y.match(/[A-Z]{3,5}/g), h = h ? h[0] : void 0), h === "GMT" && (h = void 0), this.at = +L, this.abbr = h, this.offset = L.getTimezoneOffset()
				}

				function D0(L) {
					this.zone = L, this.offsetScore = 0, this.abbrScore = 0
				}
				D0.prototype.scoreOffsetAt = function(L) {
					this.offsetScore += Math.abs(this.zone.utcOffset(L.at) - L.offset), this.zone.abbr(L.at).replace(/[^A-Z]/g, "") !== L.abbr && this.abbrScore++
				};

				function a0(L, Y) {
					for (var h, D; D = ((Y.at - L.at) / 12e4 | 0) * 6e4;) h = new l0(new Date(L.at + D)), h.offset === L.offset ? L = h : Y = h;
					return L
				}

				function t1() {
					var L = new Date().getFullYear() - 2,
						Y = new l0(new Date(L, 0, 1)),
						h = [Y],
						D, w, H;
					for (H = 1; H < 48; H++) w = new l0(new Date(L, H, 1)), w.offset !== Y.offset && (D = a0(Y, w), h.push(D), h.push(new l0(new Date(D.at + 6e4)))), Y = w;
					for (H = 0; H < 4; H++) h.push(new l0(new Date(L + H, 0, 1))), h.push(new l0(new Date(L + H, 6, 1)));
					return h
				}

				function e0(L, Y) {
					return L.offsetScore !== Y.offsetScore ? L.offsetScore - Y.offsetScore : L.abbrScore !== Y.abbrScore ? L.abbrScore - Y.abbrScore : L.zone.population !== Y.zone.population ? Y.zone.population - L.zone.population : Y.zone.name.localeCompare(L.zone.name)
				}

				function n1(L, Y) {
					var h, D;
					for (G(Y), h = 0; h < Y.length; h++) D = Y[h], m[D] = m[D] || {}, m[D][L] = !0
				}

				function s1(L) {
					var Y = L.length,
						h = {},
						D = [],
						w, H, J;
					for (w = 0; w < Y; w++) {
						J = m[L[w].offset] || {};
						for (H in J) J.hasOwnProperty(H) && (h[H] = !0)
					}
					for (w in h) h.hasOwnProperty(w) && D.push(u[w]);
					return D
				}

				function c0() {
					try {
						var L = Intl.DateTimeFormat().resolvedOptions().timeZone;
						if (L && L.length > 3) {
							var Y = u[b0(L)];
							if (Y) return Y;
							d0("Moment Timezone found " + L + " from the Intl api, but did not have that data loaded.")
						}
					} catch (Q1) {}
					var h = t1(),
						D = h.length,
						w = s1(h),
						H = [],
						J, Z, I;
					for (Z = 0; Z < w.length; Z++) {
						for (J = new D0(t0(w[Z]), D), I = 0; I < D; I++) J.scoreOffsetAt(h[I]);
						H.push(J)
					}
					return H.sort(e0), H.length > 0 ? H[0].zone.name : void 0
				}

				function W1(L) {
					return (!A || L) && (A = c0()), A
				}

				function b0(L) {
					return (L || "").toLowerCase().replace(/\//g, "_")
				}

				function H0(L) {
					var Y, h, D, w;
					for (typeof L == "string" && (L = [L]), Y = 0; Y < L.length; Y++) D = L[Y].split("|"), h = D[0], w = b0(h), i[w] = L[Y], u[w] = h, n1(w, D[2].split(" "))
				}

				function t0(L, Y) {
					L = b0(L);
					var h = i[L],
						D;
					return h instanceof L0 ? h : typeof h == "string" ? (h = new L0(h), i[L] = h, h) : d[L] && Y !== t0 && (D = t0(d[L], t0)) ? (h = i[L] = new L0, h._set(D), h.name = u[L], h) : null
				}

				function N1() {
					var L, Y = [];
					for (L in u) u.hasOwnProperty(L) && (i[L] || i[d[L]]) && u[L] && Y.push(u[L]);
					return Y.sort()
				}

				function r1(L) {
					var Y, h, D, w;
					for (typeof L == "string" && (L = [L]), Y = 0; Y < L.length; Y++) h = L[Y].split("|"), D = b0(h[0]), w = b0(h[1]), d[D] = w, u[D] = h[0], d[w] = D, u[w] = h[1]
				}

				function M0(L) {
					H0(L.zones), r1(L.links), E.dataVersion = L.version
				}

				function S0(L) {
					return S0.didShowError || (S0.didShowError = !0, d0("moment.tz.zoneExists('" + L + "') has been deprecated in favor of !moment.tz.zone('" + L + "')")), !!t0(L)
				}

				function W0(L) {
					var Y = L._f === "X" || L._f === "x";
					return !!(L._a && L._tzm === void 0 && !Y)
				}

				function d0(L) {
					typeof console != "undefined" && typeof console.error == "function" && console.error(L)
				}

				function E(L) {
					var Y = Array.prototype.slice.call(arguments, 0, -1),
						h = arguments[arguments.length - 1],
						D = t0(h),
						w = n.utc.apply(null, Y);
					return D && !n.isMoment(L) && W0(w) && w.add(D.parse(w), "minutes"), w.tz(h), w
				}
				E.version = r, E.dataVersion = "", E._zones = i, E._links = d, E._names = u, E.add = H0, E.link = r1, E.load = M0, E.zone = t0, E.zoneExists = S0, E.guess = W1, E.names = N1, E.Zone = L0, E.unpack = U0, E.unpackBase60 = T, E.needsOffset = W0, E.moveInvalidForward = !0, E.moveAmbiguousForward = !1;
				var O = n.fn;
				n.tz = E, n.defaultZone = null, n.updateOffset = function(L, Y) {
					var h = n.defaultZone,
						D;
					if (L._z === void 0 && (h && W0(L) && !L._isUTC && (L._d = n.utc(L._a)._d, L.utc().add(h.parse(L), "minutes")), L._z = h), L._z)
						if (D = L._z.utcOffset(L), Math.abs(D) < 16 && (D = D / 60), L.utcOffset !== void 0) {
							var w = L._z;
							L.utcOffset(-D, Y), L._z = w
						} else L.zone(D, Y)
				}, O.tz = function(L, Y) {
					if (L) {
						if (typeof L != "string") throw new Error("Time zone name must be a string, got " + L + " [" + typeof L + "]");
						return this._z = t0(L), this._z ? n.updateOffset(this, Y) : d0("Moment Timezone has no data for " + L + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this
					}
					if (this._z) return this._z.name
				};

				function c1(L) {
					return function() {
						return this._z ? this._z.abbr(this) : L.call(this)
					}
				}

				function M1(L) {
					return function() {
						return this._z = null, L.apply(this, arguments)
					}
				}

				function E0(L) {
					return function() {
						return arguments.length > 0 && (this._z = null), L.apply(this, arguments)
					}
				}
				O.zoneName = c1(O.zoneName), O.zoneAbbr = c1(O.zoneAbbr), O.utc = M1(O.utc), O.local = M1(O.local), O.utcOffset = E0(O.utcOffset), n.tz.setDefault = function(L) {
					return (q < 2 || q === 2 && g < 9) && d0("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + n.version + "."), n.defaultZone = L ? t0(L) : null, n
				};
				var N0 = n.momentProperties;
				return Object.prototype.toString.call(N0) === "[object Array]" ? (N0.push("_z"), N0.push("_a")) : N0 && (N0._z = null), n
			})
		},
		392370: function(b, f, l) { //! moment.js locale configuration
			//! locale : Afrikaans [af]
			//! author : Werner Mollentze : https://github.com/wernerm
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("af", {
					months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
					monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
					weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
					weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
					weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
					meridiemParse: /vm|nm/i,
					isPM: function(s) {
						return /^nm$/i.test(s)
					},
					meridiem: function(s, n, r) {
						return s < 12 ? r ? "vm" : "VM" : r ? "nm" : "NM"
					},
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Vandag om] LT",
						nextDay: "[M\xF4re om] LT",
						nextWeek: "dddd [om] LT",
						lastDay: "[Gister om] LT",
						lastWeek: "[Laas] dddd [om] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "oor %s",
						past: "%s gelede",
						s: "'n paar sekondes",
						ss: "%d sekondes",
						m: "'n minuut",
						mm: "%d minute",
						h: "'n uur",
						hh: "%d ure",
						d: "'n dag",
						dd: "%d dae",
						M: "'n maand",
						MM: "%d maande",
						y: "'n jaar",
						yy: "%d jaar"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
					ordinal: function(s) {
						return s + (s === 1 || s === 8 || s >= 20 ? "ste" : "de")
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		127250: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic (Algeria) [ar-dz]
			//! author : Amine Roukh: https://github.com/Amine27
			//! author : Abdel Said: https://github.com/abdelsaid
			//! author : Ahmed Elkhatib
			//! author : forabi https://github.com/forabi
			//! author : Noureddine LOUAHEDJ : https://github.com/noureddinem
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = function(d) {
						return d === 0 ? 0 : d === 1 ? 1 : d === 2 ? 2 : d % 100 >= 3 && d % 100 <= 10 ? 3 : d % 100 >= 11 ? 4 : 5
					},
					s = {
						s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"],
						m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"],
						h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"],
						d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"],
						M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"],
						y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"]
					},
					n = function(d) {
						return function(u, m, A, W) {
							var q = t(u),
								g = s[d][t(u)];
							return q === 2 && (g = g[m ? 0 : 1]), g.replace(/%d/i, u)
						}
					},
					r = ["\u062C\u0627\u0646\u0641\u064A", "\u0641\u064A\u0641\u0631\u064A", "\u0645\u0627\u0631\u0633", "\u0623\u0641\u0631\u064A\u0644", "\u0645\u0627\u064A", "\u062C\u0648\u0627\u0646", "\u062C\u0648\u064A\u0644\u064A\u0629", "\u0623\u0648\u062A", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"],
					i = o.defineLocale("ar-dz", {
						months: r,
						monthsShort: r,
						weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
						weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
						weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "D/\u200FM/\u200FYYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						meridiemParse: /ص|م/,
						isPM: function(d) {
							return d === "\u0645"
						},
						meridiem: function(d, u, m) {
							return d < 12 ? "\u0635" : "\u0645"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0628\u0639\u062F %s",
							past: "\u0645\u0646\u0630 %s",
							s: n("s"),
							ss: n("s"),
							m: n("m"),
							mm: n("m"),
							h: n("h"),
							hh: n("h"),
							d: n("d"),
							dd: n("d"),
							M: n("M"),
							MM: n("M"),
							y: n("y"),
							yy: n("y")
						},
						postformat: function(d) {
							return d.replace(/,/g, "\u060C")
						},
						week: {
							dow: 0,
							doy: 4
						}
					});
				return i
			})
		},
		147534: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic (Kuwait) [ar-kw]
			//! author : Nusret Parlak: https://github.com/nusretparlak
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ar-kw", {
					months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
					monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
					weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062A\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
					weekdaysShort: "\u0627\u062D\u062F_\u0627\u062A\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
					weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0641\u064A %s",
						past: "\u0645\u0646\u0630 %s",
						s: "\u062B\u0648\u0627\u0646",
						ss: "%d \u062B\u0627\u0646\u064A\u0629",
						m: "\u062F\u0642\u064A\u0642\u0629",
						mm: "%d \u062F\u0642\u0627\u0626\u0642",
						h: "\u0633\u0627\u0639\u0629",
						hh: "%d \u0633\u0627\u0639\u0627\u062A",
						d: "\u064A\u0648\u0645",
						dd: "%d \u0623\u064A\u0627\u0645",
						M: "\u0634\u0647\u0631",
						MM: "%d \u0623\u0634\u0647\u0631",
						y: "\u0633\u0646\u0629",
						yy: "%d \u0633\u0646\u0648\u0627\u062A"
					},
					week: {
						dow: 0,
						doy: 12
					}
				});
				return t
			})
		},
		300596: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic (Libya) [ar-ly]
			//! author : Ali Hmer: https://github.com/kikoanis
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "1",
						2: "2",
						3: "3",
						4: "4",
						5: "5",
						6: "6",
						7: "7",
						8: "8",
						9: "9",
						0: "0"
					},
					s = function(u) {
						return u === 0 ? 0 : u === 1 ? 1 : u === 2 ? 2 : u % 100 >= 3 && u % 100 <= 10 ? 3 : u % 100 >= 11 ? 4 : 5
					},
					n = {
						s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"],
						m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"],
						h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"],
						d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"],
						M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"],
						y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"]
					},
					r = function(u) {
						return function(m, A, W, q) {
							var g = s(m),
								r0 = n[u][s(m)];
							return g === 2 && (r0 = r0[A ? 0 : 1]), r0.replace(/%d/i, m)
						}
					},
					i = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"],
					d = o.defineLocale("ar-ly", {
						months: i,
						monthsShort: i,
						weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
						weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
						weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "D/\u200FM/\u200FYYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						meridiemParse: /ص|م/,
						isPM: function(u) {
							return u === "\u0645"
						},
						meridiem: function(u, m, A) {
							return u < 12 ? "\u0635" : "\u0645"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0628\u0639\u062F %s",
							past: "\u0645\u0646\u0630 %s",
							s: r("s"),
							ss: r("s"),
							m: r("m"),
							mm: r("m"),
							h: r("h"),
							hh: r("h"),
							d: r("d"),
							dd: r("d"),
							M: r("M"),
							MM: r("M"),
							y: r("y"),
							yy: r("y")
						},
						preparse: function(u) {
							return u.replace(/،/g, ",")
						},
						postformat: function(u) {
							return u.replace(/\d/g, function(m) {
								return t[m]
							}).replace(/,/g, "\u060C")
						},
						week: {
							dow: 6,
							doy: 12
						}
					});
				return d
			})
		},
		522027: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic (Morocco) [ar-ma]
			//! author : ElFadili Yassine : https://github.com/ElFadiliY
			//! author : Abdel Said : https://github.com/abdelsaid
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ar-ma", {
					months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
					monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"),
					weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
					weekdaysShort: "\u0627\u062D\u062F_\u0627\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
					weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0641\u064A %s",
						past: "\u0645\u0646\u0630 %s",
						s: "\u062B\u0648\u0627\u0646",
						ss: "%d \u062B\u0627\u0646\u064A\u0629",
						m: "\u062F\u0642\u064A\u0642\u0629",
						mm: "%d \u062F\u0642\u0627\u0626\u0642",
						h: "\u0633\u0627\u0639\u0629",
						hh: "%d \u0633\u0627\u0639\u0627\u062A",
						d: "\u064A\u0648\u0645",
						dd: "%d \u0623\u064A\u0627\u0645",
						M: "\u0634\u0647\u0631",
						MM: "%d \u0623\u0634\u0647\u0631",
						y: "\u0633\u0646\u0629",
						yy: "%d \u0633\u0646\u0648\u0627\u062A"
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		676828: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic (Saudi Arabia) [ar-sa]
			//! author : Suhail Alkowaileet : https://github.com/xsoh
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0661",
						2: "\u0662",
						3: "\u0663",
						4: "\u0664",
						5: "\u0665",
						6: "\u0666",
						7: "\u0667",
						8: "\u0668",
						9: "\u0669",
						0: "\u0660"
					},
					s = {
						"\u0661": "1",
						"\u0662": "2",
						"\u0663": "3",
						"\u0664": "4",
						"\u0665": "5",
						"\u0666": "6",
						"\u0667": "7",
						"\u0668": "8",
						"\u0669": "9",
						"\u0660": "0"
					},
					n = o.defineLocale("ar-sa", {
						months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
						monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
						weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
						weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
						weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						meridiemParse: /ص|م/,
						isPM: function(r) {
							return r === "\u0645"
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u0635" : "\u0645"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0641\u064A %s",
							past: "\u0645\u0646\u0630 %s",
							s: "\u062B\u0648\u0627\u0646",
							ss: "%d \u062B\u0627\u0646\u064A\u0629",
							m: "\u062F\u0642\u064A\u0642\u0629",
							mm: "%d \u062F\u0642\u0627\u0626\u0642",
							h: "\u0633\u0627\u0639\u0629",
							hh: "%d \u0633\u0627\u0639\u0627\u062A",
							d: "\u064A\u0648\u0645",
							dd: "%d \u0623\u064A\u0627\u0645",
							M: "\u0634\u0647\u0631",
							MM: "%d \u0623\u0634\u0647\u0631",
							y: "\u0633\u0646\u0629",
							yy: "%d \u0633\u0646\u0648\u0627\u062A"
						},
						preparse: function(r) {
							return r.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(i) {
								return s[i]
							}).replace(/،/g, ",")
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							}).replace(/,/g, "\u060C")
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		117462: function(b, f, l) { //! moment.js locale configuration
			//! locale  :  Arabic (Tunisia) [ar-tn]
			//! author : Nader Toukabri : https://github.com/naderio
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ar-tn", {
					months: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
					monthsShort: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"),
					weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
					weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
					weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0641\u064A %s",
						past: "\u0645\u0646\u0630 %s",
						s: "\u062B\u0648\u0627\u0646",
						ss: "%d \u062B\u0627\u0646\u064A\u0629",
						m: "\u062F\u0642\u064A\u0642\u0629",
						mm: "%d \u062F\u0642\u0627\u0626\u0642",
						h: "\u0633\u0627\u0639\u0629",
						hh: "%d \u0633\u0627\u0639\u0627\u062A",
						d: "\u064A\u0648\u0645",
						dd: "%d \u0623\u064A\u0627\u0645",
						M: "\u0634\u0647\u0631",
						MM: "%d \u0623\u0634\u0647\u0631",
						y: "\u0633\u0646\u0629",
						yy: "%d \u0633\u0646\u0648\u0627\u062A"
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		200722: function(b, f, l) { //! moment.js locale configuration
			//! locale : Arabic [ar]
			//! author : Abdel Said: https://github.com/abdelsaid
			//! author : Ahmed Elkhatib
			//! author : forabi https://github.com/forabi
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0661",
						2: "\u0662",
						3: "\u0663",
						4: "\u0664",
						5: "\u0665",
						6: "\u0666",
						7: "\u0667",
						8: "\u0668",
						9: "\u0669",
						0: "\u0660"
					},
					s = {
						"\u0661": "1",
						"\u0662": "2",
						"\u0663": "3",
						"\u0664": "4",
						"\u0665": "5",
						"\u0666": "6",
						"\u0667": "7",
						"\u0668": "8",
						"\u0669": "9",
						"\u0660": "0"
					},
					n = function(m) {
						return m === 0 ? 0 : m === 1 ? 1 : m === 2 ? 2 : m % 100 >= 3 && m % 100 <= 10 ? 3 : m % 100 >= 11 ? 4 : 5
					},
					r = {
						s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"],
						m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"],
						h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"],
						d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"],
						M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"],
						y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"]
					},
					i = function(m) {
						return function(A, W, q, g) {
							var r0 = n(A),
								T = r[m][n(A)];
							return r0 === 2 && (T = T[W ? 0 : 1]), T.replace(/%d/i, A)
						}
					},
					d = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"],
					u = o.defineLocale("ar", {
						months: d,
						monthsShort: d,
						weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"),
						weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"),
						weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "D/\u200FM/\u200FYYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						meridiemParse: /ص|م/,
						isPM: function(m) {
							return m === "\u0645"
						},
						meridiem: function(m, A, W) {
							return m < 12 ? "\u0635" : "\u0645"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0628\u0639\u062F %s",
							past: "\u0645\u0646\u0630 %s",
							s: i("s"),
							ss: i("s"),
							m: i("m"),
							mm: i("m"),
							h: i("h"),
							hh: i("h"),
							d: i("d"),
							dd: i("d"),
							M: i("M"),
							MM: i("M"),
							y: i("y"),
							yy: i("y")
						},
						preparse: function(m) {
							return m.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(A) {
								return s[A]
							}).replace(/،/g, ",")
						},
						postformat: function(m) {
							return m.replace(/\d/g, function(A) {
								return t[A]
							}).replace(/,/g, "\u060C")
						},
						week: {
							dow: 6,
							doy: 12
						}
					});
				return u
			})
		},
		664157: function(b, f, l) { //! moment.js locale configuration
			//! locale : Azerbaijani [az]
			//! author : topchiyev : https://github.com/topchiyev
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "-inci",
						5: "-inci",
						8: "-inci",
						70: "-inci",
						80: "-inci",
						2: "-nci",
						7: "-nci",
						20: "-nci",
						50: "-nci",
						3: "-\xFCnc\xFC",
						4: "-\xFCnc\xFC",
						100: "-\xFCnc\xFC",
						6: "-nc\u0131",
						9: "-uncu",
						10: "-uncu",
						30: "-uncu",
						60: "-\u0131nc\u0131",
						90: "-\u0131nc\u0131"
					},
					s = o.defineLocale("az", {
						months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
						monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
						weekdays: "Bazar_Bazar ert\u0259si_\xC7\u0259r\u015F\u0259nb\u0259 ax\u015Fam\u0131_\xC7\u0259r\u015F\u0259nb\u0259_C\xFCm\u0259 ax\u015Fam\u0131_C\xFCm\u0259_\u015E\u0259nb\u0259".split("_"),
						weekdaysShort: "Baz_BzE_\xC7Ax_\xC7\u0259r_CAx_C\xFCm_\u015E\u0259n".split("_"),
						weekdaysMin: "Bz_BE_\xC7A_\xC7\u0259_CA_C\xFC_\u015E\u0259".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[bug\xFCn saat] LT",
							nextDay: "[sabah saat] LT",
							nextWeek: "[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT",
							lastDay: "[d\xFCn\u0259n] LT",
							lastWeek: "[ke\xE7\u0259n h\u0259ft\u0259] dddd [saat] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s sonra",
							past: "%s \u0259vv\u0259l",
							s: "bir ne\xE7\u0259 saniy\u0259",
							ss: "%d saniy\u0259",
							m: "bir d\u0259qiq\u0259",
							mm: "%d d\u0259qiq\u0259",
							h: "bir saat",
							hh: "%d saat",
							d: "bir g\xFCn",
							dd: "%d g\xFCn",
							M: "bir ay",
							MM: "%d ay",
							y: "bir il",
							yy: "%d il"
						},
						meridiemParse: /gecə|səhər|gündüz|axşam/,
						isPM: function(n) {
							return /^(gündüz|axşam)$/.test(n)
						},
						meridiem: function(n, r, i) {
							return n < 4 ? "gec\u0259" : n < 12 ? "s\u0259h\u0259r" : n < 17 ? "g\xFCnd\xFCz" : "ax\u015Fam"
						},
						dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
						ordinal: function(n) {
							if (n === 0) return n + "-\u0131nc\u0131";
							var r = n % 10,
								i = n % 100 - r,
								d = n >= 100 ? 100 : null;
							return n + (t[r] || t[i] || t[d])
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		623809: function(b, f, l) { //! moment.js locale configuration
			//! locale : Belarusian [be]
			//! author : Dmitry Demidov : https://github.com/demidov91
			//! author: Praleska: http://praleska.pro/
			//! Author : Menelion Elensúle : https://github.com/Oire
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(r, i) {
					var d = r.split("_");
					return i % 10 == 1 && i % 100 != 11 ? d[0] : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? d[1] : d[2]
				}

				function s(r, i, d) {
					var u = {
						ss: i ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434",
						mm: i ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D",
						hh: i ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D",
						dd: "\u0434\u0437\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u0437\u0451\u043D",
						MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u044B_\u043C\u0435\u0441\u044F\u0446\u0430\u045E",
						yy: "\u0433\u043E\u0434_\u0433\u0430\u0434\u044B_\u0433\u0430\u0434\u043E\u045E"
					};
					return d === "m" ? i ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443" : d === "h" ? i ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443" : r + " " + t(u[d], +r)
				}
				var n = o.defineLocale("be", {
					months: {
						format: "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044F_\u043B\u044E\u0442\u0430\u0433\u0430_\u0441\u0430\u043A\u0430\u0432\u0456\u043A\u0430_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A\u0430_\u0442\u0440\u0430\u045E\u043D\u044F_\u0447\u044D\u0440\u0432\u0435\u043D\u044F_\u043B\u0456\u043F\u0435\u043D\u044F_\u0436\u043D\u0456\u045E\u043D\u044F_\u0432\u0435\u0440\u0430\u0441\u043D\u044F_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A\u0430_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434\u0430_\u0441\u043D\u0435\u0436\u043D\u044F".split("_"),
						standalone: "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044C_\u043B\u044E\u0442\u044B_\u0441\u0430\u043A\u0430\u0432\u0456\u043A_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u044D\u0440\u0432\u0435\u043D\u044C_\u043B\u0456\u043F\u0435\u043D\u044C_\u0436\u043D\u0456\u0432\u0435\u043D\u044C_\u0432\u0435\u0440\u0430\u0441\u0435\u043D\u044C_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434_\u0441\u043D\u0435\u0436\u0430\u043D\u044C".split("_")
					},
					monthsShort: "\u0441\u0442\u0443\u0434_\u043B\u044E\u0442_\u0441\u0430\u043A_\u043A\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044D\u0440\u0432_\u043B\u0456\u043F_\u0436\u043D\u0456\u0432_\u0432\u0435\u0440_\u043A\u0430\u0441\u0442_\u043B\u0456\u0441\u0442_\u0441\u043D\u0435\u0436".split("_"),
					weekdays: {
						format: "\u043D\u044F\u0434\u0437\u0435\u043B\u044E_\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A_\u0430\u045E\u0442\u043E\u0440\u0430\u043A_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043F\u044F\u0442\u043D\u0456\u0446\u0443_\u0441\u0443\u0431\u043E\u0442\u0443".split("_"),
						standalone: "\u043D\u044F\u0434\u0437\u0435\u043B\u044F_\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A_\u0430\u045E\u0442\u043E\u0440\u0430\u043A_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043F\u044F\u0442\u043D\u0456\u0446\u0430_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
						isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
					},
					weekdaysShort: "\u043D\u0434_\u043F\u043D_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043F\u0442_\u0441\u0431".split("_"),
					weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043F\u0442_\u0441\u0431".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY \u0433.",
						LLL: "D MMMM YYYY \u0433., HH:mm",
						LLLL: "dddd, D MMMM YYYY \u0433., HH:mm"
					},
					calendar: {
						sameDay: "[\u0421\u0451\u043D\u043D\u044F \u045E] LT",
						nextDay: "[\u0417\u0430\u045E\u0442\u0440\u0430 \u045E] LT",
						lastDay: "[\u0423\u0447\u043E\u0440\u0430 \u045E] LT",
						nextWeek: function() {
							return "[\u0423] dddd [\u045E] LT"
						},
						lastWeek: function() {
							switch (this.day()) {
								case 0:
								case 3:
								case 5:
								case 6:
									return "[\u0423 \u043C\u0456\u043D\u0443\u043B\u0443\u044E] dddd [\u045E] LT";
								case 1:
								case 2:
								case 4:
									return "[\u0423 \u043C\u0456\u043D\u0443\u043B\u044B] dddd [\u045E] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "\u043F\u0440\u0430\u0437 %s",
						past: "%s \u0442\u0430\u043C\u0443",
						s: "\u043D\u0435\u043A\u0430\u043B\u044C\u043A\u0456 \u0441\u0435\u043A\u0443\u043D\u0434",
						m: s,
						mm: s,
						h: s,
						hh: s,
						d: "\u0434\u0437\u0435\u043D\u044C",
						dd: s,
						M: "\u043C\u0435\u0441\u044F\u0446",
						MM: s,
						y: "\u0433\u043E\u0434",
						yy: s
					},
					meridiemParse: /ночы|раніцы|дня|вечара/,
					isPM: function(r) {
						return /^(дня|вечара)$/.test(r)
					},
					meridiem: function(r, i, d) {
						return r < 4 ? "\u043D\u043E\u0447\u044B" : r < 12 ? "\u0440\u0430\u043D\u0456\u0446\u044B" : r < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u0430\u0440\u0430"
					},
					dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
					ordinal: function(r, i) {
						switch (i) {
							case "M":
							case "d":
							case "DDD":
							case "w":
							case "W":
								return (r % 10 == 2 || r % 10 == 3) && r % 100 != 12 && r % 100 != 13 ? r + "-\u0456" : r + "-\u044B";
							case "D":
								return r + "-\u0433\u0430";
							default:
								return r
						}
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return n
			})
		},
		236057: function(b, f, l) { //! moment.js locale configuration
			//! locale : Bulgarian [bg]
			//! author : Krasen Borisov : https://github.com/kraz
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("bg", {
					months: "\u044F\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"),
					monthsShort: "\u044F\u043D\u0443_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"),
					weekdays: "\u043D\u0435\u0434\u0435\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u044F\u0434\u0430_\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A_\u043F\u0435\u0442\u044A\u043A_\u0441\u044A\u0431\u043E\u0442\u0430".split("_"),
					weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u044F_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u044A\u0431".split("_"),
					weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "D.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY H:mm",
						LLLL: "dddd, D MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[\u0414\u043D\u0435\u0441 \u0432] LT",
						nextDay: "[\u0423\u0442\u0440\u0435 \u0432] LT",
						nextWeek: "dddd [\u0432] LT",
						lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
								case 3:
								case 6:
									return "[\u041C\u0438\u043D\u0430\u043B\u0430\u0442\u0430] dddd [\u0432] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[\u041C\u0438\u043D\u0430\u043B\u0438\u044F] dddd [\u0432] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0441\u043B\u0435\u0434 %s",
						past: "\u043F\u0440\u0435\u0434\u0438 %s",
						s: "\u043D\u044F\u043A\u043E\u043B\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
						ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
						m: "\u043C\u0438\u043D\u0443\u0442\u0430",
						mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438",
						h: "\u0447\u0430\u0441",
						hh: "%d \u0447\u0430\u0441\u0430",
						d: "\u0434\u0435\u043D",
						dd: "%d \u0434\u0435\u043D\u0430",
						w: "\u0441\u0435\u0434\u043C\u0438\u0446\u0430",
						ww: "%d \u0441\u0435\u0434\u043C\u0438\u0446\u0438",
						M: "\u043C\u0435\u0441\u0435\u0446",
						MM: "%d \u043C\u0435\u0441\u0435\u0446\u0430",
						y: "\u0433\u043E\u0434\u0438\u043D\u0430",
						yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438"
					},
					dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
					ordinal: function(s) {
						var n = s % 10,
							r = s % 100;
						return s === 0 ? s + "-\u0435\u0432" : r === 0 ? s + "-\u0435\u043D" : r > 10 && r < 20 ? s + "-\u0442\u0438" : n === 1 ? s + "-\u0432\u0438" : n === 2 ? s + "-\u0440\u0438" : n === 7 || n === 8 ? s + "-\u043C\u0438" : s + "-\u0442\u0438"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		779825: function(b, f, l) { //! moment.js locale configuration
			//! locale : Bambara [bm]
			//! author : Estelle Comment : https://github.com/estellecomment
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("bm", {
					months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025Bkalo_Zuw\u025Bnkalo_Zuluyekalo_Utikalo_S\u025Btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"),
					monthsShort: "Zan_Few_Mar_Awi_M\u025B_Zuw_Zul_Uti_S\u025Bt_\u0254ku_Now_Des".split("_"),
					weekdays: "Kari_Nt\u025Bn\u025Bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
					weekdaysShort: "Kar_Nt\u025B_Tar_Ara_Ala_Jum_Sib".split("_"),
					weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "MMMM [tile] D [san] YYYY",
						LLL: "MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm",
						LLLL: "dddd MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm"
					},
					calendar: {
						sameDay: "[Bi l\u025Br\u025B] LT",
						nextDay: "[Sini l\u025Br\u025B] LT",
						nextWeek: "dddd [don l\u025Br\u025B] LT",
						lastDay: "[Kunu l\u025Br\u025B] LT",
						lastWeek: "dddd [t\u025Bm\u025Bnen l\u025Br\u025B] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s k\u0254n\u0254",
						past: "a b\u025B %s b\u0254",
						s: "sanga dama dama",
						ss: "sekondi %d",
						m: "miniti kelen",
						mm: "miniti %d",
						h: "l\u025Br\u025B kelen",
						hh: "l\u025Br\u025B %d",
						d: "tile kelen",
						dd: "tile %d",
						M: "kalo kelen",
						MM: "kalo %d",
						y: "san kelen",
						yy: "san %d"
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		450500: function(b, f, l) { //! moment.js locale configuration
			//! locale : Bengali (Bangladesh) [bn-bd]
			//! author : Asraf Hossain Patoary : https://github.com/ashwoolford
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u09E7",
						2: "\u09E8",
						3: "\u09E9",
						4: "\u09EA",
						5: "\u09EB",
						6: "\u09EC",
						7: "\u09ED",
						8: "\u09EE",
						9: "\u09EF",
						0: "\u09E6"
					},
					s = {
						"\u09E7": "1",
						"\u09E8": "2",
						"\u09E9": "3",
						"\u09EA": "4",
						"\u09EB": "5",
						"\u09EC": "6",
						"\u09ED": "7",
						"\u09EE": "8",
						"\u09EF": "9",
						"\u09E6": "0"
					},
					n = o.defineLocale("bn-bd", {
						months: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0_\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0_\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0_\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0".split("_"),
						monthsShort: "\u099C\u09BE\u09A8\u09C1_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F_\u0985\u0995\u09CD\u099F\u09CB_\u09A8\u09AD\u09C7_\u09A1\u09BF\u09B8\u09C7".split("_"),
						weekdays: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0_\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0_\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0_\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0_\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0_\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0".split("_"),
						weekdaysShort: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
						weekdaysMin: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
						longDateFormat: {
							LT: "A h:mm \u09B8\u09AE\u09DF",
							LTS: "A h:mm:ss \u09B8\u09AE\u09DF",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF",
							LLLL: "dddd, D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF"
						},
						calendar: {
							sameDay: "[\u0986\u099C] LT",
							nextDay: "[\u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0997\u09A4\u0995\u09BE\u09B2] LT",
							lastWeek: "[\u0997\u09A4] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u09AA\u09B0\u09C7",
							past: "%s \u0986\u0997\u09C7",
							s: "\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
							ss: "%d \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
							m: "\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F",
							mm: "%d \u09AE\u09BF\u09A8\u09BF\u099F",
							h: "\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE",
							hh: "%d \u0998\u09A8\u09CD\u099F\u09BE",
							d: "\u098F\u0995 \u09A6\u09BF\u09A8",
							dd: "%d \u09A6\u09BF\u09A8",
							M: "\u098F\u0995 \u09AE\u09BE\u09B8",
							MM: "%d \u09AE\u09BE\u09B8",
							y: "\u098F\u0995 \u09AC\u099B\u09B0",
							yy: "%d \u09AC\u099B\u09B0"
						},
						preparse: function(r) {
							return r.replace(/[১২৩৪৫৬৭৮৯০]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /রাত|ভোর|সকাল|দুপুর|বিকাল|সন্ধ্যা|রাত/,
						meridiemHour: function(r, i) {
							if (r === 12 && (r = 0), i === "\u09B0\u09BE\u09A4") return r < 4 ? r : r + 12;
							if (i === "\u09AD\u09CB\u09B0") return r;
							if (i === "\u09B8\u0995\u09BE\u09B2") return r;
							if (i === "\u09A6\u09C1\u09AA\u09C1\u09B0") return r >= 3 ? r : r + 12;
							if (i === "\u09AC\u09BF\u0995\u09BE\u09B2") return r + 12;
							if (i === "\u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE") return r + 12
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u09B0\u09BE\u09A4" : r < 6 ? "\u09AD\u09CB\u09B0" : r < 12 ? "\u09B8\u0995\u09BE\u09B2" : r < 15 ? "\u09A6\u09C1\u09AA\u09C1\u09B0" : r < 18 ? "\u09AC\u09BF\u0995\u09BE\u09B2" : r < 20 ? "\u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE" : "\u09B0\u09BE\u09A4"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		49459: function(b, f, l) { //! moment.js locale configuration
			//! locale : Bengali [bn]
			//! author : Kaushik Gandhi : https://github.com/kaushikgandhi
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u09E7",
						2: "\u09E8",
						3: "\u09E9",
						4: "\u09EA",
						5: "\u09EB",
						6: "\u09EC",
						7: "\u09ED",
						8: "\u09EE",
						9: "\u09EF",
						0: "\u09E6"
					},
					s = {
						"\u09E7": "1",
						"\u09E8": "2",
						"\u09E9": "3",
						"\u09EA": "4",
						"\u09EB": "5",
						"\u09EC": "6",
						"\u09ED": "7",
						"\u09EE": "8",
						"\u09EF": "9",
						"\u09E6": "0"
					},
					n = o.defineLocale("bn", {
						months: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0_\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0_\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0_\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0".split("_"),
						monthsShort: "\u099C\u09BE\u09A8\u09C1_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F_\u0985\u0995\u09CD\u099F\u09CB_\u09A8\u09AD\u09C7_\u09A1\u09BF\u09B8\u09C7".split("_"),
						weekdays: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0_\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0_\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0_\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0_\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0_\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0".split("_"),
						weekdaysShort: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
						weekdaysMin: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"),
						longDateFormat: {
							LT: "A h:mm \u09B8\u09AE\u09DF",
							LTS: "A h:mm:ss \u09B8\u09AE\u09DF",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF",
							LLLL: "dddd, D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF"
						},
						calendar: {
							sameDay: "[\u0986\u099C] LT",
							nextDay: "[\u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0997\u09A4\u0995\u09BE\u09B2] LT",
							lastWeek: "[\u0997\u09A4] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u09AA\u09B0\u09C7",
							past: "%s \u0986\u0997\u09C7",
							s: "\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
							ss: "%d \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",
							m: "\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F",
							mm: "%d \u09AE\u09BF\u09A8\u09BF\u099F",
							h: "\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE",
							hh: "%d \u0998\u09A8\u09CD\u099F\u09BE",
							d: "\u098F\u0995 \u09A6\u09BF\u09A8",
							dd: "%d \u09A6\u09BF\u09A8",
							M: "\u098F\u0995 \u09AE\u09BE\u09B8",
							MM: "%d \u09AE\u09BE\u09B8",
							y: "\u098F\u0995 \u09AC\u099B\u09B0",
							yy: "%d \u09AC\u099B\u09B0"
						},
						preparse: function(r) {
							return r.replace(/[১২৩৪৫৬৭৮৯০]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
						meridiemHour: function(r, i) {
							return r === 12 && (r = 0), i === "\u09B0\u09BE\u09A4" && r >= 4 || i === "\u09A6\u09C1\u09AA\u09C1\u09B0" && r < 5 || i === "\u09AC\u09BF\u0995\u09BE\u09B2" ? r + 12 : r
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u09B0\u09BE\u09A4" : r < 10 ? "\u09B8\u0995\u09BE\u09B2" : r < 17 ? "\u09A6\u09C1\u09AA\u09C1\u09B0" : r < 20 ? "\u09AC\u09BF\u0995\u09BE\u09B2" : "\u09B0\u09BE\u09A4"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		443709: function(b, f, l) { //! moment.js locale configuration
			//! locale : Tibetan [bo]
			//! author : Thupten N. Chakrishar : https://github.com/vajradog
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0F21",
						2: "\u0F22",
						3: "\u0F23",
						4: "\u0F24",
						5: "\u0F25",
						6: "\u0F26",
						7: "\u0F27",
						8: "\u0F28",
						9: "\u0F29",
						0: "\u0F20"
					},
					s = {
						"\u0F21": "1",
						"\u0F22": "2",
						"\u0F23": "3",
						"\u0F24": "4",
						"\u0F25": "5",
						"\u0F26": "6",
						"\u0F27": "7",
						"\u0F28": "8",
						"\u0F29": "9",
						"\u0F20": "0"
					},
					n = o.defineLocale("bo", {
						months: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54".split("_"),
						monthsShort: "\u0F5F\u0FB3\u0F0B1_\u0F5F\u0FB3\u0F0B2_\u0F5F\u0FB3\u0F0B3_\u0F5F\u0FB3\u0F0B4_\u0F5F\u0FB3\u0F0B5_\u0F5F\u0FB3\u0F0B6_\u0F5F\u0FB3\u0F0B7_\u0F5F\u0FB3\u0F0B8_\u0F5F\u0FB3\u0F0B9_\u0F5F\u0FB3\u0F0B10_\u0F5F\u0FB3\u0F0B11_\u0F5F\u0FB3\u0F0B12".split("_"),
						monthsShortRegex: /^(ཟླ་\d{1,2})/,
						monthsParseExact: !0,
						weekdays: "\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"),
						weekdaysShort: "\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"),
						weekdaysMin: "\u0F49\u0F72_\u0F5F\u0FB3_\u0F58\u0F72\u0F42_\u0F63\u0FB7\u0F42_\u0F55\u0F74\u0F62_\u0F66\u0F44\u0F66_\u0F66\u0FA4\u0F7A\u0F53".split("_"),
						longDateFormat: {
							LT: "A h:mm",
							LTS: "A h:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm",
							LLLL: "dddd, D MMMM YYYY, A h:mm"
						},
						calendar: {
							sameDay: "[\u0F51\u0F72\u0F0B\u0F62\u0F72\u0F44] LT",
							nextDay: "[\u0F66\u0F44\u0F0B\u0F49\u0F72\u0F53] LT",
							nextWeek: "[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F62\u0F97\u0F7A\u0F66\u0F0B\u0F58], LT",
							lastDay: "[\u0F41\u0F0B\u0F66\u0F44] LT",
							lastWeek: "[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F58\u0F50\u0F60\u0F0B\u0F58] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0F63\u0F0B",
							past: "%s \u0F66\u0F94\u0F53\u0F0B\u0F63",
							s: "\u0F63\u0F58\u0F0B\u0F66\u0F44",
							ss: "%d \u0F66\u0F90\u0F62\u0F0B\u0F46\u0F0D",
							m: "\u0F66\u0F90\u0F62\u0F0B\u0F58\u0F0B\u0F42\u0F45\u0F72\u0F42",
							mm: "%d \u0F66\u0F90\u0F62\u0F0B\u0F58",
							h: "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51\u0F0B\u0F42\u0F45\u0F72\u0F42",
							hh: "%d \u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51",
							d: "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F45\u0F72\u0F42",
							dd: "%d \u0F49\u0F72\u0F53\u0F0B",
							M: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F45\u0F72\u0F42",
							MM: "%d \u0F5F\u0FB3\u0F0B\u0F56",
							y: "\u0F63\u0F7C\u0F0B\u0F42\u0F45\u0F72\u0F42",
							yy: "%d \u0F63\u0F7C"
						},
						preparse: function(r) {
							return r.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
						meridiemHour: function(r, i) {
							return r === 12 && (r = 0), i === "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C" && r >= 4 || i === "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F74\u0F44" && r < 5 || i === "\u0F51\u0F42\u0F7C\u0F44\u0F0B\u0F51\u0F42" ? r + 12 : r
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C" : r < 10 ? "\u0F5E\u0F7C\u0F42\u0F66\u0F0B\u0F40\u0F66" : r < 17 ? "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F74\u0F44" : r < 20 ? "\u0F51\u0F42\u0F7C\u0F44\u0F0B\u0F51\u0F42" : "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		995416: function(b, f, l) { //! moment.js locale configuration
			//! locale : Breton [br]
			//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(T, G, k0) {
					var m0 = {
						mm: "munutenn",
						MM: "miz",
						dd: "devezh"
					};
					return T + " " + r(m0[k0], T)
				}

				function s(T) {
					switch (n(T)) {
						case 1:
						case 3:
						case 4:
						case 5:
						case 9:
							return T + " bloaz";
						default:
							return T + " vloaz"
					}
				}

				function n(T) {
					return T > 9 ? n(T % 10) : T
				}

				function r(T, G) {
					return G === 2 ? i(T) : T
				}

				function i(T) {
					var G = {
						m: "v",
						b: "v",
						d: "z"
					};
					return G[T.charAt(0)] === void 0 ? T : G[T.charAt(0)] + T.substring(1)
				}
				var d = [/^gen/i, /^c[ʼ\']hwe/i, /^meu/i, /^ebr/i, /^mae/i, /^(mez|eve)/i, /^gou/i, /^eos/i, /^gwe/i, /^her/i, /^du/i, /^ker/i],
					u = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
					m = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i,
					A = /^(gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
					W = [/^sul/i, /^lun/i, /^meurzh/i, /^merc[ʼ\']her/i, /^yaou/i, /^gwener/i, /^sadorn/i],
					q = [/^Sul/i, /^Lun/i, /^Meu/i, /^Mer/i, /^Yao/i, /^Gwe/i, /^Sad/i],
					g = [/^Su/i, /^Lu/i, /^Me([^r]|$)/i, /^Mer/i, /^Ya/i, /^Gw/i, /^Sa/i],
					r0 = o.defineLocale("br", {
						months: "Genver_C\u02BChwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
						monthsShort: "Gen_C\u02BChwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
						weekdays: "Sul_Lun_Meurzh_Merc\u02BCher_Yaou_Gwener_Sadorn".split("_"),
						weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
						weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
						weekdaysParse: g,
						fullWeekdaysParse: W,
						shortWeekdaysParse: q,
						minWeekdaysParse: g,
						monthsRegex: u,
						monthsShortRegex: u,
						monthsStrictRegex: m,
						monthsShortStrictRegex: A,
						monthsParse: d,
						longMonthsParse: d,
						shortMonthsParse: d,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D [a viz] MMMM YYYY",
							LLL: "D [a viz] MMMM YYYY HH:mm",
							LLLL: "dddd, D [a viz] MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[Hiziv da] LT",
							nextDay: "[Warc\u02BChoazh da] LT",
							nextWeek: "dddd [da] LT",
							lastDay: "[Dec\u02BCh da] LT",
							lastWeek: "dddd [paset da] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "a-benn %s",
							past: "%s \u02BCzo",
							s: "un nebeud segondenno\xF9",
							ss: "%d eilenn",
							m: "ur vunutenn",
							mm: t,
							h: "un eur",
							hh: "%d eur",
							d: "un devezh",
							dd: t,
							M: "ur miz",
							MM: t,
							y: "ur bloaz",
							yy: s
						},
						dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
						ordinal: function(T) {
							var G = T === 1 ? "a\xF1" : "vet";
							return T + G
						},
						week: {
							dow: 1,
							doy: 4
						},
						meridiemParse: /a.m.|g.m./,
						isPM: function(T) {
							return T === "g.m."
						},
						meridiem: function(T, G, k0) {
							return T < 12 ? "a.m." : "g.m."
						}
					});
				return r0
			})
		},
		202429: function(b, f, l) { //! moment.js locale configuration
			//! locale : Bosnian [bs]
			//! author : Nedim Cholich : https://github.com/frontyard
			//! based on (hr) translation by Bojan Marković
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i) {
					var d = n + " ";
					switch (i) {
						case "ss":
							return n === 1 ? d += "sekunda" : n === 2 || n === 3 || n === 4 ? d += "sekunde" : d += "sekundi", d;
						case "m":
							return r ? "jedna minuta" : "jedne minute";
						case "mm":
							return n === 1 ? d += "minuta" : n === 2 || n === 3 || n === 4 ? d += "minute" : d += "minuta", d;
						case "h":
							return r ? "jedan sat" : "jednog sata";
						case "hh":
							return n === 1 ? d += "sat" : n === 2 || n === 3 || n === 4 ? d += "sata" : d += "sati", d;
						case "dd":
							return n === 1 ? d += "dan" : d += "dana", d;
						case "MM":
							return n === 1 ? d += "mjesec" : n === 2 || n === 3 || n === 4 ? d += "mjeseca" : d += "mjeseci", d;
						case "yy":
							return n === 1 ? d += "godina" : n === 2 || n === 3 || n === 4 ? d += "godine" : d += "godina", d
					}
				}
				var s = o.defineLocale("bs", {
					months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
					monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
					weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
					weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm",
						LLLL: "dddd, D. MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[danas u] LT",
						nextDay: "[sutra u] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[u] [nedjelju] [u] LT";
								case 3:
									return "[u] [srijedu] [u] LT";
								case 6:
									return "[u] [subotu] [u] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[u] dddd [u] LT"
							}
						},
						lastDay: "[ju\u010Der u] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
								case 3:
									return "[pro\u0161lu] dddd [u] LT";
								case 6:
									return "[pro\u0161le] [subote] [u] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[pro\u0161li] dddd [u] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "za %s",
						past: "prije %s",
						s: "par sekundi",
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: "dan",
						dd: t,
						M: "mjesec",
						MM: t,
						y: "godinu",
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return s
			})
		},
		873026: function(b, f, l) { //! moment.js locale configuration
			//! locale : Catalan [ca]
			//! author : Juan G. Hurtado : https://github.com/juanghurtado
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ca", {
					months: {
						standalone: "gener_febrer_mar\xE7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
						format: "de gener_de febrer_de mar\xE7_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),
						isFormat: /D[oD]?(\s)+MMMM/
					},
					monthsShort: "gen._febr._mar\xE7_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),
					monthsParseExact: !0,
					weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
					weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
					weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM [de] YYYY",
						ll: "D MMM YYYY",
						LLL: "D MMMM [de] YYYY [a les] H:mm",
						lll: "D MMM YYYY, H:mm",
						LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
						llll: "ddd D MMM YYYY, H:mm"
					},
					calendar: {
						sameDay: function() {
							return "[avui a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
						},
						nextDay: function() {
							return "[dem\xE0 a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
						},
						nextWeek: function() {
							return "dddd [a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
						},
						lastDay: function() {
							return "[ahir a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
						},
						lastWeek: function() {
							return "[el] dddd [passat a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "d'aqu\xED %s",
						past: "fa %s",
						s: "uns segons",
						ss: "%d segons",
						m: "un minut",
						mm: "%d minuts",
						h: "una hora",
						hh: "%d hores",
						d: "un dia",
						dd: "%d dies",
						M: "un mes",
						MM: "%d mesos",
						y: "un any",
						yy: "%d anys"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
					ordinal: function(s, n) {
						var r = s === 1 ? "r" : s === 2 ? "n" : s === 3 ? "r" : s === 4 ? "t" : "\xE8";
						return (n === "w" || n === "W") && (r = "a"), s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		480496: function(b, f, l) { //! moment.js locale configuration
			//! locale : Czech [cs]
			//! author : petrbela : https://github.com/petrbela
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						format: "leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec".split("_"),
						standalone: "ledna_\xFAnora_b\u0159ezna_dubna_kv\u011Btna_\u010Dervna_\u010Dervence_srpna_z\xE1\u0159\xED_\u0159\xEDjna_listopadu_prosince".split("_")
					},
					s = "led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro".split("_"),
					n = [/^led/i, /^úno/i, /^bře/i, /^dub/i, /^kvě/i, /^(čvn|červen$|června)/i, /^(čvc|červenec|července)/i, /^srp/i, /^zář/i, /^říj/i, /^lis/i, /^pro/i],
					r = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;

				function i(m) {
					return m > 1 && m < 5 && ~~(m / 10) != 1
				}

				function d(m, A, W, q) {
					var g = m + " ";
					switch (W) {
						case "s":
							return A || q ? "p\xE1r sekund" : "p\xE1r sekundami";
						case "ss":
							return A || q ? g + (i(m) ? "sekundy" : "sekund") : g + "sekundami";
						case "m":
							return A ? "minuta" : q ? "minutu" : "minutou";
						case "mm":
							return A || q ? g + (i(m) ? "minuty" : "minut") : g + "minutami";
						case "h":
							return A ? "hodina" : q ? "hodinu" : "hodinou";
						case "hh":
							return A || q ? g + (i(m) ? "hodiny" : "hodin") : g + "hodinami";
						case "d":
							return A || q ? "den" : "dnem";
						case "dd":
							return A || q ? g + (i(m) ? "dny" : "dn\xED") : g + "dny";
						case "M":
							return A || q ? "m\u011Bs\xEDc" : "m\u011Bs\xEDcem";
						case "MM":
							return A || q ? g + (i(m) ? "m\u011Bs\xEDce" : "m\u011Bs\xEDc\u016F") : g + "m\u011Bs\xEDci";
						case "y":
							return A || q ? "rok" : "rokem";
						case "yy":
							return A || q ? g + (i(m) ? "roky" : "let") : g + "lety"
					}
				}
				var u = o.defineLocale("cs", {
					months: t,
					monthsShort: s,
					monthsRegex: r,
					monthsShortRegex: r,
					monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i,
					monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i,
					monthsParse: n,
					longMonthsParse: n,
					shortMonthsParse: n,
					weekdays: "ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota".split("_"),
					weekdaysShort: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
					weekdaysMin: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm",
						LLLL: "dddd D. MMMM YYYY H:mm",
						l: "D. M. YYYY"
					},
					calendar: {
						sameDay: "[dnes v] LT",
						nextDay: "[z\xEDtra v] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[v ned\u011Bli v] LT";
								case 1:
								case 2:
									return "[v] dddd [v] LT";
								case 3:
									return "[ve st\u0159edu v] LT";
								case 4:
									return "[ve \u010Dtvrtek v] LT";
								case 5:
									return "[v p\xE1tek v] LT";
								case 6:
									return "[v sobotu v] LT"
							}
						},
						lastDay: "[v\u010Dera v] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[minulou ned\u011Bli v] LT";
								case 1:
								case 2:
									return "[minul\xE9] dddd [v] LT";
								case 3:
									return "[minulou st\u0159edu v] LT";
								case 4:
								case 5:
									return "[minul\xFD] dddd [v] LT";
								case 6:
									return "[minulou sobotu v] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "za %s",
						past: "p\u0159ed %s",
						s: d,
						ss: d,
						m: d,
						mm: d,
						h: d,
						hh: d,
						d: d,
						dd: d,
						M: d,
						MM: d,
						y: d,
						yy: d
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return u
			})
		},
		168127: function(b, f, l) { //! moment.js locale configuration
			//! locale : Chuvash [cv]
			//! author : Anatoly Mironov : https://github.com/mirontoli
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("cv", {
					months: "\u043A\u04D1\u0440\u043B\u0430\u0447_\u043D\u0430\u0440\u04D1\u0441_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440\u0442\u043C\u0435_\u0443\u0442\u04D1_\u04AB\u0443\u0440\u043B\u0430_\u0430\u0432\u04D1\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),
					monthsShort: "\u043A\u04D1\u0440_\u043D\u0430\u0440_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440_\u0443\u0442\u04D1_\u04AB\u0443\u0440_\u0430\u0432\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448".split("_"),
					weekdays: "\u0432\u044B\u0440\u0441\u0430\u0440\u043D\u0438\u043A\u0443\u043D_\u0442\u0443\u043D\u0442\u0438\u043A\u0443\u043D_\u044B\u0442\u043B\u0430\u0440\u0438\u043A\u0443\u043D_\u044E\u043D\u043A\u0443\u043D_\u043A\u04D7\u04AB\u043D\u0435\u0440\u043D\u0438\u043A\u0443\u043D_\u044D\u0440\u043D\u0435\u043A\u0443\u043D_\u0448\u04D1\u043C\u0430\u0442\u043A\u0443\u043D".split("_"),
					weekdaysShort: "\u0432\u044B\u0440_\u0442\u0443\u043D_\u044B\u0442\u043B_\u044E\u043D_\u043A\u04D7\u04AB_\u044D\u0440\u043D_\u0448\u04D1\u043C".split("_"),
					weekdaysMin: "\u0432\u0440_\u0442\u043D_\u044B\u0442_\u044E\u043D_\u043A\u04AB_\u044D\u0440_\u0448\u043C".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD-MM-YYYY",
						LL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7]",
						LLL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm",
						LLLL: "dddd, YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm"
					},
					calendar: {
						sameDay: "[\u041F\u0430\u044F\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
						nextDay: "[\u042B\u0440\u0430\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
						lastDay: "[\u04D6\u043D\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
						nextWeek: "[\u04AA\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
						lastWeek: "[\u0418\u0440\u0442\u043D\u04D7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
						sameElse: "L"
					},
					relativeTime: {
						future: function(s) {
							var n = /сехет$/i.exec(s) ? "\u0440\u0435\u043D" : /ҫул$/i.exec(s) ? "\u0442\u0430\u043D" : "\u0440\u0430\u043D";
							return s + n
						},
						past: "%s \u043A\u0430\u044F\u043B\u043B\u0430",
						s: "\u043F\u04D7\u0440-\u0438\u043A \u04AB\u0435\u043A\u043A\u0443\u043D\u0442",
						ss: "%d \u04AB\u0435\u043A\u043A\u0443\u043D\u0442",
						m: "\u043F\u04D7\u0440 \u043C\u0438\u043D\u0443\u0442",
						mm: "%d \u043C\u0438\u043D\u0443\u0442",
						h: "\u043F\u04D7\u0440 \u0441\u0435\u0445\u0435\u0442",
						hh: "%d \u0441\u0435\u0445\u0435\u0442",
						d: "\u043F\u04D7\u0440 \u043A\u0443\u043D",
						dd: "%d \u043A\u0443\u043D",
						M: "\u043F\u04D7\u0440 \u0443\u0439\u04D1\u0445",
						MM: "%d \u0443\u0439\u04D1\u0445",
						y: "\u043F\u04D7\u0440 \u04AB\u0443\u043B",
						yy: "%d \u04AB\u0443\u043B"
					},
					dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
					ordinal: "%d-\u043C\u04D7\u0448",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		374442: function(b, f, l) { //! moment.js locale configuration
			//! locale : Welsh [cy]
			//! author : Robert Allen : https://github.com/robgallen
			//! author : https://github.com/ryangreaves
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("cy", {
					months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
					monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
					weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
					weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
					weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Heddiw am] LT",
						nextDay: "[Yfory am] LT",
						nextWeek: "dddd [am] LT",
						lastDay: "[Ddoe am] LT",
						lastWeek: "dddd [diwethaf am] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "mewn %s",
						past: "%s yn \xF4l",
						s: "ychydig eiliadau",
						ss: "%d eiliad",
						m: "munud",
						mm: "%d munud",
						h: "awr",
						hh: "%d awr",
						d: "diwrnod",
						dd: "%d diwrnod",
						M: "mis",
						MM: "%d mis",
						y: "blwyddyn",
						yy: "%d flynedd"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
					ordinal: function(s) {
						var n = s,
							r = "",
							i = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
						return n > 20 ? n === 40 || n === 50 || n === 60 || n === 80 || n === 100 ? r = "fed" : r = "ain" : n > 0 && (r = i[n]), s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		861343: function(b, f, l) { //! moment.js locale configuration
			//! locale : Danish [da]
			//! author : Ulrik Nielsen : https://github.com/mrbase
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("da", {
					months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
					monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
					weekdays: "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
					weekdaysShort: "s\xF8n_man_tir_ons_tor_fre_l\xF8r".split("_"),
					weekdaysMin: "s\xF8_ma_ti_on_to_fr_l\xF8".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY HH:mm",
						LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
					},
					calendar: {
						sameDay: "[i dag kl.] LT",
						nextDay: "[i morgen kl.] LT",
						nextWeek: "p\xE5 dddd [kl.] LT",
						lastDay: "[i g\xE5r kl.] LT",
						lastWeek: "[i] dddd[s kl.] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "om %s",
						past: "%s siden",
						s: "f\xE5 sekunder",
						ss: "%d sekunder",
						m: "et minut",
						mm: "%d minutter",
						h: "en time",
						hh: "%d timer",
						d: "en dag",
						dd: "%d dage",
						M: "en m\xE5ned",
						MM: "%d m\xE5neder",
						y: "et \xE5r",
						yy: "%d \xE5r"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		569955: function(b, f, l) { //! moment.js locale configuration
			//! locale : German (Austria) [de-at]
			//! author : lluchs : https://github.com/lluchs
			//! author: Menelion Elensúle: https://github.com/Oire
			//! author : Martin Groller : https://github.com/MadMG
			//! author : Mikolaj Dadela : https://github.com/mik01aj
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						m: ["eine Minute", "einer Minute"],
						h: ["eine Stunde", "einer Stunde"],
						d: ["ein Tag", "einem Tag"],
						dd: [n + " Tage", n + " Tagen"],
						w: ["eine Woche", "einer Woche"],
						M: ["ein Monat", "einem Monat"],
						MM: [n + " Monate", n + " Monaten"],
						y: ["ein Jahr", "einem Jahr"],
						yy: [n + " Jahre", n + " Jahren"]
					};
					return r ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("de-at", {
					months: "J\xE4nner_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
					monthsShort: "J\xE4n._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
					monthsParseExact: !0,
					weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
					weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
					weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY HH:mm",
						LLLL: "dddd, D. MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[heute um] LT [Uhr]",
						sameElse: "L",
						nextDay: "[morgen um] LT [Uhr]",
						nextWeek: "dddd [um] LT [Uhr]",
						lastDay: "[gestern um] LT [Uhr]",
						lastWeek: "[letzten] dddd [um] LT [Uhr]"
					},
					relativeTime: {
						future: "in %s",
						past: "vor %s",
						s: "ein paar Sekunden",
						ss: "%d Sekunden",
						m: t,
						mm: "%d Minuten",
						h: t,
						hh: "%d Stunden",
						d: t,
						dd: t,
						w: t,
						ww: "%d Wochen",
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return s
			})
		},
		99807: function(b, f, l) { //! moment.js locale configuration
			//! locale : German (Switzerland) [de-ch]
			//! author : sschueller : https://github.com/sschueller
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						m: ["eine Minute", "einer Minute"],
						h: ["eine Stunde", "einer Stunde"],
						d: ["ein Tag", "einem Tag"],
						dd: [n + " Tage", n + " Tagen"],
						w: ["eine Woche", "einer Woche"],
						M: ["ein Monat", "einem Monat"],
						MM: [n + " Monate", n + " Monaten"],
						y: ["ein Jahr", "einem Jahr"],
						yy: [n + " Jahre", n + " Jahren"]
					};
					return r ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("de-ch", {
					months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
					monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
					monthsParseExact: !0,
					weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
					weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
					weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY HH:mm",
						LLLL: "dddd, D. MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[heute um] LT [Uhr]",
						sameElse: "L",
						nextDay: "[morgen um] LT [Uhr]",
						nextWeek: "dddd [um] LT [Uhr]",
						lastDay: "[gestern um] LT [Uhr]",
						lastWeek: "[letzten] dddd [um] LT [Uhr]"
					},
					relativeTime: {
						future: "in %s",
						past: "vor %s",
						s: "ein paar Sekunden",
						ss: "%d Sekunden",
						m: t,
						mm: "%d Minuten",
						h: t,
						hh: "%d Stunden",
						d: t,
						dd: t,
						w: t,
						ww: "%d Wochen",
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return s
			})
		},
		432123: function(b, f, l) { //! moment.js locale configuration
			//! locale : German [de]
			//! author : lluchs : https://github.com/lluchs
			//! author: Menelion Elensúle: https://github.com/Oire
			//! author : Mikolaj Dadela : https://github.com/mik01aj
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						m: ["eine Minute", "einer Minute"],
						h: ["eine Stunde", "einer Stunde"],
						d: ["ein Tag", "einem Tag"],
						dd: [n + " Tage", n + " Tagen"],
						w: ["eine Woche", "einer Woche"],
						M: ["ein Monat", "einem Monat"],
						MM: [n + " Monate", n + " Monaten"],
						y: ["ein Jahr", "einem Jahr"],
						yy: [n + " Jahre", n + " Jahren"]
					};
					return r ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("de", {
					months: "Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
					monthsShort: "Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
					monthsParseExact: !0,
					weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
					weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
					weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY HH:mm",
						LLLL: "dddd, D. MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[heute um] LT [Uhr]",
						sameElse: "L",
						nextDay: "[morgen um] LT [Uhr]",
						nextWeek: "dddd [um] LT [Uhr]",
						lastDay: "[gestern um] LT [Uhr]",
						lastWeek: "[letzten] dddd [um] LT [Uhr]"
					},
					relativeTime: {
						future: "in %s",
						past: "vor %s",
						s: "ein paar Sekunden",
						ss: "%d Sekunden",
						m: t,
						mm: "%d Minuten",
						h: t,
						hh: "%d Stunden",
						d: t,
						dd: t,
						w: t,
						ww: "%d Wochen",
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return s
			})
		},
		4074: function(b, f, l) { //! moment.js locale configuration
			//! locale : Maldivian [dv]
			//! author : Jawish Hameed : https://github.com/jawish
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = ["\u0796\u07AC\u0782\u07AA\u0787\u07A6\u0783\u07A9", "\u078A\u07AC\u0784\u07B0\u0783\u07AA\u0787\u07A6\u0783\u07A9", "\u0789\u07A7\u0783\u07A8\u0797\u07AA", "\u0787\u07AD\u0795\u07B0\u0783\u07A9\u078D\u07AA", "\u0789\u07AD", "\u0796\u07AB\u0782\u07B0", "\u0796\u07AA\u078D\u07A6\u0787\u07A8", "\u0787\u07AF\u078E\u07A6\u0790\u07B0\u0793\u07AA", "\u0790\u07AC\u0795\u07B0\u0793\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA", "\u0787\u07AE\u0786\u07B0\u0793\u07AF\u0784\u07A6\u0783\u07AA", "\u0782\u07AE\u0788\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA", "\u0791\u07A8\u0790\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA"],
					s = ["\u0787\u07A7\u078B\u07A8\u0787\u07B0\u078C\u07A6", "\u0780\u07AF\u0789\u07A6", "\u0787\u07A6\u0782\u07B0\u078E\u07A7\u0783\u07A6", "\u0784\u07AA\u078B\u07A6", "\u0784\u07AA\u0783\u07A7\u0790\u07B0\u078A\u07A6\u078C\u07A8", "\u0780\u07AA\u0786\u07AA\u0783\u07AA", "\u0780\u07AE\u0782\u07A8\u0780\u07A8\u0783\u07AA"],
					n = o.defineLocale("dv", {
						months: t,
						monthsShort: t,
						weekdays: s,
						weekdaysShort: s,
						weekdaysMin: "\u0787\u07A7\u078B\u07A8_\u0780\u07AF\u0789\u07A6_\u0787\u07A6\u0782\u07B0_\u0784\u07AA\u078B\u07A6_\u0784\u07AA\u0783\u07A7_\u0780\u07AA\u0786\u07AA_\u0780\u07AE\u0782\u07A8".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "D/M/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						meridiemParse: /މކ|މފ/,
						isPM: function(r) {
							return r === "\u0789\u078A"
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u0789\u0786" : "\u0789\u078A"
						},
						calendar: {
							sameDay: "[\u0789\u07A8\u0787\u07A6\u078B\u07AA] LT",
							nextDay: "[\u0789\u07A7\u078B\u07A6\u0789\u07A7] LT",
							nextWeek: "dddd LT",
							lastDay: "[\u0787\u07A8\u0787\u07B0\u0794\u07AC] LT",
							lastWeek: "[\u078A\u07A7\u0787\u07A8\u078C\u07AA\u0788\u07A8] dddd LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u078C\u07AC\u0783\u07AD\u078E\u07A6\u0787\u07A8 %s",
							past: "\u0786\u07AA\u0783\u07A8\u0782\u07B0 %s",
							s: "\u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA\u0786\u07AE\u0785\u07AC\u0787\u07B0",
							ss: "d% \u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA",
							m: "\u0789\u07A8\u0782\u07A8\u0793\u07AC\u0787\u07B0",
							mm: "\u0789\u07A8\u0782\u07A8\u0793\u07AA %d",
							h: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AC\u0787\u07B0",
							hh: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AA %d",
							d: "\u078B\u07AA\u0788\u07A6\u0780\u07AC\u0787\u07B0",
							dd: "\u078B\u07AA\u0788\u07A6\u0790\u07B0 %d",
							M: "\u0789\u07A6\u0780\u07AC\u0787\u07B0",
							MM: "\u0789\u07A6\u0790\u07B0 %d",
							y: "\u0787\u07A6\u0780\u07A6\u0783\u07AC\u0787\u07B0",
							yy: "\u0787\u07A6\u0780\u07A6\u0783\u07AA %d"
						},
						preparse: function(r) {
							return r.replace(/،/g, ",")
						},
						postformat: function(r) {
							return r.replace(/,/g, "\u060C")
						},
						week: {
							dow: 7,
							doy: 12
						}
					});
				return n
			})
		},
		759782: function(b, f, l) { //! moment.js locale configuration
			//! locale : Greek [el]
			//! author : Aggelos Karalias : https://github.com/mehiel
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n) {
					return typeof Function != "undefined" && n instanceof Function || Object.prototype.toString.call(n) === "[object Function]"
				}
				var s = o.defineLocale("el", {
					monthsNominativeEl: "\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2_\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2_\u039C\u03AC\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2_\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2_\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2_\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2".split("_"),
					monthsGenitiveEl: "\u0399\u03B1\u03BD\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u039C\u03B1\u03C1\u03C4\u03AF\u03BF\u03C5_\u0391\u03C0\u03C1\u03B9\u03BB\u03AF\u03BF\u03C5_\u039C\u03B1\u0390\u03BF\u03C5_\u0399\u03BF\u03C5\u03BD\u03AF\u03BF\u03C5_\u0399\u03BF\u03C5\u03BB\u03AF\u03BF\u03C5_\u0391\u03C5\u03B3\u03BF\u03CD\u03C3\u03C4\u03BF\u03C5_\u03A3\u03B5\u03C0\u03C4\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u039F\u03BA\u03C4\u03C9\u03B2\u03C1\u03AF\u03BF\u03C5_\u039D\u03BF\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u0394\u03B5\u03BA\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5".split("_"),
					months: function(n, r) {
						return n ? typeof r == "string" && /D/.test(r.substring(0, r.indexOf("MMMM"))) ? this._monthsGenitiveEl[n.month()] : this._monthsNominativeEl[n.month()] : this._monthsNominativeEl
					},
					monthsShort: "\u0399\u03B1\u03BD_\u03A6\u03B5\u03B2_\u039C\u03B1\u03C1_\u0391\u03C0\u03C1_\u039C\u03B1\u03CA_\u0399\u03BF\u03C5\u03BD_\u0399\u03BF\u03C5\u03BB_\u0391\u03C5\u03B3_\u03A3\u03B5\u03C0_\u039F\u03BA\u03C4_\u039D\u03BF\u03B5_\u0394\u03B5\u03BA".split("_"),
					weekdays: "\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE_\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1_\u03A4\u03C1\u03AF\u03C4\u03B7_\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7_\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7_\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE_\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF".split("_"),
					weekdaysShort: "\u039A\u03C5\u03C1_\u0394\u03B5\u03C5_\u03A4\u03C1\u03B9_\u03A4\u03B5\u03C4_\u03A0\u03B5\u03BC_\u03A0\u03B1\u03C1_\u03A3\u03B1\u03B2".split("_"),
					weekdaysMin: "\u039A\u03C5_\u0394\u03B5_\u03A4\u03C1_\u03A4\u03B5_\u03A0\u03B5_\u03A0\u03B1_\u03A3\u03B1".split("_"),
					meridiem: function(n, r, i) {
						return n > 11 ? i ? "\u03BC\u03BC" : "\u039C\u039C" : i ? "\u03C0\u03BC" : "\u03A0\u039C"
					},
					isPM: function(n) {
						return (n + "").toLowerCase()[0] === "\u03BC"
					},
					meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendarEl: {
						sameDay: "[\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1 {}] LT",
						nextDay: "[\u0391\u03CD\u03C1\u03B9\u03BF {}] LT",
						nextWeek: "dddd [{}] LT",
						lastDay: "[\u03A7\u03B8\u03B5\u03C2 {}] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 6:
									return "[\u03C4\u03BF \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF] dddd [{}] LT";
								default:
									return "[\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7] dddd [{}] LT"
							}
						},
						sameElse: "L"
					},
					calendar: function(n, r) {
						var i = this._calendarEl[n],
							d = r && r.hours();
						return t(i) && (i = i.apply(r)), i.replace("{}", d % 12 == 1 ? "\u03C3\u03C4\u03B7" : "\u03C3\u03C4\u03B9\u03C2")
					},
					relativeTime: {
						future: "\u03C3\u03B5 %s",
						past: "%s \u03C0\u03C1\u03B9\u03BD",
						s: "\u03BB\u03AF\u03B3\u03B1 \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",
						ss: "%d \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",
						m: "\u03AD\u03BD\u03B1 \u03BB\u03B5\u03C0\u03C4\u03CC",
						mm: "%d \u03BB\u03B5\u03C0\u03C4\u03AC",
						h: "\u03BC\u03AF\u03B1 \u03CE\u03C1\u03B1",
						hh: "%d \u03CE\u03C1\u03B5\u03C2",
						d: "\u03BC\u03AF\u03B1 \u03BC\u03AD\u03C1\u03B1",
						dd: "%d \u03BC\u03AD\u03C1\u03B5\u03C2",
						M: "\u03AD\u03BD\u03B1\u03C2 \u03BC\u03AE\u03BD\u03B1\u03C2",
						MM: "%d \u03BC\u03AE\u03BD\u03B5\u03C2",
						y: "\u03AD\u03BD\u03B1\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C2",
						yy: "%d \u03C7\u03C1\u03CC\u03BD\u03B9\u03B1"
					},
					dayOfMonthOrdinalParse: /\d{1,2}η/,
					ordinal: "%d\u03B7",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return s
			})
		},
		550298: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (Australia) [en-au]
			//! author : Jared Morse : https://github.com/jarcoal
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-au", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 0,
						doy: 4
					}
				});
				return t
			})
		},
		894955: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (Canada) [en-ca]
			//! author : Jonathan Abourbih : https://github.com/jonbca
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-ca", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "YYYY-MM-DD",
						LL: "MMMM D, YYYY",
						LLL: "MMMM D, YYYY h:mm A",
						LLLL: "dddd, MMMM D, YYYY h:mm A"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					}
				});
				return t
			})
		},
		983122: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (United Kingdom) [en-gb]
			//! author : Chris Gedrim : https://github.com/chrisgedrim
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-gb", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		14675: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (Ireland) [en-ie]
			//! author : Chris Cartlidge : https://github.com/chriscartlidge
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-ie", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		23951: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (Israel) [en-il]
			//! author : Chris Gedrim : https://github.com/chrisgedrim
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-il", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					}
				});
				return t
			})
		},
		458478: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (India) [en-in]
			//! author : Jatin Agrawal : https://github.com/jatinag22
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-in", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 0,
						doy: 6
					}
				});
				return t
			})
		},
		725518: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (New Zealand) [en-nz]
			//! author : Luke McGregor : https://github.com/lukemcgregor
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-nz", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		734124: function(b, f, l) { //! moment.js locale configuration
			//! locale : English (Singapore) [en-sg]
			//! author : Matthew Castrillon-Madrigal : https://github.com/techdimension
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("en-sg", {
					months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		886147: function(b, f, l) { //! moment.js locale configuration
			//! locale : Esperanto [eo]
			//! author : Colin Dean : https://github.com/colindean
			//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
			//! comment : miestasmia corrected the translation by colindean
			//! comment : Vivakvo corrected the translation by colindean and miestasmia
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("eo", {
					months: "januaro_februaro_marto_aprilo_majo_junio_julio_a\u016Dgusto_septembro_oktobro_novembro_decembro".split("_"),
					monthsShort: "jan_feb_mart_apr_maj_jun_jul_a\u016Dg_sept_okt_nov_dec".split("_"),
					weekdays: "diman\u0109o_lundo_mardo_merkredo_\u0135a\u016Ddo_vendredo_sabato".split("_"),
					weekdaysShort: "dim_lun_mard_merk_\u0135a\u016D_ven_sab".split("_"),
					weekdaysMin: "di_lu_ma_me_\u0135a_ve_sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "[la] D[-an de] MMMM, YYYY",
						LLL: "[la] D[-an de] MMMM, YYYY HH:mm",
						LLLL: "dddd[n], [la] D[-an de] MMMM, YYYY HH:mm",
						llll: "ddd, [la] D[-an de] MMM, YYYY HH:mm"
					},
					meridiemParse: /[ap]\.t\.m/i,
					isPM: function(s) {
						return s.charAt(0).toLowerCase() === "p"
					},
					meridiem: function(s, n, r) {
						return s > 11 ? r ? "p.t.m." : "P.T.M." : r ? "a.t.m." : "A.T.M."
					},
					calendar: {
						sameDay: "[Hodia\u016D je] LT",
						nextDay: "[Morga\u016D je] LT",
						nextWeek: "dddd[n je] LT",
						lastDay: "[Hiera\u016D je] LT",
						lastWeek: "[pasintan] dddd[n je] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "post %s",
						past: "anta\u016D %s",
						s: "kelkaj sekundoj",
						ss: "%d sekundoj",
						m: "unu minuto",
						mm: "%d minutoj",
						h: "unu horo",
						hh: "%d horoj",
						d: "unu tago",
						dd: "%d tagoj",
						M: "unu monato",
						MM: "%d monatoj",
						y: "unu jaro",
						yy: "%d jaroj"
					},
					dayOfMonthOrdinalParse: /\d{1,2}a/,
					ordinal: "%da",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		9576: function(b, f, l) { //! moment.js locale configuration
			//! locale : Spanish (Dominican Republic) [es-do]
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
					s = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
					n = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
					r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
					i = o.defineLocale("es-do", {
						months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
						monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
						weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
						weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "h:mm A",
							LTS: "h:mm:ss A",
							L: "DD/MM/YYYY",
							LL: "D [de] MMMM [de] YYYY",
							LLL: "D [de] MMMM [de] YYYY h:mm A",
							LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
						},
						calendar: {
							sameDay: function() {
								return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextDay: function() {
								return "[ma\xF1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextWeek: function() {
								return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastDay: function() {
								return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastWeek: function() {
								return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "hace %s",
							s: "unos segundos",
							ss: "%d segundos",
							m: "un minuto",
							mm: "%d minutos",
							h: "una hora",
							hh: "%d horas",
							d: "un d\xEDa",
							dd: "%d d\xEDas",
							w: "una semana",
							ww: "%d semanas",
							M: "un mes",
							MM: "%d meses",
							y: "un a\xF1o",
							yy: "%d a\xF1os"
						},
						dayOfMonthOrdinalParse: /\d{1,2}º/,
						ordinal: "%d\xBA",
						week: {
							dow: 1,
							doy: 4
						}
					});
				return i
			})
		},
		474432: function(b, f, l) { //! moment.js locale configuration
			//! locale : Spanish (Mexico) [es-mx]
			//! author : JC Franco : https://github.com/jcfranco
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
					s = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
					n = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
					r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
					i = o.defineLocale("es-mx", {
						months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
						monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
						weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
						weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D [de] MMMM [de] YYYY",
							LLL: "D [de] MMMM [de] YYYY H:mm",
							LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
						},
						calendar: {
							sameDay: function() {
								return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextDay: function() {
								return "[ma\xF1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextWeek: function() {
								return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastDay: function() {
								return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastWeek: function() {
								return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "hace %s",
							s: "unos segundos",
							ss: "%d segundos",
							m: "un minuto",
							mm: "%d minutos",
							h: "una hora",
							hh: "%d horas",
							d: "un d\xEDa",
							dd: "%d d\xEDas",
							w: "una semana",
							ww: "%d semanas",
							M: "un mes",
							MM: "%d meses",
							y: "un a\xF1o",
							yy: "%d a\xF1os"
						},
						dayOfMonthOrdinalParse: /\d{1,2}º/,
						ordinal: "%d\xBA",
						week: {
							dow: 0,
							doy: 4
						},
						invalidDate: "Fecha inv\xE1lida"
					});
				return i
			})
		},
		896405: function(b, f, l) { //! moment.js locale configuration
			//! locale : Spanish (United States) [es-us]
			//! author : bustta : https://github.com/bustta
			//! author : chrisrodz : https://github.com/chrisrodz
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
					s = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
					n = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
					r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
					i = o.defineLocale("es-us", {
						months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
						monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
						weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
						weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "h:mm A",
							LTS: "h:mm:ss A",
							L: "MM/DD/YYYY",
							LL: "D [de] MMMM [de] YYYY",
							LLL: "D [de] MMMM [de] YYYY h:mm A",
							LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
						},
						calendar: {
							sameDay: function() {
								return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextDay: function() {
								return "[ma\xF1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextWeek: function() {
								return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastDay: function() {
								return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastWeek: function() {
								return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "hace %s",
							s: "unos segundos",
							ss: "%d segundos",
							m: "un minuto",
							mm: "%d minutos",
							h: "una hora",
							hh: "%d horas",
							d: "un d\xEDa",
							dd: "%d d\xEDas",
							w: "una semana",
							ww: "%d semanas",
							M: "un mes",
							MM: "%d meses",
							y: "un a\xF1o",
							yy: "%d a\xF1os"
						},
						dayOfMonthOrdinalParse: /\d{1,2}º/,
						ordinal: "%d\xBA",
						week: {
							dow: 0,
							doy: 6
						}
					});
				return i
			})
		},
		146063: function(b, f, l) { //! moment.js locale configuration
			//! locale : Spanish [es]
			//! author : Julio Napurí : https://github.com/julionc
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
					s = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
					n = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
					r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
					i = o.defineLocale("es", {
						months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
						monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado".split("_"),
						weekdaysShort: "dom._lun._mar._mi\xE9._jue._vie._s\xE1b.".split("_"),
						weekdaysMin: "do_lu_ma_mi_ju_vi_s\xE1".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D [de] MMMM [de] YYYY",
							LLL: "D [de] MMMM [de] YYYY H:mm",
							LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
						},
						calendar: {
							sameDay: function() {
								return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextDay: function() {
								return "[ma\xF1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextWeek: function() {
								return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastDay: function() {
								return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastWeek: function() {
								return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "hace %s",
							s: "unos segundos",
							ss: "%d segundos",
							m: "un minuto",
							mm: "%d minutos",
							h: "una hora",
							hh: "%d horas",
							d: "un d\xEDa",
							dd: "%d d\xEDas",
							w: "una semana",
							ww: "%d semanas",
							M: "un mes",
							MM: "%d meses",
							y: "un a\xF1o",
							yy: "%d a\xF1os"
						},
						dayOfMonthOrdinalParse: /\d{1,2}º/,
						ordinal: "%d\xBA",
						week: {
							dow: 1,
							doy: 4
						},
						invalidDate: "Fecha inv\xE1lida"
					});
				return i
			})
		},
		132618: function(b, f, l) { //! moment.js locale configuration
			//! locale : Estonian [et]
			//! author : Henry Kehlmann : https://github.com/madhenry
			//! improvements : Illimar Tambek : https://github.com/ragulka
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						s: ["m\xF5ne sekundi", "m\xF5ni sekund", "paar sekundit"],
						ss: [n + "sekundi", n + "sekundit"],
						m: ["\xFChe minuti", "\xFCks minut"],
						mm: [n + " minuti", n + " minutit"],
						h: ["\xFChe tunni", "tund aega", "\xFCks tund"],
						hh: [n + " tunni", n + " tundi"],
						d: ["\xFChe p\xE4eva", "\xFCks p\xE4ev"],
						M: ["kuu aja", "kuu aega", "\xFCks kuu"],
						MM: [n + " kuu", n + " kuud"],
						y: ["\xFChe aasta", "aasta", "\xFCks aasta"],
						yy: [n + " aasta", n + " aastat"]
					};
					return r ? u[i][2] ? u[i][2] : u[i][1] : d ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("et", {
					months: "jaanuar_veebruar_m\xE4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
					monthsShort: "jaan_veebr_m\xE4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
					weekdays: "p\xFChap\xE4ev_esmasp\xE4ev_teisip\xE4ev_kolmap\xE4ev_neljap\xE4ev_reede_laup\xE4ev".split("_"),
					weekdaysShort: "P_E_T_K_N_R_L".split("_"),
					weekdaysMin: "P_E_T_K_N_R_L".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm",
						LLLL: "dddd, D. MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[T\xE4na,] LT",
						nextDay: "[Homme,] LT",
						nextWeek: "[J\xE4rgmine] dddd LT",
						lastDay: "[Eile,] LT",
						lastWeek: "[Eelmine] dddd LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s p\xE4rast",
						past: "%s tagasi",
						s: t,
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: t,
						dd: "%d p\xE4eva",
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return s
			})
		},
		43516: function(b, f, l) { //! moment.js locale configuration
			//! locale : Basque [eu]
			//! author : Eneko Illarramendi : https://github.com/eillarra
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("eu", {
					months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
					monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
					monthsParseExact: !0,
					weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
					weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
					weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "YYYY[ko] MMMM[ren] D[a]",
						LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
						LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
						l: "YYYY-M-D",
						ll: "YYYY[ko] MMM D[a]",
						lll: "YYYY[ko] MMM D[a] HH:mm",
						llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
					},
					calendar: {
						sameDay: "[gaur] LT[etan]",
						nextDay: "[bihar] LT[etan]",
						nextWeek: "dddd LT[etan]",
						lastDay: "[atzo] LT[etan]",
						lastWeek: "[aurreko] dddd LT[etan]",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s barru",
						past: "duela %s",
						s: "segundo batzuk",
						ss: "%d segundo",
						m: "minutu bat",
						mm: "%d minutu",
						h: "ordu bat",
						hh: "%d ordu",
						d: "egun bat",
						dd: "%d egun",
						M: "hilabete bat",
						MM: "%d hilabete",
						y: "urte bat",
						yy: "%d urte"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		27126: function(b, f, l) { //! moment.js locale configuration
			//! locale : Persian [fa]
			//! author : Ebrahim Byagowi : https://github.com/ebraminio
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u06F1",
						2: "\u06F2",
						3: "\u06F3",
						4: "\u06F4",
						5: "\u06F5",
						6: "\u06F6",
						7: "\u06F7",
						8: "\u06F8",
						9: "\u06F9",
						0: "\u06F0"
					},
					s = {
						"\u06F1": "1",
						"\u06F2": "2",
						"\u06F3": "3",
						"\u06F4": "4",
						"\u06F5": "5",
						"\u06F6": "6",
						"\u06F7": "7",
						"\u06F8": "8",
						"\u06F9": "9",
						"\u06F0": "0"
					},
					n = o.defineLocale("fa", {
						months: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"),
						monthsShort: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"),
						weekdays: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
						weekdaysShort: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),
						weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						meridiemParse: /قبل از ظهر|بعد از ظهر/,
						isPM: function(r) {
							return /بعد از ظهر/.test(r)
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631" : "\u0628\u0639\u062F \u0627\u0632 \u0638\u0647\u0631"
						},
						calendar: {
							sameDay: "[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT",
							nextDay: "[\u0641\u0631\u062F\u0627 \u0633\u0627\u0639\u062A] LT",
							nextWeek: "dddd [\u0633\u0627\u0639\u062A] LT",
							lastDay: "[\u062F\u06CC\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT",
							lastWeek: "dddd [\u067E\u06CC\u0634] [\u0633\u0627\u0639\u062A] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u062F\u0631 %s",
							past: "%s \u067E\u06CC\u0634",
							s: "\u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647",
							ss: "%d \u062B\u0627\u0646\u06CC\u0647",
							m: "\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647",
							mm: "%d \u062F\u0642\u06CC\u0642\u0647",
							h: "\u06CC\u06A9 \u0633\u0627\u0639\u062A",
							hh: "%d \u0633\u0627\u0639\u062A",
							d: "\u06CC\u06A9 \u0631\u0648\u0632",
							dd: "%d \u0631\u0648\u0632",
							M: "\u06CC\u06A9 \u0645\u0627\u0647",
							MM: "%d \u0645\u0627\u0647",
							y: "\u06CC\u06A9 \u0633\u0627\u0644",
							yy: "%d \u0633\u0627\u0644"
						},
						preparse: function(r) {
							return r.replace(/[۰-۹]/g, function(i) {
								return s[i]
							}).replace(/،/g, ",")
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							}).replace(/,/g, "\u060C")
						},
						dayOfMonthOrdinalParse: /\d{1,2}م/,
						ordinal: "%d\u0645",
						week: {
							dow: 6,
							doy: 12
						}
					});
				return n
			})
		},
		563618: function(b, f, l) { //! moment.js locale configuration
			//! locale : Finnish [fi]
			//! author : Tarmo Aidantausta : https://github.com/bleadof
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "nolla yksi kaksi kolme nelj\xE4 viisi kuusi seitsem\xE4n kahdeksan yhdeks\xE4n".split(" "),
					s = ["nolla", "yhden", "kahden", "kolmen", "nelj\xE4n", "viiden", "kuuden", t[7], t[8], t[9]];

				function n(d, u, m, A) {
					var W = "";
					switch (m) {
						case "s":
							return A ? "muutaman sekunnin" : "muutama sekunti";
						case "ss":
							W = A ? "sekunnin" : "sekuntia";
							break;
						case "m":
							return A ? "minuutin" : "minuutti";
						case "mm":
							W = A ? "minuutin" : "minuuttia";
							break;
						case "h":
							return A ? "tunnin" : "tunti";
						case "hh":
							W = A ? "tunnin" : "tuntia";
							break;
						case "d":
							return A ? "p\xE4iv\xE4n" : "p\xE4iv\xE4";
						case "dd":
							W = A ? "p\xE4iv\xE4n" : "p\xE4iv\xE4\xE4";
							break;
						case "M":
							return A ? "kuukauden" : "kuukausi";
						case "MM":
							W = A ? "kuukauden" : "kuukautta";
							break;
						case "y":
							return A ? "vuoden" : "vuosi";
						case "yy":
							W = A ? "vuoden" : "vuotta";
							break
					}
					return W = r(d, A) + " " + W, W
				}

				function r(d, u) {
					return d < 10 ? u ? s[d] : t[d] : d
				}
				var i = o.defineLocale("fi", {
					months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xE4kuu_hein\xE4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
					monthsShort: "tammi_helmi_maalis_huhti_touko_kes\xE4_hein\xE4_elo_syys_loka_marras_joulu".split("_"),
					weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
					weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
					weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD.MM.YYYY",
						LL: "Do MMMM[ta] YYYY",
						LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
						LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
						l: "D.M.YYYY",
						ll: "Do MMM YYYY",
						lll: "Do MMM YYYY, [klo] HH.mm",
						llll: "ddd, Do MMM YYYY, [klo] HH.mm"
					},
					calendar: {
						sameDay: "[t\xE4n\xE4\xE4n] [klo] LT",
						nextDay: "[huomenna] [klo] LT",
						nextWeek: "dddd [klo] LT",
						lastDay: "[eilen] [klo] LT",
						lastWeek: "[viime] dddd[na] [klo] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s p\xE4\xE4st\xE4",
						past: "%s sitten",
						s: n,
						ss: n,
						m: n,
						mm: n,
						h: n,
						hh: n,
						d: n,
						dd: n,
						M: n,
						MM: n,
						y: n,
						yy: n
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return i
			})
		},
		387100: function(b, f, l) { //! moment.js locale configuration
			//! locale : Filipino [fil]
			//! author : Dan Hagman : https://github.com/hagmandan
			//! author : Matthew Co : https://github.com/matthewdeeco
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("fil", {
					months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
					monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
					weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
					weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
					weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "MM/D/YYYY",
						LL: "MMMM D, YYYY",
						LLL: "MMMM D, YYYY HH:mm",
						LLLL: "dddd, MMMM DD, YYYY HH:mm"
					},
					calendar: {
						sameDay: "LT [ngayong araw]",
						nextDay: "[Bukas ng] LT",
						nextWeek: "LT [sa susunod na] dddd",
						lastDay: "LT [kahapon]",
						lastWeek: "LT [noong nakaraang] dddd",
						sameElse: "L"
					},
					relativeTime: {
						future: "sa loob ng %s",
						past: "%s ang nakalipas",
						s: "ilang segundo",
						ss: "%d segundo",
						m: "isang minuto",
						mm: "%d minuto",
						h: "isang oras",
						hh: "%d oras",
						d: "isang araw",
						dd: "%d araw",
						M: "isang buwan",
						MM: "%d buwan",
						y: "isang taon",
						yy: "%d taon"
					},
					dayOfMonthOrdinalParse: /\d{1,2}/,
					ordinal: function(s) {
						return s
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		300050: function(b, f, l) { //! moment.js locale configuration
			//! locale : Faroese [fo]
			//! author : Ragnar Johannesen : https://github.com/ragnar123
			//! author : Kristian Sakarisson : https://github.com/sakarisson
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("fo", {
					months: "januar_februar_mars_apr\xEDl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
					monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
					weekdays: "sunnudagur_m\xE1nadagur_t\xFDsdagur_mikudagur_h\xF3sdagur_fr\xEDggjadagur_leygardagur".split("_"),
					weekdaysShort: "sun_m\xE1n_t\xFDs_mik_h\xF3s_fr\xED_ley".split("_"),
					weekdaysMin: "su_m\xE1_t\xFD_mi_h\xF3_fr_le".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D. MMMM, YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\xCD dag kl.] LT",
						nextDay: "[\xCD morgin kl.] LT",
						nextWeek: "dddd [kl.] LT",
						lastDay: "[\xCD gj\xE1r kl.] LT",
						lastWeek: "[s\xED\xF0stu] dddd [kl] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "um %s",
						past: "%s s\xED\xF0ani",
						s: "f\xE1 sekund",
						ss: "%d sekundir",
						m: "ein minuttur",
						mm: "%d minuttir",
						h: "ein t\xEDmi",
						hh: "%d t\xEDmar",
						d: "ein dagur",
						dd: "%d dagar",
						M: "ein m\xE1na\xF0ur",
						MM: "%d m\xE1na\xF0ir",
						y: "eitt \xE1r",
						yy: "%d \xE1r"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		476570: function(b, f, l) { //! moment.js locale configuration
			//! locale : French (Canada) [fr-ca]
			//! author : Jonathan Abourbih : https://github.com/jonbca
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("fr-ca", {
					months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
					monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
					monthsParseExact: !0,
					weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
					weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
					weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Aujourd\u2019hui \xE0] LT",
						nextDay: "[Demain \xE0] LT",
						nextWeek: "dddd [\xE0] LT",
						lastDay: "[Hier \xE0] LT",
						lastWeek: "dddd [dernier \xE0] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dans %s",
						past: "il y a %s",
						s: "quelques secondes",
						ss: "%d secondes",
						m: "une minute",
						mm: "%d minutes",
						h: "une heure",
						hh: "%d heures",
						d: "un jour",
						dd: "%d jours",
						M: "un mois",
						MM: "%d mois",
						y: "un an",
						yy: "%d ans"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
					ordinal: function(s, n) {
						switch (n) {
							default:
							case "M":
							case "Q":
							case "D":
							case "DDD":
							case "d":
								return s + (s === 1 ? "er" : "e");
							case "w":
							case "W":
								return s + (s === 1 ? "re" : "e")
						}
					}
				});
				return t
			})
		},
		857616: function(b, f, l) { //! moment.js locale configuration
			//! locale : French (Switzerland) [fr-ch]
			//! author : Gaspard Bucher : https://github.com/gaspard
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("fr-ch", {
					months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
					monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
					monthsParseExact: !0,
					weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
					weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
					weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Aujourd\u2019hui \xE0] LT",
						nextDay: "[Demain \xE0] LT",
						nextWeek: "dddd [\xE0] LT",
						lastDay: "[Hier \xE0] LT",
						lastWeek: "dddd [dernier \xE0] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dans %s",
						past: "il y a %s",
						s: "quelques secondes",
						ss: "%d secondes",
						m: "une minute",
						mm: "%d minutes",
						h: "une heure",
						hh: "%d heures",
						d: "un jour",
						dd: "%d jours",
						M: "un mois",
						MM: "%d mois",
						y: "un an",
						yy: "%d ans"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
					ordinal: function(s, n) {
						switch (n) {
							default:
							case "M":
							case "Q":
							case "D":
							case "DDD":
							case "d":
								return s + (s === 1 ? "er" : "e");
							case "w":
							case "W":
								return s + (s === 1 ? "re" : "e")
						}
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		864799: function(b, f, l) { //! moment.js locale configuration
			//! locale : French [fr]
			//! author : John Fischer : https://github.com/jfroffice
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
					s = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
					n = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
					r = [/^janv/i, /^févr/i, /^mars/i, /^avr/i, /^mai/i, /^juin/i, /^juil/i, /^août/i, /^sept/i, /^oct/i, /^nov/i, /^déc/i],
					i = o.defineLocale("fr", {
						months: "janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre".split("_"),
						monthsShort: "janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.".split("_"),
						monthsRegex: n,
						monthsShortRegex: n,
						monthsStrictRegex: t,
						monthsShortStrictRegex: s,
						monthsParse: r,
						longMonthsParse: r,
						shortMonthsParse: r,
						weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
						weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
						weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[Aujourd\u2019hui \xE0] LT",
							nextDay: "[Demain \xE0] LT",
							nextWeek: "dddd [\xE0] LT",
							lastDay: "[Hier \xE0] LT",
							lastWeek: "dddd [dernier \xE0] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "dans %s",
							past: "il y a %s",
							s: "quelques secondes",
							ss: "%d secondes",
							m: "une minute",
							mm: "%d minutes",
							h: "une heure",
							hh: "%d heures",
							d: "un jour",
							dd: "%d jours",
							w: "une semaine",
							ww: "%d semaines",
							M: "un mois",
							MM: "%d mois",
							y: "un an",
							yy: "%d ans"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
						ordinal: function(d, u) {
							switch (u) {
								case "D":
									return d + (d === 1 ? "er" : "");
								default:
								case "M":
								case "Q":
								case "DDD":
								case "d":
									return d + (d === 1 ? "er" : "e");
								case "w":
								case "W":
									return d + (d === 1 ? "re" : "e")
							}
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return i
			})
		},
		928892: function(b, f, l) { //! moment.js locale configuration
			//! locale : Frisian [fy]
			//! author : Robin van der Vliet : https://github.com/robin0van0der0v
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
					s = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
					n = o.defineLocale("fy", {
						months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
						monthsShort: function(r, i) {
							return r ? /-MMM-/.test(i) ? s[r.month()] : t[r.month()] : t
						},
						monthsParseExact: !0,
						weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
						weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
						weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD-MM-YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[hjoed om] LT",
							nextDay: "[moarn om] LT",
							nextWeek: "dddd [om] LT",
							lastDay: "[juster om] LT",
							lastWeek: "[\xF4fr\xFBne] dddd [om] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "oer %s",
							past: "%s lyn",
							s: "in pear sekonden",
							ss: "%d sekonden",
							m: "ien min\xFAt",
							mm: "%d minuten",
							h: "ien oere",
							hh: "%d oeren",
							d: "ien dei",
							dd: "%d dagen",
							M: "ien moanne",
							MM: "%d moannen",
							y: "ien jier",
							yy: "%d jierren"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
						ordinal: function(r) {
							return r + (r === 1 || r === 8 || r >= 20 ? "ste" : "de")
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return n
			})
		},
		471650: function(b, f, l) { //! moment.js locale configuration
			//! locale : Irish or Irish Gaelic [ga]
			//! author : André Silva : https://github.com/askpt
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = ["Ean\xE1ir", "Feabhra", "M\xE1rta", "Aibre\xE1n", "Bealtaine", "Meitheamh", "I\xFAil", "L\xFAnasa", "Me\xE1n F\xF3mhair", "Deireadh F\xF3mhair", "Samhain", "Nollaig"],
					s = ["Ean", "Feabh", "M\xE1rt", "Aib", "Beal", "Meith", "I\xFAil", "L\xFAn", "M.F.", "D.F.", "Samh", "Noll"],
					n = ["D\xE9 Domhnaigh", "D\xE9 Luain", "D\xE9 M\xE1irt", "D\xE9 C\xE9adaoin", "D\xE9ardaoin", "D\xE9 hAoine", "D\xE9 Sathairn"],
					r = ["Domh", "Luan", "M\xE1irt", "C\xE9ad", "D\xE9ar", "Aoine", "Sath"],
					i = ["Do", "Lu", "M\xE1", "C\xE9", "D\xE9", "A", "Sa"],
					d = o.defineLocale("ga", {
						months: t,
						monthsShort: s,
						monthsParseExact: !0,
						weekdays: n,
						weekdaysShort: r,
						weekdaysMin: i,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[Inniu ag] LT",
							nextDay: "[Am\xE1rach ag] LT",
							nextWeek: "dddd [ag] LT",
							lastDay: "[Inn\xE9 ag] LT",
							lastWeek: "dddd [seo caite] [ag] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "i %s",
							past: "%s \xF3 shin",
							s: "c\xFApla soicind",
							ss: "%d soicind",
							m: "n\xF3im\xE9ad",
							mm: "%d n\xF3im\xE9ad",
							h: "uair an chloig",
							hh: "%d uair an chloig",
							d: "l\xE1",
							dd: "%d l\xE1",
							M: "m\xED",
							MM: "%d m\xEDonna",
							y: "bliain",
							yy: "%d bliain"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
						ordinal: function(u) {
							var m = u === 1 ? "d" : u % 10 == 2 ? "na" : "mh";
							return u + m
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return d
			})
		},
		473852: function(b, f, l) { //! moment.js locale configuration
			//! locale : Scottish Gaelic [gd]
			//! author : Jon Ashdown : https://github.com/jonashdown
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = ["Am Faoilleach", "An Gearran", "Am M\xE0rt", "An Giblean", "An C\xE8itean", "An t-\xD2gmhios", "An t-Iuchar", "An L\xF9nastal", "An t-Sultain", "An D\xE0mhair", "An t-Samhain", "An D\xF9bhlachd"],
					s = ["Faoi", "Gear", "M\xE0rt", "Gibl", "C\xE8it", "\xD2gmh", "Iuch", "L\xF9n", "Sult", "D\xE0mh", "Samh", "D\xF9bh"],
					n = ["Did\xF2mhnaich", "Diluain", "Dim\xE0irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
					r = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
					i = ["D\xF2", "Lu", "M\xE0", "Ci", "Ar", "Ha", "Sa"],
					d = o.defineLocale("gd", {
						months: t,
						monthsShort: s,
						monthsParseExact: !0,
						weekdays: n,
						weekdaysShort: r,
						weekdaysMin: i,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[An-diugh aig] LT",
							nextDay: "[A-m\xE0ireach aig] LT",
							nextWeek: "dddd [aig] LT",
							lastDay: "[An-d\xE8 aig] LT",
							lastWeek: "dddd [seo chaidh] [aig] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "ann an %s",
							past: "bho chionn %s",
							s: "beagan diogan",
							ss: "%d diogan",
							m: "mionaid",
							mm: "%d mionaidean",
							h: "uair",
							hh: "%d uairean",
							d: "latha",
							dd: "%d latha",
							M: "m\xECos",
							MM: "%d m\xECosan",
							y: "bliadhna",
							yy: "%d bliadhna"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
						ordinal: function(u) {
							var m = u === 1 ? "d" : u % 10 == 2 ? "na" : "mh";
							return u + m
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return d
			})
		},
		882638: function(b, f, l) { //! moment.js locale configuration
			//! locale : Galician [gl]
			//! author : Juan G. Hurtado : https://github.com/juanghurtado
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("gl", {
					months: "xaneiro_febreiro_marzo_abril_maio_xu\xF1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
					monthsShort: "xan._feb._mar._abr._mai._xu\xF1._xul._ago._set._out._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "domingo_luns_martes_m\xE9rcores_xoves_venres_s\xE1bado".split("_"),
					weekdaysShort: "dom._lun._mar._m\xE9r._xov._ven._s\xE1b.".split("_"),
					weekdaysMin: "do_lu_ma_m\xE9_xo_ve_s\xE1".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D [de] MMMM [de] YYYY",
						LLL: "D [de] MMMM [de] YYYY H:mm",
						LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
					},
					calendar: {
						sameDay: function() {
							return "[hoxe " + (this.hours() !== 1 ? "\xE1s" : "\xE1") + "] LT"
						},
						nextDay: function() {
							return "[ma\xF1\xE1 " + (this.hours() !== 1 ? "\xE1s" : "\xE1") + "] LT"
						},
						nextWeek: function() {
							return "dddd [" + (this.hours() !== 1 ? "\xE1s" : "a") + "] LT"
						},
						lastDay: function() {
							return "[onte " + (this.hours() !== 1 ? "\xE1" : "a") + "] LT"
						},
						lastWeek: function() {
							return "[o] dddd [pasado " + (this.hours() !== 1 ? "\xE1s" : "a") + "] LT"
						},
						sameElse: "L"
					},
					relativeTime: {
						future: function(s) {
							return s.indexOf("un") === 0 ? "n" + s : "en " + s
						},
						past: "hai %s",
						s: "uns segundos",
						ss: "%d segundos",
						m: "un minuto",
						mm: "%d minutos",
						h: "unha hora",
						hh: "%d horas",
						d: "un d\xEDa",
						dd: "%d d\xEDas",
						M: "un mes",
						MM: "%d meses",
						y: "un ano",
						yy: "%d anos"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		443420: function(b, f, l) { //! moment.js locale configuration
			//! locale : Konkani Devanagari script [gom-deva]
			//! author : The Discoverer : https://github.com/WikiDiscoverer
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						s: ["\u0925\u094B\u0921\u092F\u093E \u0938\u0945\u0915\u0902\u0921\u093E\u0902\u0928\u0940", "\u0925\u094B\u0921\u0947 \u0938\u0945\u0915\u0902\u0921"],
						ss: [n + " \u0938\u0945\u0915\u0902\u0921\u093E\u0902\u0928\u0940", n + " \u0938\u0945\u0915\u0902\u0921"],
						m: ["\u090F\u0915\u093E \u092E\u093F\u0923\u091F\u093E\u0928", "\u090F\u0915 \u092E\u093F\u0928\u0942\u091F"],
						mm: [n + " \u092E\u093F\u0923\u091F\u093E\u0902\u0928\u0940", n + " \u092E\u093F\u0923\u091F\u093E\u0902"],
						h: ["\u090F\u0915\u093E \u0935\u0930\u093E\u0928", "\u090F\u0915 \u0935\u0930"],
						hh: [n + " \u0935\u0930\u093E\u0902\u0928\u0940", n + " \u0935\u0930\u093E\u0902"],
						d: ["\u090F\u0915\u093E \u0926\u093F\u0938\u093E\u0928", "\u090F\u0915 \u0926\u0940\u0938"],
						dd: [n + " \u0926\u093F\u0938\u093E\u0902\u0928\u0940", n + " \u0926\u0940\u0938"],
						M: ["\u090F\u0915\u093E \u092E\u094D\u0939\u092F\u0928\u094D\u092F\u093E\u0928", "\u090F\u0915 \u092E\u094D\u0939\u092F\u0928\u094B"],
						MM: [n + " \u092E\u094D\u0939\u092F\u0928\u094D\u092F\u093E\u0928\u0940", n + " \u092E\u094D\u0939\u092F\u0928\u0947"],
						y: ["\u090F\u0915\u093E \u0935\u0930\u094D\u0938\u093E\u0928", "\u090F\u0915 \u0935\u0930\u094D\u0938"],
						yy: [n + " \u0935\u0930\u094D\u0938\u093E\u0902\u0928\u0940", n + " \u0935\u0930\u094D\u0938\u093E\u0902"]
					};
					return d ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("gom-deva", {
					months: {
						standalone: "\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u090F\u092A\u094D\u0930\u0940\u0932_\u092E\u0947_\u091C\u0942\u0928_\u091C\u0941\u0932\u092F_\u0911\u0917\u0938\u094D\u091F_\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930_\u0911\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930_\u0921\u093F\u0938\u0947\u0902\u092C\u0930".split("_"),
						format: "\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940\u091A\u094D\u092F\u093E_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940\u091A\u094D\u092F\u093E_\u092E\u093E\u0930\u094D\u091A\u093E\u091A\u094D\u092F\u093E_\u090F\u092A\u094D\u0930\u0940\u0932\u093E\u091A\u094D\u092F\u093E_\u092E\u0947\u092F\u093E\u091A\u094D\u092F\u093E_\u091C\u0942\u0928\u093E\u091A\u094D\u092F\u093E_\u091C\u0941\u0932\u092F\u093E\u091A\u094D\u092F\u093E_\u0911\u0917\u0938\u094D\u091F\u093E\u091A\u094D\u092F\u093E_\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930\u093E\u091A\u094D\u092F\u093E_\u0911\u0915\u094D\u091F\u094B\u092C\u0930\u093E\u091A\u094D\u092F\u093E_\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930\u093E\u091A\u094D\u092F\u093E_\u0921\u093F\u0938\u0947\u0902\u092C\u0930\u093E\u091A\u094D\u092F\u093E".split("_"),
						isFormat: /MMMM(\s)+D[oD]?/
					},
					monthsShort: "\u091C\u093E\u0928\u0947._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A_\u090F\u092A\u094D\u0930\u0940._\u092E\u0947_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0911\u0917._\u0938\u092A\u094D\u091F\u0947\u0902._\u0911\u0915\u094D\u091F\u094B._\u0928\u094B\u0935\u094D\u0939\u0947\u0902._\u0921\u093F\u0938\u0947\u0902.".split("_"),
					monthsParseExact: !0,
					weekdays: "\u0906\u092F\u0924\u093E\u0930_\u0938\u094B\u092E\u093E\u0930_\u092E\u0902\u0917\u0933\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u092C\u093F\u0930\u0947\u0938\u094D\u0924\u093E\u0930_\u0938\u0941\u0915\u094D\u0930\u093E\u0930_\u0936\u0947\u0928\u0935\u093E\u0930".split("_"),
					weekdaysShort: "\u0906\u092F\u0924._\u0938\u094B\u092E._\u092E\u0902\u0917\u0933._\u092C\u0941\u0927._\u092C\u094D\u0930\u0947\u0938\u094D\u0924._\u0938\u0941\u0915\u094D\u0930._\u0936\u0947\u0928.".split("_"),
					weekdaysMin: "\u0906_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u092C\u094D\u0930\u0947_\u0938\u0941_\u0936\u0947".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "A h:mm [\u0935\u093E\u091C\u0924\u093E\u0902]",
						LTS: "A h:mm:ss [\u0935\u093E\u091C\u0924\u093E\u0902]",
						L: "DD-MM-YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY A h:mm [\u0935\u093E\u091C\u0924\u093E\u0902]",
						LLLL: "dddd, MMMM Do, YYYY, A h:mm [\u0935\u093E\u091C\u0924\u093E\u0902]",
						llll: "ddd, D MMM YYYY, A h:mm [\u0935\u093E\u091C\u0924\u093E\u0902]"
					},
					calendar: {
						sameDay: "[\u0906\u092F\u091C] LT",
						nextDay: "[\u092B\u093E\u0932\u094D\u092F\u093E\u0902] LT",
						nextWeek: "[\u092B\u0941\u0921\u0932\u094B] dddd[,] LT",
						lastDay: "[\u0915\u093E\u0932] LT",
						lastWeek: "[\u092B\u093E\u091F\u0932\u094B] dddd[,] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s",
						past: "%s \u0906\u0926\u0940\u0902",
						s: t,
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: t,
						dd: t,
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}(वेर)/,
					ordinal: function(n, r) {
						switch (r) {
							case "D":
								return n + "\u0935\u0947\u0930";
							default:
							case "M":
							case "Q":
							case "DDD":
							case "d":
							case "w":
							case "W":
								return n
						}
					},
					week: {
						dow: 0,
						doy: 3
					},
					meridiemParse: /राती|सकाळीं|दनपारां|सांजे/,
					meridiemHour: function(n, r) {
						if (n === 12 && (n = 0), r === "\u0930\u093E\u0924\u0940") return n < 4 ? n : n + 12;
						if (r === "\u0938\u0915\u093E\u0933\u0940\u0902") return n;
						if (r === "\u0926\u0928\u092A\u093E\u0930\u093E\u0902") return n > 12 ? n : n + 12;
						if (r === "\u0938\u093E\u0902\u091C\u0947") return n + 12
					},
					meridiem: function(n, r, i) {
						return n < 4 ? "\u0930\u093E\u0924\u0940" : n < 12 ? "\u0938\u0915\u093E\u0933\u0940\u0902" : n < 16 ? "\u0926\u0928\u092A\u093E\u0930\u093E\u0902" : n < 20 ? "\u0938\u093E\u0902\u091C\u0947" : "\u0930\u093E\u0924\u0940"
					}
				});
				return s
			})
		},
		508218: function(b, f, l) { //! moment.js locale configuration
			//! locale : Konkani Latin script [gom-latn]
			//! author : The Discoverer : https://github.com/WikiDiscoverer
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = {
						s: ["thoddea sekondamni", "thodde sekond"],
						ss: [n + " sekondamni", n + " sekond"],
						m: ["eka mintan", "ek minut"],
						mm: [n + " mintamni", n + " mintam"],
						h: ["eka voran", "ek vor"],
						hh: [n + " voramni", n + " voram"],
						d: ["eka disan", "ek dis"],
						dd: [n + " disamni", n + " dis"],
						M: ["eka mhoinean", "ek mhoino"],
						MM: [n + " mhoineamni", n + " mhoine"],
						y: ["eka vorsan", "ek voros"],
						yy: [n + " vorsamni", n + " vorsam"]
					};
					return d ? u[i][0] : u[i][1]
				}
				var s = o.defineLocale("gom-latn", {
					months: {
						standalone: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
						format: "Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea".split("_"),
						isFormat: /MMMM(\s)+D[oD]?/
					},
					monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
					monthsParseExact: !0,
					weekdays: "Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split("_"),
					weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
					weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "A h:mm [vazta]",
						LTS: "A h:mm:ss [vazta]",
						L: "DD-MM-YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY A h:mm [vazta]",
						LLLL: "dddd, MMMM Do, YYYY, A h:mm [vazta]",
						llll: "ddd, D MMM YYYY, A h:mm [vazta]"
					},
					calendar: {
						sameDay: "[Aiz] LT",
						nextDay: "[Faleam] LT",
						nextWeek: "[Fuddlo] dddd[,] LT",
						lastDay: "[Kal] LT",
						lastWeek: "[Fattlo] dddd[,] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s",
						past: "%s adim",
						s: t,
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: t,
						dd: t,
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}(er)/,
					ordinal: function(n, r) {
						switch (r) {
							case "D":
								return n + "er";
							default:
							case "M":
							case "Q":
							case "DDD":
							case "d":
							case "w":
							case "W":
								return n
						}
					},
					week: {
						dow: 0,
						doy: 3
					},
					meridiemParse: /rati|sokallim|donparam|sanje/,
					meridiemHour: function(n, r) {
						if (n === 12 && (n = 0), r === "rati") return n < 4 ? n : n + 12;
						if (r === "sokallim") return n;
						if (r === "donparam") return n > 12 ? n : n + 12;
						if (r === "sanje") return n + 12
					},
					meridiem: function(n, r, i) {
						return n < 4 ? "rati" : n < 12 ? "sokallim" : n < 16 ? "donparam" : n < 20 ? "sanje" : "rati"
					}
				});
				return s
			})
		},
		721495: function(b, f, l) { //! moment.js locale configuration
			//! locale : Gujarati [gu]
			//! author : Kaushik Thanki : https://github.com/Kaushik1987
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0AE7",
						2: "\u0AE8",
						3: "\u0AE9",
						4: "\u0AEA",
						5: "\u0AEB",
						6: "\u0AEC",
						7: "\u0AED",
						8: "\u0AEE",
						9: "\u0AEF",
						0: "\u0AE6"
					},
					s = {
						"\u0AE7": "1",
						"\u0AE8": "2",
						"\u0AE9": "3",
						"\u0AEA": "4",
						"\u0AEB": "5",
						"\u0AEC": "6",
						"\u0AED": "7",
						"\u0AEE": "8",
						"\u0AEF": "9",
						"\u0AE6": "0"
					},
					n = o.defineLocale("gu", {
						months: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1\u0A86\u0AB0\u0AC0_\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1\u0A86\u0AB0\u0AC0_\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF\u0AB2_\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE\u0A88_\u0A91\u0A97\u0AB8\u0ACD\u0A9F_\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0A91\u0A95\u0ACD\u0A9F\u0ACD\u0AAC\u0AB0_\u0AA8\u0AB5\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0AA1\u0ABF\u0AB8\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0".split("_"),
						monthsShort: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1._\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1._\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF._\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE._\u0A91\u0A97._\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7._\u0A91\u0A95\u0ACD\u0A9F\u0ACD._\u0AA8\u0AB5\u0AC7._\u0AA1\u0ABF\u0AB8\u0AC7.".split("_"),
						monthsParseExact: !0,
						weekdays: "\u0AB0\u0AB5\u0ABF\u0AB5\u0ABE\u0AB0_\u0AB8\u0ACB\u0AAE\u0AB5\u0ABE\u0AB0_\u0AAE\u0A82\u0A97\u0AB3\u0AB5\u0ABE\u0AB0_\u0AAC\u0AC1\u0AA7\u0ACD\u0AB5\u0ABE\u0AB0_\u0A97\u0AC1\u0AB0\u0AC1\u0AB5\u0ABE\u0AB0_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0\u0AB5\u0ABE\u0AB0_\u0AB6\u0AA8\u0ABF\u0AB5\u0ABE\u0AB0".split("_"),
						weekdaysShort: "\u0AB0\u0AB5\u0ABF_\u0AB8\u0ACB\u0AAE_\u0AAE\u0A82\u0A97\u0AB3_\u0AAC\u0AC1\u0AA7\u0ACD_\u0A97\u0AC1\u0AB0\u0AC1_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0_\u0AB6\u0AA8\u0ABF".split("_"),
						weekdaysMin: "\u0AB0_\u0AB8\u0ACB_\u0AAE\u0A82_\u0AAC\u0AC1_\u0A97\u0AC1_\u0AB6\u0AC1_\u0AB6".split("_"),
						longDateFormat: {
							LT: "A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
							LTS: "A h:mm:ss \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7",
							LLLL: "dddd, D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7"
						},
						calendar: {
							sameDay: "[\u0A86\u0A9C] LT",
							nextDay: "[\u0A95\u0ABE\u0AB2\u0AC7] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0A97\u0A87\u0A95\u0ABE\u0AB2\u0AC7] LT",
							lastWeek: "[\u0AAA\u0ABE\u0A9B\u0AB2\u0ABE] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0AAE\u0ABE",
							past: "%s \u0AAA\u0AB9\u0AC7\u0AB2\u0ABE",
							s: "\u0A85\u0AAE\u0AC1\u0A95 \u0AAA\u0AB3\u0ACB",
							ss: "%d \u0AB8\u0AC7\u0A95\u0A82\u0AA1",
							m: "\u0A8F\u0A95 \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F",
							mm: "%d \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F",
							h: "\u0A8F\u0A95 \u0A95\u0AB2\u0ABE\u0A95",
							hh: "%d \u0A95\u0AB2\u0ABE\u0A95",
							d: "\u0A8F\u0A95 \u0AA6\u0ABF\u0AB5\u0AB8",
							dd: "%d \u0AA6\u0ABF\u0AB5\u0AB8",
							M: "\u0A8F\u0A95 \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB",
							MM: "%d \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB",
							y: "\u0A8F\u0A95 \u0AB5\u0AB0\u0ACD\u0AB7",
							yy: "%d \u0AB5\u0AB0\u0ACD\u0AB7"
						},
						preparse: function(r) {
							return r.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
						meridiemHour: function(r, i) {
							if (r === 12 && (r = 0), i === "\u0AB0\u0ABE\u0AA4") return r < 4 ? r : r + 12;
							if (i === "\u0AB8\u0AB5\u0ABE\u0AB0") return r;
							if (i === "\u0AAC\u0AAA\u0ACB\u0AB0") return r >= 10 ? r : r + 12;
							if (i === "\u0AB8\u0ABE\u0A82\u0A9C") return r + 12
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u0AB0\u0ABE\u0AA4" : r < 10 ? "\u0AB8\u0AB5\u0ABE\u0AB0" : r < 17 ? "\u0AAC\u0AAA\u0ACB\u0AB0" : r < 20 ? "\u0AB8\u0ABE\u0A82\u0A9C" : "\u0AB0\u0ABE\u0AA4"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		512287: function(b, f, l) { //! moment.js locale configuration
			//! locale : Hebrew [he]
			//! author : Tomer Cohen : https://github.com/tomer
			//! author : Moshe Simantov : https://github.com/DevelopmentIL
			//! author : Tal Ater : https://github.com/TalAter
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("he", {
					months: "\u05D9\u05E0\u05D5\u05D0\u05E8_\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05D9\u05DC_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8_\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8_\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8_\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8_\u05D3\u05E6\u05DE\u05D1\u05E8".split("_"),
					monthsShort: "\u05D9\u05E0\u05D5\u05F3_\u05E4\u05D1\u05E8\u05F3_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05F3_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05F3_\u05E1\u05E4\u05D8\u05F3_\u05D0\u05D5\u05E7\u05F3_\u05E0\u05D5\u05D1\u05F3_\u05D3\u05E6\u05DE\u05F3".split("_"),
					weekdays: "\u05E8\u05D0\u05E9\u05D5\u05DF_\u05E9\u05E0\u05D9_\u05E9\u05DC\u05D9\u05E9\u05D9_\u05E8\u05D1\u05D9\u05E2\u05D9_\u05D7\u05DE\u05D9\u05E9\u05D9_\u05E9\u05D9\u05E9\u05D9_\u05E9\u05D1\u05EA".split("_"),
					weekdaysShort: "\u05D0\u05F3_\u05D1\u05F3_\u05D2\u05F3_\u05D3\u05F3_\u05D4\u05F3_\u05D5\u05F3_\u05E9\u05F3".split("_"),
					weekdaysMin: "\u05D0_\u05D1_\u05D2_\u05D3_\u05D4_\u05D5_\u05E9".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D [\u05D1]MMMM YYYY",
						LLL: "D [\u05D1]MMMM YYYY HH:mm",
						LLLL: "dddd, D [\u05D1]MMMM YYYY HH:mm",
						l: "D/M/YYYY",
						ll: "D MMM YYYY",
						lll: "D MMM YYYY HH:mm",
						llll: "ddd, D MMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u05D4\u05D9\u05D5\u05DD \u05D1\u05BE]LT",
						nextDay: "[\u05DE\u05D7\u05E8 \u05D1\u05BE]LT",
						nextWeek: "dddd [\u05D1\u05E9\u05E2\u05D4] LT",
						lastDay: "[\u05D0\u05EA\u05DE\u05D5\u05DC \u05D1\u05BE]LT",
						lastWeek: "[\u05D1\u05D9\u05D5\u05DD] dddd [\u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05D1\u05E9\u05E2\u05D4] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u05D1\u05E2\u05D5\u05D3 %s",
						past: "\u05DC\u05E4\u05E0\u05D9 %s",
						s: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA",
						ss: "%d \u05E9\u05E0\u05D9\u05D5\u05EA",
						m: "\u05D3\u05E7\u05D4",
						mm: "%d \u05D3\u05E7\u05D5\u05EA",
						h: "\u05E9\u05E2\u05D4",
						hh: function(s) {
							return s === 2 ? "\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD" : s + " \u05E9\u05E2\u05D5\u05EA"
						},
						d: "\u05D9\u05D5\u05DD",
						dd: function(s) {
							return s === 2 ? "\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD" : s + " \u05D9\u05DE\u05D9\u05DD"
						},
						M: "\u05D7\u05D5\u05D3\u05E9",
						MM: function(s) {
							return s === 2 ? "\u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD" : s + " \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD"
						},
						y: "\u05E9\u05E0\u05D4",
						yy: function(s) {
							return s === 2 ? "\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD" : s % 10 == 0 && s !== 10 ? s + " \u05E9\u05E0\u05D4" : s + " \u05E9\u05E0\u05D9\u05DD"
						}
					},
					meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
					isPM: function(s) {
						return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(s)
					},
					meridiem: function(s, n, r) {
						return s < 5 ? "\u05DC\u05E4\u05E0\u05D5\u05EA \u05D1\u05D5\u05E7\u05E8" : s < 10 ? "\u05D1\u05D1\u05D5\u05E7\u05E8" : s < 12 ? r ? '\u05DC\u05E4\u05E0\u05D4"\u05E6' : "\u05DC\u05E4\u05E0\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : s < 18 ? r ? '\u05D0\u05D7\u05D4"\u05E6' : "\u05D0\u05D7\u05E8\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : "\u05D1\u05E2\u05E8\u05D1"
					}
				});
				return t
			})
		},
		636426: function(b, f, l) { //! moment.js locale configuration
			//! locale : Hindi [hi]
			//! author : Mayank Singhal : https://github.com/mayanksinghal
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0967",
						2: "\u0968",
						3: "\u0969",
						4: "\u096A",
						5: "\u096B",
						6: "\u096C",
						7: "\u096D",
						8: "\u096E",
						9: "\u096F",
						0: "\u0966"
					},
					s = {
						"\u0967": "1",
						"\u0968": "2",
						"\u0969": "3",
						"\u096A": "4",
						"\u096B": "5",
						"\u096C": "6",
						"\u096D": "7",
						"\u096E": "8",
						"\u096F": "9",
						"\u0966": "0"
					},
					n = [/^जन/i, /^फ़र|फर/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सितं|सित/i, /^अक्टू/i, /^नव|नवं/i, /^दिसं|दिस/i],
					r = [/^जन/i, /^फ़र/i, /^मार्च/i, /^अप्रै/i, /^मई/i, /^जून/i, /^जुल/i, /^अग/i, /^सित/i, /^अक्टू/i, /^नव/i, /^दिस/i],
					i = o.defineLocale("hi", {
						months: {
							format: "\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930".split("_"),
							standalone: "\u091C\u0928\u0935\u0930\u0940_\u092B\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u0902\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u0902\u092C\u0930_\u0926\u093F\u0938\u0902\u092C\u0930".split("_")
						},
						monthsShort: "\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.".split("_"),
						weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"),
						weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"),
						weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),
						longDateFormat: {
							LT: "A h:mm \u092C\u091C\u0947",
							LTS: "A h:mm:ss \u092C\u091C\u0947",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm \u092C\u091C\u0947",
							LLLL: "dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947"
						},
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: r,
						monthsRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i,
						monthsShortRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i,
						monthsStrictRegex: /^(जनवरी?|फ़रवरी|फरवरी?|मार्च?|अप्रैल?|मई?|जून?|जुलाई?|अगस्त?|सितम्बर|सितंबर|सित?\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर?|दिसम्बर|दिसंबर?)/i,
						monthsShortStrictRegex: /^(जन\.?|फ़र\.?|मार्च?|अप्रै\.?|मई?|जून?|जुल\.?|अग\.?|सित\.?|अक्टू\.?|नव\.?|दिस\.?)/i,
						calendar: {
							sameDay: "[\u0906\u091C] LT",
							nextDay: "[\u0915\u0932] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0915\u0932] LT",
							lastWeek: "[\u092A\u093F\u091B\u0932\u0947] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u092E\u0947\u0902",
							past: "%s \u092A\u0939\u0932\u0947",
							s: "\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923",
							ss: "%d \u0938\u0947\u0915\u0902\u0921",
							m: "\u090F\u0915 \u092E\u093F\u0928\u091F",
							mm: "%d \u092E\u093F\u0928\u091F",
							h: "\u090F\u0915 \u0918\u0902\u091F\u093E",
							hh: "%d \u0918\u0902\u091F\u0947",
							d: "\u090F\u0915 \u0926\u093F\u0928",
							dd: "%d \u0926\u093F\u0928",
							M: "\u090F\u0915 \u092E\u0939\u0940\u0928\u0947",
							MM: "%d \u092E\u0939\u0940\u0928\u0947",
							y: "\u090F\u0915 \u0935\u0930\u094D\u0937",
							yy: "%d \u0935\u0930\u094D\u0937"
						},
						preparse: function(d) {
							return d.replace(/[१२३४५६७८९०]/g, function(u) {
								return s[u]
							})
						},
						postformat: function(d) {
							return d.replace(/\d/g, function(u) {
								return t[u]
							})
						},
						meridiemParse: /रात|सुबह|दोपहर|शाम/,
						meridiemHour: function(d, u) {
							if (d === 12 && (d = 0), u === "\u0930\u093E\u0924") return d < 4 ? d : d + 12;
							if (u === "\u0938\u0941\u092C\u0939") return d;
							if (u === "\u0926\u094B\u092A\u0939\u0930") return d >= 10 ? d : d + 12;
							if (u === "\u0936\u093E\u092E") return d + 12
						},
						meridiem: function(d, u, m) {
							return d < 4 ? "\u0930\u093E\u0924" : d < 10 ? "\u0938\u0941\u092C\u0939" : d < 17 ? "\u0926\u094B\u092A\u0939\u0930" : d < 20 ? "\u0936\u093E\u092E" : "\u0930\u093E\u0924"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return i
			})
		},
		465404: function(b, f, l) { //! moment.js locale configuration
			//! locale : Croatian [hr]
			//! author : Bojan Marković : https://github.com/bmarkovic
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i) {
					var d = n + " ";
					switch (i) {
						case "ss":
							return n === 1 ? d += "sekunda" : n === 2 || n === 3 || n === 4 ? d += "sekunde" : d += "sekundi", d;
						case "m":
							return r ? "jedna minuta" : "jedne minute";
						case "mm":
							return n === 1 ? d += "minuta" : n === 2 || n === 3 || n === 4 ? d += "minute" : d += "minuta", d;
						case "h":
							return r ? "jedan sat" : "jednog sata";
						case "hh":
							return n === 1 ? d += "sat" : n === 2 || n === 3 || n === 4 ? d += "sata" : d += "sati", d;
						case "dd":
							return n === 1 ? d += "dan" : d += "dana", d;
						case "MM":
							return n === 1 ? d += "mjesec" : n === 2 || n === 3 || n === 4 ? d += "mjeseca" : d += "mjeseci", d;
						case "yy":
							return n === 1 ? d += "godina" : n === 2 || n === 3 || n === 4 ? d += "godine" : d += "godina", d
					}
				}
				var s = o.defineLocale("hr", {
					months: {
						format: "sije\u010Dnja_velja\u010De_o\u017Eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
						standalone: "sije\u010Danj_velja\u010Da_o\u017Eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")
					},
					monthsShort: "sij._velj._o\u017Eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
					monthsParseExact: !0,
					weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
					weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
					weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "Do MMMM YYYY",
						LLL: "Do MMMM YYYY H:mm",
						LLLL: "dddd, Do MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[danas u] LT",
						nextDay: "[sutra u] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[u] [nedjelju] [u] LT";
								case 3:
									return "[u] [srijedu] [u] LT";
								case 6:
									return "[u] [subotu] [u] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[u] dddd [u] LT"
							}
						},
						lastDay: "[ju\u010Der u] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[pro\u0161lu] [nedjelju] [u] LT";
								case 3:
									return "[pro\u0161lu] [srijedu] [u] LT";
								case 6:
									return "[pro\u0161le] [subote] [u] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[pro\u0161li] dddd [u] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "za %s",
						past: "prije %s",
						s: "par sekundi",
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: "dan",
						dd: t,
						M: "mjesec",
						MM: t,
						y: "godinu",
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return s
			})
		},
		238336: function(b, f, l) { //! moment.js locale configuration
			//! locale : Hungarian [hu]
			//! author : Adam Brunner : https://github.com/adambrunner
			//! author : Peter Viszt  : https://github.com/passatgt
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "vas\xE1rnap h\xE9tf\u0151n kedden szerd\xE1n cs\xFCt\xF6rt\xF6k\xF6n p\xE9nteken szombaton".split(" ");

				function s(i, d, u, m) {
					var A = i;
					switch (u) {
						case "s":
							return m || d ? "n\xE9h\xE1ny m\xE1sodperc" : "n\xE9h\xE1ny m\xE1sodperce";
						case "ss":
							return A + (m || d) ? " m\xE1sodperc" : " m\xE1sodperce";
						case "m":
							return "egy" + (m || d ? " perc" : " perce");
						case "mm":
							return A + (m || d ? " perc" : " perce");
						case "h":
							return "egy" + (m || d ? " \xF3ra" : " \xF3r\xE1ja");
						case "hh":
							return A + (m || d ? " \xF3ra" : " \xF3r\xE1ja");
						case "d":
							return "egy" + (m || d ? " nap" : " napja");
						case "dd":
							return A + (m || d ? " nap" : " napja");
						case "M":
							return "egy" + (m || d ? " h\xF3nap" : " h\xF3napja");
						case "MM":
							return A + (m || d ? " h\xF3nap" : " h\xF3napja");
						case "y":
							return "egy" + (m || d ? " \xE9v" : " \xE9ve");
						case "yy":
							return A + (m || d ? " \xE9v" : " \xE9ve")
					}
					return ""
				}

				function n(i) {
					return (i ? "" : "[m\xFAlt] ") + "[" + t[this.day()] + "] LT[-kor]"
				}
				var r = o.defineLocale("hu", {
					months: "janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december".split("_"),
					monthsShort: "jan._feb._m\xE1rc._\xE1pr._m\xE1j._j\xFAn._j\xFAl._aug._szept._okt._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"),
					weekdaysShort: "vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo".split("_"),
					weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "YYYY.MM.DD.",
						LL: "YYYY. MMMM D.",
						LLL: "YYYY. MMMM D. H:mm",
						LLLL: "YYYY. MMMM D., dddd H:mm"
					},
					meridiemParse: /de|du/i,
					isPM: function(i) {
						return i.charAt(1).toLowerCase() === "u"
					},
					meridiem: function(i, d, u) {
						return i < 12 ? u === !0 ? "de" : "DE" : u === !0 ? "du" : "DU"
					},
					calendar: {
						sameDay: "[ma] LT[-kor]",
						nextDay: "[holnap] LT[-kor]",
						nextWeek: function() {
							return n.call(this, !0)
						},
						lastDay: "[tegnap] LT[-kor]",
						lastWeek: function() {
							return n.call(this, !1)
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "%s m\xFAlva",
						past: "%s",
						s: s,
						ss: s,
						m: s,
						mm: s,
						h: s,
						hh: s,
						d: s,
						dd: s,
						M: s,
						MM: s,
						y: s,
						yy: s
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return r
			})
		},
		441334: function(b, f, l) { //! moment.js locale configuration
			//! locale : Armenian [hy-am]
			//! author : Armendarabyan : https://github.com/armendarabyan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("hy-am", {
					months: {
						format: "\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B_\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B_\u0574\u0561\u0580\u057F\u056B_\u0561\u057A\u0580\u056B\u056C\u056B_\u0574\u0561\u0575\u056B\u057D\u056B_\u0570\u0578\u0582\u0576\u056B\u057D\u056B_\u0570\u0578\u0582\u056C\u056B\u057D\u056B_\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B".split("_"),
						standalone: "\u0570\u0578\u0582\u0576\u057E\u0561\u0580_\u0583\u0565\u057F\u0580\u057E\u0561\u0580_\u0574\u0561\u0580\u057F_\u0561\u057A\u0580\u056B\u056C_\u0574\u0561\u0575\u056B\u057D_\u0570\u0578\u0582\u0576\u056B\u057D_\u0570\u0578\u0582\u056C\u056B\u057D_\u0585\u0563\u0578\u057D\u057F\u0578\u057D_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580".split("_")
					},
					monthsShort: "\u0570\u0576\u057E_\u0583\u057F\u0580_\u0574\u0580\u057F_\u0561\u057A\u0580_\u0574\u0575\u057D_\u0570\u0576\u057D_\u0570\u056C\u057D_\u0585\u0563\u057D_\u057D\u057A\u057F_\u0570\u056F\u057F_\u0576\u0574\u0562_\u0564\u056F\u057F".split("_"),
					weekdays: "\u056F\u056B\u0580\u0561\u056F\u056B_\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"),
					weekdaysShort: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),
					weekdaysMin: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY \u0569.",
						LLL: "D MMMM YYYY \u0569., HH:mm",
						LLLL: "dddd, D MMMM YYYY \u0569., HH:mm"
					},
					calendar: {
						sameDay: "[\u0561\u0575\u057D\u0585\u0580] LT",
						nextDay: "[\u057E\u0561\u0572\u0568] LT",
						lastDay: "[\u0565\u0580\u0565\u056F] LT",
						nextWeek: function() {
							return "dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT"
						},
						lastWeek: function() {
							return "[\u0561\u0576\u0581\u0561\u056E] dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT"
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \u0570\u0565\u057F\u0578",
						past: "%s \u0561\u057C\u0561\u057B",
						s: "\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576",
						ss: "%d \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576",
						m: "\u0580\u0578\u057A\u0565",
						mm: "%d \u0580\u0578\u057A\u0565",
						h: "\u056A\u0561\u0574",
						hh: "%d \u056A\u0561\u0574",
						d: "\u0585\u0580",
						dd: "%d \u0585\u0580",
						M: "\u0561\u0574\u056B\u057D",
						MM: "%d \u0561\u0574\u056B\u057D",
						y: "\u057F\u0561\u0580\u056B",
						yy: "%d \u057F\u0561\u0580\u056B"
					},
					meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
					isPM: function(s) {
						return /^(ցերեկվա|երեկոյան)$/.test(s)
					},
					meridiem: function(s) {
						return s < 4 ? "\u0563\u056B\u0577\u0565\u0580\u057E\u0561" : s < 12 ? "\u0561\u057C\u0561\u057E\u0578\u057F\u057E\u0561" : s < 17 ? "\u0581\u0565\u0580\u0565\u056F\u057E\u0561" : "\u0565\u0580\u0565\u056F\u0578\u0575\u0561\u0576"
					},
					dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
					ordinal: function(s, n) {
						switch (n) {
							case "DDD":
							case "w":
							case "W":
							case "DDDo":
								return s === 1 ? s + "-\u056B\u0576" : s + "-\u0580\u0564";
							default:
								return s
						}
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		559700: function(b, f, l) { //! moment.js locale configuration
			//! locale : Indonesian [id]
			//! author : Mohammad Satrio Utomo : https://github.com/tyok
			//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("id", {
					months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
					weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
					weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
					weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [pukul] HH.mm",
						LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
					},
					meridiemParse: /pagi|siang|sore|malam/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "pagi") return s;
						if (n === "siang") return s >= 11 ? s : s + 12;
						if (n === "sore" || n === "malam") return s + 12
					},
					meridiem: function(s, n, r) {
						return s < 11 ? "pagi" : s < 15 ? "siang" : s < 19 ? "sore" : "malam"
					},
					calendar: {
						sameDay: "[Hari ini pukul] LT",
						nextDay: "[Besok pukul] LT",
						nextWeek: "dddd [pukul] LT",
						lastDay: "[Kemarin pukul] LT",
						lastWeek: "dddd [lalu pukul] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dalam %s",
						past: "%s yang lalu",
						s: "beberapa detik",
						ss: "%d detik",
						m: "semenit",
						mm: "%d menit",
						h: "sejam",
						hh: "%d jam",
						d: "sehari",
						dd: "%d hari",
						M: "sebulan",
						MM: "%d bulan",
						y: "setahun",
						yy: "%d tahun"
					},
					week: {
						dow: 0,
						doy: 6
					}
				});
				return t
			})
		},
		330071: function(b, f, l) { //! moment.js locale configuration
			//! locale : Icelandic [is]
			//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(r) {
					return r % 100 == 11 ? !0 : r % 10 != 1
				}

				function s(r, i, d, u) {
					var m = r + " ";
					switch (d) {
						case "s":
							return i || u ? "nokkrar sek\xFAndur" : "nokkrum sek\xFAndum";
						case "ss":
							return t(r) ? m + (i || u ? "sek\xFAndur" : "sek\xFAndum") : m + "sek\xFAnda";
						case "m":
							return i ? "m\xEDn\xFAta" : "m\xEDn\xFAtu";
						case "mm":
							return t(r) ? m + (i || u ? "m\xEDn\xFAtur" : "m\xEDn\xFAtum") : i ? m + "m\xEDn\xFAta" : m + "m\xEDn\xFAtu";
						case "hh":
							return t(r) ? m + (i || u ? "klukkustundir" : "klukkustundum") : m + "klukkustund";
						case "d":
							return i ? "dagur" : u ? "dag" : "degi";
						case "dd":
							return t(r) ? i ? m + "dagar" : m + (u ? "daga" : "d\xF6gum") : i ? m + "dagur" : m + (u ? "dag" : "degi");
						case "M":
							return i ? "m\xE1nu\xF0ur" : u ? "m\xE1nu\xF0" : "m\xE1nu\xF0i";
						case "MM":
							return t(r) ? i ? m + "m\xE1nu\xF0ir" : m + (u ? "m\xE1nu\xF0i" : "m\xE1nu\xF0um") : i ? m + "m\xE1nu\xF0ur" : m + (u ? "m\xE1nu\xF0" : "m\xE1nu\xF0i");
						case "y":
							return i || u ? "\xE1r" : "\xE1ri";
						case "yy":
							return t(r) ? m + (i || u ? "\xE1r" : "\xE1rum") : m + (i || u ? "\xE1r" : "\xE1ri")
					}
				}
				var n = o.defineLocale("is", {
					months: "jan\xFAar_febr\xFAar_mars_apr\xEDl_ma\xED_j\xFAn\xED_j\xFAl\xED_\xE1g\xFAst_september_okt\xF3ber_n\xF3vember_desember".split("_"),
					monthsShort: "jan_feb_mar_apr_ma\xED_j\xFAn_j\xFAl_\xE1g\xFA_sep_okt_n\xF3v_des".split("_"),
					weekdays: "sunnudagur_m\xE1nudagur_\xFEri\xF0judagur_mi\xF0vikudagur_fimmtudagur_f\xF6studagur_laugardagur".split("_"),
					weekdaysShort: "sun_m\xE1n_\xFEri_mi\xF0_fim_f\xF6s_lau".split("_"),
					weekdaysMin: "Su_M\xE1_\xDEr_Mi_Fi_F\xF6_La".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY [kl.] H:mm",
						LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
					},
					calendar: {
						sameDay: "[\xED dag kl.] LT",
						nextDay: "[\xE1 morgun kl.] LT",
						nextWeek: "dddd [kl.] LT",
						lastDay: "[\xED g\xE6r kl.] LT",
						lastWeek: "[s\xED\xF0asta] dddd [kl.] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "eftir %s",
						past: "fyrir %s s\xED\xF0an",
						s: s,
						ss: s,
						m: s,
						mm: s,
						h: "klukkustund",
						hh: s,
						d: s,
						dd: s,
						M: s,
						MM: s,
						y: s,
						yy: s
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return n
			})
		},
		262878: function(b, f, l) { //! moment.js locale configuration
			//! locale : Italian (Switzerland) [it-ch]
			//! author : xfh : https://github.com/xfh
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("it-ch", {
					months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
					monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
					weekdays: "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split("_"),
					weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
					weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Oggi alle] LT",
						nextDay: "[Domani alle] LT",
						nextWeek: "dddd [alle] LT",
						lastDay: "[Ieri alle] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[la scorsa] dddd [alle] LT";
								default:
									return "[lo scorso] dddd [alle] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: function(s) {
							return (/^[0-9].+$/.test(s) ? "tra" : "in") + " " + s
						},
						past: "%s fa",
						s: "alcuni secondi",
						ss: "%d secondi",
						m: "un minuto",
						mm: "%d minuti",
						h: "un'ora",
						hh: "%d ore",
						d: "un giorno",
						dd: "%d giorni",
						M: "un mese",
						MM: "%d mesi",
						y: "un anno",
						yy: "%d anni"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		314867: function(b, f, l) { //! moment.js locale configuration
			//! locale : Italian [it]
			//! author : Lorenzo : https://github.com/aliem
			//! author: Mattia Larentis: https://github.com/nostalgiaz
			//! author: Marco : https://github.com/Manfre98
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("it", {
					months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
					monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
					weekdays: "domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato".split("_"),
					weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
					weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: function() {
							return "[Oggi a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT"
						},
						nextDay: function() {
							return "[Domani a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT"
						},
						nextWeek: function() {
							return "dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT"
						},
						lastDay: function() {
							return "[Ieri a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT"
						},
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[La scorsa] dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT";
								default:
									return "[Lo scorso] dddd [a" + (this.hours() > 1 ? "lle " : this.hours() === 0 ? " " : "ll'") + "]LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "tra %s",
						past: "%s fa",
						s: "alcuni secondi",
						ss: "%d secondi",
						m: "un minuto",
						mm: "%d minuti",
						h: "un'ora",
						hh: "%d ore",
						d: "un giorno",
						dd: "%d giorni",
						w: "una settimana",
						ww: "%d settimane",
						M: "un mese",
						MM: "%d mesi",
						y: "un anno",
						yy: "%d anni"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		534172: function(b, f, l) { //! moment.js locale configuration
			//! locale : Japanese [ja]
			//! author : LI Long : https://github.com/baryon
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ja", {
					eras: [{
						since: "2019-05-01",
						offset: 1,
						name: "\u4EE4\u548C",
						narrow: "\u32FF",
						abbr: "R"
					}, {
						since: "1989-01-08",
						until: "2019-04-30",
						offset: 1,
						name: "\u5E73\u6210",
						narrow: "\u337B",
						abbr: "H"
					}, {
						since: "1926-12-25",
						until: "1989-01-07",
						offset: 1,
						name: "\u662D\u548C",
						narrow: "\u337C",
						abbr: "S"
					}, {
						since: "1912-07-30",
						until: "1926-12-24",
						offset: 1,
						name: "\u5927\u6B63",
						narrow: "\u337D",
						abbr: "T"
					}, {
						since: "1873-01-01",
						until: "1912-07-29",
						offset: 6,
						name: "\u660E\u6CBB",
						narrow: "\u337E",
						abbr: "M"
					}, {
						since: "0001-01-01",
						until: "1873-12-31",
						offset: 1,
						name: "\u897F\u66A6",
						narrow: "AD",
						abbr: "AD"
					}, {
						since: "0000-12-31",
						until: -1 / 0,
						offset: 1,
						name: "\u7D00\u5143\u524D",
						narrow: "BC",
						abbr: "BC"
					}],
					eraYearOrdinalRegex: /(元|\d+)年/,
					eraYearOrdinalParse: function(s, n) {
						return n[1] === "\u5143" ? 1 : parseInt(n[1] || s, 10)
					},
					months: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					weekdays: "\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5".split("_"),
					weekdaysShort: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
					weekdaysMin: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY/MM/DD",
						LL: "YYYY\u5E74M\u6708D\u65E5",
						LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						LLLL: "YYYY\u5E74M\u6708D\u65E5 dddd HH:mm",
						l: "YYYY/MM/DD",
						ll: "YYYY\u5E74M\u6708D\u65E5",
						lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						llll: "YYYY\u5E74M\u6708D\u65E5(ddd) HH:mm"
					},
					meridiemParse: /午前|午後/i,
					isPM: function(s) {
						return s === "\u5348\u5F8C"
					},
					meridiem: function(s, n, r) {
						return s < 12 ? "\u5348\u524D" : "\u5348\u5F8C"
					},
					calendar: {
						sameDay: "[\u4ECA\u65E5] LT",
						nextDay: "[\u660E\u65E5] LT",
						nextWeek: function(s) {
							return s.week() !== this.week() ? "[\u6765\u9031]dddd LT" : "dddd LT"
						},
						lastDay: "[\u6628\u65E5] LT",
						lastWeek: function(s) {
							return this.week() !== s.week() ? "[\u5148\u9031]dddd LT" : "dddd LT"
						},
						sameElse: "L"
					},
					dayOfMonthOrdinalParse: /\d{1,2}日/,
					ordinal: function(s, n) {
						switch (n) {
							case "y":
								return s === 1 ? "\u5143\u5E74" : s + "\u5E74";
							case "d":
							case "D":
							case "DDD":
								return s + "\u65E5";
							default:
								return s
						}
					},
					relativeTime: {
						future: "%s\u5F8C",
						past: "%s\u524D",
						s: "\u6570\u79D2",
						ss: "%d\u79D2",
						m: "1\u5206",
						mm: "%d\u5206",
						h: "1\u6642\u9593",
						hh: "%d\u6642\u9593",
						d: "1\u65E5",
						dd: "%d\u65E5",
						M: "1\u30F6\u6708",
						MM: "%d\u30F6\u6708",
						y: "1\u5E74",
						yy: "%d\u5E74"
					}
				});
				return t
			})
		},
		82230: function(b, f, l) { //! moment.js locale configuration
			//! locale : Javanese [jv]
			//! author : Rony Lantip : https://github.com/lantip
			//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("jv", {
					months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
					monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
					weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
					weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
					weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [pukul] HH.mm",
						LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
					},
					meridiemParse: /enjing|siyang|sonten|ndalu/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "enjing") return s;
						if (n === "siyang") return s >= 11 ? s : s + 12;
						if (n === "sonten" || n === "ndalu") return s + 12
					},
					meridiem: function(s, n, r) {
						return s < 11 ? "enjing" : s < 15 ? "siyang" : s < 19 ? "sonten" : "ndalu"
					},
					calendar: {
						sameDay: "[Dinten puniko pukul] LT",
						nextDay: "[Mbenjang pukul] LT",
						nextWeek: "dddd [pukul] LT",
						lastDay: "[Kala wingi pukul] LT",
						lastWeek: "dddd [kepengker pukul] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "wonten ing %s",
						past: "%s ingkang kepengker",
						s: "sawetawis detik",
						ss: "%d detik",
						m: "setunggal menit",
						mm: "%d menit",
						h: "setunggal jam",
						hh: "%d jam",
						d: "sedinten",
						dd: "%d dinten",
						M: "sewulan",
						MM: "%d wulan",
						y: "setaun",
						yy: "%d taun"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		690659: function(b, f, l) { //! moment.js locale configuration
			//! locale : Georgian [ka]
			//! author : Irakli Janiashvili : https://github.com/IrakliJani
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ka", {
					months: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8".split("_"),
					monthsShort: "\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9".split("_"),
					weekdays: {
						standalone: "\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8".split("_"),
						format: "\u10D9\u10D5\u10D8\u10E0\u10D0\u10E1_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10E1_\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1".split("_"),
						isFormat: /(წინა|შემდეგ)/
					},
					weekdaysShort: "\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1".split("_"),
					weekdaysMin: "\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u10D3\u10E6\u10D4\u10E1] LT[-\u10D6\u10D4]",
						nextDay: "[\u10EE\u10D5\u10D0\u10DA] LT[-\u10D6\u10D4]",
						lastDay: "[\u10D2\u10E3\u10E8\u10D8\u10DC] LT[-\u10D6\u10D4]",
						nextWeek: "[\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2] dddd LT[-\u10D6\u10D4]",
						lastWeek: "[\u10EC\u10D8\u10DC\u10D0] dddd LT-\u10D6\u10D4",
						sameElse: "L"
					},
					relativeTime: {
						future: function(s) {
							return s.replace(/(წამ|წუთ|საათ|წელ|დღ|თვ)(ი|ე)/, function(n, r, i) {
								return i === "\u10D8" ? r + "\u10E8\u10D8" : r + i + "\u10E8\u10D8"
							})
						},
						past: function(s) {
							return /(წამი|წუთი|საათი|დღე|თვე)/.test(s) ? s.replace(/(ი|ე)$/, "\u10D8\u10E1 \u10EC\u10D8\u10DC") : /წელი/.test(s) ? s.replace(/წელი$/, "\u10EC\u10DA\u10D8\u10E1 \u10EC\u10D8\u10DC") : s
						},
						s: "\u10E0\u10D0\u10DB\u10D3\u10D4\u10DC\u10D8\u10DB\u10D4 \u10EC\u10D0\u10DB\u10D8",
						ss: "%d \u10EC\u10D0\u10DB\u10D8",
						m: "\u10EC\u10E3\u10D7\u10D8",
						mm: "%d \u10EC\u10E3\u10D7\u10D8",
						h: "\u10E1\u10D0\u10D0\u10D7\u10D8",
						hh: "%d \u10E1\u10D0\u10D0\u10D7\u10D8",
						d: "\u10D3\u10E6\u10D4",
						dd: "%d \u10D3\u10E6\u10D4",
						M: "\u10D7\u10D5\u10D4",
						MM: "%d \u10D7\u10D5\u10D4",
						y: "\u10EC\u10D4\u10DA\u10D8",
						yy: "%d \u10EC\u10D4\u10DA\u10D8"
					},
					dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
					ordinal: function(s) {
						return s === 0 ? s : s === 1 ? s + "-\u10DA\u10D8" : s < 20 || s <= 100 && s % 20 == 0 || s % 100 == 0 ? "\u10DB\u10D4-" + s : s + "-\u10D4"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		980962: function(b, f, l) { //! moment.js locale configuration
			//! locale : Kazakh [kk]
			//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						0: "-\u0448\u0456",
						1: "-\u0448\u0456",
						2: "-\u0448\u0456",
						3: "-\u0448\u0456",
						4: "-\u0448\u0456",
						5: "-\u0448\u0456",
						6: "-\u0448\u044B",
						7: "-\u0448\u0456",
						8: "-\u0448\u0456",
						9: "-\u0448\u044B",
						10: "-\u0448\u044B",
						20: "-\u0448\u044B",
						30: "-\u0448\u044B",
						40: "-\u0448\u044B",
						50: "-\u0448\u0456",
						60: "-\u0448\u044B",
						70: "-\u0448\u0456",
						80: "-\u0448\u0456",
						90: "-\u0448\u044B",
						100: "-\u0448\u0456"
					},
					s = o.defineLocale("kk", {
						months: "\u049B\u0430\u04A3\u0442\u0430\u0440_\u0430\u049B\u043F\u0430\u043D_\u043D\u0430\u0443\u0440\u044B\u0437_\u0441\u04D9\u0443\u0456\u0440_\u043C\u0430\u043C\u044B\u0440_\u043C\u0430\u0443\u0441\u044B\u043C_\u0448\u0456\u043B\u0434\u0435_\u0442\u0430\u043C\u044B\u0437_\u049B\u044B\u0440\u043A\u04AF\u0439\u0435\u043A_\u049B\u0430\u0437\u0430\u043D_\u049B\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D".split("_"),
						monthsShort: "\u049B\u0430\u04A3_\u0430\u049B\u043F_\u043D\u0430\u0443_\u0441\u04D9\u0443_\u043C\u0430\u043C_\u043C\u0430\u0443_\u0448\u0456\u043B_\u0442\u0430\u043C_\u049B\u044B\u0440_\u049B\u0430\u0437_\u049B\u0430\u0440_\u0436\u0435\u043B".split("_"),
						weekdays: "\u0436\u0435\u043A\u0441\u0435\u043D\u0431\u0456_\u0434\u04AF\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u04D9\u0440\u0441\u0435\u043D\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0436\u04B1\u043C\u0430_\u0441\u0435\u043D\u0431\u0456".split("_"),
						weekdaysShort: "\u0436\u0435\u043A_\u0434\u04AF\u0439_\u0441\u0435\u0439_\u0441\u04D9\u0440_\u0431\u0435\u0439_\u0436\u04B1\u043C_\u0441\u0435\u043D".split("_"),
						weekdaysMin: "\u0436\u043A_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043C_\u0441\u043D".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[\u0411\u04AF\u0433\u0456\u043D \u0441\u0430\u0493\u0430\u0442] LT",
							nextDay: "[\u0415\u0440\u0442\u0435\u04A3 \u0441\u0430\u0493\u0430\u0442] LT",
							nextWeek: "dddd [\u0441\u0430\u0493\u0430\u0442] LT",
							lastDay: "[\u041A\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT",
							lastWeek: "[\u04E8\u0442\u043A\u0435\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u04A3] dddd [\u0441\u0430\u0493\u0430\u0442] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0456\u0448\u0456\u043D\u0434\u0435",
							past: "%s \u0431\u04B1\u0440\u044B\u043D",
							s: "\u0431\u0456\u0440\u043D\u0435\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",
							ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434",
							m: "\u0431\u0456\u0440 \u043C\u0438\u043D\u0443\u0442",
							mm: "%d \u043C\u0438\u043D\u0443\u0442",
							h: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",
							hh: "%d \u0441\u0430\u0493\u0430\u0442",
							d: "\u0431\u0456\u0440 \u043A\u04AF\u043D",
							dd: "%d \u043A\u04AF\u043D",
							M: "\u0431\u0456\u0440 \u0430\u0439",
							MM: "%d \u0430\u0439",
							y: "\u0431\u0456\u0440 \u0436\u044B\u043B",
							yy: "%d \u0436\u044B\u043B"
						},
						dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
						ordinal: function(n) {
							var r = n % 10,
								i = n >= 100 ? 100 : null;
							return n + (t[n] || t[r] || t[i])
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		622054: function(b, f, l) { //! moment.js locale configuration
			//! locale : Cambodian [km]
			//! author : Kruy Vanna : https://github.com/kruyvanna
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u17E1",
						2: "\u17E2",
						3: "\u17E3",
						4: "\u17E4",
						5: "\u17E5",
						6: "\u17E6",
						7: "\u17E7",
						8: "\u17E8",
						9: "\u17E9",
						0: "\u17E0"
					},
					s = {
						"\u17E1": "1",
						"\u17E2": "2",
						"\u17E3": "3",
						"\u17E4": "4",
						"\u17E5": "5",
						"\u17E6": "6",
						"\u17E7": "7",
						"\u17E8": "8",
						"\u17E9": "9",
						"\u17E0": "0"
					},
					n = o.defineLocale("km", {
						months: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"),
						monthsShort: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"),
						weekdays: "\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799_\u1785\u17D0\u1793\u17D2\u1791_\u17A2\u1784\u17D2\u1782\u17B6\u179A_\u1796\u17BB\u1792_\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD_\u179F\u17BB\u1780\u17D2\u179A_\u179F\u17C5\u179A\u17CD".split("_"),
						weekdaysShort: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"),
						weekdaysMin: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						meridiemParse: /ព្រឹក|ល្ងាច/,
						isPM: function(r) {
							return r === "\u179B\u17D2\u1784\u17B6\u1785"
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u1796\u17D2\u179A\u17B9\u1780" : "\u179B\u17D2\u1784\u17B6\u1785"
						},
						calendar: {
							sameDay: "[\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7 \u1798\u17C9\u17C4\u1784] LT",
							nextDay: "[\u179F\u17D2\u17A2\u17C2\u1780 \u1798\u17C9\u17C4\u1784] LT",
							nextWeek: "dddd [\u1798\u17C9\u17C4\u1784] LT",
							lastDay: "[\u1798\u17D2\u179F\u17B7\u179B\u1798\u17B7\u1789 \u1798\u17C9\u17C4\u1784] LT",
							lastWeek: "dddd [\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD\u1798\u17BB\u1793] [\u1798\u17C9\u17C4\u1784] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u1791\u17C0\u178F",
							past: "%s\u1798\u17BB\u1793",
							s: "\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8",
							ss: "%d \u179C\u17B7\u1793\u17B6\u1791\u17B8",
							m: "\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8",
							mm: "%d \u1793\u17B6\u1791\u17B8",
							h: "\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784",
							hh: "%d \u1798\u17C9\u17C4\u1784",
							d: "\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3",
							dd: "%d \u1790\u17D2\u1784\u17C3",
							M: "\u1798\u17BD\u1799\u1781\u17C2",
							MM: "%d \u1781\u17C2",
							y: "\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6",
							yy: "%d \u1786\u17D2\u1793\u17B6\u17C6"
						},
						dayOfMonthOrdinalParse: /ទី\d{1,2}/,
						ordinal: "\u1791\u17B8%d",
						preparse: function(r) {
							return r.replace(/[១២៣៤៥៦៧៨៩០]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return n
			})
		},
		487058: function(b, f, l) { //! moment.js locale configuration
			//! locale : Kannada [kn]
			//! author : Rajeev Naik : https://github.com/rajeevnaikte
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0CE7",
						2: "\u0CE8",
						3: "\u0CE9",
						4: "\u0CEA",
						5: "\u0CEB",
						6: "\u0CEC",
						7: "\u0CED",
						8: "\u0CEE",
						9: "\u0CEF",
						0: "\u0CE6"
					},
					s = {
						"\u0CE7": "1",
						"\u0CE8": "2",
						"\u0CE9": "3",
						"\u0CEA": "4",
						"\u0CEB": "5",
						"\u0CEC": "6",
						"\u0CED": "7",
						"\u0CEE": "8",
						"\u0CEF": "9",
						"\u0CE6": "0"
					},
					n = o.defineLocale("kn", {
						months: "\u0C9C\u0CA8\u0CB5\u0CB0\u0CBF_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0\u0CB5\u0CB0\u0CBF_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5\u0CAC\u0CB0\u0CCD_\u0CA8\u0CB5\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82\u0CAC\u0CB0\u0CCD".split("_"),
						monthsShort: "\u0C9C\u0CA8_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5_\u0CA8\u0CB5\u0CC6\u0C82_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82".split("_"),
						monthsParseExact: !0,
						weekdays: "\u0CAD\u0CBE\u0CA8\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE\u0CB5\u0CBE\u0CB0_\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0_\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0_\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0_\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0".split("_"),
						weekdaysShort: "\u0CAD\u0CBE\u0CA8\u0CC1_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE_\u0CAE\u0C82\u0C97\u0CB3_\u0CAC\u0CC1\u0CA7_\u0C97\u0CC1\u0CB0\u0CC1_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0_\u0CB6\u0CA8\u0CBF".split("_"),
						weekdaysMin: "\u0CAD\u0CBE_\u0CB8\u0CC6\u0CC2\u0CD5_\u0CAE\u0C82_\u0CAC\u0CC1_\u0C97\u0CC1_\u0CB6\u0CC1_\u0CB6".split("_"),
						longDateFormat: {
							LT: "A h:mm",
							LTS: "A h:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm",
							LLLL: "dddd, D MMMM YYYY, A h:mm"
						},
						calendar: {
							sameDay: "[\u0C87\u0C82\u0CA6\u0CC1] LT",
							nextDay: "[\u0CA8\u0CBE\u0CB3\u0CC6] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6] LT",
							lastWeek: "[\u0C95\u0CC6\u0CC2\u0CA8\u0CC6\u0CAF] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0CA8\u0C82\u0CA4\u0CB0",
							past: "%s \u0CB9\u0CBF\u0C82\u0CA6\u0CC6",
							s: "\u0C95\u0CC6\u0CB2\u0CB5\u0CC1 \u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CC1",
							ss: "%d \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CC1\u0C97\u0CB3\u0CC1",
							m: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7",
							mm: "%d \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7",
							h: "\u0C92\u0C82\u0CA6\u0CC1 \u0C97\u0C82\u0C9F\u0CC6",
							hh: "%d \u0C97\u0C82\u0C9F\u0CC6",
							d: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA6\u0CBF\u0CA8",
							dd: "%d \u0CA6\u0CBF\u0CA8",
							M: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1",
							MM: "%d \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1",
							y: "\u0C92\u0C82\u0CA6\u0CC1 \u0CB5\u0CB0\u0CCD\u0CB7",
							yy: "%d \u0CB5\u0CB0\u0CCD\u0CB7"
						},
						preparse: function(r) {
							return r.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
						meridiemHour: function(r, i) {
							if (r === 12 && (r = 0), i === "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF") return r < 4 ? r : r + 12;
							if (i === "\u0CAC\u0CC6\u0CB3\u0CBF\u0C97\u0CCD\u0C97\u0CC6") return r;
							if (i === "\u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8") return r >= 10 ? r : r + 12;
							if (i === "\u0CB8\u0C82\u0C9C\u0CC6") return r + 12
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF" : r < 10 ? "\u0CAC\u0CC6\u0CB3\u0CBF\u0C97\u0CCD\u0C97\u0CC6" : r < 17 ? "\u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8" : r < 20 ? "\u0CB8\u0C82\u0C9C\u0CC6" : "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
						ordinal: function(r) {
							return r + "\u0CA8\u0CC6\u0CD5"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		390261: function(b, f, l) { //! moment.js locale configuration
			//! locale : Korean [ko]
			//! author : Kyungwook, Park : https://github.com/kyungw00k
			//! author : Jeeeyul Lee <jeeeyul@gmail.com>
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ko", {
					months: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
					monthsShort: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"),
					weekdays: "\uC77C\uC694\uC77C_\uC6D4\uC694\uC77C_\uD654\uC694\uC77C_\uC218\uC694\uC77C_\uBAA9\uC694\uC77C_\uAE08\uC694\uC77C_\uD1A0\uC694\uC77C".split("_"),
					weekdaysShort: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
					weekdaysMin: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"),
					longDateFormat: {
						LT: "A h:mm",
						LTS: "A h:mm:ss",
						L: "YYYY.MM.DD.",
						LL: "YYYY\uB144 MMMM D\uC77C",
						LLL: "YYYY\uB144 MMMM D\uC77C A h:mm",
						LLLL: "YYYY\uB144 MMMM D\uC77C dddd A h:mm",
						l: "YYYY.MM.DD.",
						ll: "YYYY\uB144 MMMM D\uC77C",
						lll: "YYYY\uB144 MMMM D\uC77C A h:mm",
						llll: "YYYY\uB144 MMMM D\uC77C dddd A h:mm"
					},
					calendar: {
						sameDay: "\uC624\uB298 LT",
						nextDay: "\uB0B4\uC77C LT",
						nextWeek: "dddd LT",
						lastDay: "\uC5B4\uC81C LT",
						lastWeek: "\uC9C0\uB09C\uC8FC dddd LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \uD6C4",
						past: "%s \uC804",
						s: "\uBA87 \uCD08",
						ss: "%d\uCD08",
						m: "1\uBD84",
						mm: "%d\uBD84",
						h: "\uD55C \uC2DC\uAC04",
						hh: "%d\uC2DC\uAC04",
						d: "\uD558\uB8E8",
						dd: "%d\uC77C",
						M: "\uD55C \uB2EC",
						MM: "%d\uB2EC",
						y: "\uC77C \uB144",
						yy: "%d\uB144"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "\uC77C";
							case "M":
								return s + "\uC6D4";
							case "w":
							case "W":
								return s + "\uC8FC";
							default:
								return s
						}
					},
					meridiemParse: /오전|오후/,
					isPM: function(s) {
						return s === "\uC624\uD6C4"
					},
					meridiem: function(s, n, r) {
						return s < 12 ? "\uC624\uC804" : "\uC624\uD6C4"
					}
				});
				return t
			})
		},
		226617: function(b, f, l) { //! moment.js locale configuration
			//! locale : Kurdish [ku]
			//! author : Shahram Mebashar : https://github.com/ShahramMebashar
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0661",
						2: "\u0662",
						3: "\u0663",
						4: "\u0664",
						5: "\u0665",
						6: "\u0666",
						7: "\u0667",
						8: "\u0668",
						9: "\u0669",
						0: "\u0660"
					},
					s = {
						"\u0661": "1",
						"\u0662": "2",
						"\u0663": "3",
						"\u0664": "4",
						"\u0665": "5",
						"\u0666": "6",
						"\u0667": "7",
						"\u0668": "8",
						"\u0669": "9",
						"\u0660": "0"
					},
					n = ["\u06A9\u0627\u0646\u0648\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u0634\u0648\u0628\u0627\u062A", "\u0626\u0627\u0632\u0627\u0631", "\u0646\u06CC\u0633\u0627\u0646", "\u0626\u0627\u06CC\u0627\u0631", "\u062D\u0648\u0632\u06D5\u06CC\u0631\u0627\u0646", "\u062A\u06D5\u0645\u0645\u0648\u0632", "\u0626\u0627\u0628", "\u0626\u06D5\u06CC\u0644\u0648\u0648\u0644", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u06CC\u06D5\u0643\u06D5\u0645", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u0643\u0627\u0646\u0648\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645"],
					r = o.defineLocale("ku", {
						months: n,
						monthsShort: n,
						weekdays: "\u06CC\u0647\u200C\u0643\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u062F\u0648\u0648\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0633\u06CE\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0686\u0648\u0627\u0631\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u067E\u06CE\u0646\u062C\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0647\u0647\u200C\u06CC\u0646\u06CC_\u0634\u0647\u200C\u0645\u0645\u0647\u200C".split("_"),
						weekdaysShort: "\u06CC\u0647\u200C\u0643\u0634\u0647\u200C\u0645_\u062F\u0648\u0648\u0634\u0647\u200C\u0645_\u0633\u06CE\u0634\u0647\u200C\u0645_\u0686\u0648\u0627\u0631\u0634\u0647\u200C\u0645_\u067E\u06CE\u0646\u062C\u0634\u0647\u200C\u0645_\u0647\u0647\u200C\u06CC\u0646\u06CC_\u0634\u0647\u200C\u0645\u0645\u0647\u200C".split("_"),
						weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u0647_\u0634".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						meridiemParse: /ئێواره‌|به‌یانی/,
						isPM: function(i) {
							return /ئێواره‌/.test(i)
						},
						meridiem: function(i, d, u) {
							return i < 12 ? "\u0628\u0647\u200C\u06CC\u0627\u0646\u06CC" : "\u0626\u06CE\u0648\u0627\u0631\u0647\u200C"
						},
						calendar: {
							sameDay: "[\u0626\u0647\u200C\u0645\u0631\u06C6 \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT",
							nextDay: "[\u0628\u0647\u200C\u06CC\u0627\u0646\u06CC \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT",
							nextWeek: "dddd [\u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT",
							lastDay: "[\u062F\u0648\u06CE\u0646\u06CE \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT",
							lastWeek: "dddd [\u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0644\u0647\u200C %s",
							past: "%s",
							s: "\u0686\u0647\u200C\u0646\u062F \u0686\u0631\u0643\u0647\u200C\u06CC\u0647\u200C\u0643",
							ss: "\u0686\u0631\u0643\u0647\u200C %d",
							m: "\u06CC\u0647\u200C\u0643 \u062E\u0648\u0644\u0647\u200C\u0643",
							mm: "%d \u062E\u0648\u0644\u0647\u200C\u0643",
							h: "\u06CC\u0647\u200C\u0643 \u0643\u0627\u062A\u0698\u0645\u06CE\u0631",
							hh: "%d \u0643\u0627\u062A\u0698\u0645\u06CE\u0631",
							d: "\u06CC\u0647\u200C\u0643 \u0695\u06C6\u0698",
							dd: "%d \u0695\u06C6\u0698",
							M: "\u06CC\u0647\u200C\u0643 \u0645\u0627\u0646\u06AF",
							MM: "%d \u0645\u0627\u0646\u06AF",
							y: "\u06CC\u0647\u200C\u0643 \u0633\u0627\u06B5",
							yy: "%d \u0633\u0627\u06B5"
						},
						preparse: function(i) {
							return i.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(d) {
								return s[d]
							}).replace(/،/g, ",")
						},
						postformat: function(i) {
							return i.replace(/\d/g, function(d) {
								return t[d]
							}).replace(/,/g, "\u060C")
						},
						week: {
							dow: 6,
							doy: 12
						}
					});
				return r
			})
		},
		689569: function(b, f, l) { //! moment.js locale configuration
			//! locale : Kyrgyz [ky]
			//! author : Chyngyz Arystan uulu : https://github.com/chyngyz
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						0: "-\u0447\u04AF",
						1: "-\u0447\u0438",
						2: "-\u0447\u0438",
						3: "-\u0447\u04AF",
						4: "-\u0447\u04AF",
						5: "-\u0447\u0438",
						6: "-\u0447\u044B",
						7: "-\u0447\u0438",
						8: "-\u0447\u0438",
						9: "-\u0447\u0443",
						10: "-\u0447\u0443",
						20: "-\u0447\u044B",
						30: "-\u0447\u0443",
						40: "-\u0447\u044B",
						50: "-\u0447\u04AF",
						60: "-\u0447\u044B",
						70: "-\u0447\u0438",
						80: "-\u0447\u0438",
						90: "-\u0447\u0443",
						100: "-\u0447\u04AF"
					},
					s = o.defineLocale("ky", {
						months: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_"),
						monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
						weekdays: "\u0416\u0435\u043A\u0448\u0435\u043C\u0431\u0438_\u0414\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF_\u0428\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043C\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0416\u0443\u043C\u0430_\u0418\u0448\u0435\u043C\u0431\u0438".split("_"),
						weekdaysShort: "\u0416\u0435\u043A_\u0414\u04AF\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043C_\u0418\u0448\u0435".split("_"),
						weekdaysMin: "\u0416\u043A_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043C_\u0418\u0448".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[\u0411\u04AF\u0433\u04AF\u043D \u0441\u0430\u0430\u0442] LT",
							nextDay: "[\u042D\u0440\u0442\u0435\u04A3 \u0441\u0430\u0430\u0442] LT",
							nextWeek: "dddd [\u0441\u0430\u0430\u0442] LT",
							lastDay: "[\u041A\u0435\u0447\u044D\u044D \u0441\u0430\u0430\u0442] LT",
							lastWeek: "[\u04E8\u0442\u043A\u04E9\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u043D] dddd [\u043A\u04AF\u043D\u04AF] [\u0441\u0430\u0430\u0442] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0438\u0447\u0438\u043D\u0434\u0435",
							past: "%s \u043C\u0443\u0440\u0443\u043D",
							s: "\u0431\u0438\u0440\u043D\u0435\u0447\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",
							ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434",
							m: "\u0431\u0438\u0440 \u043C\u04AF\u043D\u04E9\u0442",
							mm: "%d \u043C\u04AF\u043D\u04E9\u0442",
							h: "\u0431\u0438\u0440 \u0441\u0430\u0430\u0442",
							hh: "%d \u0441\u0430\u0430\u0442",
							d: "\u0431\u0438\u0440 \u043A\u04AF\u043D",
							dd: "%d \u043A\u04AF\u043D",
							M: "\u0431\u0438\u0440 \u0430\u0439",
							MM: "%d \u0430\u0439",
							y: "\u0431\u0438\u0440 \u0436\u044B\u043B",
							yy: "%d \u0436\u044B\u043B"
						},
						dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
						ordinal: function(n) {
							var r = n % 10,
								i = n >= 100 ? 100 : null;
							return n + (t[n] || t[r] || t[i])
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		281759: function(b, f, l) { //! moment.js locale configuration
			//! locale : Luxembourgish [lb]
			//! author : mweimerskirch : https://github.com/mweimerskirch
			//! author : David Raison : https://github.com/kwisatz
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(d, u, m, A) {
					var W = {
						m: ["eng Minutt", "enger Minutt"],
						h: ["eng Stonn", "enger Stonn"],
						d: ["een Dag", "engem Dag"],
						M: ["ee Mount", "engem Mount"],
						y: ["ee Joer", "engem Joer"]
					};
					return u ? W[m][0] : W[m][1]
				}

				function s(d) {
					var u = d.substr(0, d.indexOf(" "));
					return r(u) ? "a " + d : "an " + d
				}

				function n(d) {
					var u = d.substr(0, d.indexOf(" "));
					return r(u) ? "viru " + d : "virun " + d
				}

				function r(d) {
					if (d = parseInt(d, 10), isNaN(d)) return !1;
					if (d < 0) return !0;
					if (d < 10) return 4 <= d && d <= 7;
					if (d < 100) {
						var u = d % 10,
							m = d / 10;
						return r(u === 0 ? m : u)
					} else if (d < 1e4) {
						for (; d >= 10;) d = d / 10;
						return r(d)
					} else return d = d / 1e3, r(d)
				}
				var i = o.defineLocale("lb", {
					months: "Januar_Februar_M\xE4erz_Abr\xEBll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
					monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
					monthsParseExact: !0,
					weekdays: "Sonndeg_M\xE9indeg_D\xEBnschdeg_M\xEBttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
					weekdaysShort: "So._M\xE9._D\xEB._M\xEB._Do._Fr._Sa.".split("_"),
					weekdaysMin: "So_M\xE9_D\xEB_M\xEB_Do_Fr_Sa".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm [Auer]",
						LTS: "H:mm:ss [Auer]",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm [Auer]",
						LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
					},
					calendar: {
						sameDay: "[Haut um] LT",
						sameElse: "L",
						nextDay: "[Muer um] LT",
						nextWeek: "dddd [um] LT",
						lastDay: "[G\xEBschter um] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 2:
								case 4:
									return "[Leschten] dddd [um] LT";
								default:
									return "[Leschte] dddd [um] LT"
							}
						}
					},
					relativeTime: {
						future: s,
						past: n,
						s: "e puer Sekonnen",
						ss: "%d Sekonnen",
						m: t,
						mm: "%d Minutten",
						h: t,
						hh: "%d Stonnen",
						d: t,
						dd: "%d Deeg",
						M: t,
						MM: "%d M\xE9int",
						y: t,
						yy: "%d Joer"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return i
			})
		},
		544348: function(b, f, l) { //! moment.js locale configuration
			//! locale : Lao [lo]
			//! author : Ryan Hart : https://github.com/ryanhart2
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("lo", {
					months: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"),
					monthsShort: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"),
					weekdays: "\u0EAD\u0EB2\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"),
					weekdaysShort: "\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"),
					weekdaysMin: "\u0E97_\u0E88_\u0EAD\u0E84_\u0E9E_\u0E9E\u0EAB_\u0EAA\u0E81_\u0EAA".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "\u0EA7\u0EB1\u0E99dddd D MMMM YYYY HH:mm"
					},
					meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
					isPM: function(s) {
						return s === "\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87"
					},
					meridiem: function(s, n, r) {
						return s < 12 ? "\u0E95\u0EAD\u0E99\u0EC0\u0E8A\u0EBB\u0EC9\u0EB2" : "\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87"
					},
					calendar: {
						sameDay: "[\u0EA1\u0EB7\u0EC9\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",
						nextDay: "[\u0EA1\u0EB7\u0EC9\u0EAD\u0EB7\u0EC8\u0E99\u0EC0\u0EA7\u0EA5\u0EB2] LT",
						nextWeek: "[\u0EA7\u0EB1\u0E99]dddd[\u0EDC\u0EC9\u0EB2\u0EC0\u0EA7\u0EA5\u0EB2] LT",
						lastDay: "[\u0EA1\u0EB7\u0EC9\u0EA7\u0EB2\u0E99\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",
						lastWeek: "[\u0EA7\u0EB1\u0E99]dddd[\u0EC1\u0EA5\u0EC9\u0EA7\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0EAD\u0EB5\u0E81 %s",
						past: "%s\u0E9C\u0EC8\u0EB2\u0E99\u0EA1\u0EB2",
						s: "\u0E9A\u0ECD\u0EC8\u0EC0\u0E97\u0EBB\u0EC8\u0EB2\u0EC3\u0E94\u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5",
						ss: "%d \u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5",
						m: "1 \u0E99\u0EB2\u0E97\u0EB5",
						mm: "%d \u0E99\u0EB2\u0E97\u0EB5",
						h: "1 \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",
						hh: "%d \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",
						d: "1 \u0EA1\u0EB7\u0EC9",
						dd: "%d \u0EA1\u0EB7\u0EC9",
						M: "1 \u0EC0\u0E94\u0EB7\u0EAD\u0E99",
						MM: "%d \u0EC0\u0E94\u0EB7\u0EAD\u0E99",
						y: "1 \u0E9B\u0EB5",
						yy: "%d \u0E9B\u0EB5"
					},
					dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
					ordinal: function(s) {
						return "\u0E97\u0EB5\u0EC8" + s
					}
				});
				return t
			})
		},
		43767: function(b, f, l) { //! moment.js locale configuration
			//! locale : Lithuanian [lt]
			//! author : Mindaugas Mozūras : https://github.com/mmozuras
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
					ss: "sekund\u0117_sekund\u017Ei\u0173_sekundes",
					m: "minut\u0117_minut\u0117s_minut\u0119",
					mm: "minut\u0117s_minu\u010Di\u0173_minutes",
					h: "valanda_valandos_valand\u0105",
					hh: "valandos_valand\u0173_valandas",
					d: "diena_dienos_dien\u0105",
					dd: "dienos_dien\u0173_dienas",
					M: "m\u0117nuo_m\u0117nesio_m\u0117nes\u012F",
					MM: "m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",
					y: "metai_met\u0173_metus",
					yy: "metai_met\u0173_metus"
				};

				function s(m, A, W, q) {
					return A ? "kelios sekund\u0117s" : q ? "keli\u0173 sekund\u017Ei\u0173" : "kelias sekundes"
				}

				function n(m, A, W, q) {
					return A ? i(W)[0] : q ? i(W)[1] : i(W)[2]
				}

				function r(m) {
					return m % 10 == 0 || m > 10 && m < 20
				}

				function i(m) {
					return t[m].split("_")
				}

				function d(m, A, W, q) {
					var g = m + " ";
					return m === 1 ? g + n(m, A, W[0], q) : A ? g + (r(m) ? i(W)[1] : i(W)[0]) : q ? g + i(W)[1] : g + (r(m) ? i(W)[1] : i(W)[2])
				}
				var u = o.defineLocale("lt", {
					months: {
						format: "sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio".split("_"),
						standalone: "sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"),
						isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
					},
					monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
					weekdays: {
						format: "sekmadien\u012F_pirmadien\u012F_antradien\u012F_tre\u010Diadien\u012F_ketvirtadien\u012F_penktadien\u012F_\u0161e\u0161tadien\u012F".split("_"),
						standalone: "sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),
						isFormat: /dddd HH:mm/
					},
					weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"),
					weekdaysMin: "S_P_A_T_K_Pn_\u0160".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "YYYY [m.] MMMM D [d.]",
						LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
						LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
						l: "YYYY-MM-DD",
						ll: "YYYY [m.] MMMM D [d.]",
						lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
						llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
					},
					calendar: {
						sameDay: "[\u0160iandien] LT",
						nextDay: "[Rytoj] LT",
						nextWeek: "dddd LT",
						lastDay: "[Vakar] LT",
						lastWeek: "[Pra\u0117jus\u012F] dddd LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "po %s",
						past: "prie\u0161 %s",
						s: s,
						ss: d,
						m: n,
						mm: d,
						h: n,
						hh: d,
						d: n,
						dd: d,
						M: n,
						MM: d,
						y: n,
						yy: d
					},
					dayOfMonthOrdinalParse: /\d{1,2}-oji/,
					ordinal: function(m) {
						return m + "-oji"
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return u
			})
		},
		486672: function(b, f, l) { //! moment.js locale configuration
			//! locale : Latvian [lv]
			//! author : Kristaps Karlsons : https://github.com/skakri
			//! author : Jānis Elmeris : https://github.com/JanisE
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
					ss: "sekundes_sekund\u0113m_sekunde_sekundes".split("_"),
					m: "min\u016Btes_min\u016Bt\u0113m_min\u016Bte_min\u016Btes".split("_"),
					mm: "min\u016Btes_min\u016Bt\u0113m_min\u016Bte_min\u016Btes".split("_"),
					h: "stundas_stund\u0101m_stunda_stundas".split("_"),
					hh: "stundas_stund\u0101m_stunda_stundas".split("_"),
					d: "dienas_dien\u0101m_diena_dienas".split("_"),
					dd: "dienas_dien\u0101m_diena_dienas".split("_"),
					M: "m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),
					MM: "m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),
					y: "gada_gadiem_gads_gadi".split("_"),
					yy: "gada_gadiem_gads_gadi".split("_")
				};

				function s(u, m, A) {
					return A ? m % 10 == 1 && m % 100 != 11 ? u[2] : u[3] : m % 10 == 1 && m % 100 != 11 ? u[0] : u[1]
				}

				function n(u, m, A) {
					return u + " " + s(t[A], u, m)
				}

				function r(u, m, A) {
					return s(t[A], u, m)
				}

				function i(u, m) {
					return m ? "da\u017Eas sekundes" : "da\u017E\u0101m sekund\u0113m"
				}
				var d = o.defineLocale("lv", {
					months: "janv\u0101ris_febru\u0101ris_marts_apr\u012Blis_maijs_j\u016Bnijs_j\u016Blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
					monthsShort: "jan_feb_mar_apr_mai_j\u016Bn_j\u016Bl_aug_sep_okt_nov_dec".split("_"),
					weekdays: "sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),
					weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
					weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY.",
						LL: "YYYY. [gada] D. MMMM",
						LLL: "YYYY. [gada] D. MMMM, HH:mm",
						LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
					},
					calendar: {
						sameDay: "[\u0160odien pulksten] LT",
						nextDay: "[R\u012Bt pulksten] LT",
						nextWeek: "dddd [pulksten] LT",
						lastDay: "[Vakar pulksten] LT",
						lastWeek: "[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "p\u0113c %s",
						past: "pirms %s",
						s: i,
						ss: n,
						m: r,
						mm: n,
						h: r,
						hh: n,
						d: r,
						dd: n,
						M: r,
						MM: n,
						y: r,
						yy: n
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return d
			})
		},
		522909: function(b, f, l) { //! moment.js locale configuration
			//! locale : Montenegrin [me]
			//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						words: {
							ss: ["sekund", "sekunda", "sekundi"],
							m: ["jedan minut", "jednog minuta"],
							mm: ["minut", "minuta", "minuta"],
							h: ["jedan sat", "jednog sata"],
							hh: ["sat", "sata", "sati"],
							dd: ["dan", "dana", "dana"],
							MM: ["mjesec", "mjeseca", "mjeseci"],
							yy: ["godina", "godine", "godina"]
						},
						correctGrammaticalCase: function(n, r) {
							return n === 1 ? r[0] : n >= 2 && n <= 4 ? r[1] : r[2]
						},
						translate: function(n, r, i) {
							var d = t.words[i];
							return i.length === 1 ? r ? d[0] : d[1] : n + " " + t.correctGrammaticalCase(n, d)
						}
					},
					s = o.defineLocale("me", {
						months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
						monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
						monthsParseExact: !0,
						weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),
						weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),
						weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY H:mm",
							LLLL: "dddd, D. MMMM YYYY H:mm"
						},
						calendar: {
							sameDay: "[danas u] LT",
							nextDay: "[sjutra u] LT",
							nextWeek: function() {
								switch (this.day()) {
									case 0:
										return "[u] [nedjelju] [u] LT";
									case 3:
										return "[u] [srijedu] [u] LT";
									case 6:
										return "[u] [subotu] [u] LT";
									case 1:
									case 2:
									case 4:
									case 5:
										return "[u] dddd [u] LT"
								}
							},
							lastDay: "[ju\u010De u] LT",
							lastWeek: function() {
								var n = ["[pro\u0161le] [nedjelje] [u] LT", "[pro\u0161log] [ponedjeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srijede] [u] LT", "[pro\u0161log] [\u010Detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"];
								return n[this.day()]
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "za %s",
							past: "prije %s",
							s: "nekoliko sekundi",
							ss: t.translate,
							m: t.translate,
							mm: t.translate,
							h: t.translate,
							hh: t.translate,
							d: "dan",
							dd: t.translate,
							M: "mjesec",
							MM: t.translate,
							y: "godinu",
							yy: t.translate
						},
						dayOfMonthOrdinalParse: /\d{1,2}\./,
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		22894: function(b, f, l) { //! moment.js locale configuration
			//! locale : Maori [mi]
			//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("mi", {
					months: "Kohi-t\u0101te_Hui-tanguru_Pout\u016B-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014Dngoingoi_Here-turi-k\u014Dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"),
					monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014Dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
					monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
					monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
					monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
					monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
					weekdays: "R\u0101tapu_Mane_T\u016Brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"),
					weekdaysShort: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"),
					weekdaysMin: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [i] HH:mm",
						LLLL: "dddd, D MMMM YYYY [i] HH:mm"
					},
					calendar: {
						sameDay: "[i teie mahana, i] LT",
						nextDay: "[apopo i] LT",
						nextWeek: "dddd [i] LT",
						lastDay: "[inanahi i] LT",
						lastWeek: "dddd [whakamutunga i] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "i roto i %s",
						past: "%s i mua",
						s: "te h\u0113kona ruarua",
						ss: "%d h\u0113kona",
						m: "he meneti",
						mm: "%d meneti",
						h: "te haora",
						hh: "%d haora",
						d: "he ra",
						dd: "%d ra",
						M: "he marama",
						MM: "%d marama",
						y: "he tau",
						yy: "%d tau"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		635464: function(b, f, l) { //! moment.js locale configuration
			//! locale : Macedonian [mk]
			//! author : Borislav Mickov : https://github.com/B0k0
			//! author : Sashko Todorov : https://github.com/bkyceh
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("mk", {
					months: "\u0458\u0430\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0458_\u0458\u0443\u043D\u0438_\u0458\u0443\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"),
					monthsShort: "\u0458\u0430\u043D_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"),
					weekdays: "\u043D\u0435\u0434\u0435\u043B\u0430_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A_\u043F\u0435\u0442\u043E\u043A_\u0441\u0430\u0431\u043E\u0442\u0430".split("_"),
					weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u0430\u0431".split("_"),
					weekdaysMin: "\u043De_\u043Fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441a".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "D.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY H:mm",
						LLLL: "dddd, D MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[\u0414\u0435\u043D\u0435\u0441 \u0432\u043E] LT",
						nextDay: "[\u0423\u0442\u0440\u0435 \u0432\u043E] LT",
						nextWeek: "[\u0412\u043E] dddd [\u0432\u043E] LT",
						lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432\u043E] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
								case 3:
								case 6:
									return "[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043E] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0438\u043E\u0442] dddd [\u0432\u043E] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0437\u0430 %s",
						past: "\u043F\u0440\u0435\u0434 %s",
						s: "\u043D\u0435\u043A\u043E\u043B\u043A\u0443 \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
						ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
						m: "\u0435\u0434\u043D\u0430 \u043C\u0438\u043D\u0443\u0442\u0430",
						mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438",
						h: "\u0435\u0434\u0435\u043D \u0447\u0430\u0441",
						hh: "%d \u0447\u0430\u0441\u0430",
						d: "\u0435\u0434\u0435\u043D \u0434\u0435\u043D",
						dd: "%d \u0434\u0435\u043D\u0430",
						M: "\u0435\u0434\u0435\u043D \u043C\u0435\u0441\u0435\u0446",
						MM: "%d \u043C\u0435\u0441\u0435\u0446\u0438",
						y: "\u0435\u0434\u043D\u0430 \u0433\u043E\u0434\u0438\u043D\u0430",
						yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438"
					},
					dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
					ordinal: function(s) {
						var n = s % 10,
							r = s % 100;
						return s === 0 ? s + "-\u0435\u0432" : r === 0 ? s + "-\u0435\u043D" : r > 10 && r < 20 ? s + "-\u0442\u0438" : n === 1 ? s + "-\u0432\u0438" : n === 2 ? s + "-\u0440\u0438" : n === 7 || n === 8 ? s + "-\u043C\u0438" : s + "-\u0442\u0438"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		682694: function(b, f, l) { //! moment.js locale configuration
			//! locale : Malayalam [ml]
			//! author : Floyd Pink : https://github.com/floydpink
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ml", {
					months: "\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F_\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F_\u0D2E\u0D3E\u0D7C\u0D1A\u0D4D\u0D1A\u0D4D_\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D7D_\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48_\u0D13\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D_\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D7C_\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D7C_\u0D28\u0D35\u0D02\u0D2C\u0D7C_\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D7C".split("_"),
					monthsShort: "\u0D1C\u0D28\u0D41._\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41._\u0D2E\u0D3E\u0D7C._\u0D0F\u0D2A\u0D4D\u0D30\u0D3F._\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48._\u0D13\u0D17._\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31._\u0D12\u0D15\u0D4D\u0D1F\u0D4B._\u0D28\u0D35\u0D02._\u0D21\u0D3F\u0D38\u0D02.".split("_"),
					monthsParseExact: !0,
					weekdays: "\u0D1E\u0D3E\u0D2F\u0D31\u0D3E\u0D34\u0D4D\u0D1A_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D3E\u0D34\u0D4D\u0D1A_\u0D1A\u0D4A\u0D35\u0D4D\u0D35\u0D3E\u0D34\u0D4D\u0D1A_\u0D2C\u0D41\u0D27\u0D28\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A_\u0D36\u0D28\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A".split("_"),
					weekdaysShort: "\u0D1E\u0D3E\u0D2F\u0D7C_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D7E_\u0D1A\u0D4A\u0D35\u0D4D\u0D35_\u0D2C\u0D41\u0D27\u0D7B_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F_\u0D36\u0D28\u0D3F".split("_"),
					weekdaysMin: "\u0D1E\u0D3E_\u0D24\u0D3F_\u0D1A\u0D4A_\u0D2C\u0D41_\u0D35\u0D4D\u0D2F\u0D3E_\u0D35\u0D46_\u0D36".split("_"),
					longDateFormat: {
						LT: "A h:mm -\u0D28\u0D41",
						LTS: "A h:mm:ss -\u0D28\u0D41",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY, A h:mm -\u0D28\u0D41",
						LLLL: "dddd, D MMMM YYYY, A h:mm -\u0D28\u0D41"
					},
					calendar: {
						sameDay: "[\u0D07\u0D28\u0D4D\u0D28\u0D4D] LT",
						nextDay: "[\u0D28\u0D3E\u0D33\u0D46] LT",
						nextWeek: "dddd, LT",
						lastDay: "[\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46] LT",
						lastWeek: "[\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E] dddd, LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D",
						past: "%s \u0D2E\u0D41\u0D7B\u0D2A\u0D4D",
						s: "\u0D05\u0D7D\u0D2A \u0D28\u0D3F\u0D2E\u0D3F\u0D37\u0D19\u0D4D\u0D19\u0D7E",
						ss: "%d \u0D38\u0D46\u0D15\u0D4D\u0D15\u0D7B\u0D21\u0D4D",
						m: "\u0D12\u0D30\u0D41 \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",
						mm: "%d \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",
						h: "\u0D12\u0D30\u0D41 \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",
						hh: "%d \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",
						d: "\u0D12\u0D30\u0D41 \u0D26\u0D3F\u0D35\u0D38\u0D02",
						dd: "%d \u0D26\u0D3F\u0D35\u0D38\u0D02",
						M: "\u0D12\u0D30\u0D41 \u0D2E\u0D3E\u0D38\u0D02",
						MM: "%d \u0D2E\u0D3E\u0D38\u0D02",
						y: "\u0D12\u0D30\u0D41 \u0D35\u0D7C\u0D37\u0D02",
						yy: "%d \u0D35\u0D7C\u0D37\u0D02"
					},
					meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
					meridiemHour: function(s, n) {
						return s === 12 && (s = 0), n === "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F" && s >= 4 || n === "\u0D09\u0D1A\u0D4D\u0D1A \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D" || n === "\u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02" ? s + 12 : s
					},
					meridiem: function(s, n, r) {
						return s < 4 ? "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F" : s < 12 ? "\u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46" : s < 17 ? "\u0D09\u0D1A\u0D4D\u0D1A \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D" : s < 20 ? "\u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02" : "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F"
					}
				});
				return t
			})
		},
		845437: function(b, f, l) { //! moment.js locale configuration
			//! locale : Mongolian [mn]
			//! author : Javkhlantugs Nyamdorj : https://github.com/javkhaanj7
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					switch (i) {
						case "s":
							return r ? "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434" : "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D";
						case "ss":
							return n + (r ? " \u0441\u0435\u043A\u0443\u043D\u0434" : " \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D");
						case "m":
						case "mm":
							return n + (r ? " \u043C\u0438\u043D\u0443\u0442" : " \u043C\u0438\u043D\u0443\u0442\u044B\u043D");
						case "h":
						case "hh":
							return n + (r ? " \u0446\u0430\u0433" : " \u0446\u0430\u0433\u0438\u0439\u043D");
						case "d":
						case "dd":
							return n + (r ? " \u04E9\u0434\u04E9\u0440" : " \u04E9\u0434\u0440\u0438\u0439\u043D");
						case "M":
						case "MM":
							return n + (r ? " \u0441\u0430\u0440" : " \u0441\u0430\u0440\u044B\u043D");
						case "y":
						case "yy":
							return n + (r ? " \u0436\u0438\u043B" : " \u0436\u0438\u043B\u0438\u0439\u043D");
						default:
							return n
					}
				}
				var s = o.defineLocale("mn", {
					months: "\u041D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0425\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04E9\u0440\u04E9\u0432\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043E\u043B\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041D\u0430\u0439\u043C\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u043D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u0445\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"),
					monthsShort: "1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"),
					monthsParseExact: !0,
					weekdays: "\u041D\u044F\u043C_\u0414\u0430\u0432\u0430\u0430_\u041C\u044F\u0433\u043C\u0430\u0440_\u041B\u0445\u0430\u0433\u0432\u0430_\u041F\u04AF\u0440\u044D\u0432_\u0411\u0430\u0430\u0441\u0430\u043D_\u0411\u044F\u043C\u0431\u0430".split("_"),
					weekdaysShort: "\u041D\u044F\u043C_\u0414\u0430\u0432_\u041C\u044F\u0433_\u041B\u0445\u0430_\u041F\u04AF\u0440_\u0411\u0430\u0430_\u0411\u044F\u043C".split("_"),
					weekdaysMin: "\u041D\u044F_\u0414\u0430_\u041C\u044F_\u041B\u0445_\u041F\u04AF_\u0411\u0430_\u0411\u044F".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D",
						LLL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm",
						LLLL: "dddd, YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm"
					},
					meridiemParse: /ҮӨ|ҮХ/i,
					isPM: function(n) {
						return n === "\u04AE\u0425"
					},
					meridiem: function(n, r, i) {
						return n < 12 ? "\u04AE\u04E8" : "\u04AE\u0425"
					},
					calendar: {
						sameDay: "[\u04E8\u043D\u04E9\u04E9\u0434\u04E9\u0440] LT",
						nextDay: "[\u041C\u0430\u0440\u0433\u0430\u0430\u0448] LT",
						nextWeek: "[\u0418\u0440\u044D\u0445] dddd LT",
						lastDay: "[\u04E8\u0447\u0438\u0433\u0434\u04E9\u0440] LT",
						lastWeek: "[\u04E8\u043D\u0433\u04E9\u0440\u0441\u04E9\u043D] dddd LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \u0434\u0430\u0440\u0430\u0430",
						past: "%s \u04E9\u043C\u043D\u04E9",
						s: t,
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: t,
						dd: t,
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
					ordinal: function(n, r) {
						switch (r) {
							case "d":
							case "D":
							case "DDD":
								return n + " \u04E9\u0434\u04E9\u0440";
							default:
								return n
						}
					}
				});
				return s
			})
		},
		360333: function(b, f, l) { //! moment.js locale configuration
			//! locale : Marathi [mr]
			//! author : Harshad Kale : https://github.com/kalehv
			//! author : Vivek Athalye : https://github.com/vnathalye
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0967",
						2: "\u0968",
						3: "\u0969",
						4: "\u096A",
						5: "\u096B",
						6: "\u096C",
						7: "\u096D",
						8: "\u096E",
						9: "\u096F",
						0: "\u0966"
					},
					s = {
						"\u0967": "1",
						"\u0968": "2",
						"\u0969": "3",
						"\u096A": "4",
						"\u096B": "5",
						"\u096C": "6",
						"\u096D": "7",
						"\u096E": "8",
						"\u096F": "9",
						"\u0966": "0"
					};

				function n(i, d, u, m) {
					var A = "";
					if (d) switch (u) {
						case "s":
							A = "\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926";
							break;
						case "ss":
							A = "%d \u0938\u0947\u0915\u0902\u0926";
							break;
						case "m":
							A = "\u090F\u0915 \u092E\u093F\u0928\u093F\u091F";
							break;
						case "mm":
							A = "%d \u092E\u093F\u0928\u093F\u091F\u0947";
							break;
						case "h":
							A = "\u090F\u0915 \u0924\u093E\u0938";
							break;
						case "hh":
							A = "%d \u0924\u093E\u0938";
							break;
						case "d":
							A = "\u090F\u0915 \u0926\u093F\u0935\u0938";
							break;
						case "dd":
							A = "%d \u0926\u093F\u0935\u0938";
							break;
						case "M":
							A = "\u090F\u0915 \u092E\u0939\u093F\u0928\u093E";
							break;
						case "MM":
							A = "%d \u092E\u0939\u093F\u0928\u0947";
							break;
						case "y":
							A = "\u090F\u0915 \u0935\u0930\u094D\u0937";
							break;
						case "yy":
							A = "%d \u0935\u0930\u094D\u0937\u0947";
							break
					} else switch (u) {
						case "s":
							A = "\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093E\u0902";
							break;
						case "ss":
							A = "%d \u0938\u0947\u0915\u0902\u0926\u093E\u0902";
							break;
						case "m":
							A = "\u090F\u0915\u093E \u092E\u093F\u0928\u093F\u091F\u093E";
							break;
						case "mm":
							A = "%d \u092E\u093F\u0928\u093F\u091F\u093E\u0902";
							break;
						case "h":
							A = "\u090F\u0915\u093E \u0924\u093E\u0938\u093E";
							break;
						case "hh":
							A = "%d \u0924\u093E\u0938\u093E\u0902";
							break;
						case "d":
							A = "\u090F\u0915\u093E \u0926\u093F\u0935\u0938\u093E";
							break;
						case "dd":
							A = "%d \u0926\u093F\u0935\u0938\u093E\u0902";
							break;
						case "M":
							A = "\u090F\u0915\u093E \u092E\u0939\u093F\u0928\u094D\u092F\u093E";
							break;
						case "MM":
							A = "%d \u092E\u0939\u093F\u0928\u094D\u092F\u093E\u0902";
							break;
						case "y":
							A = "\u090F\u0915\u093E \u0935\u0930\u094D\u0937\u093E";
							break;
						case "yy":
							A = "%d \u0935\u0930\u094D\u0937\u093E\u0902";
							break
					}
					return A.replace(/%d/i, i)
				}
				var r = o.defineLocale("mr", {
					months: "\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u090F\u092A\u094D\u0930\u093F\u0932_\u092E\u0947_\u091C\u0942\u0928_\u091C\u0941\u0932\u0948_\u0911\u0917\u0938\u094D\u091F_\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930_\u0911\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930_\u0921\u093F\u0938\u0947\u0902\u092C\u0930".split("_"),
					monthsShort: "\u091C\u093E\u0928\u0947._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A._\u090F\u092A\u094D\u0930\u093F._\u092E\u0947._\u091C\u0942\u0928._\u091C\u0941\u0932\u0948._\u0911\u0917._\u0938\u092A\u094D\u091F\u0947\u0902._\u0911\u0915\u094D\u091F\u094B._\u0928\u094B\u0935\u094D\u0939\u0947\u0902._\u0921\u093F\u0938\u0947\u0902.".split("_"),
					monthsParseExact: !0,
					weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0933\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"),
					weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0933_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"),
					weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),
					longDateFormat: {
						LT: "A h:mm \u0935\u093E\u091C\u0924\u093E",
						LTS: "A h:mm:ss \u0935\u093E\u091C\u0924\u093E",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E",
						LLLL: "dddd, D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E"
					},
					calendar: {
						sameDay: "[\u0906\u091C] LT",
						nextDay: "[\u0909\u0926\u094D\u092F\u093E] LT",
						nextWeek: "dddd, LT",
						lastDay: "[\u0915\u093E\u0932] LT",
						lastWeek: "[\u092E\u093E\u0917\u0940\u0932] dddd, LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s\u092E\u0927\u094D\u092F\u0947",
						past: "%s\u092A\u0942\u0930\u094D\u0935\u0940",
						s: n,
						ss: n,
						m: n,
						mm: n,
						h: n,
						hh: n,
						d: n,
						dd: n,
						M: n,
						MM: n,
						y: n,
						yy: n
					},
					preparse: function(i) {
						return i.replace(/[१२३४५६७८९०]/g, function(d) {
							return s[d]
						})
					},
					postformat: function(i) {
						return i.replace(/\d/g, function(d) {
							return t[d]
						})
					},
					meridiemParse: /पहाटे|सकाळी|दुपारी|सायंकाळी|रात्री/,
					meridiemHour: function(i, d) {
						if (i === 12 && (i = 0), d === "\u092A\u0939\u093E\u091F\u0947" || d === "\u0938\u0915\u093E\u0933\u0940") return i;
						if (d === "\u0926\u0941\u092A\u093E\u0930\u0940" || d === "\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940" || d === "\u0930\u093E\u0924\u094D\u0930\u0940") return i >= 12 ? i : i + 12
					},
					meridiem: function(i, d, u) {
						return i >= 0 && i < 6 ? "\u092A\u0939\u093E\u091F\u0947" : i < 12 ? "\u0938\u0915\u093E\u0933\u0940" : i < 17 ? "\u0926\u0941\u092A\u093E\u0930\u0940" : i < 20 ? "\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940" : "\u0930\u093E\u0924\u094D\u0930\u0940"
					},
					week: {
						dow: 0,
						doy: 6
					}
				});
				return r
			})
		},
		326404: function(b, f, l) { //! moment.js locale configuration
			//! locale : Malay [ms-my]
			//! note : DEPRECATED, the correct one is [ms]
			//! author : Weldan Jamili : https://github.com/weldan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ms-my", {
					months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
					monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
					weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
					weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
					weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [pukul] HH.mm",
						LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
					},
					meridiemParse: /pagi|tengahari|petang|malam/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "pagi") return s;
						if (n === "tengahari") return s >= 11 ? s : s + 12;
						if (n === "petang" || n === "malam") return s + 12
					},
					meridiem: function(s, n, r) {
						return s < 11 ? "pagi" : s < 15 ? "tengahari" : s < 19 ? "petang" : "malam"
					},
					calendar: {
						sameDay: "[Hari ini pukul] LT",
						nextDay: "[Esok pukul] LT",
						nextWeek: "dddd [pukul] LT",
						lastDay: "[Kelmarin pukul] LT",
						lastWeek: "dddd [lepas pukul] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dalam %s",
						past: "%s yang lepas",
						s: "beberapa saat",
						ss: "%d saat",
						m: "seminit",
						mm: "%d minit",
						h: "sejam",
						hh: "%d jam",
						d: "sehari",
						dd: "%d hari",
						M: "sebulan",
						MM: "%d bulan",
						y: "setahun",
						yy: "%d tahun"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		407607: function(b, f, l) { //! moment.js locale configuration
			//! locale : Malay [ms]
			//! author : Weldan Jamili : https://github.com/weldan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ms", {
					months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
					monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
					weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
					weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
					weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [pukul] HH.mm",
						LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
					},
					meridiemParse: /pagi|tengahari|petang|malam/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "pagi") return s;
						if (n === "tengahari") return s >= 11 ? s : s + 12;
						if (n === "petang" || n === "malam") return s + 12
					},
					meridiem: function(s, n, r) {
						return s < 11 ? "pagi" : s < 15 ? "tengahari" : s < 19 ? "petang" : "malam"
					},
					calendar: {
						sameDay: "[Hari ini pukul] LT",
						nextDay: "[Esok pukul] LT",
						nextWeek: "dddd [pukul] LT",
						lastDay: "[Kelmarin pukul] LT",
						lastWeek: "dddd [lepas pukul] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dalam %s",
						past: "%s yang lepas",
						s: "beberapa saat",
						ss: "%d saat",
						m: "seminit",
						mm: "%d minit",
						h: "sejam",
						hh: "%d jam",
						d: "sehari",
						dd: "%d hari",
						M: "sebulan",
						MM: "%d bulan",
						y: "setahun",
						yy: "%d tahun"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		815346: function(b, f, l) { //! moment.js locale configuration
			//! locale : Maltese (Malta) [mt]
			//! author : Alessandro Maruccia : https://github.com/alesma
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("mt", {
					months: "Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010Bembru".split("_"),
					monthsShort: "Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010B".split("_"),
					weekdays: "Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt".split("_"),
					weekdaysShort: "\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib".split("_"),
					weekdaysMin: "\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Illum fil-]LT",
						nextDay: "[G\u0127ada fil-]LT",
						nextWeek: "dddd [fil-]LT",
						lastDay: "[Il-biera\u0127 fil-]LT",
						lastWeek: "dddd [li g\u0127adda] [fil-]LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "f\u2019 %s",
						past: "%s ilu",
						s: "ftit sekondi",
						ss: "%d sekondi",
						m: "minuta",
						mm: "%d minuti",
						h: "sieg\u0127a",
						hh: "%d sieg\u0127at",
						d: "\u0121urnata",
						dd: "%d \u0121ranet",
						M: "xahar",
						MM: "%d xhur",
						y: "sena",
						yy: "%d sni"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		733053: function(b, f, l) { //! moment.js locale configuration
			//! locale : Burmese [my]
			//! author : Squar team, mysquar.com
			//! author : David Rossellat : https://github.com/gholadr
			//! author : Tin Aung Lin : https://github.com/thanyawzinmin
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u1041",
						2: "\u1042",
						3: "\u1043",
						4: "\u1044",
						5: "\u1045",
						6: "\u1046",
						7: "\u1047",
						8: "\u1048",
						9: "\u1049",
						0: "\u1040"
					},
					s = {
						"\u1041": "1",
						"\u1042": "2",
						"\u1043": "3",
						"\u1044": "4",
						"\u1045": "5",
						"\u1046": "6",
						"\u1047": "7",
						"\u1048": "8",
						"\u1049": "9",
						"\u1040": "0"
					},
					n = o.defineLocale("my", {
						months: "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E_\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E_\u1019\u1010\u103A_\u1027\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u1007\u1030\u101C\u102D\u102F\u1004\u103A_\u101E\u103C\u1002\u102F\u1010\u103A_\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C_\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C_\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C_\u1012\u102E\u1007\u1004\u103A\u1018\u102C".split("_"),
						monthsShort: "\u1007\u1014\u103A_\u1016\u1031_\u1019\u1010\u103A_\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u101C\u102D\u102F\u1004\u103A_\u101E\u103C_\u1005\u1000\u103A_\u1021\u1031\u102C\u1000\u103A_\u1014\u102D\u102F_\u1012\u102E".split("_"),
						weekdays: "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031_\u1010\u1014\u1004\u103A\u1039\u101C\u102C_\u1021\u1004\u103A\u1039\u1002\u102B_\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038_\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038_\u101E\u1031\u102C\u1000\u103C\u102C_\u1005\u1014\u1031".split("_"),
						weekdaysShort: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"),
						weekdaysMin: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[\u101A\u1014\u1031.] LT [\u1019\u103E\u102C]",
							nextDay: "[\u1019\u1014\u1000\u103A\u1016\u103C\u1014\u103A] LT [\u1019\u103E\u102C]",
							nextWeek: "dddd LT [\u1019\u103E\u102C]",
							lastDay: "[\u1019\u1014\u1031.\u1000] LT [\u1019\u103E\u102C]",
							lastWeek: "[\u1015\u103C\u102E\u1038\u1001\u1032\u1037\u101E\u1031\u102C] dddd LT [\u1019\u103E\u102C]",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C",
							past: "\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000",
							s: "\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A",
							ss: "%d \u1005\u1000\u1039\u1000\u1014\u1037\u103A",
							m: "\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A",
							mm: "%d \u1019\u102D\u1014\u1005\u103A",
							h: "\u1010\u1005\u103A\u1014\u102C\u101B\u102E",
							hh: "%d \u1014\u102C\u101B\u102E",
							d: "\u1010\u1005\u103A\u101B\u1000\u103A",
							dd: "%d \u101B\u1000\u103A",
							M: "\u1010\u1005\u103A\u101C",
							MM: "%d \u101C",
							y: "\u1010\u1005\u103A\u1014\u103E\u1005\u103A",
							yy: "%d \u1014\u103E\u1005\u103A"
						},
						preparse: function(r) {
							return r.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return n
			})
		},
		904092: function(b, f, l) { //! moment.js locale configuration
			//! locale : Norwegian Bokmål [nb]
			//! authors : Espen Hovlandsdal : https://github.com/rexxars
			//!           Sigurd Gartmann : https://github.com/sigurdga
			//!           Stephen Ramthun : https://github.com/stephenramthun
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("nb", {
					months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
					monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
					monthsParseExact: !0,
					weekdays: "s\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag".split("_"),
					weekdaysShort: "s\xF8._ma._ti._on._to._fr._l\xF8.".split("_"),
					weekdaysMin: "s\xF8_ma_ti_on_to_fr_l\xF8".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY [kl.] HH:mm",
						LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
					},
					calendar: {
						sameDay: "[i dag kl.] LT",
						nextDay: "[i morgen kl.] LT",
						nextWeek: "dddd [kl.] LT",
						lastDay: "[i g\xE5r kl.] LT",
						lastWeek: "[forrige] dddd [kl.] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "om %s",
						past: "%s siden",
						s: "noen sekunder",
						ss: "%d sekunder",
						m: "ett minutt",
						mm: "%d minutter",
						h: "en time",
						hh: "%d timer",
						d: "en dag",
						dd: "%d dager",
						w: "en uke",
						ww: "%d uker",
						M: "en m\xE5ned",
						MM: "%d m\xE5neder",
						y: "ett \xE5r",
						yy: "%d \xE5r"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		815563: function(b, f, l) { //! moment.js locale configuration
			//! locale : Nepalese [ne]
			//! author : suvash : https://github.com/suvash
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0967",
						2: "\u0968",
						3: "\u0969",
						4: "\u096A",
						5: "\u096B",
						6: "\u096C",
						7: "\u096D",
						8: "\u096E",
						9: "\u096F",
						0: "\u0966"
					},
					s = {
						"\u0967": "1",
						"\u0968": "2",
						"\u0969": "3",
						"\u096A": "4",
						"\u096B": "5",
						"\u096C": "6",
						"\u096D": "7",
						"\u096E": "8",
						"\u096F": "9",
						"\u0966": "0"
					},
					n = o.defineLocale("ne", {
						months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F\u0932_\u092E\u0908_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0937\u094D\u091F_\u0938\u0947\u092A\u094D\u091F\u0947\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u092D\u0947\u092E\u094D\u092C\u0930_\u0921\u093F\u0938\u0947\u092E\u094D\u092C\u0930".split("_"),
						monthsShort: "\u091C\u0928._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F._\u092E\u0908_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908._\u0905\u0917._\u0938\u0947\u092A\u094D\u091F._\u0905\u0915\u094D\u091F\u094B._\u0928\u094B\u092D\u0947._\u0921\u093F\u0938\u0947.".split("_"),
						monthsParseExact: !0,
						weekdays: "\u0906\u0907\u0924\u092C\u093E\u0930_\u0938\u094B\u092E\u092C\u093E\u0930_\u092E\u0919\u094D\u0917\u0932\u092C\u093E\u0930_\u092C\u0941\u0927\u092C\u093E\u0930_\u092C\u093F\u0939\u093F\u092C\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930_\u0936\u0928\u093F\u092C\u093E\u0930".split("_"),
						weekdaysShort: "\u0906\u0907\u0924._\u0938\u094B\u092E._\u092E\u0919\u094D\u0917\u0932._\u092C\u0941\u0927._\u092C\u093F\u0939\u093F._\u0936\u0941\u0915\u094D\u0930._\u0936\u0928\u093F.".split("_"),
						weekdaysMin: "\u0906._\u0938\u094B._\u092E\u0902._\u092C\u0941._\u092C\u093F._\u0936\u0941._\u0936.".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "A\u0915\u094B h:mm \u092C\u091C\u0947",
							LTS: "A\u0915\u094B h:mm:ss \u092C\u091C\u0947",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947",
							LLLL: "dddd, D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947"
						},
						preparse: function(r) {
							return r.replace(/[१२३४५६७८९०]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
						meridiemHour: function(r, i) {
							if (r === 12 && (r = 0), i === "\u0930\u093E\u0924\u093F") return r < 4 ? r : r + 12;
							if (i === "\u092C\u093F\u0939\u093E\u0928") return r;
							if (i === "\u0926\u093F\u0909\u0901\u0938\u094B") return r >= 10 ? r : r + 12;
							if (i === "\u0938\u093E\u0901\u091D") return r + 12
						},
						meridiem: function(r, i, d) {
							return r < 3 ? "\u0930\u093E\u0924\u093F" : r < 12 ? "\u092C\u093F\u0939\u093E\u0928" : r < 16 ? "\u0926\u093F\u0909\u0901\u0938\u094B" : r < 20 ? "\u0938\u093E\u0901\u091D" : "\u0930\u093E\u0924\u093F"
						},
						calendar: {
							sameDay: "[\u0906\u091C] LT",
							nextDay: "[\u092D\u094B\u0932\u093F] LT",
							nextWeek: "[\u0906\u0909\u0901\u0926\u094B] dddd[,] LT",
							lastDay: "[\u0939\u093F\u091C\u094B] LT",
							lastWeek: "[\u0917\u090F\u0915\u094B] dddd[,] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u092E\u093E",
							past: "%s \u0905\u0917\u093E\u0921\u093F",
							s: "\u0915\u0947\u0939\u0940 \u0915\u094D\u0937\u0923",
							ss: "%d \u0938\u0947\u0915\u0947\u0923\u094D\u0921",
							m: "\u090F\u0915 \u092E\u093F\u0928\u0947\u091F",
							mm: "%d \u092E\u093F\u0928\u0947\u091F",
							h: "\u090F\u0915 \u0918\u0923\u094D\u091F\u093E",
							hh: "%d \u0918\u0923\u094D\u091F\u093E",
							d: "\u090F\u0915 \u0926\u093F\u0928",
							dd: "%d \u0926\u093F\u0928",
							M: "\u090F\u0915 \u092E\u0939\u093F\u0928\u093E",
							MM: "%d \u092E\u0939\u093F\u0928\u093E",
							y: "\u090F\u0915 \u092C\u0930\u094D\u0937",
							yy: "%d \u092C\u0930\u094D\u0937"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		240746: function(b, f, l) { //! moment.js locale configuration
			//! locale : Dutch (Belgium) [nl-be]
			//! author : Joris Röling : https://github.com/jorisroling
			//! author : Jacob Middag : https://github.com/middagj
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
					s = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
					n = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
					r = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
					i = o.defineLocale("nl-be", {
						months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
						monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
						weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
						weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[vandaag om] LT",
							nextDay: "[morgen om] LT",
							nextWeek: "dddd [om] LT",
							lastDay: "[gisteren om] LT",
							lastWeek: "[afgelopen] dddd [om] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "over %s",
							past: "%s geleden",
							s: "een paar seconden",
							ss: "%d seconden",
							m: "\xE9\xE9n minuut",
							mm: "%d minuten",
							h: "\xE9\xE9n uur",
							hh: "%d uur",
							d: "\xE9\xE9n dag",
							dd: "%d dagen",
							M: "\xE9\xE9n maand",
							MM: "%d maanden",
							y: "\xE9\xE9n jaar",
							yy: "%d jaar"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
						ordinal: function(d) {
							return d + (d === 1 || d === 8 || d >= 20 ? "ste" : "de")
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return i
			})
		},
		336303: function(b, f, l) { //! moment.js locale configuration
			//! locale : Dutch [nl]
			//! author : Joris Röling : https://github.com/jorisroling
			//! author : Jacob Middag : https://github.com/middagj
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
					s = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
					n = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
					r = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
					i = o.defineLocale("nl", {
						months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
						monthsShort: function(d, u) {
							return d ? /-MMM-/.test(u) ? s[d.month()] : t[d.month()] : t
						},
						monthsRegex: r,
						monthsShortRegex: r,
						monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
						monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
						weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
						weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD-MM-YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[vandaag om] LT",
							nextDay: "[morgen om] LT",
							nextWeek: "dddd [om] LT",
							lastDay: "[gisteren om] LT",
							lastWeek: "[afgelopen] dddd [om] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "over %s",
							past: "%s geleden",
							s: "een paar seconden",
							ss: "%d seconden",
							m: "\xE9\xE9n minuut",
							mm: "%d minuten",
							h: "\xE9\xE9n uur",
							hh: "%d uur",
							d: "\xE9\xE9n dag",
							dd: "%d dagen",
							w: "\xE9\xE9n week",
							ww: "%d weken",
							M: "\xE9\xE9n maand",
							MM: "%d maanden",
							y: "\xE9\xE9n jaar",
							yy: "%d jaar"
						},
						dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
						ordinal: function(d) {
							return d + (d === 1 || d === 8 || d >= 20 ? "ste" : "de")
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return i
			})
		},
		504467: function(b, f, l) { //! moment.js locale configuration
			//! locale : Nynorsk [nn]
			//! authors : https://github.com/mechuwind
			//!           Stephen Ramthun : https://github.com/stephenramthun
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("nn", {
					months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
					monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
					monthsParseExact: !0,
					weekdays: "sundag_m\xE5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
					weekdaysShort: "su._m\xE5._ty._on._to._fr._lau.".split("_"),
					weekdaysMin: "su_m\xE5_ty_on_to_fr_la".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY [kl.] H:mm",
						LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
					},
					calendar: {
						sameDay: "[I dag klokka] LT",
						nextDay: "[I morgon klokka] LT",
						nextWeek: "dddd [klokka] LT",
						lastDay: "[I g\xE5r klokka] LT",
						lastWeek: "[F\xF8reg\xE5ande] dddd [klokka] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "om %s",
						past: "%s sidan",
						s: "nokre sekund",
						ss: "%d sekund",
						m: "eit minutt",
						mm: "%d minutt",
						h: "ein time",
						hh: "%d timar",
						d: "ein dag",
						dd: "%d dagar",
						w: "ei veke",
						ww: "%d veker",
						M: "ein m\xE5nad",
						MM: "%d m\xE5nader",
						y: "eit \xE5r",
						yy: "%d \xE5r"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		474878: function(b, f, l) { //! moment.js locale configuration
			//! locale : Occitan, lengadocian dialecte [oc-lnc]
			//! author : Quentin PAGÈS : https://github.com/Quenty31
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("oc-lnc", {
					months: {
						standalone: "geni\xE8r_febri\xE8r_mar\xE7_abril_mai_junh_julhet_agost_setembre_oct\xF2bre_novembre_decembre".split("_"),
						format: "de geni\xE8r_de febri\xE8r_de mar\xE7_d'abril_de mai_de junh_de julhet_d'agost_de setembre_d'oct\xF2bre_de novembre_de decembre".split("_"),
						isFormat: /D[oD]?(\s)+MMMM/
					},
					monthsShort: "gen._febr._mar\xE7_abr._mai_junh_julh._ago._set._oct._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "dimenge_diluns_dimars_dim\xE8cres_dij\xF2us_divendres_dissabte".split("_"),
					weekdaysShort: "dg._dl._dm._dc._dj._dv._ds.".split("_"),
					weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM [de] YYYY",
						ll: "D MMM YYYY",
						LLL: "D MMMM [de] YYYY [a] H:mm",
						lll: "D MMM YYYY, H:mm",
						LLLL: "dddd D MMMM [de] YYYY [a] H:mm",
						llll: "ddd D MMM YYYY, H:mm"
					},
					calendar: {
						sameDay: "[u\xE8i a] LT",
						nextDay: "[deman a] LT",
						nextWeek: "dddd [a] LT",
						lastDay: "[i\xE8r a] LT",
						lastWeek: "dddd [passat a] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "d'aqu\xED %s",
						past: "fa %s",
						s: "unas segondas",
						ss: "%d segondas",
						m: "una minuta",
						mm: "%d minutas",
						h: "una ora",
						hh: "%d oras",
						d: "un jorn",
						dd: "%d jorns",
						M: "un mes",
						MM: "%d meses",
						y: "un an",
						yy: "%d ans"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
					ordinal: function(s, n) {
						var r = s === 1 ? "r" : s === 2 ? "n" : s === 3 ? "r" : s === 4 ? "t" : "\xE8";
						return (n === "w" || n === "W") && (r = "a"), s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		452963: function(b, f, l) { //! moment.js locale configuration
			//! locale : Punjabi (India) [pa-in]
			//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0A67",
						2: "\u0A68",
						3: "\u0A69",
						4: "\u0A6A",
						5: "\u0A6B",
						6: "\u0A6C",
						7: "\u0A6D",
						8: "\u0A6E",
						9: "\u0A6F",
						0: "\u0A66"
					},
					s = {
						"\u0A67": "1",
						"\u0A68": "2",
						"\u0A69": "3",
						"\u0A6A": "4",
						"\u0A6B": "5",
						"\u0A6C": "6",
						"\u0A6D": "7",
						"\u0A6E": "8",
						"\u0A6F": "9",
						"\u0A66": "0"
					},
					n = o.defineLocale("pa-in", {
						months: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"),
						monthsShort: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"),
						weekdays: "\u0A10\u0A24\u0A35\u0A3E\u0A30_\u0A38\u0A4B\u0A2E\u0A35\u0A3E\u0A30_\u0A2E\u0A70\u0A17\u0A32\u0A35\u0A3E\u0A30_\u0A2C\u0A41\u0A27\u0A35\u0A3E\u0A30_\u0A35\u0A40\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A41\u0A71\u0A15\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A28\u0A40\u0A1A\u0A30\u0A35\u0A3E\u0A30".split("_"),
						weekdaysShort: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"),
						weekdaysMin: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"),
						longDateFormat: {
							LT: "A h:mm \u0A35\u0A1C\u0A47",
							LTS: "A h:mm:ss \u0A35\u0A1C\u0A47",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47",
							LLLL: "dddd, D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47"
						},
						calendar: {
							sameDay: "[\u0A05\u0A1C] LT",
							nextDay: "[\u0A15\u0A32] LT",
							nextWeek: "[\u0A05\u0A17\u0A32\u0A3E] dddd, LT",
							lastDay: "[\u0A15\u0A32] LT",
							lastWeek: "[\u0A2A\u0A3F\u0A1B\u0A32\u0A47] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0A35\u0A3F\u0A71\u0A1A",
							past: "%s \u0A2A\u0A3F\u0A1B\u0A32\u0A47",
							s: "\u0A15\u0A41\u0A1D \u0A38\u0A15\u0A3F\u0A70\u0A1F",
							ss: "%d \u0A38\u0A15\u0A3F\u0A70\u0A1F",
							m: "\u0A07\u0A15 \u0A2E\u0A3F\u0A70\u0A1F",
							mm: "%d \u0A2E\u0A3F\u0A70\u0A1F",
							h: "\u0A07\u0A71\u0A15 \u0A18\u0A70\u0A1F\u0A3E",
							hh: "%d \u0A18\u0A70\u0A1F\u0A47",
							d: "\u0A07\u0A71\u0A15 \u0A26\u0A3F\u0A28",
							dd: "%d \u0A26\u0A3F\u0A28",
							M: "\u0A07\u0A71\u0A15 \u0A2E\u0A39\u0A40\u0A28\u0A3E",
							MM: "%d \u0A2E\u0A39\u0A40\u0A28\u0A47",
							y: "\u0A07\u0A71\u0A15 \u0A38\u0A3E\u0A32",
							yy: "%d \u0A38\u0A3E\u0A32"
						},
						preparse: function(r) {
							return r.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
						meridiemHour: function(r, i) {
							if (r === 12 && (r = 0), i === "\u0A30\u0A3E\u0A24") return r < 4 ? r : r + 12;
							if (i === "\u0A38\u0A35\u0A47\u0A30") return r;
							if (i === "\u0A26\u0A41\u0A2A\u0A39\u0A3F\u0A30") return r >= 10 ? r : r + 12;
							if (i === "\u0A38\u0A3C\u0A3E\u0A2E") return r + 12
						},
						meridiem: function(r, i, d) {
							return r < 4 ? "\u0A30\u0A3E\u0A24" : r < 10 ? "\u0A38\u0A35\u0A47\u0A30" : r < 17 ? "\u0A26\u0A41\u0A2A\u0A39\u0A3F\u0A30" : r < 20 ? "\u0A38\u0A3C\u0A3E\u0A2E" : "\u0A30\u0A3E\u0A24"
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		893422: function(b, f, l) { //! moment.js locale configuration
			//! locale : Polish [pl]
			//! author : Rafal Hirsz : https://github.com/evoL
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144".split("_"),
					s = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia".split("_"),
					n = [/^sty/i, /^lut/i, /^mar/i, /^kwi/i, /^maj/i, /^cze/i, /^lip/i, /^sie/i, /^wrz/i, /^paź/i, /^lis/i, /^gru/i];

				function r(u) {
					return u % 10 < 5 && u % 10 > 1 && ~~(u / 10) % 10 != 1
				}

				function i(u, m, A) {
					var W = u + " ";
					switch (A) {
						case "ss":
							return W + (r(u) ? "sekundy" : "sekund");
						case "m":
							return m ? "minuta" : "minut\u0119";
						case "mm":
							return W + (r(u) ? "minuty" : "minut");
						case "h":
							return m ? "godzina" : "godzin\u0119";
						case "hh":
							return W + (r(u) ? "godziny" : "godzin");
						case "ww":
							return W + (r(u) ? "tygodnie" : "tygodni");
						case "MM":
							return W + (r(u) ? "miesi\u0105ce" : "miesi\u0119cy");
						case "yy":
							return W + (r(u) ? "lata" : "lat")
					}
				}
				var d = o.defineLocale("pl", {
					months: function(u, m) {
						return u ? /D MMMM/.test(m) ? s[u.month()] : t[u.month()] : t
					},
					monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru".split("_"),
					monthsParse: n,
					longMonthsParse: n,
					shortMonthsParse: n,
					weekdays: "niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota".split("_"),
					weekdaysShort: "ndz_pon_wt_\u015Br_czw_pt_sob".split("_"),
					weekdaysMin: "Nd_Pn_Wt_\u015Ar_Cz_Pt_So".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Dzi\u015B o] LT",
						nextDay: "[Jutro o] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[W niedziel\u0119 o] LT";
								case 2:
									return "[We wtorek o] LT";
								case 3:
									return "[W \u015Brod\u0119 o] LT";
								case 6:
									return "[W sobot\u0119 o] LT";
								default:
									return "[W] dddd [o] LT"
							}
						},
						lastDay: "[Wczoraj o] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";
								case 3:
									return "[W zesz\u0142\u0105 \u015Brod\u0119 o] LT";
								case 6:
									return "[W zesz\u0142\u0105 sobot\u0119 o] LT";
								default:
									return "[W zesz\u0142y] dddd [o] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "za %s",
						past: "%s temu",
						s: "kilka sekund",
						ss: i,
						m: i,
						mm: i,
						h: i,
						hh: i,
						d: "1 dzie\u0144",
						dd: "%d dni",
						w: "tydzie\u0144",
						ww: i,
						M: "miesi\u0105c",
						MM: i,
						y: "rok",
						yy: i
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return d
			})
		},
		175044: function(b, f, l) { //! moment.js locale configuration
			//! locale : Portuguese (Brazil) [pt-br]
			//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("pt-br", {
					months: "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
					monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
					weekdays: "domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado".split("_"),
					weekdaysShort: "dom_seg_ter_qua_qui_sex_s\xE1b".split("_"),
					weekdaysMin: "do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_s\xE1".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D [de] MMMM [de] YYYY",
						LLL: "D [de] MMMM [de] YYYY [\xE0s] HH:mm",
						LLLL: "dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm"
					},
					calendar: {
						sameDay: "[Hoje \xE0s] LT",
						nextDay: "[Amanh\xE3 \xE0s] LT",
						nextWeek: "dddd [\xE0s] LT",
						lastDay: "[Ontem \xE0s] LT",
						lastWeek: function() {
							return this.day() === 0 || this.day() === 6 ? "[\xDAltimo] dddd [\xE0s] LT" : "[\xDAltima] dddd [\xE0s] LT"
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "em %s",
						past: "h\xE1 %s",
						s: "poucos segundos",
						ss: "%d segundos",
						m: "um minuto",
						mm: "%d minutos",
						h: "uma hora",
						hh: "%d horas",
						d: "um dia",
						dd: "%d dias",
						M: "um m\xEAs",
						MM: "%d meses",
						y: "um ano",
						yy: "%d anos"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					invalidDate: "Data inv\xE1lida"
				});
				return t
			})
		},
		359903: function(b, f, l) { //! moment.js locale configuration
			//! locale : Portuguese [pt]
			//! author : Jefferson : https://github.com/jalex79
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("pt", {
					months: "janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
					monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
					weekdays: "Domingo_Segunda-feira_Ter\xE7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xE1bado".split("_"),
					weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\xE1b".split("_"),
					weekdaysMin: "Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_S\xE1".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D [de] MMMM [de] YYYY",
						LLL: "D [de] MMMM [de] YYYY HH:mm",
						LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Hoje \xE0s] LT",
						nextDay: "[Amanh\xE3 \xE0s] LT",
						nextWeek: "dddd [\xE0s] LT",
						lastDay: "[Ontem \xE0s] LT",
						lastWeek: function() {
							return this.day() === 0 || this.day() === 6 ? "[\xDAltimo] dddd [\xE0s] LT" : "[\xDAltima] dddd [\xE0s] LT"
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "em %s",
						past: "h\xE1 %s",
						s: "segundos",
						ss: "%d segundos",
						m: "um minuto",
						mm: "%d minutos",
						h: "uma hora",
						hh: "%d horas",
						d: "um dia",
						dd: "%d dias",
						w: "uma semana",
						ww: "%d semanas",
						M: "um m\xEAs",
						MM: "%d meses",
						y: "um ano",
						yy: "%d anos"
					},
					dayOfMonthOrdinalParse: /\d{1,2}º/,
					ordinal: "%d\xBA",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		349438: function(b, f, l) { //! moment.js locale configuration
			//! locale : Romanian [ro]
			//! author : Vlad Gurdiga : https://github.com/gurdiga
			//! author : Valentin Agachi : https://github.com/avaly
			//! author : Emanuel Cepoi : https://github.com/cepem
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i) {
					var d = {
							ss: "secunde",
							mm: "minute",
							hh: "ore",
							dd: "zile",
							ww: "s\u0103pt\u0103m\xE2ni",
							MM: "luni",
							yy: "ani"
						},
						u = " ";
					return (n % 100 >= 20 || n >= 100 && n % 100 == 0) && (u = " de "), n + u + d[i]
				}
				var s = o.defineLocale("ro", {
					months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
					monthsShort: "ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "duminic\u0103_luni_mar\u021Bi_miercuri_joi_vineri_s\xE2mb\u0103t\u0103".split("_"),
					weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\xE2m".split("_"),
					weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\xE2".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY H:mm",
						LLLL: "dddd, D MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[azi la] LT",
						nextDay: "[m\xE2ine la] LT",
						nextWeek: "dddd [la] LT",
						lastDay: "[ieri la] LT",
						lastWeek: "[fosta] dddd [la] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "peste %s",
						past: "%s \xEEn urm\u0103",
						s: "c\xE2teva secunde",
						ss: t,
						m: "un minut",
						mm: t,
						h: "o or\u0103",
						hh: t,
						d: "o zi",
						dd: t,
						w: "o s\u0103pt\u0103m\xE2n\u0103",
						ww: t,
						M: "o lun\u0103",
						MM: t,
						y: "un an",
						yy: t
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return s
			})
		},
		401064: function(b, f, l) { //! moment.js locale configuration
			//! locale : Russian [ru]
			//! author : Viktorminator : https://github.com/Viktorminator
			//! author : Menelion Elensúle : https://github.com/Oire
			//! author : Коренберг Марк : https://github.com/socketpair
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(i, d) {
					var u = i.split("_");
					return d % 10 == 1 && d % 100 != 11 ? u[0] : d % 10 >= 2 && d % 10 <= 4 && (d % 100 < 10 || d % 100 >= 20) ? u[1] : u[2]
				}

				function s(i, d, u) {
					var m = {
						ss: d ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434",
						mm: d ? "\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442" : "\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442",
						hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432",
						dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439",
						ww: "\u043D\u0435\u0434\u0435\u043B\u044F_\u043D\u0435\u0434\u0435\u043B\u0438_\u043D\u0435\u0434\u0435\u043B\u044C",
						MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432",
						yy: "\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442"
					};
					return u === "m" ? d ? "\u043C\u0438\u043D\u0443\u0442\u0430" : "\u043C\u0438\u043D\u0443\u0442\u0443" : i + " " + t(m[u], +i)
				}
				var n = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
					r = o.defineLocale("ru", {
						months: {
							format: "\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F".split("_"),
							standalone: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_")
						},
						monthsShort: {
							format: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_"),
							standalone: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_")
						},
						weekdays: {
							standalone: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430".split("_"),
							format: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043E\u0442\u0443".split("_"),
							isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/
						},
						weekdaysShort: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
						weekdaysMin: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
						monthsParse: n,
						longMonthsParse: n,
						shortMonthsParse: n,
						monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
						monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
						monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
						monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY \u0433.",
							LLL: "D MMMM YYYY \u0433., H:mm",
							LLLL: "dddd, D MMMM YYYY \u0433., H:mm"
						},
						calendar: {
							sameDay: "[\u0421\u0435\u0433\u043E\u0434\u043D\u044F, \u0432] LT",
							nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430, \u0432] LT",
							lastDay: "[\u0412\u0447\u0435\u0440\u0430, \u0432] LT",
							nextWeek: function(i) {
								if (i.week() !== this.week()) switch (this.day()) {
									case 0:
										return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435] dddd, [\u0432] LT";
									case 1:
									case 2:
									case 4:
										return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439] dddd, [\u0432] LT";
									case 3:
									case 5:
									case 6:
										return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E] dddd, [\u0432] LT"
								} else return this.day() === 2 ? "[\u0412\u043E] dddd, [\u0432] LT" : "[\u0412] dddd, [\u0432] LT"
							},
							lastWeek: function(i) {
								if (i.week() !== this.week()) switch (this.day()) {
									case 0:
										return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u043E\u0435] dddd, [\u0432] LT";
									case 1:
									case 2:
									case 4:
										return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u044B\u0439] dddd, [\u0432] LT";
									case 3:
									case 5:
									case 6:
										return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u0443\u044E] dddd, [\u0432] LT"
								} else return this.day() === 2 ? "[\u0412\u043E] dddd, [\u0432] LT" : "[\u0412] dddd, [\u0432] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0447\u0435\u0440\u0435\u0437 %s",
							past: "%s \u043D\u0430\u0437\u0430\u0434",
							s: "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",
							ss: s,
							m: s,
							mm: s,
							h: "\u0447\u0430\u0441",
							hh: s,
							d: "\u0434\u0435\u043D\u044C",
							dd: s,
							w: "\u043D\u0435\u0434\u0435\u043B\u044F",
							ww: s,
							M: "\u043C\u0435\u0441\u044F\u0446",
							MM: s,
							y: "\u0433\u043E\u0434",
							yy: s
						},
						meridiemParse: /ночи|утра|дня|вечера/i,
						isPM: function(i) {
							return /^(дня|вечера)$/.test(i)
						},
						meridiem: function(i, d, u) {
							return i < 4 ? "\u043D\u043E\u0447\u0438" : i < 12 ? "\u0443\u0442\u0440\u0430" : i < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u0435\u0440\u0430"
						},
						dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
						ordinal: function(i, d) {
							switch (d) {
								case "M":
								case "d":
								case "DDD":
									return i + "-\u0439";
								case "D":
									return i + "-\u0433\u043E";
								case "w":
								case "W":
									return i + "-\u044F";
								default:
									return i
							}
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return r
			})
		},
		805798: function(b, f, l) { //! moment.js locale configuration
			//! locale : Sindhi [sd]
			//! author : Narain Sagar : https://github.com/narainsagar
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u064A\u0628\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0626\u064A", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u0621\u0650", "\u0622\u06AF\u0633\u067D", "\u0633\u064A\u067E\u067D\u0645\u0628\u0631", "\u0622\u06AA\u067D\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u068A\u0633\u0645\u0628\u0631"],
					s = ["\u0622\u0686\u0631", "\u0633\u0648\u0645\u0631", "\u0627\u06B1\u0627\u0631\u0648", "\u0627\u0631\u0628\u0639", "\u062E\u0645\u064A\u0633", "\u062C\u0645\u0639", "\u0687\u0646\u0687\u0631"],
					n = o.defineLocale("sd", {
						months: t,
						monthsShort: t,
						weekdays: s,
						weekdaysShort: s,
						weekdaysMin: s,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd\u060C D MMMM YYYY HH:mm"
						},
						meridiemParse: /صبح|شام/,
						isPM: function(r) {
							return r === "\u0634\u0627\u0645"
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u0635\u0628\u062D" : "\u0634\u0627\u0645"
						},
						calendar: {
							sameDay: "[\u0627\u0684] LT",
							nextDay: "[\u0633\u0680\u0627\u06BB\u064A] LT",
							nextWeek: "dddd [\u0627\u06B3\u064A\u0646 \u0647\u0641\u062A\u064A \u062A\u064A] LT",
							lastDay: "[\u06AA\u0627\u0644\u0647\u0647] LT",
							lastWeek: "[\u06AF\u0632\u0631\u064A\u0644 \u0647\u0641\u062A\u064A] dddd [\u062A\u064A] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u067E\u0648\u0621",
							past: "%s \u0627\u06B3",
							s: "\u0686\u0646\u062F \u0633\u064A\u06AA\u0646\u068A",
							ss: "%d \u0633\u064A\u06AA\u0646\u068A",
							m: "\u0647\u06AA \u0645\u0646\u067D",
							mm: "%d \u0645\u0646\u067D",
							h: "\u0647\u06AA \u06AA\u0644\u0627\u06AA",
							hh: "%d \u06AA\u0644\u0627\u06AA",
							d: "\u0647\u06AA \u068F\u064A\u0646\u0647\u0646",
							dd: "%d \u068F\u064A\u0646\u0647\u0646",
							M: "\u0647\u06AA \u0645\u0647\u064A\u0646\u0648",
							MM: "%d \u0645\u0647\u064A\u0646\u0627",
							y: "\u0647\u06AA \u0633\u0627\u0644",
							yy: "%d \u0633\u0627\u0644"
						},
						preparse: function(r) {
							return r.replace(/،/g, ",")
						},
						postformat: function(r) {
							return r.replace(/,/g, "\u060C")
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return n
			})
		},
		168726: function(b, f, l) { //! moment.js locale configuration
			//! locale : Northern Sami [se]
			//! authors : Bård Rolstad Henriksen : https://github.com/karamell
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("se", {
					months: "o\u0111\u0111ajagem\xE1nnu_guovvam\xE1nnu_njuk\u010Dam\xE1nnu_cuo\u014Bom\xE1nnu_miessem\xE1nnu_geassem\xE1nnu_suoidnem\xE1nnu_borgem\xE1nnu_\u010Dak\u010Dam\xE1nnu_golggotm\xE1nnu_sk\xE1bmam\xE1nnu_juovlam\xE1nnu".split("_"),
					monthsShort: "o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010Dak\u010D_golg_sk\xE1b_juov".split("_"),
					weekdays: "sotnabeaivi_vuoss\xE1rga_ma\u014B\u014Beb\xE1rga_gaskavahkku_duorastat_bearjadat_l\xE1vvardat".split("_"),
					weekdaysShort: "sotn_vuos_ma\u014B_gask_duor_bear_l\xE1v".split("_"),
					weekdaysMin: "s_v_m_g_d_b_L".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "MMMM D. [b.] YYYY",
						LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
						LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
					},
					calendar: {
						sameDay: "[otne ti] LT",
						nextDay: "[ihttin ti] LT",
						nextWeek: "dddd [ti] LT",
						lastDay: "[ikte ti] LT",
						lastWeek: "[ovddit] dddd [ti] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s gea\u017Ees",
						past: "ma\u014Bit %s",
						s: "moadde sekunddat",
						ss: "%d sekunddat",
						m: "okta minuhta",
						mm: "%d minuhtat",
						h: "okta diimmu",
						hh: "%d diimmut",
						d: "okta beaivi",
						dd: "%d beaivvit",
						M: "okta m\xE1nnu",
						MM: "%d m\xE1nut",
						y: "okta jahki",
						yy: "%d jagit"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		416173: function(b, f, l) { //! moment.js locale configuration
			//! locale : Sinhalese [si]
			//! author : Sampath Sitinamaluwa : https://github.com/sampathsris
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("si", {
					months: "\u0DA2\u0DB1\u0DC0\u0DCF\u0DBB\u0DD2_\u0DB4\u0DD9\u0DB6\u0DBB\u0DC0\u0DCF\u0DBB\u0DD2_\u0DB8\u0DCF\u0DBB\u0DCA\u0DAD\u0DD4_\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DDA\u0DBD\u0DCA_\u0DB8\u0DD0\u0DBA\u0DD2_\u0DA2\u0DD6\u0DB1\u0DD2_\u0DA2\u0DD6\u0DBD\u0DD2_\u0D85\u0D9C\u0DDD\u0DC3\u0DCA\u0DAD\u0DD4_\u0DC3\u0DD0\u0DB4\u0DCA\u0DAD\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA_\u0D94\u0D9A\u0DCA\u0DAD\u0DDD\u0DB6\u0DBB\u0DCA_\u0DB1\u0DDC\u0DC0\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA_\u0DAF\u0DD9\u0DC3\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA".split("_"),
					monthsShort: "\u0DA2\u0DB1_\u0DB4\u0DD9\u0DB6_\u0DB8\u0DCF\u0DBB\u0DCA_\u0D85\u0DB4\u0DCA_\u0DB8\u0DD0\u0DBA\u0DD2_\u0DA2\u0DD6\u0DB1\u0DD2_\u0DA2\u0DD6\u0DBD\u0DD2_\u0D85\u0D9C\u0DDD_\u0DC3\u0DD0\u0DB4\u0DCA_\u0D94\u0D9A\u0DCA_\u0DB1\u0DDC\u0DC0\u0DD0_\u0DAF\u0DD9\u0DC3\u0DD0".split("_"),
					weekdays: "\u0D89\u0DBB\u0DD2\u0DAF\u0DCF_\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF_\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF_\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF_\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF_\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF".split("_"),
					weekdaysShort: "\u0D89\u0DBB\u0DD2_\u0DC3\u0DB3\u0DD4_\u0D85\u0D9F_\u0DB6\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4_\u0DC3\u0DD2\u0D9A\u0DD4_\u0DC3\u0DD9\u0DB1".split("_"),
					weekdaysMin: "\u0D89_\u0DC3_\u0D85_\u0DB6_\u0DB6\u0DCA\u200D\u0DBB_\u0DC3\u0DD2_\u0DC3\u0DD9".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "a h:mm",
						LTS: "a h:mm:ss",
						L: "YYYY/MM/DD",
						LL: "YYYY MMMM D",
						LLL: "YYYY MMMM D, a h:mm",
						LLLL: "YYYY MMMM D [\u0DC0\u0DD0\u0DB1\u0DD2] dddd, a h:mm:ss"
					},
					calendar: {
						sameDay: "[\u0D85\u0DAF] LT[\u0DA7]",
						nextDay: "[\u0DC4\u0DD9\u0DA7] LT[\u0DA7]",
						nextWeek: "dddd LT[\u0DA7]",
						lastDay: "[\u0D8A\u0DBA\u0DDA] LT[\u0DA7]",
						lastWeek: "[\u0DB4\u0DC3\u0DD4\u0D9C\u0DD2\u0DBA] dddd LT[\u0DA7]",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s\u0D9A\u0DD2\u0DB1\u0DCA",
						past: "%s\u0D9A\u0DA7 \u0DB4\u0DD9\u0DBB",
						s: "\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB \u0D9A\u0DD2\u0DC4\u0DD2\u0DB4\u0DBA",
						ss: "\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB %d",
						m: "\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4\u0DC0",
						mm: "\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4 %d",
						h: "\u0DB4\u0DD0\u0DBA",
						hh: "\u0DB4\u0DD0\u0DBA %d",
						d: "\u0DAF\u0DD2\u0DB1\u0DBA",
						dd: "\u0DAF\u0DD2\u0DB1 %d",
						M: "\u0DB8\u0DCF\u0DC3\u0DBA",
						MM: "\u0DB8\u0DCF\u0DC3 %d",
						y: "\u0DC0\u0DC3\u0DBB",
						yy: "\u0DC0\u0DC3\u0DBB %d"
					},
					dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
					ordinal: function(s) {
						return s + " \u0DC0\u0DD0\u0DB1\u0DD2"
					},
					meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
					isPM: function(s) {
						return s === "\u0DB4.\u0DC0." || s === "\u0DB4\u0DC3\u0DCA \u0DC0\u0DBB\u0DD4"
					},
					meridiem: function(s, n, r) {
						return s > 11 ? r ? "\u0DB4.\u0DC0." : "\u0DB4\u0DC3\u0DCA \u0DC0\u0DBB\u0DD4" : r ? "\u0DB4\u0DD9.\u0DC0." : "\u0DB4\u0DD9\u0DBB \u0DC0\u0DBB\u0DD4"
					}
				});
				return t
			})
		},
		982812: function(b, f, l) { //! moment.js locale configuration
			//! locale : Slovak [sk]
			//! author : Martin Minka : https://github.com/k2s
			//! based on work of petrbela : https://github.com/petrbela
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "janu\xE1r_febru\xE1r_marec_apr\xEDl_m\xE1j_j\xFAn_j\xFAl_august_september_okt\xF3ber_november_december".split("_"),
					s = "jan_feb_mar_apr_m\xE1j_j\xFAn_j\xFAl_aug_sep_okt_nov_dec".split("_");

				function n(d) {
					return d > 1 && d < 5
				}

				function r(d, u, m, A) {
					var W = d + " ";
					switch (m) {
						case "s":
							return u || A ? "p\xE1r sek\xFAnd" : "p\xE1r sekundami";
						case "ss":
							return u || A ? W + (n(d) ? "sekundy" : "sek\xFAnd") : W + "sekundami";
						case "m":
							return u ? "min\xFAta" : A ? "min\xFAtu" : "min\xFAtou";
						case "mm":
							return u || A ? W + (n(d) ? "min\xFAty" : "min\xFAt") : W + "min\xFAtami";
						case "h":
							return u ? "hodina" : A ? "hodinu" : "hodinou";
						case "hh":
							return u || A ? W + (n(d) ? "hodiny" : "hod\xEDn") : W + "hodinami";
						case "d":
							return u || A ? "de\u0148" : "d\u0148om";
						case "dd":
							return u || A ? W + (n(d) ? "dni" : "dn\xED") : W + "d\u0148ami";
						case "M":
							return u || A ? "mesiac" : "mesiacom";
						case "MM":
							return u || A ? W + (n(d) ? "mesiace" : "mesiacov") : W + "mesiacmi";
						case "y":
							return u || A ? "rok" : "rokom";
						case "yy":
							return u || A ? W + (n(d) ? "roky" : "rokov") : W + "rokmi"
					}
				}
				var i = o.defineLocale("sk", {
					months: t,
					monthsShort: s,
					weekdays: "nede\u013Ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),
					weekdaysShort: "ne_po_ut_st_\u0161t_pi_so".split("_"),
					weekdaysMin: "ne_po_ut_st_\u0161t_pi_so".split("_"),
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm",
						LLLL: "dddd D. MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[dnes o] LT",
						nextDay: "[zajtra o] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[v nede\u013Eu o] LT";
								case 1:
								case 2:
									return "[v] dddd [o] LT";
								case 3:
									return "[v stredu o] LT";
								case 4:
									return "[vo \u0161tvrtok o] LT";
								case 5:
									return "[v piatok o] LT";
								case 6:
									return "[v sobotu o] LT"
							}
						},
						lastDay: "[v\u010Dera o] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[minul\xFA nede\u013Eu o] LT";
								case 1:
								case 2:
									return "[minul\xFD] dddd [o] LT";
								case 3:
									return "[minul\xFA stredu o] LT";
								case 4:
								case 5:
									return "[minul\xFD] dddd [o] LT";
								case 6:
									return "[minul\xFA sobotu o] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "za %s",
						past: "pred %s",
						s: r,
						ss: r,
						m: r,
						mm: r,
						h: r,
						hh: r,
						d: r,
						dd: r,
						M: r,
						MM: r,
						y: r,
						yy: r
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return i
			})
		},
		261593: function(b, f, l) { //! moment.js locale configuration
			//! locale : Slovenian [sl]
			//! author : Robert Sedovšek : https://github.com/sedovsek
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(n, r, i, d) {
					var u = n + " ";
					switch (i) {
						case "s":
							return r || d ? "nekaj sekund" : "nekaj sekundami";
						case "ss":
							return n === 1 ? u += r ? "sekundo" : "sekundi" : n === 2 ? u += r || d ? "sekundi" : "sekundah" : n < 5 ? u += r || d ? "sekunde" : "sekundah" : u += "sekund", u;
						case "m":
							return r ? "ena minuta" : "eno minuto";
						case "mm":
							return n === 1 ? u += r ? "minuta" : "minuto" : n === 2 ? u += r || d ? "minuti" : "minutama" : n < 5 ? u += r || d ? "minute" : "minutami" : u += r || d ? "minut" : "minutami", u;
						case "h":
							return r ? "ena ura" : "eno uro";
						case "hh":
							return n === 1 ? u += r ? "ura" : "uro" : n === 2 ? u += r || d ? "uri" : "urama" : n < 5 ? u += r || d ? "ure" : "urami" : u += r || d ? "ur" : "urami", u;
						case "d":
							return r || d ? "en dan" : "enim dnem";
						case "dd":
							return n === 1 ? u += r || d ? "dan" : "dnem" : n === 2 ? u += r || d ? "dni" : "dnevoma" : u += r || d ? "dni" : "dnevi", u;
						case "M":
							return r || d ? "en mesec" : "enim mesecem";
						case "MM":
							return n === 1 ? u += r || d ? "mesec" : "mesecem" : n === 2 ? u += r || d ? "meseca" : "mesecema" : n < 5 ? u += r || d ? "mesece" : "meseci" : u += r || d ? "mesecev" : "meseci", u;
						case "y":
							return r || d ? "eno leto" : "enim letom";
						case "yy":
							return n === 1 ? u += r || d ? "leto" : "letom" : n === 2 ? u += r || d ? "leti" : "letoma" : n < 5 ? u += r || d ? "leta" : "leti" : u += r || d ? "let" : "leti", u
					}
				}
				var s = o.defineLocale("sl", {
					months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
					monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
					monthsParseExact: !0,
					weekdays: "nedelja_ponedeljek_torek_sreda_\u010Detrtek_petek_sobota".split("_"),
					weekdaysShort: "ned._pon._tor._sre._\u010Det._pet._sob.".split("_"),
					weekdaysMin: "ne_po_to_sr_\u010De_pe_so".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD. MM. YYYY",
						LL: "D. MMMM YYYY",
						LLL: "D. MMMM YYYY H:mm",
						LLLL: "dddd, D. MMMM YYYY H:mm"
					},
					calendar: {
						sameDay: "[danes ob] LT",
						nextDay: "[jutri ob] LT",
						nextWeek: function() {
							switch (this.day()) {
								case 0:
									return "[v] [nedeljo] [ob] LT";
								case 3:
									return "[v] [sredo] [ob] LT";
								case 6:
									return "[v] [soboto] [ob] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[v] dddd [ob] LT"
							}
						},
						lastDay: "[v\u010Deraj ob] LT",
						lastWeek: function() {
							switch (this.day()) {
								case 0:
									return "[prej\u0161njo] [nedeljo] [ob] LT";
								case 3:
									return "[prej\u0161njo] [sredo] [ob] LT";
								case 6:
									return "[prej\u0161njo] [soboto] [ob] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[prej\u0161nji] dddd [ob] LT"
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "\u010Dez %s",
						past: "pred %s",
						s: t,
						ss: t,
						m: t,
						mm: t,
						h: t,
						hh: t,
						d: t,
						dd: t,
						M: t,
						MM: t,
						y: t,
						yy: t
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 7
					}
				});
				return s
			})
		},
		166030: function(b, f, l) { //! moment.js locale configuration
			//! locale : Albanian [sq]
			//! author : Flakërim Ismani : https://github.com/flakerimi
			//! author : Menelion Elensúle : https://github.com/Oire
			//! author : Oerd Cukalla : https://github.com/oerd
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("sq", {
					months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xEBntor_Dhjetor".split("_"),
					monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xEBn_Dhj".split("_"),
					weekdays: "E Diel_E H\xEBn\xEB_E Mart\xEB_E M\xEBrkur\xEB_E Enjte_E Premte_E Shtun\xEB".split("_"),
					weekdaysShort: "Die_H\xEBn_Mar_M\xEBr_Enj_Pre_Sht".split("_"),
					weekdaysMin: "D_H_Ma_M\xEB_E_P_Sh".split("_"),
					weekdaysParseExact: !0,
					meridiemParse: /PD|MD/,
					isPM: function(s) {
						return s.charAt(0) === "M"
					},
					meridiem: function(s, n, r) {
						return s < 12 ? "PD" : "MD"
					},
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Sot n\xEB] LT",
						nextDay: "[Nes\xEBr n\xEB] LT",
						nextWeek: "dddd [n\xEB] LT",
						lastDay: "[Dje n\xEB] LT",
						lastWeek: "dddd [e kaluar n\xEB] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "n\xEB %s",
						past: "%s m\xEB par\xEB",
						s: "disa sekonda",
						ss: "%d sekonda",
						m: "nj\xEB minut\xEB",
						mm: "%d minuta",
						h: "nj\xEB or\xEB",
						hh: "%d or\xEB",
						d: "nj\xEB dit\xEB",
						dd: "%d dit\xEB",
						M: "nj\xEB muaj",
						MM: "%d muaj",
						y: "nj\xEB vit",
						yy: "%d vite"
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		276757: function(b, f, l) { //! moment.js locale configuration
			//! locale : Serbian Cyrillic [sr-cyrl]
			//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
			//! author : Stefan Crnjaković <stefan@hotmail.rs> : https://github.com/crnjakovic
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						words: {
							ss: ["\u0441\u0435\u043A\u0443\u043D\u0434\u0430", "\u0441\u0435\u043A\u0443\u043D\u0434\u0435", "\u0441\u0435\u043A\u0443\u043D\u0434\u0438"],
							m: ["\u0458\u0435\u0434\u0430\u043D \u043C\u0438\u043D\u0443\u0442", "\u0458\u0435\u0434\u043D\u043E\u0433 \u043C\u0438\u043D\u0443\u0442\u0430"],
							mm: ["\u043C\u0438\u043D\u0443\u0442", "\u043C\u0438\u043D\u0443\u0442\u0430", "\u043C\u0438\u043D\u0443\u0442\u0430"],
							h: ["\u0458\u0435\u0434\u0430\u043D \u0441\u0430\u0442", "\u0458\u0435\u0434\u043D\u043E\u0433 \u0441\u0430\u0442\u0430"],
							hh: ["\u0441\u0430\u0442", "\u0441\u0430\u0442\u0430", "\u0441\u0430\u0442\u0438"],
							d: ["\u0458\u0435\u0434\u0430\u043D \u0434\u0430\u043D", "\u0458\u0435\u0434\u043D\u043E\u0433 \u0434\u0430\u043D\u0430"],
							dd: ["\u0434\u0430\u043D", "\u0434\u0430\u043D\u0430", "\u0434\u0430\u043D\u0430"],
							M: ["\u0458\u0435\u0434\u0430\u043D \u043C\u0435\u0441\u0435\u0446", "\u0458\u0435\u0434\u043D\u043E\u0433 \u043C\u0435\u0441\u0435\u0446\u0430"],
							MM: ["\u043C\u0435\u0441\u0435\u0446", "\u043C\u0435\u0441\u0435\u0446\u0430", "\u043C\u0435\u0441\u0435\u0446\u0438"],
							y: ["\u0458\u0435\u0434\u043D\u0443 \u0433\u043E\u0434\u0438\u043D\u0443", "\u0458\u0435\u0434\u043D\u0435 \u0433\u043E\u0434\u0438\u043D\u0435"],
							yy: ["\u0433\u043E\u0434\u0438\u043D\u0443", "\u0433\u043E\u0434\u0438\u043D\u0435", "\u0433\u043E\u0434\u0438\u043D\u0430"]
						},
						correctGrammaticalCase: function(n, r) {
							return n % 10 >= 1 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? n % 10 == 1 ? r[0] : r[1] : r[2]
						},
						translate: function(n, r, i, d) {
							var u = t.words[i],
								m;
							return i.length === 1 ? i === "y" && r ? "\u0458\u0435\u0434\u043D\u0430 \u0433\u043E\u0434\u0438\u043D\u0430" : d || r ? u[0] : u[1] : (m = t.correctGrammaticalCase(n, u), i === "yy" && r && m === "\u0433\u043E\u0434\u0438\u043D\u0443" ? n + " \u0433\u043E\u0434\u0438\u043D\u0430" : n + " " + m)
						}
					},
					s = o.defineLocale("sr-cyrl", {
						months: "\u0458\u0430\u043D\u0443\u0430\u0440_\u0444\u0435\u0431\u0440\u0443\u0430\u0440_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440_\u043E\u043A\u0442\u043E\u0431\u0430\u0440_\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440_\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440".split("_"),
						monthsShort: "\u0458\u0430\u043D._\u0444\u0435\u0431._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433._\u0441\u0435\u043F._\u043E\u043A\u0442._\u043D\u043E\u0432._\u0434\u0435\u0446.".split("_"),
						monthsParseExact: !0,
						weekdays: "\u043D\u0435\u0434\u0435\u0459\u0430_\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A_\u0443\u0442\u043E\u0440\u0430\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A_\u043F\u0435\u0442\u0430\u043A_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
						weekdaysShort: "\u043D\u0435\u0434._\u043F\u043E\u043D._\u0443\u0442\u043E._\u0441\u0440\u0435._\u0447\u0435\u0442._\u043F\u0435\u0442._\u0441\u0443\u0431.".split("_"),
						weekdaysMin: "\u043D\u0435_\u043F\u043E_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441\u0443".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "D. M. YYYY.",
							LL: "D. MMMM YYYY.",
							LLL: "D. MMMM YYYY. H:mm",
							LLLL: "dddd, D. MMMM YYYY. H:mm"
						},
						calendar: {
							sameDay: "[\u0434\u0430\u043D\u0430\u0441 \u0443] LT",
							nextDay: "[\u0441\u0443\u0442\u0440\u0430 \u0443] LT",
							nextWeek: function() {
								switch (this.day()) {
									case 0:
										return "[\u0443] [\u043D\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";
									case 3:
										return "[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";
									case 6:
										return "[\u0443] [\u0441\u0443\u0431\u043E\u0442\u0443] [\u0443] LT";
									case 1:
									case 2:
									case 4:
									case 5:
										return "[\u0443] dddd [\u0443] LT"
								}
							},
							lastDay: "[\u0458\u0443\u0447\u0435 \u0443] LT",
							lastWeek: function() {
								var n = ["[\u043F\u0440\u043E\u0448\u043B\u0435] [\u043D\u0435\u0434\u0435\u0459\u0435] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0443\u0442\u043E\u0440\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u0435\u0442\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0443\u0431\u043E\u0442\u0435] [\u0443] LT"];
								return n[this.day()]
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0437\u0430 %s",
							past: "\u043F\u0440\u0435 %s",
							s: "\u043D\u0435\u043A\u043E\u043B\u0438\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",
							ss: t.translate,
							m: t.translate,
							mm: t.translate,
							h: t.translate,
							hh: t.translate,
							d: t.translate,
							dd: t.translate,
							M: t.translate,
							MM: t.translate,
							y: t.translate,
							yy: t.translate
						},
						dayOfMonthOrdinalParse: /\d{1,2}\./,
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		149694: function(b, f, l) { //! moment.js locale configuration
			//! locale : Serbian [sr]
			//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
			//! author : Stefan Crnjaković <stefan@hotmail.rs> : https://github.com/crnjakovic
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						words: {
							ss: ["sekunda", "sekunde", "sekundi"],
							m: ["jedan minut", "jednog minuta"],
							mm: ["minut", "minuta", "minuta"],
							h: ["jedan sat", "jednog sata"],
							hh: ["sat", "sata", "sati"],
							d: ["jedan dan", "jednog dana"],
							dd: ["dan", "dana", "dana"],
							M: ["jedan mesec", "jednog meseca"],
							MM: ["mesec", "meseca", "meseci"],
							y: ["jednu godinu", "jedne godine"],
							yy: ["godinu", "godine", "godina"]
						},
						correctGrammaticalCase: function(n, r) {
							return n % 10 >= 1 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? n % 10 == 1 ? r[0] : r[1] : r[2]
						},
						translate: function(n, r, i, d) {
							var u = t.words[i],
								m;
							return i.length === 1 ? i === "y" && r ? "jedna godina" : d || r ? u[0] : u[1] : (m = t.correctGrammaticalCase(n, u), i === "yy" && r && m === "godinu" ? n + " godina" : n + " " + m)
						}
					},
					s = o.defineLocale("sr", {
						months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
						monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
						monthsParseExact: !0,
						weekdays: "nedelja_ponedeljak_utorak_sreda_\u010Detvrtak_petak_subota".split("_"),
						weekdaysShort: "ned._pon._uto._sre._\u010Det._pet._sub.".split("_"),
						weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"),
						weekdaysParseExact: !0,
						longDateFormat: {
							LT: "H:mm",
							LTS: "H:mm:ss",
							L: "D. M. YYYY.",
							LL: "D. MMMM YYYY.",
							LLL: "D. MMMM YYYY. H:mm",
							LLLL: "dddd, D. MMMM YYYY. H:mm"
						},
						calendar: {
							sameDay: "[danas u] LT",
							nextDay: "[sutra u] LT",
							nextWeek: function() {
								switch (this.day()) {
									case 0:
										return "[u] [nedelju] [u] LT";
									case 3:
										return "[u] [sredu] [u] LT";
									case 6:
										return "[u] [subotu] [u] LT";
									case 1:
									case 2:
									case 4:
									case 5:
										return "[u] dddd [u] LT"
								}
							},
							lastDay: "[ju\u010De u] LT",
							lastWeek: function() {
								var n = ["[pro\u0161le] [nedelje] [u] LT", "[pro\u0161log] [ponedeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srede] [u] LT", "[pro\u0161log] [\u010Detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"];
								return n[this.day()]
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "za %s",
							past: "pre %s",
							s: "nekoliko sekundi",
							ss: t.translate,
							m: t.translate,
							mm: t.translate,
							h: t.translate,
							hh: t.translate,
							d: t.translate,
							dd: t.translate,
							M: t.translate,
							MM: t.translate,
							y: t.translate,
							yy: t.translate
						},
						dayOfMonthOrdinalParse: /\d{1,2}\./,
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		987826: function(b, f, l) { //! moment.js locale configuration
			//! locale : siSwati [ss]
			//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ss", {
					months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
					monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
					weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
					weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
					weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendar: {
						sameDay: "[Namuhla nga] LT",
						nextDay: "[Kusasa nga] LT",
						nextWeek: "dddd [nga] LT",
						lastDay: "[Itolo nga] LT",
						lastWeek: "dddd [leliphelile] [nga] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "nga %s",
						past: "wenteka nga %s",
						s: "emizuzwana lomcane",
						ss: "%d mzuzwana",
						m: "umzuzu",
						mm: "%d emizuzu",
						h: "lihora",
						hh: "%d emahora",
						d: "lilanga",
						dd: "%d emalanga",
						M: "inyanga",
						MM: "%d tinyanga",
						y: "umnyaka",
						yy: "%d iminyaka"
					},
					meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
					meridiem: function(s, n, r) {
						return s < 11 ? "ekuseni" : s < 15 ? "emini" : s < 19 ? "entsambama" : "ebusuku"
					},
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "ekuseni") return s;
						if (n === "emini") return s >= 11 ? s : s + 12;
						if (n === "entsambama" || n === "ebusuku") return s === 0 ? 0 : s + 12
					},
					dayOfMonthOrdinalParse: /\d{1,2}/,
					ordinal: "%d",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		58954: function(b, f, l) { //! moment.js locale configuration
			//! locale : Swedish [sv]
			//! author : Jens Alm : https://github.com/ulmus
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("sv", {
					months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
					monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
					weekdays: "s\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag".split("_"),
					weekdaysShort: "s\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r".split("_"),
					weekdaysMin: "s\xF6_m\xE5_ti_on_to_fr_l\xF6".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY [kl.] HH:mm",
						LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
						lll: "D MMM YYYY HH:mm",
						llll: "ddd D MMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Idag] LT",
						nextDay: "[Imorgon] LT",
						lastDay: "[Ig\xE5r] LT",
						nextWeek: "[P\xE5] dddd LT",
						lastWeek: "[I] dddd[s] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "om %s",
						past: "f\xF6r %s sedan",
						s: "n\xE5gra sekunder",
						ss: "%d sekunder",
						m: "en minut",
						mm: "%d minuter",
						h: "en timme",
						hh: "%d timmar",
						d: "en dag",
						dd: "%d dagar",
						M: "en m\xE5nad",
						MM: "%d m\xE5nader",
						y: "ett \xE5r",
						yy: "%d \xE5r"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(\:e|\:a)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? ":e" : n === 1 || n === 2 ? ":a" : ":e";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		299397: function(b, f, l) { //! moment.js locale configuration
			//! locale : Swahili [sw]
			//! author : Fahad Kassim : https://github.com/fadsel
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("sw", {
					months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
					monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
					weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
					weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
					weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "hh:mm A",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[leo saa] LT",
						nextDay: "[kesho saa] LT",
						nextWeek: "[wiki ijayo] dddd [saat] LT",
						lastDay: "[jana] LT",
						lastWeek: "[wiki iliyopita] dddd [saat] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s baadaye",
						past: "tokea %s",
						s: "hivi punde",
						ss: "sekunde %d",
						m: "dakika moja",
						mm: "dakika %d",
						h: "saa limoja",
						hh: "masaa %d",
						d: "siku moja",
						dd: "siku %d",
						M: "mwezi mmoja",
						MM: "miezi %d",
						y: "mwaka mmoja",
						yy: "miaka %d"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		18300: function(b, f, l) { //! moment.js locale configuration
			//! locale : Tamil [ta]
			//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "\u0BE7",
						2: "\u0BE8",
						3: "\u0BE9",
						4: "\u0BEA",
						5: "\u0BEB",
						6: "\u0BEC",
						7: "\u0BED",
						8: "\u0BEE",
						9: "\u0BEF",
						0: "\u0BE6"
					},
					s = {
						"\u0BE7": "1",
						"\u0BE8": "2",
						"\u0BE9": "3",
						"\u0BEA": "4",
						"\u0BEB": "5",
						"\u0BEC": "6",
						"\u0BED": "7",
						"\u0BEE": "8",
						"\u0BEF": "9",
						"\u0BE6": "0"
					},
					n = o.defineLocale("ta", {
						months: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"),
						monthsShort: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"),
						weekdays: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8".split("_"),
						weekdaysShort: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF_\u0B9A\u0BA9\u0BBF".split("_"),
						weekdaysMin: "\u0B9E\u0BBE_\u0BA4\u0BBF_\u0B9A\u0BC6_\u0BAA\u0BC1_\u0BB5\u0BBF_\u0BB5\u0BC6_\u0B9A".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, HH:mm",
							LLLL: "dddd, D MMMM YYYY, HH:mm"
						},
						calendar: {
							sameDay: "[\u0B87\u0BA9\u0BCD\u0BB1\u0BC1] LT",
							nextDay: "[\u0BA8\u0BBE\u0BB3\u0BC8] LT",
							nextWeek: "dddd, LT",
							lastDay: "[\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1] LT",
							lastWeek: "[\u0B95\u0B9F\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0BB0\u0BAE\u0BCD] dddd, LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0B87\u0BB2\u0BCD",
							past: "%s \u0BAE\u0BC1\u0BA9\u0BCD",
							s: "\u0B92\u0BB0\u0BC1 \u0B9A\u0BBF\u0BB2 \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD",
							ss: "%d \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD",
							m: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD",
							mm: "%d \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
							h: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
							hh: "%d \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
							d: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BCD",
							dd: "%d \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD",
							M: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD",
							MM: "%d \u0BAE\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
							y: "\u0B92\u0BB0\u0BC1 \u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD",
							yy: "%d \u0B86\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD"
						},
						dayOfMonthOrdinalParse: /\d{1,2}வது/,
						ordinal: function(r) {
							return r + "\u0BB5\u0BA4\u0BC1"
						},
						preparse: function(r) {
							return r.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function(i) {
								return s[i]
							})
						},
						postformat: function(r) {
							return r.replace(/\d/g, function(i) {
								return t[i]
							})
						},
						meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
						meridiem: function(r, i, d) {
							return r < 2 ? " \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD" : r < 6 ? " \u0BB5\u0BC8\u0B95\u0BB1\u0BC8" : r < 10 ? " \u0B95\u0BBE\u0BB2\u0BC8" : r < 14 ? " \u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD" : r < 18 ? " \u0B8E\u0BB1\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1" : r < 22 ? " \u0BAE\u0BBE\u0BB2\u0BC8" : " \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD"
						},
						meridiemHour: function(r, i) {
							return r === 12 && (r = 0), i === "\u0BAF\u0BBE\u0BAE\u0BAE\u0BCD" ? r < 2 ? r : r + 12 : i === "\u0BB5\u0BC8\u0B95\u0BB1\u0BC8" || i === "\u0B95\u0BBE\u0BB2\u0BC8" || i === "\u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD" && r >= 10 ? r : r + 12
						},
						week: {
							dow: 0,
							doy: 6
						}
					});
				return n
			})
		},
		161651: function(b, f, l) { //! moment.js locale configuration
			//! locale : Telugu [te]
			//! author : Krishna Chaitanya Thota : https://github.com/kcthota
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("te", {
					months: "\u0C1C\u0C28\u0C35\u0C30\u0C3F_\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F_\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D_\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41_\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C4D_\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C4D_\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C4D_\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C4D".split("_"),
					monthsShort: "\u0C1C\u0C28._\u0C2B\u0C3F\u0C2C\u0C4D\u0C30._\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F._\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17._\u0C38\u0C46\u0C2A\u0C4D._\u0C05\u0C15\u0C4D\u0C1F\u0C4B._\u0C28\u0C35._\u0C21\u0C3F\u0C38\u0C46.".split("_"),
					monthsParseExact: !0,
					weekdays: "\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02_\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02_\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02_\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02_\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02".split("_"),
					weekdaysShort: "\u0C06\u0C26\u0C3F_\u0C38\u0C4B\u0C2E_\u0C2E\u0C02\u0C17\u0C33_\u0C2C\u0C41\u0C27_\u0C17\u0C41\u0C30\u0C41_\u0C36\u0C41\u0C15\u0C4D\u0C30_\u0C36\u0C28\u0C3F".split("_"),
					weekdaysMin: "\u0C06_\u0C38\u0C4B_\u0C2E\u0C02_\u0C2C\u0C41_\u0C17\u0C41_\u0C36\u0C41_\u0C36".split("_"),
					longDateFormat: {
						LT: "A h:mm",
						LTS: "A h:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY, A h:mm",
						LLLL: "dddd, D MMMM YYYY, A h:mm"
					},
					calendar: {
						sameDay: "[\u0C28\u0C47\u0C21\u0C41] LT",
						nextDay: "[\u0C30\u0C47\u0C2A\u0C41] LT",
						nextWeek: "dddd, LT",
						lastDay: "[\u0C28\u0C3F\u0C28\u0C4D\u0C28] LT",
						lastWeek: "[\u0C17\u0C24] dddd, LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \u0C32\u0C4B",
						past: "%s \u0C15\u0C4D\u0C30\u0C3F\u0C24\u0C02",
						s: "\u0C15\u0C4A\u0C28\u0C4D\u0C28\u0C3F \u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C41",
						ss: "%d \u0C38\u0C46\u0C15\u0C28\u0C4D\u0C32\u0C41",
						m: "\u0C12\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02",
						mm: "%d \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C41",
						h: "\u0C12\u0C15 \u0C17\u0C02\u0C1F",
						hh: "%d \u0C17\u0C02\u0C1F\u0C32\u0C41",
						d: "\u0C12\u0C15 \u0C30\u0C4B\u0C1C\u0C41",
						dd: "%d \u0C30\u0C4B\u0C1C\u0C41\u0C32\u0C41",
						M: "\u0C12\u0C15 \u0C28\u0C46\u0C32",
						MM: "%d \u0C28\u0C46\u0C32\u0C32\u0C41",
						y: "\u0C12\u0C15 \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C02",
						yy: "%d \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C3E\u0C32\u0C41"
					},
					dayOfMonthOrdinalParse: /\d{1,2}వ/,
					ordinal: "%d\u0C35",
					meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F") return s < 4 ? s : s + 12;
						if (n === "\u0C09\u0C26\u0C2F\u0C02") return s;
						if (n === "\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02") return s >= 10 ? s : s + 12;
						if (n === "\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02") return s + 12
					},
					meridiem: function(s, n, r) {
						return s < 4 ? "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F" : s < 10 ? "\u0C09\u0C26\u0C2F\u0C02" : s < 17 ? "\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02" : s < 20 ? "\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02" : "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F"
					},
					week: {
						dow: 0,
						doy: 6
					}
				});
				return t
			})
		},
		789402: function(b, f, l) { //! moment.js locale configuration
			//! locale : Tetun Dili (East Timor) [tet]
			//! author : Joshua Brooks : https://github.com/joshbrooks
			//! author : Onorio De J. Afonso : https://github.com/marobo
			//! author : Sonia Simoes : https://github.com/soniasimoes
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("tet", {
					months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\xF1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
					monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
					weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
					weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
					weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[Ohin iha] LT",
						nextDay: "[Aban iha] LT",
						nextWeek: "dddd [iha] LT",
						lastDay: "[Horiseik iha] LT",
						lastWeek: "dddd [semana kotuk] [iha] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "iha %s",
						past: "%s liuba",
						s: "segundu balun",
						ss: "segundu %d",
						m: "minutu ida",
						mm: "minutu %d",
						h: "oras ida",
						hh: "oras %d",
						d: "loron ida",
						dd: "loron %d",
						M: "fulan ida",
						MM: "fulan %d",
						y: "tinan ida",
						yy: "tinan %d"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		831845: function(b, f, l) { //! moment.js locale configuration
			//! locale : Tajik [tg]
			//! author : Orif N. Jr. : https://github.com/orif-jr
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						0: "-\u0443\u043C",
						1: "-\u0443\u043C",
						2: "-\u044E\u043C",
						3: "-\u044E\u043C",
						4: "-\u0443\u043C",
						5: "-\u0443\u043C",
						6: "-\u0443\u043C",
						7: "-\u0443\u043C",
						8: "-\u0443\u043C",
						9: "-\u0443\u043C",
						10: "-\u0443\u043C",
						12: "-\u0443\u043C",
						13: "-\u0443\u043C",
						20: "-\u0443\u043C",
						30: "-\u044E\u043C",
						40: "-\u0443\u043C",
						50: "-\u0443\u043C",
						60: "-\u0443\u043C",
						70: "-\u0443\u043C",
						80: "-\u0443\u043C",
						90: "-\u0443\u043C",
						100: "-\u0443\u043C"
					},
					s = o.defineLocale("tg", {
						months: {
							format: "\u044F\u043D\u0432\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0430\u043B\u0438_\u043C\u0430\u0440\u0442\u0438_\u0430\u043F\u0440\u0435\u043B\u0438_\u043C\u0430\u0439\u0438_\u0438\u044E\u043D\u0438_\u0438\u044E\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442\u0438_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u0438_\u043E\u043A\u0442\u044F\u0431\u0440\u0438_\u043D\u043E\u044F\u0431\u0440\u0438_\u0434\u0435\u043A\u0430\u0431\u0440\u0438".split("_"),
							standalone: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_")
						},
						monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
						weekdays: "\u044F\u043A\u0448\u0430\u043D\u0431\u0435_\u0434\u0443\u0448\u0430\u043D\u0431\u0435_\u0441\u0435\u0448\u0430\u043D\u0431\u0435_\u0447\u043E\u0440\u0448\u0430\u043D\u0431\u0435_\u043F\u0430\u043D\u04B7\u0448\u0430\u043D\u0431\u0435_\u04B7\u0443\u043C\u044A\u0430_\u0448\u0430\u043D\u0431\u0435".split("_"),
						weekdaysShort: "\u044F\u0448\u0431_\u0434\u0448\u0431_\u0441\u0448\u0431_\u0447\u0448\u0431_\u043F\u0448\u0431_\u04B7\u0443\u043C_\u0448\u043D\u0431".split("_"),
						weekdaysMin: "\u044F\u0448_\u0434\u0448_\u0441\u0448_\u0447\u0448_\u043F\u0448_\u04B7\u043C_\u0448\u0431".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[\u0418\u043C\u0440\u04EF\u0437 \u0441\u043E\u0430\u0442\u0438] LT",
							nextDay: "[\u0424\u0430\u0440\u0434\u043E \u0441\u043E\u0430\u0442\u0438] LT",
							lastDay: "[\u0414\u0438\u0440\u04EF\u0437 \u0441\u043E\u0430\u0442\u0438] LT",
							nextWeek: "dddd[\u0438] [\u04B3\u0430\u0444\u0442\u0430\u0438 \u043E\u044F\u043D\u0434\u0430 \u0441\u043E\u0430\u0442\u0438] LT",
							lastWeek: "dddd[\u0438] [\u04B3\u0430\u0444\u0442\u0430\u0438 \u0433\u0443\u0437\u0430\u0448\u0442\u0430 \u0441\u043E\u0430\u0442\u0438] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0431\u0430\u044A\u0434\u0438 %s",
							past: "%s \u043F\u0435\u0448",
							s: "\u044F\u043A\u0447\u0430\u043D\u0434 \u0441\u043E\u043D\u0438\u044F",
							m: "\u044F\u043A \u0434\u0430\u049B\u0438\u049B\u0430",
							mm: "%d \u0434\u0430\u049B\u0438\u049B\u0430",
							h: "\u044F\u043A \u0441\u043E\u0430\u0442",
							hh: "%d \u0441\u043E\u0430\u0442",
							d: "\u044F\u043A \u0440\u04EF\u0437",
							dd: "%d \u0440\u04EF\u0437",
							M: "\u044F\u043A \u043C\u043E\u04B3",
							MM: "%d \u043C\u043E\u04B3",
							y: "\u044F\u043A \u0441\u043E\u043B",
							yy: "%d \u0441\u043E\u043B"
						},
						meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
						meridiemHour: function(n, r) {
							if (n === 12 && (n = 0), r === "\u0448\u0430\u0431") return n < 4 ? n : n + 12;
							if (r === "\u0441\u0443\u0431\u04B3") return n;
							if (r === "\u0440\u04EF\u0437") return n >= 11 ? n : n + 12;
							if (r === "\u0431\u0435\u0433\u043E\u04B3") return n + 12
						},
						meridiem: function(n, r, i) {
							return n < 4 ? "\u0448\u0430\u0431" : n < 11 ? "\u0441\u0443\u0431\u04B3" : n < 16 ? "\u0440\u04EF\u0437" : n < 19 ? "\u0431\u0435\u0433\u043E\u04B3" : "\u0448\u0430\u0431"
						},
						dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
						ordinal: function(n) {
							var r = n % 10,
								i = n >= 100 ? 100 : null;
							return n + (t[n] || t[r] || t[i])
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		877550: function(b, f, l) { //! moment.js locale configuration
			//! locale : Thai [th]
			//! author : Kridsada Thanabulpong : https://github.com/sirn
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("th", {
					months: "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21".split("_"),
					monthsShort: "\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.".split("_"),
					monthsParseExact: !0,
					weekdays: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
					weekdaysShort: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"),
					weekdaysMin: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "H:mm",
						LTS: "H:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm",
						LLLL: "\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm"
					},
					meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
					isPM: function(s) {
						return s === "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
					},
					meridiem: function(s, n, r) {
						return s < 12 ? "\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07" : "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"
					},
					calendar: {
						sameDay: "[\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
						nextDay: "[\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
						nextWeek: "dddd[\u0E2B\u0E19\u0E49\u0E32 \u0E40\u0E27\u0E25\u0E32] LT",
						lastDay: "[\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",
						lastWeek: "[\u0E27\u0E31\u0E19]dddd[\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E27\u0E25\u0E32] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0E2D\u0E35\u0E01 %s",
						past: "%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
						s: "\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
						ss: "%d \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
						m: "1 \u0E19\u0E32\u0E17\u0E35",
						mm: "%d \u0E19\u0E32\u0E17\u0E35",
						h: "1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
						hh: "%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
						d: "1 \u0E27\u0E31\u0E19",
						dd: "%d \u0E27\u0E31\u0E19",
						w: "1 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
						ww: "%d \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
						M: "1 \u0E40\u0E14\u0E37\u0E2D\u0E19",
						MM: "%d \u0E40\u0E14\u0E37\u0E2D\u0E19",
						y: "1 \u0E1B\u0E35",
						yy: "%d \u0E1B\u0E35"
					}
				});
				return t
			})
		},
		304804: function(b, f, l) { //! moment.js locale configuration
			//! locale : Turkmen [tk]
			//! author : Atamyrat Abdyrahmanov : https://github.com/atamyratabdy
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "'inji",
						5: "'inji",
						8: "'inji",
						70: "'inji",
						80: "'inji",
						2: "'nji",
						7: "'nji",
						20: "'nji",
						50: "'nji",
						3: "'\xFCnji",
						4: "'\xFCnji",
						100: "'\xFCnji",
						6: "'njy",
						9: "'unjy",
						10: "'unjy",
						30: "'unjy",
						60: "'ynjy",
						90: "'ynjy"
					},
					s = o.defineLocale("tk", {
						months: "\xDDanwar_Fewral_Mart_Aprel_Ma\xFD_I\xFDun_I\xFDul_Awgust_Sent\xFDabr_Okt\xFDabr_No\xFDabr_Dekabr".split("_"),
						monthsShort: "\xDDan_Few_Mar_Apr_Ma\xFD_I\xFDn_I\xFDl_Awg_Sen_Okt_No\xFD_Dek".split("_"),
						weekdays: "\xDDek\u015Fenbe_Du\u015Fenbe_Si\u015Fenbe_\xC7ar\u015Fenbe_Pen\u015Fenbe_Anna_\u015Eenbe".split("_"),
						weekdaysShort: "\xDDek_Du\u015F_Si\u015F_\xC7ar_Pen_Ann_\u015Een".split("_"),
						weekdaysMin: "\xDDk_D\u015F_S\u015F_\xC7r_Pn_An_\u015En".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[bug\xFCn sagat] LT",
							nextDay: "[ertir sagat] LT",
							nextWeek: "[indiki] dddd [sagat] LT",
							lastDay: "[d\xFC\xFDn] LT",
							lastWeek: "[ge\xE7en] dddd [sagat] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s so\u0148",
							past: "%s \xF6\u0148",
							s: "birn\xE4\xE7e sekunt",
							m: "bir minut",
							mm: "%d minut",
							h: "bir sagat",
							hh: "%d sagat",
							d: "bir g\xFCn",
							dd: "%d g\xFCn",
							M: "bir a\xFD",
							MM: "%d a\xFD",
							y: "bir \xFDyl",
							yy: "%d \xFDyl"
						},
						ordinal: function(n, r) {
							switch (r) {
								case "d":
								case "D":
								case "Do":
								case "DD":
									return n;
								default:
									if (n === 0) return n + "'unjy";
									var i = n % 10,
										d = n % 100 - i,
										u = n >= 100 ? 100 : null;
									return n + (t[i] || t[d] || t[u])
							}
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		827780: function(b, f, l) { //! moment.js locale configuration
			//! locale : Tagalog (Philippines) [tl-ph]
			//! author : Dan Hagman : https://github.com/hagmandan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("tl-ph", {
					months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
					monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
					weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
					weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
					weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "MM/D/YYYY",
						LL: "MMMM D, YYYY",
						LLL: "MMMM D, YYYY HH:mm",
						LLLL: "dddd, MMMM DD, YYYY HH:mm"
					},
					calendar: {
						sameDay: "LT [ngayong araw]",
						nextDay: "[Bukas ng] LT",
						nextWeek: "LT [sa susunod na] dddd",
						lastDay: "LT [kahapon]",
						lastWeek: "LT [noong nakaraang] dddd",
						sameElse: "L"
					},
					relativeTime: {
						future: "sa loob ng %s",
						past: "%s ang nakalipas",
						s: "ilang segundo",
						ss: "%d segundo",
						m: "isang minuto",
						mm: "%d minuto",
						h: "isang oras",
						hh: "%d oras",
						d: "isang araw",
						dd: "%d araw",
						M: "isang buwan",
						MM: "%d buwan",
						y: "isang taon",
						yy: "%d taon"
					},
					dayOfMonthOrdinalParse: /\d{1,2}/,
					ordinal: function(s) {
						return s
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		210913: function(b, f, l) { //! moment.js locale configuration
			//! locale : Klingon [tlh]
			//! author : Dominika Kruk : https://github.com/amaranthrose
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = "pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");

				function s(u) {
					var m = u;
					return m = u.indexOf("jaj") !== -1 ? m.slice(0, -3) + "leS" : u.indexOf("jar") !== -1 ? m.slice(0, -3) + "waQ" : u.indexOf("DIS") !== -1 ? m.slice(0, -3) + "nem" : m + " pIq", m
				}

				function n(u) {
					var m = u;
					return m = u.indexOf("jaj") !== -1 ? m.slice(0, -3) + "Hu\u2019" : u.indexOf("jar") !== -1 ? m.slice(0, -3) + "wen" : u.indexOf("DIS") !== -1 ? m.slice(0, -3) + "ben" : m + " ret", m
				}

				function r(u, m, A, W) {
					var q = i(u);
					switch (A) {
						case "ss":
							return q + " lup";
						case "mm":
							return q + " tup";
						case "hh":
							return q + " rep";
						case "dd":
							return q + " jaj";
						case "MM":
							return q + " jar";
						case "yy":
							return q + " DIS"
					}
				}

				function i(u) {
					var m = Math.floor(u % 1e3 / 100),
						A = Math.floor(u % 100 / 10),
						W = u % 10,
						q = "";
					return m > 0 && (q += t[m] + "vatlh"), A > 0 && (q += (q !== "" ? " " : "") + t[A] + "maH"), W > 0 && (q += (q !== "" ? " " : "") + t[W]), q === "" ? "pagh" : q
				}
				var d = o.defineLocale("tlh", {
					months: "tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"),
					monthsShort: "jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"),
					monthsParseExact: !0,
					weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
					weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
					weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[DaHjaj] LT",
						nextDay: "[wa\u2019leS] LT",
						nextWeek: "LLL",
						lastDay: "[wa\u2019Hu\u2019] LT",
						lastWeek: "LLL",
						sameElse: "L"
					},
					relativeTime: {
						future: s,
						past: n,
						s: "puS lup",
						ss: r,
						m: "wa\u2019 tup",
						mm: r,
						h: "wa\u2019 rep",
						hh: r,
						d: "wa\u2019 jaj",
						dd: r,
						M: "wa\u2019 jar",
						MM: r,
						y: "wa\u2019 DIS",
						yy: r
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return d
			})
		},
		653493: function(b, f, l) { //! moment.js locale configuration
			//! locale : Turkish [tr]
			//! authors : Erhan Gundogan : https://github.com/erhangundogan,
			//!           Burak Yiğit Kaya: https://github.com/BYK
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = {
						1: "'inci",
						5: "'inci",
						8: "'inci",
						70: "'inci",
						80: "'inci",
						2: "'nci",
						7: "'nci",
						20: "'nci",
						50: "'nci",
						3: "'\xFCnc\xFC",
						4: "'\xFCnc\xFC",
						100: "'\xFCnc\xFC",
						6: "'nc\u0131",
						9: "'uncu",
						10: "'uncu",
						30: "'uncu",
						60: "'\u0131nc\u0131",
						90: "'\u0131nc\u0131"
					},
					s = o.defineLocale("tr", {
						months: "Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),
						monthsShort: "Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara".split("_"),
						weekdays: "Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi".split("_"),
						weekdaysShort: "Paz_Pzt_Sal_\xC7ar_Per_Cum_Cmt".split("_"),
						weekdaysMin: "Pz_Pt_Sa_\xC7a_Pe_Cu_Ct".split("_"),
						meridiem: function(n, r, i) {
							return n < 12 ? i ? "\xF6\xF6" : "\xD6\xD6" : i ? "\xF6s" : "\xD6S"
						},
						meridiemParse: /öö|ÖÖ|ös|ÖS/,
						isPM: function(n) {
							return n === "\xF6s" || n === "\xD6S"
						},
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd, D MMMM YYYY HH:mm"
						},
						calendar: {
							sameDay: "[bug\xFCn saat] LT",
							nextDay: "[yar\u0131n saat] LT",
							nextWeek: "[gelecek] dddd [saat] LT",
							lastDay: "[d\xFCn] LT",
							lastWeek: "[ge\xE7en] dddd [saat] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s sonra",
							past: "%s \xF6nce",
							s: "birka\xE7 saniye",
							ss: "%d saniye",
							m: "bir dakika",
							mm: "%d dakika",
							h: "bir saat",
							hh: "%d saat",
							d: "bir g\xFCn",
							dd: "%d g\xFCn",
							w: "bir hafta",
							ww: "%d hafta",
							M: "bir ay",
							MM: "%d ay",
							y: "bir y\u0131l",
							yy: "%d y\u0131l"
						},
						ordinal: function(n, r) {
							switch (r) {
								case "d":
								case "D":
								case "Do":
								case "DD":
									return n;
								default:
									if (n === 0) return n + "'\u0131nc\u0131";
									var i = n % 10,
										d = n % 100 - i,
										u = n >= 100 ? 100 : null;
									return n + (t[i] || t[d] || t[u])
							}
						},
						week: {
							dow: 1,
							doy: 7
						}
					});
				return s
			})
		},
		65634: function(b, f, l) { //! moment.js locale configuration
			//! locale : Talossan [tzl]
			//! author : Robin van der Vliet : https://github.com/robin0van0der0v
			//! author : Iustì Canun
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("tzl", {
					months: "Januar_Fevraglh_Mar\xE7_Avr\xEFu_Mai_G\xFCn_Julia_Guscht_Setemvar_Listop\xE4ts_Noemvar_Zecemvar".split("_"),
					monthsShort: "Jan_Fev_Mar_Avr_Mai_G\xFCn_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
					weekdays: "S\xFAladi_L\xFAne\xE7i_Maitzi_M\xE1rcuri_Xh\xFAadi_Vi\xE9ner\xE7i_S\xE1turi".split("_"),
					weekdaysShort: "S\xFAl_L\xFAn_Mai_M\xE1r_Xh\xFA_Vi\xE9_S\xE1t".split("_"),
					weekdaysMin: "S\xFA_L\xFA_Ma_M\xE1_Xh_Vi_S\xE1".split("_"),
					longDateFormat: {
						LT: "HH.mm",
						LTS: "HH.mm.ss",
						L: "DD.MM.YYYY",
						LL: "D. MMMM [dallas] YYYY",
						LLL: "D. MMMM [dallas] YYYY HH.mm",
						LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
					},
					meridiemParse: /d\'o|d\'a/i,
					isPM: function(n) {
						return n.toLowerCase() === "d'o"
					},
					meridiem: function(n, r, i) {
						return n > 11 ? i ? "d'o" : "D'O" : i ? "d'a" : "D'A"
					},
					calendar: {
						sameDay: "[oxhi \xE0] LT",
						nextDay: "[dem\xE0 \xE0] LT",
						nextWeek: "dddd [\xE0] LT",
						lastDay: "[ieiri \xE0] LT",
						lastWeek: "[s\xFCr el] dddd [lasteu \xE0] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "osprei %s",
						past: "ja%s",
						s: s,
						ss: s,
						m: s,
						mm: s,
						h: s,
						hh: s,
						d: s,
						dd: s,
						M: s,
						MM: s,
						y: s,
						yy: s
					},
					dayOfMonthOrdinalParse: /\d{1,2}\./,
					ordinal: "%d.",
					week: {
						dow: 1,
						doy: 4
					}
				});

				function s(n, r, i, d) {
					var u = {
						s: ["viensas secunds", "'iensas secunds"],
						ss: [n + " secunds", "" + n + " secunds"],
						m: ["'n m\xEDut", "'iens m\xEDut"],
						mm: [n + " m\xEDuts", "" + n + " m\xEDuts"],
						h: ["'n \xFEora", "'iensa \xFEora"],
						hh: [n + " \xFEoras", "" + n + " \xFEoras"],
						d: ["'n ziua", "'iensa ziua"],
						dd: [n + " ziuas", "" + n + " ziuas"],
						M: ["'n mes", "'iens mes"],
						MM: [n + " mesen", "" + n + " mesen"],
						y: ["'n ar", "'iens ar"],
						yy: [n + " ars", "" + n + " ars"]
					};
					return d || r ? u[i][0] : u[i][1]
				}
				return t
			})
		},
		251897: function(b, f, l) { //! moment.js locale configuration
			//! locale : Central Atlas Tamazight Latin [tzm-latn]
			//! author : Abdel Said : https://github.com/abdelsaid
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("tzm-latn", {
					months: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"),
					monthsShort: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"),
					weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
					weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
					weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[asdkh g] LT",
						nextDay: "[aska g] LT",
						nextWeek: "dddd [g] LT",
						lastDay: "[assant g] LT",
						lastWeek: "dddd [g] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "dadkh s yan %s",
						past: "yan %s",
						s: "imik",
						ss: "%d imik",
						m: "minu\u1E0D",
						mm: "%d minu\u1E0D",
						h: "sa\u025Ba",
						hh: "%d tassa\u025Bin",
						d: "ass",
						dd: "%d ossan",
						M: "ayowr",
						MM: "%d iyyirn",
						y: "asgas",
						yy: "%d isgasn"
					},
					week: {
						dow: 6,
						doy: 12
					}
				});
				return t
			})
		},
		589602: function(b, f, l) { //! moment.js locale configuration
			//! locale : Central Atlas Tamazight [tzm]
			//! author : Abdel Said : https://github.com/abdelsaid
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("tzm", {
					months: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"),
					monthsShort: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"),
					weekdays: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
					weekdaysShort: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
					weekdaysMin: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[\u2D30\u2D59\u2D37\u2D45 \u2D34] LT",
						nextDay: "[\u2D30\u2D59\u2D3D\u2D30 \u2D34] LT",
						nextWeek: "dddd [\u2D34] LT",
						lastDay: "[\u2D30\u2D5A\u2D30\u2D4F\u2D5C \u2D34] LT",
						lastWeek: "dddd [\u2D34] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u2D37\u2D30\u2D37\u2D45 \u2D59 \u2D62\u2D30\u2D4F %s",
						past: "\u2D62\u2D30\u2D4F %s",
						s: "\u2D49\u2D4E\u2D49\u2D3D",
						ss: "%d \u2D49\u2D4E\u2D49\u2D3D",
						m: "\u2D4E\u2D49\u2D4F\u2D53\u2D3A",
						mm: "%d \u2D4E\u2D49\u2D4F\u2D53\u2D3A",
						h: "\u2D59\u2D30\u2D44\u2D30",
						hh: "%d \u2D5C\u2D30\u2D59\u2D59\u2D30\u2D44\u2D49\u2D4F",
						d: "\u2D30\u2D59\u2D59",
						dd: "%d o\u2D59\u2D59\u2D30\u2D4F",
						M: "\u2D30\u2D62o\u2D53\u2D54",
						MM: "%d \u2D49\u2D62\u2D62\u2D49\u2D54\u2D4F",
						y: "\u2D30\u2D59\u2D33\u2D30\u2D59",
						yy: "%d \u2D49\u2D59\u2D33\u2D30\u2D59\u2D4F"
					},
					week: {
						dow: 6,
						doy: 12
					}
				});
				return t
			})
		},
		558344: function(b, f, l) { //! moment.js locale configuration
			//! locale : Uyghur (China) [ug-cn]
			//! author: boyaq : https://github.com/boyaq
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("ug-cn", {
					months: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"),
					monthsShort: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"),
					weekdays: "\u064A\u06D5\u0643\u0634\u06D5\u0646\u0628\u06D5_\u062F\u06C8\u0634\u06D5\u0646\u0628\u06D5_\u0633\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u0686\u0627\u0631\u0634\u06D5\u0646\u0628\u06D5_\u067E\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u062C\u06C8\u0645\u06D5_\u0634\u06D5\u0646\u0628\u06D5".split("_"),
					weekdaysShort: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"),
					weekdaysMin: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY-MM-DD",
						LL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649",
						LLL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm",
						LLLL: "dddd\u060C YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm"
					},
					meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
					meridiemHour: function(s, n) {
						return s === 12 && (s = 0), n === "\u064A\u06D0\u0631\u0649\u0645 \u0643\u06D0\u0686\u06D5" || n === "\u0633\u06D5\u06BE\u06D5\u0631" || n === "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0628\u06C7\u0631\u06C7\u0646" ? s : n === "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0643\u06D0\u064A\u0649\u0646" || n === "\u0643\u06D5\u0686" ? s + 12 : s >= 11 ? s : s + 12
					},
					meridiem: function(s, n, r) {
						var i = s * 100 + n;
						return i < 600 ? "\u064A\u06D0\u0631\u0649\u0645 \u0643\u06D0\u0686\u06D5" : i < 900 ? "\u0633\u06D5\u06BE\u06D5\u0631" : i < 1130 ? "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0628\u06C7\u0631\u06C7\u0646" : i < 1230 ? "\u0686\u06C8\u0634" : i < 1800 ? "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0643\u06D0\u064A\u0649\u0646" : "\u0643\u06D5\u0686"
					},
					calendar: {
						sameDay: "[\u0628\u06C8\u06AF\u06C8\u0646 \u0633\u0627\u0626\u06D5\u062A] LT",
						nextDay: "[\u0626\u06D5\u062A\u06D5 \u0633\u0627\u0626\u06D5\u062A] LT",
						nextWeek: "[\u0643\u06D0\u0644\u06D5\u0631\u0643\u0649] dddd [\u0633\u0627\u0626\u06D5\u062A] LT",
						lastDay: "[\u062A\u06C6\u0646\u06C8\u06AF\u06C8\u0646] LT",
						lastWeek: "[\u0626\u0627\u0644\u062F\u0649\u0646\u0642\u0649] dddd [\u0633\u0627\u0626\u06D5\u062A] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s \u0643\u06D0\u064A\u0649\u0646",
						past: "%s \u0628\u06C7\u0631\u06C7\u0646",
						s: "\u0646\u06D5\u0686\u0686\u06D5 \u0633\u06D0\u0643\u0648\u0646\u062A",
						ss: "%d \u0633\u06D0\u0643\u0648\u0646\u062A",
						m: "\u0628\u0649\u0631 \u0645\u0649\u0646\u06C7\u062A",
						mm: "%d \u0645\u0649\u0646\u06C7\u062A",
						h: "\u0628\u0649\u0631 \u0633\u0627\u0626\u06D5\u062A",
						hh: "%d \u0633\u0627\u0626\u06D5\u062A",
						d: "\u0628\u0649\u0631 \u0643\u06C8\u0646",
						dd: "%d \u0643\u06C8\u0646",
						M: "\u0628\u0649\u0631 \u0626\u0627\u064A",
						MM: "%d \u0626\u0627\u064A",
						y: "\u0628\u0649\u0631 \u064A\u0649\u0644",
						yy: "%d \u064A\u0649\u0644"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "-\u0643\u06C8\u0646\u0649";
							case "w":
							case "W":
								return s + "-\u06BE\u06D5\u067E\u062A\u06D5";
							default:
								return s
						}
					},
					preparse: function(s) {
						return s.replace(/،/g, ",")
					},
					postformat: function(s) {
						return s.replace(/,/g, "\u060C")
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		298845: function(b, f, l) { //! moment.js locale configuration
			//! locale : Ukrainian [uk]
			//! author : zemlanin : https://github.com/zemlanin
			//! Author : Menelion Elensúle : https://github.com/Oire
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				function t(d, u) {
					var m = d.split("_");
					return u % 10 == 1 && u % 100 != 11 ? m[0] : u % 10 >= 2 && u % 10 <= 4 && (u % 100 < 10 || u % 100 >= 20) ? m[1] : m[2]
				}

				function s(d, u, m) {
					var A = {
						ss: u ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434",
						mm: u ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D",
						hh: u ? "\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D" : "\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D",
						dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432",
						MM: "\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432",
						yy: "\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432"
					};
					return m === "m" ? u ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443" : m === "h" ? u ? "\u0433\u043E\u0434\u0438\u043D\u0430" : "\u0433\u043E\u0434\u0438\u043D\u0443" : d + " " + t(A[m], +d)
				}

				function n(d, u) {
					var m = {
							nominative: "\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"),
							accusative: "\u043D\u0435\u0434\u0456\u043B\u044E_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044E_\u0441\u0443\u0431\u043E\u0442\u0443".split("_"),
							genitive: "\u043D\u0435\u0434\u0456\u043B\u0456_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043A\u0430_\u0432\u0456\u0432\u0442\u043E\u0440\u043A\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u0456_\u0441\u0443\u0431\u043E\u0442\u0438".split("_")
						},
						A;
					return d === !0 ? m.nominative.slice(1, 7).concat(m.nominative.slice(0, 1)) : d ? (A = /(\[[ВвУу]\]) ?dddd/.test(u) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(u) ? "genitive" : "nominative", m[A][d.day()]) : m.nominative
				}

				function r(d) {
					return function() {
						return d + "\u043E" + (this.hours() === 11 ? "\u0431" : "") + "] LT"
					}
				}
				var i = o.defineLocale("uk", {
					months: {
						format: "\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F".split("_"),
						standalone: "\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C".split("_")
					},
					monthsShort: "\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),
					weekdays: n,
					weekdaysShort: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
					weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD.MM.YYYY",
						LL: "D MMMM YYYY \u0440.",
						LLL: "D MMMM YYYY \u0440., HH:mm",
						LLLL: "dddd, D MMMM YYYY \u0440., HH:mm"
					},
					calendar: {
						sameDay: r("[\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456 "),
						nextDay: r("[\u0417\u0430\u0432\u0442\u0440\u0430 "),
						lastDay: r("[\u0412\u0447\u043E\u0440\u0430 "),
						nextWeek: r("[\u0423] dddd ["),
						lastWeek: function() {
							switch (this.day()) {
								case 0:
								case 3:
								case 5:
								case 6:
									return r("[\u041C\u0438\u043D\u0443\u043B\u043E\u0457] dddd [").call(this);
								case 1:
								case 2:
								case 4:
									return r("[\u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E] dddd [").call(this)
							}
						},
						sameElse: "L"
					},
					relativeTime: {
						future: "\u0437\u0430 %s",
						past: "%s \u0442\u043E\u043C\u0443",
						s: "\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434",
						ss: s,
						m: s,
						mm: s,
						h: "\u0433\u043E\u0434\u0438\u043D\u0443",
						hh: s,
						d: "\u0434\u0435\u043D\u044C",
						dd: s,
						M: "\u043C\u0456\u0441\u044F\u0446\u044C",
						MM: s,
						y: "\u0440\u0456\u043A",
						yy: s
					},
					meridiemParse: /ночі|ранку|дня|вечора/,
					isPM: function(d) {
						return /^(дня|вечора)$/.test(d)
					},
					meridiem: function(d, u, m) {
						return d < 4 ? "\u043D\u043E\u0447\u0456" : d < 12 ? "\u0440\u0430\u043D\u043A\u0443" : d < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u043E\u0440\u0430"
					},
					dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
					ordinal: function(d, u) {
						switch (u) {
							case "M":
							case "d":
							case "DDD":
							case "w":
							case "W":
								return d + "-\u0439";
							case "D":
								return d + "-\u0433\u043E";
							default:
								return d
						}
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return i
			})
		},
		812449: function(b, f, l) { //! moment.js locale configuration
			//! locale : Urdu [ur]
			//! author : Sawood Alam : https://github.com/ibnesayeed
			//! author : Zack : https://github.com/ZackVision
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = ["\u062C\u0646\u0648\u0631\u06CC", "\u0641\u0631\u0648\u0631\u06CC", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u06CC\u0644", "\u0645\u0626\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u0626\u06CC", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u06A9\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"],
					s = ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u06CC\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u06C1", "\u06C1\u0641\u062A\u06C1"],
					n = o.defineLocale("ur", {
						months: t,
						monthsShort: t,
						weekdays: s,
						weekdaysShort: s,
						weekdaysMin: s,
						longDateFormat: {
							LT: "HH:mm",
							LTS: "HH:mm:ss",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY HH:mm",
							LLLL: "dddd\u060C D MMMM YYYY HH:mm"
						},
						meridiemParse: /صبح|شام/,
						isPM: function(r) {
							return r === "\u0634\u0627\u0645"
						},
						meridiem: function(r, i, d) {
							return r < 12 ? "\u0635\u0628\u062D" : "\u0634\u0627\u0645"
						},
						calendar: {
							sameDay: "[\u0622\u062C \u0628\u0648\u0642\u062A] LT",
							nextDay: "[\u06A9\u0644 \u0628\u0648\u0642\u062A] LT",
							nextWeek: "dddd [\u0628\u0648\u0642\u062A] LT",
							lastDay: "[\u06AF\u0630\u0634\u062A\u06C1 \u0631\u0648\u0632 \u0628\u0648\u0642\u062A] LT",
							lastWeek: "[\u06AF\u0630\u0634\u062A\u06C1] dddd [\u0628\u0648\u0642\u062A] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \u0628\u0639\u062F",
							past: "%s \u0642\u0628\u0644",
							s: "\u0686\u0646\u062F \u0633\u06CC\u06A9\u0646\u0688",
							ss: "%d \u0633\u06CC\u06A9\u0646\u0688",
							m: "\u0627\u06CC\u06A9 \u0645\u0646\u0679",
							mm: "%d \u0645\u0646\u0679",
							h: "\u0627\u06CC\u06A9 \u06AF\u06BE\u0646\u0679\u06C1",
							hh: "%d \u06AF\u06BE\u0646\u0679\u06D2",
							d: "\u0627\u06CC\u06A9 \u062F\u0646",
							dd: "%d \u062F\u0646",
							M: "\u0627\u06CC\u06A9 \u0645\u0627\u06C1",
							MM: "%d \u0645\u0627\u06C1",
							y: "\u0627\u06CC\u06A9 \u0633\u0627\u0644",
							yy: "%d \u0633\u0627\u0644"
						},
						preparse: function(r) {
							return r.replace(/،/g, ",")
						},
						postformat: function(r) {
							return r.replace(/,/g, "\u060C")
						},
						week: {
							dow: 1,
							doy: 4
						}
					});
				return n
			})
		},
		142690: function(b, f, l) { //! moment.js locale configuration
			//! locale : Uzbek Latin [uz-latn]
			//! author : Rasulbek Mirzayev : github.com/Rasulbeeek
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("uz-latn", {
					months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
					monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
					weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
					weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
					weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "D MMMM YYYY, dddd HH:mm"
					},
					calendar: {
						sameDay: "[Bugun soat] LT [da]",
						nextDay: "[Ertaga] LT [da]",
						nextWeek: "dddd [kuni soat] LT [da]",
						lastDay: "[Kecha soat] LT [da]",
						lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
						sameElse: "L"
					},
					relativeTime: {
						future: "Yaqin %s ichida",
						past: "Bir necha %s oldin",
						s: "soniya",
						ss: "%d soniya",
						m: "bir daqiqa",
						mm: "%d daqiqa",
						h: "bir soat",
						hh: "%d soat",
						d: "bir kun",
						dd: "%d kun",
						M: "bir oy",
						MM: "%d oy",
						y: "bir yil",
						yy: "%d yil"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		97696: function(b, f, l) { //! moment.js locale configuration
			//! locale : Uzbek [uz]
			//! author : Sardor Muminov : https://github.com/muminoff
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("uz", {
					months: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_"),
					monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"),
					weekdays: "\u042F\u043A\u0448\u0430\u043D\u0431\u0430_\u0414\u0443\u0448\u0430\u043D\u0431\u0430_\u0421\u0435\u0448\u0430\u043D\u0431\u0430_\u0427\u043E\u0440\u0448\u0430\u043D\u0431\u0430_\u041F\u0430\u0439\u0448\u0430\u043D\u0431\u0430_\u0416\u0443\u043C\u0430_\u0428\u0430\u043D\u0431\u0430".split("_"),
					weekdaysShort: "\u042F\u043A\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043E\u0440_\u041F\u0430\u0439_\u0416\u0443\u043C_\u0428\u0430\u043D".split("_"),
					weekdaysMin: "\u042F\u043A_\u0414\u0443_\u0421\u0435_\u0427\u043E_\u041F\u0430_\u0416\u0443_\u0428\u0430".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "D MMMM YYYY, dddd HH:mm"
					},
					calendar: {
						sameDay: "[\u0411\u0443\u0433\u0443\u043D \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
						nextDay: "[\u042D\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]",
						nextWeek: "dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
						lastDay: "[\u041A\u0435\u0447\u0430 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
						lastWeek: "[\u0423\u0442\u0433\u0430\u043D] dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
						sameElse: "L"
					},
					relativeTime: {
						future: "\u042F\u043A\u0438\u043D %s \u0438\u0447\u0438\u0434\u0430",
						past: "\u0411\u0438\u0440 \u043D\u0435\u0447\u0430 %s \u043E\u043B\u0434\u0438\u043D",
						s: "\u0444\u0443\u0440\u0441\u0430\u0442",
						ss: "%d \u0444\u0443\u0440\u0441\u0430\u0442",
						m: "\u0431\u0438\u0440 \u0434\u0430\u043A\u0438\u043A\u0430",
						mm: "%d \u0434\u0430\u043A\u0438\u043A\u0430",
						h: "\u0431\u0438\u0440 \u0441\u043E\u0430\u0442",
						hh: "%d \u0441\u043E\u0430\u0442",
						d: "\u0431\u0438\u0440 \u043A\u0443\u043D",
						dd: "%d \u043A\u0443\u043D",
						M: "\u0431\u0438\u0440 \u043E\u0439",
						MM: "%d \u043E\u0439",
						y: "\u0431\u0438\u0440 \u0439\u0438\u043B",
						yy: "%d \u0439\u0438\u043B"
					},
					week: {
						dow: 1,
						doy: 7
					}
				});
				return t
			})
		},
		237065: function(b, f, l) { //! moment.js locale configuration
			//! locale : Vietnamese [vi]
			//! author : Bang Nguyen : https://github.com/bangnk
			//! author : Chien Kira : https://github.com/chienkira
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("vi", {
					months: "th\xE1ng 1_th\xE1ng 2_th\xE1ng 3_th\xE1ng 4_th\xE1ng 5_th\xE1ng 6_th\xE1ng 7_th\xE1ng 8_th\xE1ng 9_th\xE1ng 10_th\xE1ng 11_th\xE1ng 12".split("_"),
					monthsShort: "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split("_"),
					monthsParseExact: !0,
					weekdays: "ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y".split("_"),
					weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
					weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
					weekdaysParseExact: !0,
					meridiemParse: /sa|ch/i,
					isPM: function(s) {
						return /^ch$/i.test(s)
					},
					meridiem: function(s, n, r) {
						return s < 12 ? r ? "sa" : "SA" : r ? "ch" : "CH"
					},
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "D MMMM [n\u0103m] YYYY",
						LLL: "D MMMM [n\u0103m] YYYY HH:mm",
						LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm",
						l: "DD/M/YYYY",
						ll: "D MMM YYYY",
						lll: "D MMM YYYY HH:mm",
						llll: "ddd, D MMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[H\xF4m nay l\xFAc] LT",
						nextDay: "[Ng\xE0y mai l\xFAc] LT",
						nextWeek: "dddd [tu\u1EA7n t\u1EDBi l\xFAc] LT",
						lastDay: "[H\xF4m qua l\xFAc] LT",
						lastWeek: "dddd [tu\u1EA7n tr\u01B0\u1EDBc l\xFAc] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "%s t\u1EDBi",
						past: "%s tr\u01B0\u1EDBc",
						s: "v\xE0i gi\xE2y",
						ss: "%d gi\xE2y",
						m: "m\u1ED9t ph\xFAt",
						mm: "%d ph\xFAt",
						h: "m\u1ED9t gi\u1EDD",
						hh: "%d gi\u1EDD",
						d: "m\u1ED9t ng\xE0y",
						dd: "%d ng\xE0y",
						w: "m\u1ED9t tu\u1EA7n",
						ww: "%d tu\u1EA7n",
						M: "m\u1ED9t th\xE1ng",
						MM: "%d th\xE1ng",
						y: "m\u1ED9t n\u0103m",
						yy: "%d n\u0103m"
					},
					dayOfMonthOrdinalParse: /\d{1,2}/,
					ordinal: function(s) {
						return s
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		101554: function(b, f, l) { //! moment.js locale configuration
			//! locale : Pseudo [x-pseudo]
			//! author : Andrew Hood : https://github.com/andrewhood125
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("x-pseudo", {
					months: "J~\xE1\xF1\xFA\xE1~r\xFD_F~\xE9br\xFA~\xE1r\xFD_~M\xE1rc~h_\xC1p~r\xEDl_~M\xE1\xFD_~J\xFA\xF1\xE9~_J\xFAl~\xFD_\xC1\xFA~g\xFAst~_S\xE9p~t\xE9mb~\xE9r_\xD3~ct\xF3b~\xE9r_\xD1~\xF3v\xE9m~b\xE9r_~D\xE9c\xE9~mb\xE9r".split("_"),
					monthsShort: "J~\xE1\xF1_~F\xE9b_~M\xE1r_~\xC1pr_~M\xE1\xFD_~J\xFA\xF1_~J\xFAl_~\xC1\xFAg_~S\xE9p_~\xD3ct_~\xD1\xF3v_~D\xE9c".split("_"),
					monthsParseExact: !0,
					weekdays: "S~\xFA\xF1d\xE1~\xFD_M\xF3~\xF1d\xE1\xFD~_T\xFA\xE9~sd\xE1\xFD~_W\xE9d~\xF1\xE9sd~\xE1\xFD_T~h\xFArs~d\xE1\xFD_~Fr\xEDd~\xE1\xFD_S~\xE1t\xFAr~d\xE1\xFD".split("_"),
					weekdaysShort: "S~\xFA\xF1_~M\xF3\xF1_~T\xFA\xE9_~W\xE9d_~Th\xFA_~Fr\xED_~S\xE1t".split("_"),
					weekdaysMin: "S~\xFA_M\xF3~_T\xFA_~W\xE9_T~h_Fr~_S\xE1".split("_"),
					weekdaysParseExact: !0,
					longDateFormat: {
						LT: "HH:mm",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY HH:mm",
						LLLL: "dddd, D MMMM YYYY HH:mm"
					},
					calendar: {
						sameDay: "[T~\xF3d\xE1~\xFD \xE1t] LT",
						nextDay: "[T~\xF3m\xF3~rr\xF3~w \xE1t] LT",
						nextWeek: "dddd [\xE1t] LT",
						lastDay: "[\xDD~\xE9st~\xE9rd\xE1~\xFD \xE1t] LT",
						lastWeek: "[L~\xE1st] dddd [\xE1t] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "\xED~\xF1 %s",
						past: "%s \xE1~g\xF3",
						s: "\xE1 ~f\xE9w ~s\xE9c\xF3~\xF1ds",
						ss: "%d s~\xE9c\xF3\xF1~ds",
						m: "\xE1 ~m\xED\xF1~\xFAt\xE9",
						mm: "%d m~\xED\xF1\xFA~t\xE9s",
						h: "\xE1~\xF1 h\xF3~\xFAr",
						hh: "%d h~\xF3\xFArs",
						d: "\xE1 ~d\xE1\xFD",
						dd: "%d d~\xE1\xFDs",
						M: "\xE1 ~m\xF3\xF1~th",
						MM: "%d m~\xF3\xF1t~hs",
						y: "\xE1 ~\xFD\xE9\xE1r",
						yy: "%d \xFD~\xE9\xE1rs"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
					ordinal: function(s) {
						var n = s % 10,
							r = ~~(s % 100 / 10) == 1 ? "th" : n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
						return s + r
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		763334: function(b, f, l) { //! moment.js locale configuration
			//! locale : Yoruba Nigeria [yo]
			//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("yo", {
					months: "S\u1EB9\u0301r\u1EB9\u0301_E\u0300re\u0300le\u0300_\u1EB8r\u1EB9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1EB9mo_O\u0300gu\u0301n_Owewe_\u1ECC\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"),
					monthsShort: "S\u1EB9\u0301r_E\u0300rl_\u1EB8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1EB9_O\u0300gu\u0301_Owe_\u1ECC\u0300wa\u0300_Be\u0301l_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"),
					weekdays: "A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1EB9\u0301gun_\u1ECCj\u1ECD\u0301ru\u0301_\u1ECCj\u1ECD\u0301b\u1ECD_\u1EB8ti\u0300_A\u0300ba\u0301m\u1EB9\u0301ta".split("_"),
					weekdaysShort: "A\u0300i\u0300k_Aje\u0301_I\u0300s\u1EB9\u0301_\u1ECCjr_\u1ECCjb_\u1EB8ti\u0300_A\u0300ba\u0301".split("_"),
					weekdaysMin: "A\u0300i\u0300_Aj_I\u0300s_\u1ECCr_\u1ECCb_\u1EB8t_A\u0300b".split("_"),
					longDateFormat: {
						LT: "h:mm A",
						LTS: "h:mm:ss A",
						L: "DD/MM/YYYY",
						LL: "D MMMM YYYY",
						LLL: "D MMMM YYYY h:mm A",
						LLLL: "dddd, D MMMM YYYY h:mm A"
					},
					calendar: {
						sameDay: "[O\u0300ni\u0300 ni] LT",
						nextDay: "[\u1ECC\u0300la ni] LT",
						nextWeek: "dddd [\u1ECCs\u1EB9\u0300 to\u0301n'b\u1ECD] [ni] LT",
						lastDay: "[A\u0300na ni] LT",
						lastWeek: "dddd [\u1ECCs\u1EB9\u0300 to\u0301l\u1ECD\u0301] [ni] LT",
						sameElse: "L"
					},
					relativeTime: {
						future: "ni\u0301 %s",
						past: "%s k\u1ECDja\u0301",
						s: "i\u0300s\u1EB9ju\u0301 aaya\u0301 die",
						ss: "aaya\u0301 %d",
						m: "i\u0300s\u1EB9ju\u0301 kan",
						mm: "i\u0300s\u1EB9ju\u0301 %d",
						h: "wa\u0301kati kan",
						hh: "wa\u0301kati %d",
						d: "\u1ECDj\u1ECD\u0301 kan",
						dd: "\u1ECDj\u1ECD\u0301 %d",
						M: "osu\u0300 kan",
						MM: "osu\u0300 %d",
						y: "\u1ECDdu\u0301n kan",
						yy: "\u1ECDdu\u0301n %d"
					},
					dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
					ordinal: "\u1ECDj\u1ECD\u0301 %d",
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		915565: function(b, f, l) { //! moment.js locale configuration
			//! locale : Chinese (China) [zh-cn]
			//! author : suupic : https://github.com/suupic
			//! author : Zeno Zeng : https://github.com/zenozeng
			//! author : uu109 : https://github.com/uu109
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("zh-cn", {
					months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
					monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
					weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
					weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY/MM/DD",
						LL: "YYYY\u5E74M\u6708D\u65E5",
						LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
						LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
						l: "YYYY/M/D",
						ll: "YYYY\u5E74M\u6708D\u65E5",
						lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
					},
					meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
					meridiemHour: function(s, n) {
						return s === 12 && (s = 0), n === "\u51CC\u6668" || n === "\u65E9\u4E0A" || n === "\u4E0A\u5348" ? s : n === "\u4E0B\u5348" || n === "\u665A\u4E0A" ? s + 12 : s >= 11 ? s : s + 12
					},
					meridiem: function(s, n, r) {
						var i = s * 100 + n;
						return i < 600 ? "\u51CC\u6668" : i < 900 ? "\u65E9\u4E0A" : i < 1130 ? "\u4E0A\u5348" : i < 1230 ? "\u4E2D\u5348" : i < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A"
					},
					calendar: {
						sameDay: "[\u4ECA\u5929]LT",
						nextDay: "[\u660E\u5929]LT",
						nextWeek: function(s) {
							return s.week() !== this.week() ? "[\u4E0B]dddLT" : "[\u672C]dddLT"
						},
						lastDay: "[\u6628\u5929]LT",
						lastWeek: function(s) {
							return this.week() !== s.week() ? "[\u4E0A]dddLT" : "[\u672C]dddLT"
						},
						sameElse: "L"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "\u65E5";
							case "M":
								return s + "\u6708";
							case "w":
							case "W":
								return s + "\u5468";
							default:
								return s
						}
					},
					relativeTime: {
						future: "%s\u540E",
						past: "%s\u524D",
						s: "\u51E0\u79D2",
						ss: "%d \u79D2",
						m: "1 \u5206\u949F",
						mm: "%d \u5206\u949F",
						h: "1 \u5C0F\u65F6",
						hh: "%d \u5C0F\u65F6",
						d: "1 \u5929",
						dd: "%d \u5929",
						w: "1 \u5468",
						ww: "%d \u5468",
						M: "1 \u4E2A\u6708",
						MM: "%d \u4E2A\u6708",
						y: "1 \u5E74",
						yy: "%d \u5E74"
					},
					week: {
						dow: 1,
						doy: 4
					}
				});
				return t
			})
		},
		221548: function(b, f, l) { //! moment.js locale configuration
			//! locale : Chinese (Hong Kong) [zh-hk]
			//! author : Ben : https://github.com/ben-lin
			//! author : Chris Lam : https://github.com/hehachris
			//! author : Konstantin : https://github.com/skfd
			//! author : Anthony : https://github.com/anthonylau
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("zh-hk", {
					months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
					monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
					weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
					weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY/MM/DD",
						LL: "YYYY\u5E74M\u6708D\u65E5",
						LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
						l: "YYYY/M/D",
						ll: "YYYY\u5E74M\u6708D\u65E5",
						lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
					},
					meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "\u51CC\u6668" || n === "\u65E9\u4E0A" || n === "\u4E0A\u5348") return s;
						if (n === "\u4E2D\u5348") return s >= 11 ? s : s + 12;
						if (n === "\u4E0B\u5348" || n === "\u665A\u4E0A") return s + 12
					},
					meridiem: function(s, n, r) {
						var i = s * 100 + n;
						return i < 600 ? "\u51CC\u6668" : i < 900 ? "\u65E9\u4E0A" : i < 1200 ? "\u4E0A\u5348" : i === 1200 ? "\u4E2D\u5348" : i < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A"
					},
					calendar: {
						sameDay: "[\u4ECA\u5929]LT",
						nextDay: "[\u660E\u5929]LT",
						nextWeek: "[\u4E0B]ddddLT",
						lastDay: "[\u6628\u5929]LT",
						lastWeek: "[\u4E0A]ddddLT",
						sameElse: "L"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "\u65E5";
							case "M":
								return s + "\u6708";
							case "w":
							case "W":
								return s + "\u9031";
							default:
								return s
						}
					},
					relativeTime: {
						future: "%s\u5F8C",
						past: "%s\u524D",
						s: "\u5E7E\u79D2",
						ss: "%d \u79D2",
						m: "1 \u5206\u9418",
						mm: "%d \u5206\u9418",
						h: "1 \u5C0F\u6642",
						hh: "%d \u5C0F\u6642",
						d: "1 \u5929",
						dd: "%d \u5929",
						M: "1 \u500B\u6708",
						MM: "%d \u500B\u6708",
						y: "1 \u5E74",
						yy: "%d \u5E74"
					}
				});
				return t
			})
		},
		197541: function(b, f, l) { //! moment.js locale configuration
			//! locale : Chinese (Macau) [zh-mo]
			//! author : Ben : https://github.com/ben-lin
			//! author : Chris Lam : https://github.com/hehachris
			//! author : Tan Yuanhong : https://github.com/le0tan
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("zh-mo", {
					months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
					monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
					weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
					weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "DD/MM/YYYY",
						LL: "YYYY\u5E74M\u6708D\u65E5",
						LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
						l: "D/M/YYYY",
						ll: "YYYY\u5E74M\u6708D\u65E5",
						lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
					},
					meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "\u51CC\u6668" || n === "\u65E9\u4E0A" || n === "\u4E0A\u5348") return s;
						if (n === "\u4E2D\u5348") return s >= 11 ? s : s + 12;
						if (n === "\u4E0B\u5348" || n === "\u665A\u4E0A") return s + 12
					},
					meridiem: function(s, n, r) {
						var i = s * 100 + n;
						return i < 600 ? "\u51CC\u6668" : i < 900 ? "\u65E9\u4E0A" : i < 1130 ? "\u4E0A\u5348" : i < 1230 ? "\u4E2D\u5348" : i < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A"
					},
					calendar: {
						sameDay: "[\u4ECA\u5929] LT",
						nextDay: "[\u660E\u5929] LT",
						nextWeek: "[\u4E0B]dddd LT",
						lastDay: "[\u6628\u5929] LT",
						lastWeek: "[\u4E0A]dddd LT",
						sameElse: "L"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "\u65E5";
							case "M":
								return s + "\u6708";
							case "w":
							case "W":
								return s + "\u9031";
							default:
								return s
						}
					},
					relativeTime: {
						future: "%s\u5167",
						past: "%s\u524D",
						s: "\u5E7E\u79D2",
						ss: "%d \u79D2",
						m: "1 \u5206\u9418",
						mm: "%d \u5206\u9418",
						h: "1 \u5C0F\u6642",
						hh: "%d \u5C0F\u6642",
						d: "1 \u5929",
						dd: "%d \u5929",
						M: "1 \u500B\u6708",
						MM: "%d \u500B\u6708",
						y: "1 \u5E74",
						yy: "%d \u5E74"
					}
				});
				return t
			})
		},
		960901: function(b, f, l) { //! moment.js locale configuration
			//! locale : Chinese (Taiwan) [zh-tw]
			//! author : Ben : https://github.com/ben-lin
			//! author : Chris Lam : https://github.com/hehachris
			(function(o, t) {
				t(l(572063))
			})(this, function(o) {
				"use strict"; //! moment.js locale configuration
				var t = o.defineLocale("zh-tw", {
					months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
					monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
					weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
					weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
					weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
					longDateFormat: {
						LT: "HH:mm",
						LTS: "HH:mm:ss",
						L: "YYYY/MM/DD",
						LL: "YYYY\u5E74M\u6708D\u65E5",
						LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
						l: "YYYY/M/D",
						ll: "YYYY\u5E74M\u6708D\u65E5",
						lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
						llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
					},
					meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
					meridiemHour: function(s, n) {
						if (s === 12 && (s = 0), n === "\u51CC\u6668" || n === "\u65E9\u4E0A" || n === "\u4E0A\u5348") return s;
						if (n === "\u4E2D\u5348") return s >= 11 ? s : s + 12;
						if (n === "\u4E0B\u5348" || n === "\u665A\u4E0A") return s + 12
					},
					meridiem: function(s, n, r) {
						var i = s * 100 + n;
						return i < 600 ? "\u51CC\u6668" : i < 900 ? "\u65E9\u4E0A" : i < 1130 ? "\u4E0A\u5348" : i < 1230 ? "\u4E2D\u5348" : i < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A"
					},
					calendar: {
						sameDay: "[\u4ECA\u5929] LT",
						nextDay: "[\u660E\u5929] LT",
						nextWeek: "[\u4E0B]dddd LT",
						lastDay: "[\u6628\u5929] LT",
						lastWeek: "[\u4E0A]dddd LT",
						sameElse: "L"
					},
					dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
					ordinal: function(s, n) {
						switch (n) {
							case "d":
							case "D":
							case "DDD":
								return s + "\u65E5";
							case "M":
								return s + "\u6708";
							case "w":
							case "W":
								return s + "\u9031";
							default:
								return s
						}
					},
					relativeTime: {
						future: "%s\u5F8C",
						past: "%s\u524D",
						s: "\u5E7E\u79D2",
						ss: "%d \u79D2",
						m: "1 \u5206\u9418",
						mm: "%d \u5206\u9418",
						h: "1 \u5C0F\u6642",
						hh: "%d \u5C0F\u6642",
						d: "1 \u5929",
						dd: "%d \u5929",
						M: "1 \u500B\u6708",
						MM: "%d \u500B\u6708",
						y: "1 \u5E74",
						yy: "%d \u5E74"
					}
				});
				return t
			})
		},
		572063: function(b, f, l) {
			b = l.nmd(b); //! moment.js
			//! version : 2.29.4
			//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
			//! license : MIT
			//! momentjs.com
			(function(o, t) {
				b.exports = t()
			})(this, function() {
				"use strict";
				var o;

				function t() {
					return o.apply(null, arguments)
				}

				function s(e) {
					o = e
				}

				function n(e) {
					return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]"
				}

				function r(e) {
					return e != null && Object.prototype.toString.call(e) === "[object Object]"
				}

				function i(e, a) {
					return Object.prototype.hasOwnProperty.call(e, a)
				}

				function d(e) {
					if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
					var a;
					for (a in e)
						if (i(e, a)) return !1;
					return !0
				}

				function u(e) {
					return e === void 0
				}

				function m(e) {
					return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]"
				}

				function A(e) {
					return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]"
				}

				function W(e, a) {
					var c = [],
						M, _ = e.length;
					for (M = 0; M < _; ++M) c.push(a(e[M], M));
					return c
				}

				function q(e, a) {
					for (var c in a) i(a, c) && (e[c] = a[c]);
					return i(a, "toString") && (e.toString = a.toString), i(a, "valueOf") && (e.valueOf = a.valueOf), e
				}

				function g(e, a, c, M) {
					return ze(e, a, c, M, !0).utc()
				}

				function r0() {
					return {
						empty: !1,
						unusedTokens: [],
						unusedInput: [],
						overflow: -2,
						charsLeftOver: 0,
						nullInput: !1,
						invalidEra: null,
						invalidMonth: null,
						invalidFormat: !1,
						userInvalidated: !1,
						iso: !1,
						parsedDateParts: [],
						era: null,
						meridiem: null,
						rfc2822: !1,
						weekdayMismatch: !1
					}
				}

				function T(e) {
					return e._pf == null && (e._pf = r0()), e._pf
				}
				var G;
				Array.prototype.some ? G = Array.prototype.some : G = function(e) {
					var a = Object(this),
						c = a.length >>> 0,
						M;
					for (M = 0; M < c; M++)
						if (M in a && e.call(this, a[M], M, a)) return !0;
					return !1
				};

				function k0(e) {
					if (e._isValid == null) {
						var a = T(e),
							c = G.call(a.parsedDateParts, function(_) {
								return _ != null
							}),
							M = !isNaN(e._d.getTime()) && a.overflow < 0 && !a.empty && !a.invalidEra && !a.invalidMonth && !a.invalidWeekday && !a.weekdayMismatch && !a.nullInput && !a.invalidFormat && !a.userInvalidated && (!a.meridiem || a.meridiem && c);
						if (e._strict && (M = M && a.charsLeftOver === 0 && a.unusedTokens.length === 0 && a.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e)) e._isValid = M;
						else return M
					}
					return e._isValid
				}

				function m0(e) {
					var a = g(NaN);
					return e != null ? q(T(a), e) : T(a).userInvalidated = !0, a
				}
				var U0 = t.momentProperties = [],
					L0 = !1;

				function l0(e, a) {
					var c, M, _, p = U0.length;
					if (u(a._isAMomentObject) || (e._isAMomentObject = a._isAMomentObject), u(a._i) || (e._i = a._i), u(a._f) || (e._f = a._f), u(a._l) || (e._l = a._l), u(a._strict) || (e._strict = a._strict), u(a._tzm) || (e._tzm = a._tzm), u(a._isUTC) || (e._isUTC = a._isUTC), u(a._offset) || (e._offset = a._offset), u(a._pf) || (e._pf = T(a)), u(a._locale) || (e._locale = a._locale), p > 0)
						for (c = 0; c < p; c++) M = U0[c], _ = a[M], u(_) || (e[M] = _);
					return e
				}

				function D0(e) {
					l0(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), L0 === !1 && (L0 = !0, t.updateOffset(this), L0 = !1)
				}

				function a0(e) {
					return e instanceof D0 || e != null && e._isAMomentObject != null
				}

				function t1(e) {
					t.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + e)
				}

				function e0(e, a) {
					var c = !0;
					return q(function() {
						if (t.deprecationHandler != null && t.deprecationHandler(null, e), c) {
							var M = [],
								_, p, z, N = arguments.length;
							for (p = 0; p < N; p++) {
								if (_ = "", typeof arguments[p] == "object") {
									_ += "\n[" + p + "] ";
									for (z in arguments[0]) i(arguments[0], z) && (_ += z + ": " + arguments[0][z] + ", ");
									_ = _.slice(0, -2)
								} else _ = arguments[p];
								M.push(_)
							}
							t1(e + "\nArguments: " + Array.prototype.slice.call(M).join("") + "\n" + new Error().stack), c = !1
						}
						return a.apply(this, arguments)
					}, a)
				}
				var n1 = {};

				function s1(e, a) {
					t.deprecationHandler != null && t.deprecationHandler(e, a), n1[e] || (t1(a), n1[e] = !0)
				}
				t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;

				function c0(e) {
					return typeof Function != "undefined" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]"
				}

				function W1(e) {
					var a, c;
					for (c in e) i(e, c) && (a = e[c], c0(a) ? this[c] = a : this["_" + c] = a);
					this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
				}

				function b0(e, a) {
					var c = q({}, e),
						M;
					for (M in a) i(a, M) && (r(e[M]) && r(a[M]) ? (c[M] = {}, q(c[M], e[M]), q(c[M], a[M])) : a[M] != null ? c[M] = a[M] : delete c[M]);
					for (M in e) i(e, M) && !i(a, M) && r(e[M]) && (c[M] = q({}, c[M]));
					return c
				}

				function H0(e) {
					e != null && this.set(e)
				}
				var t0;
				Object.keys ? t0 = Object.keys : t0 = function(e) {
					var a, c = [];
					for (a in e) i(e, a) && c.push(a);
					return c
				};
				var N1 = {
					sameDay: "[Today at] LT",
					nextDay: "[Tomorrow at] LT",
					nextWeek: "dddd [at] LT",
					lastDay: "[Yesterday at] LT",
					lastWeek: "[Last] dddd [at] LT",
					sameElse: "L"
				};

				function r1(e, a, c) {
					var M = this._calendar[e] || this._calendar.sameElse;
					return c0(M) ? M.call(a, c) : M
				}

				function M0(e, a, c) {
					var M = "" + Math.abs(e),
						_ = a - M.length,
						p = e >= 0;
					return (p ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, _)).toString().substr(1) + M
				}
				var S0 = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
					W0 = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
					d0 = {},
					E = {};

				function O(e, a, c, M) {
					var _ = M;
					typeof M == "string" && (_ = function() {
						return this[M]()
					}), e && (E[e] = _), a && (E[a[0]] = function() {
						return M0(_.apply(this, arguments), a[1], a[2])
					}), c && (E[c] = function() {
						return this.localeData().ordinal(_.apply(this, arguments), e)
					})
				}

				function c1(e) {
					return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
				}

				function M1(e) {
					var a = e.match(S0),
						c, M;
					for (c = 0, M = a.length; c < M; c++) E[a[c]] ? a[c] = E[a[c]] : a[c] = c1(a[c]);
					return function(_) {
						var p = "",
							z;
						for (z = 0; z < M; z++) p += c0(a[z]) ? a[z].call(_, e) : a[z];
						return p
					}
				}

				function E0(e, a) {
					return e.isValid() ? (a = N0(a, e.localeData()), d0[a] = d0[a] || M1(a), d0[a](e)) : e.localeData().invalidDate()
				}

				function N0(e, a) {
					var c = 5;

					function M(_) {
						return a.longDateFormat(_) || _
					}
					for (W0.lastIndex = 0; c >= 0 && W0.test(e);) e = e.replace(W0, M), W0.lastIndex = 0, c -= 1;
					return e
				}
				var L = {
					LTS: "h:mm:ss A",
					LT: "h:mm A",
					L: "MM/DD/YYYY",
					LL: "MMMM D, YYYY",
					LLL: "MMMM D, YYYY h:mm A",
					LLLL: "dddd, MMMM D, YYYY h:mm A"
				};

				function Y(e) {
					var a = this._longDateFormat[e],
						c = this._longDateFormat[e.toUpperCase()];
					return a || !c ? a : (this._longDateFormat[e] = c.match(S0).map(function(M) {
						return M === "MMMM" || M === "MM" || M === "DD" || M === "dddd" ? M.slice(1) : M
					}).join(""), this._longDateFormat[e])
				}
				var h = "Invalid date";

				function D() {
					return this._invalidDate
				}
				var w = "%d",
					H = /\d{1,2}/;

				function J(e) {
					return this._ordinal.replace("%d", e)
				}
				var Z = {
					future: "in %s",
					past: "%s ago",
					s: "a few seconds",
					ss: "%d seconds",
					m: "a minute",
					mm: "%d minutes",
					h: "an hour",
					hh: "%d hours",
					d: "a day",
					dd: "%d days",
					w: "a week",
					ww: "%d weeks",
					M: "a month",
					MM: "%d months",
					y: "a year",
					yy: "%d years"
				};

				function I(e, a, c, M) {
					var _ = this._relativeTime[c];
					return c0(_) ? _(e, a, c, M) : _.replace(/%d/i, e)
				}

				function Q1(e, a) {
					var c = this._relativeTime[e > 0 ? "future" : "past"];
					return c0(c) ? c(a) : c.replace(/%s/i, a)
				}
				var J0 = {};

				function V(e, a) {
					var c = e.toLowerCase();
					J0[c] = J0[c + "s"] = J0[a] = e
				}

				function i0(e) {
					return typeof e == "string" ? J0[e] || J0[e.toLowerCase()] : void 0
				}

				function q1(e) {
					var a = {},
						c, M;
					for (M in e) i(e, M) && (c = i0(M), c && (a[c] = e[M]));
					return a
				}
				var Z1 = {};

				function K(e, a) {
					Z1[e] = a
				}

				function xe(e) {
					var a = [],
						c;
					for (c in e) i(e, c) && a.push({
						unit: c,
						priority: Z1[c]
					});
					return a.sort(function(M, _) {
						return M.priority - _.priority
					}), a
				}

				function i1(e) {
					return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
				}

				function o0(e) {
					return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
				}

				function v(e) {
					var a = +e,
						c = 0;
					return a !== 0 && isFinite(a) && (c = o0(a)), c
				}

				function j0(e, a) {
					return function(c) {
						return c != null ? ($1(this, e, c), t.updateOffset(this, a), this) : o1(this, e)
					}
				}

				function o1(e, a) {
					return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + a]() : NaN
				}

				function $1(e, a, c) {
					e.isValid() && !isNaN(c) && (a === "FullYear" && i1(e.year()) && e.month() === 1 && e.date() === 29 ? (c = v(c), e._d["set" + (e._isUTC ? "UTC" : "") + a](c, e.month(), L1(c, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + a](c))
				}

				function Re(e) {
					return e = i0(e), c0(this[e]) ? this[e]() : this
				}

				function Ce(e, a) {
					if (typeof e == "object") {
						e = q1(e);
						var c = xe(e),
							M, _ = c.length;
						for (M = 0; M < _; M++) this[c[M].unit](e[c[M].unit])
					} else if (e = i0(e), c0(this[e])) return this[e](a);
					return this
				}
				var ee = /\d/,
					n0 = /\d\d/,
					ae = /\d{3}/,
					w1 = /\d{4}/,
					d1 = /[+-]?\d{6}/,
					x = /\d\d?/,
					te = /\d\d\d\d?/,
					ne = /\d\d\d\d\d\d?/,
					_1 = /\d{1,3}/,
					g1 = /\d{1,4}/,
					u1 = /[+-]?\d{1,6}/,
					P0 = /\d+/,
					l1 = /[+-]?\d+/,
					Fe = /Z|[+-]\d\d:?\d\d/gi,
					p1 = /Z|[+-]\d\d(?::?\d\d)?/gi,
					Ie = /[+-]?\d+(\.\d{1,3})?/,
					G0 = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
					m1;
				m1 = {};

				function k(e, a, c) {
					m1[e] = c0(a) ? a : function(M, _) {
						return M && c ? c : a
					}
				}

				function Ue(e, a) {
					return i(m1, e) ? m1[e](a._strict, a._locale) : new RegExp(Je(e))
				}

				function Je(e) {
					return s0(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, c, M, _, p) {
						return c || M || _ || p
					}))
				}

				function s0(e) {
					return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
				}
				var S1 = {};

				function j(e, a) {
					var c, M = a,
						_;
					for (typeof e == "string" && (e = [e]), m(a) && (M = function(p, z) {
							z[a] = v(p)
						}), _ = e.length, c = 0; c < _; c++) S1[e[c]] = M
				}

				function V0(e, a) {
					j(e, function(c, M, _, p) {
						_._w = _._w || {}, a(c, _._w, _, p)
					})
				}

				function Ge(e, a, c) {
					a != null && i(S1, e) && S1[e](a, c._a, c, e)
				}
				var Q = 0,
					f0 = 1,
					p0 = 2,
					U = 3,
					_0 = 4,
					z0 = 5,
					v0 = 6,
					Ve = 7,
					Ke = 8;

				function Qe(e, a) {
					return (e % a + a) % a
				}
				var F;
				Array.prototype.indexOf ? F = Array.prototype.indexOf : F = function(e) {
					var a;
					for (a = 0; a < this.length; ++a)
						if (this[a] === e) return a;
					return -1
				};

				function L1(e, a) {
					if (isNaN(e) || isNaN(a)) return NaN;
					var c = Qe(a, 12);
					return e += (a - c) / 12, c === 1 ? i1(e) ? 29 : 28 : 31 - c % 7 % 2
				}
				O("M", ["MM", 2], "Mo", function() {
					return this.month() + 1
				}), O("MMM", 0, 0, function(e) {
					return this.localeData().monthsShort(this, e)
				}), O("MMMM", 0, 0, function(e) {
					return this.localeData().months(this, e)
				}), V("month", "M"), K("month", 8), k("M", x), k("MM", x, n0), k("MMM", function(e, a) {
					return a.monthsShortRegex(e)
				}), k("MMMM", function(e, a) {
					return a.monthsRegex(e)
				}), j(["M", "MM"], function(e, a) {
					a[f0] = v(e) - 1
				}), j(["MMM", "MMMM"], function(e, a, c, M) {
					var _ = c._locale.monthsParse(e, M, c._strict);
					_ != null ? a[f0] = _ : T(c).invalidMonth = e
				});
				var Ze = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
					se = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
					re = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
					$e = G0,
					ea = G0;

				function aa(e, a) {
					return e ? n(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || re).test(a) ? "format" : "standalone"][e.month()] : n(this._months) ? this._months : this._months.standalone
				}

				function ta(e, a) {
					return e ? n(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[re.test(a) ? "format" : "standalone"][e.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
				}

				function na(e, a, c) {
					var M, _, p, z = e.toLocaleLowerCase();
					if (!this._monthsParse)
						for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], M = 0; M < 12; ++M) p = g([2e3, M]), this._shortMonthsParse[M] = this.monthsShort(p, "").toLocaleLowerCase(), this._longMonthsParse[M] = this.months(p, "").toLocaleLowerCase();
					return c ? a === "MMM" ? (_ = F.call(this._shortMonthsParse, z), _ !== -1 ? _ : null) : (_ = F.call(this._longMonthsParse, z), _ !== -1 ? _ : null) : a === "MMM" ? (_ = F.call(this._shortMonthsParse, z), _ !== -1 ? _ : (_ = F.call(this._longMonthsParse, z), _ !== -1 ? _ : null)) : (_ = F.call(this._longMonthsParse, z), _ !== -1 ? _ : (_ = F.call(this._shortMonthsParse, z), _ !== -1 ? _ : null))
				}

				function sa(e, a, c) {
					var M, _, p;
					if (this._monthsParseExact) return na.call(this, e, a, c);
					for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), M = 0; M < 12; M++) {
						if (_ = g([2e3, M]), c && !this._longMonthsParse[M] && (this._longMonthsParse[M] = new RegExp("^" + this.months(_, "").replace(".", "") + "$", "i"), this._shortMonthsParse[M] = new RegExp("^" + this.monthsShort(_, "").replace(".", "") + "$", "i")), !c && !this._monthsParse[M] && (p = "^" + this.months(_, "") + "|^" + this.monthsShort(_, ""), this._monthsParse[M] = new RegExp(p.replace(".", ""), "i")), c && a === "MMMM" && this._longMonthsParse[M].test(e)) return M;
						if (c && a === "MMM" && this._shortMonthsParse[M].test(e)) return M;
						if (!c && this._monthsParse[M].test(e)) return M
					}
				}

				function ce(e, a) {
					var c;
					if (!e.isValid()) return e;
					if (typeof a == "string") {
						if (/^\d+$/.test(a)) a = v(a);
						else if (a = e.localeData().monthsParse(a), !m(a)) return e
					}
					return c = Math.min(e.date(), L1(e.year(), a)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](a, c), e
				}

				function Me(e) {
					return e != null ? (ce(this, e), t.updateOffset(this, !0), this) : o1(this, "Month")
				}

				function ra() {
					return L1(this.year(), this.month())
				}

				function ca(e) {
					return this._monthsParseExact ? (i(this, "_monthsRegex") || ie.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (i(this, "_monthsShortRegex") || (this._monthsShortRegex = $e), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
				}

				function Ma(e) {
					return this._monthsParseExact ? (i(this, "_monthsRegex") || ie.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (i(this, "_monthsRegex") || (this._monthsRegex = ea), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
				}

				function ie() {
					function e(z, N) {
						return N.length - z.length
					}
					var a = [],
						c = [],
						M = [],
						_, p;
					for (_ = 0; _ < 12; _++) p = g([2e3, _]), a.push(this.monthsShort(p, "")), c.push(this.months(p, "")), M.push(this.months(p, "")), M.push(this.monthsShort(p, ""));
					for (a.sort(e), c.sort(e), M.sort(e), _ = 0; _ < 12; _++) a[_] = s0(a[_]), c[_] = s0(c[_]);
					for (_ = 0; _ < 24; _++) M[_] = s0(M[_]);
					this._monthsRegex = new RegExp("^(" + M.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
				}
				O("Y", 0, 0, function() {
					var e = this.year();
					return e <= 9999 ? M0(e, 4) : "+" + e
				}), O(0, ["YY", 2], 0, function() {
					return this.year() % 100
				}), O(0, ["YYYY", 4], 0, "year"), O(0, ["YYYYY", 5], 0, "year"), O(0, ["YYYYYY", 6, !0], 0, "year"), V("year", "y"), K("year", 1), k("Y", l1), k("YY", x, n0), k("YYYY", g1, w1), k("YYYYY", u1, d1), k("YYYYYY", u1, d1), j(["YYYYY", "YYYYYY"], Q), j("YYYY", function(e, a) {
					a[Q] = e.length === 2 ? t.parseTwoDigitYear(e) : v(e)
				}), j("YY", function(e, a) {
					a[Q] = t.parseTwoDigitYear(e)
				}), j("Y", function(e, a) {
					a[Q] = parseInt(e, 10)
				});

				function K0(e) {
					return i1(e) ? 366 : 365
				}
				t.parseTwoDigitYear = function(e) {
					return v(e) + (v(e) > 68 ? 1900 : 2e3)
				};
				var oe = j0("FullYear", !0);

				function ia() {
					return i1(this.year())
				}

				function oa(e, a, c, M, _, p, z) {
					var N;
					return e < 100 && e >= 0 ? (N = new Date(e + 400, a, c, M, _, p, z), isFinite(N.getFullYear()) && N.setFullYear(e)) : N = new Date(e, a, c, M, _, p, z), N
				}

				function Q0(e) {
					var a, c;
					return e < 100 && e >= 0 ? (c = Array.prototype.slice.call(arguments), c[0] = e + 400, a = new Date(Date.UTC.apply(null, c)), isFinite(a.getUTCFullYear()) && a.setUTCFullYear(e)) : a = new Date(Date.UTC.apply(null, arguments)), a
				}

				function b1(e, a, c) {
					var M = 7 + a - c,
						_ = (7 + Q0(e, 0, M).getUTCDay() - a) % 7;
					return -_ + M - 1
				}

				function de(e, a, c, M, _) {
					var p = (7 + c - M) % 7,
						z = b1(e, M, _),
						N = 1 + 7 * (a - 1) + p + z,
						S, P;
					return N <= 0 ? (S = e - 1, P = K0(S) + N) : N > K0(e) ? (S = e + 1, P = N - K0(e)) : (S = e, P = N), {
						year: S,
						dayOfYear: P
					}
				}

				function Z0(e, a, c) {
					var M = b1(e.year(), a, c),
						_ = Math.floor((e.dayOfYear() - M - 1) / 7) + 1,
						p, z;
					return _ < 1 ? (z = e.year() - 1, p = _ + A0(z, a, c)) : _ > A0(e.year(), a, c) ? (p = _ - A0(e.year(), a, c), z = e.year() + 1) : (z = e.year(), p = _), {
						week: p,
						year: z
					}
				}

				function A0(e, a, c) {
					var M = b1(e, a, c),
						_ = b1(e + 1, a, c);
					return (K0(e) - M + _) / 7
				}
				O("w", ["ww", 2], "wo", "week"), O("W", ["WW", 2], "Wo", "isoWeek"), V("week", "w"), V("isoWeek", "W"), K("week", 5), K("isoWeek", 5), k("w", x), k("ww", x, n0), k("W", x), k("WW", x, n0), V0(["w", "ww", "W", "WW"], function(e, a, c, M) {
					a[M.substr(0, 1)] = v(e)
				});

				function da(e) {
					return Z0(e, this._week.dow, this._week.doy).week
				}
				var _a = {
					dow: 0,
					doy: 6
				};

				function ua() {
					return this._week.dow
				}

				function la() {
					return this._week.doy
				}

				function pa(e) {
					var a = this.localeData().week(this);
					return e == null ? a : this.add((e - a) * 7, "d")
				}

				function ma(e) {
					var a = Z0(this, 1, 4).week;
					return e == null ? a : this.add((e - a) * 7, "d")
				}
				O("d", 0, "do", "day"), O("dd", 0, 0, function(e) {
					return this.localeData().weekdaysMin(this, e)
				}), O("ddd", 0, 0, function(e) {
					return this.localeData().weekdaysShort(this, e)
				}), O("dddd", 0, 0, function(e) {
					return this.localeData().weekdays(this, e)
				}), O("e", 0, 0, "weekday"), O("E", 0, 0, "isoWeekday"), V("day", "d"), V("weekday", "e"), V("isoWeekday", "E"), K("day", 11), K("weekday", 11), K("isoWeekday", 11), k("d", x), k("e", x), k("E", x), k("dd", function(e, a) {
					return a.weekdaysMinRegex(e)
				}), k("ddd", function(e, a) {
					return a.weekdaysShortRegex(e)
				}), k("dddd", function(e, a) {
					return a.weekdaysRegex(e)
				}), V0(["dd", "ddd", "dddd"], function(e, a, c, M) {
					var _ = c._locale.weekdaysParse(e, M, c._strict);
					_ != null ? a.d = _ : T(c).invalidWeekday = e
				}), V0(["d", "e", "E"], function(e, a, c, M) {
					a[M] = v(e)
				});

				function La(e, a) {
					return typeof e != "string" ? e : isNaN(e) ? (e = a.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10)
				}

				function ba(e, a) {
					return typeof e == "string" ? a.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
				}

				function v1(e, a) {
					return e.slice(a, 7).concat(e.slice(0, a))
				}
				var fa = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					_e = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
					za = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
					Aa = G0,
					ha = G0,
					ya = G0;

				function Ya(e, a) {
					var c = n(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(a) ? "format" : "standalone"];
					return e === !0 ? v1(c, this._week.dow) : e ? c[e.day()] : c
				}

				function Ta(e) {
					return e === !0 ? v1(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
				}

				function Oa(e) {
					return e === !0 ? v1(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
				}

				function ka(e, a, c) {
					var M, _, p, z = e.toLocaleLowerCase();
					if (!this._weekdaysParse)
						for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], M = 0; M < 7; ++M) p = g([2e3, 1]).day(M), this._minWeekdaysParse[M] = this.weekdaysMin(p, "").toLocaleLowerCase(), this._shortWeekdaysParse[M] = this.weekdaysShort(p, "").toLocaleLowerCase(), this._weekdaysParse[M] = this.weekdays(p, "").toLocaleLowerCase();
					return c ? a === "dddd" ? (_ = F.call(this._weekdaysParse, z), _ !== -1 ? _ : null) : a === "ddd" ? (_ = F.call(this._shortWeekdaysParse, z), _ !== -1 ? _ : null) : (_ = F.call(this._minWeekdaysParse, z), _ !== -1 ? _ : null) : a === "dddd" ? (_ = F.call(this._weekdaysParse, z), _ !== -1 || (_ = F.call(this._shortWeekdaysParse, z), _ !== -1) ? _ : (_ = F.call(this._minWeekdaysParse, z), _ !== -1 ? _ : null)) : a === "ddd" ? (_ = F.call(this._shortWeekdaysParse, z), _ !== -1 || (_ = F.call(this._weekdaysParse, z), _ !== -1) ? _ : (_ = F.call(this._minWeekdaysParse, z), _ !== -1 ? _ : null)) : (_ = F.call(this._minWeekdaysParse, z), _ !== -1 || (_ = F.call(this._weekdaysParse, z), _ !== -1) ? _ : (_ = F.call(this._shortWeekdaysParse, z), _ !== -1 ? _ : null))
				}

				function Da(e, a, c) {
					var M, _, p;
					if (this._weekdaysParseExact) return ka.call(this, e, a, c);
					for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), M = 0; M < 7; M++) {
						if (_ = g([2e3, 1]).day(M), c && !this._fullWeekdaysParse[M] && (this._fullWeekdaysParse[M] = new RegExp("^" + this.weekdays(_, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[M] = new RegExp("^" + this.weekdaysShort(_, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[M] = new RegExp("^" + this.weekdaysMin(_, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[M] || (p = "^" + this.weekdays(_, "") + "|^" + this.weekdaysShort(_, "") + "|^" + this.weekdaysMin(_, ""), this._weekdaysParse[M] = new RegExp(p.replace(".", ""), "i")), c && a === "dddd" && this._fullWeekdaysParse[M].test(e)) return M;
						if (c && a === "ddd" && this._shortWeekdaysParse[M].test(e)) return M;
						if (c && a === "dd" && this._minWeekdaysParse[M].test(e)) return M;
						if (!c && this._weekdaysParse[M].test(e)) return M
					}
				}

				function Wa(e) {
					if (!this.isValid()) return e != null ? this : NaN;
					var a = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
					return e != null ? (e = La(e, this.localeData()), this.add(e - a, "d")) : a
				}

				function Na(e) {
					if (!this.isValid()) return e != null ? this : NaN;
					var a = (this.day() + 7 - this.localeData()._week.dow) % 7;
					return e == null ? a : this.add(e - a, "d")
				}

				function qa(e) {
					if (!this.isValid()) return e != null ? this : NaN;
					if (e != null) {
						var a = ba(e, this.localeData());
						return this.day(this.day() % 7 ? a : a - 7)
					} else return this.day() || 7
				}

				function wa(e) {
					return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || X1.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (i(this, "_weekdaysRegex") || (this._weekdaysRegex = Aa), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
				}

				function ga(e) {
					return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || X1.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (i(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ha), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
				}

				function Sa(e) {
					return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || X1.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (i(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ya), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
				}

				function X1() {
					function e($, O0) {
						return O0.length - $.length
					}
					var a = [],
						c = [],
						M = [],
						_ = [],
						p, z, N, S, P;
					for (p = 0; p < 7; p++) z = g([2e3, 1]).day(p), N = s0(this.weekdaysMin(z, "")), S = s0(this.weekdaysShort(z, "")), P = s0(this.weekdays(z, "")), a.push(N), c.push(S), M.push(P), _.push(N), _.push(S), _.push(P);
					a.sort(e), c.sort(e), M.sort(e), _.sort(e), this._weekdaysRegex = new RegExp("^(" + _.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + M.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
				}

				function B1() {
					return this.hours() % 12 || 12
				}

				function va() {
					return this.hours() || 24
				}
				O("H", ["HH", 2], 0, "hour"), O("h", ["hh", 2], 0, B1), O("k", ["kk", 2], 0, va), O("hmm", 0, 0, function() {
					return "" + B1.apply(this) + M0(this.minutes(), 2)
				}), O("hmmss", 0, 0, function() {
					return "" + B1.apply(this) + M0(this.minutes(), 2) + M0(this.seconds(), 2)
				}), O("Hmm", 0, 0, function() {
					return "" + this.hours() + M0(this.minutes(), 2)
				}), O("Hmmss", 0, 0, function() {
					return "" + this.hours() + M0(this.minutes(), 2) + M0(this.seconds(), 2)
				});

				function ue(e, a) {
					O(e, 0, 0, function() {
						return this.localeData().meridiem(this.hours(), this.minutes(), a)
					})
				}
				ue("a", !0), ue("A", !1), V("hour", "h"), K("hour", 13);

				function le(e, a) {
					return a._meridiemParse
				}
				k("a", le), k("A", le), k("H", x), k("h", x), k("k", x), k("HH", x, n0), k("hh", x, n0), k("kk", x, n0), k("hmm", te), k("hmmss", ne), k("Hmm", te), k("Hmmss", ne), j(["H", "HH"], U), j(["k", "kk"], function(e, a, c) {
					var M = v(e);
					a[U] = M === 24 ? 0 : M
				}), j(["a", "A"], function(e, a, c) {
					c._isPm = c._locale.isPM(e), c._meridiem = e
				}), j(["h", "hh"], function(e, a, c) {
					a[U] = v(e), T(c).bigHour = !0
				}), j("hmm", function(e, a, c) {
					var M = e.length - 2;
					a[U] = v(e.substr(0, M)), a[_0] = v(e.substr(M)), T(c).bigHour = !0
				}), j("hmmss", function(e, a, c) {
					var M = e.length - 4,
						_ = e.length - 2;
					a[U] = v(e.substr(0, M)), a[_0] = v(e.substr(M, 2)), a[z0] = v(e.substr(_)), T(c).bigHour = !0
				}), j("Hmm", function(e, a, c) {
					var M = e.length - 2;
					a[U] = v(e.substr(0, M)), a[_0] = v(e.substr(M))
				}), j("Hmmss", function(e, a, c) {
					var M = e.length - 4,
						_ = e.length - 2;
					a[U] = v(e.substr(0, M)), a[_0] = v(e.substr(M, 2)), a[z0] = v(e.substr(_))
				});

				function Xa(e) {
					return (e + "").toLowerCase().charAt(0) === "p"
				}
				var Ba = /[ap]\.?m?\.?/i,
					Ha = j0("Hours", !0);

				function Ea(e, a, c) {
					return e > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
				}
				var pe = {
						calendar: N1,
						longDateFormat: L,
						invalidDate: h,
						ordinal: w,
						dayOfMonthOrdinalParse: H,
						relativeTime: Z,
						months: Ze,
						monthsShort: se,
						week: _a,
						weekdays: fa,
						weekdaysMin: za,
						weekdaysShort: _e,
						meridiemParse: Ba
					},
					C = {},
					$0 = {},
					e1;

				function ja(e, a) {
					var c, M = Math.min(e.length, a.length);
					for (c = 0; c < M; c += 1)
						if (e[c] !== a[c]) return c;
					return M
				}

				function me(e) {
					return e && e.toLowerCase().replace("_", "-")
				}

				function Pa(e) {
					for (var a = 0, c, M, _, p; a < e.length;) {
						for (p = me(e[a]).split("-"), c = p.length, M = me(e[a + 1]), M = M ? M.split("-") : null; c > 0;) {
							if (_ = f1(p.slice(0, c).join("-")), _) return _;
							if (M && M.length >= c && ja(p, M) >= c - 1) break;
							c--
						}
						a++
					}
					return e1
				}

				function xa(e) {
					return e.match("^[^/\\\\]*$") != null
				}

				function f1(e) {
					var a = null,
						c;
					if (C[e] === void 0 && !0 && b && b.exports && xa(e)) try {
						a = e1._abbr, c = void 0, l(4929)("./" + e), q0(a)
					} catch (M) {
						C[e] = null
					}
					return C[e]
				}

				function q0(e, a) {
					var c;
					return e && (u(a) ? c = h0(e) : c = H1(e, a), c ? e1 = c : typeof console != "undefined" && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), e1._abbr
				}

				function H1(e, a) {
					if (a !== null) {
						var c, M = pe;
						if (a.abbr = e, C[e] != null) s1("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), M = C[e]._config;
						else if (a.parentLocale != null)
							if (C[a.parentLocale] != null) M = C[a.parentLocale]._config;
							else if (c = f1(a.parentLocale), c != null) M = c._config;
						else return $0[a.parentLocale] || ($0[a.parentLocale] = []), $0[a.parentLocale].push({
							name: e,
							config: a
						}), null;
						return C[e] = new H0(b0(M, a)), $0[e] && $0[e].forEach(function(_) {
							H1(_.name, _.config)
						}), q0(e), C[e]
					} else return delete C[e], null
				}

				function Ra(e, a) {
					if (a != null) {
						var c, M, _ = pe;
						C[e] != null && C[e].parentLocale != null ? C[e].set(b0(C[e]._config, a)) : (M = f1(e), M != null && (_ = M._config), a = b0(_, a), M == null && (a.abbr = e), c = new H0(a), c.parentLocale = C[e], C[e] = c), q0(e)
					} else C[e] != null && (C[e].parentLocale != null ? (C[e] = C[e].parentLocale, e === q0() && q0(e)) : C[e] != null && delete C[e]);
					return C[e]
				}

				function h0(e) {
					var a;
					if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return e1;
					if (!n(e)) {
						if (a = f1(e), a) return a;
						e = [e]
					}
					return Pa(e)
				}

				function Ca() {
					return t0(C)
				}

				function E1(e) {
					var a, c = e._a;
					return c && T(e).overflow === -2 && (a = c[f0] < 0 || c[f0] > 11 ? f0 : c[p0] < 1 || c[p0] > L1(c[Q], c[f0]) ? p0 : c[U] < 0 || c[U] > 24 || c[U] === 24 && (c[_0] !== 0 || c[z0] !== 0 || c[v0] !== 0) ? U : c[_0] < 0 || c[_0] > 59 ? _0 : c[z0] < 0 || c[z0] > 59 ? z0 : c[v0] < 0 || c[v0] > 999 ? v0 : -1, T(e)._overflowDayOfYear && (a < Q || a > p0) && (a = p0), T(e)._overflowWeeks && a === -1 && (a = Ve), T(e)._overflowWeekday && a === -1 && (a = Ke), T(e).overflow = a), e
				}
				var Fa = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
					Ia = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
					Ua = /Z|[+-]\d\d(?::?\d\d)?/,
					z1 = [
						["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
						["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
						["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
						["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
						["YYYY-DDD", /\d{4}-\d{3}/],
						["YYYY-MM", /\d{4}-\d\d/, !1],
						["YYYYYYMMDD", /[+-]\d{10}/],
						["YYYYMMDD", /\d{8}/],
						["GGGG[W]WWE", /\d{4}W\d{3}/],
						["GGGG[W]WW", /\d{4}W\d{2}/, !1],
						["YYYYDDD", /\d{7}/],
						["YYYYMM", /\d{6}/, !1],
						["YYYY", /\d{4}/, !1]
					],
					j1 = [
						["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
						["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
						["HH:mm:ss", /\d\d:\d\d:\d\d/],
						["HH:mm", /\d\d:\d\d/],
						["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
						["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
						["HHmmss", /\d\d\d\d\d\d/],
						["HHmm", /\d\d\d\d/],
						["HH", /\d\d/]
					],
					Ja = /^\/?Date\((-?\d+)/i,
					Ga = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
					Va = {
						UT: 0,
						GMT: 0,
						EDT: -4 * 60,
						EST: -5 * 60,
						CDT: -5 * 60,
						CST: -6 * 60,
						MDT: -6 * 60,
						MST: -7 * 60,
						PDT: -7 * 60,
						PST: -8 * 60
					};

				function Le(e) {
					var a, c, M = e._i,
						_ = Fa.exec(M) || Ia.exec(M),
						p, z, N, S, P = z1.length,
						$ = j1.length;
					if (_) {
						for (T(e).iso = !0, a = 0, c = P; a < c; a++)
							if (z1[a][1].exec(_[1])) {
								z = z1[a][0], p = z1[a][2] !== !1;
								break
							} if (z == null) {
							e._isValid = !1;
							return
						}
						if (_[3]) {
							for (a = 0, c = $; a < c; a++)
								if (j1[a][1].exec(_[3])) {
									N = (_[2] || " ") + j1[a][0];
									break
								} if (N == null) {
								e._isValid = !1;
								return
							}
						}
						if (!p && N != null) {
							e._isValid = !1;
							return
						}
						if (_[4])
							if (Ua.exec(_[4])) S = "Z";
							else {
								e._isValid = !1;
								return
							} e._f = z + (N || "") + (S || ""), x1(e)
					} else e._isValid = !1
				}

				function Ka(e, a, c, M, _, p) {
					var z = [Qa(e), se.indexOf(a), parseInt(c, 10), parseInt(M, 10), parseInt(_, 10)];
					return p && z.push(parseInt(p, 10)), z
				}

				function Qa(e) {
					var a = parseInt(e, 10);
					return a <= 49 ? 2e3 + a : a <= 999 ? 1900 + a : a
				}

				function Za(e) {
					return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
				}

				function $a(e, a, c) {
					if (e) {
						var M = _e.indexOf(e),
							_ = new Date(a[0], a[1], a[2]).getDay();
						if (M !== _) return T(c).weekdayMismatch = !0, c._isValid = !1, !1
					}
					return !0
				}

				function et(e, a, c) {
					if (e) return Va[e];
					if (a) return 0;
					var M = parseInt(c, 10),
						_ = M % 100,
						p = (M - _) / 100;
					return p * 60 + _
				}

				function be(e) {
					var a = Ga.exec(Za(e._i)),
						c;
					if (a) {
						if (c = Ka(a[4], a[3], a[2], a[5], a[6], a[7]), !$a(a[1], c, e)) return;
						e._a = c, e._tzm = et(a[8], a[9], a[10]), e._d = Q0.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), T(e).rfc2822 = !0
					} else e._isValid = !1
				}

				function at(e) {
					var a = Ja.exec(e._i);
					if (a !== null) {
						e._d = new Date(+a[1]);
						return
					}
					if (Le(e), e._isValid === !1) delete e._isValid;
					else return;
					if (be(e), e._isValid === !1) delete e._isValid;
					else return;
					e._strict ? e._isValid = !1 : t.createFromInputFallback(e)
				}
				t.createFromInputFallback = e0("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
					e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
				});

				function x0(e, a, c) {
					return e != null ? e : a != null ? a : c
				}

				function tt(e) {
					var a = new Date(t.now());
					return e._useUTC ? [a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()] : [a.getFullYear(), a.getMonth(), a.getDate()]
				}

				function P1(e) {
					var a, c, M = [],
						_, p, z;
					if (!e._d) {
						for (_ = tt(e), e._w && e._a[p0] == null && e._a[f0] == null && nt(e), e._dayOfYear != null && (z = x0(e._a[Q], _[Q]), (e._dayOfYear > K0(z) || e._dayOfYear === 0) && (T(e)._overflowDayOfYear = !0), c = Q0(z, 0, e._dayOfYear), e._a[f0] = c.getUTCMonth(), e._a[p0] = c.getUTCDate()), a = 0; a < 3 && e._a[a] == null; ++a) e._a[a] = M[a] = _[a];
						for (; a < 7; a++) e._a[a] = M[a] = e._a[a] == null ? a === 2 ? 1 : 0 : e._a[a];
						e._a[U] === 24 && e._a[_0] === 0 && e._a[z0] === 0 && e._a[v0] === 0 && (e._nextDay = !0, e._a[U] = 0), e._d = (e._useUTC ? Q0 : oa).apply(null, M), p = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[U] = 24), e._w && typeof e._w.d != "undefined" && e._w.d !== p && (T(e).weekdayMismatch = !0)
					}
				}

				function nt(e) {
					var a, c, M, _, p, z, N, S, P;
					a = e._w, a.GG != null || a.W != null || a.E != null ? (p = 1, z = 4, c = x0(a.GG, e._a[Q], Z0(R(), 1, 4).year), M = x0(a.W, 1), _ = x0(a.E, 1), (_ < 1 || _ > 7) && (S = !0)) : (p = e._locale._week.dow, z = e._locale._week.doy, P = Z0(R(), p, z), c = x0(a.gg, e._a[Q], P.year), M = x0(a.w, P.week), a.d != null ? (_ = a.d, (_ < 0 || _ > 6) && (S = !0)) : a.e != null ? (_ = a.e + p, (a.e < 0 || a.e > 6) && (S = !0)) : _ = p), M < 1 || M > A0(c, p, z) ? T(e)._overflowWeeks = !0 : S != null ? T(e)._overflowWeekday = !0 : (N = de(c, M, _, p, z), e._a[Q] = N.year, e._dayOfYear = N.dayOfYear)
				}
				t.ISO_8601 = function() {}, t.RFC_2822 = function() {};

				function x1(e) {
					if (e._f === t.ISO_8601) {
						Le(e);
						return
					}
					if (e._f === t.RFC_2822) {
						be(e);
						return
					}
					e._a = [], T(e).empty = !0;
					var a = "" + e._i,
						c, M, _, p, z, N = a.length,
						S = 0,
						P, $;
					for (_ = N0(e._f, e._locale).match(S0) || [], $ = _.length, c = 0; c < $; c++) p = _[c], M = (a.match(Ue(p, e)) || [])[0], M && (z = a.substr(0, a.indexOf(M)), z.length > 0 && T(e).unusedInput.push(z), a = a.slice(a.indexOf(M) + M.length), S += M.length), E[p] ? (M ? T(e).empty = !1 : T(e).unusedTokens.push(p), Ge(p, M, e)) : e._strict && !M && T(e).unusedTokens.push(p);
					T(e).charsLeftOver = N - S, a.length > 0 && T(e).unusedInput.push(a), e._a[U] <= 12 && T(e).bigHour === !0 && e._a[U] > 0 && (T(e).bigHour = void 0), T(e).parsedDateParts = e._a.slice(0), T(e).meridiem = e._meridiem, e._a[U] = st(e._locale, e._a[U], e._meridiem), P = T(e).era, P !== null && (e._a[Q] = e._locale.erasConvertYear(P, e._a[Q])), P1(e), E1(e)
				}

				function st(e, a, c) {
					var M;
					return c == null ? a : e.meridiemHour != null ? e.meridiemHour(a, c) : (e.isPM != null && (M = e.isPM(c), M && a < 12 && (a += 12), !M && a === 12 && (a = 0)), a)
				}

				function rt(e) {
					var a, c, M, _, p, z, N = !1,
						S = e._f.length;
					if (S === 0) {
						T(e).invalidFormat = !0, e._d = new Date(NaN);
						return
					}
					for (_ = 0; _ < S; _++) p = 0, z = !1, a = l0({}, e), e._useUTC != null && (a._useUTC = e._useUTC), a._f = e._f[_], x1(a), k0(a) && (z = !0), p += T(a).charsLeftOver, p += T(a).unusedTokens.length * 10, T(a).score = p, N ? p < M && (M = p, c = a) : (M == null || p < M || z) && (M = p, c = a, z && (N = !0));
					q(e, c || a)
				}

				function ct(e) {
					if (!e._d) {
						var a = q1(e._i),
							c = a.day === void 0 ? a.date : a.day;
						e._a = W([a.year, a.month, c, a.hour, a.minute, a.second, a.millisecond], function(M) {
							return M && parseInt(M, 10)
						}), P1(e)
					}
				}

				function Mt(e) {
					var a = new D0(E1(fe(e)));
					return a._nextDay && (a.add(1, "d"), a._nextDay = void 0), a
				}

				function fe(e) {
					var a = e._i,
						c = e._f;
					return e._locale = e._locale || h0(e._l), a === null || c === void 0 && a === "" ? m0({
						nullInput: !0
					}) : (typeof a == "string" && (e._i = a = e._locale.preparse(a)), a0(a) ? new D0(E1(a)) : (A(a) ? e._d = a : n(c) ? rt(e) : c ? x1(e) : it(e), k0(e) || (e._d = null), e))
				}

				function it(e) {
					var a = e._i;
					u(a) ? e._d = new Date(t.now()) : A(a) ? e._d = new Date(a.valueOf()) : typeof a == "string" ? at(e) : n(a) ? (e._a = W(a.slice(0), function(c) {
						return parseInt(c, 10)
					}), P1(e)) : r(a) ? ct(e) : m(a) ? e._d = new Date(a) : t.createFromInputFallback(e)
				}

				function ze(e, a, c, M, _) {
					var p = {};
					return (a === !0 || a === !1) && (M = a, a = void 0), (c === !0 || c === !1) && (M = c, c = void 0), (r(e) && d(e) || n(e) && e.length === 0) && (e = void 0), p._isAMomentObject = !0, p._useUTC = p._isUTC = _, p._l = c, p._i = e, p._f = a, p._strict = M, Mt(p)
				}

				function R(e, a, c, M) {
					return ze(e, a, c, M, !1)
				}
				var ot = e0("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
						var e = R.apply(null, arguments);
						return this.isValid() && e.isValid() ? e < this ? this : e : m0()
					}),
					dt = e0("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
						var e = R.apply(null, arguments);
						return this.isValid() && e.isValid() ? e > this ? this : e : m0()
					});

				function Ae(e, a) {
					var c, M;
					if (a.length === 1 && n(a[0]) && (a = a[0]), !a.length) return R();
					for (c = a[0], M = 1; M < a.length; ++M)(!a[M].isValid() || a[M][e](c)) && (c = a[M]);
					return c
				}

				function _t() {
					var e = [].slice.call(arguments, 0);
					return Ae("isBefore", e)
				}

				function ut() {
					var e = [].slice.call(arguments, 0);
					return Ae("isAfter", e)
				}
				var lt = function() {
						return Date.now ? Date.now() : +new Date
					},
					a1 = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

				function pt(e) {
					var a, c = !1,
						M, _ = a1.length;
					for (a in e)
						if (i(e, a) && !(F.call(a1, a) !== -1 && (e[a] == null || !isNaN(e[a])))) return !1;
					for (M = 0; M < _; ++M)
						if (e[a1[M]]) {
							if (c) return !1;
							parseFloat(e[a1[M]]) !== v(e[a1[M]]) && (c = !0)
						} return !0
				}

				function mt() {
					return this._isValid
				}

				function Lt() {
					return u0(NaN)
				}

				function A1(e) {
					var a = q1(e),
						c = a.year || 0,
						M = a.quarter || 0,
						_ = a.month || 0,
						p = a.week || a.isoWeek || 0,
						z = a.day || 0,
						N = a.hour || 0,
						S = a.minute || 0,
						P = a.second || 0,
						$ = a.millisecond || 0;
					this._isValid = pt(a), this._milliseconds = +$ + P * 1e3 + S * 6e4 + N * 1e3 * 60 * 60, this._days = +z + p * 7, this._months = +_ + M * 3 + c * 12, this._data = {}, this._locale = h0(), this._bubble()
				}

				function h1(e) {
					return e instanceof A1
				}

				function R1(e) {
					return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e)
				}

				function bt(e, a, c) {
					var M = Math.min(e.length, a.length),
						_ = Math.abs(e.length - a.length),
						p = 0,
						z;
					for (z = 0; z < M; z++)(c && e[z] !== a[z] || !c && v(e[z]) !== v(a[z])) && p++;
					return p + _
				}

				function he(e, a) {
					O(e, 0, 0, function() {
						var c = this.utcOffset(),
							M = "+";
						return c < 0 && (c = -c, M = "-"), M + M0(~~(c / 60), 2) + a + M0(~~c % 60, 2)
					})
				}
				he("Z", ":"), he("ZZ", ""), k("Z", p1), k("ZZ", p1), j(["Z", "ZZ"], function(e, a, c) {
					c._useUTC = !0, c._tzm = C1(p1, e)
				});
				var ft = /([\+\-]|\d\d)/gi;

				function C1(e, a) {
					var c = (a || "").match(e),
						M, _, p;
					return c === null ? null : (M = c[c.length - 1] || [], _ = (M + "").match(ft) || ["-", 0, 0], p = +(_[1] * 60) + v(_[2]), p === 0 ? 0 : _[0] === "+" ? p : -p)
				}

				function F1(e, a) {
					var c, M;
					return a._isUTC ? (c = a.clone(), M = (a0(e) || A(e) ? e.valueOf() : R(e).valueOf()) - c.valueOf(), c._d.setTime(c._d.valueOf() + M), t.updateOffset(c, !1), c) : R(e).local()
				}

				function I1(e) {
					return -Math.round(e._d.getTimezoneOffset())
				}
				t.updateOffset = function() {};

				function zt(e, a, c) {
					var M = this._offset || 0,
						_;
					if (!this.isValid()) return e != null ? this : NaN;
					if (e != null) {
						if (typeof e == "string") {
							if (e = C1(p1, e), e === null) return this
						} else Math.abs(e) < 16 && !c && (e = e * 60);
						return !this._isUTC && a && (_ = I1(this)), this._offset = e, this._isUTC = !0, _ != null && this.add(_, "m"), M !== e && (!a || this._changeInProgress ? Oe(this, u0(e - M, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this
					} else return this._isUTC ? M : I1(this)
				}

				function At(e, a) {
					return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, a), this) : -this.utcOffset()
				}

				function ht(e) {
					return this.utcOffset(0, e)
				}

				function yt(e) {
					return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(I1(this), "m")), this
				}

				function Yt() {
					if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
					else if (typeof this._i == "string") {
						var e = C1(Fe, this._i);
						e != null ? this.utcOffset(e) : this.utcOffset(0, !0)
					}
					return this
				}

				function Tt(e) {
					return this.isValid() ? (e = e ? R(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0) : !1
				}

				function Ot() {
					return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
				}

				function kt() {
					if (!u(this._isDSTShifted)) return this._isDSTShifted;
					var e = {},
						a;
					return l0(e, this), e = fe(e), e._a ? (a = e._isUTC ? g(e._a) : R(e._a), this._isDSTShifted = this.isValid() && bt(e._a, a.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted
				}

				function Dt() {
					return this.isValid() ? !this._isUTC : !1
				}

				function Wt() {
					return this.isValid() ? this._isUTC : !1
				}

				function ye() {
					return this.isValid() ? this._isUTC && this._offset === 0 : !1
				}
				var Nt = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
					qt = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

				function u0(e, a) {
					var c = e,
						M = null,
						_, p, z;
					return h1(e) ? c = {
						ms: e._milliseconds,
						d: e._days,
						M: e._months
					} : m(e) || !isNaN(+e) ? (c = {}, a ? c[a] = +e : c.milliseconds = +e) : (M = Nt.exec(e)) ? (_ = M[1] === "-" ? -1 : 1, c = {
						y: 0,
						d: v(M[p0]) * _,
						h: v(M[U]) * _,
						m: v(M[_0]) * _,
						s: v(M[z0]) * _,
						ms: v(R1(M[v0] * 1e3)) * _
					}) : (M = qt.exec(e)) ? (_ = M[1] === "-" ? -1 : 1, c = {
						y: X0(M[2], _),
						M: X0(M[3], _),
						w: X0(M[4], _),
						d: X0(M[5], _),
						h: X0(M[6], _),
						m: X0(M[7], _),
						s: X0(M[8], _)
					}) : c == null ? c = {} : typeof c == "object" && ("from" in c || "to" in c) && (z = wt(R(c.from), R(c.to)), c = {}, c.ms = z.milliseconds, c.M = z.months), p = new A1(c), h1(e) && i(e, "_locale") && (p._locale = e._locale), h1(e) && i(e, "_isValid") && (p._isValid = e._isValid), p
				}
				u0.fn = A1.prototype, u0.invalid = Lt;

				function X0(e, a) {
					var c = e && parseFloat(e.replace(",", "."));
					return (isNaN(c) ? 0 : c) * a
				}

				function Ye(e, a) {
					var c = {};
					return c.months = a.month() - e.month() + (a.year() - e.year()) * 12, e.clone().add(c.months, "M").isAfter(a) && --c.months, c.milliseconds = +a - +e.clone().add(c.months, "M"), c
				}

				function wt(e, a) {
					var c;
					return e.isValid() && a.isValid() ? (a = F1(a, e), e.isBefore(a) ? c = Ye(e, a) : (c = Ye(a, e), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
						milliseconds: 0,
						months: 0
					}
				}

				function Te(e, a) {
					return function(c, M) {
						var _, p;
						return M !== null && !isNaN(+M) && (s1(a, "moment()." + a + "(period, number) is deprecated. Please use moment()." + a + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), p = c, c = M, M = p), _ = u0(c, M), Oe(this, _, e), this
					}
				}

				function Oe(e, a, c, M) {
					var _ = a._milliseconds,
						p = R1(a._days),
						z = R1(a._months);
					!e.isValid() || (M = M == null ? !0 : M, z && ce(e, o1(e, "Month") + z * c), p && $1(e, "Date", o1(e, "Date") + p * c), _ && e._d.setTime(e._d.valueOf() + _ * c), M && t.updateOffset(e, p || z))
				}
				var gt = Te(1, "add"),
					St = Te(-1, "subtract");

				function ke(e) {
					return typeof e == "string" || e instanceof String
				}

				function vt(e) {
					return a0(e) || A(e) || ke(e) || m(e) || Bt(e) || Xt(e) || e === null || e === void 0
				}

				function Xt(e) {
					var a = r(e) && !d(e),
						c = !1,
						M = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"],
						_, p, z = M.length;
					for (_ = 0; _ < z; _ += 1) p = M[_], c = c || i(e, p);
					return a && c
				}

				function Bt(e) {
					var a = n(e),
						c = !1;
					return a && (c = e.filter(function(M) {
						return !m(M) && ke(e)
					}).length === 0), a && c
				}

				function Ht(e) {
					var a = r(e) && !d(e),
						c = !1,
						M = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
						_, p;
					for (_ = 0; _ < M.length; _ += 1) p = M[_], c = c || i(e, p);
					return a && c
				}

				function Et(e, a) {
					var c = e.diff(a, "days", !0);
					return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
				}

				function jt(e, a) {
					arguments.length === 1 && (arguments[0] ? vt(arguments[0]) ? (e = arguments[0], a = void 0) : Ht(arguments[0]) && (a = arguments[0], e = void 0) : (e = void 0, a = void 0));
					var c = e || R(),
						M = F1(c, this).startOf("day"),
						_ = t.calendarFormat(this, M) || "sameElse",
						p = a && (c0(a[_]) ? a[_].call(this, c) : a[_]);
					return this.format(p || this.localeData().calendar(_, this, R(c)))
				}

				function Pt() {
					return new D0(this)
				}

				function xt(e, a) {
					var c = a0(e) ? e : R(e);
					return this.isValid() && c.isValid() ? (a = i0(a) || "millisecond", a === "millisecond" ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(a).valueOf()) : !1
				}

				function Rt(e, a) {
					var c = a0(e) ? e : R(e);
					return this.isValid() && c.isValid() ? (a = i0(a) || "millisecond", a === "millisecond" ? this.valueOf() < c.valueOf() : this.clone().endOf(a).valueOf() < c.valueOf()) : !1
				}

				function Ct(e, a, c, M) {
					var _ = a0(e) ? e : R(e),
						p = a0(a) ? a : R(a);
					return this.isValid() && _.isValid() && p.isValid() ? (M = M || "()", (M[0] === "(" ? this.isAfter(_, c) : !this.isBefore(_, c)) && (M[1] === ")" ? this.isBefore(p, c) : !this.isAfter(p, c))) : !1
				}

				function Ft(e, a) {
					var c = a0(e) ? e : R(e),
						M;
					return this.isValid() && c.isValid() ? (a = i0(a) || "millisecond", a === "millisecond" ? this.valueOf() === c.valueOf() : (M = c.valueOf(), this.clone().startOf(a).valueOf() <= M && M <= this.clone().endOf(a).valueOf())) : !1
				}

				function It(e, a) {
					return this.isSame(e, a) || this.isAfter(e, a)
				}

				function Ut(e, a) {
					return this.isSame(e, a) || this.isBefore(e, a)
				}

				function Jt(e, a, c) {
					var M, _, p;
					if (!this.isValid()) return NaN;
					if (M = F1(e, this), !M.isValid()) return NaN;
					switch (_ = (M.utcOffset() - this.utcOffset()) * 6e4, a = i0(a), a) {
						case "year":
							p = y1(this, M) / 12;
							break;
						case "month":
							p = y1(this, M);
							break;
						case "quarter":
							p = y1(this, M) / 3;
							break;
						case "second":
							p = (this - M) / 1e3;
							break;
						case "minute":
							p = (this - M) / 6e4;
							break;
						case "hour":
							p = (this - M) / 36e5;
							break;
						case "day":
							p = (this - M - _) / 864e5;
							break;
						case "week":
							p = (this - M - _) / 6048e5;
							break;
						default:
							p = this - M
					}
					return c ? p : o0(p)
				}

				function y1(e, a) {
					if (e.date() < a.date()) return -y1(a, e);
					var c = (a.year() - e.year()) * 12 + (a.month() - e.month()),
						M = e.clone().add(c, "months"),
						_, p;
					return a - M < 0 ? (_ = e.clone().add(c - 1, "months"), p = (a - M) / (M - _)) : (_ = e.clone().add(c + 1, "months"), p = (a - M) / (_ - M)), -(c + p) || 0
				}
				t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";

				function Gt() {
					return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
				}

				function Vt(e) {
					if (!this.isValid()) return null;
					var a = e !== !0,
						c = a ? this.clone().utc() : this;
					return c.year() < 0 || c.year() > 9999 ? E0(c, a ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : c0(Date.prototype.toISOString) ? a ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", E0(c, "Z")) : E0(c, a ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
				}

				function Kt() {
					if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
					var e = "moment",
						a = "",
						c, M, _, p;
					return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", a = "Z"), c = "[" + e + '("]', M = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", _ = "-MM-DD[T]HH:mm:ss.SSS", p = a + '[")]', this.format(c + M + _ + p)
				}

				function Qt(e) {
					e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
					var a = E0(this, e);
					return this.localeData().postformat(a)
				}

				function Zt(e, a) {
					return this.isValid() && (a0(e) && e.isValid() || R(e).isValid()) ? u0({
						to: this,
						from: e
					}).locale(this.locale()).humanize(!a) : this.localeData().invalidDate()
				}

				function $t(e) {
					return this.from(R(), e)
				}

				function en(e, a) {
					return this.isValid() && (a0(e) && e.isValid() || R(e).isValid()) ? u0({
						from: this,
						to: e
					}).locale(this.locale()).humanize(!a) : this.localeData().invalidDate()
				}

				function an(e) {
					return this.to(R(), e)
				}

				function De(e) {
					var a;
					return e === void 0 ? this._locale._abbr : (a = h0(e), a != null && (this._locale = a), this)
				}
				var We = e0("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
					return e === void 0 ? this.localeData() : this.locale(e)
				});

				function Ne() {
					return this._locale
				}
				var Y1 = 1e3,
					R0 = 60 * Y1,
					T1 = 60 * R0,
					qe = (365 * 400 + 97) * 24 * T1;

				function C0(e, a) {
					return (e % a + a) % a
				}

				function we(e, a, c) {
					return e < 100 && e >= 0 ? new Date(e + 400, a, c) - qe : new Date(e, a, c).valueOf()
				}

				function ge(e, a, c) {
					return e < 100 && e >= 0 ? Date.UTC(e + 400, a, c) - qe : Date.UTC(e, a, c)
				}

				function tn(e) {
					var a, c;
					if (e = i0(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
					switch (c = this._isUTC ? ge : we, e) {
						case "year":
							a = c(this.year(), 0, 1);
							break;
						case "quarter":
							a = c(this.year(), this.month() - this.month() % 3, 1);
							break;
						case "month":
							a = c(this.year(), this.month(), 1);
							break;
						case "week":
							a = c(this.year(), this.month(), this.date() - this.weekday());
							break;
						case "isoWeek":
							a = c(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
							break;
						case "day":
						case "date":
							a = c(this.year(), this.month(), this.date());
							break;
						case "hour":
							a = this._d.valueOf(), a -= C0(a + (this._isUTC ? 0 : this.utcOffset() * R0), T1);
							break;
						case "minute":
							a = this._d.valueOf(), a -= C0(a, R0);
							break;
						case "second":
							a = this._d.valueOf(), a -= C0(a, Y1);
							break
					}
					return this._d.setTime(a), t.updateOffset(this, !0), this
				}

				function nn(e) {
					var a, c;
					if (e = i0(e), e === void 0 || e === "millisecond" || !this.isValid()) return this;
					switch (c = this._isUTC ? ge : we, e) {
						case "year":
							a = c(this.year() + 1, 0, 1) - 1;
							break;
						case "quarter":
							a = c(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
							break;
						case "month":
							a = c(this.year(), this.month() + 1, 1) - 1;
							break;
						case "week":
							a = c(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
							break;
						case "isoWeek":
							a = c(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
							break;
						case "day":
						case "date":
							a = c(this.year(), this.month(), this.date() + 1) - 1;
							break;
						case "hour":
							a = this._d.valueOf(), a += T1 - C0(a + (this._isUTC ? 0 : this.utcOffset() * R0), T1) - 1;
							break;
						case "minute":
							a = this._d.valueOf(), a += R0 - C0(a, R0) - 1;
							break;
						case "second":
							a = this._d.valueOf(), a += Y1 - C0(a, Y1) - 1;
							break
					}
					return this._d.setTime(a), t.updateOffset(this, !0), this
				}

				function sn() {
					return this._d.valueOf() - (this._offset || 0) * 6e4
				}

				function rn() {
					return Math.floor(this.valueOf() / 1e3)
				}

				function cn() {
					return new Date(this.valueOf())
				}

				function Mn() {
					var e = this;
					return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
				}

				function on() {
					var e = this;
					return {
						years: e.year(),
						months: e.month(),
						date: e.date(),
						hours: e.hours(),
						minutes: e.minutes(),
						seconds: e.seconds(),
						milliseconds: e.milliseconds()
					}
				}

				function dn() {
					return this.isValid() ? this.toISOString() : null
				}

				function _n() {
					return k0(this)
				}

				function un() {
					return q({}, T(this))
				}

				function ln() {
					return T(this).overflow
				}

				function pn() {
					return {
						input: this._i,
						format: this._f,
						locale: this._locale,
						isUTC: this._isUTC,
						strict: this._strict
					}
				}
				O("N", 0, 0, "eraAbbr"), O("NN", 0, 0, "eraAbbr"), O("NNN", 0, 0, "eraAbbr"), O("NNNN", 0, 0, "eraName"), O("NNNNN", 0, 0, "eraNarrow"), O("y", ["y", 1], "yo", "eraYear"), O("y", ["yy", 2], 0, "eraYear"), O("y", ["yyy", 3], 0, "eraYear"), O("y", ["yyyy", 4], 0, "eraYear"), k("N", U1), k("NN", U1), k("NNN", U1), k("NNNN", On), k("NNNNN", kn), j(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, a, c, M) {
					var _ = c._locale.erasParse(e, M, c._strict);
					_ ? T(c).era = _ : T(c).invalidEra = e
				}), k("y", P0), k("yy", P0), k("yyy", P0), k("yyyy", P0), k("yo", Dn), j(["y", "yy", "yyy", "yyyy"], Q), j(["yo"], function(e, a, c, M) {
					var _;
					c._locale._eraYearOrdinalRegex && (_ = e.match(c._locale._eraYearOrdinalRegex)), c._locale.eraYearOrdinalParse ? a[Q] = c._locale.eraYearOrdinalParse(e, _) : a[Q] = parseInt(e, 10)
				});

				function mn(e, a) {
					var c, M, _, p = this._eras || h0("en")._eras;
					for (c = 0, M = p.length; c < M; ++c) {
						switch (typeof p[c].since) {
							case "string":
								_ = t(p[c].since).startOf("day"), p[c].since = _.valueOf();
								break
						}
						switch (typeof p[c].until) {
							case "undefined":
								p[c].until = 1 / 0;
								break;
							case "string":
								_ = t(p[c].until).startOf("day").valueOf(), p[c].until = _.valueOf();
								break
						}
					}
					return p
				}

				function Ln(e, a, c) {
					var M, _, p = this.eras(),
						z, N, S;
					for (e = e.toUpperCase(), M = 0, _ = p.length; M < _; ++M)
						if (z = p[M].name.toUpperCase(), N = p[M].abbr.toUpperCase(), S = p[M].narrow.toUpperCase(), c) switch (a) {
							case "N":
							case "NN":
							case "NNN":
								if (N === e) return p[M];
								break;
							case "NNNN":
								if (z === e) return p[M];
								break;
							case "NNNNN":
								if (S === e) return p[M];
								break
						} else if ([z, N, S].indexOf(e) >= 0) return p[M]
				}

				function bn(e, a) {
					var c = e.since <= e.until ? 1 : -1;
					return a === void 0 ? t(e.since).year() : t(e.since).year() + (a - e.offset) * c
				}

				function fn() {
					var e, a, c, M = this.localeData().eras();
					for (e = 0, a = M.length; e < a; ++e)
						if (c = this.clone().startOf("day").valueOf(), M[e].since <= c && c <= M[e].until || M[e].until <= c && c <= M[e].since) return M[e].name;
					return ""
				}

				function zn() {
					var e, a, c, M = this.localeData().eras();
					for (e = 0, a = M.length; e < a; ++e)
						if (c = this.clone().startOf("day").valueOf(), M[e].since <= c && c <= M[e].until || M[e].until <= c && c <= M[e].since) return M[e].narrow;
					return ""
				}

				function An() {
					var e, a, c, M = this.localeData().eras();
					for (e = 0, a = M.length; e < a; ++e)
						if (c = this.clone().startOf("day").valueOf(), M[e].since <= c && c <= M[e].until || M[e].until <= c && c <= M[e].since) return M[e].abbr;
					return ""
				}

				function hn() {
					var e, a, c, M, _ = this.localeData().eras();
					for (e = 0, a = _.length; e < a; ++e)
						if (c = _[e].since <= _[e].until ? 1 : -1, M = this.clone().startOf("day").valueOf(), _[e].since <= M && M <= _[e].until || _[e].until <= M && M <= _[e].since) return (this.year() - t(_[e].since).year()) * c + _[e].offset;
					return this.year()
				}

				function yn(e) {
					return i(this, "_erasNameRegex") || J1.call(this), e ? this._erasNameRegex : this._erasRegex
				}

				function Yn(e) {
					return i(this, "_erasAbbrRegex") || J1.call(this), e ? this._erasAbbrRegex : this._erasRegex
				}

				function Tn(e) {
					return i(this, "_erasNarrowRegex") || J1.call(this), e ? this._erasNarrowRegex : this._erasRegex
				}

				function U1(e, a) {
					return a.erasAbbrRegex(e)
				}

				function On(e, a) {
					return a.erasNameRegex(e)
				}

				function kn(e, a) {
					return a.erasNarrowRegex(e)
				}

				function Dn(e, a) {
					return a._eraYearOrdinalRegex || P0
				}

				function J1() {
					var e = [],
						a = [],
						c = [],
						M = [],
						_, p, z = this.eras();
					for (_ = 0, p = z.length; _ < p; ++_) a.push(s0(z[_].name)), e.push(s0(z[_].abbr)), c.push(s0(z[_].narrow)), M.push(s0(z[_].name)), M.push(s0(z[_].abbr)), M.push(s0(z[_].narrow));
					this._erasRegex = new RegExp("^(" + M.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + c.join("|") + ")", "i")
				}
				O(0, ["gg", 2], 0, function() {
					return this.weekYear() % 100
				}), O(0, ["GG", 2], 0, function() {
					return this.isoWeekYear() % 100
				});

				function O1(e, a) {
					O(0, [e, e.length], 0, a)
				}
				O1("gggg", "weekYear"), O1("ggggg", "weekYear"), O1("GGGG", "isoWeekYear"), O1("GGGGG", "isoWeekYear"), V("weekYear", "gg"), V("isoWeekYear", "GG"), K("weekYear", 1), K("isoWeekYear", 1), k("G", l1), k("g", l1), k("GG", x, n0), k("gg", x, n0), k("GGGG", g1, w1), k("gggg", g1, w1), k("GGGGG", u1, d1), k("ggggg", u1, d1), V0(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, a, c, M) {
					a[M.substr(0, 2)] = v(e)
				}), V0(["gg", "GG"], function(e, a, c, M) {
					a[M] = t.parseTwoDigitYear(e)
				});

				function Wn(e) {
					return Se.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
				}

				function Nn(e) {
					return Se.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
				}

				function qn() {
					return A0(this.year(), 1, 4)
				}

				function wn() {
					return A0(this.isoWeekYear(), 1, 4)
				}

				function gn() {
					var e = this.localeData()._week;
					return A0(this.year(), e.dow, e.doy)
				}

				function Sn() {
					var e = this.localeData()._week;
					return A0(this.weekYear(), e.dow, e.doy)
				}

				function Se(e, a, c, M, _) {
					var p;
					return e == null ? Z0(this, M, _).year : (p = A0(e, M, _), a > p && (a = p), vn.call(this, e, a, c, M, _))
				}

				function vn(e, a, c, M, _) {
					var p = de(e, a, c, M, _),
						z = Q0(p.year, 0, p.dayOfYear);
					return this.year(z.getUTCFullYear()), this.month(z.getUTCMonth()), this.date(z.getUTCDate()), this
				}
				O("Q", 0, "Qo", "quarter"), V("quarter", "Q"), K("quarter", 7), k("Q", ee), j("Q", function(e, a) {
					a[f0] = (v(e) - 1) * 3
				});

				function Xn(e) {
					return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3)
				}
				O("D", ["DD", 2], "Do", "date"), V("date", "D"), K("date", 9), k("D", x), k("DD", x, n0), k("Do", function(e, a) {
					return e ? a._dayOfMonthOrdinalParse || a._ordinalParse : a._dayOfMonthOrdinalParseLenient
				}), j(["D", "DD"], p0), j("Do", function(e, a) {
					a[p0] = v(e.match(x)[0])
				});
				var ve = j0("Date", !0);
				O("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), V("dayOfYear", "DDD"), K("dayOfYear", 4), k("DDD", _1), k("DDDD", ae), j(["DDD", "DDDD"], function(e, a, c) {
					c._dayOfYear = v(e)
				});

				function Bn(e) {
					var a = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
					return e == null ? a : this.add(e - a, "d")
				}
				O("m", ["mm", 2], 0, "minute"), V("minute", "m"), K("minute", 14), k("m", x), k("mm", x, n0), j(["m", "mm"], _0);
				var Hn = j0("Minutes", !1);
				O("s", ["ss", 2], 0, "second"), V("second", "s"), K("second", 15), k("s", x), k("ss", x, n0), j(["s", "ss"], z0);
				var En = j0("Seconds", !1);
				O("S", 0, 0, function() {
					return ~~(this.millisecond() / 100)
				}), O(0, ["SS", 2], 0, function() {
					return ~~(this.millisecond() / 10)
				}), O(0, ["SSS", 3], 0, "millisecond"), O(0, ["SSSS", 4], 0, function() {
					return this.millisecond() * 10
				}), O(0, ["SSSSS", 5], 0, function() {
					return this.millisecond() * 100
				}), O(0, ["SSSSSS", 6], 0, function() {
					return this.millisecond() * 1e3
				}), O(0, ["SSSSSSS", 7], 0, function() {
					return this.millisecond() * 1e4
				}), O(0, ["SSSSSSSS", 8], 0, function() {
					return this.millisecond() * 1e5
				}), O(0, ["SSSSSSSSS", 9], 0, function() {
					return this.millisecond() * 1e6
				}), V("millisecond", "ms"), K("millisecond", 16), k("S", _1, ee), k("SS", _1, n0), k("SSS", _1, ae);
				var w0, Xe;
				for (w0 = "SSSS"; w0.length <= 9; w0 += "S") k(w0, P0);

				function jn(e, a) {
					a[v0] = v(("0." + e) * 1e3)
				}
				for (w0 = "S"; w0.length <= 9; w0 += "S") j(w0, jn);
				Xe = j0("Milliseconds", !1), O("z", 0, 0, "zoneAbbr"), O("zz", 0, 0, "zoneName");

				function Pn() {
					return this._isUTC ? "UTC" : ""
				}

				function xn() {
					return this._isUTC ? "Coordinated Universal Time" : ""
				}
				var y = D0.prototype;
				y.add = gt, y.calendar = jt, y.clone = Pt, y.diff = Jt, y.endOf = nn, y.format = Qt, y.from = Zt, y.fromNow = $t, y.to = en, y.toNow = an, y.get = Re, y.invalidAt = ln, y.isAfter = xt, y.isBefore = Rt, y.isBetween = Ct, y.isSame = Ft, y.isSameOrAfter = It, y.isSameOrBefore = Ut, y.isValid = _n, y.lang = We, y.locale = De, y.localeData = Ne, y.max = dt, y.min = ot, y.parsingFlags = un, y.set = Ce, y.startOf = tn, y.subtract = St, y.toArray = Mn, y.toObject = on, y.toDate = cn, y.toISOString = Vt, y.inspect = Kt, typeof Symbol != "undefined" && Symbol.for != null && (y[Symbol.for("nodejs.util.inspect.custom")] = function() {
					return "Moment<" + this.format() + ">"
				}), y.toJSON = dn, y.toString = Gt, y.unix = rn, y.valueOf = sn, y.creationData = pn, y.eraName = fn, y.eraNarrow = zn, y.eraAbbr = An, y.eraYear = hn, y.year = oe, y.isLeapYear = ia, y.weekYear = Wn, y.isoWeekYear = Nn, y.quarter = y.quarters = Xn, y.month = Me, y.daysInMonth = ra, y.week = y.weeks = pa, y.isoWeek = y.isoWeeks = ma, y.weeksInYear = gn, y.weeksInWeekYear = Sn, y.isoWeeksInYear = qn, y.isoWeeksInISOWeekYear = wn, y.date = ve, y.day = y.days = Wa, y.weekday = Na, y.isoWeekday = qa, y.dayOfYear = Bn, y.hour = y.hours = Ha, y.minute = y.minutes = Hn, y.second = y.seconds = En, y.millisecond = y.milliseconds = Xe, y.utcOffset = zt, y.utc = ht, y.local = yt, y.parseZone = Yt, y.hasAlignedHourOffset = Tt, y.isDST = Ot, y.isLocal = Dt, y.isUtcOffset = Wt, y.isUtc = ye, y.isUTC = ye, y.zoneAbbr = Pn, y.zoneName = xn, y.dates = e0("dates accessor is deprecated. Use date instead.", ve), y.months = e0("months accessor is deprecated. Use month instead", Me), y.years = e0("years accessor is deprecated. Use year instead", oe), y.zone = e0("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", At), y.isDSTShifted = e0("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", kt);

				function Rn(e) {
					return R(e * 1e3)
				}

				function Cn() {
					return R.apply(null, arguments).parseZone()
				}

				function Be(e) {
					return e
				}
				var B = H0.prototype;
				B.calendar = r1, B.longDateFormat = Y, B.invalidDate = D, B.ordinal = J, B.preparse = Be, B.postformat = Be, B.relativeTime = I, B.pastFuture = Q1, B.set = W1, B.eras = mn, B.erasParse = Ln, B.erasConvertYear = bn, B.erasAbbrRegex = Yn, B.erasNameRegex = yn, B.erasNarrowRegex = Tn, B.months = aa, B.monthsShort = ta, B.monthsParse = sa, B.monthsRegex = Ma, B.monthsShortRegex = ca, B.week = da, B.firstDayOfYear = la, B.firstDayOfWeek = ua, B.weekdays = Ya, B.weekdaysMin = Oa, B.weekdaysShort = Ta, B.weekdaysParse = Da, B.weekdaysRegex = wa, B.weekdaysShortRegex = ga, B.weekdaysMinRegex = Sa, B.isPM = Xa, B.meridiem = Ea;

				function k1(e, a, c, M) {
					var _ = h0(),
						p = g().set(M, a);
					return _[c](p, e)
				}

				function He(e, a, c) {
					if (m(e) && (a = e, e = void 0), e = e || "", a != null) return k1(e, a, c, "month");
					var M, _ = [];
					for (M = 0; M < 12; M++) _[M] = k1(e, M, c, "month");
					return _
				}

				function G1(e, a, c, M) {
					typeof e == "boolean" ? (m(a) && (c = a, a = void 0), a = a || "") : (a = e, c = a, e = !1, m(a) && (c = a, a = void 0), a = a || "");
					var _ = h0(),
						p = e ? _._week.dow : 0,
						z, N = [];
					if (c != null) return k1(a, (c + p) % 7, M, "day");
					for (z = 0; z < 7; z++) N[z] = k1(a, (z + p) % 7, M, "day");
					return N
				}

				function Fn(e, a) {
					return He(e, a, "months")
				}

				function In(e, a) {
					return He(e, a, "monthsShort")
				}

				function Un(e, a, c) {
					return G1(e, a, c, "weekdays")
				}

				function Jn(e, a, c) {
					return G1(e, a, c, "weekdaysShort")
				}

				function Gn(e, a, c) {
					return G1(e, a, c, "weekdaysMin")
				}
				q0("en", {
					eras: [{
						since: "0001-01-01",
						until: 1 / 0,
						offset: 1,
						name: "Anno Domini",
						narrow: "AD",
						abbr: "AD"
					}, {
						since: "0000-12-31",
						until: -1 / 0,
						offset: 1,
						name: "Before Christ",
						narrow: "BC",
						abbr: "BC"
					}],
					dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
					ordinal: function(e) {
						var a = e % 10,
							c = v(e % 100 / 10) === 1 ? "th" : a === 1 ? "st" : a === 2 ? "nd" : a === 3 ? "rd" : "th";
						return e + c
					}
				}), t.lang = e0("moment.lang is deprecated. Use moment.locale instead.", q0), t.langData = e0("moment.langData is deprecated. Use moment.localeData instead.", h0);
				var y0 = Math.abs;

				function Vn() {
					var e = this._data;
					return this._milliseconds = y0(this._milliseconds), this._days = y0(this._days), this._months = y0(this._months), e.milliseconds = y0(e.milliseconds), e.seconds = y0(e.seconds), e.minutes = y0(e.minutes), e.hours = y0(e.hours), e.months = y0(e.months), e.years = y0(e.years), this
				}

				function Ee(e, a, c, M) {
					var _ = u0(a, c);
					return e._milliseconds += M * _._milliseconds, e._days += M * _._days, e._months += M * _._months, e._bubble()
				}

				function Kn(e, a) {
					return Ee(this, e, a, 1)
				}

				function Qn(e, a) {
					return Ee(this, e, a, -1)
				}

				function je(e) {
					return e < 0 ? Math.floor(e) : Math.ceil(e)
				}

				function Zn() {
					var e = this._milliseconds,
						a = this._days,
						c = this._months,
						M = this._data,
						_, p, z, N, S;
					return e >= 0 && a >= 0 && c >= 0 || e <= 0 && a <= 0 && c <= 0 || (e += je(V1(c) + a) * 864e5, a = 0, c = 0), M.milliseconds = e % 1e3, _ = o0(e / 1e3), M.seconds = _ % 60, p = o0(_ / 60), M.minutes = p % 60, z = o0(p / 60), M.hours = z % 24, a += o0(z / 24), S = o0(Pe(a)), c += S, a -= je(V1(S)), N = o0(c / 12), c %= 12, M.days = a, M.months = c, M.years = N, this
				}

				function Pe(e) {
					return e * 4800 / 146097
				}

				function V1(e) {
					return e * 146097 / 4800
				}

				function $n(e) {
					if (!this.isValid()) return NaN;
					var a, c, M = this._milliseconds;
					if (e = i0(e), e === "month" || e === "quarter" || e === "year") switch (a = this._days + M / 864e5, c = this._months + Pe(a), e) {
						case "month":
							return c;
						case "quarter":
							return c / 3;
						case "year":
							return c / 12
					} else switch (a = this._days + Math.round(V1(this._months)), e) {
						case "week":
							return a / 7 + M / 6048e5;
						case "day":
							return a + M / 864e5;
						case "hour":
							return a * 24 + M / 36e5;
						case "minute":
							return a * 1440 + M / 6e4;
						case "second":
							return a * 86400 + M / 1e3;
						case "millisecond":
							return Math.floor(a * 864e5) + M;
						default:
							throw new Error("Unknown unit " + e)
					}
				}

				function es() {
					return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + v(this._months / 12) * 31536e6 : NaN
				}

				function Y0(e) {
					return function() {
						return this.as(e)
					}
				}
				var as = Y0("ms"),
					ts = Y0("s"),
					ns = Y0("m"),
					ss = Y0("h"),
					rs = Y0("d"),
					cs = Y0("w"),
					Ms = Y0("M"),
					is = Y0("Q"),
					os = Y0("y");

				function ds() {
					return u0(this)
				}

				function _s(e) {
					return e = i0(e), this.isValid() ? this[e + "s"]() : NaN
				}

				function B0(e) {
					return function() {
						return this.isValid() ? this._data[e] : NaN
					}
				}
				var us = B0("milliseconds"),
					ls = B0("seconds"),
					ps = B0("minutes"),
					ms = B0("hours"),
					Ls = B0("days"),
					bs = B0("months"),
					fs = B0("years");

				function zs() {
					return o0(this.days() / 7)
				}
				var T0 = Math.round,
					F0 = {
						ss: 44,
						s: 45,
						m: 45,
						h: 22,
						d: 26,
						w: null,
						M: 11
					};

				function As(e, a, c, M, _) {
					return _.relativeTime(a || 1, !!c, e, M)
				}

				function hs(e, a, c, M) {
					var _ = u0(e).abs(),
						p = T0(_.as("s")),
						z = T0(_.as("m")),
						N = T0(_.as("h")),
						S = T0(_.as("d")),
						P = T0(_.as("M")),
						$ = T0(_.as("w")),
						O0 = T0(_.as("y")),
						g0 = p <= c.ss && ["s", p] || p < c.s && ["ss", p] || z <= 1 && ["m"] || z < c.m && ["mm", z] || N <= 1 && ["h"] || N < c.h && ["hh", N] || S <= 1 && ["d"] || S < c.d && ["dd", S];
					return c.w != null && (g0 = g0 || $ <= 1 && ["w"] || $ < c.w && ["ww", $]), g0 = g0 || P <= 1 && ["M"] || P < c.M && ["MM", P] || O0 <= 1 && ["y"] || ["yy", O0], g0[2] = a, g0[3] = +e > 0, g0[4] = M, As.apply(null, g0)
				}

				function ys(e) {
					return e === void 0 ? T0 : typeof e == "function" ? (T0 = e, !0) : !1
				}

				function Ys(e, a) {
					return F0[e] === void 0 ? !1 : a === void 0 ? F0[e] : (F0[e] = a, e === "s" && (F0.ss = a - 1), !0)
				}

				function Ts(e, a) {
					if (!this.isValid()) return this.localeData().invalidDate();
					var c = !1,
						M = F0,
						_, p;
					return typeof e == "object" && (a = e, e = !1), typeof e == "boolean" && (c = e), typeof a == "object" && (M = Object.assign({}, F0, a), a.s != null && a.ss == null && (M.ss = a.s - 1)), _ = this.localeData(), p = hs(this, !c, M, _), c && (p = _.pastFuture(+this, p)), _.postformat(p)
				}
				var K1 = Math.abs;

				function I0(e) {
					return (e > 0) - (e < 0) || +e
				}

				function D1() {
					if (!this.isValid()) return this.localeData().invalidDate();
					var e = K1(this._milliseconds) / 1e3,
						a = K1(this._days),
						c = K1(this._months),
						M, _, p, z, N = this.asSeconds(),
						S, P, $, O0;
					return N ? (M = o0(e / 60), _ = o0(M / 60), e %= 60, M %= 60, p = o0(c / 12), c %= 12, z = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", S = N < 0 ? "-" : "", P = I0(this._months) !== I0(N) ? "-" : "", $ = I0(this._days) !== I0(N) ? "-" : "", O0 = I0(this._milliseconds) !== I0(N) ? "-" : "", S + "P" + (p ? P + p + "Y" : "") + (c ? P + c + "M" : "") + (a ? $ + a + "D" : "") + (_ || M || e ? "T" : "") + (_ ? O0 + _ + "H" : "") + (M ? O0 + M + "M" : "") + (e ? O0 + z + "S" : "")) : "P0D"
				}
				var X = A1.prototype;
				X.isValid = mt, X.abs = Vn, X.add = Kn, X.subtract = Qn, X.as = $n, X.asMilliseconds = as, X.asSeconds = ts, X.asMinutes = ns, X.asHours = ss, X.asDays = rs, X.asWeeks = cs, X.asMonths = Ms, X.asQuarters = is, X.asYears = os, X.valueOf = es, X._bubble = Zn, X.clone = ds, X.get = _s, X.milliseconds = us, X.seconds = ls, X.minutes = ps, X.hours = ms, X.days = Ls, X.weeks = zs, X.months = bs, X.years = fs, X.humanize = Ts, X.toISOString = D1, X.toString = D1, X.toJSON = D1, X.locale = De, X.localeData = Ne, X.toIsoString = e0("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", D1), X.lang = We, O("X", 0, 0, "unix"), O("x", 0, 0, "valueOf"), k("x", l1), k("X", Ie), j("X", function(e, a, c) {
					c._d = new Date(parseFloat(e) * 1e3)
				}), j("x", function(e, a, c) {
					c._d = new Date(v(e))
				}); //! moment.js
				return t.version = "2.29.4", s(R), t.fn = y, t.min = _t, t.max = ut, t.now = lt, t.utc = g, t.unix = Rn, t.months = Fn, t.isDate = A, t.locale = q0, t.invalid = m0, t.duration = u0, t.isMoment = a0, t.weekdays = Un, t.parseZone = Cn, t.localeData = h0, t.isDuration = h1, t.monthsShort = In, t.weekdaysMin = Gn, t.defineLocale = H1, t.updateLocale = Ra, t.locales = Ca, t.weekdaysShort = Jn, t.normalizeUnits = i0, t.relativeTimeRounding = ys, t.relativeTimeThreshold = Ys, t.calendarFormat = Et, t.prototype = y, t.HTML5_FMT = {
					DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
					DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
					DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
					DATE: "YYYY-MM-DD",
					TIME: "HH:mm",
					TIME_SECONDS: "HH:mm:ss",
					TIME_MS: "HH:mm:ss.SSS",
					WEEK: "GGGG-[W]WW",
					MONTH: "YYYY-MM"
				}, t
			})
		},
		448627: function(b) {
			"use strict";
			b.exports = JSON.parse('{"version":"2019b","zones":["Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5","Africa/Accra|LMT GMT +0020|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5","Africa/Nairobi|LMT EAT +0230 +0245|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5","Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5","Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6","Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4","Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5","Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6","Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0|32e5","Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3","Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0|20e4","Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5","Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|01212121212121212121212121212121213|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0","Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5","Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5","Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5","Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00","Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5","Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5","Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4","America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326","America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4","America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3","America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4","America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0","America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0","America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0","America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0","America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0","America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0","America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0","America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0","America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0","America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0","America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0","America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0","America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4","America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5","America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2","America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3","America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5","America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4","America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5","America/Belize|LMT CST -0530 CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3","America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2","America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2","America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5","America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4","America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2","America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4","America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4","America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5","America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3","America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5","America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5","America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4","America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5","America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2","America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4","America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8","America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3","America/Dawson|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|13e2","America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5","America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|012342525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 XQp0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5","America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|01212121212121341212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 LFB0 1cL0 3Cp0 1cL0 66N0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5","America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3","America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5","America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5","America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2","America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5","America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3","America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3","America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2","America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|01212121212121212121212121212121212121212121212121212121212121212121212121232121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2","America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5","America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5","America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4","America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4","America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5","America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4","America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2","America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2","America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4","America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3","America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 Bb0 10N0 2bB0 8in0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5","America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6","America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6","America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4","America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5","America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5","America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4","America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4","America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4","America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2","America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5","America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2","America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6","America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2","America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3","America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5","America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5","America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5","America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4","America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6","America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2","America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2","America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2","America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3","America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2","America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4","America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5","America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5","America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4","America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4","America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5","America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0","America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842","America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2","America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5","America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4","America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229","America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4","America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5","America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5","America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6","America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452","America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2","America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4","America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3","America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5","America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656","America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4","America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5","America/Whitehorse|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3","America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4","America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642","America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3","Antarctica/Casey|-00 +08 +11|0 -80 -b0|01212121|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10|10","Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70","Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80","Antarctica/Macquarie|AEST AEDT -00 +11|-a0 -b0 0 -b0|0102010101010101010101010101010101010101010101010101010101010101010101010101010101010101013|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1","Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60","Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5","Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40","Antarctica/Rothera|-00 -03|0 30|01|gOo0|130","Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20","Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40","Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25","Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4","Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5","Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5","Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5","Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3","Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4","Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4","Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4","Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0","Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5","Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4","Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5","Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6","Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0","Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5","Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4","Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4","Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6","Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4","Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3","Asia/Shanghai|CST CDT|-80 -90|010101010101010101010101010|-1c2w0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6","Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5","Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6","Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5","Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4","Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5","Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4","Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|0101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|18e5","Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|25e4","Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5","Asia/Hong_Kong|LMT HKT HKST HKT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5","Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3","Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4","Europe/Istanbul|IMT EET EEST +04 +03|-1U.U -20 -30 -40 -30|012121212121212121212121212121212121212121212121212121234343434342121212121212121212121212121212121212121212121212121212121212124|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSp0 CL0 mN0 1Vz0 1gN0 1pz0 5Rd0 1fz0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1jB0 18L0 1ip0 17z0 qdd0 xX0 3S10 Tz0 dA10 11z0 1o10 11z0 1qN0 11z0 1ze0 11B0 WM0 1qO0 WI0 1nX0 1rB0 10L0 11B0 1in0 17d0 1in0 2pX0 19E0 1fU0 16Q0 1iI0 16Q0 1iI0 1Vd0 pb0 3Kp0 14o0 1de0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6","Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6","Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4","Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|012121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4","Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5","Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4","Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6","Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5","Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5","Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2","Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5","Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5","Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4","Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4","Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3","Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5","Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6","Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4","Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4","Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5","Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5","Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4","Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4","Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5","Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0","Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4","Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5","Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4","Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4","Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -9u -a0|0123141414141414135353|-2um8r.Q 97XV.Q 1m1zu kKo0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6","Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2","Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5","Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5","Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5","Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6","Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3","Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rb0 1ld0 14n0 1zd0 On0 1zd0 On0|38e6","Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5","Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5","Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2","Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4","Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4","Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5","Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5","Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4","Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3","Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4","Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4","Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3","Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4","Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4","Atlantic/South_Georgia|-02|20|0||30","Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2","Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5","Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5","Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5","Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3","Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746","Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4","Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368","Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4","Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347","Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10","Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5","Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5","CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2","CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","EST|EST|50|0|","EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","Etc/GMT-0|GMT|0|0|","Etc/GMT-1|+01|-10|0|","Pacific/Port_Moresby|+10|-a0|0||25e4","Etc/GMT-11|+11|-b0|0|","Pacific/Tarawa|+12|-c0|0||29e3","Etc/GMT-13|+13|-d0|0|","Etc/GMT-14|+14|-e0|0|","Etc/GMT-2|+02|-20|0|","Etc/GMT-3|+03|-30|0|","Etc/GMT-4|+04|-40|0|","Etc/GMT-5|+05|-50|0|","Etc/GMT-6|+06|-60|0|","Indian/Christmas|+07|-70|0||21e2","Etc/GMT-8|+08|-80|0|","Pacific/Palau|+09|-90|0||21e3","Etc/GMT+1|-01|10|0|","Etc/GMT+10|-10|a0|0|","Etc/GMT+11|-11|b0|0|","Etc/GMT+12|-12|c0|0|","Etc/GMT+3|-03|30|0|","Etc/GMT+4|-04|40|0|","Etc/GMT+5|-05|50|0|","Etc/GMT+6|-06|60|0|","Etc/GMT+7|-07|70|0|","Etc/GMT+8|-08|80|0|","Etc/GMT+9|-09|90|0|","Etc/UTC|UTC|0|0|","Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5","Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3","Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5","Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5","Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6","Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5","Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5","Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5","Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5","Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1ip0 17b0 1op0 1tb0 Q2m0 3Ne0 WM0 1fA0 1cM0 1cM0 1oJ0 1dc0 1030 1fA0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1iM0 1fA0 8Ha0 Rb0 1wN0 Rb0 1BB0 Lz0 1C20 LB0 SNX0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5","Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4","Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4","Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3","Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","Europe/Kaliningrad|CET CEST CET CEST MSK MSD EEST EET +03|-10 -20 -20 -30 -30 -40 -30 -20 -30|0101010101010232454545454545454546767676767676767676767676767676767676767676787|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 Am0 Lb0 1en0 op0 1pNz0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4","Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5","Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4","Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5","Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4","Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5","Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4","Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5","Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3","Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6","Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6","Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4","Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5","Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5","Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810","Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4","Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5","Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4","Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4","Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5","Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4","Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1a00 1cM0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5","Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4","Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0|10e5","Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5","Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4","HST|HST|a0|0|","Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2","Indian/Cocos|+0630|-6u|0||596","Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130","Indian/Mahe|LMT +04|-3F.M -40|01|-2yO3F.M|79e3","Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4","Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4","Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4","Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3","MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","MST|MST|70|0|","MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600","Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3","Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4","Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3","Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3","Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1","Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483","Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0|88e4","Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3","Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125","Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4","Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4","Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4","Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2","Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2","Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3","Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2","Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2","Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3","Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2","Pacific/Norfolk|+1112 +1130 +1230 +11|-bc -bu -cu -b0|01213|-Kgbc W01G On0 1COp0|25e4","Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3","Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56","Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3","Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3","Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4","Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3","PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00"],"links":["Africa/Abidjan|Africa/Bamako","Africa/Abidjan|Africa/Banjul","Africa/Abidjan|Africa/Conakry","Africa/Abidjan|Africa/Dakar","Africa/Abidjan|Africa/Freetown","Africa/Abidjan|Africa/Lome","Africa/Abidjan|Africa/Nouakchott","Africa/Abidjan|Africa/Ouagadougou","Africa/Abidjan|Africa/Timbuktu","Africa/Abidjan|Atlantic/St_Helena","Africa/Cairo|Egypt","Africa/Johannesburg|Africa/Maseru","Africa/Johannesburg|Africa/Mbabane","Africa/Lagos|Africa/Bangui","Africa/Lagos|Africa/Brazzaville","Africa/Lagos|Africa/Douala","Africa/Lagos|Africa/Kinshasa","Africa/Lagos|Africa/Libreville","Africa/Lagos|Africa/Luanda","Africa/Lagos|Africa/Malabo","Africa/Lagos|Africa/Niamey","Africa/Lagos|Africa/Porto-Novo","Africa/Maputo|Africa/Blantyre","Africa/Maputo|Africa/Bujumbura","Africa/Maputo|Africa/Gaborone","Africa/Maputo|Africa/Harare","Africa/Maputo|Africa/Kigali","Africa/Maputo|Africa/Lubumbashi","Africa/Maputo|Africa/Lusaka","Africa/Nairobi|Africa/Addis_Ababa","Africa/Nairobi|Africa/Asmara","Africa/Nairobi|Africa/Asmera","Africa/Nairobi|Africa/Dar_es_Salaam","Africa/Nairobi|Africa/Djibouti","Africa/Nairobi|Africa/Kampala","Africa/Nairobi|Africa/Mogadishu","Africa/Nairobi|Indian/Antananarivo","Africa/Nairobi|Indian/Comoro","Africa/Nairobi|Indian/Mayotte","Africa/Tripoli|Libya","America/Adak|America/Atka","America/Adak|US/Aleutian","America/Anchorage|US/Alaska","America/Argentina/Buenos_Aires|America/Buenos_Aires","America/Argentina/Catamarca|America/Argentina/ComodRivadavia","America/Argentina/Catamarca|America/Catamarca","America/Argentina/Cordoba|America/Cordoba","America/Argentina/Cordoba|America/Rosario","America/Argentina/Jujuy|America/Jujuy","America/Argentina/Mendoza|America/Mendoza","America/Atikokan|America/Coral_Harbour","America/Chicago|US/Central","America/Curacao|America/Aruba","America/Curacao|America/Kralendijk","America/Curacao|America/Lower_Princes","America/Denver|America/Shiprock","America/Denver|Navajo","America/Denver|US/Mountain","America/Detroit|US/Michigan","America/Edmonton|Canada/Mountain","America/Fort_Wayne|America/Indiana/Indianapolis","America/Fort_Wayne|America/Indianapolis","America/Fort_Wayne|US/East-Indiana","America/Halifax|Canada/Atlantic","America/Havana|Cuba","America/Indiana/Knox|America/Knox_IN","America/Indiana/Knox|US/Indiana-Starke","America/Jamaica|Jamaica","America/Kentucky/Louisville|America/Louisville","America/Los_Angeles|US/Pacific","America/Los_Angeles|US/Pacific-New","America/Manaus|Brazil/West","America/Mazatlan|Mexico/BajaSur","America/Mexico_City|Mexico/General","America/New_York|US/Eastern","America/Noronha|Brazil/DeNoronha","America/Panama|America/Cayman","America/Phoenix|US/Arizona","America/Port_of_Spain|America/Anguilla","America/Port_of_Spain|America/Antigua","America/Port_of_Spain|America/Dominica","America/Port_of_Spain|America/Grenada","America/Port_of_Spain|America/Guadeloupe","America/Port_of_Spain|America/Marigot","America/Port_of_Spain|America/Montserrat","America/Port_of_Spain|America/St_Barthelemy","America/Port_of_Spain|America/St_Kitts","America/Port_of_Spain|America/St_Lucia","America/Port_of_Spain|America/St_Thomas","America/Port_of_Spain|America/St_Vincent","America/Port_of_Spain|America/Tortola","America/Port_of_Spain|America/Virgin","America/Regina|Canada/Saskatchewan","America/Rio_Branco|America/Porto_Acre","America/Rio_Branco|Brazil/Acre","America/Santiago|Chile/Continental","America/Sao_Paulo|Brazil/East","America/St_Johns|Canada/Newfoundland","America/Tijuana|America/Ensenada","America/Tijuana|America/Santa_Isabel","America/Tijuana|Mexico/BajaNorte","America/Toronto|America/Montreal","America/Toronto|Canada/Eastern","America/Vancouver|Canada/Pacific","America/Whitehorse|Canada/Yukon","America/Winnipeg|Canada/Central","Asia/Ashgabat|Asia/Ashkhabad","Asia/Bangkok|Asia/Phnom_Penh","Asia/Bangkok|Asia/Vientiane","Asia/Dhaka|Asia/Dacca","Asia/Dubai|Asia/Muscat","Asia/Ho_Chi_Minh|Asia/Saigon","Asia/Hong_Kong|Hongkong","Asia/Jerusalem|Asia/Tel_Aviv","Asia/Jerusalem|Israel","Asia/Kathmandu|Asia/Katmandu","Asia/Kolkata|Asia/Calcutta","Asia/Kuala_Lumpur|Asia/Singapore","Asia/Kuala_Lumpur|Singapore","Asia/Macau|Asia/Macao","Asia/Makassar|Asia/Ujung_Pandang","Asia/Nicosia|Europe/Nicosia","Asia/Qatar|Asia/Bahrain","Asia/Rangoon|Asia/Yangon","Asia/Riyadh|Asia/Aden","Asia/Riyadh|Asia/Kuwait","Asia/Seoul|ROK","Asia/Shanghai|Asia/Chongqing","Asia/Shanghai|Asia/Chungking","Asia/Shanghai|Asia/Harbin","Asia/Shanghai|PRC","Asia/Taipei|ROC","Asia/Tehran|Iran","Asia/Thimphu|Asia/Thimbu","Asia/Tokyo|Japan","Asia/Ulaanbaatar|Asia/Ulan_Bator","Asia/Urumqi|Asia/Kashgar","Atlantic/Faroe|Atlantic/Faeroe","Atlantic/Reykjavik|Iceland","Atlantic/South_Georgia|Etc/GMT+2","Australia/Adelaide|Australia/South","Australia/Brisbane|Australia/Queensland","Australia/Broken_Hill|Australia/Yancowinna","Australia/Darwin|Australia/North","Australia/Hobart|Australia/Tasmania","Australia/Lord_Howe|Australia/LHI","Australia/Melbourne|Australia/Victoria","Australia/Perth|Australia/West","Australia/Sydney|Australia/ACT","Australia/Sydney|Australia/Canberra","Australia/Sydney|Australia/NSW","Etc/GMT-0|Etc/GMT","Etc/GMT-0|Etc/GMT+0","Etc/GMT-0|Etc/GMT0","Etc/GMT-0|Etc/Greenwich","Etc/GMT-0|GMT","Etc/GMT-0|GMT+0","Etc/GMT-0|GMT-0","Etc/GMT-0|GMT0","Etc/GMT-0|Greenwich","Etc/UTC|Etc/UCT","Etc/UTC|Etc/Universal","Etc/UTC|Etc/Zulu","Etc/UTC|UCT","Etc/UTC|UTC","Etc/UTC|Universal","Etc/UTC|Zulu","Europe/Belgrade|Europe/Ljubljana","Europe/Belgrade|Europe/Podgorica","Europe/Belgrade|Europe/Sarajevo","Europe/Belgrade|Europe/Skopje","Europe/Belgrade|Europe/Zagreb","Europe/Chisinau|Europe/Tiraspol","Europe/Dublin|Eire","Europe/Helsinki|Europe/Mariehamn","Europe/Istanbul|Asia/Istanbul","Europe/Istanbul|Turkey","Europe/Lisbon|Portugal","Europe/London|Europe/Belfast","Europe/London|Europe/Guernsey","Europe/London|Europe/Isle_of_Man","Europe/London|Europe/Jersey","Europe/London|GB","Europe/London|GB-Eire","Europe/Moscow|W-SU","Europe/Oslo|Arctic/Longyearbyen","Europe/Oslo|Atlantic/Jan_Mayen","Europe/Prague|Europe/Bratislava","Europe/Rome|Europe/San_Marino","Europe/Rome|Europe/Vatican","Europe/Warsaw|Poland","Europe/Zurich|Europe/Busingen","Europe/Zurich|Europe/Vaduz","Indian/Christmas|Etc/GMT-7","Pacific/Auckland|Antarctica/McMurdo","Pacific/Auckland|Antarctica/South_Pole","Pacific/Auckland|NZ","Pacific/Chatham|NZ-CHAT","Pacific/Chuuk|Pacific/Truk","Pacific/Chuuk|Pacific/Yap","Pacific/Easter|Chile/EasterIsland","Pacific/Guam|Pacific/Saipan","Pacific/Honolulu|Pacific/Johnston","Pacific/Honolulu|US/Hawaii","Pacific/Kwajalein|Kwajalein","Pacific/Pago_Pago|Pacific/Midway","Pacific/Pago_Pago|Pacific/Samoa","Pacific/Pago_Pago|US/Samoa","Pacific/Palau|Etc/GMT-9","Pacific/Pohnpei|Pacific/Ponape","Pacific/Port_Moresby|Etc/GMT-10","Pacific/Tarawa|Etc/GMT-12","Pacific/Tarawa|Pacific/Funafuti","Pacific/Tarawa|Pacific/Wake","Pacific/Tarawa|Pacific/Wallis"]}')
		}
	}
]);
//# sourceMappingURL=https://sourcemaps.squarespace.net/universal/scripts-compressed/extract-css-moment-js-vendor-c2e74096f69c8401777c6-min.en-US.js.map