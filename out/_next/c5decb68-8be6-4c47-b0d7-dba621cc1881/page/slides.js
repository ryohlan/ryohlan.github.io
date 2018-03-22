module.exports=__NEXT_REGISTER_PAGE("/slides",function(){var e=webpackJsonp([5],{483:function(e,n,t){e.exports=t(484)},484:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:true});var r=t(0);var a=t.n(r);var i=t(13);var o=function(e){var n=e.style;return a.a.createElement("div",{style:n,className:"loader"})};var s=t(115);var l=t(38);var u=t.n(l);var c=t(80);var p=t.n(c);var d=t(118);var f=t.n(d);var h=t(119);var v=t.n(h);var m=t(120);var g=t.n(m);var y=t(121);var b=t.n(y);var w=t(19);var x=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r))e[r]=t[r]}return e};var E=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(n,t,r){if(t)e(n.prototype,t);if(r)e(n,r);return n}}();var k=A(["\n  0% {\n    opacity: 0;\n    margin-top: 4px;\n  }\n\n  100% {\n    opacity: 1;\n    margin-top: 0px;\n  }\n"],["\n  0% {\n    opacity: 0;\n    margin-top: 4px;\n  }\n\n  100% {\n    opacity: 1;\n    margin-top: 0px;\n  }\n"]),j=A(["\n  width: 100%;\n  height: 100vh;\n  background-color: #FFF;\n  padding: 80px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"],["\n  width: 100%;\n  height: 100vh;\n  background-color: #FFF;\n  padding: 80px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]),P=A(["\n  animation: "," 0.3s linear;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"],["\n  animation: "," 0.3s linear;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]),O=A(["\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n"],["\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n"]),_=A(["\n  position: fixed;\n  right: 0;\n  top: 0;\n  width: 100px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n"],["\n  position: fixed;\n  right: 0;\n  top: 0;\n  width: 100px;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n"]),F=A(["\n  height: 70px;\n  position: fixed;\n  bottom: -70px;\n  width: 100%;\n  left: 0;\n  padding-top: 40px;\n  transition: all 300ms 0s ease;\n  &:hover {\n    bottom: 0;\n  }\n"],["\n  height: 70px;\n  position: fixed;\n  bottom: -70px;\n  width: 100%;\n  left: 0;\n  padding-top: 40px;\n  transition: all 300ms 0s ease;\n  &:hover {\n    bottom: 0;\n  }\n"]),z=A(["\n  background-color: ",";\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"],["\n  background-color: ",";\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]),R=A(["\n  padding: 1rem;\n  cursor: pointer;\n  transition: all 300ms 0s ease;\n  &:hover {\n    transform: scale(1.5);\n  }\n"],["\n  padding: 1rem;\n  cursor: pointer;\n  transition: all 300ms 0s ease;\n  &:hover {\n    transform: scale(1.5);\n  }\n"]),S=A(["\n              font-size: 1.5rem;\n              margin: 0.6rem 0;\n            "],["\n              font-size: 1.5rem;\n              margin: 0.6rem 0;\n            "]);function M(e,n,t){if(n in e)Object.defineProperty(e,n,{value:t,enumerable:true,configurable:true,writable:true});else e[n]=t;return e}function Q(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function C(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n&&("object"===typeof n||"function"===typeof n)?n:e}function q(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(n)Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n}function A(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var I=Object(i["b"])(k);var T=i["a"].main(j);var G=i["a"].div(P,I);var K=i["a"].div(O);var L=i["a"].div(_);var N=i["a"].div(F);var D=i["a"].div(z,w["a"].font.secondary);var J=Object(i["a"])(g.a)(R);var X=function(e){q(n,e);function n(){var e;var t,r,a;Q(this,n);for(var i=arguments.length,o=Array(i),s=0;s<i;s++)o[s]=arguments[s];return a=(t=(r=C(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(o))),r),r.state={slideMarkdowns:[],error:null,loading:true,baseFontSize:"24px"},t),C(r,a)}E(n,[{key:"parseQuery",value:function e(n){var t=n.split("?")[1].split("&").map(function(e){return e.split("=")}).map(function(e){return M({},e[0],e[1])}).reduce(function(e,n){return x({},e,n)}),r=t.id,a=t.page;return{id:parseInt(r),page:parseInt(a)}}},{key:"handleKeyEvent",value:function e(){var n=this;window.document.addEventListener("keydown",function(e){var t=e.code;var r=n.parseQuery(n.props.url.asPath),a=r.id,i=r.page;switch(t){case"ArrowRight":n.nextPage();break;case"ArrowLeft":n.prevPage();break;default:break}})}},{key:"prevPage",value:function e(){var n=this.parseQuery(this.props.url.asPath),t=n.id,r=n.page;if(1===r)return;var a="/slides?id="+t+"&page="+(r-1);p.a.push(a,a,{shallow:true})}},{key:"nextPage",value:function e(){var n=this.state.slideMarkdowns.length;var t=this.parseQuery(this.props.url.asPath),r=t.id,a=t.page;if(a===n)return;var i="/slides?id="+r+"&page="+(a+1);p.a.push(i,i,{shallow:true})}},{key:"componentDidMount",value:function e(){var n=this;this.handleKeyEvent();var t=this.props.url.asPath;var r=this.parseQuery(t),a=r.id,i=r.page;s["d"](a).then(function(e){return n.setState({slideMarkdowns:e.body.split("---"),loading:false})}).catch(function(e){return n.setState({error:e,loading:false})})}},{key:"render",value:function e(){var n=this;var t=this.props.url.asPath;if(!/id=\w+&page=\d+$/.test(t))return a.a.createElement(T,null,a.a.createElement("div",null,"Error"));var r=this.state,s=r.loading,l=r.slideMarkdowns,c=r.error,p=r.baseFontSize;var d=this.parseQuery(t),f=d.id,h=d.page;if(s)return a.a.createElement(T,null,a.a.createElement(o,null));if(c)return a.a.createElement(T,null,this.state.error.message);return a.a.createElement(a.a.Fragment,null,a.a.createElement(T,{key:h},a.a.createElement("style",null,"html { font-size: "+p+";}"),a.a.createElement(G,{key:h},a.a.createElement(u.a,{source:l[h-1],renderers:{listItem:i["a"].li(S)}})),a.a.createElement(K,{onClick:function e(){return n.prevPage()}}),a.a.createElement(L,{onClick:function e(){return n.nextPage()}})),a.a.createElement(N,null,a.a.createElement(D,null,a.a.createElement(J,{size:30,color:"rgba(255, 255,255, .8)",onClick:function e(){var n=window.document.documentElement,t=n.webkitRequestFullscreen,r=n.mozRequestFullScreen;if(t)window.document.documentElement.webkitRequestFullscreen();if(r)window.document.documentElement.mozRequestFullScreen()}}))))}}]);return n}(a.a.Component);var $=n["default"]=X}},[483]);return{page:e.default}});