YUI.add("justified-grid", function(a) {
        a.namespace("Wexley");
        a.Wexley.JustifiedGrid = a.Base.create("justified-grid", a.Plugin.Base, [], {
            initializer: function() {
                this._render(this._getGridData());
                var b = function() {
                    a.Wexley.Site.requestAnimFrame(function() {
                        this._clearStyles();
                        this.refresh()
                    }.bind(this))
                }.bind(this);
                this.get("refreshOnResize") && window.addEventListener("resize", b)
            },
            destructor: function() {
                this._clearStyles();
                this._containerWidth = null
            },
            refresh: function() {
                this._render(this._getGridData())
            },
            _clearStyles: function() {
                this.get("host").setStyles({
                    position: null,
                    height: null,
                    overflow: null
                });
                this.get("host").all(this.get("slides")).each(function(a) {
                    a.removeAttribute("style");
                    a.one("img").removeAttribute("style")
                })
            },
            _getGridData: function() {
                this._containerWidth = this.get("host").get("clientWidth");
                var a = this.get("gutter"),
                    c = this.get("host").all(this.get("slides")),
                    e = [],
                    d = {
                        items: []
                    },
                    f = 0,
                    g = {};
                c.each(function(h, j) {
                    var i = g,
                        k, l = h.one("img");
                    k = this.get("initialHeight");
                    l = l.getAttribute("data-image-dimensions").split("x");
                    k *= parseInt(l[0], 10) / parseInt(l[1], 10);
                    i.width =
                        k;
                    g.el = h;
                    f + g.width + a * (0 < d.items.length ? d.items.length - 1 : 1) <= this._containerWidth || 1 > d.items.length ? (f += g.width, d.items.push(g)) : (d.width = f, d.scale = this._calculatescale(d, f), e.push(d), d = {
                        items: []
                    }, d.items.push(g), f = g.width);
                    j == c.size() - 1 && (d.width = f, d.scale = this._calculatescale(d, f), 1.5 < d.scale && (i = e[e.length - 2], d.scale = i ? i.width * i.scale > this._containerWidth - i.items.length * a ? i.scale : 1 : 1), e.push(d));
                    g = {}
                }, this);
                return e
            },
            _calculatescale: function(a, c) {
                return (this._containerWidth - this.get("gutter") * (a.items.length -
                    1)) / c
            },
            _render: function(b) {
                var c = this.get("gutter"),
                    e, d, f, g;
                "static" == this.get("host").getComputedStyle("position") && this.get("host").setStyles({
                    position: "relative",
                    overflow: "hidden"
                });
                a.Array.forEach(b, function(j, h) {
                    if (0 == j.items.length) return b.splice(h, 1), !1;
                    e || (e = 0);
                    f = this.get("initialHeight") * j.scale;
                    a.Array.forEach(j.items, function(a) {
                        d || (d = 0);
                        g = a.width * j.scale;
                        a.el.setStyles({
                            position: "absolute",
                            top: e,
                            left: d,
                            width: Math.ceil(g),
                            height: Math.ceil(f)
                        });
                        a.el.one("img") && a.el.one("img").setStyles({
                            minWidth: "100%"
                        });
                        d = d + g + c
                    });
                    e = e + f + c;
                    d = null
                }, this);
                var h = function() {
                    var a = this.get("host"),
                        b = a.one(this.get("slides") + ":last-child").getDOMNode().getBoundingClientRect().bottom - a.getDOMNode().getBoundingClientRect().top;
                    a.setStyles({
                        height: b
                    })
                }.bind(this);
                h();
                this.get("host").all(this.get("slides")).each(function(a) {
                    a = a.one("img");
                    ImageLoader.load(a, {
                        load: !0
                    });
                    a && (a.on("load", h), a.on("error", h))
                })
            }
        }, {
            NS: "justifiedgrid",
            ATTRS: {
                slides: {
                    value: "img"
                },
                gutter: {
                    value: 16
                },
                initialHeight: {
                    value: 300
                },
                refreshOnResize: {
                    value: !0
                }
            }
        })
    },
    "1.0", {
        requires: ["base", "plugin", "node", "squarespace-util", "transition"]
    });
