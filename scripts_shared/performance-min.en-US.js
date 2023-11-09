(self.webpackChunkextract_css = self.webpackChunkextract_css || []).push([
	[52730], {
		804090: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), b.default = void 0;
			var d;
			(function(f) {
				f.MAIN_CONTENT = 1, f.CONTENT_COLLECTION = 1, f.PAGE = 2, f.SPLASH_PAGE = 3, f.CONTENT_ITEM = 50, f.NOT_FOUND = 100, f.ERROR = 101, f.SEARCH = 102, f.LOCK_SCREEN = 103, f.POPUP_OVERLAY = 104, f.PROTECTED_CONTENT = 105, f.MEMBER_AREA_ACCESS_DENIED = 106, f.SHOW_CART = 200, f.CHECKOUT = 201, f.ORDER_CONFIRMED = 202, f.DONATE = 203, f.CONTRIBUTION_CONFIRMED = 204, f.COMMERCE_CART_V2 = 205, f.SUBSCRIPTION_CONFIRMED = 206, f.ORDER_RECEIVED = 207, f.MEMBERSHIP_CONFIRMED = 208, f.REVIEWS_REQUEST = 209, f.DIGITAL_PRODUCT_COMPOSER_PREVIEW = 210, f.ORDER_STATUS = 211, f.NEWSLETTER_UNSUBSCRIBE = 300, f.COMMERCE_EMAIL_PREVIEW = 301, f.SSO_PAGE = 400
			})(d || (d = {}));
			var N = d;
			b.default = N, K.exports = b.default
		},
		277581: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), b.default = void 0;
			var d;
			(function(f) {
				f.EXPIRED = 1, f.PASTDUE = 2, f.TRIAL = 3, f.BETA = 4, f.REMOVED = 5, f.INTERNAL = 6, f.COMPED = 7, f.PAID = 8, f.V5_LINKED = 11, f.ACTIVE_PARKING_PAGE = 12, f.RESOLD = 13, f.RESOLD_GRACE_PERIOD = 14, f.ENTERPRISE = 15
			})(d || (d = {}));
			var N = d;
			b.default = N, K.exports = b.default
		},
		192628: function(K, b, d) {
			"use strict";
			var N = d(870752),
				f = {
					childContextTypes: !0,
					contextType: !0,
					contextTypes: !0,
					defaultProps: !0,
					displayName: !0,
					getDefaultProps: !0,
					getDerivedStateFromError: !0,
					getDerivedStateFromProps: !0,
					mixins: !0,
					propTypes: !0,
					type: !0
				},
				P = {
					name: !0,
					length: !0,
					prototype: !0,
					caller: !0,
					callee: !0,
					arguments: !0,
					arity: !0
				},
				x = {
					$$typeof: !0,
					render: !0,
					defaultProps: !0,
					displayName: !0,
					propTypes: !0
				},
				w = {
					$$typeof: !0,
					compare: !0,
					defaultProps: !0,
					displayName: !0,
					propTypes: !0,
					type: !0
				},
				I = {};
			I[N.ForwardRef] = x, I[N.Memo] = w;

			function _(v) {
				return N.isMemo(v) ? w : I[v.$$typeof] || f
			}
			var h = Object.defineProperty,
				g = Object.getOwnPropertyNames,
				E = Object.getOwnPropertySymbols,
				u = Object.getOwnPropertyDescriptor,
				y = Object.getPrototypeOf,
				l = Object.prototype;

			function s(v, o, p) {
				if (typeof o != "string") {
					if (l) {
						var a = y(o);
						a && a !== l && s(v, a, p)
					}
					var i = g(o);
					E && (i = i.concat(E(o)));
					for (var t = _(v), e = _(o), n = 0; n < i.length; ++n) {
						var r = i[n];
						if (!P[r] && !(p && p[r]) && !(e && e[r]) && !(t && t[r])) {
							var c = u(o, r);
							try {
								h(v, r, c)
							} catch (A) {}
						}
					}
				}
				return v
			}
			K.exports = s
		},
		139e3: function(K) {
			"use strict";
			/*
			object-assign
			(c) Sindre Sorhus
			@license MIT
			*/
			var b = Object.getOwnPropertySymbols,
				d = Object.prototype.hasOwnProperty,
				N = Object.prototype.propertyIsEnumerable;

			function f(x) {
				if (x == null) throw new TypeError("Object.assign cannot be called with null or undefined");
				return Object(x)
			}

			function P() {
				try {
					if (!Object.assign) return !1;
					var x = new String("abc");
					if (x[5] = "de", Object.getOwnPropertyNames(x)[0] === "5") return !1;
					for (var w = {}, I = 0; I < 10; I++) w["_" + String.fromCharCode(I)] = I;
					var _ = Object.getOwnPropertyNames(w).map(function(g) {
						return w[g]
					});
					if (_.join("") !== "0123456789") return !1;
					var h = {};
					return "abcdefghijklmnopqrst".split("").forEach(function(g) {
						h[g] = g
					}), Object.keys(Object.assign({}, h)).join("") === "abcdefghijklmnopqrst"
				} catch (g) {
					return !1
				}
			}
			K.exports = P() ? Object.assign : function(x, w) {
				for (var I, _ = f(x), h, g = 1; g < arguments.length; g++) {
					I = Object(arguments[g]);
					for (var E in I) d.call(I, E) && (_[E] = I[E]);
					if (b) {
						h = b(I);
						for (var u = 0; u < h.length; u++) N.call(I, h[u]) && (_[h[u]] = I[h[u]])
					}
				}
				return _
			}
		},
		760636: function(K) {
			var b = K.exports = {},
				d, N;

			function f() {
				throw new Error("setTimeout has not been defined")
			}

			function P() {
				throw new Error("clearTimeout has not been defined")
			}(function() {
				try {
					typeof setTimeout == "function" ? d = setTimeout : d = f
				} catch (s) {
					d = f
				}
				try {
					typeof clearTimeout == "function" ? N = clearTimeout : N = P
				} catch (s) {
					N = P
				}
			})();

			function x(s) {
				if (d === setTimeout) return setTimeout(s, 0);
				if ((d === f || !d) && setTimeout) return d = setTimeout, setTimeout(s, 0);
				try {
					return d(s, 0)
				} catch (v) {
					try {
						return d.call(null, s, 0)
					} catch (o) {
						return d.call(this, s, 0)
					}
				}
			}

			function w(s) {
				if (N === clearTimeout) return clearTimeout(s);
				if ((N === P || !N) && clearTimeout) return N = clearTimeout, clearTimeout(s);
				try {
					return N(s)
				} catch (v) {
					try {
						return N.call(null, s)
					} catch (o) {
						return N.call(this, s)
					}
				}
			}
			var I = [],
				_ = !1,
				h, g = -1;

			function E() {
				!_ || !h || (_ = !1, h.length ? I = h.concat(I) : g = -1, I.length && u())
			}

			function u() {
				if (!_) {
					var s = x(E);
					_ = !0;
					for (var v = I.length; v;) {
						for (h = I, I = []; ++g < v;) h && h[g].run();
						g = -1, v = I.length
					}
					h = null, _ = !1, w(s)
				}
			}
			b.nextTick = function(s) {
				var v = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var o = 1; o < arguments.length; o++) v[o - 1] = arguments[o];
				I.push(new y(s, v)), I.length === 1 && !_ && x(u)
			};

			function y(s, v) {
				this.fun = s, this.array = v
			}
			y.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, b.title = "browser", b.browser = !0, b.env = {}, b.argv = [], b.version = "", b.versions = {};

			function l() {}
			b.on = l, b.addListener = l, b.once = l, b.off = l, b.removeListener = l, b.removeAllListeners = l, b.emit = l, b.prependListener = l, b.prependOnceListener = l, b.listeners = function(s) {
				return []
			}, b.binding = function(s) {
				throw new Error("process.binding is not supported")
			}, b.cwd = function() {
				return "/"
			}, b.chdir = function(s) {
				throw new Error("process.chdir is not supported")
			}, b.umask = function() {
				return 0
			}
		},
		739847: function(K, b) {
			"use strict";
			/** @license React v16.13.1
			 * react-is.production.min.js
			 *
			 * Copyright (c) Facebook, Inc. and its affiliates.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 */
			var d = typeof Symbol == "function" && Symbol.for,
				N = d ? Symbol.for("react.element") : 60103,
				f = d ? Symbol.for("react.portal") : 60106,
				P = d ? Symbol.for("react.fragment") : 60107,
				x = d ? Symbol.for("react.strict_mode") : 60108,
				w = d ? Symbol.for("react.profiler") : 60114,
				I = d ? Symbol.for("react.provider") : 60109,
				_ = d ? Symbol.for("react.context") : 60110,
				h = d ? Symbol.for("react.async_mode") : 60111,
				g = d ? Symbol.for("react.concurrent_mode") : 60111,
				E = d ? Symbol.for("react.forward_ref") : 60112,
				u = d ? Symbol.for("react.suspense") : 60113,
				y = d ? Symbol.for("react.suspense_list") : 60120,
				l = d ? Symbol.for("react.memo") : 60115,
				s = d ? Symbol.for("react.lazy") : 60116,
				v = d ? Symbol.for("react.block") : 60121,
				o = d ? Symbol.for("react.fundamental") : 60117,
				p = d ? Symbol.for("react.responder") : 60118,
				a = d ? Symbol.for("react.scope") : 60119;

			function i(e) {
				if (typeof e == "object" && e !== null) {
					var n = e.$$typeof;
					switch (n) {
						case N:
							switch (e = e.type, e) {
								case h:
								case g:
								case P:
								case w:
								case x:
								case u:
									return e;
								default:
									switch (e = e && e.$$typeof, e) {
										case _:
										case E:
										case s:
										case l:
										case I:
											return e;
										default:
											return n
									}
							}
						case f:
							return n
					}
				}
			}

			function t(e) {
				return i(e) === g
			}
			b.AsyncMode = h, b.ConcurrentMode = g, b.ContextConsumer = _, b.ContextProvider = I, b.Element = N, b.ForwardRef = E, b.Fragment = P, b.Lazy = s, b.Memo = l, b.Portal = f, b.Profiler = w, b.StrictMode = x, b.Suspense = u, b.isAsyncMode = function(e) {
				return t(e) || i(e) === h
			}, b.isConcurrentMode = t, b.isContextConsumer = function(e) {
				return i(e) === _
			}, b.isContextProvider = function(e) {
				return i(e) === I
			}, b.isElement = function(e) {
				return typeof e == "object" && e !== null && e.$$typeof === N
			}, b.isForwardRef = function(e) {
				return i(e) === E
			}, b.isFragment = function(e) {
				return i(e) === P
			}, b.isLazy = function(e) {
				return i(e) === s
			}, b.isMemo = function(e) {
				return i(e) === l
			}, b.isPortal = function(e) {
				return i(e) === f
			}, b.isProfiler = function(e) {
				return i(e) === w
			}, b.isStrictMode = function(e) {
				return i(e) === x
			}, b.isSuspense = function(e) {
				return i(e) === u
			}, b.isValidElementType = function(e) {
				return typeof e == "string" || typeof e == "function" || e === P || e === g || e === w || e === x || e === u || e === y || typeof e == "object" && e !== null && (e.$$typeof === s || e.$$typeof === l || e.$$typeof === I || e.$$typeof === _ || e.$$typeof === E || e.$$typeof === o || e.$$typeof === p || e.$$typeof === a || e.$$typeof === v)
			}, b.typeOf = i
		},
		870752: function(K, b, d) {
			"use strict";
			K.exports = d(739847)
		},
		713320: function(K, b, d) {
			"use strict";
			/** @license React v16.14.0
			 * react.production.min.js
			 *
			 * Copyright (c) Facebook, Inc. and its affiliates.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 */
			var N = d(139e3),
				f = typeof Symbol == "function" && Symbol.for,
				P = f ? Symbol.for("react.element") : 60103,
				x = f ? Symbol.for("react.portal") : 60106,
				w = f ? Symbol.for("react.fragment") : 60107,
				I = f ? Symbol.for("react.strict_mode") : 60108,
				_ = f ? Symbol.for("react.profiler") : 60114,
				h = f ? Symbol.for("react.provider") : 60109,
				g = f ? Symbol.for("react.context") : 60110,
				E = f ? Symbol.for("react.forward_ref") : 60112,
				u = f ? Symbol.for("react.suspense") : 60113,
				y = f ? Symbol.for("react.memo") : 60115,
				l = f ? Symbol.for("react.lazy") : 60116,
				s = typeof Symbol == "function" && Symbol.iterator;

			function v(D) {
				for (var Y = "https://reactjs.org/docs/error-decoder.html?invariant=" + D, Z = 1; Z < arguments.length; Z++) Y += "&args[]=" + encodeURIComponent(arguments[Z]);
				return "Minified React error #" + D + "; visit " + Y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			}
			var o = {
					isMounted: function() {
						return !1
					},
					enqueueForceUpdate: function() {},
					enqueueReplaceState: function() {},
					enqueueSetState: function() {}
				},
				p = {};

			function a(D, Y, Z) {
				this.props = D, this.context = Y, this.refs = p, this.updater = Z || o
			}
			a.prototype.isReactComponent = {}, a.prototype.setState = function(D, Y) {
				if (typeof D != "object" && typeof D != "function" && D != null) throw Error(v(85));
				this.updater.enqueueSetState(this, D, Y, "setState")
			}, a.prototype.forceUpdate = function(D) {
				this.updater.enqueueForceUpdate(this, D, "forceUpdate")
			};

			function i() {}
			i.prototype = a.prototype;

			function t(D, Y, Z) {
				this.props = D, this.context = Y, this.refs = p, this.updater = Z || o
			}
			var e = t.prototype = new i;
			e.constructor = t, N(e, a.prototype), e.isPureReactComponent = !0;
			var n = {
					current: null
				},
				r = Object.prototype.hasOwnProperty,
				c = {
					key: !0,
					ref: !0,
					__self: !0,
					__source: !0
				};

			function A(D, Y, Z) {
				var ee, te = {},
					oe = null,
					ce = null;
				if (Y != null)
					for (ee in Y.ref !== void 0 && (ce = Y.ref), Y.key !== void 0 && (oe = "" + Y.key), Y) r.call(Y, ee) && !c.hasOwnProperty(ee) && (te[ee] = Y[ee]);
				var ae = arguments.length - 2;
				if (ae === 1) te.children = Z;
				else if (1 < ae) {
					for (var se = Array(ae), le = 0; le < ae; le++) se[le] = arguments[le + 2];
					te.children = se
				}
				if (D && D.defaultProps)
					for (ee in ae = D.defaultProps, ae) te[ee] === void 0 && (te[ee] = ae[ee]);
				return {
					$$typeof: P,
					type: D,
					key: oe,
					ref: ce,
					props: te,
					_owner: n.current
				}
			}

			function S(D, Y) {
				return {
					$$typeof: P,
					type: D.type,
					key: Y,
					ref: D.ref,
					props: D.props,
					_owner: D._owner
				}
			}

			function m(D) {
				return typeof D == "object" && D !== null && D.$$typeof === P
			}

			function O(D) {
				var Y = {
					"=": "=0",
					":": "=2"
				};
				return "$" + ("" + D).replace(/[=:]/g, function(Z) {
					return Y[Z]
				})
			}
			var R = /\/+/g,
				j = [];

			function H(D, Y, Z, ee) {
				if (j.length) {
					var te = j.pop();
					return te.result = D, te.keyPrefix = Y, te.func = Z, te.context = ee, te.count = 0, te
				}
				return {
					result: D,
					keyPrefix: Y,
					func: Z,
					context: ee,
					count: 0
				}
			}

			function $(D) {
				D.result = null, D.keyPrefix = null, D.func = null, D.context = null, D.count = 0, 10 > j.length && j.push(D)
			}

			function X(D, Y, Z, ee) {
				var te = typeof D;
				(te === "undefined" || te === "boolean") && (D = null);
				var oe = !1;
				if (D === null) oe = !0;
				else switch (te) {
					case "string":
					case "number":
						oe = !0;
						break;
					case "object":
						switch (D.$$typeof) {
							case P:
							case x:
								oe = !0
						}
				}
				if (oe) return Z(ee, D, Y === "" ? "." + T(D, 0) : Y), 1;
				if (oe = 0, Y = Y === "" ? "." : Y + ":", Array.isArray(D))
					for (var ce = 0; ce < D.length; ce++) {
						te = D[ce];
						var ae = Y + T(te, ce);
						oe += X(te, ae, Z, ee)
					} else if (D === null || typeof D != "object" ? ae = null : (ae = s && D[s] || D["@@iterator"], ae = typeof ae == "function" ? ae : null), typeof ae == "function")
						for (D = ae.call(D), ce = 0; !(te = D.next()).done;) te = te.value, ae = Y + T(te, ce++), oe += X(te, ae, Z, ee);
					else if (te === "object") throw Z = "" + D, Error(v(31, Z === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : Z, ""));
				return oe
			}

			function J(D, Y, Z) {
				return D == null ? 0 : X(D, "", Y, Z)
			}

			function T(D, Y) {
				return typeof D == "object" && D !== null && D.key != null ? O(D.key) : Y.toString(36)
			}

			function B(D, Y) {
				D.func.call(D.context, Y, D.count++)
			}

			function G(D, Y, Z) {
				var ee = D.result,
					te = D.keyPrefix;
				D = D.func.call(D.context, Y, D.count++), Array.isArray(D) ? L(D, ee, Z, function(oe) {
					return oe
				}) : D != null && (m(D) && (D = S(D, te + (!D.key || Y && Y.key === D.key ? "" : ("" + D.key).replace(R, "$&/") + "/") + Z)), ee.push(D))
			}

			function L(D, Y, Z, ee, te) {
				var oe = "";
				Z != null && (oe = ("" + Z).replace(R, "$&/") + "/"), Y = H(Y, oe, ee, te), J(D, G, Y), $(Y)
			}
			var F = {
				current: null
			};

			function U() {
				var D = F.current;
				if (D === null) throw Error(v(321));
				return D
			}
			var W = {
				ReactCurrentDispatcher: F,
				ReactCurrentBatchConfig: {
					suspense: null
				},
				ReactCurrentOwner: n,
				IsSomeRendererActing: {
					current: !1
				},
				assign: N
			};
			b.Children = {
				map: function(D, Y, Z) {
					if (D == null) return D;
					var ee = [];
					return L(D, ee, null, Y, Z), ee
				},
				forEach: function(D, Y, Z) {
					if (D == null) return D;
					Y = H(null, null, Y, Z), J(D, B, Y), $(Y)
				},
				count: function(D) {
					return J(D, function() {
						return null
					}, null)
				},
				toArray: function(D) {
					var Y = [];
					return L(D, Y, null, function(Z) {
						return Z
					}), Y
				},
				only: function(D) {
					if (!m(D)) throw Error(v(143));
					return D
				}
			}, b.Component = a, b.Fragment = w, b.Profiler = _, b.PureComponent = t, b.StrictMode = I, b.Suspense = u, b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W, b.cloneElement = function(D, Y, Z) {
				if (D == null) throw Error(v(267, D));
				var ee = N({}, D.props),
					te = D.key,
					oe = D.ref,
					ce = D._owner;
				if (Y != null) {
					if (Y.ref !== void 0 && (oe = Y.ref, ce = n.current), Y.key !== void 0 && (te = "" + Y.key), D.type && D.type.defaultProps) var ae = D.type.defaultProps;
					for (se in Y) r.call(Y, se) && !c.hasOwnProperty(se) && (ee[se] = Y[se] === void 0 && ae !== void 0 ? ae[se] : Y[se])
				}
				var se = arguments.length - 2;
				if (se === 1) ee.children = Z;
				else if (1 < se) {
					ae = Array(se);
					for (var le = 0; le < se; le++) ae[le] = arguments[le + 2];
					ee.children = ae
				}
				return {
					$$typeof: P,
					type: D.type,
					key: te,
					ref: oe,
					props: ee,
					_owner: ce
				}
			}, b.createContext = function(D, Y) {
				return Y === void 0 && (Y = null), D = {
					$$typeof: g,
					_calculateChangedBits: Y,
					_currentValue: D,
					_currentValue2: D,
					_threadCount: 0,
					Provider: null,
					Consumer: null
				}, D.Provider = {
					$$typeof: h,
					_context: D
				}, D.Consumer = D
			}, b.createElement = A, b.createFactory = function(D) {
				var Y = A.bind(null, D);
				return Y.type = D, Y
			}, b.createRef = function() {
				return {
					current: null
				}
			}, b.forwardRef = function(D) {
				return {
					$$typeof: E,
					render: D
				}
			}, b.isValidElement = m, b.lazy = function(D) {
				return {
					$$typeof: l,
					_ctor: D,
					_status: -1,
					_result: null
				}
			}, b.memo = function(D, Y) {
				return {
					$$typeof: y,
					type: D,
					compare: Y === void 0 ? null : Y
				}
			}, b.useCallback = function(D, Y) {
				return U().useCallback(D, Y)
			}, b.useContext = function(D, Y) {
				return U().useContext(D, Y)
			}, b.useDebugValue = function() {}, b.useEffect = function(D, Y) {
				return U().useEffect(D, Y)
			}, b.useImperativeHandle = function(D, Y, Z) {
				return U().useImperativeHandle(D, Y, Z)
			}, b.useLayoutEffect = function(D, Y) {
				return U().useLayoutEffect(D, Y)
			}, b.useMemo = function(D, Y) {
				return U().useMemo(D, Y)
			}, b.useReducer = function(D, Y, Z) {
				return U().useReducer(D, Y, Z)
			}, b.useRef = function(D) {
				return U().useRef(D)
			}, b.useState = function(D) {
				return U().useState(D)
			}, b.version = "16.14.0"
		},
		508669: function(K, b, d) {
			"use strict";
			K.exports = d(713320)
		},
		826522: function(K, b, d) {
			"use strict";
			var N;
			N = {
				value: !0
			};
			var f = d(986583),
				P = _(d(277581)),
				x = _(d(804090)),
				w = d(246876);

			function I(e, n, r) {
				return n in e ? Object.defineProperty(e, n, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = r, e
			}

			function _(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function h(e) {
				for (var n = 1; n < arguments.length; n++) {
					var r = arguments[n] != null ? arguments[n] : {},
						c = Object.keys(r);
					typeof Object.getOwnPropertySymbols == "function" && (c = c.concat(Object.getOwnPropertySymbols(r).filter(function(A) {
						return Object.getOwnPropertyDescriptor(r, A).enumerable
					}))), c.forEach(function(A) {
						I(e, A, r[A])
					})
				}
				return e
			}
			var g = window.Static && window.Static.SQUARESPACE_CONTEXT,
				E = window.top !== window,
				u = Object.freeze(I({}, x.default.COMMERCE_CART_V2, "commerce-cart"));

			function y() {
				var e = window.location && window.location.pathname || "";
				return !E && /^\/config(\/.*)?$/.test(e)
			}

			function l() {
				return {
					inFrame: E,
					templateId: g.templateId || "",
					impersonatedSession: !!g.impersonatedSession,
					pageType: typeof g.pageType == "number" ? g.pageType : -1
				}
			}

			function s() {
				var e = g.website,
					n = e === void 0 ? {} : e;
				return {
					authenticUrl: n.authenticUrl || "",
					cloneable: !!n.cloneable,
					developerMode: !!n.developerMode,
					isHstsEnabled: !!n.isHstsEnabled,
					language: n.language || "",
					timeZone: n.timeZone || "",
					websiteId: n.id || "",
					websiteType: n.websiteType || -1
				}
			}

			function v() {
				var e = g.websiteSettings,
					n = e === void 0 ? {} : e;
				return {
					ampEnabled: !!n.ampEnabled
				}
			}

			function o() {
				var e = g.collection,
					n = e === void 0 ? {} : e;
				return {
					collectionType: n.type || -1
				}
			}

			function p() {
				return window.Squarespace && "SECTION_CONTEXT" in window.Squarespace
			}

			function a() {
				return g.hasOwnProperty("templateVersion") ? g.templateVersion.replace(".", "_") : p() ? "8" : null
			}

			function i(e) {
				var n = y(),
					r = u[g.pageType],
					c = {
						appName: r || "v".concat(e, "-").concat(n ? "config" : "user-sites"),
						context: h({}, l(), s(), v(), o()),
						captureException: function(R, j) {
							(0, w.withScope)(function(H) {
								H.setTag("product_area", "rum-collector"), j !== void 0 && H.setExtra("extras", j), (0, w.captureException)(R)
							})
						}
					};
				if (n) {
					var A = g.website.siteStatus.value === P.default.INTERNAL,
						S = g.authenticatedAccount,
						m = S.createdOn,
						O = S.id;
					c.context.isInternal = A, c.context.createdOn = m, c.context.memberId = O
				}
				return c
			}

			function t() {
				if (g) {
					var e = a();
					if (e === null) return;
					var n = i(e);
					(0, f.init)(n)
				}
			}
			t()
		},
		246876: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(i, t) {
				for (var e in t) Object.defineProperty(i, e, {
					enumerable: !0,
					get: t[e]
				})
			}
			N(b, {
				addBreadcrumb: function() {
					return g
				},
				captureMessage: function() {
					return E
				},
				captureException: function() {
					return u
				},
				captureEvent: function() {
					return y
				},
				configureScope: function() {
					return l
				},
				withScope: function() {
					return s
				},
				isSentryConnected: function() {
					return a
				}
			});
			var f = d(98888);

			function P(i, t) {
				(t == null || t > i.length) && (t = i.length);
				for (var e = 0, n = new Array(t); e < t; e++) n[e] = i[e];
				return n
			}

			function x(i) {
				if (Array.isArray(i)) return P(i)
			}

			function w(i) {
				if (typeof Symbol != "undefined" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i)
			}

			function I() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function _(i) {
				return x(i) || w(i) || h(i) || I()
			}

			function h(i, t) {
				if (!!i) {
					if (typeof i == "string") return P(i, t);
					var e = Object.prototype.toString.call(i).slice(8, -1);
					if (e === "Object" && i.constructor && (e = i.constructor.name), e === "Map" || e === "Set") return Array.from(e);
					if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return P(i, t)
				}
			}
			var g, E, u, y, l, s, v = function(i) {
					return function(t) {
						for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
						var c;
						return (c = console).log.apply(c, ["[Sentry][".concat(i, "] ").concat(t)].concat(_(n))), "some-error-identifier"
					}
				},
				o = !1,
				p = function(i) {
					var t = i.category,
						e = i.message;
					console.log("[Sentry][addBreadcrumb] (".concat(t, ") ").concat(e))
				},
				a = !1;
			window.SQUARESPACE_SENTRY ? (a = !0, g = window.SQUARESPACE_SENTRY.addBreadcrumb, E = window.SQUARESPACE_SENTRY.captureMessage, u = window.SQUARESPACE_SENTRY.captureException, y = window.SQUARESPACE_SENTRY.captureEvent, l = window.SQUARESPACE_SENTRY.configureScope, s = window.SQUARESPACE_SENTRY.withScope) : (console.warn("SENTRY WAS __NOT__ INITIALIZED. Logs will be forwarded to console instead."), g = o ? p : function() {}, E = v("captureMessage"), u = v("captureException"), y = v("captureEvent"), l = function() {}, s = function(i) {
				var t = new f.Scope;
				console.log("[Sentry][withScope]", t), i(t)
			})
		},
		434742: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "BrowserClient", {
				enumerable: !0,
				get: function() {
					return a
				}
			});
			var N = d(596907),
				f = d(974308),
				P = d(974991),
				x = d(428799),
				w = d(115492),
				I = d(364347);

			function _(i) {
				if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return i
			}

			function h(i, t) {
				if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function g(i, t, e) {
				return typeof Reflect != "undefined" && Reflect.get ? g = Reflect.get : g = function(r, c, A) {
					var S = s(r, c);
					if (!!S) {
						var m = Object.getOwnPropertyDescriptor(S, c);
						return m.get ? m.get.call(A) : m.value
					}
				}, g(i, t, e || i)
			}

			function E(i) {
				return E = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e)
				}, E(i)
			}

			function u(i, t) {
				if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
				i.prototype = Object.create(t && t.prototype, {
					constructor: {
						value: i,
						writable: !0,
						configurable: !0
					}
				}), t && l(i, t)
			}

			function y(i, t) {
				return t && (v(t) === "object" || typeof t == "function") ? t : _(i)
			}

			function l(i, t) {
				return l = Object.setPrototypeOf || function(n, r) {
					return n.__proto__ = r, n
				}, l(i, t)
			}

			function s(i, t) {
				for (; !Object.prototype.hasOwnProperty.call(i, t) && (i = E(i), i !== null););
				return i
			}
			var v = function(i) {
				return i && typeof Symbol != "undefined" && i.constructor === Symbol ? "symbol" : typeof i
			};

			function o() {
				if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
				} catch (i) {
					return !1
				}
			}

			function p(i) {
				var t = o();
				return function() {
					var n = E(i),
						r;
					if (t) {
						var c = E(this).constructor;
						r = Reflect.construct(n, arguments, c)
					} else r = n.apply(this, arguments);
					return y(this, r)
				}
			}
			var a = function(i) {
				"use strict";
				u(e, i);
				var t = p(e);

				function e(r) {
					h(this, e);
					var c;
					return r._metadata = r._metadata || {}, r._metadata.sdk = r._metadata.sdk || {
						name: "sentry.javascript.browser",
						packages: [{
							name: "npm:@sentry/browser",
							version: f.SDK_VERSION
						}],
						version: f.SDK_VERSION
					}, c = t.call(this, r), r.sendClientReports && w.WINDOW.document && w.WINDOW.document.addEventListener("visibilitychange", function() {
						w.WINDOW.document.visibilityState === "hidden" && c._flushOutcomes()
					}), c
				}
				var n = e.prototype;
				return n.eventFromException = function(c, A) {
					return (0, x.eventFromException)(this._options.stackParser, c, A, this._options.attachStacktrace)
				}, n.eventFromMessage = function(c) {
					var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "info",
						S = arguments.length > 2 ? arguments[2] : void 0;
					return (0, x.eventFromMessage)(this._options.stackParser, c, A, S, this._options.attachStacktrace)
				}, n.sendEvent = function(c, A) {
					var S = this.getIntegrationById(I.BREADCRUMB_INTEGRATION_ID);
					(0, N._optionalChain)([S, "optionalAccess", function(m) {
						return m.addSentryBreadcrumb
					}, "optionalCall", function(m) {
						return m(c)
					}]), g(E(e.prototype), "sendEvent", this).call(this, c, A)
				}, n._prepareEvent = function(c, A, S) {
					return c.platform = c.platform || "javascript", g(E(e.prototype), "_prepareEvent", this).call(this, c, A, S)
				}, n._flushOutcomes = function() {
					var c = this._clearOutcomes();
					if (c.length === 0) {
						(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.log("No outcomes to send");
						return
					}
					if (!this._dsn) {
						(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.log("No dsn provided, will not send outcomes");
						return
					}(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.log("Sending outcomes:", c);
					var A = (0, f.getEnvelopeEndpointWithUrlEncodedAuth)(this._dsn, this._options),
						S = (0, P.createClientReportEnvelope)(c, this._options.tunnel && (0, P.dsnToString)(this._dsn));
					try {
						var m = Object.prototype.toString.call(w.WINDOW && w.WINDOW.navigator) === "[object Navigator]",
							O = m && typeof w.WINDOW.navigator.sendBeacon == "function";
						if (O && !this._options.transportOptions) {
							var R = w.WINDOW.navigator.sendBeacon.bind(w.WINDOW.navigator);
							R(A, (0, P.serializeEnvelope)(S))
						} else this._sendEnvelope(S)
					} catch (j) {
						(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.error(j)
					}
				}, e
			}(f.BaseClient)
		},
		428799: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(i, t) {
				for (var e in t) Object.defineProperty(i, e, {
					enumerable: !0,
					get: t[e]
				})
			}
			N(b, {
				eventFromError: function() {
					return E
				},
				eventFromException: function() {
					return v
				},
				eventFromMessage: function() {
					return o
				},
				eventFromPlainObject: function() {
					return g
				},
				eventFromString: function() {
					return a
				},
				eventFromUnknownInput: function() {
					return p
				},
				exceptionFromError: function() {
					return h
				},
				parseStackFrames: function() {
					return u
				}
			});
			var f = d(974308),
				P = d(974991);

			function x(i, t, e) {
				return t in i ? Object.defineProperty(i, t, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : i[t] = e, i
			}

			function w(i) {
				for (var t = 1; t < arguments.length; t++) {
					var e = arguments[t] != null ? arguments[t] : {},
						n = Object.keys(e);
					typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(e).filter(function(r) {
						return Object.getOwnPropertyDescriptor(e, r).enumerable
					}))), n.forEach(function(r) {
						x(i, r, e[r])
					})
				}
				return i
			}

			function I(i, t) {
				var e = Object.keys(i);
				if (Object.getOwnPropertySymbols) {
					var n = Object.getOwnPropertySymbols(i);
					t && (n = n.filter(function(r) {
						return Object.getOwnPropertyDescriptor(i, r).enumerable
					})), e.push.apply(e, n)
				}
				return e
			}

			function _(i, t) {
				return t = t != null ? t : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : I(Object(t)).forEach(function(e) {
					Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(t, e))
				}), i
			}

			function h(i, t) {
				var e = u(i, t),
					n = {
						type: t && t.name,
						value: s(t)
					};
				return e.length && (n.stacktrace = {
					frames: e
				}), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n
			}

			function g(i, t, e, n) {
				var r = (0, f.getCurrentHub)(),
					c = r.getClient(),
					A = c && c.getOptions().normalizeDepth,
					S = {
						exception: {
							values: [{
								type: (0, P.isEvent)(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
								value: "Non-Error ".concat(n ? "promise rejection" : "exception", " captured with keys: ").concat((0, P.extractExceptionKeysForMessage)(t))
							}]
						},
						extra: {
							__serialized__: (0, P.normalizeToSize)(t, A)
						}
					};
				if (e) {
					var m = u(i, e);
					m.length && (S.exception.values[0].stacktrace = {
						frames: m
					})
				}
				return S
			}

			function E(i, t) {
				return {
					exception: {
						values: [h(i, t)]
					}
				}
			}

			function u(i, t) {
				var e = t.stacktrace || t.stack || "",
					n = l(t);
				try {
					return i(e, n)
				} catch (r) {}
				return []
			}
			var y = /Minified React error #\d+;/i;

			function l(i) {
				if (i) {
					if (typeof i.framesToPop == "number") return i.framesToPop;
					if (y.test(i.message)) return 1
				}
				return 0
			}

			function s(i) {
				var t = i && i.message;
				return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message"
			}

			function v(i, t, e, n) {
				var r = e && e.syntheticException || void 0,
					c = p(i, t, r, n);
				return (0, P.addExceptionMechanism)(c), c.level = "error", e && e.event_id && (c.event_id = e.event_id), (0, P.resolvedSyncPromise)(c)
			}

			function o(i, t) {
				var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "info",
					n = arguments.length > 3 ? arguments[3] : void 0,
					r = arguments.length > 4 ? arguments[4] : void 0,
					c = n && n.syntheticException || void 0,
					A = a(i, t, c, r);
				return A.level = e, n && n.event_id && (A.event_id = n.event_id), (0, P.resolvedSyncPromise)(A)
			}

			function p(i, t, e, n, r) {
				var c;
				if ((0, P.isErrorEvent)(t) && t.error) {
					var A = t;
					return E(i, A.error)
				}
				if ((0, P.isDOMError)(t) || (0, P.isDOMException)(t)) {
					var S = t;
					if ("stack" in t) c = E(i, t);
					else {
						var m = S.name || ((0, P.isDOMError)(S) ? "DOMError" : "DOMException"),
							O = S.message ? "".concat(m, ": ").concat(S.message) : m;
						c = a(i, O, e, n), (0, P.addExceptionTypeValue)(c, O)
					}
					return "code" in S && (c.tags = _(w({}, c.tags), {
						"DOMException.code": "".concat(S.code)
					})), c
				}
				if ((0, P.isError)(t)) return E(i, t);
				if ((0, P.isPlainObject)(t) || (0, P.isEvent)(t)) {
					var R = t;
					return c = g(i, R, e, r), (0, P.addExceptionMechanism)(c, {
						synthetic: !0
					}), c
				}
				return c = a(i, t, e, n), (0, P.addExceptionTypeValue)(c, "".concat(t), void 0), (0, P.addExceptionMechanism)(c, {
					synthetic: !0
				}), c
			}

			function a(i, t, e, n) {
				var r = {
					message: t
				};
				if (n && e) {
					var c = u(i, e);
					c.length && (r.exception = {
						values: [{
							value: t,
							stacktrace: {
								frames: c
							}
						}]
					})
				}
				return r
			}
		},
		190479: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(_, h) {
				for (var g in h) Object.defineProperty(_, g, {
					enumerable: !0,
					get: h[g]
				})
			}
			N(b, {
				FunctionToString: function() {
					return f.FunctionToString
				},
				Hub: function() {
					return f.Hub
				},
				InboundFilters: function() {
					return f.InboundFilters
				},
				SDK_VERSION: function() {
					return f.SDK_VERSION
				},
				Scope: function() {
					return f.Scope
				},
				addBreadcrumb: function() {
					return f.addBreadcrumb
				},
				addGlobalEventProcessor: function() {
					return f.addGlobalEventProcessor
				},
				captureEvent: function() {
					return f.captureEvent
				},
				captureException: function() {
					return f.captureException
				},
				captureMessage: function() {
					return f.captureMessage
				},
				configureScope: function() {
					return f.configureScope
				},
				createTransport: function() {
					return f.createTransport
				},
				getCurrentHub: function() {
					return f.getCurrentHub
				},
				getHubFromCarrier: function() {
					return f.getHubFromCarrier
				},
				makeMain: function() {
					return f.makeMain
				},
				setContext: function() {
					return f.setContext
				},
				setExtra: function() {
					return f.setExtra
				},
				setExtras: function() {
					return f.setExtras
				},
				setTag: function() {
					return f.setTag
				},
				setTags: function() {
					return f.setTags
				},
				setUser: function() {
					return f.setUser
				},
				startTransaction: function() {
					return f.startTransaction
				},
				withScope: function() {
					return f.withScope
				},
				WINDOW: function() {
					return P.WINDOW
				},
				BrowserClient: function() {
					return x.BrowserClient
				},
				chromeStackLineParser: function() {
					return w.chromeStackLineParser
				},
				defaultStackLineParsers: function() {
					return w.defaultStackLineParsers
				},
				defaultStackParser: function() {
					return w.defaultStackParser
				},
				geckoStackLineParser: function() {
					return w.geckoStackLineParser
				},
				opera10StackLineParser: function() {
					return w.opera10StackLineParser
				},
				opera11StackLineParser: function() {
					return w.opera11StackLineParser
				},
				winjsStackLineParser: function() {
					return w.winjsStackLineParser
				},
				close: function() {
					return I.close
				},
				defaultIntegrations: function() {
					return I.defaultIntegrations
				},
				flush: function() {
					return I.flush
				},
				forceLoad: function() {
					return I.forceLoad
				},
				init: function() {
					return I.init
				},
				lastEventId: function() {
					return I.lastEventId
				},
				onLoad: function() {
					return I.onLoad
				},
				showReportDialog: function() {
					return I.showReportDialog
				},
				wrap: function() {
					return I.wrap
				}
			});
			var f = d(974308),
				P = d(115492),
				x = d(434742);
			d(27206);
			var w = d(134685),
				I = d(992316);
			d(711974)
		},
		115492: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(l, s) {
				for (var v in s) Object.defineProperty(l, v, {
					enumerable: !0,
					get: s[v]
				})
			}
			N(b, {
				WINDOW: function() {
					return h
				},
				ignoreNextOnError: function() {
					return u
				},
				shouldIgnoreOnError: function() {
					return E
				},
				wrap: function() {
					return y
				}
			});
			var f = d(974308),
				P = d(974991);

			function x(l, s, v) {
				return s in l ? Object.defineProperty(l, s, {
					value: v,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : l[s] = v, l
			}

			function w(l) {
				for (var s = 1; s < arguments.length; s++) {
					var v = arguments[s] != null ? arguments[s] : {},
						o = Object.keys(v);
					typeof Object.getOwnPropertySymbols == "function" && (o = o.concat(Object.getOwnPropertySymbols(v).filter(function(p) {
						return Object.getOwnPropertyDescriptor(v, p).enumerable
					}))), o.forEach(function(p) {
						x(l, p, v[p])
					})
				}
				return l
			}

			function I(l, s) {
				var v = Object.keys(l);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(l);
					s && (o = o.filter(function(p) {
						return Object.getOwnPropertyDescriptor(l, p).enumerable
					})), v.push.apply(v, o)
				}
				return v
			}

			function _(l, s) {
				return s = s != null ? s : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(l, Object.getOwnPropertyDescriptors(s)) : I(Object(s)).forEach(function(v) {
					Object.defineProperty(l, v, Object.getOwnPropertyDescriptor(s, v))
				}), l
			}
			var h = P.GLOBAL_OBJ,
				g = 0;

			function E() {
				return g > 0
			}

			function u() {
				g++, setTimeout(function() {
					g--
				})
			}

			function y(l) {
				var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
					v = arguments.length > 2 ? arguments[2] : void 0;
				if (typeof l != "function") return l;
				try {
					var o = l.__sentry_wrapped__;
					if (o) return o;
					if ((0, P.getOriginalFunction)(l)) return l
				} catch (t) {
					return l
				}
				var p = function() {
					var e = Array.prototype.slice.call(arguments);
					try {
						v && typeof v == "function" && v.apply(this, arguments);
						var n = e.map(function(r) {
							return y(r, s)
						});
						return l.apply(this, n)
					} catch (r) {
						throw u(), (0, f.withScope)(function(c) {
							c.addEventProcessor(function(A) {
								return s.mechanism && ((0, P.addExceptionTypeValue)(A, void 0, void 0), (0, P.addExceptionMechanism)(A, s.mechanism)), A.extra = _(w({}, A.extra), {
									arguments: e
								}), A
							}), (0, f.captureException)(r)
						}), r
					}
				};
				try {
					for (var a in l) Object.prototype.hasOwnProperty.call(l, a) && (p[a] = l[a])
				} catch (t) {}(0, P.markFunctionWrapped)(p, l), (0, P.addNonEnumerableProperty)(l, "__sentry_wrapped__", p);
				try {
					var i = Object.getOwnPropertyDescriptor(p, "name");
					i.configurable && Object.defineProperty(p, "name", {
						get: function() {
							return l.name
						}
					})
				} catch (t) {}
				return p
			}
		},
		816679: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(n, r) {
				for (var c in r) Object.defineProperty(n, c, {
					enumerable: !0,
					get: r[c]
				})
			}
			N(b, {
				FunctionToString: function() {
					return f.FunctionToString
				},
				Hub: function() {
					return f.Hub
				},
				InboundFilters: function() {
					return f.InboundFilters
				},
				SDK_VERSION: function() {
					return f.SDK_VERSION
				},
				Scope: function() {
					return f.Scope
				},
				addBreadcrumb: function() {
					return f.addBreadcrumb
				},
				addGlobalEventProcessor: function() {
					return f.addGlobalEventProcessor
				},
				captureEvent: function() {
					return f.captureEvent
				},
				captureException: function() {
					return f.captureException
				},
				captureMessage: function() {
					return f.captureMessage
				},
				configureScope: function() {
					return f.configureScope
				},
				createTransport: function() {
					return f.createTransport
				},
				getCurrentHub: function() {
					return f.getCurrentHub
				},
				getHubFromCarrier: function() {
					return f.getHubFromCarrier
				},
				makeMain: function() {
					return f.makeMain
				},
				setContext: function() {
					return f.setContext
				},
				setExtra: function() {
					return f.setExtra
				},
				setExtras: function() {
					return f.setExtras
				},
				setTag: function() {
					return f.setTag
				},
				setTags: function() {
					return f.setTags
				},
				setUser: function() {
					return f.setUser
				},
				startTransaction: function() {
					return f.startTransaction
				},
				withScope: function() {
					return f.withScope
				},
				WINDOW: function() {
					return P.WINDOW
				},
				BrowserClient: function() {
					return w.BrowserClient
				},
				makeFetchTransport: function() {
					return I.makeFetchTransport
				},
				makeXHRTransport: function() {
					return _.makeXHRTransport
				},
				chromeStackLineParser: function() {
					return h.chromeStackLineParser
				},
				defaultStackLineParsers: function() {
					return h.defaultStackLineParsers
				},
				defaultStackParser: function() {
					return h.defaultStackParser
				},
				geckoStackLineParser: function() {
					return h.geckoStackLineParser
				},
				opera10StackLineParser: function() {
					return h.opera10StackLineParser
				},
				opera11StackLineParser: function() {
					return h.opera11StackLineParser
				},
				winjsStackLineParser: function() {
					return h.winjsStackLineParser
				},
				close: function() {
					return g.close
				},
				defaultIntegrations: function() {
					return g.defaultIntegrations
				},
				flush: function() {
					return g.flush
				},
				forceLoad: function() {
					return g.forceLoad
				},
				init: function() {
					return g.init
				},
				lastEventId: function() {
					return g.lastEventId
				},
				onLoad: function() {
					return g.onLoad
				},
				showReportDialog: function() {
					return g.showReportDialog
				},
				wrap: function() {
					return g.wrap
				},
				GlobalHandlers: function() {
					return E.GlobalHandlers
				},
				TryCatch: function() {
					return u.TryCatch
				},
				Breadcrumbs: function() {
					return y.Breadcrumbs
				},
				LinkedErrors: function() {
					return l.LinkedErrors
				},
				HttpContext: function() {
					return s.HttpContext
				},
				Dedupe: function() {
					return v.Dedupe
				},
				Integrations: function() {
					return e
				}
			}), d(190479);
			var f = d(974308),
				P = d(115492),
				x = a(d(711974)),
				w = d(434742),
				I = d(262695),
				_ = d(220122),
				h = d(134685),
				g = d(992316),
				E = d(888013),
				u = d(784663),
				y = d(364347),
				l = d(44044),
				s = d(373808),
				v = d(628887);

			function o(n, r, c) {
				return r in n ? Object.defineProperty(n, r, {
					value: c,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : n[r] = c, n
			}

			function p(n) {
				if (typeof WeakMap != "function") return null;
				var r = new WeakMap,
					c = new WeakMap;
				return (p = function(A) {
					return A ? c : r
				})(n)
			}

			function a(n, r) {
				if (!r && n && n.__esModule) return n;
				if (n === null || typeof n != "object" && typeof n != "function") return {
					default: n
				};
				var c = p(r);
				if (c && c.has(n)) return c.get(n);
				var A = {},
					S = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for (var m in n)
					if (m !== "default" && Object.prototype.hasOwnProperty.call(n, m)) {
						var O = S ? Object.getOwnPropertyDescriptor(n, m) : null;
						O && (O.get || O.set) ? Object.defineProperty(A, m, O) : A[m] = n[m]
					} return A.default = n, c && c.set(n, A), A
			}

			function i(n) {
				for (var r = 1; r < arguments.length; r++) {
					var c = arguments[r] != null ? arguments[r] : {},
						A = Object.keys(c);
					typeof Object.getOwnPropertySymbols == "function" && (A = A.concat(Object.getOwnPropertySymbols(c).filter(function(S) {
						return Object.getOwnPropertyDescriptor(c, S).enumerable
					}))), A.forEach(function(S) {
						o(n, S, c[S])
					})
				}
				return n
			}
			var t = {};
			P.WINDOW.Sentry && P.WINDOW.Sentry.Integrations && (t = P.WINDOW.Sentry.Integrations);
			var e = i({}, t, f.Integrations, x)
		},
		364347: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(a, i) {
				for (var t in i) Object.defineProperty(a, t, {
					enumerable: !0,
					get: i[t]
				})
			}
			N(b, {
				BREADCRUMB_INTEGRATION_ID: function() {
					return u
				},
				Breadcrumbs: function() {
					return y
				}
			});
			var f = d(974308),
				P = d(974991),
				x = d(115492);

			function w(a, i) {
				if (!(a instanceof i)) throw new TypeError("Cannot call a class as a function")
			}

			function I(a, i, t) {
				return i in a ? Object.defineProperty(a, i, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : a[i] = t, a
			}

			function _(a) {
				for (var i = 1; i < arguments.length; i++) {
					var t = arguments[i] != null ? arguments[i] : {},
						e = Object.keys(t);
					typeof Object.getOwnPropertySymbols == "function" && (e = e.concat(Object.getOwnPropertySymbols(t).filter(function(n) {
						return Object.getOwnPropertyDescriptor(t, n).enumerable
					}))), e.forEach(function(n) {
						I(a, n, t[n])
					})
				}
				return a
			}

			function h(a, i) {
				var t = Object.keys(a);
				if (Object.getOwnPropertySymbols) {
					var e = Object.getOwnPropertySymbols(a);
					i && (e = e.filter(function(n) {
						return Object.getOwnPropertyDescriptor(a, n).enumerable
					})), t.push.apply(t, e)
				}
				return t
			}

			function g(a, i) {
				return i = i != null ? i : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(i)) : h(Object(i)).forEach(function(t) {
					Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(i, t))
				}), a
			}
			var E = 1024,
				u = "Breadcrumbs",
				y = function() {
					"use strict";

					function a(t) {
						w(this, a), a.prototype.__init.call(this), this.options = _({
							console: !0,
							dom: !0,
							fetch: !0,
							history: !0,
							sentry: !0,
							xhr: !0
						}, t)
					}
					var i = a.prototype;
					return i.__init = function() {
						this.name = a.id
					}, i.setupOnce = function() {
						this.options.console && (0, P.addInstrumentationHandler)("console", s), this.options.dom && (0, P.addInstrumentationHandler)("dom", l(this.options.dom)), this.options.xhr && (0, P.addInstrumentationHandler)("xhr", v), this.options.fetch && (0, P.addInstrumentationHandler)("fetch", o), this.options.history && (0, P.addInstrumentationHandler)("history", p)
					}, i.addSentryBreadcrumb = function(e) {
						this.options.sentry && (0, f.getCurrentHub)().addBreadcrumb({
							category: "sentry.".concat(e.type === "transaction" ? "transaction" : "event"),
							event_id: e.event_id,
							level: e.level,
							message: (0, P.getEventDescription)(e)
						}, {
							event: e
						})
					}, a.__initStatic = function() {
						this.id = u
					}, a
				}();
			y.__initStatic();

			function l(a) {
				var i = function(e) {
					var n, r = typeof a == "object" ? a.serializeAttribute : void 0,
						c = typeof a == "object" && typeof a.maxStringLength == "number" ? a.maxStringLength : void 0;
					c && c > E && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("`dom.maxStringLength` cannot exceed ".concat(E, ", but a value of ").concat(c, " was configured. Sentry will use ").concat(E, " instead.")), c = E), typeof r == "string" && (r = [r]);
					try {
						n = e.event.target ? (0, P.htmlTreeAsString)(e.event.target, {
							keyAttrs: r,
							maxStringLength: c
						}) : (0, P.htmlTreeAsString)(e.event, {
							keyAttrs: r,
							maxStringLength: c
						})
					} catch (A) {
						n = "<unknown>"
					}
					n.length !== 0 && (0, f.getCurrentHub)().addBreadcrumb({
						category: "ui.".concat(e.name),
						message: n
					}, {
						event: e.event,
						name: e.name,
						global: e.global
					})
				};
				return i
			}

			function s(a) {
				for (var i = 0; i < a.args.length; i++)
					if (a.args[i] === "ref=Ref<") {
						a.args[i + 1] = "viewRef";
						break
					} var t = {
					category: "console",
					data: {
						arguments: a.args,
						logger: "console"
					},
					level: (0, P.severityLevelFromString)(a.level),
					message: (0, P.safeJoin)(a.args, " ")
				};
				if (a.level === "assert")
					if (a.args[0] === !1) t.message = "Assertion failed: ".concat((0, P.safeJoin)(a.args.slice(1), " ") || "console.assert"), t.data.arguments = a.args.slice(1);
					else return;
				(0, f.getCurrentHub)().addBreadcrumb(t, {
					input: a.args,
					level: a.level
				})
			}

			function v(a) {
				if (a.endTimestamp) {
					if (a.xhr.__sentry_own_request__) return;
					var i = a.xhr.__sentry_xhr__ || {},
						t = i.method,
						e = i.url,
						n = i.status_code,
						r = i.body;
					(0, f.getCurrentHub)().addBreadcrumb({
						category: "xhr",
						data: {
							method: t,
							url: e,
							status_code: n
						},
						type: "http"
					}, {
						xhr: a.xhr,
						input: r
					});
					return
				}
			}

			function o(a) {
				!a.endTimestamp || a.fetchData.url.match(/sentry_key/) && a.fetchData.method === "POST" || (a.error ? (0, f.getCurrentHub)().addBreadcrumb({
					category: "fetch",
					data: a.fetchData,
					level: "error",
					type: "http"
				}, {
					data: a.error,
					input: a.args
				}) : (0, f.getCurrentHub)().addBreadcrumb({
					category: "fetch",
					data: g(_({}, a.fetchData), {
						status_code: a.response.status
					}),
					type: "http"
				}, {
					input: a.args,
					response: a.response
				}))
			}

			function p(a) {
				var i = a.from,
					t = a.to,
					e = (0, P.parseUrl)(x.WINDOW.location.href),
					n = (0, P.parseUrl)(i),
					r = (0, P.parseUrl)(t);
				n.path || (n = e), e.protocol === r.protocol && e.host === r.host && (t = r.relative), e.protocol === n.protocol && e.host === n.host && (i = n.relative), (0, f.getCurrentHub)().addBreadcrumb({
					category: "navigation",
					data: {
						from: i,
						to: t
					}
				})
			}
		},
		628887: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "Dedupe", {
				enumerable: !0,
				get: function() {
					return P
				}
			});
			var N = d(974991);

			function f(u, y) {
				if (!(u instanceof y)) throw new TypeError("Cannot call a class as a function")
			}
			var P = function() {
				"use strict";

				function u() {
					f(this, u), u.prototype.__init.call(this)
				}
				var y = u.prototype;
				return y.__init = function() {
					this.name = u.id
				}, y.setupOnce = function(s, v) {
					var o = function(p) {
						var a = v().getIntegration(u);
						if (a) {
							try {
								if (x(p, a._previousEvent)) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.warn("Event dropped due to being a duplicate of previously captured event."), null
							} catch (i) {
								return a._previousEvent = p
							}
							return a._previousEvent = p
						}
						return p
					};
					o.id = this.name, s(o)
				}, u.__initStatic = function() {
					this.id = "Dedupe"
				}, u
			}();
			P.__initStatic();

			function x(u, y) {
				return y ? !!(w(u, y) || I(u, y)) : !1
			}

			function w(u, y) {
				var l = u.message,
					s = y.message;
				return !(!l && !s || l && !s || !l && s || l !== s || !h(u, y) || !_(u, y))
			}

			function I(u, y) {
				var l = g(y),
					s = g(u);
				return !(!l || !s || l.type !== s.type || l.value !== s.value || !h(u, y) || !_(u, y))
			}

			function _(u, y) {
				var l = E(u),
					s = E(y);
				if (!l && !s) return !0;
				if (l && !s || !l && s || (l = l, s = s, s.length !== l.length)) return !1;
				for (var v = 0; v < s.length; v++) {
					var o = s[v],
						p = l[v];
					if (o.filename !== p.filename || o.lineno !== p.lineno || o.colno !== p.colno || o.function !== p.function) return !1
				}
				return !0
			}

			function h(u, y) {
				var l = u.fingerprint,
					s = y.fingerprint;
				if (!l && !s) return !0;
				if (l && !s || !l && s) return !1;
				l = l, s = s;
				try {
					return l.join("") === s.join("")
				} catch (v) {
					return !1
				}
			}

			function g(u) {
				return u.exception && u.exception.values && u.exception.values[0]
			}

			function E(u) {
				var y = u.exception;
				if (y) try {
					return y.values[0].stacktrace.frames
				} catch (l) {
					return
				}
			}
		},
		888013: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "GlobalHandlers", {
				enumerable: !0,
				get: function() {
					return s
				}
			});
			var N = d(974308),
				f = d(974991),
				P = d(428799),
				x = d(115492);

			function w(r, c) {
				(c == null || c > r.length) && (c = r.length);
				for (var A = 0, S = new Array(c); A < c; A++) S[A] = r[A];
				return S
			}

			function I(r) {
				if (Array.isArray(r)) return r
			}

			function _(r, c) {
				if (!(r instanceof c)) throw new TypeError("Cannot call a class as a function")
			}

			function h(r, c, A) {
				return c in r ? Object.defineProperty(r, c, {
					value: A,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : r[c] = A, r
			}

			function g(r, c) {
				var A = r == null ? null : typeof Symbol != "undefined" && r[Symbol.iterator] || r["@@iterator"];
				if (A != null) {
					var S = [],
						m = !0,
						O = !1,
						R, j;
					try {
						for (A = A.call(r); !(m = (R = A.next()).done) && (S.push(R.value), !(c && S.length === c)); m = !0);
					} catch (H) {
						O = !0, j = H
					} finally {
						try {
							!m && A.return != null && A.return()
						} finally {
							if (O) throw j
						}
					}
					return S
				}
			}

			function E() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function u(r) {
				for (var c = 1; c < arguments.length; c++) {
					var A = arguments[c] != null ? arguments[c] : {},
						S = Object.keys(A);
					typeof Object.getOwnPropertySymbols == "function" && (S = S.concat(Object.getOwnPropertySymbols(A).filter(function(m) {
						return Object.getOwnPropertyDescriptor(A, m).enumerable
					}))), S.forEach(function(m) {
						h(r, m, A[m])
					})
				}
				return r
			}

			function y(r, c) {
				return I(r) || g(r, c) || l(r, c) || E()
			}

			function l(r, c) {
				if (!!r) {
					if (typeof r == "string") return w(r, c);
					var A = Object.prototype.toString.call(r).slice(8, -1);
					if (A === "Object" && r.constructor && (A = r.constructor.name), A === "Map" || A === "Set") return Array.from(A);
					if (A === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A)) return w(r, c)
				}
			}
			var s = function() {
				"use strict";

				function r(A) {
					_(this, r), r.prototype.__init.call(this), r.prototype.__init2.call(this), this._options = u({
						onerror: !0,
						onunhandledrejection: !0
					}, A)
				}
				var c = r.prototype;
				return c.__init = function() {
					this.name = r.id
				}, c.__init2 = function() {
					this._installFunc = {
						onerror: v,
						onunhandledrejection: o
					}
				}, c.setupOnce = function() {
					Error.stackTraceLimit = 50;
					var S = this._options;
					for (var m in S) {
						var O = this._installFunc[m];
						O && S[m] && (t(m), O(), this._installFunc[m] = void 0)
					}
				}, r.__initStatic = function() {
					this.id = "GlobalHandlers"
				}, r
			}();
			s.__initStatic();

			function v() {
				(0, f.addInstrumentationHandler)("error", function(r) {
					var c = y(n(), 3),
						A = c[0],
						S = c[1],
						m = c[2];
					if (!!A.getIntegration(s)) {
						var O = r.msg,
							R = r.url,
							j = r.line,
							H = r.column,
							$ = r.error;
						if (!((0, x.shouldIgnoreOnError)() || $ && $.__sentry_own_request__)) {
							var X = $ === void 0 && (0, f.isString)(O) ? a(O, R, j, H) : i((0, P.eventFromUnknownInput)(S, $ || O, void 0, m, !1), R, j, H);
							X.level = "error", e(A, $, X, "onerror")
						}
					}
				})
			}

			function o() {
				(0, f.addInstrumentationHandler)("unhandledrejection", function(r) {
					var c = y(n(), 3),
						A = c[0],
						S = c[1],
						m = c[2];
					if (!!A.getIntegration(s)) {
						var O = r;
						try {
							"reason" in r ? O = r.reason : "detail" in r && "reason" in r.detail && (O = r.detail.reason)
						} catch (j) {}
						if ((0, x.shouldIgnoreOnError)() || O && O.__sentry_own_request__) return !0;
						var R = (0, f.isPrimitive)(O) ? p(O) : (0, P.eventFromUnknownInput)(S, O, void 0, m, !0);
						R.level = "error", e(A, O, R, "onunhandledrejection")
					}
				})
			}

			function p(r) {
				return {
					exception: {
						values: [{
							type: "UnhandledRejection",
							value: "Non-Error promise rejection captured with value: ".concat(String(r))
						}]
					}
				}
			}

			function a(r, c, A, S) {
				var m = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,
					O = (0, f.isErrorEvent)(r) ? r.message : r,
					R = "Error",
					j = O.match(m);
				j && (R = j[1], O = j[2]);
				var H = {
					exception: {
						values: [{
							type: R,
							value: O
						}]
					}
				};
				return i(H, c, A, S)
			}

			function i(r, c, A, S) {
				var m = r.exception = r.exception || {},
					O = m.values = m.values || [],
					R = O[0] = O[0] || {},
					j = R.stacktrace = R.stacktrace || {},
					H = j.frames = j.frames || [],
					$ = isNaN(parseInt(S, 10)) ? void 0 : S,
					X = isNaN(parseInt(A, 10)) ? void 0 : A,
					J = (0, f.isString)(c) && c.length > 0 ? c : (0, f.getLocationHref)();
				return H.length === 0 && H.push({
					colno: $,
					filename: J,
					function: "?",
					in_app: !0,
					lineno: X
				}), r
			}

			function t(r) {
				(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.log("Global Handler attached: ".concat(r))
			}

			function e(r, c, A, S) {
				(0, f.addExceptionMechanism)(A, {
					handled: !1,
					type: S
				}), r.captureEvent(A, {
					originalException: c
				})
			}

			function n() {
				var r = (0, N.getCurrentHub)(),
					c = r.getClient(),
					A = c && c.getOptions() || {
						stackParser: function() {
							return []
						},
						attachStacktrace: !1
					};
				return [r, A.stackParser, A.attachStacktrace]
			}
		},
		373808: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "HttpContext", {
				enumerable: !0,
				get: function() {
					return h
				}
			});
			var N = d(974308),
				f = d(115492);

			function P(g, E) {
				if (!(g instanceof E)) throw new TypeError("Cannot call a class as a function")
			}

			function x(g, E, u) {
				return E in g ? Object.defineProperty(g, E, {
					value: u,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : g[E] = u, g
			}

			function w(g) {
				for (var E = 1; E < arguments.length; E++) {
					var u = arguments[E] != null ? arguments[E] : {},
						y = Object.keys(u);
					typeof Object.getOwnPropertySymbols == "function" && (y = y.concat(Object.getOwnPropertySymbols(u).filter(function(l) {
						return Object.getOwnPropertyDescriptor(u, l).enumerable
					}))), y.forEach(function(l) {
						x(g, l, u[l])
					})
				}
				return g
			}

			function I(g, E) {
				var u = Object.keys(g);
				if (Object.getOwnPropertySymbols) {
					var y = Object.getOwnPropertySymbols(g);
					E && (y = y.filter(function(l) {
						return Object.getOwnPropertyDescriptor(g, l).enumerable
					})), u.push.apply(u, y)
				}
				return u
			}

			function _(g, E) {
				return E = E != null ? E : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(g, Object.getOwnPropertyDescriptors(E)) : I(Object(E)).forEach(function(u) {
					Object.defineProperty(g, u, Object.getOwnPropertyDescriptor(E, u))
				}), g
			}
			var h = function() {
				"use strict";

				function g() {
					P(this, g), g.prototype.__init.call(this)
				}
				var E = g.prototype;
				return E.__init = function() {
					this.name = g.id
				}, E.setupOnce = function() {
					(0, N.addGlobalEventProcessor)(function(y) {
						if ((0, N.getCurrentHub)().getIntegration(g)) {
							if (!f.WINDOW.navigator && !f.WINDOW.location && !f.WINDOW.document) return y;
							var l = y.request && y.request.url || f.WINDOW.location && f.WINDOW.location.href,
								s = (f.WINDOW.document || {}).referrer,
								v = (f.WINDOW.navigator || {}).userAgent,
								o = w({}, y.request && y.request.headers, s && {
									Referer: s
								}, v && {
									"User-Agent": v
								}),
								p = _(w({}, l && {
									url: l
								}), {
									headers: o
								});
							return _(w({}, y), {
								request: p
							})
						}
						return y
					})
				}, g.__initStatic = function() {
					this.id = "HttpContext"
				}, g
			}();
			h.__initStatic()
		},
		711974: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(h, g) {
				for (var E in g) Object.defineProperty(h, E, {
					enumerable: !0,
					get: g[E]
				})
			}
			N(b, {
				GlobalHandlers: function() {
					return f.GlobalHandlers
				},
				TryCatch: function() {
					return P.TryCatch
				},
				Breadcrumbs: function() {
					return x.Breadcrumbs
				},
				LinkedErrors: function() {
					return w.LinkedErrors
				},
				HttpContext: function() {
					return I.HttpContext
				},
				Dedupe: function() {
					return _.Dedupe
				}
			});
			var f = d(888013),
				P = d(784663),
				x = d(364347),
				w = d(44044),
				I = d(373808),
				_ = d(628887)
		},
		44044: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(p, a) {
				for (var i in a) Object.defineProperty(p, i, {
					enumerable: !0,
					get: a[i]
				})
			}
			N(b, {
				LinkedErrors: function() {
					return s
				},
				_handler: function() {
					return v
				},
				_walkErrorTree: function() {
					return o
				}
			});
			var f = d(974308),
				P = d(974991),
				x = d(428799);

			function w(p, a) {
				(a == null || a > p.length) && (a = p.length);
				for (var i = 0, t = new Array(a); i < a; i++) t[i] = p[i];
				return t
			}

			function I(p) {
				if (Array.isArray(p)) return w(p)
			}

			function _(p, a) {
				if (!(p instanceof a)) throw new TypeError("Cannot call a class as a function")
			}

			function h(p) {
				if (typeof Symbol != "undefined" && p[Symbol.iterator] != null || p["@@iterator"] != null) return Array.from(p)
			}

			function g() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function E(p) {
				return I(p) || h(p) || u(p) || g()
			}

			function u(p, a) {
				if (!!p) {
					if (typeof p == "string") return w(p, a);
					var i = Object.prototype.toString.call(p).slice(8, -1);
					if (i === "Object" && p.constructor && (i = p.constructor.name), i === "Map" || i === "Set") return Array.from(i);
					if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return w(p, a)
				}
			}
			var y = "cause",
				l = 5,
				s = function() {
					"use strict";

					function p() {
						var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
						_(this, p), p.prototype.__init.call(this), this._key = i.key || y, this._limit = i.limit || l
					}
					var a = p.prototype;
					return a.__init = function() {
						this.name = p.id
					}, a.setupOnce = function() {
						var t = (0, f.getCurrentHub)().getClient();
						!t || (0, f.addGlobalEventProcessor)(function(e, n) {
							var r = (0, f.getCurrentHub)().getIntegration(p);
							return r ? v(t.getOptions().stackParser, r._key, r._limit, e, n) : e
						})
					}, p.__initStatic = function() {
						this.id = "LinkedErrors"
					}, p
				}();
			s.__initStatic();

			function v(p, a, i, t, e) {
				if (!t.exception || !t.exception.values || !e || !(0, P.isInstanceOf)(e.originalException, Error)) return t;
				var n = o(p, i, e.originalException, a);
				return t.exception.values = E(n).concat(E(t.exception.values)), t
			}

			function o(p, a, i, t) {
				var e = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
				if (!(0, P.isInstanceOf)(i[t], Error) || e.length + 1 >= a) return e;
				var n = (0, x.exceptionFromError)(p, i[t]);
				return o(p, a, i[t], t, [n].concat(E(e)))
			}
		},
		784663: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "TryCatch", {
				enumerable: !0,
				get: function() {
					return _
				}
			});
			var N = d(974991),
				f = d(115492);

			function P(y, l) {
				if (!(y instanceof l)) throw new TypeError("Cannot call a class as a function")
			}

			function x(y, l, s) {
				return l in y ? Object.defineProperty(y, l, {
					value: s,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : y[l] = s, y
			}

			function w(y) {
				for (var l = 1; l < arguments.length; l++) {
					var s = arguments[l] != null ? arguments[l] : {},
						v = Object.keys(s);
					typeof Object.getOwnPropertySymbols == "function" && (v = v.concat(Object.getOwnPropertySymbols(s).filter(function(o) {
						return Object.getOwnPropertyDescriptor(s, o).enumerable
					}))), v.forEach(function(o) {
						x(y, o, s[o])
					})
				}
				return y
			}
			var I = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"],
				_ = function() {
					"use strict";

					function y(s) {
						P(this, y), y.prototype.__init.call(this), this._options = w({
							XMLHttpRequest: !0,
							eventTarget: !0,
							requestAnimationFrame: !0,
							setInterval: !0,
							setTimeout: !0
						}, s)
					}
					var l = y.prototype;
					return l.__init = function() {
						this.name = y.id
					}, l.setupOnce = function() {
						this._options.setTimeout && (0, N.fill)(f.WINDOW, "setTimeout", h), this._options.setInterval && (0, N.fill)(f.WINDOW, "setInterval", h), this._options.requestAnimationFrame && (0, N.fill)(f.WINDOW, "requestAnimationFrame", g), this._options.XMLHttpRequest && "XMLHttpRequest" in f.WINDOW && (0, N.fill)(XMLHttpRequest.prototype, "send", E);
						var v = this._options.eventTarget;
						if (v) {
							var o = Array.isArray(v) ? v : I;
							o.forEach(u)
						}
					}, y.__initStatic = function() {
						this.id = "TryCatch"
					}, y
				}();
			_.__initStatic();

			function h(y) {
				return function() {
					for (var l = arguments.length, s = new Array(l), v = 0; v < l; v++) s[v] = arguments[v];
					var o = s[0];
					return s[0] = (0, f.wrap)(o, {
						mechanism: {
							data: {
								function: (0, N.getFunctionName)(y)
							},
							handled: !0,
							type: "instrument"
						}
					}), y.apply(this, s)
				}
			}

			function g(y) {
				return function(l) {
					return y.apply(this, [(0, f.wrap)(l, {
						mechanism: {
							data: {
								function: "requestAnimationFrame",
								handler: (0, N.getFunctionName)(y)
							},
							handled: !0,
							type: "instrument"
						}
					})])
				}
			}

			function E(y) {
				return function() {
					for (var l = arguments.length, s = new Array(l), v = 0; v < l; v++) s[v] = arguments[v];
					var o = this,
						p = ["onload", "onerror", "onprogress", "onreadystatechange"];
					return p.forEach(function(a) {
						a in o && typeof o[a] == "function" && (0, N.fill)(o, a, function(i) {
							var t = {
									mechanism: {
										data: {
											function: a,
											handler: (0, N.getFunctionName)(i)
										},
										handled: !0,
										type: "instrument"
									}
								},
								e = (0, N.getOriginalFunction)(i);
							return e && (t.mechanism.data.handler = (0, N.getFunctionName)(e)), (0, f.wrap)(i, t)
						})
					}), y.apply(this, s)
				}
			}

			function u(y) {
				var l = f.WINDOW,
					s = l[y] && l[y].prototype;
				!s || !s.hasOwnProperty || !s.hasOwnProperty("addEventListener") || ((0, N.fill)(s, "addEventListener", function(v) {
					return function(o, p, a) {
						try {
							typeof p.handleEvent == "function" && (p.handleEvent = (0, f.wrap)(p.handleEvent, {
								mechanism: {
									data: {
										function: "handleEvent",
										handler: (0, N.getFunctionName)(p),
										target: y
									},
									handled: !0,
									type: "instrument"
								}
							}))
						} catch (i) {}
						return v.apply(this, [o, (0, f.wrap)(p, {
							mechanism: {
								data: {
									function: "addEventListener",
									handler: (0, N.getFunctionName)(p),
									target: y
								},
								handled: !0,
								type: "instrument"
							}
						}), a])
					}
				}), (0, N.fill)(s, "removeEventListener", function(v) {
					return function(o, p, a) {
						var i = p;
						try {
							var t = i && i.__sentry_wrapped__;
							t && v.call(this, o, t, a)
						} catch (e) {}
						return v.call(this, o, i, a)
					}
				}))
			}
		},
		992316: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(j, H) {
				for (var $ in H) Object.defineProperty(j, $, {
					enumerable: !0,
					get: H[$]
				})
			}
			N(b, {
				close: function() {
					return S
				},
				defaultIntegrations: function() {
					return i
				},
				flush: function() {
					return A
				},
				forceLoad: function() {
					return r
				},
				init: function() {
					return t
				},
				lastEventId: function() {
					return n
				},
				onLoad: function() {
					return c
				},
				showReportDialog: function() {
					return e
				},
				wrap: function() {
					return m
				}
			});
			var f = d(974308),
				P = d(974991),
				x = d(434742),
				w = d(115492);
			d(711974);
			var I = d(134685);
			d(27206);
			var _ = d(784663),
				h = d(364347),
				g = d(888013),
				E = d(44044),
				u = d(628887),
				y = d(373808),
				l = d(262695),
				s = d(220122);

			function v(j, H, $) {
				return H in j ? Object.defineProperty(j, H, {
					value: $,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : j[H] = $, j
			}

			function o(j) {
				for (var H = 1; H < arguments.length; H++) {
					var $ = arguments[H] != null ? arguments[H] : {},
						X = Object.keys($);
					typeof Object.getOwnPropertySymbols == "function" && (X = X.concat(Object.getOwnPropertySymbols($).filter(function(J) {
						return Object.getOwnPropertyDescriptor($, J).enumerable
					}))), X.forEach(function(J) {
						v(j, J, $[J])
					})
				}
				return j
			}

			function p(j, H) {
				var $ = Object.keys(j);
				if (Object.getOwnPropertySymbols) {
					var X = Object.getOwnPropertySymbols(j);
					H && (X = X.filter(function(J) {
						return Object.getOwnPropertyDescriptor(j, J).enumerable
					})), $.push.apply($, X)
				}
				return $
			}

			function a(j, H) {
				return H = H != null ? H : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(j, Object.getOwnPropertyDescriptors(H)) : p(Object(H)).forEach(function($) {
					Object.defineProperty(j, $, Object.getOwnPropertyDescriptor(H, $))
				}), j
			}
			var i = [new f.Integrations.InboundFilters, new f.Integrations.FunctionToString, new _.TryCatch, new h.Breadcrumbs, new g.GlobalHandlers, new E.LinkedErrors, new u.Dedupe, new y.HttpContext];

			function t() {
				var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				j.defaultIntegrations === void 0 && (j.defaultIntegrations = i), j.release === void 0 && (typeof __SENTRY_RELEASE__ == "string" && (j.release = __SENTRY_RELEASE__), w.WINDOW.SENTRY_RELEASE && w.WINDOW.SENTRY_RELEASE.id && (j.release = w.WINDOW.SENTRY_RELEASE.id)), j.autoSessionTracking === void 0 && (j.autoSessionTracking = !0), j.sendClientReports === void 0 && (j.sendClientReports = !0);
				var H = a(o({}, j), {
					stackParser: (0, P.stackParserFromStackParserOptions)(j.stackParser || I.defaultStackParser),
					integrations: (0, f.getIntegrationsToSetup)(j),
					transport: j.transport || ((0, P.supportsFetch)() ? l.makeFetchTransport : s.makeXHRTransport)
				});
				(0, f.initAndBind)(x.BrowserClient, H), j.autoSessionTracking && R()
			}

			function e() {
				var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
					H = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, f.getCurrentHub)();
				if (!w.WINDOW.document) {
					(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.error("Global document not defined in showReportDialog call");
					return
				}
				var $ = H.getStackTop(),
					X = $.client,
					J = $.scope,
					T = j.dsn || X && X.getDsn();
				if (!T) {
					(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.error("DSN not configured for showReportDialog call");
					return
				}
				J && (j.user = o({}, J.getUser(), j.user)), j.eventId || (j.eventId = H.lastEventId());
				var B = w.WINDOW.document.createElement("script");
				B.async = !0, B.src = (0, f.getReportDialogEndpoint)(T, j), j.onLoad && (B.onload = j.onLoad);
				var G = w.WINDOW.document.head || w.WINDOW.document.body;
				G ? G.appendChild(B) : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.error("Not injecting report dialog. No injection point found in HTML")
			}

			function n() {
				return (0, f.getCurrentHub)().lastEventId()
			}

			function r() {}

			function c(j) {
				j()
			}

			function A(j) {
				var H = (0, f.getCurrentHub)().getClient();
				return H ? H.flush(j) : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("Cannot flush events. No client defined."), (0, P.resolvedSyncPromise)(!1))
			}

			function S(j) {
				var H = (0, f.getCurrentHub)().getClient();
				return H ? H.close(j) : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("Cannot flush events and disable SDK. No client defined."), (0, P.resolvedSyncPromise)(!1))
			}

			function m(j) {
				return (0, w.wrap)(j)()
			}

			function O(j) {
				j.startSession({
					ignoreDuration: !0
				}), j.captureSession()
			}

			function R() {
				if (typeof w.WINDOW.document == "undefined") {
					(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
					return
				}
				var j = (0, f.getCurrentHub)();
				!j.captureSession || (O(j), (0, P.addInstrumentationHandler)("history", function(H) {
					var $ = H.from,
						X = H.to;
					$ === void 0 || $ === X || O((0, f.getCurrentHub)())
				}))
			}
		},
		134685: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(U, W) {
				for (var D in W) Object.defineProperty(U, D, {
					enumerable: !0,
					get: W[D]
				})
			}
			N(b, {
				chromeStackLineParser: function() {
					return r
				},
				defaultStackLineParsers: function() {
					return G
				},
				defaultStackParser: function() {
					return L
				},
				geckoStackLineParser: function() {
					return m
				},
				opera10StackLineParser: function() {
					return X
				},
				opera11StackLineParser: function() {
					return B
				},
				winjsStackLineParser: function() {
					return j
				}
			});
			var f = d(974991);

			function P(U, W) {
				(W == null || W > U.length) && (W = U.length);
				for (var D = 0, Y = new Array(W); D < W; D++) Y[D] = U[D];
				return Y
			}

			function x(U) {
				if (Array.isArray(U)) return U
			}

			function w(U) {
				if (Array.isArray(U)) return P(U)
			}

			function I(U) {
				if (typeof Symbol != "undefined" && U[Symbol.iterator] != null || U["@@iterator"] != null) return Array.from(U)
			}

			function _(U, W) {
				var D = U == null ? null : typeof Symbol != "undefined" && U[Symbol.iterator] || U["@@iterator"];
				if (D != null) {
					var Y = [],
						Z = !0,
						ee = !1,
						te, oe;
					try {
						for (D = D.call(U); !(Z = (te = D.next()).done) && (Y.push(te.value), !(W && Y.length === W)); Z = !0);
					} catch (ce) {
						ee = !0, oe = ce
					} finally {
						try {
							!Z && D.return != null && D.return()
						} finally {
							if (ee) throw oe
						}
					}
					return Y
				}
			}

			function h() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function g() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function E(U, W) {
				return x(U) || _(U, W) || y(U, W) || h()
			}

			function u(U) {
				return w(U) || I(U) || y(U) || g()
			}

			function y(U, W) {
				if (!!U) {
					if (typeof U == "string") return P(U, W);
					var D = Object.prototype.toString.call(U).slice(8, -1);
					if (D === "Object" && U.constructor && (D = U.constructor.name), D === "Map" || D === "Set") return Array.from(D);
					if (D === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(D)) return P(U, W)
				}
			}
			var l = "?",
				s = 10,
				v = 20,
				o = 30,
				p = 40,
				a = 50;

			function i(U, W, D, Y) {
				var Z = {
					filename: U,
					function: W,
					in_app: !0
				};
				return D !== void 0 && (Z.lineno = D), Y !== void 0 && (Z.colno = Y), Z
			}
			var t = /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
				e = /\((\S*)(?::(\d+))(?::(\d+))\)/,
				n = function(U) {
					var W = t.exec(U);
					if (W) {
						var D = W[2] && W[2].indexOf("eval") === 0;
						if (D) {
							var Y = e.exec(W[2]);
							Y && (W[2] = Y[1], W[3] = Y[2], W[4] = Y[3])
						}
						var Z = E(F(W[1] || l, W[2]), 2),
							ee = Z[0],
							te = Z[1];
						return i(te, ee, W[3] ? +W[3] : void 0, W[4] ? +W[4] : void 0)
					}
				},
				r = [o, n],
				c = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
				A = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
				S = function(U) {
					var W = c.exec(U);
					if (W) {
						var D = W[3] && W[3].indexOf(" > eval") > -1;
						if (D) {
							var Y = A.exec(W[3]);
							Y && (W[1] = W[1] || "eval", W[3] = Y[1], W[4] = Y[2], W[5] = "")
						}
						var Z = W[3],
							ee = W[1] || l,
							te;
						return te = E(F(ee, Z), 2), ee = te[0], Z = te[1], i(Z, ee, W[4] ? +W[4] : void 0, W[5] ? +W[5] : void 0)
					}
				},
				m = [a, S],
				O = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
				R = function(U) {
					var W = O.exec(U);
					return W ? i(W[2], W[1] || l, +W[3], W[4] ? +W[4] : void 0) : void 0
				},
				j = [p, R],
				H = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
				$ = function(U) {
					var W = H.exec(U);
					return W ? i(W[2], W[3] || l, +W[1]) : void 0
				},
				X = [s, $],
				J = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
				T = function(U) {
					var W = J.exec(U);
					return W ? i(W[5], W[3] || W[4] || l, +W[1], +W[2]) : void 0
				},
				B = [v, T],
				G = [r, m, j],
				L = f.createStackParser.apply(void 0, u(G)),
				F = function(U, W) {
					var D = U.indexOf("safari-extension") !== -1,
						Y = U.indexOf("safari-web-extension") !== -1;
					return D || Y ? [U.indexOf("@") !== -1 ? U.split("@")[0] : l, D ? "safari-extension:".concat(W) : "safari-web-extension:".concat(W)] : [U, W]
				}
		},
		262695: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "makeFetchTransport", {
				enumerable: !0,
				get: function() {
					return I
				}
			});
			var N = d(974308),
				f = d(974991),
				P = d(476292);

			function x(_, h, g) {
				return h in _ ? Object.defineProperty(_, h, {
					value: g,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : _[h] = g, _
			}

			function w(_) {
				for (var h = 1; h < arguments.length; h++) {
					var g = arguments[h] != null ? arguments[h] : {},
						E = Object.keys(g);
					typeof Object.getOwnPropertySymbols == "function" && (E = E.concat(Object.getOwnPropertySymbols(g).filter(function(u) {
						return Object.getOwnPropertyDescriptor(g, u).enumerable
					}))), E.forEach(function(u) {
						x(_, u, g[u])
					})
				}
				return _
			}

			function I(_) {
				var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, P.getNativeFetchImplementation)(),
					g = function(u) {
						var y = w({
							body: u.body,
							method: "POST",
							referrerPolicy: "origin",
							headers: _.headers,
							keepalive: u.body.length <= 65536
						}, _.fetchOptions);
						try {
							return h(_.url, y).then(function(l) {
								return {
									statusCode: l.status,
									headers: {
										"x-sentry-rate-limits": l.headers.get("X-Sentry-Rate-Limits"),
										"retry-after": l.headers.get("Retry-After")
									}
								}
							})
						} catch (l) {
							return (0, P.clearCachedFetchImplementation)(), (0, f.rejectedSyncPromise)(l)
						}
					};
				return (0, N.createTransport)(_, g)
			}
		},
		27206: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(x, w) {
				for (var I in w) Object.defineProperty(x, I, {
					enumerable: !0,
					get: w[I]
				})
			}
			N(b, {
				makeFetchTransport: function() {
					return f.makeFetchTransport
				},
				makeXHRTransport: function() {
					return P.makeXHRTransport
				}
			});
			var f = d(262695),
				P = d(220122)
		},
		476292: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(_, h) {
				for (var g in h) Object.defineProperty(_, g, {
					enumerable: !0,
					get: h[g]
				})
			}
			N(b, {
				clearCachedFetchImplementation: function() {
					return I
				},
				getNativeFetchImplementation: function() {
					return w
				}
			});
			var f = d(974991),
				P = d(115492),
				x = void 0;

			function w() {
				if (x) return x;
				if ((0, f.isNativeFetch)(P.WINDOW.fetch)) return x = P.WINDOW.fetch.bind(P.WINDOW);
				var _ = P.WINDOW.document,
					h = P.WINDOW.fetch;
				if (_ && typeof _.createElement == "function") try {
					var g = _.createElement("iframe");
					g.hidden = !0, _.head.appendChild(g);
					var E = g.contentWindow;
					E && E.fetch && (h = E.fetch), _.head.removeChild(g)
				} catch (u) {
					(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", u)
				}
				return x = h.bind(P.WINDOW)
			}

			function I() {
				x = void 0
			}
		},
		220122: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "makeXHRTransport", {
				enumerable: !0,
				get: function() {
					return x
				}
			});
			var N = d(974308),
				f = d(974991),
				P = 4;

			function x(w) {
				var I = function(h) {
					return new f.SyncPromise(function(g, E) {
						var u = new XMLHttpRequest;
						u.onerror = E, u.onreadystatechange = function() {
							u.readyState === P && g({
								statusCode: u.status,
								headers: {
									"x-sentry-rate-limits": u.getResponseHeader("X-Sentry-Rate-Limits"),
									"retry-after": u.getResponseHeader("Retry-After")
								}
							})
						}, u.open("POST", w.url);
						for (var y in w.headers) Object.prototype.hasOwnProperty.call(w.headers, y) && u.setRequestHeader(y, w.headers[y]);
						u.send(h.body)
					})
				};
				return (0, N.createTransport)(w, I)
			}
		},
		332758: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(u, y) {
				for (var l in y) Object.defineProperty(u, l, {
					enumerable: !0,
					get: y[l]
				})
			}
			N(b, {
				getEnvelopeEndpointWithUrlEncodedAuth: function() {
					return g
				},
				getReportDialogEndpoint: function() {
					return E
				}
			});
			var f = d(974991);

			function P(u, y, l) {
				return y in u ? Object.defineProperty(u, y, {
					value: l,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : u[y] = l, u
			}

			function x(u) {
				for (var y = 1; y < arguments.length; y++) {
					var l = arguments[y] != null ? arguments[y] : {},
						s = Object.keys(l);
					typeof Object.getOwnPropertySymbols == "function" && (s = s.concat(Object.getOwnPropertySymbols(l).filter(function(v) {
						return Object.getOwnPropertyDescriptor(l, v).enumerable
					}))), s.forEach(function(v) {
						P(u, v, l[v])
					})
				}
				return u
			}
			var w = "7";

			function I(u) {
				var y = u.protocol ? "".concat(u.protocol, ":") : "",
					l = u.port ? ":".concat(u.port) : "";
				return "".concat(y, "//").concat(u.host).concat(l).concat(u.path ? "/".concat(u.path) : "", "/api/")
			}

			function _(u) {
				return "".concat(I(u)).concat(u.projectId, "/envelope/")
			}

			function h(u, y) {
				return (0, f.urlEncode)(x({
					sentry_key: u.publicKey,
					sentry_version: w
				}, y && {
					sentry_client: "".concat(y.name, "/").concat(y.version)
				}))
			}

			function g(u) {
				var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
					l = typeof y == "string" ? y : y.tunnel,
					s = typeof y == "string" || !y._metadata ? void 0 : y._metadata.sdk;
				return l || "".concat(_(u), "?").concat(h(u, s))
			}

			function E(u, y) {
				var l = (0, f.makeDsn)(u),
					s = "".concat(I(l), "embed/error-page/"),
					v = "dsn=".concat((0, f.dsnToString)(l));
				for (var o in y)
					if (o !== "dsn")
						if (o === "user") {
							var p = y.user;
							if (!p) continue;
							p.name && (v += "&name=".concat(encodeURIComponent(p.name))), p.email && (v += "&email=".concat(encodeURIComponent(p.email)))
						} else v += "&".concat(encodeURIComponent(o), "=").concat(encodeURIComponent(y[o]));
				return "".concat(s, "?").concat(v)
			}
		},
		714710: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "BaseClient", {
				enumerable: !0,
				get: function() {
					return c
				}
			});
			var N = d(974991),
				f = d(332758),
				P = d(79290),
				x = d(643342),
				w = d(900291),
				I = d(905794);

			function _(S, m) {
				(m == null || m > S.length) && (m = S.length);
				for (var O = 0, R = new Array(m); O < m; O++) R[O] = S[O];
				return R
			}

			function h(S) {
				if (Array.isArray(S)) return S
			}

			function g(S) {
				if (Array.isArray(S)) return _(S)
			}

			function E(S, m) {
				if (!(S instanceof m)) throw new TypeError("Cannot call a class as a function")
			}

			function u(S, m, O) {
				return m in S ? Object.defineProperty(S, m, {
					value: O,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : S[m] = O, S
			}

			function y(S, m) {
				return m != null && typeof Symbol != "undefined" && m[Symbol.hasInstance] ? !!m[Symbol.hasInstance](S) : S instanceof m
			}

			function l(S) {
				if (typeof Symbol != "undefined" && S[Symbol.iterator] != null || S["@@iterator"] != null) return Array.from(S)
			}

			function s(S, m) {
				var O = S == null ? null : typeof Symbol != "undefined" && S[Symbol.iterator] || S["@@iterator"];
				if (O != null) {
					var R = [],
						j = !0,
						H = !1,
						$, X;
					try {
						for (O = O.call(S); !(j = ($ = O.next()).done) && (R.push($.value), !(m && R.length === m)); j = !0);
					} catch (J) {
						H = !0, X = J
					} finally {
						try {
							!j && O.return != null && O.return()
						} finally {
							if (H) throw X
						}
					}
					return R
				}
			}

			function v() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function o() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function p(S) {
				for (var m = 1; m < arguments.length; m++) {
					var O = arguments[m] != null ? arguments[m] : {},
						R = Object.keys(O);
					typeof Object.getOwnPropertySymbols == "function" && (R = R.concat(Object.getOwnPropertySymbols(O).filter(function(j) {
						return Object.getOwnPropertyDescriptor(O, j).enumerable
					}))), R.forEach(function(j) {
						u(S, j, O[j])
					})
				}
				return S
			}

			function a(S, m) {
				var O = Object.keys(S);
				if (Object.getOwnPropertySymbols) {
					var R = Object.getOwnPropertySymbols(S);
					m && (R = R.filter(function(j) {
						return Object.getOwnPropertyDescriptor(S, j).enumerable
					})), O.push.apply(O, R)
				}
				return O
			}

			function i(S, m) {
				return m = m != null ? m : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(S, Object.getOwnPropertyDescriptors(m)) : a(Object(m)).forEach(function(O) {
					Object.defineProperty(S, O, Object.getOwnPropertyDescriptor(m, O))
				}), S
			}

			function t(S, m) {
				return h(S) || s(S, m) || n(S, m) || v()
			}

			function e(S) {
				return g(S) || l(S) || n(S) || o()
			}

			function n(S, m) {
				if (!!S) {
					if (typeof S == "string") return _(S, m);
					var O = Object.prototype.toString.call(S).slice(8, -1);
					if (O === "Object" && S.constructor && (O = S.constructor.name), O === "Map" || O === "Set") return Array.from(O);
					if (O === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)) return _(S, m)
				}
			}
			var r = "Not capturing exception because it's already been captured.",
				c = function() {
					"use strict";

					function S(O) {
						if (E(this, S), S.prototype.__init.call(this), S.prototype.__init2.call(this), S.prototype.__init3.call(this), S.prototype.__init4.call(this), this._options = O, O.dsn) {
							this._dsn = (0, N.makeDsn)(O.dsn);
							var R = (0, f.getEnvelopeEndpointWithUrlEncodedAuth)(this._dsn, O);
							this._transport = O.transport(i(p({
								recordDroppedEvent: this.recordDroppedEvent.bind(this)
							}, O.transportOptions), {
								url: R
							}))
						} else(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.warn("No DSN provided, client will not do anything.")
					}
					var m = S.prototype;
					return m.__init = function() {
						this._integrations = {}
					}, m.__init2 = function() {
						this._integrationsInitialized = !1
					}, m.__init3 = function() {
						this._numProcessing = 0
					}, m.__init4 = function() {
						this._outcomes = {}
					}, m.captureException = function(R, j, H) {
						var $ = this;
						if ((0, N.checkOrSetAlreadyCaught)(R)) {
							(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.log(r);
							return
						}
						var X = j && j.event_id;
						return this._process(this.eventFromException(R, j).then(function(J) {
							return $._captureEvent(J, j, H)
						}).then(function(J) {
							X = J
						})), X
					}, m.captureMessage = function(R, j, H, $) {
						var X = this,
							J = H && H.event_id,
							T = (0, N.isPrimitive)(R) ? this.eventFromMessage(String(R), j, H) : this.eventFromException(R, H);
						return this._process(T.then(function(B) {
							return X._captureEvent(B, H, $)
						}).then(function(B) {
							J = B
						})), J
					}, m.captureEvent = function(R, j, H) {
						if (j && j.originalException && (0, N.checkOrSetAlreadyCaught)(j.originalException)) {
							(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.log(r);
							return
						}
						var $ = j && j.event_id;
						return this._process(this._captureEvent(R, j, H).then(function(X) {
							$ = X
						})), $
					}, m.captureSession = function(R) {
						if (!this._isEnabled()) {
							(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.warn("SDK not enabled, will not capture session.");
							return
						}
						typeof R.release != "string" ? (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.warn("Discarded session because of missing or non-string release") : (this.sendSession(R), (0, I.updateSession)(R, {
							init: !1
						}))
					}, m.getDsn = function() {
						return this._dsn
					}, m.getOptions = function() {
						return this._options
					}, m.getTransport = function() {
						return this._transport
					}, m.flush = function(R) {
						var j = this._transport;
						return j ? this._isClientDoneProcessing(R).then(function(H) {
							return j.flush(R).then(function($) {
								return H && $
							})
						}) : (0, N.resolvedSyncPromise)(!0)
					}, m.close = function(R) {
						var j = this;
						return this.flush(R).then(function(H) {
							return j.getOptions().enabled = !1, H
						})
					}, m.setupIntegrations = function() {
						this._isEnabled() && !this._integrationsInitialized && (this._integrations = (0, x.setupIntegrations)(this._options.integrations), this._integrationsInitialized = !0)
					}, m.getIntegrationById = function(R) {
						return this._integrations[R]
					}, m.getIntegration = function(R) {
						try {
							return this._integrations[R.id] || null
						} catch (j) {
							return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.warn("Cannot retrieve integration ".concat(R.id, " from the current Client")), null
						}
					}, m.sendEvent = function(R) {
						var j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
						if (this._dsn) {
							var H = (0, P.createEventEnvelope)(R, this._dsn, this._options._metadata, this._options.tunnel),
								$ = !0,
								X = !1,
								J = void 0;
							try {
								for (var T = (j.attachments || [])[Symbol.iterator](), B; !($ = (B = T.next()).done); $ = !0) {
									var G = B.value;
									H = (0, N.addItemToEnvelope)(H, (0, N.createAttachmentEnvelopeItem)(G, this._options.transportOptions && this._options.transportOptions.textEncoder))
								}
							} catch (L) {
								X = !0, J = L
							} finally {
								try {
									!$ && T.return != null && T.return()
								} finally {
									if (X) throw J
								}
							}
							this._sendEnvelope(H)
						}
					}, m.sendSession = function(R) {
						if (this._dsn) {
							var j = (0, P.createSessionEnvelope)(R, this._dsn, this._options._metadata, this._options.tunnel);
							this._sendEnvelope(j)
						}
					}, m.recordDroppedEvent = function(R, j, H) {
						if (this._options.sendClientReports) {
							var $ = "".concat(R, ":").concat(j);
							(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.log('Adding outcome: "'.concat($, '"')), this._outcomes[$] = this._outcomes[$] + 1 || 1
						}
					}, m._updateSessionFromEvent = function(R, j) {
						var H = !1,
							$ = !1,
							X = j.exception && j.exception.values;
						if (X) {
							$ = !0;
							var J = !0,
								T = !1,
								B = void 0;
							try {
								for (var G = X[Symbol.iterator](), L; !(J = (L = G.next()).done); J = !0) {
									var F = L.value,
										U = F.mechanism;
									if (U && U.handled === !1) {
										H = !0;
										break
									}
								}
							} catch (Y) {
								T = !0, B = Y
							} finally {
								try {
									!J && G.return != null && G.return()
								} finally {
									if (T) throw B
								}
							}
						}
						var W = R.status === "ok",
							D = W && R.errors === 0 || W && H;
						D && ((0, I.updateSession)(R, i(p({}, H && {
							status: "crashed"
						}), {
							errors: R.errors || Number($ || H)
						})), this.captureSession(R))
					}, m._isClientDoneProcessing = function(R) {
						var j = this;
						return new N.SyncPromise(function(H) {
							var $ = 0,
								X = 1,
								J = setInterval(function() {
									j._numProcessing == 0 ? (clearInterval(J), H(!0)) : ($ += X, R && $ >= R && (clearInterval(J), H(!1)))
								}, X)
						})
					}, m._isEnabled = function() {
						return this.getOptions().enabled !== !1 && this._dsn !== void 0
					}, m._prepareEvent = function(R, j, H) {
						var $ = this,
							X = this.getOptions(),
							J = X.normalizeDepth,
							T = J === void 0 ? 3 : J,
							B = X.normalizeMaxBreadth,
							G = B === void 0 ? 1e3 : B,
							L = i(p({}, R), {
								event_id: R.event_id || j.event_id || (0, N.uuid4)(),
								timestamp: R.timestamp || (0, N.dateTimestampInSeconds)()
							});
						this._applyClientOptions(L), this._applyIntegrationsMetadata(L);
						var F = H;
						j.captureContext && (F = w.Scope.clone(F).update(j.captureContext));
						var U = (0, N.resolvedSyncPromise)(L);
						if (F && F.getAttachments) {
							var W = e(j.attachments || []).concat(e(F.getAttachments()));
							W.length && (j.attachments = W), U = F.applyToEvent(L, j)
						}
						return U.then(function(D) {
							return typeof T == "number" && T > 0 ? $._normalizeEvent(D, T, G) : D
						})
					}, m._normalizeEvent = function(R, j, H) {
						if (!R) return null;
						var $ = p({}, R, R.breadcrumbs && {
							breadcrumbs: R.breadcrumbs.map(function(X) {
								return p({}, X, X.data && {
									data: (0, N.normalize)(X.data, j, H)
								})
							})
						}, R.user && {
							user: (0, N.normalize)(R.user, j, H)
						}, R.contexts && {
							contexts: (0, N.normalize)(R.contexts, j, H)
						}, R.extra && {
							extra: (0, N.normalize)(R.extra, j, H)
						});
						return R.contexts && R.contexts.trace && $.contexts && ($.contexts.trace = R.contexts.trace, R.contexts.trace.data && ($.contexts.trace.data = (0, N.normalize)(R.contexts.trace.data, j, H))), R.spans && ($.spans = R.spans.map(function(X) {
							return X.data && (X.data = (0, N.normalize)(X.data, j, H)), X
						})), $
					}, m._applyClientOptions = function(R) {
						var j = this.getOptions(),
							H = j.environment,
							$ = j.release,
							X = j.dist,
							J = j.maxValueLength,
							T = J === void 0 ? 250 : J;
						"environment" in R || (R.environment = "environment" in j ? H : "production"), R.release === void 0 && $ !== void 0 && (R.release = $), R.dist === void 0 && X !== void 0 && (R.dist = X), R.message && (R.message = (0, N.truncate)(R.message, T));
						var B = R.exception && R.exception.values && R.exception.values[0];
						B && B.value && (B.value = (0, N.truncate)(B.value, T));
						var G = R.request;
						G && G.url && (G.url = (0, N.truncate)(G.url, T))
					}, m._applyIntegrationsMetadata = function(R) {
						var j = Object.keys(this._integrations);
						j.length > 0 && (R.sdk = R.sdk || {}, R.sdk.integrations = e(R.sdk.integrations || []).concat(e(j)))
					}, m._captureEvent = function(R) {
						var j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
							H = arguments.length > 2 ? arguments[2] : void 0;
						return this._processEvent(R, j, H).then(function($) {
							return $.event_id
						}, function($) {
							if (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) {
								var X = $;
								X.logLevel === "log" ? N.logger.log(X.message) : N.logger.warn(X)
							}
						})
					}, m._processEvent = function(R, j, H) {
						var $ = this,
							X = this.getOptions(),
							J = X.sampleRate;
						if (!this._isEnabled()) return (0, N.rejectedSyncPromise)(new N.SentryError("SDK not enabled, will not capture event.", "log"));
						var T = R.type === "transaction",
							B = T ? "beforeSendTransaction" : "beforeSend",
							G = X[B];
						return !T && typeof J == "number" && Math.random() > J ? (this.recordDroppedEvent("sample_rate", "error", R), (0, N.rejectedSyncPromise)(new N.SentryError("Discarding event because it's not included in the random sample (sampling rate = ".concat(J, ")"), "log"))) : this._prepareEvent(R, j, H).then(function(L) {
							if (L === null) throw $.recordDroppedEvent("event_processor", R.type || "error", R), new N.SentryError("An event processor returned `null`, will not send event.", "log");
							var F = j.data && j.data.__sentry__ === !0;
							if (F || !G) return L;
							var U = G(L, j);
							return A(U, B)
						}).then(function(L) {
							if (L === null) throw $.recordDroppedEvent("before_send", R.type || "error", R), new N.SentryError("`".concat(B, "` returned `null`, will not send event."), "log");
							var F = H && H.getSession();
							!T && F && $._updateSessionFromEvent(F, L);
							var U = L.transaction_info;
							if (T && U && L.transaction !== R.transaction) {
								var W = "custom";
								L.transaction_info = i(p({}, U), {
									source: W,
									changes: e(U.changes).concat([{
										source: W,
										timestamp: L.timestamp,
										propagations: U.propagations
									}])
								})
							}
							return $.sendEvent(L, j), L
						}).then(null, function(L) {
							throw y(L, N.SentryError) ? L : ($.captureException(L, {
								data: {
									__sentry__: !0
								},
								originalException: L
							}), new N.SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ".concat(L)))
						})
					}, m._process = function(R) {
						var j = this;
						this._numProcessing++, R.then(function(H) {
							return j._numProcessing--, H
						}, function(H) {
							return j._numProcessing--, H
						})
					}, m._sendEnvelope = function(R) {
						this._transport && this._dsn ? this._transport.send(R).then(null, function(j) {
							(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.error("Error while sending event:", j)
						}) : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && N.logger.error("Transport disabled")
					}, m._clearOutcomes = function() {
						var R = this._outcomes;
						return this._outcomes = {}, Object.keys(R).map(function(j) {
							var H = t(j.split(":"), 2),
								$ = H[0],
								X = H[1];
							return {
								reason: $,
								category: X,
								quantity: R[j]
							}
						})
					}, S
				}();

			function A(S, m) {
				var O = "`".concat(m, "` must return `null` or a valid event.");
				if ((0, N.isThenable)(S)) return S.then(function(R) {
					if (!(0, N.isPlainObject)(R) && R !== null) throw new N.SentryError(O);
					return R
				}, function(R) {
					throw new N.SentryError("`".concat(m, "` rejected with ").concat(R))
				});
				if (!(0, N.isPlainObject)(S) && S !== null) throw new N.SentryError(O);
				return S
			}
		},
		79290: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(o, p) {
				for (var a in p) Object.defineProperty(o, a, {
					enumerable: !0,
					get: p[a]
				})
			}
			N(b, {
				createEventEnvelope: function() {
					return s
				},
				createSessionEnvelope: function() {
					return l
				}
			});
			var f = d(974991);

			function P(o, p) {
				(p == null || p > o.length) && (p = o.length);
				for (var a = 0, i = new Array(p); a < p; a++) i[a] = o[a];
				return i
			}

			function x(o) {
				if (Array.isArray(o)) return P(o)
			}

			function w(o, p, a) {
				return p in o ? Object.defineProperty(o, p, {
					value: a,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : o[p] = a, o
			}

			function I(o) {
				if (typeof Symbol != "undefined" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o)
			}

			function _() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function h(o) {
				for (var p = 1; p < arguments.length; p++) {
					var a = arguments[p] != null ? arguments[p] : {},
						i = Object.keys(a);
					typeof Object.getOwnPropertySymbols == "function" && (i = i.concat(Object.getOwnPropertySymbols(a).filter(function(t) {
						return Object.getOwnPropertyDescriptor(a, t).enumerable
					}))), i.forEach(function(t) {
						w(o, t, a[t])
					})
				}
				return o
			}

			function g(o) {
				return x(o) || I(o) || E(o) || _()
			}

			function E(o, p) {
				if (!!o) {
					if (typeof o == "string") return P(o, p);
					var a = Object.prototype.toString.call(o).slice(8, -1);
					if (a === "Object" && o.constructor && (a = o.constructor.name), a === "Map" || a === "Set") return Array.from(a);
					if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return P(o, p)
				}
			}

			function u(o) {
				if (!(!o || !o.sdk)) {
					var p = o.sdk,
						a = p.name,
						i = p.version;
					return {
						name: a,
						version: i
					}
				}
			}

			function y(o, p) {
				return p && (o.sdk = o.sdk || {}, o.sdk.name = o.sdk.name || p.name, o.sdk.version = o.sdk.version || p.version, o.sdk.integrations = g(o.sdk.integrations || []).concat(g(p.integrations || [])), o.sdk.packages = g(o.sdk.packages || []).concat(g(p.packages || []))), o
			}

			function l(o, p, a, i) {
				var t = u(a),
					e = h({
						sent_at: new Date().toISOString()
					}, t && {
						sdk: t
					}, !!i && {
						dsn: (0, f.dsnToString)(p)
					}),
					n = "aggregates" in o ? [{
						type: "sessions"
					}, o] : [{
						type: "session"
					}, o];
				return (0, f.createEnvelope)(e, [n])
			}

			function s(o, p, a, i) {
				var t = u(a),
					e = o.type || "event";
				y(o, a && a.sdk);
				var n = v(o, t, i, p);
				delete o.sdkProcessingMetadata;
				var r = [{
					type: e
				}, o];
				return (0, f.createEnvelope)(n, [r])
			}

			function v(o, p, a, i) {
				var t = o.sdkProcessingMetadata && o.sdkProcessingMetadata.dynamicSamplingContext;
				return h({
					event_id: o.event_id,
					sent_at: new Date().toISOString()
				}, p && {
					sdk: p
				}, !!a && {
					dsn: (0, f.dsnToString)(i)
				}, o.type === "transaction" && t && {
					trace: (0, f.dropUndefinedKeys)(h({}, t))
				})
			}
		},
		641505: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(a, i) {
				for (var t in i) Object.defineProperty(a, t, {
					enumerable: !0,
					get: i[t]
				})
			}
			N(b, {
				addBreadcrumb: function() {
					return g
				},
				captureEvent: function() {
					return _
				},
				captureException: function() {
					return w
				},
				captureMessage: function() {
					return I
				},
				configureScope: function() {
					return h
				},
				setContext: function() {
					return E
				},
				setExtra: function() {
					return y
				},
				setExtras: function() {
					return u
				},
				setTag: function() {
					return s
				},
				setTags: function() {
					return l
				},
				setUser: function() {
					return v
				},
				startTransaction: function() {
					return p
				},
				withScope: function() {
					return o
				}
			});
			var f = d(416147);

			function P(a, i, t) {
				return i in a ? Object.defineProperty(a, i, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : a[i] = t, a
			}

			function x(a) {
				for (var i = 1; i < arguments.length; i++) {
					var t = arguments[i] != null ? arguments[i] : {},
						e = Object.keys(t);
					typeof Object.getOwnPropertySymbols == "function" && (e = e.concat(Object.getOwnPropertySymbols(t).filter(function(n) {
						return Object.getOwnPropertyDescriptor(t, n).enumerable
					}))), e.forEach(function(n) {
						P(a, n, t[n])
					})
				}
				return a
			}

			function w(a, i) {
				return (0, f.getCurrentHub)().captureException(a, {
					captureContext: i
				})
			}

			function I(a, i) {
				var t = typeof i == "string" ? i : void 0,
					e = typeof i != "string" ? {
						captureContext: i
					} : void 0;
				return (0, f.getCurrentHub)().captureMessage(a, t, e)
			}

			function _(a, i) {
				return (0, f.getCurrentHub)().captureEvent(a, i)
			}

			function h(a) {
				(0, f.getCurrentHub)().configureScope(a)
			}

			function g(a) {
				(0, f.getCurrentHub)().addBreadcrumb(a)
			}

			function E(a, i) {
				(0, f.getCurrentHub)().setContext(a, i)
			}

			function u(a) {
				(0, f.getCurrentHub)().setExtras(a)
			}

			function y(a, i) {
				(0, f.getCurrentHub)().setExtra(a, i)
			}

			function l(a) {
				(0, f.getCurrentHub)().setTags(a)
			}

			function s(a, i) {
				(0, f.getCurrentHub)().setTag(a, i)
			}

			function v(a) {
				(0, f.getCurrentHub)().setUser(a)
			}

			function o(a) {
				(0, f.getCurrentHub)().withScope(a)
			}

			function p(a, i) {
				return (0, f.getCurrentHub)().startTransaction(x({}, a), i)
			}
		},
		416147: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(t, e) {
				for (var n in e) Object.defineProperty(t, n, {
					enumerable: !0,
					get: e[n]
				})
			}
			N(b, {
				API_VERSION: function() {
					return E
				},
				Hub: function() {
					return y
				},
				getCurrentHub: function() {
					return v
				},
				getHubFromCarrier: function() {
					return a
				},
				getMainCarrier: function() {
					return l
				},
				makeMain: function() {
					return s
				},
				setHubOnCarrier: function() {
					return i
				}
			});
			var f = d(974991),
				P = d(900291),
				x = d(905794);

			function w(t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}

			function I(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n, t
			}

			function _(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e] != null ? arguments[e] : {},
						r = Object.keys(n);
					typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(c) {
						return Object.getOwnPropertyDescriptor(n, c).enumerable
					}))), r.forEach(function(c) {
						I(t, c, n[c])
					})
				}
				return t
			}

			function h(t, e) {
				var n = Object.keys(t);
				if (Object.getOwnPropertySymbols) {
					var r = Object.getOwnPropertySymbols(t);
					e && (r = r.filter(function(c) {
						return Object.getOwnPropertyDescriptor(t, c).enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function g(t, e) {
				return e = e != null ? e : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : h(Object(e)).forEach(function(n) {
					Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
				}), t
			}
			var E = 4,
				u = 100,
				y = function() {
					"use strict";

					function t(n) {
						var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new P.Scope,
							c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : E;
						w(this, t), this._version = c, t.prototype.__init.call(this), this.getStackTop().scope = r, n && this.bindClient(n)
					}
					var e = t.prototype;
					return e.__init = function() {
						this._stack = [{}]
					}, e.isOlderThan = function(r) {
						return this._version < r
					}, e.bindClient = function(r) {
						var c = this.getStackTop();
						c.client = r, r && r.setupIntegrations && r.setupIntegrations()
					}, e.pushScope = function() {
						var r = P.Scope.clone(this.getScope());
						return this.getStack().push({
							client: this.getClient(),
							scope: r
						}), r
					}, e.popScope = function() {
						return this.getStack().length <= 1 ? !1 : !!this.getStack().pop()
					}, e.withScope = function(r) {
						var c = this.pushScope();
						try {
							r(c)
						} finally {
							this.popScope()
						}
					}, e.getClient = function() {
						return this.getStackTop().client
					}, e.getScope = function() {
						return this.getStackTop().scope
					}, e.getStack = function() {
						return this._stack
					}, e.getStackTop = function() {
						return this._stack[this._stack.length - 1]
					}, e.captureException = function(r, c) {
						var A = this._lastEventId = c && c.event_id ? c.event_id : (0, f.uuid4)(),
							S = new Error("Sentry syntheticException");
						return this._withClient(function(m, O) {
							m.captureException(r, g(_({
								originalException: r,
								syntheticException: S
							}, c), {
								event_id: A
							}), O)
						}), A
					}, e.captureMessage = function(r, c, A) {
						var S = this._lastEventId = A && A.event_id ? A.event_id : (0, f.uuid4)(),
							m = new Error(r);
						return this._withClient(function(O, R) {
							O.captureMessage(r, c, g(_({
								originalException: r,
								syntheticException: m
							}, A), {
								event_id: S
							}), R)
						}), S
					}, e.captureEvent = function(r, c) {
						var A = c && c.event_id ? c.event_id : (0, f.uuid4)();
						return r.type !== "transaction" && (this._lastEventId = A), this._withClient(function(S, m) {
							S.captureEvent(r, g(_({}, c), {
								event_id: A
							}), m)
						}), A
					}, e.lastEventId = function() {
						return this._lastEventId
					}, e.addBreadcrumb = function(r, c) {
						var A = this.getStackTop(),
							S = A.scope,
							m = A.client;
						if (!(!S || !m)) {
							var O = m.getOptions && m.getOptions() || {},
								R = O.beforeBreadcrumb,
								j = R === void 0 ? null : R,
								H = O.maxBreadcrumbs,
								$ = H === void 0 ? u : H;
							if (!($ <= 0)) {
								var X = (0, f.dateTimestampInSeconds)(),
									J = _({
										timestamp: X
									}, r),
									T = j ? (0, f.consoleSandbox)(function() {
										return j(J, c)
									}) : J;
								T !== null && S.addBreadcrumb(T, $)
							}
						}
					}, e.setUser = function(r) {
						var c = this.getScope();
						c && c.setUser(r)
					}, e.setTags = function(r) {
						var c = this.getScope();
						c && c.setTags(r)
					}, e.setExtras = function(r) {
						var c = this.getScope();
						c && c.setExtras(r)
					}, e.setTag = function(r, c) {
						var A = this.getScope();
						A && A.setTag(r, c)
					}, e.setExtra = function(r, c) {
						var A = this.getScope();
						A && A.setExtra(r, c)
					}, e.setContext = function(r, c) {
						var A = this.getScope();
						A && A.setContext(r, c)
					}, e.configureScope = function(r) {
						var c = this.getStackTop(),
							A = c.scope,
							S = c.client;
						A && S && r(A)
					}, e.run = function(r) {
						var c = s(this);
						try {
							r(this)
						} finally {
							s(c)
						}
					}, e.getIntegration = function(r) {
						var c = this.getClient();
						if (!c) return null;
						try {
							return c.getIntegration(r)
						} catch (A) {
							return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Cannot retrieve integration ".concat(r.id, " from the current Hub")), null
						}
					}, e.startTransaction = function(r, c) {
						return this._callExtensionMethod("startTransaction", r, c)
					}, e.traceHeaders = function() {
						return this._callExtensionMethod("traceHeaders")
					}, e.captureSession = function() {
						var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
						if (r) return this.endSession();
						this._sendSessionUpdate()
					}, e.endSession = function() {
						var r = this.getStackTop(),
							c = r && r.scope,
							A = c && c.getSession();
						A && (0, x.closeSession)(A), this._sendSessionUpdate(), c && c.setSession()
					}, e.startSession = function(r) {
						var c = this.getStackTop(),
							A = c.scope,
							S = c.client,
							m = S && S.getOptions() || {},
							O = m.release,
							R = m.environment,
							j = (f.GLOBAL_OBJ.navigator || {}).userAgent,
							H = (0, x.makeSession)(_({
								release: O,
								environment: R
							}, A && {
								user: A.getUser()
							}, j && {
								userAgent: j
							}, r));
						if (A) {
							var $ = A.getSession && A.getSession();
							$ && $.status === "ok" && (0, x.updateSession)($, {
								status: "exited"
							}), this.endSession(), A.setSession(H)
						}
						return H
					}, e.shouldSendDefaultPii = function() {
						var r = this.getClient(),
							c = r && r.getOptions();
						return Boolean(c && c.sendDefaultPii)
					}, e._sendSessionUpdate = function() {
						var r = this.getStackTop(),
							c = r.scope,
							A = r.client;
						if (!!c) {
							var S = c.getSession();
							S && A && A.captureSession && A.captureSession(S)
						}
					}, e._withClient = function(r) {
						var c = this.getStackTop(),
							A = c.scope,
							S = c.client;
						S && r(S, A)
					}, e._callExtensionMethod = function(r) {
						for (var c = arguments.length, A = new Array(c > 1 ? c - 1 : 0), S = 1; S < c; S++) A[S - 1] = arguments[S];
						var m = l(),
							O = m.__SENTRY__;
						if (O && O.extensions && typeof O.extensions[r] == "function") return O.extensions[r].apply(this, A);
						(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Extension method ".concat(r, " couldn't be found, doing nothing."))
					}, t
				}();

			function l() {
				return f.GLOBAL_OBJ.__SENTRY__ = f.GLOBAL_OBJ.__SENTRY__ || {
					extensions: {},
					hub: void 0
				}, f.GLOBAL_OBJ
			}

			function s(t) {
				var e = l(),
					n = a(e);
				return i(e, t), n
			}

			function v() {
				var t = l();
				return (!p(t) || a(t).isOlderThan(E)) && i(t, new y), (0, f.isNodeEnv)() ? o(t) : a(t)
			}

			function o(t) {
				try {
					var e = l().__SENTRY__,
						n = e && e.extensions && e.extensions.domain && e.extensions.domain.active;
					if (!n) return a(t);
					if (!p(n) || a(n).isOlderThan(E)) {
						var r = a(t).getStackTop();
						i(n, new y(r.client, P.Scope.clone(r.scope)))
					}
					return a(n)
				} catch (c) {
					return a(t)
				}
			}

			function p(t) {
				return !!(t && t.__SENTRY__ && t.__SENTRY__.hub)
			}

			function a(t) {
				return (0, f.getGlobalSingleton)("hub", function() {
					return new y
				}, t)
			}

			function i(t, e) {
				if (!t) return !1;
				var n = t.__SENTRY__ = t.__SENTRY__ || {};
				return n.hub = e, !0
			}
		},
		974308: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(a, i) {
				for (var t in i) Object.defineProperty(a, t, {
					enumerable: !0,
					get: i[t]
				})
			}
			N(b, {
				addBreadcrumb: function() {
					return f.addBreadcrumb
				},
				captureEvent: function() {
					return f.captureEvent
				},
				captureException: function() {
					return f.captureException
				},
				captureMessage: function() {
					return f.captureMessage
				},
				configureScope: function() {
					return f.configureScope
				},
				setContext: function() {
					return f.setContext
				},
				setExtra: function() {
					return f.setExtra
				},
				setExtras: function() {
					return f.setExtras
				},
				setTag: function() {
					return f.setTag
				},
				setTags: function() {
					return f.setTags
				},
				setUser: function() {
					return f.setUser
				},
				startTransaction: function() {
					return f.startTransaction
				},
				withScope: function() {
					return f.withScope
				},
				Hub: function() {
					return P.Hub
				},
				getCurrentHub: function() {
					return P.getCurrentHub
				},
				getHubFromCarrier: function() {
					return P.getHubFromCarrier
				},
				getMainCarrier: function() {
					return P.getMainCarrier
				},
				makeMain: function() {
					return P.makeMain
				},
				setHubOnCarrier: function() {
					return P.setHubOnCarrier
				},
				closeSession: function() {
					return x.closeSession
				},
				makeSession: function() {
					return x.makeSession
				},
				updateSession: function() {
					return x.updateSession
				},
				SessionFlusher: function() {
					return w.SessionFlusher
				},
				Scope: function() {
					return I.Scope
				},
				addGlobalEventProcessor: function() {
					return I.addGlobalEventProcessor
				},
				getEnvelopeEndpointWithUrlEncodedAuth: function() {
					return _.getEnvelopeEndpointWithUrlEncodedAuth
				},
				getReportDialogEndpoint: function() {
					return _.getReportDialogEndpoint
				},
				BaseClient: function() {
					return h.BaseClient
				},
				initAndBind: function() {
					return g.initAndBind
				},
				createTransport: function() {
					return E.createTransport
				},
				SDK_VERSION: function() {
					return u.SDK_VERSION
				},
				getIntegrationsToSetup: function() {
					return y.getIntegrationsToSetup
				},
				Integrations: function() {
					return l
				},
				FunctionToString: function() {
					return s.FunctionToString
				},
				InboundFilters: function() {
					return v.InboundFilters
				}
			});
			var f = d(641505),
				P = d(416147),
				x = d(905794),
				w = d(533966),
				I = d(900291),
				_ = d(332758),
				h = d(714710),
				g = d(391015),
				E = d(424267),
				u = d(750331),
				y = d(643342),
				l = p(d(449262)),
				s = d(341869),
				v = d(887024);

			function o(a) {
				if (typeof WeakMap != "function") return null;
				var i = new WeakMap,
					t = new WeakMap;
				return (o = function(e) {
					return e ? t : i
				})(a)
			}

			function p(a, i) {
				if (!i && a && a.__esModule) return a;
				if (a === null || typeof a != "object" && typeof a != "function") return {
					default: a
				};
				var t = o(i);
				if (t && t.has(a)) return t.get(a);
				var e = {},
					n = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for (var r in a)
					if (r !== "default" && Object.prototype.hasOwnProperty.call(a, r)) {
						var c = n ? Object.getOwnPropertyDescriptor(a, r) : null;
						c && (c.get || c.set) ? Object.defineProperty(e, r, c) : e[r] = a[r]
					} return e.default = a, t && t.set(a, e), e
			}
		},
		643342: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(i, t) {
				for (var e in t) Object.defineProperty(i, e, {
					enumerable: !0,
					get: t[e]
				})
			}
			N(b, {
				getIntegrationsToSetup: function() {
					return p
				},
				installedIntegrations: function() {
					return v
				},
				setupIntegrations: function() {
					return a
				}
			});
			var f = d(974991),
				P = d(416147),
				x = d(900291);

			function w(i, t) {
				(t == null || t > i.length) && (t = i.length);
				for (var e = 0, n = new Array(t); e < t; e++) n[e] = i[e];
				return n
			}

			function I(i) {
				if (Array.isArray(i)) return i
			}

			function _(i) {
				if (Array.isArray(i)) return w(i)
			}

			function h(i) {
				if (typeof Symbol != "undefined" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i)
			}

			function g(i, t) {
				var e = i == null ? null : typeof Symbol != "undefined" && i[Symbol.iterator] || i["@@iterator"];
				if (e != null) {
					var n = [],
						r = !0,
						c = !1,
						A, S;
					try {
						for (e = e.call(i); !(r = (A = e.next()).done) && (n.push(A.value), !(t && n.length === t)); r = !0);
					} catch (m) {
						c = !0, S = m
					} finally {
						try {
							!r && e.return != null && e.return()
						} finally {
							if (c) throw S
						}
					}
					return n
				}
			}

			function E() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function u() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function y(i, t) {
				return I(i) || g(i, t) || s(i, t) || E()
			}

			function l(i) {
				return _(i) || h(i) || s(i) || u()
			}

			function s(i, t) {
				if (!!i) {
					if (typeof i == "string") return w(i, t);
					var e = Object.prototype.toString.call(i).slice(8, -1);
					if (e === "Object" && i.constructor && (e = i.constructor.name), e === "Map" || e === "Set") return Array.from(e);
					if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return w(i, t)
				}
			}
			var v = [];

			function o(i) {
				var t = {};
				return i.forEach(function(e) {
					var n = e.name,
						r = t[n];
					r && !r.isDefaultInstance && e.isDefaultInstance || (t[n] = e)
				}), Object.values(t)
			}

			function p(i) {
				var t = i.defaultIntegrations || [],
					e = i.integrations;
				t.forEach(function(m) {
					m.isDefaultInstance = !0
				});
				var n;
				Array.isArray(e) ? n = l(t).concat(l(e)) : typeof e == "function" ? n = (0, f.arrayify)(e(t)) : n = t;
				var r = o(n),
					c = r.findIndex(function(m) {
						return m.name === "Debug"
					});
				if (c !== -1) {
					var A = y(r.splice(c, 1), 1),
						S = A[0];
					r.push(S)
				}
				return r
			}

			function a(i) {
				var t = {};
				return i.forEach(function(e) {
					t[e.name] = e, v.indexOf(e.name) === -1 && (e.setupOnce(x.addGlobalEventProcessor, P.getCurrentHub), v.push(e.name), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.log("Integration installed: ".concat(e.name)))
				}), t
			}
		},
		341869: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "FunctionToString", {
				enumerable: !0,
				get: function() {
					return x
				}
			});
			var N = d(974991);

			function f(w, I) {
				if (!(w instanceof I)) throw new TypeError("Cannot call a class as a function")
			}
			var P, x = function() {
				"use strict";

				function w() {
					f(this, w), w.prototype.__init.call(this)
				}
				var I = w.prototype;
				return I.__init = function() {
					this.name = w.id
				}, I.setupOnce = function() {
					P = Function.prototype.toString, Function.prototype.toString = function() {
						for (var h = arguments.length, g = new Array(h), E = 0; E < h; E++) g[E] = arguments[E];
						var u = (0, N.getOriginalFunction)(this) || this;
						return P.apply(u, g)
					}
				}, w.__initStatic = function() {
					this.id = "FunctionToString"
				}, w
			}();
			x.__initStatic()
		},
		887024: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(e, n) {
				for (var r in n) Object.defineProperty(e, r, {
					enumerable: !0,
					get: n[r]
				})
			}
			N(b, {
				InboundFilters: function() {
					return u
				},
				_mergeOptions: function() {
					return y
				},
				_shouldDropEvent: function() {
					return l
				}
			});
			var f = d(974991);

			function P(e, n) {
				(n == null || n > e.length) && (n = e.length);
				for (var r = 0, c = new Array(n); r < n; r++) c[r] = e[r];
				return c
			}

			function x(e) {
				if (Array.isArray(e)) return P(e)
			}

			function w(e, n) {
				if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
			}

			function I(e) {
				if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
			}

			function _() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function h(e) {
				return x(e) || I(e) || g(e) || _()
			}

			function g(e, n) {
				if (!!e) {
					if (typeof e == "string") return P(e, n);
					var r = Object.prototype.toString.call(e).slice(8, -1);
					if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(r);
					if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return P(e, n)
				}
			}
			var E = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
				u = function() {
					"use strict";

					function e() {
						var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
						w(this, e), this._options = r, e.prototype.__init.call(this)
					}
					var n = e.prototype;
					return n.__init = function() {
						this.name = e.id
					}, n.setupOnce = function(c, A) {
						var S = function(m) {
							var O = A();
							if (O) {
								var R = O.getIntegration(e);
								if (R) {
									var j = O.getClient(),
										H = j ? j.getOptions() : {},
										$ = y(R._options, H);
									return l(m, $) ? null : m
								}
							}
							return m
						};
						S.id = this.name, c(S)
					}, e.__initStatic = function() {
						this.id = "InboundFilters"
					}, e
				}();
			u.__initStatic();

			function y() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
					n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				return {
					allowUrls: h(e.allowUrls || []).concat(h(n.allowUrls || [])),
					denyUrls: h(e.denyUrls || []).concat(h(n.denyUrls || [])),
					ignoreErrors: h(e.ignoreErrors || []).concat(h(n.ignoreErrors || []), h(E)),
					ignoreInternal: e.ignoreInternal !== void 0 ? e.ignoreInternal : !0
				}
			}

			function l(e, n) {
				return n.ignoreInternal && a(e) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Event dropped due to being internal Sentry Error.\nEvent: ".concat((0, f.getEventDescription)(e))), !0) : s(e, n.ignoreErrors) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: ".concat((0, f.getEventDescription)(e))), !0) : v(e, n.denyUrls) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: ".concat((0, f.getEventDescription)(e), ".\nUrl: ").concat(t(e))), !0) : o(e, n.allowUrls) ? !1 : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: ".concat((0, f.getEventDescription)(e), ".\nUrl: ").concat(t(e))), !0)
			}

			function s(e, n) {
				return !n || !n.length ? !1 : p(e).some(function(r) {
					return (0, f.stringMatchesSomePattern)(r, n)
				})
			}

			function v(e, n) {
				if (!n || !n.length) return !1;
				var r = t(e);
				return r ? (0, f.stringMatchesSomePattern)(r, n) : !1
			}

			function o(e, n) {
				if (!n || !n.length) return !0;
				var r = t(e);
				return r ? (0, f.stringMatchesSomePattern)(r, n) : !0
			}

			function p(e) {
				if (e.message) return [e.message];
				if (e.exception) try {
					var n = e.exception.values && e.exception.values[0] || {},
						r = n.type,
						c = r === void 0 ? "" : r,
						A = n.value,
						S = A === void 0 ? "" : A;
					return ["".concat(S), "".concat(c, ": ").concat(S)]
				} catch (m) {
					return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.error("Cannot extract message for event ".concat((0, f.getEventDescription)(e))), []
				}
				return []
			}

			function a(e) {
				try {
					return e.exception.values[0].type === "SentryError"
				} catch (n) {}
				return !1
			}

			function i() {
				for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = e.length - 1; n >= 0; n--) {
					var r = e[n];
					if (r && r.filename !== "<anonymous>" && r.filename !== "[native code]") return r.filename || null
				}
				return null
			}

			function t(e) {
				try {
					var n;
					try {
						n = e.exception.values[0].stacktrace.frames
					} catch (r) {}
					return n ? i(n) : null
				} catch (r) {
					return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.error("Cannot extract url for event ".concat((0, f.getEventDescription)(e))), null
				}
			}
		},
		449262: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(x, w) {
				for (var I in w) Object.defineProperty(x, I, {
					enumerable: !0,
					get: w[I]
				})
			}
			N(b, {
				FunctionToString: function() {
					return f.FunctionToString
				},
				InboundFilters: function() {
					return P.InboundFilters
				}
			});
			var f = d(341869),
				P = d(887024)
		},
		900291: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(t, e) {
				for (var n in e) Object.defineProperty(t, n, {
					enumerable: !0,
					get: e[n]
				})
			}
			N(b, {
				Scope: function() {
					return p
				},
				addGlobalEventProcessor: function() {
					return i
				}
			});
			var f = d(974991),
				P = d(905794);

			function x(t, e) {
				(e == null || e > t.length) && (e = t.length);
				for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
				return r
			}

			function w(t) {
				if (Array.isArray(t)) return x(t)
			}

			function I(t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}

			function _(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n, t
			}

			function h(t, e) {
				return e != null && typeof Symbol != "undefined" && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](t) : t instanceof e
			}

			function g(t) {
				if (typeof Symbol != "undefined" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
			}

			function E() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function u(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e] != null ? arguments[e] : {},
						r = Object.keys(n);
					typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(c) {
						return Object.getOwnPropertyDescriptor(n, c).enumerable
					}))), r.forEach(function(c) {
						_(t, c, n[c])
					})
				}
				return t
			}

			function y(t, e) {
				var n = Object.keys(t);
				if (Object.getOwnPropertySymbols) {
					var r = Object.getOwnPropertySymbols(t);
					e && (r = r.filter(function(c) {
						return Object.getOwnPropertyDescriptor(t, c).enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function l(t, e) {
				return e = e != null ? e : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : y(Object(e)).forEach(function(n) {
					Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
				}), t
			}

			function s(t) {
				return w(t) || g(t) || v(t) || E()
			}

			function v(t, e) {
				if (!!t) {
					if (typeof t == "string") return x(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(n);
					if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return x(t, e)
				}
			}
			var o = 100,
				p = function() {
					"use strict";

					function t() {
						I(this, t), this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}
					}
					var e = t.prototype;
					return e.addScopeListener = function(r) {
						this._scopeListeners.push(r)
					}, e.addEventProcessor = function(r) {
						return this._eventProcessors.push(r), this
					}, e.setUser = function(r) {
						return this._user = r || {}, this._session && (0, P.updateSession)(this._session, {
							user: r
						}), this._notifyScopeListeners(), this
					}, e.getUser = function() {
						return this._user
					}, e.getRequestSession = function() {
						return this._requestSession
					}, e.setRequestSession = function(r) {
						return this._requestSession = r, this
					}, e.setTags = function(r) {
						return this._tags = u({}, this._tags, r), this._notifyScopeListeners(), this
					}, e.setTag = function(r, c) {
						return this._tags = l(u({}, this._tags), _({}, r, c)), this._notifyScopeListeners(), this
					}, e.setExtras = function(r) {
						return this._extra = u({}, this._extra, r), this._notifyScopeListeners(), this
					}, e.setExtra = function(r, c) {
						return this._extra = l(u({}, this._extra), _({}, r, c)), this._notifyScopeListeners(), this
					}, e.setFingerprint = function(r) {
						return this._fingerprint = r, this._notifyScopeListeners(), this
					}, e.setLevel = function(r) {
						return this._level = r, this._notifyScopeListeners(), this
					}, e.setTransactionName = function(r) {
						return this._transactionName = r, this._notifyScopeListeners(), this
					}, e.setContext = function(r, c) {
						return c === null ? delete this._contexts[r] : this._contexts[r] = c, this._notifyScopeListeners(), this
					}, e.setSpan = function(r) {
						return this._span = r, this._notifyScopeListeners(), this
					}, e.getSpan = function() {
						return this._span
					}, e.getTransaction = function() {
						var r = this.getSpan();
						return r && r.transaction
					}, e.setSession = function(r) {
						return r ? this._session = r : delete this._session, this._notifyScopeListeners(), this
					}, e.getSession = function() {
						return this._session
					}, e.update = function(r) {
						if (!r) return this;
						if (typeof r == "function") {
							var c = r(this);
							return h(c, t) ? c : this
						}
						return h(r, t) ? (this._tags = u({}, this._tags, r._tags), this._extra = u({}, this._extra, r._extra), this._contexts = u({}, this._contexts, r._contexts), r._user && Object.keys(r._user).length && (this._user = r._user), r._level && (this._level = r._level), r._fingerprint && (this._fingerprint = r._fingerprint), r._requestSession && (this._requestSession = r._requestSession)) : (0, f.isPlainObject)(r) && (r = r, this._tags = u({}, this._tags, r.tags), this._extra = u({}, this._extra, r.extra), this._contexts = u({}, this._contexts, r.contexts), r.user && (this._user = r.user), r.level && (this._level = r.level), r.fingerprint && (this._fingerprint = r.fingerprint), r.requestSession && (this._requestSession = r.requestSession)), this
					}, e.clear = function() {
						return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this._attachments = [], this
					}, e.addBreadcrumb = function(r, c) {
						var A = typeof c == "number" ? c : o;
						if (A <= 0) return this;
						var S = u({
							timestamp: (0, f.dateTimestampInSeconds)()
						}, r);
						return this._breadcrumbs = s(this._breadcrumbs).concat([S]).slice(-A), this._notifyScopeListeners(), this
					}, e.clearBreadcrumbs = function() {
						return this._breadcrumbs = [], this._notifyScopeListeners(), this
					}, e.addAttachment = function(r) {
						return this._attachments.push(r), this
					}, e.getAttachments = function() {
						return this._attachments
					}, e.clearAttachments = function() {
						return this._attachments = [], this
					}, e.applyToEvent = function(r) {
						var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
						if (this._extra && Object.keys(this._extra).length && (r.extra = u({}, this._extra, r.extra)), this._tags && Object.keys(this._tags).length && (r.tags = u({}, this._tags, r.tags)), this._user && Object.keys(this._user).length && (r.user = u({}, this._user, r.user)), this._contexts && Object.keys(this._contexts).length && (r.contexts = u({}, this._contexts, r.contexts)), this._level && (r.level = this._level), this._transactionName && (r.transaction = this._transactionName), this._span) {
							r.contexts = u({
								trace: this._span.getTraceContext()
							}, r.contexts);
							var A = this._span.transaction && this._span.transaction.name;
							A && (r.tags = u({
								transaction: A
							}, r.tags))
						}
						return this._applyFingerprint(r), r.breadcrumbs = s(r.breadcrumbs || []).concat(s(this._breadcrumbs)), r.breadcrumbs = r.breadcrumbs.length > 0 ? r.breadcrumbs : void 0, r.sdkProcessingMetadata = u({}, r.sdkProcessingMetadata, this._sdkProcessingMetadata), this._notifyEventProcessors(s(a()).concat(s(this._eventProcessors)), r, c)
					}, e.setSDKProcessingMetadata = function(r) {
						return this._sdkProcessingMetadata = u({}, this._sdkProcessingMetadata, r), this
					}, e._notifyEventProcessors = function(r, c, A) {
						var S = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
							m = this;
						return new f.SyncPromise(function(O, R) {
							var j = r[S];
							if (c === null || typeof j != "function") O(c);
							else {
								var H = j(u({}, c), A);
								(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && j.id && H === null && f.logger.log('Event processor "'.concat(j.id, '" dropped event')), (0, f.isThenable)(H) ? H.then(function($) {
									return m._notifyEventProcessors(r, $, A, S + 1).then(O)
								}).then(null, R) : m._notifyEventProcessors(r, H, A, S + 1).then(O).then(null, R)
							}
						})
					}, e._notifyScopeListeners = function() {
						var r = this;
						this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach(function(c) {
							c(r)
						}), this._notifyingListeners = !1)
					}, e._applyFingerprint = function(r) {
						r.fingerprint = r.fingerprint ? (0, f.arrayify)(r.fingerprint) : [], this._fingerprint && (r.fingerprint = r.fingerprint.concat(this._fingerprint)), r.fingerprint && !r.fingerprint.length && delete r.fingerprint
					}, t.clone = function(r) {
						var c = new t;
						return r && (c._breadcrumbs = s(r._breadcrumbs), c._tags = u({}, r._tags), c._extra = u({}, r._extra), c._contexts = u({}, r._contexts), c._user = r._user, c._level = r._level, c._span = r._span, c._session = r._session, c._transactionName = r._transactionName, c._fingerprint = r._fingerprint, c._eventProcessors = s(r._eventProcessors), c._requestSession = r._requestSession, c._attachments = s(r._attachments), c._sdkProcessingMetadata = u({}, r._sdkProcessingMetadata)), c
					}, t
				}();

			function a() {
				return (0, f.getGlobalSingleton)("globalEventProcessors", function() {
					return []
				})
			}

			function i(t) {
				a().push(t)
			}
		},
		391015: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "initAndBind", {
				enumerable: !0,
				get: function() {
					return P
				}
			});
			var N = d(974991),
				f = d(416147);

			function P(x, w) {
				w.debug === !0 && (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__ ? N.logger.enable() : console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."));
				var I = (0, f.getCurrentHub)(),
					_ = I.getScope();
				_ && _.update(w.initialScope);
				var h = new x(w);
				I.bindClient(h)
			}
		},
		905794: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(_, h) {
				for (var g in h) Object.defineProperty(_, g, {
					enumerable: !0,
					get: h[g]
				})
			}
			N(b, {
				closeSession: function() {
					return w
				},
				makeSession: function() {
					return P
				},
				updateSession: function() {
					return x
				}
			});
			var f = d(974991);

			function P(_) {
				var h = (0, f.timestampInSeconds)(),
					g = {
						sid: (0, f.uuid4)(),
						init: !0,
						timestamp: h,
						started: h,
						duration: 0,
						status: "ok",
						errors: 0,
						ignoreDuration: !1,
						toJSON: function() {
							return I(g)
						}
					};
				return _ && x(g, _), g
			}

			function x(_) {
				var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (h.user && (!_.ipAddress && h.user.ip_address && (_.ipAddress = h.user.ip_address), !_.did && !h.did && (_.did = h.user.id || h.user.email || h.user.username)), _.timestamp = h.timestamp || (0, f.timestampInSeconds)(), h.ignoreDuration && (_.ignoreDuration = h.ignoreDuration), h.sid && (_.sid = h.sid.length === 32 ? h.sid : (0, f.uuid4)()), h.init !== void 0 && (_.init = h.init), !_.did && h.did && (_.did = "".concat(h.did)), typeof h.started == "number" && (_.started = h.started), _.ignoreDuration) _.duration = void 0;
				else if (typeof h.duration == "number") _.duration = h.duration;
				else {
					var g = _.timestamp - _.started;
					_.duration = g >= 0 ? g : 0
				}
				h.release && (_.release = h.release), h.environment && (_.environment = h.environment), !_.ipAddress && h.ipAddress && (_.ipAddress = h.ipAddress), !_.userAgent && h.userAgent && (_.userAgent = h.userAgent), typeof h.errors == "number" && (_.errors = h.errors), h.status && (_.status = h.status)
			}

			function w(_, h) {
				var g = {};
				h ? g = {
					status: h
				} : _.status === "ok" && (g = {
					status: "exited"
				}), x(_, g)
			}

			function I(_) {
				return (0, f.dropUndefinedKeys)({
					sid: "".concat(_.sid),
					init: _.init,
					started: new Date(_.started * 1e3).toISOString(),
					timestamp: new Date(_.timestamp * 1e3).toISOString(),
					status: _.status,
					errors: _.errors,
					did: typeof _.did == "number" || typeof _.did == "string" ? "".concat(_.did) : void 0,
					duration: _.duration,
					attrs: {
						release: _.release,
						environment: _.environment,
						ip_address: _.ipAddress,
						user_agent: _.userAgent
					}
				})
			}
		},
		533966: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "SessionFlusher", {
				enumerable: !0,
				get: function() {
					return x
				}
			});
			var N = d(974991),
				f = d(416147);

			function P(w, I) {
				if (!(w instanceof I)) throw new TypeError("Cannot call a class as a function")
			}
			var x = function() {
				"use strict";

				function w(_, h) {
					var g = this;
					P(this, w), w.prototype.__init.call(this), w.prototype.__init2.call(this), w.prototype.__init3.call(this), this._client = _, this._intervalId = setInterval(function() {
						return g.flush()
					}, this.flushTimeout * 1e3), this._sessionAttrs = h
				}
				var I = w.prototype;
				return I.__init = function() {
					this.flushTimeout = 60
				}, I.__init2 = function() {
					this._pendingAggregates = {}
				}, I.__init3 = function() {
					this._isEnabled = !0
				}, I.flush = function() {
					var h = this.getSessionAggregates();
					h.aggregates.length !== 0 && (this._pendingAggregates = {}, this._client.sendSession(h))
				}, I.getSessionAggregates = function() {
					var h = this,
						g = Object.keys(this._pendingAggregates).map(function(u) {
							return h._pendingAggregates[parseInt(u)]
						}),
						E = {
							attrs: this._sessionAttrs,
							aggregates: g
						};
					return (0, N.dropUndefinedKeys)(E)
				}, I.close = function() {
					clearInterval(this._intervalId), this._isEnabled = !1, this.flush()
				}, I.incrementSessionStatusCount = function() {
					if (!!this._isEnabled) {
						var h = (0, f.getCurrentHub)().getScope(),
							g = h && h.getRequestSession();
						g && g.status && (this._incrementSessionStatusCount(g.status, new Date), h && h.setRequestSession(void 0))
					}
				}, I._incrementSessionStatusCount = function(h, g) {
					var E = new Date(g).setSeconds(0, 0);
					this._pendingAggregates[E] = this._pendingAggregates[E] || {};
					var u = this._pendingAggregates[E];
					switch (u.started || (u.started = new Date(E).toISOString()), h) {
						case "errored":
							return u.errored = (u.errored || 0) + 1, u.errored;
						case "ok":
							return u.exited = (u.exited || 0) + 1, u.exited;
						default:
							return u.crashed = (u.crashed || 0) + 1, u.crashed
					}
				}, w
			}()
		},
		424267: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(_, h) {
				for (var g in h) Object.defineProperty(_, g, {
					enumerable: !0,
					get: h[g]
				})
			}
			N(b, {
				DEFAULT_TRANSPORT_BUFFER_SIZE: function() {
					return x
				},
				createTransport: function() {
					return w
				}
			});
			var f = d(974991);

			function P(_, h) {
				return h != null && typeof Symbol != "undefined" && h[Symbol.hasInstance] ? !!h[Symbol.hasInstance](_) : _ instanceof h
			}
			var x = 30;

			function w(_, h) {
				var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (0, f.makePromiseBuffer)(_.bufferSize || x),
					E = function(s) {
						var v = [];
						if ((0, f.forEachEnvelopeItem)(s, function(i, t) {
								var e = (0, f.envelopeItemTypeToDataCategory)(t);
								if ((0, f.isRateLimited)(u, e)) {
									var n = I(i, t);
									_.recordDroppedEvent("ratelimit_backoff", e, n)
								} else v.push(i)
							}), v.length === 0) return (0, f.resolvedSyncPromise)();
						var o = (0, f.createEnvelope)(s[0], v),
							p = function(i) {
								(0, f.forEachEnvelopeItem)(o, function(t, e) {
									var n = I(t, e);
									_.recordDroppedEvent(i, (0, f.envelopeItemTypeToDataCategory)(e), n)
								})
							},
							a = function() {
								return h({
									body: (0, f.serializeEnvelope)(o, _.textEncoder)
								}).then(function(i) {
									i.statusCode !== void 0 && (i.statusCode < 200 || i.statusCode >= 300) && (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Sentry responded with status code ".concat(i.statusCode, " to sent event.")), u = (0, f.updateRateLimits)(u, i)
								}, function(i) {
									(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.error("Failed while sending event:", i), p("network_error")
								})
							};
						return g.add(a).then(function(i) {
							return i
						}, function(i) {
							if (P(i, f.SentryError)) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.error("Skipped sending event because buffer is full."), p("queue_overflow"), (0, f.resolvedSyncPromise)();
							throw i
						})
					},
					u = {},
					y = function(l) {
						return g.drain(l)
					};
				return {
					send: E,
					flush: y
				}
			}

			function I(_, h) {
				if (!(h !== "event" && h !== "transaction")) return Array.isArray(_) ? _[1] : void 0
			}
		},
		750331: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "SDK_VERSION", {
				enumerable: !0,
				get: function() {
					return d
				}
			});
			var d = "7.24.2"
		},
		549835: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(x, w) {
				for (var I in w) Object.defineProperty(x, I, {
					enumerable: !0,
					get: w[I]
				})
			}
			d(b, {
				REACT_MOUNT_OP: function() {
					return P
				},
				REACT_RENDER_OP: function() {
					return N
				},
				REACT_UPDATE_OP: function() {
					return f
				}
			});
			var N = "ui.react.render",
				f = "ui.react.update",
				P = "ui.react.mount"
		},
		842612: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(J, T) {
				for (var B in T) Object.defineProperty(J, B, {
					enumerable: !0,
					get: T[B]
				})
			}
			N(b, {
				ErrorBoundary: function() {
					return $
				},
				UNKNOWN_COMPONENT: function() {
					return j
				},
				isAtLeastReact17: function() {
					return R
				},
				withErrorBoundary: function() {
					return X
				}
			});
			var f = d(816679),
				P = d(974991),
				x = l(d(192628)),
				w = v(d(508669));

			function I(J, T) {
				(T == null || T > J.length) && (T = J.length);
				for (var B = 0, G = new Array(T); B < T; B++) G[B] = J[B];
				return G
			}

			function _(J) {
				if (Array.isArray(J)) return I(J)
			}

			function h(J) {
				if (J === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return J
			}

			function g(J, T) {
				if (!(J instanceof T)) throw new TypeError("Cannot call a class as a function")
			}

			function E(J, T, B) {
				return T in J ? Object.defineProperty(J, T, {
					value: B,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : J[T] = B, J
			}

			function u(J) {
				return u = Object.setPrototypeOf ? Object.getPrototypeOf : function(B) {
					return B.__proto__ || Object.getPrototypeOf(B)
				}, u(J)
			}

			function y(J, T) {
				if (typeof T != "function" && T !== null) throw new TypeError("Super expression must either be null or a function");
				J.prototype = Object.create(T && T.prototype, {
					constructor: {
						value: J,
						writable: !0,
						configurable: !0
					}
				}), T && n(J, T)
			}

			function l(J) {
				return J && J.__esModule ? J : {
					default: J
				}
			}

			function s(J) {
				if (typeof WeakMap != "function") return null;
				var T = new WeakMap,
					B = new WeakMap;
				return (s = function(G) {
					return G ? B : T
				})(J)
			}

			function v(J, T) {
				if (!T && J && J.__esModule) return J;
				if (J === null || typeof J != "object" && typeof J != "function") return {
					default: J
				};
				var B = s(T);
				if (B && B.has(J)) return B.get(J);
				var G = {},
					L = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for (var F in J)
					if (F !== "default" && Object.prototype.hasOwnProperty.call(J, F)) {
						var U = L ? Object.getOwnPropertyDescriptor(J, F) : null;
						U && (U.get || U.set) ? Object.defineProperty(G, F, U) : G[F] = J[F]
					} return G.default = J, B && B.set(J, G), G
			}

			function o(J) {
				if (typeof Symbol != "undefined" && J[Symbol.iterator] != null || J["@@iterator"] != null) return Array.from(J)
			}

			function p() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function a(J) {
				for (var T = 1; T < arguments.length; T++) {
					var B = arguments[T] != null ? arguments[T] : {},
						G = Object.keys(B);
					typeof Object.getOwnPropertySymbols == "function" && (G = G.concat(Object.getOwnPropertySymbols(B).filter(function(L) {
						return Object.getOwnPropertyDescriptor(B, L).enumerable
					}))), G.forEach(function(L) {
						E(J, L, B[L])
					})
				}
				return J
			}

			function i(J, T) {
				var B = Object.keys(J);
				if (Object.getOwnPropertySymbols) {
					var G = Object.getOwnPropertySymbols(J);
					T && (G = G.filter(function(L) {
						return Object.getOwnPropertyDescriptor(J, L).enumerable
					})), B.push.apply(B, G)
				}
				return B
			}

			function t(J, T) {
				return T = T != null ? T : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(J, Object.getOwnPropertyDescriptors(T)) : i(Object(T)).forEach(function(B) {
					Object.defineProperty(J, B, Object.getOwnPropertyDescriptor(T, B))
				}), J
			}

			function e(J, T) {
				return T && (c(T) === "object" || typeof T == "function") ? T : h(J)
			}

			function n(J, T) {
				return n = Object.setPrototypeOf || function(G, L) {
					return G.__proto__ = L, G
				}, n(J, T)
			}

			function r(J) {
				return _(J) || o(J) || A(J) || p()
			}
			var c = function(J) {
				return J && typeof Symbol != "undefined" && J.constructor === Symbol ? "symbol" : typeof J
			};

			function A(J, T) {
				if (!!J) {
					if (typeof J == "string") return I(J, T);
					var B = Object.prototype.toString.call(J).slice(8, -1);
					if (B === "Object" && J.constructor && (B = J.constructor.name), B === "Map" || B === "Set") return Array.from(B);
					if (B === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B)) return I(J, T)
				}
			}

			function S() {
				if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
				} catch (J) {
					return !1
				}
			}

			function m(J) {
				var T = S();
				return function() {
					var G = u(J),
						L;
					if (T) {
						var F = u(this).constructor;
						L = Reflect.construct(G, arguments, F)
					} else L = G.apply(this, arguments);
					return e(this, L)
				}
			}
			var O = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/errorboundary.tsx";

			function R(J) {
				var T = J.match(/^([^.]+)/);
				return T !== null && parseInt(T[0]) >= 17
			}
			var j = "unknown",
				H = {
					componentStack: null,
					error: null,
					eventId: null
				},
				$ = function(J) {
					"use strict";
					y(B, J);
					var T = m(B);

					function B() {
						for (var L = arguments.length, F = new Array(L), U = 0; U < L; U++) F[U] = arguments[U];
						g(this, B);
						var W;
						return W = T.call.apply(T, [this].concat(r(F))), B.prototype.__init.call(h(W)), B.prototype.__init2.call(h(W)), W
					}
					var G = B.prototype;
					return G.__init = function() {
						this.state = H
					}, G.componentDidCatch = function(F, U) {
						var W = U.componentStack,
							D = this,
							Y = this.props,
							Z = Y.beforeCapture,
							ee = Y.onError,
							te = Y.showDialog,
							oe = Y.dialogOptions;
						(0, f.withScope)(function(ce) {
							if (R(w.version) && (0, P.isError)(F)) {
								var ae = new Error(F.message);
								ae.name = "React ErrorBoundary ".concat(ae.name), ae.stack = W, F.cause = ae
							}
							Z && Z(ce, F, W);
							var se = (0, f.captureException)(F, {
								contexts: {
									react: {
										componentStack: W
									}
								}
							});
							ee && ee(F, W, se), te && (0, f.showReportDialog)(t(a({}, oe), {
								eventId: se
							})), D.setState({
								error: F,
								componentStack: W,
								eventId: se
							})
						})
					}, G.componentDidMount = function() {
						var F = this.props.onMount;
						F && F()
					}, G.componentWillUnmount = function() {
						var F = this.state,
							U = F.error,
							W = F.componentStack,
							D = F.eventId,
							Y = this.props.onUnmount;
						Y && Y(U, W, D)
					}, G.__init2 = function() {
						var F = this;
						this.resetErrorBoundary = function() {
							var U = F.props.onReset,
								W = F.state,
								D = W.error,
								Y = W.componentStack,
								Z = W.eventId;
							U && U(D, Y, Z), F.setState(H)
						}
					}, G.render = function() {
						var F = this.props,
							U = F.fallback,
							W = F.children,
							D = this.state,
							Y = D.error,
							Z = D.componentStack,
							ee = D.eventId;
						if (Y) {
							var te = void 0;
							return typeof U == "function" ? te = U({
								error: Y,
								componentStack: Z,
								resetError: this.resetErrorBoundary,
								eventId: ee
							}) : te = U, w.isValidElement(te) ? te : (U && (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("fallback did not produce a valid ReactElement"), null)
						}
						return typeof W == "function" ? W() : W
					}, B
				}(w.Component);

			function X(J, T) {
				var B = this,
					G = J.displayName || J.name || j,
					L = function(F) {
						return w.createElement($, t(a({}, T), {
							__self: B,
							__source: {
								fileName: O,
								lineNumber: 173
							}
						}), w.createElement(J, t(a({}, F), {
							__self: B,
							__source: {
								fileName: O,
								lineNumber: 174
							}
						})))
					};
				return L.displayName = "errorBoundary(".concat(G, ")"), (0, x.default)(L, J), L
			}
		},
		98888: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(E, u) {
				for (var y in u) Object.defineProperty(E, y, {
					enumerable: !0,
					get: u[y]
				})
			}
			N(b, {
				init: function() {
					return f.init
				},
				Profiler: function() {
					return P.Profiler
				},
				useProfiler: function() {
					return P.useProfiler
				},
				withProfiler: function() {
					return P.withProfiler
				},
				ErrorBoundary: function() {
					return x.ErrorBoundary
				},
				withErrorBoundary: function() {
					return x.withErrorBoundary
				},
				createReduxEnhancer: function() {
					return w.createReduxEnhancer
				},
				reactRouterV3Instrumentation: function() {
					return I.reactRouterV3Instrumentation
				},
				reactRouterV4Instrumentation: function() {
					return _.reactRouterV4Instrumentation
				},
				reactRouterV5Instrumentation: function() {
					return _.reactRouterV5Instrumentation
				},
				withSentryRouting: function() {
					return _.withSentryRouting
				},
				reactRouterV6Instrumentation: function() {
					return h.reactRouterV6Instrumentation
				},
				withSentryReactRouterV6Routing: function() {
					return h.withSentryReactRouterV6Routing
				},
				wrapCreateBrowserRouter: function() {
					return h.wrapCreateBrowserRouter
				},
				wrapUseRoutes: function() {
					return h.wrapUseRoutes
				}
			}), g(d(816679), b);
			var f = d(935752),
				P = d(347377),
				x = d(842612),
				w = d(302789),
				I = d(76081),
				_ = d(130094),
				h = d(322705);

			function g(E, u) {
				return Object.keys(E).forEach(function(y) {
					y !== "default" && !Object.prototype.hasOwnProperty.call(u, y) && Object.defineProperty(u, y, {
						enumerable: !0,
						get: function() {
							return E[y]
						}
					})
				}), E
			}
		},
		347377: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(T, B) {
				for (var G in B) Object.defineProperty(T, G, {
					enumerable: !0,
					get: B[G]
				})
			}
			N(b, {
				Profiler: function() {
					return H
				},
				UNKNOWN_COMPONENT: function() {
					return j
				},
				getActiveTransaction: function() {
					return J
				},
				useProfiler: function() {
					return X
				},
				withProfiler: function() {
					return $
				}
			});
			var f = d(816679),
				P = d(974991),
				x = s(d(192628)),
				w = o(d(508669)),
				I = d(549835);

			function _(T, B) {
				(B == null || B > T.length) && (B = T.length);
				for (var G = 0, L = new Array(B); G < B; G++) L[G] = T[G];
				return L
			}

			function h(T) {
				if (Array.isArray(T)) return T
			}

			function g(T) {
				if (T === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return T
			}

			function E(T, B) {
				if (!(T instanceof B)) throw new TypeError("Cannot call a class as a function")
			}

			function u(T, B, G) {
				return B in T ? Object.defineProperty(T, B, {
					value: G,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : T[B] = G, T
			}

			function y(T) {
				return y = Object.setPrototypeOf ? Object.getPrototypeOf : function(G) {
					return G.__proto__ || Object.getPrototypeOf(G)
				}, y(T)
			}

			function l(T, B) {
				if (typeof B != "function" && B !== null) throw new TypeError("Super expression must either be null or a function");
				T.prototype = Object.create(B && B.prototype, {
					constructor: {
						value: T,
						writable: !0,
						configurable: !0
					}
				}), B && r(T, B)
			}

			function s(T) {
				return T && T.__esModule ? T : {
					default: T
				}
			}

			function v(T) {
				if (typeof WeakMap != "function") return null;
				var B = new WeakMap,
					G = new WeakMap;
				return (v = function(L) {
					return L ? G : B
				})(T)
			}

			function o(T, B) {
				if (!B && T && T.__esModule) return T;
				if (T === null || typeof T != "object" && typeof T != "function") return {
					default: T
				};
				var G = v(B);
				if (G && G.has(T)) return G.get(T);
				var L = {},
					F = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for (var U in T)
					if (U !== "default" && Object.prototype.hasOwnProperty.call(T, U)) {
						var W = F ? Object.getOwnPropertyDescriptor(T, U) : null;
						W && (W.get || W.set) ? Object.defineProperty(L, U, W) : L[U] = T[U]
					} return L.default = T, G && G.set(T, L), L
			}

			function p(T, B) {
				var G = T == null ? null : typeof Symbol != "undefined" && T[Symbol.iterator] || T["@@iterator"];
				if (G != null) {
					var L = [],
						F = !0,
						U = !1,
						W, D;
					try {
						for (G = G.call(T); !(F = (W = G.next()).done) && (L.push(W.value), !(B && L.length === B)); F = !0);
					} catch (Y) {
						U = !0, D = Y
					} finally {
						try {
							!F && G.return != null && G.return()
						} finally {
							if (U) throw D
						}
					}
					return L
				}
			}

			function a() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function i(T) {
				for (var B = 1; B < arguments.length; B++) {
					var G = arguments[B] != null ? arguments[B] : {},
						L = Object.keys(G);
					typeof Object.getOwnPropertySymbols == "function" && (L = L.concat(Object.getOwnPropertySymbols(G).filter(function(F) {
						return Object.getOwnPropertyDescriptor(G, F).enumerable
					}))), L.forEach(function(F) {
						u(T, F, G[F])
					})
				}
				return T
			}

			function t(T, B) {
				var G = Object.keys(T);
				if (Object.getOwnPropertySymbols) {
					var L = Object.getOwnPropertySymbols(T);
					B && (L = L.filter(function(F) {
						return Object.getOwnPropertyDescriptor(T, F).enumerable
					})), G.push.apply(G, L)
				}
				return G
			}

			function e(T, B) {
				return B = B != null ? B : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(T, Object.getOwnPropertyDescriptors(B)) : t(Object(B)).forEach(function(G) {
					Object.defineProperty(T, G, Object.getOwnPropertyDescriptor(B, G))
				}), T
			}

			function n(T, B) {
				return B && (A(B) === "object" || typeof B == "function") ? B : g(T)
			}

			function r(T, B) {
				return r = Object.setPrototypeOf || function(L, F) {
					return L.__proto__ = F, L
				}, r(T, B)
			}

			function c(T, B) {
				return h(T) || p(T, B) || S(T, B) || a()
			}
			var A = function(T) {
				return T && typeof Symbol != "undefined" && T.constructor === Symbol ? "symbol" : typeof T
			};

			function S(T, B) {
				if (!!T) {
					if (typeof T == "string") return _(T, B);
					var G = Object.prototype.toString.call(T).slice(8, -1);
					if (G === "Object" && T.constructor && (G = T.constructor.name), G === "Map" || G === "Set") return Array.from(G);
					if (G === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(G)) return _(T, B)
				}
			}

			function m() {
				if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
				} catch (T) {
					return !1
				}
			}

			function O(T) {
				var B = m();
				return function() {
					var L = y(T),
						F;
					if (B) {
						var U = y(this).constructor;
						F = Reflect.construct(L, arguments, U)
					} else F = L.apply(this, arguments);
					return n(this, F)
				}
			}
			var R = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/profiler.tsx",
				j = "unknown",
				H = function(T) {
					"use strict";
					l(G, T);
					var B = O(G);

					function G(F) {
						E(this, G);
						var U;
						U = B.call(this, F), G.prototype.__init.call(g(U)), G.prototype.__init2.call(g(U));
						var W = U.props,
							D = W.name,
							Y = W.disabled,
							Z = Y === void 0 ? !1 : Y;
						if (Z) return n(U);
						var ee = J();
						return ee && (U._mountSpan = ee.startChild({
							description: "<".concat(D, ">"),
							op: I.REACT_MOUNT_OP
						})), U
					}
					var L = G.prototype;
					return L.__init = function() {
						this._mountSpan = void 0
					}, L.__init2 = function() {
						this._updateSpan = void 0
					}, L.componentDidMount = function() {
						this._mountSpan && this._mountSpan.finish()
					}, L.shouldComponentUpdate = function(U) {
						var W = U.updateProps,
							D = U.includeUpdates,
							Y = D === void 0 ? !0 : D,
							Z = this;
						if (Y && this._mountSpan && W !== this.props.updateProps) {
							var ee = Object.keys(W).filter(function(oe) {
								return W[oe] !== Z.props.updateProps[oe]
							});
							if (ee.length > 0) {
								var te = (0, P.timestampWithMs)();
								this._updateSpan = this._mountSpan.startChild({
									data: {
										changedProps: ee
									},
									description: "<".concat(this.props.name, ">"),
									op: I.REACT_UPDATE_OP,
									startTimestamp: te
								})
							}
						}
						return !0
					}, L.componentDidUpdate = function() {
						this._updateSpan && (this._updateSpan.finish(), this._updateSpan = void 0)
					}, L.componentWillUnmount = function() {
						var U = this.props,
							W = U.name,
							D = U.includeRender,
							Y = D === void 0 ? !0 : D;
						this._mountSpan && Y && this._mountSpan.startChild({
							description: "<".concat(W, ">"),
							endTimestamp: (0, P.timestampWithMs)(),
							op: I.REACT_RENDER_OP,
							startTimestamp: this._mountSpan.endTimestamp
						})
					}, L.render = function() {
						return this.props.children
					}, G.__initStatic = function() {
						this.defaultProps = {
							disabled: !1,
							includeRender: !0,
							includeUpdates: !0
						}
					}, G
				}(w.Component);
			H.__initStatic();

			function $(T, B) {
				var G = this,
					L = B && B.name || T.displayName || T.name || j,
					F = function(U) {
						return w.createElement(H, e(i({}, B), {
							name: L,
							updateProps: U,
							__self: G,
							__source: {
								fileName: R,
								lineNumber: 144
							}
						}), w.createElement(T, e(i({}, U), {
							__self: G,
							__source: {
								fileName: R,
								lineNumber: 145
							}
						})))
					};
				return F.displayName = "profiler(".concat(L, ")"), (0, x.default)(F, T), F
			}

			function X(T) {
				var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
						disabled: !1,
						hasRenderSpan: !0
					},
					G = c(w.useState(function() {
						if (!(B && B.disabled)) {
							var F = J();
							if (F) return F.startChild({
								description: "<".concat(T, ">"),
								op: I.REACT_MOUNT_OP
							})
						}
					}), 1),
					L = G[0];
				w.useEffect(function() {
					return L && L.finish(),
						function() {
							L && B.hasRenderSpan && L.startChild({
								description: "<".concat(T, ">"),
								endTimestamp: (0, P.timestampWithMs)(),
								op: I.REACT_RENDER_OP,
								startTimestamp: L.endTimestamp
							})
						}
				}, [])
			}

			function J() {
				var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, f.getCurrentHub)();
				if (T) {
					var B = T.getScope();
					if (B) return B.getTransaction()
				}
			}
		},
		130094: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(S, m) {
				for (var O in m) Object.defineProperty(S, O, {
					enumerable: !0,
					get: m[O]
				})
			}
			N(b, {
				reactRouterV4Instrumentation: function() {
					return t
				},
				reactRouterV5Instrumentation: function() {
					return e
				},
				withSentryRouting: function() {
					return A
				}
			});
			var f = d(816679),
				P = h(d(192628)),
				x = E(d(508669));

			function w(S, m) {
				(m == null || m > S.length) && (m = S.length);
				for (var O = 0, R = new Array(m); O < m; O++) R[O] = S[O];
				return R
			}

			function I(S) {
				if (Array.isArray(S)) return S
			}

			function _(S, m, O) {
				return m in S ? Object.defineProperty(S, m, {
					value: O,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : S[m] = O, S
			}

			function h(S) {
				return S && S.__esModule ? S : {
					default: S
				}
			}

			function g(S) {
				if (typeof WeakMap != "function") return null;
				var m = new WeakMap,
					O = new WeakMap;
				return (g = function(R) {
					return R ? O : m
				})(S)
			}

			function E(S, m) {
				if (!m && S && S.__esModule) return S;
				if (S === null || typeof S != "object" && typeof S != "function") return {
					default: S
				};
				var O = g(m);
				if (O && O.has(S)) return O.get(S);
				var R = {},
					j = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for (var H in S)
					if (H !== "default" && Object.prototype.hasOwnProperty.call(S, H)) {
						var $ = j ? Object.getOwnPropertyDescriptor(S, H) : null;
						$ && ($.get || $.set) ? Object.defineProperty(R, H, $) : R[H] = S[H]
					} return R.default = S, O && O.set(S, R), R
			}

			function u(S, m) {
				var O = S == null ? null : typeof Symbol != "undefined" && S[Symbol.iterator] || S["@@iterator"];
				if (O != null) {
					var R = [],
						j = !0,
						H = !1,
						$, X;
					try {
						for (O = O.call(S); !(j = ($ = O.next()).done) && (R.push($.value), !(m && R.length === m)); j = !0);
					} catch (J) {
						H = !0, X = J
					} finally {
						try {
							!j && O.return != null && O.return()
						} finally {
							if (H) throw X
						}
					}
					return R
				}
			}

			function y() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function l(S) {
				for (var m = 1; m < arguments.length; m++) {
					var O = arguments[m] != null ? arguments[m] : {},
						R = Object.keys(O);
					typeof Object.getOwnPropertySymbols == "function" && (R = R.concat(Object.getOwnPropertySymbols(O).filter(function(j) {
						return Object.getOwnPropertyDescriptor(O, j).enumerable
					}))), R.forEach(function(j) {
						_(S, j, O[j])
					})
				}
				return S
			}

			function s(S, m) {
				var O = Object.keys(S);
				if (Object.getOwnPropertySymbols) {
					var R = Object.getOwnPropertySymbols(S);
					m && (R = R.filter(function(j) {
						return Object.getOwnPropertyDescriptor(S, j).enumerable
					})), O.push.apply(O, R)
				}
				return O
			}

			function v(S, m) {
				return m = m != null ? m : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(S, Object.getOwnPropertyDescriptors(m)) : s(Object(m)).forEach(function(O) {
					Object.defineProperty(S, O, Object.getOwnPropertyDescriptor(m, O))
				}), S
			}

			function o(S, m) {
				return I(S) || u(S, m) || p(S, m) || y()
			}

			function p(S, m) {
				if (!!S) {
					if (typeof S == "string") return w(S, m);
					var O = Object.prototype.toString.call(S).slice(8, -1);
					if (O === "Object" && S.constructor && (O = S.constructor.name), O === "Map" || O === "Set") return Array.from(O);
					if (O === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)) return w(S, m)
				}
			}
			var a = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/reactrouter.tsx",
				i;

			function t(S, m, O) {
				return n(S, "react-router-v4", m, O)
			}

			function e(S, m, O) {
				return n(S, "react-router-v5", m, O)
			}

			function n(S, m) {
				var O = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [],
					R = arguments.length > 3 ? arguments[3] : void 0,
					j = function() {
						if (S && S.location) return S.location.pathname;
						if (f.WINDOW && f.WINDOW.location) return f.WINDOW.location.pathname
					},
					H = function(J) {
						if (O.length === 0 || !R) return [J, "url"];
						for (var T = r(O, J, R), B = 0; B < T.length; B++)
							if (T[B].match.isExact) return [T[B].match.path, "route"];
						return [J, "url"]
					},
					$ = {
						"routing.instrumentation": m
					};
				return function(X) {
					var J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
						T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
						B = j();
					if (J && B) {
						var G = o(H(B), 2),
							L = G[0],
							F = G[1];
						i = X({
							name: L,
							op: "pageload",
							tags: $,
							metadata: {
								source: F
							}
						})
					}
					T && S.listen && S.listen(function(U, W) {
						if (W && (W === "PUSH" || W === "POP")) {
							i && i.finish();
							var D = o(H(U.pathname), 2),
								Y = D[0],
								Z = D[1];
							i = X({
								name: Y,
								op: "navigation",
								tags: $,
								metadata: {
									source: Z
								}
							})
						}
					})
				}
			}

			function r(S, m, O) {
				var R = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
				return S.some(function(j) {
					var H = j.path ? O(m, j) : R.length ? R[R.length - 1].match : c(m);
					return H && (R.push({
						route: j,
						match: H
					}), j.routes && r(j.routes, m, O, R)), !!H
				}), R
			}

			function c(S) {
				return {
					path: "/",
					url: "/",
					params: {},
					isExact: S === "/"
				}
			}

			function A(S) {
				var m = this,
					O = S.displayName || S.name,
					R = function(j) {
						return i && j && j.computedMatch && j.computedMatch.isExact && i.setName(j.computedMatch.path, "route"), x.createElement(S, v(l({}, j), {
							__self: m,
							__source: {
								fileName: a,
								lineNumber: 174
							}
						}))
					};
				return R.displayName = "sentryRoute(".concat(O, ")"), (0, P.default)(R, S), R
			}
		},
		76081: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "reactRouterV3Instrumentation", {
				enumerable: !0,
				get: function() {
					return f
				}
			});
			var N = d(816679);

			function f(w, I, _) {
				return function(h) {
					var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
						E = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
						u, y;
					g && N.WINDOW && N.WINDOW.location && P(I, N.WINDOW.location, _, function(l) {
						var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "url";
						y = l, u = h({
							name: y,
							op: "pageload",
							tags: {
								"routing.instrumentation": "react-router-v3"
							},
							metadata: {
								source: s
							}
						})
					}), E && w.listen && w.listen(function(l) {
						if (l.action === "PUSH" || l.action === "POP") {
							u && u.finish();
							var s = {
								"routing.instrumentation": "react-router-v3"
							};
							y && (s.from = y), P(I, l, _, function(v) {
								var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "url";
								y = v, u = h({
									name: y,
									op: "navigation",
									tags: s,
									metadata: {
										source: o
									}
								})
							})
						}
					})
				}
			}

			function P(w, I, _, h) {
				var g = I.pathname;
				_({
					location: I,
					routes: w
				}, function(E, u, y) {
					if (E || !y) return h(g);
					var l = x(y.routes || []);
					return l.length === 0 || l === "/*" ? h(g) : (g = l, h(g, "route"))
				})
			}

			function x(w) {
				if (!Array.isArray(w) || w.length === 0) return "";
				for (var I = w.filter(function(E) {
						return !!E.path
					}), _ = -1, h = I.length - 1; h >= 0; h--) {
					var g = I[h];
					if (g.path && g.path.startsWith("/")) {
						_ = h;
						break
					}
				}
				return I.slice(_).filter(function(E) {
					var u = E.path;
					return !!u
				}).map(function(E) {
					var u = E.path;
					return u
				}).join("")
			}
		},
		322705: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(L, F) {
				for (var U in F) Object.defineProperty(L, U, {
					enumerable: !0,
					get: F[U]
				})
			}
			N(b, {
				reactRouterV6Instrumentation: function() {
					return H
				},
				withSentryReactRouterV6Routing: function() {
					return T
				},
				wrapCreateBrowserRouter: function() {
					return G
				},
				wrapUseRoutes: function() {
					return B
				}
			});
			var f = d(816679),
				P = d(974991),
				x = E(d(192628)),
				w = E(d(508669));

			function I(L, F) {
				(F == null || F > L.length) && (F = L.length);
				for (var U = 0, W = new Array(F); U < F; U++) W[U] = L[U];
				return W
			}

			function _(L) {
				if (Array.isArray(L)) return L
			}

			function h(L) {
				if (Array.isArray(L)) return I(L)
			}

			function g(L, F, U) {
				return F in L ? Object.defineProperty(L, F, {
					value: U,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : L[F] = U, L
			}

			function E(L) {
				return L && L.__esModule ? L : {
					default: L
				}
			}

			function u(L) {
				if (typeof Symbol != "undefined" && L[Symbol.iterator] != null || L["@@iterator"] != null) return Array.from(L)
			}

			function y(L, F) {
				var U = L == null ? null : typeof Symbol != "undefined" && L[Symbol.iterator] || L["@@iterator"];
				if (U != null) {
					var W = [],
						D = !0,
						Y = !1,
						Z, ee;
					try {
						for (U = U.call(L); !(D = (Z = U.next()).done) && (W.push(Z.value), !(F && W.length === F)); D = !0);
					} catch (te) {
						Y = !0, ee = te
					} finally {
						try {
							!D && U.return != null && U.return()
						} finally {
							if (Y) throw ee
						}
					}
					return W
				}
			}

			function l() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function s() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function v(L) {
				for (var F = 1; F < arguments.length; F++) {
					var U = arguments[F] != null ? arguments[F] : {},
						W = Object.keys(U);
					typeof Object.getOwnPropertySymbols == "function" && (W = W.concat(Object.getOwnPropertySymbols(U).filter(function(D) {
						return Object.getOwnPropertyDescriptor(U, D).enumerable
					}))), W.forEach(function(D) {
						g(L, D, U[D])
					})
				}
				return L
			}

			function o(L, F) {
				var U = Object.keys(L);
				if (Object.getOwnPropertySymbols) {
					var W = Object.getOwnPropertySymbols(L);
					F && (W = W.filter(function(D) {
						return Object.getOwnPropertyDescriptor(L, D).enumerable
					})), U.push.apply(U, W)
				}
				return U
			}

			function p(L, F) {
				return F = F != null ? F : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(L, Object.getOwnPropertyDescriptors(F)) : o(Object(F)).forEach(function(U) {
					Object.defineProperty(L, U, Object.getOwnPropertyDescriptor(F, U))
				}), L
			}

			function a(L, F) {
				return _(L) || y(L, F) || t(L, F) || l()
			}

			function i(L) {
				return h(L) || u(L) || t(L) || s()
			}

			function t(L, F) {
				if (!!L) {
					if (typeof L == "string") return I(L, F);
					var U = Object.prototype.toString.call(L).slice(8, -1);
					if (U === "Object" && L.constructor && (U = L.constructor.name), U === "Map" || U === "Set") return Array.from(U);
					if (U === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(U)) return I(L, F)
				}
			}
			var e = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/reactrouterv6.tsx",
				n, r, c, A, S, m, O, R, j = {
					"routing.instrumentation": "react-router-v6"
				};

			function H(L, F, U, W, D) {
				return function(Y) {
					var Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
						ee = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
						te = f.WINDOW && f.WINDOW.location && f.WINDOW.location.pathname;
					Z && te && (n = Y({
						name: te,
						op: "pageload",
						tags: j,
						metadata: {
							source: "url"
						}
					})), r = L, c = F, A = U, m = D, S = W, O = Y, R = ee
				}
			}

			function $(L, F, U) {
				if (!L || L.length === 0) return [F.pathname, "url"];
				var W = "";
				if (U)
					for (var D = 0; D < U.length; D++) {
						var Y = U[D],
							Z = Y.route;
						if (Z) {
							if (Z.index) return [Y.pathname, "route"];
							var ee = Z.path;
							if (ee) {
								var te = ee[0] === "/" || W[W.length - 1] === "/" ? ee : "/".concat(ee);
								if (W += te, Y.pathname === F.pathname) return (0, P.getNumberOfUrlSegments)(W) !== (0, P.getNumberOfUrlSegments)(Y.pathname) && W.slice(-2) !== "/*" ? [te, "route"] : [W, "route"]
							}
						}
					}
				return [F.pathname, "url"]
			}

			function X(L, F, U) {
				var W = Array.isArray(U) ? U : m(F, L);
				if (n && W) {
					var D;
					(D = n).setName.apply(D, i($(F, L, W)))
				}
			}

			function J(L, F, U, W, D) {
				if (W) {
					n && n.finish();
					return
				}
				var Y = Array.isArray(D) ? D : m(F, L);
				if (R && (U === "PUSH" || U === "POP") && Y) {
					n && n.finish();
					var Z = a($(F, L, Y), 2),
						ee = Z[0],
						te = Z[1];
					n = O({
						name: ee,
						op: "navigation",
						tags: j,
						metadata: {
							source: te
						}
					})
				}
			}

			function T(L) {
				var F = this;
				if (!r || !c || !A || !S || !m || !O) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("reactRouterV6Instrumentation was unable to wrap Routes because of one or more missing parameters.\n      useEffect: ".concat(r, ". useLocation: ").concat(c, ". useNavigationType: ").concat(A, ".\n      createRoutesFromChildren: ").concat(S, ". matchRoutes: ").concat(m, ". customStartTransaction: ").concat(O, ".")), L;
				var U = !1,
					W, D = function(Y) {
						var Z = c(),
							ee = A();
						return r(function() {
							W = S(Y.children), U = !0, X(Z, W)
						}, [Y.children]), r(function() {
							J(Z, W, ee, U)
						}, [Y.children, Z, ee, U]), U = !1, w.default.createElement(L, p(v({}, Y), {
							__self: F,
							__source: {
								fileName: e,
								lineNumber: 207
							}
						}))
					};
				return (0, x.default)(D, L), D
			}

			function B(L) {
				var F = this;
				if (!r || !c || !A || !m || !O) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("reactRouterV6Instrumentation was unable to wrap `useRoutes` because of one or more missing parameters."), L;
				var U = !1;
				return function(W, D) {
					var Y = function(Z) {
						var ee = L(W, D),
							te = typeof D == "string" ? {
								pathname: D
							} : D,
							oe = te || c(),
							ce = A();
						return r(function() {
							U = !0, X(oe, W)
						}, [Z]), r(function() {
							J(oe, W, ce, U)
						}, [Z, oe, ce, U]), U = !1, ee
					};
					return w.default.createElement(Y, {
						__self: F,
						__source: {
							fileName: e,
							lineNumber: 253
						}
					})
				}
			}

			function G(L) {
				return function(F, U) {
					var W = L(F, U);
					return W.state.historyAction === "POP" && n && X(W.state.location, F), W.subscribe(function(D) {
						var Y = D.location;
						R && (D.historyAction === "PUSH" || D.historyAction === "POP") && n && J(Y, F, D.historyAction, !1)
					}), W
				}
			}
		},
		302789: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "createReduxEnhancer", {
				enumerable: !0,
				get: function() {
					return _
				}
			});
			var N = d(816679);

			function f(h, g, E) {
				return g in h ? Object.defineProperty(h, g, {
					value: E,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : h[g] = E, h
			}

			function P(h) {
				for (var g = 1; g < arguments.length; g++) {
					var E = arguments[g] != null ? arguments[g] : {},
						u = Object.keys(E);
					typeof Object.getOwnPropertySymbols == "function" && (u = u.concat(Object.getOwnPropertySymbols(E).filter(function(y) {
						return Object.getOwnPropertyDescriptor(E, y).enumerable
					}))), u.forEach(function(y) {
						f(h, y, E[y])
					})
				}
				return h
			}
			var x = "redux.action",
				w = "info",
				I = {
					actionTransformer: function(h) {
						return h
					},
					stateTransformer: function(h) {
						return h || null
					}
				};

			function _(h) {
				var g = P({}, I, h);
				return function(E) {
					return function(u, y) {
						var l = function(s, v) {
							var o = u(s, v);
							return (0, N.configureScope)(function(p) {
								var a = g.actionTransformer(v);
								typeof a != "undefined" && a !== null && p.addBreadcrumb({
									category: x,
									data: a,
									type: w
								});
								var i = g.stateTransformer(o);
								typeof i != "undefined" && i !== null ? p.setContext("state", {
									state: {
										type: "redux",
										value: i
									}
								}) : p.setContext("state", null);
								var t = g.configureScopeWithState;
								typeof t == "function" && t(p, o)
							}), o
						};
						return E(l, y)
					}
				}
			}
		},
		935752: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "init", {
				enumerable: !0,
				get: function() {
					return f
				}
			});
			var N = d(816679);

			function f(P) {
				P._metadata = P._metadata || {}, P._metadata.sdk = P._metadata.sdk || {
					name: "sentry.javascript.react",
					packages: [{
						name: "npm:@sentry/react",
						version: N.SDK_VERSION
					}],
					version: N.SDK_VERSION
				}, (0, N.init)(P)
			}
		},
		322398: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(t, e) {
				for (var n in e) Object.defineProperty(t, n, {
					enumerable: !0,
					get: e[n]
				})
			}
			N(b, {
				BAGGAGE_HEADER_NAME: function() {
					return y
				},
				MAX_BAGGAGE_STRING_LENGTH: function() {
					return v
				},
				SENTRY_BAGGAGE_KEY_PREFIX: function() {
					return l
				},
				SENTRY_BAGGAGE_KEY_PREFIX_REGEX: function() {
					return s
				},
				baggageHeaderToDynamicSamplingContext: function() {
					return o
				},
				dynamicSamplingContextToSentryBaggageHeader: function() {
					return p
				}
			});
			var f = d(51855),
				P = d(755770);

			function x(t, e) {
				(e == null || e > t.length) && (e = t.length);
				for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
				return r
			}

			function w(t) {
				if (Array.isArray(t)) return t
			}

			function I(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n, t
			}

			function _(t, e) {
				var n = t == null ? null : typeof Symbol != "undefined" && t[Symbol.iterator] || t["@@iterator"];
				if (n != null) {
					var r = [],
						c = !0,
						A = !1,
						S, m;
					try {
						for (n = n.call(t); !(c = (S = n.next()).done) && (r.push(S.value), !(e && r.length === e)); c = !0);
					} catch (O) {
						A = !0, m = O
					} finally {
						try {
							!c && n.return != null && n.return()
						} finally {
							if (A) throw m
						}
					}
					return r
				}
			}

			function h() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function g(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e] != null ? arguments[e] : {},
						r = Object.keys(n);
					typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(c) {
						return Object.getOwnPropertyDescriptor(n, c).enumerable
					}))), r.forEach(function(c) {
						I(t, c, n[c])
					})
				}
				return t
			}

			function E(t, e) {
				return w(t) || _(t, e) || u(t, e) || h()
			}

			function u(t, e) {
				if (!!t) {
					if (typeof t == "string") return x(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(n);
					if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return x(t, e)
				}
			}
			var y = "baggage",
				l = "sentry-",
				s = /^sentry-/,
				v = 8192;

			function o(t) {
				if (!(!(0, f.isString)(t) && !Array.isArray(t))) {
					var e = {};
					if (Array.isArray(t)) e = t.reduce(function(r, c) {
						var A = a(c);
						return g({}, r, A)
					}, {});
					else {
						if (!t) return;
						e = a(t)
					}
					var n = Object.entries(e).reduce(function(r, c) {
						var A = E(c, 2),
							S = A[0],
							m = A[1];
						if (S.match(s)) {
							var O = S.slice(l.length);
							r[O] = m
						}
						return r
					}, {});
					if (Object.keys(n).length > 0) return n
				}
			}

			function p(t) {
				var e = Object.entries(t).reduce(function(n, r) {
					var c = E(r, 2),
						A = c[0],
						S = c[1];
					return S && (n["".concat(l).concat(A)] = S), n
				}, {});
				return i(e)
			}

			function a(t) {
				return t.split(",").map(function(e) {
					return e.split("=").map(function(n) {
						return decodeURIComponent(n.trim())
					})
				}).reduce(function(e, n) {
					var r = E(n, 2),
						c = r[0],
						A = r[1];
					return e[c] = A, e
				}, {})
			}

			function i(t) {
				if (Object.keys(t).length !== 0) return Object.entries(t).reduce(function(e, n, r) {
					var c = E(n, 2),
						A = c[0],
						S = c[1],
						m = "".concat(encodeURIComponent(A), "=").concat(encodeURIComponent(S)),
						O = r === 0 ? m : "".concat(e, ",").concat(m);
					return O.length > v ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && P.logger.warn("Not adding key: ".concat(A, " with val: ").concat(S, " to baggage header due to exceeding baggage size limits.")), e) : O
				}, "")
			}
		},
		416742: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(E, u) {
				for (var y in u) Object.defineProperty(E, y, {
					enumerable: !0,
					get: u[y]
				})
			}
			N(b, {
				getDomElement: function() {
					return g
				},
				getLocationHref: function() {
					return h
				},
				htmlTreeAsString: function() {
					return I
				}
			});
			var f = d(51855),
				P = d(649097),
				x = (0, P.getGlobalObject)(),
				w = 80;

			function I(E) {
				var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				try {
					for (var y = E, l = 5, s = [], v = 0, o = 0, p = " > ", a = p.length, i, t = Array.isArray(u) ? u : u.keyAttrs, e = !Array.isArray(u) && u.maxStringLength || w; y && v++ < l && (i = _(y, t), !(i === "html" || v > 1 && o + s.length * a + i.length >= e));) s.push(i), o += i.length, y = y.parentNode;
					return s.reverse().join(p)
				} catch (n) {
					return "<unknown>"
				}
			}

			function _(E, u) {
				var y = E,
					l = [],
					s, v, o, p, a;
				if (!y || !y.tagName) return "";
				l.push(y.tagName.toLowerCase());
				var i = u && u.length ? u.filter(function(e) {
					return y.getAttribute(e)
				}).map(function(e) {
					return [e, y.getAttribute(e)]
				}) : null;
				if (i && i.length) i.forEach(function(e) {
					l.push("[".concat(e[0], '="').concat(e[1], '"]'))
				});
				else if (y.id && l.push("#".concat(y.id)), s = y.className, s && (0, f.isString)(s))
					for (v = s.split(/\s+/), a = 0; a < v.length; a++) l.push(".".concat(v[a]));
				var t = ["type", "name", "title", "alt"];
				for (a = 0; a < t.length; a++) o = t[a], p = y.getAttribute(o), p && l.push("[".concat(o, '="').concat(p, '"]'));
				return l.join("")
			}

			function h() {
				try {
					return x.document.location.href
				} catch (E) {
					return ""
				}
			}

			function g(E) {
				return x.document && x.document.querySelector ? x.document.querySelector(E) : null
			}
		},
		145772: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_asyncNullishCoalesce", {
				enumerable: !0,
				get: function() {
					return w
				}
			});
			var N = d(43345);

			function f(_, h, g, E, u, y, l) {
				try {
					var s = _[y](l),
						v = s.value
				} catch (o) {
					g(o);
					return
				}
				s.done ? h(v) : Promise.resolve(v).then(E, u)
			}

			function P(_) {
				return function() {
					var h = this,
						g = arguments;
					return new Promise(function(E, u) {
						var y = _.apply(h, g);

						function l(v) {
							f(y, E, u, l, s, "next", v)
						}

						function s(v) {
							f(y, E, u, l, s, "throw", v)
						}
						l(void 0)
					})
				}
			}
			var x = function(_, h) {
				var g, E, u, y, l = {
					label: 0,
					sent: function() {
						if (u[0] & 1) throw u[1];
						return u[1]
					},
					trys: [],
					ops: []
				};
				return y = {
					next: s(0),
					throw: s(1),
					return: s(2)
				}, typeof Symbol == "function" && (y[Symbol.iterator] = function() {
					return this
				}), y;

				function s(o) {
					return function(p) {
						return v([o, p])
					}
				}

				function v(o) {
					if (g) throw new TypeError("Generator is already executing.");
					for (; l;) try {
						if (g = 1, E && (u = o[0] & 2 ? E.return : o[0] ? E.throw || ((u = E.return) && u.call(E), 0) : E.next) && !(u = u.call(E, o[1])).done) return u;
						switch (E = 0, u && (o = [o[0] & 2, u.value]), o[0]) {
							case 0:
							case 1:
								u = o;
								break;
							case 4:
								return l.label++, {
									value: o[1],
									done: !1
								};
							case 5:
								l.label++, E = o[1], o = [0];
								continue;
							case 7:
								o = l.ops.pop(), l.trys.pop();
								continue;
							default:
								if (u = l.trys, !(u = u.length > 0 && u[u.length - 1]) && (o[0] === 6 || o[0] === 2)) {
									l = 0;
									continue
								}
								if (o[0] === 3 && (!u || o[1] > u[0] && o[1] < u[3])) {
									l.label = o[1];
									break
								}
								if (o[0] === 6 && l.label < u[1]) {
									l.label = u[1], u = o;
									break
								}
								if (u && l.label < u[2]) {
									l.label = u[2], l.ops.push(o);
									break
								}
								u[2] && l.ops.pop(), l.trys.pop();
								continue
						}
						o = h.call(_, l)
					} catch (p) {
						o = [6, p], E = 0
					} finally {
						g = u = 0
					}
					if (o[0] & 5) throw o[1];
					return {
						value: o[0] ? o[1] : void 0,
						done: !0
					}
				}
			};

			function w(_, h) {
				return I.apply(this, arguments)
			}

			function I() {
				return I = P(function(_, h) {
					return x(this, function(g) {
						return [2, (0, N._nullishCoalesce)(_, h)]
					})
				}), I.apply(this, arguments)
			}
		},
		204508: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_asyncOptionalChain", {
				enumerable: !0,
				get: function() {
					return g
				}
			});

			function d(u, y) {
				(y == null || y > u.length) && (y = u.length);
				for (var l = 0, s = new Array(y); l < y; l++) s[l] = u[l];
				return s
			}

			function N(u) {
				if (Array.isArray(u)) return d(u)
			}

			function f(u, y, l, s, v, o, p) {
				try {
					var a = u[o](p),
						i = a.value
				} catch (t) {
					l(t);
					return
				}
				a.done ? y(i) : Promise.resolve(i).then(s, v)
			}

			function P(u) {
				return function() {
					var y = this,
						l = arguments;
					return new Promise(function(s, v) {
						var o = u.apply(y, l);

						function p(i) {
							f(o, s, v, p, a, "next", i)
						}

						function a(i) {
							f(o, s, v, p, a, "throw", i)
						}
						p(void 0)
					})
				}
			}

			function x(u) {
				if (typeof Symbol != "undefined" && u[Symbol.iterator] != null || u["@@iterator"] != null) return Array.from(u)
			}

			function w() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function I(u) {
				return N(u) || x(u) || _(u) || w()
			}

			function _(u, y) {
				if (!!u) {
					if (typeof u == "string") return d(u, y);
					var l = Object.prototype.toString.call(u).slice(8, -1);
					if (l === "Object" && u.constructor && (l = u.constructor.name), l === "Map" || l === "Set") return Array.from(l);
					if (l === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)) return d(u, y)
				}
			}
			var h = function(u, y) {
				var l, s, v, o, p = {
					label: 0,
					sent: function() {
						if (v[0] & 1) throw v[1];
						return v[1]
					},
					trys: [],
					ops: []
				};
				return o = {
					next: a(0),
					throw: a(1),
					return: a(2)
				}, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
					return this
				}), o;

				function a(t) {
					return function(e) {
						return i([t, e])
					}
				}

				function i(t) {
					if (l) throw new TypeError("Generator is already executing.");
					for (; p;) try {
						if (l = 1, s && (v = t[0] & 2 ? s.return : t[0] ? s.throw || ((v = s.return) && v.call(s), 0) : s.next) && !(v = v.call(s, t[1])).done) return v;
						switch (s = 0, v && (t = [t[0] & 2, v.value]), t[0]) {
							case 0:
							case 1:
								v = t;
								break;
							case 4:
								return p.label++, {
									value: t[1],
									done: !1
								};
							case 5:
								p.label++, s = t[1], t = [0];
								continue;
							case 7:
								t = p.ops.pop(), p.trys.pop();
								continue;
							default:
								if (v = p.trys, !(v = v.length > 0 && v[v.length - 1]) && (t[0] === 6 || t[0] === 2)) {
									p = 0;
									continue
								}
								if (t[0] === 3 && (!v || t[1] > v[0] && t[1] < v[3])) {
									p.label = t[1];
									break
								}
								if (t[0] === 6 && p.label < v[1]) {
									p.label = v[1], v = t;
									break
								}
								if (v && p.label < v[2]) {
									p.label = v[2], p.ops.push(t);
									break
								}
								v[2] && p.ops.pop(), p.trys.pop();
								continue
						}
						t = y.call(u, p)
					} catch (e) {
						t = [6, e], s = 0
					} finally {
						l = v = 0
					}
					if (t[0] & 5) throw t[1];
					return {
						value: t[0] ? t[1] : void 0,
						done: !0
					}
				}
			};

			function g(u) {
				return E.apply(this, arguments)
			}

			function E() {
				return E = P(function(u) {
					var y, l, s, v, o, p;
					return h(this, function(a) {
						switch (a.label) {
							case 0:
								y = void 0, l = u[0], s = 1, a.label = 1;
							case 1:
								return s < u.length ? (v = u[s], o = u[s + 1], s += 2, (v === "optionalAccess" || v === "optionalCall") && l == null ? [2] : v === "access" || v === "optionalAccess" ? (y = l, [4, o(l)]) : [3, 3]) : [3, 6];
							case 2:
								return l = a.sent(), [3, 5];
							case 3:
								return v === "call" || v === "optionalCall" ? [4, o(function() {
									for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++) t[e] = arguments[e];
									return (p = l).call.apply(p, [y].concat(I(t)))
								})] : [3, 5];
							case 4:
								l = a.sent(), y = void 0, a.label = 5;
							case 5:
								return [3, 1];
							case 6:
								return [2, l]
						}
					})
				}), E.apply(this, arguments)
			}
		},
		166226: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_asyncOptionalChainDelete", {
				enumerable: !0,
				get: function() {
					return w
				}
			});
			var N = d(204508);

			function f(_, h, g, E, u, y, l) {
				try {
					var s = _[y](l),
						v = s.value
				} catch (o) {
					g(o);
					return
				}
				s.done ? h(v) : Promise.resolve(v).then(E, u)
			}

			function P(_) {
				return function() {
					var h = this,
						g = arguments;
					return new Promise(function(E, u) {
						var y = _.apply(h, g);

						function l(v) {
							f(y, E, u, l, s, "next", v)
						}

						function s(v) {
							f(y, E, u, l, s, "throw", v)
						}
						l(void 0)
					})
				}
			}
			var x = function(_, h) {
				var g, E, u, y, l = {
					label: 0,
					sent: function() {
						if (u[0] & 1) throw u[1];
						return u[1]
					},
					trys: [],
					ops: []
				};
				return y = {
					next: s(0),
					throw: s(1),
					return: s(2)
				}, typeof Symbol == "function" && (y[Symbol.iterator] = function() {
					return this
				}), y;

				function s(o) {
					return function(p) {
						return v([o, p])
					}
				}

				function v(o) {
					if (g) throw new TypeError("Generator is already executing.");
					for (; l;) try {
						if (g = 1, E && (u = o[0] & 2 ? E.return : o[0] ? E.throw || ((u = E.return) && u.call(E), 0) : E.next) && !(u = u.call(E, o[1])).done) return u;
						switch (E = 0, u && (o = [o[0] & 2, u.value]), o[0]) {
							case 0:
							case 1:
								u = o;
								break;
							case 4:
								return l.label++, {
									value: o[1],
									done: !1
								};
							case 5:
								l.label++, E = o[1], o = [0];
								continue;
							case 7:
								o = l.ops.pop(), l.trys.pop();
								continue;
							default:
								if (u = l.trys, !(u = u.length > 0 && u[u.length - 1]) && (o[0] === 6 || o[0] === 2)) {
									l = 0;
									continue
								}
								if (o[0] === 3 && (!u || o[1] > u[0] && o[1] < u[3])) {
									l.label = o[1];
									break
								}
								if (o[0] === 6 && l.label < u[1]) {
									l.label = u[1], u = o;
									break
								}
								if (u && l.label < u[2]) {
									l.label = u[2], l.ops.push(o);
									break
								}
								u[2] && l.ops.pop(), l.trys.pop();
								continue
						}
						o = h.call(_, l)
					} catch (p) {
						o = [6, p], E = 0
					} finally {
						g = u = 0
					}
					if (o[0] & 5) throw o[1];
					return {
						value: o[0] ? o[1] : void 0,
						done: !0
					}
				}
			};

			function w(_) {
				return I.apply(this, arguments)
			}

			function I() {
				return I = P(function(_) {
					var h;
					return x(this, function(g) {
						switch (g.label) {
							case 0:
								return [4, (0, N._asyncOptionalChain)(_)];
							case 1:
								return h = g.sent(), [2, h == null ? !0 : h]
						}
					})
				}), I.apply(this, arguments)
			}
		},
		784670: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_createNamedExportFrom", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N, f, P) {
				b[f] = N[P]
			}
		},
		736181: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_createStarExport", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N) {
				Object.keys(N).filter(function(f) {
					return f !== "default" && f !== "__esModule" && !(f in b)
				}).forEach(function(f) {
					return b[f] = N[f]
				})
			}
		},
		111008: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_interopDefault", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N) {
				return N.__esModule ? N.default : N
			}
		},
		39957: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_interopNamespace", {
				enumerable: !0,
				get: function() {
					return x
				}
			});

			function d(w, I, _) {
				return I in w ? Object.defineProperty(w, I, {
					value: _,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : w[I] = _, w
			}

			function N(w) {
				for (var I = 1; I < arguments.length; I++) {
					var _ = arguments[I] != null ? arguments[I] : {},
						h = Object.keys(_);
					typeof Object.getOwnPropertySymbols == "function" && (h = h.concat(Object.getOwnPropertySymbols(_).filter(function(g) {
						return Object.getOwnPropertyDescriptor(_, g).enumerable
					}))), h.forEach(function(g) {
						d(w, g, _[g])
					})
				}
				return w
			}

			function f(w, I) {
				var _ = Object.keys(w);
				if (Object.getOwnPropertySymbols) {
					var h = Object.getOwnPropertySymbols(w);
					I && (h = h.filter(function(g) {
						return Object.getOwnPropertyDescriptor(w, g).enumerable
					})), _.push.apply(_, h)
				}
				return _
			}

			function P(w, I) {
				return I = I != null ? I : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(w, Object.getOwnPropertyDescriptors(I)) : f(Object(I)).forEach(function(_) {
					Object.defineProperty(w, _, Object.getOwnPropertyDescriptor(I, _))
				}), w
			}

			function x(w) {
				return w.__esModule ? w : P(N({}, w), {
					default: w
				})
			}
		},
		672064: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_interopNamespaceDefaultOnly", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N) {
				return {
					__proto__: null,
					default: N
				}
			}
		},
		207240: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_interopRequireDefault", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N) {
				return N.__esModule ? N : {
					default: N
				}
			}
		},
		759560: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_interopRequireWildcard", {
				enumerable: !0,
				get: function() {
					return x
				}
			});

			function d(w, I, _) {
				return I in w ? Object.defineProperty(w, I, {
					value: _,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : w[I] = _, w
			}

			function N(w) {
				for (var I = 1; I < arguments.length; I++) {
					var _ = arguments[I] != null ? arguments[I] : {},
						h = Object.keys(_);
					typeof Object.getOwnPropertySymbols == "function" && (h = h.concat(Object.getOwnPropertySymbols(_).filter(function(g) {
						return Object.getOwnPropertyDescriptor(_, g).enumerable
					}))), h.forEach(function(g) {
						d(w, g, _[g])
					})
				}
				return w
			}

			function f(w, I) {
				var _ = Object.keys(w);
				if (Object.getOwnPropertySymbols) {
					var h = Object.getOwnPropertySymbols(w);
					I && (h = h.filter(function(g) {
						return Object.getOwnPropertyDescriptor(w, g).enumerable
					})), _.push.apply(_, h)
				}
				return _
			}

			function P(w, I) {
				return I = I != null ? I : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(w, Object.getOwnPropertyDescriptors(I)) : f(Object(I)).forEach(function(_) {
					Object.defineProperty(w, _, Object.getOwnPropertyDescriptor(I, _))
				}), w
			}

			function x(w) {
				return w.__esModule ? w : P(N({}, w), {
					default: w
				})
			}
		},
		43345: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_nullishCoalesce", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d(N, f) {
				return N != null ? N : f()
			}
		},
		83407: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_optionalChain", {
				enumerable: !0,
				get: function() {
					return I
				}
			});

			function d(_, h) {
				(h == null || h > _.length) && (h = _.length);
				for (var g = 0, E = new Array(h); g < h; g++) E[g] = _[g];
				return E
			}

			function N(_) {
				if (Array.isArray(_)) return d(_)
			}

			function f(_) {
				if (typeof Symbol != "undefined" && _[Symbol.iterator] != null || _["@@iterator"] != null) return Array.from(_)
			}

			function P() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function x(_) {
				return N(_) || f(_) || w(_) || P()
			}

			function w(_, h) {
				if (!!_) {
					if (typeof _ == "string") return d(_, h);
					var g = Object.prototype.toString.call(_).slice(8, -1);
					if (g === "Object" && _.constructor && (g = _.constructor.name), g === "Map" || g === "Set") return Array.from(g);
					if (g === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g)) return d(_, h)
				}
			}

			function I(_) {
				for (var h = void 0, g = _[0], E = 1; E < _.length;) {
					var u = _[E],
						y = _[E + 1];
					if (E += 2, (u === "optionalAccess" || u === "optionalCall") && g == null) return;
					if (u === "access" || u === "optionalAccess") h = g, g = y(g);
					else if (u === "call" || u === "optionalCall") {
						var l;
						g = y(function() {
							for (var s = arguments.length, v = new Array(s), o = 0; o < s; o++) v[o] = arguments[o];
							return (l = g).call.apply(l, [h].concat(x(v)))
						}), h = void 0
					}
				}
				return g
			}
		},
		254332: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "_optionalChainDelete", {
				enumerable: !0,
				get: function() {
					return f
				}
			});
			var N = d(83407);

			function f(P) {
				var x = (0, N._optionalChain)(P);
				return x == null ? !0 : x
			}
		},
		596907: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(v, o) {
				for (var p in o) Object.defineProperty(v, p, {
					enumerable: !0,
					get: o[p]
				})
			}
			N(b, {
				_asyncNullishCoalesce: function() {
					return f._asyncNullishCoalesce
				},
				_asyncOptionalChain: function() {
					return P._asyncOptionalChain
				},
				_asyncOptionalChainDelete: function() {
					return x._asyncOptionalChainDelete
				},
				_createNamedExportFrom: function() {
					return w._createNamedExportFrom
				},
				_createStarExport: function() {
					return I._createStarExport
				},
				_interopDefault: function() {
					return _._interopDefault
				},
				_interopNamespace: function() {
					return h._interopNamespace
				},
				_interopNamespaceDefaultOnly: function() {
					return g._interopNamespaceDefaultOnly
				},
				_interopRequireDefault: function() {
					return E._interopRequireDefault
				},
				_interopRequireWildcard: function() {
					return u._interopRequireWildcard
				},
				_nullishCoalesce: function() {
					return y._nullishCoalesce
				},
				_optionalChain: function() {
					return l._optionalChain
				},
				_optionalChainDelete: function() {
					return s._optionalChainDelete
				}
			});
			var f = d(145772),
				P = d(204508),
				x = d(166226),
				w = d(784670),
				I = d(736181),
				_ = d(111008),
				h = d(39957),
				g = d(672064),
				E = d(207240),
				u = d(759560),
				y = d(43345),
				l = d(83407),
				s = d(254332)
		},
		231419: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "createClientReportEnvelope", {
				enumerable: !0,
				get: function() {
					return P
				}
			});
			var N = d(552278),
				f = d(189332);

			function P(x, w, I) {
				var _ = [{
					type: "client_report"
				}, {
					timestamp: I || (0, f.dateTimestampInSeconds)(),
					discarded_events: x
				}];
				return (0, N.createEnvelope)(w ? {
					dsn: w
				} : {}, [_])
			}
		},
		356145: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(o, p) {
				for (var a in p) Object.defineProperty(o, a, {
					enumerable: !0,
					get: p[a]
				})
			}
			N(b, {
				dsnFromString: function() {
					return y
				},
				dsnToString: function() {
					return u
				},
				makeDsn: function() {
					return v
				}
			});
			var f = d(730084);

			function P(o, p) {
				(p == null || p > o.length) && (p = o.length);
				for (var a = 0, i = new Array(p); a < p; a++) i[a] = o[a];
				return i
			}

			function x(o) {
				if (Array.isArray(o)) return o
			}

			function w(o, p) {
				var a = o == null ? null : typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
				if (a != null) {
					var i = [],
						t = !0,
						e = !1,
						n, r;
					try {
						for (a = a.call(o); !(t = (n = a.next()).done) && (i.push(n.value), !(p && i.length === p)); t = !0);
					} catch (c) {
						e = !0, r = c
					} finally {
						try {
							!t && a.return != null && a.return()
						} finally {
							if (e) throw r
						}
					}
					return i
				}
			}

			function I() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function _(o, p) {
				return x(o) || w(o, p) || h(o, p) || I()
			}

			function h(o, p) {
				if (!!o) {
					if (typeof o == "string") return P(o, p);
					var a = Object.prototype.toString.call(o).slice(8, -1);
					if (a === "Object" && o.constructor && (a = o.constructor.name), a === "Map" || a === "Set") return Array.from(a);
					if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return P(o, p)
				}
			}
			var g = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

			function E(o) {
				return o === "http" || o === "https"
			}

			function u(o) {
				var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
					a = o.host,
					i = o.path,
					t = o.pass,
					e = o.port,
					n = o.projectId,
					r = o.protocol,
					c = o.publicKey;
				return "".concat(r, "://").concat(c).concat(p && t ? ":".concat(t) : "") + "@".concat(a).concat(e ? ":".concat(e) : "", "/").concat(i && "".concat(i, "/")).concat(n)
			}

			function y(o) {
				var p = g.exec(o);
				if (!p) throw new f.SentryError("Invalid Sentry Dsn: ".concat(o));
				var a = _(p.slice(1), 6),
					i = a[0],
					t = a[1],
					e = a[2],
					n = e === void 0 ? "" : e,
					r = a[3],
					c = a[4],
					A = c === void 0 ? "" : c,
					S = a[5],
					m = "",
					O = S,
					R = O.split("/");
				if (R.length > 1 && (m = R.slice(0, -1).join("/"), O = R.pop()), O) {
					var j = O.match(/^\d+/);
					j && (O = j[0])
				}
				return l({
					host: r,
					pass: n,
					path: m,
					projectId: O,
					port: A,
					protocol: i,
					publicKey: t
				})
			}

			function l(o) {
				return {
					protocol: o.protocol,
					publicKey: o.publicKey || "",
					pass: o.pass || "",
					host: o.host,
					port: o.port || "",
					path: o.path || "",
					projectId: o.projectId
				}
			}

			function s(o) {
				if (!!(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__)) {
					var p = o.port,
						a = o.projectId,
						i = o.protocol,
						t = ["protocol", "publicKey", "host", "projectId"];
					if (t.forEach(function(e) {
							if (!o[e]) throw new f.SentryError("Invalid Sentry Dsn: ".concat(e, " missing"))
						}), !a.match(/^\d+$/)) throw new f.SentryError("Invalid Sentry Dsn: Invalid projectId ".concat(a));
					if (!E(i)) throw new f.SentryError("Invalid Sentry Dsn: Invalid protocol ".concat(i));
					if (p && isNaN(parseInt(p, 10))) throw new f.SentryError("Invalid Sentry Dsn: Invalid port ".concat(p));
					return !0
				}
			}

			function v(o) {
				var p = typeof o == "string" ? y(o) : l(o);
				return s(p), p
			}
		},
		438421: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "isBrowserBundle", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d() {
				return typeof __SENTRY_BROWSER_BUNDLE__ != "undefined" && !!__SENTRY_BROWSER_BUNDLE__
			}
		},
		552278: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(c, A) {
				for (var S in A) Object.defineProperty(c, S, {
					enumerable: !0,
					get: A[S]
				})
			}
			N(b, {
				addItemToEnvelope: function() {
					return o
				},
				createAttachmentEnvelopeItem: function() {
					return e
				},
				createEnvelope: function() {
					return v
				},
				envelopeItemTypeToDataCategory: function() {
					return r
				},
				forEachEnvelopeItem: function() {
					return p
				},
				serializeEnvelope: function() {
					return i
				}
			});
			var f = d(796174),
				P = d(471092);

			function x(c, A) {
				(A == null || A > c.length) && (A = c.length);
				for (var S = 0, m = new Array(A); S < A; S++) m[S] = c[S];
				return m
			}

			function w(c) {
				if (Array.isArray(c)) return c
			}

			function I(c) {
				if (Array.isArray(c)) return x(c)
			}

			function _(c, A) {
				return A != null && typeof Symbol != "undefined" && A[Symbol.hasInstance] ? !!A[Symbol.hasInstance](c) : c instanceof A
			}

			function h(c) {
				if (typeof Symbol != "undefined" && c[Symbol.iterator] != null || c["@@iterator"] != null) return Array.from(c)
			}

			function g(c, A) {
				var S = c == null ? null : typeof Symbol != "undefined" && c[Symbol.iterator] || c["@@iterator"];
				if (S != null) {
					var m = [],
						O = !0,
						R = !1,
						j, H;
					try {
						for (S = S.call(c); !(O = (j = S.next()).done) && (m.push(j.value), !(A && m.length === A)); O = !0);
					} catch ($) {
						R = !0, H = $
					} finally {
						try {
							!O && S.return != null && S.return()
						} finally {
							if (R) throw H
						}
					}
					return m
				}
			}

			function E() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function u() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function y(c, A) {
				return w(c) || g(c, A) || s(c, A) || E()
			}

			function l(c) {
				return I(c) || h(c) || s(c) || u()
			}

			function s(c, A) {
				if (!!c) {
					if (typeof c == "string") return x(c, A);
					var S = Object.prototype.toString.call(c).slice(8, -1);
					if (S === "Object" && c.constructor && (S = c.constructor.name), S === "Map" || S === "Set") return Array.from(S);
					if (S === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S)) return x(c, A)
				}
			}

			function v(c) {
				var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
				return [c, A]
			}

			function o(c, A) {
				var S = y(c, 2),
					m = S[0],
					O = S[1];
				return [m, l(O).concat([A])]
			}

			function p(c, A) {
				var S = c[1];
				S.forEach(function(m) {
					var O = m[0].type;
					A(m, O)
				})
			}

			function a(c, A) {
				var S = A || new TextEncoder;
				return S.encode(c)
			}

			function i(c, A) {
				var S = function(D) {
						typeof j == "string" ? j = typeof D == "string" ? j + D : [a(j, A), D] : j.push(typeof D == "string" ? a(D, A) : D)
					},
					m = y(c, 2),
					O = m[0],
					R = m[1],
					j = JSON.stringify(O),
					H = !0,
					$ = !1,
					X = void 0;
				try {
					for (var J = R[Symbol.iterator](), T; !(H = (T = J.next()).done); H = !0) {
						var B = T.value,
							G = y(B, 2),
							L = G[0],
							F = G[1];
						if (S("\n".concat(JSON.stringify(L), "\n")), typeof F == "string" || _(F, Uint8Array)) S(F);
						else {
							var U = void 0;
							try {
								U = JSON.stringify(F)
							} catch (W) {
								U = JSON.stringify((0, f.normalize)(F))
							}
							S(U)
						}
					}
				} catch (W) {
					$ = !0, X = W
				} finally {
					try {
						!H && J.return != null && J.return()
					} finally {
						if ($) throw X
					}
				}
				return typeof j == "string" ? j : t(j)
			}

			function t(c) {
				var A = c.reduce(function(J, T) {
						return J + T.length
					}, 0),
					S = new Uint8Array(A),
					m = 0,
					O = !0,
					R = !1,
					j = void 0;
				try {
					for (var H = c[Symbol.iterator](), $; !(O = ($ = H.next()).done); O = !0) {
						var X = $.value;
						S.set(X, m), m += X.length
					}
				} catch (J) {
					R = !0, j = J
				} finally {
					try {
						!O && H.return != null && H.return()
					} finally {
						if (R) throw j
					}
				}
				return S
			}

			function e(c, A) {
				var S = typeof c.data == "string" ? a(c.data, A) : c.data;
				return [(0, P.dropUndefinedKeys)({
					type: "attachment",
					length: S.length,
					filename: c.filename,
					content_type: c.contentType,
					attachment_type: c.attachmentType
				}), S]
			}
			var n = {
				session: "session",
				sessions: "session",
				attachment: "attachment",
				transaction: "transaction",
				event: "error",
				client_report: "internal",
				user_report: "default"
			};

			function r(c) {
				return n[c]
			}
		},
		730084: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "SentryError", {
				enumerable: !0,
				get: function() {
					return s
				}
			});

			function d(v) {
				if (v === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return v
			}

			function N(v, o) {
				if (!(v instanceof o)) throw new TypeError("Cannot call a class as a function")
			}

			function f() {
				if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
				} catch (v) {
					return !1
				}
			}

			function P(v, o, p) {
				return f() ? P = Reflect.construct : P = function(i, t, e) {
					var n = [null];
					n.push.apply(n, t);
					var r = Function.bind.apply(i, n),
						c = new r;
					return e && g(c, e.prototype), c
				}, P.apply(null, arguments)
			}

			function x(v) {
				return x = Object.setPrototypeOf ? Object.getPrototypeOf : function(p) {
					return p.__proto__ || Object.getPrototypeOf(p)
				}, x(v)
			}

			function w(v, o) {
				if (typeof o != "function" && o !== null) throw new TypeError("Super expression must either be null or a function");
				v.prototype = Object.create(o && o.prototype, {
					constructor: {
						value: v,
						writable: !0,
						configurable: !0
					}
				}), o && g(v, o)
			}

			function I(v, o) {
				return o != null && typeof Symbol != "undefined" && o[Symbol.hasInstance] ? !!o[Symbol.hasInstance](v) : v instanceof o
			}

			function _(v) {
				return Function.toString.call(v).indexOf("[native code]") !== -1
			}

			function h(v, o) {
				return o && (E(o) === "object" || typeof o == "function") ? o : d(v)
			}

			function g(v, o) {
				return g = Object.setPrototypeOf || function(a, i) {
					return a.__proto__ = i, a
				}, g(v, o)
			}
			var E = function(v) {
				return v && typeof Symbol != "undefined" && v.constructor === Symbol ? "symbol" : typeof v
			};

			function u(v) {
				var o = typeof Map == "function" ? new Map : void 0;
				return u = function(a) {
					if (a === null || !_(a)) return a;
					if (typeof a != "function") throw new TypeError("Super expression must either be null or a function");
					if (typeof o != "undefined") {
						if (o.has(a)) return o.get(a);
						o.set(a, i)
					}

					function i() {
						return P(a, arguments, x(this).constructor)
					}
					return i.prototype = Object.create(a.prototype, {
						constructor: {
							value: i,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), g(i, a)
				}, u(v)
			}

			function y() {
				if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
				} catch (v) {
					return !1
				}
			}

			function l(v) {
				var o = y();
				return function() {
					var a = x(v),
						i;
					if (o) {
						var t = x(this).constructor;
						i = Reflect.construct(a, arguments, t)
					} else i = a.apply(this, arguments);
					return h(this, i)
				}
			}
			var s = function(o) {
				"use strict";
				w(a, o);
				var p = l(a);

				function a(i) {
					var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "warn";
					N(this, a);
					var e;
					return e = p.call(this, i), e.message = i, e.name = (I(this, a) ? this.constructor : void 0).prototype.constructor.name, Object.setPrototypeOf(d(e), (I(this, a) ? this.constructor : void 0).prototype), e.logLevel = t, e
				}
				return a
			}(u(Error))
		},
		974991: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(j, H) {
				for (var $ in H) Object.defineProperty(j, $, {
					enumerable: !0,
					get: H[$]
				})
			}
			N(b, {
				getDomElement: function() {
					return f.getDomElement
				},
				getLocationHref: function() {
					return f.getLocationHref
				},
				htmlTreeAsString: function() {
					return f.htmlTreeAsString
				},
				dsnFromString: function() {
					return P.dsnFromString
				},
				dsnToString: function() {
					return P.dsnToString
				},
				makeDsn: function() {
					return P.makeDsn
				},
				SentryError: function() {
					return x.SentryError
				},
				GLOBAL_OBJ: function() {
					return w.GLOBAL_OBJ
				},
				getGlobalObject: function() {
					return w.getGlobalObject
				},
				getGlobalSingleton: function() {
					return w.getGlobalSingleton
				},
				addInstrumentationHandler: function() {
					return I.addInstrumentationHandler
				},
				isDOMError: function() {
					return _.isDOMError
				},
				isDOMException: function() {
					return _.isDOMException
				},
				isElement: function() {
					return _.isElement
				},
				isError: function() {
					return _.isError
				},
				isErrorEvent: function() {
					return _.isErrorEvent
				},
				isEvent: function() {
					return _.isEvent
				},
				isInstanceOf: function() {
					return _.isInstanceOf
				},
				isNaN: function() {
					return _.isNaN
				},
				isPlainObject: function() {
					return _.isPlainObject
				},
				isPrimitive: function() {
					return _.isPrimitive
				},
				isRegExp: function() {
					return _.isRegExp
				},
				isString: function() {
					return _.isString
				},
				isSyntheticEvent: function() {
					return _.isSyntheticEvent
				},
				isThenable: function() {
					return _.isThenable
				},
				CONSOLE_LEVELS: function() {
					return h.CONSOLE_LEVELS
				},
				consoleSandbox: function() {
					return h.consoleSandbox
				},
				logger: function() {
					return h.logger
				},
				memoBuilder: function() {
					return g.memoBuilder
				},
				addContextToFrame: function() {
					return E.addContextToFrame
				},
				addExceptionMechanism: function() {
					return E.addExceptionMechanism
				},
				addExceptionTypeValue: function() {
					return E.addExceptionTypeValue
				},
				arrayify: function() {
					return E.arrayify
				},
				checkOrSetAlreadyCaught: function() {
					return E.checkOrSetAlreadyCaught
				},
				getEventDescription: function() {
					return E.getEventDescription
				},
				parseSemver: function() {
					return E.parseSemver
				},
				uuid4: function() {
					return E.uuid4
				},
				dynamicRequire: function() {
					return u.dynamicRequire
				},
				isNodeEnv: function() {
					return u.isNodeEnv
				},
				loadModule: function() {
					return u.loadModule
				},
				normalize: function() {
					return y.normalize
				},
				normalizeToSize: function() {
					return y.normalizeToSize
				},
				walk: function() {
					return y.walk
				},
				addNonEnumerableProperty: function() {
					return l.addNonEnumerableProperty
				},
				convertToPlainObject: function() {
					return l.convertToPlainObject
				},
				dropUndefinedKeys: function() {
					return l.dropUndefinedKeys
				},
				extractExceptionKeysForMessage: function() {
					return l.extractExceptionKeysForMessage
				},
				fill: function() {
					return l.fill
				},
				getOriginalFunction: function() {
					return l.getOriginalFunction
				},
				markFunctionWrapped: function() {
					return l.markFunctionWrapped
				},
				objectify: function() {
					return l.objectify
				},
				urlEncode: function() {
					return l.urlEncode
				},
				basename: function() {
					return s.basename
				},
				dirname: function() {
					return s.dirname
				},
				isAbsolute: function() {
					return s.isAbsolute
				},
				join: function() {
					return s.join
				},
				normalizePath: function() {
					return s.normalizePath
				},
				relative: function() {
					return s.relative
				},
				resolve: function() {
					return s.resolve
				},
				makePromiseBuffer: function() {
					return v.makePromiseBuffer
				},
				addRequestDataToEvent: function() {
					return o.addRequestDataToEvent
				},
				addRequestDataToTransaction: function() {
					return o.addRequestDataToTransaction
				},
				extractPathForTransaction: function() {
					return o.extractPathForTransaction
				},
				extractRequestData: function() {
					return o.extractRequestData
				},
				severityFromString: function() {
					return p.severityFromString
				},
				severityLevelFromString: function() {
					return p.severityLevelFromString
				},
				validSeverityLevels: function() {
					return p.validSeverityLevels
				},
				createStackParser: function() {
					return a.createStackParser
				},
				getFunctionName: function() {
					return a.getFunctionName
				},
				nodeStackLineParser: function() {
					return a.nodeStackLineParser
				},
				stackParserFromStackParserOptions: function() {
					return a.stackParserFromStackParserOptions
				},
				stripSentryFramesAndReverse: function() {
					return a.stripSentryFramesAndReverse
				},
				escapeStringForRegex: function() {
					return i.escapeStringForRegex
				},
				isMatchingPattern: function() {
					return i.isMatchingPattern
				},
				safeJoin: function() {
					return i.safeJoin
				},
				snipLine: function() {
					return i.snipLine
				},
				stringMatchesSomePattern: function() {
					return i.stringMatchesSomePattern
				},
				truncate: function() {
					return i.truncate
				},
				isNativeFetch: function() {
					return t.isNativeFetch
				},
				supportsDOMError: function() {
					return t.supportsDOMError
				},
				supportsDOMException: function() {
					return t.supportsDOMException
				},
				supportsErrorEvent: function() {
					return t.supportsErrorEvent
				},
				supportsFetch: function() {
					return t.supportsFetch
				},
				supportsHistory: function() {
					return t.supportsHistory
				},
				supportsNativeFetch: function() {
					return t.supportsNativeFetch
				},
				supportsReferrerPolicy: function() {
					return t.supportsReferrerPolicy
				},
				supportsReportingObserver: function() {
					return t.supportsReportingObserver
				},
				SyncPromise: function() {
					return e.SyncPromise
				},
				rejectedSyncPromise: function() {
					return e.rejectedSyncPromise
				},
				resolvedSyncPromise: function() {
					return e.resolvedSyncPromise
				},
				_browserPerformanceTimeOriginMode: function() {
					return n._browserPerformanceTimeOriginMode
				},
				browserPerformanceTimeOrigin: function() {
					return n.browserPerformanceTimeOrigin
				},
				dateTimestampInSeconds: function() {
					return n.dateTimestampInSeconds
				},
				timestampInSeconds: function() {
					return n.timestampInSeconds
				},
				timestampWithMs: function() {
					return n.timestampWithMs
				},
				usingPerformanceAPI: function() {
					return n.usingPerformanceAPI
				},
				TRACEPARENT_REGEXP: function() {
					return r.TRACEPARENT_REGEXP
				},
				extractTraceparentData: function() {
					return r.extractTraceparentData
				},
				isBrowserBundle: function() {
					return c.isBrowserBundle
				},
				addItemToEnvelope: function() {
					return A.addItemToEnvelope
				},
				createAttachmentEnvelopeItem: function() {
					return A.createAttachmentEnvelopeItem
				},
				createEnvelope: function() {
					return A.createEnvelope
				},
				envelopeItemTypeToDataCategory: function() {
					return A.envelopeItemTypeToDataCategory
				},
				forEachEnvelopeItem: function() {
					return A.forEachEnvelopeItem
				},
				serializeEnvelope: function() {
					return A.serializeEnvelope
				},
				createClientReportEnvelope: function() {
					return S.createClientReportEnvelope
				},
				DEFAULT_RETRY_AFTER: function() {
					return m.DEFAULT_RETRY_AFTER
				},
				disabledUntil: function() {
					return m.disabledUntil
				},
				isRateLimited: function() {
					return m.isRateLimited
				},
				parseRetryAfterHeader: function() {
					return m.parseRetryAfterHeader
				},
				updateRateLimits: function() {
					return m.updateRateLimits
				},
				BAGGAGE_HEADER_NAME: function() {
					return O.BAGGAGE_HEADER_NAME
				},
				MAX_BAGGAGE_STRING_LENGTH: function() {
					return O.MAX_BAGGAGE_STRING_LENGTH
				},
				SENTRY_BAGGAGE_KEY_PREFIX: function() {
					return O.SENTRY_BAGGAGE_KEY_PREFIX
				},
				SENTRY_BAGGAGE_KEY_PREFIX_REGEX: function() {
					return O.SENTRY_BAGGAGE_KEY_PREFIX_REGEX
				},
				baggageHeaderToDynamicSamplingContext: function() {
					return O.baggageHeaderToDynamicSamplingContext
				},
				dynamicSamplingContextToSentryBaggageHeader: function() {
					return O.dynamicSamplingContextToSentryBaggageHeader
				},
				getNumberOfUrlSegments: function() {
					return R.getNumberOfUrlSegments
				},
				parseUrl: function() {
					return R.parseUrl
				},
				stripUrlQueryAndFragment: function() {
					return R.stripUrlQueryAndFragment
				}
			});
			var f = d(416742),
				P = d(356145),
				x = d(730084),
				w = d(649097),
				I = d(139913),
				_ = d(51855),
				h = d(755770),
				g = d(831445),
				E = d(536783),
				u = d(487652),
				y = d(796174),
				l = d(471092),
				s = d(332160),
				v = d(189565),
				o = d(345475),
				p = d(692734),
				a = d(205130),
				i = d(721323),
				t = d(831829),
				e = d(918258),
				n = d(189332),
				r = d(309193),
				c = d(438421),
				A = d(552278),
				S = d(231419),
				m = d(966633),
				O = d(322398),
				R = d(152682)
		},
		139913: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "addInstrumentationHandler", {
				enumerable: !0,
				get: function() {
					return v
				}
			});
			var N = d(51855),
				f = d(755770),
				P = d(471092),
				x = d(205130),
				w = d(831829),
				I = d(649097);

			function _(T, B, G) {
				return B in T ? Object.defineProperty(T, B, {
					value: G,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : T[B] = G, T
			}

			function h(T) {
				for (var B = 1; B < arguments.length; B++) {
					var G = arguments[B] != null ? arguments[B] : {},
						L = Object.keys(G);
					typeof Object.getOwnPropertySymbols == "function" && (L = L.concat(Object.getOwnPropertySymbols(G).filter(function(F) {
						return Object.getOwnPropertyDescriptor(G, F).enumerable
					}))), L.forEach(function(F) {
						_(T, F, G[F])
					})
				}
				return T
			}

			function g(T, B) {
				var G = Object.keys(T);
				if (Object.getOwnPropertySymbols) {
					var L = Object.getOwnPropertySymbols(T);
					B && (L = L.filter(function(F) {
						return Object.getOwnPropertyDescriptor(T, F).enumerable
					})), G.push.apply(G, L)
				}
				return G
			}

			function E(T, B) {
				return B = B != null ? B : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(T, Object.getOwnPropertyDescriptors(B)) : g(Object(B)).forEach(function(G) {
					Object.defineProperty(T, G, Object.getOwnPropertyDescriptor(B, G))
				}), T
			}
			var u = (0, I.getGlobalObject)(),
				y = {},
				l = {};

			function s(T) {
				if (!l[T]) switch (l[T] = !0, T) {
					case "console":
						p();
						break;
					case "dom":
						j();
						break;
					case "xhr":
						e();
						break;
					case "fetch":
						a();
						break;
					case "history":
						r();
						break;
					case "error":
						$();
						break;
					case "unhandledrejection":
						J();
						break;
					default:
						(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("unknown instrumentation type:", T);
						return
				}
			}

			function v(T, B) {
				y[T] = y[T] || [], y[T].push(B), s(T)
			}

			function o(T, B) {
				if (!(!T || !y[T])) {
					var G = !0,
						L = !1,
						F = void 0;
					try {
						for (var U = (y[T] || [])[Symbol.iterator](), W; !(G = (W = U.next()).done); G = !0) {
							var D = W.value;
							try {
								D(B)
							} catch (Y) {
								(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.error("Error while triggering instrumentation handler.\nType: ".concat(T, "\nName: ").concat((0, x.getFunctionName)(D), "\nError:"), Y)
							}
						}
					} catch (Y) {
						L = !0, F = Y
					} finally {
						try {
							!G && U.return != null && U.return()
						} finally {
							if (L) throw F
						}
					}
				}
			}

			function p() {
				"console" in u && f.CONSOLE_LEVELS.forEach(function(T) {
					T in u.console && (0, P.fill)(u.console, T, function(B) {
						return function() {
							for (var G = arguments.length, L = new Array(G), F = 0; F < G; F++) L[F] = arguments[F];
							o("console", {
								args: L,
								level: T
							}), B && B.apply(u.console, L)
						}
					})
				})
			}

			function a() {
				!(0, w.supportsNativeFetch)() || (0, P.fill)(u, "fetch", function(T) {
					return function() {
						for (var B = arguments.length, G = new Array(B), L = 0; L < B; L++) G[L] = arguments[L];
						var F = {
							args: G,
							fetchData: {
								method: i(G),
								url: t(G)
							},
							startTimestamp: Date.now()
						};
						return o("fetch", h({}, F)), T.apply(u, G).then(function(U) {
							return o("fetch", E(h({}, F), {
								endTimestamp: Date.now(),
								response: U
							})), U
						}, function(U) {
							throw o("fetch", E(h({}, F), {
								endTimestamp: Date.now(),
								error: U
							})), U
						})
					}
				})
			}

			function i() {
				var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
				return "Request" in u && (0, N.isInstanceOf)(T[0], Request) && T[0].method ? String(T[0].method).toUpperCase() : T[1] && T[1].method ? String(T[1].method).toUpperCase() : "GET"
			}

			function t() {
				var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
				return typeof T[0] == "string" ? T[0] : "Request" in u && (0, N.isInstanceOf)(T[0], Request) ? T[0].url : String(T[0])
			}

			function e() {
				if ("XMLHttpRequest" in u) {
					var T = XMLHttpRequest.prototype;
					(0, P.fill)(T, "open", function(B) {
						return function() {
							for (var G = arguments.length, L = new Array(G), F = 0; F < G; F++) L[F] = arguments[F];
							var U = this,
								W = L[1],
								D = U.__sentry_xhr__ = {
									method: (0, N.isString)(L[0]) ? L[0].toUpperCase() : L[0],
									url: L[1]
								};
							(0, N.isString)(W) && D.method === "POST" && W.match(/sentry_key/) && (U.__sentry_own_request__ = !0);
							var Y = function() {
								if (U.readyState === 4) {
									try {
										D.status_code = U.status
									} catch (ee) {}
									o("xhr", {
										args: L,
										endTimestamp: Date.now(),
										startTimestamp: Date.now(),
										xhr: U
									})
								}
							};
							return "onreadystatechange" in U && typeof U.onreadystatechange == "function" ? (0, P.fill)(U, "onreadystatechange", function(Z) {
								return function() {
									for (var ee = arguments.length, te = new Array(ee), oe = 0; oe < ee; oe++) te[oe] = arguments[oe];
									return Y(), Z.apply(U, te)
								}
							}) : U.addEventListener("readystatechange", Y), B.apply(U, L)
						}
					}), (0, P.fill)(T, "send", function(B) {
						return function() {
							for (var G = arguments.length, L = new Array(G), F = 0; F < G; F++) L[F] = arguments[F];
							return this.__sentry_xhr__ && L[0] !== void 0 && (this.__sentry_xhr__.body = L[0]), o("xhr", {
								args: L,
								startTimestamp: Date.now(),
								xhr: this
							}), B.apply(this, L)
						}
					})
				}
			}
			var n;

			function r() {
				var T = function(L) {
					return function() {
						for (var F = arguments.length, U = new Array(F), W = 0; W < F; W++) U[W] = arguments[W];
						var D = U.length > 2 ? U[2] : void 0;
						if (D) {
							var Y = n,
								Z = String(D);
							n = Z, o("history", {
								from: Y,
								to: Z
							})
						}
						return L.apply(this, U)
					}
				};
				if (!!(0, w.supportsHistory)()) {
					var B = u.onpopstate;
					u.onpopstate = function() {
						for (var G = arguments.length, L = new Array(G), F = 0; F < G; F++) L[F] = arguments[F];
						var U = u.location.href,
							W = n;
						if (n = U, o("history", {
								from: W,
								to: U
							}), B) try {
							return B.apply(this, L)
						} catch (D) {}
					}, (0, P.fill)(u.history, "pushState", T), (0, P.fill)(u.history, "replaceState", T)
				}
			}
			var c = 1e3,
				A, S;

			function m(T, B) {
				if (!T || T.type !== B.type) return !0;
				try {
					if (T.target !== B.target) return !0
				} catch (G) {}
				return !1
			}

			function O(T) {
				if (T.type !== "keypress") return !1;
				try {
					var B = T.target;
					if (!B || !B.tagName) return !0;
					if (B.tagName === "INPUT" || B.tagName === "TEXTAREA" || B.isContentEditable) return !1
				} catch (G) {}
				return !0
			}

			function R(T) {
				var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
				return function(G) {
					if (!(!G || S === G) && !O(G)) {
						var L = G.type === "keypress" ? "input" : G.type;
						A === void 0 ? (T({
							event: G,
							name: L,
							global: B
						}), S = G) : m(S, G) && (T({
							event: G,
							name: L,
							global: B
						}), S = G), clearTimeout(A), A = u.setTimeout(function() {
							A = void 0
						}, c)
					}
				}
			}

			function j() {
				if ("document" in u) {
					var T = o.bind(null, "dom"),
						B = R(T, !0);
					u.document.addEventListener("click", B, !1), u.document.addEventListener("keypress", B, !1), ["EventTarget", "Node"].forEach(function(G) {
						var L = u[G] && u[G].prototype;
						!L || !L.hasOwnProperty || !L.hasOwnProperty("addEventListener") || ((0, P.fill)(L, "addEventListener", function(F) {
							return function(U, W, D) {
								if (U === "click" || U == "keypress") try {
									var Y = this,
										Z = Y.__sentry_instrumentation_handlers__ = Y.__sentry_instrumentation_handlers__ || {},
										ee = Z[U] = Z[U] || {
											refCount: 0
										};
									if (!ee.handler) {
										var te = R(T);
										ee.handler = te, F.call(this, U, te, D)
									}
									ee.refCount++
								} catch (oe) {}
								return F.call(this, U, W, D)
							}
						}), (0, P.fill)(L, "removeEventListener", function(F) {
							return function(U, W, D) {
								if (U === "click" || U == "keypress") try {
									var Y = this,
										Z = Y.__sentry_instrumentation_handlers__ || {},
										ee = Z[U];
									ee && (ee.refCount--, ee.refCount <= 0 && (F.call(this, U, ee.handler, D), ee.handler = void 0, delete Z[U]), Object.keys(Z).length === 0 && delete Y.__sentry_instrumentation_handlers__)
								} catch (te) {}
								return F.call(this, U, W, D)
							}
						}))
					})
				}
			}
			var H = null;

			function $() {
				H = u.onerror, u.onerror = function(T, B, G, L, F) {
					return o("error", {
						column: L,
						error: F,
						line: G,
						msg: T,
						url: B
					}), H ? H.apply(this, arguments) : !1
				}
			}
			var X = null;

			function J() {
				X = u.onunhandledrejection, u.onunhandledrejection = function(T) {
					return o("unhandledrejection", T), X ? X.apply(this, arguments) : !0
				}
			}
		},
		51855: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(a, i) {
				for (var t in i) Object.defineProperty(a, t, {
					enumerable: !0,
					get: i[t]
				})
			}
			d(b, {
				isDOMError: function() {
					return I
				},
				isDOMException: function() {
					return _
				},
				isElement: function() {
					return y
				},
				isError: function() {
					return P
				},
				isErrorEvent: function() {
					return w
				},
				isEvent: function() {
					return u
				},
				isInstanceOf: function() {
					return p
				},
				isNaN: function() {
					return o
				},
				isPlainObject: function() {
					return E
				},
				isPrimitive: function() {
					return g
				},
				isRegExp: function() {
					return l
				},
				isString: function() {
					return h
				},
				isSyntheticEvent: function() {
					return v
				},
				isThenable: function() {
					return s
				}
			});

			function N(a, i) {
				return i != null && typeof Symbol != "undefined" && i[Symbol.hasInstance] ? !!i[Symbol.hasInstance](a) : a instanceof i
			}
			var f = Object.prototype.toString;

			function P(a) {
				switch (f.call(a)) {
					case "[object Error]":
					case "[object Exception]":
					case "[object DOMException]":
						return !0;
					default:
						return p(a, Error)
				}
			}

			function x(a, i) {
				return f.call(a) === "[object ".concat(i, "]")
			}

			function w(a) {
				return x(a, "ErrorEvent")
			}

			function I(a) {
				return x(a, "DOMError")
			}

			function _(a) {
				return x(a, "DOMException")
			}

			function h(a) {
				return x(a, "String")
			}

			function g(a) {
				return a === null || typeof a != "object" && typeof a != "function"
			}

			function E(a) {
				return x(a, "Object")
			}

			function u(a) {
				return typeof Event != "undefined" && p(a, Event)
			}

			function y(a) {
				return typeof Element != "undefined" && p(a, Element)
			}

			function l(a) {
				return x(a, "RegExp")
			}

			function s(a) {
				return Boolean(a && a.then && typeof a.then == "function")
			}

			function v(a) {
				return E(a) && "nativeEvent" in a && "preventDefault" in a && "stopPropagation" in a
			}

			function o(a) {
				return typeof a == "number" && a !== a
			}

			function p(a, i) {
				try {
					return N(a, i)
				} catch (t) {
					return !1
				}
			}
		},
		755770: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(s, v) {
				for (var o in v) Object.defineProperty(s, o, {
					enumerable: !0,
					get: v[o]
				})
			}
			N(b, {
				CONSOLE_LEVELS: function() {
					return E
				},
				consoleSandbox: function() {
					return u
				},
				logger: function() {
					return l
				}
			});
			var f = d(649097);

			function P(s, v) {
				(v == null || v > s.length) && (v = s.length);
				for (var o = 0, p = new Array(v); o < v; o++) p[o] = s[o];
				return p
			}

			function x(s) {
				if (Array.isArray(s)) return P(s)
			}

			function w(s) {
				if (typeof Symbol != "undefined" && s[Symbol.iterator] != null || s["@@iterator"] != null) return Array.from(s)
			}

			function I() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function _(s) {
				return x(s) || w(s) || h(s) || I()
			}

			function h(s, v) {
				if (!!s) {
					if (typeof s == "string") return P(s, v);
					var o = Object.prototype.toString.call(s).slice(8, -1);
					if (o === "Object" && s.constructor && (o = s.constructor.name), o === "Map" || o === "Set") return Array.from(o);
					if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return P(s, v)
				}
			}
			var g = "Sentry Logger ",
				E = ["debug", "info", "warn", "error", "log", "assert", "trace"];

			function u(s) {
				if (!("console" in f.GLOBAL_OBJ)) return s();
				var v = f.GLOBAL_OBJ.console,
					o = {};
				E.forEach(function(p) {
					var a = v[p] && v[p].__sentry_original__;
					p in v && a && (o[p] = v[p], v[p] = a)
				});
				try {
					return s()
				} finally {
					Object.keys(o).forEach(function(p) {
						v[p] = o[p]
					})
				}
			}

			function y() {
				var s = !1,
					v = {
						enable: function() {
							s = !0
						},
						disable: function() {
							s = !1
						}
					};
				return typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__ ? E.forEach(function(o) {
					v[o] = function() {
						for (var p = arguments.length, a = new Array(p), i = 0; i < p; i++) a[i] = arguments[i];
						s && u(function() {
							var t;
							(t = f.GLOBAL_OBJ.console)[o].apply(t, ["".concat(g, "[").concat(o, "]:")].concat(_(a)))
						})
					}
				}) : E.forEach(function(o) {
					v[o] = function() {}
				}), v
			}
			var l;
			typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__ ? l = (0, f.getGlobalSingleton)("logger", y) : l = y()
		},
		831445: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "memoBuilder", {
				enumerable: !0,
				get: function() {
					return d
				}
			});

			function d() {
				var N = function(I) {
						if (P) return x.has(I) ? !0 : (x.add(I), !1);
						for (var _ = 0; _ < x.length; _++) {
							var h = x[_];
							if (h === I) return !0
						}
						return x.push(I), !1
					},
					f = function(I) {
						if (P) x.delete(I);
						else
							for (var _ = 0; _ < x.length; _++)
								if (x[_] === I) {
									x.splice(_, 1);
									break
								}
					},
					P = typeof WeakSet == "function",
					x = P ? new WeakSet : [];
				return [N, f]
			}
		},
		536783: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(p, a) {
				for (var i in a) Object.defineProperty(p, i, {
					enumerable: !0,
					get: a[i]
				})
			}
			N(b, {
				addContextToFrame: function() {
					return s
				},
				addExceptionMechanism: function() {
					return u
				},
				addExceptionTypeValue: function() {
					return E
				},
				arrayify: function() {
					return o
				},
				checkOrSetAlreadyCaught: function() {
					return v
				},
				getEventDescription: function() {
					return g
				},
				parseSemver: function() {
					return l
				},
				uuid4: function() {
					return _
				}
			});
			var f = d(471092),
				P = d(721323),
				x = d(649097);

			function w(p, a, i) {
				return a in p ? Object.defineProperty(p, a, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : p[a] = i, p
			}

			function I(p) {
				for (var a = 1; a < arguments.length; a++) {
					var i = arguments[a] != null ? arguments[a] : {},
						t = Object.keys(i);
					typeof Object.getOwnPropertySymbols == "function" && (t = t.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
						return Object.getOwnPropertyDescriptor(i, e).enumerable
					}))), t.forEach(function(e) {
						w(p, e, i[e])
					})
				}
				return p
			}

			function _() {
				var p = x.GLOBAL_OBJ,
					a = p.crypto || p.msCrypto;
				if (a && a.randomUUID) return a.randomUUID().replace(/-/g, "");
				var i = a && a.getRandomValues ? function() {
					return a.getRandomValues(new Uint8Array(1))[0]
				} : function() {
					return Math.random() * 16
				};
				return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, function(t) {
					return (t ^ (i() & 15) >> t / 4).toString(16)
				})
			}

			function h(p) {
				return p.exception && p.exception.values ? p.exception.values[0] : void 0
			}

			function g(p) {
				var a = p.message,
					i = p.event_id;
				if (a) return a;
				var t = h(p);
				return t ? t.type && t.value ? "".concat(t.type, ": ").concat(t.value) : t.type || t.value || i || "<unknown>" : i || "<unknown>"
			}

			function E(p, a, i) {
				var t = p.exception = p.exception || {},
					e = t.values = t.values || [],
					n = e[0] = e[0] || {};
				n.value || (n.value = a || ""), n.type || (n.type = i || "Error")
			}

			function u(p, a) {
				var i = h(p);
				if (!!i) {
					var t = {
							type: "generic",
							handled: !0
						},
						e = i.mechanism;
					if (i.mechanism = I({}, t, e, a), a && "data" in a) {
						var n = I({}, e && e.data, a.data);
						i.mechanism.data = n
					}
				}
			}
			var y = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

			function l(p) {
				var a = p.match(y) || [],
					i = parseInt(a[1], 10),
					t = parseInt(a[2], 10),
					e = parseInt(a[3], 10);
				return {
					buildmetadata: a[5],
					major: isNaN(i) ? void 0 : i,
					minor: isNaN(t) ? void 0 : t,
					patch: isNaN(e) ? void 0 : e,
					prerelease: a[4]
				}
			}

			function s(p, a) {
				var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5,
					t = a.lineno || 0,
					e = p.length,
					n = Math.max(Math.min(e, t - 1), 0);
				a.pre_context = p.slice(Math.max(0, n - i), n).map(function(r) {
					return (0, P.snipLine)(r, 0)
				}), a.context_line = (0, P.snipLine)(p[Math.min(e - 1, n)], a.colno || 0), a.post_context = p.slice(Math.min(n + 1, e), n + 1 + i).map(function(r) {
					return (0, P.snipLine)(r, 0)
				})
			}

			function v(p) {
				if (p && p.__sentry_captured__) return !0;
				try {
					(0, f.addNonEnumerableProperty)(p, "__sentry_captured__", !0)
				} catch (a) {}
				return !1
			}

			function o(p) {
				return Array.isArray(p) ? p : [p]
			}
		},
		487652: function(K, b, d) {
			"use strict";
			K = d.nmd(K);
			var N = d(760636);
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function f(_, h) {
				for (var g in h) Object.defineProperty(_, g, {
					enumerable: !0,
					get: h[g]
				})
			}
			f(b, {
				dynamicRequire: function() {
					return w
				},
				isNodeEnv: function() {
					return x
				},
				loadModule: function() {
					return I
				}
			});
			var P = d(438421);

			function x() {
				return !(0, P.isBrowserBundle)() && Object.prototype.toString.call(typeof N != "undefined" ? N : 0) === "[object process]"
			}

			function w(_, h) {
				return _.require(h)
			}

			function I(_) {
				var h;
				try {
					h = w(K, _)
				} catch (E) {}
				try {
					var g = w(K, "process").cwd;
					h = w(K, "".concat(g(), "/node_modules/").concat(_))
				} catch (E) {}
				return h
			}
		},
		796174: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(i, t) {
				for (var e in t) Object.defineProperty(i, e, {
					enumerable: !0,
					get: t[e]
				})
			}
			N(b, {
				normalize: function() {
					return l
				},
				normalizeToSize: function() {
					return s
				},
				walk: function() {
					return v
				}
			});
			var f = d(51855),
				P = d(831445),
				x = d(471092),
				w = d(205130);

			function I(i, t) {
				(t == null || t > i.length) && (t = i.length);
				for (var e = 0, n = new Array(t); e < t; e++) n[e] = i[e];
				return n
			}

			function _(i) {
				if (Array.isArray(i)) return i
			}

			function h(i, t) {
				var e = i == null ? null : typeof Symbol != "undefined" && i[Symbol.iterator] || i["@@iterator"];
				if (e != null) {
					var n = [],
						r = !0,
						c = !1,
						A, S;
					try {
						for (e = e.call(i); !(r = (A = e.next()).done) && (n.push(A.value), !(t && n.length === t)); r = !0);
					} catch (m) {
						c = !0, S = m
					} finally {
						try {
							!r && e.return != null && e.return()
						} finally {
							if (c) throw S
						}
					}
					return n
				}
			}

			function g() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function E(i, t) {
				return _(i) || h(i, t) || y(i, t) || g()
			}
			var u = function(i) {
				return i && typeof Symbol != "undefined" && i.constructor === Symbol ? "symbol" : typeof i
			};

			function y(i, t) {
				if (!!i) {
					if (typeof i == "string") return I(i, t);
					var e = Object.prototype.toString.call(i).slice(8, -1);
					if (e === "Object" && i.constructor && (e = i.constructor.name), e === "Map" || e === "Set") return Array.from(e);
					if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return I(i, t)
				}
			}

			function l(i) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0,
					e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1 / 0;
				try {
					return v("", i, t, e)
				} catch (n) {
					return {
						ERROR: "**non-serializable** (".concat(n, ")")
					}
				}
			}

			function s(i) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3,
					e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 100 * 1024,
					n = l(i, t);
				return a(n) > e ? s(i, t - 1, e) : n
			}

			function v(i, t) {
				var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1 / 0,
					n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1 / 0,
					r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (0, P.memoBuilder)(),
					c = E(r, 2),
					A = c[0],
					S = c[1];
				if (t === null || ["number", "boolean", "string"].includes(typeof t == "undefined" ? "undefined" : u(t)) && !(0, f.isNaN)(t)) return t;
				var m = o(i, t);
				if (!m.startsWith("[object ")) return m;
				if (t.__sentry_skip_normalization__) return t;
				if (e === 0) return m.replace("object ", "");
				if (A(t)) return "[Circular ~]";
				var O = t;
				if (O && typeof O.toJSON == "function") try {
					var R = O.toJSON();
					return v("", R, e - 1, n, r)
				} catch (T) {}
				var j = Array.isArray(t) ? [] : {},
					H = 0,
					$ = (0, x.convertToPlainObject)(t);
				for (var X in $)
					if (!!Object.prototype.hasOwnProperty.call($, X)) {
						if (H >= n) {
							j[X] = "[MaxProperties ~]";
							break
						}
						var J = $[X];
						j[X] = v(X, J, e - 1, n, r), H++
					} return S(t), j
			}

			function o(i, t) {
				try {
					return i === "domain" && t && typeof t == "object" && t._events ? "[Domain]" : i === "domainEmitter" ? "[DomainEmitter]" : typeof d.g != "undefined" && t === d.g ? "[Global]" : typeof window != "undefined" && t === window ? "[Window]" : typeof document != "undefined" && t === document ? "[Document]" : (0, f.isSyntheticEvent)(t) ? "[SyntheticEvent]" : typeof t == "number" && t !== t ? "[NaN]" : t === void 0 ? "[undefined]" : typeof t == "function" ? "[Function: ".concat((0, w.getFunctionName)(t), "]") : (typeof t == "undefined" ? "undefined" : u(t)) === "symbol" ? "[".concat(String(t), "]") : (typeof t == "undefined" ? "undefined" : u(t)) === "bigint" ? "[BigInt: ".concat(String(t), "]") : "[object ".concat(Object.getPrototypeOf(t).constructor.name, "]")
				} catch (e) {
					return "**non-serializable** (".concat(e, ")")
				}
			}

			function p(i) {
				return ~-encodeURI(i).split(/%..|./).length
			}

			function a(i) {
				return p(JSON.stringify(i))
			}
		},
		471092: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(t, e) {
				for (var n in e) Object.defineProperty(t, n, {
					enumerable: !0,
					get: e[n]
				})
			}
			N(b, {
				addNonEnumerableProperty: function() {
					return g
				},
				convertToPlainObject: function() {
					return l
				},
				dropUndefinedKeys: function() {
					return p
				},
				extractExceptionKeysForMessage: function() {
					return o
				},
				fill: function() {
					return h
				},
				getOriginalFunction: function() {
					return u
				},
				markFunctionWrapped: function() {
					return E
				},
				objectify: function() {
					return i
				},
				urlEncode: function() {
					return y
				}
			});
			var f = d(416742),
				P = d(51855),
				x = d(721323);

			function w(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n, t
			}

			function I(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e] != null ? arguments[e] : {},
						r = Object.keys(n);
					typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(c) {
						return Object.getOwnPropertyDescriptor(n, c).enumerable
					}))), r.forEach(function(c) {
						w(t, c, n[c])
					})
				}
				return t
			}
			var _ = function(t) {
				return t && typeof Symbol != "undefined" && t.constructor === Symbol ? "symbol" : typeof t
			};

			function h(t, e, n) {
				if (e in t) {
					var r = t[e],
						c = n(r);
					if (typeof c == "function") try {
						E(c, r)
					} catch (A) {}
					t[e] = c
				}
			}

			function g(t, e, n) {
				Object.defineProperty(t, e, {
					value: n,
					writable: !0,
					configurable: !0
				})
			}

			function E(t, e) {
				var n = e.prototype || {};
				t.prototype = e.prototype = n, g(t, "__sentry_original__", e)
			}

			function u(t) {
				return t.__sentry_original__
			}

			function y(t) {
				return Object.keys(t).map(function(e) {
					return "".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(t[e]))
				}).join("&")
			}

			function l(t) {
				if ((0, P.isError)(t)) return I({
					message: t.message,
					name: t.name,
					stack: t.stack
				}, v(t));
				if ((0, P.isEvent)(t)) {
					var e = I({
						type: t.type,
						target: s(t.target),
						currentTarget: s(t.currentTarget)
					}, v(t));
					return typeof CustomEvent != "undefined" && (0, P.isInstanceOf)(t, CustomEvent) && (e.detail = t.detail), e
				} else return t
			}

			function s(t) {
				try {
					return (0, P.isElement)(t) ? (0, f.htmlTreeAsString)(t) : Object.prototype.toString.call(t)
				} catch (e) {
					return "<unknown>"
				}
			}

			function v(t) {
				if (typeof t == "object" && t !== null) {
					var e = {};
					for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
					return e
				} else return {}
			}

			function o(t) {
				var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 40,
					n = Object.keys(l(t));
				if (n.sort(), !n.length) return "[object has no keys]";
				if (n[0].length >= e) return (0, x.truncate)(n[0], e);
				for (var r = n.length; r > 0; r--) {
					var c = n.slice(0, r).join(", ");
					if (!(c.length > e)) return r === n.length ? c : (0, x.truncate)(c, e)
				}
				return ""
			}

			function p(t) {
				var e = new Map;
				return a(t, e)
			}

			function a(t, e) {
				if ((0, P.isPlainObject)(t)) {
					var n = e.get(t);
					if (n !== void 0) return n;
					var r = {};
					e.set(t, r);
					var c = !0,
						A = !1,
						S = void 0;
					try {
						for (var m = Object.keys(t)[Symbol.iterator](), O; !(c = (O = m.next()).done); c = !0) {
							var R = O.value;
							typeof t[R] != "undefined" && (r[R] = a(t[R], e))
						}
					} catch ($) {
						A = !0, S = $
					} finally {
						try {
							!c && m.return != null && m.return()
						} finally {
							if (A) throw S
						}
					}
					return r
				}
				if (Array.isArray(t)) {
					var j = e.get(t);
					if (j !== void 0) return j;
					var H = [];
					return e.set(t, H), t.forEach(function($) {
						H.push(a($, e))
					}), H
				}
				return t
			}

			function i(t) {
				var e;
				switch (!0) {
					case t == null:
						e = new String(t);
						break;
					case ((typeof t == "undefined" ? "undefined" : _(t)) === "symbol" || (typeof t == "undefined" ? "undefined" : _(t)) === "bigint"):
						e = Object(t);
						break;
					case (0, P.isPrimitive)(t):
						e = new t.constructor(t);
						break;
					default:
						e = t;
						break
				}
				return e
			}
		},
		332160: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(y, l) {
				for (var s in l) Object.defineProperty(y, s, {
					enumerable: !0,
					get: l[s]
				})
			}
			d(b, {
				basename: function() {
					return u
				},
				dirname: function() {
					return E
				},
				isAbsolute: function() {
					return h
				},
				join: function() {
					return g
				},
				normalizePath: function() {
					return _
				},
				relative: function() {
					return I
				},
				resolve: function() {
					return x
				}
			});

			function N(y, l) {
				for (var s = 0, v = y.length - 1; v >= 0; v--) {
					var o = y[v];
					o === "." ? y.splice(v, 1) : o === ".." ? (y.splice(v, 1), s++) : s && (y.splice(v, 1), s--)
				}
				if (l)
					for (; s--; s) y.unshift("..");
				return y
			}
			var f = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;

			function P(y) {
				var l = f.exec(y);
				return l ? l.slice(1) : []
			}

			function x() {
				for (var y = arguments.length, l = new Array(y), s = 0; s < y; s++) l[s] = arguments[s];
				for (var v = "", o = !1, p = l.length - 1; p >= -1 && !o; p--) {
					var a = p >= 0 ? l[p] : "/";
					!a || (v = "".concat(a, "/").concat(v), o = a.charAt(0) === "/")
				}
				return v = N(v.split("/").filter(function(i) {
					return !!i
				}), !o).join("/"), (o ? "/" : "") + v || "."
			}

			function w(y) {
				for (var l = 0; l < y.length && y[l] === ""; l++);
				for (var s = y.length - 1; s >= 0 && y[s] === ""; s--);
				return l > s ? [] : y.slice(l, s - l + 1)
			}

			function I(y, l) {
				y = x(y).substr(1), l = x(l).substr(1);
				for (var s = w(y.split("/")), v = w(l.split("/")), o = Math.min(s.length, v.length), p = o, a = 0; a < o; a++)
					if (s[a] !== v[a]) {
						p = a;
						break
					} for (var i = [], t = p; t < s.length; t++) i.push("..");
				return i = i.concat(v.slice(p)), i.join("/")
			}

			function _(y) {
				var l = h(y),
					s = y.substr(-1) === "/",
					v = N(y.split("/").filter(function(o) {
						return !!o
					}), !l).join("/");
				return !v && !l && (v = "."), v && s && (v += "/"), (l ? "/" : "") + v
			}

			function h(y) {
				return y.charAt(0) === "/"
			}

			function g() {
				for (var y = arguments.length, l = new Array(y), s = 0; s < y; s++) l[s] = arguments[s];
				return _(l.join("/"))
			}

			function E(y) {
				var l = P(y),
					s = l[0],
					v = l[1];
				return !s && !v ? "." : (v && (v = v.substr(0, v.length - 1)), s + v)
			}

			function u(y, l) {
				var s = P(y)[2];
				return l && s.substr(l.length * -1) === l && (s = s.substr(0, s.length - l.length)), s
			}
		},
		189565: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			}), Object.defineProperty(b, "makePromiseBuffer", {
				enumerable: !0,
				get: function() {
					return P
				}
			});
			var N = d(730084),
				f = d(918258);

			function P(x) {
				var w = function() {
						return x === void 0 || g.length < x
					},
					I = function(u) {
						return g.splice(g.indexOf(u), 1)[0]
					},
					_ = function(u) {
						if (!w()) return (0, f.rejectedSyncPromise)(new N.SentryError("Not adding Promise because buffer limit was reached."));
						var y = u();
						return g.indexOf(y) === -1 && g.push(y), y.then(function() {
							return I(y)
						}).then(null, function() {
							return I(y).then(null, function() {})
						}), y
					},
					h = function(u) {
						return new f.SyncPromise(function(y, l) {
							var s = g.length;
							if (!s) return y(!0);
							var v = setTimeout(function() {
								u && u > 0 && y(!1)
							}, u);
							g.forEach(function(o) {
								(0, f.resolvedSyncPromise)(o).then(function() {
									--s || (clearTimeout(v), y(!0))
								}, l)
							})
						})
					},
					g = [];
				return {
					$: g,
					add: _,
					drain: h
				}
			}
		},
		966633: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(s, v) {
				for (var o in v) Object.defineProperty(s, o, {
					enumerable: !0,
					get: v[o]
				})
			}
			d(b, {
				DEFAULT_RETRY_AFTER: function() {
					return g
				},
				disabledUntil: function() {
					return u
				},
				isRateLimited: function() {
					return y
				},
				parseRetryAfterHeader: function() {
					return E
				},
				updateRateLimits: function() {
					return l
				}
			});

			function N(s, v) {
				(v == null || v > s.length) && (v = s.length);
				for (var o = 0, p = new Array(v); o < v; o++) p[o] = s[o];
				return p
			}

			function f(s) {
				if (Array.isArray(s)) return s
			}

			function P(s, v, o) {
				return v in s ? Object.defineProperty(s, v, {
					value: o,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : s[v] = o, s
			}

			function x(s, v) {
				var o = s == null ? null : typeof Symbol != "undefined" && s[Symbol.iterator] || s["@@iterator"];
				if (o != null) {
					var p = [],
						a = !0,
						i = !1,
						t, e;
					try {
						for (o = o.call(s); !(a = (t = o.next()).done) && (p.push(t.value), !(v && p.length === v)); a = !0);
					} catch (n) {
						i = !0, e = n
					} finally {
						try {
							!a && o.return != null && o.return()
						} finally {
							if (i) throw e
						}
					}
					return p
				}
			}

			function w() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function I(s) {
				for (var v = 1; v < arguments.length; v++) {
					var o = arguments[v] != null ? arguments[v] : {},
						p = Object.keys(o);
					typeof Object.getOwnPropertySymbols == "function" && (p = p.concat(Object.getOwnPropertySymbols(o).filter(function(a) {
						return Object.getOwnPropertyDescriptor(o, a).enumerable
					}))), p.forEach(function(a) {
						P(s, a, o[a])
					})
				}
				return s
			}

			function _(s, v) {
				return f(s) || x(s, v) || h(s, v) || w()
			}

			function h(s, v) {
				if (!!s) {
					if (typeof s == "string") return N(s, v);
					var o = Object.prototype.toString.call(s).slice(8, -1);
					if (o === "Object" && s.constructor && (o = s.constructor.name), o === "Map" || o === "Set") return Array.from(o);
					if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return N(s, v)
				}
			}
			var g = 60 * 1e3;

			function E(s) {
				var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Date.now(),
					o = parseInt("".concat(s), 10);
				if (!isNaN(o)) return o * 1e3;
				var p = Date.parse("".concat(s));
				return isNaN(p) ? g : p - v
			}

			function u(s, v) {
				return s[v] || s.all || 0
			}

			function y(s, v) {
				var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Date.now();
				return u(s, v) > o
			}

			function l(s, v) {
				var o = v.statusCode,
					p = v.headers,
					a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Date.now(),
					i = I({}, s),
					t = p && p["x-sentry-rate-limits"],
					e = p && p["retry-after"];
				if (t) {
					var n = !0,
						r = !1,
						c = void 0;
					try {
						for (var A = t.trim().split(",")[Symbol.iterator](), S; !(n = (S = A.next()).done); n = !0) {
							var m = S.value,
								O = _(m.split(":", 2), 2),
								R = O[0],
								j = O[1],
								H = parseInt(R, 10),
								$ = (isNaN(H) ? 60 : H) * 1e3;
							if (!j) i.all = a + $;
							else {
								var X = !0,
									J = !1,
									T = void 0;
								try {
									for (var B = j.split(";")[Symbol.iterator](), G; !(X = (G = B.next()).done); X = !0) {
										var L = G.value;
										i[L] = a + $
									}
								} catch (F) {
									J = !0, T = F
								} finally {
									try {
										!X && B.return != null && B.return()
									} finally {
										if (J) throw T
									}
								}
							}
						}
					} catch (F) {
						r = !0, c = F
					} finally {
						try {
							!n && A.return != null && A.return()
						} finally {
							if (r) throw c
						}
					}
				} else e ? i.all = a + E(e, a) : o === 429 && (i.all = a + 60 * 1e3);
				return i
			}
		},
		345475: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(m, O) {
				for (var R in O) Object.defineProperty(m, R, {
					enumerable: !0,
					get: O[R]
				})
			}
			N(b, {
				addRequestDataToEvent: function() {
					return A
				},
				addRequestDataToTransaction: function() {
					return t
				},
				extractPathForTransaction: function() {
					return e
				},
				extractRequestData: function() {
					return c
				}
			});
			var f = d(596907),
				P = d(51855),
				x = d(796174),
				w = d(152682);

			function I(m, O) {
				(O == null || O > m.length) && (O = m.length);
				for (var R = 0, j = new Array(O); R < O; R++) j[R] = m[R];
				return j
			}

			function _(m) {
				if (Array.isArray(m)) return I(m)
			}

			function h(m, O, R) {
				return O in m ? Object.defineProperty(m, O, {
					value: R,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : m[O] = R, m
			}

			function g(m) {
				if (typeof Symbol != "undefined" && m[Symbol.iterator] != null || m["@@iterator"] != null) return Array.from(m)
			}

			function E() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function u(m) {
				for (var O = 1; O < arguments.length; O++) {
					var R = arguments[O] != null ? arguments[O] : {},
						j = Object.keys(R);
					typeof Object.getOwnPropertySymbols == "function" && (j = j.concat(Object.getOwnPropertySymbols(R).filter(function(H) {
						return Object.getOwnPropertyDescriptor(R, H).enumerable
					}))), j.forEach(function(H) {
						h(m, H, R[H])
					})
				}
				return m
			}

			function y(m, O) {
				var R = Object.keys(m);
				if (Object.getOwnPropertySymbols) {
					var j = Object.getOwnPropertySymbols(m);
					O && (j = j.filter(function(H) {
						return Object.getOwnPropertyDescriptor(m, H).enumerable
					})), R.push.apply(R, j)
				}
				return R
			}

			function l(m, O) {
				return O = O != null ? O : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(m, Object.getOwnPropertyDescriptors(O)) : y(Object(O)).forEach(function(R) {
					Object.defineProperty(m, R, Object.getOwnPropertyDescriptor(O, R))
				}), m
			}

			function s(m) {
				return _(m) || g(m) || o(m) || E()
			}
			var v = function(m) {
				return m && typeof Symbol != "undefined" && m.constructor === Symbol ? "symbol" : typeof m
			};

			function o(m, O) {
				if (!!m) {
					if (typeof m == "string") return I(m, O);
					var R = Object.prototype.toString.call(m).slice(8, -1);
					if (R === "Object" && m.constructor && (R = m.constructor.name), R === "Map" || R === "Set") return Array.from(R);
					if (R === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(R)) return I(m, O)
				}
			}
			var p = {
					ip: !1,
					request: !0,
					transaction: !0,
					user: !0
				},
				a = ["cookies", "data", "headers", "method", "query_string", "url"],
				i = ["id", "username", "email"];

			function t(m, O, R) {
				if (!!m) {
					if (!m.metadata.source || m.metadata.source === "url") {
						var j;
						(j = m).setName.apply(j, s(e(O, {
							path: !0,
							method: !0
						})))
					}
					m.setData("url", O.originalUrl || O.url), O.baseUrl && m.setData("baseUrl", O.baseUrl), m.setData("query", S(O, R))
				}
			}

			function e(m) {
				var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
					R = m.method && m.method.toUpperCase(),
					j = "",
					H = "url";
				O.customRoute || m.route ? (j = O.customRoute || "".concat(m.baseUrl || "").concat(m.route && m.route.path), H = "route") : (m.originalUrl || m.url) && (j = (0, w.stripUrlQueryAndFragment)(m.originalUrl || m.url || ""));
				var $ = "";
				return O.method && R && ($ += R), O.method && O.path && ($ += " "), O.path && j && ($ += j), [$, H]
			}

			function n(m, O) {
				switch (O) {
					case "path":
						return e(m, {
							path: !0
						})[0];
					case "handler":
						return m.route && m.route.stack && m.route.stack[0] && m.route.stack[0].name || "<anonymous>";
					case "methodPath":
					default:
						return e(m, {
							path: !0,
							method: !0
						})[0]
				}
			}

			function r(m, O) {
				var R = {},
					j = Array.isArray(O) ? O : i;
				return j.forEach(function(H) {
					m && H in m && (R[H] = m[H])
				}), R
			}

			function c(m, O) {
				var R = O || {},
					j = R.include,
					H = j === void 0 ? a : j,
					$ = R.deps,
					X = {},
					J = m.headers || {},
					T = m.method,
					B = m.hostname || m.host || J.host || "<no host>",
					G = m.protocol === "https" || m.socket && m.socket.encrypted ? "https" : "http",
					L = m.originalUrl || m.url || "",
					F = "".concat(G, "://").concat(B).concat(L);
				return H.forEach(function(U) {
					switch (U) {
						case "headers": {
							X.headers = J;
							break
						}
						case "method": {
							X.method = T;
							break
						}
						case "url": {
							X.url = F;
							break
						}
						case "cookies": {
							X.cookies = m.cookies || J.cookie && $ && $.cookie && $.cookie.parse(J.cookie) || {};
							break
						}
						case "query_string": {
							X.query_string = S(m, $);
							break
						}
						case "data": {
							if (T === "GET" || T === "HEAD") break;
							m.body !== void 0 && (X.data = (0, P.isString)(m.body) ? m.body : JSON.stringify((0, x.normalize)(m.body)));
							break
						}
						default:
							({}).hasOwnProperty.call(m, U) && (X[U] = m[U])
					}
				}), X
			}

			function A(m, O, R) {
				var j = u({}, p, (0, f._optionalChain)([R, "optionalAccess", function(J) {
					return J.include
				}]));
				if (j.request) {
					var H = Array.isArray(j.request) ? c(O, {
						include: j.request,
						deps: (0, f._optionalChain)([R, "optionalAccess", function(J) {
							return J.deps
						}])
					}) : c(O, {
						deps: (0, f._optionalChain)([R, "optionalAccess", function(J) {
							return J.deps
						}])
					});
					m.request = u({}, m.request, H)
				}
				if (j.user) {
					var $ = O.user && (0, P.isPlainObject)(O.user) ? r(O.user, j.user) : {};
					Object.keys($).length && (m.user = u({}, m.user, $))
				}
				if (j.ip) {
					var X = O.ip || O.socket && O.socket.remoteAddress;
					X && (m.user = l(u({}, m.user), {
						ip_address: X
					}))
				}
				return j.transaction && !m.transaction && (m.transaction = n(O, j.transaction)), m
			}

			function S(m, O) {
				var R = m.originalUrl || m.url || "";
				if (!!R) return R.startsWith("/") && (R = "http://dogs.are.great".concat(R)), m.query || (typeof URL == "undefined" ? "undefined" : v(URL)) !== void 0 && new URL(R).search.replace("?", "") || O && O.url && O.url.parse(R).query || void 0
			}
		},
		692734: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(x, w) {
				for (var I in w) Object.defineProperty(x, I, {
					enumerable: !0,
					get: w[I]
				})
			}
			d(b, {
				severityFromString: function() {
					return f
				},
				severityLevelFromString: function() {
					return P
				},
				validSeverityLevels: function() {
					return N
				}
			});
			var N = ["fatal", "error", "warning", "log", "info", "debug"];

			function f(x) {
				return P(x)
			}

			function P(x) {
				return x === "warn" ? "warning" : N.includes(x) ? x : "log"
			}
		},
		205130: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(e, n) {
				for (var r in n) Object.defineProperty(e, r, {
					enumerable: !0,
					get: n[r]
				})
			}
			N(b, {
				createStackParser: function() {
					return s
				},
				getFunctionName: function() {
					return a
				},
				nodeStackLineParser: function() {
					return t
				},
				stackParserFromStackParserOptions: function() {
					return v
				},
				stripSentryFramesAndReverse: function() {
					return o
				}
			});
			var f = d(596907);

			function P(e, n) {
				(n == null || n > e.length) && (n = e.length);
				for (var r = 0, c = new Array(n); r < n; r++) c[r] = e[r];
				return c
			}

			function x(e) {
				if (Array.isArray(e)) return P(e)
			}

			function w(e, n, r) {
				return n in e ? Object.defineProperty(e, n, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = r, e
			}

			function I(e) {
				if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
			}

			function _() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function h(e) {
				for (var n = 1; n < arguments.length; n++) {
					var r = arguments[n] != null ? arguments[n] : {},
						c = Object.keys(r);
					typeof Object.getOwnPropertySymbols == "function" && (c = c.concat(Object.getOwnPropertySymbols(r).filter(function(A) {
						return Object.getOwnPropertyDescriptor(r, A).enumerable
					}))), c.forEach(function(A) {
						w(e, A, r[A])
					})
				}
				return e
			}

			function g(e, n) {
				var r = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var c = Object.getOwnPropertySymbols(e);
					n && (c = c.filter(function(A) {
						return Object.getOwnPropertyDescriptor(e, A).enumerable
					})), r.push.apply(r, c)
				}
				return r
			}

			function E(e, n) {
				return n = n != null ? n : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : g(Object(n)).forEach(function(r) {
					Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
				}), e
			}

			function u(e) {
				return x(e) || I(e) || y(e) || _()
			}

			function y(e, n) {
				if (!!e) {
					if (typeof e == "string") return P(e, n);
					var r = Object.prototype.toString.call(e).slice(8, -1);
					if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(r);
					if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return P(e, n)
				}
			}
			var l = 50;

			function s() {
				for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
				var c = n.sort(function(A, S) {
					return A[0] - S[0]
				}).map(function(A) {
					return A[1]
				});
				return function(A) {
					var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
						m = [],
						O = !0,
						R = !1,
						j = void 0;
					try {
						for (var H = A.split("\n").slice(S)[Symbol.iterator](), $; !(O = ($ = H.next()).done); O = !0) {
							var X = $.value,
								J = X.replace(/\(error: (.*)\)/, "$1"),
								T = !0,
								B = !1,
								G = void 0;
							try {
								for (var L = c[Symbol.iterator](), F; !(T = (F = L.next()).done); T = !0) {
									var U = F.value,
										W = U(J);
									if (W) {
										m.push(W);
										break
									}
								}
							} catch (D) {
								B = !0, G = D
							} finally {
								try {
									!T && L.return != null && L.return()
								} finally {
									if (B) throw G
								}
							}
						}
					} catch (D) {
						R = !0, j = D
					} finally {
						try {
							!O && H.return != null && H.return()
						} finally {
							if (R) throw j
						}
					}
					return o(m)
				}
			}

			function v(e) {
				return Array.isArray(e) ? s.apply(void 0, u(e)) : e
			}

			function o(e) {
				if (!e.length) return [];
				var n = e,
					r = n[0].function || "",
					c = n[n.length - 1].function || "";
				return (r.indexOf("captureMessage") !== -1 || r.indexOf("captureException") !== -1) && (n = n.slice(1)), c.indexOf("sentryWrapped") !== -1 && (n = n.slice(0, -1)), n.slice(0, l).map(function(A) {
					return E(h({}, A), {
						filename: A.filename || n[0].filename,
						function: A.function || "?"
					})
				}).reverse()
			}
			var p = "<anonymous>";

			function a(e) {
				try {
					return !e || typeof e != "function" ? p : e.name || p
				} catch (n) {
					return p
				}
			}

			function i(e) {
				var n = /^\s*[-]{4,}$/,
					r = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
				return function(c) {
					if (c.match(n)) return {
						filename: c
					};
					var A = c.match(r);
					if (!!A) {
						var S, m, O, R, j;
						if (A[1]) {
							O = A[1];
							var H = O.lastIndexOf(".");
							if (O[H - 1] === "." && H--, H > 0) {
								S = O.substr(0, H), m = O.substr(H + 1);
								var $ = S.indexOf(".Module");
								$ > 0 && (O = O.substr($ + 1), S = S.substr(0, $))
							}
							R = void 0
						}
						m && (R = S, j = m), m === "<anonymous>" && (j = void 0, O = void 0), O === void 0 && (j = j || "<anonymous>", O = R ? "".concat(R, ".").concat(j) : j);
						var X = (0, f._optionalChain)([A, "access", function(G) {
								return G[2]
							}, "optionalAccess", function(G) {
								return G.startsWith
							}, "call", function(G) {
								return G("file://")
							}]) ? A[2].substr(7) : A[2],
							J = A[5] === "native",
							T = J || X && !X.startsWith("/") && !X.startsWith(".") && X.indexOf(":\\") !== 1,
							B = !T && X !== void 0 && !X.includes("node_modules/");
						return {
							filename: X,
							module: (0, f._optionalChain)([e, "optionalCall", function(G) {
								return G(X)
							}]),
							function: O,
							lineno: parseInt(A[3], 10) || void 0,
							colno: parseInt(A[4], 10) || void 0,
							in_app: B
						}
					}
				}
			}

			function t(e) {
				return [90, i(e)]
			}
		},
		721323: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(g, E) {
				for (var u in E) Object.defineProperty(g, u, {
					enumerable: !0,
					get: E[u]
				})
			}
			N(b, {
				escapeStringForRegex: function() {
					return h
				},
				isMatchingPattern: function() {
					return I
				},
				safeJoin: function() {
					return w
				},
				snipLine: function() {
					return x
				},
				stringMatchesSomePattern: function() {
					return _
				},
				truncate: function() {
					return P
				}
			});
			var f = d(51855);

			function P(g) {
				var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
				return typeof g != "string" || E === 0 || g.length <= E ? g : "".concat(g.substr(0, E), "...")
			}

			function x(g, E) {
				var u = g,
					y = u.length;
				if (y <= 150) return u;
				E > y && (E = y);
				var l = Math.max(E - 60, 0);
				l < 5 && (l = 0);
				var s = Math.min(l + 140, y);
				return s > y - 5 && (s = y), s === y && (l = Math.max(s - 140, 0)), u = u.slice(l, s), l > 0 && (u = "'{snip} ".concat(u)), s < y && (u += " {snip}"), u
			}

			function w(g, E) {
				if (!Array.isArray(g)) return "";
				for (var u = [], y = 0; y < g.length; y++) {
					var l = g[y];
					try {
						u.push(String(l))
					} catch (s) {
						u.push("[value cannot be serialized]")
					}
				}
				return u.join(E)
			}

			function I(g, E) {
				var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
				return (0, f.isString)(g) ? (0, f.isRegExp)(E) ? E.test(g) : (0, f.isString)(E) ? u ? g === E : g.includes(E) : !1 : !1
			}

			function _(g) {
				var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
					u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
				return E.some(function(y) {
					return I(g, y, u)
				})
			}

			function h(g) {
				return g.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
			}
		},
		831829: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(s, v) {
				for (var o in v) Object.defineProperty(s, o, {
					enumerable: !0,
					get: v[o]
				})
			}
			N(b, {
				isNativeFetch: function() {
					return g
				},
				supportsDOMError: function() {
					return I
				},
				supportsDOMException: function() {
					return _
				},
				supportsErrorEvent: function() {
					return w
				},
				supportsFetch: function() {
					return h
				},
				supportsHistory: function() {
					return l
				},
				supportsNativeFetch: function() {
					return E
				},
				supportsReferrerPolicy: function() {
					return y
				},
				supportsReportingObserver: function() {
					return u
				}
			});
			var f = d(755770),
				P = d(649097),
				x = (0, P.getGlobalObject)();

			function w() {
				try {
					return new ErrorEvent(""), !0
				} catch (s) {
					return !1
				}
			}

			function I() {
				try {
					return new DOMError(""), !0
				} catch (s) {
					return !1
				}
			}

			function _() {
				try {
					return new DOMException(""), !0
				} catch (s) {
					return !1
				}
			}

			function h() {
				if (!("fetch" in x)) return !1;
				try {
					return new Headers, new Request("http://www.example.com"), new Response, !0
				} catch (s) {
					return !1
				}
			}

			function g(s) {
				return s && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(s.toString())
			}

			function E() {
				if (!h()) return !1;
				if (g(x.fetch)) return !0;
				var s = !1,
					v = x.document;
				if (v && typeof v.createElement == "function") try {
					var o = v.createElement("iframe");
					o.hidden = !0, v.head.appendChild(o), o.contentWindow && o.contentWindow.fetch && (s = g(o.contentWindow.fetch)), v.head.removeChild(o)
				} catch (p) {
					(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", p)
				}
				return s
			}

			function u() {
				return "ReportingObserver" in x
			}

			function y() {
				if (!h()) return !1;
				try {
					return new Request("_", {
						referrerPolicy: "origin"
					}), !0
				} catch (s) {
					return !1
				}
			}

			function l() {
				var s = x.chrome,
					v = s && s.app && s.app.runtime,
					o = "history" in x && !!x.history.pushState && !!x.history.replaceState;
				return !v && o
			}
		},
		918258: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(h, g) {
				for (var E in g) Object.defineProperty(h, E, {
					enumerable: !0,
					get: g[E]
				})
			}
			N(b, {
				SyncPromise: function() {
					return _
				},
				rejectedSyncPromise: function() {
					return I
				},
				resolvedSyncPromise: function() {
					return w
				}
			});
			var f = d(51855);

			function P(h, g) {
				if (!(h instanceof g)) throw new TypeError("Cannot call a class as a function")
			}
			var x;
			(function(h) {
				var g = 0;
				h[h.PENDING = g] = "PENDING";
				var E = 1;
				h[h.RESOLVED = E] = "RESOLVED";
				var u = 2;
				h[h.REJECTED = u] = "REJECTED"
			})(x || (x = {}));

			function w(h) {
				return new _(function(g) {
					g(h)
				})
			}

			function I(h) {
				return new _(function(g, E) {
					E(h)
				})
			}
			var _ = function() {
				"use strict";

				function h(E) {
					P(this, h), h.prototype.__init.call(this), h.prototype.__init2.call(this), h.prototype.__init3.call(this), h.prototype.__init4.call(this), h.prototype.__init5.call(this), h.prototype.__init6.call(this);
					try {
						E(this._resolve, this._reject)
					} catch (u) {
						this._reject(u)
					}
				}
				var g = h.prototype;
				return g.__init = function() {
					this._state = x.PENDING
				}, g.__init2 = function() {
					this._handlers = []
				}, g.then = function(u, y) {
					var l = this;
					return new h(function(s, v) {
						l._handlers.push([!1, function(o) {
							if (!u) s(o);
							else try {
								s(u(o))
							} catch (p) {
								v(p)
							}
						}, function(o) {
							if (!y) v(o);
							else try {
								s(y(o))
							} catch (p) {
								v(p)
							}
						}]), l._executeHandlers()
					})
				}, g.catch = function(u) {
					return this.then(function(y) {
						return y
					}, u)
				}, g.finally = function(u) {
					var y = this;
					return new h(function(l, s) {
						var v, o;
						return y.then(function(p) {
							o = !1, v = p, u && u()
						}, function(p) {
							o = !0, v = p, u && u()
						}).then(function() {
							if (o) {
								s(v);
								return
							}
							l(v)
						})
					})
				}, g.__init3 = function() {
					var u = this;
					this._resolve = function(y) {
						u._setResult(x.RESOLVED, y)
					}
				}, g.__init4 = function() {
					var u = this;
					this._reject = function(y) {
						u._setResult(x.REJECTED, y)
					}
				}, g.__init5 = function() {
					var u = this;
					this._setResult = function(y, l) {
						if (u._state === x.PENDING) {
							if ((0, f.isThenable)(l)) {
								l.then(u._resolve, u._reject);
								return
							}
							u._state = y, u._value = l, u._executeHandlers()
						}
					}
				}, g.__init6 = function() {
					var u = this;
					this._executeHandlers = function() {
						if (u._state !== x.PENDING) {
							var y = u._handlers.slice();
							u._handlers = [], y.forEach(function(l) {
								l[0] || (u._state === x.RESOLVED && l[1](u._value), u._state === x.REJECTED && l[2](u._value), l[0] = !0)
							})
						}
					}
				}, h
			}()
		},
		189332: function(K, b, d) {
			"use strict";
			K = d.nmd(K), Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(o, p) {
				for (var a in p) Object.defineProperty(o, a, {
					enumerable: !0,
					get: p[a]
				})
			}
			N(b, {
				_browserPerformanceTimeOriginMode: function() {
					return s
				},
				browserPerformanceTimeOrigin: function() {
					return v
				},
				dateTimestampInSeconds: function() {
					return E
				},
				timestampInSeconds: function() {
					return u
				},
				timestampWithMs: function() {
					return y
				},
				usingPerformanceAPI: function() {
					return l
				}
			});
			var f = d(487652),
				P = d(649097),
				x = (0, P.getGlobalObject)(),
				w = {
					nowSeconds: function() {
						return Date.now() / 1e3
					}
				};

			function I() {
				var o = x.performance;
				if (!(!o || !o.now)) {
					var p = Date.now() - o.now();
					return {
						now: function() {
							return o.now()
						},
						timeOrigin: p
					}
				}
			}

			function _() {
				try {
					var o = (0, f.dynamicRequire)(K, "perf_hooks");
					return o.performance
				} catch (p) {
					return
				}
			}
			var h = (0, f.isNodeEnv)() ? _() : I(),
				g = h === void 0 ? w : {
					nowSeconds: function() {
						return (h.timeOrigin + h.now()) / 1e3
					}
				},
				E = w.nowSeconds.bind(w),
				u = g.nowSeconds.bind(g),
				y = u,
				l = h !== void 0,
				s, v = function() {
					var o = x.performance;
					if (!o || !o.now) {
						s = "none";
						return
					}
					var p = 3600 * 1e3,
						a = o.now(),
						i = Date.now(),
						t = o.timeOrigin ? Math.abs(o.timeOrigin + a - i) : p,
						e = t < p,
						n = o.timing && o.timing.navigationStart,
						r = typeof n == "number",
						c = r ? Math.abs(n + a - i) : p,
						A = c < p;
					return e || A ? t <= c ? (s = "timeOrigin", o.timeOrigin) : (s = "navigationStart", n) : (s = "dateNow", i)
				}()
		},
		309193: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(P, x) {
				for (var w in x) Object.defineProperty(P, w, {
					enumerable: !0,
					get: x[w]
				})
			}
			d(b, {
				TRACEPARENT_REGEXP: function() {
					return N
				},
				extractTraceparentData: function() {
					return f
				}
			});
			var N = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

			function f(P) {
				var x = P.match(N);
				if (!(!P || !x)) {
					var w;
					return x[3] === "1" ? w = !0 : x[3] === "0" && (w = !1), {
						traceId: x[1],
						parentSampled: w,
						parentSpanId: x[2]
					}
				}
			}
		},
		152682: function(K, b) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function d(x, w) {
				for (var I in w) Object.defineProperty(x, I, {
					enumerable: !0,
					get: w[I]
				})
			}
			d(b, {
				getNumberOfUrlSegments: function() {
					return P
				},
				parseUrl: function() {
					return N
				},
				stripUrlQueryAndFragment: function() {
					return f
				}
			});

			function N(x) {
				if (!x) return {};
				var w = x.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
				if (!w) return {};
				var I = w[6] || "",
					_ = w[8] || "";
				return {
					host: w[4],
					path: w[5],
					protocol: w[2],
					relative: w[5] + I + _
				}
			}

			function f(x) {
				return x.split(/[\?#]/, 1)[0]
			}

			function P(x) {
				return x.split(/\\?\//).filter(function(w) {
					return w.length > 0 && w !== ","
				}).length
			}
		},
		649097: function(K, b, d) {
			"use strict";
			Object.defineProperty(b, "__esModule", {
				value: !0
			});

			function N(I, _) {
				for (var h in _) Object.defineProperty(I, h, {
					enumerable: !0,
					get: _[h]
				})
			}
			N(b, {
				GLOBAL_OBJ: function() {
					return P
				},
				getGlobalObject: function() {
					return x
				},
				getGlobalSingleton: function() {
					return w
				}
			});

			function f(I) {
				return I && I.Math == Math ? I : void 0
			}
			var P = typeof globalThis == "object" && f(globalThis) || typeof window == "object" && f(window) || typeof self == "object" && f(self) || typeof d.g == "object" && f(d.g) || function() {
				return this
			}() || {};

			function x() {
				return P
			}

			function w(I, _, h) {
				var g = h || P,
					E = g.__SENTRY__ = g.__SENTRY__ || {},
					u = E[I] || (E[I] = _());
				return u
			}
		},
		986583: function(K) {
			"use strict";

			function b(M, C) {
				(C == null || C > M.length) && (C = M.length);
				for (var k = 0, z = new Array(C); k < C; k++) z[k] = M[k];
				return z
			}

			function d(M) {
				if (Array.isArray(M)) return M
			}

			function N(M) {
				if (Array.isArray(M)) return b(M)
			}

			function f(M, C, k, z, V, Q, q) {
				try {
					var ne = M[Q](q),
						ie = ne.value
				} catch (re) {
					k(re);
					return
				}
				ne.done ? C(ie) : Promise.resolve(ie).then(z, V)
			}

			function P(M) {
				return function() {
					var C = this,
						k = arguments;
					return new Promise(function(z, V) {
						var Q = M.apply(C, k);

						function q(ie) {
							f(Q, z, V, q, ne, "next", ie)
						}

						function ne(ie) {
							f(Q, z, V, q, ne, "throw", ie)
						}
						q(void 0)
					})
				}
			}

			function x(M, C, k) {
				return C in M ? Object.defineProperty(M, C, {
					value: k,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : M[C] = k, M
			}

			function w(M, C) {
				return C != null && typeof Symbol != "undefined" && C[Symbol.hasInstance] ? !!C[Symbol.hasInstance](M) : M instanceof C
			}

			function I(M) {
				if (typeof Symbol != "undefined" && M[Symbol.iterator] != null || M["@@iterator"] != null) return Array.from(M)
			}

			function _(M, C) {
				var k = M == null ? null : typeof Symbol != "undefined" && M[Symbol.iterator] || M["@@iterator"];
				if (k != null) {
					var z = [],
						V = !0,
						Q = !1,
						q, ne;
					try {
						for (k = k.call(M); !(V = (q = k.next()).done) && (z.push(q.value), !(C && z.length === C)); V = !0);
					} catch (ie) {
						Q = !0, ne = ie
					} finally {
						try {
							!V && k.return != null && k.return()
						} finally {
							if (Q) throw ne
						}
					}
					return z
				}
			}

			function h() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function g() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}

			function E(M) {
				for (var C = 1; C < arguments.length; C++) {
					var k = arguments[C] != null ? arguments[C] : {},
						z = Object.keys(k);
					typeof Object.getOwnPropertySymbols == "function" && (z = z.concat(Object.getOwnPropertySymbols(k).filter(function(V) {
						return Object.getOwnPropertyDescriptor(k, V).enumerable
					}))), z.forEach(function(V) {
						x(M, V, k[V])
					})
				}
				return M
			}

			function u(M, C) {
				if (M == null) return {};
				var k = y(M, C),
					z, V;
				if (Object.getOwnPropertySymbols) {
					var Q = Object.getOwnPropertySymbols(M);
					for (V = 0; V < Q.length; V++) z = Q[V], !(C.indexOf(z) >= 0) && (!Object.prototype.propertyIsEnumerable.call(M, z) || (k[z] = M[z]))
				}
				return k
			}

			function y(M, C) {
				if (M == null) return {};
				var k = {},
					z = Object.keys(M),
					V, Q;
				for (Q = 0; Q < z.length; Q++) V = z[Q], !(C.indexOf(V) >= 0) && (k[V] = M[V]);
				return k
			}

			function l(M, C) {
				return d(M) || _(M, C) || v(M, C) || h()
			}

			function s(M) {
				return N(M) || I(M) || v(M) || g()
			}

			function v(M, C) {
				if (!!M) {
					if (typeof M == "string") return b(M, C);
					var k = Object.prototype.toString.call(M).slice(8, -1);
					if (k === "Object" && M.constructor && (k = M.constructor.name), k === "Map" || k === "Set") return Array.from(k);
					if (k === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(k)) return b(M, C)
				}
			}

			function o(M, C) {
				var k, z, V, Q, q = {
					label: 0,
					sent: function() {
						if (V[0] & 1) throw V[1];
						return V[1]
					},
					trys: [],
					ops: []
				};
				return Q = {
					next: ne(0),
					throw: ne(1),
					return: ne(2)
				}, typeof Symbol == "function" && (Q[Symbol.iterator] = function() {
					return this
				}), Q;

				function ne(re) {
					return function(ue) {
						return ie([re, ue])
					}
				}

				function ie(re) {
					if (k) throw new TypeError("Generator is already executing.");
					for (; q;) try {
						if (k = 1, z && (V = re[0] & 2 ? z.return : re[0] ? z.throw || ((V = z.return) && V.call(z), 0) : z.next) && !(V = V.call(z, re[1])).done) return V;
						switch (z = 0, V && (re = [re[0] & 2, V.value]), re[0]) {
							case 0:
							case 1:
								V = re;
								break;
							case 4:
								return q.label++, {
									value: re[1],
									done: !1
								};
							case 5:
								q.label++, z = re[1], re = [0];
								continue;
							case 7:
								re = q.ops.pop(), q.trys.pop();
								continue;
							default:
								if (V = q.trys, !(V = V.length > 0 && V[V.length - 1]) && (re[0] === 6 || re[0] === 2)) {
									q = 0;
									continue
								}
								if (re[0] === 3 && (!V || re[1] > V[0] && re[1] < V[3])) {
									q.label = re[1];
									break
								}
								if (re[0] === 6 && q.label < V[1]) {
									q.label = V[1], V = re;
									break
								}
								if (V && q.label < V[2]) {
									q.label = V[2], q.ops.push(re);
									break
								}
								V[2] && q.ops.pop(), q.trys.pop();
								continue
						}
						re = C.call(M, q)
					} catch (ue) {
						re = [6, ue], z = 0
					} finally {
						k = V = 0
					}
					if (re[0] & 5) throw re[1];
					return {
						value: re[0] ? re[1] : void 0,
						done: !0
					}
				}
			}
			var p = Object.defineProperty,
				a = Object.getOwnPropertyDescriptor,
				i = Object.getOwnPropertyNames,
				t = Object.prototype.hasOwnProperty,
				e = function(M, C) {
					return function() {
						return M && (C = (0, M[i(M)[0]])(M = 0)), C
					}
				},
				n = function(M, C) {
					for (var k in C) p(M, k, {
						get: C[k],
						enumerable: !0
					})
				},
				r = function(M, C, k, z) {
					if (C && typeof C == "object" || typeof C == "function") {
						var V = !0,
							Q = !1,
							q = void 0;
						try {
							for (var ne = function() {
									var ue = re.value;
									!t.call(M, ue) && ue !== k && p(M, ue, {
										get: function() {
											return C[ue]
										},
										enumerable: !(z = a(C, ue)) || z.enumerable
									})
								}, ie = i(C)[Symbol.iterator](), re; !(V = (re = ie.next()).done); V = !0) ne()
						} catch (ue) {
							Q = !0, q = ue
						} finally {
							try {
								!V && ie.return != null && ie.return()
							} finally {
								if (Q) throw q
							}
						}
					}
					return M
				},
				c = function(M) {
					return r(p({}, "__esModule", {
						value: !0
					}), M)
				},
				A, S = e({
					"../../node_modules/.pnpm/nanoid@4.0.2/node_modules/nanoid/url-alphabet/index.js": function() {
						A = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"
					}
				}),
				m = {};
			n(m, {
				customAlphabet: function() {
					return j
				},
				customRandom: function() {
					return R
				},
				nanoid: function() {
					return H
				},
				random: function() {
					return O
				},
				urlAlphabet: function() {
					return A
				}
			});
			var O, R, j, H, $ = e({
					"../../node_modules/.pnpm/nanoid@4.0.2/node_modules/nanoid/index.browser.js": function() {
						S(), O = function(M) {
							return crypto.getRandomValues(new Uint8Array(M))
						}, R = function(M, C, k) {
							var z = (2 << Math.log(M.length - 1) / Math.LN2) - 1,
								V = -~(1.6 * z * C / M.length);
							return function() {
								for (var Q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : C, q = "";;)
									for (var ne = k(V), ie = V; ie--;)
										if (q += M[ne[ie] & z] || "", q.length === Q) return q
							}
						}, j = function(M) {
							var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 21;
							return R(M, C, O)
						}, H = function() {
							var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 21;
							return crypto.getRandomValues(new Uint8Array(M)).reduce(function(C, k) {
								return k &= 63, k < 36 ? C += k.toString(36) : k < 62 ? C += (k - 26).toString(36).toUpperCase() : k > 62 ? C += "-" : C += "_", C
							}, "")
						}
					}
				}),
				X = {};
			n(X, {
				RUM_PREFIX: function() {
					return ve
				},
				default: function() {
					return hr
				},
				getA11yData: function() {
					return ot
				},
				getCumulativeLayoutShift: function() {
					return He
				},
				getDecodedBodySize: function() {
					return ze
				},
				getDomContentLoadedEventEnd: function() {
					return Ve
				},
				getDomContentLoadedEventStart: function() {
					return Xe
				},
				getDomainLookup: function() {
					return $e
				},
				getEncodedBodySize: function() {
					return Qe
				},
				getFirstContentfulPaint: function() {
					return Ke
				},
				getFirstInputDelay: function() {
					return Ze
				},
				getLargestContentfulPaint: function() {
					return qe
				},
				getLoadEventEnd: function() {
					return et
				},
				getLoadEventStart: function() {
					return tt
				},
				getPerformanceMetrics: function() {
					return Te
				},
				getResponseStart: function() {
					return rt
				},
				getTcpConnection: function() {
					return nt
				},
				getTlsNegotiation: function() {
					return it
				},
				init: function() {
					return gt
				},
				mark: function() {
					return qt
				},
				measure: function() {
					return er
				},
				trackEventsV2Factory: function() {
					return gr
				},
				trackLoadPerformance: function() {
					return yr
				},
				trackSqspImages: function() {
					return st
				}
			}), K.exports = c(X);
			var J = {};
			n(J, {
				getCumulativeLayoutShift: function() {
					return He
				},
				getDecodedBodySize: function() {
					return ze
				},
				getDomContentLoadedEventEnd: function() {
					return Ve
				},
				getDomContentLoadedEventStart: function() {
					return Xe
				},
				getDomainLookup: function() {
					return $e
				},
				getEncodedBodySize: function() {
					return Qe
				},
				getFirstContentfulPaint: function() {
					return Ke
				},
				getFirstInputDelay: function() {
					return Ze
				},
				getLargestContentfulPaint: function() {
					return qe
				},
				getLoadEventEnd: function() {
					return et
				},
				getLoadEventStart: function() {
					return tt
				},
				getResponseStart: function() {
					return rt
				},
				getTcpConnection: function() {
					return nt
				},
				getTlsNegotiation: function() {
					return it
				}
			});
			var T, B, G, L, F = -1,
				U = function(C) {
					addEventListener("pageshow", function(k) {
						k.persisted && (F = k.timeStamp, C(k))
					}, !0)
				},
				W = function() {
					return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
				},
				D = function() {
					var C = W();
					return C && C.activationStart || 0
				},
				Y = function(C, k) {
					var z = W(),
						V = "navigate";
					return F >= 0 ? V = "back-forward-cache" : z && (V = document.prerendering || D() > 0 ? "prerender" : document.wasDiscarded ? "restore" : z.type.replace(/_/g, "-")), {
						name: C,
						value: k === void 0 ? -1 : k,
						rating: "good",
						delta: 0,
						entries: [],
						id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
						navigationType: V
					}
				},
				Z = function(C, k, z) {
					try {
						if (PerformanceObserver.supportedEntryTypes.includes(C)) {
							var V = new PerformanceObserver(function(Q) {
								Promise.resolve().then(function() {
									k(Q.getEntries())
								})
							});
							return V.observe(Object.assign({
								type: C,
								buffered: !0
							}, z || {})), V
						}
					} catch (Q) {}
				},
				ee = function(C, k, z, V) {
					var Q, q;
					return function(ne) {
						k.value >= 0 && (ne || V) && ((q = k.value - (Q || 0)) || Q === void 0) && (Q = k.value, k.delta = q, k.rating = function(ie, re) {
							return ie > re[1] ? "poor" : ie > re[0] ? "needs-improvement" : "good"
						}(k.value, z), C(k))
					}
				},
				te = function(C) {
					requestAnimationFrame(function() {
						return requestAnimationFrame(function() {
							return C()
						})
					})
				},
				oe = function(C) {
					var k = function(V) {
						V.type !== "pagehide" && document.visibilityState !== "hidden" || C(V)
					};
					addEventListener("visibilitychange", k, !0), addEventListener("pagehide", k, !0)
				},
				ce = function(C) {
					var k = !1;
					return function(z) {
						k || (C(z), k = !0)
					}
				},
				ae = -1,
				se = function() {
					return document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0
				},
				le = function(C) {
					document.visibilityState === "hidden" && ae > -1 && (ae = C.type === "visibilitychange" ? C.timeStamp : 0, Ot())
				},
				Ce = function() {
					addEventListener("visibilitychange", le, !0), addEventListener("prerenderingchange", le, !0)
				},
				Ot = function() {
					removeEventListener("visibilitychange", le, !0), removeEventListener("prerenderingchange", le, !0)
				},
				Se = function() {
					return ae < 0 && (ae = se(), Ce(), U(function() {
						setTimeout(function() {
							ae = se(), Ce()
						}, 0)
					})), {
						get firstHiddenTime() {
							return ae
						}
					}
				},
				Oe = function(C) {
					document.prerendering ? addEventListener("prerenderingchange", function() {
						return C()
					}, !0) : C()
				},
				Me = [1800, 3e3],
				xe = function(C, k) {
					k = k || {}, Oe(function() {
						var z, V = Se(),
							Q = Y("FCP"),
							q = Z("paint", function(ne) {
								ne.forEach(function(ie) {
									ie.name === "first-contentful-paint" && (q.disconnect(), ie.startTime < V.firstHiddenTime && (Q.value = Math.max(ie.startTime - D(), 0), Q.entries.push(ie), z(!0)))
								})
							});
						q && (z = ee(C, Q, Me, k.reportAllChanges), U(function(ne) {
							Q = Y("FCP"), z = ee(C, Q, Me, k.reportAllChanges), te(function() {
								Q.value = performance.now() - ne.timeStamp, z(!0)
							})
						}))
					})
				},
				Le = [.1, .25],
				Et = function(C, k) {
					k = k || {}, xe(ce(function() {
						var z, V = Y("CLS", 0),
							Q = 0,
							q = [],
							ne = function(ue) {
								ue.forEach(function(fe) {
									if (!fe.hadRecentInput) {
										var ye = q[0],
											me = q[q.length - 1];
										Q && fe.startTime - me.startTime < 1e3 && fe.startTime - ye.startTime < 5e3 ? (Q += fe.value, q.push(fe)) : (Q = fe.value, q = [fe])
									}
								}), Q > V.value && (V.value = Q, V.entries = q, z())
							},
							ie = Z("layout-shift", ne);
						ie && (z = ee(C, V, Le, k.reportAllChanges), oe(function() {
							ne(ie.takeRecords()), z(!0)
						}), U(function() {
							Q = 0, V = Y("CLS", 0), z = ee(C, V, Le, k.reportAllChanges), te(function() {
								return z()
							})
						}), setTimeout(z, 0))
					}))
				},
				ge = {
					passive: !0,
					capture: !0
				},
				Pt = new Date,
				Ue = function(C, k) {
					T || (T = k, B = C, G = new Date, ke(removeEventListener), Be())
				},
				Be = function() {
					if (B >= 0 && B < G - Pt) {
						var C = {
							entryType: "first-input",
							name: T.type,
							target: T.target,
							cancelable: T.cancelable,
							startTime: T.timeStamp,
							processingStart: T.timeStamp + B
						};
						L.forEach(function(k) {
							k(C)
						}), L = []
					}
				},
				wt = function(C) {
					if (C.cancelable) {
						var k = (C.timeStamp > 1e12 ? new Date : performance.now()) - C.timeStamp;
						C.type == "pointerdown" ? function(z, V) {
							var Q = function() {
									Ue(z, V), ne()
								},
								q = function() {
									ne()
								},
								ne = function() {
									removeEventListener("pointerup", Q, ge), removeEventListener("pointercancel", q, ge)
								};
							addEventListener("pointerup", Q, ge), addEventListener("pointercancel", q, ge)
						}(k, C) : Ue(k, C)
					}
				},
				ke = function(C) {
					["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(k) {
						return C(k, wt, ge)
					})
				},
				Fe = [100, 300],
				Tt = function(C, k) {
					k = k || {}, Oe(function() {
						var z, V = Se(),
							Q = Y("FID"),
							q = function(ue) {
								ue.startTime < V.firstHiddenTime && (Q.value = ue.processingStart - ue.startTime, Q.entries.push(ue), z(!0))
							},
							ne = function(ue) {
								ue.forEach(q)
							},
							ie = Z("first-input", ne);
						z = ee(C, Q, Fe, k.reportAllChanges), ie && oe(ce(function() {
							ne(ie.takeRecords()), ie.disconnect()
						})), ie && U(function() {
							var re;
							Q = Y("FID"), z = ee(C, Q, Fe, k.reportAllChanges), L = [], B = -1, T = null, ke(addEventListener), re = q, L.push(re), Be()
						})
					})
				},
				br = 1 / 0,
				Ge = [2500, 4e3],
				Ee = {},
				At = function(C, k) {
					k = k || {}, Oe(function() {
						var z, V = Se(),
							Q = Y("LCP"),
							q = function(ue) {
								var fe = ue[ue.length - 1];
								fe && fe.startTime < V.firstHiddenTime && (Q.value = Math.max(fe.startTime - D(), 0), Q.entries = [fe], z())
							},
							ne = Z("largest-contentful-paint", q);
						if (ne) {
							z = ee(C, Q, Ge, k.reportAllChanges);
							var ie = ce(function() {
								Ee[Q.id] || (q(ne.takeRecords()), ne.disconnect(), Ee[Q.id] = !0, z(!0))
							});
							["keydown", "click"].forEach(function(re) {
								addEventListener(re, ie, !0)
							}), oe(ie), U(function(re) {
								Q = Y("LCP"), z = ee(C, Q, Ge, k.reportAllChanges), te(function() {
									Q.value = performance.now() - re.timeStamp, Ee[Q.id] = !0, z(!0)
								})
							})
						}
					})
				},
				He = function(M) {
					Et(function(C) {
						var k;
						M({
							cumulativeLayoutShift: (k = C == null ? void 0 : C.value) !== null && k !== void 0 ? k : void 0
						})
					})
				},
				Rt = "/api/1/performance",
				It = "/records",
				jt = "load",
				We = "visibilitychange",
				Dt = "SS_MID",
				Nt = "SS_ANALYTICS_ID",
				Ct = 3e4,
				Mt = /(iPhone|iPod|iPad) OS ((1[0-2])|[2-9])_\d+.*AppleWebKit(?!.*Safari)/i,
				Pe = function(M) {
					return function() {
						for (var C = arguments.length, k = new Array(C), z = 0; z < C; z++) k[z] = arguments[z];
						return new Promise(function(V, Q) {
							try {
								M.apply(void 0, [function(q) {
									V(q)
								}].concat(s(k)))
							} catch (q) {
								Q(q)
							}
						})
					}
				},
				Je = function(M) {
					return Pe(setTimeout)(M)
				},
				Ye = function() {
					return Pe(function(M) {
						var C = function(k) {
							(k.type === "pagehide" || document.visibilityState === "hidden") && (M(k), removeEventListener("visibilitychange", C, !0), removeEventListener("pagehide", C, !0))
						};
						window.addEventListener("visibilitychange", C, !0), window.addEventListener("pagehide", C, !0)
					})()
				},
				xt = function(M) {
					document.readyState === "complete" ? window.setTimeout(M, 0) : window.addEventListener("pageshow", M, {
						once: !0
					})
				},
				Lt = function() {
					return Pe(xt)
				},
				Ut = function() {
					var M = {
							entryType: "navigation",
							startTime: 0
						},
						C = performance.timing;
					for (var k in C)
						if (k !== "navigationStart" && k !== "toJSON") {
							var z = Math.max(C[k] - C.navigationStart, 0);
							M[k] = z
						} return M
				},
				de = function() {
					var M = P(function(C) {
						var k, z, V, Q;
						return o(this, function(q) {
							switch (q.label) {
								case 0:
									return [4, Lt()];
								case 1:
									return q.sent(), k = l(window.performance.getEntriesByType("navigation"), 1), z = k[0], V = z != null ? z : Ut(), Q = V[C], typeof Q != "number" || Q < 0 || Q > 2147483647 ? [2] : [2, Math.round(Q)]
							}
						})
					});
					return function(k) {
						return M.apply(this, arguments)
					}
				}(),
				we = function(M, C) {
					if (typeof M == "number" && typeof C == "number" && M >= C) return M - C
				},
				ze = function(M) {
					return de("decodedBodySize").then(function(C) {
						M({
							decodedBodySize: C
						})
					})
				},
				$e = function(M) {
					return Promise.all([de("domainLookupEnd"), de("domainLookupStart")]).then(function(C) {
						var k = l(C, 2),
							z = k[0],
							V = k[1];
						M({
							domainLookup: we(z, V)
						})
					})
				},
				Ve = function(M) {
					return de("domContentLoadedEventEnd").then(function(C) {
						M({
							domContentLoadedEventEnd: C
						})
					})
				},
				Xe = function(M) {
					return de("domContentLoadedEventStart").then(function(C) {
						M({
							domContentLoadedEventStart: C
						})
					})
				},
				Qe = function(M) {
					return de("encodedBodySize").then(function(C) {
						M({
							encodedBodySize: C
						})
					})
				},
				Ke = function(M) {
					xe(function(C) {
						M({
							firstContentfulPaint: C ? Math.round(C.value) : void 0
						})
					})
				},
				Ze = function(M) {
					Tt(function(C) {
						M({
							firstInputDelay: C ? Math.round(C.value) : void 0
						})
					})
				},
				qe = function(M) {
					At(function(C) {
						M({
							largestContentfulPaint: C ? Math.round(C.value) : void 0
						})
					})
				},
				et = function(M) {
					return de("loadEventEnd").then(function(C) {
						M({
							loadEventEnd: C
						})
					})
				},
				tt = function(M) {
					return de("loadEventStart").then(function(C) {
						M({
							loadEventStart: C
						})
					})
				},
				rt = function(M) {
					return de("responseStart").then(function(C) {
						M({
							responseStart: C
						})
					})
				},
				nt = function(M) {
					return Promise.all([de("connectEnd"), de("connectStart")]).then(function(C) {
						var k = l(C, 2),
							z = k[0],
							V = k[1];
						M({
							tcpConnection: we(z, V)
						})
					})
				},
				it = function(M) {
					return Promise.all([de("connectEnd"), de("secureConnectionStart")]).then(function(C) {
						var k = l(C, 2),
							z = k[0],
							V = k[1];
						M({
							tlsNegotiation: we(z, V)
						})
					})
				};

			function Te(M) {
				Object.values(J).forEach(function() {
					var C = P(function(k) {
						var z, V, Q;
						return o(this, function(q) {
							switch (q.label) {
								case 0:
									return q.trys.push([0, 2, , 3]), [4, k(M)];
								case 1:
									return q.sent(), [3, 3];
								case 2:
									return z = q.sent(), window == null || (V = window.SQUARESPACE_SENTRY) === null || V === void 0 || (Q = V.captureException) === null || Q === void 0 || Q.call(V, z), [3, 3];
								case 3:
									return [2]
							}
						})
					});
					return function(k) {
						return C.apply(this, arguments)
					}
				}())
			}
			var Bt = ["more", "less", "custom"],
				Ae, kt = function() {
					return (Ae = Bt.find(function(M) {
						return window.matchMedia("prefers-contrast: ".concat(M)).matches
					})) !== null && Ae !== void 0 ? Ae : "no-preference"
				},
				ot = function() {
					var M;
					return {
						forceColors: window.matchMedia("(forced-colors: active)").matches,
						networkInformationType: (M = navigator.connection) === null || M === void 0 ? void 0 : M.type,
						prefersContrast: kt(),
						prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
					}
				},
				Ft = function(M) {
					M(ot(), "a11y")
				};

			function at(M) {
				var C = new RegExp("(^| )".concat(M, "=([^;]+)")),
					k = document.cookie.match(C);
				return k ? k[2] : ""
			}

			function Gt() {
				return !!(window.PerformanceMeasure && window.PerformanceMark)
			}

			function ut() {
				if (!Object.prototype.hasOwnProperty.call(window, "PerformanceObserver")) return !1;
				try {
					var M = new window.PerformanceObserver(function() {
						return null
					});
					M.observe({
						entryTypes: ["mark"]
					}), M.disconnect()
				} catch (C) {
					return !1
				}
				return !0
			}

			function ct() {
				var M;
				return typeof((M = window.navigator) === null || M === void 0 ? void 0 : M.sendBeacon) == "function" && !Mt.test(window.navigator.userAgent)
			}

			function Ht() {
				var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
					C, k, z, V, Q, q, ne;
				return {
					context: M,
					analyticsId: at(Nt),
					marketingId: at(Dt),
					memberId: (C = window.Static) === null || C === void 0 || (k = C.SQUARESPACE_CONTEXT) === null || k === void 0 || (z = k.authenticatedAccount) === null || z === void 0 ? void 0 : z.id,
					version: "4.9.2",
					downlink: (V = navigator.connection) === null || V === void 0 ? void 0 : V.downlink,
					effectiveType: (Q = navigator.connection) === null || Q === void 0 ? void 0 : Q.effectiveType,
					rtt: (q = navigator.connection) === null || q === void 0 ? void 0 : q.rtt,
					saveData: (ne = navigator.connection) === null || ne === void 0 ? void 0 : ne.saveData,
					deliveryType: ct() ? "beacon" : "xhr",
					devicePixelRatio: window.devicePixelRatio,
					screenHeight: window.screen.height,
					screenWidth: window.screen.width,
					viewportHeight: window.innerHeight,
					viewportWidth: window.innerWidth,
					deviceMemory: navigator.deviceMemory,
					hardwareConcurrency: navigator.hardwareConcurrency,
					hash: window.location.hash || "",
					hostname: window.location.hostname || "",
					pathname: window.location.pathname || "/"
				}
			}
			var Wt = function() {
					var M = P(function(C) {
						var k, z;
						return o(this, function(V) {
							switch (V.label) {
								case 0:
									return k = Ht(C), z = {}, Te(function(Q) {
										Object.assign(z, Q)
									}), [4, Promise.race([Je(6e4), Ye()])];
								case 1:
									return V.sent(), [2, E({}, k, z)]
							}
						})
					});
					return function(k) {
						return M.apply(this, arguments)
					}
				}(),
				Jt = function() {
					var M = P(function(C, k) {
						var z;
						return o(this, function(V) {
							switch (V.label) {
								case 0:
									return [4, Wt(k)];
								case 1:
									return z = V.sent(), C(z, "page_speed"), [2]
							}
						})
					});
					return function(k, z) {
						return M.apply(this, arguments)
					}
				}(),
				Yt = ["media-www.sqspcdn.com", "images.squarespace-cdn.com", "static1.squarespace.com"],
				zt = function(M) {
					return Yt.some(function(C) {
						return M.includes(C)
					})
				},
				$t = function(M) {
					return M.hasAttribute("data-loader") ? 2 : M.hasAttribute("data-src") ? 1 : 0
				},
				Vt = function(M, C) {
					if (M.hasAttribute("data-image-resolution")) {
						var k;
						return Number((k = M.getAttribute("data-image-resolution")) === null || k === void 0 ? void 0 : k.replace("w", ""))
					}
					var z = C.indexOf("format=");
					return z !== -1 ? Number(C.slice(z + 7).replace(/w.*/, "")) : NaN
				},
				Xt = function(M, C, k) {
					if (k === 1 && w(M, HTMLImageElement) && M.naturalHeight === 0) {
						var z = document.querySelector('div[style*="'.concat(C, '"]'));
						if (z) return z
					}
					return M
				},
				Qt = function(M) {
					if (w(M, HTMLImageElement)) {
						var C = M.naturalHeight,
							k = M.naturalWidth,
							z = M.width,
							V = M.height;
						return {
							naturalHeight: C,
							naturalWidth: k,
							width: z,
							height: V
						}
					}
					var Q = M.getBoundingClientRect(),
						q = Math.floor(Q.width),
						ne = Math.floor(Q.height);
					return {
						naturalHeight: ne,
						naturalWidth: q
					}
				},
				Kt = function() {
					var M = P(function(C, k) {
						var z, V, Q, q, ne, ie, re, ue, fe, ye, me, ht, je, _t, De, _e, bt;
						return o(this, function(Sr) {
							z = Vt(k, C.name), V = $t(k), Q = k.getAttribute("data-loader"), q = C.toJSON(), ne = q.serverTiming, ie = q.workerTiming, re = u(q, ["serverTiming", "workerTiming"]), ue = !0, fe = !1, ye = void 0;
							try {
								for (me = Object.entries(re)[Symbol.iterator](); !(ue = (ht = me.next()).done); ue = !0) je = l(ht.value, 2), _t = je[0], De = je[1], typeof De == "number" && (re[_t] = Math.floor(De))
							} catch (Ne) {
								fe = !0, ye = Ne
							} finally {
								try {
									!ue && me.return != null && me.return()
								} finally {
									if (fe) throw ye
								}
							}
							return _e = Xt(k, C.name, V), bt = Qt(_e), [2, new Promise(function(Ne) {
								var St = new IntersectionObserver(function(_r) {
									_r.forEach(function(be) {
										if (be.target === _e) return St.disconnect(), Ne(E({
											visibleOnLoad: be.isIntersecting,
											observationTime: Math.floor(be.time),
											intersectionRatio: be.intersectionRatio,
											squarespaceSize: z,
											imageType: V,
											imageLoaderType: Q
										}, bt, re))
									})
								});
								St.observe(_e)
							})]
						})
					});
					return function(k, z) {
						return M.apply(this, arguments)
					}
				}(),
				Zt = function() {
					var M = P(function(C) {
						var k, z, V, Q, q;
						return o(this, function(ne) {
							switch (ne.label) {
								case 0:
									return k = C.resource, z = C.deliverMetrics, !(w(k, PerformanceResourceTiming) && k.initiatorType === "img") || !zt(k.name) ? [2] : (V = k.name.replace(/\?.*/, ""), Q = Array.from(document.querySelectorAll('img[src="'.concat(k.name, '"], img[data-src*="').concat(V, '"], img[srcset*="').concat(k.name, '"]'))), document.querySelectorAll('picture > source[srcset="'.concat(k.name, '"]')).forEach(function(ie) {
										var re = ie.parentElement;
										re !== null && Q.push(re)
									}), Q.length !== 1 ? [2] : [4, Kt(k, Q[0])]);
								case 1:
									return q = ne.sent(), z(q, "image"), [2]
							}
						})
					});
					return function(k) {
						return M.apply(this, arguments)
					}
				}(),
				st = function() {
					var M = P(function(C) {
						var k, z;
						return o(this, function(V) {
							return ut() ? (k = function(Q) {
								return Zt({
									resource: Q,
									deliverMetrics: C
								})
							}, performance.getEntriesByType("resource").forEach(k), z = new PerformanceObserver(function(Q) {
								Q.getEntries().forEach(k)
							}), z.observe({
								entryTypes: ["resource"]
							}), [2]) : [2]
						})
					});
					return function(k) {
						return M.apply(this, arguments)
					}
				}(),
				pe, Re = function(M) {
					var C = M.spanName,
						k = M.tracer,
						z = M.startTime,
						V = M.spanAttributes,
						Q = V === void 0 ? {} : V;
					pe === void 0 && (pe = new Map);
					var q = k.startSpan(C, {
						startTime: z
					});
					q.setAttributes(Q), pe.set(C, q)
				},
				ft = function(M) {
					var C = M.spanName,
						k = M.spanAttributes,
						z = k === void 0 ? {} : k;
					if (!(pe === void 0 || !pe.has(C))) {
						var V = pe.get(C);
						V.setAttributes(z), V.end(), pe.delete(C)
					}
				},
				ve = "rum-",
				lt = function(M) {
					var C;
					typeof(window == null || (C = window.SQUARESPACE_SENTRY) === null || C === void 0 ? void 0 : C.captureException) == "function" ? window.SQUARESPACE_SENTRY.captureException(M): console.warn("@sqs/rum-collector: user timing exception: ".concat(M))
				};

			function qt(M) {
				var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				try {
					if (!dt()) return;
					var k = ve + M;
					window.performance.clearMarks(k);
					var z = window.performance.mark(k, {
						detail: C.detail,
						startTime: C.startTime
					});
					if (C.tracer !== void 0) {
						var V = l(window.performance.getEntriesByName(k, "mark").slice(-1), 1),
							Q = V[0];
						Re({
							spanName: M,
							tracer: C.tracer,
							startTime: Q.startTime,
							spanAttributes: C.spanAttributes
						})
					}
					return z
				} catch (q) {
					lt(q)
				}
			}

			function er(M) {
				var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
					requireStart: !1
				};
				try {
					if (!(dt() && tr())) return;
					var k = ve + M,
						z = {
							detail: C.detail,
							duration: C.duration
						};
					if (C.start === void 0 ? window.performance.getEntriesByName(k, "mark").length > 0 && (z.start = k) : typeof C.start == "string" ? z.start = ve + C.start : z.start = C.start, z.end = typeof C.end == "string" ? ve + C.end : C.end, C.requireStart && typeof z.start != "string") return;
					if (C.tracer !== void 0) {
						var V = E({
							measureName: k
						}, C.spanAttributes);
						if (typeof z.start == "number") Re({
							spanName: k,
							tracer: C.tracer,
							startTime: z.start
						}), ft({
							spanName: k,
							spanAttributes: V
						});
						else {
							var Q;
							if (window.performance.getEntriesByName((Q = z.start) !== null && Q !== void 0 ? Q : k, "mark").length === 0) {
								var q;
								Re({
									spanName: (q = z.start) !== null && q !== void 0 ? q : k,
									tracer: C.tracer,
									startTime: 0
								})
							}
							var ne;
							ft({
								spanName: (ne = z.start) !== null && ne !== void 0 ? ne : k,
								spanAttributes: V
							})
						}
					}
					nr(k, z);
					var ie = rr(k);
					return ie
				} catch (re) {
					lt(re)
				}
			}

			function tr() {
				return "performance" in window && "getEntries" in window.performance && "getEntriesByType" in window.performance && "getEntriesByName" in window.performance
			}

			function dt() {
				return "mark" in window.performance && "measure" in window.performance
			}

			function rr(M) {
				var C = window.performance.getEntriesByName(M, "measure");
				return C[C.length - 1]
			}

			function nr(M, C) {
				try {
					window.performance.measure(M, C)
				} catch (V) {
					var k = typeof C.start == "string" ? C.start : M,
						z = typeof C.end == "string" ? C.end : void 0;
					try {
						window.performance.measure(M, k, z)
					} catch (Q) {
						if (!w(Q, DOMException)) throw Q;
						try {
							window.performance.measure(M, "navigationStart")
						} catch (q) {
							if (!w(q, DOMException)) throw q;
							window.performance.measure(M)
						}
					}
				}
			}

			function ir(M) {
				return typeof M == "string" && M.substring(0, 4) === ve
			}

			function or(M) {
				var C = {};
				for (var k in M) typeof M[k] != "function" && (C[k] = M[k]);
				return C
			}
			var pt = new Set,
				ar = function(M) {
					if (!!Gt()) {
						var C = function(z) {
							var V = z.map(or);
							V.forEach(function(Q) {
								if (!!ir(Q.name)) {
									var q = "".concat(Q.name, "|").concat(Q.duration);
									pt.has(q) || (M(Q, "user"), pt.add(q))
								}
							})
						};
						if (C(window.performance.getEntriesByType("measure")), ut()) {
							var k = new window.PerformanceObserver(function(z) {
								return C(z.getEntries())
							});
							k.observe({
								entryTypes: ["measure"]
							})
						} else document.addEventListener(We, function() {
							document.visibilityState === "hidden" && C(window.performance.getEntriesByType("measure"))
						})
					}
				},
				vt, he = [],
				ur = function(M) {
					he.push(M)
				};

			function cr(M, C) {
				if (!(ct() && navigator.sendBeacon(M, C))) {
					var k = new XMLHttpRequest;
					k.open("POST", M, !0), k.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), k.send(C)
				}
			}

			function mt() {
				if (he.length) {
					var M = JSON.stringify(he);
					cr(Rt + It, M), he = []
				}
			}

			function sr() {
				window.addEventListener(jt, function() {
					vt = window.setTimeout(mt, Ct)
				}), document.addEventListener(We, function() {
					document.visibilityState === "hidden" && (window.clearTimeout(vt), mt())
				})
			}

			function fr(M) {
				ur(E({
					raw: !0
				}, M))
			}
			var lr = function(M, C) {
					return function(k, z) {
						var V = {
							app: M,
							data: k,
							event: z,
							pageLoadId: C,
							ts: Date.now()
						};
						fr(V)
					}
				},
				dr = function(M) {
					return function() {
						for (var C = arguments.length, k = new Array(C), z = 0; z < C; z++) k[z] = arguments[z];
						M && M.apply(void 0, s(k))
					}
				},
				pr = function(M) {
					var C = {
						appName: M.appName || "",
						context: M.context || {},
						enabled: typeof M.enabled == "boolean" ? M.enabled : !0,
						captureException: dr(M.captureException)
					};
					return C
				};

			function gt(M) {
				return Ie.apply(this, arguments)
			}

			function Ie() {
				return Ie = P(function(M) {
					var C, k, z;
					return o(this, function(V) {
						switch (V.label) {
							case 0:
								return C = pr(M), C.enabled ? [4, Promise.resolve().then(function() {
									return $(), m
								})] : [2];
							case 1:
								k = V.sent().nanoid();
								try {
									z = lr(C.appName, k), Jt(z, C.context), ar(z), st(z), Ft(z), sr()
								} catch (Q) {
									C.captureException(Q, {
										pageLoadId: k,
										parsedOptions: C
									})
								}
								return [2]
						}
					})
				}), Ie.apply(this, arguments)
			}
			var vr = {
					action: "load",
					actor: "user",
					event_owner_team: "web_performance",
					event_source: "web",
					object_type: "website"
				},
				mr = function() {
					var M = /^qa\d+.sqsp.net/g,
						C = /^stage.sqsp.net/g,
						k = /(dev.squarespace.net|localhost|127.0.0.1|0.0.0.0)/g,
						z = window.location.hostname.substr(window.location.hostname.indexOf(".") + 1);
					return C.test(z) || M.test(z) ? "staging" : k.test(z) ? "dev" : "prod"
				},
				gr = function(M) {
					var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : mr();
					return new M({
						customSchemaName: "Performance",
						sourceEnvironment: C
					}, vr)
				},
				yt = Object.freeze({
					cumulativeLayoutShift: "cumulative_layout_shift",
					decodedBodySize: "decoded_body_size_bytes",
					domContentLoadedEventEnd: "dom_content_loaded_event_end_ms",
					domContentLoadedEventStart: "dom_content_loaded_event_start_ms",
					domainLookup: "domain_lookup_ms",
					encodedBodySize: "encoded_body_size_bytes",
					firstContentfulPaint: "first_contentful_paint_ms",
					firstInputDelay: "first_input_delay_ms",
					largestContentfulPaint: "largest_contentful_paint_ms",
					loadEventEnd: "load_event_end_ms",
					loadEventStart: "load_event_start_ms",
					responseStart: "response_start_ms",
					tcpConnection: "tcp_connection_ms",
					tlsNegotiation: "tls_negotiation_ms"
				}),
				yr = function() {
					var M = P(function(C) {
						var k;
						return o(this, function(z) {
							switch (z.label) {
								case 0:
									return k = {}, Te(function(V) {
										Object.entries(V).forEach(function(Q) {
											var q = l(Q, 2),
												ne = q[0],
												ie = q[1];
											Object.prototype.hasOwnProperty.call(yt, ne) && (k[yt[ne]] = ie)
										})
									}), [4, Promise.race([Je(6e4), Ye()])];
								case 1:
									return z.sent(), C(k), [2]
							}
						})
					});
					return function(k) {
						return M.apply(this, arguments)
					}
				}();

			function hr() {
				for (var M = arguments.length, C = new Array(M), k = 0; k < M; k++) C[k] = arguments[k];
				return console.warn("@sqs/rum-collector default export is deprecated. Use named export `init` instead."), gt.apply(void 0, s(C))
			}
		}
	},
	function(K) {
		var b = function(N) {
				return K(K.s = N)
			},
			d = b(826522)
	}
]);
//# sourceMappingURL=https://sourcemaps.squarespace.net/universal/scripts-compressed/performance-cc5fdebde10d3ff206ad8-min.en-US.js.map