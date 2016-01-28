v
/*
 * Ctrip Lizard JavaScript Framework
 * Copyright(C) 2008 - 2016, All rights reserved,ctrip.com.
 * Date:2016-01-14 14:13:42
 * tag:w-2.2-201601141413
 */
define(["//res.wx.qq.com/open/js/jweixin-1.0.0.js"], function(a) {
	var b = "wx0a4845e45aaf634a",
		c = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"],
		d = ["getInstallState", "launch3rdApp"],
		e = c.concat(d),
		f = $("meta[name=weixinAppId]").attr("content");
	f && (b = f);
	var g = {
			calls: {
				ready: [],
				error: []
			},
			applyAll: function(a, b, c) {
				for (var d, e = 0; d = a[e++];) d.apply(b, c)
			},
			Array: function(a) {
				var b = [];
				if (a instanceof Array) b = a;
				else
					for (var c = 0; c < a.length; c++) b[c] = a[c];
				return b
			},
			load: function(c) {
				if (g.iniready) return void(c && "function" == typeof c && c(a));
				g.ready = !1, g.loading = !0;
				var d = {
						AppID: b,
						CurrentURL: window.location.href.replace(/#.*$/, "")
					},
					f = function(b) {
						a.config({
							beta: !0,
							debug: !1,
							appId: d.AppID,
							timestamp: b.Timestamp,
							nonceStr: b.Noncestr,
							signature: b.Signature,
							jsApiList: e
						}), g.iniready = !0, c && "function" == typeof c && c(a)
					};
				$.ajax({
					url: "//m.ctrip.com/restapi/soa2/10645/WeChatJSTicket",
					dataType: "jsonp",
					data: d,
					success: f
				})
			},
			available: function() {
				var b;
				Lizard.app.code.is("WEIXIN") && Lizard.app.version.lt("6.0.2") && (b = {});
				var d = function(a) {
						var c, d, f, g = a,
							i = 1;
						return _.isFunction(arguments[i]) && (c = arguments[i++], _.isFunction(arguments[i]) && (d = arguments[i++])), _.isArray(arguments[i]) ? (i = 0, f = arguments[i]) : f = arguments, e(function() {
							for (; i < f.length; i++) {
								var e = !!b[f[i]];
								if (e != a) {
									g = !a;
									break
								}
							}
							g && c && c(), !g && d && d(h)
						}), g
					},
					e = function(d) {
						b && d ? d() : a.checkJsApi({
							jsApiList: c,
							success: function(a) {
								b = a.checkResult, d && d()
							}
						})
					};
				return e(), {
					init: e,
					some: function() {
						var a = g.Array(arguments);
						a.unshift(!1), d.apply(null, a)
					},
					all: function() {
						var a = g.Array(arguments);
						a.unshift(!0), d.apply(null, a)
					}
				}
			}(),
			end: 0
		},
		h = new Error("unavailable");
	a.ready(function() {
		return g.ready = !0, delete g.error, g.applyAll(g.calls.ready), g.calls.ready = [], i
	}), a.error(function(a) {
		return g.ready = !1, g.error = new Error(a.errMsg), "config:invalid signature" == g.error ? g.load() : (g.applyAll(g.calls.error, [g.error]), g.calls.error = []), i
	});
	var i = {
		ready: function(a) {
			return g.ready ? a() : g.calls.ready.push(a), i
		},
		error: function(a) {
			return g.error ? a(g.error) : g.calls.error.push(a), i
		},
		init: function(a) {
			return g.load(a), i
		},
		METHOD: {
			detectDevice: {
				run: function(b) {
					a.getNetworkType({
						success: function(a) {
							b({
								networkType: a.networkType.toUpperCase()
							})
						}
					})
				},
				ping: function(a, b) {
					g.available.all(a, b, "getNetworkType")
				}
			},
			scanBarcode: {
				run: function(b) {
					a.scanQRCode({
						needResult: 1,
						scanType: ["barCode"],
						success: function(a) {
							b(a.resultStr)
						}
					})
				},
				ping: function(a, b) {
					g.available.all(a, b, "scanQRCode")
				}
			},
			scanQrcode: {
				run: function(b) {
					a.scanQRCode({
						needResult: 1,
						scanType: ["qrCode"],
						success: function(a) {
							b(a.resultStr)
						}
					})
				},
				ping: function(a, b) {
					g.available.all(a, b, "scanQRCode")
				}
			},
			share: {
				run: function(b, c, d) {
					var e = function() {
						c(new Error("canceled"))
					};
					a.onMenuShareTimeline({
						title: d.title,
						link: d.href,
						imgUrl: d.icon,
						success: b,
						cancel: e
					}), a.onMenuShareAppMessage({
						title: d.title,
						desc: d.desc,
						link: d.href,
						imgUrl: d.icon,
						type: d.type,
						dataUrl: d.src,
						success: b,
						cancel: e
					}), a.onMenuShareQQ({
						title: d.title,
						desc: d.desc,
						link: d.href,
						imgUrl: d.icon,
						success: b,
						cancel: e
					}), a.onMenuShareWeibo({
						title: d.title,
						desc: d.desc,
						link: d.href,
						imgUrl: d.icon,
						success: b,
						cancel: e
					})
				},
				ping: function(a, b) {
					g.available.some(a, b, "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo")
				}
			},
			voice2text: {
				run: function(b, c, d) {
					d = _.extend({
						duration: 5e3,
						replay: !0
					}, d), a.startRecord();
					var e = function() {
						a.stopRecord({
							success: function(c) {
								d.replay && a.playVoice({
									localId: c.localId
								}), a.translateVoice({
									localId: c.localId,
									isShowProgressTips: 1,
									success: function(a) {
										b(a.translateResult.replace("銆�", ""))
									}
								})
							}
						})
					};
					window.setTimeout(e, d.duration)
				},
				ping: function(a, b) {
					g.available.all(a, b, "startRecord", "stopRecord", "playVoice", "translateVoice")
				}
			},
			uploadimage: {
				run: function(b, c, d) {
					a.chooseImage({
						success: function(e) {
							function f(b, c) {
								a.uploadImage({
									localId: g[h],
									success: function(a) {
										b({
											res: a,
											localid: g[h]
										}), h++, i > h && setTimeout(function() {
											f(b, c)
										}, 100)
									},
									fail: function(a) {
										c(a)
									}
								})
							}
							var g = e.localIds,
								h = 0,
								i = g.length;
							if ("0" != g.length) {
								if (d.imgNumCheck && "function" == typeof d.imgNumCheck) {
									var j = d.imgNumCheck(i);
									if (!j) return
								}
								setTimeout(function() {
									f(b, c)
								}, 100)
							}
						}
					})
				},
				ping: function(a, b) {
					g.available.some(a, b, "chooseImage", "previewImage", "uploadImage")
				}
			},
			weiXinGlobal: {
				run: function(b, c) {
					try {
						b(a)
					} catch (d) {
						c(d)
					}
				},
				ping: function(a, b) {
					g.available.all(a, b, "chooseImage")
				}
			}
		}
	};
	return i
});