Y.use(["node", "squarespace-gallery-ng", "squarespace-image-loader", "event-key", "justified-grid"], function(a) {
    a.namespace("Wexley");
    a.Wexley.Site = Singleton.create({
        ready: function() {
            this.thumbs = this.slideshow = null;
            this.requestAnimFrame = function(a) {
                return window.requestAnimationFrame(a) || window.webkitRequestAnimationFrame(a) || window.mozRequestAnimationFrame(a) || window.setTimeout(a, 1E3 / 60)
            };
            a.on("domready", this.initialize, this)
        },
        initialize: function() {
            this.setupNavigation();
            this._initializeThumbs();
            if (a.UA.mobile) a.one(a.config.win).on("orientationchange",
                function() {
                    this._initializeThumbs()
                }, this);
            if (a.one("body.collection-type-gallery")) this.setupGallery(), this.setupTweakHandlers();
            else if (a.one("body.collection-type-blog")) {
                var b = a.one("#sidebarWrapper");
                a.one("#page").setStyle("minHeight", b.get("offsetHeight"))
            }
        },
        _initializeThumbs: function() {
            800 < a.config.win.innerWidth && this.loadThumbs()
        },
        setupNavigation: function() {
            Modernizr && Modernizr.touch && a.all(".dropdown-hover .folder").each(function(a) {
                if (1 < a.all("a").size()) a.one("a").on("click", function(a) {
                    a.preventDefault()
                })
            });
            if (a.one(".mobile-nav")) {
                a.one("#mobileMenuLink").removeClass("hidden");
                var b = a.one("#mobileMenuLink a"),
                    c = a.all(".folder-toggle-label"),
                    e = function(b) {
                        var c = parseInt(a.one("#mobileNav .wrapper").get("offsetHeight"), 10);
                        a.one("#mobileNav").hasClass("menu-open") && !b.currentTarget.hasClass("folder-toggle-label") ? (new a.Anim({
                            node: a.one("#mobileNav"),
                            to: {
                                height: 0
                            },
                            duration: 0.5,
                            easing: "easeBoth"
                        })).run() : (new a.Anim({
                            node: a.one("#mobileNav"),
                            to: {
                                height: c
                            },
                            duration: 0.5,
                            easing: "easeBoth"
                        })).run();
                        a.one("#mobileNav").toggleClass("menu-open")
                    };
                if (b) b.on("click", e);
                if (0 < c.size()) c.on("click", function(b) {
                    a.later(100, this, function() {
                        e(b)
                    })
                })
            }
        },
        loadThumbs: function() {
            if (!a.one("body.full-view")) {
                var b = a.one("#thumbList");
                a.one("body.index-fullwidth") && b && b.one(".thumb") ? b.justifiedgrid ? b.justifiedgrid.refresh() : b.plug(a.Wexley.JustifiedGrid, {
                    slides: ".thumb",
                    gutter: parseInt(a.one(".thumb").getComputedStyle("marginRight")),
                    initialHeight: a.one(".thumb").get("clientHeight")
                }) : (b && b.justifiedgrid && b.justifiedgrid.destructor(), a.all("#thumbList img").each(function(a) {
                    a.setStyle("height",
                        null).get("parentNode").setStyles({
                        marginRight: null,
                        height: null,
                        width: null
                    });
                    ImageLoader.load(a.removeAttribute("data-load"))
                }))
            }
        },
        setupGallery: function() {
            if (800 > a.one("body").get("winWidth")) a.all("#slideshow .slide").each(function(b) {
                b.one(".sqs-video-wrapper") ? b.one(".sqs-video-wrapper").plug(a.Squarespace.VideoLoader) : ImageLoader.load(b.one("img").removeAttribute("data-load"))
            });
            else {
                var b = parseInt(a.Squarespace.Template.getTweakValue("outerPadding"), 10),
                    c = parseInt(a.Squarespace.Template.getTweakValue("logoSize"),
                        10);
                a.one(".logo-subtitle") && a.one(".logo-subtitle").get("offsetHeight");
                var e = a.one("#headerWrapper").get("offsetHeight");
                c > e && (e = c + parseInt(a.Squarespace.Template.getTweakValue("headerPadding"), 10));
                var d = a.one("#simpleControls").get("offsetHeight") + a.one("#numberControls").get("offsetHeight") + a.one("#dotControls").get("offsetHeight") + a.one("#tinyThumbControls").get("offsetHeight") + 40,
                    f = function() {
                        var c = a.one("body").get("winHeight"),
                            e = a.one("#headerWrapper").get("offsetHeight");
                        600 < c - b - 2 * e ? a.one("#slideshowWrapper").setStyle("height",
                            c - 2 * b - e - d) : a.one("#slideshowWrapper").setStyle("height", "600px")
                    };
                f();
                c = function() {
                    this.requestAnimFrame(function() {
                        this.loadThumbs();
                        f();
                        this.slideshow.refresh()
                    }.bind(this))
                }.bind(this);
                window.addEventListener("resize", c);
                c = (new a.HistoryHash).get("itemId");
                a.one("#slideshow .slide") && (this.slideshow = new a.Squarespace.Gallery2({
                    container: a.one("#slideshow"),
                    elements: {
                        next: ".next-slide",
                        previous: ".prev-slide",
                        controls: "#dotControls, #numberControls, #tinyThumbControls"
                    },
                    lazyLoad: !0,
                    loop: !0,
                    design: "stacked",
                    designOptions: {
                        autoHeight: !1,
                        preloadCount: 1
                    },
                    loaderOptions: {
                        mode: "fit"
                    },
                    historyHash: !0
                }));
                var g;
                a.one("#thumbList").delegate("click", function(b) {
                    g = a.config.win.scrollY;
                    this.slideshow.set("currentIndex", a.all(".thumb").indexOf(b.currentTarget));
                    a.one("body").addClass("full-view");
                    a.one("#slideshowWrapper").addClass("slideshow-ready")
                }, ".thumb", this);
                a.one("#imageInfoToggle").on("click", function() {
                    a.one("#slideshowWrapper").toggleClass("image-info-on")
                });
                a.one(window).on("key", function() {
                    a.one(".full-view") ?
                        a.Squarespace.EscManager.disable() : a.Squarespace.EscManager.enable()
                }, "esc");
                e = a.bind(function() {
                    a.one("body").removeClass("full-view");
                    a.one("#slideshowWrapper").removeClass("slideshow-ready");
                    window.history && window.history.replaceState && window.history.replaceState("itemId", null, Static.SQUARESPACE_CONTEXT.collection.fullUrl);
                    this.loadThumbs();
                    a.config.win.scrollTo(0, g)
                }, this);
                a.one("#backToThumbs").on("click", e, this);
                a.one(window).on("key", e, "esc");
                c && (c = a.one('#thumbList .thumb[data-slide-id\x3d"' +
                    c + '"]')) && c.simulate("click")
            }
            a.one("#backToThumbs").on("click", function() {
                a.all(".sqs-video-wrapper").each(function(a) {
                    a.videoloader.reload()
                })
            })
        },
        setupTweakHandlers: function() {
            a.Global.on("tweak:change", function(b) {
                var c = b.getName();
                "gallery-style" == c || "gallery-auto-play" == b.getName() ? "gallery-auto-play" == c && this.slideshow.set("autoplay", "true" === a.Squarespace.Template.getTweakValue("gallery-auto-play") + "") : null !== c.match(/indexItem|index-fullwidth/) && this.loadThumbs();
                "indexItemPadding" == c && (b =
                    a.one("#thumbList"), b.justifiedgrid && (b.justifiedgrid.set("gutter", parseInt(b.one(".thumb").getComputedStyle("marginRight"))), b.justifiedgrid.refresh()));
                "index-fullwidth" == c && this.setupGallery()
            }, this);
            a.Global.on(["tweak:reset", "tweak:beforeopen"], function() {
                this.slideshow && a.later(500, this, function() {
                    this.slideshow.refresh();
                    this.loadThumbs()
                })
            }, this);
            a.Global.on("tweak:close", function() {
                this.slideshow && a.later(500, this, function() {
                    this.slideshow.refresh();
                    this.loadThumbs()
                })
            }, this)
        }
    })
});