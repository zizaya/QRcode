/*
 * Ctrip Lizard JavaScript Framework
 * Copyright(C) 2008 - 2016, All rights reserved,ctrip.com.
 * Date:2016-01-13 13:57:05
 * tag:w-2.2-201601131356
 */
define([], function() {
	function a(a) {
		var b, c, d = this,
			e = {},
			f = 1,
			g = 0,
			h = function(a, d) {
				b = a, c = d, i(a)
			},
			i = function(a) {
				if (a == b) {
					var d = e[a];
					d && d.apply(null, c)
				}
			};
		d.done = function(a) {
			return e[f] = a, i(f), this
		}, d.fail = function(a) {
			return e[g] = a, i(g), this
		}, d.resolve = function() {
			return h.call(null, f, arguments), d
		}, d.reject = function() {
			return h.call(null, g, arguments), d
		}, a && (a.done = d.done, a.fail = d.fail)
	}

	function b(a) {
		function b() {
			var b = a.pre ? a.pre.apply(null, arguments) : arguments;
			return f.doCall(a.name, "run", b)
		}
		return b.ping = function() {
			return f.doCall(a.name, "ping", arguments)
		}, b
	}
	var c = ["detectDevice", "scanBarcode", "scanQrcode", {
			name: "share",
			pre: function() {
				return arguments
			},
			post: function(a) {
				return a
			},
			fail: function() {}
		}, "voice2text", "uploadimage", "weiXinGlobal"],
		d = {
			CTRIP_MASTER: 1,
			TECENT_WEIXIN: 1,
			CTRIP_DIS: 1
		},
		e = new Error("unavailable"),
		f = {
			calls: [],
			doCall: function(b, c, d) {
				var e, g, h;
				"object" == typeof d[0] ? (h = d[0], e = d[1], g = d[2]) : (e = d[0], "object" == typeof d[1] ? (h = d[1], g = d[2]) : (g = d[1], h = d[2]));
				var i = {},
					j = new a(i),
					k = function(a) {
						e && e(a), j.resolve(a)
					},
					l = function(a) {
						g && g(a), j.reject(a)
					},
					m = [k, l, h];
				return f.ready ? f.doExec(b, c, m) : f.error ? l(f.error) : f.calls.push({
					name: b,
					type: c,
					args: m
				}), i
			},
			doExec: function(a, b, c) {
				var d, e = f.methods[a],
					g = c[0],
					h = c[1];
				"function" == typeof e && (e = {
					run: e
				}), e && e.run ? (d = e[b]) ? d.apply(null, c) : g && g() : h && h(new Error("unavailable"))
			}
		},
		g = [Lizard.app.vendor, Lizard.app.code].join("_"),
		h = {};
	return d[g] ? ("CTRIP_DIS" === g && (g = "CTRIP_MASTER"), require(["cShell_" + g], function(a) {
		a.ready(function() {
			f.ready = !0, delete f.error, f.methods = a.METHOD;
			for (var b; b = f.calls.shift();) f.doExec(b.name, b.type, b.args)
		}).error(function() {
			f.ready = !1, f.error = e;
			for (var a; a = f.calls.shift();) a.args[1](f.error)
		}).init()
	})) : (f.ready = !1, f.error = e), h.weixin = function(a) {
		d[g] && require(["cShell_" + g], function(b) {
			b.init(a)
		})
	}, c.forEach(function(a) {
		"string" == typeof a && (a = {
			name: a
		}), h[a.name] = b(a)
	}), h
});