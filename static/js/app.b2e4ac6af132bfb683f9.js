webpackJsonp([1],{"+skl":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var _=a("7+uW"),n=a("Q8YG"),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("div",{staticClass:"content"},[a("Alert",{staticStyle:{margin:"0 auto 10px",width:"calc(100% - 16px)"},attrs:{type:"warning","show-icon":"",closable:""}},[t._v("\n      警告\n      "),a("span",{attrs:{slot:"desc"},slot:"desc"},[t._v("为避免不可预知的严重后果,请勿乱用本工具")])]),t._v(" "),a("div",{staticClass:"section"},[t._m(0),t._v(" "),a("div",{staticClass:"center"},[a("Row",{attrs:{type:"flex",justify:"center",align:"middle","class-name":"center-row"}},[a("Col",{attrs:{span:"2"}},[t._v("\n            抽奖地址 :\n          ")]),t._v(" "),a("Col",{attrs:{span:"10"}},[a("Input",{on:{"on-blur":t.acUrlChangeEvent},model:{value:t.acUrl,callback:function(e){t.acUrl=e},expression:"acUrl"}})],1)],1),t._v(" "),a("Row",{attrs:{type:"flex",justify:"center",align:"middle","class-name":"center-row"}},[a("Col",{attrs:{span:"2"}},[t._v("\n            抽奖数量 :\n          ")]),t._v(" "),a("Col",{attrs:{span:"3"}},[a("InputNumber",{attrs:{min:1},on:{"on-blur":t.numberChangeEvent},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v("\n            评论去重 :\n          ")]),t._v(" "),a("Col",{attrs:{span:"5"}},[a("i-switch",{on:{"on-change":t.repeatChangeEvent},model:{value:t.repeat,callback:function(e){t.repeat=e},expression:"repeat"}})],1)],1),t._v(" "),a("Row",{attrs:{type:"flex",justify:"center",align:"middle","class-name":"center-row"}},[a("Col",{attrs:{span:"14"}},[a("Button",{attrs:{type:"success",loading:t.loading,long:""},on:{click:t.lotteryDrawFunction}},[t._v("Go\n            ")])],1)],1)],1),t._v(" "),t.results.length>0?a("div",{staticClass:"footer"},[a("Button",{staticClass:"send-button",attrs:{type:"info"},on:{click:t.sendMailFunction}},[t._v("一键打开私信页面")]),t._v(" "),a("div",{staticClass:"result-list"},t._l(t.results,function(e,_){return a("div",{staticClass:"result"},[_>0?a("hr",{staticClass:"horizontal-rule"}):t._e(),t._v(" "),a("div",{staticClass:"result-avatar"},[a("a",{attrs:{href:"http://www.acfun.cn/u/"+e.userId+".aspx"}},[a("img",{staticClass:"user-avatar-bg",attrs:{src:e.avatarImage}}),t._v(" "),a("img",{staticClass:"user-avatar",attrs:{src:e.headUrl[0].url}})])]),t._v(" "),a("div",{staticClass:"result-comment"},[a("p",{staticClass:"comment-header"},[a("span",[t._v("#"+t._s(e.floor))]),t._v(" "),a("a",{class:{"name-gray":0==e.nameRed,"name-red":1==e.nameRed},attrs:{href:"http://www.acfun.cn/u/"+e.userId+".aspx"}},[t._v(t._s(e.userName))]),t._v(" "),a("span",{staticStyle:{float:"right"}},[t._v(t._s(_+1))])]),t._v(" "),a("p",{staticClass:"comment-content"},[a("span",{domProps:{innerHTML:t._s(e.content)}})]),t._v(" "),a("p",{staticClass:"comment-footer"},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("发表于 "+t._s(e.postDate))]),a("span",{staticStyle:{"margin-left":"10px"}},[t._v("来自 "+t._s(e.deviceModel))]),t._v(" "),a("a",{staticClass:"mail-span",attrs:{target:"_blank",href:""+t.mailUrl+e.userName}},[t._v("\n                  私信\n                ")])])])])}),0),t._v(" "),t.results.length>5?a("Button",{staticClass:"send-button",attrs:{type:"info"},on:{click:t.sendMailFunction}},[t._v("一键打开私信页面\n        ")]):t._e()],1):t._e()]),t._v(" "),t._m(1)],1),t._v(" "),a("Drawer",{attrs:{title:"抽奖记录",width:"500"},model:{value:t.exchange,callback:function(e){t.exchange=e},expression:"exchange"}},[a("div",t._l(t.records,function(e){return a("div",[a("p",[a("span",{staticStyle:{"margin-left":"10px"}},[t._v("AC号:")]),t._v(" "),a("a",{attrs:{target:"_blank",href:"http://www.acfun.cn/a/ac"+e.acid}},[t._v("ac"+t._s(e.acid))]),t._v(" "),a("span",{staticStyle:{float:"right","margin-right":"10px"}},[t._v(t._s(t.getRecordDate(e.date)))])]),t._v(" "),a("div",{class:{"records-comment1":!0,"records-comment2":1==e.results.length}},t._l(e.results,function(e){return a("p",{staticStyle:{"min-width":"100%"}},[a("span",[t._v("#"+t._s(e.floor)+" ")]),t._v(" "),a("a",{attrs:{target:"_blank",href:"http://www.acfun.cn/u/"+e.userId+".aspx"}},[t._v(t._s(e.userName))]),t._v(" "),a("span",{staticStyle:{float:"right"}},[t._v(t._s(e.postDate))])])}),0)])}),0)]),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"record-button",on:{click:function(e){t.exchange=!t.exchange}}},[t._v("抽奖记录")]),t._v(" "),a("BackTop")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header"},[e("h1",{staticClass:"logo"},[this._v("AcFun")]),this._v(" "),e("h2",{staticClass:"title"},[this._v("评论抽奖工具")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page_footer"},[e("p",{staticClass:"light-gray-font"},[this._v("Copyright "),e("a",{attrs:{href:"https://github.com/KonoSekai",target:"_blank"}},[this._v("Sekai")]),this._v(" 2019-2029 All Right Reserved\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"affix"},[e("a",{attrs:{title:"点击访问源码地址",href:"https://github.com/KonoSekai/acfun-lottery",target:"_blank"}},[e("div",{staticClass:"icon-button"},[e("img",{staticStyle:{height:"36px","vertical-align":"middle"},attrs:{src:"/static/img/github.svg"}}),this._v(" "),e("span",[this._v("源码地址")])])]),this._v(" "),e("a",{attrs:{title:"点击下载Chrome插件",href:"https://lottery.anyplayer.cc/download/acfun-lottery.zip",target:"_blank"}},[e("div",{staticClass:"icon-button"},[e("img",{staticStyle:{height:"36px","vertical-align":"middle"},attrs:{src:"/static/img/chrome.svg"}}),this._v(" "),e("span",[this._v("Chrome插件")])])])])}]};var r=function(t){a("UKzH")},i=a("VU/8")(n.a,s,!1,r,null,null).exports,o=a("BTaQ"),c=a.n(o);a("+skl");_.default.use(c.a),_.default.config.productionTip=!1,new _.default({components:{App:i},render:function(t){return t(i)}}).$mount("#app")},Q8YG:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__=__webpack_require__("c/Tr"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__=__webpack_require__("lHA8"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__=__webpack_require__("//Fk"),__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__=__webpack_require__("ifoU"),__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map__),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_5_axios__=__webpack_require__("mtWM"),__WEBPACK_IMPORTED_MODULE_5_axios___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);function get(key){return eval(window.localStorage.getItem(key))}function set(t,e){window.localStorage.setItem(t,__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_json_stringify___default()(e))}__webpack_exports__.a={data:function(){return{mailUrl:"http://www.acfun.cn/member/#area=mail-new;username=",number:1,acid:"",acUrl:"",sourceType:0,totalPage:0,totalCount:0,repeat:!0,loading:!1,exchange:!1,results:[],comments:new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a}},computed:{url:function(){return"/rest/pc-direct/comment/listByFloor?sourceId="+this.acid+"&sourceType="+this.sourceType+"&pivotCommentId=0&_="+this.time},records:function(){var t=get("records");return null==t&&(t=[]),t}},methods:{getRecordDate:function(t){var e=(t=new Date(t)).getFullYear();e=e==(new Date).getFullYear()?"":e+"-";var a=t.getMonth();a=a<9?"0"+(a+1):a+1;var _=t.getDate();_=_<10?"0"+_:_;var n=t.getHours();n=n<10?"0"+n:n;var s=t.getMinutes();return""+e+a+"-"+_+" "+n+":"+(s=s<10?"0"+s:n)},acUrlChangeEvent:function(){var t=this.acUrl,e=/^http(s)?:\/\/www\.acfun\.cn\/([avz])\/ac([0-9]+)$/;if(/^www\.acfun\.cn\/([avz])\/ac([0-9]+)$/.test(t)&&(t="http://"+t),!e.test(t))return this.$Message.error("输入的地址是错误的呢(　^ω^)b"),!0;var a=t.match(e);if(4!=a.length)return this.$Message.warning("本页面不能进行抽奖呢(　^ω^)b"),!0;var _=a[2];return this.acid=a[3],this.time=(new Date).getTime(),this.sourceType="a"==_?1:3,!1},sendMailFunction:function(){var t=this;this.results.forEach(function(e){window.open(""+t.mailUrl+e.userName)})},numberChangeEvent:function(){var t=Math.ceil(this.number);(isNaN(t)||t<1)&&(t=1,this.$Message.warning("至少要抽取一位幸运用户呢(　^ω^)b")),this.number=t},repeatChangeEvent:function(){set("repeat",this.repeat)},saveRecordsFunction:function(){var t=get("records");null==t&&(t=[]);var e=[];this.results.forEach(function(t){e.push({userId:t.userId,userName:t.userName,floor:t.floor,postDate:t.postDate})}),t.push({acid:this.acid,date:(new Date).getTime(),results:e}),set("records",t)},lotteryDrawFunction:function(){var t=this;if(this.loading=!0,this.acUrlChangeEvent())this.loading=!1;else{var e=this.results;if(e.length>0&&e[0].sourceId==this.acid)return this.$Message.error("已经抽过奖了呢(　^ω^)b"),void(this.loading=!1);this.getCommentInfoFunction().then(function(){t.totalPage>1?t.getOverplusCommentFunction(2).then(function(){t.getLotteryResultsFunction()}).catch(function(t){console.log(t)}):t.getLotteryResultsFunction()}).catch(function(t){console.log(t)}),this.loading=!1}},getCommentInfoFunction:function(){var t=this;return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function(e,a){__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(t.url).then(function(_){var n=_.data;n.totalCount<1?(t.$Message.warning("一条评论都没有你还想抽奖?(　^ω^)b"),a()):(t.comments=new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_map___default.a,t.totalPage=n.totalPage,t.totalCount=n.totalCount,t.pushCommentFunction(n.commentsMap),e())}).catch(function(){t.$Message.error("发生了错误呢(　^ω^)b"),t.disabled=!0,a()})})},getLotteryResultsFunction:function(){var t=new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a,e=this.number,a=this.comments,_=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(a.keys());for(e>_.length&&(e=_.length,this.$Message.warning("只能抽这几个人了呢(　^ω^)b"));t.size<e&&!(_.length<1);){var n=Math.floor(Math.random()*_.length),s=_[n],r=a.get(s);r.content=this.handleContentFunction(r.content),t.add(r),_.splice(n,1)}(t=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(t)).sort(function(t,e){return e.floor-t.floor}),this.number=e,this.results=t,this.saveRecordsFunction()},getOverplusCommentFunction:function(t){var e=this;return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function(a,_){e.totalPage<t?a():__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(e.url+"&page="+t).then(function(n){e.pushCommentFunction(n.data.commentsMap),e.getOverplusCommentFunction(t+1).then(function(){a()}).catch(function(t){_(t)})}).catch(function(t){_(t)})})},handleContentFunction:function(t){return[[/(\[emot=)(\w+)(,)(\w+)(\/])/g,'<img src="http://cdn.aixifan.com/dotnet/20130418/umeditor/dialogs/emotion/images/$2/$4.gif" style="max-width: 88px">'],[/(\[at])(.*?)(\[\/at])/g,'<a href="http://www.acfun.cn/member/findUser.aspx?userName=$2" style="color: #2B85E4 !important;" target="_blank">@$2</a>'],[/(\[ac=)(.*?)(])(.*?)(\[\/ac])/g,'<a href="http://www.acfun.cn/a/$4" style="color: #2B85E4 !important;" target="_blank">$4</a>'],[/(\[size=)(.*?)(])(.*?)(\[\/size])/g,'<span style="font-size: $2">$4</span>'],[/(\[img=图片])(.*?)(\[\/img])/g,'<img src="$2" style="max-width: 250px"><br>'],[/(\[color=)(.*?)(])(.*?)(\[\/color])/g,'<span color="$2">$4</span>'],[/(\[s])(.*?)(\[\/s])/g,'<del">$2</del>'],[/(\[b])(.*?)(\[\/b])/g,'<b">$2</b>'],[/(\[u])(.*?)(\[\/u])/g,'<u">$2</u>'],[/(\[i])(.*?)(\[\/i])/g,'<i">$2</i>'],[/&lt;br\/&gt;/g,"<br>"],[/&amp;nbsp;/g,"&nbsp;"]].forEach(function(e){t=t.replace(e[0],e[1])}),t},pushCommentFunction:function(t){var e=this.repeat;for(var a in t)0!=t[a].userId&&(e?this.comments.set(t[a].userId,t[a]):this.comments.set(t[a].cid,t[a]))}},created:function(){var t=get("repeat");null==t&&(t=!0),this.repeat=t}}},UKzH:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b2e4ac6af132bfb683f9.js.map