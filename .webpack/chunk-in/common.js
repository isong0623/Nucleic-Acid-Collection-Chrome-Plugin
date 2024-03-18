/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var XLSX={};function make_xlsx_lib(e){e.version="0.18.9";var r=1200,t=1252;var a;var n=[874,932,936,949,950,1250,1251,1252,1253,1254,1255,1256,1257,1258,1e4];var i={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969};var s=function(e){if(n.indexOf(e)==-1)return;t=i[0]=e};function f(){s(1252)}var c=function(e){r=e;s(e)};function l(){c(1200);f()}function o(e){var r=[];for(var t=0,a=e.length;t<a;++t)r[t]=e.charCodeAt(t);return r}function u(e){var r=[];for(var t=0;t<e.length>>1;++t)r[t]=String.fromCharCode(e.charCodeAt(2*t)+(e.charCodeAt(2*t+1)<<8));return r.join("")}function h(e){var r=[];for(var t=0;t<e.length>>1;++t)r[t]=String.fromCharCode(e.charCodeAt(2*t+1)+(e.charCodeAt(2*t)<<8));return r.join("")}var d=function(e){var r=e.charCodeAt(0),t=e.charCodeAt(1);if(r==255&&t==254)return u(e.slice(2));if(r==254&&t==255)return h(e.slice(2));if(r==65279)return e.slice(1);return e};var v=function uk(e){return String.fromCharCode(e)};var p=function hk(e){return String.fromCharCode(e)};function m(e){a=e;c=function(e){r=e;s(e)};d=function(e){if(e.charCodeAt(0)===255&&e.charCodeAt(1)===254){return a.utils.decode(1200,o(e.slice(2)))}return e};v=function n(e){if(r===1200)return String.fromCharCode(e);return a.utils.decode(r,[e&255,e>>8])[0]};p=function i(e){return a.utils.decode(t,[e])[0]};ta()}var b=null;var g=true;var w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function k(e){var r="";var t=0,a=0,n=0,i=0,s=0,f=0,c=0;for(var l=0;l<e.length;){t=e.charCodeAt(l++);i=t>>2;a=e.charCodeAt(l++);s=(t&3)<<4|a>>4;n=e.charCodeAt(l++);f=(a&15)<<2|n>>6;c=n&63;if(isNaN(a)){f=c=64}else if(isNaN(n)){c=64}r+=w.charAt(i)+w.charAt(s)+w.charAt(f)+w.charAt(c)}return r}function T(e){var r="";var t=0,a=0,n=0,i=0,s=0,f=0,c=0;e=e.replace(/[^\w\+\/\=]/g,"");for(var l=0;l<e.length;){i=w.indexOf(e.charAt(l++));s=w.indexOf(e.charAt(l++));t=i<<2|s>>4;r+=String.fromCharCode(t);f=w.indexOf(e.charAt(l++));a=(s&15)<<4|f>>2;if(f!==64){r+=String.fromCharCode(a)}c=w.indexOf(e.charAt(l++));n=(f&3)<<6|c;if(c!==64){r+=String.fromCharCode(n)}}return r}var E=function(){return typeof Buffer!=="undefined"&&typeof undefined!=="undefined"&&typeof{}!=="undefined"&&!!{}.node}();var y=function(){if(typeof Buffer!=="undefined"){var e=!Buffer.from;if(!e)try{Buffer.from("foo","utf8")}catch(r){e=true}return e?function(e,r){return r?new Buffer(e,r):new Buffer(e)}:Buffer.from.bind(Buffer)}return function(){}}();function S(e){if(E)return Buffer.alloc?Buffer.alloc(e):new Buffer(e);return typeof Uint8Array!="undefined"?new Uint8Array(e):new Array(e)}function _(e){if(E)return Buffer.allocUnsafe?Buffer.allocUnsafe(e):new Buffer(e);return typeof Uint8Array!="undefined"?new Uint8Array(e):new Array(e)}var A=function dk(e){if(E)return y(e,"binary");return e.split("").map(function(e){return e.charCodeAt(0)&255})};function x(e){if(typeof ArrayBuffer==="undefined")return A(e);var r=new ArrayBuffer(e.length),t=new Uint8Array(r);for(var a=0;a!=e.length;++a)t[a]=e.charCodeAt(a)&255;return r}function C(e){if(Array.isArray(e))return e.map(function(e){return String.fromCharCode(e)}).join("");var r=[];for(var t=0;t<e.length;++t)r[t]=String.fromCharCode(e[t]);return r.join("")}function O(e){if(typeof Uint8Array==="undefined")throw new Error("Unsupported");return new Uint8Array(e)}function R(e){if(typeof ArrayBuffer=="undefined")throw new Error("Unsupported");if(e instanceof ArrayBuffer)return R(new Uint8Array(e));var r=new Array(e.length);for(var t=0;t<e.length;++t)r[t]=e[t];return r}var N=E?function(e){return Buffer.concat(e.map(function(e){return Buffer.isBuffer(e)?e:y(e)}))}:function(e){if(typeof Uint8Array!=="undefined"){var r=0,t=0;for(r=0;r<e.length;++r)t+=e[r].length;var a=new Uint8Array(t);var n=0;for(r=0,t=0;r<e.length;t+=n,++r){n=e[r].length;if(e[r]instanceof Uint8Array)a.set(e[r],t);else if(typeof e[r]=="string"){throw"wtf"}else a.set(new Uint8Array(e[r]),t)}return a}return[].concat.apply([],e.map(function(e){return Array.isArray(e)?e:[].slice.call(e)}))};function I(e){var r=[],t=0,a=e.length+250;var n=S(e.length+255);for(var i=0;i<e.length;++i){var s=e.charCodeAt(i);if(s<128)n[t++]=s;else if(s<2048){n[t++]=192|s>>6&31;n[t++]=128|s&63}else if(s>=55296&&s<57344){s=(s&1023)+64;var f=e.charCodeAt(++i)&1023;n[t++]=240|s>>8&7;n[t++]=128|s>>2&63;n[t++]=128|f>>6&15|(s&3)<<4;n[t++]=128|f&63}else{n[t++]=224|s>>12&15;n[t++]=128|s>>6&63;n[t++]=128|s&63}if(t>a){r.push(n.slice(0,t));t=0;n=S(65535);a=65530}}r.push(n.slice(0,t));return N(r)}var F=/\u0000/g,D=/[\u0001-\u0006]/g;function P(e){var r="",t=e.length-1;while(t>=0)r+=e.charAt(t--);return r}function L(e,r){var t=""+e;return t.length>=r?t:Er("0",r-t.length)+t}function M(e,r){var t=""+e;return t.length>=r?t:Er(" ",r-t.length)+t}function U(e,r){var t=""+e;return t.length>=r?t:t+Er(" ",r-t.length)}function B(e,r){var t=""+Math.round(e);return t.length>=r?t:Er("0",r-t.length)+t}function W(e,r){var t=""+e;return t.length>=r?t:Er("0",r-t.length)+t}var H=Math.pow(2,32);function z(e,r){if(e>H||e<-H)return B(e,r);var t=Math.round(e);return W(t,r)}function V(e,r){r=r||0;return e.length>=7+r&&(e.charCodeAt(r)|32)===103&&(e.charCodeAt(r+1)|32)===101&&(e.charCodeAt(r+2)|32)===110&&(e.charCodeAt(r+3)|32)===101&&(e.charCodeAt(r+4)|32)===114&&(e.charCodeAt(r+5)|32)===97&&(e.charCodeAt(r+6)|32)===108}var G=[["Sun","Sunday"],["Mon","Monday"],["Tue","Tuesday"],["Wed","Wednesday"],["Thu","Thursday"],["Fri","Friday"],["Sat","Saturday"]];var j=[["J","Jan","January"],["F","Feb","February"],["M","Mar","March"],["A","Apr","April"],["M","May","May"],["J","Jun","June"],["J","Jul","July"],["A","Aug","August"],["S","Sep","September"],["O","Oct","October"],["N","Nov","November"],["D","Dec","December"]];function X(e){if(!e)e={};e[0]="General";e[1]="0";e[2]="0.00";e[3]="#,##0";e[4]="#,##0.00";e[9]="0%";e[10]="0.00%";e[11]="0.00E+00";e[12]="# ?/?";e[13]="# ??/??";e[14]="m/d/yy";e[15]="d-mmm-yy";e[16]="d-mmm";e[17]="mmm-yy";e[18]="h:mm AM/PM";e[19]="h:mm:ss AM/PM";e[20]="h:mm";e[21]="h:mm:ss";e[22]="m/d/yy h:mm";e[37]="#,##0 ;(#,##0)";e[38]="#,##0 ;[Red](#,##0)";e[39]="#,##0.00;(#,##0.00)";e[40]="#,##0.00;[Red](#,##0.00)";e[45]="mm:ss";e[46]="[h]:mm:ss";e[47]="mmss.0";e[48]="##0.0E+0";e[49]="@";e[56]='"上午/下午 "hh"時"mm"分"ss"秒 "';return e}var Y={0:"General",1:"0",2:"0.00",3:"#,##0",4:"#,##0.00",9:"0%",10:"0.00%",11:"0.00E+00",12:"# ?/?",13:"# ??/??",14:"m/d/yy",15:"d-mmm-yy",16:"d-mmm",17:"mmm-yy",18:"h:mm AM/PM",19:"h:mm:ss AM/PM",20:"h:mm",21:"h:mm:ss",22:"m/d/yy h:mm",37:"#,##0 ;(#,##0)",38:"#,##0 ;[Red](#,##0)",39:"#,##0.00;(#,##0.00)",40:"#,##0.00;[Red](#,##0.00)",45:"mm:ss",46:"[h]:mm:ss",47:"mmss.0",48:"##0.0E+0",49:"@",56:'"上午/下午 "hh"時"mm"分"ss"秒 "'};var K={5:37,6:38,7:39,8:40,23:0,24:0,25:0,26:0,27:14,28:14,29:14,30:14,31:14,50:14,51:14,52:14,53:14,54:14,55:14,56:14,57:14,58:14,59:1,60:2,61:3,62:4,67:9,68:10,69:12,70:13,71:14,72:14,73:15,74:16,75:17,76:20,77:21,78:22,79:45,80:46,81:47,82:0};var Z={5:'"$"#,##0_);\\("$"#,##0\\)',63:'"$"#,##0_);\\("$"#,##0\\)',6:'"$"#,##0_);[Red]\\("$"#,##0\\)',64:'"$"#,##0_);[Red]\\("$"#,##0\\)',7:'"$"#,##0.00_);\\("$"#,##0.00\\)',65:'"$"#,##0.00_);\\("$"#,##0.00\\)',8:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',66:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',41:'_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',42:'_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',43:'_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',44:'_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'};function J(e,r,t){var a=e<0?-1:1;var n=e*a;var i=0,s=1,f=0;var c=1,l=0,o=0;var u=Math.floor(n);while(l<r){u=Math.floor(n);f=u*s+i;o=u*l+c;if(n-u<5e-8)break;n=1/(n-u);i=s;s=f;c=l;l=o}if(o>r){if(l>r){o=c;f=i}else{o=l;f=s}}if(!t)return[0,a*f,o];var h=Math.floor(a*f/o);return[h,a*f-h*o,o]}function q(e,r,t){if(e>2958465||e<0)return null;var a=e|0,n=Math.floor(86400*(e-a)),i=0;var s=[];var f={D:a,T:n,u:86400*(e-a)-n,y:0,m:0,d:0,H:0,M:0,S:0,q:0};if(Math.abs(f.u)<1e-6)f.u=0;if(r&&r.date1904)a+=1462;if(f.u>.9999){f.u=0;if(++n==86400){f.T=n=0;++a;++f.D}}if(a===60){s=t?[1317,10,29]:[1900,2,29];i=3}else if(a===0){s=t?[1317,8,29]:[1900,1,0];i=6}else{if(a>60)--a;var c=new Date(1900,0,1);c.setDate(c.getDate()+a-1);s=[c.getFullYear(),c.getMonth()+1,c.getDate()];i=c.getDay();if(a<60)i=(i+6)%7;if(t)i=le(c,s)}f.y=s[0];f.m=s[1];f.d=s[2];f.S=n%60;n=Math.floor(n/60);f.M=n%60;n=Math.floor(n/60);f.H=n;f.q=i;return f}var Q=new Date(1899,11,31,0,0,0);var ee=Q.getTime();var re=new Date(1900,2,1,0,0,0);function te(e,r){var t=e.getTime();if(r)t-=1461*24*60*60*1e3;else if(e>=re)t+=24*60*60*1e3;return(t-(ee+(e.getTimezoneOffset()-Q.getTimezoneOffset())*6e4))/(24*60*60*1e3)}function ae(e){return e.indexOf(".")==-1?e:e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/,"$1")}function ne(e){if(e.indexOf("E")==-1)return e;return e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/,"$1E").replace(/(E[+-])(\d)$/,"$10$2")}function ie(e){var r=e<0?12:11;var t=ae(e.toFixed(12));if(t.length<=r)return t;t=e.toPrecision(10);if(t.length<=r)return t;return e.toExponential(5)}function se(e){var r=ae(e.toFixed(11));return r.length>(e<0?12:11)||r==="0"||r==="-0"?e.toPrecision(6):r}function fe(e){var r=Math.floor(Math.log(Math.abs(e))*Math.LOG10E),t;if(r>=-4&&r<=-1)t=e.toPrecision(10+r);else if(Math.abs(r)<=9)t=ie(e);else if(r===10)t=e.toFixed(10).substr(0,12);else t=se(e);return ae(ne(t.toUpperCase()))}function ce(e,r){switch(typeof e){case"string":return e;case"boolean":return e?"TRUE":"FALSE";case"number":return(e|0)===e?e.toString(10):fe(e);case"undefined":return"";case"object":if(e==null)return"";if(e instanceof Date)return We(14,te(e,r&&r.date1904),r);}throw new Error("unsupported value in General format: "+e)}function le(e,r){r[0]-=581;var t=e.getDay();if(e<60)t=(t+6)%7;return t}function oe(e,r,t,a){var n="",i=0,s=0,f=t.y,c,l=0;switch(e){case 98:f=t.y+543;case 121:switch(r.length){case 1:;case 2:c=f%100;l=2;break;default:c=f%1e4;l=4;break;}break;case 109:switch(r.length){case 1:;case 2:c=t.m;l=r.length;break;case 3:return j[t.m-1][1];case 5:return j[t.m-1][0];default:return j[t.m-1][2];}break;case 100:switch(r.length){case 1:;case 2:c=t.d;l=r.length;break;case 3:return G[t.q][0];default:return G[t.q][1];}break;case 104:switch(r.length){case 1:;case 2:c=1+(t.H+11)%12;l=r.length;break;default:throw"bad hour format: "+r;}break;case 72:switch(r.length){case 1:;case 2:c=t.H;l=r.length;break;default:throw"bad hour format: "+r;}break;case 77:switch(r.length){case 1:;case 2:c=t.M;l=r.length;break;default:throw"bad minute format: "+r;}break;case 115:if(r!="s"&&r!="ss"&&r!=".0"&&r!=".00"&&r!=".000")throw"bad second format: "+r;if(t.u===0&&(r=="s"||r=="ss"))return L(t.S,r.length);if(a>=2)s=a===3?1e3:100;else s=a===1?10:1;i=Math.round(s*(t.S+t.u));if(i>=60*s)i=0;if(r==="s")return i===0?"0":""+i/s;n=L(i,2+a);if(r==="ss")return n.substr(0,2);return"."+n.substr(2,r.length-1);case 90:switch(r){case"[h]":;case"[hh]":c=t.D*24+t.H;break;case"[m]":;case"[mm]":c=(t.D*24+t.H)*60+t.M;break;case"[s]":;case"[ss]":c=((t.D*24+t.H)*60+t.M)*60+Math.round(t.S+t.u);break;default:throw"bad abstime format: "+r;}l=r.length===3?1:2;break;case 101:c=f;l=1;break;}var o=l>0?L(c,l):"";return o}function ue(e){var r=3;if(e.length<=r)return e;var t=e.length%r,a=e.substr(0,t);for(;t!=e.length;t+=r)a+=(a.length>0?",":"")+e.substr(t,r);return a}var he=/%/g;function de(e,r,t){var a=r.replace(he,""),n=r.length-a.length;return Ie(e,a,t*Math.pow(10,2*n))+Er("%",n)}function ve(e,r,t){var a=r.length-1;while(r.charCodeAt(a-1)===44)--a;return Ie(e,r.substr(0,a),t/Math.pow(10,3*(r.length-a)))}function pe(e,r){var t;var a=e.indexOf("E")-e.indexOf(".")-1;if(e.match(/^#+0.0E\+0$/)){if(r==0)return"0.0E+0";else if(r<0)return"-"+pe(e,-r);var n=e.indexOf(".");if(n===-1)n=e.indexOf("E");var i=Math.floor(Math.log(r)*Math.LOG10E)%n;if(i<0)i+=n;t=(r/Math.pow(10,i)).toPrecision(a+1+(n+i)%n);if(t.indexOf("e")===-1){var s=Math.floor(Math.log(r)*Math.LOG10E);if(t.indexOf(".")===-1)t=t.charAt(0)+"."+t.substr(1)+"E+"+(s-t.length+i);else t+="E+"+(s-i);while(t.substr(0,2)==="0."){t=t.charAt(0)+t.substr(2,n)+"."+t.substr(2+n);t=t.replace(/^0+([1-9])/,"$1").replace(/^0+\./,"0.")}t=t.replace(/\+-/,"-")}t=t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,r,t,a){return r+t+a.substr(0,(n+i)%n)+"."+a.substr(i)+"E"})}else t=r.toExponential(a);if(e.match(/E\+00$/)&&t.match(/e[+-]\d$/))t=t.substr(0,t.length-1)+"0"+t.charAt(t.length-1);if(e.match(/E\-/)&&t.match(/e\+/))t=t.replace(/e\+/,"e");return t.replace("e","E")}var me=/# (\?+)( ?)\/( ?)(\d+)/;function be(e,r,t){var a=parseInt(e[4],10),n=Math.round(r*a),i=Math.floor(n/a);var s=n-i*a,f=a;return t+(i===0?"":""+i)+" "+(s===0?Er(" ",e[1].length+1+e[4].length):M(s,e[1].length)+e[2]+"/"+e[3]+L(f,e[4].length))}function ge(e,r,t){return t+(r===0?"":""+r)+Er(" ",e[1].length+2+e[4].length)}var we=/^#*0*\.([0#]+)/;var ke=/\).*[0#]/;var Te=/\(###\) ###\\?-####/;function Ee(e){var r="",t;for(var a=0;a!=e.length;++a)switch(t=e.charCodeAt(a)){case 35:break;case 63:r+=" ";break;case 48:r+="0";break;default:r+=String.fromCharCode(t);}return r}function ye(e,r){var t=Math.pow(10,r);return""+Math.round(e*t)/t}function Se(e,r){var t=e-Math.floor(e),a=Math.pow(10,r);if(r<(""+Math.round(t*a)).length)return 0;return Math.round(t*a)}function _e(e,r){if(r<(""+Math.round((e-Math.floor(e))*Math.pow(10,r))).length){return 1}return 0}function Ae(e){if(e<2147483647&&e>-2147483648)return""+(e>=0?e|0:e-1|0);return""+Math.floor(e)}function xe(e,r,t){if(e.charCodeAt(0)===40&&!r.match(ke)){var a=r.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(t>=0)return xe("n",a,t);return"("+xe("n",a,-t)+")"}if(r.charCodeAt(r.length-1)===44)return ve(e,r,t);if(r.indexOf("%")!==-1)return de(e,r,t);if(r.indexOf("E")!==-1)return pe(r,t);if(r.charCodeAt(0)===36)return"$"+xe(e,r.substr(r.charAt(1)==" "?2:1),t);var n;var i,s,f,c=Math.abs(t),l=t<0?"-":"";if(r.match(/^00+$/))return l+z(c,r.length);if(r.match(/^[#?]+$/)){n=z(t,0);if(n==="0")n="";return n.length>r.length?n:Ee(r.substr(0,r.length-n.length))+n}if(i=r.match(me))return be(i,c,l);if(r.match(/^#+0+$/))return l+z(c,r.length-r.indexOf("0"));if(i=r.match(we)){n=ye(t,i[1].length).replace(/^([^\.]+)$/,"$1."+Ee(i[1])).replace(/\.$/,"."+Ee(i[1])).replace(/\.(\d*)$/,function(e,r){return"."+r+Er("0",Ee(i[1]).length-r.length)});return r.indexOf("0.")!==-1?n:n.replace(/^0\./,".")}r=r.replace(/^#+([0.])/,"$1");if(i=r.match(/^(0*)\.(#*)$/)){return l+ye(c,i[2].length).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,i[1].length?"0.":".")}if(i=r.match(/^#{1,3},##0(\.?)$/))return l+ue(z(c,0));if(i=r.match(/^#,##0\.([#0]*0)$/)){return t<0?"-"+xe(e,r,-t):ue(""+(Math.floor(t)+_e(t,i[1].length)))+"."+L(Se(t,i[1].length),i[1].length)}if(i=r.match(/^#,#*,#0/))return xe(e,r.replace(/^#,#*,/,""),t);if(i=r.match(/^([0#]+)(\\?-([0#]+))+$/)){n=P(xe(e,r.replace(/[\\-]/g,""),t));s=0;return P(P(r.replace(/\\/g,"")).replace(/[0#]/g,function(e){return s<n.length?n.charAt(s++):e==="0"?"0":""}))}if(r.match(Te)){n=xe(e,"##########",t);return"("+n.substr(0,3)+") "+n.substr(3,3)+"-"+n.substr(6)}var o="";if(i=r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)){s=Math.min(i[4].length,7);f=J(c,Math.pow(10,s)-1,false);n=""+l;o=Ie("n",i[1],f[1]);if(o.charAt(o.length-1)==" ")o=o.substr(0,o.length-1)+"0";n+=o+i[2]+"/"+i[3];o=U(f[2],s);if(o.length<i[4].length)o=Ee(i[4].substr(i[4].length-o.length))+o;n+=o;return n}if(i=r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)){s=Math.min(Math.max(i[1].length,i[4].length),7);f=J(c,Math.pow(10,s)-1,true);return l+(f[0]||(f[1]?"":"0"))+" "+(f[1]?M(f[1],s)+i[2]+"/"+i[3]+U(f[2],s):Er(" ",2*s+1+i[2].length+i[3].length))}if(i=r.match(/^[#0?]+$/)){n=z(t,0);if(r.length<=n.length)return n;return Ee(r.substr(0,r.length-n.length))+n}if(i=r.match(/^([#0?]+)\.([#0]+)$/)){n=""+t.toFixed(Math.min(i[2].length,10)).replace(/([^0])0+$/,"$1");s=n.indexOf(".");var u=r.indexOf(".")-s,h=r.length-n.length-u;return Ee(r.substr(0,u)+n+r.substr(r.length-h))}if(i=r.match(/^00,000\.([#0]*0)$/)){s=Se(t,i[1].length);return t<0?"-"+xe(e,r,-t):ue(Ae(t)).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?L(0,3-e.length):"")+e})+"."+L(s,i[1].length)}switch(r){case"###,##0.00":return xe(e,"#,##0.00",t);case"###,###":;case"##,###":;case"#,###":var d=ue(z(c,0));return d!=="0"?l+d:"";case"###,###.00":return xe(e,"###,##0.00",t).replace(/^0\./,".");case"#,###.00":return xe(e,"#,##0.00",t).replace(/^0\./,".");default:;}throw new Error("unsupported format |"+r+"|")}function Ce(e,r,t){var a=r.length-1;while(r.charCodeAt(a-1)===44)--a;return Ie(e,r.substr(0,a),t/Math.pow(10,3*(r.length-a)))}function Oe(e,r,t){var a=r.replace(he,""),n=r.length-a.length;return Ie(e,a,t*Math.pow(10,2*n))+Er("%",n)}function Re(e,r){var t;var a=e.indexOf("E")-e.indexOf(".")-1;if(e.match(/^#+0.0E\+0$/)){if(r==0)return"0.0E+0";else if(r<0)return"-"+Re(e,-r);var n=e.indexOf(".");if(n===-1)n=e.indexOf("E");var i=Math.floor(Math.log(r)*Math.LOG10E)%n;if(i<0)i+=n;t=(r/Math.pow(10,i)).toPrecision(a+1+(n+i)%n);if(!t.match(/[Ee]/)){var s=Math.floor(Math.log(r)*Math.LOG10E);if(t.indexOf(".")===-1)t=t.charAt(0)+"."+t.substr(1)+"E+"+(s-t.length+i);else t+="E+"+(s-i);t=t.replace(/\+-/,"-")}t=t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,r,t,a){return r+t+a.substr(0,(n+i)%n)+"."+a.substr(i)+"E"})}else t=r.toExponential(a);if(e.match(/E\+00$/)&&t.match(/e[+-]\d$/))t=t.substr(0,t.length-1)+"0"+t.charAt(t.length-1);if(e.match(/E\-/)&&t.match(/e\+/))t=t.replace(/e\+/,"e");return t.replace("e","E")}function Ne(e,r,t){if(e.charCodeAt(0)===40&&!r.match(ke)){var a=r.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(t>=0)return Ne("n",a,t);return"("+Ne("n",a,-t)+")"}if(r.charCodeAt(r.length-1)===44)return Ce(e,r,t);if(r.indexOf("%")!==-1)return Oe(e,r,t);if(r.indexOf("E")!==-1)return Re(r,t);if(r.charCodeAt(0)===36)return"$"+Ne(e,r.substr(r.charAt(1)==" "?2:1),t);var n;var i,s,f,c=Math.abs(t),l=t<0?"-":"";if(r.match(/^00+$/))return l+L(c,r.length);if(r.match(/^[#?]+$/)){n=""+t;if(t===0)n="";return n.length>r.length?n:Ee(r.substr(0,r.length-n.length))+n}if(i=r.match(me))return ge(i,c,l);if(r.match(/^#+0+$/))return l+L(c,r.length-r.indexOf("0"));if(i=r.match(we)){n=(""+t).replace(/^([^\.]+)$/,"$1."+Ee(i[1])).replace(/\.$/,"."+Ee(i[1]));n=n.replace(/\.(\d*)$/,function(e,r){return"."+r+Er("0",Ee(i[1]).length-r.length)});return r.indexOf("0.")!==-1?n:n.replace(/^0\./,".")}r=r.replace(/^#+([0.])/,"$1");if(i=r.match(/^(0*)\.(#*)$/)){return l+(""+c).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,i[1].length?"0.":".")}if(i=r.match(/^#{1,3},##0(\.?)$/))return l+ue(""+c);if(i=r.match(/^#,##0\.([#0]*0)$/)){return t<0?"-"+Ne(e,r,-t):ue(""+t)+"."+Er("0",i[1].length)}if(i=r.match(/^#,#*,#0/))return Ne(e,r.replace(/^#,#*,/,""),t);if(i=r.match(/^([0#]+)(\\?-([0#]+))+$/)){n=P(Ne(e,r.replace(/[\\-]/g,""),t));s=0;return P(P(r.replace(/\\/g,"")).replace(/[0#]/g,function(e){return s<n.length?n.charAt(s++):e==="0"?"0":""}))}if(r.match(Te)){n=Ne(e,"##########",t);return"("+n.substr(0,3)+") "+n.substr(3,3)+"-"+n.substr(6)}var o="";if(i=r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)){s=Math.min(i[4].length,7);f=J(c,Math.pow(10,s)-1,false);n=""+l;o=Ie("n",i[1],f[1]);if(o.charAt(o.length-1)==" ")o=o.substr(0,o.length-1)+"0";n+=o+i[2]+"/"+i[3];o=U(f[2],s);if(o.length<i[4].length)o=Ee(i[4].substr(i[4].length-o.length))+o;n+=o;return n}if(i=r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)){s=Math.min(Math.max(i[1].length,i[4].length),7);f=J(c,Math.pow(10,s)-1,true);return l+(f[0]||(f[1]?"":"0"))+" "+(f[1]?M(f[1],s)+i[2]+"/"+i[3]+U(f[2],s):Er(" ",2*s+1+i[2].length+i[3].length))}if(i=r.match(/^[#0?]+$/)){n=""+t;if(r.length<=n.length)return n;return Ee(r.substr(0,r.length-n.length))+n}if(i=r.match(/^([#0]+)\.([#0]+)$/)){n=""+t.toFixed(Math.min(i[2].length,10)).replace(/([^0])0+$/,"$1");s=n.indexOf(".");var u=r.indexOf(".")-s,h=r.length-n.length-u;return Ee(r.substr(0,u)+n+r.substr(r.length-h))}if(i=r.match(/^00,000\.([#0]*0)$/)){return t<0?"-"+Ne(e,r,-t):ue(""+t).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?L(0,3-e.length):"")+e})+"."+L(0,i[1].length)}switch(r){case"###,###":;case"##,###":;case"#,###":var d=ue(""+c);return d!=="0"?l+d:"";default:if(r.match(/\.[0#?]*$/))return Ne(e,r.slice(0,r.lastIndexOf(".")),t)+Ee(r.slice(r.lastIndexOf(".")));}throw new Error("unsupported format |"+r+"|")}function Ie(e,r,t){return(t|0)===t?Ne(e,r,t):xe(e,r,t)}function Fe(e){var r=[];var t=false;for(var a=0,n=0;a<e.length;++a)switch(e.charCodeAt(a)){case 34:t=!t;break;case 95:;case 42:;case 92:++a;break;case 59:r[r.length]=e.substr(n,a-n);n=a+1;}r[r.length]=e.substr(n);if(t===true)throw new Error("Format |"+e+"| unterminated string ");return r}var De=/\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;function Pe(e){var r=0,t="",a="";while(r<e.length){switch(t=e.charAt(r)){case"G":if(V(e,r))r+=6;r++;break;case'"':for(;e.charCodeAt(++r)!==34&&r<e.length;){}++r;break;case"\\":r+=2;break;case"_":r+=2;break;case"@":++r;break;case"B":;case"b":if(e.charAt(r+1)==="1"||e.charAt(r+1)==="2")return true;case"M":;case"D":;case"Y":;case"H":;case"S":;case"E":;case"m":;case"d":;case"y":;case"h":;case"s":;case"e":;case"g":return true;case"A":;case"a":;case"上":if(e.substr(r,3).toUpperCase()==="A/P")return true;if(e.substr(r,5).toUpperCase()==="AM/PM")return true;if(e.substr(r,5).toUpperCase()==="上午/下午")return true;++r;break;case"[":a=t;while(e.charAt(r++)!=="]"&&r<e.length)a+=e.charAt(r);if(a.match(De))return true;break;case".":;case"0":;case"#":while(r<e.length&&("0#?.,E+-%".indexOf(t=e.charAt(++r))>-1||t=="\\"&&e.charAt(r+1)=="-"&&"0#".indexOf(e.charAt(r+2))>-1)){}break;case"?":while(e.charAt(++r)===t){}break;case"*":++r;if(e.charAt(r)==" "||e.charAt(r)=="*")++r;break;case"(":;case")":++r;break;case"1":;case"2":;case"3":;case"4":;case"5":;case"6":;case"7":;case"8":;case"9":while(r<e.length&&"0123456789".indexOf(e.charAt(++r))>-1){}break;case" ":++r;break;default:++r;break;}}return false}function Le(e,r,t,a){var n=[],i="",s=0,f="",c="t",l,o,u;var h="H";while(s<e.length){switch(f=e.charAt(s)){case"G":if(!V(e,s))throw new Error("unrecognized character "+f+" in "+e);n[n.length]={t:"G",v:"General"};s+=7;break;case'"':for(i="";(u=e.charCodeAt(++s))!==34&&s<e.length;)i+=String.fromCharCode(u);n[n.length]={t:"t",v:i};++s;break;case"\\":var d=e.charAt(++s),v=d==="("||d===")"?d:"t";n[n.length]={t:v,v:d};++s;break;case"_":n[n.length]={t:"t",v:" "};s+=2;break;case"@":n[n.length]={t:"T",v:r};++s;break;case"B":;case"b":if(e.charAt(s+1)==="1"||e.charAt(s+1)==="2"){if(l==null){l=q(r,t,e.charAt(s+1)==="2");if(l==null)return""}n[n.length]={t:"X",v:e.substr(s,2)};c=f;s+=2;break};case"M":;case"D":;case"Y":;case"H":;case"S":;case"E":f=f.toLowerCase();case"m":;case"d":;case"y":;case"h":;case"s":;case"e":;case"g":if(r<0)return"";if(l==null){l=q(r,t);if(l==null)return""}i=f;while(++s<e.length&&e.charAt(s).toLowerCase()===f)i+=f;if(f==="m"&&c.toLowerCase()==="h")f="M";if(f==="h")f=h;n[n.length]={t:f,v:i};c=f;break;case"A":;case"a":;case"上":var p={t:f,v:f};if(l==null)l=q(r,t);if(e.substr(s,3).toUpperCase()==="A/P"){if(l!=null)p.v=l.H>=12?e.charAt(s+2):f;p.t="T";h="h";s+=3}else if(e.substr(s,5).toUpperCase()==="AM/PM"){if(l!=null)p.v=l.H>=12?"PM":"AM";p.t="T";s+=5;h="h"}else if(e.substr(s,5).toUpperCase()==="上午/下午"){if(l!=null)p.v=l.H>=12?"下午":"上午";p.t="T";s+=5;h="h"}else{p.t="t";++s}if(l==null&&p.t==="T")return"";n[n.length]=p;c=f;break;case"[":i=f;while(e.charAt(s++)!=="]"&&s<e.length)i+=e.charAt(s);if(i.slice(-1)!=="]")throw'unterminated "[" block: |'+i+"|";if(i.match(De)){if(l==null){l=q(r,t);if(l==null)return""}n[n.length]={t:"Z",v:i.toLowerCase()};c=i.charAt(1)}else if(i.indexOf("$")>-1){i=(i.match(/\$([^-\[\]]*)/)||[])[1]||"$";if(!Pe(e))n[n.length]={t:"t",v:i}}break;case".":if(l!=null){i=f;while(++s<e.length&&(f=e.charAt(s))==="0")i+=f;n[n.length]={t:"s",v:i};break};case"0":;case"#":i=f;while(++s<e.length&&"0#?.,E+-%".indexOf(f=e.charAt(s))>-1)i+=f;n[n.length]={t:"n",v:i};break;case"?":i=f;while(e.charAt(++s)===f)i+=f;n[n.length]={t:f,v:i};c=f;break;case"*":++s;if(e.charAt(s)==" "||e.charAt(s)=="*")++s;break;case"(":;case")":n[n.length]={t:a===1?"t":f,v:f};++s;break;case"1":;case"2":;case"3":;case"4":;case"5":;case"6":;case"7":;case"8":;case"9":i=f;while(s<e.length&&"0123456789".indexOf(e.charAt(++s))>-1)i+=e.charAt(s);n[n.length]={t:"D",v:i};break;case" ":n[n.length]={t:f,v:f};++s;break;case"$":n[n.length]={t:"t",v:"$"};++s;break;default:if(",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f)===-1)throw new Error("unrecognized character "+f+" in "+e);n[n.length]={t:"t",v:f};++s;break;}}var m=0,b=0,g;for(s=n.length-1,c="t";s>=0;--s){switch(n[s].t){case"h":;case"H":n[s].t=h;c="h";if(m<1)m=1;break;case"s":if(g=n[s].v.match(/\.0+$/))b=Math.max(b,g[0].length-1);if(m<3)m=3;case"d":;case"y":;case"M":;case"e":c=n[s].t;break;case"m":if(c==="s"){n[s].t="M";if(m<2)m=2}break;case"X":break;case"Z":if(m<1&&n[s].v.match(/[Hh]/))m=1;if(m<2&&n[s].v.match(/[Mm]/))m=2;if(m<3&&n[s].v.match(/[Ss]/))m=3;}}switch(m){case 0:break;case 1:if(l.u>=.5){l.u=0;++l.S}if(l.S>=60){l.S=0;++l.M}if(l.M>=60){l.M=0;++l.H}break;case 2:if(l.u>=.5){l.u=0;++l.S}if(l.S>=60){l.S=0;++l.M}break;}var w="",k;for(s=0;s<n.length;++s){switch(n[s].t){case"t":;case"T":;case" ":;case"D":break;case"X":n[s].v="";n[s].t=";";break;case"d":;case"m":;case"y":;case"h":;case"H":;case"M":;case"s":;case"e":;case"b":;case"Z":n[s].v=oe(n[s].t.charCodeAt(0),n[s].v,l,b);n[s].t="t";break;case"n":;case"?":k=s+1;while(n[k]!=null&&((f=n[k].t)==="?"||f==="D"||(f===" "||f==="t")&&n[k+1]!=null&&(n[k+1].t==="?"||n[k+1].t==="t"&&n[k+1].v==="/")||n[s].t==="("&&(f===" "||f==="n"||f===")")||f==="t"&&(n[k].v==="/"||n[k].v===" "&&n[k+1]!=null&&n[k+1].t=="?"))){n[s].v+=n[k].v;n[k]={v:"",t:";"};++k}w+=n[s].v;s=k-1;break;case"G":n[s].t="t";n[s].v=ce(r,t);break;}}var T="",E,y;if(w.length>0){if(w.charCodeAt(0)==40){E=r<0&&w.charCodeAt(0)===45?-r:r;y=Ie("n",w,E)}else{E=r<0&&a>1?-r:r;y=Ie("n",w,E);if(E<0&&n[0]&&n[0].t=="t"){y=y.substr(1);n[0].v="-"+n[0].v}}k=y.length-1;var S=n.length;for(s=0;s<n.length;++s)if(n[s]!=null&&n[s].t!="t"&&n[s].v.indexOf(".")>-1){S=s;break}var _=n.length;if(S===n.length&&y.indexOf("E")===-1){for(s=n.length-1;s>=0;--s){if(n[s]==null||"n?".indexOf(n[s].t)===-1)continue;if(k>=n[s].v.length-1){k-=n[s].v.length;n[s].v=y.substr(k+1,n[s].v.length)}else if(k<0)n[s].v="";else{n[s].v=y.substr(0,k+1);k=-1}n[s].t="t";_=s}if(k>=0&&_<n.length)n[_].v=y.substr(0,k+1)+n[_].v}else if(S!==n.length&&y.indexOf("E")===-1){k=y.indexOf(".")-1;for(s=S;s>=0;--s){if(n[s]==null||"n?".indexOf(n[s].t)===-1)continue;o=n[s].v.indexOf(".")>-1&&s===S?n[s].v.indexOf(".")-1:n[s].v.length-1;T=n[s].v.substr(o+1);for(;o>=0;--o){if(k>=0&&(n[s].v.charAt(o)==="0"||n[s].v.charAt(o)==="#"))T=y.charAt(k--)+T}n[s].v=T;n[s].t="t";_=s}if(k>=0&&_<n.length)n[_].v=y.substr(0,k+1)+n[_].v;k=y.indexOf(".")+1;for(s=S;s<n.length;++s){if(n[s]==null||"n?(".indexOf(n[s].t)===-1&&s!==S)continue;o=n[s].v.indexOf(".")>-1&&s===S?n[s].v.indexOf(".")+1:0;T=n[s].v.substr(0,o);for(;o<n[s].v.length;++o){if(k<y.length)T+=y.charAt(k++)}n[s].v=T;n[s].t="t";_=s}}}for(s=0;s<n.length;++s)if(n[s]!=null&&"n?".indexOf(n[s].t)>-1){E=a>1&&r<0&&s>0&&n[s-1].v==="-"?-r:r;n[s].v=Ie(n[s].t,n[s].v,E);n[s].t="t"}var A="";for(s=0;s!==n.length;++s)if(n[s]!=null)A+=n[s].v;return A}var Me=/\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;function Ue(e,r){if(r==null)return false;var t=parseFloat(r[2]);switch(r[1]){case"=":if(e==t)return true;break;case">":if(e>t)return true;break;case"<":if(e<t)return true;break;case"<>":if(e!=t)return true;break;case">=":if(e>=t)return true;break;case"<=":if(e<=t)return true;break;}return false}function Be(e,r){var t=Fe(e);var a=t.length,n=t[a-1].indexOf("@");if(a<4&&n>-1)--a;if(t.length>4)throw new Error("cannot find right format for |"+t.join("|")+"|");if(typeof r!=="number")return[4,t.length===4||n>-1?t[t.length-1]:"@"];switch(t.length){case 1:t=n>-1?["General","General","General",t[0]]:[t[0],t[0],t[0],"@"];break;case 2:t=n>-1?[t[0],t[0],t[0],t[1]]:[t[0],t[1],t[0],"@"];break;case 3:t=n>-1?[t[0],t[1],t[0],t[2]]:[t[0],t[1],t[2],"@"];break;case 4:break;}var i=r>0?t[0]:r<0?t[1]:t[2];if(t[0].indexOf("[")===-1&&t[1].indexOf("[")===-1)return[a,i];if(t[0].match(/\[[=<>]/)!=null||t[1].match(/\[[=<>]/)!=null){var s=t[0].match(Me);var f=t[1].match(Me);return Ue(r,s)?[a,t[0]]:Ue(r,f)?[a,t[1]]:[a,t[s!=null&&f!=null?2:1]]}return[a,i]}function We(e,r,t){if(t==null)t={};var a="";switch(typeof e){case"string":if(e=="m/d/yy"&&t.dateNF)a=t.dateNF;else a=e;break;case"number":if(e==14&&t.dateNF)a=t.dateNF;else a=(t.table!=null?t.table:Y)[e];if(a==null)a=t.table&&t.table[K[e]]||Y[K[e]];if(a==null)a=Z[e]||"General";break;}if(V(a,0))return ce(r,t);if(r instanceof Date)r=te(r,t.date1904);var n=Be(a,r);if(V(n[1]))return ce(r,t);if(r===true)r="TRUE";else if(r===false)r="FALSE";else if(r===""||r==null)return"";return Le(n[1],r,t,n[0])}function He(e,r){if(typeof r!="number"){r=+r||-1;for(var t=0;t<392;++t){if(Y[t]==undefined){if(r<0)r=t;continue}if(Y[t]==e){r=t;break}}if(r<0)r=391}Y[r]=e;return r}function ze(e){for(var r=0;r!=392;++r)if(e[r]!==undefined)He(e[r],r)}function Ve(){Y=X()}var Ge={format:We,load:He,_table:Y,load_table:ze,parse_date_code:q,is_date:Pe,get_table:function vk(){return Ge._table=Y}};var $e={5:'"$"#,##0_);\\("$"#,##0\\)',6:'"$"#,##0_);[Red]\\("$"#,##0\\)',7:'"$"#,##0.00_);\\("$"#,##0.00\\)',8:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',23:"General",24:"General",25:"General",26:"General",27:"m/d/yy",28:"m/d/yy",29:"m/d/yy",30:"m/d/yy",31:"m/d/yy",32:"h:mm:ss",33:"h:mm:ss",34:"h:mm:ss",35:"h:mm:ss",36:"m/d/yy",41:'_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',42:'_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',43:'_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',44:'_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',50:"m/d/yy",51:"m/d/yy",52:"m/d/yy",53:"m/d/yy",54:"m/d/yy",55:"m/d/yy",56:"m/d/yy",57:"m/d/yy",58:"m/d/yy",59:"0",60:"0.00",61:"#,##0",62:"#,##0.00",63:'"$"#,##0_);\\("$"#,##0\\)',64:'"$"#,##0_);[Red]\\("$"#,##0\\)',65:'"$"#,##0.00_);\\("$"#,##0.00\\)',66:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',67:"0%",68:"0.00%",69:"# ?/?",70:"# ??/??",71:"m/d/yy",72:"m/d/yy",73:"d-mmm-yy",74:"d-mmm",75:"mmm-yy",76:"h:mm",77:"h:mm:ss",78:"m/d/yy h:mm",79:"mm:ss",80:"[h]:mm:ss",81:"mmss.0"};var je=/[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;function Xe(e){var r=typeof e=="number"?Y[e]:e;r=r.replace(je,"(\\d+)");return new RegExp("^"+r+"$")}function Ye(e,r,t){var a=-1,n=-1,i=-1,s=-1,f=-1,c=-1;(r.match(je)||[]).forEach(function(e,r){var l=parseInt(t[r+1],10);switch(e.toLowerCase().charAt(0)){case"y":a=l;break;case"d":i=l;break;case"h":s=l;break;case"s":c=l;break;case"m":if(s>=0)f=l;else n=l;break;}});if(c>=0&&f==-1&&n>=0){f=n;n=-1}var l=(""+(a>=0?a:(new Date).getFullYear())).slice(-4)+"-"+("00"+(n>=1?n:1)).slice(-2)+"-"+("00"+(i>=1?i:1)).slice(-2);if(l.length==7)l="0"+l;if(l.length==8)l="20"+l;var o=("00"+(s>=0?s:0)).slice(-2)+":"+("00"+(f>=0?f:0)).slice(-2)+":"+("00"+(c>=0?c:0)).slice(-2);if(s==-1&&f==-1&&c==-1)return l;if(a==-1&&n==-1&&i==-1)return o;return l+"T"+o}var Ke={"d.m":"d\\.m"};function Ze(e,r){return He(Ke[e]||e,r)}var Je=function(){var e={};e.version="1.2.0";function r(){var e=0,r=new Array(256);for(var t=0;t!=256;++t){e=t;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;e=e&1?-306674912^e>>>1:e>>>1;r[t]=e}return typeof Int32Array!=="undefined"?new Int32Array(r):r}var t=r();function a(e){var r=0,t=0,a=0,n=typeof Int32Array!=="undefined"?new Int32Array(4096):new Array(4096);for(a=0;a!=256;++a)n[a]=e[a];for(a=0;a!=256;++a){t=e[a];for(r=256+a;r<4096;r+=256)t=n[r]=t>>>8^e[t&255]}var i=[];for(a=1;a!=16;++a)i[a-1]=typeof Int32Array!=="undefined"?n.subarray(a*256,a*256+256):n.slice(a*256,a*256+256);return i}var n=a(t);var i=n[0],s=n[1],f=n[2],c=n[3],l=n[4];var o=n[5],u=n[6],h=n[7],d=n[8],v=n[9];var p=n[10],m=n[11],b=n[12],g=n[13],w=n[14];function k(e,r){var a=r^-1;for(var n=0,i=e.length;n<i;)a=a>>>8^t[(a^e.charCodeAt(n++))&255];
return~a}function T(e,r){var a=r^-1,n=e.length-15,k=0;for(;k<n;)a=w[e[k++]^a&255]^g[e[k++]^a>>8&255]^b[e[k++]^a>>16&255]^m[e[k++]^a>>>24]^p[e[k++]]^v[e[k++]]^d[e[k++]]^h[e[k++]]^u[e[k++]]^o[e[k++]]^l[e[k++]]^c[e[k++]]^f[e[k++]]^s[e[k++]]^i[e[k++]]^t[e[k++]];n+=15;while(k<n)a=a>>>8^t[(a^e[k++])&255];return~a}function E(e,r){var a=r^-1;for(var n=0,i=e.length,s=0,f=0;n<i;){s=e.charCodeAt(n++);if(s<128){a=a>>>8^t[(a^s)&255]}else if(s<2048){a=a>>>8^t[(a^(192|s>>6&31))&255];a=a>>>8^t[(a^(128|s&63))&255]}else if(s>=55296&&s<57344){s=(s&1023)+64;f=e.charCodeAt(n++)&1023;a=a>>>8^t[(a^(240|s>>8&7))&255];a=a>>>8^t[(a^(128|s>>2&63))&255];a=a>>>8^t[(a^(128|f>>6&15|(s&3)<<4))&255];a=a>>>8^t[(a^(128|f&63))&255]}else{a=a>>>8^t[(a^(224|s>>12&15))&255];a=a>>>8^t[(a^(128|s>>6&63))&255];a=a>>>8^t[(a^(128|s&63))&255]}}return~a}e.table=t;e.bstr=k;e.buf=T;e.str=E;return e}();var qe=function pk(){var e={};e.version="1.2.2";function r(e,r){var t=e.split("/"),a=r.split("/");for(var n=0,i=0,s=Math.min(t.length,a.length);n<s;++n){if(i=t[n].length-a[n].length)return i;if(t[n]!=a[n])return t[n]<a[n]?-1:1}return t.length-a.length}function t(e){if(e.charAt(e.length-1)=="/")return e.slice(0,-1).indexOf("/")===-1?e:t(e.slice(0,-1));var r=e.lastIndexOf("/");return r===-1?e:e.slice(0,r+1)}function a(e){if(e.charAt(e.length-1)=="/")return a(e.slice(0,-1));var r=e.lastIndexOf("/");return r===-1?e:e.slice(r+1)}function n(e,r){if(typeof r==="string")r=new Date(r);var t=r.getHours();t=t<<6|r.getMinutes();t=t<<5|r.getSeconds()>>>1;e._W(2,t);var a=r.getFullYear()-1980;a=a<<4|r.getMonth()+1;a=a<<5|r.getDate();e._W(2,a)}function i(e){var r=e._R(2)&65535;var t=e._R(2)&65535;var a=new Date;var n=t&31;t>>>=5;var i=t&15;t>>>=4;a.setMilliseconds(0);a.setFullYear(t+1980);a.setMonth(i-1);a.setDate(n);var s=r&31;r>>>=5;var f=r&63;r>>>=6;a.setHours(r);a.setMinutes(f);a.setSeconds(s<<1);return a}function s(e){pa(e,0);var r={};var t=0;while(e.l<=e.length-4){var a=e._R(2);var n=e._R(2),i=e.l+n;var s={};switch(a){case 21589:{t=e._R(1);if(t&1)s.mtime=e._R(4);if(n>5){if(t&2)s.atime=e._R(4);if(t&4)s.ctime=e._R(4)}if(s.mtime)s.mt=new Date(s.mtime*1e3)}break;}e.l=i;r[a]=s}return r}var f;function c(){return f||(f=Qe)}function l(e,r){if(e[0]==80&&e[1]==75)return Ne(e,r);if((e[0]|32)==109&&(e[1]|32)==105)return We(e,r);if(e.length<512)throw new Error("CFB file size "+e.length+" < 512");var t=3;var a=512;var n=0;var i=0;var s=0;var f=0;var c=0;var l=[];var v=e.slice(0,512);pa(v,0);var m=o(v);t=m[0];switch(t){case 3:a=512;break;case 4:a=4096;break;case 0:if(m[1]==0)return Ne(e,r);default:throw new Error("Major Version: Expected 3 or 4 saw "+t);}if(a!==512){v=e.slice(0,a);pa(v,28)}var w=e.slice(0,a);u(v,t);var k=v._R(4,"i");if(t===3&&k!==0)throw new Error("# Directory Sectors: Expected 0 saw "+k);v.l+=4;s=v._R(4,"i");v.l+=4;v.chk("00100000","Mini Stream Cutoff Size: ");f=v._R(4,"i");n=v._R(4,"i");c=v._R(4,"i");i=v._R(4,"i");for(var T=-1,E=0;E<109;++E){T=v._R(4,"i");if(T<0)break;l[E]=T}var y=h(e,a);p(c,i,y,a,l);var S=b(y,s,l,a);S[s].name="!Directory";if(n>0&&f!==U)S[f].name="!MiniFAT";S[l[0]].name="!FAT";S.fat_addrs=l;S.ssz=a;var _={},A=[],x=[],C=[];g(s,S,y,A,n,_,x,f);d(x,C,A);A.shift();var O={FileIndex:x,FullPaths:C};if(r&&r.raw)O.raw={header:w,sectors:y};return O}function o(e){if(e[e.l]==80&&e[e.l+1]==75)return[0,0];e.chk(B,"Header Signature: ");e.l+=16;var r=e._R(2,"u");return[e._R(2,"u"),r]}function u(e,r){var t=9;e.l+=2;switch(t=e._R(2)){case 9:if(r!=3)throw new Error("Sector Shift: Expected 9 saw "+t);break;case 12:if(r!=4)throw new Error("Sector Shift: Expected 12 saw "+t);break;default:throw new Error("Sector Shift: Expected 9 or 12 saw "+t);}e.chk("0600","Mini Sector Shift: ");e.chk("000000000000","Reserved: ")}function h(e,r){var t=Math.ceil(e.length/r)-1;var a=[];for(var n=1;n<t;++n)a[n-1]=e.slice(n*r,(n+1)*r);a[t-1]=e.slice(t*r);return a}function d(e,r,t){var a=0,n=0,i=0,s=0,f=0,c=t.length;var l=[],o=[];for(;a<c;++a){l[a]=o[a]=a;r[a]=t[a]}for(;f<o.length;++f){a=o[f];n=e[a].L;i=e[a].R;s=e[a].C;if(l[a]===a){if(n!==-1&&l[n]!==n)l[a]=l[n];if(i!==-1&&l[i]!==i)l[a]=l[i]}if(s!==-1)l[s]=a;if(n!==-1&&a!=l[a]){l[n]=l[a];if(o.lastIndexOf(n)<f)o.push(n)}if(i!==-1&&a!=l[a]){l[i]=l[a];if(o.lastIndexOf(i)<f)o.push(i)}}for(a=1;a<c;++a)if(l[a]===a){if(i!==-1&&l[i]!==i)l[a]=l[i];else if(n!==-1&&l[n]!==n)l[a]=l[n]}for(a=1;a<c;++a){if(e[a].type===0)continue;f=a;if(f!=l[f])do{f=l[f];r[a]=r[f]+"/"+r[a]}while(f!==0&&-1!==l[f]&&f!=l[f]);l[a]=-1}r[0]+="/";for(a=1;a<c;++a){if(e[a].type!==2)r[a]+="/"}}function v(e,r,t){var a=e.start,n=e.size;var i=[];var s=a;while(t&&n>0&&s>=0){i.push(r.slice(s*M,s*M+M));n-=M;s=fa(t,s*4)}if(i.length===0)return ba(0);return N(i).slice(0,e.size)}function p(e,r,t,a,n){var i=U;if(e===U){if(r!==0)throw new Error("DIFAT chain shorter than expected")}else if(e!==-1){var s=t[e],f=(a>>>2)-1;if(!s)return;for(var c=0;c<f;++c){if((i=fa(s,c*4))===U)break;n.push(i)}if(r>=1)p(fa(s,a-4),r-1,t,a,n)}}function m(e,r,t,a,n){var i=[],s=[];if(!n)n=[];var f=a-1,c=0,l=0;for(c=r;c>=0;){n[c]=true;i[i.length]=c;s.push(e[c]);var o=t[Math.floor(c*4/a)];l=c*4&f;if(a<4+l)throw new Error("FAT boundary crossed: "+c+" 4 "+a);if(!e[o])break;c=fa(e[o],l)}return{nodes:i,data:Lt([s])}}function b(e,r,t,a){var n=e.length,i=[];var s=[],f=[],c=[];var l=a-1,o=0,u=0,h=0,d=0;for(o=0;o<n;++o){f=[];h=o+r;if(h>=n)h-=n;if(s[h])continue;c=[];var v=[];for(u=h;u>=0;){v[u]=true;s[u]=true;f[f.length]=u;c.push(e[u]);var p=t[Math.floor(u*4/a)];d=u*4&l;if(a<4+d)throw new Error("FAT boundary crossed: "+u+" 4 "+a);if(!e[p])break;u=fa(e[p],d);if(v[u])break}i[h]={nodes:f,data:Lt([c])}}return i}function g(e,r,t,a,n,i,s,f){var c=0,l=a.length?2:0;var o=r[e].data;var u=0,h=0,d;for(;u<o.length;u+=128){var p=o.slice(u,u+128);pa(p,64);h=p._R(2);d=Ut(p,0,h-l);a.push(d);var b={name:d,type:p._R(1),color:p._R(1),L:p._R(4,"i"),R:p._R(4,"i"),C:p._R(4,"i"),clsid:p._R(16),state:p._R(4,"i"),start:0,size:0};var g=p._R(2)+p._R(2)+p._R(2)+p._R(2);if(g!==0)b.ct=w(p,p.l-8);var k=p._R(2)+p._R(2)+p._R(2)+p._R(2);if(k!==0)b.mt=w(p,p.l-8);b.start=p._R(4,"i");b.size=p._R(4,"i");if(b.size<0&&b.start<0){b.size=b.type=0;b.start=U;b.name=""}if(b.type===5){c=b.start;if(n>0&&c!==U)r[c].name="!StreamData"}else if(b.size>=4096){b.storage="fat";if(r[b.start]===undefined)r[b.start]=m(t,b.start,r.fat_addrs,r.ssz);r[b.start].name=b.name;b.content=r[b.start].data.slice(0,b.size)}else{b.storage="minifat";if(b.size<0)b.size=0;else if(c!==U&&b.start!==U&&r[c]){b.content=v(b,r[c].data,(r[f]||{}).data)}}if(b.content)pa(b.content,0);i[d]=b;s.push(b)}}function w(e,r){return new Date((sa(e,r+4)/1e7*Math.pow(2,32)+sa(e,r)/1e7-11644473600)*1e3)}function x(e,r){c();return l(f.readFileSync(e),r)}function C(e,r){var t=r&&r.type;if(!t){if(E&&Buffer.isBuffer(e))t="buffer"}switch(t||"base64"){case"file":return x(e,r);case"base64":return l(A(T(e)),r);case"binary":return l(A(e),r);}return l(e,r)}function O(e,r){var t=r||{},a=t.root||"Root Entry";if(!e.FullPaths)e.FullPaths=[];if(!e.FileIndex)e.FileIndex=[];if(e.FullPaths.length!==e.FileIndex.length)throw new Error("inconsistent CFB structure");if(e.FullPaths.length===0){e.FullPaths[0]=a+"/";e.FileIndex[0]={name:a,type:5}}if(t.CLSID)e.FileIndex[0].clsid=t.CLSID;R(e)}function R(e){var r="Sh33tJ5";if(qe.find(e,"/"+r))return;var t=ba(4);t[0]=55;t[1]=t[3]=50;t[2]=54;e.FileIndex.push({name:r,type:2,content:t,size:4,L:69,R:69,C:69});e.FullPaths.push(e.FullPaths[0]+r);I(e)}function I(e,n){O(e);var i=false,s=false;for(var f=e.FullPaths.length-1;f>=0;--f){var c=e.FileIndex[f];switch(c.type){case 0:if(s)i=true;else{e.FileIndex.pop();e.FullPaths.pop()}break;case 1:;case 2:;case 5:s=true;if(isNaN(c.R*c.L*c.C))i=true;if(c.R>-1&&c.L>-1&&c.R==c.L)i=true;break;default:i=true;break;}}if(!i&&!n)return;var l=new Date(1987,1,19),o=0;var u=Object.create?Object.create(null):{};var h=[];for(f=0;f<e.FullPaths.length;++f){u[e.FullPaths[f]]=true;if(e.FileIndex[f].type===0)continue;h.push([e.FullPaths[f],e.FileIndex[f]])}for(f=0;f<h.length;++f){var d=t(h[f][0]);s=u[d];while(!s){while(t(d)&&!u[t(d)])d=t(d);h.push([d,{name:a(d).replace("/",""),type:1,clsid:H,ct:l,mt:l,content:null}]);u[d]=true;d=t(h[f][0]);s=u[d]}}h.sort(function(e,t){return r(e[0],t[0])});e.FullPaths=[];e.FileIndex=[];for(f=0;f<h.length;++f){e.FullPaths[f]=h[f][0];e.FileIndex[f]=h[f][1]}for(f=0;f<h.length;++f){var v=e.FileIndex[f];var p=e.FullPaths[f];v.name=a(p).replace("/","");v.L=v.R=v.C=-(v.color=1);v.size=v.content?v.content.length:0;v.start=0;v.clsid=v.clsid||H;if(f===0){v.C=h.length>1?1:-1;v.size=0;v.type=5}else if(p.slice(-1)=="/"){for(o=f+1;o<h.length;++o)if(t(e.FullPaths[o])==p)break;v.C=o>=h.length?-1:o;for(o=f+1;o<h.length;++o)if(t(e.FullPaths[o])==t(p))break;v.R=o>=h.length?-1:o;v.type=1}else{if(t(e.FullPaths[f+1]||"")==t(p))v.R=f+1;v.type=2}}}function P(e,r){var t=r||{};if(t.fileType=="mad")return He(e,t);I(e);switch(t.fileType){case"zip":return Fe(e,t);}var a=function(e){var r=0,t=0;for(var a=0;a<e.FileIndex.length;++a){var n=e.FileIndex[a];if(!n.content)continue;var i=n.content.length;if(i>0){if(i<4096)r+=i+63>>6;else t+=i+511>>9}}var s=e.FullPaths.length+3>>2;var f=r+7>>3;var c=r+127>>7;var l=f+t+s+c;var o=l+127>>7;var u=o<=109?0:Math.ceil((o-109)/127);while(l+o+u+127>>7>o)u=++o<=109?0:Math.ceil((o-109)/127);var h=[1,u,o,c,s,t,r,0];e.FileIndex[0].size=r<<6;h[7]=(e.FileIndex[0].start=h[0]+h[1]+h[2]+h[3]+h[4]+h[5])+(h[6]+7>>3);return h}(e);var n=ba(a[7]<<9);var i=0,s=0;{for(i=0;i<8;++i)n._W(1,W[i]);for(i=0;i<8;++i)n._W(2,0);n._W(2,62);n._W(2,3);n._W(2,65534);n._W(2,9);n._W(2,6);for(i=0;i<3;++i)n._W(2,0);n._W(4,0);n._W(4,a[2]);n._W(4,a[0]+a[1]+a[2]+a[3]-1);n._W(4,0);n._W(4,1<<12);n._W(4,a[3]?a[0]+a[1]+a[2]-1:U);n._W(4,a[3]);n._W(-4,a[1]?a[0]-1:U);n._W(4,a[1]);for(i=0;i<109;++i)n._W(-4,i<a[2]?a[1]+i:-1)}if(a[1]){for(s=0;s<a[1];++s){for(;i<236+s*127;++i)n._W(-4,i<a[2]?a[1]+i:-1);n._W(-4,s===a[1]-1?U:s+1)}}var f=function(e){for(s+=e;i<s-1;++i)n._W(-4,i+1);if(e){++i;n._W(-4,U)}};s=i=0;for(s+=a[1];i<s;++i)n._W(-4,z.DIFSECT);for(s+=a[2];i<s;++i)n._W(-4,z.FATSECT);f(a[3]);f(a[4]);var c=0,l=0;var o=e.FileIndex[0];for(;c<e.FileIndex.length;++c){o=e.FileIndex[c];if(!o.content)continue;l=o.content.length;if(l<4096)continue;o.start=s;f(l+511>>9)}f(a[6]+7>>3);while(n.l&511)n._W(-4,z.ENDOFCHAIN);s=i=0;for(c=0;c<e.FileIndex.length;++c){o=e.FileIndex[c];if(!o.content)continue;l=o.content.length;if(!l||l>=4096)continue;o.start=s;f(l+63>>6)}while(n.l&511)n._W(-4,z.ENDOFCHAIN);for(i=0;i<a[4]<<2;++i){var u=e.FullPaths[i];if(!u||u.length===0){for(c=0;c<17;++c)n._W(4,0);for(c=0;c<3;++c)n._W(4,-1);for(c=0;c<12;++c)n._W(4,0);continue}o=e.FileIndex[i];if(i===0)o.start=o.size?o.start-1:U;var h=i===0&&t.root||o.name;if(h.length>32){console.error("Name "+h+" will be truncated to "+h.slice(0,32));h=h.slice(0,32)}l=2*(h.length+1);n._W(64,h,"utf16le");n._W(2,l);n._W(1,o.type);n._W(1,o.color);n._W(-4,o.L);n._W(-4,o.R);n._W(-4,o.C);if(!o.clsid)for(c=0;c<4;++c)n._W(4,0);else n._W(16,o.clsid,"hex");n._W(4,o.state||0);n._W(4,0);n._W(4,0);n._W(4,0);n._W(4,0);n._W(4,o.start);n._W(4,o.size);n._W(4,0)}for(i=1;i<e.FileIndex.length;++i){o=e.FileIndex[i];if(o.size>=4096){n.l=o.start+1<<9;if(E&&Buffer.isBuffer(o.content)){o.content.copy(n,n.l,0,o.size);n.l+=o.size+511&-512}else{for(c=0;c<o.size;++c)n._W(1,o.content[c]);for(;c&511;++c)n._W(1,0)}}}for(i=1;i<e.FileIndex.length;++i){o=e.FileIndex[i];if(o.size>0&&o.size<4096){if(E&&Buffer.isBuffer(o.content)){o.content.copy(n,n.l,0,o.size);n.l+=o.size+63&-64}else{for(c=0;c<o.size;++c)n._W(1,o.content[c]);for(;c&63;++c)n._W(1,0)}}}if(E){n.l=n.length}else{while(n.l<n.length)n._W(1,0)}return n}function L(e,r){var t=e.FullPaths.map(function(e){return e.toUpperCase()});var a=t.map(function(e){var r=e.split("/");return r[r.length-(e.slice(-1)=="/"?2:1)]});var n=false;if(r.charCodeAt(0)===47){n=true;r=t[0].slice(0,-1)+r}else n=r.indexOf("/")!==-1;var i=r.toUpperCase();var s=n===true?t.indexOf(i):a.indexOf(i);if(s!==-1)return e.FileIndex[s];var f=!i.match(D);i=i.replace(F,"");if(f)i=i.replace(D,"!");for(s=0;s<t.length;++s){if((f?t[s].replace(D,"!"):t[s]).replace(F,"")==i)return e.FileIndex[s];if((f?a[s].replace(D,"!"):a[s]).replace(F,"")==i)return e.FileIndex[s]}return null}var M=64;var U=-2;var B="d0cf11e0a1b11ae1";var W=[208,207,17,224,161,177,26,225];var H="00000000000000000000000000000000";var z={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:U,FREESECT:-1,HEADER_SIGNATURE:B,HEADER_MINOR_VERSION:"3e00",MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:H,EntryTypes:["unknown","storage","stream","lockbytes","property","root"]};function V(e,r,t){c();var a=P(e,t);f.writeFileSync(r,a)}function G(e){var r=new Array(e.length);for(var t=0;t<e.length;++t)r[t]=String.fromCharCode(e[t]);return r.join("")}function $(e,r){var t=P(e,r);switch(r&&r.type||"buffer"){case"file":c();f.writeFileSync(r.filename,t);return t;case"binary":return typeof t=="string"?t:G(t);case"base64":return k(typeof t=="string"?t:G(t));case"buffer":if(E)return Buffer.isBuffer(t)?t:y(t);case"array":return typeof t=="string"?A(t):t;}return t}var j;function X(e){try{var r=e.InflateRaw;var t=new r;t._processChunk(new Uint8Array([3,0]),t._finishFlushFlag);if(t.bytesRead)j=e;else throw new Error("zlib does not expose bytesRead")}catch(a){console.error("cannot use native zlib: "+(a.message||a))}}function Y(e,r){if(!j)return Oe(e,r);var t=j.InflateRaw;var a=new t;var n=a._processChunk(e.slice(e.l),a._finishFlushFlag);e.l+=a.bytesRead;return n}function K(e){return j?j.deflateRawSync(e):Te(e)}var Z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var J=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];var q=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];function Q(e){var r=(e<<1|e<<11)&139536|(e<<5|e<<15)&558144;return(r>>16|r>>8|r)&255}var ee=typeof Uint8Array!=="undefined";var re=ee?new Uint8Array(1<<8):[];for(var te=0;te<1<<8;++te)re[te]=Q(te);function ae(e,r){var t=re[e&255];if(r<=8)return t>>>8-r;t=t<<8|re[e>>8&255];if(r<=16)return t>>>16-r;t=t<<8|re[e>>16&255];return t>>>24-r}function ne(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=6?0:e[a+1]<<8))>>>t&3}function ie(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=5?0:e[a+1]<<8))>>>t&7}function se(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=4?0:e[a+1]<<8))>>>t&15}function fe(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=3?0:e[a+1]<<8))>>>t&31}function ce(e,r){var t=r&7,a=r>>>3;return(e[a]|(t<=1?0:e[a+1]<<8))>>>t&127}function le(e,r,t){var a=r&7,n=r>>>3,i=(1<<t)-1;var s=e[n]>>>a;if(t<8-a)return s&i;s|=e[n+1]<<8-a;if(t<16-a)return s&i;s|=e[n+2]<<16-a;if(t<24-a)return s&i;s|=e[n+3]<<24-a;return s&i}function oe(e,r,t){var a=r&7,n=r>>>3;if(a<=5)e[n]|=(t&7)<<a;else{e[n]|=t<<a&255;e[n+1]=(t&7)>>8-a}return r+3}function ue(e,r,t){var a=r&7,n=r>>>3;t=(t&1)<<a;e[n]|=t;return r+1}function he(e,r,t){var a=r&7,n=r>>>3;t<<=a;e[n]|=t&255;t>>>=8;e[n+1]=t;return r+8}function de(e,r,t){var a=r&7,n=r>>>3;t<<=a;e[n]|=t&255;t>>>=8;e[n+1]=t&255;e[n+2]=t>>>8;return r+16}function ve(e,r){var t=e.length,a=2*t>r?2*t:r+5,n=0;if(t>=r)return e;if(E){var i=_(a);if(e.copy)e.copy(i);else for(;n<e.length;++n)i[n]=e[n];return i}else if(ee){var s=new Uint8Array(a);if(s.set)s.set(e);else for(;n<t;++n)s[n]=e[n];return s}e.length=a;return e}function pe(e){var r=new Array(e);for(var t=0;t<e;++t)r[t]=0;return r}function me(e,r,t){var a=1,n=0,i=0,s=0,f=0,c=e.length;var l=ee?new Uint16Array(32):pe(32);for(i=0;i<32;++i)l[i]=0;for(i=c;i<t;++i)e[i]=0;c=e.length;var o=ee?new Uint16Array(c):pe(c);for(i=0;i<c;++i){l[n=e[i]]++;if(a<n)a=n;o[i]=0}l[0]=0;for(i=1;i<=a;++i)l[i+16]=f=f+l[i-1]<<1;for(i=0;i<c;++i){f=e[i];if(f!=0)o[i]=l[f+16]++}var u=0;for(i=0;i<c;++i){u=e[i];if(u!=0){f=ae(o[i],a)>>a-u;for(s=(1<<a+4-u)-1;s>=0;--s)r[f|s<<u]=u&15|i<<4}}return a}var be=ee?new Uint16Array(512):pe(512);var ge=ee?new Uint16Array(32):pe(32);if(!ee){for(var we=0;we<512;++we)be[we]=0;for(we=0;we<32;++we)ge[we]=0}(function(){var e=[];var r=0;for(;r<32;r++)e.push(5);me(e,ge,32);var t=[];r=0;for(;r<=143;r++)t.push(8);for(;r<=255;r++)t.push(9);for(;r<=279;r++)t.push(7);for(;r<=287;r++)t.push(8);me(t,be,288)})();var ke=function Xe(){var e=ee?new Uint8Array(32768):[];var r=0,t=0;for(;r<q.length-1;++r){for(;t<q[r+1];++t)e[t]=r}for(;t<32768;++t)e[t]=29;var a=ee?new Uint8Array(259):[];for(r=0,t=0;r<J.length-1;++r){for(;t<J[r+1];++t)a[t]=r}function n(e,r){var t=0;while(t<e.length){var a=Math.min(65535,e.length-t);var n=t+a==e.length;r._W(1,+n);r._W(2,a);r._W(2,~a&65535);while(a-- >0)r[r.l++]=e[t++]}return r.l}function i(r,t){var n=0;var i=0;var s=ee?new Uint16Array(32768):[];while(i<r.length){var f=Math.min(65535,r.length-i);if(f<10){n=oe(t,n,+!!(i+f==r.length));if(n&7)n+=8-(n&7);t.l=n/8|0;t._W(2,f);t._W(2,~f&65535);while(f-- >0)t[t.l++]=r[i++];n=t.l*8;continue}n=oe(t,n,+!!(i+f==r.length)+2);var c=0;while(f-- >0){var l=r[i];c=(c<<5^l)&32767;var o=-1,u=0;if(o=s[c]){o|=i&~32767;if(o>i)o-=32768;if(o<i)while(r[o+u]==r[i+u]&&u<250)++u}if(u>2){l=a[u];if(l<=22)n=he(t,n,re[l+1]>>1)-1;else{he(t,n,3);n+=5;he(t,n,re[l-23]>>5);n+=3}var h=l<8?0:l-4>>2;if(h>0){de(t,n,u-J[l]);n+=h}l=e[i-o];n=he(t,n,re[l]>>3);n-=3;var d=l<4?0:l-2>>1;if(d>0){de(t,n,i-o-q[l]);n+=d}for(var v=0;v<u;++v){s[c]=i&32767;c=(c<<5^r[i])&32767;++i}f-=u-1}else{if(l<=143)l=l+48;else n=ue(t,n,1);n=he(t,n,re[l]);s[c]=i&32767;++i}}n=he(t,n,0)-1}t.l=(n+7)/8|0;return t.l}return function s(e,r){if(e.length<8)return n(e,r);return i(e,r)}}();function Te(e){var r=ba(50+Math.floor(e.length*1.1));var t=ke(e,r);return r.slice(0,t)}var Ee=ee?new Uint16Array(32768):pe(32768);var ye=ee?new Uint16Array(32768):pe(32768);var Se=ee?new Uint16Array(128):pe(128);var _e=1,Ae=1;function xe(e,r){var t=fe(e,r)+257;r+=5;var a=fe(e,r)+1;r+=5;var n=se(e,r)+4;r+=4;var i=0;var s=ee?new Uint8Array(19):pe(19);var f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var c=1;var l=ee?new Uint8Array(8):pe(8);var o=ee?new Uint8Array(8):pe(8);var u=s.length;for(var h=0;h<n;++h){s[Z[h]]=i=ie(e,r);if(c<i)c=i;l[i]++;r+=3}var d=0;l[0]=0;for(h=1;h<=c;++h)o[h]=d=d+l[h-1]<<1;for(h=0;h<u;++h)if((d=s[h])!=0)f[h]=o[d]++;var v=0;for(h=0;h<u;++h){v=s[h];if(v!=0){d=re[f[h]]>>8-v;for(var p=(1<<7-v)-1;p>=0;--p)Se[d|p<<v]=v&7|h<<3}}var m=[];c=1;for(;m.length<t+a;){d=Se[ce(e,r)];r+=d&7;switch(d>>>=3){case 16:i=3+ne(e,r);r+=2;d=m[m.length-1];while(i-- >0)m.push(d);break;case 17:i=3+ie(e,r);r+=3;while(i-- >0)m.push(0);break;case 18:i=11+ce(e,r);r+=7;while(i-- >0)m.push(0);break;default:m.push(d);if(c<d)c=d;break;}}var b=m.slice(0,t),g=m.slice(t);for(h=t;h<286;++h)b[h]=0;for(h=a;h<30;++h)g[h]=0;_e=me(b,Ee,286);Ae=me(g,ye,30);return r}function Ce(e,r){if(e[0]==3&&!(e[1]&3)){return[S(r),2]}var t=0;var a=0;var n=_(r?r:1<<18);var i=0;var s=n.length>>>0;var f=0,c=0;while((a&1)==0){a=ie(e,t);t+=3;if(a>>>1==0){if(t&7)t+=8-(t&7);var l=e[t>>>3]|e[(t>>>3)+1]<<8;t+=32;if(l>0){if(!r&&s<i+l){n=ve(n,i+l);s=n.length}while(l-- >0){n[i++]=e[t>>>3];t+=8}}continue}else if(a>>1==1){f=9;c=5}else{t=xe(e,t);f=_e;c=Ae}for(;;){if(!r&&s<i+32767){n=ve(n,i+32767);s=n.length}var o=le(e,t,f);var u=a>>>1==1?be[o]:Ee[o];t+=u&15;u>>>=4;if((u>>>8&255)===0)n[i++]=u;else if(u==256)break;else{u-=257;var h=u<8?0:u-4>>2;if(h>5)h=0;var d=i+J[u];if(h>0){d+=le(e,t,h);t+=h}o=le(e,t,c);u=a>>>1==1?ge[o]:ye[o];t+=u&15;u>>>=4;var v=u<4?0:u-2>>1;var p=q[u];if(v>0){p+=le(e,t,v);t+=v}if(!r&&s<d){n=ve(n,d+100);s=n.length}while(i<d){n[i]=n[i-p];++i}}}}if(r)return[n,t+7>>>3];return[n.slice(0,i),t+7>>>3]}function Oe(e,r){var t=e.slice(e.l||0);var a=Ce(t,r);e.l+=a[1];return a[0]}function Re(e,r){if(e){if(typeof console!=="undefined")console.error(r)}else throw new Error(r)}function Ne(e,r){var t=e;pa(t,0);var a=[],n=[];var i={FileIndex:a,FullPaths:n};O(i,{root:r.root});var f=t.length-4;while((t[f]!=80||t[f+1]!=75||t[f+2]!=5||t[f+3]!=6)&&f>=0)--f;t.l=f+4;t.l+=4;var c=t._R(2);t.l+=6;var l=t._R(4);t.l=l;for(f=0;f<c;++f){t.l+=20;var o=t._R(4);var u=t._R(4);var h=t._R(2);var d=t._R(2);var v=t._R(2);t.l+=8;var p=t._R(4);var m=s(t.slice(t.l+h,t.l+h+d));t.l+=h+d+v;var b=t.l;t.l=p+4;Ie(t,o,u,i,m);t.l=b}return i}function Ie(e,r,t,a,n){e.l+=2;var f=e._R(2);var c=e._R(2);var l=i(e);if(f&8257)throw new Error("Unsupported ZIP encryption");var o=e._R(4);var u=e._R(4);var h=e._R(4);var d=e._R(2);var v=e._R(2);var p="";for(var m=0;m<d;++m)p+=String.fromCharCode(e[e.l++]);if(v){var b=s(e.slice(e.l,e.l+v));if((b[21589]||{}).mt)l=b[21589].mt;if(((n||{})[21589]||{}).mt)l=n[21589].mt}e.l+=v;var g=e.slice(e.l,e.l+u);switch(c){case 8:g=Y(e,h);break;case 0:break;default:throw new Error("Unsupported ZIP Compression method "+c);}var w=false;if(f&8){o=e._R(4);if(o==134695760){o=e._R(4);w=true}u=e._R(4);h=e._R(4)}if(u!=r)Re(w,"Bad compressed size: "+r+" != "+u);if(h!=t)Re(w,"Bad uncompressed size: "+t+" != "+h);Ve(a,p,g,{unsafe:true,mt:l})}function Fe(e,r){var t=r||{};var a=[],i=[];var s=ba(1);var f=t.compression?8:0,c=0;var l=false;if(l)c|=8;var o=0,u=0;var h=0,d=0;var v=e.FullPaths[0],p=v,m=e.FileIndex[0];var b=[];var g=0;for(o=1;o<e.FullPaths.length;++o){p=e.FullPaths[o].slice(v.length);m=e.FileIndex[o];if(!m.size||!m.content||p=="Sh33tJ5")continue;var w=h;var k=ba(p.length);for(u=0;u<p.length;++u)k._W(1,p.charCodeAt(u)&127);k=k.slice(0,k.l);b[d]=Je.buf(m.content,0);var T=m.content;if(f==8)T=K(T);s=ba(30);s._W(4,67324752);s._W(2,20);s._W(2,c);s._W(2,f);if(m.mt)n(s,m.mt);else s._W(4,0);s._W(-4,c&8?0:b[d]);s._W(4,c&8?0:T.length);s._W(4,c&8?0:m.content.length);s._W(2,k.length);s._W(2,0);h+=s.length;a.push(s);h+=k.length;a.push(k);h+=T.length;a.push(T);if(c&8){s=ba(12);s._W(-4,b[d]);s._W(4,T.length);s._W(4,m.content.length);h+=s.l;a.push(s)}s=ba(46);s._W(4,33639248);s._W(2,0);s._W(2,20);s._W(2,c);s._W(2,f);s._W(4,0);s._W(-4,b[d]);s._W(4,T.length);s._W(4,m.content.length);s._W(2,k.length);s._W(2,0);s._W(2,0);s._W(2,0);s._W(2,0);s._W(4,0);s._W(4,w);g+=s.l;i.push(s);g+=k.length;i.push(k);++d}s=ba(22);s._W(4,101010256);s._W(2,0);s._W(2,0);s._W(2,d);s._W(2,d);s._W(4,g);s._W(4,h);s._W(2,0);return N([N(a),N(i),s])}var De={htm:"text/html",xml:"text/xml",gif:"image/gif",jpg:"image/jpeg",png:"image/png",mso:"application/x-mso",thmx:"application/vnd.ms-officetheme",sh33tj5:"application/octet-stream"};function Pe(e,r){if(e.ctype)return e.ctype;var t=e.name||"",a=t.match(/\.([^\.]+)$/);if(a&&De[a[1]])return De[a[1]];if(r){a=(t=r).match(/[\.\\]([^\.\\])+$/);if(a&&De[a[1]])return De[a[1]]}return"application/octet-stream"}function Le(e){var r=k(e);var t=[];for(var a=0;a<r.length;a+=76)t.push(r.slice(a,a+76));return t.join("\r\n")+"\r\n"}function Me(e){var r=e.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g,function(e){var r=e.charCodeAt(0).toString(16).toUpperCase();return"="+(r.length==1?"0"+r:r)});r=r.replace(/ $/gm,"=20").replace(/\t$/gm,"=09");if(r.charAt(0)=="\n")r="=0D"+r.slice(1);r=r.replace(/\r(?!\n)/gm,"=0D").replace(/\n\n/gm,"\n=0A").replace(/([^\r\n])\n/gm,"$1=0A");var t=[],a=r.split("\r\n");for(var n=0;n<a.length;++n){var i=a[n];if(i.length==0){t.push("");continue}for(var s=0;s<i.length;){var f=76;var c=i.slice(s,s+f);if(c.charAt(f-1)=="=")f--;else if(c.charAt(f-2)=="=")f-=2;else if(c.charAt(f-3)=="=")f-=3;c=i.slice(s,s+f);s+=f;if(s<i.length)c+="=";t.push(c)}}return t.join("\r\n")}function Ue(e){var r=[];for(var t=0;t<e.length;++t){var a=e[t];while(t<=e.length&&a.charAt(a.length-1)=="=")a=a.slice(0,a.length-1)+e[++t];r.push(a)}for(var n=0;n<r.length;++n)r[n]=r[n].replace(/[=][0-9A-Fa-f]{2}/g,function(e){return String.fromCharCode(parseInt(e.slice(1),16))});return A(r.join("\r\n"))}function Be(e,r,t){var a="",n="",i="",s;var f=0;for(;f<10;++f){var c=r[f];if(!c||c.match(/^\s*$/))break;var l=c.match(/^(.*?):\s*([^\s].*)$/);if(l)switch(l[1].toLowerCase()){case"content-location":a=l[2].trim();break;case"content-type":i=l[2].trim();break;case"content-transfer-encoding":n=l[2].trim();break;}}++f;switch(n.toLowerCase()){case"base64":s=A(T(r.slice(f).join("")));break;case"quoted-printable":s=Ue(r.slice(f));break;default:throw new Error("Unsupported Content-Transfer-Encoding "+n);}var o=Ve(e,a.slice(t.length),s,{unsafe:true});if(i)o.ctype=i}function We(e,r){if(G(e.slice(0,13)).toLowerCase()!="mime-version:")throw new Error("Unsupported MAD header");var t=r&&r.root||"";var a=(E&&Buffer.isBuffer(e)?e.toString("binary"):G(e)).split("\r\n");var n=0,i="";for(n=0;n<a.length;++n){i=a[n];if(!/^Content-Location:/i.test(i))continue;i=i.slice(i.indexOf("file"));if(!t)t=i.slice(0,i.lastIndexOf("/")+1);if(i.slice(0,t.length)==t)continue;while(t.length>0){t=t.slice(0,t.length-1);t=t.slice(0,t.lastIndexOf("/")+1);if(i.slice(0,t.length)==t)break}}var s=(a[1]||"").match(/boundary="(.*?)"/);if(!s)throw new Error("MAD cannot find boundary");var f="--"+(s[1]||"");var c=[],l=[];var o={FileIndex:c,FullPaths:l};O(o);var u,h=0;for(n=0;n<a.length;++n){var d=a[n];if(d!==f&&d!==f+"--")continue;if(h++)Be(o,a.slice(u,n),t);u=n}return o}function He(e,r){var t=r||{};var a=t.boundary||"SheetJS";a="------="+a;var n=["MIME-Version: 1.0",'Content-Type: multipart/related; boundary="'+a.slice(2)+'"',"","",""];var i=e.FullPaths[0],s=i,f=e.FileIndex[0];for(var c=1;c<e.FullPaths.length;++c){s=e.FullPaths[c].slice(i.length);f=e.FileIndex[c];if(!f.size||!f.content||s=="Sh33tJ5")continue;s=s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g,function(e){return"_x"+e.charCodeAt(0).toString(16)+"_"}).replace(/[\u0080-\uFFFF]/g,function(e){return"_u"+e.charCodeAt(0).toString(16)+"_"});var l=f.content;var o=E&&Buffer.isBuffer(l)?l.toString("binary"):G(l);var u=0,h=Math.min(1024,o.length),d=0;for(var v=0;v<=h;++v)if((d=o.charCodeAt(v))>=32&&d<128)++u;var p=u>=h*4/5;n.push(a);n.push("Content-Location: "+(t.root||"file:///C:/SheetJS/")+s);n.push("Content-Transfer-Encoding: "+(p?"quoted-printable":"base64"));n.push("Content-Type: "+Pe(f,s));n.push("");n.push(p?Me(o):Le(o))}n.push(a+"--\r\n");return n.join("\r\n")}function ze(e){var r={};O(r,e);return r}function Ve(e,r,t,n){var i=n&&n.unsafe;if(!i)O(e);var s=!i&&qe.find(e,r);if(!s){var f=e.FullPaths[0];if(r.slice(0,f.length)==f)f=r;else{if(f.slice(-1)!="/")f+="/";f=(f+r).replace("//","/")}s={name:a(r),type:2};e.FileIndex.push(s);e.FullPaths.push(f);if(!i)qe.utils.cfb_gc(e)}s.content=t;s.size=t?t.length:0;if(n){if(n.CLSID)s.clsid=n.CLSID;if(n.mt)s.mt=n.mt;if(n.ct)s.ct=n.ct}return s}function Ge(e,r){O(e);var t=qe.find(e,r);if(t)for(var a=0;a<e.FileIndex.length;++a)if(e.FileIndex[a]==t){e.FileIndex.splice(a,1);e.FullPaths.splice(a,1);return true}return false}function $e(e,r,t){O(e);var n=qe.find(e,r);if(n)for(var i=0;i<e.FileIndex.length;++i)if(e.FileIndex[i]==n){e.FileIndex[i].name=a(t);e.FullPaths[i]=t;return true}return false}function je(e){I(e,true)}e.find=L;e.read=C;e.parse=l;e.write=$;e.writeFile=V;e.utils={cfb_new:ze,cfb_add:Ve,cfb_del:Ge,cfb_mov:$e,cfb_gc:je,ReadShift:la,CheckField:va,prep_blob:pa,bconcat:N,use_zlib:X,_deflateRaw:Te,_inflateRaw:Oe,consts:z};return e}();var Qe;function er(e){Qe=e}function rr(e){if(typeof e==="string")return x(e);if(Array.isArray(e))return O(e);return e}function tr(e,r,t){if(typeof Qe!=="undefined"&&Qe.writeFileSync)return t?Qe.writeFileSync(e,r,t):Qe.writeFileSync(e,r);if(typeof Deno!=="undefined"){if(t&&typeof r=="string")switch(t){case"utf8":r=new TextEncoder(t).encode(r);break;case"binary":r=x(r);break;default:throw new Error("Unsupported encoding "+t);}return Deno.writeFileSync(e,r)}var a=t=="utf8"?pt(r):r;if(typeof IE_SaveFile!=="undefined")return IE_SaveFile(a,e);if(typeof Blob!=="undefined"){var n=new Blob([rr(a)],{type:"application/octet-stream"});if(typeof navigator!=="undefined"&&navigator.msSaveBlob)return navigator.msSaveBlob(n,e);if(typeof saveAs!=="undefined")return saveAs(n,e);if(typeof URL!=="undefined"&&typeof document!=="undefined"&&document.createElement&&URL.createObjectURL){var i=URL.createObjectURL(n);if(typeof chrome==="object"&&typeof(chrome.downloads||{}).download=="function"){if(URL.revokeObjectURL&&typeof setTimeout!=="undefined")setTimeout(function(){URL.revokeObjectURL(i)},6e4);return chrome.downloads.download({url:i,filename:e,saveAs:true})}var s=document.createElement("a");if(s.download!=null){s.download=e;s.href=i;document.body.appendChild(s);s.click();document.body.removeChild(s);if(URL.revokeObjectURL&&typeof setTimeout!=="undefined")setTimeout(function(){URL.revokeObjectURL(i)},6e4);return i}}}if(typeof $!=="undefined"&&typeof File!=="undefined"&&typeof Folder!=="undefined")try{var f=File(e);f.open("w");f.encoding="binary";if(Array.isArray(r))r=C(r);f.write(r);f.close();return r}catch(c){if(!c.message||!c.message.match(/onstruct/))throw c}throw new Error("cannot save file "+e)}function ar(e){if(typeof Qe!=="undefined")return Qe.readFileSync(e);if(typeof Deno!=="undefined")return Deno.readFileSync(e);if(typeof $!=="undefined"&&typeof File!=="undefined"&&typeof Folder!=="undefined")try{var r=File(e);r.open("r");r.encoding="binary";var t=r.read();r.close();return t}catch(a){if(!a.message||!a.message.match(/onstruct/))throw a}throw new Error("Cannot access file "+e)}function nr(e){var r=Object.keys(e),t=[];for(var a=0;a<r.length;++a)if(Object.prototype.hasOwnProperty.call(e,r[a]))t.push(r[a]);return t}function ir(e,r){var t=[],a=nr(e);for(var n=0;n!==a.length;++n)if(t[e[a[n]][r]]==null)t[e[a[n]][r]]=a[n];return t}function sr(e){var r=[],t=nr(e);for(var a=0;a!==t.length;++a)r[e[t[a]]]=t[a];return r}function fr(e){var r=[],t=nr(e);for(var a=0;a!==t.length;++a)r[e[t[a]]]=parseInt(t[a],10);return r}function cr(e){var r=[],t=nr(e);for(var a=0;a!==t.length;++a){if(r[e[t[a]]]==null)r[e[t[a]]]=[];r[e[t[a]]].push(t[a])}return r}var lr=new Date(1899,11,30,0,0,0);function or(e,r){var t=e.getTime();if(r)t-=1462*24*60*60*1e3;var a=lr.getTime()+(e.getTimezoneOffset()-lr.getTimezoneOffset())*6e4;return(t-a)/(24*60*60*1e3)}var ur=new Date;var hr=lr.getTime()+(ur.getTimezoneOffset()-lr.getTimezoneOffset())*6e4;var dr=ur.getTimezoneOffset();function vr(e){var r=new Date;r.setTime(e*24*60*60*1e3+hr);if(r.getTimezoneOffset()!==dr){r.setTime(r.getTime()+(r.getTimezoneOffset()-dr)*6e4)}return r}function pr(e){var r=0,t=0,a=false;var n=e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);if(!n)throw new Error("|"+e+"| is not an ISO8601 Duration");for(var i=1;i!=n.length;++i){if(!n[i])continue;t=1;if(i>3)a=true;switch(n[i].slice(n[i].length-1)){case"Y":throw new Error("Unsupported ISO Duration Field: "+n[i].slice(n[i].length-1));case"D":t*=24;case"H":t*=60;case"M":if(!a)throw new Error("Unsupported ISO Duration Field: M");else t*=60;case"S":break;}r+=t*parseInt(n[i],10)}return r}var mr=new Date("2017-02-19T19:06:09.000Z");var br=isNaN(mr.getFullYear())?new Date("2/19/17"):mr;var gr=br.getFullYear()==2017;function wr(e,r){var t=new Date(e);if(gr){if(r>0)t.setTime(t.getTime()+t.getTimezoneOffset()*60*1e3);else if(r<0)t.setTime(t.getTime()-t.getTimezoneOffset()*60*1e3);return t}if(e instanceof Date)return e;if(br.getFullYear()==1917&&!isNaN(t.getFullYear())){
var a=t.getFullYear();if(e.indexOf(""+a)>-1)return t;t.setFullYear(t.getFullYear()+100);return t}var n=e.match(/\d+/g)||["2017","2","19","0","0","0"];var i=new Date(+n[0],+n[1]-1,+n[2],+n[3]||0,+n[4]||0,+n[5]||0);if(e.indexOf("Z")>-1)i=new Date(i.getTime()-i.getTimezoneOffset()*60*1e3);return i}function kr(e,r){if(E&&Buffer.isBuffer(e)){if(r){if(e[0]==255&&e[1]==254)return pt(e.slice(2).toString("utf16le"));if(e[1]==254&&e[2]==255)return pt(h(e.slice(2).toString("binary")))}return e.toString("binary")}if(typeof TextDecoder!=="undefined")try{if(r){if(e[0]==255&&e[1]==254)return pt(new TextDecoder("utf-16le").decode(e.slice(2)));if(e[0]==254&&e[1]==255)return pt(new TextDecoder("utf-16be").decode(e.slice(2)))}var t={"€":"","‚":"","ƒ":"","„":"","…":"","†":"","‡":"","ˆ":"","‰":"","Š":"","‹":"","Œ":"","Ž":"","‘":"","’":"","“":"","”":"","•":"","–":"","—":"","˜":"","™":"","š":"","›":"","œ":"","ž":"","Ÿ":""};if(Array.isArray(e))e=new Uint8Array(e);return new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g,function(e){return t[e]||e})}catch(a){}var n=[];for(var i=0;i!=e.length;++i)n.push(String.fromCharCode(e[i]));return n.join("")}function Tr(e){if(typeof JSON!="undefined"&&!Array.isArray(e))return JSON.parse(JSON.stringify(e));if(typeof e!="object"||e==null)return e;if(e instanceof Date)return new Date(e.getTime());var r={};for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))r[t]=Tr(e[t]);return r}function Er(e,r){var t="";while(t.length<r)t+=e;return t}function yr(e){var r=Number(e);if(!isNaN(r))return isFinite(r)?r:NaN;if(!/\d/.test(e))return r;var t=1;var a=e.replace(/([\d]),([\d])/g,"$1$2").replace(/[$]/g,"").replace(/[%]/g,function(){t*=100;return""});if(!isNaN(r=Number(a)))return r/t;a=a.replace(/[(](.*)[)]/,function(e,r){t=-t;return r});if(!isNaN(r=Number(a)))return r/t;return r}var Sr=/^(0?\d|1[0-2])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))([ap])m?/;function _r(e){if(!e[2])return new Date(1900,0,0,+e[1]%12+(e[7]=="p"?12:0),0,0,0);if(e[3]){if(e[4])return new Date(1900,0,0,+e[1]%12+(e[7]=="p"?12:0),+e[2],+e[4],parseFloat(e[3])*1e3);else return new Date(1900,0,0,e[7]=="p"?12:0,+e[1],+e[2],parseFloat(e[3])*1e3)}else if(e[5])return new Date(1900,0,0,+e[1]%12+(e[7]=="p"?12:0),+e[2],+e[5],e[6]?parseFloat(e[6])*1e3:0);else return new Date(1900,0,0,+e[1]%12+(e[7]=="p"?12:0),+e[2],0,0)}var Ar=["january","february","march","april","may","june","july","august","september","october","november","december"];function xr(e){var r=e.toLowerCase();var t=r.replace(/\s+/g,"");var a=t.match(Sr);if(a)return _r(a);var n=new Date(e),i=new Date(NaN);var s=n.getYear(),f=n.getMonth(),c=n.getDate();if(isNaN(c))return i;if(r.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)){r=r.replace(/[^a-z]/g,"").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/,"");if(r.length>3&&Ar.indexOf(r)==-1)return i}else if(r.replace(/[ap]m?/,"").match(/[a-z]/))return i;if(s<0||s>8099)return i;if((f>0||c>1)&&s!=101)return n;if(e.match(/[^-0-9:,\/\\]/))return i;return n}var Cr=function(){var e="abacaba".split(/(:?b)/i).length==5;return function r(t,a,n){if(e||typeof a=="string")return t.split(a);var i=t.split(a),s=[i[0]];for(var f=1;f<i.length;++f){s.push(n);s.push(i[f])}return s}}();function Or(e){if(!e)return null;if(e.content&&e.type)return kr(e.content,true);if(e.data)return d(e.data);if(e.asNodeBuffer&&E)return d(e.asNodeBuffer().toString("binary"));if(e.asBinary)return d(e.asBinary());if(e._data&&e._data.getContent)return d(kr(Array.prototype.slice.call(e._data.getContent(),0)));return null}function Rr(e){if(!e)return null;if(e.data)return o(e.data);if(e.asNodeBuffer&&E)return e.asNodeBuffer();if(e._data&&e._data.getContent){var r=e._data.getContent();if(typeof r=="string")return o(r);return Array.prototype.slice.call(r)}if(e.content&&e.type)return e.content;return null}function Nr(e){return e&&e.name.slice(-4)===".bin"?Rr(e):Or(e)}function Ir(e,r){var t=e.FullPaths||nr(e.files);var a=r.toLowerCase().replace(/[\/]/g,"\\"),n=a.replace(/\\/g,"/");for(var i=0;i<t.length;++i){var s=t[i].replace(/^Root Entry[\/]/,"").toLowerCase();if(a==s||n==s)return e.files?e.files[t[i]]:e.FileIndex[i]}return null}function Fr(e,r){var t=Ir(e,r);if(t==null)throw new Error("Cannot find file "+r+" in zip");return t}function Dr(e,r,t){if(!t)return Nr(Fr(e,r));if(!r)return null;try{return Dr(e,r)}catch(a){return null}}function Pr(e,r,t){if(!t)return Or(Fr(e,r));if(!r)return null;try{return Pr(e,r)}catch(a){return null}}function Lr(e,r,t){if(!t)return Rr(Fr(e,r));if(!r)return null;try{return Lr(e,r)}catch(a){return null}}function Mr(e){var r=e.FullPaths||nr(e.files),t=[];for(var a=0;a<r.length;++a)if(r[a].slice(-1)!="/")t.push(r[a].replace(/^Root Entry[\/]/,""));return t.sort()}function Ur(e,r,t){if(e.FullPaths){if(typeof t=="string"){var a;if(E)a=y(t);else a=I(t);return qe.utils.cfb_add(e,r,a)}qe.utils.cfb_add(e,r,t)}else e.file(r,t)}function Br(){return qe.utils.cfb_new()}function Wr(e,r){switch(r.type){case"base64":return qe.read(e,{type:"base64"});case"binary":return qe.read(e,{type:"binary"});case"buffer":;case"array":return qe.read(e,{type:"buffer"});}throw new Error("Unrecognized type "+r.type)}function Hr(e,r){if(e.charAt(0)=="/")return e.slice(1);var t=r.split("/");if(r.slice(-1)!="/")t.pop();var a=e.split("/");while(a.length!==0){var n=a.shift();if(n==="..")t.pop();else if(n!==".")t.push(n)}return t.join("/")}var zr='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';var Vr=/([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;var Gr=/<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/gm,$r=/<[^>]*>/g;var jr=zr.match(Gr)?Gr:$r;var Xr=/<\w*:/,Yr=/<(\/?)\w+:/;function Kr(e,r,t){var a={};var n=0,i=0;for(;n!==e.length;++n)if((i=e.charCodeAt(n))===32||i===10||i===13)break;if(!r)a[0]=e.slice(0,n);if(n===e.length)return a;var s=e.match(Vr),f=0,c="",l=0,o="",u="",h=1;if(s)for(l=0;l!=s.length;++l){u=s[l];for(i=0;i!=u.length;++i)if(u.charCodeAt(i)===61)break;o=u.slice(0,i).trim();while(u.charCodeAt(i+1)==32)++i;h=(n=u.charCodeAt(i+1))==34||n==39?1:0;c=u.slice(i+1+h,u.length-h);for(f=0;f!=o.length;++f)if(o.charCodeAt(f)===58)break;if(f===o.length){if(o.indexOf("_")>0)o=o.slice(0,o.indexOf("_"));a[o]=c;if(!t)a[o.toLowerCase()]=c}else{var d=(f===5&&o.slice(0,5)==="xmlns"?"xmlns":"")+o.slice(f+1);if(a[d]&&o.slice(f-3,f)=="ext")continue;a[d]=c;if(!t)a[d.toLowerCase()]=c}}return a}function Zr(e){return e.replace(Yr,"<$1")}var Jr={"&quot;":'"',"&apos;":"'","&gt;":">","&lt;":"<","&amp;":"&"};var qr=sr(Jr);var Qr=function(){var e=/&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,r=/_x([\da-fA-F]{4})_/gi;function t(a){var n=a+"",i=n.indexOf("<![CDATA[");if(i==-1)return n.replace(e,function(e,r){return Jr[e]||String.fromCharCode(parseInt(r,e.indexOf("x")>-1?16:10))||e}).replace(r,function(e,r){return String.fromCharCode(parseInt(r,16))});var s=n.indexOf("]]>");return t(n.slice(0,i))+n.slice(i+9,s)+t(n.slice(s+3))}return function a(e,r){var a=t(e);return r?a.replace(/\r\n/g,"\n"):a}}();var et=/[&<>'"]/g,rt=/[\u0000-\u0008\u000b-\u001f\uFFFE-\uFFFF]/g;function tt(e){var r=e+"";return r.replace(et,function(e){return qr[e]}).replace(rt,function(e){return"_x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+"_"})}function at(e){return tt(e).replace(/ /g,"_x0020_")}var nt=/[\u0000-\u001f]/g;function it(e){var r=e+"";return r.replace(et,function(e){return qr[e]}).replace(/\n/g,"<br/>").replace(nt,function(e){return"&#x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+";"})}function st(e){var r=e+"";return r.replace(et,function(e){return qr[e]}).replace(nt,function(e){return"&#x"+e.charCodeAt(0).toString(16).toUpperCase()+";"})}var ft=function(){var e=/&#(\d+);/g;function r(e,r){return String.fromCharCode(parseInt(r,10))}return function t(a){return a.replace(e,r)}}();function ct(e){return e.replace(/(\r\n|[\r\n])/g,"&#10;")}function lt(e){switch(e){case 1:;case true:;case"1":;case"true":return true;case 0:;case false:;case"0":;case"false":return false;}return false}function ot(e){var r="",t=0,a=0,n=0,i=0,s=0,f=0;while(t<e.length){a=e.charCodeAt(t++);if(a<128){r+=String.fromCharCode(a);continue}n=e.charCodeAt(t++);if(a>191&&a<224){s=(a&31)<<6;s|=n&63;r+=String.fromCharCode(s);continue}i=e.charCodeAt(t++);if(a<240){r+=String.fromCharCode((a&15)<<12|(n&63)<<6|i&63);continue}s=e.charCodeAt(t++);f=((a&7)<<18|(n&63)<<12|(i&63)<<6|s&63)-65536;r+=String.fromCharCode(55296+(f>>>10&1023));r+=String.fromCharCode(56320+(f&1023))}return r}function ut(e){var r=S(2*e.length),t,a,n=1,i=0,s=0,f;for(a=0;a<e.length;a+=n){n=1;if((f=e.charCodeAt(a))<128)t=f;else if(f<224){t=(f&31)*64+(e.charCodeAt(a+1)&63);n=2}else if(f<240){t=(f&15)*4096+(e.charCodeAt(a+1)&63)*64+(e.charCodeAt(a+2)&63);n=3}else{n=4;t=(f&7)*262144+(e.charCodeAt(a+1)&63)*4096+(e.charCodeAt(a+2)&63)*64+(e.charCodeAt(a+3)&63);t-=65536;s=55296+(t>>>10&1023);t=56320+(t&1023)}if(s!==0){r[i++]=s&255;r[i++]=s>>>8;s=0}r[i++]=t%256;r[i++]=t>>>8}return r.slice(0,i).toString("ucs2")}function ht(e){return y(e,"binary").toString("utf8")}var dt="foo bar bazâð£";var vt=E&&(ht(dt)==ot(dt)&&ht||ut(dt)==ot(dt)&&ut)||ot;var pt=E?function(e){return y(e,"utf8").toString("binary")}:function(e){var r=[],t=0,a=0,n=0;while(t<e.length){a=e.charCodeAt(t++);switch(true){case a<128:r.push(String.fromCharCode(a));break;case a<2048:r.push(String.fromCharCode(192+(a>>6)));r.push(String.fromCharCode(128+(a&63)));break;case a>=55296&&a<57344:a-=55296;n=e.charCodeAt(t++)-56320+(a<<10);r.push(String.fromCharCode(240+(n>>18&7)));r.push(String.fromCharCode(144+(n>>12&63)));r.push(String.fromCharCode(128+(n>>6&63)));r.push(String.fromCharCode(128+(n&63)));break;default:r.push(String.fromCharCode(224+(a>>12)));r.push(String.fromCharCode(128+(a>>6&63)));r.push(String.fromCharCode(128+(a&63)));}}return r.join("")};var mt=function(){var e={};return function r(t,a){var n=t+"|"+(a||"");if(e[n])return e[n];return e[n]=new RegExp("<(?:\\w+:)?"+t+'(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?'+t+">",a||"")}}();var bt=function(){var e=[["nbsp"," "],["middot","·"],["quot",'"'],["apos","'"],["gt",">"],["lt","<"],["amp","&"]].map(function(e){return[new RegExp("&"+e[0]+";","ig"),e[1]]});return function r(t){var a=t.replace(/^[\t\n\r ]+/,"").replace(/[\t\n\r ]+$/,"").replace(/>\s+/g,">").replace(/\s+</g,"<").replace(/[\t\n\r ]+/g," ").replace(/<\s*[bB][rR]\s*\/?>/g,"\n").replace(/<[^>]*>/g,"");for(var n=0;n<e.length;++n)a=a.replace(e[n][0],e[n][1]);return a}}();var gt=function(){var e={};return function r(t){if(e[t]!==undefined)return e[t];return e[t]=new RegExp("<(?:vt:)?"+t+">([\\s\\S]*?)</(?:vt:)?"+t+">","g")}}();var wt=/<\/?(?:vt:)?variant>/g,kt=/<(?:vt:)([^>]*)>([\s\S]*)</;function Tt(e,r){var t=Kr(e);var a=e.match(gt(t.baseType))||[];var n=[];if(a.length!=t.size){if(r.WTF)throw new Error("unexpected vector length "+a.length+" != "+t.size);return n}a.forEach(function(e){var r=e.replace(wt,"").match(kt);if(r)n.push({v:vt(r[2]),t:r[1]})});return n}var Et=/(^\s|\s$|\n)/;function yt(e,r){return"<"+e+(r.match(Et)?' xml:space="preserve"':"")+">"+r+"</"+e+">"}function St(e){return nr(e).map(function(r){return" "+r+'="'+e[r]+'"'}).join("")}function _t(e,r,t){return"<"+e+(t!=null?St(t):"")+(r!=null?(r.match(Et)?' xml:space="preserve"':"")+">"+r+"</"+e:"/")+">"}function At(e,r){try{return e.toISOString().replace(/\.\d*/,"")}catch(t){if(r)throw t}return""}function xt(e,r){switch(typeof e){case"string":var t=_t("vt:lpwstr",tt(e));if(r)t=t.replace(/&quot;/g,"_x0022_");return t;case"number":return _t((e|0)==e?"vt:i4":"vt:r8",tt(String(e)));case"boolean":return _t("vt:bool",e?"true":"false");}if(e instanceof Date)return _t("vt:filetime",At(e));throw new Error("Unable to serialize "+e)}function Ct(e){if(E&&Buffer.isBuffer(e))return e.toString("utf8");if(typeof e==="string")return e;if(typeof Uint8Array!=="undefined"&&e instanceof Uint8Array)return vt(C(R(e)));throw new Error("Bad input format: expected Buffer or string")}var Ot=/<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm;var Rt={CORE_PROPS:"http://schemas.openxmlformats.org/package/2006/metadata/core-properties",CUST_PROPS:"http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",EXT_PROPS:"http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",CT:"http://schemas.openxmlformats.org/package/2006/content-types",RELS:"http://schemas.openxmlformats.org/package/2006/relationships",TCMNT:"http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",dc:"http://purl.org/dc/elements/1.1/",dcterms:"http://purl.org/dc/terms/",dcmitype:"http://purl.org/dc/dcmitype/",mx:"http://schemas.microsoft.com/office/mac/excel/2008/main",r:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",sjs:"http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",vt:"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",xsd:"http://www.w3.org/2001/XMLSchema"};var Nt=["http://schemas.openxmlformats.org/spreadsheetml/2006/main","http://purl.oclc.org/ooxml/spreadsheetml/main","http://schemas.microsoft.com/office/excel/2006/main","http://schemas.microsoft.com/office/excel/2006/2"];var It={o:"urn:schemas-microsoft-com:office:office",x:"urn:schemas-microsoft-com:office:excel",ss:"urn:schemas-microsoft-com:office:spreadsheet",dt:"uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",mv:"http://macVmlSchemaUri",v:"urn:schemas-microsoft-com:vml",html:"http://www.w3.org/TR/REC-html40"};function Ft(e,r){var t=1-2*(e[r+7]>>>7);var a=((e[r+7]&127)<<4)+(e[r+6]>>>4&15);var n=e[r+6]&15;for(var i=5;i>=0;--i)n=n*256+e[r+i];if(a==2047)return n==0?t*Infinity:NaN;if(a==0)a=-1022;else{a-=1023;n+=Math.pow(2,52)}return t*Math.pow(2,a-52)*n}function Dt(e,r,t){var a=(r<0||1/r==-Infinity?1:0)<<7,n=0,i=0;var s=a?-r:r;if(!isFinite(s)){n=2047;i=isNaN(r)?26985:0}else if(s==0)n=i=0;else{n=Math.floor(Math.log(s)/Math.LN2);i=s*Math.pow(2,52-n);if(n<=-1023&&(!isFinite(i)||i<Math.pow(2,52))){n=-1022}else{i-=Math.pow(2,52);n+=1023}}for(var f=0;f<=5;++f,i/=256)e[t+f]=i&255;e[t+6]=(n&15)<<4|i&15;e[t+7]=n>>4|a}var Pt=function(e){var r=[],t=10240;for(var a=0;a<e[0].length;++a)if(e[0][a])for(var n=0,i=e[0][a].length;n<i;n+=t)r.push.apply(r,e[0][a].slice(n,n+t));return r};var Lt=E?function(e){return e[0].length>0&&Buffer.isBuffer(e[0][0])?Buffer.concat(e[0].map(function(e){return Buffer.isBuffer(e)?e:y(e)})):Pt(e)}:Pt;var Mt=function(e,r,t){var a=[];for(var n=r;n<t;n+=2)a.push(String.fromCharCode(na(e,n)));return a.join("").replace(F,"")};var Ut=E?function(e,r,t){if(!Buffer.isBuffer(e))return Mt(e,r,t);return e.toString("utf16le",r,t).replace(F,"")}:Mt;var Bt=function(e,r,t){var a=[];for(var n=r;n<r+t;++n)a.push(("0"+e[n].toString(16)).slice(-2));return a.join("")};var Wt=E?function(e,r,t){return Buffer.isBuffer(e)?e.toString("hex",r,r+t):Bt(e,r,t)}:Bt;var Ht=function(e,r,t){var a=[];for(var n=r;n<t;n++)a.push(String.fromCharCode(aa(e,n)));return a.join("")};var zt=E?function mk(e,r,t){return Buffer.isBuffer(e)?e.toString("utf8",r,t):Ht(e,r,t)}:Ht;var Vt=function(e,r){var t=sa(e,r);return t>0?zt(e,r+4,r+4+t-1):""};var Gt=Vt;var $t=function(e,r){var t=sa(e,r);return t>0?zt(e,r+4,r+4+t-1):""};var jt=$t;var Xt=function(e,r){var t=2*sa(e,r);return t>0?zt(e,r+4,r+4+t-1):""};var Yt=Xt;var Kt=function bk(e,r){var t=sa(e,r);return t>0?Ut(e,r+4,r+4+t):""};var Zt=Kt;var Jt=function(e,r){var t=sa(e,r);return t>0?zt(e,r+4,r+4+t):""};var qt=Jt;var Qt=function(e,r){return Ft(e,r)};var ea=Qt;var ra=function gk(e){return Array.isArray(e)||typeof Uint8Array!=="undefined"&&e instanceof Uint8Array};if(E){Gt=function wk(e,r){if(!Buffer.isBuffer(e))return Vt(e,r);var t=e.readUInt32LE(r);return t>0?e.toString("utf8",r+4,r+4+t-1):""};jt=function kk(e,r){if(!Buffer.isBuffer(e))return $t(e,r);var t=e.readUInt32LE(r);return t>0?e.toString("utf8",r+4,r+4+t-1):""};Yt=function Tk(e,r){if(!Buffer.isBuffer(e))return Xt(e,r);var t=2*e.readUInt32LE(r);return e.toString("utf16le",r+4,r+4+t-1)};Zt=function Ek(e,r){if(!Buffer.isBuffer(e))return Kt(e,r);var t=e.readUInt32LE(r);return e.toString("utf16le",r+4,r+4+t)};qt=function yk(e,r){if(!Buffer.isBuffer(e))return Jt(e,r);var t=e.readUInt32LE(r);return e.toString("utf8",r+4,r+4+t)};ea=function Sk(e,r){if(Buffer.isBuffer(e))return e.readDoubleLE(r);return Qt(e,r)};ra=function _k(e){return Buffer.isBuffer(e)||Array.isArray(e)||typeof Uint8Array!=="undefined"&&e instanceof Uint8Array}}function ta(){Ut=function(e,r,t){return a.utils.decode(1200,e.slice(r,t)).replace(F,"")};zt=function(e,r,t){return a.utils.decode(65001,e.slice(r,t))};Gt=function(e,r){var n=sa(e,r);return n>0?a.utils.decode(t,e.slice(r+4,r+4+n-1)):""};jt=function(e,t){var n=sa(e,t);return n>0?a.utils.decode(r,e.slice(t+4,t+4+n-1)):""};Yt=function(e,r){var t=2*sa(e,r);return t>0?a.utils.decode(1200,e.slice(r+4,r+4+t-1)):""};Zt=function(e,r){var t=sa(e,r);return t>0?a.utils.decode(1200,e.slice(r+4,r+4+t)):""};qt=function(e,r){var t=sa(e,r);return t>0?a.utils.decode(65001,e.slice(r+4,r+4+t)):""}}if(typeof a!=="undefined")ta();var aa=function(e,r){return e[r]};var na=function(e,r){return e[r+1]*(1<<8)+e[r]};var ia=function(e,r){var t=e[r+1]*(1<<8)+e[r];return t<32768?t:(65535-t+1)*-1};var sa=function(e,r){return e[r+3]*(1<<24)+(e[r+2]<<16)+(e[r+1]<<8)+e[r]};var fa=function(e,r){return e[r+3]<<24|e[r+2]<<16|e[r+1]<<8|e[r]};var ca=function(e,r){return e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3]};function la(e,t){var n="",i,s,f=[],c,l,o,u;switch(t){case"dbcs":u=this.l;if(E&&Buffer.isBuffer(this))n=this.slice(this.l,this.l+2*e).toString("utf16le");else for(o=0;o<e;++o){n+=String.fromCharCode(na(this,u));u+=2}e*=2;break;case"utf8":n=zt(this,this.l,this.l+e);break;case"utf16le":e*=2;n=Ut(this,this.l,this.l+e);break;case"wstr":if(typeof a!=="undefined")n=a.utils.decode(r,this.slice(this.l,this.l+2*e));else return la.call(this,e,"dbcs");e=2*e;break;case"lpstr-ansi":n=Gt(this,this.l);e=4+sa(this,this.l);break;case"lpstr-cp":n=jt(this,this.l);e=4+sa(this,this.l);break;case"lpwstr":n=Yt(this,this.l);e=4+2*sa(this,this.l);break;case"lpp4":e=4+sa(this,this.l);n=Zt(this,this.l);if(e&2)e+=2;break;case"8lpp4":e=4+sa(this,this.l);n=qt(this,this.l);if(e&3)e+=4-(e&3);break;case"cstr":e=0;n="";while((c=aa(this,this.l+e++))!==0)f.push(v(c));n=f.join("");break;case"_wstr":e=0;n="";while((c=na(this,this.l+e))!==0){f.push(v(c));e+=2}e+=2;n=f.join("");break;case"dbcs-cont":n="";u=this.l;for(o=0;o<e;++o){if(this.lens&&this.lens.indexOf(u)!==-1){c=aa(this,u);this.l=u+1;l=la.call(this,e-o,c?"dbcs-cont":"sbcs-cont");return f.join("")+l}f.push(v(na(this,u)));u+=2}n=f.join("");e*=2;break;case"cpstr":if(typeof a!=="undefined"){n=a.utils.decode(r,this.slice(this.l,this.l+e));break};case"sbcs-cont":n="";u=this.l;for(o=0;o!=e;++o){if(this.lens&&this.lens.indexOf(u)!==-1){c=aa(this,u);this.l=u+1;l=la.call(this,e-o,c?"dbcs-cont":"sbcs-cont");return f.join("")+l}f.push(v(aa(this,u)));u+=1}n=f.join("");break;default:switch(e){case 1:i=aa(this,this.l);this.l++;return i;case 2:i=(t==="i"?ia:na)(this,this.l);this.l+=2;return i;case 4:;case-4:if(t==="i"||(this[this.l+3]&128)===0){i=(e>0?fa:ca)(this,this.l);this.l+=4;return i}else{s=sa(this,this.l);this.l+=4}return s;case 8:;case-8:if(t==="f"){if(e==8)s=ea(this,this.l);else s=ea([this[this.l+7],this[this.l+6],this[this.l+5],this[this.l+4],this[this.l+3],this[this.l+2],this[this.l+1],this[this.l+0]],0);this.l+=8;return s}else e=8;case 16:n=Wt(this,this.l,e);break;};}this.l+=e;return n}var oa=function(e,r,t){e[t]=r&255;e[t+1]=r>>>8&255;e[t+2]=r>>>16&255;e[t+3]=r>>>24&255};var ua=function(e,r,t){e[t]=r&255;e[t+1]=r>>8&255;e[t+2]=r>>16&255;e[t+3]=r>>24&255};var ha=function(e,r,t){e[t]=r&255;e[t+1]=r>>>8&255};function da(e,r,n){var i=0,s=0;if(n==="dbcs"){for(s=0;s!=r.length;++s)ha(this,r.charCodeAt(s),this.l+2*s);i=2*r.length}else if(n==="sbcs"){if(typeof a!=="undefined"&&t==874){for(s=0;s!=r.length;++s){var f=a.utils.encode(t,r.charAt(s));this[this.l+s]=f[0]}}else{r=r.replace(/[^\x00-\x7F]/g,"_");for(s=0;s!=r.length;++s)this[this.l+s]=r.charCodeAt(s)&255}i=r.length}else if(n==="hex"){for(;s<e;++s){this[this.l++]=parseInt(r.slice(2*s,2*s+2),16)||0}return this}else if(n==="utf16le"){var c=Math.min(this.l+e,this.length);for(s=0;s<Math.min(r.length,e);++s){var l=r.charCodeAt(s);this[this.l++]=l&255;this[this.l++]=l>>8}while(this.l<c)this[this.l++]=0;return this}else switch(e){case 1:i=1;this[this.l]=r&255;break;case 2:i=2;this[this.l]=r&255;r>>>=8;this[this.l+1]=r&255;break;case 3:i=3;this[this.l]=r&255;r>>>=8;this[this.l+1]=r&255;r>>>=8;this[this.l+2]=r&255;break;case 4:i=4;oa(this,r,this.l);break;case 8:i=8;if(n==="f"){Dt(this,r,this.l);break};case 16:break;case-4:i=4;ua(this,r,this.l);break;}this.l+=i;return this}function va(e,r){var t=Wt(this,this.l,e.length>>1);if(t!==e)throw new Error(r+"Expected "+e+" saw "+t);this.l+=e.length>>1}function pa(e,r){e.l=r;e._R=la;e.chk=va;e._W=da}function ma(e,r){e.l+=r}function ba(e){var r=S(e);pa(r,0);return r}function ga(e,r,t){if(!e)return;var a,n,i;pa(e,e.l||0);var s=e.length,f=0,c=0;while(e.l<s){f=e._R(1);if(f&128)f=(f&127)+((e._R(1)&127)<<7);var l=Cb[f]||Cb[65535];a=e._R(1);i=a&127;for(n=1;n<4&&a&128;++n)i+=((a=e._R(1))&127)<<7*n;c=e.l+i;var o=l.f&&l.f(e,i,t);e.l=c;if(r(o,l,f))return}}function wa(){var e=[],r=E?256:2048;var t=function c(e){var r=ba(e);pa(r,0);return r};var a=t(r);var n=function l(){if(!a)return;if(a.length>a.l){a=a.slice(0,a.l);a.l=a.length}if(a.length>0)e.push(a);a=null};var i=function o(e){if(a&&e<a.length-a.l)return a;n();return a=t(Math.max(e+1,r))};var s=function u(){n();return N(e)};var f=function h(e){n();a=e;if(a.l==null)a.l=a.length;i(r)};return{next:i,push:f,end:s,_bufs:e}}function ka(e,r,t,a){var n=+r,i;if(isNaN(n))return;if(!a)a=Cb[n].p||(t||[]).length||0;i=1+(n>=128?1:0)+1;if(a>=128)++i;if(a>=16384)++i;if(a>=2097152)++i;var s=e.next(i);if(n<=127)s._W(1,n);else{s._W(1,(n&127)+128);s._W(1,n>>7)}for(var f=0;f!=4;++f){if(a>=128){s._W(1,(a&127)+128);a>>=7}else{s._W(1,a);break}}if(a>0&&ra(t))e.push(t)}function Ta(e,r,t){var a=Tr(e);if(r.s){if(a.cRel)a.c+=r.s.c;if(a.rRel)a.r+=r.s.r}else{if(a.cRel)a.c+=r.c;if(a.rRel)a.r+=r.r}if(!t||t.biff<12){while(a.c>=256)a.c-=256;while(a.r>=65536)a.r-=65536}return a}function Ea(e,r,t){var a=Tr(e);a.s=Ta(a.s,r.s,t);a.e=Ta(a.e,r.s,t);return a}function ya(e,r){if(e.cRel&&e.c<0){e=Tr(e);while(e.c<0)e.c+=r>8?16384:256}if(e.rRel&&e.r<0){e=Tr(e);while(e.r<0)e.r+=r>8?1048576:r>5?65536:16384}var t=Pa(e);if(!e.cRel&&e.cRel!=null)t=Na(t);if(!e.rRel&&e.rRel!=null)t=xa(t);return t}function Sa(e,r){if(e.s.r==0&&!e.s.rRel){if(e.e.r==(r.biff>=12?1048575:r.biff>=8?65536:16384)&&!e.e.rRel){return(e.s.cRel?"":"$")+Ra(e.s.c)+":"+(e.e.cRel?"":"$")+Ra(e.e.c)}}if(e.s.c==0&&!e.s.cRel){if(e.e.c==(r.biff>=12?16383:255)&&!e.e.cRel){return(e.s.rRel?"":"$")+Aa(e.s.r)+":"+(e.e.rRel?"":"$")+Aa(e.e.r)}}return ya(e.s,r.biff)+":"+ya(e.e,r.biff)}if(typeof cptable!=="undefined")m(cptable);else if(typeof module!=="undefined"&&typeof require!=="undefined"){m(undefined)}function _a(e){return parseInt(Ca(e),10)-1}function Aa(e){return""+(e+1)}function xa(e){return e.replace(/([A-Z]|^)(\d+)$/,"$1$$$2")}function Ca(e){return e.replace(/\$(\d+)$/,"$1")}function Oa(e){var r=Ia(e),t=0,a=0;for(;a!==r.length;++a)t=26*t+r.charCodeAt(a)-64;return t-1}function Ra(e){if(e<0)throw new Error("invalid column "+e);var r="";for(++e;e;e=Math.floor((e-1)/26))r=String.fromCharCode((e-1)%26+65)+r;return r}function Na(e){return e.replace(/^([A-Z])/,"$$$1")}function Ia(e){return e.replace(/^\$([A-Z])/,"$1")}function Fa(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,"$1,$2").split(",")}function Da(e){var r=0,t=0;for(var a=0;a<e.length;++a){var n=e.charCodeAt(a);if(n>=48&&n<=57)r=10*r+(n-48);else if(n>=65&&n<=90)t=26*t+(n-64)}return{c:t-1,r:r-1}}function Pa(e){var r=e.c+1;var t="";for(;r;r=(r-1)/26|0)t=String.fromCharCode((r-1)%26+65)+t;return t+(e.r+1)}function La(e){var r=e.indexOf(":");if(r==-1)return{s:Da(e),e:Da(e)};return{s:Da(e.slice(0,r)),e:Da(e.slice(r+1))}}function Ma(e,r){if(typeof r==="undefined"||typeof r==="number"){return Ma(e.s,e.e)}if(typeof e!=="string")e=Pa(e);if(typeof r!=="string")r=Pa(r);return e==r?e:e+":"+r}function Ua(e){var r=La(e);return"$"+Ra(r.s.c)+"$"+Aa(r.s.r)+":$"+Ra(r.e.c)+"$"+Aa(r.e.r)}function Ba(e,r){if(!e&&!(r&&r.biff<=5&&r.biff>=2))throw new Error("empty sheet name");if(/[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e))return"'"+e.replace(/'/g,"''")+"'";return e}function Wa(e){var r={s:{c:0,r:0},e:{c:0,r:0}};var t=0,a=0,n=0;var i=e.length;for(t=0;a<i;++a){if((n=e.charCodeAt(a)-64)<1||n>26)break;t=26*t+n}r.s.c=--t;for(t=0;a<i;++a){if((n=e.charCodeAt(a)-48)<0||n>9)break;t=10*t+n}r.s.r=--t;if(a===i||n!=10){r.e.c=r.s.c;r.e.r=r.s.r;return r}++a;for(t=0;a!=i;++a){if((n=e.charCodeAt(a)-64)<1||n>26)break;t=26*t+n}r.e.c=--t;for(t=0;a!=i;++a){if((n=e.charCodeAt(a)-48)<0||n>9)break;t=10*t+n}r.e.r=--t;return r}function Ha(e,r){var t=e.t=="d"&&r instanceof Date;if(e.z!=null)try{return e.w=We(e.z,t?or(r):r)}catch(a){}try{return e.w=We((e.XF||{}).numFmtId||(t?14:0),t?or(r):r)}catch(a){return""+r}}function za(e,r,t){if(e==null||e.t==null||e.t=="z")return"";if(e.w!==undefined)return e.w;if(e.t=="d"&&!e.z&&t&&t.dateNF)e.z=t.dateNF;if(e.t=="e")return Kn[e.v]||e.v;if(r==undefined)return Ha(e,e.v);return Ha(e,r)}function Va(e,r){var t=r&&r.sheet?r.sheet:"Sheet1";var a={};a[t]=e;return{SheetNames:[t],Sheets:a}}function Ga(e,r,t){var a=t||{};var n=e?Array.isArray(e):a.dense;if(b!=null&&n==null)n=b;var i=e||(n?[]:{});var s=0,f=0;if(i&&a.origin!=null){if(typeof a.origin=="number")s=a.origin;else{var c=typeof a.origin=="string"?Da(a.origin):a.origin;s=c.r;f=c.c}if(!i["!ref"])i["!ref"]="A1:A1"}var l={s:{c:1e7,r:1e7},e:{c:0,r:0}};if(i["!ref"]){var o=Wa(i["!ref"]);l.s.c=o.s.c;l.s.r=o.s.r;l.e.c=Math.max(l.e.c,o.e.c);l.e.r=Math.max(l.e.r,o.e.r);if(s==-1)l.e.r=s=o.e.r+1}for(var u=0;u!=r.length;++u){if(!r[u])continue;if(!Array.isArray(r[u]))throw new Error("aoa_to_sheet expects an array of arrays");for(var h=0;h!=r[u].length;++h){if(typeof r[u][h]==="undefined")continue;var d={v:r[u][h]};var v=s+u,p=f+h;if(l.s.r>v)l.s.r=v;if(l.s.c>p)l.s.c=p;if(l.e.r<v)l.e.r=v;if(l.e.c<p)l.e.c=p;if(r[u][h]&&typeof r[u][h]==="object"&&!Array.isArray(r[u][h])&&!(r[u][h]instanceof Date))d=r[u][h];else{if(Array.isArray(d.v)){d.f=r[u][h][1];d.v=d.v[0]}if(d.v===null){if(d.f)d.t="n";else if(a.nullError){d.t="e";d.v=0}else if(!a.sheetStubs)continue;else d.t="z"}else if(typeof d.v==="number")d.t="n";else if(typeof d.v==="boolean")d.t="b";else if(d.v instanceof Date){d.z=a.dateNF||Y[14];if(a.cellDates){d.t="d";d.w=We(d.z,or(d.v,a.date1904))}else{d.t="n";d.v=or(d.v,a.date1904);d.w=We(d.z,d.v)}}else d.t="s"}if(n){if(!i[v])i[v]=[];if(i[v][p]&&i[v][p].z)d.z=i[v][p].z;i[v][p]=d}else{var m=Pa({c:p,r:v});if(i[m]&&i[m].z)d.z=i[m].z;i[m]=d}}}if(l.s.c<1e7)i["!ref"]=Ma(l);return i}function $a(e,r){return Ga(null,e,r)}function ja(e){return e._R(4,"i")}function Xa(e,r){if(!r)r=ba(4);r._W(4,e);return r}function Ya(e){var r=e._R(4);return r===0?"":e._R(r,"dbcs")}function Ka(e,r){var t=false;if(r==null){t=true;r=ba(4+2*e.length)}r._W(4,e.length);if(e.length>0)r._W(0,e,"dbcs");return t?r.slice(0,r.l):r}function Za(e){return{ich:e._R(2),ifnt:e._R(2)}}function Ja(e,r){if(!r)r=ba(4);r._W(2,e.ich||0);r._W(2,e.ifnt||0);return r}function qa(e,r){var t=e.l;var a=e._R(1);var n=Ya(e);var i=[];var s={t:n,h:n};if((a&1)!==0){var f=e._R(4);for(var c=0;c!=f;++c)i.push(Za(e));s.r=i}else s.r=[{ich:0,ifnt:0}];e.l=t+r;return s}function Qa(e,r){var t=false;if(r==null){t=true;r=ba(15+4*e.t.length)}r._W(1,0);Ka(e.t,r);return t?r.slice(0,r.l):r}var en=qa;function rn(e,r){var t=false;if(r==null){t=true;r=ba(23+4*e.t.length)}r._W(1,1);Ka(e.t,r);r._W(4,1);Ja({ich:0,ifnt:0},r);return t?r.slice(0,r.l):r}function tn(e){var r=e._R(4);var t=e._R(2);t+=e._R(1)<<16;e.l++;return{c:r,iStyleRef:t}}function an(e,r){if(r==null)r=ba(8);r._W(-4,e.c);r._W(3,e.iStyleRef||e.s);r._W(1,0);return r}function nn(e){var r=e._R(2);r+=e._R(1)<<16;e.l++;return{c:-1,iStyleRef:r}}function sn(e,r){if(r==null)r=ba(4);r._W(3,e.iStyleRef||e.s);r._W(1,0);return r}var fn=Ya;var cn=Ka;function ln(e){var r=e._R(4);return r===0||r===4294967295?"":e._R(r,"dbcs")}function on(e,r){var t=false;if(r==null){t=true;r=ba(127)}r._W(4,e.length>0?e.length:4294967295);if(e.length>0)r._W(0,e,"dbcs");return t?r.slice(0,r.l):r}var un=Ya;var hn=ln;var dn=on;function vn(e){var r=e.slice(e.l,e.l+4);var t=r[0]&1,a=r[0]&2;e.l+=4;var n=a===0?ea([0,0,0,0,r[0]&252,r[1],r[2],r[3]],0):fa(r,0)>>2;return t?n/100:n}function pn(e,r){if(r==null)r=ba(4);var t=0,a=0,n=e*100;if(e==(e|0)&&e>=-(1<<29)&&e<1<<29){a=1}else if(n==(n|0)&&n>=-(1<<29)&&n<1<<29){a=1;t=1}if(a)r._W(-4,((t?n:e)<<2)+(t+2));else throw new Error("unsupported RkNumber "+e)}function mn(e){var r={s:{},e:{}};r.s.r=e._R(4);r.e.r=e._R(4);r.s.c=e._R(4);r.e.c=e._R(4);return r}function bn(e,r){if(!r)r=ba(16);r._W(4,e.s.r);r._W(4,e.e.r);r._W(4,e.s.c);r._W(4,e.e.c);return r}var gn=mn;var wn=bn;function kn(e){if(e.length-e.l<8)throw"XLS Xnum Buffer underflow";return e._R(8,"f")}function Tn(e,r){return(r||ba(8))._W(8,e,"f")}function En(e){var r={};var t=e._R(1);var a=t>>>1;var n=e._R(1);var i=e._R(2,"i");var s=e._R(1);var f=e._R(1);var c=e._R(1);e.l++;switch(a){case 0:r.auto=1;break;case 1:r.index=n;var l=Yn[n];if(l)r.rgb=El(l);break;case 2:r.rgb=El([s,f,c]);break;case 3:r.theme=n;break;}if(i!=0)r.tint=i>0?i/32767:i/32768;return r}function yn(e,r){if(!r)r=ba(8);if(!e||e.auto){r._W(4,0);r._W(4,0);return r}if(e.index!=null){r._W(1,2);r._W(1,e.index)}else if(e.theme!=null){r._W(1,6);r._W(1,e.theme)}else{r._W(1,5);r._W(1,0)}var t=e.tint||0;if(t>0)t*=32767;else if(t<0)t*=32768;r._W(2,t);if(!e.rgb||e.theme!=null){r._W(2,0);r._W(1,0);r._W(1,0)}else{var a=e.rgb||"FFFFFF";if(typeof a=="number")a=("000000"+a.toString(16)).slice(-6);r._W(1,parseInt(a.slice(0,2),16));r._W(1,parseInt(a.slice(2,4),16));r._W(1,parseInt(a.slice(4,6),16));r._W(1,255)}return r}function Sn(e){var r=e._R(1);e.l++;var t={fBold:r&1,fItalic:r&2,fUnderline:r&4,fStrikeout:r&8,fOutline:r&16,fShadow:r&32,fCondense:r&64,fExtend:r&128};return t}function _n(e,r){if(!r)r=ba(2);var t=(e.italic?2:0)|(e.strike?8:0)|(e.outline?16:0)|(e.shadow?32:0)|(e.condense?64:0)|(e.extend?128:0);r._W(1,t);r._W(1,0);return r}function An(e,r){var t={2:"BITMAP",3:"METAFILEPICT",8:"DIB",14:"ENHMETAFILE"};var a=e._R(4);switch(a){case 0:return"";case 4294967295:;case 4294967294:return t[e._R(4)]||"";}if(a>400)throw new Error("Unsupported Clipboard: "+a.toString(16));e.l-=4;return e._R(0,r==1?"lpstr":"lpwstr")}function xn(e){return An(e,1)}function Cn(e){return An(e,2)}var On=2;var Rn=3;var Nn=11;var In=12;var Fn=19;var Dn=64;var Pn=65;var Ln=71;var Mn=4108;var Un=4126;var Bn=80;var Wn=81;var Hn=[Bn,Wn];var zn={1:{n:"CodePage",t:On},2:{n:"Category",t:Bn},3:{n:"PresentationFormat",t:Bn},4:{n:"ByteCount",t:Rn},5:{n:"LineCount",t:Rn},6:{n:"ParagraphCount",t:Rn},7:{n:"SlideCount",t:Rn},8:{n:"NoteCount",t:Rn},9:{n:"HiddenCount",t:Rn},10:{n:"MultimediaClipCount",t:Rn},11:{n:"ScaleCrop",t:Nn},12:{n:"HeadingPairs",t:Mn},13:{n:"TitlesOfParts",t:Un},14:{n:"Manager",t:Bn},15:{n:"Company",t:Bn},16:{n:"LinksUpToDate",t:Nn},17:{n:"CharacterCount",t:Rn},19:{n:"SharedDoc",t:Nn},22:{n:"HyperlinksChanged",t:Nn},23:{n:"AppVersion",t:Rn,p:"version"},24:{n:"DigSig",t:Pn},26:{n:"ContentType",t:Bn},27:{n:"ContentStatus",t:Bn},
28:{n:"Language",t:Bn},29:{n:"Version",t:Bn},255:{},2147483648:{n:"Locale",t:Fn},2147483651:{n:"Behavior",t:Fn},1919054434:{}};var Vn={1:{n:"CodePage",t:On},2:{n:"Title",t:Bn},3:{n:"Subject",t:Bn},4:{n:"Author",t:Bn},5:{n:"Keywords",t:Bn},6:{n:"Comments",t:Bn},7:{n:"Template",t:Bn},8:{n:"LastAuthor",t:Bn},9:{n:"RevNumber",t:Bn},10:{n:"EditTime",t:Dn},11:{n:"LastPrinted",t:Dn},12:{n:"CreatedDate",t:Dn},13:{n:"ModifiedDate",t:Dn},14:{n:"PageCount",t:Rn},15:{n:"WordCount",t:Rn},16:{n:"CharCount",t:Rn},17:{n:"Thumbnail",t:Ln},18:{n:"Application",t:Bn},19:{n:"DocSecurity",t:Rn},255:{},2147483648:{n:"Locale",t:Fn},2147483651:{n:"Behavior",t:Fn},1919054434:{}};var Gn={1:"US",2:"CA",3:"",7:"RU",20:"EG",30:"GR",31:"NL",32:"BE",33:"FR",34:"ES",36:"HU",39:"IT",41:"CH",43:"AT",44:"GB",45:"DK",46:"SE",47:"NO",48:"PL",49:"DE",52:"MX",55:"BR",61:"AU",64:"NZ",66:"TH",81:"JP",82:"KR",84:"VN",86:"CN",90:"TR",105:"JS",213:"DZ",216:"MA",218:"LY",351:"PT",354:"IS",358:"FI",420:"CZ",886:"TW",961:"LB",962:"JO",963:"SY",964:"IQ",965:"KW",966:"SA",971:"AE",972:"IL",974:"QA",981:"IR",65535:"US"};var $n=[null,"solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];function jn(e){return e.map(function(e){return[e>>16&255,e>>8&255,e&255]})}var Xn=jn([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,0,16777215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);var Yn=Tr(Xn);var Kn={0:"#NULL!",7:"#DIV/0!",15:"#VALUE!",23:"#REF!",29:"#NAME?",36:"#NUM!",42:"#N/A",43:"#GETTING_DATA",255:"#WTF?"};var Zn={"#NULL!":0,"#DIV/0!":7,"#VALUE!":15,"#REF!":23,"#NAME?":29,"#NUM!":36,"#N/A":42,"#GETTING_DATA":43,"#WTF?":255};var Jn=["_xlnm.Consolidate_Area","_xlnm.Auto_Open","_xlnm.Auto_Close","_xlnm.Extract","_xlnm.Database","_xlnm.Criteria","_xlnm.Print_Area","_xlnm.Print_Titles","_xlnm.Recorder","_xlnm.Data_Form","_xlnm.Auto_Activate","_xlnm.Auto_Deactivate","_xlnm.Sheet_Title","_xlnm._FilterDatabase"];var qn={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":"workbooks","application/vnd.ms-excel.sheet.macroEnabled.main+xml":"workbooks","application/vnd.ms-excel.sheet.binary.macroEnabled.main":"workbooks","application/vnd.ms-excel.addin.macroEnabled.main+xml":"workbooks","application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":"workbooks","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":"sheets","application/vnd.ms-excel.worksheet":"sheets","application/vnd.ms-excel.binIndexWs":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":"charts","application/vnd.ms-excel.chartsheet":"charts","application/vnd.ms-excel.macrosheet+xml":"macros","application/vnd.ms-excel.macrosheet":"macros","application/vnd.ms-excel.intlmacrosheet":"TODO","application/vnd.ms-excel.binIndexMs":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":"dialogs","application/vnd.ms-excel.dialogsheet":"dialogs","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml":"strs","application/vnd.ms-excel.sharedStrings":"strs","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":"styles","application/vnd.ms-excel.styles":"styles","application/vnd.openxmlformats-package.core-properties+xml":"coreprops","application/vnd.openxmlformats-officedocument.custom-properties+xml":"custprops","application/vnd.openxmlformats-officedocument.extended-properties+xml":"extprops","application/vnd.openxmlformats-officedocument.customXmlProperties+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":"comments","application/vnd.ms-excel.comments":"comments","application/vnd.ms-excel.threadedcomments+xml":"threadedcomments","application/vnd.ms-excel.person+xml":"people","application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":"metadata","application/vnd.ms-excel.sheetMetadata":"metadata","application/vnd.ms-excel.pivotTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.chart+xml":"TODO","application/vnd.ms-office.chartcolorstyle+xml":"TODO","application/vnd.ms-office.chartstyle+xml":"TODO","application/vnd.ms-office.chartex+xml":"TODO","application/vnd.ms-excel.calcChain":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":"TODO","application/vnd.ms-office.activeX":"TODO","application/vnd.ms-office.activeX+xml":"TODO","application/vnd.ms-excel.attachedToolbars":"TODO","application/vnd.ms-excel.connections":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":"TODO","application/vnd.ms-excel.externalLink":"links","application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":"links","application/vnd.ms-excel.pivotCacheDefinition":"TODO","application/vnd.ms-excel.pivotCacheRecords":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":"TODO","application/vnd.ms-excel.queryTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":"TODO","application/vnd.ms-excel.userNames":"TODO","application/vnd.ms-excel.revisionHeaders":"TODO","application/vnd.ms-excel.revisionLog":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":"TODO","application/vnd.ms-excel.tableSingleCells":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":"TODO","application/vnd.ms-excel.slicer":"TODO","application/vnd.ms-excel.slicerCache":"TODO","application/vnd.ms-excel.slicer+xml":"TODO","application/vnd.ms-excel.slicerCache+xml":"TODO","application/vnd.ms-excel.wsSortMap":"TODO","application/vnd.ms-excel.table":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":"TODO","application/vnd.openxmlformats-officedocument.theme+xml":"themes","application/vnd.openxmlformats-officedocument.themeOverride+xml":"TODO","application/vnd.ms-excel.Timeline+xml":"TODO","application/vnd.ms-excel.TimelineCache+xml":"TODO","application/vnd.ms-office.vbaProject":"vba","application/vnd.ms-office.vbaProjectSignature":"TODO","application/vnd.ms-office.volatileDependencies":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":"TODO","application/vnd.ms-excel.controlproperties+xml":"TODO","application/vnd.openxmlformats-officedocument.model+data":"TODO","application/vnd.ms-excel.Survey+xml":"TODO","application/vnd.openxmlformats-officedocument.drawing+xml":"drawings","application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":"TODO","application/vnd.openxmlformats-officedocument.vmlDrawing":"TODO","application/vnd.openxmlformats-package.relationships+xml":"rels","application/vnd.openxmlformats-officedocument.oleObject":"TODO","image/png":"TODO",sheet:"js"};var Qn={workbooks:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",xlsm:"application/vnd.ms-excel.sheet.macroEnabled.main+xml",xlsb:"application/vnd.ms-excel.sheet.binary.macroEnabled.main",xlam:"application/vnd.ms-excel.addin.macroEnabled.main+xml",xltx:"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"},strs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",xlsb:"application/vnd.ms-excel.sharedStrings"},comments:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",xlsb:"application/vnd.ms-excel.comments"},sheets:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",xlsb:"application/vnd.ms-excel.worksheet"},charts:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",xlsb:"application/vnd.ms-excel.chartsheet"},dialogs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",xlsb:"application/vnd.ms-excel.dialogsheet"},macros:{xlsx:"application/vnd.ms-excel.macrosheet+xml",xlsb:"application/vnd.ms-excel.macrosheet"},metadata:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",xlsb:"application/vnd.ms-excel.sheetMetadata"},styles:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",xlsb:"application/vnd.ms-excel.styles"}};function ei(){return{workbooks:[],sheets:[],charts:[],dialogs:[],macros:[],rels:[],strs:[],comments:[],threadedcomments:[],links:[],coreprops:[],extprops:[],custprops:[],themes:[],styles:[],calcchains:[],vba:[],drawings:[],metadata:[],people:[],TODO:[],xmlns:""}}function ri(e){var r=ei();if(!e||!e.match)return r;var t={};(e.match(jr)||[]).forEach(function(e){var a=Kr(e);switch(a[0].replace(Xr,"<")){case"<?xml":break;case"<Types":r.xmlns=a["xmlns"+(a[0].match(/<(\w+):/)||["",""])[1]];break;case"<Default":t[a.Extension.toLowerCase()]=a.ContentType;break;case"<Override":if(r[qn[a.ContentType]]!==undefined)r[qn[a.ContentType]].push(a.PartName);break;}});if(r.xmlns!==Rt.CT)throw new Error("Unknown Namespace: "+r.xmlns);r.calcchain=r.calcchains.length>0?r.calcchains[0]:"";r.sst=r.strs.length>0?r.strs[0]:"";r.style=r.styles.length>0?r.styles[0]:"";r.defaults=t;delete r.calcchains;return r}function ti(e,r,t){var a=cr(qn);var n=[],i;if(!t){n[n.length]=zr;n[n.length]=_t("Types",null,{xmlns:Rt.CT,"xmlns:xsd":Rt.xsd,"xmlns:xsi":Rt.xsi});n=n.concat([["xml","application/xml"],["bin","application/vnd.ms-excel.sheet.binary.macroEnabled.main"],["vml","application/vnd.openxmlformats-officedocument.vmlDrawing"],["data","application/vnd.openxmlformats-officedocument.model+data"],["bmp","image/bmp"],["png","image/png"],["gif","image/gif"],["emf","image/x-emf"],["wmf","image/x-wmf"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["tif","image/tiff"],["tiff","image/tiff"],["pdf","application/pdf"],["rels","application/vnd.openxmlformats-package.relationships+xml"]].map(function(e){return _t("Default",null,{Extension:e[0],ContentType:e[1]})}))}var s=function(t){if(e[t]&&e[t].length>0){i=e[t][0];n[n.length]=_t("Override",null,{PartName:(i[0]=="/"?"":"/")+i,ContentType:Qn[t][r.bookType]||Qn[t]["xlsx"]})}};var f=function(t){(e[t]||[]).forEach(function(e){n[n.length]=_t("Override",null,{PartName:(e[0]=="/"?"":"/")+e,ContentType:Qn[t][r.bookType]||Qn[t]["xlsx"]})})};var c=function(r){(e[r]||[]).forEach(function(e){n[n.length]=_t("Override",null,{PartName:(e[0]=="/"?"":"/")+e,ContentType:a[r][0]})})};s("workbooks");f("sheets");f("charts");c("themes");["strs","styles"].forEach(s);["coreprops","extprops","custprops"].forEach(c);c("vba");c("comments");c("threadedcomments");c("drawings");f("metadata");c("people");if(!t&&n.length>2){n[n.length]="</Types>";n[1]=n[1].replace("/>",">")}return n.join("")}var ai={WB:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",SHEET:"http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",HLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",VML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",XPATH:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",XMISS:"http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",XLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",CXML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",CXMLP:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",CMNT:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",CORE_PROPS:"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",EXT_PROPS:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",CUST_PROPS:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",SST:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",STY:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",THEME:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",CHART:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",CHARTEX:"http://schemas.microsoft.com/office/2014/relationships/chartEx",CS:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",WS:["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet","http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"],DS:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",MS:"http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",IMG:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",DRAW:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",XLMETA:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",TCMNT:"http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",PEOPLE:"http://schemas.microsoft.com/office/2017/10/relationships/person",CONN:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections",VBA:"http://schemas.microsoft.com/office/2006/relationships/vbaProject"};function ni(e){var r=e.lastIndexOf("/");return e.slice(0,r+1)+"_rels/"+e.slice(r+1)+".rels"}function ii(e,r){var t={"!id":{}};if(!e)return t;if(r.charAt(0)!=="/"){r="/"+r}var a={};(e.match(jr)||[]).forEach(function(e){var n=Kr(e);if(n[0]==="<Relationship"){var i={};i.Type=n.Type;i.Target=n.Target;i.Id=n.Id;if(n.TargetMode)i.TargetMode=n.TargetMode;var s=n.TargetMode==="External"?n.Target:Hr(n.Target,r);t[s]=i;a[n.Id]=i}});t["!id"]=a;return t}function si(e){var r=[zr,_t("Relationships",null,{xmlns:Rt.RELS})];nr(e["!id"]).forEach(function(t){r[r.length]=_t("Relationship",null,e["!id"][t])});if(r.length>2){r[r.length]="</Relationships>";r[1]=r[1].replace("/>",">")}return r.join("")}function fi(e,r,t,a,n,i){if(!n)n={};if(!e["!id"])e["!id"]={};if(!e["!idx"])e["!idx"]=1;if(r<0)for(r=e["!idx"];e["!id"]["rId"+r];++r){}e["!idx"]=r+1;n.Id="rId"+r;n.Type=a;n.Target=t;if(i)n.TargetMode=i;else if([ai.HLINK,ai.XPATH,ai.XMISS].indexOf(n.Type)>-1)n.TargetMode="External";if(e["!id"][n.Id])throw new Error("Cannot rewrite rId "+r);e["!id"][n.Id]=n;e[("/"+n.Target).replace("//","/")]=n;return r}var ci="application/vnd.oasis.opendocument.spreadsheet";function li(e,r){var t=Ct(e);var a;var n;while(a=Ot.exec(t))switch(a[3]){case"manifest":break;case"file-entry":n=Kr(a[0],false);if(n.path=="/"&&n.type!==ci)throw new Error("This OpenDocument is not a spreadsheet");break;case"encryption-data":;case"algorithm":;case"start-key-generation":;case"key-derivation":throw new Error("Unsupported ODS Encryption");default:if(r&&r.WTF)throw a;}}function oi(e){var r=[zr];r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');r.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');for(var t=0;t<e.length;++t)r.push('  <manifest:file-entry manifest:full-path="'+e[t][0]+'" manifest:media-type="'+e[t][1]+'"/>\n');r.push("</manifest:manifest>");return r.join("")}function ui(e,r,t){return['  <rdf:Description rdf:about="'+e+'">\n','    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/'+(t||"odf")+"#"+r+'"/>\n',"  </rdf:Description>\n"].join("")}function hi(e,r){return['  <rdf:Description rdf:about="'+e+'">\n','    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="'+r+'"/>\n',"  </rdf:Description>\n"].join("")}function di(e){var r=[zr];r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');for(var t=0;t!=e.length;++t){r.push(ui(e[t][0],e[t][1]));r.push(hi("",e[t][0]))}r.push(ui("","Document","pkg"));r.push("</rdf:RDF>");return r.join("")}function vi(){return'<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet'+"JS "+e.version+"</meta:generator></office:meta></office:document-meta>"}var pi=[["cp:category","Category"],["cp:contentStatus","ContentStatus"],["cp:keywords","Keywords"],["cp:lastModifiedBy","LastAuthor"],["cp:lastPrinted","LastPrinted"],["cp:revision","RevNumber"],["cp:version","Version"],["dc:creator","Author"],["dc:description","Comments"],["dc:identifier","Identifier"],["dc:language","Language"],["dc:subject","Subject"],["dc:title","Title"],["dcterms:created","CreatedDate","date"],["dcterms:modified","ModifiedDate","date"]];var mi=function(){var e=new Array(pi.length);for(var r=0;r<pi.length;++r){var t=pi[r];var a="(?:"+t[0].slice(0,t[0].indexOf(":"))+":)"+t[0].slice(t[0].indexOf(":")+1);e[r]=new RegExp("<"+a+"[^>]*>([\\s\\S]*?)</"+a+">")}return e}();function bi(e){var r={};e=vt(e);for(var t=0;t<pi.length;++t){var a=pi[t],n=e.match(mi[t]);if(n!=null&&n.length>0)r[a[1]]=Qr(n[1]);if(a[2]==="date"&&r[a[1]])r[a[1]]=wr(r[a[1]])}return r}function gi(e,r,t,a,n){if(n[e]!=null||r==null||r==="")return;n[e]=r;r=tt(r);a[a.length]=t?_t(e,r,t):yt(e,r)}function wi(e,r){var t=r||{};var a=[zr,_t("cp:coreProperties",null,{"xmlns:cp":Rt.CORE_PROPS,"xmlns:dc":Rt.dc,"xmlns:dcterms":Rt.dcterms,"xmlns:dcmitype":Rt.dcmitype,"xmlns:xsi":Rt.xsi})],n={};if(!e&&!t.Props)return a.join("");if(e){if(e.CreatedDate!=null)gi("dcterms:created",typeof e.CreatedDate==="string"?e.CreatedDate:At(e.CreatedDate,t.WTF),{"xsi:type":"dcterms:W3CDTF"},a,n);if(e.ModifiedDate!=null)gi("dcterms:modified",typeof e.ModifiedDate==="string"?e.ModifiedDate:At(e.ModifiedDate,t.WTF),{"xsi:type":"dcterms:W3CDTF"},a,n)}for(var i=0;i!=pi.length;++i){var s=pi[i];var f=t.Props&&t.Props[s[1]]!=null?t.Props[s[1]]:e?e[s[1]]:null;if(f===true)f="1";else if(f===false)f="0";else if(typeof f=="number")f=String(f);if(f!=null)gi(s[0],f,null,a,n)}if(a.length>2){a[a.length]="</cp:coreProperties>";a[1]=a[1].replace("/>",">")}return a.join("")}var ki=[["Application","Application","string"],["AppVersion","AppVersion","string"],["Company","Company","string"],["DocSecurity","DocSecurity","string"],["Manager","Manager","string"],["HyperlinksChanged","HyperlinksChanged","bool"],["SharedDoc","SharedDoc","bool"],["LinksUpToDate","LinksUpToDate","bool"],["ScaleCrop","ScaleCrop","bool"],["HeadingPairs","HeadingPairs","raw"],["TitlesOfParts","TitlesOfParts","raw"]];var Ti=["Worksheets","SheetNames","NamedRanges","DefinedNames","Chartsheets","ChartNames"];function Ei(e,r,t,a){var n=[];if(typeof e=="string")n=Tt(e,a);else for(var i=0;i<e.length;++i)n=n.concat(e[i].map(function(e){return{v:e}}));var s=typeof r=="string"?Tt(r,a).map(function(e){return e.v}):r;var f=0,c=0;if(s.length>0)for(var l=0;l!==n.length;l+=2){c=+n[l+1].v;switch(n[l].v){case"Worksheets":;case"工作表":;case"Листы":;case"أوراق العمل":;case"ワークシート":;case"גליונות עבודה":;case"Arbeitsblätter":;case"Çalışma Sayfaları":;case"Feuilles de calcul":;case"Fogli di lavoro":;case"Folhas de cálculo":;case"Planilhas":;case"Regneark":;case"Hojas de cálculo":;case"Werkbladen":t.Worksheets=c;t.SheetNames=s.slice(f,f+c);break;case"Named Ranges":;case"Rangos con nombre":;case"名前付き一覧":;case"Benannte Bereiche":;case"Navngivne områder":t.NamedRanges=c;t.DefinedNames=s.slice(f,f+c);break;case"Charts":;case"Diagramme":t.Chartsheets=c;t.ChartNames=s.slice(f,f+c);break;}f+=c}}function yi(e,r,t){var a={};if(!r)r={};e=vt(e);ki.forEach(function(t){var n=(e.match(mt(t[0]))||[])[1];switch(t[2]){case"string":if(n)r[t[1]]=Qr(n);break;case"bool":r[t[1]]=n==="true";break;case"raw":var i=e.match(new RegExp("<"+t[0]+"[^>]*>([\\s\\S]*?)</"+t[0]+">"));if(i&&i.length>0)a[t[1]]=i[1];break;}});if(a.HeadingPairs&&a.TitlesOfParts)Ei(a.HeadingPairs,a.TitlesOfParts,r,t);return r}function Si(e){var r=[],t=_t;if(!e)e={};e.Application="SheetJS";r[r.length]=zr;r[r.length]=_t("Properties",null,{xmlns:Rt.EXT_PROPS,"xmlns:vt":Rt.vt});ki.forEach(function(a){if(e[a[1]]===undefined)return;var n;switch(a[2]){case"string":n=tt(String(e[a[1]]));break;case"bool":n=e[a[1]]?"true":"false";break;}if(n!==undefined)r[r.length]=t(a[0],n)});r[r.length]=t("HeadingPairs",t("vt:vector",t("vt:variant","<vt:lpstr>Worksheets</vt:lpstr>")+t("vt:variant",t("vt:i4",String(e.Worksheets))),{size:2,baseType:"variant"}));r[r.length]=t("TitlesOfParts",t("vt:vector",e.SheetNames.map(function(e){return"<vt:lpstr>"+tt(e)+"</vt:lpstr>"}).join(""),{size:e.Worksheets,baseType:"lpstr"}));if(r.length>2){r[r.length]="</Properties>";r[1]=r[1].replace("/>",">")}return r.join("")}var _i=/<[^>]+>[^<]*/g;function Ai(e,r){var t={},a="";var n=e.match(_i);if(n)for(var i=0;i!=n.length;++i){var s=n[i],f=Kr(s);switch(f[0]){case"<?xml":break;case"<Properties":break;case"<property":a=Qr(f.name);break;case"</property>":a=null;break;default:if(s.indexOf("<vt:")===0){var c=s.split(">");var l=c[0].slice(4),o=c[1];switch(l){case"lpstr":;case"bstr":;case"lpwstr":t[a]=Qr(o);break;case"bool":t[a]=lt(o);break;case"i1":;case"i2":;case"i4":;case"i8":;case"int":;case"uint":t[a]=parseInt(o,10);break;case"r4":;case"r8":;case"decimal":t[a]=parseFloat(o);break;case"filetime":;case"date":t[a]=wr(o);break;case"cy":;case"error":t[a]=Qr(o);break;default:if(l.slice(-1)=="/")break;if(r.WTF&&typeof console!=="undefined")console.warn("Unexpected",s,l,c);}}else if(s.slice(0,2)==="</"){}else if(r.WTF)throw new Error(s);}}return t}function xi(e){var r=[zr,_t("Properties",null,{xmlns:Rt.CUST_PROPS,"xmlns:vt":Rt.vt})];if(!e)return r.join("");var t=1;nr(e).forEach(function a(n){++t;r[r.length]=_t("property",xt(e[n],true),{fmtid:"{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",pid:t,name:tt(n)})});if(r.length>2){r[r.length]="</Properties>";r[1]=r[1].replace("/>",">")}return r.join("")}var Ci={Title:"Title",Subject:"Subject",Author:"Author",Keywords:"Keywords",Comments:"Description",LastAuthor:"LastAuthor",RevNumber:"Revision",Application:"AppName",LastPrinted:"LastPrinted",CreatedDate:"Created",ModifiedDate:"LastSaved",Category:"Category",Manager:"Manager",Company:"Company",AppVersion:"Version",ContentStatus:"ContentStatus",Identifier:"Identifier",Language:"Language"};var Oi;function Ri(e,r,t){if(!Oi)Oi=sr(Ci);r=Oi[r]||r;e[r]=t}function Ni(e,r){var t=[];nr(Ci).map(function(e){for(var r=0;r<pi.length;++r)if(pi[r][1]==e)return pi[r];for(r=0;r<ki.length;++r)if(ki[r][1]==e)return ki[r];throw e}).forEach(function(a){if(e[a[1]]==null)return;var n=r&&r.Props&&r.Props[a[1]]!=null?r.Props[a[1]]:e[a[1]];switch(a[2]){case"date":n=new Date(n).toISOString().replace(/\.\d*Z/,"Z");break;}if(typeof n=="number")n=String(n);else if(n===true||n===false){n=n?"1":"0"}else if(n instanceof Date)n=new Date(n).toISOString().replace(/\.\d*Z/,"");t.push(yt(Ci[a[1]]||a[1],n))});return _t("DocumentProperties",t.join(""),{xmlns:It.o})}function Ii(e,r){var t=["Worksheets","SheetNames"];var a="CustomDocumentProperties";var n=[];if(e)nr(e).forEach(function(r){if(!Object.prototype.hasOwnProperty.call(e,r))return;for(var a=0;a<pi.length;++a)if(r==pi[a][1])return;for(a=0;a<ki.length;++a)if(r==ki[a][1])return;for(a=0;a<t.length;++a)if(r==t[a])return;var i=e[r];var s="string";if(typeof i=="number"){s="float";i=String(i)}else if(i===true||i===false){s="boolean";i=i?"1":"0"}else i=String(i);n.push(_t(at(r),i,{"dt:dt":s}))});if(r)nr(r).forEach(function(t){if(!Object.prototype.hasOwnProperty.call(r,t))return;if(e&&Object.prototype.hasOwnProperty.call(e,t))return;var a=r[t];var i="string";if(typeof a=="number"){i="float";a=String(a)}else if(a===true||a===false){i="boolean";a=a?"1":"0"}else if(a instanceof Date){i="dateTime.tz";a=a.toISOString()}else a=String(a);n.push(_t(at(t),a,{"dt:dt":i}))});return"<"+a+' xmlns="'+It.o+'">'+n.join("")+"</"+a+">"}function Fi(e){var r=e._R(4),t=e._R(4);return new Date((t/1e7*Math.pow(2,32)+r/1e7-11644473600)*1e3).toISOString().replace(/\.000/,"")}function Di(e){var r=typeof e=="string"?new Date(Date.parse(e)):e;var t=r.getTime()/1e3+11644473600;var a=t%Math.pow(2,32),n=(t-a)/Math.pow(2,32);a*=1e7;n*=1e7;var i=a/Math.pow(2,32)|0;if(i>0){a=a%Math.pow(2,32);n+=i}var s=ba(8);s._W(4,a);s._W(4,n);return s}function Pi(e,r,t){var a=e.l;var n=e._R(0,"lpstr-cp");if(t)while(e.l-a&3)++e.l;return n}function Li(e,r,t){var a=e._R(0,"lpwstr");if(t)e.l+=4-(a.length+1&3)&3;return a}function Mi(e,r,t){if(r===31)return Li(e);return Pi(e,r,t)}function Ui(e,r,t){return Mi(e,r,t===false?0:4)}function Bi(e,r){if(!r)throw new Error("VtUnalignedString must have positive length");return Mi(e,r,0)}function Wi(e){var r=e._R(4);var t=[];for(var a=0;a!=r;++a){var n=e.l;t[a]=e._R(0,"lpwstr").replace(F,"");if(e.l-n&2)e.l+=2}return t}function Hi(e){var r=e._R(4);var t=[];for(var a=0;a!=r;++a)t[a]=e._R(0,"lpstr-cp").replace(F,"");return t}function zi(e){var r=e.l;var t=Xi(e,Wn);if(e[e.l]==0&&e[e.l+1]==0&&e.l-r&2)e.l+=2;var a=Xi(e,Rn);return[t,a]}function Vi(e){var r=e._R(4);var t=[];for(var a=0;a<r/2;++a)t.push(zi(e));return t}function Gi(e,r){var t=e._R(4);var a={};for(var n=0;n!=t;++n){var i=e._R(4);var s=e._R(4);a[i]=e._R(s,r===1200?"utf16le":"utf8").replace(F,"").replace(D,"!");if(r===1200&&s%2)e.l+=2}if(e.l&3)e.l=e.l>>2+1<<2;return a}function $i(e){var r=e._R(4);var t=e.slice(e.l,e.l+r);e.l+=r;if((r&3)>0)e.l+=4-(r&3)&3;return t}function ji(e){var r={};r.Size=e._R(4);e.l+=r.Size+3-(r.Size-1)%4;return r}function Xi(e,r,t){var a=e._R(2),n,i=t||{};e.l+=2;if(r!==In)if(a!==r&&Hn.indexOf(r)===-1&&!((r&65534)==4126&&(a&65534)==4126))throw new Error("Expected type "+r+" saw "+a);switch(r===In?a:r){case 2:n=e._R(2,"i");if(!i.raw)e.l+=2;return n;case 3:n=e._R(4,"i");return n;case 11:return e._R(4)!==0;case 19:n=e._R(4);return n;case 30:return Pi(e,a,4).replace(F,"");case 31:return Li(e);case 64:return Fi(e);case 65:return $i(e);case 71:return ji(e);case 80:return Ui(e,a,!i.raw).replace(F,"");case 81:return Bi(e,a).replace(F,"");case 4108:return Vi(e);case 4126:;case 4127:return a==4127?Wi(e):Hi(e);default:throw new Error("TypedPropertyValue unrecognized type "+r+" "+a);}}function Yi(e,r){var t=ba(4),a=ba(4);t._W(4,e==80?31:e);switch(e){case 3:a._W(-4,r);break;case 5:a=ba(8);a._W(8,r,"f");break;case 11:a._W(4,r?1:0);break;case 64:a=Di(r);break;case 31:;case 80:a=ba(4+2*(r.length+1)+(r.length%2?0:2));a._W(4,r.length+1);a._W(0,r,"dbcs");while(a.l!=a.length)a._W(1,0);break;default:throw new Error("TypedPropertyValue unrecognized type "+e+" "+r);}return N([t,a])}function Ki(e,r){var t=e.l;var a=e._R(4);var n=e._R(4);var i=[],s=0;var f=0;var l=-1,o={};for(s=0;s!=n;++s){var u=e._R(4);var h=e._R(4);i[s]=[u,h+t]}i.sort(function(e,r){return e[1]-r[1]});var d={};for(s=0;s!=n;++s){if(e.l!==i[s][1]){var v=true;if(s>0&&r)switch(r[i[s-1][0]].t){case 2:if(e.l+2===i[s][1]){e.l+=2;v=false}break;case 80:if(e.l<=i[s][1]){e.l=i[s][1];v=false}break;case 4108:if(e.l<=i[s][1]){e.l=i[s][1];v=false}break;}if((!r||s==0)&&e.l<=i[s][1]){v=false;e.l=i[s][1]}if(v)throw new Error("Read Error: Expected address "+i[s][1]+" at "+e.l+" :"+s)}if(r){if(i[s][0]==0&&i.length>s+1&&i[s][1]==i[s+1][1])continue;var p=r[i[s][0]];d[p.n]=Xi(e,p.t,{raw:true});if(p.p==="version")d[p.n]=String(d[p.n]>>16)+"."+("0000"+String(d[p.n]&65535)).slice(-4);if(p.n=="CodePage")switch(d[p.n]){case 0:d[p.n]=1252;case 874:;case 932:;case 936:;case 949:;case 950:;case 1250:;case 1251:;case 1253:;case 1254:;case 1255:;case 1256:;case 1257:;case 1258:;case 1e4:;case 1200:;case 1201:;case 1252:;case 65e3:;case-536:;case 65001:;case-535:c(f=d[p.n]>>>0&65535);break;default:throw new Error("Unsupported CodePage: "+d[p.n]);}}else{if(i[s][0]===1){f=d.CodePage=Xi(e,On);c(f);if(l!==-1){var m=e.l;e.l=i[l][1];o=Gi(e,f);e.l=m}}else if(i[s][0]===0){if(f===0){l=s;e.l=i[s+1][1];continue}o=Gi(e,f)}else{var b=o[i[s][0]];var g;switch(e[e.l]){case 65:e.l+=4;g=$i(e);break;case 30:e.l+=4;g=Ui(e,e[e.l-4]).replace(/\u0000+$/,"");break;case 31:e.l+=4;g=Ui(e,e[e.l-4]).replace(/\u0000+$/,"");break;case 3:e.l+=4;g=e._R(4,"i");break;case 19:e.l+=4;g=e._R(4);break;case 5:e.l+=4;g=e._R(8,"f");break;case 11:e.l+=4;g=ns(e,4);break;case 64:e.l+=4;g=wr(Fi(e));break;default:throw new Error("unparsed value: "+e[e.l]);}d[b]=g}}}e.l=t+a;return d}var Zi=["CodePage","Thumbnail","_PID_LINKBASE","_PID_HLINKS","SystemIdentifier","FMTID"];function Ji(e){switch(typeof e){case"boolean":return 11;case"number":return(e|0)==e?3:5;case"string":return 31;case"object":if(e instanceof Date)return 64;break;}return-1}function qi(e,r,t){var a=ba(8),n=[],i=[];var s=8,f=0;var c=ba(8),l=ba(8);c._W(4,2);c._W(4,1200);l._W(4,1);i.push(c);n.push(l);s+=8+c.length;if(!r){l=ba(8);l._W(4,0);n.unshift(l);var o=[ba(4)];o[0]._W(4,e.length);for(f=0;f<e.length;++f){var u=e[f][0];c=ba(4+4+2*(u.length+1)+(u.length%2?0:2));c._W(4,f+2);c._W(4,u.length+1);c._W(0,u,"dbcs");while(c.l!=c.length)c._W(1,0);o.push(c)}c=N(o);i.unshift(c);s+=8+c.length}for(f=0;f<e.length;++f){if(r&&!r[e[f][0]])continue;if(Zi.indexOf(e[f][0])>-1||Ti.indexOf(e[f][0])>-1)continue;if(e[f][1]==null)continue;var h=e[f][1],d=0;if(r){d=+r[e[f][0]];var v=t[d];if(v.p=="version"&&typeof h=="string"){var p=h.split(".");h=(+p[0]<<16)+(+p[1]||0)}c=Yi(v.t,h)}else{var m=Ji(h);if(m==-1){m=31;h=String(h)}c=Yi(m,h)}i.push(c);l=ba(8);l._W(4,!r?2+f:d);n.push(l);s+=8+c.length}var b=8*(i.length+1);for(f=0;f<i.length;++f){n[f]._W(4,b);b+=i[f].length}a._W(4,s);a._W(4,i.length);return N([a].concat(n).concat(i))}function Qi(e,r,t){var a=e.content;if(!a)return{};pa(a,0);var n,i,s,f,c=0;a.chk("feff","Byte Order: ");a._R(2);var l=a._R(4);var o=a._R(16);if(o!==qe.utils.consts.HEADER_CLSID&&o!==t)throw new Error("Bad PropertySet CLSID "+o);n=a._R(4);if(n!==1&&n!==2)throw new Error("Unrecognized #Sets: "+n);i=a._R(16);f=a._R(4);if(n===1&&f!==a.l)throw new Error("Length mismatch: "+f+" !== "+a.l);else if(n===2){s=a._R(16);c=a._R(4)}var u=Ki(a,r);var h={SystemIdentifier:l};for(var d in u)h[d]=u[d];h.FMTID=i;if(n===1)return h;if(c-a.l==2)a.l+=2;if(a.l!==c)throw new Error("Length mismatch 2: "+a.l+" !== "+c);var v;try{v=Ki(a,null)}catch(p){}for(d in v)h[d]=v[d];h.FMTID=[i,s];return h}function es(e,r,t,a,n,i){var s=ba(n?68:48);var f=[s];s._W(2,65534);s._W(2,0);
s._W(4,842412599);s._W(16,qe.utils.consts.HEADER_CLSID,"hex");s._W(4,n?2:1);s._W(16,r,"hex");s._W(4,n?68:48);var c=qi(e,t,a);f.push(c);if(n){var l=qi(n,null,null);s._W(16,i,"hex");s._W(4,68+c.length);f.push(l)}return N(f)}function rs(e,r){e._R(r);return null}function ts(e,r){if(!r)r=ba(e);for(var t=0;t<e;++t)r._W(1,0);return r}function as(e,r,t){var a=[],n=e.l+r;while(e.l<n)a.push(t(e,n-e.l));if(n!==e.l)throw new Error("Slurp error");return a}function ns(e,r){return e._R(r)===1}function is(e,r){if(!r)r=ba(2);r._W(2,+!!e);return r}function ss(e){return e._R(2,"u")}function fs(e,r){if(!r)r=ba(2);r._W(2,e);return r}function cs(e,r){return as(e,r,ss)}function ls(e){var r=e._R(1),t=e._R(1);return t===1?r:r===1}function os(e,r,t){if(!t)t=ba(2);t._W(1,r=="e"?+e:+!!e);t._W(1,r=="e"?1:0);return t}function us(e,t,a){var n=e._R(a&&a.biff>=12?2:1);var i="sbcs-cont";var s=r;if(a&&a.biff>=8)r=1200;if(!a||a.biff==8){var f=e._R(1);if(f){i="dbcs-cont"}}else if(a.biff==12){i="wstr"}if(a.biff>=2&&a.biff<=5)i="cpstr";var c=n?e._R(n,i):"";r=s;return c}function hs(e){var t=r;r=1200;var a=e._R(2),n=e._R(1);var i=n&4,s=n&8;var f=1+(n&1);var c=0,l;var o={};if(s)c=e._R(2);if(i)l=e._R(4);var u=f==2?"dbcs-cont":"sbcs-cont";var h=a===0?"":e._R(a,u);if(s)e.l+=4*c;if(i)e.l+=l;o.t=h;if(!s){o.raw="<t>"+o.t+"</t>";o.r=o.t}r=t;return o}function ds(e){var r=e.t||"",t=1;var a=ba(3+(t>1?2:0));a._W(2,r.length);a._W(1,(t>1?8:0)|1);if(t>1)a._W(2,t);var n=ba(2*r.length);n._W(2*r.length,r,"utf16le");var i=[a,n];return N(i)}function vs(e,r,t){var a;if(t){if(t.biff>=2&&t.biff<=5)return e._R(r,"cpstr");if(t.biff>=12)return e._R(r,"dbcs-cont")}var n=e._R(1);if(n===0){a=e._R(r,"sbcs-cont")}else{a=e._R(r,"dbcs-cont")}return a}function ps(e,r,t){var a=e._R(t&&t.biff==2?1:2);if(a===0){e.l++;return""}return vs(e,a,t)}function ms(e,r,t){if(t.biff>5)return ps(e,r,t);var a=e._R(1);if(a===0){e.l++;return""}return e._R(a,t.biff<=4||!e.lens?"cpstr":"sbcs-cont")}function bs(e,r,t){if(!t)t=ba(3+2*e.length);t._W(2,e.length);t._W(1,1);t._W(31,e,"utf16le");return t}function gs(e){var r=e._R(1);e.l++;var t=e._R(2);e.l+=2;return[r,t]}function ws(e){var r=e._R(4),t=e.l;var a=false;if(r>24){e.l+=r-24;if(e._R(16)==="795881f43b1d7f48af2c825dc4852763")a=true;e.l=t}var n=e._R((a?r-24:r)>>1,"utf16le").replace(F,"");if(a)e.l+=24;return n}function ks(e){var r=e._R(2);var t="";while(r-- >0)t+="../";var a=e._R(0,"lpstr-ansi");e.l+=2;if(e._R(2)!=57005)throw new Error("Bad FileMoniker");var n=e._R(4);if(n===0)return t+a.replace(/\\/g,"/");var i=e._R(4);if(e._R(2)!=3)throw new Error("Bad FileMoniker");var s=e._R(i>>1,"utf16le").replace(F,"");return t+s}function Ts(e,r){var t=e._R(16);r-=16;switch(t){case"e0c9ea79f9bace118c8200aa004ba90b":return ws(e,r);case"0303000000000000c000000000000046":return ks(e,r);default:throw new Error("Unsupported Moniker "+t);}}function Es(e){var r=e._R(4);var t=r>0?e._R(r,"utf16le").replace(F,""):"";return t}function ys(e,r){if(!r)r=ba(6+e.length*2);r._W(4,1+e.length);for(var t=0;t<e.length;++t)r._W(2,e.charCodeAt(t));r._W(2,0);return r}function Ss(e,r){var t=e.l+r;var a=e._R(4);if(a!==2)throw new Error("Unrecognized streamVersion: "+a);var n=e._R(2);e.l+=2;var i,s,f,c,l="",o,u;if(n&16)i=Es(e,t-e.l);if(n&128)s=Es(e,t-e.l);if((n&257)===257)f=Es(e,t-e.l);if((n&257)===1)c=Ts(e,t-e.l);if(n&8)l=Es(e,t-e.l);if(n&32)o=e._R(16);if(n&64)u=Fi(e);e.l=t;var h=s||f||c||"";if(h&&l)h+="#"+l;if(!h)h="#"+l;if(n&2&&h.charAt(0)=="/"&&h.charAt(1)!="/")h="file://"+h;var d={Target:h};if(o)d.guid=o;if(u)d.time=u;if(i)d.Tooltip=i;return d}function _s(e){var r=ba(512),t=0;var a=e.Target;if(a.slice(0,7)=="file://")a=a.slice(7);var n=a.indexOf("#");var i=n>-1?31:23;switch(a.charAt(0)){case"#":i=28;break;case".":i&=~2;break;}r._W(4,2);r._W(4,i);var s=[8,6815827,6619237,4849780,83];for(t=0;t<s.length;++t)r._W(4,s[t]);if(i==28){a=a.slice(1);ys(a,r)}else if(i&2){s="e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");for(t=0;t<s.length;++t)r._W(1,parseInt(s[t],16));var f=n>-1?a.slice(0,n):a;r._W(4,2*(f.length+1));for(t=0;t<f.length;++t)r._W(2,f.charCodeAt(t));r._W(2,0);if(i&8)ys(n>-1?a.slice(n+1):"",r)}else{s="03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");for(t=0;t<s.length;++t)r._W(1,parseInt(s[t],16));var c=0;while(a.slice(c*3,c*3+3)=="../"||a.slice(c*3,c*3+3)=="..\\")++c;r._W(2,c);r._W(4,a.length-3*c+1);for(t=0;t<a.length-3*c;++t)r._W(1,a.charCodeAt(t+3*c)&255);r._W(1,0);r._W(2,65535);r._W(2,57005);for(t=0;t<6;++t)r._W(4,0)}return r.slice(0,r.l)}function As(e){var r=e._R(1),t=e._R(1),a=e._R(1),n=e._R(1);return[r,t,a,n]}function xs(e,r){var t=As(e,r);t[3]=0;return t}function Cs(e){var r=e._R(2);var t=e._R(2);var a=e._R(2);return{r:r,c:t,ixfe:a}}function Os(e,r,t,a){if(!a)a=ba(6);a._W(2,e);a._W(2,r);a._W(2,t||0);return a}function Rs(e){var r=e._R(2);var t=e._R(2);e.l+=8;return{type:r,flags:t}}function Ns(e,r,t){return r===0?"":ms(e,r,t)}function Is(e,r,t){var a=t.biff>8?4:2;var n=e._R(a),i=e._R(a,"i"),s=e._R(a,"i");return[n,i,s]}function Fs(e){var r=e._R(2);var t=vn(e);return[r,t]}function Ds(e,r,t){e.l+=4;r-=4;var a=e.l+r;var n=us(e,r,t);var i=e._R(2);a-=e.l;if(i!==a)throw new Error("Malformed AddinUdf: padding = "+a+" != "+i);e.l+=i;return n}function Ps(e){var r=e._R(2);var t=e._R(2);var a=e._R(2);var n=e._R(2);return{s:{c:a,r:r},e:{c:n,r:t}}}function Ls(e,r){if(!r)r=ba(8);r._W(2,e.s.r);r._W(2,e.e.r);r._W(2,e.s.c);r._W(2,e.e.c);return r}function Ms(e){var r=e._R(2);var t=e._R(2);var a=e._R(1);var n=e._R(1);return{s:{c:a,r:r},e:{c:n,r:t}}}var Us=Ms;function Bs(e){e.l+=4;var r=e._R(2);var t=e._R(2);var a=e._R(2);e.l+=12;return[t,r,a]}function Ws(e){var r={};e.l+=4;e.l+=16;r.fSharedNote=e._R(2);e.l+=4;return r}function Hs(e){var r={};e.l+=4;e.cf=e._R(2);return r}function zs(e){e.l+=2;e.l+=e._R(2)}var Vs={0:zs,4:zs,5:zs,6:zs,7:Hs,8:zs,9:zs,10:zs,11:zs,12:zs,13:Ws,14:zs,15:zs,16:zs,17:zs,18:zs,19:zs,20:zs,21:Bs};function Gs(e,r){var t=e.l+r;var a=[];while(e.l<t){var n=e._R(2);e.l-=2;try{a.push(Vs[n](e,t-e.l))}catch(i){e.l=t;return a}}if(e.l!=t)e.l=t;return a}function $s(e,r){var t={BIFFVer:0,dt:0};t.BIFFVer=e._R(2);r-=2;if(r>=2){t.dt=e._R(2);e.l-=2}switch(t.BIFFVer){case 1536:;case 1280:;case 1024:;case 768:;case 512:;case 2:;case 7:break;default:if(r>6)throw new Error("Unexpected BIFF Ver "+t.BIFFVer);}e._R(r);return t}function js(e,r,t){var a=1536,n=16;switch(t.bookType){case"biff8":break;case"biff5":a=1280;n=8;break;case"biff4":a=4;n=6;break;case"biff3":a=3;n=6;break;case"biff2":a=2;n=4;break;case"xla":break;default:throw new Error("unsupported BIFF version");}var i=ba(n);i._W(2,a);i._W(2,r);if(n>4)i._W(2,29282);if(n>6)i._W(2,1997);if(n>8){i._W(2,49161);i._W(2,1);i._W(2,1798);i._W(2,0)}return i}function Xs(e,r){if(r===0)return 1200;if(e._R(2)!==1200){}return 1200}function Ys(e,r,t){if(t.enc){e.l+=r;return""}var a=e.l;var n=ms(e,0,t);e._R(r+a-e.l);return n}function Ks(e,r){var t=!r||r.biff==8;var a=ba(t?112:54);a._W(r.biff==8?2:1,7);if(t)a._W(1,0);a._W(4,859007059);a._W(4,5458548|(t?0:536870912));while(a.l<a.length)a._W(1,t?0:32);return a}function Zs(e,r,t){var a=t&&t.biff==8||r==2?e._R(2):(e.l+=r,0);return{fDialog:a&16,fBelow:a&64,fRight:a&128}}function Js(e,r,t){var a=e._R(4);var n=e._R(1)&3;var i=e._R(1);switch(i){case 0:i="Worksheet";break;case 1:i="Macrosheet";break;case 2:i="Chartsheet";break;case 6:i="VBAModule";break;}var s=us(e,0,t);if(s.length===0)s="Sheet1";return{pos:a,hs:n,dt:i,name:s}}function qs(e,r){var t=!r||r.biff>=8?2:1;var a=ba(8+t*e.name.length);a._W(4,e.pos);a._W(1,e.hs||0);a._W(1,e.dt);a._W(1,e.name.length);if(r.biff>=8)a._W(1,1);a._W(t*e.name.length,e.name,r.biff<8?"sbcs":"utf16le");var n=a.slice(0,a.l);n.l=a.l;return n}function Qs(e,r){var t=e.l+r;var a=e._R(4);var n=e._R(4);var i=[];for(var s=0;s!=n&&e.l<t;++s){i.push(hs(e))}i.Count=a;i.Unique=n;return i}function ef(e,r){var t=ba(8);t._W(4,e.Count);t._W(4,e.Unique);var a=[];for(var n=0;n<e.length;++n)a[n]=ds(e[n],r);var i=N([t].concat(a));i.parts=[t.length].concat(a.map(function(e){return e.length}));return i}function rf(e,r){var t={};t.dsst=e._R(2);e.l+=r-2;return t}function tf(e){var r={};r.r=e._R(2);r.c=e._R(2);r.cnt=e._R(2)-r.c;var t=e._R(2);e.l+=4;var a=e._R(1);e.l+=3;if(a&7)r.level=a&7;if(a&32)r.hidden=true;if(a&64)r.hpt=t/20;return r}function af(e){var r=Rs(e);if(r.type!=2211)throw new Error("Invalid Future Record "+r.type);var t=e._R(4);return t!==0}function nf(e){e._R(2);return e._R(4)}function sf(e,r,t){var a=0;if(!(t&&t.biff==2)){a=e._R(2)}var n=e._R(2);if(t&&t.biff==2){a=1-(n>>15);n&=32767}var i={Unsynced:a&1,DyZero:(a&2)>>1,ExAsc:(a&4)>>2,ExDsc:(a&8)>>3};return[i,n]}function ff(e){var r=e._R(2),t=e._R(2),a=e._R(2),n=e._R(2);var i=e._R(2),s=e._R(2),f=e._R(2);var c=e._R(2),l=e._R(2);return{Pos:[r,t],Dim:[a,n],Flags:i,CurTab:s,FirstTab:f,Selected:c,TabRatio:l}}function cf(){var e=ba(18);e._W(2,0);e._W(2,0);e._W(2,29280);e._W(2,17600);e._W(2,56);e._W(2,0);e._W(2,0);e._W(2,1);e._W(2,500);return e}function lf(e,r,t){if(t&&t.biff>=2&&t.biff<5)return{};var a=e._R(2);return{RTL:a&64}}function of(e){var r=ba(18),t=1718;if(e&&e.RTL)t|=64;r._W(2,t);r._W(4,0);r._W(4,64);r._W(4,0);r._W(4,0);return r}function uf(){}function hf(e,r,t){var a={dyHeight:e._R(2),fl:e._R(2)};switch(t&&t.biff||8){case 2:break;case 3:;case 4:e.l+=2;break;default:e.l+=10;break;}a.name=us(e,0,t);return a}function df(e,r){var t=e.name||"Arial";var a=r&&r.biff==5,n=a?15+t.length:16+2*t.length;var i=ba(n);i._W(2,(e.sz||12)*20);i._W(4,0);i._W(2,400);i._W(4,0);i._W(2,0);i._W(1,t.length);if(!a)i._W(1,1);i._W((a?1:2)*t.length,t,a?"sbcs":"utf16le");return i}function vf(e){var r=Cs(e);r.isst=e._R(4);return r}function pf(e,r,t,a){var n=ba(10);Os(e,r,a,n);n._W(4,t);return n}function mf(e,r,t){if(t.biffguess&&t.biff==2)t.biff=5;var a=e.l+r;var n=Cs(e,6);if(t.biff==2)e.l++;var i=ps(e,a-e.l,t);n.val=i;return n}function bf(e,r,t,a,n){var i=!n||n.biff==8;var s=ba(6+2+ +i+(1+i)*t.length);Os(e,r,a,s);s._W(2,t.length);if(i)s._W(1,1);s._W((1+i)*t.length,t,i?"utf16le":"sbcs");return s}function gf(e,r,t){var a=e._R(2);var n=ms(e,0,t);return[a,n]}function wf(e,r,t,a){var n=t&&t.biff==5;if(!a)a=ba(n?3+r.length:5+2*r.length);a._W(2,e);a._W(n?1:2,r.length);if(!n)a._W(1,1);a._W((n?1:2)*r.length,r,n?"sbcs":"utf16le");var i=a.length>a.l?a.slice(0,a.l):a;if(i.l==null)i.l=i.length;return i}var kf=ms;function Tf(e,r,t){var a=e.l+r;var n=t.biff==8||!t.biff?4:2;var i=e._R(n),s=e._R(n);var f=e._R(2),c=e._R(2);e.l=a;return{s:{r:i,c:f},e:{r:s,c:c}}}function Ef(e,r){var t=r.biff==8||!r.biff?4:2;var a=ba(2*t+6);a._W(t,e.s.r);a._W(t,e.e.r+1);a._W(2,e.s.c);a._W(2,e.e.c+1);a._W(2,0);return a}function yf(e){var r=e._R(2),t=e._R(2);var a=Fs(e);return{r:r,c:t,ixfe:a[0],rknum:a[1]}}function Sf(e,r){var t=e.l+r-2;var a=e._R(2),n=e._R(2);var i=[];while(e.l<t)i.push(Fs(e));if(e.l!==t)throw new Error("MulRK read error");var s=e._R(2);if(i.length!=s-n+1)throw new Error("MulRK length mismatch");return{r:a,c:n,C:s,rkrec:i}}function _f(e,r){var t=e.l+r-2;var a=e._R(2),n=e._R(2);var i=[];while(e.l<t)i.push(e._R(2));if(e.l!==t)throw new Error("MulBlank read error");var s=e._R(2);if(i.length!=s-n+1)throw new Error("MulBlank length mismatch");return{r:a,c:n,C:s,ixfe:i}}function Af(e,r,t,a){var n={};var i=e._R(4),s=e._R(4);var f=e._R(4),c=e._R(2);n.patternType=$n[f>>26];if(!a.cellStyles)return n;n.alc=i&7;n.fWrap=i>>3&1;n.alcV=i>>4&7;n.fJustLast=i>>7&1;n.trot=i>>8&255;n.cIndent=i>>16&15;n.fShrinkToFit=i>>20&1;n.iReadOrder=i>>22&2;n.fAtrNum=i>>26&1;n.fAtrFnt=i>>27&1;n.fAtrAlc=i>>28&1;n.fAtrBdr=i>>29&1;n.fAtrPat=i>>30&1;n.fAtrProt=i>>31&1;n.dgLeft=s&15;n.dgRight=s>>4&15;n.dgTop=s>>8&15;n.dgBottom=s>>12&15;n.icvLeft=s>>16&127;n.icvRight=s>>23&127;n.grbitDiag=s>>30&3;n.icvTop=f&127;n.icvBottom=f>>7&127;n.icvDiag=f>>14&127;n.dgDiag=f>>21&15;n.icvFore=c&127;n.icvBack=c>>7&127;n.fsxButton=c>>14&1;return n}function xf(e,r,t){var a={};a.ifnt=e._R(2);a.numFmtId=e._R(2);a.flags=e._R(2);a.fStyle=a.flags>>2&1;r-=6;a.data=Af(e,r,a.fStyle,t);return a}function Cf(e,r,t,a){var n=t&&t.biff==5;if(!a)a=ba(n?16:20);a._W(2,0);if(e.style){a._W(2,e.numFmtId||0);a._W(2,65524)}else{a._W(2,e.numFmtId||0);a._W(2,r<<4)}var i=0;if(e.numFmtId>0&&n)i|=1024;a._W(4,i);a._W(4,0);if(!n)a._W(4,0);a._W(2,0);return a}function Of(e){e.l+=4;var r=[e._R(2),e._R(2)];if(r[0]!==0)r[0]--;if(r[1]!==0)r[1]--;if(r[0]>7||r[1]>7)throw new Error("Bad Gutters: "+r.join("|"));return r}function Rf(e){var r=ba(8);r._W(4,0);r._W(2,e[0]?e[0]+1:0);r._W(2,e[1]?e[1]+1:0);return r}function Nf(e,r,t){var a=Cs(e,6);if(t.biff==2||r==9)++e.l;var n=ls(e,2);a.val=n;a.t=n===true||n===false?"b":"e";return a}function If(e,r,t,a,n,i){var s=ba(8);Os(e,r,a,s);os(t,i,s);return s}function Ff(e,r,t){if(t.biffguess&&t.biff==2)t.biff=5;var a=Cs(e,6);var n=kn(e,8);a.val=n;return a}function Df(e,r,t,a){var n=ba(14);Os(e,r,a,n);Tn(t,n);return n}var Pf=Ns;function Lf(e,r,t){var a=e.l+r;var n=e._R(2);var i=e._R(2);t.sbcch=i;if(i==1025||i==14849)return[i,n];if(i<1||i>255)throw new Error("Unexpected SupBook type: "+i);var s=vs(e,i);var f=[];while(a>e.l)f.push(ps(e));return[i,n,s,f]}function Mf(e,r,t){var a=e._R(2);var n;var i={fBuiltIn:a&1,fWantAdvise:a>>>1&1,fWantPict:a>>>2&1,fOle:a>>>3&1,fOleLink:a>>>4&1,cf:a>>>5&1023,fIcon:a>>>15&1};if(t.sbcch===14849)n=Ds(e,r-2,t);i.body=n||e._R(r-2);if(typeof n==="string")i.Name=n;return i}function Uf(e,r,t){var a=e.l+r;var n=e._R(2);var i=e._R(1);var s=e._R(1);var f=e._R(t&&t.biff==2?1:2);var c=0;if(!t||t.biff>=5){if(t.biff!=5)e.l+=2;c=e._R(2);if(t.biff==5)e.l+=2;e.l+=4}var l=vs(e,s,t);if(n&32)l=Jn[l.charCodeAt(0)];var o=a-e.l;if(t&&t.biff==2)--o;var u=a==e.l||f===0||!(o>0)?[]:pd(e,o,t,f);return{chKey:i,Name:l,itab:c,rgce:u}}function Bf(e,r,t){if(t.biff<8)return Wf(e,r,t);var a=[],n=e.l+r,i=e._R(t.biff>8?4:2);while(i--!==0)a.push(Is(e,t.biff>8?12:6,t));if(e.l!=n)throw new Error("Bad ExternSheet: "+e.l+" != "+n);return a}function Wf(e,r,t){if(e[e.l+1]==3)e[e.l]++;var a=us(e,r,t);return a.charCodeAt(0)==3?a.slice(1):a}function Hf(e,r,t){if(t.biff<8){e.l+=r;return}var a=e._R(2);var n=e._R(2);var i=vs(e,a,t);var s=vs(e,n,t);return[i,s]}function zf(e,r,t){var a=Ms(e,6);e.l++;var n=e._R(1);r-=8;return[md(e,r,t),n,a]}function Vf(e,r,t){var a=Us(e,6);switch(t.biff){case 2:e.l++;r-=7;break;case 3:;case 4:e.l+=2;r-=8;break;default:e.l+=6;r-=12;}return[a,dd(e,r,t,a)]}function Gf(e){var r=e._R(4)!==0;var t=e._R(4)!==0;var a=e._R(4);return[r,t,a]}function $f(e,r,t){if(t.biff<8)return;var a=e._R(2),n=e._R(2);var i=e._R(2),s=e._R(2);var f=ms(e,0,t);if(t.biff<8)e._R(1);return[{r:a,c:n},f,s,i]}function jf(e,r,t){return $f(e,r,t)}function Xf(e,r){var t=[];var a=e._R(2);while(a--)t.push(Ps(e,r));return t}function Yf(e){var r=ba(2+e.length*8);r._W(2,e.length);for(var t=0;t<e.length;++t)Ls(e[t],r);return r}function Kf(e,r,t){if(t&&t.biff<8)return Jf(e,r,t);var a=Bs(e,22);var n=Gs(e,r-22,a[1]);return{cmo:a,ft:n}}var Zf={8:function(e,r){var t=e.l+r;e.l+=10;var a=e._R(2);e.l+=4;e.l+=2;e.l+=2;e.l+=2;e.l+=4;var n=e._R(1);e.l+=n;e.l=t;return{fmt:a}}};function Jf(e,r,t){e.l+=4;var a=e._R(2);var n=e._R(2);var i=e._R(2);e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=2;e.l+=6;r-=36;var s=[];s.push((Zf[a]||ma)(e,r,t));return{cmo:[n,a,i],ft:s}}function qf(e,r,t){var a=e.l;var n="";try{e.l+=4;var i=(t.lastobj||{cmo:[0,0]}).cmo[1];var s;if([0,5,7,11,12,14].indexOf(i)==-1)e.l+=6;else s=gs(e,6,t);var f=e._R(2);e._R(2);ss(e,2);var c=e._R(2);e.l+=c;for(var l=1;l<e.lens.length-1;++l){if(e.l-a!=e.lens[l])throw new Error("TxO: bad continue record");var o=e[e.l];var u=vs(e,e.lens[l+1]-e.lens[l]-1);n+=u;if(n.length>=(o?f:2*f))break}if(n.length!==f&&n.length!==f*2){throw new Error("cchText: "+f+" != "+n.length)}e.l=a+r;return{t:n}}catch(h){e.l=a+r;return{t:n}}}function Qf(e,r){var t=Ps(e,8);e.l+=16;var a=Ss(e,r-24);return[t,a]}function ec(e){var r=ba(24);var t=Da(e[0]);r._W(2,t.r);r._W(2,t.r);r._W(2,t.c);r._W(2,t.c);var a="d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");for(var n=0;n<16;++n)r._W(1,parseInt(a[n],16));return N([r,_s(e[1])])}function rc(e,r){e._R(2);var t=Ps(e,8);var a=e._R((r-10)/2,"dbcs-cont");a=a.replace(F,"");return[t,a]}function tc(e){var r=e[1].Tooltip;var t=ba(10+2*(r.length+1));t._W(2,2048);var a=Da(e[0]);t._W(2,a.r);t._W(2,a.r);t._W(2,a.c);t._W(2,a.c);for(var n=0;n<r.length;++n)t._W(2,r.charCodeAt(n));t._W(2,0);return t}function ac(e){var r=[0,0],t;t=e._R(2);r[0]=Gn[t]||t;t=e._R(2);r[1]=Gn[t]||t;return r}function nc(e){if(!e)e=ba(4);e._W(2,1);e._W(2,1);return e}function ic(e){var r=e._R(2);var t=[];while(r-- >0)t.push(xs(e,8));return t}function sc(e){var r=e._R(2);var t=[];while(r-- >0)t.push(xs(e,8));return t}function fc(e){e.l+=2;var r={cxfs:0,crc:0};r.cxfs=e._R(2);r.crc=e._R(4);return r}function cc(e,r,t){if(!t.cellStyles)return ma(e,r);var a=t&&t.biff>=12?4:2;var n=e._R(a);var i=e._R(a);var s=e._R(a);var f=e._R(a);var c=e._R(2);if(a==2)e.l+=2;var l={s:n,e:i,w:s,ixfe:f,flags:c};if(t.biff>=5||!t.biff)l.level=c>>8&7;return l}function lc(e,r){var t=ba(12);t._W(2,r);t._W(2,r);t._W(2,e.width*256);t._W(2,0);var a=0;if(e.hidden)a|=1;t._W(1,a);a=e.level||0;t._W(1,a);t._W(2,0);return t}function oc(e,r){var t={};if(r<32)return t;e.l+=16;t.header=kn(e,8);t.footer=kn(e,8);e.l+=2;return t}function uc(e,r,t){var a={area:false};if(t.biff!=5){e.l+=r;return a}var n=e._R(1);e.l+=3;if(n&16)a.area=true;return a}function hc(e){var r=ba(2*e);for(var t=0;t<e;++t)r._W(2,t+1);return r}var dc=Cs;var vc=cs;var pc=ps;function mc(e){var r=e._R(2);var t=e._R(2);var a=e._R(4);var n={fmt:r,env:t,len:a,data:e.slice(e.l,e.l+a)};e.l+=a;return n}function bc(e,r,t){if(t.biffguess&&t.biff==5)t.biff=2;var a=Cs(e,6);++e.l;var n=ms(e,r-7,t);a.t="str";a.val=n;return a}function gc(e){var r=Cs(e,6);++e.l;var t=kn(e,8);r.t="n";r.val=t;return r}function wc(e,r,t){var a=ba(15);Ib(a,e,r);a._W(8,t,"f");return a}function kc(e){var r=Cs(e,6);++e.l;var t=e._R(2);r.t="n";r.val=t;return r}function Tc(e,r,t){var a=ba(9);Ib(a,e,r);a._W(2,t);return a}function Ec(e){var r=e._R(1);if(r===0){e.l++;return""}return e._R(r,"sbcs-cont")}function yc(e,r){e.l+=6;e.l+=2;e.l+=1;e.l+=3;e.l+=1;e.l+=r-13}function Sc(e,r,t){var a=e.l+r;var n=Cs(e,6);var i=e._R(2);var s=vs(e,i,t);e.l=a;n.t="str";n.val=s;return n}var _c=[2,3,48,49,131,139,140,245];var Ac=function(){var e={1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127,8:865,9:437,10:850,11:437,13:437,14:850,15:437,16:850,17:437,18:850,19:932,20:850,21:437,22:850,23:865,24:437,25:437,26:850,27:437,28:863,29:850,31:852,34:852,35:852,36:860,37:850,38:866,55:850,64:852,77:936,78:949,79:950,80:874,87:1252,88:1252,89:1252,108:863,134:737,135:852,136:857,204:1257,255:16969};var r=sr({1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127});function n(r,t){var n=[];var i=S(1);switch(t.type){case"base64":i=A(T(r));break;case"binary":i=A(r);break;case"buffer":;case"array":i=r;break;}pa(i,0);var s=i._R(1);var f=!!(s&136);var c=false,l=false;switch(s){case 2:break;case 3:break;case 48:c=true;f=true;break;case 49:c=true;f=true;break;case 131:break;case 139:break;case 140:l=true;break;case 245:break;default:throw new Error("DBF Unsupported Version: "+s.toString(16));}var o=0,u=521;if(s==2)o=i._R(2);i.l+=3;if(s!=2)o=i._R(4);if(o>1048576)o=1e6;if(s!=2)u=i._R(2);var h=i._R(2);var d=t.codepage||1252;if(s!=2){i.l+=16;i._R(1);if(i[i.l]!==0)d=e[i[i.l]];i.l+=1;i.l+=2}if(l)i.l+=36;var v=[],p={};var m=Math.min(i.length,s==2?521:u-10-(c?264:0));var b=l?32:11;while(i.l<m&&i[i.l]!=13){p={};p.name=a.utils.decode(d,i.slice(i.l,i.l+b)).replace(/[\u0000\r\n].*$/g,"");i.l+=b;p.type=String.fromCharCode(i._R(1));if(s!=2&&!l)p.offset=i._R(4);p.len=i._R(1);if(s==2)p.offset=i._R(2);p.dec=i._R(1);if(p.name.length)v.push(p);if(s!=2)i.l+=l?13:14;switch(p.type){case"B":if((!c||p.len!=8)&&t.WTF)console.log("Skipping "+p.name+":"+p.type);break;case"G":;case"P":if(t.WTF)console.log("Skipping "+p.name+":"+p.type);break;case"+":;case"0":;case"@":;case"C":;case"D":;case"F":;case"I":;case"L":;case"M":;case"N":;case"O":;case"T":;case"Y":break;default:throw new Error("Unknown Field Type: "+p.type);}}if(i[i.l]!==13)i.l=u-1;if(i._R(1)!==13)throw new Error("DBF Terminator not found "+i.l+" "+i[i.l]);i.l=u;var g=0,w=0;n[0]=[];for(w=0;w!=v.length;++w)n[0][w]=v[w].name;while(o-- >0){if(i[i.l]===42){i.l+=h;continue}++i.l;n[++g]=[];w=0;for(w=0;w!=v.length;++w){var k=i.slice(i.l,i.l+v[w].len);i.l+=v[w].len;pa(k,0);var E=a.utils.decode(d,k);switch(v[w].type){case"C":if(E.trim().length)n[g][w]=E.replace(/\s+$/,"");break;case"D":if(E.length===8)n[g][w]=new Date(+E.slice(0,4),+E.slice(4,6)-1,+E.slice(6,8));else n[g][w]=E;break;case"F":n[g][w]=parseFloat(E.trim());break;case"+":;case"I":n[g][w]=l?k._R(-4,"i")^2147483648:k._R(4,"i");break;case"L":switch(E.trim().toUpperCase()){case"Y":;case"T":n[g][w]=true;break;case"N":;case"F":n[g][w]=false;break;case"":;case"?":break;default:throw new Error("DBF Unrecognized L:|"+E+"|");}break;case"M":if(!f)throw new Error("DBF Unexpected MEMO for type "+s.toString(16));n[g][w]="##MEMO##"+(l?parseInt(E.trim(),10):k._R(4));break;case"N":E=E.replace(/\u0000/g,"").trim();if(E&&E!=".")n[g][w]=+E||0;break;case"@":n[g][w]=new Date(k._R(-8,"f")-621356832e5);break;case"T":n[g][w]=new Date((k._R(4)-2440588)*864e5+k._R(4));break;case"Y":n[g][w]=k._R(4,"i")/1e4+k._R(4,"i")/1e4*Math.pow(2,32);break;case"O":n[g][w]=-k._R(-8,"f");break;case"B":if(c&&v[w].len==8){n[g][w]=k._R(8,"f");break};case"G":;case"P":k.l+=v[w].len;break;case"0":if(v[w].name==="_NullFlags")break;default:throw new Error("DBF Unsupported data type "+v[w].type);}}}if(s!=2)if(i.l<i.length&&i[i.l++]!=26)throw new Error("DBF EOF Marker missing "+(i.l-1)+" of "+i.length+" "+i[i.l-1].toString(16));if(t&&t.sheetRows)n=n.slice(0,t.sheetRows);t.DBF=v;return n}function i(e,r){var t=r||{};if(!t.dateNF)t.dateNF="yyyymmdd";var a=$a(n(e,t),t);a["!cols"]=t.DBF.map(function(e){return{wch:e.len,DBF:e}});delete t.DBF;return a}function s(e,r){try{return Va(i(e,r),r)}catch(t){if(r&&r.WTF)throw t}return{SheetNames:[],Sheets:{}}}var f={B:8,C:250,L:1,D:8,"?":0,"":0};function l(e,a){var n=a||{};if(+n.codepage>=0)c(+n.codepage);if(n.type=="string")throw new Error("Cannot write DBF to JS string");var i=wa();var s=Uw(e,{header:1,raw:true,cellDates:true});var l=s[0],o=s.slice(1),u=e["!cols"]||[];var h=0,d=0,v=0,p=1;for(h=0;h<l.length;++h){if(((u[h]||{}).DBF||{}).name){l[h]=u[h].DBF.name;++v;continue}if(l[h]==null)continue;++v;if(typeof l[h]==="number")l[h]=l[h].toString(10);if(typeof l[h]!=="string")throw new Error("DBF Invalid column name "+l[h]+" |"+typeof l[h]+"|");if(l.indexOf(l[h])!==h)for(d=0;d<1024;++d)if(l.indexOf(l[h]+"_"+d)==-1){l[h]+="_"+d;break}}var m=Wa(e["!ref"]);var b=[];var g=[];var w=[];for(h=0;h<=m.e.c-m.s.c;++h){var k="",T="",E=0;var y=[];for(d=0;d<o.length;++d){if(o[d][h]!=null)y.push(o[d][h])}if(y.length==0||l[h]==null){b[h]="?";continue}for(d=0;d<y.length;++d){switch(typeof y[d]){case"number":T="B";break;case"string":T="C";break;case"boolean":T="L";break;case"object":T=y[d]instanceof Date?"D":"C";break;default:T="C";}E=Math.max(E,String(y[d]).length);k=k&&k!=T?"C":T}if(E>250)E=250;T=((u[h]||{}).DBF||{}).type;if(T=="C"){if(u[h].DBF.len>E)E=u[h].DBF.len}if(k=="B"&&T=="N"){k="N";w[h]=u[h].DBF.dec;E=u[h].DBF.len}g[h]=k=="C"||T=="N"?E:f[k]||0;p+=g[h];b[h]=k}var S=i.next(32);S._W(4,318902576);S._W(4,o.length);S._W(2,296+32*v);S._W(2,p);for(h=0;h<4;++h)S._W(4,0);S._W(4,0|(+r[t]||3)<<8);for(h=0,d=0;h<l.length;++h){if(l[h]==null)continue;var _=i.next(32);var A=(l[h].slice(-10)+"\0\0\0\0\0\0\0\0\0\0\0").slice(0,11);_._W(1,A,"sbcs");_._W(1,b[h]=="?"?"C":b[h],"sbcs");_._W(4,d);_._W(1,g[h]||f[b[h]]||0);_._W(1,w[h]||0);_._W(1,2);_._W(4,0);_._W(1,0);_._W(4,0);_._W(4,0);d+=g[h]||f[b[h]]||0}var x=i.next(264);x._W(4,13);for(h=0;h<65;++h)x._W(4,0);for(h=0;h<o.length;++h){var C=i.next(p);C._W(1,0);for(d=0;d<l.length;++d){if(l[d]==null)continue;switch(b[d]){case"L":C._W(1,o[h][d]==null?63:o[h][d]?84:70);break;case"B":C._W(8,o[h][d]||0,"f");break;case"N":var O="0";if(typeof o[h][d]=="number")O=o[h][d].toFixed(w[d]||0);for(v=0;v<g[d]-O.length;++v)C._W(1,32);C._W(1,O,"sbcs");break;case"D":if(!o[h][d])C._W(8,"00000000","sbcs");else{C._W(4,("0000"+o[h][d].getFullYear()).slice(-4),"sbcs");C._W(2,("00"+(o[h][d].getMonth()+1)).slice(-2),"sbcs");C._W(2,("00"+o[h][d].getDate()).slice(-2),"sbcs")}break;case"C":var R=String(o[h][d]!=null?o[h][d]:"").slice(0,g[d]);C._W(1,R,"sbcs");for(v=0;v<g[d]-R.length;++v)C._W(1,32);break;}}}i.next(1)._W(1,26);return i.end()}return{to_workbook:s,to_sheet:i,from_sheet:l}}();var xc=function(){var e={AA:"À",BA:"Á",CA:"Â",DA:195,HA:"Ä",JA:197,AE:"È",BE:"É",CE:"Ê",HE:"Ë",AI:"Ì",BI:"Í",CI:"Î",HI:"Ï",AO:"Ò",BO:"Ó",CO:"Ô",DO:213,HO:"Ö",AU:"Ù",BU:"Ú",CU:"Û",HU:"Ü",Aa:"à",Ba:"á",Ca:"â",Da:227,Ha:"ä",Ja:229,Ae:"è",Be:"é",Ce:"ê",He:"ë",Ai:"ì",Bi:"í",Ci:"î",Hi:"ï",Ao:"ò",Bo:"ó",Co:"ô",Do:245,Ho:"ö",Au:"ù",Bu:"ú",Cu:"û",Hu:"ü",KC:"Ç",Kc:"ç",q:"æ",z:"œ",a:"Æ",j:"Œ",DN:209,Dn:241,Hy:255,S:169,c:170,R:174,"B ":180,0:176,1:177,2:178,3:179,5:181,6:182,7:183,Q:185,k:186,b:208,i:216,l:222,s:240,y:248,"!":161,'"':162,"#":163,"(":164,"%":165,"'":167,"H ":168,"+":171,";":187,"<":188,"=":189,">":190,"?":191,"{":223};var r=new RegExp("N("+nr(e).join("|").replace(/\|\|\|/,"|\\||").replace(/([?()+])/g,"\\$1")+"|\\|)","gm");var t=function(r,t){var a=e[t];return typeof a=="number"?p(a):a};var n=function(e,r,t){var a=r.charCodeAt(0)-32<<4|t.charCodeAt(0)-48;return a==59?e:p(a)};e["|"]=254;function i(e,r){switch(r.type){case"base64":return s(T(e),r);case"binary":return s(e,r);case"buffer":return s(E&&Buffer.isBuffer(e)?e.toString("binary"):C(e),r);case"array":return s(kr(e),r);}throw new Error("Unrecognized type "+r.type)}function s(e,i){var s=e.split(/[\n\r]+/),f=-1,l=-1,o=0,u=0,h=[];var d=[];var v=null;var p={},m=[],b=[],g=[];var w=0,k;var T={Workbook:{WBProps:{},Names:[]}};if(+i.codepage>=0)c(+i.codepage);for(;o!==s.length;++o){w=0;var E=s[o].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g,n).replace(r,t);var y=E.replace(/;;/g,"\0").split(";").map(function(e){return e.replace(/\u0000/g,";")});var S=y[0],_;if(E.length>0)switch(S){case"ID":break;case"E":break;case"B":break;case"O":for(u=1;u<y.length;++u)switch(y[u].charAt(0)){case"V":{var A=parseInt(y[u].slice(1),10);if(A>=1&&A<=4)T.Workbook.WBProps.date1904=true}break;}break;case"W":break;case"P":switch(y[1].charAt(0)){case"P":d.push(E.slice(3).replace(/;;/g,";"));break;}break;case"NN":{var x={Sheet:0};for(u=1;u<y.length;++u)switch(y[u].charAt(0)){case"N":x.Name=y[u].slice(1);break;case"E":x.Ref=(i&&i.sheet||"Sheet1")+"!"+Nu(y[u].slice(1));break;}T.Workbook.Names.push(x)}break;case"C":var C=false,O=false,R=false,N=false,I=-1,F=-1,D="",P="z";for(u=1;u<y.length;++u)switch(y[u].charAt(0)){case"A":break;case"X":l=parseInt(y[u].slice(1),10)-1;O=true;break;case"Y":f=parseInt(y[u].slice(1),10)-1;if(!O)l=0;for(k=h.length;k<=f;++k)h[k]=[];break;case"K":_=y[u].slice(1);if(_.charAt(0)==='"'){_=_.slice(1,_.length-1);P="s"}else if(_==="TRUE"||_==="FALSE"){_=_==="TRUE";P="b"}else if(!isNaN(yr(_))){_=yr(_);P="n";if(v!==null&&Pe(v)&&i.cellDates){_=vr(T.Workbook.WBProps.date1904?_+1462:_);P="d"}}else if(!isNaN(xr(_).getDate())){_=wr(_);P="d";if(!i.cellDates){P="n";_=or(_,T.Workbook.WBProps.date1904)}}if(typeof a!=="undefined"&&typeof _=="string"&&(i||{}).type!="string"&&(i||{}).codepage)_=a.utils.decode(i.codepage,_);C=true;break;case"E":N=true;D=Nu(y[u].slice(1),{r:f,c:l});break;case"S":R=true;break;case"G":break;case"R":I=parseInt(y[u].slice(1),10)-1;break;case"C":F=parseInt(y[u].slice(1),10)-1;break;default:if(i&&i.WTF)throw new Error("SYLK bad record "+E);}if(C){if(!h[f][l])h[f][l]={t:P,v:_};else{h[f][l].t=P;h[f][l].v=_}if(v)h[f][l].z=v;if(i.cellText!==false&&v)h[f][l].w=We(h[f][l].z,h[f][l].v,{date1904:T.Workbook.WBProps.date1904});v=null}if(R){if(N)throw new Error("SYLK shared formula cannot have own formula");var L=I>-1&&h[I][F];if(!L||!L[1])throw new Error("SYLK shared formula cannot find base");D=Du(L[1],{r:f-I,c:l-F})}if(D){if(!h[f][l])h[f][l]={t:"n",f:D};else h[f][l].f=D}break;case"F":var M=0;for(u=1;u<y.length;++u)switch(y[u].charAt(0)){case"X":l=parseInt(y[u].slice(1),10)-1;++M;break;case"Y":f=parseInt(y[u].slice(1),10)-1;for(k=h.length;k<=f;++k)h[k]=[];break;case"M":w=parseInt(y[u].slice(1),10)/20;break;case"F":break;case"G":break;case"P":v=d[parseInt(y[u].slice(1),10)];break;case"S":break;case"D":break;case"N":break;case"W":g=y[u].slice(1).split(" ");for(k=parseInt(g[0],10);k<=parseInt(g[1],10);++k){w=parseInt(g[2],10);b[k-1]=w===0?{hidden:true}:{wch:w}}break;case"C":l=parseInt(y[u].slice(1),10)-1;if(!b[l])b[l]={};break;case"R":f=parseInt(y[u].slice(1),10)-1;if(!m[f])m[f]={};if(w>0){m[f].hpt=w;m[f].hpx=Bl(w)}else if(w===0)m[f].hidden=true;break;default:if(i&&i.WTF)throw new Error("SYLK bad record "+E);
;}if(M<1)v=null;break;default:if(i&&i.WTF)throw new Error("SYLK bad record "+E);}}if(m.length>0)p["!rows"]=m;if(b.length>0)p["!cols"]=b;b.forEach(function(e){Pl(e)});if(i&&i.sheetRows)h=h.slice(0,i.sheetRows);return[h,p,T]}function f(e,r){var t=i(e,r);var a=t[0],n=t[1],s=t[2];var f=Tr(r);f.date1904=(((s||{}).Workbook||{}).WBProps||{}).date1904;var c=$a(a,f);nr(n).forEach(function(e){c[e]=n[e]});var l=Va(c,r);nr(s).forEach(function(e){l[e]=s[e]});return l}function l(e,r,t,a){var n="C;Y"+(t+1)+";X"+(a+1)+";K";switch(e.t){case"n":n+=e.v||0;if(e.f&&!e.F)n+=";E"+Fu(e.f,{r:t,c:a});break;case"b":n+=e.v?"TRUE":"FALSE";break;case"e":n+=e.w||e.v;break;case"d":n+='"'+(e.w||e.v)+'"';break;case"s":n+='"'+e.v.replace(/"/g,"").replace(/;/g,";;")+'"';break;}return n}function o(e,r){r.forEach(function(r,t){var a="F;W"+(t+1)+" "+(t+1)+" ";if(r.hidden)a+="0";else{if(typeof r.width=="number"&&!r.wpx)r.wpx=Rl(r.width);if(typeof r.wpx=="number"&&!r.wch)r.wch=Nl(r.wpx);if(typeof r.wch=="number")a+=Math.round(r.wch)}if(a.charAt(a.length-1)!=" ")e.push(a)})}function u(e,r){r.forEach(function(r,t){var a="F;";if(r.hidden)a+="M0;";else if(r.hpt)a+="M"+20*r.hpt+";";else if(r.hpx)a+="M"+20*Ul(r.hpx)+";";if(a.length>2)e.push(a+"R"+(t+1))})}function h(e,r,t){var a=["ID;PSheetJS;N;E"],n=[];var i=Wa(e["!ref"]),s;var f=Array.isArray(e);var c="\r\n";var h=(((t||{}).Workbook||{}).WBProps||{}).date1904;a.push("P;PGeneral");a.push("F;P0;DG0G8;M255");if(e["!cols"])o(a,e["!cols"]);if(e["!rows"])u(a,e["!rows"]);a.push("B;Y"+(i.e.r-i.s.r+1)+";X"+(i.e.c-i.s.c+1)+";D"+[i.s.c,i.s.r,i.e.c,i.e.r].join(" "));a.push("O;L;D;B"+(h?";V4":"")+";K47;G100 0.001");for(var d=i.s.r;d<=i.e.r;++d){for(var v=i.s.c;v<=i.e.c;++v){var p=Pa({r:d,c:v});s=f?(e[d]||[])[v]:e[p];if(!s||s.v==null&&(!s.f||s.F))continue;n.push(l(s,e,d,v,r))}}return a.join(c)+c+n.join(c)+c+"E"+c}return{to_workbook:f,from_sheet:h}}();var Cc=function(){function e(e,t){switch(t.type){case"base64":return r(T(e),t);case"binary":return r(e,t);case"buffer":return r(E&&Buffer.isBuffer(e)?e.toString("binary"):C(e),t);case"array":return r(kr(e),t);}throw new Error("Unrecognized type "+t.type)}function r(e,r){var t=e.split("\n"),a=-1,n=-1,i=0,s=[];for(;i!==t.length;++i){if(t[i].trim()==="BOT"){s[++a]=[];n=0;continue}if(a<0)continue;var f=t[i].trim().split(",");var c=f[0],l=f[1];++i;var o=t[i]||"";while((o.match(/["]/g)||[]).length&1&&i<t.length-1)o+="\n"+t[++i];o=o.trim();switch(+c){case-1:if(o==="BOT"){s[++a]=[];n=0;continue}else if(o!=="EOD")throw new Error("Unrecognized DIF special command "+o);break;case 0:if(o==="TRUE")s[a][n]=true;else if(o==="FALSE")s[a][n]=false;else if(!isNaN(yr(l)))s[a][n]=yr(l);else if(!isNaN(xr(l).getDate()))s[a][n]=wr(l);else s[a][n]=l;++n;break;case 1:o=o.slice(1,o.length-1);o=o.replace(/""/g,'"');if(g&&o&&o.match(/^=".*"$/))o=o.slice(2,-1);s[a][n++]=o!==""?o:null;break;}if(o==="EOD")break}if(r&&r.sheetRows)s=s.slice(0,r.sheetRows);return s}function t(r,t){return $a(e(r,t),t)}function a(e,r){return Va(t(e,r),r)}var n=function(){var e=function t(e,r,a,n,i){e.push(r);e.push(a+","+n);e.push('"'+i.replace(/"/g,'""')+'"')};var r=function a(e,r,t,n){e.push(r+","+t);e.push(r==1?'"'+n.replace(/"/g,'""')+'"':n)};return function n(t){var a=[];var n=Wa(t["!ref"]),i;var s=Array.isArray(t);e(a,"TABLE",0,1,"sheetjs");e(a,"VECTORS",0,n.e.r-n.s.r+1,"");e(a,"TUPLES",0,n.e.c-n.s.c+1,"");e(a,"DATA",0,0,"");for(var f=n.s.r;f<=n.e.r;++f){r(a,-1,0,"BOT");for(var c=n.s.c;c<=n.e.c;++c){var l=Pa({r:f,c:c});i=s?(t[f]||[])[c]:t[l];if(!i){r(a,1,0,"");continue}switch(i.t){case"n":var o=g?i.w:i.v;if(!o&&i.v!=null)o=i.v;if(o==null){if(g&&i.f&&!i.F)r(a,1,0,"="+i.f);else r(a,1,0,"")}else r(a,0,o,"V");break;case"b":r(a,0,i.v?1:0,i.v?"TRUE":"FALSE");break;case"s":r(a,1,0,!g||isNaN(i.v)?i.v:'="'+i.v+'"');break;case"d":if(!i.w)i.w=We(i.z||Y[14],or(wr(i.v)));if(g)r(a,0,i.w,"V");else r(a,1,0,i.w);break;default:r(a,1,0,"");}}}r(a,-1,0,"EOD");var u="\r\n";var h=a.join(u);return h}}();return{to_workbook:a,to_sheet:t,from_sheet:n}}();var Oc=function(){function e(e){return e.replace(/\\b/g,"\\").replace(/\\c/g,":").replace(/\\n/g,"\n")}function r(e){return e.replace(/\\/g,"\\b").replace(/:/g,"\\c").replace(/\n/g,"\\n")}function t(r,t){var a=r.split("\n"),n=-1,i=-1,s=0,f=[];for(;s!==a.length;++s){var c=a[s].trim().split(":");if(c[0]!=="cell")continue;var l=Da(c[1]);if(f.length<=l.r)for(n=f.length;n<=l.r;++n)if(!f[n])f[n]=[];n=l.r;i=l.c;switch(c[2]){case"t":f[n][i]=e(c[3]);break;case"v":f[n][i]=+c[3];break;case"vtf":var o=c[c.length-1];case"vtc":switch(c[3]){case"nl":f[n][i]=+c[4]?true:false;break;default:f[n][i]=+c[4];break;}if(c[2]=="vtf")f[n][i]=[f[n][i],o];}}if(t&&t.sheetRows)f=f.slice(0,t.sheetRows);return f}function a(e,r){return $a(t(e,r),r)}function n(e,r){return Va(a(e,r),r)}var i=["socialcalc:version:1.5","MIME-Version: 1.0","Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n");var s=["--SocialCalcSpreadsheetControlSave","Content-type: text/plain; charset=UTF-8"].join("\n")+"\n";var f=["# SocialCalc Spreadsheet Control Save","part:sheet"].join("\n");var c="--SocialCalcSpreadsheetControlSave--";function l(e){if(!e||!e["!ref"])return"";var t=[],a=[],n,i="";var s=La(e["!ref"]);var f=Array.isArray(e);for(var c=s.s.r;c<=s.e.r;++c){for(var l=s.s.c;l<=s.e.c;++l){i=Pa({r:c,c:l});n=f?(e[c]||[])[l]:e[i];if(!n||n.v==null||n.t==="z")continue;a=["cell",i,"t"];switch(n.t){case"s":;case"str":a.push(r(n.v));break;case"n":if(!n.f){a[2]="v";a[3]=n.v}else{a[2]="vtf";a[3]="n";a[4]=n.v;a[5]=r(n.f)}break;case"b":a[2]="vt"+(n.f?"f":"c");a[3]="nl";a[4]=n.v?"1":"0";a[5]=r(n.f||(n.v?"TRUE":"FALSE"));break;case"d":var o=or(wr(n.v));a[2]="vtc";a[3]="nd";a[4]=""+o;a[5]=n.w||We(n.z||Y[14],o);break;case"e":continue;}t.push(a.join(":"))}}t.push("sheet:c:"+(s.e.c-s.s.c+1)+":r:"+(s.e.r-s.s.r+1)+":tvf:1");t.push("valueformat:1:text-wiki");return t.join("\n")}function o(e){return[i,s,f,s,l(e),c].join("\n")}return{to_workbook:n,to_sheet:a,from_sheet:o}}();var Rc=function(){function e(e,r,t,a,n){if(n.raw)r[t][a]=e;else if(e===""){}else if(e==="TRUE")r[t][a]=true;else if(e==="FALSE")r[t][a]=false;else if(!isNaN(yr(e)))r[t][a]=yr(e);else if(!isNaN(xr(e).getDate()))r[t][a]=wr(e);else r[t][a]=e}function r(r,t){var a=t||{};var n=[];if(!r||r.length===0)return n;var i=r.split(/[\r\n]/);var s=i.length-1;while(s>=0&&i[s].length===0)--s;var f=10,c=0;var l=0;for(;l<=s;++l){c=i[l].indexOf(" ");if(c==-1)c=i[l].length;else c++;f=Math.max(f,c)}for(l=0;l<=s;++l){n[l]=[];var o=0;e(i[l].slice(0,f).trim(),n,l,o,a);for(o=1;o<=(i[l].length-f)/10+1;++o)e(i[l].slice(f+(o-1)*10,f+o*10).trim(),n,l,o,a)}if(a.sheetRows)n=n.slice(0,a.sheetRows);return n}var t={44:",",9:"\t",59:";",124:"|"};var n={44:3,9:2,59:1,124:0};function i(e){var r={},a=false,i=0,s=0;for(;i<e.length;++i){if((s=e.charCodeAt(i))==34)a=!a;else if(!a&&s in t)r[s]=(r[s]||0)+1}s=[];for(i in r)if(Object.prototype.hasOwnProperty.call(r,i)){s.push([r[i],i])}if(!s.length){r=n;for(i in r)if(Object.prototype.hasOwnProperty.call(r,i)){s.push([r[i],i])}}s.sort(function(e,r){return e[0]-r[0]||n[e[1]]-n[r[1]]});return t[s.pop()[1]]||44}function s(e,r){var t=r||{};var a="";if(b!=null&&t.dense==null)t.dense=b;var n=t.dense?[]:{};var s={s:{c:0,r:0},e:{c:0,r:0}};if(e.slice(0,4)=="sep="){if(e.charCodeAt(5)==13&&e.charCodeAt(6)==10){a=e.charAt(4);e=e.slice(7)}else if(e.charCodeAt(5)==13||e.charCodeAt(5)==10){a=e.charAt(4);e=e.slice(6)}else a=i(e.slice(0,1024))}else if(t&&t.FS)a=t.FS;else a=i(e.slice(0,1024));var f=0,c=0,l=0;var o=0,u=0,h=a.charCodeAt(0),d=false,v=0,p=e.charCodeAt(0);var m=t.dateNF!=null?Xe(t.dateNF):null;function g(){var r=e.slice(o,u);if(r.slice(-1)=="\r")r=r.slice(0,-1);var a={};if(r.charAt(0)=='"'&&r.charAt(r.length-1)=='"')r=r.slice(1,-1).replace(/""/g,'"');if(r.length===0)a.t="z";else if(t.raw){a.t="s";a.v=r}else if(r.trim().length===0){a.t="s";a.v=r}else if(r.charCodeAt(0)==61){if(r.charCodeAt(1)==34&&r.charCodeAt(r.length-1)==34){a.t="s";a.v=r.slice(2,-1).replace(/""/g,'"')}else if(Lu(r)){a.t="n";a.f=r.slice(1)}else{a.t="s";a.v=r}}else if(r=="TRUE"){a.t="b";a.v=true}else if(r=="FALSE"){a.t="b";a.v=false}else if(!isNaN(l=yr(r))){a.t="n";if(t.cellText!==false)a.w=r;a.v=l}else if(!isNaN(xr(r).getDate())||m&&r.match(m)){a.z=t.dateNF||Y[14];var i=0;if(m&&r.match(m)){r=Ye(r,t.dateNF,r.match(m)||[]);i=1}if(t.cellDates){a.t="d";a.v=wr(r,i)}else{a.t="n";a.v=or(wr(r,i))}if(t.cellText!==false)a.w=We(a.z,a.v instanceof Date?or(a.v):a.v);if(!t.cellNF)delete a.z}else{a.t="s";a.v=r}if(a.t=="z"){}else if(t.dense){if(!n[f])n[f]=[];n[f][c]=a}else n[Pa({c:c,r:f})]=a;o=u+1;p=e.charCodeAt(o);if(s.e.c<c)s.e.c=c;if(s.e.r<f)s.e.r=f;if(v==h)++c;else{c=0;++f;if(t.sheetRows&&t.sheetRows<=f)return true}}e:for(;u<e.length;++u)switch(v=e.charCodeAt(u)){case 34:if(p===34)d=!d;break;case 13:if(d)break;if(e.charCodeAt(u+1)==10)++u;case h:;case 10:if(!d&&g())break e;break;default:break;}if(u-o>0)g();n["!ref"]=Ma(s);return n}function f(e,t){if(!(t&&t.PRN))return s(e,t);if(t.FS)return s(e,t);if(e.slice(0,4)=="sep=")return s(e,t);if(e.indexOf("\t")>=0||e.indexOf(",")>=0||e.indexOf(";")>=0)return s(e,t);return $a(r(e,t),t)}function c(e,r){var t="",n=r.type=="string"?[0,0,0,0]:hw(e,r);switch(r.type){case"base64":t=T(e);break;case"binary":t=e;break;case"buffer":if(r.codepage==65001)t=e.toString("utf8");else if(r.codepage&&typeof a!=="undefined")t=a.utils.decode(r.codepage,e);else t=E&&Buffer.isBuffer(e)?e.toString("binary"):C(e);break;case"array":t=kr(e);break;case"string":t=e;break;default:throw new Error("Unrecognized type "+r.type);}if(n[0]==239&&n[1]==187&&n[2]==191)t=vt(t.slice(3));else if(r.type!="string"&&r.type!="buffer"&&r.codepage==65001)t=vt(t);else if(r.type=="binary"&&typeof a!=="undefined"&&r.codepage)t=a.utils.decode(r.codepage,a.utils.encode(28591,t));if(t.slice(0,19)=="socialcalc:version:")return Oc.to_sheet(r.type=="string"?t:vt(t),r);return f(t,r)}function l(e,r){return Va(c(e,r),r)}function o(e){var r=[];var t=Wa(e["!ref"]),a;var n=Array.isArray(e);for(var i=t.s.r;i<=t.e.r;++i){var s=[];for(var f=t.s.c;f<=t.e.c;++f){var c=Pa({r:i,c:f});a=n?(e[i]||[])[f]:e[c];if(!a||a.v==null){s.push("          ");continue}var l=(a.w||(za(a),a.w)||"").slice(0,10);while(l.length<10)l+=" ";s.push(l+(f===0?" ":""))}r.push(s.join(""))}return r.join("\n")}return{to_workbook:l,to_sheet:c,from_sheet:o}}();function Nc(e,r){var t=r||{},a=!!t.WTF;t.WTF=true;try{var n=xc.to_workbook(e,t);t.WTF=a;return n}catch(i){t.WTF=a;if(!i.message.match(/SYLK bad record ID/)&&a)throw i;return Rc.to_workbook(e,r)}}var Ic=function(){function e(e,r,t){if(!e)return;pa(e,e.l||0);var a=t.Enum||H;while(e.l<e.length){var n=e._R(2);var i=a[n]||a[65535];var s=e._R(2);var f=e.l+s;var c=i.f&&i.f(e,s,t);e.l=f;if(r(c,i,n))return}}function r(e,r){switch(r.type){case"base64":return t(A(T(e)),r);case"binary":return t(A(e),r);case"buffer":;case"array":return t(e,r);}throw"Unsupported type "+r.type}function t(r,t){if(!r)return r;var a=t||{};if(b!=null&&a.dense==null)a.dense=b;var n=a.dense?[]:{},i="Sheet1",s="",f=0;var c={},l=[],o=[];var u={s:{r:0,c:0},e:{r:0,c:0}};var h=a.sheetRows||0;if(r[4]==81&&r[5]==80&&r[6]==87)return V(r,t);if(r[2]==0){if(r[3]==8||r[3]==9){if(r.length>=16&&r[14]==5&&r[15]===108)throw new Error("Unsupported Works 3 for Mac file")}}if(r[2]==2){a.Enum=H;e(r,function(e,r,t){switch(t){case 0:a.vers=e;if(e>=4096)a.qpro=true;break;case 255:a.vers=e;a.works=true;break;case 6:u=e;break;case 204:if(e)s=e;break;case 222:s=e;break;case 15:;case 51:if((!a.qpro&&!a.works||t==51)&&e[1].v.charCodeAt(0)<48)e[1].v=e[1].v.slice(1);if(a.works||a.works2)e[1].v=e[1].v.replace(/\r\n/g,"\n");case 13:;case 14:;case 16:if(t==14&&(e[2]&112)==112&&(e[2]&15)>1&&(e[2]&15)<15){e[1].z=a.dateNF||Y[14];if(a.cellDates){e[1].t="d";e[1].v=vr(e[1].v)}}if(a.qpro){if(e[3]>f){n["!ref"]=Ma(u);c[i]=n;l.push(i);n=a.dense?[]:{};u={s:{r:0,c:0},e:{r:0,c:0}};f=e[3];i=s||"Sheet"+(f+1);s=""}}var o=a.dense?(n[e[0].r]||[])[e[0].c]:n[Pa(e[0])];if(o){o.t=e[1].t;o.v=e[1].v;if(e[1].z!=null)o.z=e[1].z;if(e[1].f!=null)o.f=e[1].f;break}if(a.dense){if(!n[e[0].r])n[e[0].r]=[];n[e[0].r][e[0].c]=e[1]}else n[Pa(e[0])]=e[1];break;case 21509:a.works2=true;break;default:;}},a)}else if(r[2]==26||r[2]==14){a.Enum=z;if(r[2]==14){a.qpro=true;r.l=0}e(r,function(e,r,t){switch(t){case 204:i=e;break;case 22:if(e[1].v.charCodeAt(0)<48)e[1].v=e[1].v.slice(1);e[1].v=e[1].v.replace(/\x0F./g,function(e){return String.fromCharCode(e.charCodeAt(1)-32)}).replace(/\r\n/g,"\n");case 23:;case 24:;case 25:;case 37:;case 39:;case 40:if(e[3]>f){n["!ref"]=Ma(u);c[i]=n;l.push(i);n=a.dense?[]:{};u={s:{r:0,c:0},e:{r:0,c:0}};f=e[3];i="Sheet"+(f+1)}if(h>0&&e[0].r>=h)break;if(a.dense){if(!n[e[0].r])n[e[0].r]=[];n[e[0].r][e[0].c]=e[1]}else n[Pa(e[0])]=e[1];if(u.e.c<e[0].c)u.e.c=e[0].c;if(u.e.r<e[0].r)u.e.r=e[0].r;break;case 27:if(e[14e3])o[e[14e3][0]]=e[14e3][1];break;case 1537:o[e[0]]=e[1];if(e[0]==f)i=e[1];break;default:break;}},a)}else throw new Error("Unrecognized LOTUS BOF "+r[2]);n["!ref"]=Ma(u);c[s||i]=n;l.push(s||i);if(!o.length)return{SheetNames:l,Sheets:c};var d={},v=[];for(var p=0;p<o.length;++p)if(c[l[p]]){v.push(o[p]||l[p]);d[o[p]]=c[o[p]]||c[l[p]]}else{v.push(o[p]);d[o[p]]={"!ref":"A1"}}return{SheetNames:v,Sheets:d}}function a(e,r){var t=r||{};if(+t.codepage>=0)c(+t.codepage);if(t.type=="string")throw new Error("Cannot write WK1 to JS string");var a=wa();var n=Wa(e["!ref"]);var s=Array.isArray(e);var f=[];Rb(a,0,i(1030));Rb(a,6,l(n));var o=Math.min(n.e.r,8191);for(var u=n.s.r;u<=o;++u){var d=Aa(u);for(var v=n.s.c;v<=n.e.c;++v){if(u===n.s.r)f[v]=Ra(v);var m=f[v]+d;var b=s?(e[u]||[])[v]:e[m];if(!b||b.t=="z")continue;if(b.t=="n"){if((b.v|0)==b.v&&b.v>=-32768&&b.v<=32767)Rb(a,13,p(u,v,b.v));else Rb(a,14,g(u,v,b.v))}else{var w=za(b);Rb(a,15,h(u,v,w.slice(0,239)))}}}Rb(a,1);return a.end()}function n(e,r){var t=r||{};if(+t.codepage>=0)c(+t.codepage);if(t.type=="string")throw new Error("Cannot write WK3 to JS string");var a=wa();Rb(a,0,s(e));for(var n=0,i=0;n<e.SheetNames.length;++n)if((e.Sheets[e.SheetNames[n]]||{})["!ref"])Rb(a,27,W(e.SheetNames[n],i++));var f=0;for(n=0;n<e.SheetNames.length;++n){var l=e.Sheets[e.SheetNames[n]];if(!l||!l["!ref"])continue;var o=Wa(l["!ref"]);var u=Array.isArray(l);var h=[];var d=Math.min(o.e.r,8191);for(var v=o.s.r;v<=d;++v){var p=Aa(v);for(var m=o.s.c;m<=o.e.c;++m){if(v===o.s.r)h[m]=Ra(m);var b=h[m]+p;var g=u?(l[v]||[])[m]:l[b];if(!g||g.t=="z")continue;if(g.t=="n"){Rb(a,23,N(v,m,f,g.v))}else{var w=za(g);Rb(a,22,C(v,m,f,w.slice(0,239)))}}}++f}Rb(a,1);return a.end()}function i(e){var r=ba(2);r._W(2,e);return r}function s(e){var r=ba(26);r._W(2,4096);r._W(2,4);r._W(4,0);var t=0,a=0,n=0;for(var i=0;i<e.SheetNames.length;++i){var s=e.SheetNames[i];var f=e.Sheets[s];if(!f||!f["!ref"])continue;++n;var c=La(f["!ref"]);if(t<c.e.r)t=c.e.r;if(a<c.e.c)a=c.e.c}if(t>8191)t=8191;r._W(2,t);r._W(1,n);r._W(1,a);r._W(2,0);r._W(2,0);r._W(1,1);r._W(1,2);r._W(4,0);r._W(4,0);return r}function f(e,r,t){var a={s:{c:0,r:0},e:{c:0,r:0}};if(r==8&&t.qpro){a.s.c=e._R(1);e.l++;a.s.r=e._R(2);a.e.c=e._R(1);e.l++;a.e.r=e._R(2);return a}a.s.c=e._R(2);a.s.r=e._R(2);if(r==12&&t.qpro)e.l+=2;a.e.c=e._R(2);a.e.r=e._R(2);if(r==12&&t.qpro)e.l+=2;if(a.s.c==65535)a.s.c=a.e.c=a.s.r=a.e.r=0;return a}function l(e){var r=ba(8);r._W(2,e.s.c);r._W(2,e.s.r);r._W(2,e.e.c);r._W(2,e.e.r);return r}function o(e,r,t){var a=[{c:0,r:0},{t:"n",v:0},0,0];if(t.qpro&&t.vers!=20768){a[0].c=e._R(1);a[3]=e._R(1);a[0].r=e._R(2);e.l+=2}else if(t.works){a[0].c=e._R(2);a[0].r=e._R(2);a[2]=e._R(2)}else{a[2]=e._R(1);a[0].c=e._R(2);a[0].r=e._R(2)}return a}function u(e,r,t){var a=e.l+r;var n=o(e,r,t);n[1].t="s";if(t.vers==20768){e.l++;var i=e._R(1);n[1].v=e._R(i,"utf8");return n}if(t.qpro)e.l++;n[1].v=e._R(a-e.l,"cstr");return n}function h(e,r,t){var a=ba(7+t.length);a._W(1,255);a._W(2,r);a._W(2,e);a._W(1,39);for(var n=0;n<a.length;++n){var i=t.charCodeAt(n);a._W(1,i>=128?95:i)}a._W(1,0);return a}function d(e,r,t){var a=e.l+r;var n=o(e,r,t);n[1].t="s";if(t.vers==20768){var i=e._R(1);n[1].v=e._R(i,"utf8");return n}n[1].v=e._R(a-e.l,"cstr");return n}function v(e,r,t){var a=o(e,r,t);a[1].v=e._R(2,"i");return a}function p(e,r,t){var a=ba(7);a._W(1,255);a._W(2,r);a._W(2,e);a._W(2,t,"i");return a}function m(e,r,t){var a=o(e,r,t);a[1].v=e._R(8,"f");return a}function g(e,r,t){var a=ba(13);a._W(1,255);a._W(2,r);a._W(2,e);a._W(8,t,"f");return a}function w(e,r,t){var a=e.l+r;var n=o(e,r,t);n[1].v=e._R(8,"f");if(t.qpro)e.l=a;else{var i=e._R(2);S(e.slice(e.l,e.l+i),n);e.l+=i}return n}function k(e,r,t){var a=r&32768;r&=~32768;r=(a?e:0)+(r>=8192?r-16384:r);return(a?"":"$")+(t?Ra(r):Aa(r))}var E={31:["NA",0],33:["ABS",1],34:["TRUNC",1],35:["SQRT",1],36:["LOG",1],37:["LN",1],38:["PI",0],39:["SIN",1],40:["COS",1],41:["TAN",1],42:["ATAN2",2],43:["ATAN",1],44:["ASIN",1],45:["ACOS",1],46:["EXP",1],47:["MOD",2],49:["ISNA",1],50:["ISERR",1],51:["FALSE",0],52:["TRUE",0],53:["RAND",0],63:["ROUND",2],68:["ISNUMBER",1],69:["ISTEXT",1],70:["LEN",1],71:["VALUE",1],73:["MID",3],74:["CHAR",1],80:["SUM",69],81:["AVERAGEA",69],82:["COUNTA",69],83:["MINA",69],84:["MAXA",69],102:["UPPER",1],103:["LOWER",1],107:["PROPER",1],109:["TRIM",1],111:["T",1]};var y=["","","","","","","","","","+","-","*","/","^","=","<>","<=",">=","<",">","","","","","&","","","","","","",""];function S(e,r){pa(e,0);var t=[],a=0,n="",i="",s="",f="";while(e.l<e.length){var c=e[e.l++];switch(c){case 0:t.push(e._R(8,"f"));break;case 1:{i=k(r[0].c,e._R(2),true);n=k(r[0].r,e._R(2),false);t.push(i+n)}break;case 2:{var l=k(r[0].c,e._R(2),true);var o=k(r[0].r,e._R(2),false);i=k(r[0].c,e._R(2),true);n=k(r[0].r,e._R(2),false);t.push(l+o+":"+i+n)}break;case 3:if(e.l<e.length){console.error("WK1 premature formula end");return}break;case 4:t.push("("+t.pop()+")");break;case 5:t.push(e._R(2));break;case 6:{var u="";while(c=e[e.l++])u+=String.fromCharCode(c);t.push('"'+u.replace(/"/g,'""')+'"')}break;case 8:t.push("-"+t.pop());break;case 23:t.push("+"+t.pop());break;case 22:t.push("NOT("+t.pop()+")");break;case 20:;case 21:{f=t.pop();s=t.pop();t.push(["AND","OR"][c-20]+"("+s+","+f+")")}break;default:if(c<32&&y[c]){f=t.pop();s=t.pop();t.push(s+y[c]+f)}else if(E[c]){a=E[c][1];if(a==69)a=e[e.l++];if(a>t.length){console.error("WK1 bad formula parse 0x"+c.toString(16)+":|"+t.join("|")+"|");return}var h=t.slice(-a);t.length-=a;t.push(E[c][0]+"("+h.join(",")+")")}else if(c<=7)return console.error("WK1 invalid opcode "+c.toString(16));else if(c<=24)return console.error("WK1 unsupported op "+c.toString(16));else if(c<=30)return console.error("WK1 invalid opcode "+c.toString(16));else if(c<=115)return console.error("WK1 unsupported function opcode "+c.toString(16));else return console.error("WK1 unrecognized opcode "+c.toString(16));}}if(t.length==1)r[1].f=""+t[0];else console.error("WK1 bad formula parse |"+t.join("|")+"|")}function _(e){var r=[{c:0,r:0},{t:"n",v:0},0];r[0].r=e._R(2);r[3]=e[e.l++];r[0].c=e[e.l++];return r}function x(e,r){var t=_(e,r);t[1].t="s";t[1].v=e._R(r-4,"cstr");return t}function C(e,r,t,a){var n=ba(6+a.length);n._W(2,e);n._W(1,t);n._W(1,r);n._W(1,39);for(var i=0;i<a.length;++i){var s=a.charCodeAt(i);n._W(1,s>=128?95:s)}n._W(1,0);return n}function O(e,r){var t=_(e,r);t[1].v=e._R(2);var a=t[1].v>>1;if(t[1].v&1){switch(a&7){case 0:a=(a>>3)*5e3;break;case 1:a=(a>>3)*500;break;case 2:a=(a>>3)/20;break;case 3:a=(a>>3)/200;break;case 4:a=(a>>3)/2e3;break;case 5:a=(a>>3)/2e4;break;case 6:a=(a>>3)/16;break;case 7:a=(a>>3)/64;break;}}t[1].v=a;return t}function R(e,r){var t=_(e,r);var a=e._R(4);var n=e._R(4);var i=e._R(2);if(i==65535){if(a===0&&n===3221225472){t[1].t="e";t[1].v=15}else if(a===0&&n===3489660928){t[1].t="e";t[1].v=42}else t[1].v=0;return t}var s=i&32768;i=(i&32767)-16446;t[1].v=(1-s*2)*(n*Math.pow(2,i+32)+a*Math.pow(2,i));return t}function N(e,r,t,a){var n=ba(14);n._W(2,e);n._W(1,t);n._W(1,r);if(a==0){n._W(4,0);n._W(4,0);n._W(2,65535);return n}var i=0,s=0,f=0,c=0;if(a<0){i=1;a=-a}s=Math.log2(a)|0;a/=Math.pow(2,s-31);c=a>>>0;if((c&2147483648)==0){a/=2;++s;c=a>>>0}a-=c;c|=2147483648;c>>>=0;a*=Math.pow(2,32);f=a>>>0;n._W(4,f);n._W(4,c);s+=16383+(i?32768:0);n._W(2,s);return n}function I(e,r){var t=R(e,14);e.l+=r-14;return t}function F(e,r){var t=_(e,r);var a=e._R(4);t[1].v=a>>6;return t}function D(e,r){var t=_(e,r);var a=e._R(8,"f");t[1].v=a;return t}function P(e,r){var t=D(e,12);e.l+=r-12;return t}function L(e,r){return e[e.l+r-1]==0?e._R(r,"cstr"):""}function M(e,r){var t=e[e.l++];if(t>r-1)t=r-1;var a="";while(a.length<t)a+=String.fromCharCode(e[e.l++]);return a}function U(e,r,t){if(!t.qpro||r<21)return;var a=e._R(1);e.l+=17;e.l+=1;e.l+=2;var n=e._R(r-21,"cstr");return[a,n]}function B(e,r){var t={},a=e.l+r;while(e.l<a){var n=e._R(2);if(n==14e3){t[n]=[0,""];t[n][0]=e._R(2);while(e[e.l]){t[n][1]+=String.fromCharCode(e[e.l]);e.l++}e.l++}}return t}function W(e,r){var t=ba(5+e.length);t._W(2,14e3);t._W(2,r);for(var a=0;a<e.length;++a){var n=e.charCodeAt(a);t[t.l++]=n>127?95:n}t[t.l++]=0;return t}var H={0:{n:"BOF",f:ss},1:{n:"EOF"},2:{n:"CALCMODE"},3:{n:"CALCORDER"},4:{n:"SPLIT"},5:{n:"SYNC"},6:{n:"RANGE",f:f},7:{n:"WINDOW1"},8:{n:"COLW1"},9:{n:"WINTWO"},10:{n:"COLW2"},11:{n:"NAME"},12:{n:"BLANK"},13:{n:"INTEGER",f:v},14:{n:"NUMBER",f:m},15:{n:"LABEL",f:u},16:{n:"FORMULA",f:w},24:{n:"TABLE"},25:{n:"ORANGE"},26:{n:"PRANGE"},27:{n:"SRANGE"},28:{n:"FRANGE"},29:{n:"KRANGE1"},32:{n:"HRANGE"},35:{n:"KRANGE2"},36:{n:"PROTEC"},37:{n:"FOOTER"},38:{n:"HEADER"},39:{n:"SETUP"},40:{n:"MARGINS"},41:{n:"LABELFMT"},42:{n:"TITLES"},43:{n:"SHEETJS"},45:{n:"GRAPH"},46:{n:"NGRAPH"},47:{n:"CALCCOUNT"},48:{n:"UNFORMATTED"},49:{n:"CURSORW12"},50:{n:"WINDOW"},51:{n:"STRING",f:d},55:{n:"PASSWORD"},56:{n:"LOCKED"},60:{n:"QUERY"},61:{n:"QUERYNAME"},62:{n:"PRINT"},63:{n:"PRINTNAME"},64:{n:"GRAPH2"},65:{n:"GRAPHNAME"},66:{n:"ZOOM"},67:{n:"SYMSPLIT"},68:{n:"NSROWS"},69:{n:"NSCOLS"},70:{n:"RULER"},71:{n:"NNAME"},72:{n:"ACOMM"},73:{n:"AMACRO"},74:{n:"PARSE"},102:{n:"PRANGES??"},103:{n:"RRANGES??"},104:{n:"FNAME??"},105:{n:"MRANGES??"},204:{n:"SHEETNAMECS",f:L},222:{n:"SHEETNAMELP",f:M},255:{n:"BOF",f:ss},65535:{n:""}};var z={0:{n:"BOF"},1:{n:"EOF"},2:{n:"PASSWORD"},3:{n:"CALCSET"},4:{n:"WINDOWSET"},5:{n:"SHEETCELLPTR"},6:{n:"SHEETLAYOUT"},7:{n:"COLUMNWIDTH"},8:{n:"HIDDENCOLUMN"},9:{n:"USERRANGE"},10:{n:"SYSTEMRANGE"},11:{n:"ZEROFORCE"},12:{n:"SORTKEYDIR"},13:{n:"FILESEAL"},14:{n:"DATAFILLNUMS"},15:{n:"PRINTMAIN"},16:{n:"PRINTSTRING"},17:{n:"GRAPHMAIN"},18:{n:"GRAPHSTRING"},19:{n:"??"},20:{n:"ERRCELL"},21:{n:"NACELL"},22:{n:"LABEL16",f:x},23:{n:"NUMBER17",f:R},24:{n:"NUMBER18",f:O},25:{n:"FORMULA19",f:I},26:{n:"FORMULA1A"},27:{n:"XFORMAT",f:B},28:{n:"DTLABELMISC"},29:{n:"DTLABELCELL"},30:{n:"GRAPHWINDOW"},31:{n:"CPA"},32:{n:"LPLAUTO"},33:{n:"QUERY"},34:{n:"HIDDENSHEET"},35:{n:"??"},37:{n:"NUMBER25",f:F},38:{n:"??"},39:{n:"NUMBER27",f:D},40:{n:"FORMULA28",f:P},142:{n:"??"},147:{n:"??"},150:{n:"??"},151:{n:"??"},152:{n:"??"},153:{n:"??"},154:{n:"??"},155:{n:"??"},156:{n:"??"},163:{n:"??"},174:{n:"??"},175:{n:"??"},176:{n:"??"},177:{n:"??"},184:{n:"??"},185:{n:"??"},186:{n:"??"},187:{n:"??"},188:{n:"??"},195:{n:"??"},201:{n:"??"},204:{n:"SHEETNAMECS",f:L},205:{n:"??"},206:{n:"??"},207:{n:"??"},208:{n:"??"},256:{n:"??"},259:{n:"??"},260:{n:"??"},261:{n:"??"},262:{n:"??"},263:{n:"??"},265:{n:"??"},266:{n:"??"},267:{n:"??"},268:{n:"??"},270:{n:"??"},271:{n:"??"},384:{n:"??"},389:{n:"??"},390:{n:"??"},393:{n:"??"},396:{n:"??"},512:{n:"??"},514:{n:"??"},513:{n:"??"},516:{n:"??"},517:{n:"??"},640:{n:"??"},641:{n:"??"},642:{n:"??"},643:{n:"??"},644:{n:"??"},645:{n:"??"},646:{n:"??"},647:{n:"??"},648:{n:"??"},658:{n:"??"},659:{n:"??"},660:{n:"??"},661:{n:"??"},662:{n:"??"},665:{n:"??"},666:{n:"??"},768:{n:"??"},772:{n:"??"},1537:{n:"SHEETINFOQP",f:U},1600:{n:"??"},1602:{n:"??"},1793:{n:"??"},1794:{n:"??"},1795:{n:"??"},1796:{n:"??"},1920:{n:"??"},2048:{n:"??"},2049:{n:"??"},2052:{n:"??"},2688:{n:"??"},10998:{n:"??"},12849:{n:"??"},28233:{n:"??"},28484:{n:"??"},65535:{n:""}};function V(e,r){pa(e,0);var t=r||{};if(b!=null&&t.dense==null)t.dense=b;var a=t.dense?[]:{};var n=[],i="",s=[];var f={s:{r:-1,c:-1},e:{r:-1,c:-1}};var c=0,l=0,o=0,u=0;var h={SheetNames:[],Sheets:{}};e:while(e.l<e.length){var d=e._R(2),v=e._R(2);var p=e.slice(e.l,e.l+v);pa(p,0);switch(d){case 1:if(p._R(4)!=962023505)throw"Bad QPW9 BOF!";break;case 2:break e;case 1025:break;case 1026:break;case 1031:{p.l+=12;while(p.l<p.length){c=p._R(2);l=p._R(1);n.push(p._R(c,"cstr"))}}break;case 1032:{}break;case 1537:{var m=p._R(2);a=t.dense?[]:{};f.s.c=p._R(2);f.e.c=p._R(2);f.s.r=p._R(4);f.e.r=p._R(4);p.l+=4;if(p.l+2<p.length){c=p._R(2);l=p._R(1);i=c==0?"":p._R(c,"cstr")}if(!i)i=Ra(m)}break;case 1538:{if(f.s.c>255||f.s.r>999999)break;if(f.e.c<f.s.c)f.e.c=f.s.c;if(f.e.r<f.s.r)f.e.r=f.s.r;a["!ref"]=Ma(f);Kw(h,a,i)}break;case 2561:{o=p._R(2);if(f.e.c<o)f.e.c=o;if(f.s.c>o)f.s.c=o;u=p._R(4);if(f.s.r>u)f.s.r=u;u=p._R(4);if(f.e.r<u)f.e.r=u}break;case 3073:{u=p._R(4),c=p._R(4);if(f.s.r>u)f.s.r=u;if(f.e.r<u+c-1)f.e.r=u+c-1;while(p.l<p.length){var g={t:"z"};var w=p._R(1);if(w&128)p.l+=2;var k=w&64?p._R(2)-1:0;switch(w&31){case 1:break;case 2:g={t:"n",v:p._R(2)};break;case 3:g={t:"n",v:p._R(2,"i")};break;case 5:g={t:"n",v:p._R(8,"f")};break;case 7:g={t:"s",v:n[l=p._R(4)-1]};break;case 8:g={t:"n",v:p._R(8,"f")};p.l+=2;p.l+=4;break;default:throw"Unrecognized QPW cell type "+(w&31);}var T=0;if(w&32)switch(w&31){case 2:T=p._R(2);break;case 3:T=p._R(2,"i");break;case 7:T=p._R(2);break;default:throw"Unsupported delta for QPW cell type "+(w&31);}if(!(!t.sheetStubs&&g.t=="z")){if(Array.isArray(a)){if(!a[u])a[u]=[];a[u][o]=g}else a[Pa({r:u,c:o})]=g}++u;--c;while(k-- >0&&c>=0){if(w&32)switch(w&31){case 2:g={t:"n",v:g.v+T&65535};break;case 3:g={t:"n",v:g.v+T&65535};if(g.v>32767)g.v-=65536;break;case 7:g={t:"s",v:n[l=l+T>>>0]};break;default:throw"Cannot apply delta for QPW cell type "+(w&31);}else switch(w&31){case 1:g={t:"z"};break;case 2:g={t:"n",v:p._R(2)};break;case 7:g={t:"s",v:n[l=p._R(4)-1]};break;default:throw"Cannot apply repeat for QPW cell type "+(w&31);}if(!(!t.sheetStubs&&g.t=="z")){if(Array.isArray(a)){if(!a[u])a[u]=[];a[u][o]=g}else a[Pa({r:u,c:o})]=g}++u;--c}}}break;default:break;}e.l+=v}return h}return{sheet_to_wk1:a,book_to_wk3:n,to_workbook:r}}();function Fc(e){var r={},t=e.match(jr),a=0;var n=false;if(t)for(;a!=t.length;++a){var s=Kr(t[a]);switch(s[0].replace(/\w*:/g,"")){case"<condense":break;case"<extend":break;case"<shadow":if(!s.val)break;case"<shadow>":;case"<shadow/>":r.shadow=1;break;case"</shadow>":break;case"<charset":if(s.val=="1")break;r.cp=i[parseInt(s.val,10)];break;case"<outline":if(!s.val)break;case"<outline>":;case"<outline/>":r.outline=1;break;case"</outline>":break;case"<rFont":r.name=s.val;break;case"<sz":r.sz=s.val;break;case"<strike":if(!s.val)break;case"<strike>":;case"<strike/>":r.strike=1;break;case"</strike>":break;case"<u":if(!s.val)break;switch(s.val){case"double":r.uval="double";break;case"singleAccounting":r.uval="single-accounting";break;case"doubleAccounting":r.uval="double-accounting";break;};case"<u>":;case"<u/>":r.u=1;break;case"</u>":break;case"<b":if(s.val=="0")break;case"<b>":;case"<b/>":r.b=1;break;case"</b>":break;case"<i":if(s.val=="0")break;case"<i>":;case"<i/>":r.i=1;break;case"</i>":break;case"<color":if(s.rgb)r.color=s.rgb.slice(2,8);break;case"<color>":;case"<color/>":;case"</color>":break;case"<family":r.family=s.val;break;case"<family>":;case"<family/>":;case"</family>":break;case"<vertAlign":r.valign=s.val;break;case"<vertAlign>":;case"<vertAlign/>":;case"</vertAlign>":break;case"<scheme":break;case"<scheme>":;case"<scheme/>":;case"</scheme>":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":n=true;break;case"</ext>":n=false;break;default:if(s[0].charCodeAt(1)!==47&&!n)throw new Error("Unrecognized rich format "+s[0]);}}return r}var Dc=function(){var e=mt("t"),r=mt("rPr");function t(t){var a=t.match(e);if(!a)return{t:"s",v:""};var n={t:"s",v:Qr(a[1])};var i=t.match(r);if(i)n.s=Fc(i[1]);return n}var a=/<(?:\w+:)?r>/g,n=/<\/(?:\w+:)?r>/;return function i(e){return e.replace(a,"").split(n).map(t).filter(function(e){return e.v})}}();var Pc=function Ak(){var e=/(\r\n|\n)/g;function r(e,r,t){var a=[];if(e.u)a.push("text-decoration: underline;");if(e.uval)a.push("text-underline-style:"+e.uval+";");if(e.sz)a.push("font-size:"+e.sz+"pt;");if(e.outline)a.push("text-effect: outline;");if(e.shadow)a.push("text-shadow: auto;");r.push('<span style="'+a.join("")+'">');if(e.b){r.push("<b>");t.push("</b>")}if(e.i){r.push("<i>");t.push("</i>")}if(e.strike){r.push("<s>");t.push("</s>")}var n=e.valign||"";if(n=="superscript"||n=="super")n="sup";else if(n=="subscript")n="sub";if(n!=""){r.push("<"+n+">");t.push("</"+n+">")}t.push("</span>");return e}function t(t){var a=[[],t.v,[]];if(!t.v)return"";if(t.s)r(t.s,a[0],a[2]);return a[0].join("")+a[1].replace(e,"<br/>")+a[2].join("")}return function a(e){return e.map(t).join("")}}();var Lc=/<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,Mc=/<(?:\w+:)?r>/;var Uc=/<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;function Bc(e,r){var t=r?r.cellHTML:true;var a={};if(!e)return{t:""};if(e.match(/^\s*<(?:\w+:)?t[^>]*>/)){a.t=Qr(vt(e.slice(e.indexOf(">")+1).split(/<\/(?:\w+:)?t>/)[0]||""),true);a.r=vt(e);if(t)a.h=it(a.t)}else if(e.match(Mc)){a.r=vt(e);a.t=Qr(vt((e.replace(Uc,"").match(Lc)||[]).join("").replace(jr,"")),true);if(t)a.h=Pc(Dc(a.r))}return a}var Wc=/<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;var Hc=/<(?:\w+:)?(?:si|sstItem)>/g;var zc=/<\/(?:\w+:)?(?:si|sstItem)>/;function Vc(e,r){var t=[],a="";if(!e)return t;var n=e.match(Wc);if(n){a=n[2].replace(Hc,"").split(zc);for(var i=0;i!=a.length;++i){var s=Bc(a[i].trim(),r);if(s!=null)t[t.length]=s}n=Kr(n[1]);t.Count=n.count;t.Unique=n.uniqueCount}return t}var Gc=/^\s|\s$|[\t\n\r]/;function $c(e,r){if(!r.bookSST)return"";var t=[zr];t[t.length]=_t("sst",null,{xmlns:Nt[0],count:e.Count,uniqueCount:e.Unique});for(var a=0;a!=e.length;++a){if(e[a]==null)continue;var n=e[a];var i="<si>";if(n.r)i+=n.r;else{i+="<t";if(!n.t)n.t="";if(n.t.match(Gc))i+=' xml:space="preserve"';i+=">"+tt(n.t)+"</t>"}i+="</si>";t[t.length]=i}if(t.length>2){t[t.length]="</sst>";t[1]=t[1].replace("/>",">")}return t.join("")}function jc(e){return[e._R(4),e._R(4)]}function Xc(e,r){var t=[];var a=false;ga(e,function n(e,i,s){switch(s){case 159:t.Count=e[0];t.Unique=e[1];break;case 19:t.push(e);break;case 160:return true;case 35:a=true;break;case 36:a=false;break;default:if(i.T){}if(!a||r.WTF)throw new Error("Unexpected record 0x"+s.toString(16));}});return t}function Yc(e,r){if(!r)r=ba(8);r._W(4,e.Count);r._W(4,e.Unique);return r}var Kc=Qa;function Zc(e){var r=wa();ka(r,159,Yc(e));for(var t=0;t<e.length;++t)ka(r,19,Kc(e[t]));ka(r,160);return r.end()}function Jc(e){if(typeof a!=="undefined")return a.utils.encode(t,e);var r=[],n=e.split("");for(var i=0;i<n.length;++i)r[i]=n[i].charCodeAt(0);return r}function qc(e,r){var t={};t.Major=e._R(2);t.Minor=e._R(2);if(r>=4)e.l+=r-4;return t;
}function Qc(e){var r={};r.id=e._R(0,"lpp4");r.R=qc(e,4);r.U=qc(e,4);r.W=qc(e,4);return r}function el(e){var r=e._R(4);var t=e.l+r-4;var a={};var n=e._R(4);var i=[];while(n-- >0)i.push({t:e._R(4),v:e._R(0,"lpp4")});a.name=e._R(0,"lpp4");a.comps=i;if(e.l!=t)throw new Error("Bad DataSpaceMapEntry: "+e.l+" != "+t);return a}function rl(e){var r=[];e.l+=4;var t=e._R(4);while(t-- >0)r.push(el(e));return r}function tl(e){var r=[];e.l+=4;var t=e._R(4);while(t-- >0)r.push(e._R(0,"lpp4"));return r}function al(e){var r={};e._R(4);e.l+=4;r.id=e._R(0,"lpp4");r.name=e._R(0,"lpp4");r.R=qc(e,4);r.U=qc(e,4);r.W=qc(e,4);return r}function nl(e){var r=al(e);r.ename=e._R(0,"8lpp4");r.blksz=e._R(4);r.cmode=e._R(4);if(e._R(4)!=4)throw new Error("Bad !Primary record");return r}function il(e,r){var t=e.l+r;var a={};a.Flags=e._R(4)&63;e.l+=4;a.AlgID=e._R(4);var n=false;switch(a.AlgID){case 26126:;case 26127:;case 26128:n=a.Flags==36;break;case 26625:n=a.Flags==4;break;case 0:n=a.Flags==16||a.Flags==4||a.Flags==36;break;default:throw"Unrecognized encryption algorithm: "+a.AlgID;}if(!n)throw new Error("Encryption Flags/AlgID mismatch");a.AlgIDHash=e._R(4);a.KeySize=e._R(4);a.ProviderType=e._R(4);e.l+=8;a.CSPName=e._R(t-e.l>>1,"utf16le");e.l=t;return a}function sl(e,r){var t={},a=e.l+r;e.l+=4;t.Salt=e.slice(e.l,e.l+16);e.l+=16;t.Verifier=e.slice(e.l,e.l+16);e.l+=16;e._R(4);t.VerifierHash=e.slice(e.l,a);e.l=a;return t}function fl(e){var r=qc(e);switch(r.Minor){case 2:return[r.Minor,cl(e,r)];case 3:return[r.Minor,ll(e,r)];case 4:return[r.Minor,ol(e,r)];}throw new Error("ECMA-376 Encrypted file unrecognized Version: "+r.Minor)}function cl(e){var r=e._R(4);if((r&63)!=36)throw new Error("EncryptionInfo mismatch");var t=e._R(4);var a=il(e,t);var n=sl(e,e.length-e.l);return{t:"Std",h:a,v:n}}function ll(){throw new Error("File is password-protected: ECMA-376 Extensible")}function ol(e){var r=["saltSize","blockSize","keyBits","hashSize","cipherAlgorithm","cipherChaining","hashAlgorithm","saltValue"];e.l+=4;var t=e._R(e.length-e.l,"utf8");var a={};t.replace(jr,function n(e){var t=Kr(e);switch(Zr(t[0])){case"<?xml":break;case"<encryption":;case"</encryption>":break;case"<keyData":r.forEach(function(e){a[e]=t[e]});break;case"<dataIntegrity":a.encryptedHmacKey=t.encryptedHmacKey;a.encryptedHmacValue=t.encryptedHmacValue;break;case"<keyEncryptors>":;case"<keyEncryptors":a.encs=[];break;case"</keyEncryptors>":break;case"<keyEncryptor":a.uri=t.uri;break;case"</keyEncryptor>":break;case"<encryptedKey":a.encs.push(t);break;default:throw t[0];}});return a}function ul(e,r){var t={};var a=t.EncryptionVersionInfo=qc(e,4);r-=4;if(a.Minor!=2)throw new Error("unrecognized minor version code: "+a.Minor);if(a.Major>4||a.Major<2)throw new Error("unrecognized major version code: "+a.Major);t.Flags=e._R(4);r-=4;var n=e._R(4);r-=4;t.EncryptionHeader=il(e,n);r-=n;t.EncryptionVerifier=sl(e,r);return t}function hl(e){var r={};var t=r.EncryptionVersionInfo=qc(e,4);if(t.Major!=1||t.Minor!=1)throw"unrecognized version code "+t.Major+" : "+t.Minor;r.Salt=e._R(16);r.EncryptedVerifier=e._R(16);r.EncryptedVerifierHash=e._R(16);return r}function dl(e){var r=0,t;var a=Jc(e);var n=a.length+1,i,s;var f,c,l;t=S(n);t[0]=a.length;for(i=1;i!=n;++i)t[i]=a[i-1];for(i=n-1;i>=0;--i){s=t[i];f=(r&16384)===0?0:1;c=r<<1&32767;l=f|c;r=l^s}return r^52811}var vl=function(){var e=[187,255,255,186,255,255,185,128,0,190,15,0,191,15,0];var r=[57840,7439,52380,33984,4364,3600,61902,12606,6258,57657,54287,34041,10252,43370,20163];var t=[44796,19929,39858,10053,20106,40212,10761,31585,63170,64933,60267,50935,40399,11199,17763,35526,1453,2906,5812,11624,23248,885,1770,3540,7080,14160,28320,56640,55369,41139,20807,41614,21821,43642,17621,28485,56970,44341,19019,38038,14605,29210,60195,50791,40175,10751,21502,43004,24537,18387,36774,3949,7898,15796,31592,63184,47201,24803,49606,37805,14203,28406,56812,17824,35648,1697,3394,6788,13576,27152,43601,17539,35078,557,1114,2228,4456,30388,60776,51953,34243,7079,14158,28316,14128,28256,56512,43425,17251,34502,7597,13105,26210,52420,35241,883,1766,3532,4129,8258,16516,33032,4657,9314,18628];var a=function(e){return(e/2|e*128)&255};var n=function(e,r){return a(e^r)};var i=function(e){var a=r[e.length-1];var n=104;for(var i=e.length-1;i>=0;--i){var s=e[i];for(var f=0;f!=7;++f){if(s&64)a^=t[n];s*=2;--n}}return a};return function(r){var t=Jc(r);var a=i(t);var s=t.length;var f=S(16);for(var c=0;c!=16;++c)f[c]=0;var l,o,u;if((s&1)===1){l=a>>8;f[s]=n(e[0],l);--s;l=a&255;o=t[t.length-1];f[s]=n(o,l)}while(s>0){--s;l=a>>8;f[s]=n(t[s],l);--s;l=a&255;f[s]=n(t[s],l)}s=15;u=15-t.length;while(u>0){l=a>>8;f[s]=n(e[u],l);--s;--u;l=a&255;f[s]=n(t[s],l);--s;--u}return f}}();var pl=function(e,r,t,a,n){if(!n)n=r;if(!a)a=vl(e);var i,s;for(i=0;i!=r.length;++i){s=r[i];s^=a[t];s=(s>>5|s<<3)&255;n[i]=s;++t}return[n,t,a]};var ml=function(e){var r=0,t=vl(e);return function(e){var a=pl("",e,r,t);r=a[1];return a[0]}};function bl(e,r,t,a){var n={key:ss(e),verificationBytes:ss(e)};if(t.password)n.verifier=dl(t.password);a.valid=n.verificationBytes===n.verifier;if(a.valid)a.insitu=ml(t.password);return n}function gl(e,r,t){var a=t||{};a.Info=e._R(2);e.l-=2;if(a.Info===1)a.Data=hl(e,r);else a.Data=ul(e,r);return a}function wl(e,r,t){var a={Type:t.biff>=8?e._R(2):0};if(a.Type)gl(e,r-2,a);else bl(e,t.biff>=8?r:r-2,t,a);return a}var kl=function(){function e(e,t){switch(t.type){case"base64":return r(T(e),t);case"binary":return r(e,t);case"buffer":return r(E&&Buffer.isBuffer(e)?e.toString("binary"):C(e),t);case"array":return r(kr(e),t);}throw new Error("Unrecognized type "+t.type)}function r(e,r){var t=r||{};var a=t.dense?[]:{};var n=e.match(/\\trowd[\s\S]*?\\row\b/g);if(!n.length)throw new Error("RTF missing table");var i={s:{c:0,r:0},e:{c:0,r:n.length-1}};n.forEach(function(e,r){if(Array.isArray(a))a[r]=[];var t=/\\[\w\-]+\b/g;var n=0;var s;var f=-1;var c=[];while(s=t.exec(e)){var l=e.slice(n,t.lastIndex-s[0].length);if(l.charCodeAt(0)==32)l=l.slice(1);if(l.length)c.push(l);switch(s[0]){case"\\cell":++f;if(c.length){var o={v:c.join(""),t:"s"};if(Array.isArray(a))a[r][f]=o;else a[Pa({r:r,c:f})]=o}c=[];break;case"\\par":c.push("\n");break;}n=t.lastIndex}if(f>i.e.c)i.e.c=f});a["!ref"]=Ma(i);return a}function t(r,t){return Va(e(r,t),t)}function a(e){var r=["{\\rtf1\\ansi"];var t=Wa(e["!ref"]),a;var n=Array.isArray(e);for(var i=t.s.r;i<=t.e.r;++i){r.push("\\trowd\\trautofit1");for(var s=t.s.c;s<=t.e.c;++s)r.push("\\cellx"+(s+1));r.push("\\pard\\intbl");for(s=t.s.c;s<=t.e.c;++s){var f=Pa({r:i,c:s});a=n?(e[i]||[])[s]:e[f];if(!a||a.v==null&&(!a.f||a.F))continue;r.push(" "+(a.w||(za(a),a.w)).replace(/[\r\n]/g,"\\par "));r.push("\\cell")}r.push("\\pard\\intbl\\row")}return r.join("")+"}"}return{to_workbook:t,to_sheet:e,from_sheet:a}}();function Tl(e){var r=e.slice(e[0]==="#"?1:0).slice(0,6);return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}function El(e){for(var r=0,t=1;r!=3;++r)t=t*256+(e[r]>255?255:e[r]<0?0:e[r]);return t.toString(16).toUpperCase().slice(1)}function yl(e){var r=e[0]/255,t=e[1]/255,a=e[2]/255;var n=Math.max(r,t,a),i=Math.min(r,t,a),s=n-i;if(s===0)return[0,0,r];var f=0,c=0,l=n+i;c=s/(l>1?2-l:l);switch(n){case r:f=((t-a)/s+6)%6;break;case t:f=(a-r)/s+2;break;case a:f=(r-t)/s+4;break;}return[f/6,c,l/2]}function Sl(e){var r=e[0],t=e[1],a=e[2];var n=t*2*(a<.5?a:1-a),i=a-n/2;var s=[i,i,i],f=6*r;var c;if(t!==0)switch(f|0){case 0:;case 6:c=n*f;s[0]+=n;s[1]+=c;break;case 1:c=n*(2-f);s[0]+=c;s[1]+=n;break;case 2:c=n*(f-2);s[1]+=n;s[2]+=c;break;case 3:c=n*(4-f);s[1]+=c;s[2]+=n;break;case 4:c=n*(f-4);s[2]+=n;s[0]+=c;break;case 5:c=n*(6-f);s[2]+=c;s[0]+=n;break;}for(var l=0;l!=3;++l)s[l]=Math.round(s[l]*255);return s}function _l(e,r){if(r===0)return e;var t=yl(Tl(e));if(r<0)t[2]=t[2]*(1+r);else t[2]=1-(1-t[2])*(1-r);return El(Sl(t))}var Al=6,xl=15,Cl=1,Ol=Al;function Rl(e){return Math.floor((e+Math.round(128/Ol)/256)*Ol)}function Nl(e){return Math.floor((e-5)/Ol*100+.5)/100}function Il(e){return Math.round((e*Ol+5)/Ol*256)/256}function Fl(e){return Il(Nl(Rl(e)))}function Dl(e){var r=Math.abs(e-Fl(e)),t=Ol;if(r>.005)for(Ol=Cl;Ol<xl;++Ol)if(Math.abs(e-Fl(e))<=r){r=Math.abs(e-Fl(e));t=Ol}Ol=t}function Pl(e){if(e.width){e.wpx=Rl(e.width);e.wch=Nl(e.wpx);e.MDW=Ol}else if(e.wpx){e.wch=Nl(e.wpx);e.width=Il(e.wch);e.MDW=Ol}else if(typeof e.wch=="number"){e.width=Il(e.wch);e.wpx=Rl(e.width);e.MDW=Ol}if(e.customWidth)delete e.customWidth}var Ll=96,Ml=Ll;function Ul(e){return e*96/Ml}function Bl(e){return e*Ml/96}var Wl={None:"none",Solid:"solid",Gray50:"mediumGray",Gray75:"darkGray",Gray25:"lightGray",HorzStripe:"darkHorizontal",VertStripe:"darkVertical",ReverseDiagStripe:"darkDown",DiagStripe:"darkUp",DiagCross:"darkGrid",ThickDiagCross:"darkTrellis",ThinHorzStripe:"lightHorizontal",ThinVertStripe:"lightVertical",ThinReverseDiagStripe:"lightDown",ThinHorzCross:"lightGrid"};function Hl(e,r,t,a){r.Borders=[];var n={};var i=false;(e[0].match(jr)||[]).forEach(function(e){var t=Kr(e);switch(Zr(t[0])){case"<borders":;case"<borders>":;case"</borders>":break;case"<border":;case"<border>":;case"<border/>":n={};if(t.diagonalUp)n.diagonalUp=lt(t.diagonalUp);if(t.diagonalDown)n.diagonalDown=lt(t.diagonalDown);r.Borders.push(n);break;case"</border>":break;case"<left/>":break;case"<left":;case"<left>":break;case"</left>":break;case"<right/>":break;case"<right":;case"<right>":break;case"</right>":break;case"<top/>":break;case"<top":;case"<top>":break;case"</top>":break;case"<bottom/>":break;case"<bottom":;case"<bottom>":break;case"</bottom>":break;case"<diagonal":;case"<diagonal>":;case"<diagonal/>":break;case"</diagonal>":break;case"<horizontal":;case"<horizontal>":;case"<horizontal/>":break;case"</horizontal>":break;case"<vertical":;case"<vertical>":;case"<vertical/>":break;case"</vertical>":break;case"<start":;case"<start>":;case"<start/>":break;case"</start>":break;case"<end":;case"<end>":;case"<end/>":break;case"</end>":break;case"<color":;case"<color>":break;case"<color/>":;case"</color>":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":i=true;break;case"</ext>":i=false;break;default:if(a&&a.WTF){if(!i)throw new Error("unrecognized "+t[0]+" in borders")};}})}function zl(e,r,t,a){r.Fills=[];var n={};var i=false;(e[0].match(jr)||[]).forEach(function(e){var t=Kr(e);switch(Zr(t[0])){case"<fills":;case"<fills>":;case"</fills>":break;case"<fill>":;case"<fill":;case"<fill/>":n={};r.Fills.push(n);break;case"</fill>":break;case"<gradientFill>":break;case"<gradientFill":;case"</gradientFill>":r.Fills.push(n);n={};break;case"<patternFill":;case"<patternFill>":if(t.patternType)n.patternType=t.patternType;break;case"<patternFill/>":;case"</patternFill>":break;case"<bgColor":if(!n.bgColor)n.bgColor={};if(t.indexed)n.bgColor.indexed=parseInt(t.indexed,10);if(t.theme)n.bgColor.theme=parseInt(t.theme,10);if(t.tint)n.bgColor.tint=parseFloat(t.tint);if(t.rgb)n.bgColor.rgb=t.rgb.slice(-6);break;case"<bgColor/>":;case"</bgColor>":break;case"<fgColor":if(!n.fgColor)n.fgColor={};if(t.theme)n.fgColor.theme=parseInt(t.theme,10);if(t.tint)n.fgColor.tint=parseFloat(t.tint);if(t.rgb!=null)n.fgColor.rgb=t.rgb.slice(-6);break;case"<fgColor/>":;case"</fgColor>":break;case"<stop":;case"<stop/>":break;case"</stop>":break;case"<color":;case"<color/>":break;case"</color>":break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":i=true;break;case"</ext>":i=false;break;default:if(a&&a.WTF){if(!i)throw new Error("unrecognized "+t[0]+" in fills")};}})}function Vl(e,r,t,a){r.Fonts=[];var n={};var s=false;(e[0].match(jr)||[]).forEach(function(e){var f=Kr(e);switch(Zr(f[0])){case"<fonts":;case"<fonts>":;case"</fonts>":break;case"<font":;case"<font>":break;case"</font>":;case"<font/>":r.Fonts.push(n);n={};break;case"<name":if(f.val)n.name=vt(f.val);break;case"<name/>":;case"</name>":break;case"<b":n.bold=f.val?lt(f.val):1;break;case"<b/>":n.bold=1;break;case"<i":n.italic=f.val?lt(f.val):1;break;case"<i/>":n.italic=1;break;case"<u":switch(f.val){case"none":n.underline=0;break;case"single":n.underline=1;break;case"double":n.underline=2;break;case"singleAccounting":n.underline=33;break;case"doubleAccounting":n.underline=34;break;}break;case"<u/>":n.underline=1;break;case"<strike":n.strike=f.val?lt(f.val):1;break;case"<strike/>":n.strike=1;break;case"<outline":n.outline=f.val?lt(f.val):1;break;case"<outline/>":n.outline=1;break;case"<shadow":n.shadow=f.val?lt(f.val):1;break;case"<shadow/>":n.shadow=1;break;case"<condense":n.condense=f.val?lt(f.val):1;break;case"<condense/>":n.condense=1;break;case"<extend":n.extend=f.val?lt(f.val):1;break;case"<extend/>":n.extend=1;break;case"<sz":if(f.val)n.sz=+f.val;break;case"<sz/>":;case"</sz>":break;case"<vertAlign":if(f.val)n.vertAlign=f.val;break;case"<vertAlign/>":;case"</vertAlign>":break;case"<family":if(f.val)n.family=parseInt(f.val,10);break;case"<family/>":;case"</family>":break;case"<scheme":if(f.val)n.scheme=f.val;break;case"<scheme/>":;case"</scheme>":break;case"<charset":if(f.val=="1")break;f.codepage=i[parseInt(f.val,10)];break;case"<color":if(!n.color)n.color={};if(f.auto)n.color.auto=lt(f.auto);if(f.rgb)n.color.rgb=f.rgb.slice(-6);else if(f.indexed){n.color.index=parseInt(f.indexed,10);var c=Yn[n.color.index];if(n.color.index==81)c=Yn[1];if(!c)c=Yn[1];n.color.rgb=c[0].toString(16)+c[1].toString(16)+c[2].toString(16)}else if(f.theme){n.color.theme=parseInt(f.theme,10);if(f.tint)n.color.tint=parseFloat(f.tint);if(f.theme&&t.themeElements&&t.themeElements.clrScheme){n.color.rgb=_l(t.themeElements.clrScheme[n.color.theme].rgb,n.color.tint||0)}}break;case"<color/>":;case"</color>":break;case"<AlternateContent":s=true;break;case"</AlternateContent>":s=false;break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":s=true;break;case"</ext>":s=false;break;default:if(a&&a.WTF){if(!s)throw new Error("unrecognized "+f[0]+" in fonts")};}})}function Gl(e,r,t){r.NumberFmt=[];var a=nr(Y);for(var n=0;n<a.length;++n)r.NumberFmt[a[n]]=Y[a[n]];var i=e[0].match(jr);if(!i)return;for(n=0;n<i.length;++n){var s=Kr(i[n]);switch(Zr(s[0])){case"<numFmts":;case"</numFmts>":;case"<numFmts/>":;case"<numFmts>":break;case"<numFmt":{var f=Qr(vt(s.formatCode)),c=parseInt(s.numFmtId,10);r.NumberFmt[c]=f;if(c>0){if(c>392){for(c=392;c>60;--c)if(r.NumberFmt[c]==null)break;r.NumberFmt[c]=f}Ze(f,c)}}break;case"</numFmt>":break;default:if(t.WTF)throw new Error("unrecognized "+s[0]+" in numFmts");}}}function $l(e){var r=["<numFmts>"];[[5,8],[23,26],[41,44],[50,392]].forEach(function(t){for(var a=t[0];a<=t[1];++a)if(e[a]!=null)r[r.length]=_t("numFmt",null,{numFmtId:a,formatCode:tt(e[a])})});if(r.length===1)return"";r[r.length]="</numFmts>";r[0]=_t("numFmts",null,{count:r.length-2}).replace("/>",">");return r.join("")}var jl=["numFmtId","fillId","fontId","borderId","xfId"];var Xl=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","pivotButton","quotePrefix"];function Yl(e,r,t){r.CellXf=[];var a;var n=false;(e[0].match(jr)||[]).forEach(function(e){var i=Kr(e),s=0;switch(Zr(i[0])){case"<cellXfs":;case"<cellXfs>":;case"<cellXfs/>":;case"</cellXfs>":break;case"<xf":;case"<xf/>":a=i;delete a[0];for(s=0;s<jl.length;++s)if(a[jl[s]])a[jl[s]]=parseInt(a[jl[s]],10);for(s=0;s<Xl.length;++s)if(a[Xl[s]])a[Xl[s]]=lt(a[Xl[s]]);if(r.NumberFmt&&a.numFmtId>392){for(s=392;s>60;--s)if(r.NumberFmt[a.numFmtId]==r.NumberFmt[s]){a.numFmtId=s;break}}r.CellXf.push(a);break;case"</xf>":break;case"<alignment":;case"<alignment/>":var f={};if(i.vertical)f.vertical=i.vertical;if(i.horizontal)f.horizontal=i.horizontal;if(i.textRotation!=null)f.textRotation=i.textRotation;if(i.indent)f.indent=i.indent;if(i.wrapText)f.wrapText=lt(i.wrapText);a.alignment=f;break;case"</alignment>":break;case"<protection":break;case"</protection>":;case"<protection/>":break;case"<AlternateContent":n=true;break;case"</AlternateContent>":n=false;break;case"<extLst":;case"<extLst>":;case"</extLst>":break;case"<ext":n=true;break;case"</ext>":n=false;break;default:if(t&&t.WTF){if(!n)throw new Error("unrecognized "+i[0]+" in cellXfs")};}})}function Kl(e){var r=[];r[r.length]=_t("cellXfs",null);e.forEach(function(e){r[r.length]=_t("xf",null,e)});r[r.length]="</cellXfs>";if(r.length===2)return"";r[0]=_t("cellXfs",null,{count:r.length-2}).replace("/>",">");return r.join("")}var Zl=function xk(){var e=/<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;var r=/<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;var t=/<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;var a=/<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;var n=/<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;return function i(s,f,c){var l={};if(!s)return l;s=s.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");var o;if(o=s.match(e))Gl(o,l,c);if(o=s.match(a))Vl(o,l,f,c);if(o=s.match(t))zl(o,l,f,c);if(o=s.match(n))Hl(o,l,f,c);if(o=s.match(r))Yl(o,l,c);return l}}();function Jl(e,r){var t=[zr,_t("styleSheet",null,{xmlns:Nt[0],"xmlns:vt":Rt.vt})],a;if(e.SSF&&(a=$l(e.SSF))!=null)t[t.length]=a;t[t.length]='<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';t[t.length]='<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';t[t.length]='<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';t[t.length]='<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';if(a=Kl(r.cellXfs))t[t.length]=a;t[t.length]='<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';t[t.length]='<dxfs count="0"/>';t[t.length]='<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';if(t.length>2){t[t.length]="</styleSheet>";t[1]=t[1].replace("/>",">")}return t.join("")}function ql(e,r){var t=e._R(2);var a=Ya(e,r-2);return[t,a]}function Ql(e,r,t){if(!t)t=ba(6+4*r.length);t._W(2,e);Ka(r,t);var a=t.length>t.l?t.slice(0,t.l):t;if(t.l==null)t.l=t.length;return a}function eo(e,r,t){var a={};a.sz=e._R(2)/20;var n=Sn(e,2,t);if(n.fItalic)a.italic=1;if(n.fCondense)a.condense=1;if(n.fExtend)a.extend=1;if(n.fShadow)a.shadow=1;if(n.fOutline)a.outline=1;if(n.fStrikeout)a.strike=1;var i=e._R(2);if(i===700)a.bold=1;switch(e._R(2)){case 1:a.vertAlign="superscript";break;case 2:a.vertAlign="subscript";break;}var s=e._R(1);if(s!=0)a.underline=s;var f=e._R(1);if(f>0)a.family=f;var c=e._R(1);if(c>0)a.charset=c;e.l++;a.color=En(e,8);switch(e._R(1)){case 1:a.scheme="major";break;case 2:a.scheme="minor";break;}a.name=Ya(e,r-21);return a}function ro(e,r){if(!r)r=ba(25+4*32);r._W(2,e.sz*20);_n(e,r);r._W(2,e.bold?700:400);var t=0;if(e.vertAlign=="superscript")t=1;else if(e.vertAlign=="subscript")t=2;r._W(2,t);r._W(1,e.underline||0);r._W(1,e.family||0);r._W(1,e.charset||0);r._W(1,0);yn(e.color,r);var a=0;if(e.scheme=="major")a=1;if(e.scheme=="minor")a=2;r._W(1,a);Ka(e.name,r);return r.length>r.l?r.slice(0,r.l):r}var to=["none","solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];var ao;var no=ma;function io(e,r){if(!r)r=ba(4*3+8*7+16*1);if(!ao)ao=sr(to);var t=ao[e.patternType];if(t==null)t=40;r._W(4,t);var a=0;if(t!=40){yn({auto:1},r);yn({auto:1},r);for(;a<12;++a)r._W(4,0)}else{for(;a<4;++a)r._W(4,0);for(;a<12;++a)r._W(4,0)}return r.length>r.l?r.slice(0,r.l):r}function so(e,r){var t=e.l+r;var a=e._R(2);var n=e._R(2);e.l=t;return{ixfe:a,numFmtId:n}}function fo(e,r,t){if(!t)t=ba(16);t._W(2,r||0);t._W(2,e.numFmtId||0);t._W(2,0);t._W(2,0);t._W(2,0);t._W(1,0);t._W(1,0);var a=0;t._W(1,a);t._W(1,0);t._W(1,0);t._W(1,0);return t}function co(e,r){if(!r)r=ba(10);r._W(1,0);r._W(1,0);r._W(4,0);r._W(4,0);return r}var lo=ma;function oo(e,r){if(!r)r=ba(51);r._W(1,0);co(null,r);co(null,r);co(null,r);co(null,r);co(null,r);return r.length>r.l?r.slice(0,r.l):r}function uo(e,r){if(!r)r=ba(12+4*10);r._W(4,e.xfId);r._W(2,1);r._W(1,+e.builtinId);r._W(1,0);on(e.name||"",r);return r.length>r.l?r.slice(0,r.l):r}function ho(e,r,t){var a=ba(4+256*2*4);a._W(4,e);on(r,a);on(t,a);return a.length>a.l?a.slice(0,a.l):a}function vo(e,r,t){var a={};a.NumberFmt=[];for(var n in Y)a.NumberFmt[n]=Y[n];a.CellXf=[];a.Fonts=[];var i=[];var s=false;ga(e,function f(e,n,c){switch(c){case 44:a.NumberFmt[e[0]]=e[1];Ze(e[1],e[0]);break;case 43:a.Fonts.push(e);if(e.color.theme!=null&&r&&r.themeElements&&r.themeElements.clrScheme){e.color.rgb=_l(r.themeElements.clrScheme[e.color.theme].rgb,e.color.tint||0)}break;case 1025:break;case 45:break;case 46:break;case 47:if(i[i.length-1]==617){a.CellXf.push(e)}break;case 48:;case 507:;case 572:;case 475:break;case 1171:;case 2102:;case 1130:;case 512:;case 2095:;case 3072:break;case 35:s=true;break;case 36:s=false;break;case 37:i.push(c);s=true;break;case 38:i.pop();s=false;break;default:if(n.T>0)i.push(c);else if(n.T<0)i.pop();else if(!s||t.WTF&&i[i.length-1]!=37)throw new Error("Unexpected record 0x"+c.toString(16));}});return a}function po(e,r){if(!r)return;var t=0;[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var a=e[0];a<=e[1];++a)if(r[a]!=null)++t});if(t==0)return;ka(e,615,Xa(t));[[5,8],[23,26],[41,44],[50,392]].forEach(function(t){for(var a=t[0];a<=t[1];++a)if(r[a]!=null)ka(e,44,Ql(a,r[a]))});ka(e,616)}function mo(e){var r=1;if(r==0)return;ka(e,611,Xa(r));ka(e,43,ro({sz:12,color:{theme:1},name:"Calibri",family:2,scheme:"minor"}));ka(e,612)}function bo(e){var r=2;if(r==0)return;ka(e,603,Xa(r));ka(e,45,io({patternType:"none"}));ka(e,45,io({patternType:"gray125"}));ka(e,604)}function go(e){var r=1;if(r==0)return;ka(e,613,Xa(r));ka(e,46,oo({}));ka(e,614)}function wo(e){var r=1;ka(e,626,Xa(r));ka(e,47,fo({numFmtId:0,fontId:0,fillId:0,borderId:0},65535));ka(e,627)}function ko(e,r){ka(e,617,Xa(r.length));r.forEach(function(r){ka(e,47,fo(r,0))});ka(e,618)}function To(e){var r=1;ka(e,619,Xa(r));ka(e,48,uo({xfId:0,builtinId:0,name:"Normal"}));ka(e,620)}function Eo(e){var r=0;ka(e,505,Xa(r));ka(e,506)}function yo(e){var r=0;ka(e,508,ho(r,"TableStyleMedium9","PivotStyleMedium4"));ka(e,509)}function So(){return}function _o(e,r){var t=wa();ka(t,278);po(t,e.SSF);mo(t,e);bo(t,e);go(t,e);wo(t,e);ko(t,r.cellXfs);To(t,e);Eo(t,e);yo(t,e);So(t,e);ka(t,279);return t.end()}var Ao=["</a:lt1>","</a:dk1>","</a:lt2>","</a:dk2>","</a:accent1>","</a:accent2>","</a:accent3>","</a:accent4>","</a:accent5>","</a:accent6>","</a:hlink>","</a:folHlink>"];function xo(e,r,t){r.themeElements.clrScheme=[];var a={};(e[0].match(jr)||[]).forEach(function(e){var n=Kr(e);switch(n[0]){case"<a:clrScheme":;case"</a:clrScheme>":break;case"<a:srgbClr":a.rgb=n.val;break;case"<a:sysClr":a.rgb=n.lastClr;break;case"<a:dk1>":;case"</a:dk1>":;case"<a:lt1>":;case"</a:lt1>":;case"<a:dk2>":;case"</a:dk2>":;case"<a:lt2>":;case"</a:lt2>":;case"<a:accent1>":;case"</a:accent1>":;case"<a:accent2>":;case"</a:accent2>":;case"<a:accent3>":;case"</a:accent3>":;case"<a:accent4>":;case"</a:accent4>":;case"<a:accent5>":;case"</a:accent5>":;case"<a:accent6>":;case"</a:accent6>":;case"<a:hlink>":;case"</a:hlink>":;case"<a:folHlink>":;case"</a:folHlink>":if(n[0].charAt(1)==="/"){r.themeElements.clrScheme[Ao.indexOf(n[0])]=a;a={}}else{a.name=n[0].slice(3,n[0].length-1)}break;default:if(t&&t.WTF)throw new Error("Unrecognized "+n[0]+" in clrScheme");}})}function Co(){}function Oo(){}var Ro=/<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;var No=/<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;var Io=/<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;function Fo(e,r,t){r.themeElements={};var a;[["clrScheme",Ro,xo],["fontScheme",No,Co],["fmtScheme",Io,Oo]].forEach(function(n){if(!(a=e.match(n[1])))throw new Error(n[0]+" not found in themeElements");n[2](a,r,t)})}var Do=/<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;function Po(e,r){if(!e||e.length===0)e=Lo();var t;var a={};if(!(t=e.match(Do)))throw new Error("themeElements not found in theme");Fo(t[0],a,r);a.raw=e;return a}function Lo(e,r){if(r&&r.themeXLSX)return r.themeXLSX;if(e&&typeof e.raw=="string")return e.raw;var t=[zr];t[t.length]='<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';t[t.length]="<a:themeElements>";t[t.length]='<a:clrScheme name="Office">';t[t.length]='<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';t[t.length]='<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';t[t.length]='<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';t[t.length]='<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';t[t.length]='<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';t[t.length]='<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';t[t.length]='<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';t[t.length]='<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';t[t.length]='<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';t[t.length]='<a:accent6><a:srgbClr val="F79646"/></a:accent6>';t[t.length]='<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';t[t.length]='<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';t[t.length]="</a:clrScheme>";t[t.length]='<a:fontScheme name="Office">';t[t.length]="<a:majorFont>";t[t.length]='<a:latin typeface="Cambria"/>';t[t.length]='<a:ea typeface=""/>';t[t.length]='<a:cs typeface=""/>';t[t.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';t[t.length]='<a:font script="Hang" typeface="맑은 고딕"/>';t[t.length]='<a:font script="Hans" typeface="宋体"/>';t[t.length]='<a:font script="Hant" typeface="新細明體"/>';t[t.length]='<a:font script="Arab" typeface="Times New Roman"/>';t[t.length]='<a:font script="Hebr" typeface="Times New Roman"/>';t[t.length]='<a:font script="Thai" typeface="Tahoma"/>';t[t.length]='<a:font script="Ethi" typeface="Nyala"/>';t[t.length]='<a:font script="Beng" typeface="Vrinda"/>';t[t.length]='<a:font script="Gujr" typeface="Shruti"/>';t[t.length]='<a:font script="Khmr" typeface="MoolBoran"/>';t[t.length]='<a:font script="Knda" typeface="Tunga"/>';t[t.length]='<a:font script="Guru" typeface="Raavi"/>';t[t.length]='<a:font script="Cans" typeface="Euphemia"/>';t[t.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>';t[t.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';t[t.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>';t[t.length]='<a:font script="Thaa" typeface="MV Boli"/>';t[t.length]='<a:font script="Deva" typeface="Mangal"/>';t[t.length]='<a:font script="Telu" typeface="Gautami"/>';t[t.length]='<a:font script="Taml" typeface="Latha"/>';t[t.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>';t[t.length]='<a:font script="Orya" typeface="Kalinga"/>';t[t.length]='<a:font script="Mlym" typeface="Kartika"/>';t[t.length]='<a:font script="Laoo" typeface="DokChampa"/>';t[t.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>';t[t.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>';t[t.length]='<a:font script="Viet" typeface="Times New Roman"/>';t[t.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>';t[t.length]='<a:font script="Geor" typeface="Sylfaen"/>';t[t.length]="</a:majorFont>";t[t.length]="<a:minorFont>";t[t.length]='<a:latin typeface="Calibri"/>';t[t.length]='<a:ea typeface=""/>';t[t.length]='<a:cs typeface=""/>';t[t.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';t[t.length]='<a:font script="Hang" typeface="맑은 고딕"/>';t[t.length]='<a:font script="Hans" typeface="宋体"/>';t[t.length]='<a:font script="Hant" typeface="新細明體"/>';t[t.length]='<a:font script="Arab" typeface="Arial"/>';t[t.length]='<a:font script="Hebr" typeface="Arial"/>';t[t.length]='<a:font script="Thai" typeface="Tahoma"/>';t[t.length]='<a:font script="Ethi" typeface="Nyala"/>';t[t.length]='<a:font script="Beng" typeface="Vrinda"/>';t[t.length]='<a:font script="Gujr" typeface="Shruti"/>';t[t.length]='<a:font script="Khmr" typeface="DaunPenh"/>';t[t.length]='<a:font script="Knda" typeface="Tunga"/>';t[t.length]='<a:font script="Guru" typeface="Raavi"/>';t[t.length]='<a:font script="Cans" typeface="Euphemia"/>';t[t.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>';t[t.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';t[t.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>';t[t.length]='<a:font script="Thaa" typeface="MV Boli"/>';t[t.length]='<a:font script="Deva" typeface="Mangal"/>';t[t.length]='<a:font script="Telu" typeface="Gautami"/>';t[t.length]='<a:font script="Taml" typeface="Latha"/>';t[t.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>';t[t.length]='<a:font script="Orya" typeface="Kalinga"/>';t[t.length]='<a:font script="Mlym" typeface="Kartika"/>';t[t.length]='<a:font script="Laoo" typeface="DokChampa"/>';t[t.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>';t[t.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>';t[t.length]='<a:font script="Viet" typeface="Arial"/>';t[t.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>';t[t.length]='<a:font script="Geor" typeface="Sylfaen"/>';t[t.length]="</a:minorFont>";t[t.length]="</a:fontScheme>";t[t.length]='<a:fmtScheme name="Office">';t[t.length]="<a:fillStyleLst>";t[t.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:lin ang="16200000" scaled="1"/>';t[t.length]="</a:gradFill>";t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:lin ang="16200000" scaled="0"/>';t[t.length]="</a:gradFill>";t[t.length]="</a:fillStyleLst>";t[t.length]="<a:lnStyleLst>";t[t.length]='<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]='<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]='<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';t[t.length]="</a:lnStyleLst>";t[t.length]="<a:effectStyleLst>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';t[t.length]="</a:effectLst>";t[t.length]="</a:effectStyle>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
t[t.length]="</a:effectLst>";t[t.length]="</a:effectStyle>";t[t.length]="<a:effectStyle>";t[t.length]="<a:effectLst>";t[t.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';t[t.length]="</a:effectLst>";t[t.length]='<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';t[t.length]='<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';t[t.length]="</a:effectStyle>";t[t.length]="</a:effectStyleLst>";t[t.length]="<a:bgFillStyleLst>";t[t.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';t[t.length]="</a:gradFill>";t[t.length]='<a:gradFill rotWithShape="1">';t[t.length]="<a:gsLst>";t[t.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';t[t.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';t[t.length]="</a:gsLst>";t[t.length]='<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';t[t.length]="</a:gradFill>";t[t.length]="</a:bgFillStyleLst>";t[t.length]="</a:fmtScheme>";t[t.length]="</a:themeElements>";t[t.length]="<a:objectDefaults>";t[t.length]="<a:spDef>";t[t.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';t[t.length]="</a:spDef>";t[t.length]="<a:lnDef>";t[t.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';t[t.length]="</a:lnDef>";t[t.length]="</a:objectDefaults>";t[t.length]="<a:extraClrSchemeLst/>";t[t.length]="</a:theme>";return t.join("")}function Mo(e,r,t){var a=e.l+r;var n=e._R(4);if(n===124226)return;if(!t.cellStyles){e.l=a;return}var i=e.slice(e.l);e.l=a;var s;try{s=Wr(i,{type:"array"})}catch(f){return}var c=Pr(s,"theme/theme/theme1.xml",true);if(!c)return;return Po(c,t)}function Uo(e){return e._R(4)}function Bo(e){var r={};r.xclrType=e._R(2);r.nTintShade=e._R(2);switch(r.xclrType){case 0:e.l+=4;break;case 1:r.xclrValue=Wo(e,4);break;case 2:r.xclrValue=As(e,4);break;case 3:r.xclrValue=Uo(e,4);break;case 4:e.l+=4;break;}e.l+=8;return r}function Wo(e,r){return ma(e,r)}function Ho(e,r){return ma(e,r)}function zo(e){var r=e._R(2);var t=e._R(2)-4;var a=[r];switch(r){case 4:;case 5:;case 7:;case 8:;case 9:;case 10:;case 11:;case 13:a[1]=Bo(e,t);break;case 6:a[1]=Ho(e,t);break;case 14:;case 15:a[1]=e._R(t===1?1:2);break;default:throw new Error("Unrecognized ExtProp type: "+r+" "+t);}return a}function Vo(e,r){var t=e.l+r;e.l+=2;var a=e._R(2);e.l+=2;var n=e._R(2);var i=[];while(n-- >0)i.push(zo(e,t-e.l));return{ixfe:a,ext:i}}function Go(e,r){r.forEach(function(e){switch(e[0]){case 4:break;case 5:break;case 6:break;case 7:break;case 8:break;case 9:break;case 10:break;case 11:break;case 13:break;case 14:break;case 15:break;}})}function $o(e,r){return{flags:e._R(4),version:e._R(4),name:Ya(e,r-8)}}function jo(e){var r=ba(12+2*e.name.length);r._W(4,e.flags);r._W(4,e.version);Ka(e.name,r);return r.slice(0,r.l)}function Xo(e){var r=[];var t=e._R(4);while(t-- >0)r.push([e._R(4),e._R(4)]);return r}function Yo(e){var r=ba(4+8*e.length);r._W(4,e.length);for(var t=0;t<e.length;++t){r._W(4,e[t][0]);r._W(4,e[t][1])}return r}function Ko(e,r){var t=ba(8+2*r.length);t._W(4,e);Ka(r,t);return t.slice(0,t.l)}function Zo(e){e.l+=4;return e._R(4)!=0}function Jo(e,r){var t=ba(8);t._W(4,e);t._W(4,r?1:0);return t}function qo(e,r,t){var a={Types:[],Cell:[],Value:[]};var n=t||{};var i=[];var s=false;var f=2;ga(e,function(e,r,t){switch(t){case 335:a.Types.push({name:e.name});break;case 51:e.forEach(function(e){if(f==1)a.Cell.push({type:a.Types[e[0]-1].name,index:e[1]});else if(f==0)a.Value.push({type:a.Types[e[0]-1].name,index:e[1]})});break;case 337:f=e?1:0;break;case 338:f=2;break;case 35:i.push(t);s=true;break;case 36:i.pop();s=false;break;default:if(r.T){}else if(!s||n.WTF&&i[i.length-1]!=35)throw new Error("Unexpected record 0x"+t.toString(16));}});return a}function Qo(){var e=wa();ka(e,332);ka(e,334,Xa(1));ka(e,335,jo({name:"XLDAPR",version:12e4,flags:3496657072}));ka(e,336);ka(e,339,Ko(1,"XLDAPR"));ka(e,52);ka(e,35,Xa(514));ka(e,4096,Xa(0));ka(e,4097,fs(1));ka(e,36);ka(e,53);ka(e,340);ka(e,337,Jo(1,true));ka(e,51,Yo([[1,0]]));ka(e,338);ka(e,333);return e.end()}function eu(e,r,t){var a={Types:[],Cell:[],Value:[]};if(!e)return a;var n=false;var i=2;var s;e.replace(jr,function(e){var r=Kr(e);switch(Zr(r[0])){case"<?xml":break;case"<metadata":;case"</metadata>":break;case"<metadataTypes":;case"</metadataTypes>":break;case"<metadataType":a.Types.push({name:r.name});break;case"</metadataType>":break;case"<futureMetadata":for(var f=0;f<a.Types.length;++f)if(a.Types[f].name==r.name)s=a.Types[f];break;case"</futureMetadata>":break;case"<bk>":break;case"</bk>":break;case"<rc":if(i==1)a.Cell.push({type:a.Types[r.t-1].name,index:+r.v});else if(i==0)a.Value.push({type:a.Types[r.t-1].name,index:+r.v});break;case"</rc>":break;case"<cellMetadata":i=1;break;case"</cellMetadata>":i=2;break;case"<valueMetadata":i=0;break;case"</valueMetadata>":i=2;break;case"<extLst":;case"<extLst>":;case"</extLst>":;case"<extLst/>":break;case"<ext":n=true;break;case"</ext>":n=false;break;case"<rvb":if(!s)break;if(!s.offsets)s.offsets=[];s.offsets.push(+r.i);break;default:if(!n&&t.WTF)throw new Error("unrecognized "+r[0]+" in metadata");}return e});return a}function ru(){var e=[zr];e.push('<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">\n  <metadataTypes count="1">\n    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>\n  </metadataTypes>\n  <futureMetadata name="XLDAPR" count="1">\n    <bk>\n      <extLst>\n        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">\n          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>\n        </ext>\n      </extLst>\n    </bk>\n  </futureMetadata>\n  <cellMetadata count="1">\n    <bk>\n      <rc t="1" v="0"/>\n    </bk>\n  </cellMetadata>\n</metadata>');return e.join("")}function tu(e){var r=[];if(!e)return r;var t=1;(e.match(jr)||[]).forEach(function(e){var a=Kr(e);switch(a[0]){case"<?xml":break;case"<calcChain":;case"<calcChain>":;case"</calcChain>":break;case"<c":delete a[0];if(a.i)t=a.i;else a.i=t;r.push(a);break;}});return r}function au(e){var r={};r.i=e._R(4);var t={};t.r=e._R(4);t.c=e._R(4);r.r=Pa(t);var a=e._R(1);if(a&2)r.l="1";if(a&8)r.a="1";return r}function nu(e,r,t){var a=[];var n=false;ga(e,function i(e,r,s){switch(s){case 63:a.push(e);break;default:if(r.T){}else if(!n||t.WTF)throw new Error("Unexpected record 0x"+s.toString(16));}});return a}function iu(){}function su(e,r,t,a){if(!e)return e;var n=a||{};var i=false,s=false;ga(e,function f(e,r,t){if(s)return;switch(t){case 359:;case 363:;case 364:;case 366:;case 367:;case 368:;case 369:;case 370:;case 371:;case 472:;case 577:;case 578:;case 579:;case 580:;case 581:;case 582:;case 583:;case 584:;case 585:;case 586:;case 587:break;case 35:i=true;break;case 36:i=false;break;default:if(r.T){}else if(!i||n.WTF)throw new Error("Unexpected record 0x"+t.toString(16));}},n)}function fu(e,r){if(!e)return"??";var t=(e.match(/<c:chart [^>]*r:id="([^"]*)"/)||["",""])[1];return r["!id"][t].Target}function cu(e,r){var t=[21600,21600];var a=["m0,0l0",t[1],t[0],t[1],t[0],"0xe"].join(",");var n=[_t("xml",null,{"xmlns:v":It.v,"xmlns:o":It.o,"xmlns:x":It.x,"xmlns:mv":It.mv}).replace(/\/>/,">"),_t("o:shapelayout",_t("o:idmap",null,{"v:ext":"edit",data:e}),{"v:ext":"edit"})];var i=65536*e;var s=r||[];if(s.length>0)n.push(_t("v:shapetype",[_t("v:stroke",null,{joinstyle:"miter"}),_t("v:path",null,{gradientshapeok:"t","o:connecttype":"rect"})].join(""),{id:"_x0000_t202",coordsize:t.join(","),"o:spt":202,path:a}));s.forEach(function(e){++i;n.push(lu(e,i))});n.push("</xml>");return n.join("")}function lu(e,r){var t=Da(e[0]);var a={color2:"#BEFF82",type:"gradient"};if(a.type=="gradient")a.angle="-180";var n=a.type=="gradient"?_t("o:fill",null,{type:"gradientUnscaled","v:ext":"view"}):null;var i=_t("v:fill",n,a);var s={on:"t",obscured:"t"};return["<v:shape"+St({id:"_x0000_s"+r,type:"#_x0000_t202",style:"position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10"+(e[1].hidden?";visibility:hidden":""),fillcolor:"#ECFAD4",strokecolor:"#edeaa1"})+">",i,_t("v:shadow",null,s),_t("v:path",null,{"o:connecttype":"none"}),'<v:textbox><div style="text-align:left"></div></v:textbox>','<x:ClientData ObjectType="Note">',"<x:MoveWithCells/>","<x:SizeWithCells/>",yt("x:Anchor",[t.c+1,0,t.r+1,0,t.c+3,20,t.r+5,20].join(",")),yt("x:AutoFill","False"),yt("x:Row",String(t.r)),yt("x:Column",String(t.c)),e[1].hidden?"":"<x:Visible/>","</x:ClientData>","</v:shape>"].join("")}function ou(e,r,t,a){var n=Array.isArray(e);var i;r.forEach(function(r){var s=Da(r.ref);if(n){if(!e[s.r])e[s.r]=[];i=e[s.r][s.c]}else i=e[r.ref];if(!i){i={t:"z"};if(n)e[s.r][s.c]=i;else e[r.ref]=i;var f=Wa(e["!ref"]||"BDWGO1000001:A1");if(f.s.r>s.r)f.s.r=s.r;if(f.e.r<s.r)f.e.r=s.r;if(f.s.c>s.c)f.s.c=s.c;if(f.e.c<s.c)f.e.c=s.c;var c=Ma(f);if(c!==e["!ref"])e["!ref"]=c}if(!i.c)i.c=[];var l={a:r.author,t:r.t,r:r.r,T:t};if(r.h)l.h=r.h;for(var o=i.c.length-1;o>=0;--o){if(!t&&i.c[o].T)return;if(t&&!i.c[o].T)i.c.splice(o,1)}if(t&&a)for(o=0;o<a.length;++o){if(l.a==a[o].id){l.a=a[o].name||l.a;break}}i.c.push(l)})}function uu(e,r){if(e.match(/<(?:\w+:)?comments *\/>/))return[];var t=[];var a=[];var n=e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);if(n&&n[1])n[1].split(/<\/\w*:?author>/).forEach(function(e){if(e===""||e.trim()==="")return;var r=e.match(/<(?:\w+:)?author[^>]*>(.*)/);if(r)t.push(r[1])});var i=e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);if(i&&i[1])i[1].split(/<\/\w*:?comment>/).forEach(function(e){if(e===""||e.trim()==="")return;var n=e.match(/<(?:\w+:)?comment[^>]*>/);if(!n)return;var i=Kr(n[0]);var s={author:i.authorId&&t[i.authorId]||"sheetjsghost",ref:i.ref,guid:i.guid};var f=Da(i.ref);if(r.sheetRows&&r.sheetRows<=f.r)return;var c=e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);var l=!!c&&!!c[1]&&Bc(c[1])||{r:"",t:"",h:""};s.r=l.r;if(l.r=="<t></t>")l.t=l.h="";s.t=(l.t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");if(r.cellHTML)s.h=l.h;a.push(s)});return a}function hu(e){var r=[zr,_t("comments",null,{xmlns:Nt[0]})];var t=[];r.push("<authors>");e.forEach(function(e){e[1].forEach(function(e){var a=tt(e.a);if(t.indexOf(a)==-1){t.push(a);r.push("<author>"+a+"</author>")}if(e.T&&e.ID&&t.indexOf("tc="+e.ID)==-1){t.push("tc="+e.ID);r.push("<author>"+"tc="+e.ID+"</author>")}})});if(t.length==0){t.push("SheetJ5");r.push("<author>SheetJ5</author>")}r.push("</authors>");r.push("<commentList>");e.forEach(function(e){var a=0,n=[];if(e[1][0]&&e[1][0].T&&e[1][0].ID)a=t.indexOf("tc="+e[1][0].ID);else e[1].forEach(function(e){if(e.a)a=t.indexOf(tt(e.a));n.push(e.t||"")});r.push('<comment ref="'+e[0]+'" authorId="'+a+'"><text>');if(n.length<=1)r.push(yt("t",tt(n[0]||"")));else{var i="Comment:\n    "+n[0]+"\n";for(var s=1;s<n.length;++s)i+="Reply:\n    "+n[s]+"\n";r.push(yt("t",tt(i)))}r.push("</text></comment>")});r.push("</commentList>");if(r.length>2){r[r.length]="</comments>";r[1]=r[1].replace("/>",">")}return r.join("")}function du(e,r){var t=[];var a=false,n={},i=0;e.replace(jr,function s(f,c){var l=Kr(f);switch(Zr(l[0])){case"<?xml":break;case"<ThreadedComments":break;case"</ThreadedComments>":break;case"<threadedComment":n={author:l.personId,guid:l.id,ref:l.ref,T:1};break;case"</threadedComment>":if(n.t!=null)t.push(n);break;case"<text>":;case"<text":i=c+f.length;break;case"</text>":n.t=e.slice(i,c).replace(/\r\n/g,"\n").replace(/\r/g,"\n");break;case"<mentions":;case"<mentions>":a=true;break;case"</mentions>":a=false;break;case"<extLst":;case"<extLst>":;case"</extLst>":;case"<extLst/>":break;case"<ext":a=true;break;case"</ext>":a=false;break;default:if(!a&&r.WTF)throw new Error("unrecognized "+l[0]+" in threaded comments");}return f});return t}function vu(e,r,t){var a=[zr,_t("ThreadedComments",null,{xmlns:Rt.TCMNT}).replace(/[\/]>/,">")];e.forEach(function(e){var n="";(e[1]||[]).forEach(function(i,s){if(!i.T){delete i.ID;return}if(i.a&&r.indexOf(i.a)==-1)r.push(i.a);var f={ref:e[0],id:"{54EE7951-7262-4200-6969-"+("000000000000"+t.tcid++).slice(-12)+"}"};if(s==0)n=f.id;else f.parentId=n;i.ID=f.id;if(i.a)f.personId="{54EE7950-7262-4200-6969-"+("000000000000"+r.indexOf(i.a)).slice(-12)+"}";a.push(_t("threadedComment",yt("text",i.t||""),f))})});a.push("</ThreadedComments>");return a.join("")}function pu(e,r){var t=[];var a=false;e.replace(jr,function n(e){var n=Kr(e);switch(Zr(n[0])){case"<?xml":break;case"<personList":break;case"</personList>":break;case"<person":t.push({name:n.displayname,id:n.id});break;case"</person>":break;case"<extLst":;case"<extLst>":;case"</extLst>":;case"<extLst/>":break;case"<ext":a=true;break;case"</ext>":a=false;break;default:if(!a&&r.WTF)throw new Error("unrecognized "+n[0]+" in threaded comments");}return e});return t}function mu(e){var r=[zr,_t("personList",null,{xmlns:Rt.TCMNT,"xmlns:x":Nt[0]}).replace(/[\/]>/,">")];e.forEach(function(e,t){r.push(_t("person",null,{displayName:e,id:"{54EE7950-7262-4200-6969-"+("000000000000"+t).slice(-12)+"}",userId:e,providerId:"None"}))});r.push("</personList>");return r.join("")}function bu(e){var r={};r.iauthor=e._R(4);var t=gn(e,16);r.rfx=t.s;r.ref=Pa(t.s);e.l+=16;return r}function gu(e,r){if(r==null)r=ba(36);r._W(4,e[1].iauthor);wn(e[0],r);r._W(4,0);r._W(4,0);r._W(4,0);r._W(4,0);return r}var wu=Ya;function ku(e){return Ka(e.slice(0,54))}function Tu(e,r){var t=[];var a=[];var n={};var i=false;ga(e,function s(e,f,c){switch(c){case 632:a.push(e);break;case 635:n=e;break;case 637:n.t=e.t;n.h=e.h;n.r=e.r;break;case 636:n.author=a[n.iauthor];delete n.iauthor;if(r.sheetRows&&n.rfx&&r.sheetRows<=n.rfx.r)break;if(!n.t)n.t="";delete n.rfx;t.push(n);break;case 3072:break;case 35:i=true;break;case 36:i=false;break;case 37:break;case 38:break;default:if(f.T){}else if(!i||r.WTF)throw new Error("Unexpected record 0x"+c.toString(16));}});return t}function Eu(e){var r=wa();var t=[];ka(r,628);ka(r,630);e.forEach(function(e){e[1].forEach(function(e){if(t.indexOf(e.a)>-1)return;t.push(e.a.slice(0,54));ka(r,632,ku(e.a))})});ka(r,631);ka(r,633);e.forEach(function(e){e[1].forEach(function(a){a.iauthor=t.indexOf(a.a);var n={s:Da(e[0]),e:Da(e[0])};ka(r,635,gu([n,a]));if(a.t&&a.t.length>0)ka(r,637,rn(a));ka(r,636);delete a.iauthor})});ka(r,634);ka(r,629);return r.end()}var yu="application/vnd.ms-office.vbaProject";function Su(e){var r=qe.utils.cfb_new({root:"R"});e.FullPaths.forEach(function(t,a){if(t.slice(-1)==="/"||!t.match(/_VBA_PROJECT_CUR/))return;var n=t.replace(/^[^\/]*/,"R").replace(/\/_VBA_PROJECT_CUR\u0000*/,"");qe.utils.cfb_add(r,n,e.FileIndex[a].content)});return qe.write(r)}function _u(e,r){r.FullPaths.forEach(function(t,a){if(a==0)return;var n=t.replace(/[^\/]*[\/]/,"/_VBA_PROJECT_CUR/");if(n.slice(-1)!=="/")qe.utils.cfb_add(e,n,r.FileIndex[a].content)})}var Au=["xlsb","xlsm","xlam","biff8","xla"];function xu(){return{"!type":"dialog"}}function Cu(){return{"!type":"dialog"}}function Ou(){return{"!type":"macro"}}function Ru(){return{"!type":"macro"}}var Nu=function(){var e=/(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g;var r={r:0,c:0};function t(e,t,a,n){var i=false,s=false;if(a.length==0)s=true;else if(a.charAt(0)=="["){s=true;a=a.slice(1,-1)}if(n.length==0)i=true;else if(n.charAt(0)=="["){i=true;n=n.slice(1,-1)}var f=a.length>0?parseInt(a,10)|0:0,c=n.length>0?parseInt(n,10)|0:0;if(i)c+=r.c;else--c;if(s)f+=r.r;else--f;return t+(i?"":"$")+Ra(c)+(s?"":"$")+Aa(f)}return function a(n,i){r=i;return n.replace(e,t)}}();var Iu=/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;var Fu=function(){return function e(r,t){return r.replace(Iu,function(e,r,a,n,i,s){var f=Oa(n)-(a?0:t.c);var c=_a(s)-(i?0:t.r);var l=i=="$"?c+1:c==0?"":"["+c+"]";var o=a=="$"?f+1:f==0?"":"["+f+"]";return r+"R"+l+"C"+o})}}();function Du(e,r){return e.replace(Iu,function(e,t,a,n,i,s){return t+(a=="$"?a+n:Ra(Oa(n)+r.c))+(i=="$"?i+s:Aa(_a(s)+r.r))})}function Pu(e,r,t){var a=La(r),n=a.s,i=Da(t);var s={r:i.r-n.r,c:i.c-n.c};return Du(e,s)}function Lu(e){if(e.length==1)return false;return true}function Mu(e){return e.replace(/_xlfn\./g,"")}function Uu(e){e.l+=1;return}function Bu(e,r){var t=e._R(r==1?1:2);return[t&16383,t>>14&1,t>>15&1]}function Wu(e,r,t){var a=2;if(t){if(t.biff>=2&&t.biff<=5)return Hu(e,r,t);else if(t.biff==12)a=4}var n=e._R(a),i=e._R(a);var s=Bu(e,2);var f=Bu(e,2);return{s:{r:n,c:s[0],cRel:s[1],rRel:s[2]},e:{r:i,c:f[0],cRel:f[1],rRel:f[2]}}}function Hu(e){var r=Bu(e,2),t=Bu(e,2);var a=e._R(1);var n=e._R(1);return{s:{r:r[0],c:a,cRel:r[1],rRel:r[2]},e:{r:t[0],c:n,cRel:t[1],rRel:t[2]}}}function zu(e,r,t){if(t.biff<8)return Hu(e,r,t);var a=e._R(t.biff==12?4:2),n=e._R(t.biff==12?4:2);var i=Bu(e,2);var s=Bu(e,2);return{s:{r:a,c:i[0],cRel:i[1],rRel:i[2]},e:{r:n,c:s[0],cRel:s[1],rRel:s[2]}}}function Vu(e,r,t){if(t&&t.biff>=2&&t.biff<=5)return Gu(e,r,t);var a=e._R(t&&t.biff==12?4:2);var n=Bu(e,2);return{r:a,c:n[0],cRel:n[1],rRel:n[2]}}function Gu(e){var r=Bu(e,2);var t=e._R(1);return{r:r[0],c:t,cRel:r[1],rRel:r[2]}}function $u(e){var r=e._R(2);var t=e._R(2);return{r:r,c:t&255,fQuoted:!!(t&16384),cRel:t>>15,rRel:t>>15}}function ju(e,r,t){var a=t&&t.biff?t.biff:8;if(a>=2&&a<=5)return Xu(e,r,t);var n=e._R(a>=12?4:2);var i=e._R(2);var s=(i&16384)>>14,f=(i&32768)>>15;i&=16383;if(f==1)while(n>524287)n-=1048576;if(s==1)while(i>8191)i=i-16384;return{r:n,c:i,cRel:s,rRel:f}}function Xu(e){var r=e._R(2);var t=e._R(1);var a=(r&32768)>>15,n=(r&16384)>>14;r&=16383;if(a==1&&r>=8192)r=r-16384;if(n==1&&t>=128)t=t-256;return{r:r,c:t,cRel:n,rRel:a}}function Yu(e,r,t){var a=(e[e.l++]&96)>>5;var n=Wu(e,t.biff>=2&&t.biff<=5?6:8,t);return[a,n]}function Ku(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2,"i");var i=8;if(t)switch(t.biff){case 5:e.l+=12;i=6;break;case 12:i=12;break;}var s=Wu(e,i,t);return[a,n,s]}function Zu(e,r,t){var a=(e[e.l++]&96)>>5;e.l+=t&&t.biff>8?12:t.biff<8?6:8;return[a]}function Ju(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2);var i=8;if(t)switch(t.biff){case 5:e.l+=12;i=6;break;case 12:i=12;break;}e.l+=i;return[a,n]}function qu(e,r,t){var a=(e[e.l++]&96)>>5;var n=zu(e,r-1,t);return[a,n]}function Qu(e,r,t){var a=(e[e.l++]&96)>>5;e.l+=t.biff==2?6:t.biff==12?14:7;return[a]}function eh(e){var r=e[e.l+1]&1;var t=1;e.l+=4;return[r,t]}function rh(e,r,t){e.l+=2;var a=e._R(t&&t.biff==2?1:2);var n=[];for(var i=0;i<=a;++i)n.push(e._R(t&&t.biff==2?1:2));return n}function th(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=2;return[a,e._R(t&&t.biff==2?1:2)]}function ah(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=2;return[a,e._R(t&&t.biff==2?1:2)]}function nh(e){var r=e[e.l+1]&255?1:0;e.l+=2;return[r,e._R(2)]}function ih(e,r,t){var a=e[e.l+1]&255?1:0;e.l+=t&&t.biff==2?3:4;return[a]}function sh(e){var r=e._R(1),t=e._R(1);return[r,t]}function fh(e){e._R(2);return sh(e,2)}function ch(e){e._R(2);return sh(e,2)}function lh(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=Vu(e,0,t);return[a,n]}function oh(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=ju(e,0,t);return[a,n]}function uh(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=e._R(2);if(t&&t.biff==5)e.l+=12;var i=Vu(e,0,t);return[a,n,i]}function hh(e,r,t){var a=(e[e.l]&96)>>5;e.l+=1;var n=e._R(t&&t.biff<=3?1:2);return[Wd[n],Bd[n],a]}function dh(e,r,t){var a=e[e.l++];var n=e._R(1),i=t&&t.biff<=3?[a==88?-1:0,e._R(1)]:vh(e);return[n,(i[0]===0?Bd:Ud)[i[1]]]}function vh(e){return[e[e.l+1]>>7,e._R(2)&32767]}function ph(e,r,t){e.l+=t&&t.biff==2?3:4;return}function mh(e,r,t){e.l++;if(t&&t.biff==12)return[e._R(4,"i"),0];var a=e._R(2);var n=e._R(t&&t.biff==2?1:2);return[a,n]}function bh(e){e.l++;return Kn[e._R(1)]}function gh(e){e.l++;return e._R(2)}function wh(e){e.l++;return e._R(1)!==0}function kh(e){e.l++;return kn(e,8)}function Th(e,r,t){e.l++;return us(e,r-1,t)}function Eh(e,r){var t=[e._R(1)];if(r==12)switch(t[0]){case 2:t[0]=4;break;case 4:t[0]=16;break;case 0:t[0]=1;break;case 1:t[0]=2;break;}switch(t[0]){case 4:t[1]=ns(e,1)?"TRUE":"FALSE";if(r!=12)e.l+=7;break;case 37:;case 16:t[1]=Kn[e[e.l]];e.l+=r==12?4:8;break;case 0:e.l+=8;break;case 1:t[1]=kn(e,8);break;case 2:t[1]=ms(e,0,{biff:r>0&&r<8?2:r});break;default:throw new Error("Bad SerAr: "+t[0]);}return t}function yh(e,r,t){var a=e._R(t.biff==12?4:2);var n=[];for(var i=0;i!=a;++i)n.push((t.biff==12?gn:Ps)(e,8));return n}function Sh(e,r,t){var a=0,n=0;if(t.biff==12){a=e._R(4);n=e._R(4)}else{n=1+e._R(1);a=1+e._R(2)}if(t.biff>=2&&t.biff<8){--a;if(--n==0)n=256}for(var i=0,s=[];i!=a&&(s[i]=[]);++i)for(var f=0;f!=n;++f)s[i][f]=Eh(e,t.biff);return s}function _h(e,r,t){var a=e._R(1)>>>5&3;var n=!t||t.biff>=8?4:2;var i=e._R(n);switch(t.biff){case 2:e.l+=5;break;case 3:;case 4:e.l+=8;break;case 5:e.l+=12;break;}return[a,0,i]}function Ah(e,r,t){if(t.biff==5)return xh(e,r,t);var a=e._R(1)>>>5&3;var n=e._R(2);var i=e._R(4);return[a,n,i]}function xh(e){var r=e._R(1)>>>5&3;var t=e._R(2,"i");e.l+=8;var a=e._R(2);e.l+=12;return[r,t,a]}function Ch(e,r,t){var a=e._R(1)>>>5&3;e.l+=t&&t.biff==2?3:4;var n=e._R(t&&t.biff==2?1:2);return[a,n]}function Oh(e,r,t){var a=e._R(1)>>>5&3;var n=e._R(t&&t.biff==2?1:2);return[a,n]}function Rh(e,r,t){var a=e._R(1)>>>5&3;e.l+=4;if(t.biff<8)e.l--;if(t.biff==12)e.l+=2;return[a]}function Nh(e,r,t){var a=(e[e.l++]&96)>>5;var n=e._R(2);var i=4;if(t)switch(t.biff){case 5:i=15;break;case 12:i=6;break;}e.l+=i;return[a,n]}var Ih=ma;var Fh=ma;var Dh=ma;function Ph(e,r,t){e.l+=2;return[$u(e,4,t)]}function Lh(e){e.l+=6;return[]}var Mh=Ph;var Uh=Lh;var Bh=Lh;var Wh=Ph;function Hh(e){e.l+=2;return[ss(e),e._R(2)&1]}var zh=Ph;var Vh=Hh;var Gh=Lh;var $h=Ph;var jh=Ph;var Xh=["Data","All","Headers","??","?Data2","??","?DataHeaders","??","Totals","??","??","??","?DataTotals","??","??","??","?Current"];function Yh(e){e.l+=2;var r=e._R(2);var t=e._R(2);var a=e._R(4);var n=e._R(2);var i=e._R(2);var s=Xh[t>>2&31];return{ixti:r,coltype:t&3,rt:s,idx:a,c:n,C:i}}function Kh(e){e.l+=2;return[e._R(4)]}function Zh(e,r,t){e.l+=5;e.l+=2;e.l+=t.biff==2?1:4;return["PTGSHEET"]}function Jh(e,r,t){e.l+=t.biff==2?4:5;return["PTGENDSHEET"]}function qh(e){var r=e._R(1)>>>5&3;var t=e._R(2);return[r,t]}function Qh(e){var r=e._R(1)>>>5&3;var t=e._R(2);return[r,t]}function ed(e){e.l+=4;return[0,0]}var rd={1:{n:"PtgExp",f:mh},2:{n:"PtgTbl",f:Dh},3:{n:"PtgAdd",f:Uu},4:{n:"PtgSub",f:Uu},5:{n:"PtgMul",f:Uu},6:{n:"PtgDiv",f:Uu},7:{n:"PtgPower",f:Uu},8:{n:"PtgConcat",f:Uu},9:{n:"PtgLt",f:Uu},10:{n:"PtgLe",f:Uu},11:{n:"PtgEq",f:Uu},12:{n:"PtgGe",f:Uu},13:{n:"PtgGt",f:Uu},14:{n:"PtgNe",f:Uu},15:{n:"PtgIsect",f:Uu},16:{n:"PtgUnion",f:Uu},17:{n:"PtgRange",f:Uu},18:{n:"PtgUplus",f:Uu},19:{n:"PtgUminus",f:Uu},20:{n:"PtgPercent",f:Uu},21:{n:"PtgParen",f:Uu},22:{n:"PtgMissArg",f:Uu},23:{n:"PtgStr",f:Th},26:{n:"PtgSheet",f:Zh},27:{n:"PtgEndSheet",f:Jh},28:{n:"PtgErr",f:bh},29:{n:"PtgBool",f:wh},30:{n:"PtgInt",f:gh},31:{n:"PtgNum",f:kh},32:{n:"PtgArray",f:Qu},33:{n:"PtgFunc",f:hh},34:{n:"PtgFuncVar",f:dh},35:{n:"PtgName",f:_h},36:{n:"PtgRef",f:lh},37:{n:"PtgArea",f:Yu},38:{n:"PtgMemArea",f:Ch},39:{n:"PtgMemErr",f:Ih},40:{n:"PtgMemNoMem",f:Fh},41:{n:"PtgMemFunc",f:Oh},42:{n:"PtgRefErr",f:Rh},43:{n:"PtgAreaErr",f:Zu},44:{n:"PtgRefN",f:oh},45:{n:"PtgAreaN",f:qu},46:{n:"PtgMemAreaN",f:qh},47:{n:"PtgMemNoMemN",f:Qh},57:{n:"PtgNameX",f:Ah},58:{n:"PtgRef3d",f:uh},59:{n:"PtgArea3d",f:Ku},60:{n:"PtgRefErr3d",f:Nh},61:{n:"PtgAreaErr3d",f:Ju},255:{}};var td={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,78:46,110:46,79:47,111:47,88:34,120:34,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61};var ad={1:{n:"PtgElfLel",f:Hh},2:{n:"PtgElfRw",f:$h},3:{n:"PtgElfCol",f:Mh},6:{n:"PtgElfRwV",f:jh},7:{n:"PtgElfColV",f:Wh},10:{n:"PtgElfRadical",f:zh},11:{n:"PtgElfRadicalS",f:Gh},13:{n:"PtgElfColS",f:Uh},15:{n:"PtgElfColSV",f:Bh},16:{n:"PtgElfRadicalLel",f:Vh},25:{n:"PtgList",f:Yh},29:{n:"PtgSxName",f:Kh},255:{}};var nd={0:{n:"PtgAttrNoop",f:ed},1:{n:"PtgAttrSemi",f:ih},2:{n:"PtgAttrIf",f:ah},4:{n:"PtgAttrChoose",f:rh},8:{n:"PtgAttrGoto",f:th},16:{n:"PtgAttrSum",f:ph},32:{n:"PtgAttrBaxcel",f:eh},33:{n:"PtgAttrBaxcel",f:eh},64:{n:"PtgAttrSpace",f:fh},65:{n:"PtgAttrSpaceSemi",f:ch},128:{n:"PtgAttrIfError",f:nh},255:{}};function id(e,r,t,a){if(a.biff<8)return ma(e,r);var n=e.l+r;var i=[];for(var s=0;s!==t.length;++s){switch(t[s][0]){case"PtgArray":t[s][1]=Sh(e,0,a);i.push(t[s][1]);break;case"PtgMemArea":t[s][2]=yh(e,t[s][1],a);i.push(t[s][2]);break;case"PtgExp":if(a&&a.biff==12){t[s][1][1]=e._R(4);i.push(t[s][1])}break;case"PtgList":;case"PtgElfRadicalS":;case"PtgElfColS":;case"PtgElfColSV":throw"Unsupported "+t[s][0];default:break;}}r=n-e.l;if(r!==0)i.push(ma(e,r));return i}function sd(e,r,t){var a=e.l+r;var n,i,s=[];while(a!=e.l){r=a-e.l;i=e[e.l];n=rd[i]||rd[td[i]];if(i===24||i===25)n=(i===24?ad:nd)[e[e.l+1]];if(!n||!n.f){ma(e,r)}else{s.push([n.n,n.f(e,r,t)])}}return s}function fd(e){var r=[];for(var t=0;t<e.length;++t){var a=e[t],n=[];for(var i=0;i<a.length;++i){var s=a[i];if(s)switch(s[0]){case 2:n.push('"'+s[1].replace(/"/g,'""')+'"');break;default:n.push(s[1]);}else n.push("")}r.push(n.join(","))}return r.join(";")}var cd={PtgAdd:"+",PtgConcat:"&",PtgDiv:"/",PtgEq:"=",PtgGe:">=",PtgGt:">",PtgLe:"<=",PtgLt:"<",PtgMul:"*",PtgNe:"<>",PtgPower:"^",PtgSub:"-"};function ld(e,r){var t=e.lastIndexOf("!"),a=r.lastIndexOf("!");if(t==-1&&a==-1)return e+":"+r;if(t>0&&a>0&&e.slice(0,t).toLowerCase()==r.slice(0,a).toLowerCase())return e+":"+r.slice(a+1);console.error("Cannot hydrate range",e,r);return e+":"+r}function od(e,r,t){if(!e)return"SH33TJSERR0";if(t.biff>8&&(!e.XTI||!e.XTI[r]))return e.SheetNames[r];if(!e.XTI)return"SH33TJSERR6";var a=e.XTI[r];if(t.biff<8){if(r>1e4)r-=65536;if(r<0)r=-r;return r==0?"":e.XTI[r-1]}if(!a)return"SH33TJSERR1";var n="";if(t.biff>8)switch(e[a[0]][0]){case 357:n=a[1]==-1?"#REF":e.SheetNames[a[1]];return a[1]==a[2]?n:n+":"+e.SheetNames[a[2]];case 358:if(t.SID!=null)return e.SheetNames[t.SID];return"SH33TJSSAME"+e[a[0]][0];case 355:;default:return"SH33TJSSRC"+e[a[0]][0];}switch(e[a[0]][0][0]){case 1025:n=a[1]==-1?"#REF":e.SheetNames[a[1]]||"SH33TJSERR3";return a[1]==a[2]?n:n+":"+e.SheetNames[a[2]];case 14849:return e[a[0]].slice(1).map(function(e){return e.Name}).join(";;");default:if(!e[a[0]][0][3])return"SH33TJSERR2";n=a[1]==-1?"#REF":e[a[0]][0][3][a[1]]||"SH33TJSERR4";return a[1]==a[2]?n:n+":"+e[a[0]][0][3][a[2]];}}function ud(e,r,t){var a=od(e,r,t);return a=="#REF"?a:Ba(a,t)}function hd(e,r,t,a,n){var i=n&&n.biff||8;var s={s:{c:0,r:0},e:{c:0,r:0}};var f=[],c,l,o,u=0,h=0,d,v="";if(!e[0]||!e[0][0])return"";var p=-1,m="";for(var b=0,g=e[0].length;b<g;++b){var w=e[0][b];switch(w[0]){case"PtgUminus":f.push("-"+f.pop());break;case"PtgUplus":f.push("+"+f.pop());break;case"PtgPercent":f.push(f.pop()+"%");break;case"PtgAdd":;case"PtgConcat":;case"PtgDiv":;case"PtgEq":;case"PtgGe":;case"PtgGt":;case"PtgLe":;case"PtgLt":;case"PtgMul":;case"PtgNe":;case"PtgPower":;case"PtgSub":c=f.pop();l=f.pop();if(p>=0){switch(e[0][p][1][0]){case 0:m=Er(" ",e[0][p][1][1]);break;case 1:m=Er("\r",e[0][p][1][1]);break;default:m="";if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0]);}l=l+m;p=-1}f.push(l+cd[w[0]]+c);break;case"PtgIsect":c=f.pop();l=f.pop();f.push(l+" "+c);break;case"PtgUnion":c=f.pop();l=f.pop();f.push(l+","+c);break;case"PtgRange":c=f.pop();l=f.pop();f.push(ld(l,c));break;case"PtgAttrChoose":break;case"PtgAttrGoto":break;case"PtgAttrIf":break;case"PtgAttrIfError":break;case"PtgRef":o=Ta(w[1][1],s,n);f.push(ya(o,i));break;case"PtgRefN":o=t?Ta(w[1][1],t,n):w[1][1];f.push(ya(o,i));break;case"PtgRef3d":u=w[1][1];o=Ta(w[1][2],s,n);v=ud(a,u,n);var k=v;f.push(v+"!"+ya(o,i));break;case"PtgFunc":;case"PtgFuncVar":var T=w[1][0],E=w[1][1];if(!T)T=0;T&=127;var y=T==0?[]:f.slice(-T);f.length-=T;if(E==="User")E=y.shift();f.push(E+"("+y.join(",")+")");break;case"PtgBool":f.push(w[1]?"TRUE":"FALSE");break;case"PtgInt":f.push(w[1]);break;case"PtgNum":f.push(String(w[1]));break;case"PtgStr":f.push('"'+w[1].replace(/"/g,'""')+'"');break;case"PtgErr":f.push(w[1]);break;case"PtgAreaN":d=Ea(w[1][1],t?{s:t}:s,n);f.push(Sa(d,n));break;case"PtgArea":d=Ea(w[1][1],s,n);f.push(Sa(d,n));break;case"PtgArea3d":u=w[1][1];d=w[1][2];v=ud(a,u,n);f.push(v+"!"+Sa(d,n));break;case"PtgAttrSum":f.push("SUM("+f.pop()+")");break;case"PtgAttrBaxcel":;case"PtgAttrSemi":break;case"PtgName":h=w[1][2];var S=(a.names||[])[h-1]||(a[0]||[])[h];var _=S?S.Name:"SH33TJSNAME"+String(h);if(_&&_.slice(0,6)=="_xlfn."&&!n.xlfn)_=_.slice(6);f.push(_);break;case"PtgNameX":var A=w[1][1];h=w[1][2];var x;if(n.biff<=5){if(A<0)A=-A;if(a[A])x=a[A][h]}else{var C="";if(((a[A]||[])[0]||[])[0]==14849){}else if(((a[A]||[])[0]||[])[0]==1025){if(a[A][h]&&a[A][h].itab>0){C=a.SheetNames[a[A][h].itab-1]+"!"}}else C=a.SheetNames[h-1]+"!";if(a[A]&&a[A][h])C+=a[A][h].Name;else if(a[0]&&a[0][h])C+=a[0][h].Name;else{var O=(od(a,A,n)||"").split(";;");if(O[h-1])C=O[h-1];else C+="SH33TJSERRX"}f.push(C);break}if(!x)x={Name:"SH33TJSERRY"};f.push(x.Name);break;case"PtgParen":var R="(",N=")";if(p>=0){m="";switch(e[0][p][1][0]){case 2:R=Er(" ",e[0][p][1][1])+R;break;case 3:R=Er("\r",e[0][p][1][1])+R;break;case 4:N=Er(" ",e[0][p][1][1])+N;break;case 5:N=Er("\r",e[0][p][1][1])+N;break;default:if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0]);}p=-1}f.push(R+f.pop()+N);break;case"PtgRefErr":f.push("#REF!");break;case"PtgRefErr3d":f.push("#REF!");break;case"PtgExp":o={c:w[1][1],r:w[1][0]};var I={c:t.c,r:t.r};if(a.sharedf[Pa(o)]){var F=a.sharedf[Pa(o)];f.push(hd(F,s,I,a,n));
}else{var D=false;for(c=0;c!=a.arrayf.length;++c){l=a.arrayf[c];if(o.c<l[0].s.c||o.c>l[0].e.c)continue;if(o.r<l[0].s.r||o.r>l[0].e.r)continue;f.push(hd(l[1],s,I,a,n));D=true;break}if(!D)f.push(w[1])}break;case"PtgArray":f.push("{"+fd(w[1])+"}");break;case"PtgMemArea":break;case"PtgAttrSpace":;case"PtgAttrSpaceSemi":p=b;break;case"PtgTbl":break;case"PtgMemErr":break;case"PtgMissArg":f.push("");break;case"PtgAreaErr":f.push("#REF!");break;case"PtgAreaErr3d":f.push("#REF!");break;case"PtgList":f.push("Table"+w[1].idx+"[#"+w[1].rt+"]");break;case"PtgMemAreaN":;case"PtgMemNoMemN":;case"PtgAttrNoop":;case"PtgSheet":;case"PtgEndSheet":break;case"PtgMemFunc":break;case"PtgMemNoMem":break;case"PtgElfCol":;case"PtgElfColS":;case"PtgElfColSV":;case"PtgElfColV":;case"PtgElfLel":;case"PtgElfRadical":;case"PtgElfRadicalLel":;case"PtgElfRadicalS":;case"PtgElfRw":;case"PtgElfRwV":throw new Error("Unsupported ELFs");case"PtgSxName":throw new Error("Unrecognized Formula Token: "+String(w));default:throw new Error("Unrecognized Formula Token: "+String(w));}var P=["PtgAttrSpace","PtgAttrSpaceSemi","PtgAttrGoto"];if(n.biff!=3)if(p>=0&&P.indexOf(e[0][b][0])==-1){w=e[0][p];var L=true;switch(w[1][0]){case 4:L=false;case 0:m=Er(" ",w[1][1]);break;case 5:L=false;case 1:m=Er("\r",w[1][1]);break;default:m="";if(n.WTF)throw new Error("Unexpected PtgAttrSpaceType "+w[1][0]);}f.push((L?m:"")+f.pop()+(L?"":m));p=-1}}if(f.length>1&&n.WTF)throw new Error("bad formula stack");if(f[0]=="TRUE")return true;if(f[0]=="FALSE")return false;return f[0]}function dd(e,r,t){var a=e.l+r,n=t.biff==2?1:2;var i,s=e._R(n);if(s==65535)return[[],ma(e,r-2)];var f=sd(e,s,t);if(r!==s+n)i=id(e,r-s-n,f,t);e.l=a;return[f,i]}function vd(e,r,t){var a=e.l+r,n=t.biff==2?1:2;var i,s=e._R(n);if(s==65535)return[[],ma(e,r-2)];var f=sd(e,s,t);if(r!==s+n)i=id(e,r-s-n,f,t);e.l=a;return[f,i]}function pd(e,r,t,a){var n=e.l+r;var i=sd(e,a,t);var s;if(n!==e.l)s=id(e,n-e.l,i,t);return[i,s]}function md(e,r,t){var a=e.l+r;var n,i=e._R(2);var s=sd(e,i,t);if(i==65535)return[[],ma(e,r-2)];if(r!==i+2)n=id(e,a-i-2,s,t);return[s,n]}function bd(e){var r;if(na(e,e.l+6)!==65535)return[kn(e),"n"];switch(e[e.l]){case 0:e.l+=8;return["String","s"];case 1:r=e[e.l+2]===1;e.l+=8;return[r,"b"];case 2:r=e[e.l+2];e.l+=8;return[r,"e"];case 3:e.l+=8;return["","s"];}return[]}function gd(e){if(e==null){var r=ba(8);r._W(1,3);r._W(1,0);r._W(2,0);r._W(2,0);r._W(2,65535);return r}else if(typeof e=="number")return Tn(e);return Tn(0)}function wd(e,r,t){var a=e.l+r;var n=Cs(e,6);if(t.biff==2)++e.l;var i=bd(e,8);var s=e._R(1);if(t.biff!=2){e._R(1);if(t.biff>=5){e._R(4)}}var f=vd(e,a-e.l,t);return{cell:n,val:i[0],formula:f,shared:s>>3&1,tt:i[1]}}function kd(e,r,t,a,n){var i=Os(r,t,n);var s=gd(e.v);var f=ba(6);var c=1|32;f._W(2,c);f._W(4,0);var l=ba(e.bf.length);for(var o=0;o<e.bf.length;++o)l[o]=e.bf[o];var u=N([i,s,f,l]);return u}function Td(e,r,t){var a=e._R(4);var n=sd(e,a,t);var i=e._R(4);var s=i>0?id(e,i,n,t):null;return[n,s]}var Ed=Td;var yd=Td;var Sd=Td;var _d=Td;function Ad(e){if((e|0)==e&&e<Math.pow(2,16)&&e>=0){var r=ba(11);r._W(4,3);r._W(1,30);r._W(2,e);r._W(4,0);return r}var t=ba(17);t._W(4,11);t._W(1,31);t._W(8,e);t._W(4,0);return t}function xd(e){var r=ba(10);r._W(4,2);r._W(1,28);r._W(1,e);r._W(4,0);return r}function Cd(e){var r=ba(10);r._W(4,2);r._W(1,29);r._W(1,e?1:0);r._W(4,0);return r}function Od(e){var r=ba(7);r._W(4,3+2*e.length);r._W(1,23);r._W(2,e.length);var t=ba(2*e.length);t._W(2*e.length,e,"utf16le");var a=ba(4);a._W(4,0);return N([r,t,a])}function Rd(e){var r=Da(e);var t=ba(15);t._W(4,7);t._W(1,4|1<<5);t._W(4,r.r);t._W(2,r.c|(e.charAt(0)=="$"?0:1)<<14|(e.match(/\$\d/)?0:1)<<15);t._W(4,0);return t}function Nd(e,r){var t=e.lastIndexOf("!");var a=e.slice(0,t);e=e.slice(t+1);var n=Da(e);if(a.charAt(0)=="'")a=a.slice(1,-1).replace(/''/g,"'");var i=ba(17);i._W(4,9);i._W(1,26|1<<5);i._W(2,2+r.SheetNames.map(function(e){return e.toLowerCase()}).indexOf(a.toLowerCase()));i._W(4,n.r);i._W(2,n.c|(e.charAt(0)=="$"?0:1)<<14|(e.match(/\$\d/)?0:1)<<15);i._W(4,0);return i}function Id(e,r){var t=e.lastIndexOf("!");var a=e.slice(0,t);e=e.slice(t+1);if(a.charAt(0)=="'")a=a.slice(1,-1).replace(/''/g,"'");var n=ba(17);n._W(4,9);n._W(1,28|1<<5);n._W(2,2+r.SheetNames.map(function(e){return e.toLowerCase()}).indexOf(a.toLowerCase()));n._W(4,0);n._W(2,0);n._W(4,0);return n}function Fd(e){var r=e.split(":"),t=r[0];var a=ba(23);a._W(4,15);t=r[0];var n=Da(t);a._W(1,4|1<<5);a._W(4,n.r);a._W(2,n.c|(t.charAt(0)=="$"?0:1)<<14|(t.match(/\$\d/)?0:1)<<15);a._W(4,0);t=r[1];n=Da(t);a._W(1,4|1<<5);a._W(4,n.r);a._W(2,n.c|(t.charAt(0)=="$"?0:1)<<14|(t.match(/\$\d/)?0:1)<<15);a._W(4,0);a._W(1,17);a._W(4,0);return a}function Dd(e,r){var t=e.lastIndexOf("!");var a=e.slice(0,t);e=e.slice(t+1);if(a.charAt(0)=="'")a=a.slice(1,-1).replace(/''/g,"'");var n=e.split(":");s=n[0];var i=ba(27);i._W(4,19);var s=n[0],f=Da(s);i._W(1,26|1<<5);i._W(2,2+r.SheetNames.map(function(e){return e.toLowerCase()}).indexOf(a.toLowerCase()));i._W(4,f.r);i._W(2,f.c|(s.charAt(0)=="$"?0:1)<<14|(s.match(/\$\d/)?0:1)<<15);s=n[1];f=Da(s);i._W(1,26|1<<5);i._W(2,2+r.SheetNames.map(function(e){return e.toLowerCase()}).indexOf(a.toLowerCase()));i._W(4,f.r);i._W(2,f.c|(s.charAt(0)=="$"?0:1)<<14|(s.match(/\$\d/)?0:1)<<15);i._W(1,17);i._W(4,0);return i}function Pd(e,r){var t=e.lastIndexOf("!");var a=e.slice(0,t);e=e.slice(t+1);if(a.charAt(0)=="'")a=a.slice(1,-1).replace(/''/g,"'");var n=La(e);var i=ba(23);i._W(4,15);i._W(1,27|1<<5);i._W(2,2+r.SheetNames.map(function(e){return e.toLowerCase()}).indexOf(a.toLowerCase()));i._W(4,n.s.r);i._W(4,n.e.r);i._W(2,n.s.c);i._W(2,n.e.c);i._W(4,0);return i}function Ld(e,r){if(typeof e=="number")return Ad(e);if(typeof e=="boolean")return Cd(e);if(/^#(DIV\/0!|GETTING_DATA|N\/A|NAME\?|NULL!|NUM!|REF!|VALUE!)$/.test(e))return xd(+Zn[e]);if(e.match(/^\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/))return Rd(e);if(e.match(/^\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/))return Fd(e);if(e.match(/^#REF!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/))return Pd(e,r);if(e.match(/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/))return Nd(e,r);if(e.match(/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/))return Dd(e,r);if(/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!#REF!$/.test(e))return Id(e,r);if(/^".*"$/.test(e))return Od(e);if(/^[+-]\d+$/.test(e))return Ad(parseInt(e,10));throw"Formula |"+e+"| not supported for XLSB"}var Md=Ld;var Ud={0:"BEEP",1:"OPEN",2:"OPEN.LINKS",3:"CLOSE.ALL",4:"SAVE",5:"SAVE.AS",6:"FILE.DELETE",7:"PAGE.SETUP",8:"PRINT",9:"PRINTER.SETUP",10:"QUIT",11:"NEW.WINDOW",12:"ARRANGE.ALL",13:"WINDOW.SIZE",14:"WINDOW.MOVE",15:"FULL",16:"CLOSE",17:"RUN",22:"SET.PRINT.AREA",23:"SET.PRINT.TITLES",24:"SET.PAGE.BREAK",25:"REMOVE.PAGE.BREAK",26:"FONT",27:"DISPLAY",28:"PROTECT.DOCUMENT",29:"PRECISION",30:"A1.R1C1",31:"CALCULATE.NOW",32:"CALCULATION",34:"DATA.FIND",35:"EXTRACT",36:"DATA.DELETE",37:"SET.DATABASE",38:"SET.CRITERIA",39:"SORT",40:"DATA.SERIES",41:"TABLE",42:"FORMAT.NUMBER",43:"ALIGNMENT",44:"STYLE",45:"BORDER",46:"CELL.PROTECTION",47:"COLUMN.WIDTH",48:"UNDO",49:"CUT",50:"COPY",51:"PASTE",52:"CLEAR",53:"PASTE.SPECIAL",54:"EDIT.DELETE",55:"INSERT",56:"FILL.RIGHT",57:"FILL.DOWN",61:"DEFINE.NAME",62:"CREATE.NAMES",63:"FORMULA.GOTO",64:"FORMULA.FIND",65:"SELECT.LAST.CELL",66:"SHOW.ACTIVE.CELL",67:"GALLERY.AREA",68:"GALLERY.BAR",69:"GALLERY.COLUMN",70:"GALLERY.LINE",71:"GALLERY.PIE",72:"GALLERY.SCATTER",73:"COMBINATION",74:"PREFERRED",75:"ADD.OVERLAY",76:"GRIDLINES",77:"SET.PREFERRED",78:"AXES",79:"LEGEND",80:"ATTACH.TEXT",81:"ADD.ARROW",82:"SELECT.CHART",83:"SELECT.PLOT.AREA",84:"PATTERNS",85:"MAIN.CHART",86:"OVERLAY",87:"SCALE",88:"FORMAT.LEGEND",89:"FORMAT.TEXT",90:"EDIT.REPEAT",91:"PARSE",92:"JUSTIFY",93:"HIDE",94:"UNHIDE",95:"WORKSPACE",96:"FORMULA",97:"FORMULA.FILL",98:"FORMULA.ARRAY",99:"DATA.FIND.NEXT",100:"DATA.FIND.PREV",101:"FORMULA.FIND.NEXT",102:"FORMULA.FIND.PREV",103:"ACTIVATE",104:"ACTIVATE.NEXT",105:"ACTIVATE.PREV",106:"UNLOCKED.NEXT",107:"UNLOCKED.PREV",108:"COPY.PICTURE",109:"SELECT",110:"DELETE.NAME",111:"DELETE.FORMAT",112:"VLINE",113:"HLINE",114:"VPAGE",115:"HPAGE",116:"VSCROLL",117:"HSCROLL",118:"ALERT",119:"NEW",120:"CANCEL.COPY",121:"SHOW.CLIPBOARD",122:"MESSAGE",124:"PASTE.LINK",125:"APP.ACTIVATE",126:"DELETE.ARROW",127:"ROW.HEIGHT",128:"FORMAT.MOVE",129:"FORMAT.SIZE",130:"FORMULA.REPLACE",131:"SEND.KEYS",132:"SELECT.SPECIAL",133:"APPLY.NAMES",134:"REPLACE.FONT",135:"FREEZE.PANES",136:"SHOW.INFO",137:"SPLIT",138:"ON.WINDOW",139:"ON.DATA",140:"DISABLE.INPUT",142:"OUTLINE",143:"LIST.NAMES",144:"FILE.CLOSE",145:"SAVE.WORKBOOK",146:"DATA.FORM",147:"COPY.CHART",148:"ON.TIME",149:"WAIT",150:"FORMAT.FONT",151:"FILL.UP",152:"FILL.LEFT",153:"DELETE.OVERLAY",155:"SHORT.MENUS",159:"SET.UPDATE.STATUS",161:"COLOR.PALETTE",162:"DELETE.STYLE",163:"WINDOW.RESTORE",164:"WINDOW.MAXIMIZE",166:"CHANGE.LINK",167:"CALCULATE.DOCUMENT",168:"ON.KEY",169:"APP.RESTORE",170:"APP.MOVE",171:"APP.SIZE",172:"APP.MINIMIZE",173:"APP.MAXIMIZE",174:"BRING.TO.FRONT",175:"SEND.TO.BACK",185:"MAIN.CHART.TYPE",186:"OVERLAY.CHART.TYPE",187:"SELECT.END",188:"OPEN.MAIL",189:"SEND.MAIL",190:"STANDARD.FONT",191:"CONSOLIDATE",192:"SORT.SPECIAL",193:"GALLERY.3D.AREA",194:"GALLERY.3D.COLUMN",195:"GALLERY.3D.LINE",196:"GALLERY.3D.PIE",197:"VIEW.3D",198:"GOAL.SEEK",199:"WORKGROUP",200:"FILL.GROUP",201:"UPDATE.LINK",202:"PROMOTE",203:"DEMOTE",204:"SHOW.DETAIL",206:"UNGROUP",207:"OBJECT.PROPERTIES",208:"SAVE.NEW.OBJECT",209:"SHARE",210:"SHARE.NAME",211:"DUPLICATE",212:"APPLY.STYLE",213:"ASSIGN.TO.OBJECT",214:"OBJECT.PROTECTION",215:"HIDE.OBJECT",216:"SET.EXTRACT",217:"CREATE.PUBLISHER",218:"SUBSCRIBE.TO",219:"ATTRIBUTES",220:"SHOW.TOOLBAR",222:"PRINT.PREVIEW",223:"EDIT.COLOR",224:"SHOW.LEVELS",225:"FORMAT.MAIN",226:"FORMAT.OVERLAY",227:"ON.RECALC",228:"EDIT.SERIES",229:"DEFINE.STYLE",240:"LINE.PRINT",243:"ENTER.DATA",249:"GALLERY.RADAR",250:"MERGE.STYLES",251:"EDITION.OPTIONS",252:"PASTE.PICTURE",253:"PASTE.PICTURE.LINK",254:"SPELLING",256:"ZOOM",259:"INSERT.OBJECT",260:"WINDOW.MINIMIZE",265:"SOUND.NOTE",266:"SOUND.PLAY",267:"FORMAT.SHAPE",268:"EXTEND.POLYGON",269:"FORMAT.AUTO",272:"GALLERY.3D.BAR",273:"GALLERY.3D.SURFACE",274:"FILL.AUTO",276:"CUSTOMIZE.TOOLBAR",277:"ADD.TOOL",278:"EDIT.OBJECT",279:"ON.DOUBLECLICK",280:"ON.ENTRY",281:"WORKBOOK.ADD",282:"WORKBOOK.MOVE",283:"WORKBOOK.COPY",284:"WORKBOOK.OPTIONS",285:"SAVE.WORKSPACE",288:"CHART.WIZARD",289:"DELETE.TOOL",290:"MOVE.TOOL",291:"WORKBOOK.SELECT",292:"WORKBOOK.ACTIVATE",293:"ASSIGN.TO.TOOL",295:"COPY.TOOL",296:"RESET.TOOL",297:"CONSTRAIN.NUMERIC",298:"PASTE.TOOL",302:"WORKBOOK.NEW",305:"SCENARIO.CELLS",306:"SCENARIO.DELETE",307:"SCENARIO.ADD",308:"SCENARIO.EDIT",309:"SCENARIO.SHOW",310:"SCENARIO.SHOW.NEXT",311:"SCENARIO.SUMMARY",312:"PIVOT.TABLE.WIZARD",313:"PIVOT.FIELD.PROPERTIES",314:"PIVOT.FIELD",315:"PIVOT.ITEM",316:"PIVOT.ADD.FIELDS",318:"OPTIONS.CALCULATION",319:"OPTIONS.EDIT",320:"OPTIONS.VIEW",321:"ADDIN.MANAGER",322:"MENU.EDITOR",323:"ATTACH.TOOLBARS",324:"VBAActivate",325:"OPTIONS.CHART",328:"VBA.INSERT.FILE",330:"VBA.PROCEDURE.DEFINITION",336:"ROUTING.SLIP",338:"ROUTE.DOCUMENT",339:"MAIL.LOGON",342:"INSERT.PICTURE",343:"EDIT.TOOL",344:"GALLERY.DOUGHNUT",350:"CHART.TREND",352:"PIVOT.ITEM.PROPERTIES",354:"WORKBOOK.INSERT",355:"OPTIONS.TRANSITION",356:"OPTIONS.GENERAL",370:"FILTER.ADVANCED",373:"MAIL.ADD.MAILER",374:"MAIL.DELETE.MAILER",375:"MAIL.REPLY",376:"MAIL.REPLY.ALL",377:"MAIL.FORWARD",378:"MAIL.NEXT.LETTER",379:"DATA.LABEL",380:"INSERT.TITLE",381:"FONT.PROPERTIES",382:"MACRO.OPTIONS",383:"WORKBOOK.HIDE",384:"WORKBOOK.UNHIDE",385:"WORKBOOK.DELETE",386:"WORKBOOK.NAME",388:"GALLERY.CUSTOM",390:"ADD.CHART.AUTOFORMAT",391:"DELETE.CHART.AUTOFORMAT",392:"CHART.ADD.DATA",393:"AUTO.OUTLINE",394:"TAB.ORDER",395:"SHOW.DIALOG",396:"SELECT.ALL",397:"UNGROUP.SHEETS",398:"SUBTOTAL.CREATE",399:"SUBTOTAL.REMOVE",400:"RENAME.OBJECT",412:"WORKBOOK.SCROLL",413:"WORKBOOK.NEXT",414:"WORKBOOK.PREV",415:"WORKBOOK.TAB.SPLIT",416:"FULL.SCREEN",417:"WORKBOOK.PROTECT",420:"SCROLLBAR.PROPERTIES",421:"PIVOT.SHOW.PAGES",422:"TEXT.TO.COLUMNS",423:"FORMAT.CHARTTYPE",424:"LINK.FORMAT",425:"TRACER.DISPLAY",430:"TRACER.NAVIGATE",431:"TRACER.CLEAR",432:"TRACER.ERROR",433:"PIVOT.FIELD.GROUP",434:"PIVOT.FIELD.UNGROUP",435:"CHECKBOX.PROPERTIES",436:"LABEL.PROPERTIES",437:"LISTBOX.PROPERTIES",438:"EDITBOX.PROPERTIES",439:"PIVOT.REFRESH",440:"LINK.COMBO",441:"OPEN.TEXT",442:"HIDE.DIALOG",443:"SET.DIALOG.FOCUS",444:"ENABLE.OBJECT",445:"PUSHBUTTON.PROPERTIES",446:"SET.DIALOG.DEFAULT",447:"FILTER",448:"FILTER.SHOW.ALL",449:"CLEAR.OUTLINE",450:"FUNCTION.WIZARD",451:"ADD.LIST.ITEM",452:"SET.LIST.ITEM",453:"REMOVE.LIST.ITEM",454:"SELECT.LIST.ITEM",455:"SET.CONTROL.VALUE",456:"SAVE.COPY.AS",458:"OPTIONS.LISTS.ADD",459:"OPTIONS.LISTS.DELETE",460:"SERIES.AXES",461:"SERIES.X",462:"SERIES.Y",463:"ERRORBAR.X",464:"ERRORBAR.Y",465:"FORMAT.CHART",466:"SERIES.ORDER",467:"MAIL.LOGOFF",468:"CLEAR.ROUTING.SLIP",469:"APP.ACTIVATE.MICROSOFT",470:"MAIL.EDIT.MAILER",471:"ON.SHEET",472:"STANDARD.WIDTH",473:"SCENARIO.MERGE",474:"SUMMARY.INFO",475:"FIND.FILE",476:"ACTIVE.CELL.FONT",477:"ENABLE.TIPWIZARD",478:"VBA.MAKE.ADDIN",480:"INSERTDATATABLE",481:"WORKGROUP.OPTIONS",482:"MAIL.SEND.MAILER",485:"AUTOCORRECT",489:"POST.DOCUMENT",491:"PICKLIST",493:"VIEW.SHOW",494:"VIEW.DEFINE",495:"VIEW.DELETE",509:"SHEET.BACKGROUND",510:"INSERT.MAP.OBJECT",511:"OPTIONS.MENONO",517:"MSOCHECKS",518:"NORMAL",519:"LAYOUT",520:"RM.PRINT.AREA",521:"CLEAR.PRINT.AREA",522:"ADD.PRINT.AREA",523:"MOVE.BRK",545:"HIDECURR.NOTE",546:"HIDEALL.NOTES",547:"DELETE.NOTE",548:"TRAVERSE.NOTES",549:"ACTIVATE.NOTES",620:"PROTECT.REVISIONS",621:"UNPROTECT.REVISIONS",647:"OPTIONS.ME",653:"WEB.PUBLISH",667:"NEWWEBQUERY",673:"PIVOT.TABLE.CHART",753:"OPTIONS.SAVE",755:"OPTIONS.SPELL",808:"HIDEALL.INKANNOTS"};var Bd={0:"COUNT",1:"IF",2:"ISNA",3:"ISERROR",4:"SUM",5:"AVERAGE",6:"MIN",7:"MAX",8:"ROW",9:"COLUMN",10:"NA",11:"NPV",12:"STDEV",13:"DOLLAR",14:"FIXED",15:"SIN",16:"COS",17:"TAN",18:"ATAN",19:"PI",20:"SQRT",21:"EXP",22:"LN",23:"LOG10",24:"ABS",25:"INT",26:"SIGN",27:"ROUND",28:"LOOKUP",29:"INDEX",30:"REPT",31:"MID",32:"LEN",33:"VALUE",34:"TRUE",35:"FALSE",36:"AND",37:"OR",38:"NOT",39:"MOD",40:"DCOUNT",41:"DSUM",42:"DAVERAGE",43:"DMIN",44:"DMAX",45:"DSTDEV",46:"VAR",47:"DVAR",48:"TEXT",49:"LINEST",50:"TREND",51:"LOGEST",52:"GROWTH",53:"GOTO",54:"HALT",55:"RETURN",56:"PV",57:"FV",58:"NPER",59:"PMT",60:"RATE",61:"MIRR",62:"IRR",63:"RAND",64:"MATCH",65:"DATE",66:"TIME",67:"DAY",68:"MONTH",69:"YEAR",70:"WEEKDAY",71:"HOUR",72:"MINUTE",73:"SECOND",74:"NOW",75:"AREAS",76:"ROWS",77:"COLUMNS",78:"OFFSET",79:"ABSREF",80:"RELREF",81:"ARGUMENT",82:"SEARCH",83:"TRANSPOSE",84:"ERROR",85:"STEP",86:"TYPE",87:"ECHO",88:"SET.NAME",89:"CALLER",90:"DEREF",91:"WINDOWS",92:"SERIES",93:"DOCUMENTS",94:"ACTIVE.CELL",95:"SELECTION",96:"RESULT",97:"ATAN2",98:"ASIN",99:"ACOS",100:"CHOOSE",101:"HLOOKUP",102:"VLOOKUP",103:"LINKS",104:"INPUT",105:"ISREF",106:"GET.FORMULA",107:"GET.NAME",108:"SET.VALUE",109:"LOG",110:"EXEC",111:"CHAR",112:"LOWER",113:"UPPER",114:"PROPER",115:"LEFT",116:"RIGHT",117:"EXACT",118:"TRIM",119:"REPLACE",120:"SUBSTITUTE",121:"CODE",122:"NAMES",123:"DIRECTORY",124:"FIND",125:"CELL",126:"ISERR",127:"ISTEXT",128:"ISNUMBER",129:"ISBLANK",130:"T",131:"N",132:"FOPEN",133:"FCLOSE",134:"FSIZE",135:"FREADLN",136:"FREAD",137:"FWRITELN",138:"FWRITE",139:"FPOS",140:"DATEVALUE",141:"TIMEVALUE",142:"SLN",143:"SYD",144:"DDB",145:"GET.DEF",146:"REFTEXT",147:"TEXTREF",148:"INDIRECT",149:"REGISTER",150:"CALL",151:"ADD.BAR",152:"ADD.MENU",153:"ADD.COMMAND",154:"ENABLE.COMMAND",155:"CHECK.COMMAND",156:"RENAME.COMMAND",157:"SHOW.BAR",158:"DELETE.MENU",159:"DELETE.COMMAND",160:"GET.CHART.ITEM",161:"DIALOG.BOX",162:"CLEAN",163:"MDETERM",164:"MINVERSE",165:"MMULT",166:"FILES",167:"IPMT",168:"PPMT",169:"COUNTA",170:"CANCEL.KEY",171:"FOR",172:"WHILE",173:"BREAK",174:"NEXT",175:"INITIATE",176:"REQUEST",177:"POKE",178:"EXECUTE",179:"TERMINATE",180:"RESTART",181:"HELP",182:"GET.BAR",183:"PRODUCT",184:"FACT",185:"GET.CELL",186:"GET.WORKSPACE",187:"GET.WINDOW",188:"GET.DOCUMENT",189:"DPRODUCT",190:"ISNONTEXT",191:"GET.NOTE",192:"NOTE",193:"STDEVP",194:"VARP",195:"DSTDEVP",196:"DVARP",197:"TRUNC",198:"ISLOGICAL",199:"DCOUNTA",200:"DELETE.BAR",201:"UNREGISTER",204:"USDOLLAR",205:"FINDB",206:"SEARCHB",207:"REPLACEB",208:"LEFTB",209:"RIGHTB",210:"MIDB",211:"LENB",212:"ROUNDUP",213:"ROUNDDOWN",214:"ASC",215:"DBCS",216:"RANK",219:"ADDRESS",220:"DAYS360",221:"TODAY",222:"VDB",223:"ELSE",224:"ELSE.IF",225:"END.IF",226:"FOR.CELL",227:"MEDIAN",228:"SUMPRODUCT",229:"SINH",230:"COSH",231:"TANH",232:"ASINH",233:"ACOSH",234:"ATANH",235:"DGET",236:"CREATE.OBJECT",237:"VOLATILE",238:"LAST.ERROR",239:"CUSTOM.UNDO",240:"CUSTOM.REPEAT",241:"FORMULA.CONVERT",242:"GET.LINK.INFO",243:"TEXT.BOX",244:"INFO",245:"GROUP",246:"GET.OBJECT",247:"DB",248:"PAUSE",251:"RESUME",252:"FREQUENCY",253:"ADD.TOOLBAR",254:"DELETE.TOOLBAR",255:"User",256:"RESET.TOOLBAR",257:"EVALUATE",258:"GET.TOOLBAR",259:"GET.TOOL",260:"SPELLING.CHECK",261:"ERROR.TYPE",262:"APP.TITLE",263:"WINDOW.TITLE",264:"SAVE.TOOLBAR",265:"ENABLE.TOOL",266:"PRESS.TOOL",267:"REGISTER.ID",268:"GET.WORKBOOK",269:"AVEDEV",270:"BETADIST",271:"GAMMALN",272:"BETAINV",273:"BINOMDIST",274:"CHIDIST",275:"CHIINV",276:"COMBIN",277:"CONFIDENCE",278:"CRITBINOM",279:"EVEN",280:"EXPONDIST",281:"FDIST",282:"FINV",283:"FISHER",284:"FISHERINV",285:"FLOOR",286:"GAMMADIST",287:"GAMMAINV",288:"CEILING",289:"HYPGEOMDIST",290:"LOGNORMDIST",291:"LOGINV",292:"NEGBINOMDIST",293:"NORMDIST",294:"NORMSDIST",295:"NORMINV",296:"NORMSINV",297:"STANDARDIZE",298:"ODD",299:"PERMUT",300:"POISSON",301:"TDIST",302:"WEIBULL",303:"SUMXMY2",304:"SUMX2MY2",305:"SUMX2PY2",306:"CHITEST",307:"CORREL",308:"COVAR",309:"FORECAST",310:"FTEST",311:"INTERCEPT",312:"PEARSON",313:"RSQ",314:"STEYX",315:"SLOPE",316:"TTEST",317:"PROB",318:"DEVSQ",319:"GEOMEAN",320:"HARMEAN",321:"SUMSQ",322:"KURT",323:"SKEW",324:"ZTEST",325:"LARGE",326:"SMALL",327:"QUARTILE",328:"PERCENTILE",329:"PERCENTRANK",330:"MODE",331:"TRIMMEAN",332:"TINV",334:"MOVIE.COMMAND",335:"GET.MOVIE",336:"CONCATENATE",337:"POWER",338:"PIVOT.ADD.DATA",339:"GET.PIVOT.TABLE",340:"GET.PIVOT.FIELD",341:"GET.PIVOT.ITEM",342:"RADIANS",343:"DEGREES",344:"SUBTOTAL",345:"SUMIF",346:"COUNTIF",347:"COUNTBLANK",348:"SCENARIO.GET",349:"OPTIONS.LISTS.GET",350:"ISPMT",351:"DATEDIF",352:"DATESTRING",353:"NUMBERSTRING",354:"ROMAN",355:"OPEN.DIALOG",356:"SAVE.DIALOG",357:"VIEW.GET",358:"GETPIVOTDATA",359:"HYPERLINK",360:"PHONETIC",361:"AVERAGEA",362:"MAXA",363:"MINA",364:"STDEVPA",365:"VARPA",366:"STDEVA",367:"VARA",368:"BAHTTEXT",369:"THAIDAYOFWEEK",370:"THAIDIGIT",371:"THAIMONTHOFYEAR",372:"THAINUMSOUND",373:"THAINUMSTRING",374:"THAISTRINGLENGTH",375:"ISTHAIDIGIT",376:"ROUNDBAHTDOWN",377:"ROUNDBAHTUP",378:"THAIYEAR",379:"RTD",380:"CUBEVALUE",381:"CUBEMEMBER",382:"CUBEMEMBERPROPERTY",383:"CUBERANKEDMEMBER",384:"HEX2BIN",385:"HEX2DEC",386:"HEX2OCT",387:"DEC2BIN",388:"DEC2HEX",389:"DEC2OCT",390:"OCT2BIN",391:"OCT2HEX",392:"OCT2DEC",393:"BIN2DEC",394:"BIN2OCT",395:"BIN2HEX",396:"IMSUB",397:"IMDIV",398:"IMPOWER",399:"IMABS",400:"IMSQRT",401:"IMLN",402:"IMLOG2",403:"IMLOG10",404:"IMSIN",405:"IMCOS",406:"IMEXP",407:"IMARGUMENT",408:"IMCONJUGATE",409:"IMAGINARY",410:"IMREAL",411:"COMPLEX",412:"IMSUM",413:"IMPRODUCT",414:"SERIESSUM",415:"FACTDOUBLE",416:"SQRTPI",417:"QUOTIENT",418:"DELTA",419:"GESTEP",420:"ISEVEN",421:"ISODD",422:"MROUND",423:"ERF",424:"ERFC",425:"BESSELJ",426:"BESSELK",427:"BESSELY",428:"BESSELI",429:"XIRR",430:"XNPV",431:"PRICEMAT",432:"YIELDMAT",433:"INTRATE",434:"RECEIVED",435:"DISC",436:"PRICEDISC",437:"YIELDDISC",438:"TBILLEQ",439:"TBILLPRICE",440:"TBILLYIELD",441:"PRICE",442:"YIELD",443:"DOLLARDE",444:"DOLLARFR",445:"NOMINAL",446:"EFFECT",447:"CUMPRINC",448:"CUMIPMT",449:"EDATE",450:"EOMONTH",451:"YEARFRAC",452:"COUPDAYBS",453:"COUPDAYS",454:"COUPDAYSNC",455:"COUPNCD",456:"COUPNUM",457:"COUPPCD",458:"DURATION",459:"MDURATION",460:"ODDLPRICE",461:"ODDLYIELD",462:"ODDFPRICE",463:"ODDFYIELD",464:"RANDBETWEEN",465:"WEEKNUM",466:"AMORDEGRC",467:"AMORLINC",468:"CONVERT",724:"SHEETJS",469:"ACCRINT",470:"ACCRINTM",471:"WORKDAY",472:"NETWORKDAYS",473:"GCD",474:"MULTINOMIAL",475:"LCM",476:"FVSCHEDULE",477:"CUBEKPIMEMBER",478:"CUBESET",479:"CUBESETCOUNT",480:"IFERROR",481:"COUNTIFS",482:"SUMIFS",483:"AVERAGEIF",484:"AVERAGEIFS"};var Wd={2:1,3:1,10:0,15:1,16:1,17:1,18:1,19:0,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,34:0,35:0,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,63:0,65:3,66:3,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:0,75:1,76:1,77:1,79:2,80:2,83:1,85:0,86:1,89:0,90:1,94:0,95:0,97:2,98:1,99:1,101:3,102:3,105:1,106:1,108:2,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,144:4,161:1,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,186:1,189:3,190:1,195:3,196:3,197:1,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,225:0,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,247:4,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,382:3,385:1,392:1,393:1,396:2,397:2,398:2,399:1,400:1,401:1,402:1,403:1,404:1,405:1,406:1,407:1,408:1,409:1,410:1,414:4,415:1,416:1,417:2,420:1,421:1,422:2,424:1,425:2,426:2,427:2,428:2,430:3,438:3,439:3,440:3,443:2,444:2,445:2,446:2,447:6,448:6,449:2,450:2,464:2,468:3,476:2,479:1,480:2,65535:0};function Hd(e){if(e.slice(0,3)=="of:")e=e.slice(3);if(e.charCodeAt(0)==61){e=e.slice(1);if(e.charCodeAt(0)==61)e=e.slice(1)}e=e.replace(/COM\.MICROSOFT\./g,"");e=e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,function(e,r){return r.replace(/\./g,"")});e=e.replace(/\$'([^']|'')+'/g,function(e){return e.slice(1)});e=e.replace(/\$([^\]\. #$]+)/g,function(e,r){return r.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/)?e:r});e=e.replace(/\[.(#[A-Z]*[?!])\]/g,"$1");return e.replace(/[;~]/g,",").replace(/\|/g,";")}function zd(e){var r="of:="+e.replace(Iu,"$1[.$2$3$4$5]").replace(/\]:\[/g,":");return r.replace(/;/g,"|").replace(/,/g,";")}function Vd(e){e=e.replace(/\$'([^']|'')+'/g,function(e){return e.slice(1)});e=e.replace(/\$([^\]\. #$]+)/g,function(e,r){return r.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/)?e:r});var r=e.split(":");var t=r[0].split(".")[0];return[t,r[0].split(".")[1]+(r.length>1?":"+(r[1].split(".")[1]||r[1].split(".")[0]):"")]}function Gd(e){return e.replace(/!/,".")}var $d={};var jd={};var Xd=typeof Map!=="undefined";function Yd(e,r,t){var a=0,n=e.length;if(t){if(Xd?t.has(r):Object.prototype.hasOwnProperty.call(t,r)){var i=Xd?t.get(r):t[r];for(;a<i.length;++a){if(e[i[a]].t===r){e.Count++;return i[a]}}}}else for(;a<n;++a){if(e[a].t===r){e.Count++;return a}}e[n]={t:r};e.Count++;e.Unique++;if(t){if(Xd){if(!t.has(r))t.set(r,[]);t.get(r).push(n)}else{if(!Object.prototype.hasOwnProperty.call(t,r))t[r]=[];t[r].push(n)}}return n}function Kd(e,r){var t={min:e+1,max:e+1};var a=-1;if(r.MDW)Ol=r.MDW;if(r.width!=null)t.customWidth=1;else if(r.wpx!=null)a=Nl(r.wpx);else if(r.wch!=null)a=r.wch;if(a>-1){t.width=Il(a);t.customWidth=1}else if(r.width!=null)t.width=r.width;if(r.hidden)t.hidden=true;if(r.level!=null){t.outlineLevel=t.level=r.level}return t}function Zd(e,r){if(!e)return;var t=[.7,.7,.75,.75,.3,.3];if(r=="xlml")t=[1,1,1,1,.5,.5];if(e.left==null)e.left=t[0];if(e.right==null)e.right=t[1];if(e.top==null)e.top=t[2];if(e.bottom==null)e.bottom=t[3];if(e.header==null)e.header=t[4];if(e.footer==null)e.footer=t[5]}function Jd(e,r,t){var a=t.revssf[r.z!=null?r.z:"General"];var n=60,i=e.length;if(a==null&&t.ssf){for(;n<392;++n)if(t.ssf[n]==null){Ze(r.z,n);t.ssf[n]=r.z;t.revssf[r.z]=a=n;break}}for(n=0;n!=i;++n)if(e[n].numFmtId===a)return n;e[i]={numFmtId:a,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1};return i}function qd(e,r,t,a,n,i){try{if(a.cellNF)e.z=Y[r]}catch(s){if(a.WTF)throw s}if(e.t==="z"&&!a.cellStyles)return;if(e.t==="d"&&typeof e.v==="string")e.v=wr(e.v);if((!a||a.cellText!==false)&&e.t!=="z")try{if(Y[r]==null)Ze($e[r]||"General",r);if(e.t==="e")e.w=e.w||Kn[e.v];else if(r===0){if(e.t==="n"){if((e.v|0)===e.v)e.w=e.v.toString(10);else e.w=fe(e.v)}else if(e.t==="d"){var f=or(e.v);if((f|0)===f)e.w=f.toString(10);else e.w=fe(f)}else if(e.v===undefined)return"";else e.w=ce(e.v,jd)}else if(e.t==="d")e.w=We(r,or(e.v),jd);else e.w=We(r,e.v,jd)}catch(s){if(a.WTF)throw s}if(!a.cellStyles)return;if(t!=null)try{e.s=i.Fills[t];if(e.s.fgColor&&e.s.fgColor.theme&&!e.s.fgColor.rgb){e.s.fgColor.rgb=_l(n.themeElements.clrScheme[e.s.fgColor.theme].rgb,e.s.fgColor.tint||0);if(a.WTF)e.s.fgColor.raw_rgb=n.themeElements.clrScheme[e.s.fgColor.theme].rgb}if(e.s.bgColor&&e.s.bgColor.theme){e.s.bgColor.rgb=_l(n.themeElements.clrScheme[e.s.bgColor.theme].rgb,e.s.bgColor.tint||0);if(a.WTF)e.s.bgColor.raw_rgb=n.themeElements.clrScheme[e.s.bgColor.theme].rgb}}catch(s){if(a.WTF&&i.Fills)throw s}}function Qd(e,r,t){if(e&&e["!ref"]){var a=Wa(e["!ref"]);if(a.e.c<a.s.c||a.e.r<a.s.r)throw new Error("Bad range ("+t+"): "+e["!ref"])}}function ev(e,r){var t=Wa(r);if(t.s.r<=t.e.r&&t.s.c<=t.e.c&&t.s.r>=0&&t.s.c>=0)e["!ref"]=Ma(t)}var rv=/<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;var tv=/<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/;var av=/<(?:\w:)?hyperlink [^>]*>/gm;var nv=/"(\w*:\w*)"/;var iv=/<(?:\w:)?col\b[^>]*[\/]?>/g;var sv=/<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;var fv=/<(?:\w:)?pageMargins[^>]*\/>/g;var cv=/<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;var lv=/<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/;var ov=/<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;function uv(e,r,t,a,n,i,s){if(!e)return e;if(!a)a={"!id":{}};if(b!=null&&r.dense==null)r.dense=b;var f=r.dense?[]:{};var c={s:{r:2e6,c:2e6},e:{r:0,c:0}};var l="",o="";var u=e.match(tv);if(u){l=e.slice(0,u.index);o=e.slice(u.index+u[0].length)}else l=o=e;var h=l.match(cv);if(h)dv(h[0],f,n,t);else if(h=l.match(lv))vv(h[0],h[1]||"",f,n,t,s,i);var d=(l.match(/<(?:\w*:)?dimension/)||{index:-1}).index;if(d>0){var v=l.slice(d,d+50).match(nv);if(v)ev(f,v[1])}var p=l.match(ov);if(p&&p[1])xv(p[1],n);var m=[];if(r.cellStyles){var g=l.match(iv);if(g)Ev(m,g)}if(u)Rv(u[1],f,r,c,i,s);var w=o.match(sv);if(w)f["!autofilter"]=Sv(w[0]);var k=[];var T=o.match(rv);if(T)for(d=0;d!=T.length;++d)k[d]=Wa(T[d].slice(T[d].indexOf('"')+1));var E=o.match(av);if(E)wv(f,E,a);var y=o.match(fv);if(y)f["!margins"]=kv(Kr(y[0]));if(!f["!ref"]&&c.e.c>=c.s.c&&c.e.r>=c.s.r)f["!ref"]=Ma(c);if(r.sheetRows>0&&f["!ref"]){var S=Wa(f["!ref"]);if(r.sheetRows<=+S.e.r){S.e.r=r.sheetRows-1;if(S.e.r>c.e.r)S.e.r=c.e.r;if(S.e.r<S.s.r)S.s.r=S.e.r;if(S.e.c>c.e.c)S.e.c=c.e.c;if(S.e.c<S.s.c)S.s.c=S.e.c;f["!fullref"]=f["!ref"];f["!ref"]=Ma(S)}}if(m.length>0)f["!cols"]=m;if(k.length>0)f["!merges"]=k;return f}function hv(e){if(e.length===0)return"";var r='<mergeCells count="'+e.length+'">';for(var t=0;t!=e.length;++t)r+='<mergeCell ref="'+Ma(e[t])+'"/>';return r+"</mergeCells>"}function dv(e,r,t,a){var n=Kr(e);if(!t.Sheets[a])t.Sheets[a]={};if(n.codeName)t.Sheets[a].CodeName=Qr(vt(n.codeName))}function vv(e,r,t,a,n){dv(e.slice(0,e.indexOf(">")),t,a,n)}function pv(e,r,t,a,n){var i=false;var s={},f=null;if(a.bookType!=="xlsx"&&r.vbaraw){var c=r.SheetNames[t];try{if(r.Workbook)c=r.Workbook.Sheets[t].CodeName||c}catch(l){}i=true;s.codeName=pt(tt(c))}if(e&&e["!outline"]){var o={summaryBelow:1,summaryRight:1};if(e["!outline"].above)o.summaryBelow=0;if(e["!outline"].left)o.summaryRight=0;f=(f||"")+_t("outlinePr",null,o)}if(!i&&!f)return;n[n.length]=_t("sheetPr",f,s)}var mv=["objects","scenarios","selectLockedCells","selectUnlockedCells"];var bv=["formatColumns","formatRows","formatCells","insertColumns","insertRows","insertHyperlinks","deleteColumns","deleteRows","sort","autoFilter","pivotTables"];function gv(e){var r={sheet:1};mv.forEach(function(t){if(e[t]!=null&&e[t])r[t]="1"});bv.forEach(function(t){if(e[t]!=null&&!e[t])r[t]="0"});if(e.password)r.password=dl(e.password).toString(16).toUpperCase();return _t("sheetProtection",null,r)}function wv(e,r,t){var a=Array.isArray(e);for(var n=0;n!=r.length;++n){var i=Kr(vt(r[n]),true);if(!i.ref)return;var s=((t||{})["!id"]||[])[i.id];if(s){i.Target=s.Target;if(i.location)i.Target+="#"+Qr(i.location)}else{i.Target="#"+Qr(i.location);s={Target:i.Target,TargetMode:"Internal"}}i.Rel=s;if(i.tooltip){i.Tooltip=i.tooltip;delete i.tooltip}var f=Wa(i.ref);for(var c=f.s.r;c<=f.e.r;++c)for(var l=f.s.c;l<=f.e.c;++l){var o=Pa({c:l,r:c});if(a){if(!e[c])e[c]=[];if(!e[c][l])e[c][l]={t:"z",v:undefined};e[c][l].l=i}else{if(!e[o])e[o]={t:"z",v:undefined};e[o].l=i}}}}function kv(e){var r={};["left","right","top","bottom","header","footer"].forEach(function(t){if(e[t])r[t]=parseFloat(e[t])});return r}function Tv(e){Zd(e);return _t("pageMargins",null,e)}function Ev(e,r){var t=false;for(var a=0;a!=r.length;++a){var n=Kr(r[a],true);if(n.hidden)n.hidden=lt(n.hidden);var i=parseInt(n.min,10)-1,s=parseInt(n.max,10)-1;if(n.outlineLevel)n.level=+n.outlineLevel||0;delete n.min;delete n.max;n.width=+n.width;if(!t&&n.width){t=true;Dl(n.width)}Pl(n);while(i<=s)e[i++]=Tr(n)}}function yv(e,r){var t=["<cols>"],a;for(var n=0;n!=r.length;++n){if(!(a=r[n]))continue;t[t.length]=_t("col",null,Kd(n,a))}t[t.length]="</cols>";return t.join("")}function Sv(e){var r={ref:(e.match(/ref="([^"]*)"/)||[])[1]};return r}function _v(e,r,t,a){var n=typeof e.ref=="string"?e.ref:Ma(e.ref);if(!t.Workbook)t.Workbook={Sheets:[]};if(!t.Workbook.Names)t.Workbook.Names=[];var i=t.Workbook.Names;var s=La(n);if(s.s.r==s.e.r){s.e.r=La(r["!ref"]).e.r;n=Ma(s)}for(var f=0;f<i.length;++f){var c=i[f];if(c.Name!="_xlnm._FilterDatabase")continue;if(c.Sheet!=a)continue;
c.Ref=Ba(t.SheetNames[a])+"!"+Ua(n);break}if(f==i.length)i.push({Name:"_xlnm._FilterDatabase",Sheet:a,Ref:"'"+t.SheetNames[a]+"'!"+n});return _t("autoFilter",null,{ref:n})}var Av=/<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/g;function xv(e,r){if(!r.Views)r.Views=[{}];(e.match(Av)||[]).forEach(function(e,t){var a=Kr(e);if(!r.Views[t])r.Views[t]={};if(+a.zoomScale)r.Views[t].zoom=+a.zoomScale;if(a.rightToLeft&&lt(a.rightToLeft))r.Views[t].RTL=true})}function Cv(e,r,t,a){var n={workbookViewId:"0"};if((((a||{}).Workbook||{}).Views||[])[0])n.rightToLeft=a.Workbook.Views[0].RTL?"1":"0";return _t("sheetViews",_t("sheetView",null,n),{})}function Ov(e,r,t,a){if(e.c)t["!comments"].push([r,e.c]);if(e.v===undefined&&typeof e.f!=="string"||e.t==="z"&&!e.f)return"";var n="";var i=e.t,s=e.v;if(e.t!=="z")switch(e.t){case"b":n=e.v?"1":"0";break;case"n":n=""+e.v;break;case"e":n=Kn[e.v];break;case"d":if(a&&a.cellDates)n=wr(e.v,-1).toISOString();else{e=Tr(e);e.t="n";n=""+(e.v=or(wr(e.v)))}if(typeof e.z==="undefined")e.z=Y[14];break;default:n=e.v;break;}var f=e.t=="z"||e.v==null?"":yt("v",tt(n)),c={r:r};var l=Jd(a.cellXfs,e,a);if(l!==0)c.s=l;switch(e.t){case"n":break;case"d":c.t="d";break;case"b":c.t="b";break;case"e":c.t="e";break;case"z":break;default:if(e.v==null){delete e.t;break}if(e.v.length>32767)throw new Error("Text length must not exceed 32767 characters");if(a&&a.bookSST){f=yt("v",""+Yd(a.Strings,e.v,a.revStrings));c.t="s";break}else c.t="str";break;}if(e.t!=i){e.t=i;e.v=s}if(typeof e.f=="string"&&e.f){var o=e.F&&e.F.slice(0,r.length)==r?{t:"array",ref:e.F}:null;f=_t("f",tt(e.f),o)+(e.v!=null?f:"")}if(e.l)t["!links"].push([r,e.l]);if(e.D)c.cm=1;return _t("c",f,c)}var Rv=function(){var e=/<(?:\w+:)?c[ \/>]/,r=/<\/(?:\w+:)?row>/;var t=/r=["']([^"']*)["']/,a=/<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;var n=/ref=["']([^"']*)["']/;var i=mt("v"),s=mt("f");return function f(c,l,o,u,h,d){var v=0,p="",m=[],b=[],g=0,w=0,k=0,T="",E;var y,S=0,_=0;var A,x;var C=0,O=0;var R=Array.isArray(d.CellXf),N;var I=[];var F=[];var D=Array.isArray(l);var P=[],L={},M=false;var U=!!o.sheetStubs;for(var B=c.split(r),W=0,H=B.length;W!=H;++W){p=B[W].trim();var z=p.length;if(z===0)continue;var V=0;e:for(v=0;v<z;++v)switch(p[v]){case">":if(p[v-1]!="/"){++v;break e}if(o&&o.cellStyles){y=Kr(p.slice(V,v),true);S=y.r!=null?parseInt(y.r,10):S+1;_=-1;if(o.sheetRows&&o.sheetRows<S)continue;L={};M=false;if(y.ht){M=true;L.hpt=parseFloat(y.ht);L.hpx=Bl(L.hpt)}if(y.hidden&&lt(y.hidden)){M=true;L.hidden=true}if(y.outlineLevel!=null){M=true;L.level=+y.outlineLevel}if(M)P[S-1]=L}break;case"<":V=v;break;}if(V>=v)break;y=Kr(p.slice(V,v),true);S=y.r!=null?parseInt(y.r,10):S+1;_=-1;if(o.sheetRows&&o.sheetRows<S)continue;if(u.s.r>S-1)u.s.r=S-1;if(u.e.r<S-1)u.e.r=S-1;if(o&&o.cellStyles){L={};M=false;if(y.ht){M=true;L.hpt=parseFloat(y.ht);L.hpx=Bl(L.hpt)}if(y.hidden&&lt(y.hidden)){M=true;L.hidden=true}if(y.outlineLevel!=null){M=true;L.level=+y.outlineLevel}if(M)P[S-1]=L}m=p.slice(v).split(e);for(var G=0;G!=m.length;++G)if(m[G].trim().charAt(0)!="<")break;m=m.slice(G);for(v=0;v!=m.length;++v){p=m[v].trim();if(p.length===0)continue;b=p.match(t);g=v;w=0;k=0;p="<c "+(p.slice(0,1)=="<"?">":"")+p;if(b!=null&&b.length===2){g=0;T=b[1];for(w=0;w!=T.length;++w){if((k=T.charCodeAt(w)-64)<1||k>26)break;g=26*g+k}--g;_=g}else++_;for(w=0;w!=p.length;++w)if(p.charCodeAt(w)===62)break;++w;y=Kr(p.slice(0,w),true);if(!y.r)y.r=Pa({r:S-1,c:_});T=p.slice(w);E={t:""};if((b=T.match(i))!=null&&b[1]!=="")E.v=Qr(b[1]);if(o.cellFormula){if((b=T.match(s))!=null&&b[1]!==""){E.f=Qr(vt(b[1]),true);if(!o.xlfn)E.f=Mu(E.f);if(b[0].indexOf('t="array"')>-1){E.F=(T.match(n)||[])[1];if(E.F.indexOf(":")>-1)I.push([Wa(E.F),E.F])}else if(b[0].indexOf('t="shared"')>-1){x=Kr(b[0]);var $=Qr(vt(b[1]));if(!o.xlfn)$=Mu($);F[parseInt(x.si,10)]=[x,$,y.r]}}else if(b=T.match(/<f[^>]*\/>/)){x=Kr(b[0]);if(F[x.si])E.f=Pu(F[x.si][1],F[x.si][2],y.r)}var j=Da(y.r);for(w=0;w<I.length;++w)if(j.r>=I[w][0].s.r&&j.r<=I[w][0].e.r)if(j.c>=I[w][0].s.c&&j.c<=I[w][0].e.c)E.F=I[w][1]}if(y.t==null&&E.v===undefined){if(E.f||E.F){E.v=0;E.t="n"}else if(!U)continue;else E.t="z"}else E.t=y.t||"n";if(u.s.c>_)u.s.c=_;if(u.e.c<_)u.e.c=_;switch(E.t){case"n":if(E.v==""||E.v==null){if(!U)continue;E.t="z"}else E.v=parseFloat(E.v);break;case"s":if(typeof E.v=="undefined"){if(!U)continue;E.t="z"}else{A=$d[parseInt(E.v,10)];E.v=A.t;E.r=A.r;if(o.cellHTML)E.h=A.h}break;case"str":E.t="s";E.v=E.v!=null?Qr(vt(E.v),true):"";if(o.cellHTML)E.h=it(E.v);break;case"inlineStr":b=T.match(a);E.t="s";if(b!=null&&(A=Bc(b[1]))){E.v=A.t;if(o.cellHTML)E.h=A.h}else E.v="";break;case"b":E.v=lt(E.v);break;case"d":if(o.cellDates)E.v=wr(E.v,1);else{E.v=or(wr(E.v,1));E.t="n"}break;case"e":if(!o||o.cellText!==false)E.w=E.v;E.v=Zn[E.v];break;}C=O=0;N=null;if(R&&y.s!==undefined){N=d.CellXf[y.s];if(N!=null){if(N.numFmtId!=null)C=N.numFmtId;if(o.cellStyles){if(N.fillId!=null)O=N.fillId}}}qd(E,C,O,o,h,d);if(o.cellDates&&R&&E.t=="n"&&Pe(Y[C])){E.t="d";E.v=vr(E.v)}if(y.cm&&o.xlmeta){var X=(o.xlmeta.Cell||[])[+y.cm-1];if(X&&X.type=="XLDAPR")E.D=true}if(D){var K=Da(y.r);if(!l[K.r])l[K.r]=[];l[K.r][K.c]=E}else l[y.r]=E}}if(P.length>0)l["!rows"]=P}}();function Nv(e,r,t,a){var n=[],i=[],s=Wa(e["!ref"]),f="",c,l="",o=[],u=0,h=0,d=e["!rows"];var v=Array.isArray(e);var p={r:l},m,b=-1;for(h=s.s.c;h<=s.e.c;++h)o[h]=Ra(h);for(u=s.s.r;u<=s.e.r;++u){i=[];l=Aa(u);for(h=s.s.c;h<=s.e.c;++h){c=o[h]+l;var g=v?(e[u]||[])[h]:e[c];if(g===undefined)continue;if((f=Ov(g,c,e,r,t,a))!=null)i.push(f)}if(i.length>0||d&&d[u]){p={r:l};if(d&&d[u]){m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Ul(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1}if(m.level){p.outlineLevel=m.level}}n[n.length]=_t("row",i.join(""),p)}}if(d)for(;u<d.length;++u){if(d&&d[u]){p={r:u+1};m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Ul(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1}if(m.level){p.outlineLevel=m.level}n[n.length]=_t("row","",p)}}return n.join("")}function Iv(e,r,t,a){var n=[zr,_t("worksheet",null,{xmlns:Nt[0],"xmlns:r":Rt.r})];var i=t.SheetNames[e],s=0,f="";var c=t.Sheets[i];if(c==null)c={};var l=c["!ref"]||"A1";var o=Wa(l);if(o.e.c>16383||o.e.r>1048575){if(r.WTF)throw new Error("Range "+l+" exceeds format limit A1:XFD1048576");o.e.c=Math.min(o.e.c,16383);o.e.r=Math.min(o.e.c,1048575);l=Ma(o)}if(!a)a={};c["!comments"]=[];var u=[];pv(c,t,e,r,n);n[n.length]=_t("dimension",null,{ref:l});n[n.length]=Cv(c,r,e,t);if(r.sheetFormat)n[n.length]=_t("sheetFormatPr",null,{defaultRowHeight:r.sheetFormat.defaultRowHeight||"16",baseColWidth:r.sheetFormat.baseColWidth||"10",outlineLevelRow:r.sheetFormat.outlineLevelRow||"7"});if(c["!cols"]!=null&&c["!cols"].length>0)n[n.length]=yv(c,c["!cols"]);n[s=n.length]="<sheetData/>";c["!links"]=[];if(c["!ref"]!=null){f=Nv(c,r,e,t,a);if(f.length>0)n[n.length]=f}if(n.length>s+1){n[n.length]="</sheetData>";n[s]=n[s].replace("/>",">")}if(c["!protect"])n[n.length]=gv(c["!protect"]);if(c["!autofilter"]!=null)n[n.length]=_v(c["!autofilter"],c,t,e);if(c["!merges"]!=null&&c["!merges"].length>0)n[n.length]=hv(c["!merges"]);var h=-1,d,v=-1;if(c["!links"].length>0){n[n.length]="<hyperlinks>";c["!links"].forEach(function(e){if(!e[1].Target)return;d={ref:e[0]};if(e[1].Target.charAt(0)!="#"){v=fi(a,-1,tt(e[1].Target).replace(/#.*$/,""),ai.HLINK);d["r:id"]="rId"+v}if((h=e[1].Target.indexOf("#"))>-1)d.location=tt(e[1].Target.slice(h+1));if(e[1].Tooltip)d.tooltip=tt(e[1].Tooltip);n[n.length]=_t("hyperlink",null,d)});n[n.length]="</hyperlinks>"}delete c["!links"];if(c["!margins"]!=null)n[n.length]=Tv(c["!margins"]);if(!r||r.ignoreEC||r.ignoreEC==void 0)n[n.length]=yt("ignoredErrors",_t("ignoredError",null,{numberStoredAsText:1,sqref:l}));if(u.length>0){v=fi(a,-1,"../drawings/drawing"+(e+1)+".xml",ai.DRAW);n[n.length]=_t("drawing",null,{"r:id":"rId"+v});c["!drawing"]=u}if(c["!comments"].length>0){v=fi(a,-1,"../drawings/vmlDrawing"+(e+1)+".vml",ai.VML);n[n.length]=_t("legacyDrawing",null,{"r:id":"rId"+v});c["!legacy"]=v}if(n.length>1){n[n.length]="</worksheet>";n[1]=n[1].replace("/>",">")}return n.join("")}function Fv(e,r){var t={};var a=e.l+r;t.r=e._R(4);e.l+=4;var n=e._R(2);e.l+=1;var i=e._R(1);e.l=a;if(i&7)t.level=i&7;if(i&16)t.hidden=true;if(i&32)t.hpt=n/20;return t}function Dv(e,r,t){var a=ba(17+8*16);var n=(t["!rows"]||[])[e]||{};a._W(4,e);a._W(4,0);var i=320;if(n.hpx)i=Ul(n.hpx)*20;else if(n.hpt)i=n.hpt*20;a._W(2,i);a._W(1,0);var s=0;if(n.level)s|=n.level;if(n.hidden)s|=16;if(n.hpx||n.hpt)s|=32;a._W(1,s);a._W(1,0);var f=0,c=a.l;a.l+=4;var l={r:e,c:0};for(var o=0;o<16;++o){if(r.s.c>o+1<<10||r.e.c<o<<10)continue;var u=-1,h=-1;for(var d=o<<10;d<o+1<<10;++d){l.c=d;var v=Array.isArray(t)?(t[l.r]||[])[l.c]:t[Pa(l)];if(v){if(u<0)u=d;h=d}}if(u<0)continue;++f;a._W(4,u);a._W(4,h)}var p=a.l;a.l=c;a._W(4,f);a.l=p;return a.length>a.l?a.slice(0,a.l):a}function Pv(e,r,t,a){var n=Dv(a,t,r);if(n.length>17||(r["!rows"]||[])[a])ka(e,0,n)}var Lv=gn;var Mv=wn;function Uv(){}function Bv(e,r){var t={};var a=e[e.l];++e.l;t.above=!(a&64);t.left=!(a&128);e.l+=18;t.name=fn(e,r-19);return t}function Wv(e,r,t){if(t==null)t=ba(84+4*e.length);var a=192;if(r){if(r.above)a&=~64;if(r.left)a&=~128}t._W(1,a);for(var n=1;n<3;++n)t._W(1,0);yn({auto:1},t);t._W(-4,-1);t._W(-4,-1);cn(e,t);return t.slice(0,t.l)}function Hv(e){var r=tn(e);return[r]}function zv(e,r,t){if(t==null)t=ba(8);return an(r,t)}function Vv(e){var r=nn(e);return[r]}function Gv(e,r,t){if(t==null)t=ba(4);return sn(r,t)}function $v(e){var r=tn(e);var t=e._R(1);return[r,t,"b"]}function jv(e,r,t){if(t==null)t=ba(9);an(r,t);t._W(1,e.v?1:0);return t}function Xv(e){var r=nn(e);var t=e._R(1);return[r,t,"b"]}function Yv(e,r,t){if(t==null)t=ba(5);sn(r,t);t._W(1,e.v?1:0);return t}function Kv(e){var r=tn(e);var t=e._R(1);return[r,t,"e"]}function Zv(e,r,t){if(t==null)t=ba(9);an(r,t);t._W(1,e.v);return t}function Jv(e){var r=nn(e);var t=e._R(1);return[r,t,"e"]}function qv(e,r,t){if(t==null)t=ba(8);sn(r,t);t._W(1,e.v);t._W(2,0);t._W(1,0);return t}function Qv(e){var r=tn(e);var t=e._R(4);return[r,t,"s"]}function ep(e,r,t){if(t==null)t=ba(12);an(r,t);t._W(4,r.v);return t}function rp(e){var r=nn(e);var t=e._R(4);return[r,t,"s"]}function tp(e,r,t){if(t==null)t=ba(8);sn(r,t);t._W(4,r.v);return t}function ap(e){var r=tn(e);var t=kn(e);return[r,t,"n"]}function np(e,r,t){if(t==null)t=ba(16);an(r,t);Tn(e.v,t);return t}function ip(e){var r=nn(e);var t=kn(e);return[r,t,"n"]}function sp(e,r,t){if(t==null)t=ba(12);sn(r,t);Tn(e.v,t);return t}function fp(e){var r=tn(e);var t=vn(e);return[r,t,"n"]}function cp(e,r,t){if(t==null)t=ba(12);an(r,t);pn(e.v,t);return t}function lp(e){var r=nn(e);var t=vn(e);return[r,t,"n"]}function op(e,r,t){if(t==null)t=ba(8);sn(r,t);pn(e.v,t);return t}function up(e){var r=tn(e);var t=qa(e);return[r,t,"is"]}function hp(e){var r=tn(e);var t=Ya(e);return[r,t,"str"]}function dp(e,r,t){if(t==null)t=ba(12+4*e.v.length);an(r,t);Ka(e.v,t);return t.length>t.l?t.slice(0,t.l):t}function vp(e){var r=nn(e);var t=Ya(e);return[r,t,"str"]}function pp(e,r,t){if(t==null)t=ba(8+4*e.v.length);sn(r,t);Ka(e.v,t);return t.length>t.l?t.slice(0,t.l):t}function mp(e,r,t){var a=e.l+r;var n=tn(e);n.r=t["!row"];var i=e._R(1);var s=[n,i,"b"];if(t.cellFormula){e.l+=2;var f=yd(e,a-e.l,t);s[3]=hd(f,null,n,t.supbooks,t)}else e.l=a;return s}function bp(e,r,t){var a=e.l+r;var n=tn(e);n.r=t["!row"];var i=e._R(1);var s=[n,i,"e"];if(t.cellFormula){e.l+=2;var f=yd(e,a-e.l,t);s[3]=hd(f,null,n,t.supbooks,t)}else e.l=a;return s}function gp(e,r,t){var a=e.l+r;var n=tn(e);n.r=t["!row"];var i=kn(e);var s=[n,i,"n"];if(t.cellFormula){e.l+=2;var f=yd(e,a-e.l,t);s[3]=hd(f,null,n,t.supbooks,t)}else e.l=a;return s}function wp(e,r,t){var a=e.l+r;var n=tn(e);n.r=t["!row"];var i=Ya(e);var s=[n,i,"str"];if(t.cellFormula){e.l+=2;var f=yd(e,a-e.l,t);s[3]=hd(f,null,n,t.supbooks,t)}else e.l=a;return s}var kp=gn;var Tp=wn;function Ep(e,r){if(r==null)r=ba(4);r._W(4,e);return r}function yp(e,r){var t=e.l+r;var a=gn(e,16);var n=ln(e);var i=Ya(e);var s=Ya(e);var f=Ya(e);e.l=t;var c={rfx:a,relId:n,loc:i,display:f};if(s)c.Tooltip=s;return c}function Sp(e,r){var t=ba(50+4*(e[1].Target.length+(e[1].Tooltip||"").length));wn({s:Da(e[0]),e:Da(e[0])},t);dn("rId"+r,t);var a=e[1].Target.indexOf("#");var n=a==-1?"":e[1].Target.slice(a+1);Ka(n||"",t);Ka(e[1].Tooltip||"",t);Ka("",t);return t.slice(0,t.l)}function _p(){}function Ap(e,r,t){var a=e.l+r;var n=mn(e,16);var i=e._R(1);var s=[n];s[2]=i;if(t.cellFormula){var f=Ed(e,a-e.l,t);s[1]=f}else e.l=a;return s}function xp(e,r,t){var a=e.l+r;var n=gn(e,16);var i=[n];if(t.cellFormula){var s=_d(e,a-e.l,t);i[1]=s;e.l=a}else e.l=a;return i}function Cp(e,r,t){if(t==null)t=ba(18);var a=Kd(e,r);t._W(-4,e);t._W(-4,e);t._W(4,(a.width||10)*256);t._W(4,0);var n=0;if(r.hidden)n|=1;if(typeof a.width=="number")n|=2;if(r.level)n|=r.level<<8;t._W(2,n);return t}var Op=["left","right","top","bottom","header","footer"];function Rp(e){var r={};Op.forEach(function(t){r[t]=kn(e,8)});return r}function Np(e,r){if(r==null)r=ba(6*8);Zd(e);Op.forEach(function(t){Tn(e[t],r)});return r}function Ip(e){var r=e._R(2);e.l+=28;return{RTL:r&32}}function Fp(e,r,t){if(t==null)t=ba(30);var a=924;if((((r||{}).Views||[])[0]||{}).RTL)a|=32;t._W(2,a);t._W(4,0);t._W(4,0);t._W(4,0);t._W(1,0);t._W(1,0);t._W(2,0);t._W(2,100);t._W(2,0);t._W(2,0);t._W(2,0);t._W(4,0);return t}function Dp(e){var r=ba(24);r._W(4,4);r._W(4,1);wn(e,r);return r}function Pp(e,r){if(r==null)r=ba(16*4+2);r._W(2,e.password?dl(e.password):0);r._W(4,1);[["objects",false],["scenarios",false],["formatCells",true],["formatColumns",true],["formatRows",true],["insertColumns",true],["insertRows",true],["insertHyperlinks",true],["deleteColumns",true],["deleteRows",true],["selectLockedCells",false],["sort",true],["autoFilter",true],["pivotTables",true],["selectUnlockedCells",false]].forEach(function(t){if(t[1])r._W(4,e[t[0]]!=null&&!e[t[0]]?1:0);else r._W(4,e[t[0]]!=null&&e[t[0]]?0:1)});return r}function Lp(){}function Mp(){}function Up(e,r,t,a,n,i,s){if(!e)return e;var f=r||{};if(!a)a={"!id":{}};if(b!=null&&f.dense==null)f.dense=b;var c=f.dense?[]:{};var l;var o={s:{r:2e6,c:2e6},e:{r:0,c:0}};var u=[];var h=false,d=false;var v,p,m,g,w,k,T,E,y;var S=[];f.biff=12;f["!row"]=0;var _=0,A=false;var x=[];var C={};var O=f.supbooks||n.supbooks||[[]];O.sharedf=C;O.arrayf=x;O.SheetNames=n.SheetNames||n.Sheets.map(function(e){return e.name});if(!f.supbooks){f.supbooks=O;if(n.Names)for(var R=0;R<n.Names.length;++R)O[0][R+1]=n.Names[R]}var N=[],I=[];var F=false;Cb[16]={n:"BrtShortReal",f:ip};var D,P;ga(e,function M(e,r,b){if(d)return;switch(b){case 148:l=e;break;case 0:v=e;if(f.sheetRows&&f.sheetRows<=v.r)d=true;E=Aa(g=v.r);f["!row"]=v.r;if(e.hidden||e.hpt||e.level!=null){if(e.hpt)e.hpx=Bl(e.hpt);I[e.r]=e}break;case 2:;case 3:;case 4:;case 5:;case 6:;case 7:;case 8:;case 9:;case 10:;case 11:;case 13:;case 14:;case 15:;case 16:;case 17:;case 18:;case 62:p={t:e[2]};switch(e[2]){case"n":p.v=e[1];break;case"s":T=$d[e[1]];p.v=T.t;p.r=T.r;break;case"b":p.v=e[1]?true:false;break;case"e":p.v=e[1];if(f.cellText!==false)p.w=Kn[p.v];break;case"str":p.t="s";p.v=e[1];break;case"is":p.t="s";p.v=e[1].t;break;}if(m=s.CellXf[e[0].iStyleRef])qd(p,m.numFmtId,null,f,i,s);w=e[0].c==-1?w+1:e[0].c;if(f.dense){if(!c[g])c[g]=[];c[g][w]=p}else c[Ra(w)+E]=p;if(f.cellFormula){A=false;for(_=0;_<x.length;++_){var R=x[_];if(v.r>=R[0].s.r&&v.r<=R[0].e.r)if(w>=R[0].s.c&&w<=R[0].e.c){p.F=Ma(R[0]);A=true}}if(!A&&e.length>3)p.f=e[3]}if(o.s.r>v.r)o.s.r=v.r;if(o.s.c>w)o.s.c=w;if(o.e.r<v.r)o.e.r=v.r;if(o.e.c<w)o.e.c=w;if(f.cellDates&&m&&p.t=="n"&&Pe(Y[m.numFmtId])){var L=q(p.v);if(L){p.t="d";p.v=new Date(L.y,L.m-1,L.d,L.H,L.M,L.S,L.u)}}if(D){if(D.type=="XLDAPR")p.D=true;D=void 0}if(P)P=void 0;break;case 1:;case 12:if(!f.sheetStubs||h)break;p={t:"z",v:void 0};w=e[0].c==-1?w+1:e[0].c;if(f.dense){if(!c[g])c[g]=[];c[g][w]=p}else c[Ra(w)+E]=p;if(o.s.r>v.r)o.s.r=v.r;if(o.s.c>w)o.s.c=w;if(o.e.r<v.r)o.e.r=v.r;if(o.e.c<w)o.e.c=w;if(D){if(D.type=="XLDAPR")p.D=true;D=void 0}if(P)P=void 0;break;case 176:S.push(e);break;case 49:{D=((f.xlmeta||{}).Cell||[])[e-1]}break;case 494:var M=a["!id"][e.relId];if(M){e.Target=M.Target;if(e.loc)e.Target+="#"+e.loc;e.Rel=M}else if(e.relId==""){e.Target="#"+e.loc}for(g=e.rfx.s.r;g<=e.rfx.e.r;++g)for(w=e.rfx.s.c;w<=e.rfx.e.c;++w){if(f.dense){if(!c[g])c[g]=[];if(!c[g][w])c[g][w]={t:"z",v:undefined};c[g][w].l=e}else{k=Pa({c:w,r:g});if(!c[k])c[k]={t:"z",v:undefined};c[k].l=e}}break;case 426:if(!f.cellFormula)break;x.push(e);y=f.dense?c[g][w]:c[Ra(w)+E];y.f=hd(e[1],o,{r:v.r,c:w},O,f);y.F=Ma(e[0]);break;case 427:if(!f.cellFormula)break;C[Pa(e[0].s)]=e[1];y=f.dense?c[g][w]:c[Ra(w)+E];y.f=hd(e[1],o,{r:v.r,c:w},O,f);break;case 60:if(!f.cellStyles)break;while(e.e>=e.s){N[e.e--]={width:e.w/256,hidden:!!(e.flags&1),level:e.level};if(!F){F=true;Dl(e.w/256)}Pl(N[e.e+1])}break;case 161:c["!autofilter"]={ref:Ma(e)};break;case 476:c["!margins"]=e;break;case 147:if(!n.Sheets[t])n.Sheets[t]={};if(e.name)n.Sheets[t].CodeName=e.name;if(e.above||e.left)c["!outline"]={above:e.above,left:e.left};break;case 137:if(!n.Views)n.Views=[{}];if(!n.Views[0])n.Views[0]={};if(e.RTL)n.Views[0].RTL=true;break;case 485:break;case 64:;case 1053:break;case 151:break;case 152:;case 175:;case 644:;case 625:;case 562:;case 396:;case 1112:;case 1146:;case 471:;case 1050:;case 649:;case 1105:;case 589:;case 607:;case 564:;case 1055:;case 168:;case 174:;case 1180:;case 499:;case 507:;case 550:;case 171:;case 167:;case 1177:;case 169:;case 1181:;case 551:;case 552:;case 661:;case 639:;case 478:;case 537:;case 477:;case 536:;case 1103:;case 680:;case 1104:;case 1024:;case 663:;case 535:;case 678:;case 504:;case 1043:;case 428:;case 170:;case 3072:;case 50:;case 2070:;case 1045:break;case 35:h=true;break;case 36:h=false;break;case 37:u.push(b);h=true;break;case 38:u.pop();h=false;break;default:if(r.T){}else if(!h||f.WTF)throw new Error("Unexpected record 0x"+b.toString(16));}},f);delete f.supbooks;delete f["!row"];if(!c["!ref"]&&(o.s.r<2e6||l&&(l.e.r>0||l.e.c>0||l.s.r>0||l.s.c>0)))c["!ref"]=Ma(l||o);if(f.sheetRows&&c["!ref"]){var L=Wa(c["!ref"]);if(f.sheetRows<=+L.e.r){L.e.r=f.sheetRows-1;if(L.e.r>o.e.r)L.e.r=o.e.r;if(L.e.r<L.s.r)L.s.r=L.e.r;if(L.e.c>o.e.c)L.e.c=o.e.c;if(L.e.c<L.s.c)L.s.c=L.e.c;c["!fullref"]=c["!ref"];c["!ref"]=Ma(L)}}if(S.length>0)c["!merges"]=S;if(N.length>0)c["!cols"]=N;if(I.length>0)c["!rows"]=I;return c}function Bp(e,r,t,a,n,i,s){var f={r:t,c:a};if(r.c)i["!comments"].push([Pa(f),r.c]);if(r.v===undefined)return false;var c="";switch(r.t){case"b":c=r.v?"1":"0";break;case"d":r=Tr(r);r.z=r.z||Y[14];r.v=or(wr(r.v));r.t="n";break;case"n":;case"e":c=""+r.v;break;default:c=r.v;break;}f.s=Jd(n.cellXfs,r,n);if(r.l)i["!links"].push([Pa(f),r.l]);switch(r.t){case"s":;case"str":if(n.bookSST){c=Yd(n.Strings,r.v,n.revStrings);f.t="s";f.v=c;if(s)ka(e,18,tp(r,f));else ka(e,7,ep(r,f))}else{f.t="str";if(s)ka(e,17,pp(r,f));else ka(e,6,dp(r,f))}return true;case"n":if(r.v==(r.v|0)&&r.v>-1e3&&r.v<1e3){if(s)ka(e,13,op(r,f));else ka(e,2,cp(r,f))}else{if(s)ka(e,16,sp(r,f));else ka(e,5,np(r,f))}return true;case"b":f.t="b";if(s)ka(e,15,Yv(r,f));else ka(e,4,jv(r,f));return true;case"e":f.t="e";if(s)ka(e,14,qv(r,f));else ka(e,3,Zv(r,f));return true;}if(s)ka(e,12,Gv(r,f));else ka(e,1,zv(r,f));return true}function Wp(e,r,t,a){var n=Wa(r["!ref"]||"A1"),i,s="",f=[];ka(e,145);var c=Array.isArray(r);var l=n.e.r;if(r["!rows"])l=Math.max(n.e.r,r["!rows"].length-1);for(var o=n.s.r;o<=l;++o){s=Aa(o);Pv(e,r,n,o);var u=false;if(o<=n.e.r)for(var h=n.s.c;h<=n.e.c;++h){if(o===n.s.r)f[h]=Ra(h);i=f[h]+s;var d=c?(r[o]||[])[h]:r[i];if(!d){u=false;continue}u=Bp(e,d,o,h,a,r,u)}}ka(e,146)}function Hp(e,r){if(!r||!r["!merges"])return;ka(e,177,Ep(r["!merges"].length));r["!merges"].forEach(function(r){ka(e,176,Tp(r))});ka(e,178)}function zp(e,r){if(!r||!r["!cols"])return;ka(e,390);r["!cols"].forEach(function(r,t){if(r)ka(e,60,Cp(t,r))});ka(e,391)}function Vp(e,r){if(!r||!r["!ref"])return;ka(e,648);ka(e,649,Dp(Wa(r["!ref"])));ka(e,650)}function Gp(e,r,t){r["!links"].forEach(function(r){if(!r[1].Target)return;var a=fi(t,-1,r[1].Target.replace(/#.*$/,""),ai.HLINK);ka(e,494,Sp(r,a))});delete r["!links"]}function $p(e,r,t,a){if(r["!comments"].length>0){var n=fi(a,-1,"../drawings/vmlDrawing"+(t+1)+".vml",ai.VML);ka(e,551,dn("rId"+n));r["!legacy"]=n}}function jp(e,r,t,a){if(!r["!autofilter"])return;var n=r["!autofilter"];var i=typeof n.ref==="string"?n.ref:Ma(n.ref);if(!t.Workbook)t.Workbook={Sheets:[]};if(!t.Workbook.Names)t.Workbook.Names=[];var s=t.Workbook.Names;var f=La(i);if(f.s.r==f.e.r){f.e.r=La(r["!ref"]).e.r;i=Ma(f)}for(var c=0;c<s.length;++c){var l=s[c];if(l.Name!="_xlnm._FilterDatabase")continue;if(l.Sheet!=a)continue;l.Ref=Ba(t.SheetNames[a])+"!"+Ua(i);break}if(c==s.length)s.push({Name:"_xlnm._FilterDatabase",Sheet:a,Ref:Ba(t.SheetNames[a])+"!"+Ua(i)});ka(e,161,wn(Wa(i)));ka(e,162)}function Xp(e,r,t){ka(e,133);{ka(e,137,Fp(r,t));ka(e,138)}ka(e,134)}function Yp(){}function Kp(e,r){if(!r["!protect"])return;ka(e,535,Pp(r["!protect"]))}function Zp(e,r,t,a){var n=wa();var i=t.SheetNames[e],s=t.Sheets[i]||{};var f=i;try{if(t&&t.Workbook)f=t.Workbook.Sheets[e].CodeName||f}catch(c){}var l=Wa(s["!ref"]||"A1");if(l.e.c>16383||l.e.r>1048575){if(r.WTF)throw new Error("Range "+(s["!ref"]||"A1")+" exceeds format limit A1:XFD1048576");l.e.c=Math.min(l.e.c,16383);l.e.r=Math.min(l.e.c,1048575)}s["!links"]=[];s["!comments"]=[];ka(n,129);if(t.vbaraw||s["!outline"])ka(n,147,Wv(f,s["!outline"]));ka(n,148,Mv(l));Xp(n,s,t.Workbook);Yp(n,s);zp(n,s,e,r,t);Wp(n,s,e,r,t);Kp(n,s);jp(n,s,t,e);Hp(n,s);Gp(n,s,a);if(s["!margins"])ka(n,476,Np(s["!margins"]));if(!r||r.ignoreEC||r.ignoreEC==void 0)Vp(n,s);$p(n,s,e,a);ka(n,130);return n.end()}function Jp(e){var r=[];var t=e.match(/^<c:numCache>/);var a;(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm)||[]).forEach(function(e){var a=e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);if(!a)return;r[+a[1]]=t?+a[2]:a[2]});var n=Qr((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/)||["","General"])[1]);(e.match(/<c:f>(.*?)<\/c:f>/gm)||[]).forEach(function(e){a=e.replace(/<.*?>/g,"")});return[r,n,a]}function qp(e,r,t,a,n,i){var s=i||{"!type":"chart"};if(!e)return i;var f=0,c=0,l="A";var o={s:{r:2e6,c:2e6},e:{r:0,c:0}};(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm)||[]).forEach(function(e){var r=Jp(e);o.s.r=o.s.c=0;o.e.c=f;l=Ra(f);r[0].forEach(function(e,t){s[l+Aa(t)]={t:"n",v:e,z:r[1]};c=t});if(o.e.r<c)o.e.r=c;++f});if(f>0)s["!ref"]=Ma(o);return s}function Qp(e,r,t,a,n){if(!e)return e;if(!a)a={"!id":{}};var i={"!type":"chart","!drawel":null,"!rel":""};var s;var f=e.match(cv);if(f)dv(f[0],i,n,t);if(s=e.match(/drawing r:id="(.*?)"/))i["!rel"]=s[1];if(a["!id"][i["!rel"]])i["!drawel"]=a["!id"][i["!rel"]];return i}function em(e,r){e.l+=10;var t=Ya(e,r-10);return{name:t}}function rm(e,r,t,a,n){if(!e)return e;if(!a)a={"!id":{}};var i={"!type":"chart","!drawel":null,"!rel":""};var s=[];var f=false;ga(e,function c(e,a,l){switch(l){case 550:i["!rel"]=e;break;case 651:if(!n.Sheets[t])n.Sheets[t]={};if(e.name)n.Sheets[t].CodeName=e.name;break;case 562:;case 652:;case 669:;case 679:;case 551:;case 552:;case 476:;case 3072:break;case 35:f=true;break;case 36:f=false;break;case 37:s.push(l);break;case 38:s.pop();break;default:if(a.T>0)s.push(l);else if(a.T<0)s.pop();else if(!f||r.WTF)throw new Error("Unexpected record 0x"+l.toString(16));}},r);if(a["!id"][i["!rel"]])i["!drawel"]=a["!id"][i["!rel"]];return i}var tm=[["allowRefreshQuery",false,"bool"],["autoCompressPictures",true,"bool"],["backupFile",false,"bool"],["checkCompatibility",false,"bool"],["CodeName",""],["date1904",false,"bool"],["defaultThemeVersion",0,"int"],["filterPrivacy",false,"bool"],["hidePivotFieldList",false,"bool"],["promptedSolutions",false,"bool"],["publishItems",false,"bool"],["refreshAllConnections",false,"bool"],["saveExternalLinkValues",true,"bool"],["showBorderUnselectedTables",true,"bool"],["showInkAnnotation",true,"bool"],["showObjects","all"],["showPivotChartFilter",false,"bool"],["updateLinks","userSet"]];var am=[["activeTab",0,"int"],["autoFilterDateGrouping",true,"bool"],["firstSheet",0,"int"],["minimized",false,"bool"],["showHorizontalScroll",true,"bool"],["showSheetTabs",true,"bool"],["showVerticalScroll",true,"bool"],["tabRatio",600,"int"],["visibility","visible"]];var nm=[];var im=[["calcCompleted","true"],["calcMode","auto"],["calcOnSave","true"],["concurrentCalc","true"],["fullCalcOnLoad","false"],["fullPrecision","true"],["iterate","false"],["iterateCount","100"],["iterateDelta","0.001"],["refMode","A1"]];function sm(e,r){for(var t=0;t!=e.length;++t){var a=e[t];for(var n=0;n!=r.length;++n){var i=r[n];if(a[i[0]]==null)a[i[0]]=i[1];else switch(i[2]){case"bool":if(typeof a[i[0]]=="string")a[i[0]]=lt(a[i[0]]);break;case"int":if(typeof a[i[0]]=="string")a[i[0]]=parseInt(a[i[0]],10);break;}}}}function fm(e,r){for(var t=0;t!=r.length;++t){var a=r[t];if(e[a[0]]==null)e[a[0]]=a[1];else switch(a[2]){case"bool":if(typeof e[a[0]]=="string")e[a[0]]=lt(e[a[0]]);break;case"int":if(typeof e[a[0]]=="string")e[a[0]]=parseInt(e[a[0]],10);break;}}}function cm(e){fm(e.WBProps,tm);fm(e.CalcPr,im);sm(e.WBView,am);sm(e.Sheets,nm);jd.date1904=lt(e.WBProps.date1904)}function lm(e){if(!e.Workbook)return"false";if(!e.Workbook.WBProps)return"false";return lt(e.Workbook.WBProps.date1904)?"true":"false"}var om="][*?/\\".split("");function um(e,r){if(e.length>31){if(r)return false;throw new Error("Sheet names cannot exceed 31 chars")}var t=true;om.forEach(function(a){if(e.indexOf(a)==-1)return;if(!r)throw new Error("Sheet name cannot contain : \\ / ? * [ ]");t=false});return t}function hm(e,r,t){e.forEach(function(a,n){um(a);for(var i=0;i<n;++i)if(a==e[i])throw new Error("Duplicate Sheet Name: "+a);if(t){var s=r&&r[n]&&r[n].CodeName||a;if(s.charCodeAt(0)==95&&s.length>22)throw new Error("Bad Code Name: Worksheet"+s)}})}function dm(e){if(!e||!e.SheetNames||!e.Sheets)throw new Error("Invalid Workbook");if(!e.SheetNames.length)throw new Error("Workbook is empty");var r=e.Workbook&&e.Workbook.Sheets||[];hm(e.SheetNames,r,!!e.vbaraw);for(var t=0;t<e.SheetNames.length;++t)Qd(e.Sheets[e.SheetNames[t]],e.SheetNames[t],t);e.SheetNames.forEach(function(r,t){var a=e.Sheets[r];if(!a||!a["!autofilter"])return;var n;if(!e.Workbook)e.Workbook={};if(!e.Workbook.Names)e.Workbook.Names=[];e.Workbook.Names.forEach(function(e){if(e.Name=="_xlnm._FilterDatabase"&&e.Sheet==t)n=e});var i=Ba(r)+"!"+Ua(a["!autofilter"].ref);if(n)n.Ref=i;else e.Workbook.Names.push({Name:"_xlnm._FilterDatabase",Sheet:t,Ref:i})})}var vm=/<\w+:workbook/;function pm(e,r){if(!e)throw new Error("Could not find file");var t={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},Names:[],xmlns:""};var a=false,n="xmlns";var i={},s=0;e.replace(jr,function f(c,l){var o=Kr(c);switch(Zr(o[0])){case"<?xml":break;case"<workbook":if(c.match(vm))n="xmlns"+c.match(/<(\w+):/)[1];t.xmlns=o[n];break;case"</workbook>":break;case"<fileVersion":delete o[0];t.AppVersion=o;break;case"<fileVersion/>":;case"</fileVersion>":break;case"<fileSharing":break;case"<fileSharing/>":break;case"<workbookPr":;case"<workbookPr/>":tm.forEach(function(e){if(o[e[0]]==null)return;switch(e[2]){case"bool":t.WBProps[e[0]]=lt(o[e[0]]);break;case"int":t.WBProps[e[0]]=parseInt(o[e[0]],10);break;default:t.WBProps[e[0]]=o[e[0]];}});if(o.codeName)t.WBProps.CodeName=vt(o.codeName);break;case"</workbookPr>":break;case"<workbookProtection":break;case"<workbookProtection/>":break;case"<bookViews":;case"<bookViews>":;case"</bookViews>":break;case"<workbookView":;case"<workbookView/>":delete o[0];t.WBView.push(o);break;case"</workbookView>":break;case"<sheets":;case"<sheets>":;case"</sheets>":break;case"<sheet":switch(o.state){case"hidden":o.Hidden=1;break;case"veryHidden":o.Hidden=2;break;default:o.Hidden=0;}delete o.state;o.name=Qr(vt(o.name));delete o[0];t.Sheets.push(o);break;case"</sheet>":break;case"<functionGroups":;case"<functionGroups/>":break;case"<functionGroup":break;case"<externalReferences":;case"</externalReferences>":;case"<externalReferences>":break;case"<externalReference":break;case"<definedNames/>":break;case"<definedNames>":;case"<definedNames":a=true;break;case"</definedNames>":a=false;break;case"<definedName":{i={};i.Name=vt(o.name);if(o.comment)i.Comment=o.comment;if(o.localSheetId)i.Sheet=+o.localSheetId;if(lt(o.hidden||"0"))i.Hidden=true;s=l+c.length}break;case"</definedName>":{i.Ref=Qr(vt(e.slice(s,l)));t.Names.push(i)}break;case"<definedName/>":break;case"<calcPr":delete o[0];t.CalcPr=o;break;case"<calcPr/>":delete o[0];t.CalcPr=o;break;case"</calcPr>":break;case"<oleSize":break;case"<customWorkbookViews>":;case"</customWorkbookViews>":;case"<customWorkbookViews":break;case"<customWorkbookView":;case"</customWorkbookView>":break;case"<pivotCaches>":;case"</pivotCaches>":;case"<pivotCaches":break;case"<pivotCache":break;case"<smartTagPr":;case"<smartTagPr/>":break;case"<smartTagTypes":;case"<smartTagTypes>":;case"</smartTagTypes>":break;case"<smartTagType":break;case"<webPublishing":;case"<webPublishing/>":break;case"<fileRecoveryPr":;case"<fileRecoveryPr/>":break;case"<webPublishObjects>":;case"<webPublishObjects":;case"</webPublishObjects>":break;case"<webPublishObject":break;case"<extLst":;case"<extLst>":;case"</extLst>":;case"<extLst/>":break;case"<ext":a=true;break;case"</ext>":a=false;break;case"<ArchID":break;case"<AlternateContent":;case"<AlternateContent>":a=true;break;case"</AlternateContent>":a=false;break;case"<revisionPtr":break;default:if(!a&&r.WTF)throw new Error("unrecognized "+o[0]+" in workbook");}return c});if(Nt.indexOf(t.xmlns)===-1)throw new Error("Unknown Namespace: "+t.xmlns);cm(t);return t}function mm(e){var r=[zr];r[r.length]=_t("workbook",null,{xmlns:Nt[0],"xmlns:r":Rt.r});var t=e.Workbook&&(e.Workbook.Names||[]).length>0;var a={codeName:"ThisWorkbook"};if(e.Workbook&&e.Workbook.WBProps){tm.forEach(function(r){if(e.Workbook.WBProps[r[0]]==null)return;if(e.Workbook.WBProps[r[0]]==r[1])return;a[r[0]]=e.Workbook.WBProps[r[0]]});if(e.Workbook.WBProps.CodeName){a.codeName=e.Workbook.WBProps.CodeName;delete a.CodeName}}r[r.length]=_t("workbookPr",null,a);var n=e.Workbook&&e.Workbook.Sheets||[];var i=0;if(n&&n[0]&&!!n[0].Hidden){r[r.length]="<bookViews>";for(i=0;i!=e.SheetNames.length;++i){if(!n[i])break;if(!n[i].Hidden)break}if(i==e.SheetNames.length)i=0;r[r.length]='<workbookView firstSheet="'+i+'" activeTab="'+i+'"/>';r[r.length]="</bookViews>"}r[r.length]="<sheets>";for(i=0;i!=e.SheetNames.length;++i){var s={name:tt(e.SheetNames[i].slice(0,31))};s.sheetId=""+(i+1);s["r:id"]="rId"+(i+1);if(n[i])switch(n[i].Hidden){case 1:s.state="hidden";break;case 2:s.state="veryHidden";break;}r[r.length]=_t("sheet",null,s)}r[r.length]="</sheets>";if(t){r[r.length]="<definedNames>";if(e.Workbook&&e.Workbook.Names)e.Workbook.Names.forEach(function(e){var t={name:e.Name};if(e.Comment)t.comment=e.Comment;if(e.Sheet!=null)t.localSheetId=""+e.Sheet;if(e.Hidden)t.hidden="1";if(!e.Ref)return;r[r.length]=_t("definedName",tt(e.Ref),t)});r[r.length]="</definedNames>"}if(r.length>2){r[r.length]="</workbook>";r[1]=r[1].replace("/>",">")}return r.join("")}function bm(e,r){var t={};t.Hidden=e._R(4);t.iTabID=e._R(4);t.strRelID=hn(e,r-8);t.name=Ya(e);return t}function gm(e,r){if(!r)r=ba(127);r._W(4,e.Hidden);r._W(4,e.iTabID);dn(e.strRelID,r);Ka(e.name.slice(0,31),r);return r.length>r.l?r.slice(0,r.l):r}function wm(e,r){var t={};var a=e._R(4);t.defaultThemeVersion=e._R(4);var n=r>8?Ya(e):"";if(n.length>0)t.CodeName=n;t.autoCompressPictures=!!(a&65536);
t.backupFile=!!(a&64);t.checkCompatibility=!!(a&4096);t.date1904=!!(a&1);t.filterPrivacy=!!(a&8);t.hidePivotFieldList=!!(a&1024);t.promptedSolutions=!!(a&16);t.publishItems=!!(a&2048);t.refreshAllConnections=!!(a&262144);t.saveExternalLinkValues=!!(a&128);t.showBorderUnselectedTables=!!(a&4);t.showInkAnnotation=!!(a&32);t.showObjects=["all","placeholders","none"][a>>13&3];t.showPivotChartFilter=!!(a&32768);t.updateLinks=["userSet","never","always"][a>>8&3];return t}function km(e,r){if(!r)r=ba(72);var t=0;if(e){if(e.date1904)t|=1;if(e.filterPrivacy)t|=8}r._W(4,t);r._W(4,0);cn(e&&e.CodeName||"ThisWorkbook",r);return r.slice(0,r.l)}function Tm(e,r){var t={};e._R(4);t.ArchID=e._R(4);e.l+=r-8;return t}function Em(e,r,t){var a=e.l+r;var n=e._R(4);e.l+=1;var i=e._R(4);var s=un(e);var f=Sd(e,0,t);var c=ln(e);if(n&32)s="_xlnm."+s;e.l=a;var l={Name:s,Ptg:f,Flags:n};if(i<268435455)l.Sheet=i;if(c)l.Comment=c;return l}function ym(e,r){var t=ba(9);var a=0;var n=e.Name;if(Jn.indexOf(n)>-1){a|=32;n=n.slice(6)}t._W(4,a);t._W(1,0);t._W(4,e.Sheet==null?4294967295:e.Sheet);var i=[t,Ka(n),Md(e.Ref,r)];if(e.Comment)i.push(on(e.Comment));else{var s=ba(4);s._W(4,4294967295);i.push(s)}return N(i)}function Sm(e,r){var t={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""};var a=[];var n=false;if(!r)r={};r.biff=12;var i=[];var s=[[]];s.SheetNames=[];s.XTI=[];Cb[16]={n:"BrtFRTArchID$",f:Tm};ga(e,function f(e,c,l){switch(l){case 156:s.SheetNames.push(e.name);t.Sheets.push(e);break;case 153:t.WBProps=e;break;case 39:if(e.Sheet!=null)r.SID=e.Sheet;e.Ref=hd(e.Ptg,null,null,s,r);delete r.SID;delete e.Ptg;i.push(e);break;case 1036:break;case 357:;case 358:;case 355:;case 667:if(!s[0].length)s[0]=[l,e];else s.push([l,e]);s[s.length-1].XTI=[];break;case 362:if(s.length===0){s[0]=[];s[0].XTI=[]}s[s.length-1].XTI=s[s.length-1].XTI.concat(e);s.XTI=s.XTI.concat(e);break;case 361:break;case 2071:;case 158:;case 143:;case 664:;case 353:break;case 3072:;case 3073:;case 534:;case 677:;case 157:;case 610:;case 2050:;case 155:;case 548:;case 676:;case 128:;case 665:;case 2128:;case 2125:;case 549:;case 2053:;case 596:;case 2076:;case 2075:;case 2082:;case 397:;case 154:;case 1117:;case 553:;case 2091:break;case 35:a.push(l);n=true;break;case 36:a.pop();n=false;break;case 37:a.push(l);n=true;break;case 38:a.pop();n=false;break;case 16:break;default:if(c.T){}else if(!n||r.WTF&&a[a.length-1]!=37&&a[a.length-1]!=35)throw new Error("Unexpected record 0x"+l.toString(16));}},r);cm(t);t.Names=i;t.supbooks=s;return t}function _m(e,r){ka(e,143);for(var t=0;t!=r.SheetNames.length;++t){var a=r.Workbook&&r.Workbook.Sheets&&r.Workbook.Sheets[t]&&r.Workbook.Sheets[t].Hidden||0;var n={Hidden:a,iTabID:t+1,strRelID:"rId"+(t+1),name:r.SheetNames[t]};ka(e,156,gm(n))}ka(e,144)}function Am(r,t){if(!t)t=ba(127);for(var a=0;a!=4;++a)t._W(4,0);Ka("SheetJS",t);Ka(e.version,t);Ka(e.version,t);Ka("7262",t);return t.length>t.l?t.slice(0,t.l):t}function xm(e,r){if(!r)r=ba(29);r._W(-4,0);r._W(-4,460);r._W(4,28800);r._W(4,17600);r._W(4,500);r._W(4,e);r._W(4,e);var t=120;r._W(1,t);return r.length>r.l?r.slice(0,r.l):r}function Cm(e,r){if(!r.Workbook||!r.Workbook.Sheets)return;var t=r.Workbook.Sheets;var a=0,n=-1,i=-1;for(;a<t.length;++a){if(!t[a]||!t[a].Hidden&&n==-1)n=a;else if(t[a].Hidden==1&&i==-1)i=a}if(i>n)return;ka(e,135);ka(e,158,xm(n));ka(e,136)}function Om(e,r){if(!r.Workbook||!r.Workbook.Names)return;r.Workbook.Names.forEach(function(t){try{if(t.Flags&14)return;ka(e,39,ym(t,r))}catch(a){console.error("Could not serialize defined name "+JSON.stringify(t))}})}function Rm(e){var r=e.SheetNames.length;var t=ba(12*r+28);t._W(4,r+2);t._W(4,0);t._W(4,-2);t._W(4,-2);t._W(4,0);t._W(4,-1);t._W(4,-1);for(var a=0;a<r;++a){t._W(4,0);t._W(4,a);t._W(4,a)}return t}function Nm(e,r){ka(e,353);ka(e,357);ka(e,362,Rm(r,0));ka(e,354)}function Im(e,r){var t=wa();ka(t,131);ka(t,128,Am());ka(t,153,km(e.Workbook&&e.Workbook.WBProps||null));Cm(t,e,r);_m(t,e,r);Nm(t,e);if((e.Workbook||{}).Names)Om(t,e);ka(t,132);return t.end()}function Fm(e,r,t){if(r.slice(-4)===".bin")return Sm(e,t);return pm(e,t)}function Dm(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return Up(e,a,t,n,i,s,f);return uv(e,a,t,n,i,s,f)}function Pm(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return rm(e,a,t,n,i,s,f);return Qp(e,a,t,n,i,s,f)}function Lm(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return Ou(e,a,t,n,i,s,f);return Ru(e,a,t,n,i,s,f)}function Mm(e,r,t,a,n,i,s,f){if(r.slice(-4)===".bin")return xu(e,a,t,n,i,s,f);return Cu(e,a,t,n,i,s,f)}function Um(e,r,t,a){if(r.slice(-4)===".bin")return vo(e,t,a);return Zl(e,t,a)}function Bm(e,r,t){if(r.slice(-4)===".bin")return Xc(e,t);return Vc(e,t)}function Wm(e,r,t){if(r.slice(-4)===".bin")return Tu(e,t);return uu(e,t)}function Hm(e,r,t){if(r.slice(-4)===".bin")return nu(e,r,t);return tu(e,r,t)}function zm(e,r,t,a){if(t.slice(-4)===".bin")return su(e,r,t,a);return iu(e,r,t,a)}function Vm(e,r,t){if(r.slice(-4)===".bin")return qo(e,r,t);return eu(e,r,t)}var Gm=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;var $m=/([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;function jm(e,r){var t=e.split(/\s+/);var a=[];if(!r)a[0]=t[0];if(t.length===1)return a;var n=e.match(Gm),i,s,f,c;if(n)for(c=0;c!=n.length;++c){i=n[c].match($m);if((s=i[1].indexOf(":"))===-1)a[i[1]]=i[2].slice(1,i[2].length-1);else{if(i[1].slice(0,6)==="xmlns:")f="xmlns"+i[1].slice(6);else f=i[1].slice(s+1);a[f]=i[2].slice(1,i[2].length-1)}}return a}function Xm(e){var r=e.split(/\s+/);var t={};if(r.length===1)return t;var a=e.match(Gm),n,i,s,f;if(a)for(f=0;f!=a.length;++f){n=a[f].match($m);if((i=n[1].indexOf(":"))===-1)t[n[1]]=n[2].slice(1,n[2].length-1);else{if(n[1].slice(0,6)==="xmlns:")s="xmlns"+n[1].slice(6);else s=n[1].slice(i+1);t[s]=n[2].slice(1,n[2].length-1)}}return t}var Ym;function Km(e,r){var t=Ym[e]||Qr(e);if(t==="General")return ce(r);return We(t,r)}function Zm(e,r,t,a){var n=a;switch((t[0].match(/dt:dt="([\w.]+)"/)||["",""])[1]){case"boolean":n=lt(a);break;case"i2":;case"int":n=parseInt(a,10);break;case"r4":;case"float":n=parseFloat(a);break;case"date":;case"dateTime.tz":n=wr(a);break;case"i8":;case"string":;case"fixed":;case"uuid":;case"bin.base64":break;default:throw new Error("bad custprop:"+t[0]);}e[Qr(r)]=n}function Jm(e,r,t){if(e.t==="z")return;if(!t||t.cellText!==false)try{if(e.t==="e"){e.w=e.w||Kn[e.v]}else if(r==="General"){if(e.t==="n"){if((e.v|0)===e.v)e.w=e.v.toString(10);else e.w=fe(e.v)}else e.w=ce(e.v)}else e.w=Km(r||"General",e.v)}catch(a){if(t.WTF)throw a}try{var n=Ym[r]||r||"General";if(t.cellNF)e.z=n;if(t.cellDates&&e.t=="n"&&Pe(n)){var i=q(e.v);if(i){e.t="d";e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u)}}}catch(a){if(t.WTF)throw a}}function qm(e,r,t){if(t.cellStyles){if(r.Interior){var a=r.Interior;if(a.Pattern)a.patternType=Wl[a.Pattern]||a.Pattern}}e[r.ID]=r}function Qm(e,r,t,a,n,i,s,f,c,l){var o="General",u=a.StyleID,h={};l=l||{};var d=[];var v=0;if(u===undefined&&f)u=f.StyleID;if(u===undefined&&s)u=s.StyleID;while(i[u]!==undefined){if(i[u].nf)o=i[u].nf;if(i[u].Interior)d.push(i[u].Interior);if(!i[u].Parent)break;u=i[u].Parent}switch(t.Type){case"Boolean":a.t="b";a.v=lt(e);break;case"String":a.t="s";a.r=ft(Qr(e));a.v=e.indexOf("<")>-1?Qr(r||e).replace(/<.*?>/g,""):a.r;break;case"DateTime":if(e.slice(-1)!="Z")e+="Z";a.v=(wr(e)-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3);if(a.v!==a.v)a.v=Qr(e);else if(a.v<60)a.v=a.v-1;if(!o||o=="General")o="yyyy-mm-dd";case"Number":if(a.v===undefined)a.v=+e;if(!a.t)a.t="n";break;case"Error":a.t="e";a.v=Zn[e];if(l.cellText!==false)a.w=e;break;default:if(e==""&&r==""){a.t="z"}else{a.t="s";a.v=ft(r||e)}break;}Jm(a,o,l);if(l.cellFormula!==false){if(a.Formula){var p=Qr(a.Formula);if(p.charCodeAt(0)==61)p=p.slice(1);a.f=Nu(p,n);delete a.Formula;if(a.ArrayRange=="RC")a.F=Nu("RC:RC",n);else if(a.ArrayRange){a.F=Nu(a.ArrayRange,n);c.push([Wa(a.F),a.F])}}else{for(v=0;v<c.length;++v)if(n.r>=c[v][0].s.r&&n.r<=c[v][0].e.r)if(n.c>=c[v][0].s.c&&n.c<=c[v][0].e.c)a.F=c[v][1]}}if(l.cellStyles){d.forEach(function(e){if(!h.patternType&&e.patternType)h.patternType=e.patternType});a.s=h}if(a.StyleID!==undefined)a.ixfe=a.StyleID}function eb(e){return Jn.indexOf("_xlnm."+e)>-1?"_xlnm."+e:e}function rb(e){e.t=e.v||"";e.t=e.t.replace(/\r\n/g,"\n").replace(/\r/g,"\n");e.v=e.w=e.ixfe=undefined}function tb(e,r){var t=r||{};Ve();var n=d(Ct(e));if(t.type=="binary"||t.type=="array"||t.type=="base64"){if(typeof a!=="undefined")n=a.utils.decode(65001,o(n));else n=vt(n)}var i=n.slice(0,1024).toLowerCase(),s=false;i=i.replace(/".*?"/g,"");if((i.indexOf(">")&1023)>Math.min(i.indexOf(",")&1023,i.indexOf(";")&1023)){var f=Tr(t);f.type="string";return Rc.to_workbook(n,f)}if(i.indexOf("<?xml")==-1)["html","table","head","meta","script","style","div"].forEach(function(e){if(i.indexOf("<"+e)>=0)s=true});if(s)return Qb(n,t);Ym={"General Number":"General","General Date":Y[22],"Long Date":"dddd, mmmm dd, yyyy","Medium Date":Y[15],"Short Date":Y[14],"Long Time":Y[19],"Medium Time":Y[18],"Short Time":Y[20],Currency:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',Fixed:Y[2],Standard:Y[4],Percent:Y[10],Scientific:Y[11],"Yes/No":'"Yes";"Yes";"No";@',"True/False":'"True";"True";"False";@',"On/Off":'"Yes";"Yes";"No";@'};var c;var l=[],u;if(b!=null&&t.dense==null)t.dense=b;var h={},v=[],p=t.dense?[]:{},m="";var g={},w={};var k=jm('<Data ss:Type="String">'),T=0;var E=0,y=0;var S={s:{r:2e6,c:2e6},e:{r:0,c:0}};var _={},A={};var x="",C=0;var O=[];var R={},N={},I=0,F=[];var D=[],P={};var L=[],M,U=false;var B=[];var W=[],H={},z=0,V=0;var G={Sheets:[],WBProps:{date1904:false}},$={};Ot.lastIndex=0;n=n.replace(/<!--([\s\S]*?)-->/gm,"");var j="";while(c=Ot.exec(n))switch(c[3]=(j=c[3]).toLowerCase()){case"data":if(j=="data"){if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else if(c[0].charAt(c[0].length-2)!=="/")l.push([c[3],true]);break}if(l[l.length-1][1])break;if(c[1]==="/")Qm(n.slice(T,c.index),x,k,l[l.length-1][0]=="comment"?P:g,{c:E,r:y},_,L[E],w,B,t);else{x="";k=jm(c[0]);T=c.index+c[0].length}break;case"cell":if(c[1]==="/"){if(D.length>0)g.c=D;if((!t.sheetRows||t.sheetRows>y)&&g.v!==void 0){if(t.dense){if(!p[y])p[y]=[];p[y][E]=g}else p[Ra(E)+Aa(y)]=g}if(g.HRef){g.l={Target:Qr(g.HRef)};if(g.HRefScreenTip)g.l.Tooltip=g.HRefScreenTip;delete g.HRef;delete g.HRefScreenTip}if(g.MergeAcross||g.MergeDown){z=E+(parseInt(g.MergeAcross,10)|0);V=y+(parseInt(g.MergeDown,10)|0);if(z>E||V>y)O.push({s:{c:E,r:y},e:{c:z,r:V}})}if(!t.sheetStubs){if(g.MergeAcross)E=z+1;else++E}else if(g.MergeAcross||g.MergeDown){for(var X=E;X<=z;++X){for(var K=y;K<=V;++K){if(X>E||K>y){if(t.dense){if(!p[K])p[K]=[];p[K][X]={t:"z"}}else p[Ra(X)+Aa(K)]={t:"z"}}}}E=z+1}else++E}else{g=Xm(c[0]);if(g.Index)E=+g.Index-1;if(E<S.s.c)S.s.c=E;if(E>S.e.c)S.e.c=E;if(c[0].slice(-2)==="/>")++E;D=[]}break;case"row":if(c[1]==="/"||c[0].slice(-2)==="/>"){if(y<S.s.r)S.s.r=y;if(y>S.e.r)S.e.r=y;if(c[0].slice(-2)==="/>"){w=jm(c[0]);if(w.Index)y=+w.Index-1}E=0;++y}else{w=jm(c[0]);if(w.Index)y=+w.Index-1;H={};if(w.AutoFitHeight=="0"||w.Height){H.hpx=parseInt(w.Height,10);H.hpt=Ul(H.hpx);W[y]=H}if(w.Hidden=="1"){H.hidden=true;W[y]=H}}break;case"worksheet":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"));v.push(m);if(S.s.r<=S.e.r&&S.s.c<=S.e.c){p["!ref"]=Ma(S);if(t.sheetRows&&t.sheetRows<=S.e.r){p["!fullref"]=p["!ref"];S.e.r=t.sheetRows-1;p["!ref"]=Ma(S)}}if(O.length)p["!merges"]=O;if(L.length>0)p["!cols"]=L;if(W.length>0)p["!rows"]=W;h[m]=p}else{S={s:{r:2e6,c:2e6},e:{r:0,c:0}};y=E=0;l.push([c[3],false]);u=jm(c[0]);m=Qr(u.Name);p=t.dense?[]:{};O=[];B=[];W=[];$={name:m,Hidden:0};G.Sheets.push($)}break;case"table":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else if(c[0].slice(-2)=="/>")break;else{l.push([c[3],false]);L=[];U=false}break;case"style":if(c[1]==="/")qm(_,A,t);else A=jm(c[0]);break;case"numberformat":A.nf=Qr(jm(c[0]).Format||"General");if(Ym[A.nf])A.nf=Ym[A.nf];for(var Z=0;Z!=392;++Z)if(Y[Z]==A.nf)break;if(Z==392)for(Z=57;Z!=392;++Z)if(Y[Z]==null){Ze(A.nf,Z);break}break;case"column":if(l[l.length-1][0]!=="table")break;if(c[1]==="/")break;M=jm(c[0]);if(M.Hidden){M.hidden=true;delete M.Hidden}if(M.Width)M.wpx=parseInt(M.Width,10);if(!U&&M.wpx>10){U=true;Ol=Al;for(var J=0;J<L.length;++J)if(L[J])Pl(L[J])}if(U)Pl(M);L[M.Index-1||L.length]=M;for(var q=0;q<+M.Span;++q)L[L.length]=Tr(M);break;case"namedrange":if(c[1]==="/")break;if(!G.Names)G.Names=[];var Q=Kr(c[0]);var ee={Name:eb(Q.Name),Ref:Nu(Q.RefersTo.slice(1),{r:0,c:0})};if(G.Sheets.length>0)ee.Sheet=G.Sheets.length-1;G.Names.push(ee);break;case"namedcell":break;case"b":break;case"i":break;case"u":break;case"s":break;case"em":break;case"h2":break;case"h3":break;case"sub":break;case"sup":break;case"span":break;case"alignment":break;case"borders":break;case"border":break;case"font":if(c[0].slice(-2)==="/>")break;else if(c[1]==="/")x+=n.slice(C,c.index);else C=c.index+c[0].length;break;case"interior":if(!t.cellStyles)break;A.Interior=jm(c[0]);break;case"protection":break;case"author":;case"title":;case"description":;case"created":;case"keywords":;case"subject":;case"category":;case"company":;case"lastauthor":;case"lastsaved":;case"lastprinted":;case"version":;case"revision":;case"totaltime":;case"hyperlinkbase":;case"manager":;case"contentstatus":;case"identifier":;case"language":;case"appname":if(c[0].slice(-2)==="/>")break;else if(c[1]==="/")Ri(R,j,n.slice(I,c.index));else I=c.index+c[0].length;break;case"paragraphs":break;case"styles":;case"workbook":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else l.push([c[3],false]);break;case"comment":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"));rb(P);D.push(P)}else{l.push([c[3],false]);u=jm(c[0]);P={a:u.Author}}break;case"autofilter":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else if(c[0].charAt(c[0].length-2)!=="/"){var re=jm(c[0]);p["!autofilter"]={ref:Nu(re.Range).replace(/\$/g,"")};l.push([c[3],true])}break;case"name":break;case"datavalidation":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else{if(c[0].charAt(c[0].length-2)!=="/")l.push([c[3],true])}break;case"pixelsperinch":break;case"componentoptions":;case"documentproperties":;case"customdocumentproperties":;case"officedocumentsettings":;case"pivottable":;case"pivotcache":;case"names":;case"mapinfo":;case"pagebreaks":;case"querytable":;case"sorting":;case"schema":;case"conditionalformatting":;case"smarttagtype":;case"smarttags":;case"excelworkbook":;case"workbookoptions":;case"worksheetoptions":if(c[1]==="/"){if((u=l.pop())[0]!==c[3])throw new Error("Bad state: "+u.join("|"))}else if(c[0].charAt(c[0].length-2)!=="/")l.push([c[3],true]);break;case"null":break;default:if(l.length==0&&c[3]=="document")return ug(n,t);if(l.length==0&&c[3]=="uof")return ug(n,t);var te=true;switch(l[l.length-1][0]){case"officedocumentsettings":switch(c[3]){case"allowpng":break;case"removepersonalinformation":break;case"downloadcomponents":break;case"locationofcomponents":break;case"colors":break;case"color":break;case"index":break;case"rgb":break;case"targetscreensize":break;case"readonlyrecommended":break;default:te=false;}break;case"componentoptions":switch(c[3]){case"toolbar":break;case"hideofficelogo":break;case"spreadsheetautofit":break;case"label":break;case"caption":break;case"maxheight":break;case"maxwidth":break;case"nextsheetnumber":break;default:te=false;}break;case"excelworkbook":switch(c[3]){case"date1904":G.WBProps.date1904=true;break;case"windowheight":break;case"windowwidth":break;case"windowtopx":break;case"windowtopy":break;case"tabratio":break;case"protectstructure":break;case"protectwindow":break;case"protectwindows":break;case"activesheet":break;case"displayinknotes":break;case"firstvisiblesheet":break;case"supbook":break;case"sheetname":break;case"sheetindex":break;case"sheetindexfirst":break;case"sheetindexlast":break;case"dll":break;case"acceptlabelsinformulas":break;case"donotsavelinkvalues":break;case"iteration":break;case"maxiterations":break;case"maxchange":break;case"path":break;case"xct":break;case"count":break;case"selectedsheets":break;case"calculation":break;case"uncalced":break;case"startupprompt":break;case"crn":break;case"externname":break;case"formula":break;case"colfirst":break;case"collast":break;case"wantadvise":break;case"boolean":break;case"error":break;case"text":break;case"ole":break;case"noautorecover":break;case"publishobjects":break;case"donotcalculatebeforesave":break;case"number":break;case"refmoder1c1":break;case"embedsavesmarttags":break;default:te=false;}break;case"workbookoptions":switch(c[3]){case"owcversion":break;case"height":break;case"width":break;default:te=false;}break;case"worksheetoptions":switch(c[3]){case"visible":if(c[0].slice(-2)==="/>"){}else if(c[1]==="/")switch(n.slice(I,c.index)){case"SheetHidden":$.Hidden=1;break;case"SheetVeryHidden":$.Hidden=2;break;}else I=c.index+c[0].length;break;case"header":if(!p["!margins"])Zd(p["!margins"]={},"xlml");if(!isNaN(+Kr(c[0]).Margin))p["!margins"].header=+Kr(c[0]).Margin;break;case"footer":if(!p["!margins"])Zd(p["!margins"]={},"xlml");if(!isNaN(+Kr(c[0]).Margin))p["!margins"].footer=+Kr(c[0]).Margin;break;case"pagemargins":var ae=Kr(c[0]);if(!p["!margins"])Zd(p["!margins"]={},"xlml");if(!isNaN(+ae.Top))p["!margins"].top=+ae.Top;if(!isNaN(+ae.Left))p["!margins"].left=+ae.Left;if(!isNaN(+ae.Right))p["!margins"].right=+ae.Right;if(!isNaN(+ae.Bottom))p["!margins"].bottom=+ae.Bottom;break;case"displayrighttoleft":if(!G.Views)G.Views=[];if(!G.Views[0])G.Views[0]={};G.Views[0].RTL=true;break;case"freezepanes":break;case"frozennosplit":break;case"splithorizontal":;case"splitvertical":break;case"donotdisplaygridlines":break;case"activerow":break;case"activecol":break;case"toprowbottompane":break;case"leftcolumnrightpane":break;case"unsynced":break;case"print":break;case"printerrors":break;case"panes":break;case"scale":break;case"pane":break;case"number":break;case"layout":break;case"pagesetup":break;case"selected":break;case"protectobjects":break;case"enableselection":break;case"protectscenarios":break;case"validprinterinfo":break;case"horizontalresolution":break;case"verticalresolution":break;case"numberofcopies":break;case"activepane":break;case"toprowvisible":break;case"leftcolumnvisible":break;case"fittopage":break;case"rangeselection":break;case"papersizeindex":break;case"pagelayoutzoom":break;case"pagebreakzoom":break;case"filteron":break;case"fitwidth":break;case"fitheight":break;case"commentslayout":break;case"zoom":break;case"lefttoright":break;case"gridlines":break;case"allowsort":break;case"allowfilter":break;case"allowinsertrows":break;case"allowdeleterows":break;case"allowinsertcols":break;case"allowdeletecols":break;case"allowinserthyperlinks":break;case"allowformatcells":break;case"allowsizecols":break;case"allowsizerows":break;case"nosummaryrowsbelowdetail":if(!p["!outline"])p["!outline"]={};p["!outline"].above=true;break;case"tabcolorindex":break;case"donotdisplayheadings":break;case"showpagelayoutzoom":break;case"nosummarycolumnsrightdetail":if(!p["!outline"])p["!outline"]={};p["!outline"].left=true;break;case"blackandwhite":break;case"donotdisplayzeros":break;case"displaypagebreak":break;case"rowcolheadings":break;case"donotdisplayoutline":break;case"noorientation":break;case"allowusepivottables":break;case"zeroheight":break;case"viewablerange":break;case"selection":break;case"protectcontents":break;default:te=false;}break;case"pivottable":;case"pivotcache":switch(c[3]){case"immediateitemsondrop":break;case"showpagemultipleitemlabel":break;case"compactrowindent":break;case"location":break;case"pivotfield":break;case"orientation":break;case"layoutform":break;case"layoutsubtotallocation":break;case"layoutcompactrow":break;case"position":break;case"pivotitem":break;case"datatype":break;case"datafield":break;case"sourcename":break;case"parentfield":break;case"ptlineitems":break;case"ptlineitem":break;case"countofsameitems":break;case"item":break;case"itemtype":break;case"ptsource":break;case"cacheindex":break;case"consolidationreference":break;case"filename":break;case"reference":break;case"nocolumngrand":break;case"norowgrand":break;case"blanklineafteritems":break;case"hidden":break;case"subtotal":break;case"basefield":break;case"mapchilditems":break;case"function":break;case"refreshonfileopen":break;case"printsettitles":break;case"mergelabels":break;case"defaultversion":break;case"refreshname":break;case"refreshdate":break;case"refreshdatecopy":break;case"versionlastrefresh":break;case"versionlastupdate":break;case"versionupdateablemin":break;case"versionrefreshablemin":break;case"calculation":break;default:te=false;}break;case"pagebreaks":switch(c[3]){case"colbreaks":break;case"colbreak":break;case"rowbreaks":break;case"rowbreak":break;case"colstart":break;case"colend":break;case"rowend":break;default:te=false;}break;case"autofilter":switch(c[3]){case"autofiltercolumn":break;case"autofiltercondition":break;case"autofilterand":break;case"autofilteror":break;default:te=false;}break;case"querytable":switch(c[3]){case"id":break;case"autoformatfont":break;case"autoformatpattern":break;case"querysource":break;case"querytype":break;case"enableredirections":break;case"refreshedinxl9":break;case"urlstring":break;case"htmltables":break;case"connection":break;case"commandtext":break;case"refreshinfo":break;case"notitles":break;case"nextid":break;case"columninfo":break;case"overwritecells":break;case"donotpromptforfile":break;case"textwizardsettings":break;case"source":break;case"number":break;case"decimal":break;case"thousandseparator":break;case"trailingminusnumbers":break;case"formatsettings":break;case"fieldtype":break;case"delimiters":break;case"tab":break;case"comma":break;case"autoformatname":break;case"versionlastedit":break;case"versionlastrefresh":break;default:te=false;}break;case"datavalidation":switch(c[3]){case"range":break;case"type":break;case"min":break;case"max":break;case"sort":break;case"descending":break;case"order":break;case"casesensitive":break;case"value":break;case"errorstyle":break;case"errormessage":break;case"errortitle":break;case"inputmessage":break;case"inputtitle":break;case"combohide":break;case"inputhide":break;case"condition":break;case"qualifier":break;case"useblank":break;case"value1":break;case"value2":break;case"format":break;case"cellrangelist":break;default:te=false;}break;case"sorting":;case"conditionalformatting":switch(c[3]){case"range":break;case"type":break;case"min":break;case"max":break;case"sort":break;case"descending":break;case"order":break;case"casesensitive":break;case"value":break;case"errorstyle":break;case"errormessage":break;case"errortitle":break;case"cellrangelist":break;case"inputmessage":break;case"inputtitle":break;case"combohide":break;case"inputhide":break;case"condition":break;case"qualifier":break;case"useblank":break;case"value1":break;case"value2":break;case"format":break;default:te=false;}break;case"mapinfo":;case"schema":;case"data":switch(c[3]){case"map":break;case"entry":break;case"range":break;case"xpath":break;case"field":break;case"xsdtype":break;case"filteron":break;case"aggregate":break;case"elementtype":break;case"attributetype":break;case"schema":;case"element":;case"complextype":;case"datatype":;case"all":;case"attribute":;case"extends":break;case"row":break;default:te=false;}break;case"smarttags":break;default:te=false;break;}if(te)break;if(c[3].match(/!\[CDATA/))break;if(!l[l.length-1][1])throw"Unrecognized tag: "+c[3]+"|"+l.join("|");if(l[l.length-1][0]==="customdocumentproperties"){if(c[0].slice(-2)==="/>")break;else if(c[1]==="/")Zm(N,j,F,n.slice(I,c.index));else{F=c;I=c.index+c[0].length}break}if(t.WTF)throw"Unrecognized tag: "+c[3]+"|"+l.join("|");}var ne={};if(!t.bookSheets&&!t.bookProps)ne.Sheets=h;ne.SheetNames=v;ne.Workbook=G;ne.SSF=Tr(Y);ne.Props=R;ne.Custprops=N;return ne}function ab(e,r){tw(r=r||{});switch(r.type||"base64"){case"base64":return tb(T(e),r);case"binary":;case"buffer":;case"file":return tb(e,r);case"array":return tb(C(e),r);}}function nb(e,r){var t=[];if(e.Props)t.push(Ni(e.Props,r));if(e.Custprops)t.push(Ii(e.Props,e.Custprops,r));return t.join("")}function ib(e){if((((e||{}).Workbook||{}).WBProps||{}).date1904)return'<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><Date1904/></ExcelWorkbook>';return""}function sb(e,r){var t=['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];r.cellXfs.forEach(function(e,r){var a=[];a.push(_t("NumberFormat",null,{"ss:Format":tt(Y[e.numFmtId])}));var n={"ss:ID":"s"+(21+r)};t.push(_t("Style",a.join(""),n))});return _t("Styles",t.join(""))}function fb(e){return _t("NamedRange",null,{"ss:Name":e.Name.slice(0,6)=="_xlnm."?e.Name.slice(6):e.Name,"ss:RefersTo":"="+Fu(e.Ref,{r:0,c:0})})}function cb(e){if(!((e||{}).Workbook||{}).Names)return"";var r=e.Workbook.Names;var t=[];for(var a=0;a<r.length;++a){var n=r[a];if(n.Sheet!=null)continue;if(n.Name.match(/^_xlfn\./))continue;t.push(fb(n))}return _t("Names",t.join(""))}function lb(e,r,t,a){if(!e)return"";if(!((a||{}).Workbook||{}).Names)return"";var n=a.Workbook.Names;var i=[];for(var s=0;s<n.length;++s){var f=n[s];if(f.Sheet!=t)continue;if(f.Name.match(/^_xlfn\./))continue;i.push(fb(f))}return i.join("")}function ob(e,r,t,a){if(!e)return"";var n=[];if(e["!margins"]){n.push("<PageSetup>");if(e["!margins"].header)n.push(_t("Header",null,{"x:Margin":e["!margins"].header}));if(e["!margins"].footer)n.push(_t("Footer",null,{"x:Margin":e["!margins"].footer}));n.push(_t("PageMargins",null,{"x:Bottom":e["!margins"].bottom||"0.75","x:Left":e["!margins"].left||"0.7","x:Right":e["!margins"].right||"0.7","x:Top":e["!margins"].top||"0.75"}));n.push("</PageSetup>")}if(a&&a.Workbook&&a.Workbook.Sheets&&a.Workbook.Sheets[t]){if(a.Workbook.Sheets[t].Hidden)n.push(_t("Visible",a.Workbook.Sheets[t].Hidden==1?"SheetHidden":"SheetVeryHidden",{}));else{for(var i=0;i<t;++i)if(a.Workbook.Sheets[i]&&!a.Workbook.Sheets[i].Hidden)break;if(i==t)n.push("<Selected/>")}}if(((((a||{}).Workbook||{}).Views||[])[0]||{}).RTL)n.push("<DisplayRightToLeft/>");if(e["!protect"]){n.push(yt("ProtectContents","True"));if(e["!protect"].objects)n.push(yt("ProtectObjects","True"));if(e["!protect"].scenarios)n.push(yt("ProtectScenarios","True"));if(e["!protect"].selectLockedCells!=null&&!e["!protect"].selectLockedCells)n.push(yt("EnableSelection","NoSelection"));else if(e["!protect"].selectUnlockedCells!=null&&!e["!protect"].selectUnlockedCells)n.push(yt("EnableSelection","UnlockedCells"));[["formatCells","AllowFormatCells"],["formatColumns","AllowSizeCols"],["formatRows","AllowSizeRows"],["insertColumns","AllowInsertCols"],["insertRows","AllowInsertRows"],["insertHyperlinks","AllowInsertHyperlinks"],["deleteColumns","AllowDeleteCols"],["deleteRows","AllowDeleteRows"],["sort","AllowSort"],["autoFilter","AllowFilter"],["pivotTables","AllowUsePivotTables"]].forEach(function(r){if(e["!protect"][r[0]])n.push("<"+r[1]+"/>")})}if(n.length==0)return"";return _t("WorksheetOptions",n.join(""),{xmlns:It.x})}function ub(e){return e.map(function(e){var r=ct(e.t||"");var t=_t("ss:Data",r,{xmlns:"http://www.w3.org/TR/REC-html40"});return _t("Comment",t,{"ss:Author":e.a})}).join("")}function hb(e,r,t,a,n,i,s){if(!e||e.v==undefined&&e.f==undefined)return"";var f={};if(e.f)f["ss:Formula"]="="+tt(Fu(e.f,s));if(e.F&&e.F.slice(0,r.length)==r){var c=Da(e.F.slice(r.length+1));f["ss:ArrayRange"]="RC:R"+(c.r==s.r?"":"["+(c.r-s.r)+"]")+"C"+(c.c==s.c?"":"["+(c.c-s.c)+"]")}if(e.l&&e.l.Target){f["ss:HRef"]=tt(e.l.Target);if(e.l.Tooltip)f["x:HRefScreenTip"]=tt(e.l.Tooltip)}if(t["!merges"]){var l=t["!merges"];for(var o=0;o!=l.length;++o){if(l[o].s.c!=s.c||l[o].s.r!=s.r)continue;if(l[o].e.c>l[o].s.c)f["ss:MergeAcross"]=l[o].e.c-l[o].s.c;if(l[o].e.r>l[o].s.r)f["ss:MergeDown"]=l[o].e.r-l[o].s.r}}var u="",h="";switch(e.t){case"z":if(!a.sheetStubs)return"";break;case"n":u="Number";h=String(e.v);break;case"b":u="Boolean";h=e.v?"1":"0";break;case"e":u="Error";h=Kn[e.v];break;case"d":u="DateTime";h=new Date(e.v).toISOString();if(e.z==null)e.z=e.z||Y[14];break;case"s":u="String";h=st(e.v||"");break;}var d=Jd(a.cellXfs,e,a);f["ss:StyleID"]="s"+(21+d);f["ss:Index"]=s.c+1;var v=e.v!=null?h:"";var p=e.t=="z"?"":'<Data ss:Type="'+u+'">'+v+"</Data>";if((e.c||[]).length>0)p+=ub(e.c);return _t("Cell",p,f)}function db(e,r){var t='<Row ss:Index="'+(e+1)+'"';if(r){if(r.hpt&&!r.hpx)r.hpx=Bl(r.hpt);if(r.hpx)t+=' ss:AutoFitHeight="0" ss:Height="'+r.hpx+'"';if(r.hidden)t+=' ss:Hidden="1"'}return t+">"}function vb(e,r,t,a){if(!e["!ref"])return"";var n=Wa(e["!ref"]);var i=e["!merges"]||[],s=0;var f=[];if(e["!cols"])e["!cols"].forEach(function(e,r){Pl(e);var t=!!e.width;var a=Kd(r,e);var n={"ss:Index":r+1};if(t)n["ss:Width"]=Rl(a.width);if(e.hidden)n["ss:Hidden"]="1";f.push(_t("Column",null,n))});var c=Array.isArray(e);for(var l=n.s.r;l<=n.e.r;++l){var o=[db(l,(e["!rows"]||[])[l])];for(var u=n.s.c;u<=n.e.c;++u){var h=false;for(s=0;s!=i.length;++s){if(i[s].s.c>u)continue;if(i[s].s.r>l)continue;if(i[s].e.c<u)continue;if(i[s].e.r<l)continue;if(i[s].s.c!=u||i[s].s.r!=l)h=true;break}if(h)continue;var d={r:l,c:u};var v=Pa(d),p=c?(e[l]||[])[u]:e[v];o.push(hb(p,v,e,r,t,a,d))}o.push("</Row>");if(o.length>2)f.push(o.join(""))}return f.join("")}function pb(e,r,t){var a=[];var n=t.SheetNames[e];var i=t.Sheets[n];var s=i?lb(i,r,e,t):"";if(s.length>0)a.push("<Names>"+s+"</Names>");s=i?vb(i,r,e,t):"";if(s.length>0)a.push("<Table>"+s+"</Table>");a.push(ob(i,r,e,t));if(i["!autofilter"])a.push('<AutoFilter x:Range="'+Fu(Ua(i["!autofilter"].ref),{r:0,c:0})+'" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>');return a.join("")}function mb(e,r){if(!r)r={};if(!e.SSF)e.SSF=Tr(Y);if(e.SSF){Ve();ze(e.SSF);r.revssf=fr(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF;r.cellXfs=[];Jd(r.cellXfs,{},{revssf:{General:0}})}var t=[];t.push(nb(e,r));t.push(ib(e,r));t.push("");t.push("");for(var a=0;a<e.SheetNames.length;++a)t.push(_t("Worksheet",pb(a,r,e),{"ss:Name":tt(e.SheetNames[a])}));t[2]=sb(e,r);t[3]=cb(e,r);return zr+_t("Workbook",t.join(""),{xmlns:It.ss,"xmlns:o":It.o,"xmlns:x":It.x,"xmlns:ss":It.ss,"xmlns:dt":It.dt,"xmlns:html":It.html})}function bb(e){var r={};var t=e.content;t.l=28;r.AnsiUserType=t._R(0,"lpstr-ansi");r.AnsiClipboardFormat=xn(t);if(t.length-t.l<=4)return r;var a=t._R(4);if(a==0||a>40)return r;t.l-=4;r.Reserved1=t._R(0,"lpstr-ansi");if(t.length-t.l<=4)return r;a=t._R(4);if(a!==1907505652)return r;r.UnicodeClipboardFormat=Cn(t);a=t._R(4);if(a==0||a>40)return r;t.l-=4;r.Reserved2=t._R(0,"lpwstr")}var gb=[60,1084,2066,2165,2175];function wb(e,r,t,a,n){var i=a;var s=[];var f=t.slice(t.l,t.l+i);if(n&&n.enc&&n.enc.insitu&&f.length>0)switch(e){case 9:;case 521:;case 1033:;case 2057:;case 47:;case 405:;case 225:;case 406:;case 312:;case 404:;case 10:break;case 133:break;default:n.enc.insitu(f);}s.push(f);t.l+=i;var c=na(t,t.l),l=Ob[c];var o=0;while(l!=null&&gb.indexOf(c)>-1){i=na(t,t.l+2);o=t.l+4;if(c==2066)o+=4;else if(c==2165||c==2175){o+=12}f=t.slice(o,t.l+4+i);s.push(f);t.l+=4+i;l=Ob[c=na(t,t.l)]}var u=N(s);pa(u,0);var h=0;u.lens=[];for(var d=0;d<s.length;++d){u.lens.push(h);h+=s[d].length}if(u.length<a)throw"XLS Record 0x"+e.toString(16)+" Truncated: "+u.length+" < "+a;return r.f(u,u.length,n)}function kb(e,r,t){if(e.t==="z")return;if(!e.XF)return;var a=0;try{a=e.z||e.XF.numFmtId||0;if(r.cellNF)e.z=Y[a]}catch(n){if(r.WTF)throw n}if(!r||r.cellText!==false)try{if(e.t==="e"){e.w=e.w||Kn[e.v]}else if(a===0||a=="General"){if(e.t==="n"){if((e.v|0)===e.v)e.w=e.v.toString(10);else e.w=fe(e.v)}else e.w=ce(e.v)}else e.w=We(a,e.v,{date1904:!!t,dateNF:r&&r.dateNF})}catch(n){if(r.WTF)throw n;
}if(r.cellDates&&a&&e.t=="n"&&Pe(Y[a]||String(a))){var i=q(e.v);if(i){e.t="d";e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u)}}}function Tb(e,r,t){return{v:e,ixfe:r,t:t}}function Eb(e,r){var t={opts:{}};var a={};if(b!=null&&r.dense==null)r.dense=b;var n=r.dense?[]:{};var i={};var s={};var f=null;var l=[];var o="";var u={};var h,d="",v,p,m,g;var w={};var k=[];var T;var E;var y=[];var S=[];var _={Sheets:[],WBProps:{date1904:false},Views:[{}]},A={};var x=function ve(e){if(e<8)return Yn[e];if(e<64)return S[e-8]||Yn[e];return Yn[e]};var C=function pe(e,r,t){var a=r.XF.data;if(!a||!a.patternType||!t||!t.cellStyles)return;r.s={};r.s.patternType=a.patternType;var n;if(n=El(x(a.icvFore))){r.s.fgColor={rgb:n}}if(n=El(x(a.icvBack))){r.s.bgColor={rgb:n}}};var O=function me(e,r,t){if(B>1)return;if(t.sheetRows&&e.r>=t.sheetRows)return;if(t.cellStyles&&r.XF&&r.XF.data)C(e,r,t);delete r.ixfe;delete r.XF;h=e;d=Pa(e);if(!s||!s.s||!s.e)s={s:{r:0,c:0},e:{r:0,c:0}};if(e.r<s.s.r)s.s.r=e.r;if(e.c<s.s.c)s.s.c=e.c;if(e.r+1>s.e.r)s.e.r=e.r+1;if(e.c+1>s.e.c)s.e.c=e.c+1;if(t.cellFormula&&r.f){for(var a=0;a<k.length;++a){if(k[a][0].s.c>e.c||k[a][0].s.r>e.r)continue;if(k[a][0].e.c<e.c||k[a][0].e.r<e.r)continue;r.F=Ma(k[a][0]);if(k[a][0].s.c!=e.c||k[a][0].s.r!=e.r)delete r.f;if(r.f)r.f=""+hd(k[a][1],s,e,M,R);break}}{if(t.dense){if(!n[e.r])n[e.r]=[];n[e.r][e.c]=r}else n[d]=r}};var R={enc:false,sbcch:0,snames:[],sharedf:w,arrayf:k,rrtabid:[],lastuser:"",biff:8,codepage:0,winlocked:0,cellStyles:!!r&&!!r.cellStyles,WTF:!!r&&!!r.wtf};if(r.password)R.password=r.password;var N;var I=[];var F=[];var D=[],P=[];var L=false;var M=[];M.SheetNames=R.snames;M.sharedf=R.sharedf;M.arrayf=R.arrayf;M.names=[];M.XTI=[];var U=0;var B=0;var W=0,H=[];var z=[];var V;R.codepage=1200;c(1200);var G=false;while(e.l<e.length-1){var $=e.l;var j=e._R(2);if(j===0&&U===10)break;var X=e.l===e.length?0:e._R(2);var K=Ob[j];if(K&&K.f){if(r.bookSheets){if(U===133&&j!==133)break}U=j;if(K.r===2||K.r==12){var Z=e._R(2);X-=2;if(!R.enc&&Z!==j&&((Z&255)<<8|Z>>8)!==j)throw new Error("rt mismatch: "+Z+"!="+j);if(K.r==12){e.l+=10;X-=10}}var J={};if(j===10)J=K.f(e,X,R);else J=wb(j,K,e,X,R);if(B==0&&[9,521,1033,2057].indexOf(U)===-1)continue;switch(j){case 34:t.opts.Date1904=_.WBProps.date1904=J;break;case 134:t.opts.WriteProtect=true;break;case 47:if(!R.enc)e.l=0;R.enc=J;if(!r.password)throw new Error("File is password-protected");if(J.valid==null)throw new Error("Encryption scheme unsupported");if(!J.valid)throw new Error("Password is incorrect");break;case 92:R.lastuser=J;break;case 66:var q=Number(J);switch(q){case 21010:q=1200;break;case 32768:q=1e4;break;case 32769:q=1252;break;}c(R.codepage=q);G=true;break;case 317:R.rrtabid=J;break;case 25:R.winlocked=J;break;case 439:t.opts["RefreshAll"]=J;break;case 12:t.opts["CalcCount"]=J;break;case 16:t.opts["CalcDelta"]=J;break;case 17:t.opts["CalcIter"]=J;break;case 13:t.opts["CalcMode"]=J;break;case 14:t.opts["CalcPrecision"]=J;break;case 95:t.opts["CalcSaveRecalc"]=J;break;case 15:R.CalcRefMode=J;break;case 2211:t.opts.FullCalc=J;break;case 129:if(J.fDialog)n["!type"]="dialog";if(!J.fBelow)(n["!outline"]||(n["!outline"]={})).above=true;if(!J.fRight)(n["!outline"]||(n["!outline"]={})).left=true;break;case 224:y.push(J);break;case 430:M.push([J]);M[M.length-1].XTI=[];break;case 35:;case 547:M[M.length-1].push(J);break;case 24:;case 536:V={Name:J.Name,Ref:hd(J.rgce,s,null,M,R)};if(J.itab>0)V.Sheet=J.itab-1;M.names.push(V);if(!M[0]){M[0]=[];M[0].XTI=[]}M[M.length-1].push(J);if(J.Name=="_xlnm._FilterDatabase"&&J.itab>0)if(J.rgce&&J.rgce[0]&&J.rgce[0][0]&&J.rgce[0][0][0]=="PtgArea3d")z[J.itab-1]={ref:Ma(J.rgce[0][0][1][2])};break;case 22:R.ExternCount=J;break;case 23:if(M.length==0){M[0]=[];M[0].XTI=[]}M[M.length-1].XTI=M[M.length-1].XTI.concat(J);M.XTI=M.XTI.concat(J);break;case 2196:if(R.biff<8)break;if(V!=null)V.Comment=J[1];break;case 18:n["!protect"]=J;break;case 19:if(J!==0&&R.WTF)console.error("Password verifier: "+J);break;case 133:{i[J.pos]=J;R.snames.push(J.name)}break;case 10:{if(--B)break;if(s.e){if(s.e.r>0&&s.e.c>0){s.e.r--;s.e.c--;n["!ref"]=Ma(s);if(r.sheetRows&&r.sheetRows<=s.e.r){var Q=s.e.r;s.e.r=r.sheetRows-1;n["!fullref"]=n["!ref"];n["!ref"]=Ma(s);s.e.r=Q}s.e.r++;s.e.c++}if(I.length>0)n["!merges"]=I;if(F.length>0)n["!objects"]=F;if(D.length>0)n["!cols"]=D;if(P.length>0)n["!rows"]=P;_.Sheets.push(A)}if(o==="")u=n;else a[o]=n;n=r.dense?[]:{}}break;case 9:;case 521:;case 1033:;case 2057:{if(R.biff===8)R.biff={9:2,521:3,1033:4}[j]||{512:2,768:3,1024:4,1280:5,1536:8,2:2,7:2}[J.BIFFVer]||8;R.biffguess=J.BIFFVer==0;if(J.BIFFVer==0&&J.dt==4096){R.biff=5;G=true;c(R.codepage=28591)}if(R.biff==8&&J.BIFFVer==0&&J.dt==16)R.biff=2;if(B++)break;n=r.dense?[]:{};if(R.biff<8&&!G){G=true;c(R.codepage=r.codepage||1252)}if(R.biff<5||J.BIFFVer==0&&J.dt==4096){if(o==="")o="Sheet1";s={s:{r:0,c:0},e:{r:0,c:0}};var ee={pos:e.l-X,name:o};i[ee.pos]=ee;R.snames.push(o)}else o=(i[$]||{name:""}).name;if(J.dt==32)n["!type"]="chart";if(J.dt==64)n["!type"]="macro";I=[];F=[];R.arrayf=k=[];D=[];P=[];L=false;A={Hidden:(i[$]||{hs:0}).hs,name:o}}break;case 515:;case 3:;case 2:{if(n["!type"]=="chart")if(r.dense?(n[J.r]||[])[J.c]:n[Pa({c:J.c,r:J.r})])++J.c;T={ixfe:J.ixfe,XF:y[J.ixfe]||{},v:J.val,t:"n"};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r)}break;case 5:;case 517:{T={ixfe:J.ixfe,XF:y[J.ixfe],v:J.val,t:J.t};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r)}break;case 638:{T={ixfe:J.ixfe,XF:y[J.ixfe],v:J.rknum,t:"n"};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r)}break;case 189:{for(var re=J.c;re<=J.C;++re){var te=J.rkrec[re-J.c][0];T={ixfe:te,XF:y[te],v:J.rkrec[re-J.c][1],t:"n"};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:re,r:J.r},T,r)}}break;case 6:;case 518:;case 1030:{if(J.val=="String"){f=J;break}T=Tb(J.val,J.cell.ixfe,J.tt);T.XF=y[T.ixfe];if(r.cellFormula){var ae=J.formula;if(ae&&ae[0]&&ae[0][0]&&ae[0][0][0]=="PtgExp"){var ne=ae[0][0][1][0],ie=ae[0][0][1][1];var se=Pa({r:ne,c:ie});if(w[se])T.f=""+hd(J.formula,s,J.cell,M,R);else T.F=((r.dense?(n[ne]||[])[ie]:n[se])||{}).F}else T.f=""+hd(J.formula,s,J.cell,M,R)}if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O(J.cell,T,r);f=J}break;case 7:;case 519:{if(f){f.val=J;T=Tb(J,f.cell.ixfe,"s");T.XF=y[T.ixfe];if(r.cellFormula){T.f=""+hd(f.formula,s,f.cell,M,R)}if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O(f.cell,T,r);f=null}else throw new Error("String record expects Formula")}break;case 33:;case 545:{k.push(J);var fe=Pa(J[0].s);v=r.dense?(n[J[0].s.r]||[])[J[0].s.c]:n[fe];if(r.cellFormula&&v){if(!f)break;if(!fe||!v)break;v.f=""+hd(J[1],s,J[0],M,R);v.F=Ma(J[0])}}break;case 1212:{if(!r.cellFormula)break;if(d){if(!f)break;w[Pa(f.cell)]=J[0];v=r.dense?(n[f.cell.r]||[])[f.cell.c]:n[Pa(f.cell)];(v||{}).f=""+hd(J[0],s,h,M,R)}}break;case 253:T=Tb(l[J.isst].t,J.ixfe,"s");if(l[J.isst].h)T.h=l[J.isst].h;T.XF=y[T.ixfe];if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r);break;case 513:if(r.sheetStubs){T={ixfe:J.ixfe,XF:y[J.ixfe],t:"z"};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r)}break;case 190:if(r.sheetStubs){for(var ce=J.c;ce<=J.C;++ce){var le=J.ixfe[ce-J.c];T={ixfe:le,XF:y[le],t:"z"};if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:ce,r:J.r},T,r)}}break;case 214:;case 516:;case 4:T=Tb(J.val,J.ixfe,"s");T.XF=y[T.ixfe];if(W>0)T.z=H[T.ixfe>>8&63];kb(T,r,t.opts.Date1904);O({c:J.c,r:J.r},T,r);break;case 0:;case 512:{if(B===1)s=J}break;case 252:{l=J}break;case 1054:{if(R.biff==4){H[W++]=J[1];for(var oe=0;oe<W+163;++oe)if(Y[oe]==J[1])break;if(oe>=163)Ze(J[1],W+163)}else Ze(J[1],J[0])}break;case 30:{H[W++]=J;for(var ue=0;ue<W+163;++ue)if(Y[ue]==J)break;if(ue>=163)Ze(J,W+163)}break;case 229:I=I.concat(J);break;case 93:F[J.cmo[0]]=R.lastobj=J;break;case 438:R.lastobj.TxO=J;break;case 127:R.lastobj.ImData=J;break;case 440:{for(g=J[0].s.r;g<=J[0].e.r;++g)for(m=J[0].s.c;m<=J[0].e.c;++m){v=r.dense?(n[g]||[])[m]:n[Pa({c:m,r:g})];if(v)v.l=J[1]}}break;case 2048:{for(g=J[0].s.r;g<=J[0].e.r;++g)for(m=J[0].s.c;m<=J[0].e.c;++m){v=r.dense?(n[g]||[])[m]:n[Pa({c:m,r:g})];if(v&&v.l)v.l.Tooltip=J[1]}}break;case 28:{if(R.biff<=5&&R.biff>=2)break;v=r.dense?(n[J[0].r]||[])[J[0].c]:n[Pa(J[0])];var he=F[J[2]];if(!v){if(r.dense){if(!n[J[0].r])n[J[0].r]=[];v=n[J[0].r][J[0].c]={t:"z"}}else{v=n[Pa(J[0])]={t:"z"}}s.e.r=Math.max(s.e.r,J[0].r);s.s.r=Math.min(s.s.r,J[0].r);s.e.c=Math.max(s.e.c,J[0].c);s.s.c=Math.min(s.s.c,J[0].c)}if(!v.c)v.c=[];p={a:J[1],t:he.TxO.t};v.c.push(p)}break;case 2173:Go(y[J.ixfe],J.ext);break;case 125:{if(!R.cellStyles)break;while(J.e>=J.s){D[J.e--]={width:J.w/256,level:J.level||0,hidden:!!(J.flags&1)};if(!L){L=true;Dl(J.w/256)}Pl(D[J.e+1])}}break;case 520:{var de={};if(J.level!=null){P[J.r]=de;de.level=J.level}if(J.hidden){P[J.r]=de;de.hidden=true}if(J.hpt){P[J.r]=de;de.hpt=J.hpt;de.hpx=Bl(J.hpt)}}break;case 38:;case 39:;case 40:;case 41:if(!n["!margins"])Zd(n["!margins"]={});n["!margins"][{38:"left",39:"right",40:"top",41:"bottom"}[j]]=J;break;case 161:if(!n["!margins"])Zd(n["!margins"]={});n["!margins"].header=J.header;n["!margins"].footer=J.footer;break;case 574:if(J.RTL)_.Views[0].RTL=true;break;case 146:S=J;break;case 2198:N=J;break;case 140:E=J;break;case 442:{if(!o)_.WBProps.CodeName=J||"ThisWorkbook";else A.CodeName=J||A.name}break;}}else{if(!K)console.error("Missing Info for XLS Record 0x"+j.toString(16));e.l+=X}}t.SheetNames=nr(i).sort(function(e,r){return Number(e)-Number(r)}).map(function(e){return i[e].name});if(!r.bookSheets)t.Sheets=a;if(!t.SheetNames.length&&u["!ref"]){t.SheetNames.push("Sheet1");if(t.Sheets)t.Sheets["Sheet1"]=u}else t.Preamble=u;if(t.Sheets)z.forEach(function(e,r){t.Sheets[t.SheetNames[r]]["!autofilter"]=e});t.Strings=l;t.SSF=Tr(Y);if(R.enc)t.Encryption=R.enc;if(N)t.Themes=N;t.Metadata={};if(E!==undefined)t.Metadata.Country=E;if(M.names.length>0)_.Names=M.names;t.Workbook=_;return t}var yb={SI:"e0859ff2f94f6810ab9108002b27b3d9",DSI:"02d5cdd59c2e1b10939708002b2cf9ae",UDI:"05d5cdd59c2e1b10939708002b2cf9ae"};function Sb(e,r,t){var a=qe.find(e,"/!DocumentSummaryInformation");if(a&&a.size>0)try{var n=Qi(a,zn,yb.DSI);for(var i in n)r[i]=n[i]}catch(s){if(t.WTF)throw s}var f=qe.find(e,"/!SummaryInformation");if(f&&f.size>0)try{var c=Qi(f,Vn,yb.SI);for(var l in c)if(r[l]==null)r[l]=c[l]}catch(s){if(t.WTF)throw s}if(r.HeadingPairs&&r.TitlesOfParts){Ei(r.HeadingPairs,r.TitlesOfParts,r,t);delete r.HeadingPairs;delete r.TitlesOfParts}}function _b(e,r){var t=[],a=[],n=[];var i=0,s;var f=ir(zn,"n");var c=ir(Vn,"n");if(e.Props){s=nr(e.Props);for(i=0;i<s.length;++i)(Object.prototype.hasOwnProperty.call(f,s[i])?t:Object.prototype.hasOwnProperty.call(c,s[i])?a:n).push([s[i],e.Props[s[i]]])}if(e.Custprops){s=nr(e.Custprops);for(i=0;i<s.length;++i)if(!Object.prototype.hasOwnProperty.call(e.Props||{},s[i]))(Object.prototype.hasOwnProperty.call(f,s[i])?t:Object.prototype.hasOwnProperty.call(c,s[i])?a:n).push([s[i],e.Custprops[s[i]]])}var l=[];for(i=0;i<n.length;++i){if(Zi.indexOf(n[i][0])>-1||Ti.indexOf(n[i][0])>-1)continue;if(n[i][1]==null)continue;l.push(n[i])}if(a.length)qe.utils.cfb_add(r,"/SummaryInformation",es(a,yb.SI,c,Vn));if(t.length||l.length)qe.utils.cfb_add(r,"/DocumentSummaryInformation",es(t,yb.DSI,f,zn,l.length?l:null,yb.UDI))}function Ab(e,r){if(!r)r={};tw(r);l();if(r.codepage)s(r.codepage);var t,a;if(e.FullPaths){if(qe.find(e,"/encryption"))throw new Error("File is password-protected");t=qe.find(e,"!CompObj");a=qe.find(e,"/Workbook")||qe.find(e,"/Book")}else{switch(r.type){case"base64":e=A(T(e));break;case"binary":e=A(e);break;case"buffer":break;case"array":if(!Array.isArray(e))e=Array.prototype.slice.call(e);break;}pa(e,0);a={content:e}}var n;var i;if(t)bb(t);if(r.bookProps&&!r.bookSheets)n={};else{var f=E?"buffer":"array";if(a&&a.content)n=Eb(a.content,r);else if((i=qe.find(e,"PerfectOffice_MAIN"))&&i.content)n=Ic.to_workbook(i.content,(r.type=f,r));else if((i=qe.find(e,"NativeContent_MAIN"))&&i.content)n=Ic.to_workbook(i.content,(r.type=f,r));else if((i=qe.find(e,"MN0"))&&i.content)throw new Error("Unsupported Works 4 for Mac file");else throw new Error("Cannot find Workbook stream");if(r.bookVBA&&e.FullPaths&&qe.find(e,"/_VBA_PROJECT_CUR/VBA/dir"))n.vbaraw=Su(e)}var c={};if(e.FullPaths)Sb(e,c,r);n.Props=n.Custprops=c;if(r.bookFiles)n.cfb=e;return n}function xb(e,r){var t=r||{};var a=qe.utils.cfb_new({root:"R"});var n="/Workbook";switch(t.bookType||"xls"){case"xls":t.bookType="biff8";case"xla":if(!t.bookType)t.bookType="xla";case"biff8":n="/Workbook";t.biff=8;break;case"biff5":n="/Book";t.biff=5;break;default:throw new Error("invalid type "+t.bookType+" for XLS CFB");}qe.utils.cfb_add(a,n,Yb(e,t));if(t.biff==8&&(e.Props||e.Custprops))_b(e,a);if(t.biff==8&&e.vbaraw)_u(a,qe.read(e.vbaraw,{type:typeof e.vbaraw=="string"?"binary":"buffer"}));return a}var Cb={0:{f:Fv},1:{f:Hv},2:{f:fp},3:{f:Kv},4:{f:$v},5:{f:ap},6:{f:hp},7:{f:Qv},8:{f:wp},9:{f:gp},10:{f:mp},11:{f:bp},12:{f:Vv},13:{f:lp},14:{f:Jv},15:{f:Xv},16:{f:ip},17:{f:vp},18:{f:rp},19:{f:qa},20:{},21:{},22:{},23:{},24:{},25:{},26:{},27:{},28:{},29:{},30:{},31:{},32:{},33:{},34:{},35:{T:1},36:{T:-1},37:{T:1},38:{T:-1},39:{f:Em},40:{},42:{},43:{f:eo},44:{f:ql},45:{f:no},46:{f:lo},47:{f:so},48:{},49:{f:ja},50:{},51:{f:Xo},52:{T:1},53:{T:-1},54:{T:1},55:{T:-1},56:{T:1},57:{T:-1},58:{},59:{},60:{f:cc},62:{f:up},63:{f:au},64:{f:Lp},65:{},66:{},67:{},68:{},69:{},70:{},128:{},129:{T:1},130:{T:-1},131:{T:1,f:ma,p:0},132:{T:-1},133:{T:1},134:{T:-1},135:{T:1},136:{T:-1},137:{T:1,f:Ip},138:{T:-1},139:{T:1},140:{T:-1},141:{T:1},142:{T:-1},143:{T:1},144:{T:-1},145:{T:1},146:{T:-1},147:{f:Bv},148:{f:Lv,p:16},151:{f:_p},152:{},153:{f:wm},154:{},155:{},156:{f:bm},157:{},158:{},159:{T:1,f:jc},160:{T:-1},161:{T:1,f:gn},162:{T:-1},163:{T:1},164:{T:-1},165:{T:1},166:{T:-1},167:{},168:{},169:{},170:{},171:{},172:{T:1},173:{T:-1},174:{},175:{},176:{f:kp},177:{T:1},178:{T:-1},179:{T:1},180:{T:-1},181:{T:1},182:{T:-1},183:{T:1},184:{T:-1},185:{T:1},186:{T:-1},187:{T:1},188:{T:-1},189:{T:1},190:{T:-1},191:{T:1},192:{T:-1},193:{T:1},194:{T:-1},195:{T:1},196:{T:-1},197:{T:1},198:{T:-1},199:{T:1},200:{T:-1},201:{T:1},202:{T:-1},203:{T:1},204:{T:-1},205:{T:1},206:{T:-1},207:{T:1},208:{T:-1},209:{T:1},210:{T:-1},211:{T:1},212:{T:-1},213:{T:1},214:{T:-1},215:{T:1},216:{T:-1},217:{T:1},218:{T:-1},219:{T:1},220:{T:-1},221:{T:1},222:{T:-1},223:{T:1},224:{T:-1},225:{T:1},226:{T:-1},227:{T:1},228:{T:-1},229:{T:1},230:{T:-1},231:{T:1},232:{T:-1},233:{T:1},234:{T:-1},235:{T:1},236:{T:-1},237:{T:1},238:{T:-1},239:{T:1},240:{T:-1},241:{T:1},242:{T:-1},243:{T:1},244:{T:-1},245:{T:1},246:{T:-1},247:{T:1},248:{T:-1},249:{T:1},250:{T:-1},251:{T:1},252:{T:-1},253:{T:1},254:{T:-1},255:{T:1},256:{T:-1},257:{T:1},258:{T:-1},259:{T:1},260:{T:-1},261:{T:1},262:{T:-1},263:{T:1},264:{T:-1},265:{T:1},266:{T:-1},267:{T:1},268:{T:-1},269:{T:1},270:{T:-1},271:{T:1},272:{T:-1},273:{T:1},274:{T:-1},275:{T:1},276:{T:-1},277:{},278:{T:1},279:{T:-1},280:{T:1},281:{T:-1},282:{T:1},283:{T:1},284:{T:-1},285:{T:1},286:{T:-1},287:{T:1},288:{T:-1},289:{T:1},290:{T:-1},291:{T:1},292:{T:-1},293:{T:1},294:{T:-1},295:{T:1},296:{T:-1},297:{T:1},298:{T:-1},299:{T:1},300:{T:-1},301:{T:1},302:{T:-1},303:{T:1},304:{T:-1},305:{T:1},306:{T:-1},307:{T:1},308:{T:-1},309:{T:1},310:{T:-1},311:{T:1},312:{T:-1},313:{T:-1},314:{T:1},315:{T:-1},316:{T:1},317:{T:-1},318:{T:1},319:{T:-1},320:{T:1},321:{T:-1},322:{T:1},323:{T:-1},324:{T:1},325:{T:-1},326:{T:1},327:{T:-1},328:{T:1},329:{T:-1},330:{T:1},331:{T:-1},332:{T:1},333:{T:-1},334:{T:1},335:{f:$o},336:{T:-1},337:{f:Zo,T:1},338:{T:-1},339:{T:1},340:{T:-1},341:{T:1},342:{T:-1},343:{T:1},344:{T:-1},345:{T:1},346:{T:-1},347:{T:1},348:{T:-1},349:{T:1},350:{T:-1},351:{},352:{},353:{T:1},354:{T:-1},355:{f:hn},357:{},358:{},359:{},360:{T:1},361:{},362:{f:Bf},363:{},364:{},366:{},367:{},368:{},369:{},370:{},371:{},372:{T:1},373:{T:-1},374:{T:1},375:{T:-1},376:{T:1},377:{T:-1},378:{T:1},379:{T:-1},380:{T:1},381:{T:-1},382:{T:1},383:{T:-1},384:{T:1},385:{T:-1},386:{T:1},387:{T:-1},388:{T:1},389:{T:-1},390:{T:1},391:{T:-1},392:{T:1},393:{T:-1},394:{T:1},395:{T:-1},396:{},397:{},398:{},399:{},400:{},401:{T:1},403:{},404:{},405:{},406:{},407:{},408:{},409:{},410:{},411:{},412:{},413:{},414:{},415:{},416:{},417:{},418:{},419:{},420:{},421:{},422:{T:1},423:{T:1},424:{T:-1},425:{T:-1},426:{f:Ap},427:{f:xp},428:{},429:{T:1},430:{T:-1},431:{T:1},432:{T:-1},433:{T:1},434:{T:-1},435:{T:1},436:{T:-1},437:{T:1},438:{T:-1},439:{T:1},440:{T:-1},441:{T:1},442:{T:-1},443:{T:1},444:{T:-1},445:{T:1},446:{T:-1},447:{T:1},448:{T:-1},449:{T:1},450:{T:-1},451:{T:1},452:{T:-1},453:{T:1},454:{T:-1},455:{T:1},456:{T:-1},457:{T:1},458:{T:-1},459:{T:1},460:{T:-1},461:{T:1},462:{T:-1},463:{T:1},464:{T:-1},465:{T:1},466:{T:-1},467:{T:1},468:{T:-1},469:{T:1},470:{T:-1},471:{},472:{},473:{T:1},474:{T:-1},475:{},476:{f:Rp},477:{},478:{},479:{T:1},480:{T:-1},481:{T:1},482:{T:-1},483:{T:1},484:{T:-1},485:{f:Uv},486:{T:1},487:{T:-1},488:{T:1},489:{T:-1},490:{T:1},491:{T:-1},492:{T:1},493:{T:-1},494:{f:yp},495:{T:1},496:{T:-1},497:{T:1},498:{T:-1},499:{},500:{T:1},501:{T:-1},502:{T:1},503:{T:-1},504:{},505:{T:1},506:{T:-1},507:{},508:{T:1},509:{T:-1},510:{T:1},511:{T:-1},512:{},513:{},514:{T:1},515:{T:-1},516:{T:1},517:{T:-1},518:{T:1},519:{T:-1},520:{T:1},521:{T:-1},522:{},523:{},524:{},525:{},526:{},527:{},528:{T:1},529:{T:-1},530:{T:1},531:{T:-1},532:{T:1},533:{T:-1},534:{},535:{},536:{},537:{},538:{T:1},539:{T:-1},540:{T:1},541:{T:-1},542:{T:1},548:{},549:{},550:{f:hn},551:{},552:{},553:{},554:{T:1},555:{T:-1},556:{T:1},557:{T:-1},558:{T:1},559:{T:-1},560:{T:1},561:{T:-1},562:{},564:{},565:{T:1},566:{T:-1},569:{T:1},570:{T:-1},572:{},573:{T:1},574:{T:-1},577:{},578:{},579:{},580:{},581:{},582:{},583:{},584:{},585:{},586:{},587:{},588:{T:-1},589:{},590:{T:1},591:{T:-1},592:{T:1},593:{T:-1},594:{T:1},595:{T:-1},596:{},597:{T:1},598:{T:-1},599:{T:1},600:{T:-1},601:{T:1},602:{T:-1},603:{T:1},604:{T:-1},605:{T:1},606:{T:-1},607:{},608:{T:1},609:{T:-1},610:{},611:{T:1},612:{T:-1},613:{T:1},614:{T:-1},615:{T:1},616:{T:-1},617:{T:1},618:{T:-1},619:{T:1},620:{T:-1},625:{},626:{T:1},627:{T:-1},628:{T:1},629:{T:-1},630:{T:1},631:{T:-1},632:{f:wu},633:{T:1},634:{T:-1},635:{T:1,f:bu},636:{T:-1},637:{f:en},638:{T:1},639:{},640:{T:-1},641:{T:1},642:{T:-1},643:{T:1},644:{},645:{T:-1},646:{T:1},648:{T:1},649:{},650:{T:-1},651:{f:em},652:{},653:{T:1},654:{T:-1},655:{T:1},656:{T:-1},657:{T:1},658:{T:-1},659:{},660:{T:1},661:{},662:{T:-1},663:{},664:{T:1},665:{},666:{T:-1},667:{},668:{},669:{},671:{T:1},672:{T:-1},673:{T:1},674:{T:-1},675:{},676:{},677:{},678:{},679:{},680:{},681:{},1024:{},1025:{},1026:{T:1},1027:{T:-1},1028:{T:1},1029:{T:-1},1030:{},1031:{T:1},1032:{T:-1},1033:{T:1},1034:{T:-1},1035:{},1036:{},1037:{},1038:{T:1},1039:{T:-1},1040:{},1041:{T:1},1042:{T:-1},1043:{},1044:{},1045:{},1046:{T:1},1047:{T:-1},1048:{T:1},1049:{T:-1},1050:{},1051:{T:1},1052:{T:1},1053:{f:Mp},1054:{T:1},1055:{},1056:{T:1},1057:{T:-1},1058:{T:1},1059:{T:-1},1061:{},1062:{T:1},1063:{T:-1},1064:{T:1},1065:{T:-1},1066:{T:1},1067:{T:-1},1068:{T:1},1069:{T:-1},1070:{T:1},1071:{T:-1},1072:{T:1},1073:{T:-1},1075:{T:1},1076:{T:-1},1077:{T:1},1078:{T:-1},1079:{T:1},1080:{T:-1},1081:{T:1},1082:{T:-1},1083:{T:1},1084:{T:-1},1085:{},1086:{T:1},1087:{T:-1},1088:{T:1},1089:{T:-1},1090:{T:1},1091:{T:-1},1092:{T:1},1093:{T:-1},1094:{T:1},1095:{T:-1},1096:{},1097:{T:1},1098:{},1099:{T:-1},1100:{T:1},1101:{T:-1},1102:{},1103:{},1104:{},1105:{},1111:{},1112:{},1113:{T:1},1114:{T:-1},1115:{T:1},1116:{T:-1},1117:{},1118:{T:1},1119:{T:-1},1120:{T:1},1121:{T:-1},1122:{T:1},1123:{T:-1},1124:{T:1},1125:{T:-1},1126:{},1128:{T:1},1129:{T:-1},1130:{},1131:{T:1},1132:{T:-1},1133:{T:1},1134:{T:-1},1135:{T:1},1136:{T:-1},1137:{T:1},1138:{T:-1},1139:{T:1},1140:{T:-1},1141:{},1142:{T:1},1143:{T:-1},1144:{T:1},1145:{T:-1},1146:{},1147:{T:1},1148:{T:-1},1149:{T:1},1150:{T:-1},1152:{T:1},1153:{T:-1},1154:{T:-1},1155:{T:-1},1156:{T:-1},1157:{T:1},1158:{T:-1},1159:{T:1},1160:{T:-1},1161:{T:1},1162:{T:-1},1163:{T:1},1164:{T:-1},1165:{T:1},1166:{T:-1},1167:{T:1},1168:{T:-1},1169:{T:1},1170:{T:-1},1171:{},1172:{T:1},1173:{T:-1},1177:{},1178:{T:1},1180:{},1181:{},1182:{},2048:{T:1},2049:{T:-1},2050:{},2051:{T:1},2052:{T:-1},2053:{},2054:{},2055:{T:1},2056:{T:-1},2057:{T:1},2058:{T:-1},2060:{},2067:{},2068:{T:1},2069:{T:-1},2070:{},2071:{},2072:{T:1},2073:{T:-1},2075:{},2076:{},2077:{T:1},2078:{T:-1},2079:{},2080:{T:1},2081:{T:-1},2082:{},2083:{T:1},2084:{T:-1},2085:{T:1},2086:{T:-1},2087:{T:1},2088:{T:-1},2089:{T:1},2090:{T:-1},2091:{},2092:{},2093:{T:1},2094:{T:-1},2095:{},2096:{T:1},2097:{T:-1},2098:{T:1},2099:{T:-1},2100:{T:1},2101:{T:-1},2102:{},2103:{T:1},2104:{T:-1},2105:{},2106:{T:1},2107:{T:-1},2108:{},2109:{T:1},2110:{T:-1},2111:{T:1},2112:{T:-1},2113:{T:1},2114:{T:-1},2115:{},2116:{},2117:{},2118:{T:1},2119:{T:-1},2120:{},2121:{T:1},2122:{T:-1},2123:{T:1},2124:{T:-1},2125:{},2126:{T:1},2127:{T:-1},2128:{},2129:{T:1},2130:{T:-1},2131:{T:1},2132:{T:-1},2133:{T:1},2134:{},2135:{},2136:{},2137:{T:1},2138:{T:-1},2139:{T:1},2140:{T:-1},2141:{},3072:{},3073:{},4096:{T:1},4097:{T:-1},5002:{T:1},5003:{T:-1},5081:{T:1},5082:{T:-1},5083:{},5084:{T:1},5085:{T:-1},5086:{T:1},5087:{T:-1},5088:{},5089:{},5090:{},5092:{T:1},5093:{T:-1},5094:{},5095:{T:1},5096:{T:-1},5097:{},5099:{},65535:{n:""}};var Ob={6:{f:wd},10:{f:rs},12:{f:ss},13:{f:ss},14:{f:ns},15:{f:ns},16:{f:kn},17:{f:ns},18:{f:ns},19:{f:ss},20:{f:Pf},21:{f:Pf},23:{f:Bf},24:{f:Uf},25:{f:ns},26:{},27:{},28:{f:jf},29:{},34:{f:ns},35:{f:Mf},38:{f:kn},39:{f:kn},40:{f:kn},41:{f:kn},42:{f:ns},43:{f:ns},47:{f:wl},49:{f:hf},51:{f:ss},60:{},61:{f:ff},64:{f:ns},65:{f:uf},66:{f:ss},77:{},80:{},81:{},82:{},85:{f:ss},89:{},90:{},91:{},92:{f:Ys},93:{f:Kf},94:{},95:{f:ns},96:{},97:{},99:{f:ns},125:{f:cc},128:{f:Of},129:{f:Zs},130:{f:ss},131:{f:ns},132:{f:ns},133:{f:Js},134:{},140:{f:ac},141:{f:ss},144:{},146:{f:sc},151:{},152:{},153:{},154:{},155:{},156:{f:ss},157:{},158:{},160:{f:vc},161:{f:oc},174:{},175:{},176:{},177:{},178:{},180:{},181:{},182:{},184:{},185:{},189:{f:Sf},190:{f:_f},193:{f:rs},197:{},198:{},199:{},200:{},201:{},202:{f:ns},203:{},204:{},205:{},206:{},207:{},208:{},209:{},210:{},211:{},213:{},215:{},216:{},217:{},218:{f:ss},220:{},221:{f:ns},222:{},224:{f:xf},225:{f:Xs},226:{f:rs},227:{},229:{f:Xf},233:{},235:{},236:{},237:{},239:{},240:{},241:{},242:{},244:{},245:{},246:{},247:{},248:{},249:{},251:{},252:{f:Qs},253:{f:vf},255:{f:rf},256:{},259:{},290:{},311:{},312:{},315:{},317:{f:cs},318:{},319:{},320:{},330:{},331:{},333:{},334:{},335:{},336:{},337:{},338:{},339:{},340:{},351:{},352:{f:ns},353:{f:rs},401:{},402:{},403:{},404:{},405:{},406:{},407:{},408:{},425:{},426:{},427:{},428:{},429:{},430:{f:Lf},431:{f:ns},432:{},433:{},434:{},437:{},438:{f:qf},439:{f:ns},440:{f:Qf},441:{},442:{f:ps},443:{},444:{f:ss},445:{},446:{},448:{f:rs},449:{f:nf,r:2},450:{f:rs},512:{f:Tf},513:{f:dc},515:{f:Ff},516:{f:mf},517:{f:Nf},519:{f:pc},520:{f:tf},523:{},545:{f:Vf},549:{f:sf},566:{},574:{f:lf},638:{f:yf},659:{},1048:{},1054:{f:gf},1084:{},1212:{f:zf},2048:{f:rc},2049:{},2050:{},2051:{},2052:{},2053:{},2054:{},2055:{},2056:{},2057:{f:$s},2058:{},2059:{},2060:{},2061:{},2062:{},2063:{},2064:{},2066:{},2067:{},2128:{},2129:{},2130:{},2131:{},2132:{},2133:{},2134:{},2135:{},2136:{},2137:{},2138:{},2146:{},2147:{r:12},2148:{},2149:{},2150:{},2151:{f:rs},2152:{},2154:{},2155:{},2156:{},2161:{},2162:{},2164:{},2165:{},2166:{},2167:{},2168:{},2169:{},2170:{},2171:{},2172:{f:fc,r:12},2173:{f:Vo,r:12},2174:{},2175:{},2180:{},2181:{},2182:{},2183:{},2184:{},2185:{},2186:{},2187:{},2188:{f:ns,r:12},2189:{},2190:{r:12},2191:{},2192:{},2194:{},2195:{},2196:{f:Hf,r:12},2197:{},2198:{f:Mo,r:12},2199:{},2200:{},2201:{},2202:{f:Gf,r:12},2203:{f:rs},2204:{},2205:{},2206:{},2207:{},2211:{f:af},2212:{},2213:{},2214:{},2215:{},4097:{},4098:{},4099:{},4102:{},4103:{},4105:{},4106:{},4107:{},4108:{},4109:{},4116:{},4117:{},4118:{},4119:{},4120:{},4121:{},4122:{},4123:{},4124:{},4125:{},4126:{},4127:{},4128:{},4129:{},4130:{},4132:{},4133:{},4134:{f:ss},4135:{},4146:{},4147:{},4148:{},4149:{},4154:{},4156:{},4157:{},4158:{},4159:{},4160:{},4161:{},4163:{},4164:{f:uc},4165:{},4166:{},4168:{},4170:{},4171:{},4174:{},4175:{},4176:{},4177:{},4187:{},4188:{f:ic},4189:{},4191:{},4192:{},4193:{},4194:{},4195:{},4196:{},4197:{},4198:{},4199:{},4200:{},0:{f:Tf},1:{},2:{f:kc},3:{f:gc},4:{f:bc},5:{f:Nf},7:{f:Ec},8:{},9:{f:$s},11:{},22:{f:ss},30:{f:kf},31:{},32:{},33:{f:Vf},36:{},37:{f:sf},50:{f:yc},62:{},52:{},67:{},68:{f:ss},69:{},86:{},126:{},127:{f:mc},135:{},136:{},137:{},145:{},148:{},149:{},150:{},169:{},171:{},188:{},191:{},192:{},194:{},195:{},214:{f:Sc},223:{},234:{},354:{},421:{},518:{f:wd},521:{f:$s},536:{f:Uf},547:{f:Mf},561:{},579:{},1030:{f:wd},1033:{f:$s},1091:{},2157:{},2163:{},2177:{},2240:{},2241:{},2242:{},2243:{},2244:{},2245:{},2246:{},2247:{},2248:{},2249:{},2250:{},2251:{},2262:{r:12},101:{},102:{},105:{},106:{},107:{},109:{},112:{},114:{},29282:{}};function Rb(e,r,t,a){var n=r;if(isNaN(n))return;var i=a||(t||[]).length||0;var s=e.next(4);s._W(2,n);s._W(2,i);if(i>0&&ra(t))e.push(t)}function Nb(e,r,t,a){var n=a||(t||[]).length||0;if(n<=8224)return Rb(e,r,t,n);var i=r;if(isNaN(i))return;var s=t.parts||[],f=0;var c=0,l=0;while(l+(s[f]||8224)<=8224){l+=s[f]||8224;f++}var o=e.next(4);o._W(2,i);o._W(2,l);e.push(t.slice(c,c+l));c+=l;while(c<n){o=e.next(4);o._W(2,60);l=0;while(l+(s[f]||8224)<=8224){l+=s[f]||8224;f++}o._W(2,l);e.push(t.slice(c,c+l));c+=l}}function Ib(e,r,t){if(!e)e=ba(7);e._W(2,r);e._W(2,t);e._W(2,0);e._W(1,0);return e}function Fb(e,r,t,a){var n=ba(9);Ib(n,e,r);os(t,a||"b",n);return n}function Db(e,r,t){var a=ba(8+2*t.length);Ib(a,e,r);a._W(1,t.length);a._W(t.length,t,"sbcs");return a.l<a.length?a.slice(0,a.l):a}function Pb(e,r,t,a){if(r.v!=null)switch(r.t){case"d":;case"n":var n=r.t=="d"?or(wr(r.v)):r.v;if(n==(n|0)&&n>=0&&n<65536)Rb(e,2,Tc(t,a,n));else Rb(e,3,wc(t,a,n));return;case"b":;case"e":Rb(e,5,Fb(t,a,r.v,r.t));return;case"s":;case"str":Rb(e,4,Db(t,a,(r.v||"").slice(0,255)));return;}Rb(e,1,Ib(null,t,a))}function Lb(e,r,t,a){var n=Array.isArray(r);var i=Wa(r["!ref"]||"A1"),s,f="",c=[];if(i.e.c>255||i.e.r>16383){if(a.WTF)throw new Error("Range "+(r["!ref"]||"A1")+" exceeds format limit A1:IV16384");i.e.c=Math.min(i.e.c,255);i.e.r=Math.min(i.e.c,16383);s=Ma(i)}for(var l=i.s.r;l<=i.e.r;++l){f=Aa(l);for(var o=i.s.c;o<=i.e.c;++o){if(l===i.s.r)c[o]=Ra(o);s=c[o]+f;var u=n?(r[l]||[])[o]:r[s];if(!u)continue;Pb(e,u,l,o,a)}}}function Mb(e,r){var t=r||{};if(b!=null&&t.dense==null)t.dense=b;var a=wa();var n=0;for(var i=0;i<e.SheetNames.length;++i)if(e.SheetNames[i]==t.sheet)n=i;if(n==0&&!!t.sheet&&e.SheetNames[0]!=t.sheet)throw new Error("Sheet not found: "+t.sheet);Rb(a,t.biff==4?1033:t.biff==3?521:9,js(e,16,t));Lb(a,e.Sheets[e.SheetNames[n]],n,t,e);Rb(a,10);return a.end()}function Ub(e,r,t){Rb(e,49,df({sz:12,color:{theme:1},name:"Arial",family:2,scheme:"minor"},t))}function Bb(e,r,t){if(!r)return;[[5,8],[23,26],[41,44],[50,392]].forEach(function(a){for(var n=a[0];n<=a[1];++n)if(r[n]!=null)Rb(e,1054,wf(n,r[n],t))})}function Wb(e,r){var t=ba(19);t._W(4,2151);t._W(4,0);t._W(4,0);t._W(2,3);t._W(1,1);t._W(4,0);Rb(e,2151,t);t=ba(39);t._W(4,2152);t._W(4,0);t._W(4,0);t._W(2,3);t._W(1,0);t._W(4,0);t._W(2,1);t._W(4,4);t._W(2,0);Ls(Wa(r["!ref"]||"A1"),t);t._W(4,4);Rb(e,2152,t)}function Hb(e,r){for(var t=0;t<16;++t)Rb(e,224,Cf({numFmtId:0,style:true},0,r));r.cellXfs.forEach(function(t){Rb(e,224,Cf(t,0,r))})}function zb(e,r){for(var t=0;t<r["!links"].length;++t){var a=r["!links"][t];Rb(e,440,ec(a));if(a[1].Tooltip)Rb(e,2048,tc(a))}delete r["!links"]}function Vb(e,r){if(!r)return;var t=0;r.forEach(function(r,a){if(++t<=256&&r){Rb(e,125,lc(Kd(a,r),a))}})}function Gb(e,r,t,a,n){var i=16+Jd(n.cellXfs,r,n);if(r.v==null&&!r.bf){Rb(e,513,Os(t,a,i));return}if(r.bf)Rb(e,6,kd(r,t,a,n,i));else switch(r.t){case"d":;case"n":var s=r.t=="d"?or(wr(r.v)):r.v;Rb(e,515,Df(t,a,s,i,n));break;case"b":;case"e":Rb(e,517,If(t,a,r.v,i,n,r.t));break;case"s":;case"str":if(n.bookSST){var f=Yd(n.Strings,r.v,n.revStrings);Rb(e,253,pf(t,a,f,i,n))}else Rb(e,516,bf(t,a,(r.v||"").slice(0,255),i,n));break;default:Rb(e,513,Os(t,a,i));}}function $b(e,r,t){var a=wa();var n=t.SheetNames[e],i=t.Sheets[n]||{};var s=(t||{}).Workbook||{};var f=(s.Sheets||[])[e]||{};var c=Array.isArray(i);var l=r.biff==8;var o,u="",h=[];var d=Wa(i["!ref"]||"A1");var v=l?65536:16384;if(d.e.c>255||d.e.r>=v){if(r.WTF)throw new Error("Range "+(i["!ref"]||"A1")+" exceeds format limit A1:IV16384");d.e.c=Math.min(d.e.c,255);d.e.r=Math.min(d.e.c,v-1)}Rb(a,2057,js(t,16,r));Rb(a,13,fs(1));Rb(a,12,fs(100));Rb(a,15,is(true));Rb(a,17,is(false));Rb(a,16,Tn(.001));Rb(a,95,is(true));Rb(a,42,is(false));Rb(a,43,is(false));Rb(a,130,fs(1));Rb(a,128,Rf([0,0]));Rb(a,131,is(false));Rb(a,132,is(false));if(l)Vb(a,i["!cols"]);Rb(a,512,Ef(d,r));if(l)i["!links"]=[];var p=[];for(var m=d.s.r;m<=d.e.r;++m){u=Aa(m);for(var b=d.s.c;b<=d.e.c;++b){if(m===d.s.r)h[b]=Ra(b);o=h[b]+u;var g=c?(i[m]||[])[b]:i[o];if(!g)continue;Gb(a,g,m,b,r);if(l&&g.l)i["!links"].push([o,g.l]);if(l&&g.c)p.push([o,g.c])}}var w=f.CodeName||f.name||n;if(l)Rb(a,574,of((s.Views||[])[0]));if(l&&(i["!merges"]||[]).length)Rb(a,229,Yf(i["!merges"]));if(l)zb(a,i);Rb(a,442,bs(w,r));if(l)Wb(a,i);Rb(a,10);return a.end()}function jb(e,r,t){var a=wa();var n=(e||{}).Workbook||{};var i=n.Sheets||[];var s=n.WBProps||{};var f=t.biff==8,c=t.biff==5;Rb(a,2057,js(e,5,t));if(t.bookType=="xla")Rb(a,135);Rb(a,225,f?fs(1200):null);Rb(a,193,ts(2));if(c)Rb(a,191);if(c)Rb(a,192);Rb(a,226);Rb(a,92,Ks("SheetJS",t));Rb(a,66,fs(f?1200:1252));if(f)Rb(a,353,fs(0));if(f)Rb(a,448);Rb(a,317,hc(e.SheetNames.length));if(f&&e.vbaraw)Rb(a,211);if(f&&e.vbaraw){var l=s.CodeName||"ThisWorkbook";Rb(a,442,bs(l,t))}Rb(a,156,fs(17));Rb(a,25,is(false));Rb(a,18,is(false));Rb(a,19,fs(0));if(f)Rb(a,431,is(false));if(f)Rb(a,444,fs(0));Rb(a,61,cf(t));Rb(a,64,is(false));Rb(a,141,fs(0));Rb(a,34,is(lm(e)=="true"));Rb(a,14,is(true));if(f)Rb(a,439,is(false));Rb(a,218,fs(0));Ub(a,e,t);Bb(a,e.SSF,t);Hb(a,t);if(f)Rb(a,352,is(false));var o=a.end();var u=wa();if(f)Rb(u,140,nc());if(f&&t.Strings)Nb(u,252,ef(t.Strings,t));Rb(u,10);var h=u.end();var d=wa();var v=0,p=0;for(p=0;p<e.SheetNames.length;++p)v+=(f?12:11)+(f?2:1)*e.SheetNames[p].length;var m=o.length+v+h.length;for(p=0;p<e.SheetNames.length;++p){var b=i[p]||{};Rb(d,133,qs({pos:m,hs:b.Hidden||0,dt:0,name:e.SheetNames[p]},t));m+=r[p].length}var g=d.end();if(v!=g.length)throw new Error("BS8 "+v+" != "+g.length);var w=[];if(o.length)w.push(o);if(g.length)w.push(g);if(h.length)w.push(h);return N(w)}function Xb(e,r){var t=r||{};var a=[];if(e&&!e.SSF){e.SSF=Tr(Y)}if(e&&e.SSF){Ve();ze(e.SSF);t.revssf=fr(e.SSF);t.revssf[e.SSF[65535]]=0;t.ssf=e.SSF}t.Strings=[];t.Strings.Count=0;t.Strings.Unique=0;aw(t);t.cellXfs=[];Jd(t.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};for(var n=0;n<e.SheetNames.length;++n)a[a.length]=$b(n,t,e);a.unshift(jb(e,a,t));return N(a)}function Yb(e,r){for(var t=0;t<=e.SheetNames.length;++t){var a=e.Sheets[e.SheetNames[t]];if(!a||!a["!ref"])continue;var n=La(a["!ref"]);if(n.e.c>255){if(typeof console!="undefined"&&console.error)console.error("Worksheet '"+e.SheetNames[t]+"' extends beyond column IV (255).  Data may be lost.")}}var i=r||{};switch(i.biff||2){case 8:;case 5:return Xb(e,r);case 4:;case 3:;case 2:return Mb(e,r);}throw new Error("invalid type "+i.bookType+" for BIFF")}function Kb(e,r){var t=r||{};if(b!=null&&t.dense==null)t.dense=b;var a=t.dense?[]:{};e=e.replace(/<!--.*?-->/g,"");var n=e.match(/<table/i);if(!n)throw new Error("Invalid HTML: could not find <table>");var i=e.match(/<\/table/i);var s=n.index,f=i&&i.index||e.length;
var c=Cr(e.slice(s,f),/(:?<tr[^>]*>)/i,"<tr>");var l=-1,o=0,u=0,h=0;var d={s:{r:1e7,c:1e7},e:{r:0,c:0}};var v=[];for(s=0;s<c.length;++s){var p=c[s].trim();var m=p.slice(0,3).toLowerCase();if(m=="<tr"){++l;if(t.sheetRows&&t.sheetRows<=l){--l;break}o=0;continue}if(m!="<td"&&m!="<th")continue;var g=p.split(/<\/t[dh]>/i);for(f=0;f<g.length;++f){var w=g[f].trim();if(!w.match(/<t[dh]/i))continue;var k=w,T=0;while(k.charAt(0)=="<"&&(T=k.indexOf(">"))>-1)k=k.slice(T+1);for(var E=0;E<v.length;++E){var y=v[E];if(y.s.c==o&&y.s.r<l&&l<=y.e.r){o=y.e.c+1;E=-1}}var S=Kr(w.slice(0,w.indexOf(">")));h=S.colspan?+S.colspan:1;if((u=+S.rowspan)>1||h>1)v.push({s:{r:l,c:o},e:{r:l+(u||1)-1,c:o+h-1}});var _=S.t||S["data-t"]||"";if(!k.length){o+=h;continue}k=bt(k);if(d.s.r>l)d.s.r=l;if(d.e.r<l)d.e.r=l;if(d.s.c>o)d.s.c=o;if(d.e.c<o)d.e.c=o;if(!k.length){o+=h;continue}var A={t:"s",v:k};if(t.raw||!k.trim().length||_=="s"){}else if(k==="TRUE")A={t:"b",v:true};else if(k==="FALSE")A={t:"b",v:false};else if(!isNaN(yr(k)))A={t:"n",v:yr(k)};else if(!isNaN(xr(k).getDate())){A={t:"d",v:wr(k)};if(!t.cellDates)A={t:"n",v:or(A.v)};A.z=t.dateNF||Y[14]}if(t.dense){if(!a[l])a[l]=[];a[l][o]=A}else a[Pa({r:l,c:o})]=A;o+=h}}a["!ref"]=Ma(d);if(v.length)a["!merges"]=v;return a}function Zb(e,r,t,a){var n=e["!merges"]||[];var i=[];var s={};for(var f=r.s.c;f<=r.e.c;++f){var c=0,l=0;for(var o=0;o<n.length;++o){if(n[o].s.r>t||n[o].s.c>f)continue;if(n[o].e.r<t||n[o].e.c<f)continue;if(n[o].s.r<t||n[o].s.c<f){c=-1;break}c=n[o].e.r-n[o].s.r+1;l=n[o].e.c-n[o].s.c+1;break}if(c<0)continue;var u=Pa({r:t,c:f});var h=a.dense?(e[t]||[])[f]:e[u];var d=h&&h.v!=null&&(h.h||it(h.w||(za(h),h.w)||""))||"";s={};if(c>1)s.rowspan=c;if(l>1)s.colspan=l;if(a.editable)d='<span contenteditable="true">'+d+"</span>";else if(h){s["data-t"]=h&&h.t||"z";if(h.v!=null)s["data-v"]=h.v;if(h.z!=null)s["data-z"]=h.z;if(h.l&&(h.l.Target||"#").charAt(0)!="#")d='<a href="'+h.l.Target+'">'+d+"</a>"}s.id=(a.id||"sjs")+"-"+u;i.push(_t("td",d,s))}var v="<tr>";return v+i.join("")+"</tr>"}var Jb='<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';var qb="</body></html>";function Qb(e,r){var t=e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);if(!t||t.length==0)throw new Error("Invalid HTML: could not find <table>");if(t.length==1)return Va(Kb(t[0],r),r);var a=Yw();t.forEach(function(e,t){Kw(a,Kb(e,r),"Sheet"+(t+1))});return a}function eg(e,r,t){var a=[];return a.join("")+"<table"+(t&&t.id?' id="'+t.id+'"':"")+">"}function rg(e,r){var t=r||{};var a=t.header!=null?t.header:Jb;var n=t.footer!=null?t.footer:qb;var i=[a];var s=La(e["!ref"]);t.dense=Array.isArray(e);i.push(eg(e,s,t));for(var f=s.s.r;f<=s.e.r;++f)i.push(Zb(e,s,f,t));i.push("</table>"+n);return i.join("")}function tg(e,r,t){var a=r.rows;if(!a){throw"Unsupported origin when "+r.tagName+" is not a TABLE"}var n=t||{};if(b!=null)n.dense=b;var i=0,s=0;if(n.origin!=null){if(typeof n.origin=="number")i=n.origin;else{var f=typeof n.origin=="string"?Da(n.origin):n.origin;i=f.r;s=f.c}}var c=Math.min(n.sheetRows||1e7,a.length);var l={s:{r:0,c:0},e:{r:i,c:s}};if(e["!ref"]){var o=La(e["!ref"]);l.s.r=Math.min(l.s.r,o.s.r);l.s.c=Math.min(l.s.c,o.s.c);l.e.r=Math.max(l.e.r,o.e.r);l.e.c=Math.max(l.e.c,o.e.c);if(i==-1)l.e.r=i=o.e.r+1}var u=[],h=0;var d=e["!rows"]||(e["!rows"]=[]);var v=0,p=0,m=0,g=0,w=0,k=0;if(!e["!cols"])e["!cols"]=[];for(;v<a.length&&p<c;++v){var T=a[v];if(ig(T)){if(n.display)continue;d[p]={hidden:true}}var E=T.cells;for(m=g=0;m<E.length;++m){var y=E[m];if(n.display&&ig(y))continue;var S=y.hasAttribute("data-v")?y.getAttribute("data-v"):y.hasAttribute("v")?y.getAttribute("v"):bt(y.innerHTML);var _=y.getAttribute("data-z")||y.getAttribute("z");for(h=0;h<u.length;++h){var A=u[h];if(A.s.c==g+s&&A.s.r<p+i&&p+i<=A.e.r){g=A.e.c+1-s;h=-1}}k=+y.getAttribute("colspan")||1;if((w=+y.getAttribute("rowspan")||1)>1||k>1)u.push({s:{r:p+i,c:g+s},e:{r:p+i+(w||1)-1,c:g+s+(k||1)-1}});var x={t:"s",v:S};var C=y.getAttribute("data-t")||y.getAttribute("t")||"";if(S!=null){if(S.length==0)x.t=C||"z";else if(n.raw||S.trim().length==0||C=="s"){}else if(S==="TRUE")x={t:"b",v:true};else if(S==="FALSE")x={t:"b",v:false};else if(!isNaN(yr(S)))x={t:"n",v:yr(S)};else if(!isNaN(xr(S).getDate())){x={t:"d",v:wr(S)};if(!n.cellDates)x={t:"n",v:or(x.v)};x.z=n.dateNF||Y[14]}}if(x.z===undefined&&_!=null)x.z=_;var O="",R=y.getElementsByTagName("A");if(R&&R.length)for(var N=0;N<R.length;++N)if(R[N].hasAttribute("href")){O=R[N].getAttribute("href");if(O.charAt(0)!="#")break}if(O&&O.charAt(0)!="#"&&O.slice(0,11).toLowerCase()!="javascript:")x.l={Target:O};if(n.dense){if(!e[p+i])e[p+i]=[];e[p+i][g+s]=x}else e[Pa({c:g+s,r:p+i})]=x;if(l.e.c<g+s)l.e.c=g+s;g+=k}++p}if(u.length)e["!merges"]=(e["!merges"]||[]).concat(u);l.e.r=Math.max(l.e.r,p-1+i);e["!ref"]=Ma(l);if(p>=c)e["!fullref"]=Ma((l.e.r=a.length-v+p-1+i,l));return e}function ag(e,r){var t=r||{};var a=t.dense?[]:{};return tg(a,e,r)}function ng(e,r){return Va(ag(e,r),r)}function ig(e){var r="";var t=sg(e);if(t)r=t(e).getPropertyValue("display");if(!r)r=e.style&&e.style.display;return r==="none"}function sg(e){if(e.ownerDocument.defaultView&&typeof e.ownerDocument.defaultView.getComputedStyle==="function")return e.ownerDocument.defaultView.getComputedStyle;if(typeof getComputedStyle==="function")return getComputedStyle;return null}function fg(e){var r=e.replace(/[\t\r\n]/g," ").trim().replace(/ +/g," ").replace(/<text:s\/>/g," ").replace(/<text:s text:c="(\d+)"\/>/g,function(e,r){return Array(parseInt(r,10)+1).join(" ")}).replace(/<text:tab[^>]*\/>/g,"\t").replace(/<text:line-break\/>/g,"\n");var t=Qr(r.replace(/<[^>]*>/g,""));return[t]}function cg(e,r,t){var a=t||{};var n=Ct(e);Ot.lastIndex=0;n=n.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");var i,s,f="",c="",l,o=0,u=-1,h=false,d="";while(i=Ot.exec(n)){switch(i[3]=i[3].replace(/_.*$/,"")){case"number-style":;case"currency-style":;case"percentage-style":;case"date-style":;case"time-style":;case"text-style":if(i[1]==="/"){h=false;if(s["truncate-on-overflow"]=="false"){if(f.match(/h/))f=f.replace(/h+/,"[$&]");else if(f.match(/m/))f=f.replace(/m+/,"[$&]");else if(f.match(/s/))f=f.replace(/s+/,"[$&]")}a[s.name]=f;f=""}else if(i[0].charAt(i[0].length-2)!=="/"){h=true;f="";s=Kr(i[0],false)}break;case"boolean-style":if(i[1]==="/"){h=false;a[s.name]="General";f=""}else if(i[0].charAt(i[0].length-2)!=="/"){h=true;f="";s=Kr(i[0],false)}break;case"boolean":f+="General";break;case"text":if(i[1]==="/"){d=n.slice(u,Ot.lastIndex-i[0].length);if(d=="%"&&s[0]=="<number:percentage-style")f+="%";else f+='"'+d.replace(/"/g,'""')+'"'}else if(i[0].charAt(i[0].length-2)!=="/"){u=Ot.lastIndex}break;case"day":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="d";break;case"long":f+="dd";break;default:f+="dd";break;}}break;case"day-of-week":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="ddd";break;case"long":f+="dddd";break;default:f+="ddd";break;}}break;case"era":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="ee";break;case"long":f+="eeee";break;default:f+="eeee";break;}}break;case"hours":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="h";break;case"long":f+="hh";break;default:f+="hh";break;}}break;case"minutes":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="m";break;case"long":f+="mm";break;default:f+="mm";break;}}break;case"month":{l=Kr(i[0],false);if(l["textual"])f+="mm";switch(l["style"]){case"short":f+="m";break;case"long":f+="mm";break;default:f+="m";break;}}break;case"seconds":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="s";break;case"long":f+="ss";break;default:f+="ss";break;}if(l["decimal-places"])f+="."+Er("0",+l["decimal-places"])}break;case"year":{l=Kr(i[0],false);switch(l["style"]){case"short":f+="yy";break;case"long":f+="yyyy";break;default:f+="yy";break;}}break;case"am-pm":f+="AM/PM";break;case"week-of-year":;case"quarter":console.error("Excel does not support ODS format token "+i[3]);break;case"fill-character":if(i[1]==="/"){d=n.slice(u,Ot.lastIndex-i[0].length);f+='"'+d.replace(/"/g,'""')+'"*'}else if(i[0].charAt(i[0].length-2)!=="/"){u=Ot.lastIndex}break;case"scientific-number":l=Kr(i[0],false);f+="0."+Er("0",+l["min-decimal-places"]||+l["decimal-places"]||2)+Er("?",+l["decimal-places"]-+l["min-decimal-places"]||0)+"E"+(lt(l["forced-exponent-sign"])?"+":"")+Er("0",+l["min-exponent-digits"]||2);break;case"fraction":l=Kr(i[0],false);if(!+l["min-integer-digits"])f+="#";else f+=Er("0",+l["min-integer-digits"]);f+=" ";f+=Er("?",+l["min-numerator-digits"]||1);f+="/";if(+l["denominator-value"])f+=l["denominator-value"];else f+=Er("?",+l["min-denominator-digits"]||1);break;case"currency-symbol":if(i[1]==="/"){f+='"'+n.slice(u,Ot.lastIndex-i[0].length).replace(/"/g,'""')+'"'}else if(i[0].charAt(i[0].length-2)!=="/"){u=Ot.lastIndex}else f+="$";break;case"text-properties":l=Kr(i[0],false);switch((l["color"]||"").toLowerCase().replace("#","")){case"ff0000":;case"red":f="[Red]"+f;break;}break;case"text-content":f+="@";break;case"map":l=Kr(i[0],false);if(Qr(l["condition"])=="value()>=0")f=a[l["apply-style-name"]]+";"+f;else console.error("ODS number format may be incorrect: "+l["condition"]);break;case"number":if(i[1]==="/")break;l=Kr(i[0],false);c="";c+=Er("0",+l["min-integer-digits"]||1);if(lt(l["grouping"]))c=ue(Er("#",Math.max(0,4-c.length))+c);if(+l["min-decimal-places"]||+l["decimal-places"])c+=".";if(+l["min-decimal-places"])c+=Er("0",+l["min-decimal-places"]||1);if(+l["decimal-places"]-(+l["min-decimal-places"]||0))c+=Er("0",+l["decimal-places"]-(+l["min-decimal-places"]||0));f+=c;break;case"embedded-text":if(i[1]==="/"){if(o==0)f+='"'+n.slice(u,Ot.lastIndex-i[0].length).replace(/"/g,'""')+'"';else f=f.slice(0,o)+'"'+n.slice(u,Ot.lastIndex-i[0].length).replace(/"/g,'""')+'"'+f.slice(o)}else if(i[0].charAt(i[0].length-2)!=="/"){u=Ot.lastIndex;o=-+Kr(i[0],false)["position"]||0}break;}}return a}function lg(e,r,t){var a=r||{};if(b!=null&&a.dense==null)a.dense=b;var n=Ct(e);var i=[],s;var f;var c,l="",o=0;var u;var h;var d={},v=[];var p=a.dense?[]:{};var m,g;var w={value:""};var k="",T=0,E;var y=[];var S=-1,_=-1,A={s:{r:1e6,c:1e7},e:{r:0,c:0}};var x=0;var C=t||{},O={};var R=[],N={},I=0,F=0;var D=[],P=1,L=1;var M=[];var U={Names:[],WBProps:{}};var B={};var W=["",""];var H=[],z={};var V="",G=0;var $=false,j=false;var X=0;var Y=0;Ot.lastIndex=0;n=n.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");while(m=Ot.exec(n))switch(m[3]=m[3].replace(/_.*$/,"")){case"table":;case"工作表":if(m[1]==="/"){if(A.e.c>=A.s.c&&A.e.r>=A.s.r)p["!ref"]=Ma(A);else p["!ref"]="A1:A1";if(a.sheetRows>0&&a.sheetRows<=A.e.r){p["!fullref"]=p["!ref"];A.e.r=a.sheetRows-1;p["!ref"]=Ma(A)}if(R.length)p["!merges"]=R;if(D.length)p["!rows"]=D;u.name=u["名称"]||u.name;if(typeof JSON!=="undefined")JSON.stringify(u);v.push(u.name);d[u.name]=p;j=false}else if(m[0].charAt(m[0].length-2)!=="/"){u=Kr(m[0],false);S=_=-1;A.s.r=A.s.c=1e7;A.e.r=A.e.c=0;p=a.dense?[]:{};R=[];D=[];j=true}break;case"table-row-group":if(m[1]==="/")--x;else++x;break;case"table-row":;case"行":if(m[1]==="/"){S+=P;P=1;break}h=Kr(m[0],false);if(h["行号"])S=h["行号"]-1;else if(S==-1)S=0;P=+h["number-rows-repeated"]||1;if(P<10)for(X=0;X<P;++X)if(x>0)D[S+X]={level:x};_=-1;break;case"covered-table-cell":if(m[1]!=="/")++_;if(a.sheetStubs){if(a.dense){if(!p[S])p[S]=[];p[S][_]={t:"z"}}else p[Pa({r:S,c:_})]={t:"z"}}k="";y=[];break;case"table-cell":;case"数据":if(m[0].charAt(m[0].length-2)==="/"){++_;w=Kr(m[0],false);L=parseInt(w["number-columns-repeated"]||"1",10);g={t:"z",v:null};if(w.formula&&a.cellFormula!=false)g.f=Hd(Qr(w.formula));if(w["style-name"]&&O[w["style-name"]])g.z=O[w["style-name"]];if((w["数据类型"]||w["value-type"])=="string"){g.t="s";g.v=Qr(w["string-value"]||"");if(a.dense){if(!p[S])p[S]=[];p[S][_]=g}else{p[Pa({r:S,c:_})]=g}}_+=L-1}else if(m[1]!=="/"){++_;k="";T=0;y=[];L=1;var K=P?S+P-1:S;if(_>A.e.c)A.e.c=_;if(_<A.s.c)A.s.c=_;if(S<A.s.r)A.s.r=S;if(K>A.e.r)A.e.r=K;w=Kr(m[0],false);H=[];z={};g={t:w["数据类型"]||w["value-type"],v:null};if(w["style-name"]&&O[w["style-name"]])g.z=O[w["style-name"]];if(a.cellFormula){if(w.formula)w.formula=Qr(w.formula);if(w["number-matrix-columns-spanned"]&&w["number-matrix-rows-spanned"]){I=parseInt(w["number-matrix-rows-spanned"],10)||0;F=parseInt(w["number-matrix-columns-spanned"],10)||0;N={s:{r:S,c:_},e:{r:S+I-1,c:_+F-1}};g.F=Ma(N);M.push([N,g.F])}if(w.formula)g.f=Hd(w.formula);else for(X=0;X<M.length;++X)if(S>=M[X][0].s.r&&S<=M[X][0].e.r)if(_>=M[X][0].s.c&&_<=M[X][0].e.c)g.F=M[X][1]}if(w["number-columns-spanned"]||w["number-rows-spanned"]){I=parseInt(w["number-rows-spanned"],10)||0;F=parseInt(w["number-columns-spanned"],10)||0;N={s:{r:S,c:_},e:{r:S+I-1,c:_+F-1}};R.push(N)}if(w["number-columns-repeated"])L=parseInt(w["number-columns-repeated"],10);switch(g.t){case"boolean":g.t="b";g.v=lt(w["boolean-value"])||+w["boolean-value"]>=1;break;case"float":g.t="n";g.v=parseFloat(w.value);break;case"percentage":g.t="n";g.v=parseFloat(w.value);break;case"currency":g.t="n";g.v=parseFloat(w.value);break;case"date":g.t="d";g.v=wr(w["date-value"]);if(!a.cellDates){g.t="n";g.v=or(g.v,U.WBProps.date1904)-Y}if(!g.z)g.z="m/d/yy";break;case"time":g.t="n";g.v=pr(w["time-value"])/86400;if(a.cellDates){g.t="d";g.v=vr(g.v)}if(!g.z)g.z="HH:MM:SS";break;case"number":g.t="n";g.v=parseFloat(w["数据数值"]);break;default:if(g.t==="string"||g.t==="text"||!g.t){g.t="s";if(w["string-value"]!=null){k=Qr(w["string-value"]);y=[]}}else throw new Error("Unsupported value type "+g.t);}}else{$=false;if(g.t==="s"){g.v=k||"";if(y.length)g.R=y;$=T==0}if(B.Target)g.l=B;if(H.length>0){g.c=H;H=[]}if(k&&a.cellText!==false)g.w=k;if($){g.t="z";delete g.v}if(!$||a.sheetStubs){if(!(a.sheetRows&&a.sheetRows<=S)){for(var Z=0;Z<P;++Z){L=parseInt(w["number-columns-repeated"]||"1",10);if(a.dense){if(!p[S+Z])p[S+Z]=[];p[S+Z][_]=Z==0?g:Tr(g);while(--L>0)p[S+Z][_+L]=Tr(g)}else{p[Pa({r:S+Z,c:_})]=g;while(--L>0)p[Pa({r:S+Z,c:_+L})]=Tr(g)}if(A.e.c<=_)A.e.c=_}}}L=parseInt(w["number-columns-repeated"]||"1",10);_+=L-1;L=0;g={};k="";y=[]}B={};break;case"document":;case"document-content":;case"电子表格文档":;case"spreadsheet":;case"主体":;case"scripts":;case"styles":;case"font-face-decls":;case"master-styles":if(m[1]==="/"){if((s=i.pop())[0]!==m[3])throw"Bad state: "+s}else if(m[0].charAt(m[0].length-2)!=="/")i.push([m[3],true]);break;case"annotation":if(m[1]==="/"){if((s=i.pop())[0]!==m[3])throw"Bad state: "+s;z.t=k;if(y.length)z.R=y;z.a=V;H.push(z)}else if(m[0].charAt(m[0].length-2)!=="/"){i.push([m[3],false])}V="";G=0;k="";T=0;y=[];break;case"creator":if(m[1]==="/"){V=n.slice(G,m.index)}else G=m.index+m[0].length;break;case"meta":;case"元数据":;case"settings":;case"config-item-set":;case"config-item-map-indexed":;case"config-item-map-entry":;case"config-item-map-named":;case"shapes":;case"frame":;case"text-box":;case"image":;case"data-pilot-tables":;case"list-style":;case"form":;case"dde-links":;case"event-listeners":;case"chart":if(m[1]==="/"){if((s=i.pop())[0]!==m[3])throw"Bad state: "+s}else if(m[0].charAt(m[0].length-2)!=="/")i.push([m[3],false]);k="";T=0;y=[];break;case"scientific-number":;case"currency-symbol":;case"fill-character":break;case"text-style":;case"boolean-style":;case"number-style":;case"currency-style":;case"percentage-style":;case"date-style":;case"time-style":if(m[1]==="/"){var J=Ot.lastIndex;cg(n.slice(c,Ot.lastIndex),r,C);Ot.lastIndex=J}else if(m[0].charAt(m[0].length-2)!=="/"){c=Ot.lastIndex-m[0].length}break;case"script":break;case"libraries":break;case"automatic-styles":break;case"default-style":;case"page-layout":break;case"style":{var q=Kr(m[0],false);if(q["family"]=="table-cell"&&C[q["data-style-name"]])O[q["name"]]=C[q["data-style-name"]]}break;case"map":break;case"font-face":break;case"paragraph-properties":break;case"table-properties":break;case"table-column-properties":break;case"table-row-properties":break;case"table-cell-properties":break;case"number":break;case"fraction":break;case"day":;case"month":;case"year":;case"era":;case"day-of-week":;case"week-of-year":;case"quarter":;case"hours":;case"minutes":;case"seconds":;case"am-pm":break;case"boolean":break;case"text":if(m[0].slice(-2)==="/>")break;else if(m[1]==="/")switch(i[i.length-1][0]){case"number-style":;case"date-style":;case"time-style":l+=n.slice(o,m.index);break;}else o=m.index+m[0].length;break;case"named-range":f=Kr(m[0],false);W=Vd(f["cell-range-address"]);var Q={Name:f.name,Ref:W[0]+"!"+W[1]};if(j)Q.Sheet=v.length;U.Names.push(Q);break;case"text-content":break;case"text-properties":break;case"embedded-text":break;case"body":;case"电子表格":break;case"forms":break;case"table-column":break;case"table-header-rows":break;case"table-rows":break;case"table-column-group":break;case"table-header-columns":break;case"table-columns":break;case"null-date":f=Kr(m[0],false);switch(f["date-value"]){case"1904-01-01":U.WBProps.date1904=true;case"1900-01-01":Y=0;}break;case"graphic-properties":break;case"calculation-settings":break;case"named-expressions":break;case"label-range":break;case"label-ranges":break;case"named-expression":break;case"sort":break;case"sort-by":break;case"sort-groups":break;case"tab":break;case"line-break":break;case"span":break;case"p":;case"文本串":if(["master-styles"].indexOf(i[i.length-1][0])>-1)break;if(m[1]==="/"&&(!w||!w["string-value"])){var ee=fg(n.slice(T,m.index),E);k=(k.length>0?k+"\n":"")+ee[0]}else{E=Kr(m[0],false);T=m.index+m[0].length}break;case"s":break;case"database-range":if(m[1]==="/")break;try{W=Vd(Kr(m[0])["target-range-address"]);d[W[0]]["!autofilter"]={ref:W[1]}}catch(re){}break;case"date":break;case"object":break;case"title":;case"标题":break;case"desc":break;case"binary-data":break;case"table-source":break;case"scenario":break;case"iteration":break;case"content-validations":break;case"content-validation":break;case"help-message":break;case"error-message":break;case"database-ranges":break;case"filter":break;case"filter-and":break;case"filter-or":break;case"filter-condition":break;case"list-level-style-bullet":break;case"list-level-style-number":break;case"list-level-properties":break;case"sender-firstname":;case"sender-lastname":;case"sender-initials":;case"sender-title":;case"sender-position":;case"sender-email":;case"sender-phone-private":;case"sender-fax":;case"sender-company":;case"sender-phone-work":;case"sender-street":;case"sender-city":;case"sender-postal-code":;case"sender-country":;case"sender-state-or-province":;case"author-name":;case"author-initials":;case"chapter":;case"file-name":;case"template-name":;case"sheet-name":break;case"event-listener":break;case"initial-creator":;case"creation-date":;case"print-date":;case"generator":;case"document-statistic":;case"user-defined":;case"editing-duration":;case"editing-cycles":break;case"config-item":break;case"page-number":break;case"page-count":break;case"time":break;case"cell-range-source":break;case"detective":break;case"operation":break;case"highlighted-range":break;case"data-pilot-table":;case"source-cell-range":;case"source-service":;case"data-pilot-field":;case"data-pilot-level":;case"data-pilot-subtotals":;case"data-pilot-subtotal":;case"data-pilot-members":;case"data-pilot-member":;case"data-pilot-display-info":;case"data-pilot-sort-info":;case"data-pilot-layout-info":;case"data-pilot-field-reference":;case"data-pilot-groups":;case"data-pilot-group":;case"data-pilot-group-member":break;case"rect":break;case"dde-connection-decls":;case"dde-connection-decl":;case"dde-link":;case"dde-source":break;case"properties":break;case"property":break;case"a":if(m[1]!=="/"){B=Kr(m[0],false);if(!B.href)break;B.Target=Qr(B.href);delete B.href;if(B.Target.charAt(0)=="#"&&B.Target.indexOf(".")>-1){W=Vd(B.Target.slice(1));B.Target="#"+W[0]+"!"+W[1]}else if(B.Target.match(/^\.\.[\\\/]/))B.Target=B.Target.slice(3)}break;case"table-protection":break;case"data-pilot-grand-total":break;case"office-document-common-attrs":break;default:switch(m[2]){case"dc:":;case"calcext:":;case"loext:":;case"ooo:":;case"chartooo:":;case"draw:":;case"style:":;case"chart:":;case"form:":;case"uof:":;case"表:":;case"字:":break;default:if(a.WTF)throw new Error(m);};}var te={Sheets:d,SheetNames:v,Workbook:U};if(a.bookSheets)delete te.Sheets;return te}function og(e,r){r=r||{};if(Ir(e,"META-INF/manifest.xml"))li(Dr(e,"META-INF/manifest.xml"),r);var t=Pr(e,"styles.xml");var a=t&&cg(vt(t),r);var n=Pr(e,"content.xml");if(!n)throw new Error("Missing content.xml in ODS / UOF file");var i=lg(vt(n),r,a);if(Ir(e,"meta.xml"))i.Props=bi(Dr(e,"meta.xml"));return i}function ug(e,r){return lg(e,r)}var hg=function(){var e=["<office:master-styles>",'<style:master-page style:name="mp1" style:page-layout-name="mp1">',"<style:header/>",'<style:header-left style:display="false"/>',"<style:footer/>",'<style:footer-left style:display="false"/>',"</style:master-page>","</office:master-styles>"].join("");var r="<office:document-styles "+St({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","office:version":"1.2"})+">"+e+"</office:document-styles>";return function t(){return zr+r}}();function dg(e,r){var t="number",a="",n={"style:name":r},i="",s=0;e=e.replace(/"[$]"/g,"$");e:{if(e.indexOf(";")>-1){console.error("Unsupported ODS Style Map exported.  Using first branch of "+e);e=e.slice(0,e.indexOf(";"))}if(e=="@"){t="text";a="<number:text-content/>";break e}if(e.indexOf(/\$/)>-1){t="currency"}if(e[s]=='"'){i="";while(e[++s]!='"'||e[++s]=='"')i+=e[s];--s;if(e[s+1]=="*"){s++;a+="<number:fill-character>"+tt(i.replace(/""/g,'"'))+"</number:fill-character>"}else{a+="<number:text>"+tt(i.replace(/""/g,'"'))+"</number:text>"}e=e.slice(s+1);s=0}var f=e.match(/# (\?+)\/(\?+)/);if(f){a+=_t("number:fraction",null,{"number:min-integer-digits":0,"number:min-numerator-digits":f[1].length,"number:max-denominator-value":Math.max(+f[1].replace(/./g,"9"),+f[2].replace(/./g,"9"))});break e}if(f=e.match(/# (\?+)\/(\d+)/)){a+=_t("number:fraction",null,{"number:min-integer-digits":0,"number:min-numerator-digits":f[1].length,"number:denominator-value":+f[2]});break e}if(f=e.match(/(\d+)(|\.\d+)%/)){t="percentage";a+=_t("number:number",null,{"number:decimal-places":f[2]&&f.length-1||0,"number:min-decimal-places":f[2]&&f.length-1||0,"number:min-integer-digits":f[1].length})+"<number:text>%</number:text>";break e}var c=false;if(["y","m","d"].indexOf(e[0])>-1){t="date";r:for(;s<e.length;++s)switch(i=e[s].toLowerCase()){case"h":;case"s":c=true;--s;break r;case"m":t:for(var l=s+1;l<e.length;++l)switch(e[l]){case"y":;case"d":break t;case"h":;case"s":c=true;--s;break r;};case"y":;case"d":while((e[++s]||"").toLowerCase()==i[0])i+=i[0];--s;switch(i){case"y":;case"yy":a+="<number:year/>";break;case"yyy":;case"yyyy":a+='<number:year number:style="long"/>';break;case"mmmmm":console.error("ODS has no equivalent of format |mmmmm|");case"m":;case"mm":;case"mmm":;case"mmmm":a+='<number:month number:style="'+(i.length%2?"short":"long")+'" number:textual="'+(i.length>=3?"true":"false")+'"/>';break;case"d":;case"dd":a+='<number:day number:style="'+(i.length%2?"short":"long")+'"/>';break;case"ddd":;case"dddd":a+='<number:day-of-week number:style="'+(i.length%2?"short":"long")+'"/>';break;}break;case'"':while(e[++s]!='"'||e[++s]=='"')i+=e[s];--s;a+="<number:text>"+tt(i.slice(1).replace(/""/g,'"'))+"</number:text>";break;case"/":a+="<number:text>"+tt(i)+"</number:text>";break;default:console.error("unrecognized character "+i+" in ODF format "+e);}if(!c)break e;e=e.slice(s+1);s=0}if(e.match(/^\[?[hms]/)){if(t=="number")t="time";if(e.match(/\[/)){e=e.replace(/[\[\]]/g,"");n["number:truncate-on-overflow"]="false"}for(;s<e.length;++s)switch(i=e[s].toLowerCase()){case"h":;case"m":;case"s":while((e[++s]||"").toLowerCase()==i[0])i+=i[0];--s;switch(i){case"h":;case"hh":a+='<number:hours number:style="'+(i.length%2?"short":"long")+'"/>';break;case"m":;case"mm":a+='<number:minutes number:style="'+(i.length%2?"short":"long")+'"/>';break;case"s":;case"ss":if(e[s+1]==".")do{i+=e[s+1];++s}while(e[s+1]=="0");a+='<number:seconds number:style="'+(i.match("ss")?"long":"short")+'"'+(i.match(/\./)?' number:decimal-places="'+(i.match(/0+/)||[""])[0].length+'"':"")+"/>";break;}break;case'"':while(e[++s]!='"'||e[++s]=='"')i+=e[s];--s;a+="<number:text>"+tt(i.slice(1).replace(/""/g,'"'))+"</number:text>";break;case"/":a+="<number:text>"+tt(i)+"</number:text>";break;case"a":if(e.slice(s,s+3).toLowerCase()=="a/p"){a+="<number:am-pm/>";s+=2;break}if(e.slice(s,s+5).toLowerCase()=="am/pm"){a+="<number:am-pm/>";s+=4;break};default:console.error("unrecognized character "+i+" in ODF format "+e);}break e}if(e.indexOf(/\$/)>-1){t="currency"}if(e[0]=="$"){a+='<number:currency-symbol number:language="en" number:country="US">$</number:currency-symbol>';e=e.slice(1);s=0}s=0;if(e[s]=='"'){while(e[++s]!='"'||e[++s]=='"')i+=e[s];--s;if(e[s+1]=="*"){s++;a+="<number:fill-character>"+tt(i.replace(/""/g,'"'))+"</number:fill-character>"}else{a+="<number:text>"+tt(i.replace(/""/g,'"'))+"</number:text>"}e=e.slice(s+1);s=0}var o=e.match(/([#0][0#,]*)(\.[0#]*|)(E[+]?0*|)/i);if(!o||!o[0])console.error("Could not find numeric part of "+e);else{var u=o[1].replace(/,/g,"");a+="<number:"+(o[3]?"scientific-":"")+"number"+' number:min-integer-digits="'+(u.indexOf("0")==-1?"0":u.length-u.indexOf("0"))+'"'+(o[0].indexOf(",")>-1?' number:grouping="true"':"")+(o[2]&&' number:decimal-places="'+(o[2].length-1)+'"'||' number:decimal-places="0"')+(o[3]&&o[3].indexOf("+")>-1?' number:forced-exponent-sign="true"':"")+(o[3]?' number:min-exponent-digits="'+o[3].match(/0+/)[0].length+'"':"")+">"+"</number:"+(o[3]?"scientific-":"")+"number>";s=o.index+o[0].length}if(e[s]=='"'){i="";while(e[++s]!='"'||e[++s]=='"')i+=e[s];--s;a+="<number:text>"+tt(i.replace(/""/g,'"'))+"</number:text>"}}if(!a){console.error("Could not generate ODS number format for |"+e+"|");return""}return _t("number:"+t+"-style",a,n)}function vg(e,r,t){var a=e.filter(function(e){return e.Sheet==(t==-1?null:t)});if(!a.length)return"";return"      <table:named-expressions>\n"+a.map(function(e){var r=Gd(e.Ref);return"        "+_t("table:named-range",null,{"table:name":e.Name,"table:cell-range-address":r,"table:base-cell-address":r.replace(/[\.]?[^\.]*$/,".$A$1")})}).join("\n")+"\n      </table:named-expressions>\n"}var pg=function(){var e=function(e){return tt(e).replace(/  +/g,function(e){return'<text:s text:c="'+e.length+'"/>'}).replace(/\t/g,"<text:tab/>").replace(/\n/g,"</text:p><text:p>").replace(/^ /,"<text:s/>").replace(/ $/,"<text:s/>")};var r="          <table:table-cell />\n";var t="          <table:covered-table-cell/>\n";var a=function(a,n,i,s,f){var c=[];c.push('      <table:table table:name="'+tt(n.SheetNames[i])+'" table:style-name="ta1">\n');var l=0,o=0,u=La(a["!ref"]||"A1");var h=a["!merges"]||[],d=0;var v=Array.isArray(a);if(a["!cols"]){for(o=0;o<=u.e.c;++o)c.push("        <table:table-column"+(a["!cols"][o]?' table:style-name="co'+a["!cols"][o].ods+'"':"")+"></table:table-column>\n")}var p="",m=a["!rows"]||[];for(l=0;l<u.s.r;++l){p=m[l]?' table:style-name="ro'+m[l].ods+'"':"";c.push("        <table:table-row"+p+"></table:table-row>\n")}for(;l<=u.e.r;++l){p=m[l]?' table:style-name="ro'+m[l].ods+'"':"";c.push("        <table:table-row"+p+">\n");for(o=0;o<u.s.c;++o)c.push(r);for(;o<=u.e.c;++o){var b=false,g={},w="";for(d=0;d!=h.length;++d){if(h[d].s.c>o)continue;if(h[d].s.r>l)continue;if(h[d].e.c<o)continue;if(h[d].e.r<l)continue;if(h[d].s.c!=o||h[d].s.r!=l)b=true;g["table:number-columns-spanned"]=h[d].e.c-h[d].s.c+1;g["table:number-rows-spanned"]=h[d].e.r-h[d].s.r+1;break}if(b){c.push(t);continue}var k=Pa({r:l,c:o}),T=v?(a[l]||[])[o]:a[k];if(T&&T.f){g["table:formula"]=tt(zd(T.f));if(T.F){if(T.F.slice(0,k.length)==k){var E=La(T.F);g["table:number-matrix-columns-spanned"]=E.e.c-E.s.c+1;g["table:number-matrix-rows-spanned"]=E.e.r-E.s.r+1}}}if(!T){c.push(r);continue}switch(T.t){case"b":w=T.v?"TRUE":"FALSE";g["office:value-type"]="boolean";g["office:boolean-value"]=T.v?"true":"false";break;case"n":w=T.w||String(T.v||0);g["office:value-type"]="float";g["office:value"]=T.v||0;break;case"s":;case"str":w=T.v==null?"":T.v;g["office:value-type"]="string";break;case"d":w=T.w||wr(T.v).toISOString();g["office:value-type"]="date";g["office:date-value"]=wr(T.v).toISOString();g["table:style-name"]="ce1";break;default:c.push(r);continue;}var y=e(w);if(T.l&&T.l.Target){var S=T.l.Target;S=S.charAt(0)=="#"?"#"+Gd(S.slice(1)):S;if(S.charAt(0)!="#"&&!S.match(/^\w+:/))S="../"+S;y=_t("text:a",y,{"xlink:href":S.replace(/&/g,"&amp;")})}if(f[T.z])g["table:style-name"]="ce"+f[T.z].slice(1);c.push("          "+_t("table:table-cell",_t("text:p",y,{}),g)+"\n")}c.push("        </table:table-row>\n")}if((n.Workbook||{}).Names)c.push(vg(n.Workbook.Names,n.SheetNames,i));c.push("      </table:table>\n");return c.join("")};var n=function(e,r){e.push(" <office:automatic-styles>\n");var t=0;r.SheetNames.map(function(e){return r.Sheets[e]}).forEach(function(r){if(!r)return;if(r["!cols"]){for(var a=0;a<r["!cols"].length;++a)if(r["!cols"][a]){var n=r["!cols"][a];if(n.width==null&&n.wpx==null&&n.wch==null)continue;Pl(n);n.ods=t;var i=r["!cols"][a].wpx+"px";e.push('  <style:style style:name="co'+t+'" style:family="table-column">\n');e.push('   <style:table-column-properties fo:break-before="auto" style:column-width="'+i+'"/>\n');e.push("  </style:style>\n");++t}}});var a=0;r.SheetNames.map(function(e){return r.Sheets[e]}).forEach(function(r){if(!r)return;if(r["!rows"]){for(var t=0;t<r["!rows"].length;++t)if(r["!rows"][t]){r["!rows"][t].ods=a;var n=r["!rows"][t].hpx+"px";e.push('  <style:style style:name="ro'+a+'" style:family="table-row">\n');e.push('   <style:table-row-properties fo:break-before="auto" style:row-height="'+n+'"/>\n');e.push("  </style:style>\n");++a}}});e.push('  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">\n');e.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n');e.push("  </style:style>\n");e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');e.push('   <number:month number:style="long"/>\n');e.push("   <number:text>/</number:text>\n");e.push('   <number:day number:style="long"/>\n');e.push("   <number:text>/</number:text>\n");e.push("   <number:year/>\n");e.push("  </number:date-style>\n");var n={};var i=69;r.SheetNames.map(function(e){return r.Sheets[e]}).forEach(function(r){if(!r)return;var t=La(r["!ref"]);for(var a=0;a<=t.e.r;++a)for(var s=0;s<=t.e.c;++s){var f=Array.isArray(r)?(r[a]||[])[s]:r[Pa({r:a,c:s})];if(!f||!f.z||f.z.toLowerCase()=="general")continue;if(!n[f.z]){var c=dg(f.z,"N"+i);if(c){n[f.z]="N"+i;++i;e.push(c+"\n")}}}});e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');nr(n).forEach(function(r){e.push('<style:style style:name="ce'+n[r].slice(1)+'" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="'+n[r]+'"/>\n')});e.push(" </office:automatic-styles>\n");return n};return function i(e,r){var t=[zr];var i=St({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
"xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:meta":"urn:oasis:names:tc:opendocument:xmlns:meta:1.0","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:presentation":"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:chart":"urn:oasis:names:tc:opendocument:xmlns:chart:1.0","xmlns:dr3d":"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0","xmlns:math":"http://www.w3.org/1998/Math/MathML","xmlns:form":"urn:oasis:names:tc:opendocument:xmlns:form:1.0","xmlns:script":"urn:oasis:names:tc:opendocument:xmlns:script:1.0","xmlns:ooo":"http://openoffice.org/2004/office","xmlns:ooow":"http://openoffice.org/2004/writer","xmlns:oooc":"http://openoffice.org/2004/calc","xmlns:dom":"http://www.w3.org/2001/xml-events","xmlns:xforms":"http://www.w3.org/2002/xforms","xmlns:xsd":"http://www.w3.org/2001/XMLSchema","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xmlns:sheet":"urn:oasis:names:tc:opendocument:sh33tjs:1.0","xmlns:rpt":"http://openoffice.org/2005/report","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","xmlns:xhtml":"http://www.w3.org/1999/xhtml","xmlns:grddl":"http://www.w3.org/2003/g/data-view#","xmlns:tableooo":"http://openoffice.org/2009/table","xmlns:drawooo":"http://openoffice.org/2010/draw","xmlns:calcext":"urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0","xmlns:loext":"urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0","xmlns:field":"urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0","xmlns:formx":"urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0","xmlns:css3t":"http://www.w3.org/TR/css3-text/","office:version":"1.2"});var s=St({"xmlns:config":"urn:oasis:names:tc:opendocument:xmlns:config:1.0","office:mimetype":"application/vnd.oasis.opendocument.spreadsheet"});if(r.bookType=="fods"){t.push("<office:document"+i+s+">\n");t.push(vi().replace(/<office:document-meta.*?>/,"").replace(/<\/office:document-meta>/,"")+"\n")}else t.push("<office:document-content"+i+">\n");var f=n(t,e);t.push("  <office:body>\n");t.push("    <office:spreadsheet>\n");if(((e.Workbook||{}).WBProps||{}).date1904)t.push('      <table:calculation-settings table:case-sensitive="false" table:search-criteria-must-apply-to-whole-cell="true" table:use-wildcards="true" table:use-regular-expressions="false" table:automatic-find-labels="false">\n        <table:null-date table:date-value="1904-01-01"/>\n      </table:calculation-settings>\n');for(var c=0;c!=e.SheetNames.length;++c)t.push(a(e.Sheets[e.SheetNames[c]],e,c,r,f));if((e.Workbook||{}).Names)t.push(vg(e.Workbook.Names,e.SheetNames,-1));t.push("    </office:spreadsheet>\n");t.push("  </office:body>\n");if(r.bookType=="fods")t.push("</office:document>");else t.push("</office:document-content>");return t.join("")}}();function mg(e,r){if(r.bookType=="fods")return pg(e,r);var t=Br();var a="";var n=[];var i=[];a="mimetype";Ur(t,a,"application/vnd.oasis.opendocument.spreadsheet");a="content.xml";Ur(t,a,pg(e,r));n.push([a,"text/xml"]);i.push([a,"ContentFile"]);a="styles.xml";Ur(t,a,hg(e,r));n.push([a,"text/xml"]);i.push([a,"StylesFile"]);a="meta.xml";Ur(t,a,zr+vi());n.push([a,"text/xml"]);i.push([a,"MetadataFile"]);a="manifest.rdf";Ur(t,a,di(i));n.push([a,"application/rdf+xml"]);a="META-INF/manifest.xml";Ur(t,a,oi(n));return t}function bg(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function gg(e){return typeof TextDecoder!="undefined"?(new TextDecoder).decode(e):vt(C(e))}function wg(e){return typeof TextEncoder!="undefined"?(new TextEncoder).encode(e):A(pt(e))}function kg(e,r){e:for(var t=0;t<=e.length-r.length;++t){for(var a=0;a<r.length;++a)if(e[t+a]!=r[a])continue e;return true}return false}function Tg(e){var r=e.reduce(function(e,r){return e+r.length},0);var t=new Uint8Array(r);var a=0;e.forEach(function(e){t.set(e,a);a+=e.length});return t}function Eg(e){e-=e>>1&1431655765;e=(e&858993459)+(e>>2&858993459);return(e+(e>>4)&252645135)*16843009>>>24}function yg(e,r){var t=(e[r+15]&127)<<7|e[r+14]>>1;var a=e[r+14]&1;for(var n=r+13;n>=r;--n)a=a*256+e[n];return(e[r+15]&128?-a:a)*Math.pow(10,t-6176)}function Sg(e,r,t){var a=Math.floor(t==0?0:Math.LOG10E*Math.log(Math.abs(t)))+6176-16;var n=t/Math.pow(10,a-6176);e[r+15]|=a>>7;e[r+14]|=(a&127)<<1;for(var i=0;n>=1;++i,n/=256)e[r+i]=n&255;e[r+15]|=t>=0?0:128}function _g(e,r){var t=r?r[0]:0;var a=e[t]&127;e:if(e[t++]>=128){a|=(e[t]&127)<<7;if(e[t++]<128)break e;a|=(e[t]&127)<<14;if(e[t++]<128)break e;a|=(e[t]&127)<<21;if(e[t++]<128)break e;a+=(e[t]&127)*Math.pow(2,28);++t;if(e[t++]<128)break e;a+=(e[t]&127)*Math.pow(2,35);++t;if(e[t++]<128)break e;a+=(e[t]&127)*Math.pow(2,42);++t;if(e[t++]<128)break e}if(r)r[0]=t;return a}function Ag(e){var r=new Uint8Array(7);r[0]=e&127;var t=1;e:if(e>127){r[t-1]|=128;r[t]=e>>7&127;++t;if(e<=16383)break e;r[t-1]|=128;r[t]=e>>14&127;++t;if(e<=2097151)break e;r[t-1]|=128;r[t]=e>>21&127;++t;if(e<=268435455)break e;r[t-1]|=128;r[t]=e/256>>>21&127;++t;if(e<=34359738367)break e;r[t-1]|=128;r[t]=e/65536>>>21&127;++t;if(e<=4398046511103)break e;r[t-1]|=128;r[t]=e/16777216>>>21&127;++t}return r.slice(0,t)}function xg(e){var r=0,t=e[r]&127;e:if(e[r++]>=128){t|=(e[r]&127)<<7;if(e[r++]<128)break e;t|=(e[r]&127)<<14;if(e[r++]<128)break e;t|=(e[r]&127)<<21;if(e[r++]<128)break e;t|=(e[r]&127)<<28}return t}function Cg(e){var r=[],t=[0];while(t[0]<e.length){var a=t[0];var n=_g(e,t);var i=n&7;n=Math.floor(n/8);var s=0;var f;if(n==0)break;switch(i){case 0:{var c=t[0];while(e[t[0]++]>=128);f=e.slice(c,t[0])}break;case 5:s=4;f=e.slice(t[0],t[0]+s);t[0]+=s;break;case 1:s=8;f=e.slice(t[0],t[0]+s);t[0]+=s;break;case 2:s=_g(e,t);f=e.slice(t[0],t[0]+s);t[0]+=s;break;case 3:;case 4:;default:throw new Error("PB Type ".concat(i," for Field ").concat(n," at offset ").concat(a));}var l={data:f,type:i};if(r[n]==null)r[n]=[l];else r[n].push(l)}return r}function Og(e){var r=[];e.forEach(function(e,t){if(t==0)return;e.forEach(function(e){if(!e.data)return;r.push(Ag(t*8+e.type));if(e.type==2)r.push(Ag(e.data.length));r.push(e.data)})});return Tg(r)}function Rg(e,r){return(e==null?void 0:e.map(function(e){return r(e.data)}))||[]}function Ng(e){var r;var t=[],a=[0];while(a[0]<e.length){var n=_g(e,a);var i=Cg(e.slice(a[0],a[0]+n));a[0]+=n;var s={id:xg(i[1][0].data),messages:[]};i[2].forEach(function(r){var t=Cg(r.data);var n=xg(t[3][0].data);s.messages.push({meta:t,data:e.slice(a[0],a[0]+n)});a[0]+=n});if((r=i[3])==null?void 0:r[0])s.merge=xg(i[3][0].data)>>>0>0;t.push(s)}return t}function Ig(e){var r=[];e.forEach(function(e){var t=[[],[{data:Ag(e.id),type:0}],[]];if(e.merge!=null)t[3]=[{data:Ag(+!!e.merge),type:0}];var a=[];e.messages.forEach(function(e){a.push(e.data);e.meta[3]=[{type:0,data:Ag(e.data.length)}];t[2].push({data:Og(e.meta),type:2})});var n=Og(t);r.push(Ag(n.length));r.push(n);a.forEach(function(e){return r.push(e)})});return Tg(r)}function Fg(e,r){if(e!=0)throw new Error("Unexpected Snappy chunk type ".concat(e));var t=[0];var a=_g(r,t);var n=[];while(t[0]<r.length){var i=r[t[0]]&3;if(i==0){var s=r[t[0]++]>>2;if(s<60)++s;else{var f=s-59;s=r[t[0]];if(f>1)s|=r[t[0]+1]<<8;if(f>2)s|=r[t[0]+2]<<16;if(f>3)s|=r[t[0]+3]<<24;s>>>=0;s++;t[0]+=f}n.push(r.slice(t[0],t[0]+s));t[0]+=s;continue}else{var c=0,l=0;if(i==1){l=(r[t[0]]>>2&7)+4;c=(r[t[0]++]&224)<<3;c|=r[t[0]++]}else{l=(r[t[0]++]>>2)+1;if(i==2){c=r[t[0]]|r[t[0]+1]<<8;t[0]+=2}else{c=(r[t[0]]|r[t[0]+1]<<8|r[t[0]+2]<<16|r[t[0]+3]<<24)>>>0;t[0]+=4}}n=[Tg(n)];if(c==0)throw new Error("Invalid offset 0");if(c>n[0].length)throw new Error("Invalid offset beyond length");if(l>=c){n.push(n[0].slice(-c));l-=c;while(l>=n[n.length-1].length){n.push(n[n.length-1]);l-=n[n.length-1].length}}n.push(n[0].slice(-c,-c+l))}}var o=Tg(n);if(o.length!=a)throw new Error("Unexpected length: ".concat(o.length," != ").concat(a));return o}function Dg(e){var r=[];var t=0;while(t<e.length){var a=e[t++];var n=e[t]|e[t+1]<<8|e[t+2]<<16;t+=3;r.push(Fg(a,e.slice(t,t+n)));t+=n}if(t!==e.length)throw new Error("data is not a valid framed stream!");return Tg(r)}function Pg(e){var r=[];var t=0;while(t<e.length){var a=Math.min(e.length-t,268435455);var n=new Uint8Array(4);r.push(n);var i=Ag(a);var s=i.length;r.push(i);if(a<=60){s++;r.push(new Uint8Array([a-1<<2]))}else if(a<=256){s+=2;r.push(new Uint8Array([240,a-1&255]))}else if(a<=65536){s+=3;r.push(new Uint8Array([244,a-1&255,a-1>>8&255]))}else if(a<=16777216){s+=4;r.push(new Uint8Array([248,a-1&255,a-1>>8&255,a-1>>16&255]))}else if(a<=4294967296){s+=5;r.push(new Uint8Array([252,a-1&255,a-1>>8&255,a-1>>16&255,a-1>>>24&255]))}r.push(e.slice(t,t+a));s+=a;n[0]=0;n[1]=s&255;n[2]=s>>8&255;n[3]=s>>16&255;t+=a}return Tg(r)}function Lg(e,r,t,a){var n=bg(e);var i=n.getUint32(4,true);var s=(a>1?12:8)+Eg(i&(a>1?3470:398))*4;var f=-1,c=-1,l=NaN,o=new Date(2001,0,1);if(i&512){f=n.getUint32(s,true);s+=4}s+=Eg(i&(a>1?12288:4096))*4;if(i&16){c=n.getUint32(s,true);s+=4}if(i&32){l=n.getFloat64(s,true);s+=8}if(i&64){o.setTime(o.getTime()+n.getFloat64(s,true)*1e3);s+=8}var u;switch(e[2]){case 0:break;case 2:u={t:"n",v:l};break;case 3:u={t:"s",v:r[c]};break;case 5:u={t:"d",v:o};break;case 6:u={t:"b",v:l>0};break;case 7:u={t:"n",v:l/86400};break;case 8:u={t:"e",v:0};break;case 9:{if(f>-1)u={t:"s",v:t[f]};else throw new Error("Unsupported cell type ".concat(e.slice(0,4)))}break;default:throw new Error("Unsupported cell type ".concat(e.slice(0,4)));}return u}function Mg(e,r,t){var a=bg(e);var n=a.getUint32(8,true);var i=12;var s=-1,f=-1,c=NaN,l=NaN,o=new Date(2001,0,1);if(n&1){c=yg(e,i);i+=16}if(n&2){l=a.getFloat64(i,true);i+=8}if(n&4){o.setTime(o.getTime()+a.getFloat64(i,true)*1e3);i+=8}if(n&8){f=a.getUint32(i,true);i+=4}if(n&16){s=a.getUint32(i,true);i+=4}var u;switch(e[1]){case 0:break;case 2:u={t:"n",v:c};break;case 3:u={t:"s",v:r[f]};break;case 5:u={t:"d",v:o};break;case 6:u={t:"b",v:l>0};break;case 7:u={t:"n",v:l/86400};break;case 8:u={t:"e",v:0};break;case 9:{if(s>-1)u={t:"s",v:t[s]};else throw new Error("Unsupported cell type ".concat(e[1]," : ").concat(n&31," : ").concat(e.slice(0,4)))}break;case 10:u={t:"n",v:c};break;default:throw new Error("Unsupported cell type ".concat(e[1]," : ").concat(n&31," : ").concat(e.slice(0,4)));}return u}function Ug(e,r){var t=new Uint8Array(32),a=bg(t),n=12,i=0;t[0]=5;switch(e.t){case"n":t[1]=2;Sg(t,n,e.v);i|=1;n+=16;break;case"b":t[1]=6;a.setFloat64(n,e.v?1:0,true);i|=2;n+=8;break;case"s":if(r.indexOf(e.v)==-1)throw new Error("Value ".concat(e.v," missing from SST!"));t[1]=3;a.setUint32(n,r.indexOf(e.v),true);i|=8;n+=4;break;default:throw"unsupported cell type "+e.t;}a.setUint32(8,i,true);return t.slice(0,n)}function Bg(e,r){var t=new Uint8Array(32),a=bg(t),n=12,i=0;t[0]=3;switch(e.t){case"n":t[2]=2;a.setFloat64(n,e.v,true);i|=32;n+=8;break;case"b":t[2]=6;a.setFloat64(n,e.v?1:0,true);i|=32;n+=8;break;case"s":if(r.indexOf(e.v)==-1)throw new Error("Value ".concat(e.v," missing from SST!"));t[2]=3;a.setUint32(n,r.indexOf(e.v),true);i|=16;n+=4;break;default:throw"unsupported cell type "+e.t;}a.setUint32(4,i,true);return t.slice(0,n)}function Wg(e,r,t){switch(e[0]){case 0:;case 1:;case 2:;case 3:return Lg(e,r,t,e[0]);case 5:return Mg(e,r,t);default:throw new Error("Unsupported payload version ".concat(e[0]));}}function Hg(e){var r=Cg(e);return _g(r[1][0].data)}function zg(e){return Og([[],[{type:0,data:Ag(e)}]])}function Vg(e,r){var t=Cg(r.data);var a=xg(t[1][0].data);var n=t[3];var i=[];(n||[]).forEach(function(r){var t=Cg(r.data);var n=xg(t[1][0].data)>>>0;switch(a){case 1:i[n]=gg(t[3][0].data);break;case 8:{var s=e[Hg(t[9][0].data)][0];var f=Cg(s.data);var c=e[Hg(f[1][0].data)][0];var l=xg(c.meta[1][0].data);if(l!=2001)throw new Error("2000 unexpected reference to ".concat(l));var o=Cg(c.data);i[n]=o[3].map(function(e){return gg(e.data)}).join("")}break;}});return i}function Gg(e,r){var t,a,n,i,s,f,c,l,o,u,h,d,v,p;var m=Cg(e);var b=xg(m[1][0].data)>>>0;var g=xg(m[2][0].data)>>>0;var w=((a=(t=m[8])==null?void 0:t[0])==null?void 0:a.data)&&xg(m[8][0].data)>0||false;var k,T;if(((i=(n=m[7])==null?void 0:n[0])==null?void 0:i.data)&&r!=0){k=(f=(s=m[7])==null?void 0:s[0])==null?void 0:f.data;T=(l=(c=m[6])==null?void 0:c[0])==null?void 0:l.data}else if(((u=(o=m[4])==null?void 0:o[0])==null?void 0:u.data)&&r!=1){k=(d=(h=m[4])==null?void 0:h[0])==null?void 0:d.data;T=(p=(v=m[3])==null?void 0:v[0])==null?void 0:p.data}else throw"NUMBERS Tile missing ".concat(r," cell storage");var E=w?4:1;var y=bg(k);var S=[];for(var _=0;_<k.length/2;++_){var A=y.getUint16(_*2,true);if(A<65535)S.push([_,A])}if(S.length!=g)throw"Expected ".concat(g," cells, found ").concat(S.length);var x=[];for(_=0;_<S.length-1;++_)x[S[_][0]]=T.subarray(S[_][1]*E,S[_+1][1]*E);if(S.length>=1)x[S[S.length-1][0]]=T.subarray(S[S.length-1][1]*E);return{R:b,cells:x}}function $g(e,r){var t;var a=Cg(r.data);var n=-1;if((t=a==null?void 0:a[7])==null?void 0:t[0]){if(xg(a[7][0].data)>>>0)n=1;else n=0}var i=Rg(a[5],function(e){return Gg(e,n)});return{nrows:xg(a[4][0].data)>>>0,data:i.reduce(function(e,r){if(!e[r.R])e[r.R]=[];r.cells.forEach(function(t,a){if(e[r.R][a])throw new Error("Duplicate cell r=".concat(r.R," c=").concat(a));e[r.R][a]=t});return e},[])}}function jg(e,r,t){var a,n,i;var s=Cg(r.data);var f={s:{r:0,c:0},e:{r:0,c:0}};f.e.r=(xg(s[6][0].data)>>>0)-1;if(f.e.r<0)throw new Error("Invalid row varint ".concat(s[6][0].data));f.e.c=(xg(s[7][0].data)>>>0)-1;if(f.e.c<0)throw new Error("Invalid col varint ".concat(s[7][0].data));t["!ref"]=Ma(f);var c=Cg(s[4][0].data);var l=Vg(e,e[Hg(c[4][0].data)][0]);var o=((a=c[17])==null?void 0:a[0])?Vg(e,e[Hg(c[17][0].data)][0]):[];var u=Cg(c[3][0].data);var h=0;u[1].forEach(function(r){var a=Cg(r.data);var n=e[Hg(a[2][0].data)][0];var i=xg(n.meta[1][0].data);if(i!=6002)throw new Error("6001 unexpected reference to ".concat(i));var s=$g(e,n);s.data.forEach(function(e,r){e.forEach(function(e,a){var n=Pa({r:h+r,c:a});var i=Wg(e,l,o);if(i)t[n]=i})});h+=s.nrows});if((n=c[13])==null?void 0:n[0]){var d=e[Hg(c[13][0].data)][0];var v=xg(d.meta[1][0].data);if(v!=6144)throw new Error("Expected merge type 6144, found ".concat(v));t["!merges"]=(i=Cg(d.data))==null?void 0:i[1].map(function(e){var r=Cg(e.data);var t=bg(Cg(r[1][0].data)[1][0].data),a=bg(Cg(r[2][0].data)[1][0].data);return{s:{r:t.getUint16(0,true),c:t.getUint16(2,true)},e:{r:t.getUint16(0,true)+a.getUint16(0,true)-1,c:t.getUint16(2,true)+a.getUint16(2,true)-1}}})}}function Xg(e,r){var t=Cg(r.data);var a={"!ref":"A1"};var n=e[Hg(t[2][0].data)];var i=xg(n[0].meta[1][0].data);if(i!=6001)throw new Error("6000 unexpected reference to ".concat(i));jg(e,n[0],a);return a}function Yg(e,r){var t;var a=Cg(r.data);var n={name:((t=a[1])==null?void 0:t[0])?gg(a[1][0].data):"",sheets:[]};var i=Rg(a[2],Hg);i.forEach(function(r){e[r].forEach(function(r){var t=xg(r.meta[1][0].data);if(t==6e3)n.sheets.push(Xg(e,r))})});return n}function Kg(e,r){var t;var a=Yw();var n=Cg(r.data);if((t=n[2])==null?void 0:t[0])throw new Error("Keynote presentations are not supported");var i=Rg(n[1],Hg);i.forEach(function(r){e[r].forEach(function(r){var t=xg(r.meta[1][0].data);if(t==2){var n=Yg(e,r);n.sheets.forEach(function(e,r){Kw(a,e,r==0?n.name:n.name+"_"+r,true)})}})});if(a.SheetNames.length==0)throw new Error("Empty NUMBERS file");return a}function Zg(e){var r,t,a,n,i,s,f,c;var l={},o=[];e.FullPaths.forEach(function(e){if(e.match(/\.iwpv2/))throw new Error("Unsupported password protection")});e.FileIndex.forEach(function(e){if(!e.name.match(/\.iwa$/))return;var r;try{r=Dg(e.content)}catch(t){return console.log("?? "+e.content.length+" "+(t.message||t))}var a;try{a=Ng(r)}catch(t){return console.log("## "+(t.message||t))}a.forEach(function(e){l[e.id]=e.messages;o.push(e.id)})});if(!o.length)throw new Error("File has no messages");if(((n=(a=(t=(r=l==null?void 0:l[1])==null?void 0:r[0])==null?void 0:t.meta)==null?void 0:a[1])==null?void 0:n[0].data)&&xg(l[1][0].meta[1][0].data)==1e4)throw new Error("Pages documents are not supported");var u=((c=(f=(s=(i=l==null?void 0:l[1])==null?void 0:i[0])==null?void 0:s.meta)==null?void 0:f[1])==null?void 0:c[0].data)&&xg(l[1][0].meta[1][0].data)==1&&l[1][0];if(!u)o.forEach(function(e){l[e].forEach(function(e){var r=xg(e.meta[1][0].data)>>>0;if(r==1){if(!u)u=e;else throw new Error("Document has multiple roots")}})});if(!u)throw new Error("Cannot find Document root");return Kg(l,u)}function Jg(e,r,t,a){var n,i;if(!((n=e[6])==null?void 0:n[0])||!((i=e[7])==null?void 0:i[0]))throw"Mutation only works on post-BNC storages!";var s=0;if(e[7][0].data.length<2*r.length){var f=new Uint8Array(2*r.length);f.set(e[7][0].data);e[7][0].data=f}if(e[4][0].data.length<2*r.length){var c=new Uint8Array(2*r.length);c.set(e[4][0].data);e[4][0].data=c}var l=bg(e[7][0].data),o=0,u=[];var h=bg(e[4][0].data),d=0,v=[];var p=a?4:1;for(var m=0;m<r.length;++m){if(r[m]==null){l.setUint16(m*2,65535,true);h.setUint16(m*2,65535);continue}l.setUint16(m*2,o/p,true);h.setUint16(m*2,d/p,true);var b,g;switch(typeof r[m]){case"string":b=Ug({t:"s",v:r[m]},t);g=Bg({t:"s",v:r[m]},t);break;case"number":b=Ug({t:"n",v:r[m]},t);g=Bg({t:"n",v:r[m]},t);break;case"boolean":b=Ug({t:"b",v:r[m]},t);g=Bg({t:"b",v:r[m]},t);break;default:throw new Error("Unsupported value "+r[m]);}u.push(b);o+=b.length;{v.push(g);d+=g.length}++s}e[2][0].data=Ag(s);e[5][0].data=Ag(5);for(;m<e[7][0].data.length/2;++m){l.setUint16(m*2,65535,true);h.setUint16(m*2,65535,true)}e[6][0].data=Tg(u);e[3][0].data=Tg(v);e[8]=[{type:0,data:Ag(a?1:0)}];return s}function qg(e,r){return{meta:[[],[{type:0,data:Ag(e)}]],data:r}}var Qg=true;function ew(e,r){var t;if(!r||!r.numbers)throw new Error("Must pass a `numbers` option -- check the README");var a=e.Sheets[e.SheetNames[0]];if(e.SheetNames.length>1)console.error("The Numbers writer currently writes only the first table");var n=La(a["!ref"]);n.s.r=n.s.c=0;var i=false;if(n.e.c>999){i=true;n.e.c=999}if(n.e.r>254){i=true;n.e.r=254}if(i)console.error("The Numbers writer is currently limited to ".concat(Ma(n)));var s=Uw(a,{range:n,header:1});var f=["~Sh33tJ5~"];s.forEach(function(e){return e.forEach(function(e){if(typeof e=="string")f.push(e)})});var c={};var l=[];var o=qe.read(r.numbers,{type:"base64"});o.FileIndex.map(function(e,r){return[e,o.FullPaths[r]]}).forEach(function(e){var r=e[0],t=e[1];if(r.type!=2)return;if(!r.name.match(/\.iwa/))return;var a=r.content;var n=Dg(a);var i=Ng(n);i.forEach(function(e){l.push(e.id);c[e.id]={deps:[],location:t,type:xg(e.messages[0].meta[1][0].data)}})});l.sort(function(e,r){return e-r});var u=l.filter(function(e){return e>1}).map(function(e){return[e,Ag(e)]});o.FileIndex.map(function(e,r){return[e,o.FullPaths[r]]}).forEach(function(e){var r=e[0];if(!r.name.match(/\.iwa/))return;var t=Ng(Dg(r.content));t.forEach(function(e){u.forEach(function(r){if(e.messages.some(function(e){return xg(e.meta[1][0].data)!=11006&&kg(e.data,r[1])})){c[r[0]].deps.push(e.id)}})})});function h(e){for(var r=927262;r<2e6;++r)if(!c[r]){c[r]=e;return r}throw new Error("Too many messages")}var d=qe.find(o,c[1].location);var v=Ng(Dg(d.content));var p;for(var m=0;m<v.length;++m){var b=v[m];if(b.id==1)p=b}var g=Hg(Cg(p.messages[0].data)[1][0].data);d=qe.find(o,c[g].location);v=Ng(Dg(d.content));for(m=0;m<v.length;++m){b=v[m];if(b.id==g)p=b}var w=Cg(p.messages[0].data);{w[1]=[{type:2,data:wg(e.SheetNames[0])}]}p.messages[0].data=Og(w);d.content=Pg(Ig(v));d.size=d.content.length;g=Hg(w[2][0].data);d=qe.find(o,c[g].location);v=Ng(Dg(d.content));for(m=0;m<v.length;++m){b=v[m];if(b.id==g)p=b}g=Hg(Cg(p.messages[0].data)[2][0].data);d=qe.find(o,c[g].location);v=Ng(Dg(d.content));for(m=0;m<v.length;++m){b=v[m];if(b.id==g)p=b}var k=Cg(p.messages[0].data);{k[6][0].data=Ag(n.e.r+1);k[7][0].data=Ag(n.e.c+1);var T=Hg(k[46][0].data);var E=qe.find(o,c[T].location);var y=Ng(Dg(E.content));{for(var S=0;S<y.length;++S){if(y[S].id==T)break}if(y[S].id!=T)throw"Bad ColumnRowUIDMapArchive";var _=Cg(y[S].messages[0].data);_[1]=[];_[2]=[],_[3]=[];for(var A=0;A<=n.e.c;++A){_[1].push({type:2,data:Og([[],[{type:0,data:Ag(A+420690)}],[{type:0,data:Ag(A+420690)}]])});_[2].push({type:0,data:Ag(A)});_[3].push({type:0,data:Ag(A)})}_[4]=[];_[5]=[],_[6]=[];for(var x=0;x<=n.e.r;++x){_[4].push({type:2,data:Og([[],[{type:0,data:Ag(x+726270)}],[{type:0,data:Ag(x+726270)}]])});_[5].push({type:0,data:Ag(x)});_[6].push({type:0,data:Ag(x)})}y[S].messages[0].data=Og(_)}E.content=Pg(Ig(y));E.size=E.content.length;delete k[46];var C=Cg(k[4][0].data);{C[7][0].data=Ag(n.e.r+1);var O=Cg(C[1][0].data);var R=Hg(O[2][0].data);E=qe.find(o,c[R].location);y=Ng(Dg(E.content));{if(y[0].id!=R)throw"Bad HeaderStorageBucket";var N=Cg(y[0].messages[0].data);if((t=N==null?void 0:N[2])==null?void 0:t[0])for(x=0;x<s.length;++x){var I=Cg(N[2][0].data);I[1][0].data=Ag(x);I[4][0].data=Ag(s[x].length);N[2][x]={type:N[2][0].type,data:Og(I)}}y[0].messages[0].data=Og(N)}E.content=Pg(Ig(y));E.size=E.content.length;var F=Hg(C[2][0].data);E=qe.find(o,c[F].location);y=Ng(Dg(E.content));{if(y[0].id!=F)throw"Bad HeaderStorageBucket";N=Cg(y[0].messages[0].data);for(A=0;A<=n.e.c;++A){I=Cg(N[2][0].data);I[1][0].data=Ag(A);I[4][0].data=Ag(n.e.r+1);N[2][A]={type:N[2][0].type,data:Og(I)}}y[0].messages[0].data=Og(N)}E.content=Pg(Ig(y));E.size=E.content.length;if(a["!merges"]){var D=h({type:6144,deps:[g],location:c[g].location});var P=[[],[]];a["!merges"].forEach(function(e){P[1].push({type:2,data:Og([[],[{type:2,data:Og([[],[{type:5,data:new Uint8Array(new Uint16Array([e.s.r,e.s.c]).buffer)}]])}],[{type:2,data:Og([[],[{type:5,data:new Uint8Array(new Uint16Array([e.e.r-e.s.r+1,e.e.c-e.s.c+1]).buffer)}]])}]])})});C[13]=[{type:2,data:zg(D)}];v.push({id:D,messages:[qg(6144,Og(P))]})}var L=Hg(C[4][0].data);(function(){var e=qe.find(o,c[L].location);var r=Ng(Dg(e.content));var t;for(var a=0;a<r.length;++a){var n=r[a];if(n.id==L)t=n}var i=Cg(t.messages[0].data);{i[3]=[];f.forEach(function(e,r){i[3].push({type:2,data:Og([[],[{type:0,data:Ag(r)}],[{type:0,data:Ag(1)}],[{type:2,data:wg(e)}]])})})}t.messages[0].data=Og(i);e.content=Pg(Ig(r));e.size=e.content.length})();var M=Cg(C[3][0].data);{var U=M[1][0];M[3]=[{type:0,data:Ag(Qg?1:0)}];var B=Cg(U.data);{var W=Hg(B[2][0].data);(function(){var e=qe.find(o,c[W].location);var r=Ng(Dg(e.content));var t;for(var a=0;a<r.length;++a){var i=r[a];if(i.id==W)t=i}var l=Cg(t.messages[0].data);{delete l[6];delete M[7];var u=new Uint8Array(l[5][0].data);l[5]=[];for(var h=0;h<=n.e.r;++h){var d=Cg(u);Jg(d,s[h],f,Qg);d[1][0].data=Ag(h);l[5].push({data:Og(d),type:2})}l[1]=[{type:0,data:Ag(0)}];l[2]=[{type:0,data:Ag(0)}];l[3]=[{type:0,data:Ag(0)}];l[4]=[{type:0,data:Ag(n.e.r+1)}];l[6]=[{type:0,data:Ag(5)}];l[7]=[{type:0,data:Ag(1)}];l[8]=[{type:0,data:Ag(Qg?1:0)}]}t.messages[0].data=Og(l);e.content=Pg(Ig(r));e.size=e.content.length})()}U.data=Og(B)}C[3][0].data=Og(M)}k[4][0].data=Og(C)}p.messages[0].data=Og(k);d.content=Pg(Ig(v));d.size=d.content.length;return o}function rw(e){return function r(t){for(var a=0;a!=e.length;++a){var n=e[a];if(t[n[0]]===undefined)t[n[0]]=n[1];if(n[2]==="n")t[n[0]]=Number(t[n[0]])}}}function tw(e){rw([["cellNF",false],["cellHTML",true],["cellFormula",true],["cellStyles",false],["cellText",true],["cellDates",false],["sheetStubs",false],["sheetRows",0,"n"],["bookDeps",false],["bookSheets",false],["bookProps",false],["bookFiles",false],["bookVBA",false],["password",""],["WTF",false]])(e)}function aw(e){rw([["cellDates",false],["bookSST",false],["bookType","xlsx"],["compression",false],["WTF",false]])(e)}function nw(e){if(ai.WS.indexOf(e)>-1)return"sheet";if(ai.CS&&e==ai.CS)return"chart";if(ai.DS&&e==ai.DS)return"dialog";if(ai.MS&&e==ai.MS)return"macro";return e&&e.length?e:"sheet"}function iw(e,r){if(!e)return 0;try{e=r.map(function a(r){if(!r.id)r.id=r.strRelID;return[r.name,e["!id"][r.id].Target,nw(e["!id"][r.id].Type)]})}catch(t){return null}return!e||e.length===0?null:e}function sw(e,r,t,a,n,i,s,f,c,l,o,u){try{i[a]=ii(Pr(e,t,true),r);var h=Dr(e,r);var d;switch(f){case"sheet":d=Dm(h,r,n,c,i[a],l,o,u);break;case"chart":d=Pm(h,r,n,c,i[a],l,o,u);if(!d||!d["!drawel"])break;var v=Hr(d["!drawel"].Target,r);var p=ni(v);var m=fu(Pr(e,v,true),ii(Pr(e,p,true),v));var b=Hr(m,v);var g=ni(b);d=qp(Pr(e,b,true),b,c,ii(Pr(e,g,true),b),l,d);break;case"macro":d=Lm(h,r,n,c,i[a],l,o,u);break;case"dialog":d=Mm(h,r,n,c,i[a],l,o,u);break;default:throw new Error("Unrecognized sheet type "+f);}s[a]=d;var w=[];if(i&&i[a])nr(i[a]).forEach(function(t){var n="";if(i[a][t].Type==ai.CMNT){n=Hr(i[a][t].Target,r);var s=Wm(Dr(e,n,true),n,c);if(!s||!s.length)return;ou(d,s,false)}if(i[a][t].Type==ai.TCMNT){n=Hr(i[a][t].Target,r);w=w.concat(du(Dr(e,n,true),c))}});if(w&&w.length)ou(d,w,true,c.people||[])}catch(k){if(c.WTF)throw k}}function fw(e){return e.charAt(0)=="/"?e.slice(1):e}function cw(e,r){Ve();r=r||{};tw(r);if(Ir(e,"META-INF/manifest.xml"))return og(e,r);if(Ir(e,"objectdata.xml"))return og(e,r);if(Ir(e,"Index/Document.iwa")){if(typeof Uint8Array=="undefined")throw new Error("NUMBERS file parsing requires Uint8Array support");if(typeof Zg!="undefined"){if(e.FileIndex)return Zg(e);var t=qe.utils.cfb_new();Mr(e).forEach(function(r){Ur(t,r,Lr(e,r))});return Zg(t)}throw new Error("Unsupported NUMBERS file")}if(!Ir(e,"[Content_Types].xml")){if(Ir(e,"index.xml.gz"))throw new Error("Unsupported NUMBERS 08 file");if(Ir(e,"index.xml"))throw new Error("Unsupported NUMBERS 09 file");throw new Error("Unsupported ZIP file")}var a=Mr(e);var n=ri(Pr(e,"[Content_Types].xml"));var i=false;var s,f;if(n.workbooks.length===0){f="xl/workbook.xml";if(Dr(e,f,true))n.workbooks.push(f)}if(n.workbooks.length===0){f="xl/workbook.bin";if(!Dr(e,f,true))throw new Error("Could not find workbook");n.workbooks.push(f);i=true}if(n.workbooks[0].slice(-3)=="bin")i=true;var c={};var l={};if(!r.bookSheets&&!r.bookProps){$d=[];if(n.sst)try{$d=Bm(Dr(e,fw(n.sst)),n.sst,r)}catch(o){if(r.WTF)throw o}if(r.cellStyles&&n.themes.length)c=Po(Pr(e,n.themes[0].replace(/^\//,""),true)||"",r);if(n.style)l=Um(Dr(e,fw(n.style)),n.style,c,r)}n.links.map(function(t){try{var a=ii(Pr(e,ni(fw(t))),t);return zm(Dr(e,fw(t)),a,t,r)}catch(n){}});var u=Fm(Dr(e,fw(n.workbooks[0])),n.workbooks[0],r);var h={},d="";if(n.coreprops.length){d=Dr(e,fw(n.coreprops[0]),true);if(d)h=bi(d);if(n.extprops.length!==0){d=Dr(e,fw(n.extprops[0]),true);if(d)yi(d,h,r)}}var v={};if(!r.bookSheets||r.bookProps){if(n.custprops.length!==0){d=Pr(e,fw(n.custprops[0]),true);if(d)v=Ai(d,r)}}var p={};if(r.bookSheets||r.bookProps){if(u.Sheets)s=u.Sheets.map(function N(e){return e.name});else if(h.Worksheets&&h.SheetNames.length>0)s=h.SheetNames;if(r.bookProps){p.Props=h;p.Custprops=v}if(r.bookSheets&&typeof s!=="undefined")p.SheetNames=s;if(r.bookSheets?p.SheetNames:r.bookProps)return p}s={};var m={};if(r.bookDeps&&n.calcchain)m=Hm(Dr(e,fw(n.calcchain)),n.calcchain,r);var b=0;var g={};var w,k;{var T=u.Sheets;h.Worksheets=T.length;h.SheetNames=[];for(var E=0;E!=T.length;++E){h.SheetNames[E]=T[E].name}}var y=i?"bin":"xml";var S=n.workbooks[0].lastIndexOf("/");var _=(n.workbooks[0].slice(0,S+1)+"_rels/"+n.workbooks[0].slice(S+1)+".rels").replace(/^\//,"");if(!Ir(e,_))_="xl/_rels/workbook."+y+".rels";var A=ii(Pr(e,_,true),_.replace(/_rels.*/,"s5s"));if((n.metadata||[]).length>=1){r.xlmeta=Vm(Dr(e,fw(n.metadata[0])),n.metadata[0],r)}if((n.people||[]).length>=1){r.people=pu(Dr(e,fw(n.people[0])),r)}if(A)A=iw(A,u.Sheets);var x=Dr(e,"xl/worksheets/sheet.xml",true)?1:0;e:for(b=0;b!=h.Worksheets;++b){var C="sheet";if(A&&A[b]){w="xl/"+A[b][1].replace(/[\/]?xl\//,"");if(!Ir(e,w))w=A[b][1];if(!Ir(e,w))w=_.replace(/_rels\/.*$/,"")+A[b][1];C=A[b][2]}else{w="xl/worksheets/sheet"+(b+1-x)+"."+y;w=w.replace(/sheet0\./,"sheet.")}k=w.replace(/^(.*)(\/)([^\/]*)$/,"$1/_rels/$3.rels");if(r&&r.sheets!=null)switch(typeof r.sheets){case"number":if(b!=r.sheets)continue e;break;case"string":if(h.SheetNames[b].toLowerCase()!=r.sheets.toLowerCase())continue e;break;default:if(Array.isArray&&Array.isArray(r.sheets)){var O=false;for(var R=0;R!=r.sheets.length;++R){if(typeof r.sheets[R]=="number"&&r.sheets[R]==b)O=1;if(typeof r.sheets[R]=="string"&&r.sheets[R].toLowerCase()==h.SheetNames[b].toLowerCase())O=1}if(!O)continue e};}sw(e,w,k,h.SheetNames[b],b,g,s,C,r,u,c,l)}p={Directory:n,Workbook:u,Props:h,Custprops:v,Deps:m,Sheets:s,SheetNames:h.SheetNames,Strings:$d,Styles:l,Themes:c,SSF:Tr(Y)};if(r&&r.bookFiles){if(e.files){p.keys=a;p.files=e.files}else{p.keys=[];p.files={};e.FullPaths.forEach(function(r,t){r=r.replace(/^Root Entry[\/]/,"");p.keys.push(r);p.files[r]=e.FileIndex[t]})}}if(r&&r.bookVBA){if(n.vba.length>0)p.vbaraw=Dr(e,fw(n.vba[0]),true);else if(n.defaults&&n.defaults.bin===yu)p.vbaraw=Dr(e,"xl/vbaProject.bin",true)}return p}function lw(e,r){var t=r||{};var a="Workbook",n=qe.find(e,a);try{a="/!DataSpaces/Version";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);Qc(n.content);a="/!DataSpaces/DataSpaceMap";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var i=rl(n.content);if(i.length!==1||i[0].comps.length!==1||i[0].comps[0].t!==0||i[0].name!=="StrongEncryptionDataSpace"||i[0].comps[0].v!=="EncryptedPackage")throw new Error("ECMA-376 Encrypted file bad "+a);a="/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var s=tl(n.content);if(s.length!=1||s[0]!="StrongEncryptionTransform")throw new Error("ECMA-376 Encrypted file bad "+a);a="/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);nl(n.content)}catch(f){}a="/EncryptionInfo";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);var c=fl(n.content);a="/EncryptedPackage";n=qe.find(e,a);if(!n||!n.content)throw new Error("ECMA-376 Encrypted file missing "+a);if(c[0]==4&&typeof decrypt_agile!=="undefined")return decrypt_agile(c[1],n.content,t.password||"",t);if(c[0]==2&&typeof decrypt_std76!=="undefined")return decrypt_std76(c[1],n.content,t.password||"",t);throw new Error("File is password-protected")}function ow(e,r){if(e&&!e.SSF){e.SSF=Tr(Y)}if(e&&e.SSF){Ve();ze(e.SSF);r.revssf=fr(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF}r.rels={};r.wbrels={};r.Strings=[];r.Strings.Count=0;r.Strings.Unique=0;if(Xd)r.revStrings=new Map;else{r.revStrings={};r.revStrings.foo=[];delete r.revStrings.foo}var t="bin";var a=true;var n=ei();aw(r=r||{});var i=Br();var s="",f=0;r.cellXfs=[];Jd(r.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};s="docProps/core.xml";Ur(i,s,wi(e.Props,r));n.coreprops.push(s);fi(r.rels,2,s,ai.CORE_PROPS);s="docProps/app.xml";if(e.Props&&e.Props.SheetNames){}else if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{var c=[];for(var l=0;l<e.SheetNames.length;++l)if((e.Workbook.Sheets[l]||{}).Hidden!=2)c.push(e.SheetNames[l]);e.Props.SheetNames=c}e.Props.Worksheets=e.Props.SheetNames.length;Ur(i,s,Si(e.Props,r));n.extprops.push(s);fi(r.rels,3,s,ai.EXT_PROPS);if(e.Custprops!==e.Props&&nr(e.Custprops||{}).length>0){s="docProps/custom.xml";Ur(i,s,xi(e.Custprops,r));n.custprops.push(s);fi(r.rels,4,s,ai.CUST_PROPS)}for(f=1;f<=e.SheetNames.length;++f){var o={"!id":{}};var u=e.Sheets[e.SheetNames[f-1]];var h=(u||{})["!type"]||"sheet";switch(h){case"chart":;default:s="xl/worksheets/sheet"+f+"."+t;Ur(i,s,Zp(f-1,r,e,o));n.sheets.push(s);fi(r.wbrels,-1,"worksheets/sheet"+f+"."+t,ai.WS[0]);}if(u){var d=u["!comments"];var v=false;var p="";if(d&&d.length>0){p="xl/comments"+f+"."+t;Ur(i,p,Eu(d,r));n.comments.push(p);fi(o,-1,"../comments"+f+"."+t,ai.CMNT);v=true}if(u["!legacy"]){if(v)Ur(i,"xl/drawings/vmlDrawing"+f+".vml",cu(f,u["!comments"]))}delete u["!comments"];delete u["!legacy"]}if(o["!id"].rId1)Ur(i,ni(s),si(o))}if(r.Strings!=null&&r.Strings.length>0){s="xl/sharedStrings."+t;Ur(i,s,Zc(r.Strings,r));n.strs.push(s);fi(r.wbrels,-1,"sharedStrings."+t,ai.SST)}s="xl/workbook."+t;Ur(i,s,Im(e,r));n.workbooks.push(s);
fi(r.rels,1,s,ai.WB);s="xl/theme/theme1.xml";Ur(i,s,Lo(e.Themes,r));n.themes.push(s);fi(r.wbrels,-1,"theme/theme1.xml",ai.THEME);s="xl/styles."+t;Ur(i,s,_o(e,r));n.styles.push(s);fi(r.wbrels,-1,"styles."+t,ai.STY);if(e.vbaraw&&a){s="xl/vbaProject.bin";Ur(i,s,e.vbaraw);n.vba.push(s);fi(r.wbrels,-1,"vbaProject.bin",ai.VBA)}s="xl/metadata."+t;Ur(i,s,Qo());n.metadata.push(s);fi(r.wbrels,-1,"metadata."+t,ai.XLMETA);Ur(i,"[Content_Types].xml",ti(n,r));Ur(i,"_rels/.rels",si(r.rels));Ur(i,"xl/_rels/workbook."+t+".rels",si(r.wbrels));delete r.revssf;delete r.ssf;return i}function uw(e,r){if(e&&!e.SSF){e.SSF=Tr(Y)}if(e&&e.SSF){Ve();ze(e.SSF);r.revssf=fr(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF}r.rels={};r.wbrels={};r.Strings=[];r.Strings.Count=0;r.Strings.Unique=0;if(Xd)r.revStrings=new Map;else{r.revStrings={};r.revStrings.foo=[];delete r.revStrings.foo}var t="xml";var a=Au.indexOf(r.bookType)>-1;var n=ei();aw(r=r||{});var i=Br();var s="",f=0;r.cellXfs=[];Jd(r.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};s="docProps/core.xml";Ur(i,s,wi(e.Props,r));n.coreprops.push(s);fi(r.rels,2,s,ai.CORE_PROPS);s="docProps/app.xml";if(e.Props&&e.Props.SheetNames){}else if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{var c=[];for(var l=0;l<e.SheetNames.length;++l)if((e.Workbook.Sheets[l]||{}).Hidden!=2)c.push(e.SheetNames[l]);e.Props.SheetNames=c}e.Props.Worksheets=e.Props.SheetNames.length;Ur(i,s,Si(e.Props,r));n.extprops.push(s);fi(r.rels,3,s,ai.EXT_PROPS);if(e.Custprops!==e.Props&&nr(e.Custprops||{}).length>0){s="docProps/custom.xml";Ur(i,s,xi(e.Custprops,r));n.custprops.push(s);fi(r.rels,4,s,ai.CUST_PROPS)}var o=["SheetJ5"];r.tcid=0;for(f=1;f<=e.SheetNames.length;++f){var u={"!id":{}};var h=e.Sheets[e.SheetNames[f-1]];var d=(h||{})["!type"]||"sheet";switch(d){case"chart":;default:s="xl/worksheets/sheet"+f+"."+t;Ur(i,s,Iv(f-1,r,e,u));n.sheets.push(s);fi(r.wbrels,-1,"worksheets/sheet"+f+"."+t,ai.WS[0]);}if(h){var v=h["!comments"];var p=false;var m="";if(v&&v.length>0){var b=false;v.forEach(function(e){e[1].forEach(function(e){if(e.T==true)b=true})});if(b){m="xl/threadedComments/threadedComment"+f+".xml";Ur(i,m,vu(v,o,r));n.threadedcomments.push(m);fi(u,-1,"../threadedComments/threadedComment"+f+".xml",ai.TCMNT)}m="xl/comments"+f+"."+t;Ur(i,m,hu(v,r));n.comments.push(m);fi(u,-1,"../comments"+f+"."+t,ai.CMNT);p=true}if(h["!legacy"]){if(p)Ur(i,"xl/drawings/vmlDrawing"+f+".vml",cu(f,h["!comments"]))}delete h["!comments"];delete h["!legacy"]}if(u["!id"].rId1)Ur(i,ni(s),si(u))}if(r.Strings!=null&&r.Strings.length>0){s="xl/sharedStrings."+t;Ur(i,s,$c(r.Strings,r));n.strs.push(s);fi(r.wbrels,-1,"sharedStrings."+t,ai.SST)}s="xl/workbook."+t;Ur(i,s,mm(e,r));n.workbooks.push(s);fi(r.rels,1,s,ai.WB);s="xl/theme/theme1.xml";Ur(i,s,Lo(e.Themes,r));n.themes.push(s);fi(r.wbrels,-1,"theme/theme1.xml",ai.THEME);s="xl/styles."+t;Ur(i,s,Jl(e,r));n.styles.push(s);fi(r.wbrels,-1,"styles."+t,ai.STY);if(e.vbaraw&&a){s="xl/vbaProject.bin";Ur(i,s,e.vbaraw);n.vba.push(s);fi(r.wbrels,-1,"vbaProject.bin",ai.VBA)}s="xl/metadata."+t;Ur(i,s,ru());n.metadata.push(s);fi(r.wbrels,-1,"metadata."+t,ai.XLMETA);if(o.length>1){s="xl/persons/person.xml";Ur(i,s,mu(o,r));n.people.push(s);fi(r.wbrels,-1,"persons/person.xml",ai.PEOPLE)}Ur(i,"[Content_Types].xml",ti(n,r));Ur(i,"_rels/.rels",si(r.rels));Ur(i,"xl/_rels/workbook."+t+".rels",si(r.wbrels));delete r.revssf;delete r.ssf;return i}function hw(e,r){var t="";switch((r||{}).type||"base64"){case"buffer":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];case"base64":t=T(e.slice(0,12));break;case"binary":t=e;break;case"array":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];default:throw new Error("Unrecognized type "+(r&&r.type||"undefined"));}return[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3),t.charCodeAt(4),t.charCodeAt(5),t.charCodeAt(6),t.charCodeAt(7)]}function dw(e,r){if(qe.find(e,"EncryptedPackage"))return lw(e,r);return Ab(e,r)}function vw(e,r){var t,a=e;var n=r||{};if(!n.type)n.type=E&&Buffer.isBuffer(e)?"buffer":"base64";t=Wr(a,n);return cw(t,n)}function pw(e,r){var t=0;e:while(t<e.length)switch(e.charCodeAt(t)){case 10:;case 13:;case 32:++t;break;case 60:return ab(e.slice(t),r);default:break e;}return Rc.to_workbook(e,r)}function mw(e,r){var t="",a=hw(e,r);switch(r.type){case"base64":t=T(e);break;case"binary":t=e;break;case"buffer":t=e.toString("binary");break;case"array":t=kr(e);break;default:throw new Error("Unrecognized type "+r.type);}if(a[0]==239&&a[1]==187&&a[2]==191)t=vt(t);r.type="binary";return pw(t,r)}function bw(e,r){var t=e;if(r.type=="base64")t=T(t);t=a.utils.decode(1200,t.slice(2),"str");r.type="binary";return pw(t,r)}function gw(e){return!e.match(/[^\x00-\x7F]/)?e:pt(e)}function ww(e,r,t,a){if(a){t.type="string";return Rc.to_workbook(e,t)}return Rc.to_workbook(r,t)}function kw(e,r){l();var t=r||{};if(typeof ArrayBuffer!=="undefined"&&e instanceof ArrayBuffer)return kw(new Uint8Array(e),(t=Tr(t),t.type="array",t));if(typeof Uint8Array!=="undefined"&&e instanceof Uint8Array&&!t.type)t.type=typeof Deno!=="undefined"?"buffer":"array";var a=e,n=[0,0,0,0],i=false;if(t.cellStyles){t.cellNF=true;t.sheetStubs=true}jd={};if(t.dateNF)jd.dateNF=t.dateNF;if(!t.type)t.type=E&&Buffer.isBuffer(e)?"buffer":"base64";if(t.type=="file"){t.type=E?"buffer":"binary";a=ar(e);if(typeof Uint8Array!=="undefined"&&!E)t.type="array"}if(t.type=="string"){i=true;t.type="binary";t.codepage=65001;a=gw(e)}if(t.type=="array"&&typeof Uint8Array!=="undefined"&&e instanceof Uint8Array&&typeof ArrayBuffer!=="undefined"){var s=new ArrayBuffer(3),f=new Uint8Array(s);f.foo="bar";if(!f.foo){t=Tr(t);t.type="array";return kw(R(a),t)}}switch((n=hw(a,t))[0]){case 208:if(n[1]===207&&n[2]===17&&n[3]===224&&n[4]===161&&n[5]===177&&n[6]===26&&n[7]===225)return dw(qe.read(a,t),t);break;case 9:if(n[1]<=8)return Ab(a,t);break;case 60:return ab(a,t);case 73:if(n[1]===73&&n[2]===42&&n[3]===0)throw new Error("TIFF Image File is not a spreadsheet");if(n[1]===68)return Nc(a,t);break;case 84:if(n[1]===65&&n[2]===66&&n[3]===76)return Cc.to_workbook(a,t);break;case 80:return n[1]===75&&n[2]<9&&n[3]<9?vw(a,t):ww(e,a,t,i);case 239:return n[3]===60?ab(a,t):ww(e,a,t,i);case 255:if(n[1]===254){return bw(a,t)}else if(n[1]===0&&n[2]===2&&n[3]===0)return Ic.to_workbook(a,t);break;case 0:if(n[1]===0){if(n[2]>=2&&n[3]===0)return Ic.to_workbook(a,t);if(n[2]===0&&(n[3]===8||n[3]===9))return Ic.to_workbook(a,t)}break;case 3:;case 131:;case 139:;case 140:return Ac.to_workbook(a,t);case 123:if(n[1]===92&&n[2]===114&&n[3]===116)return kl.to_workbook(a,t);break;case 10:;case 13:;case 32:return mw(a,t);case 137:if(n[1]===80&&n[2]===78&&n[3]===71)throw new Error("PNG Image File is not a spreadsheet");break;case 8:if(n[1]===231)throw new Error("Unsupported Multiplan 1.x file!");break;case 12:if(n[1]===236)throw new Error("Unsupported Multiplan 2.x file!");if(n[1]===237)throw new Error("Unsupported Multiplan 3.x file!");break;}if(_c.indexOf(n[0])>-1&&n[2]<=12&&n[3]<=31)return Ac.to_workbook(a,t);return ww(e,a,t,i)}function Tw(e,r){var t=r||{};t.type="file";return kw(e,t)}function Ew(e,r){switch(r.type){case"base64":;case"binary":break;case"buffer":;case"array":r.type="";break;case"file":return tr(r.file,qe.write(e,{type:E?"buffer":""}));case"string":throw new Error("'string' output type invalid for '"+r.bookType+"' files");default:throw new Error("Unrecognized type "+r.type);}return qe.write(e,r)}function yw(e,r){switch(r.bookType){case"ods":return mg(e,r);case"numbers":return ew(e,r);case"xlsb":return ow(e,r);default:return uw(e,r);}}function Sw(e,r){var t=Tr(r||{});var a=yw(e,t);return Aw(a,t)}function _w(e,r){var t=Tr(r||{});var a=uw(e,t);return Aw(a,t)}function Aw(e,r){var t={};var a=E?"nodebuffer":typeof Uint8Array!=="undefined"?"array":"string";if(r.compression)t.compression="DEFLATE";if(r.password)t.type=a;else switch(r.type){case"base64":t.type="base64";break;case"binary":t.type="string";break;case"string":throw new Error("'string' output type invalid for '"+r.bookType+"' files");case"buffer":;case"file":t.type=a;break;default:throw new Error("Unrecognized type "+r.type);}var n=e.FullPaths?qe.write(e,{fileType:"zip",type:{nodebuffer:"buffer",string:"binary"}[t.type]||t.type,compression:!!r.compression}):e.generate(t);if(typeof Deno!=="undefined"){if(typeof n=="string"){if(r.type=="binary"||r.type=="base64")return n;n=new Uint8Array(x(n))}}if(r.password&&typeof encrypt_agile!=="undefined")return Ew(encrypt_agile(n,r.password),r);if(r.type==="file")return tr(r.file,n);return r.type=="string"?vt(n):n}function xw(e,r){var t=r||{};var a=xb(e,t);return Ew(a,t)}function Cw(e,r,t){if(!t)t="";var a=t+e;switch(r.type){case"base64":return k(pt(a));case"binary":return pt(a);case"string":return e;case"file":return tr(r.file,a,"utf8");case"buffer":{if(E)return y(a,"utf8");else if(typeof TextEncoder!=="undefined")return(new TextEncoder).encode(a);else return Cw(a,{type:"binary"}).split("").map(function(e){return e.charCodeAt(0)})};}throw new Error("Unrecognized type "+r.type)}function Ow(e,r){switch(r.type){case"base64":return k(e);case"binary":return e;case"string":return e;case"file":return tr(r.file,e,"binary");case"buffer":{if(E)return y(e,"binary");else return e.split("").map(function(e){return e.charCodeAt(0)})};}throw new Error("Unrecognized type "+r.type)}function Rw(e,r){switch(r.type){case"string":;case"base64":;case"binary":var t="";for(var a=0;a<e.length;++a)t+=String.fromCharCode(e[a]);return r.type=="base64"?k(t):r.type=="string"?vt(t):t;case"file":return tr(r.file,e);case"buffer":return e;default:throw new Error("Unrecognized type "+r.type);}}function Nw(e,r){l();dm(e);var t=Tr(r||{});if(t.cellStyles){t.cellNF=true;t.sheetStubs=true}if(t.type=="array"){t.type="binary";var a=Nw(e,t);t.type="array";return x(a)}return _w(e,t)}function Iw(e,r){l();dm(e);var t=Tr(r||{});if(t.cellStyles){t.cellNF=true;t.sheetStubs=true}if(t.type=="array"){t.type="binary";var a=Iw(e,t);t.type="array";return x(a)}var n=0;if(t.sheet){if(typeof t.sheet=="number")n=t.sheet;else n=e.SheetNames.indexOf(t.sheet);if(!e.SheetNames[n])throw new Error("Sheet not found: "+t.sheet+" : "+typeof t.sheet)}switch(t.bookType||"xlsb"){case"xml":;case"xlml":return Cw(mb(e,t),t);case"slk":;case"sylk":return Cw(xc.from_sheet(e.Sheets[e.SheetNames[n]],t,e),t);case"htm":;case"html":return Cw(rg(e.Sheets[e.SheetNames[n]],t),t);case"txt":return Ow(zw(e.Sheets[e.SheetNames[n]],t),t);case"csv":return Cw(Hw(e.Sheets[e.SheetNames[n]],t),t,"\ufeff");case"dif":return Cw(Cc.from_sheet(e.Sheets[e.SheetNames[n]],t),t);case"dbf":return Rw(Ac.from_sheet(e.Sheets[e.SheetNames[n]],t),t);case"prn":return Cw(Rc.from_sheet(e.Sheets[e.SheetNames[n]],t),t);case"rtf":return Cw(kl.from_sheet(e.Sheets[e.SheetNames[n]],t),t);case"eth":return Cw(Oc.from_sheet(e.Sheets[e.SheetNames[n]],t),t);case"fods":return Cw(mg(e,t),t);case"wk1":return Rw(Ic.sheet_to_wk1(e.Sheets[e.SheetNames[n]],t),t);case"wk3":return Rw(Ic.book_to_wk3(e,t),t);case"biff2":if(!t.biff)t.biff=2;case"biff3":if(!t.biff)t.biff=3;case"biff4":if(!t.biff)t.biff=4;return Rw(Yb(e,t),t);case"biff5":if(!t.biff)t.biff=5;case"biff8":;case"xla":;case"xls":if(!t.biff)t.biff=8;return xw(e,t);case"xlsx":;case"xlsm":;case"xlam":;case"xlsb":;case"numbers":;case"ods":return Sw(e,t);default:throw new Error("Unrecognized bookType |"+t.bookType+"|");}}function Fw(e){if(e.bookType)return;var r={xls:"biff8",htm:"html",slk:"sylk",socialcalc:"eth",Sh33tJS:"WTF"};var t=e.file.slice(e.file.lastIndexOf(".")).toLowerCase();if(t.match(/^\.[a-z]+$/))e.bookType=t.slice(1);e.bookType=r[e.bookType]||e.bookType}function Dw(e,r,t){var a=t||{};a.type="file";a.file=r;Fw(a);return Iw(e,a)}function Pw(e,r,t){var a=t||{};a.type="file";a.file=r;Fw(a);return Nw(e,a)}function Lw(e,r,t,a){var n=t||{};n.type="file";n.file=e;Fw(n);n.type="buffer";var i=a;if(!(i instanceof Function))i=t;return Qe.writeFile(e,Iw(r,n),i)}function Mw(e,r,t,a,n,i,s,f){var c=Aa(t);var l=f.defval,o=f.raw||!Object.prototype.hasOwnProperty.call(f,"raw");var u=true;var h=n===1?[]:{};if(n!==1){if(Object.defineProperty)try{Object.defineProperty(h,"__rowNum__",{value:t,enumerable:false})}catch(d){h.__rowNum__=t}else h.__rowNum__=t}if(!s||e[t])for(var v=r.s.c;v<=r.e.c;++v){var p=s?e[t][v]:e[a[v]+c];if(p===undefined||p.t===undefined){if(l===undefined)continue;if(i[v]!=null){h[i[v]]=l}continue}var m=p.v;switch(p.t){case"z":if(m==null)break;continue;case"e":m=m==0?null:void 0;break;case"s":;case"d":;case"b":;case"n":break;default:throw new Error("unrecognized type "+p.t);}if(i[v]!=null){if(m==null){if(p.t=="e"&&m===null)h[i[v]]=null;else if(l!==undefined)h[i[v]]=l;else if(o&&m===null)h[i[v]]=null;else continue}else{h[i[v]]=o&&(p.t!=="n"||p.t==="n"&&f.rawNumbers!==false)?m:za(p,m,f)}if(m!=null)u=false}}return{row:h,isempty:u}}function Uw(e,r){if(e==null||e["!ref"]==null)return[];var t={t:"n",v:0},a=0,n=1,i=[],s=0,f="";var c={s:{r:0,c:0},e:{r:0,c:0}};var l=r||{};var o=l.range!=null?l.range:e["!ref"];if(l.header===1)a=1;else if(l.header==="A")a=2;else if(Array.isArray(l.header))a=3;else if(l.header==null)a=0;switch(typeof o){case"string":c=Wa(o);break;case"number":c=Wa(e["!ref"]);c.s.r=o;break;default:c=o;}if(a>0)n=0;var u=Aa(c.s.r);var h=[];var d=[];var v=0,p=0;var m=Array.isArray(e);var b=c.s.r,g=0;var w={};if(m&&!e[b])e[b]=[];var k=l.skipHidden&&e["!cols"]||[];var T=l.skipHidden&&e["!rows"]||[];for(g=c.s.c;g<=c.e.c;++g){if((k[g]||{}).hidden)continue;h[g]=Ra(g);t=m?e[b][g]:e[h[g]+u];switch(a){case 1:i[g]=g-c.s.c;break;case 2:i[g]=h[g];break;case 3:i[g]=l.header[g-c.s.c];break;default:if(t==null)t={w:"__EMPTY",t:"s"};f=s=za(t,null,l);p=w[s]||0;if(!p)w[s]=1;else{do{f=s+"_"+p++}while(w[f]);w[s]=p;w[f]=1}i[g]=f;}}for(b=c.s.r+n;b<=c.e.r;++b){if((T[b]||{}).hidden)continue;var E=Mw(e,c,b,h,a,i,m,l);if(E.isempty===false||(a===1?l.blankrows!==false:!!l.blankrows))d[v++]=E.row}d.length=v;return d}var Bw=/"/g;function Ww(e,r,t,a,n,i,s,f){var c=true;var l=[],o="",u=Aa(t);for(var h=r.s.c;h<=r.e.c;++h){if(!a[h])continue;var d=f.dense?(e[t]||[])[h]:e[a[h]+u];if(d==null)o="";else if(d.v!=null){c=false;o=""+(f.rawNumbers&&d.t=="n"?d.v:za(d,null,f));for(var v=0,p=0;v!==o.length;++v)if((p=o.charCodeAt(v))===n||p===i||p===34||f.forceQuotes){o='"'+o.replace(Bw,'""')+'"';break}if(o=="ID")o='"ID"'}else if(d.f!=null&&!d.F){c=false;o="="+d.f;if(o.indexOf(",")>=0)o='"'+o.replace(Bw,'""')+'"'}else o="";l.push(o)}if(f.blankrows===false&&c)return null;return l.join(s)}function Hw(e,r){var t=[];var a=r==null?{}:r;if(e==null||e["!ref"]==null)return"";var n=Wa(e["!ref"]);var i=a.FS!==undefined?a.FS:",",s=i.charCodeAt(0);var f=a.RS!==undefined?a.RS:"\n",c=f.charCodeAt(0);var l=new RegExp((i=="|"?"\\|":i)+"+$");var o="",u=[];a.dense=Array.isArray(e);var h=a.skipHidden&&e["!cols"]||[];var d=a.skipHidden&&e["!rows"]||[];for(var v=n.s.c;v<=n.e.c;++v)if(!(h[v]||{}).hidden)u[v]=Ra(v);var p=0;for(var m=n.s.r;m<=n.e.r;++m){if((d[m]||{}).hidden)continue;o=Ww(e,n,m,u,s,c,i,a);if(o==null){continue}if(a.strip)o=o.replace(l,"");if(o||a.blankrows!==false)t.push((p++?f:"")+o)}delete a.dense;return t.join("")}function zw(e,r){if(!r)r={};r.FS="\t";r.RS="\n";var t=Hw(e,r);if(typeof a=="undefined"||r.type=="string")return t;var n=a.utils.encode(1200,t,"str");return String.fromCharCode(255)+String.fromCharCode(254)+n}function Vw(e){var r="",t,a="";if(e==null||e["!ref"]==null)return[];var n=Wa(e["!ref"]),i="",s=[],f;var c=[];var l=Array.isArray(e);for(f=n.s.c;f<=n.e.c;++f)s[f]=Ra(f);for(var o=n.s.r;o<=n.e.r;++o){i=Aa(o);for(f=n.s.c;f<=n.e.c;++f){r=s[f]+i;t=l?(e[o]||[])[f]:e[r];a="";if(t===undefined)continue;else if(t.F!=null){r=t.F;if(!t.f)continue;a=t.f;if(r.indexOf(":")==-1)r=r+":"+r}if(t.f!=null)a=t.f;else if(t.t=="z")continue;else if(t.t=="n"&&t.v!=null)a=""+t.v;else if(t.t=="b")a=t.v?"TRUE":"FALSE";else if(t.w!==undefined)a="'"+t.w;else if(t.v===undefined)continue;else if(t.t=="s")a="'"+t.v;else a=""+t.v;c[c.length]=r+"="+a}}return c}function Gw(e,r,t){var a=t||{};var n=+!a.skipHeader;var i=e||{};var s=0,f=0;if(i&&a.origin!=null){if(typeof a.origin=="number")s=a.origin;else{var c=typeof a.origin=="string"?Da(a.origin):a.origin;s=c.r;f=c.c}}var l;var o={s:{c:0,r:0},e:{c:f,r:s+r.length-1+n}};if(i["!ref"]){var u=Wa(i["!ref"]);o.e.c=Math.max(o.e.c,u.e.c);o.e.r=Math.max(o.e.r,u.e.r);if(s==-1){s=u.e.r+1;o.e.r=s+r.length-1+n}}else{if(s==-1){s=0;o.e.r=r.length-1+n}}var h=a.header||[],d=0;r.forEach(function(e,r){nr(e).forEach(function(t){if((d=h.indexOf(t))==-1)h[d=h.length]=t;var c=e[t];var o="z";var u="";var v=Pa({c:f+d,r:s+r+n});l=jw(i,v);if(c&&typeof c==="object"&&!(c instanceof Date)){i[v]=c}else{if(typeof c=="number")o="n";else if(typeof c=="boolean")o="b";else if(typeof c=="string")o="s";else if(c instanceof Date){o="d";if(!a.cellDates){o="n";c=or(c)}u=l.z&&Pe(l.z)?l.z:a.dateNF||Y[14]}else if(c===null&&a.nullError){o="e";c=0}if(!l)i[v]=l={t:o,v:c};else{l.t=o;l.v=c;delete l.w;delete l.R;if(u)l.z=u}if(u)l.z=u}})});o.e.c=Math.max(o.e.c,f+h.length-1);var v=Aa(s);if(n)for(d=0;d<h.length;++d)i[Ra(d+f)+v]={t:"s",v:h[d]};i["!ref"]=Ma(o);return i}function $w(e,r){return Gw(null,e,r)}function jw(e,r,t){if(typeof r=="string"){if(Array.isArray(e)){var a=Da(r);if(!e[a.r])e[a.r]=[];return e[a.r][a.c]||(e[a.r][a.c]={t:"z"})}return e[r]||(e[r]={t:"z"})}if(typeof r!="number")return jw(e,Pa(r));return jw(e,Pa({r:r,c:t||0}))}function Xw(e,r){if(typeof r=="number"){if(r>=0&&e.SheetNames.length>r)return r;throw new Error("Cannot find sheet # "+r)}else if(typeof r=="string"){var t=e.SheetNames.indexOf(r);if(t>-1)return t;throw new Error("Cannot find sheet name |"+r+"|")}else throw new Error("Cannot find sheet |"+r+"|")}function Yw(){return{SheetNames:[],Sheets:{}}}function Kw(e,r,t,a){var n=1;if(!t)for(;n<=65535;++n,t=undefined)if(e.SheetNames.indexOf(t="Sheet"+n)==-1)break;if(!t||e.SheetNames.length>=65535)throw new Error("Too many worksheets");if(a&&e.SheetNames.indexOf(t)>=0){var i=t.match(/(^.*?)(\d+)$/);n=i&&+i[2]||0;var s=i&&i[1]||t;for(++n;n<=65535;++n)if(e.SheetNames.indexOf(t=s+n)==-1)break}um(t);if(e.SheetNames.indexOf(t)>=0)throw new Error("Worksheet with name |"+t+"| already exists!");e.SheetNames.push(t);e.Sheets[t]=r;return t}function Zw(e,r,t){if(!e.Workbook)e.Workbook={};if(!e.Workbook.Sheets)e.Workbook.Sheets=[];var a=Xw(e,r);if(!e.Workbook.Sheets[a])e.Workbook.Sheets[a]={};switch(t){case 0:;case 1:;case 2:break;default:throw new Error("Bad sheet visibility setting "+t);}e.Workbook.Sheets[a].Hidden=t}function Jw(e,r){e.z=r;return e}function qw(e,r,t){if(!r){delete e.l}else{e.l={Target:r};if(t)e.l.Tooltip=t}return e}function Qw(e,r,t){return qw(e,"#"+r,t)}function ek(e,r,t){if(!e.c)e.c=[];e.c.push({t:r,a:t||"SheetJS"})}function rk(e,r,t,a){var n=typeof r!="string"?r:Wa(r);var i=typeof r=="string"?r:Ma(r);for(var s=n.s.r;s<=n.e.r;++s)for(var f=n.s.c;f<=n.e.c;++f){var c=jw(e,s,f);c.t="n";c.F=i;delete c.v;if(s==n.s.r&&f==n.s.c){c.f=t;if(a)c.D=true}}var l=La(e["!ref"]);if(l.s.r>n.s.r)l.s.r=n.s.r;if(l.s.c>n.s.c)l.s.c=n.s.c;if(l.e.r<n.e.r)l.e.r=n.e.r;if(l.e.c<n.e.c)l.e.c=n.e.c;e["!ref"]=Ma(l);return e}var tk={encode_col:Ra,encode_row:Aa,encode_cell:Pa,encode_range:Ma,decode_col:Oa,decode_row:_a,split_cell:Fa,decode_cell:Da,decode_range:La,format_cell:za,sheet_add_aoa:Ga,sheet_add_json:Gw,sheet_add_dom:tg,aoa_to_sheet:$a,json_to_sheet:$w,table_to_sheet:ag,table_to_book:ng,sheet_to_csv:Hw,sheet_to_txt:zw,sheet_to_json:Uw,sheet_to_html:rg,sheet_to_formulae:Vw,sheet_to_row_object_array:Uw,sheet_get_cell:jw,book_new:Yw,book_append_sheet:Kw,book_set_sheet_visibility:Zw,cell_set_number_format:Jw,cell_set_hyperlink:qw,cell_set_internal_link:Qw,cell_add_comment:ek,sheet_set_array_formula:rk,consts:{SHEET_VISIBLE:0,SHEET_HIDDEN:1,SHEET_VERY_HIDDEN:2}};var ak;function nk(e){ak=e}function ik(e,r){var t=ak();var a=r==null?{}:r;if(e==null||e["!ref"]==null){t.push(null);return t}var n=Wa(e["!ref"]);var i=a.FS!==undefined?a.FS:",",s=i.charCodeAt(0);var f=a.RS!==undefined?a.RS:"\n",c=f.charCodeAt(0);var l=new RegExp((i=="|"?"\\|":i)+"+$");var o="",u=[];a.dense=Array.isArray(e);var h=a.skipHidden&&e["!cols"]||[];var d=a.skipHidden&&e["!rows"]||[];for(var v=n.s.c;v<=n.e.c;++v)if(!(h[v]||{}).hidden)u[v]=Ra(v);var p=n.s.r;var m=false,b=0;t._read=function(){if(!m){m=true;return t.push("\ufeff")}while(p<=n.e.r){++p;if((d[p-1]||{}).hidden)continue;o=Ww(e,n,p-1,u,s,c,i,a);if(o!=null){if(a.strip)o=o.replace(l,"");if(o||a.blankrows!==false)return t.push((b++?f:"")+o)}}return t.push(null)};return t}function sk(e,r){var t=ak();var a=r||{};var n=a.header!=null?a.header:Jb;var i=a.footer!=null?a.footer:qb;t.push(n);var s=La(e["!ref"]);a.dense=Array.isArray(e);t.push(eg(e,s,a));var f=s.s.r;var c=false;t._read=function(){if(f>s.e.r){if(!c){c=true;t.push("</table>"+i)}return t.push(null)}while(f<=s.e.r){t.push(Zb(e,s,f,a));++f;break}};return t}function fk(e,r){var t=ak({objectMode:true});if(e==null||e["!ref"]==null){t.push(null);return t}var a={t:"n",v:0},n=0,i=1,s=[],f=0,c="";var l={s:{r:0,c:0},e:{r:0,c:0}};var o=r||{};var u=o.range!=null?o.range:e["!ref"];if(o.header===1)n=1;else if(o.header==="A")n=2;else if(Array.isArray(o.header))n=3;switch(typeof u){case"string":l=Wa(u);break;case"number":l=Wa(e["!ref"]);l.s.r=u;break;default:l=u;}if(n>0)i=0;var h=Aa(l.s.r);var d=[];var v=0;var p=Array.isArray(e);var m=l.s.r,b=0;var g={};if(p&&!e[m])e[m]=[];var w=o.skipHidden&&e["!cols"]||[];var k=o.skipHidden&&e["!rows"]||[];for(b=l.s.c;b<=l.e.c;++b){if((w[b]||{}).hidden)continue;d[b]=Ra(b);a=p?e[m][b]:e[d[b]+h];switch(n){case 1:s[b]=b-l.s.c;break;case 2:s[b]=d[b];break;case 3:s[b]=o.header[b-l.s.c];break;default:if(a==null)a={w:"__EMPTY",t:"s"};c=f=za(a,null,o);v=g[f]||0;if(!v)g[f]=1;else{do{c=f+"_"+v++}while(g[c]);g[f]=v;g[c]=1}s[b]=c;}}m=l.s.r+i;t._read=function(){while(m<=l.e.r){if((k[m-1]||{}).hidden)continue;var r=Mw(e,l,m,d,n,s,p,o);++m;if(r.isempty===false||(n===1?o.blankrows!==false:!!o.blankrows)){t.push(r.row);return}}return t.push(null)};return t}var ck={to_json:fk,to_html:sk,to_csv:ik,set_readable:nk};if(typeof Ab!=="undefined")e.parse_xlscfb=Ab;e.parse_zip=cw;e.read=kw;e.readFile=Tw;e.readFileSync=Tw;e.write=Iw;e.writeFile=Dw;e.writeFileSync=Dw;e.writeFileAsync=Lw;e.utils=tk;e.writeXLSX=Nw;e.writeFileXLSX=Pw;e.SSF=Ge;if(typeof ck!=="undefined")e.stream=ck;if(typeof qe!=="undefined")e.CFB=qe;if(typeof require!=="undefined"){var lk=undefined;if((lk||{}).Readable)nk(lk.Readable);try{Qe=undefined}catch(ok){}}}if(typeof exports!=="undefined")make_xlsx_lib(exports);else if(typeof module!=="undefined"&&module.exports)make_xlsx_lib(module.exports);else if(typeof define==="function"&&define.amd)define("xlsx",function(){if(!XLSX.version)make_xlsx_lib(XLSX);return XLSX});else make_xlsx_lib(XLSX);if(typeof window!=="undefined"&&!window.XLSX)try{window.XLSX=XLSX}catch(e){}

(function() {
    var debug = false;
    var root = this;
    var EXIF = function(obj) {
        if (obj instanceof EXIF)
            return obj;
        if (!(this instanceof EXIF))
            return new EXIF(obj);
        this.EXIFwrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }
    var ExifTags = EXIF.Tags = {
        0x9000: "ExifVersion",
        0xA000: "FlashpixVersion",
        0xA001: "ColorSpace",
        0xA002: "PixelXDimension",
        0xA003: "PixelYDimension",
        0x9101: "ComponentsConfiguration",
        0x9102: "CompressedBitsPerPixel",
        0x927C: "MakerNote",
        0x9286: "UserComment",
        0xA004: "RelatedSoundFile",
        0x9003: "DateTimeOriginal",
        0x9004: "DateTimeDigitized",
        0x9290: "SubsecTime",
        0x9291: "SubsecTimeOriginal",
        0x9292: "SubsecTimeDigitized",
        0x829A: "ExposureTime",
        0x829D: "FNumber",
        0x8822: "ExposureProgram",
        0x8824: "SpectralSensitivity",
        0x8827: "ISOSpeedRatings",
        0x8828: "OECF",
        0x9201: "ShutterSpeedValue",
        0x9202: "ApertureValue",
        0x9203: "BrightnessValue",
        0x9204: "ExposureBias",
        0x9205: "MaxApertureValue",
        0x9206: "SubjectDistance",
        0x9207: "MeteringMode",
        0x9208: "LightSource",
        0x9209: "Flash",
        0x9214: "SubjectArea",
        0x920A: "FocalLength",
        0xA20B: "FlashEnergy",
        0xA20C: "SpatialFrequencyResponse",
        0xA20E: "FocalPlaneXResolution",
        0xA20F: "FocalPlaneYResolution",
        0xA210: "FocalPlaneResolutionUnit",
        0xA214: "SubjectLocation",
        0xA215: "ExposureIndex",
        0xA217: "SensingMethod",
        0xA300: "FileSource",
        0xA301: "SceneType",
        0xA302: "CFAPattern",
        0xA401: "CustomRendered",
        0xA402: "ExposureMode",
        0xA403: "WhiteBalance",
        0xA404: "DigitalZoomRation",
        0xA405: "FocalLengthIn35mmFilm",
        0xA406: "SceneCaptureType",
        0xA407: "GainControl",
        0xA408: "Contrast",
        0xA409: "Saturation",
        0xA40A: "Sharpness",
        0xA40B: "DeviceSettingDescription",
        0xA40C: "SubjectDistanceRange",
        0xA005: "InteroperabilityIFDPointer",
        0xA420: "ImageUniqueID"
    };
    var TiffTags = EXIF.TiffTags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x8769: "ExifIFDPointer",
        0x8825: "GPSInfoIFDPointer",
        0xA005: "InteroperabilityIFDPointer",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x011C: "PlanarConfiguration",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x0128: "ResolutionUnit",
        0x0111: "StripOffsets",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x0201: "JPEGInterchangeFormat",
        0x0202: "JPEGInterchangeFormatLength",
        0x012D: "TransferFunction",
        0x013E: "WhitePoint",
        0x013F: "PrimaryChromaticities",
        0x0211: "YCbCrCoefficients",
        0x0214: "ReferenceBlackWhite",
        0x0132: "DateTime",
        0x010E: "ImageDescription",
        0x010F: "Make",
        0x0110: "Model",
        0x0131: "Software",
        0x013B: "Artist",
        0x8298: "Copyright"
    };
    var GPSTags = EXIF.GPSTags = {
        0x0000: "GPSVersionID",
        0x0001: "GPSLatitudeRef",
        0x0002: "GPSLatitude",
        0x0003: "GPSLongitudeRef",
        0x0004: "GPSLongitude",
        0x0005: "GPSAltitudeRef",
        0x0006: "GPSAltitude",
        0x0007: "GPSTimeStamp",
        0x0008: "GPSSatellites",
        0x0009: "GPSStatus",
        0x000A: "GPSMeasureMode",
        0x000B: "GPSDOP",
        0x000C: "GPSSpeedRef",
        0x000D: "GPSSpeed",
        0x000E: "GPSTrackRef",
        0x000F: "GPSTrack",
        0x0010: "GPSImgDirectionRef",
        0x0011: "GPSImgDirection",
        0x0012: "GPSMapDatum",
        0x0013: "GPSDestLatitudeRef",
        0x0014: "GPSDestLatitude",
        0x0015: "GPSDestLongitudeRef",
        0x0016: "GPSDestLongitude",
        0x0017: "GPSDestBearingRef",
        0x0018: "GPSDestBearing",
        0x0019: "GPSDestDistanceRef",
        0x001A: "GPSDestDistance",
        0x001B: "GPSProcessingMethod",
        0x001C: "GPSAreaInformation",
        0x001D: "GPSDateStamp",
        0x001E: "GPSDifferential"
    };
    var StringValues = EXIF.StringValues = {
        ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0x0000: "Flash did not fire",
            0x0001: "Flash fired",
            0x0005: "Strobe return light not detected",
            0x0007: "Strobe return light detected",
            0x0009: "Flash fired, compulsory flash mode",
            0x000D: "Flash fired, compulsory flash mode, return light not detected",
            0x000F: "Flash fired, compulsory flash mode, return light detected",
            0x0010: "Flash did not fire, compulsory flash mode",
            0x0018: "Flash did not fire, auto mode",
            0x0019: "Flash fired, auto mode",
            0x001D: "Flash fired, auto mode, return light not detected",
            0x001F: "Flash fired, auto mode, return light detected",
            0x0020: "No flash function",
            0x0041: "Flash fired, red-eye reduction mode",
            0x0045: "Flash fired, red-eye reduction mode, return light not detected",
            0x0047: "Flash fired, red-eye reduction mode, return light detected",
            0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059: "Flash fired, auto mode, red-eye reduction mode",
            0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        }
    };
    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }
    function imageHasData(img) {
        return !!(img.exifdata);
    }
    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || '';
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }
    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        }
        ;
        http.send();
    }
    function getImageData(img, callback) {
        var fileReader = new FileReader();
        var handleBinaryFile = function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            if (callback) {
                callback(img);
            }
        };
        if (img.src) {
            if (/^data\:/i.test(img.src)) {
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);
            } else if (/^blob\:/i.test(img.src)) {
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                }
                ;
                objectURLToBlob(img.src, function(blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                }
                ;
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
            fileReader.onload = function(e) {
                if (debug)
                    console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            }
            ;
            fileReader.readAsArrayBuffer(img);
        }
    }
    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);
        if (debug)
            console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug)
                console.log("Not a valid JPEG");
            return false;
        }
        var offset = 2, length = file.byteLength, marker;
        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug)
                    console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false;
            }
            marker = dataView.getUint8(offset + 1);
            if (debug)
                console.log(marker);
            if (marker == 225) {
                if (debug)
                    console.log("Found 0xFFE1 marker");
                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
            } else {
                offset += 2 + dataView.getUint16(offset + 2);
            }
        }
    }
    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);
        if (debug)
            console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug)
                console.log("Not a valid JPEG");
            return false;
        }
        var offset = 2
          , length = file.byteLength;
        var isFieldSegmentStart = function(dataView, offset) {
            return (dataView.getUint8(offset) === 0x38 && dataView.getUint8(offset + 1) === 0x42 && dataView.getUint8(offset + 2) === 0x49 && dataView.getUint8(offset + 3) === 0x4D && dataView.getUint8(offset + 4) === 0x04 && dataView.getUint8(offset + 5) === 0x04);
        };
        while (offset < length) {
            if (isFieldSegmentStart(dataView, offset)) {
                var nameHeaderLength = dataView.getUint8(offset + 7);
                if (nameHeaderLength % 2 !== 0)
                    nameHeaderLength += 1;
                if (nameHeaderLength === 0) {
                    nameHeaderLength = 4;
                }
                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
                return readIPTCData(file, startOffset, sectionLength);
            }
            offset++;
        }
    }
    var IptcFieldMap = {
        0x78: 'caption',
        0x6E: 'credit',
        0x19: 'keywords',
        0x37: 'dateCreated',
        0x50: 'byline',
        0x55: 'bylineTitle',
        0x7A: 'captionWriter',
        0x69: 'headline',
        0x74: 'copyright',
        0x0F: 'category'
    };
    function readIPTCData(file, startOffset, sectionLength) {
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while (segmentStartPos < startOffset + sectionLength) {
            if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
                segmentType = dataView.getUint8(segmentStartPos + 2);
                if (segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos + 3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
                    if (data.hasOwnProperty(fieldName)) {
                        if (data[fieldName]instanceof Array) {
                            data[fieldName].push(fieldValue);
                        } else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    } else {
                        data[fieldName] = fieldValue;
                    }
                }
            }
            segmentStartPos++;
        }
        return data;
    }
    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd), tags = {}, entryOffset, tag, i;
        for (i = 0; i < entries; i++) {
            entryOffset = dirStart + i * 12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug)
                console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }
    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset + 2, !bigEnd), numValues = file.getUint32(entryOffset + 4, !bigEnd), valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart, offset, vals, val, n, numerator, denominator;
        switch (type) {
        case 1:
        case 7:
            if (numValues == 1) {
                return file.getUint8(entryOffset + 8, !bigEnd);
            } else {
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                vals = [];
                for (n = 0; n < numValues; n++) {
                    vals[n] = file.getUint8(offset + n);
                }
                return vals;
            }
            break;
        case 2:
            offset = numValues > 4 ? valueOffset : (entryOffset + 8);
            return getStringFromDB(file, offset, numValues - 1);
        case 3:
            if (numValues == 1) {
                return file.getUint16(entryOffset + 8, !bigEnd);
            } else {
                offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                vals = [];
                for (n = 0; n < numValues; n++) {
                    vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
                }
                return vals;
            }
            break;
        case 4:
            if (numValues == 1) {
                return file.getUint32(entryOffset + 8, !bigEnd);
            } else {
                vals = [];
                for (n = 0; n < numValues; n++) {
                    vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
                }
                return vals;
            }
            break;
        case 5:
            if (numValues == 1) {
                numerator = file.getUint32(valueOffset, !bigEnd);
                denominator = file.getUint32(valueOffset + 4, !bigEnd);
                val = numerator / denominator;
                val.numerator = numerator;
                val.denominator = denominator;
                return val;
            } else {
                vals = [];
                for (n = 0; n < numValues; n++) {
                    numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
                    denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
                    vals[n] = numerator / denominator;
                    vals[n].numerator = numerator;
                    vals[n].denominator = denominator;
                }
                return vals;
            }
            break;
        case 9:
            if (numValues == 1) {
                return file.getInt32(entryOffset + 8, !bigEnd);
            } else {
                vals = [];
                for (n = 0; n < numValues; n++) {
                    vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
                }
                return vals;
            }
            break;
        case 10:
            if (numValues == 1) {
                return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
            } else {
                vals = [];
                for (n = 0; n < numValues; n++) {
                    vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
                }
                return vals;
            }
        }
    }
    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        var n;
        for (n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }
    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug)
                console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }
        var bigEnd, tags, tag, exifData, gpsData, tiffOffset = start + 6;
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug)
                console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }
        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
            if (debug)
                console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }
        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
        if (firstIFDOffset < 0x00000008) {
            if (debug)
                console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
            return false;
        }
        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                case "LightSource":
                case "Flash":
                case "MeteringMode":
                case "ExposureProgram":
                case "SensingMethod":
                case "SceneCaptureType":
                case "SceneType":
                case "CustomRendered":
                case "WhiteBalance":
                case "GainControl":
                case "Contrast":
                case "Saturation":
                case "Sharpness":
                case "SubjectDistanceRange":
                case "FileSource":
                    exifData[tag] = StringValues[tag][exifData[tag]];
                    break;
                case "ExifVersion":
                case "FlashpixVersion":
                    exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                    break;
                case "ComponentsConfiguration":
                    exifData[tag] = StringValues.Components[exifData[tag][0]] + StringValues.Components[exifData[tag][1]] + StringValues.Components[exifData[tag][2]] + StringValues.Components[exifData[tag][3]];
                    break;
                }
                tags[tag] = exifData[tag];
            }
        }
        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                case "GPSVersionID":
                    gpsData[tag] = gpsData[tag][0] + "." + gpsData[tag][1] + "." + gpsData[tag][2] + "." + gpsData[tag][3];
                    break;
                }
                tags[tag] = gpsData[tag];
            }
        }
        return tags;
    }
    EXIF.getData = function(img, callback) {
        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete)
            return false;
        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback(img);
            }
        }
        return true;
    }
    ;
    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img))
            return;
        return img.exifdata[tag];
    }
    ;
    EXIF.getAllTags = function(img) {
        if (!imageHasData(img))
            return {};
        var a, data = img.exifdata, tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    ;
    EXIF.pretty = function(img) {
        if (!imageHasData(img))
            return "";
        var a, data = img.exifdata, strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a]instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }
    ;
    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }
    ;
    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}
.call(this));

var decoderWorkerBlob=function decoderWorkerBlob(){function Rotate(data,width,height,rotation){var newData=[];var x,y;switch(rotation){case 90:for(x=0;x<width*4;x+=4){for(y=width*4*(height-1);y>=0;y-=width*4){newData.push(data[x+y]);newData.push(data[x+y+1]);newData.push(data[x+y+2]);newData.push(data[x+y+3])}}break;case-90:for(x=width*4-4;x>=0;x-=4){for(y=0;y<data.length;y+=width*4){newData.push(data[x+y]);newData.push(data[x+y+1]);newData.push(data[x+y+2]);newData.push(data[x+y+3])}}break;case 180:for(y=width*4*(height-1);y>=0;y-=width*4){for(x=width*4-4;x>=0;x-=4){newData.push(data[x+y]);newData.push(data[x+y+1]);newData.push(data[x+y+2]);newData.push(data[x+y+3])}}}return new Uint8ClampedArray(newData)}function BoxFilter(data,width,radius){var elements=[];var sum=[];var val;var x,y,i;for(x=0;x<width;x++){elements.push([]);sum.push(0);for(y=0;y<(radius+1)*width;y+=width){elements[elements.length-1].push(data[x+y]);sum[sum.length-1]=sum[sum.length-1]+data[x+y]}}var newData=[];for(y=0;y<data.length;y+=width){for(x=0;x<width;x++){var newVal=0;var length=0;for(i=x;i>=0;i--){newVal+=sum[i];length++;if(length===radius+1)break}var tempLength=0;for(i=x+1;i<width;i++){newVal+=sum[i];length++;tempLength++;if(tempLength===radius)break}length*=elements[0].length;newVal/=length;newData.push(newVal)}if(y-radius*width>=0){for(i=0;i<elements.length;i++){val=elements[i].shift();sum[i]=sum[i]-val}}if(y+(radius+1)*width<data.length){for(i=0;i<elements.length;i++){val=data[i+y+(radius+1)*width];elements[i].push(val);sum[i]=sum[i]+val}}}return newData}function Scale(data,width,height){var newData=[];var x,y;for(y=0;y<data.length;y+=width*8){for(x=0;x<width*4;x+=8){var r=(data[y+x]+data[y+x+4]+data[y+width*4+x]+data[y+width*4+x+4])/4;newData.push(r);var g=(data[y+x+1]+data[y+x+4+1]+data[y+width*4+x+1]+data[y+width*4+x+4+1])/4;newData.push(g);var b=(data[y+x+2]+data[y+x+4+2]+data[y+width*4+x+2]+data[y+width*4+x+4+2])/4;newData.push(b);newData.push(255)}}return new Uint8ClampedArray(newData)}function IntensityGradient(data,width){var newData=[];var max=Number.MIN_VALUE;var min=Number.MAX_VALUE;var x,y,i;for(y=0;y<data.length;y+=width*4){for(x=0;x<width*4;x+=4){var horizontalDiff=0;var verticalDiff=0;for(i=1;i<2;i++){if(x+i*4<width*4){horizontalDiff=horizontalDiff+Math.abs(data[y+x]-data[y+x+i*4])}if(y+width*4*i<data.length){verticalDiff+=verticalDiff+Math.abs(data[y+x]-data[y+x+width*4*i])}}var diff=horizontalDiff-verticalDiff;max=diff>max?diff:max;min=diff<min?diff:min;newData.push(diff)}}if(min<0){for(i=0;i<newData.length;i++){newData[i]=newData[i]-min}min=0}return newData}function greyScale(data){var i;for(i=0;i<data.length;i+=4){var max=0;var min=255;max=data[i]>max?data[i]:max;max=data[i+1]>max?data[i+1]:max;max=data[i+2]>max?data[i+2]:max;min=data[i]<min?data[i]:min;min=data[i+1]<min?data[i+1]:min;min=data[i+2]<min?data[i+2]:min;data[i]=data[i+1]=data[i+2]=(max+min)/2}}function histogram(data){var i;var hist=[];for(i=0;i<256;i++){hist[i]=0}for(i=0;i<data.length;i+=4){hist[data[i]]=hist[data[i]]+1}return hist}function otsu(histogram,total){var i;var sum=0;for(i=1;i<histogram.length;++i)sum+=i*histogram[i];var sumB=0;var wB=0;var wF=0;var mB;var mF;var max=0.0;var between=0.0;var threshold1=0.0;var threshold2=0.0;for(i=0;i<histogram.length;++i){wB+=histogram[i];if(wB===0)continue;wF=total-wB;if(wF===0)break;sumB+=i*histogram[i];mB=sumB/wB;mF=(sum-sumB)/wF;between=wB*wF*Math.pow(mB-mF,2);if(between>=max){threshold1=i;if(between>max){threshold2=i}max=between}}return(threshold1+threshold2)/2.0}function CreateImageData(){Image.data=new Uint8ClampedArray(Image.width*Image.height*4);var Converter;var x,y;for(y=0;y<Image.height;y++){for(x=0;x<Image.width;x++){Converter=y*4*Image.width;Image.data[Converter+x*4]=Image.table[x][y][0];Image.data[Converter+x*4+1]=Image.table[x][y][1];Image.data[Converter+x*4+2]=Image.table[x][y][2];Image.data[Converter+x*4+3]=Image.table[x][y][3]}}}function CreateScanImageData(){ScanImage.data=new Uint8ClampedArray(ScanImage.width*ScanImage.height*4);var Converter;var x,y;for(y=0;y<ScanImage.height;y++){for(x=0;x<ScanImage.width;x++){Converter=y*4*ScanImage.width;ScanImage.data[Converter+x*4]=ScanImage.table[x][y][0];ScanImage.data[Converter+x*4+1]=ScanImage.table[x][y][1];ScanImage.data[Converter+x*4+2]=ScanImage.table[x][y][2];ScanImage.data[Converter+x*4+3]=ScanImage.table[x][y][3]}}}function CreateTable(){Image.table=[];var tempArray=[];var i,j;for(i=0;i<Image.width*4;i+=4){tempArray=[];for(j=i;j<Image.data.length;j+=Image.width*4){tempArray.push([Image.data[j],Image.data[j+1],Image.data[j+2],Image.data[j+3]])}Image.table.push(tempArray)}}function CreateScanTable(){ScanImage.table=[];var tempArray=[];var i,j;for(i=0;i<ScanImage.width*4;i+=4){tempArray=[];for(j=i;j<ScanImage.data.length;j+=ScanImage.width*4){tempArray.push([ScanImage.data[j],ScanImage.data[j+1],ScanImage.data[j+2],ScanImage.data[j+3]])}ScanImage.table.push(tempArray)}}function EnlargeTable(h,w){var TempArray=[];var x,y,i;for(x=0;x<Image.width;x++){TempArray=[];for(y=0;y<Image.height;y++){for(i=0;i<h;i++){TempArray.push(Image.table[x][y])}}Image.table[x]=TempArray.slice()}TempArray=Image.table.slice();for(x=0;x<Image.width;x++){for(i=0;i<w;i++){Image.table[x*w+i]=TempArray[x].slice()}}Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}function ScaleHeight(scale){var tempArray=[];var avrgRed=0;var avrgGreen=0;var avrgBlue=0;var i,j,k;for(i=0;i<Image.height-scale;i+=scale){for(j=0;j<Image.width;j++){avrgRed=0;avrgGreen=0;avrgBlue=0;for(k=i;k<i+scale;k++){avrgRed+=Image.table[j][k][0];avrgGreen+=Image.table[j][k][1];avrgBlue+=Image.table[j][k][2]}tempArray.push(avrgRed/scale);tempArray.push(avrgGreen/scale);tempArray.push(avrgBlue/scale);tempArray.push(255)}}return new Uint8ClampedArray(tempArray)}function Intersects(rectOne,rectTwo){return(rectOne[0][0]<=rectTwo[0][1]&&rectTwo[0][0]<=rectOne[0][1]&&rectOne[1][0]<=rectTwo[1][1]&&rectTwo[1][0]<=rectOne[1][1])}function maxLocalization(max,maxPos,data){var originalMax=max;var rects=[];var x,y,i;do{var startX=maxPos%Image.width;var startY=(maxPos-startX)/Image.width;var minY=0;var maxY=Image.height;var minX=0;var maxX=Image.width-1;for(y=startY;y<Image.height-1;y++){if(Image.table[startX][y+1][0]===0){maxY=y;break}}for(y=startY;y>0;y--){if(Image.table[startX][y-1][0]===0){minY=y;break}}for(x=startX;x<Image.width-1;x++){if(Image.table[x+1][startY][0]===0){maxX=x;break}}for(x=startX;x>0;x--){if(Image.table[x-1][startY][0]===0){minX=x;break}}for(y=minY*Image.width;y<=maxY*Image.width;y+=Image.width){for(x=minX;x<=maxX;x++){data[y+x]=0}}var newRect=[[minX,maxX],[minY,maxY]];for(i=0;i<rects.length;i++){if(Intersects(newRect,rects[i])){if(rects[i][0][1]-rects[i][0][0]>newRect[0][1]-newRect[0][0]){rects[i][0][0]=rects[i][0][0]<newRect[0][0]?rects[i][0][0]:newRect[0][0];rects[i][0][1]=rects[i][0][1]>newRect[0][1]?rects[i][0][1]:newRect[0][1];newRect=[];break}else{rects[i][0][0]=rects[i][0][0]<newRect[0][0]?rects[i][0][0]:newRect[0][0];rects[i][0][1]=rects[i][0][1]>newRect[0][1]?rects[i][0][1]:newRect[0][1];rects[i][1][0]=newRect[1][0];rects[i][1][1]=newRect[1][1];newRect=[];break}}}if(newRect.length>0){rects.push(newRect)}max=0;maxPos=0;var newMaxPos=0;for(i=0;i<data.length;i++){if(data[i]>max){max=data[i];maxPos=i}}}while(max>originalMax*0.70);return rects}function ImgProcessing(){greyScale(Image.data);var newData=IntensityGradient(Image.data,Image.width);newData=BoxFilter(newData,Image.width,15);var min=newData[0];var i,x,y;for(i=1;i<newData.length;i++){min=min>newData[i]?newData[i]:min}var max=0;var maxPos=0;var avrgLight=0;for(i=0;i<newData.length;i++){newData[i]=Math.round((newData[i]-min));avrgLight+=newData[i];if(max<newData[i]){max=newData[i];maxPos=i}}avrgLight/=newData.length;if(avrgLight<15){newData=BoxFilter(newData,Image.width,8);min=newData[0];for(i=1;i<newData.length;i++){min=min>newData[i]?newData[i]:min}max=0;maxPos=0;for(i=0;i<newData.length;i++){newData[i]=Math.round((newData[i]-min));if(max<newData[i]){max=newData[i];maxPos=i}}}var hist=[];for(i=0;i<=max;i++){hist[i]=0}for(i=0;i<newData.length;i++){hist[newData[i]]=hist[newData[i]]+1}var thresh=otsu(hist,newData.length);for(i=0;i<newData.length;i++){if(newData[i]<thresh){Image.data[i*4]=Image.data[i*4+1]=Image.data[i*4+2]=0}else{Image.data[i*4]=Image.data[i*4+1]=Image.data[i*4+2]=255}}CreateTable();var rects=maxLocalization(max,maxPos,newData);var feedBack=[];for(i=0;i<rects.length;i++){feedBack.push({x:rects[i][0][0],y:rects[i][1][0],width:rects[i][0][1]-rects[i][0][0],height:rects[i][1][1]-rects[i][1][0]})}if(feedBack.length>0)postMessage({result:feedBack,success:"localization"});allTables=[];for(i=0;i<rects.length;i++){var newTable=[];for(x=rects[i][0][0]*2;x<rects[i][0][1]*2;x++){var tempArray=[];for(y=rects[i][1][0]*2;y<rects[i][1][1]*2;y++){tempArray.push([ScanImage.table[x][y][0],ScanImage.table[x][y][1],ScanImage.table[x][y][2],255])}newTable.push(tempArray)}if(newTable.length<1)continue;Image.table=newTable;Image.width=newTable.length;Image.height=newTable[0].length;CreateImageData();allTables.push({table:newTable,data:new Uint8ClampedArray(Image.data),width:Image.width,height:Image.height})}}function showImage(data,width,height){postMessage({result:data,width:width,height:height,success:"image"})}function Main(){ImgProcessing();var allResults=[];var tempObj;var tempData;var hist;var val;var thresh;var start;var end;var z,i;for(z=0;z<allTables.length;z++){Image=allTables[z];var scaled=ScaleHeight(30);var variationData;var incrmt=0;var format="";var first=true;var eanStatistics={};var eanOrder=[];Selection=false;do{tempData=scaled.subarray(incrmt,incrmt+Image.width*4);hist=[];for(i=0;i<256;i++){hist[i]=0}for(i=0;i<tempData.length;i+=4){val=Math.round((tempData[i]+tempData[i+1]+tempData[i+2])/3);hist[val]=hist[val]+1}thresh=otsu(hist,tempData.length/4);start=thresh<41?1:thresh-40;end=thresh>254-40?254:thresh+40;variationData=yStraighten(tempData,start,end);Selection=BinaryString(variationData);if(Selection.string){format=Selection.format;tempObj=Selection;Selection=Selection.string;if(format==="EAN-13"){if(typeof eanStatistics[Selection]==='undefined'){eanStatistics[Selection]={count:1,correction:tempObj.correction};eanOrder.push(Selection)}else{eanStatistics[Selection].count=eanStatistics[Selection].count+1;eanStatistics[Selection].correction=eanStatistics[Selection].correction+tempObj.correction}Selection=false}}else{Selection=false}incrmt+=Image.width*4}while(!Selection&&incrmt<scaled.length);if(Selection&&format!=="EAN-13")allResults.push({Format:format,Value:Selection});if(format==="EAN-13")Selection=false;if(!Selection){EnlargeTable(4,2);incrmt=0;scaled=ScaleHeight(20);do{tempData=scaled.subarray(incrmt,incrmt+Image.width*4);hist=[];for(i=0;i<256;i++){hist[i]=0}for(i=0;i<tempData.length;i+=4){val=Math.round((tempData[i]+tempData[i+1]+tempData[i+2])/3);hist[val]=hist[val]+1}thresh=otsu(hist,tempData.length/4);start=thresh<40?0:thresh-40;end=thresh>255-40?255:thresh+40;variationData=yStraighten(tempData,start,end);Selection=BinaryString(variationData);if(Selection.string){format=Selection.format;tempObj=Selection;Selection=Selection.string;if(format==="EAN-13"){if(typeof eanStatistics[Selection]==='undefined'){eanStatistics[Selection]={count:1,correction:tempObj.correction};eanOrder.push(Selection)}else{eanStatistics[Selection].count=eanStatistics[Selection].count+1;eanStatistics[Selection].correction=eanStatistics[Selection].correction+tempObj.correction}Selection=false}}else{Selection=false}incrmt+=Image.width*4}while(!Selection&&incrmt<scaled.length);if(format==="EAN-13"){var points={};for(var key in eanStatistics){eanStatistics[key].correction=eanStatistics[key].correction/eanStatistics[key].count;var pointTemp=eanStatistics[key].correction;pointTemp-=eanStatistics[key].count;pointTemp+=eanOrder.indexOf(key);points[key]=pointTemp}var minPoints=Number.POSITIVE_INFINITY;var tempString="";for(var point in points){if(points[point]<minPoints){minPoints=points[point];tempString=key}}if(minPoints<11){Selection=tempString}else{Selection=false}}if(Selection)allResults.push({Format:format,Value:Selection})}if(allResults.length>0&&!Multiple)break}return allResults}function yStraighten(img,start,end){var average=0;var threshold;var newImg=new Uint8ClampedArray(Image.width*(end-start+1)*4);var i,j;for(i=0;i<newImg.length;i++){newImg[i]=255}for(i=0;i<Image.width*4;i+=4){threshold=end;average=(img[i]+img[i+1]+img[i+2])/3;if(i<Image.width*4-4){average+=(img[i+4]+img[i+5]+img[i+6])/3;average/=2}for(j=i;j<newImg.length;j+=Image.width*4){if(average<threshold){newImg[j]=newImg[j+1]=newImg[j+2]=0}threshold--}}return newImg}function CheckEan13(values,middle){if(middle){if(values.length!==5)return false}else{if(values.length!==3)return false}var avrg=0;var i;for(i=0;i<values.length;i++){avrg+=values[i]}avrg/=values.length;for(i=0;i<values.length;i++){if(values[i]/avrg<0.5||values[i]/avrg>1.5)return false}return true}function TwoOfFiveStartEnd(values,start){if(values.length<5||values.length>6)return false;var maximum=0;var TwoOfFiveMax=[0,0];var u;for(u=0;u<values.length;u++){if(values[u]>maximum){maximum=values[u];TwoOfFiveMax[0]=u}}maximum=0;for(u=0;u<values.length;u++){if(u===TwoOfFiveMax[0])continue;if(values[u]>maximum){maximum=values[u];TwoOfFiveMax[1]=u}}if(start){return TwoOfFiveMax[0]+TwoOfFiveMax[1]===2}else{return TwoOfFiveMax[0]+TwoOfFiveMax[1]===2}}function CheckInterleaved(values,start){var average=0;var i;for(i=0;i<values.length;i++){average+=values[i]}average/=4;if(start){if(values.length!==4)return false;for(i=0;i<values.length;i++){if(values[i]/average<0.5||values[i]/average>1.5)return false}return true}else{if(values.length!==3)return false;var max=0;var pos;for(i=0;i<values.length;i++){if(values[i]>max){max=values[i];pos=i}}if(pos!==0)return false;if(values[0]/average<1.5||values[0]/average>2.5)return false;for(i=1;i<values.length;i++){if(values[i]/average<0.5||values[i]/average>1.5)return false}return true}}function BinaryConfiguration(binaryString,type){var result=[];var binTemp=[];var count=0;var bars;var len;var totalBars;var i;if(type==="Code128"||type==="Code93"){totalBars=6;len=binaryString[0];if(type==="Code128")len/=2;for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*6){binaryString.splice(i,binaryString.length);break}}do{if(binaryString.length===7&&type==="Code128"){result.push(binaryString.splice(0,binaryString.length))}else{result.push(binaryString.splice(0,totalBars))}if(type==="Code93"&&binaryString.length<6)binaryString.splice(0,totalBars)}while(binaryString.length>0)}if(type==="Code39"){totalBars=9;len=binaryString[0];for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*5){binaryString.splice(i,binaryString.length);break}}do{result.push(binaryString.splice(0,totalBars));binaryString.splice(0,1)}while(binaryString.length>0)}if(type==="EAN-13"){totalBars=4;len=binaryString[0];var secureCount=0;for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*6){binaryString.splice(i,binaryString.length);break}}if(CheckEan13(binaryString.splice(0,3),false))secureCount++;count=0;do{result.push(binaryString.splice(0,totalBars));count++;if(count===6)if(CheckEan13(binaryString.splice(0,5),true))secureCount++}while(result.length<12&&binaryString.length>0);if(CheckEan13(binaryString.splice(0,3),false))secureCount++;if(secureCount<2)return[]}if(type==="2Of5"){totalBars=5;len=binaryString[0]/2;for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*5){binaryString.splice(i,binaryString.length);break}}var temp=binaryString.splice(0,6);result.push(temp);do{binTemp=[];for(i=0;i<totalBars;i++){binTemp.push(binaryString.splice(0,1)[0])}result.push(binTemp);if(binaryString.length===5)result.push(binaryString.splice(0,5))}while(binaryString.length>0)}if(type==="Inter2Of5"){totalBars=5;len=binaryString[0];for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*5){binaryString.splice(i,binaryString.length);break}}result.push(binaryString.splice(0,4));var binTempWhite=[];do{binTemp=[];binTempWhite=[];for(i=0;i<totalBars;i++){binTemp.push(binaryString.splice(0,1)[0]);binTempWhite.push(binaryString.splice(0,1)[0])}result.push(binTemp);result.push(binTempWhite);if(binaryString.length===3)result.push(binaryString.splice(0,3))}while(binaryString.length>0)}if(type==="Codabar"){totalBars=7;len=binaryString[0];for(i=0;i<binaryString.length;i++){if(binaryString[i]>len*5){binaryString.splice(i,binaryString.length);break}}do{result.push(binaryString.splice(0,totalBars));binaryString.splice(0,1)}while(binaryString.length>0)}return result}function BinaryString(img,type){var binaryString=[];var binTemp=[];var container=255;var count=0;var format;var tempString;var j,i;for(j=0;j<img.length-Image.width*4;j+=Image.width*4){var SlicedArray=img.subarray(j,j+Image.width*4);binaryString=[];i=0;while(SlicedArray[i]===255){i+=4}while(i<SlicedArray.length){count=0;container=SlicedArray[i];while(SlicedArray[i]===container&&i<SlicedArray.length){count++;i+=4}binaryString.push(count)}if(binaryString.length>2&&binaryString[0]<=binaryString[1]/10){binaryString.splice(0,2)}var binaryHolder=binaryString.slice();var success=false;for(i=0;i<FormatPriority.length;i++){binaryString=binaryHolder.slice();var first;var second;binaryString=BinaryConfiguration(binaryString,FormatPriority[i]);if(FormatPriority[i]==="2Of5"||FormatPriority[i]==="Inter2Of5"){first=binaryString.splice(0,1)[0];second=binaryString.splice(binaryString.length-1,1)[0]}binTemp=Distribution(binaryString,FormatPriority[i]);if(FormatPriority[i]==="EAN-13"){binaryString=binTemp.data;corrections=binTemp.correction}else{binaryString=binTemp}if(typeof binaryString==='undefined')continue;if(binaryString.length>4||(FormatPriority[i]==="Code39"&&binaryString.length>2)){if(FormatPriority[i]==="Code128"){if(CheckCode128(binaryString)){binaryString=DecodeCode128(binaryString);success=true}}else if(FormatPriority[i]==="Code93"){if(CheckCode93(binaryString)){binaryString=DecodeCode93(binaryString);success=true}}else if(FormatPriority[i]==="Code39"){if(CheckCode39(binaryString)){binaryString=DecodeCode39(binaryString);success=true}}else if(FormatPriority[i]==="EAN-13"){tempString=DecodeEAN13(binaryString);if(tempString){if(tempString.length===13){binaryString=tempString;success=true}}}else if(FormatPriority[i]==="2Of5"||FormatPriority[i]==="Inter2Of5"){if(FormatPriority[i]==="2Of5"){if(typeof first!=='undefined')if(!TwoOfFiveStartEnd(first,true))continue;if(typeof second!=='undefined')if(!TwoOfFiveStartEnd(second,false))continue}if(FormatPriority[i]==="Inter2Of5"){if(typeof first!=='undefined')if(!CheckInterleaved(first,true))continue;if(typeof second!=='undefined')if(!CheckInterleaved(second,false))continue}tempString=Decode2Of5(binaryString);if(tempString){binaryString=tempString;success=true}}else if(FormatPriority[i]==="Codabar"){tempString=DecodeCodaBar(binaryString);if(tempString){binaryString=tempString;success=true}}}if(success){format=FormatPriority[i];if(format==="Inter2Of5")format="Interleaved 2 of 5";if(format==="2Of5")format="Standard 2 of 5";break}}if(success)break}if(format==="Code128"){if(typeof binaryString.string==='string'){return binaryString}else{return{string:false}}}if(typeof binaryString==='string'){if(format==="EAN-13"){return{string:binaryString,format:format,correction:corrections}}else{return{string:binaryString,format:format}}}else{return{string:false}}}function Distribution(totalBinArray,type){var testData=0;var result=[];var totalBars;var total;var maxLength;var k,i,j;var blackMax;var whiteMax;var wideAvrg;var narrowAvrg;var prevPos;var wideValues;var max;type=availableFormats.indexOf(type);if(type===0){total=11;totalBars=6;maxLength=4}else if(type===1){total=9;totalBars=6;maxLength=4}else if(type===2){total=12;totalBars=9}else if(type===3){total=7;totalBars=4;maxLength=4}else if(type===6){totalBars=7}for(k=0;k<totalBinArray.length;k++){var BinArray=totalBinArray[k];var sum=0;var counter=0;var tempBin=[];var narrowArr=[];var wideArr=[];if(type===6){var upperTolerance=1.5;var lowerTolerance=1/2;if(BinArray.length!==7)return[];if(k===0||k===totalBinArray.length-1){whiteMax=[[0,0],[0,0]];blackMax=[0,0];for(i=0;i<BinArray.length;i++){if(i%2===0){if(BinArray[i]>blackMax[0]){blackMax[0]=BinArray[i];blackMax[1]=i}}else{if(BinArray[i]>whiteMax[0][0]){whiteMax[0][0]=BinArray[i];prevPos=whiteMax[0][1];whiteMax[0][1]=i;i=prevPos-1;continue}if(BinArray[i]>whiteMax[1][0]&&i!==whiteMax[0][1]){whiteMax[1][0]=BinArray[i];whiteMax[1][1]=i}}}if(SecureCodabar){wideAvrg=whiteMax[0][0]+whiteMax[1][0]+blackMax[0];wideAvrg/=3;wideValues=[whiteMax[0][0],whiteMax[1][0],blackMax[0]];for(i=0;i<wideValues.length;i++){if(wideValues[i]/wideAvrg>upperTolerance||wideValues[i]/wideAvrg<lowerTolerance)return[]}narrowAvrg=0;for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[0][1]||i===whiteMax[1][1])continue;narrowAvrg+=BinArray[i]}narrowAvrg/=4;for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[0][1]||i===whiteMax[1][1])continue;if(BinArray[i]/narrowAvrg>upperTolerance||BinArray[i]/narrowAvrg<lowerTolerance)return[]}}for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[0][1]||i===whiteMax[1][1]){tempBin.push(1)}else{tempBin.push(0)}}}else{blackMax=[0,0];whiteMax=[0,0];for(i=0;i<BinArray.length;i++){if(i%2===0){if(BinArray[i]>blackMax[0]){blackMax[0]=BinArray[i];blackMax[1]=i}}else{if(BinArray[i]>whiteMax[0]){whiteMax[0]=BinArray[i];whiteMax[1]=i}}}if(blackMax[0]/whiteMax[0]>1.55){var tempArray=blackMax;blackMax=[tempArray,[0,0],[0,0]];for(i=0;i<BinArray.length;i++){if(i%2===0){if(BinArray[i]>blackMax[1][0]&&i!==blackMax[0][1]){blackMax[1][0]=BinArray[i];prevPos=blackMax[1][1];blackMax[1][1]=i;i=prevPos-1;continue}if(BinArray[i]>blackMax[2][0]&&i!==blackMax[0][1]&&i!==blackMax[1][1]){blackMax[2][0]=BinArray[i];blackMax[2][1]=i}}}if(SecureCodabar){wideAvrg=blackMax[0][0]+blackMax[1][0]+blackMax[2][0];wideAvrg/=3;for(i=0;i<blackMax.length;i++){if(blackMax[i][0]/wideAvrg>upperTolerance||blackMax[i][0]/wideAvrg<lowerTolerance)return[]}narrowAvrg=0;for(i=0;i<BinArray.length;i++){if(i===blackMax[0][1]||i===blackMax[1][1]||i===blackMax[2][1])continue;narrowAvrg+=BinArray[i]}narrowAvrg/=4;for(i=0;i<BinArray.length;i++){if(i===blackMax[0][1]||i===blackMax[1][1]||i===blackMax[2][1])continue;if(BinArray[i]/narrowAvrg>upperTolerance||BinArray[i]/narrowAvrg<lowerTolerance)return[]}}for(i=0;i<BinArray.length;i++){if(i===blackMax[0][1]||i===blackMax[1][1]||i===blackMax[2][1]){tempBin.push(1)}else{tempBin.push(0)}}}else{if(SecureCodabar){wideAvrg=blackMax[0]+whiteMax[0];wideAvrg/=2;if(blackMax[0]/wideAvrg>1.5||blackMax[0]/wideAvrg<0.5)return[];if(whiteMax[0]/wideAvrg>1.5||whiteMax[0]/wideAvrg<0.5)return[];narrowAvrg=0;for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[1])continue;narrowAvrg+=BinArray[i]}narrowAvrg/=5;for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[1])continue;if(BinArray[i]/narrowAvrg>upperTolerance||BinArray[i]/narrowAvrg<lowerTolerance)return[]}}for(i=0;i<BinArray.length;i++){if(i===blackMax[1]||i===whiteMax[1]){tempBin.push(1)}else{tempBin.push(0)}}}}result.push(tempBin);continue}if(type===4||type===5){max=[[0,0],[0,0]];for(i=0;i<BinArray.length;i++){if(!isFinite(BinArray[i]))return[];if(BinArray[i]>max[0][0]){max[0][0]=BinArray[i];prevPos=max[0][1];max[0][1]=i;i=prevPos-1}if(BinArray[i]>max[1][0]&&i!==max[0][1]){max[1][0]=BinArray[i];max[1][1]=i}}if(Secure2Of5){wideAvrg=max[0][0]+max[1][0];wideAvrg/=2;if(max[0][0]/wideAvrg>1.3||max[0][0]/wideAvrg<0.7)return[];if(max[1][0]/wideAvrg>1.3||max[1][0]/wideAvrg<0.7)return[];narrowAvrg=0;for(i=0;i<BinArray.length;i++){if(i===max[0][1]||i===max[1][1])continue;narrowAvrg+=BinArray[i]}narrowAvrg/=3;for(i=0;i<BinArray.length;i++){if(i===max[0][1]||i===max[1][1])continue;if(BinArray[i]/narrowAvrg>1.3||BinArray[i]/narrowAvrg<0.7)return[]}}for(i=0;i<BinArray.length;i++){if(i===max[0][1]||i===max[1][1]){tempBin.push(1);continue}tempBin.push(0)}result.push(tempBin);continue}while(counter<totalBars){sum+=BinArray[counter];counter++}if(type===2){var indexCount=[];blackMax=[[0,0],[0,0]];whiteMax=[0,0];for(j=0;j<BinArray.length;j++){if(j%2===0){if(BinArray[j]>blackMax[0][0]){blackMax[0][0]=BinArray[j];prevPos=blackMax[0][1];blackMax[0][1]=j;j=prevPos}if(BinArray[j]>blackMax[1][0]&&j!==blackMax[0][1]){blackMax[1][0]=BinArray[j];blackMax[1][1]=j}}else{if(BinArray[j]>whiteMax[0]){whiteMax[0]=BinArray[j];whiteMax[1]=j}}}if(whiteMax[0]/blackMax[0][0]>1.5&&whiteMax[0]/blackMax[1][0]>1.5){blackMax=[[0,0],[0,0]];for(j=0;j<BinArray.length;j++){if(j%2!==0){if(BinArray[j]>blackMax[0][0]&&j!==whiteMax[1]){blackMax[0][0]=BinArray[j];prevPos=blackMax[0][1];blackMax[0][1]=j;j=prevPos}if(BinArray[j]>blackMax[1][0]&&j!==blackMax[0][1]&&j!==whiteMax[1]){blackMax[1][0]=BinArray[j];blackMax[1][1]=j}}}}wideAvrg=blackMax[0][0]+blackMax[1][0]+whiteMax[0];wideAvrg/=3;if(blackMax[0][0]/wideAvrg>1.6||blackMax[0][0]/wideAvrg<0.4)return[];if(blackMax[1][0]/wideAvrg>1.6||blackMax[1][0]/wideAvrg<0.4)return[];if(whiteMax[0]/wideAvrg>1.6||whiteMax[0]/wideAvrg<0.4)return[];narrowAvrg=0;for(i=0;i<BinArray.length;i++){if(i===blackMax[0][1]||i===blackMax[1][1]||i===whiteMax[1])continue;narrowAvrg+=BinArray[i]}narrowAvrg/=6;for(i=0;i<BinArray.length;i++){if(i===blackMax[0][1]||i===blackMax[1][1]||i===whiteMax[1])continue;if(BinArray[i]/narrowAvrg>1.6||BinArray[i]/narrowAvrg<0.4)return[]}for(j=0;j<BinArray.length;j++){if(j===blackMax[0][1]||j===blackMax[1][1]||j===whiteMax[1]){tempBin.push(2)}else{tempBin.push(1)}}result.push(tempBin);continue}if(type===3){max=[[0,0],[0,0],[0,0]];for(j=0;j<BinArray.length;j++){if(BinArray[j]>max[0][0]){max[0][0]=BinArray[j];prevPos=max[0][1];max[0][1]=j;j=prevPos}if(BinArray[j]>max[1][0]&&j!==max[0][1]){max[1][0]=BinArray[j];prevPos=max[1][1];max[1][1]=j;j=prevPos}if(BinArray[j]>max[2][0]&&j!==max[0][1]&&j!==max[1][1]){max[2][0]=BinArray[j];max[2][1]=j}}if(max[0][0]/max[1][0]>=3){narrowAvrg=0;for(j=0;j<BinArray.length;j++){if(j===max[0][1])continue;narrowAvrg+=BinArray[j]}narrowAvrg/=3;for(j=0;j<BinArray.length;j++){if(j===max[0][1])continue;if(BinArray[j]/narrowAvrg<0.02||BinArray[j]/narrowAvrg>3)return{data:[],correction:0}}if(max[0][0]/narrowAvrg<2.2||max[0][0]/narrowAvrg>6)return{data:[],correction:0};for(j=0;j<BinArray.length;j++){if(j===max[0][1]){tempBin.push(4)}else{tempBin.push(1)}}result.push(tempBin)}else if(max[0][0]/max[2][0]>2){wideAvrg=max[0][0]+max[1][0];wideAvrg/=5;if(max[0][0]/(wideAvrg*3)<0.02||max[0][0]/(wideAvrg*3)>3)return{data:[],correction:0};if(max[1][0]/(wideAvrg*2)<0.02||max[1][0]/(wideAvrg*2)>3)return{data:[],correction:0};narrowAvrg=0;for(j=0;j<BinArray.length;j++){if(j===max[0][1]||j===max[1][1])continue;narrowAvrg+=BinArray[j]}narrowAvrg/=2;for(j=0;j<BinArray.length;j++){if(j===max[0][1]||j===max[1][1])continue;if(BinArray[j]/narrowAvrg<0.02||BinArray[j]/narrowAvrg>3)return{data:[],correction:0}}for(j=0;j<BinArray.length;j++){if(j===max[0][1]){tempBin.push(3)}else if(j===max[1][1]){tempBin.push(2)}else{tempBin.push(1)}}result.push(tempBin)}else{if(max[0][1]%2===max[1][1]%2&&max[0][1]%2===max[2][1]%2){var modMem=max[0][1]%2;max[2]=[0,0];for(j=0;j<BinArray.length;j++){if(j%2===modMem)continue;if(BinArray[j]>max[2][0]){max[2][0]=BinArray[j];max[2][1]=j}}}wideAvrg=max[0][0]+max[1][0]+max[2][0];wideAvrg/=3;for(j=0;j<max.length;j++){if(max[j][0]/wideAvrg<0.02||max[j][0]/wideAvrg>3)return{data:[],correction:0}}var narrow=0;for(j=0;j<BinArray.length;j++){if(j===max[0][1]||j===max[1][1]||j===max[2][1])continue;narrow=BinArray[j]}if(wideAvrg/narrow<0.02||wideAvrg/narrow>3)return{data:[],correction:0};for(j=0;j<BinArray.length;j++){if(j===max[0][1]||j===max[1][1]||j===max[2][1]){tempBin.push(2)}else{tempBin.push(1)}}result.push(tempBin)}for(j=0;j<tempBin.length;j++){testData+=Math.abs(tempBin[j]-(BinArray[j]/sum)*total)}continue}counter=0;while(counter<totalBars){tempBin.push((BinArray[counter]/sum)*total);counter++}counter=0;while(counter<totalBars){tempBin[counter]=tempBin[counter]>maxLength?maxLength:tempBin[counter];tempBin[counter]=tempBin[counter]<1?1:tempBin[counter];tempBin[counter]=Math.round(tempBin[counter]);counter++}if(type===3){var checking=0;for(i=0;i<tempBin.length;i++){checking+=tempBin[i]}if(checking>7){max=0;var hitIndex=0;for(i=0;i<tempBin.length;i++){if(tempBin[i]>max){max=tempBin[i];hitIndex=i}}tempBin[hitIndex]=max-(checking-7)}}if(type===3){for(i=0;i<tempBin.length;i++){testData+=Math.abs(tempBin[i]-(BinArray[i]/sum)*total)}}result.push(tempBin)}if(type===3){return{data:result,correction:testData}}else{return result}}function CheckCode128(string){var checksum=string[string.length-2].join("");var i;checksum=Code128Encoding.value.indexOf(checksum);if(checksum===-1)return false;var summarizer=Code128Encoding.value.indexOf(string[0].join(""));if(summarizer===-1)return false;var startChar=Code128Encoding[string[0].join("")];if(typeof startChar==='undefined')return false;if(startChar!=="A"&&startChar!=="B"&&startChar!=="C")return false;for(i=1;i<(string.length-2);i++){summarizer+=Code128Encoding.value.indexOf(string[i].join(""))*i;if(Code128Encoding.value.indexOf(string[i].join(""))===-1)return false}return(summarizer%103===checksum)}function Decode2Of5(string){var result="";var i;for(i=0;i<string.length;i++){if(TwoOfFiveEncoding.indexOf(string[i].join(""))===-1)return false;result+=TwoOfFiveEncoding.indexOf(string[i].join(""))}return result}function DecodeCodaBar(string){var result="";var start=string[0].join("");var end=string[string.length-1].join("");var i;if(!(CodaBarEncoding[start]==="A"||CodaBarEncoding[start]==="B"||CodaBarEncoding[start]==="C"||CodaBarEncoding[start]==="D"))return false;if(!(CodaBarEncoding[end]==="A"||CodaBarEncoding[end]==="B"||CodaBarEncoding[end]==="C"||CodaBarEncoding[end]==="D"))return false;for(i=1;i<string.length-1;i++){if(typeof CodaBarEncoding[string[i].join("")]==='undefined')return false;result+=CodaBarEncoding[string[i].join("")]}return result}function DecodeEAN13(string){if(string.length!==12)return false;var leftSide=string.slice(0,6);var trigger=false;var rightSide=string.slice(6,string.length);var i;for(i=0;i<leftSide.length;i++){leftSide[i]=leftSide[i].join("");if(leftSide[i].length!==4){trigger=true;break}}if(trigger)return false;for(i=0;i<rightSide.length;i++){rightSide[i]=rightSide[i].join("");if(rightSide[i].length!==4){trigger=true;break}}if(trigger)return false;var decodeFormat=[];for(i=0;i<leftSide.length;i++){if(typeof EAN13Encoding.L[leftSide[i]]!=='undefined'){decodeFormat.push("L")}else if(typeof EAN13Encoding.G[leftSide[i]]!=='undefined'){decodeFormat.push("G")}else{trigger=true;break}}if(trigger)return false;var resultArray=[];if(typeof EAN13Encoding.formats[decodeFormat.join("")]==='undefined')return false;resultArray.push(EAN13Encoding.formats[decodeFormat.join("")]);for(i=0;i<leftSide.length;i++){if(typeof EAN13Encoding[decodeFormat[i]][leftSide[i]]==='undefined'){trigger=true;break}resultArray.push(EAN13Encoding[decodeFormat[i]][leftSide[i]])}if(trigger)return false;for(i=0;i<rightSide.length;i++){if(typeof EAN13Encoding.R[rightSide[i]]==='undefined'){trigger=true;break}resultArray.push(EAN13Encoding.R[rightSide[i]])}if(trigger)return false;var weight=3;var sum=0;for(i=resultArray.length-2;i>=0;i--){sum+=resultArray[i]*weight;if(weight===3){weight=1}else{weight=3}}sum=(10-sum%10)%10;if(resultArray[resultArray.length-1]===sum){return resultArray.join("")}else{return false}}function CheckCode93(string){var checkOne=string[string.length-3].join("");var checkTwo=string[string.length-2].join("");var failSafe=true;if(typeof Code93Encoding[checkOne]==='undefined')return false;if(typeof Code93Encoding[checkTwo]==='undefined')return false;var checkSum=Code93Encoding[checkOne].value;var weight=1;var sum=0;var i;for(i=string.length-4;i>0;i--){failSafe=typeof Code93Encoding[string[i].join("")]==='undefined'?false:failSafe;if(!failSafe)break;sum+=Code93Encoding[string[i].join("")].value*weight;weight++;if(weight>20)weight=1}var firstCheck=sum%47;var firstBool=firstCheck===checkSum;if(!firstBool)return false;if(!failSafe)return false;sum=firstCheck;weight=2;checkSum=Code93Encoding[checkTwo].value;for(i=string.length-4;i>0;i--){failSafe=typeof Code93Encoding[string[i].join("")]==='undefined'?false:failSafe;if(!failSafe)break;sum+=Code93Encoding[string[i].join("")].value*weight;weight++;if(weight>15)weight=1}var secondCheck=sum%47;var secondBool=secondCheck===checkSum;return secondBool&&firstBool}function CheckCode39(string){var trigger=true;if(typeof Code39Encoding[string[0].join("")]==='undefined')return false;if(Code39Encoding[string[0].join("")].character!=="*")return false;if(typeof Code39Encoding[string[string.length-1].join("")]==='undefined')return false;if(Code39Encoding[string[string.length-1].join("")].character!=="*")return false;for(i=1;i<string.length-1;i++){if(typeof Code39Encoding[string[i].join("")]==='undefined'){trigger=false;break}}return trigger}function DecodeCode39(string){var resultString="";var special=false;var character="";var specialchar="";for(i=1;i<string.length-1;i++){character=Code39Encoding[string[i].join("")].character;if(character==="$"||character==="/"||character==="+"||character==="%"){if(i+1<string.length-1){special=true;specialchar=character;continue}}if(special){if(typeof ExtendedEncoding[specialchar+character]==='undefined'){}else{resultString+=ExtendedEncoding[specialchar+character]}special=false;continue}resultString+=character}return resultString}function DecodeCode93(string){var resultString="";var special=false;var character="";var specialchar="";for(i=1;i<string.length-3;i++){character=Code93Encoding[string[i].join("")].character;if(character==="($)"||character==="(/)"||character==="(+)"||character==="(%)"){special=true;specialchar=character[1];continue}if(special){if(typeof ExtendedEncoding[specialchar+character]==='undefined'){}else{resultString+=ExtendedEncoding[specialchar+character]}special=false;continue}resultString+=character}return resultString}function DecodeCode128(string){var set=Code128Encoding[string[0].join("")];var symbol;var Code128Format="Code128";var resultString="";var i;for(i=1;i<(string.length-2);i++){symbol=Code128Encoding[string[i].join("")][set];switch(symbol){case"FNC1":if(i===1)Code128Format="GS1-128";break;case"FNC2":case"FNC3":case"FNC4":break;case"SHIFT_B":i++;resultString+=Code128Encoding[string[i].join("")].B;break;case"SHIFT_A":i++;resultString+=Code128Encoding[string[i].join("")].A;break;case"Code_A":set="A";break;case"Code_B":set="B";break;case"Code_C":set="C";break;default:resultString+=symbol}}return{string:resultString,format:Code128Format}}TwoOfFiveEncoding=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"];Code128Encoding={"212222":{A:" ",B:" ",C:"00"},"222122":{A:"!",B:"!",C:"01"},"222221":{A:'"',B:'"',C:"02"},"121223":{A:"#",B:"#",C:"03"},"121322":{A:"$",B:"$",C:"04"},"131222":{A:"%",B:"%",C:"05"},"122213":{A:"&",B:"&",C:"06"},"122312":{A:"'",B:"'",C:"07"},"132212":{A:"(",B:"(",C:"08"},"221213":{A:")",B:")",C:"09"},"221312":{A:"*",B:"*",C:"10"},"231212":{A:"+",B:"+",C:"11"},"112232":{A:",",B:",",C:"12"},"122132":{A:"-",B:"-",C:"13"},"122231":{A:".",B:".",C:"14"},"113222":{A:"/",B:"/",C:"15"},"123122":{A:"0",B:"0",C:"16"},"123221":{A:"1",B:"1",C:"17"},"223211":{A:"2",B:"2",C:"18"},"221132":{A:"3",B:"3",C:"19"},"221231":{A:"4",B:"4",C:"20"},"213212":{A:"5",B:"5",C:"21"},"223112":{A:"6",B:"6",C:"22"},"312131":{A:"7",B:"7",C:"23"},"311222":{A:"8",B:"8",C:"24"},"321122":{A:"9",B:"9",C:"25"},"321221":{A:":",B:":",C:"26"},"312212":{A:";",B:";",C:"27"},"322112":{A:"<",B:"<",C:"28"},"322211":{A:"=",B:"=",C:"29"},"212123":{A:">",B:">",C:"30"},"212321":{A:"?",B:"?",C:"31"},"232121":{A:"@",B:"@",C:"32"},"111323":{A:"A",B:"A",C:"33"},"131123":{A:"B",B:"B",C:"34"},"131321":{A:"C",B:"C",C:"35"},"112313":{A:"D",B:"D",C:"36"},"132113":{A:"E",B:"E",C:"37"},"132311":{A:"F",B:"F",C:"38"},"211313":{A:"G",B:"G",C:"39"},"231113":{A:"H",B:"H",C:"40"},"231311":{A:"I",B:"I",C:"41"},"112133":{A:"J",B:"J",C:"42"},"112331":{A:"K",B:"K",C:"43"},"132131":{A:"L",B:"L",C:"44"},"113123":{A:"M",B:"M",C:"45"},"113321":{A:"N",B:"N",C:"46"},"133121":{A:"O",B:"O",C:"47"},"313121":{A:"P",B:"P",C:"48"},"211331":{A:"Q",B:"Q",C:"49"},"231131":{A:"R",B:"R",C:"50"},"213113":{A:"S",B:"S",C:"51"},"213311":{A:"T",B:"T",C:"52"},"213131":{A:"U",B:"U",C:"53"},"311123":{A:"V",B:"V",C:"54"},"311321":{A:"W",B:"W",C:"55"},"331121":{A:"X",B:"X",C:"56"},"312113":{A:"Y",B:"Y",C:"57"},"312311":{A:"Z",B:"Z",C:"58"},"332111":{A:"[",B:"[",C:"59"},"314111":{A:"\\",B:"\\",C:"60"},"221411":{A:"]",B:"]",C:"61"},"431111":{A:"^",B:"^",C:"62"},"111224":{A:"_",B:"_",C:"63"},"111422":{A:"NUL",B:"`",C:"64"},"121124":{A:"SOH",B:"a",C:"65"},"121421":{A:"STX",B:"b",C:"66"},"141122":{A:"ETX",B:"c",C:"67"},"141221":{A:"EOT",B:"d",C:"68"},"112214":{A:"ENQ",B:"e",C:"69"},"112412":{A:"ACK",B:"f",C:"70"},"122114":{A:"BEL",B:"g",C:"71"},"122411":{A:"BS",B:"h",C:"72"},"142112":{A:"HT",B:"i",C:"73"},"142211":{A:"LF",B:"j",C:"74"},"241211":{A:"VT",B:"k",C:"75"},"221114":{A:"FF",B:"l",C:"76"},"413111":{A:"CR",B:"m",C:"77"},"241112":{A:"SO",B:"n",C:"78"},"134111":{A:"SI",B:"o",C:"79"},"111242":{A:"DLE",B:"p",C:"80"},"121142":{A:"DC1",B:"q",C:"81"},"121241":{A:"DC2",B:"r",C:"82"},"114212":{A:"DC3",B:"s",C:"83"},"124112":{A:"DC4",B:"t",C:"84"},"124211":{A:"NAK",B:"u",C:"85"},"411212":{A:"SYN",B:"v",C:"86"},"421112":{A:"ETB",B:"w",C:"87"},"421211":{A:"CAN",B:"x",C:"88"},"212141":{A:"EM",B:"y",C:"89"},"214121":{A:"SUB",B:"z",C:"90"},"412121":{A:"ESC",B:"{",C:"91"},"111143":{A:"FS",B:"|",C:"92"},"111341":{A:"GS",B:"}",C:"93"},"131141":{A:"RS",B:"~",C:"94"},"114113":{A:"US",B:"DEL",C:"95"},"114311":{A:"FNC3",B:"FNC3",C:"96"},"411113":{A:"FNC2",B:"FNC2",C:"97"},"411311":{A:"SHIFT_B",B:"SHIFT_A",C:"98"},"113141":{A:"Code_C",B:"Code_C",C:"99"},"114131":{A:"Code_B",B:"FNC4",C:"Code_B"},"311141":{A:"FNC4",B:"Code_A",C:"Code_A"},"411131":{A:"FNC1",B:"FNC1",C:"FNC1"},"211412":"A","211214":"B","211232":"C","233111":{A:"STOP",B:"STOP",C:"STOP"},value:["212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","233111"]};Code93Encoding={"131112":{value:0,character:"0"},"111213":{value:1,character:"1"},"111312":{value:2,character:"2"},"111411":{value:3,character:"3"},"121113":{value:4,character:"4"},"121212":{value:5,character:"5"},"121311":{value:6,character:"6"},"111114":{value:7,character:"7"},"131211":{value:8,character:"8"},"141111":{value:9,character:"9"},"211113":{value:10,character:"A"},"211212":{value:11,character:"B"},"211311":{value:12,character:"C"},"221112":{value:13,character:"D"},"221211":{value:14,character:"E"},"231111":{value:15,character:"F"},"112113":{value:16,character:"G"},"112212":{value:17,character:"H"},"112311":{value:18,character:"I"},"122112":{value:19,character:"J"},"132111":{value:20,character:"K"},"111123":{value:21,character:"L"},"111222":{value:22,character:"M"},"111321":{value:23,character:"N"},"121122":{value:24,character:"O"},"131121":{value:25,character:"P"},"212112":{value:26,character:"Q"},"212211":{value:27,character:"R"},"211122":{value:28,character:"S"},"211221":{value:29,character:"T"},"221121":{value:30,character:"U"},"222111":{value:31,character:"V"},"112122":{value:32,character:"W"},"112221":{value:33,character:"X"},"122121":{value:34,character:"Y"},"123111":{value:35,character:"Z"},"121131":{value:36,character:"-"},"311112":{value:37,character:"."},"311211":{value:38,character:" "},"321111":{value:39,character:"$"},"112131":{value:40,character:"/"},"113121":{value:41,character:"+"},"211131":{value:42,character:"%"},"121221":{value:43,character:"($)"},"312111":{value:44,character:"(%)"},"311121":{value:45,character:"(/)"},"122211":{value:46,character:"(+)"},"111141":{value:-1,character:"*"}};Code39Encoding={"111221211":{value:0,character:"0"},"211211112":{value:1,character:"1"},"112211112":{value:2,character:"2"},"212211111":{value:3,character:"3"},"111221112":{value:4,character:"4"},"211221111":{value:5,character:"5"},"112221111":{value:6,character:"6"},"111211212":{value:7,character:"7"},"211211211":{value:8,character:"8"},"112211211":{value:9,character:"9"},"211112112":{value:10,character:"A"},"112112112":{value:11,character:"B"},"212112111":{value:12,character:"C"},"111122112":{value:13,character:"D"},"211122111":{value:14,character:"E"},"112122111":{value:15,character:"F"},"111112212":{value:16,character:"G"},"211112211":{value:17,character:"H"},"112112211":{value:18,character:"I"},"111122211":{value:19,character:"J"},"211111122":{value:20,character:"K"},"112111122":{value:21,character:"L"},"212111121":{value:22,character:"M"},"111121122":{value:23,character:"N"},"211121121":{value:24,character:"O"},"112121121":{value:25,character:"P"},"111111222":{value:26,character:"Q"},"211111221":{value:27,character:"R"},"112111221":{value:28,character:"S"},"111121221":{value:29,character:"T"},"221111112":{value:30,character:"U"},"122111112":{value:31,character:"V"},"222111111":{value:32,character:"W"},"121121112":{value:33,character:"X"},"221121111":{value:34,character:"Y"},"122121111":{value:35,character:"Z"},"121111212":{value:36,character:"-"},"221111211":{value:37,character:"."},"122111211":{value:38,character:" "},"121212111":{value:39,character:"$"},"121211121":{value:40,character:"/"},"121112121":{value:41,character:"+"},"111212121":{value:42,character:"%"},"121121211":{value:-1,character:"*"}};ExtendedEncoding={"/A":'!',"/B":'"',"/C":'#',"/D":'$',"/E":'%',"/F":'&',"/G":"'","/H":'(',"/I":')',"/J":'*',"/K":'+',"/L":',',"/O":'/',"/Z":':',"%F":';',"%G":'<',"%H":'=',"%I":'>',"%J":'?',"%K":'[',"%L":"\\","%M":']',"%N":'^',"%O":'_',"+A":'a',"+B":'b',"+C":'c',"+D":'d',"+E":'e',"+F":'f',"+G":'g',"+H":'h',"+I":'i',"+J":'j',"+K":'k',"+L":'l',"+M":'m',"+N":'n',"+O":'o',"+P":'p',"+Q":'q',"+R":'r',"+S":'s',"+T":'t',"+U":'u',"+V":'v',"+W":'w',"+X":'x',"+Y":'y',"+Z":'z',"%P":"{","%Q":'|',"%R":'|',"%S":'~',};CodaBarEncoding={"0000011":"0","0000110":"1","0001001":"2","1100000":"3","0010010":"4","1000010":"5","0100001":"6","0100100":"7","0110000":"8","1001000":"9","0001100":"-","0011000":"$","1000101":":","1010001":"/","1010100":".","0011111":"+","0011010":"A","0001011":"B","0101001":"C","0001110":"D"};EAN13Encoding={"L":{"3211":0,"2221":1,"2122":2,"1411":3,"1132":4,"1231":5,"1114":6,"1312":7,"1213":8,"3112":9},"G":{"1123":0,"1222":1,"2212":2,"1141":3,"2311":4,"1321":5,"4111":6,"2131":7,"3121":8,"2113":9},"R":{"3211":0,"2221":1,"2122":2,"1411":3,"1132":4,"1231":5,"1114":6,"1312":7,"1213":8,"3112":9},formats:{"LLLLLL":0,"LLGLGG":1,"LLGGLG":2,"LLGGGL":3,"LGLLGG":4,"LGGLLG":5,"LGGGLL":6,"LGLGLG":7,"LGLGGL":8,"LGGLGL":9}};self.onmessage=function(e){var width;var i;ScanImage={data:new Uint8ClampedArray(e.data.scan),width:e.data.scanWidth,height:e.data.scanHeight};switch(e.data.rotation){case 8:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,-90);width=e.data.scanWidth;ScanImage.width=ScanImage.height;ScanImage.height=width;break;case 6:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,90);width=e.data.scanWidth;ScanImage.width=ScanImage.height;ScanImage.height=width;break;case 3:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,180)}Image={data:Scale(ScanImage.data,ScanImage.width,ScanImage.height),width:ScanImage.width/2,height:ScanImage.height/2};if(e.data.postOrientation){postMessage({result:Image,success:"orientationData"})}availableFormats=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5","Codabar"];FormatPriority=[];var decodeFormats=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5","Codabar"];SecureCodabar=true;Secure2Of5=true;Multiple=true;if(typeof e.data.multiple!=='undefined'){Multiple=e.data.multiple}if(typeof e.data.decodeFormats!=='undefined'){decodeFormats=e.data.decodeFormats}for(i=0;i<decodeFormats.length;i++){FormatPriority.push(decodeFormats[i])}CreateTable();CreateScanTable();var FinalResult=Main();if(FinalResult.length>0){postMessage({result:FinalResult,success:true})}else{postMessage({result:FinalResult,success:false})}}};var decoderWorkerBlobString=decoderWorkerBlob.toString();decoderWorkerBlobString=decoderWorkerBlobString.substring(decoderWorkerBlobString.indexOf("{")+1,decoderWorkerBlobString.lastIndexOf("}"));

const _aa = {};
_aa._ab = function(f, e) {
    var d = qrcode.width;
    var b = qrcode.height;
    var c = true;
    for (var g = 0; g < e.Length && c; g += 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw "Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
    c = true;
    for (var g = e.Length - 2; g >= 0 && c; g -= 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw "Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
}
;
_aa._af = function(b, d, a) {
    var l = new _ac(d);
    var k = new Array(d << 1);
    for (var g = 0; g < d; g++) {
        var h = k.length;
        var j = g + 0.5;
        for (var i = 0; i < h; i += 2) {
            k[i] = (i >> 1) + 0.5;
            k[i + 1] = j
        }
        a._ad(k);
        _aa._ab(b, k);
        try {
            for (var i = 0; i < h; i += 2) {
                var e = (Math.floor(k[i]) * 4) + (Math.floor(k[i + 1]) * qrcode.width * 4);
                var f = b[Math.floor(k[i]) + qrcode.width * Math.floor(k[i + 1])];
                qrcode.imagedata.data[e] = f ? 255 : 0;
                qrcode.imagedata.data[e + 1] = f ? 255 : 0;
                qrcode.imagedata.data[e + 2] = 0;
                qrcode.imagedata.data[e + 3] = 255;
                if (f) {
                    l._dq(i >> 1, g)
                }
            }
        } catch (c) {
            throw "Error._ab"
        }
    }
    return l
}
;
_aa._ah = function(h, o, l, k, r, q, b, a, f, e, n, m, t, s, d, c, j, i) {
    var g = _ae._ag(l, k, r, q, b, a, f, e, n, m, t, s, d, c, j, i);
    return _aa._af(h, o, g)
}
;
function _a1(b, a) {
    this.count = b;
    this._fc = a;
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("_dm", function() {
        return this._fc
    })
}
function _a2(a, c, b) {
    this._bm = a;
    if (b) {
        this._do = new Array(c,b)
    } else {
        this._do = new Array(c)
    }
    this.__defineGetter__("_bo", function() {
        return this._bm
    });
    this.__defineGetter__("_dn", function() {
        return this._bm * this._fo
    });
    this.__defineGetter__("_fo", function() {
        var e = 0;
        for (var d = 0; d < this._do.length; d++) {
            e += this._do[d].length
        }
        return e
    });
    this._fb = function() {
        return this._do
    }
}
function _a3(k, l, h, g, f, e) {
    this._bs = k;
    this._ar = l;
    this._do = new Array(h,g,f,e);
    var j = 0;
    var b = h._bo;
    var a = h._fb();
    for (var d = 0; d < a.length; d++) {
        var c = a[d];
        j += c.Count * (c._dm + b)
    }
    this._br = j;
    this.__defineGetter__("_fd", function() {
        return this._bs
    });
    this.__defineGetter__("_as", function() {
        return this._ar
    });
    this.__defineGetter__("_dp", function() {
        return this._br
    });
    this.__defineGetter__("_cr", function() {
        return 17 + 4 * this._bs
    });
    this._aq = function() {
        var r = this._cr;
        var o = new _ac(r);
        o._bq(0, 0, 9, 9);
        o._bq(r - 8, 0, 8, 9);
        o._bq(0, r - 8, 9, 8);
        var n = this._ar.length;
        for (var m = 0; m < n; m++) {
            var q = this._ar[m] - 2;
            for (var s = 0; s < n; s++) {
                if ((m == 0 && (s == 0 || s == n - 1)) || (m == n - 1 && s == 0)) {
                    continue
                }
                o._bq(this._ar[s] - 2, q, 5, 5)
            }
        }
        o._bq(6, 9, 1, r - 17);
        o._bq(9, 6, r - 17, 1);
        if (this._bs > 6) {
            o._bq(r - 11, 0, 3, 6);
            o._bq(0, r - 11, 6, 3)
        }
        return o
    }
    ;
    this._bu = function(i) {
        return this._do[i.ordinal()]
    }
}
_a3._bv = new Array(31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017);
_a3.VERSIONS = _ay();
_a3._av = function(a) {
    if (a < 1 || a > 40) {
        throw "bad arguments"
    }
    return _a3.VERSIONS[a - 1]
}
;
_a3._at = function(b) {
    if (b % 4 != 1) {
        throw "Error _at"
    }
    try {
        return _a3._av((b - 17) >> 2)
    } catch (a) {
        throw "Error _av"
    }
}
;
_a3._aw = function(d) {
    var b = 4294967295;
    var f = 0;
    for (var c = 0; c < _a3._bv.length; c++) {
        var a = _a3._bv[c];
        if (a == d) {
            return this._av(c + 7)
        }
        var e = _ax._gj(d, a);
        if (e < b) {
            f = c + 7;
            b = e
        }
    }
    if (b <= 3) {
        return this._av(f)
    }
    return null
}
;
function _ay() {
    return new Array(new _a3(1,new Array(),new _a2(7,new _a1(1,19)),new _a2(10,new _a1(1,16)),new _a2(13,new _a1(1,13)),new _a2(17,new _a1(1,9))),new _a3(2,new Array(6,18),new _a2(10,new _a1(1,34)),new _a2(16,new _a1(1,28)),new _a2(22,new _a1(1,22)),new _a2(28,new _a1(1,16))),new _a3(3,new Array(6,22),new _a2(15,new _a1(1,55)),new _a2(26,new _a1(1,44)),new _a2(18,new _a1(2,17)),new _a2(22,new _a1(2,13))),new _a3(4,new Array(6,26),new _a2(20,new _a1(1,80)),new _a2(18,new _a1(2,32)),new _a2(26,new _a1(2,24)),new _a2(16,new _a1(4,9))),new _a3(5,new Array(6,30),new _a2(26,new _a1(1,108)),new _a2(24,new _a1(2,43)),new _a2(18,new _a1(2,15),new _a1(2,16)),new _a2(22,new _a1(2,11),new _a1(2,12))),new _a3(6,new Array(6,34),new _a2(18,new _a1(2,68)),new _a2(16,new _a1(4,27)),new _a2(24,new _a1(4,19)),new _a2(28,new _a1(4,15))),new _a3(7,new Array(6,22,38),new _a2(20,new _a1(2,78)),new _a2(18,new _a1(4,31)),new _a2(18,new _a1(2,14),new _a1(4,15)),new _a2(26,new _a1(4,13),new _a1(1,14))),new _a3(8,new Array(6,24,42),new _a2(24,new _a1(2,97)),new _a2(22,new _a1(2,38),new _a1(2,39)),new _a2(22,new _a1(4,18),new _a1(2,19)),new _a2(26,new _a1(4,14),new _a1(2,15))),new _a3(9,new Array(6,26,46),new _a2(30,new _a1(2,116)),new _a2(22,new _a1(3,36),new _a1(2,37)),new _a2(20,new _a1(4,16),new _a1(4,17)),new _a2(24,new _a1(4,12),new _a1(4,13))),new _a3(10,new Array(6,28,50),new _a2(18,new _a1(2,68),new _a1(2,69)),new _a2(26,new _a1(4,43),new _a1(1,44)),new _a2(24,new _a1(6,19),new _a1(2,20)),new _a2(28,new _a1(6,15),new _a1(2,16))),new _a3(11,new Array(6,30,54),new _a2(20,new _a1(4,81)),new _a2(30,new _a1(1,50),new _a1(4,51)),new _a2(28,new _a1(4,22),new _a1(4,23)),new _a2(24,new _a1(3,12),new _a1(8,13))),new _a3(12,new Array(6,32,58),new _a2(24,new _a1(2,92),new _a1(2,93)),new _a2(22,new _a1(6,36),new _a1(2,37)),new _a2(26,new _a1(4,20),new _a1(6,21)),new _a2(28,new _a1(7,14),new _a1(4,15))),new _a3(13,new Array(6,34,62),new _a2(26,new _a1(4,107)),new _a2(22,new _a1(8,37),new _a1(1,38)),new _a2(24,new _a1(8,20),new _a1(4,21)),new _a2(22,new _a1(12,11),new _a1(4,12))),new _a3(14,new Array(6,26,46,66),new _a2(30,new _a1(3,115),new _a1(1,116)),new _a2(24,new _a1(4,40),new _a1(5,41)),new _a2(20,new _a1(11,16),new _a1(5,17)),new _a2(24,new _a1(11,12),new _a1(5,13))),new _a3(15,new Array(6,26,48,70),new _a2(22,new _a1(5,87),new _a1(1,88)),new _a2(24,new _a1(5,41),new _a1(5,42)),new _a2(30,new _a1(5,24),new _a1(7,25)),new _a2(24,new _a1(11,12),new _a1(7,13))),new _a3(16,new Array(6,26,50,74),new _a2(24,new _a1(5,98),new _a1(1,99)),new _a2(28,new _a1(7,45),new _a1(3,46)),new _a2(24,new _a1(15,19),new _a1(2,20)),new _a2(30,new _a1(3,15),new _a1(13,16))),new _a3(17,new Array(6,30,54,78),new _a2(28,new _a1(1,107),new _a1(5,108)),new _a2(28,new _a1(10,46),new _a1(1,47)),new _a2(28,new _a1(1,22),new _a1(15,23)),new _a2(28,new _a1(2,14),new _a1(17,15))),new _a3(18,new Array(6,30,56,82),new _a2(30,new _a1(5,120),new _a1(1,121)),new _a2(26,new _a1(9,43),new _a1(4,44)),new _a2(28,new _a1(17,22),new _a1(1,23)),new _a2(28,new _a1(2,14),new _a1(19,15))),new _a3(19,new Array(6,30,58,86),new _a2(28,new _a1(3,113),new _a1(4,114)),new _a2(26,new _a1(3,44),new _a1(11,45)),new _a2(26,new _a1(17,21),new _a1(4,22)),new _a2(26,new _a1(9,13),new _a1(16,14))),new _a3(20,new Array(6,34,62,90),new _a2(28,new _a1(3,107),new _a1(5,108)),new _a2(26,new _a1(3,41),new _a1(13,42)),new _a2(30,new _a1(15,24),new _a1(5,25)),new _a2(28,new _a1(15,15),new _a1(10,16))),new _a3(21,new Array(6,28,50,72,94),new _a2(28,new _a1(4,116),new _a1(4,117)),new _a2(26,new _a1(17,42)),new _a2(28,new _a1(17,22),new _a1(6,23)),new _a2(30,new _a1(19,16),new _a1(6,17))),new _a3(22,new Array(6,26,50,74,98),new _a2(28,new _a1(2,111),new _a1(7,112)),new _a2(28,new _a1(17,46)),new _a2(30,new _a1(7,24),new _a1(16,25)),new _a2(24,new _a1(34,13))),new _a3(23,new Array(6,30,54,74,102),new _a2(30,new _a1(4,121),new _a1(5,122)),new _a2(28,new _a1(4,47),new _a1(14,48)),new _a2(30,new _a1(11,24),new _a1(14,25)),new _a2(30,new _a1(16,15),new _a1(14,16))),new _a3(24,new Array(6,28,54,80,106),new _a2(30,new _a1(6,117),new _a1(4,118)),new _a2(28,new _a1(6,45),new _a1(14,46)),new _a2(30,new _a1(11,24),new _a1(16,25)),new _a2(30,new _a1(30,16),new _a1(2,17))),new _a3(25,new Array(6,32,58,84,110),new _a2(26,new _a1(8,106),new _a1(4,107)),new _a2(28,new _a1(8,47),new _a1(13,48)),new _a2(30,new _a1(7,24),new _a1(22,25)),new _a2(30,new _a1(22,15),new _a1(13,16))),new _a3(26,new Array(6,30,58,86,114),new _a2(28,new _a1(10,114),new _a1(2,115)),new _a2(28,new _a1(19,46),new _a1(4,47)),new _a2(28,new _a1(28,22),new _a1(6,23)),new _a2(30,new _a1(33,16),new _a1(4,17))),new _a3(27,new Array(6,34,62,90,118),new _a2(30,new _a1(8,122),new _a1(4,123)),new _a2(28,new _a1(22,45),new _a1(3,46)),new _a2(30,new _a1(8,23),new _a1(26,24)),new _a2(30,new _a1(12,15),new _a1(28,16))),new _a3(28,new Array(6,26,50,74,98,122),new _a2(30,new _a1(3,117),new _a1(10,118)),new _a2(28,new _a1(3,45),new _a1(23,46)),new _a2(30,new _a1(4,24),new _a1(31,25)),new _a2(30,new _a1(11,15),new _a1(31,16))),new _a3(29,new Array(6,30,54,78,102,126),new _a2(30,new _a1(7,116),new _a1(7,117)),new _a2(28,new _a1(21,45),new _a1(7,46)),new _a2(30,new _a1(1,23),new _a1(37,24)),new _a2(30,new _a1(19,15),new _a1(26,16))),new _a3(30,new Array(6,26,52,78,104,130),new _a2(30,new _a1(5,115),new _a1(10,116)),new _a2(28,new _a1(19,47),new _a1(10,48)),new _a2(30,new _a1(15,24),new _a1(25,25)),new _a2(30,new _a1(23,15),new _a1(25,16))),new _a3(31,new Array(6,30,56,82,108,134),new _a2(30,new _a1(13,115),new _a1(3,116)),new _a2(28,new _a1(2,46),new _a1(29,47)),new _a2(30,new _a1(42,24),new _a1(1,25)),new _a2(30,new _a1(23,15),new _a1(28,16))),new _a3(32,new Array(6,34,60,86,112,138),new _a2(30,new _a1(17,115)),new _a2(28,new _a1(10,46),new _a1(23,47)),new _a2(30,new _a1(10,24),new _a1(35,25)),new _a2(30,new _a1(19,15),new _a1(35,16))),new _a3(33,new Array(6,30,58,86,114,142),new _a2(30,new _a1(17,115),new _a1(1,116)),new _a2(28,new _a1(14,46),new _a1(21,47)),new _a2(30,new _a1(29,24),new _a1(19,25)),new _a2(30,new _a1(11,15),new _a1(46,16))),new _a3(34,new Array(6,34,62,90,118,146),new _a2(30,new _a1(13,115),new _a1(6,116)),new _a2(28,new _a1(14,46),new _a1(23,47)),new _a2(30,new _a1(44,24),new _a1(7,25)),new _a2(30,new _a1(59,16),new _a1(1,17))),new _a3(35,new Array(6,30,54,78,102,126,150),new _a2(30,new _a1(12,121),new _a1(7,122)),new _a2(28,new _a1(12,47),new _a1(26,48)),new _a2(30,new _a1(39,24),new _a1(14,25)),new _a2(30,new _a1(22,15),new _a1(41,16))),new _a3(36,new Array(6,24,50,76,102,128,154),new _a2(30,new _a1(6,121),new _a1(14,122)),new _a2(28,new _a1(6,47),new _a1(34,48)),new _a2(30,new _a1(46,24),new _a1(10,25)),new _a2(30,new _a1(2,15),new _a1(64,16))),new _a3(37,new Array(6,28,54,80,106,132,158),new _a2(30,new _a1(17,122),new _a1(4,123)),new _a2(28,new _a1(29,46),new _a1(14,47)),new _a2(30,new _a1(49,24),new _a1(10,25)),new _a2(30,new _a1(24,15),new _a1(46,16))),new _a3(38,new Array(6,32,58,84,110,136,162),new _a2(30,new _a1(4,122),new _a1(18,123)),new _a2(28,new _a1(13,46),new _a1(32,47)),new _a2(30,new _a1(48,24),new _a1(14,25)),new _a2(30,new _a1(42,15),new _a1(32,16))),new _a3(39,new Array(6,26,54,82,110,138,166),new _a2(30,new _a1(20,117),new _a1(4,118)),new _a2(28,new _a1(40,47),new _a1(7,48)),new _a2(30,new _a1(43,24),new _a1(22,25)),new _a2(30,new _a1(10,15),new _a1(67,16))),new _a3(40,new Array(6,30,58,86,114,142,170),new _a2(30,new _a1(19,118),new _a1(6,119)),new _a2(28,new _a1(18,47),new _a1(31,48)),new _a2(30,new _a1(34,24),new _a1(34,25)),new _a2(30,new _a1(20,15),new _a1(61,16))))
}
function _ae(i, f, c, h, e, b, g, d, a) {
    this.a11 = i;
    this.a12 = h;
    this.a13 = g;
    this.a21 = f;
    this.a22 = e;
    this.a23 = d;
    this.a31 = c;
    this.a32 = b;
    this.a33 = a;
    this._ad = function(w) {
        var t = w.length;
        var A = this.a11;
        var z = this.a12;
        var v = this.a13;
        var r = this.a21;
        var q = this.a22;
        var o = this.a23;
        var m = this.a31;
        var k = this.a32;
        var j = this.a33;
        for (var n = 0; n < t; n += 2) {
            var u = w[n];
            var s = w[n + 1];
            var l = v * u + o * s + j;
            w[n] = (A * u + r * s + m) / l;
            w[n + 1] = (z * u + q * s + k) / l
        }
    }
    ;
    this._fp = function(m, k) {
        var r = m.length;
        for (var l = 0; l < r; l++) {
            var j = m[l];
            var q = k[l];
            var o = this.a13 * j + this.a23 * q + this.a33;
            m[l] = (this.a11 * j + this.a21 * q + this.a31) / o;
            k[l] = (this.a12 * j + this.a22 * q + this.a32) / o
        }
    }
    ;
    this._fr = function() {
        return new _ae(this.a22 * this.a33 - this.a23 * this.a32,this.a23 * this.a31 - this.a21 * this.a33,this.a21 * this.a32 - this.a22 * this.a31,this.a13 * this.a32 - this.a12 * this.a33,this.a11 * this.a33 - this.a13 * this.a31,this.a12 * this.a31 - this.a11 * this.a32,this.a12 * this.a23 - this.a13 * this.a22,this.a13 * this.a21 - this.a11 * this.a23,this.a11 * this.a22 - this.a12 * this.a21)
    }
    ;
    this.times = function(j) {
        return new _ae(this.a11 * j.a11 + this.a21 * j.a12 + this.a31 * j.a13,this.a11 * j.a21 + this.a21 * j.a22 + this.a31 * j.a23,this.a11 * j.a31 + this.a21 * j.a32 + this.a31 * j.a33,this.a12 * j.a11 + this.a22 * j.a12 + this.a32 * j.a13,this.a12 * j.a21 + this.a22 * j.a22 + this.a32 * j.a23,this.a12 * j.a31 + this.a22 * j.a32 + this.a32 * j.a33,this.a13 * j.a11 + this.a23 * j.a12 + this.a33 * j.a13,this.a13 * j.a21 + this.a23 * j.a22 + this.a33 * j.a23,this.a13 * j.a31 + this.a23 * j.a32 + this.a33 * j.a33)
    }
}
_ae._ag = function(q, e, o, d, n, c, m, b, h, r, l, f, a, j, i, s) {
    var g = this._be(q, e, o, d, n, c, m, b);
    var k = this._bf(h, r, l, f, a, j, i, s);
    return k.times(g)
}
;
_ae._bf = function(f, h, d, g, b, e, a, c) {
    const dy2 = c - e;
    const dy3 = h - g + e - c;
    if (dy2 == 0 && dy3 == 0) {
        return new _ae(d - f,b - d,f,g - h,e - g,h,0,0,1)
    } else {
        const dx1 = d - b;
        const dx2 = a - b;
        const dx3 = f - d + b - a;
        const dy1 = g - e;
        const _dr = dx1 * dy2 - dx2 * dy1;
        const a13 = (dx3 * dy2 - dx2 * dy3) / _dr;
        const a23 = (dx1 * dy3 - dx3 * dy1) / _dr;
        return new _ae(d - f + a13 * d,a - f + a23 * a,f,g - h + a13 * g,c - h + a23 * c,h,a13,a23,1)
    }
}
;
_ae._be = function(f, h, d, g, b, e, a, c) {
    return this._bf(f, h, d, g, b, e, a, c)._fr()
}
;
function _bg(b, a) {
    this.bits = b;
    this.points = a
}
function Detector(a) {
    this.image = a;
    this._am = null;
    this._bi = function(m, l, c, b) {
        var d = Math.abs(b - l) > Math.abs(c - m);
        if (d) {
            var s = m;
            m = l;
            l = s;
            s = c;
            c = b;
            b = s
        }
        var j = Math.abs(c - m);
        var i = Math.abs(b - l);
        var q = -j >> 1;
        var v = l < b ? 1 : -1;
        var f = m < c ? 1 : -1;
        var e = 0;
        for (var h = m, g = l; h != c; h += f) {
            var u = d ? g : h;
            var t = d ? h : g;
            if (e == 1) {
                if (this.image[u + t * qrcode.width]) {
                    e++
                }
            } else {
                if (!this.image[u + t * qrcode.width]) {
                    e++
                }
            }
            if (e == 3) {
                var o = h - m;
                var n = g - l;
                return Math.sqrt((o * o + n * n))
            }
            q += i;
            if (q > 0) {
                if (g == b) {
                    break
                }
                g += v;
                q -= j
            }
        }
        var k = c - m;
        var r = b - l;
        return Math.sqrt((k * k + r * r))
    }
    ;
    this._bh = function(i, g, h, f) {
        var b = this._bi(i, g, h, f);
        var e = 1;
        var d = i - (h - i);
        if (d < 0) {
            e = i / (i - d);
            d = 0
        } else {
            if (d >= qrcode.width) {
                e = (qrcode.width - 1 - i) / (d - i);
                d = qrcode.width - 1
            }
        }
        var c = Math.floor(g - (f - g) * e);
        e = 1;
        if (c < 0) {
            e = g / (g - c);
            c = 0
        } else {
            if (c >= qrcode.height) {
                e = (qrcode.height - 1 - g) / (c - g);
                c = qrcode.height - 1
            }
        }
        d = Math.floor(i + (d - i) * e);
        b += this._bi(i, g, d, c);
        return b - 1
    }
    ;
    this._bj = function(c, d) {
        var b = this._bh(Math.floor(c.X), Math.floor(c.Y), Math.floor(d.X), Math.floor(d.Y));
        var e = this._bh(Math.floor(d.X), Math.floor(d.Y), Math.floor(c.X), Math.floor(c.Y));
        if (isNaN(b)) {
            return e / 7
        }
        if (isNaN(e)) {
            return b / 7
        }
        return (b + e) / 14
    }
    ;
    this._bk = function(d, c, b) {
        return (this._bj(d, c) + this._bj(d, b)) / 2
    }
    ;
    this.distance = function(c, b) {
        const xDiff = c.X - b.X;
        const yDiff = c.Y - b.Y;
        return Math.sqrt((xDiff * xDiff + yDiff * yDiff))
    }
    ;
    this._bx = function(g, f, d, e) {
        var b = Math.round(this.distance(g, f) / e);
        var c = Math.round(this.distance(g, d) / e);
        var h = ((b + c) >> 1) + 7;
        switch (h & 3) {
            case 0:
                h++;
                break;
            case 2:
                h--;
                break;
            case 3:
                throw "Error"
        }
        return h
    }
    ;
    this._bl = function(g, f, d, j) {
        var k = Math.floor(j * g);
        var h = Math.max(0, f - k);
        var i = Math.min(qrcode.width - 1, f + k);
        if (i - h < g * 3) {
            throw "Error"
        }
        var b = Math.max(0, d - k);
        var c = Math.min(qrcode.height - 1, d + k);
        var e = new _ak(this.image,h,b,i - h,c - b,g,this._am);
        return e.find()
    }
    ;
    this.createTransform = function(l, h, k, b, g) {
        var j = g - 3.5;
        var i;
        var f;
        var e;
        var c;
        if (b != null) {
            i = b.X;
            f = b.Y;
            e = c = j - 3
        } else {
            i = (h.X - l.X) + k.X;
            f = (h.Y - l.Y) + k.Y;
            e = c = j
        }
        var d = _ae._ag(3.5, 3.5, j, 3.5, e, c, 3.5, j, l.X, l.Y, h.X, h.Y, i, f, k.X, k.Y);
        return d
    }
    ;
    this._bz = function(e, b, d) {
        var c = _aa;
        return c._af(e, d, b)
    }
    ;
    this._cd = function(r) {
        var j = r._gq;
        var h = r._gs;
        var n = r._gp;
        var d = this._bk(j, h, n);
        if (d < 1) {
            throw "Error"
        }
        var s = this._bx(j, h, n, d);
        var b = _a3._at(s);
        var k = b._cr - 7;
        var l = null;
        if (b._as.length > 0) {
            var f = h.X - j.X + n.X;
            var e = h.Y - j.Y + n.Y;
            var c = 1 - 3 / k;
            var u = Math.floor(j.X + c * (f - j.X));
            var t = Math.floor(j.Y + c * (e - j.Y));
            for (var q = 4; q <= 16; q <<= 1) {
                l = this._bl(d, u, t, q);
                break
            }
        }
        var g = this.createTransform(j, h, n, l, s);
        var m = this._bz(this.image, g, s);
        var o;
        if (l == null) {
            o = new Array(n,j,h)
        } else {
            o = new Array(n,j,h,l)
        }
        return new _bg(m,o)
    }
    ;
    this.detect = function() {
        var b = new _cc()._ce(this.image);
        return this._cd(b)
    }
}
var _ca = 21522;
var _cb = new Array(new Array(21522,0),new Array(20773,1),new Array(24188,2),new Array(23371,3),new Array(17913,4),new Array(16590,5),new Array(20375,6),new Array(19104,7),new Array(30660,8),new Array(29427,9),new Array(32170,10),new Array(30877,11),new Array(26159,12),new Array(25368,13),new Array(27713,14),new Array(26998,15),new Array(5769,16),new Array(5054,17),new Array(7399,18),new Array(6608,19),new Array(1890,20),new Array(597,21),new Array(3340,22),new Array(2107,23),new Array(13663,24),new Array(12392,25),new Array(16177,26),new Array(14854,27),new Array(9396,28),new Array(8579,29),new Array(11994,30),new Array(11245,31));
var _ch = new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);
function _ax(a) {
    this._cf = _cg.forBits((a >> 3) & 3);
    this._fe = (a & 7);
    this.__defineGetter__("_cg", function() {
        return this._cf
    });
    this.__defineGetter__("_dx", function() {
        return this._fe
    });
    this.GetHashCode = function() {
        return (this._cf.ordinal() << 3) | _fe
    }
    ;
    this.Equals = function(c) {
        var b = c;
        return this._cf == b._cf && this._fe == b._fe
    }
}
_ax._gj = function(d, c) {
    d ^= c;
    return _ch[d & 15] + _ch[(_ew(d, 4) & 15)] + _ch[(_ew(d, 8) & 15)] + _ch[(_ew(d, 12) & 15)] + _ch[(_ew(d, 16) & 15)] + _ch[(_ew(d, 20) & 15)] + _ch[(_ew(d, 24) & 15)] + _ch[(_ew(d, 28) & 15)]
}
;
_ax._ci = function(a) {
    var b = _ax._cj(a);
    if (b != null) {
        return b
    }
    return _ax._cj(a ^ _ca)
}
;
_ax._cj = function(d) {
    var b = 4294967295;
    var a = 0;
    for (var c = 0; c < _cb.length; c++) {
        var g = _cb[c];
        var f = g[0];
        if (f == d) {
            return new _ax(g[1])
        }
        var e = this._gj(d, f);
        if (e < b) {
            a = g[1];
            b = e
        }
    }
    if (b <= 3) {
        return new _ax(a)
    }
    return null
}
;
function _cg(a, c, b) {
    this._ff = a;
    this.bits = c;
    this.name = b;
    this.__defineGetter__("Bits", function() {
        return this.bits
    });
    this.__defineGetter__("Name", function() {
        return this.name
    });
    this.ordinal = function() {
        return this._ff
    }
}
_cg.forBits = function(a) {
    if (a < 0 || a >= FOR_BITS.Length) {
        throw "bad arguments"
    }
    return FOR_BITS[a]
}
;
var L = new _cg(0,1,"L");
var M = new _cg(1,0,"M");
var Q = new _cg(2,3,"Q");
var H = new _cg(3,2,"H");
var FOR_BITS = new Array(M,L,H,Q);
function _ac(d, a) {
    if (!a) {
        a = d
    }
    if (d < 1 || a < 1) {
        throw "Both dimensions must be greater than 0"
    }
    this.width = d;
    this.height = a;
    var c = d >> 5;
    if ((d & 31) != 0) {
        c++
    }
    this.rowSize = c;
    this.bits = new Array(c * a);
    for (var b = 0; b < this.bits.length; b++) {
        this.bits[b] = 0
    }
    this.__defineGetter__("Width", function() {
        return this.width
    });
    this.__defineGetter__("Height", function() {
        return this.height
    });
    this.__defineGetter__("Dimension", function() {
        if (this.width != this.height) {
            throw "Can't call getDimension() on a non-square matrix"
        }
        return this.width
    });
    this._ds = function(e, g) {
        var f = g * this.rowSize + (e >> 5);
        return ((_ew(this.bits[f], (e & 31))) & 1) != 0
    }
    ;
    this._dq = function(e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] |= 1 << (e & 31)
    }
    ;
    this.flip = function(e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] ^= 1 << (e & 31)
    }
    ;
    this.clear = function() {
        var e = this.bits.length;
        for (var f = 0; f < e; f++) {
            this.bits[f] = 0
        }
    }
    ;
    this._bq = function(g, j, f, m) {
        if (j < 0 || g < 0) {
            throw "Left and top must be nonnegative"
        }
        if (m < 1 || f < 1) {
            throw "Height and width must be at least 1"
        }
        var l = g + f;
        var e = j + m;
        if (e > this.height || l > this.width) {
            throw "The region must fit inside the matrix"
        }
        for (var i = j; i < e; i++) {
            var h = i * this.rowSize;
            for (var k = g; k < l; k++) {
                this.bits[h + (k >> 5)] |= 1 << (k & 31)
            }
        }
    }
}
function _dl(a, b) {
    this._dv = a;
    this._dw = b;
    this.__defineGetter__("_du", function() {
        return this._dv
    });
    this.__defineGetter__("Codewords", function() {
        return this._dw
    })
}
_dl._gn = function(c, h, s) {
    if (c.length != h._dp) {
        throw "bad arguments"
    }
    var k = h._bu(s);
    var e = 0;
    var d = k._fb();
    for (var r = 0; r < d.length; r++) {
        e += d[r].Count
    }
    var l = new Array(e);
    var n = 0;
    for (var o = 0; o < d.length; o++) {
        var f = d[o];
        for (var r = 0; r < f.Count; r++) {
            var m = f._dm;
            var t = k._bo + m;
            l[n++] = new _dl(m,new Array(t))
        }
    }
    var u = l[0]._dw.length;
    var b = l.length - 1;
    while (b >= 0) {
        var w = l[b]._dw.length;
        if (w == u) {
            break
        }
        b--
    }
    b++;
    var g = u - k._bo;
    var a = 0;
    for (var r = 0; r < g; r++) {
        for (var o = 0; o < n; o++) {
            l[o]._dw[r] = c[a++]
        }
    }
    for (var o = b; o < n; o++) {
        l[o]._dw[g] = c[a++]
    }
    var q = l[0]._dw.length;
    for (var r = g; r < q; r++) {
        for (var o = 0; o < n; o++) {
            var v = o < b ? r : r + 1;
            l[o]._dw[v] = c[a++]
        }
    }
    return l
}
;
function _cl(a) {
    var b = a.Dimension;
    if (b < 21 || (b & 3) != 1) {
        throw "Error _cl"
    }
    this._au = a;
    this._cp = null;
    this._co = null;
    this._dk = function(d, c, e) {
        return this._au._ds(d, c) ? (e << 1) | 1 : e << 1
    }
    ;
    this._cm = function() {
        if (this._co != null) {
            return this._co
        }
        var g = 0;
        for (var e = 0; e < 6; e++) {
            g = this._dk(e, 8, g)
        }
        g = this._dk(7, 8, g);
        g = this._dk(8, 8, g);
        g = this._dk(8, 7, g);
        for (var c = 5; c >= 0; c--) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        var f = this._au.Dimension;
        g = 0;
        var d = f - 8;
        for (var e = f - 1; e >= d; e--) {
            g = this._dk(e, 8, g)
        }
        for (var c = f - 7; c < f; c++) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        throw "Error _cm"
    }
    ;
    this._cq = function() {
        if (this._cp != null) {
            return this._cp
        }
        var h = this._au.Dimension;
        var f = (h - 17) >> 2;
        if (f <= 6) {
            return _a3._av(f)
        }
        var g = 0;
        var e = h - 11;
        for (var c = 5; c >= 0; c--) {
            for (var d = h - 9; d >= e; d--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        g = 0;
        for (var d = 5; d >= 0; d--) {
            for (var c = h - 9; c >= e; c--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        throw "Error _cq"
    }
    ;
    this._gk = function() {
        var r = this._cm();
        var o = this._cq();
        var c = _dx._gl(r._dx);
        var f = this._au.Dimension;
        c._dj(this._au, f);
        var k = o._aq();
        var n = true;
        var s = new Array(o._dp);
        var m = 0;
        var q = 0;
        var h = 0;
        for (var e = f - 1; e > 0; e -= 2) {
            if (e == 6) {
                e--
            }
            for (var l = 0; l < f; l++) {
                var g = n ? f - 1 - l : l;
                for (var d = 0; d < 2; d++) {
                    if (!k._ds(e - d, g)) {
                        h++;
                        q <<= 1;
                        if (this._au._ds(e - d, g)) {
                            q |= 1
                        }
                        if (h == 8) {
                            s[m++] = q;
                            h = 0;
                            q = 0
                        }
                    }
                }
            }
            n ^= true
        }
        if (m != o._dp) {
            throw "Error _gk"
        }
        return s
    }
}
const _dx = {};
_dx._gl = function(a) {
    if (a < 0 || a > 7) {
        throw "bad arguments"
    }
    return _dx._dy[a]
}
;
function _fg() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return ((b + a) & 1) == 0
    }
}
function _fh() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return (b & 1) == 0
    }
}
function _fi() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return a % 3 == 0
    }
}
function _fj() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return (b + a) % 3 == 0
    }
}
function _fk() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return (((_ew(b, 1)) + (a / 3)) & 1) == 0
    }
}
function _fl() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(c, b) {
        var a = c * b;
        return (a & 1) + (a % 3) == 0
    }
}
function _fm() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(c, b) {
        var a = c * b;
        return (((a & 1) + (a % 3)) & 1) == 0
    }
}
function _fn() {
    this._dj = function(c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    }
    ;
    this._fw = function(b, a) {
        return ((((b + a) & 1) + ((b * a) % 3)) & 1) == 0
    }
}
_dx._dy = new Array(new _fg(),new _fh(),new _fi(),new _fj(),new _fk(),new _fl(),new _fm(),new _fn());
function _db(_fa) {
    this._fa = _fa;
    this.decode = function(received, _fv) {
        var poly = new _bp(this._fa,received);
        var _dh = new Array(_fv);
        for (var i = 0; i < _dh.length; i++) {
            _dh[i] = 0
        }
        var _fq = false;
        var noError = true;
        for (var i = 0; i < _fv; i++) {
            var _eval = poly.evaluateAt(this._fa.exp(_fq ? i + 1 : i));
            _dh[_dh.length - 1 - i] = _eval;
            if (_eval != 0) {
                noError = false
            }
        }
        if (noError) {
            return
        }
        var _fu = new _bp(this._fa,_dh);
        var _dg = this._eb(this._fa._ba(_fv, 1), _fu, _fv);
        var sigma = _dg[0];
        var omega = _dg[1];
        var _dz = this._ey(sigma);
        var _ea = this._di(omega, _dz, _fq);
        for (var i = 0; i < _dz.length; i++) {
            var position = received.length - 1 - this._fa.log(_dz[i]);
            if (position < 0) {
                throw "ReedSolomonException Bad error location"
            }
            received[position] = _az._bd(received[position], _ea[i])
        }
    }
    ;
    this._eb = function(a, b, R) {
        if (a._ec < b._ec) {
            var temp = a;
            a = b;
            b = temp
        }
        var rLast = a;
        var r = b;
        var sLast = this._fa.One;
        var s = this._fa.Zero;
        var tLast = this._fa.Zero;
        var t = this._fa.One;
        while (r._ec >= Math.floor(R / 2)) {
            var rLastLast = rLast;
            var _ga = sLast;
            var _gb = tLast;
            rLast = r;
            sLast = s;
            tLast = t;
            if (rLast.Zero) {
                throw "r_{i-1} was zero"
            }
            r = rLastLast;
            var q = this._fa.Zero;
            var _df = rLast._ex(rLast._ec);
            var _fy = this._fa.inverse(_df);
            while (r._ec >= rLast._ec && !r.Zero) {
                var _fx = r._ec - rLast._ec;
                var scale = this._fa.multiply(r._ex(r._ec), _fy);
                q = q._bd(this._fa._ba(_fx, scale));
                r = r._bd(rLast._dc(_fx, scale))
            }
            s = q.multiply1(sLast)._bd(_ga);
            t = q.multiply1(tLast)._bd(_gb)
        }
        var _de = t._ex(0);
        if (_de == 0) {
            throw "ReedSolomonException sigmaTilde(0) was zero"
        }
        var inverse = this._fa.inverse(_de);
        var sigma = t.multiply2(inverse);
        var omega = r.multiply2(inverse);
        return new Array(sigma,omega)
    }
    ;
    this._ey = function(_ez) {
        var _fz = _ez._ec;
        if (_fz == 1) {
            return new Array(_ez._ex(1))
        }
        var result = new Array(_fz);
        var e = 0;
        for (var i = 1; i < 256 && e < _fz; i++) {
            if (_ez.evaluateAt(i) == 0) {
                result[e] = this._fa.inverse(i);
                e++
            }
        }
        if (e != _fz) {
            throw "Error locator degree does not match number of roots"
        }
        return result
    }
    ;
    this._di = function(_fs, _dz, _fq) {
        var s = _dz.length;
        var result = new Array(s);
        for (var i = 0; i < s; i++) {
            var _gc = this._fa.inverse(_dz[i]);
            var _dr = 1;
            for (var j = 0; j < s; j++) {
                if (i != j) {
                    _dr = this._fa.multiply(_dr, _az._bd(1, this._fa.multiply(_dz[j], _gc)))
                }
            }
            result[i] = this._fa.multiply(_fs.evaluateAt(_gc), this._fa.inverse(_dr));
            if (_fq) {
                result[i] = this._fa.multiply(result[i], _gc)
            }
        }
        return result
    }
}
function _bp(f, e) {
    if (e == null || e.length == 0) {
        throw "bad arguments"
    }
    this._fa = f;
    var c = e.length;
    if (c > 1 && e[0] == 0) {
        var d = 1;
        while (d < c && e[d] == 0) {
            d++
        }
        if (d == c) {
            this._dd = f.Zero._dd
        } else {
            this._dd = new Array(c - d);
            for (var b = 0; b < this._dd.length; b++) {
                this._dd[b] = 0
            }
            for (var a = 0; a < this._dd.length; a++) {
                this._dd[a] = e[d + a]
            }
        }
    } else {
        this._dd = e
    }
    this.__defineGetter__("Zero", function() {
        return this._dd[0] == 0
    });
    this.__defineGetter__("_ec", function() {
        return this._dd.length - 1
    });
    this.__defineGetter__("Coefficients", function() {
        return this._dd
    });
    this._ex = function(g) {
        return this._dd[this._dd.length - 1 - g]
    }
    ;
    this.evaluateAt = function(h) {
        if (h == 0) {
            return this._ex(0)
        }
        var l = this._dd.length;
        if (h == 1) {
            var g = 0;
            for (var k = 0; k < l; k++) {
                g = _az._bd(g, this._dd[k])
            }
            return g
        }
        var j = this._dd[0];
        for (var k = 1; k < l; k++) {
            j = _az._bd(this._fa.multiply(h, j), this._dd[k])
        }
        return j
    }
    ;
    this._bd = function(g) {
        if (this._fa != g._fa) {
            throw "GF256Polys do not have same _az _fa"
        }
        if (this.Zero) {
            return g
        }
        if (g.Zero) {
            return this
        }
        var o = this._dd;
        var n = g._dd;
        if (o.length > n.length) {
            var j = o;
            o = n;
            n = j
        }
        var h = new Array(n.length);
        var k = n.length - o.length;
        for (var m = 0; m < k; m++) {
            h[m] = n[m]
        }
        for (var l = k; l < n.length; l++) {
            h[l] = _az._bd(o[l - k], n[l])
        }
        return new _bp(f,h)
    }
    ;
    this.multiply1 = function(o) {
        if (this._fa != o._fa) {
            throw "GF256Polys do not have same _az _fa"
        }
        if (this.Zero || o.Zero) {
            return this._fa.Zero
        }
        var r = this._dd;
        var g = r.length;
        var l = o._dd;
        var n = l.length;
        var q = new Array(g + n - 1);
        for (var m = 0; m < g; m++) {
            var h = r[m];
            for (var k = 0; k < n; k++) {
                q[m + k] = _az._bd(q[m + k], this._fa.multiply(h, l[k]))
            }
        }
        return new _bp(this._fa,q)
    }
    ;
    this.multiply2 = function(g) {
        if (g == 0) {
            return this._fa.Zero
        }
        if (g == 1) {
            return this
        }
        var j = this._dd.length;
        var k = new Array(j);
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa,k)
    }
    ;
    this._dc = function(l, g) {
        if (l < 0) {
            throw "bad arguments"
        }
        if (g == 0) {
            return this._fa.Zero
        }
        var j = this._dd.length;
        var k = new Array(j + l);
        for (var h = 0; h < k.length; h++) {
            k[h] = 0
        }
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa,k)
    }
    ;
    this.divide = function(l) {
        if (this._fa != l._fa) {
            throw "GF256Polys do not have same _az _fa"
        }
        if (l.Zero) {
            throw "Divide by 0"
        }
        var j = this._fa.Zero;
        var o = this;
        var g = l._ex(l._ec);
        var n = this._fa.inverse(g);
        while (o._ec >= l._ec && !o.Zero) {
            var m = o._ec - l._ec;
            var h = this._fa.multiply(o._ex(o._ec), n);
            var i = l._dc(m, h);
            var k = this._fa._ba(m, h);
            j = j._bd(k);
            o = o._bd(i)
        }
        return new Array(j,o)
    }
}
function _az(b) {
    this._gh = new Array(256);
    this._gi = new Array(256);
    var a = 1;
    for (var e = 0; e < 256; e++) {
        this._gh[e] = a;
        a <<= 1;
        if (a >= 256) {
            a ^= b
        }
    }
    for (var e = 0; e < 255; e++) {
        this._gi[this._gh[e]] = e
    }
    var d = new Array(1);
    d[0] = 0;
    this.zero = new _bp(this,new Array(d));
    var c = new Array(1);
    c[0] = 1;
    this.one = new _bp(this,new Array(c));
    this.__defineGetter__("Zero", function() {
        return this.zero
    });
    this.__defineGetter__("One", function() {
        return this.one
    });
    this._ba = function(j, f) {
        if (j < 0) {
            throw "bad arguments"
        }
        if (f == 0) {
            return zero
        }
        var h = new Array(j + 1);
        for (var g = 0; g < h.length; g++) {
            h[g] = 0
        }
        h[0] = f;
        return new _bp(this,h)
    }
    ;
    this.exp = function(f) {
        return this._gh[f]
    }
    ;
    this.log = function(f) {
        if (f == 0) {
            throw "bad arguments"
        }
        return this._gi[f]
    }
    ;
    this.inverse = function(f) {
        if (f == 0) {
            throw "System.ArithmeticException"
        }
        return this._gh[255 - this._gi[f]]
    }
    ;
    this.multiply = function(g, f) {
        if (g == 0 || f == 0) {
            return 0
        }
        if (g == 1) {
            return f
        }
        if (f == 1) {
            return g
        }
        return this._gh[(this._gi[g] + this._gi[f]) % 255]
    }
}
_az._bb = new _az(285);
_az._bc = new _az(301);
_az._bd = function(d, c) {
    return d ^ c
}
;
const Decoder = {};
Decoder.rsDecoder = new _db(_az._bb);
Decoder.correctErrors = function(g, b) {
    var d = g.length;
    var f = new Array(d);
    for (var e = 0; e < d; e++) {
        f[e] = g[e] & 255
    }
    var a = g.length - b;
    try {
        Decoder.rsDecoder.decode(f, a)
    } catch (c) {
        throw c
    }
    for (var e = 0; e < b; e++) {
        g[e] = f[e]
    }
}
;
Decoder.decode = function(r) {
    var b = new _cl(r);
    var o = b._cq();
    var c = b._cm()._cg;
    var q = b._gk();
    var a = _dl._gn(q, o, c);
    var f = 0;
    for (var k = 0; k < a.Length; k++) {
        f += a[k]._du
    }
    var e = new Array(f);
    var n = 0;
    for (var h = 0; h < a.length; h++) {
        var m = a[h];
        var d = m.Codewords;
        var g = m._du;
        Decoder.correctErrors(d, g);
        for (var k = 0; k < g; k++) {
            e[n++] = d[k]
        }
    }
    return new QRCodeDataBlockReader(e, o._fd, c.Bits)
}
;
const qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode.debug = false;
qrcode._eo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];
qrcode.callback = null;
qrcode.decode = function(imageData,ctx2D) {
    qrcode.width = imageData.width;
    qrcode.height= imageData.height;
    qrcode.imagedata = imageData;
    qrcode.result = qrcode.process(ctx2D);
    return qrcode.result
}
;
qrcode.decode_utf8 = function(a) {
    return decodeURIComponent(escape(a))
}
;
qrcode.process = function(r) {
    var a = new Date().getTime();
    var c = qrcode.grayScaleToBitmap(qrcode.grayscale());
    if (qrcode.debug) {
        for (var m = 0; m < qrcode.height; m++) {
            for (var n = 0; n < qrcode.width; n++) {
                var o = (n * 4) + (m * qrcode.width * 4);
                qrcode.imagedata.data[o] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 1] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 2] = c[n + m * qrcode.width] ? 255 : 0
            }
        }
        r.putImageData(qrcode.imagedata, 0, 0)
    }
    var h = new Detector(c);
    var q = h.detect();
    if (qrcode.debug) {
        r.putImageData(qrcode.imagedata, 0, 0)
    }
    var k = Decoder.decode(q.bits);
    var g = k.DataByte;
    var l = "";
    for (var f = 0; f < g.length; f++) {
        for (var e = 0; e < g[f].length; e++) {
            l += String.fromCharCode(g[f][e])
        }
    }
    var d = new Date().getTime();
    var b = d - a;
    return qrcode.decode_utf8(l)
}
;
qrcode.getPixel = function(a, b) {
    if (qrcode.width < a) {
        throw "point error"
    }
    if (qrcode.height < b) {
        throw "point error"
    }
    const point = (a * 4) + (b * qrcode.width * 4);
    return (qrcode.imagedata.data[point] * 33 + qrcode.imagedata.data[point + 1] * 34 + qrcode.imagedata.data[point + 2] * 33) / 100
}
;
qrcode.binarize = function(d) {
    var c = new Array(qrcode.width * qrcode.height);
    for (var e = 0; e < qrcode.height; e++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, e);
            c[b + e * qrcode.width] = a <= d ? true : false
        }
    }
    return c
}
;
qrcode._em = function(d) {
    var c = 4;
    var k = Math.floor(qrcode.width / c);
    var j = Math.floor(qrcode.height / c);
    var f = new Array(c);
    for (var g = 0; g < c; g++) {
        f[g] = new Array(c);
        for (var e = 0; e < c; e++) {
            f[g][e] = new Array(0,0)
        }
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            f[a][o][0] = 255;
            for (var l = 0; l < j; l++) {
                for (var n = 0; n < k; n++) {
                    var h = d[k * a + n + (j * o + l) * qrcode.width];
                    if (h < f[a][o][0]) {
                        f[a][o][0] = h
                    }
                    if (h > f[a][o][1]) {
                        f[a][o][1] = h
                    }
                }
            }
        }
    }
    var m = new Array(c);
    for (var b = 0; b < c; b++) {
        m[b] = new Array(c)
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            m[a][o] = Math.floor((f[a][o][0] + f[a][o][1]) / 2)
        }
    }
    return m
}
;
qrcode.grayScaleToBitmap = function(f) {
    var j = qrcode._em(f);
    var b = j.length;
    var e = Math.floor(qrcode.width / b);
    var d = Math.floor(qrcode.height / b);
    var c = new Array(qrcode.height * qrcode.width);
    for (var i = 0; i < b; i++) {
        for (var a = 0; a < b; a++) {
            for (var g = 0; g < d; g++) {
                for (var h = 0; h < e; h++) {
                    c[e * a + h + (d * i + g) * qrcode.width] = (f[e * a + h + (d * i + g) * qrcode.width] < j[a][i]) ? true : false
                }
            }
        }
    }
    return c
}
;
qrcode.grayscale = function() {
    var c = new Array(qrcode.width * qrcode.height);
    for (var d = 0; d < qrcode.height; d++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, d);
            c[b + d * qrcode.width] = a
        }
    }
    return c
}
;
function _ew(a, b) {
    if (a >= 0) {
        return a >> b
    } else {
        return (a >> b) + (2 << ~b)
    }
}
Array.prototype.remove = function(c, b) {
    var a = this.slice((b || c) + 1 || this.length);
    this.length = c < 0 ? this.length + c : c;
    return this.push.apply(this, a)
}
;
var _gf = 3;
var _eh = 57;
var _el = 8;
var _eg = 2;
qrcode._er = function(c) {
    function b(l, k) {
        const xDiff = l.X - k.X;
        const yDiff = l.Y - k.Y;
        return Math.sqrt((xDiff * xDiff + yDiff * yDiff))
    }
    function d(k, o, n) {
        var m = o.x;
        var l = o.y;
        return ((n.x - m) * (k.y - l)) - ((n.y - l) * (k.x - m))
    }
    var i = b(c[0], c[1]);
    var f = b(c[1], c[2]);
    var e = b(c[0], c[2]);
    var a, j, h;
    if (f >= i && f >= e) {
        j = c[0];
        a = c[1];
        h = c[2]
    } else {
        if (e >= f && e >= i) {
            j = c[1];
            a = c[0];
            h = c[2]
        } else {
            j = c[2];
            a = c[0];
            h = c[1]
        }
    }
    if (d(a, j, h) < 0) {
        var g = a;
        a = h;
        h = g
    }
    c[0] = a;
    c[1] = j;
    c[2] = h
}
;
function _cz(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function() {
        return this._aj
    });
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("X", function() {
        return this.x
    });
    this.__defineGetter__("Y", function() {
        return this.y
    });
    this._ek = function() {
        this.count++
    }
    ;
    this._ev = function(f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}
function _es(a) {
    this._go = a[0];
    this._gu = a[1];
    this._gr = a[2];
    this.__defineGetter__("_gp", function() {
        return this._go
    });
    this.__defineGetter__("_gq", function() {
        return this._gu
    });
    this.__defineGetter__("_gs", function() {
        return this._gr
    })
}
function _cc() {
    this.image = null;
    this._cv = [];
    this._ge = false;
    this._al = new Array(0,0,0,0,0);
    this._am = null;
    this.__defineGetter__("_da", function() {
        this._al[0] = 0;
        this._al[1] = 0;
        this._al[2] = 0;
        this._al[3] = 0;
        this._al[4] = 0;
        return this._al
    });
    this._ao = function(f) {
        var b = 0;
        for (var d = 0; d < 5; d++) {
            var e = f[d];
            if (e == 0) {
                return false
            }
            b += e
        }
        if (b < 7) {
            return false
        }
        var c = Math.floor((b << _el) / 7);
        var a = Math.floor(c / 2);
        return Math.abs(c - (f[0] << _el)) < a && Math.abs(c - (f[1] << _el)) < a && Math.abs(3 * c - (f[2] << _el)) < 3 * a && Math.abs(c - (f[3] << _el)) < a && Math.abs(c - (f[4] << _el)) < a
    }
    ;
    this._an = function(b, a) {
        return (a - b[4] - b[3]) - b[2] / 2
    }
    ;
    this._ap = function(a, j, d, g) {
        var c = this.image;
        var h = qrcode.height;
        var b = this._da;
        var f = a;
        while (f >= 0 && c[j + f * qrcode.width]) {
            b[2]++;
            f--
        }
        if (f < 0) {
            return NaN
        }
        while (f >= 0 && !c[j + f * qrcode.width] && b[1] <= d) {
            b[1]++;
            f--
        }
        if (f < 0 || b[1] > d) {
            return NaN
        }
        while (f >= 0 && c[j + f * qrcode.width] && b[0] <= d) {
            b[0]++;
            f--
        }
        if (b[0] > d) {
            return NaN
        }
        f = a + 1;
        while (f < h && c[j + f * qrcode.width]) {
            b[2]++;
            f++
        }
        if (f == h) {
            return NaN
        }
        while (f < h && !c[j + f * qrcode.width] && b[3] < d) {
            b[3]++;
            f++
        }
        if (f == h || b[3] >= d) {
            return NaN
        }
        while (f < h && c[j + f * qrcode.width] && b[4] < d) {
            b[4]++;
            f++
        }
        if (b[4] >= d) {
            return NaN
        }
        var e = b[0] + b[1] + b[2] + b[3] + b[4];
        if (5 * Math.abs(e - g) >= 2 * g) {
            return NaN
        }
        return this._ao(b) ? this._an(b, f) : NaN
    }
    ;
    this._ej = function(b, a, e, h) {
        var d = this.image;
        var i = qrcode.width;
        var c = this._da;
        var g = b;
        while (g >= 0 && d[g + a * qrcode.width]) {
            c[2]++;
            g--
        }
        if (g < 0) {
            return NaN
        }
        while (g >= 0 && !d[g + a * qrcode.width] && c[1] <= e) {
            c[1]++;
            g--
        }
        if (g < 0 || c[1] > e) {
            return NaN
        }
        while (g >= 0 && d[g + a * qrcode.width] && c[0] <= e) {
            c[0]++;
            g--
        }
        if (c[0] > e) {
            return NaN
        }
        g = b + 1;
        while (g < i && d[g + a * qrcode.width]) {
            c[2]++;
            g++
        }
        if (g == i) {
            return NaN
        }
        while (g < i && !d[g + a * qrcode.width] && c[3] < e) {
            c[3]++;
            g++
        }
        if (g == i || c[3] >= e) {
            return NaN
        }
        while (g < i && d[g + a * qrcode.width] && c[4] < e) {
            c[4]++;
            g++
        }
        if (c[4] >= e) {
            return NaN
        }
        var f = c[0] + c[1] + c[2] + c[3] + c[4];
        if (5 * Math.abs(f - h) >= h) {
            return NaN
        }
        return this._ao(c) ? this._an(c, g) : NaN
    }
    ;
    this._cu = function(c, f, e) {
        var d = c[0] + c[1] + c[2] + c[3] + c[4];
        var n = this._an(c, e);
        var b = this._ap(f, Math.floor(n), c[2], d);
        if (!isNaN(b)) {
            n = this._ej(Math.floor(n), Math.floor(b), c[2], d);
            if (!isNaN(n)) {
                var l = d / 7;
                var m = false;
                var h = this._cv.length;
                for (var g = 0; g < h; g++) {
                    var a = this._cv[g];
                    if (a._ev(l, b, n)) {
                        a._ek();
                        m = true;
                        break
                    }
                }
                if (!m) {
                    var k = new _cz(n,b,l);
                    this._cv.push(k);
                    if (this._am != null) {
                        this._am._ep(k)
                    }
                }
                return true
            }
        }
        return false
    }
    ;
    this._ee = function() {
        var a = this._cv.length;
        if (a < 3) {
            throw "Couldn't find enough finder patterns"
        }
        if (a > 3) {
            var b = 0;
            for (var c = 0; c < a; c++) {
                b += this._cv[c]._ei
            }
            var d = b / a;
            for (var c = 0; c < this._cv.length && this._cv.length > 3; c++) {
                var e = this._cv[c];
                if (Math.abs(e._ei - d) > 0.2 * d) {
                    this._cv.remove(c);
                    c--
                }
            }
        }
        if (this._cv.length > 3) {
            this._cv.sort(function(g, f) {
                if (g.count > f.count) {
                    return -1
                }
                if (g.count < f.count) {
                    return 1
                }
                return 0
            })
        }
        return new Array(this._cv[0],this._cv[1],this._cv[2])
    }
    ;
    this._eq = function() {
        var b = this._cv.length;
        if (b <= 1) {
            return 0
        }
        var c = null;
        for (var d = 0; d < b; d++) {
            var a = this._cv[d];
            if (a.Count >= _eg) {
                if (c == null) {
                    c = a
                } else {
                    this._ge = true;
                    return Math.floor((Math.abs(c.X - a.X) - Math.abs(c.Y - a.Y)) / 2)
                }
            }
        }
        return 0
    }
    ;
    this._cx = function() {
        var g = 0;
        var c = 0;
        var a = this._cv.length;
        for (var d = 0; d < a; d++) {
            var f = this._cv[d];
            if (f.Count >= _eg) {
                g++;
                c += f._ei
            }
        }
        if (g < 3) {
            return false
        }
        var e = c / a;
        var b = 0;
        for (var d = 0; d < a; d++) {
            f = this._cv[d];
            b += Math.abs(f._ei - e)
        }
        return b <= 0.05 * c
    }
    ;
    this._ce = function(e) {
        var o = false;
        this.image = e;
        var n = qrcode.height;
        var k = qrcode.width;
        var a = Math.floor((3 * n) / (4 * _eh));
        if (a < _gf || o) {
            a = _gf
        }
        var g = false;
        var d = new Array(5);
        for (var h = a - 1; h < n && !g; h += a) {
            d[0] = 0;
            d[1] = 0;
            d[2] = 0;
            d[3] = 0;
            d[4] = 0;
            var b = 0;
            for (var f = 0; f < k; f++) {
                if (e[f + h * qrcode.width]) {
                    if ((b & 1) == 1) {
                        b++
                    }
                    d[b]++
                } else {
                    if ((b & 1) == 0) {
                        if (b == 4) {
                            if (this._ao(d)) {
                                var c = this._cu(d, h, f);
                                if (c) {
                                    a = 2;
                                    if (this._ge) {
                                        g = this._cx()
                                    } else {
                                        var m = this._eq();
                                        if (m > d[2]) {
                                            h += m - d[2] - a;
                                            f = k - 1
                                        }
                                    }
                                } else {
                                    do {
                                        f++
                                    } while (f < k && !e[f + h * qrcode.width]);
                                    f--
                                }
                                b = 0;
                                d[0] = 0;
                                d[1] = 0;
                                d[2] = 0;
                                d[3] = 0;
                                d[4] = 0
                            } else {
                                d[0] = d[2];
                                d[1] = d[3];
                                d[2] = d[4];
                                d[3] = 1;
                                d[4] = 0;
                                b = 3
                            }
                        } else {
                            d[++b]++
                        }
                    } else {
                        d[b]++
                    }
                }
            }
            if (this._ao(d)) {
                var c = this._cu(d, h, k);
                if (c) {
                    a = d[0];
                    if (this._ge) {
                        g = _cx()
                    }
                }
            }
        }
        var l = this._ee();
        qrcode._er(l);
        return new _es(l)
    }
}
function _ai(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function() {
        return this._aj
    });
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("X", function() {
        return Math.floor(this.x)
    });
    this.__defineGetter__("Y", function() {
        return Math.floor(this.y)
    });
    this._ek = function() {
        this.count++
    }
    ;
    this._ev = function(f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}
function _ak(g, c, b, f, a, e, d) {
    this.image = g;
    this._cv = new Array();
    this.startX = c;
    this.startY = b;
    this.width = f;
    this.height = a;
    this._ef = e;
    this._al = new Array(0,0,0);
    this._am = d;
    this._an = function(i, h) {
        return (h - i[2]) - i[1] / 2
    }
    ;
    this._ao = function(l) {
        var k = this._ef;
        var h = k / 2;
        for (var j = 0; j < 3; j++) {
            if (Math.abs(k - l[j]) >= h) {
                return false
            }
        }
        return true
    }
    ;
    this._ap = function(h, r, l, o) {
        var k = this.image;
        var q = qrcode.height;
        var j = this._al;
        j[0] = 0;
        j[1] = 0;
        j[2] = 0;
        var n = h;
        while (n >= 0 && k[r + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n--
        }
        if (n < 0 || j[1] > l) {
            return NaN
        }
        while (n >= 0 && !k[r + n * qrcode.width] && j[0] <= l) {
            j[0]++;
            n--
        }
        if (j[0] > l) {
            return NaN
        }
        n = h + 1;
        while (n < q && k[r + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n++
        }
        if (n == q || j[1] > l) {
            return NaN
        }
        while (n < q && !k[r + n * qrcode.width] && j[2] <= l) {
            j[2]++;
            n++
        }
        if (j[2] > l) {
            return NaN
        }
        var m = j[0] + j[1] + j[2];
        if (5 * Math.abs(m - o) >= 2 * o) {
            return NaN
        }
        return this._ao(j) ? this._an(j, n) : NaN
    }
    ;
    this._cu = function(l, o, n) {
        var m = l[0] + l[1] + l[2];
        var u = this._an(l, n);
        var k = this._ap(o, Math.floor(u), 2 * l[1], m);
        if (!isNaN(k)) {
            var t = (l[0] + l[1] + l[2]) / 3;
            var r = this._cv.length;
            for (var q = 0; q < r; q++) {
                var h = this._cv[q];
                if (h._ev(t, k, u)) {
                    return new _ai(u,k,t)
                }
            }
            var s = new _ai(u,k,t);
            this._cv.push(s);
            if (this._am != null) {
                this._am._ep(s)
            }
        }
        return null
    }
    ;
    this.find = function() {
        var q = this.startX;
        var t = this.height;
        var r = q + f;
        var s = b + (t >> 1);
        var m = new Array(0,0,0);
        for (var k = 0; k < t; k++) {
            var o = s + ((k & 1) == 0 ? ((k + 1) >> 1) : -((k + 1) >> 1));
            m[0] = 0;
            m[1] = 0;
            m[2] = 0;
            var n = q;
            while (n < r && !g[n + qrcode.width * o]) {
                n++
            }
            var h = 0;
            while (n < r) {
                if (g[n + o * qrcode.width]) {
                    if (h == 1) {
                        m[h]++
                    } else {
                        if (h == 2) {
                            if (this._ao(m)) {
                                var l = this._cu(m, o, n);
                                if (l != null) {
                                    return l
                                }
                            }
                            m[0] = m[2];
                            m[1] = 1;
                            m[2] = 0;
                            h = 1
                        } else {
                            m[++h]++
                        }
                    }
                } else {
                    if (h == 1) {
                        h++
                    }
                    m[h]++
                }
                n++
            }
            if (this._ao(m)) {
                var l = this._cu(m, o, r);
                if (l != null) {
                    return l
                }
            }
        }
        if (!(this._cv.length == 0)) {
            return this._cv[0]
        }
        throw "Couldn't find enough alignment patterns"
    }
}
function QRCodeDataBlockReader(c, a, b) {
    this._ed = 0;
    this._cw = 7;
    this.dataLength = 0;
    this.blocks = c;
    this._en = b;
    if (a <= 9) {
        this.dataLengthMode = 0
    } else {
        if (a >= 10 && a <= 26) {
            this.dataLengthMode = 1
        } else {
            if (a >= 27 && a <= 40) {
                this.dataLengthMode = 2
            }
        }
    }
    this._gd = function(f) {
        var k = 0;
        if (f < this._cw + 1) {
            var m = 0;
            for (var e = 0; e < f; e++) {
                m += (1 << e)
            }
            m <<= (this._cw - f + 1);
            k = (this.blocks[this._ed] & m) >> (this._cw - f + 1);
            this._cw -= f;
            return k
        } else {
            if (f < this._cw + 1 + 8) {
                var j = 0;
                for (var e = 0; e < this._cw + 1; e++) {
                    j += (1 << e)
                }
                k = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                this._ed++;
                k += ((this.blocks[this._ed]) >> (8 - (f - (this._cw + 1))));
                this._cw = this._cw - f % 8;
                if (this._cw < 0) {
                    this._cw = 8 + this._cw
                }
                return k
            } else {
                if (f < this._cw + 1 + 16) {
                    var j = 0;
                    var h = 0;
                    for (var e = 0; e < this._cw + 1; e++) {
                        j += (1 << e)
                    }
                    var g = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                    this._ed++;
                    var d = this.blocks[this._ed] << (f - (this._cw + 1 + 8));
                    this._ed++;
                    for (var e = 0; e < f - (this._cw + 1 + 8); e++) {
                        h += (1 << e)
                    }
                    h <<= 8 - (f - (this._cw + 1 + 8));
                    var l = (this.blocks[this._ed] & h) >> (8 - (f - (this._cw + 1 + 8)));
                    k = g + d + l;
                    this._cw = this._cw - (f - 8) % 8;
                    if (this._cw < 0) {
                        this._cw = 8 + this._cw
                    }
                    return k
                } else {
                    return 0
                }
            }
        }
    }
    ;
    this.NextMode = function() {
        if ((this._ed > this.blocks.length - this._en - 2)) {
            return 0
        } else {
            return this._gd(4)
        }
    }
    ;
    this.getDataLength = function(d) {
        var e = 0;
        while (true) {
            if ((d >> e) == 1) {
                break
            }
            e++
        }
        return this._gd(qrcode._eo[this.dataLengthMode][e])
    }
    ;
    this.getRomanAndFigureString = function(h) {
        var f = h;
        var g = 0;
        var j = "";
        var d = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":");
        do {
            if (f > 1) {
                g = this._gd(11);
                var i = Math.floor(g / 45);
                var e = g % 45;
                j += d[i];
                j += d[e];
                f -= 2
            } else {
                if (f == 1) {
                    g = this._gd(6);
                    j += d[g];
                    f -= 1
                }
            }
        } while (f > 0);
        return j
    }
    ;
    this.getFigureString = function(f) {
        var d = f;
        var e = 0;
        var g = "";
        do {
            if (d >= 3) {
                e = this._gd(10);
                if (e < 100) {
                    g += "0"
                }
                if (e < 10) {
                    g += "0"
                }
                d -= 3
            } else {
                if (d == 2) {
                    e = this._gd(7);
                    if (e < 10) {
                        g += "0"
                    }
                    d -= 2
                } else {
                    if (d == 1) {
                        e = this._gd(4);
                        d -= 1
                    }
                }
            }
            g += e
        } while (d > 0);
        return g
    }
    ;
    this.get8bitByteArray = function(g) {
        var e = g;
        var f = 0;
        var d = new Array();
        do {
            f = this._gd(8);
            d.push(f);
            e--
        } while (e > 0);
        return d
    }
    ;
    this.getKanjiString = function(j) {
        var g = j;
        var i = 0;
        var h = "";
        do {
            i = _gd(13);
            var e = i % 192;
            var f = i / 192;
            var k = (f << 8) + e;
            var d = 0;
            if (k + 33088 <= 40956) {
                d = k + 33088
            } else {
                d = k + 49472
            }
            h += String.fromCharCode(d);
            g--
        } while (g > 0);
        return h
    }
    ;
    this.__defineGetter__("DataByte", function() {
        var g = new Array();
        var e = 1;
        var f = 2;
        var d = 4;
        var n = 8;
        do {
            var k = this.NextMode();
            if (k == 0) {
                if (g.length > 0) {
                    break
                } else {
                    throw "Empty data block"
                }
            }
            if (k != e && k != f && k != d && k != n) {
                throw "Invalid mode: " + k + " in (block:" + this._ed + " bit:" + this._cw + ")"
            }
            const dataLength = this.getDataLength(k);
            if (dataLength < 1) {
                throw "Invalid data length: " + dataLength
            }
            switch (k) {
                case e:
                    var l = this.getFigureString(dataLength);
                    var i = new Array(l.length);
                    for (var h = 0; h < l.length; h++) {
                        i[h] = l.charCodeAt(h)
                    }
                    g.push(i);
                    break;
                case f:
                    var l = this.getRomanAndFigureString(dataLength);
                    var i = new Array(l.length);
                    for (var h = 0; h < l.length; h++) {
                        i[h] = l.charCodeAt(h)
                    }
                    g.push(i);
                    break;
                case d:
                    var m = this.get8bitByteArray(dataLength);
                    g.push(m);
                    break;
                case n:
                    var l = this.getKanjiString(dataLength);
                    g.push(l);
                    break
            }
        } while (true);
        return g
    })
}

/**
 * CallBacks:
 * __________________________________________________________________________________
 * All the callback function should have one parameter:
 * function(result){};
 * And the result parameter will contain an array of objects that look like BarcodeReader.
 * result = [{Format: the barcode type, Value: the value of the barcode}];
 * __________________________________________________________________________________
 *
 * You can use either the set functions or just access the properties directly to set callback or
 * other properties. Just always remember to call Init() before starting to decode something never mess
 * around with the SupportedFormats property.
 *
 */
BarcodeReader = {
  Config: {
    Multiple: true,
    DecodeFormats: ["Code128", "Code93", "Code39", "EAN-13", "2Of5", "Inter2Of5", "Codabar"],
    ForceUnique: true,
    LocalizationFeedback: false,
    SkipOrientation: false
  },
  SupportedFormats: ["Code128", "Code93", "Code39", "EAN-13", "2Of5", "Inter2Of5", "Codabar"],
  ScanCanvas: null,
  ScanContext: null,
  SquashCanvas: document.createElement("canvas"),
  ImageCallback: null,
  StreamCallback: null,
  LocalizationCallback: null,
  Stream: null,
  DecodeStreamActive: false,
  Decoded: [],
  DecoderWorker: new Worker( URL.createObjectURL(new Blob([decoderWorkerBlobString], {type: "application/javascript"}) ) ),
  OrientationCallback: null,
  Init: function() {
    BarcodeReader.ScanCanvas = BarcodeReader.FixCanvas(document.createElement("canvas"));
    BarcodeReader.ScanCanvas.width = 640;
    BarcodeReader.ScanCanvas.height = 480;
    BarcodeReader.ScanContext = BarcodeReader.ScanCanvas.getContext("2d");
  },
  SetRotationSkip: function(value) {
    BarcodeReader.Config.SkipOrientation = value;
  },
  SetImageCallback: function(callBack) {
    BarcodeReader.ImageCallback = callBack;
  },
  SetStreamCallback: function(callBack) {
    BarcodeReader.StreamCallback = callBack;
  },
  SetLocalizationCallback: function(callBack) {
    BarcodeReader.LocalizationCallback = callBack;
    BarcodeReader.Config.LocalizationFeedback = true;
  },
  SwitchLocalizationFeedback: function(bool) {
    BarcodeReader.Config.LocalizationFeedback = bool;
  },
  DecodeSingleBarcode: function() {
    BarcodeReader.Config.Multiple = false;
  },
  DecodeMultiple: function() {
    BarcodeReader.Config.Multiple = true;
  },
  SetDecodeFormats: function(formats) {
    BarcodeReader.Config.DecodeFormats = [];
    for (var i = 0; i < formats.length; i++) {
      if (BarcodeReader.SupportedFormats.indexOf(formats[i]) !== -1) {
        BarcodeReader.Config.DecodeFormats.push(formats[i]);
      }
    }
    if (BarcodeReader.Config.DecodeFormats.length === 0) {
      BarcodeReader.Config.DecodeFormats = BarcodeReader.SupportedFormats.slice();
    }
  },
  SkipFormats: function(formats) {
    for (var i = 0; i < formats.length; i++) {
      var index = BarcodeReader.Config.DecodeFormats.indexOf(formats[i]);
      if (index >= 0) {
        BarcodeReader.Config.DecodeFormats.splice(index, 1);
      }
    }
  },
  AddFormats: function(formats) {
    for (var i = 0; i < formats.length; i++) {
      if (BarcodeReader.SupportedFormats.indexOf(formats[i]) !== -1) {
        if (BarcodeReader.Config.DecodeFormats.indexOf(formats[i]) === -1) {
          BarcodeReader.Config.DecodeFormats.push(formats[i]);
        }
      }
    }
  },
  BarcodeReaderImageCallback: function(e) {
    if (e.data.success === "localization") {
      if (BarcodeReader.Config.LocalizationFeedback) {
        BarcodeReader.LocalizationCallback(e.data.result);
      }
      return;
    }
    if (e.data.success === "orientationData") {
      BarcodeReader.OrientationCallback(e.data.result);
      return;
    }
    var filteredData = [];
    for (var i = 0; i < e.data.result.length; i++) {
      if (BarcodeReader.Decoded.indexOf(e.data.result[i].Value) === -1 || BarcodeReader.Config.ForceUnique === false) {
        filteredData.push(e.data.result[i]);
        if (BarcodeReader.Config.ForceUnique) BarcodeReader.Decoded.push(e.data.result[i].Value);
      }
    }
    BarcodeReader.ImageCallback(filteredData);
    BarcodeReader.Decoded = [];
  },
  BarcodeReaderStreamCallback: function(e) {
    if (e.data.success === "localization") {
      if (BarcodeReader.Config.LocalizationFeedback) {
        BarcodeReader.LocalizationCallback(e.data.result);
      }
      return;
    }
    if (e.data.success && BarcodeReader.DecodeStreamActive) {
      var filteredData = [];
      for (var i = 0; i < e.data.result.length; i++) {
        if (BarcodeReader.Decoded.indexOf(e.data.result[i].Value) === -1 || BarcodeReader.ForceUnique === false) {
          filteredData.push(e.data.result[i]);
          if (BarcodeReader.ForceUnique) BarcodeReader.Decoded.push(e.data.result[i].Value);
        }
      }
      if (filteredData.length > 0) {
        BarcodeReader.StreamCallback(filteredData);
      }
    }
    if (BarcodeReader.DecodeStreamActive) {
      BarcodeReader.ScanContext.drawImage(BarcodeReader.Stream, 0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height);
      BarcodeReader.DecoderWorker.postMessage({
        scan: BarcodeReader.ScanContext.getImageData(0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height).data,
        scanWidth: BarcodeReader.ScanCanvas.width,
        scanHeight: BarcodeReader.ScanCanvas.height,
        multiple: BarcodeReader.Config.Multiple,
        decodeFormats: BarcodeReader.Config.DecodeFormats,
        cmd: "normal",
        rotation: 1,
      });
    }
    if (!BarcodeReader.DecodeStreamActive) {
      BarcodeReader.Decoded = [];
    }
  },
  DecodeImage: function(image) {
		var img = new Image();
    if (image instanceof Image || image instanceof HTMLImageElement) {
      image.exifdata = false;
      if (image.complete) {
        if (BarcodeReader.Config.SkipOrientation) {
          BarcodeReader.BarcodeReaderDecodeImage(image, 1, "");
        } else {
          EXIF.getData(image, function(exifImage) {
            var orientation = EXIF.getTag(exifImage, "Orientation");
            var sceneType = EXIF.getTag(exifImage, "SceneCaptureType");
            if (typeof orientation !== 'number') orientation = 1;
            BarcodeReader.BarcodeReaderDecodeImage(exifImage, orientation, sceneType);
          });
        }
      } else {
        img.onload = function() {
          if (BarcodeReader.Config.SkipOrientation) {
            BarcodeReader.BarcodeReaderDecodeImage(img, 1, "");
          } else {
            EXIF.getData(this, function(exifImage) {
              var orientation = EXIF.getTag(exifImage, "Orientation");
              var sceneType = EXIF.getTag(exifImage, "SceneCaptureType");
              if (typeof orientation !== 'number') orientation = 1;
              BarcodeReader.BarcodeReaderDecodeImage(exifImage, orientation, sceneType);
            });
          }
        };
        img.src = image.src;
      }
    } else {
      img.onload = function() {
        if (BarcodeReader.Config.SkipOrientation) {
          BarcodeReader.BarcodeReaderDecodeImage(img, 1, "");
        } else {
          EXIF.getData(this, function(exifImage) {
            var orientation = EXIF.getTag(exifImage, "Orientation");
            var sceneType = EXIF.getTag(exifImage, "SceneCaptureType");
            if (typeof orientation !== 'number') orientation = 1;
            BarcodeReader.BarcodeReaderDecodeImage(exifImage, orientation, sceneType);
          });
        }
      };
      img.src = image;
    }
  },
  DecodeStream: function(stream) {
    BarcodeReader.Stream = stream;
    BarcodeReader.DecodeStreamActive = true;
    BarcodeReader.DecoderWorker.onmessage = BarcodeReader.BarcodeReaderStreamCallback;
    BarcodeReader.ScanContext.drawImage(stream, 0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height);
    BarcodeReader.DecoderWorker.postMessage({
      scan: BarcodeReader.ScanContext.getImageData(0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height).data,
      scanWidth: BarcodeReader.ScanCanvas.width,
      scanHeight: BarcodeReader.ScanCanvas.height,
      multiple: BarcodeReader.Config.Multiple,
      decodeFormats: BarcodeReader.Config.DecodeFormats,
      cmd: "normal",
      rotation: 1,
    });
  },
  StopStreamDecode: function() {
    BarcodeReader.DecodeStreamActive = false;
    BarcodeReader.Decoded = [];
  },
  BarcodeReaderDecodeImage: function(image, orientation, sceneCaptureType) {
    if (orientation === 8 || orientation === 6) {
      if (sceneCaptureType === "Landscape" && image.width > image.height) {
        orientation = 1;
        BarcodeReader.ScanCanvas.width = 640;
        BarcodeReader.ScanCanvas.height = 480;
      } else {
        BarcodeReader.ScanCanvas.width = 480;
        BarcodeReader.ScanCanvas.height = 640;
      }
    } else {
      BarcodeReader.ScanCanvas.width = 640;
      BarcodeReader.ScanCanvas.height = 480;
    }
    BarcodeReader.DecoderWorker.onmessage = BarcodeReader.BarcodeReaderImageCallback;
    BarcodeReader.ScanContext.drawImage(image, 0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height);
    BarcodeReader.Orientation = orientation;
    BarcodeReader.DecoderWorker.postMessage({
      scan: BarcodeReader.ScanContext.getImageData(0, 0, BarcodeReader.ScanCanvas.width, BarcodeReader.ScanCanvas.height).data,
      scanWidth: BarcodeReader.ScanCanvas.width,
      scanHeight: BarcodeReader.ScanCanvas.height,
      multiple: BarcodeReader.Config.Multiple,
      decodeFormats: BarcodeReader.Config.DecodeFormats,
      cmd: "normal",
      rotation: orientation,
      postOrientation: BarcodeReader.PostOrientation
    });
  },
  DetectVerticalSquash: function(img) {
    var ih = img.naturalHeight;
    var canvas = BarcodeReader.SquashCanvas;
    var alpha;
    var data;
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    try {
      data = ctx.getImageData(0, 0, 1, ih).data;
    } catch (err) {
      console.log("Cannot check verticalSquash: CORS?");
      return 1;
    }
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio === 0) ? 1 : ratio;
  },
  FixCanvas: function(canvas) {
    var ctx = canvas.getContext('2d');
    var drawImage = ctx.drawImage;
    ctx.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh) {
      var vertSquashRatio = 1;
      if (!!img && img.nodeName === 'IMG') {
        vertSquashRatio = BarcodeReader.DetectVerticalSquash(img);
      }
      if (arguments.length === 9)
        drawImage.call(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
      else if (typeof sw !== 'undefined')
        drawImage.call(ctx, img, sx, sy, sw, sh / vertSquashRatio);
      else
        drawImage.call(ctx, img, sx, sy);
    };
    return canvas;
  }
};

;(function (root, factory) {
	if (typeof exports === "object") {
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		define([], factory);
	}
	else {
		root.CryptoJS = factory();
	}
}(this, function () {
	/*globals window, global, require*/
	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
		let crypto;
		if(!(typeof require === 'function')){
			if (typeof window !== 'undefined' && window.crypto) {
				crypto = window.crypto;
			}
			if (typeof self !== 'undefined' && self.crypto) {
				crypto = self.crypto;
			}
			if (typeof globalThis !== 'undefined' && globalThis.crypto) {
				crypto = globalThis.crypto;
			}
			if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
				crypto = window.msCrypto;
			}
			if (!crypto && typeof global !== 'undefined' && global.crypto) {
				crypto = global.crypto;
			}
			if (!crypto && typeof require === 'function') {
			}
		}
	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
			if (typeof crypto?.getRandomValues === 'function') {
				try {
					return crypto.getRandomValues(new Uint32Array(1))[0];
				} catch (err) {}
			}
			if (typeof crypto?.randomBytes === 'function') {
				try {
					return crypto.randomBytes(4).readInt32LE();
				} catch (err) {}
			}
	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };
	    /*
	     * Local polyfill of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {}
	        return function (obj) {
	            var subtype;
	            F.prototype = obj;
	            subtype = new F();
	            F.prototype = null;
	            return subtype;
	        };
	    }());
	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};
	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};
	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {
	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                var subtype = create(this);
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }
	                subtype.init.prototype = subtype;
	                subtype.$super = this;
	                return subtype;
	            },
	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);
	                return instance;
	            },
	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },
	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },
	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());
	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];
	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },
	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },
	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;
	            this.clamp();
	            if (thisSigBytes % 4) {
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;
	            return this;
	        },
	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            var words = this.words;
	            var sigBytes = this.sigBytes;
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },
	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);
	            return clone;
	        },
	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];
	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }
	            return new WordArray.init(words, nBytes);
	        }
	    });
	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};
	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }
	            return hexChars.join('');
	        },
	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            var hexStrLength = hexStr.length;
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }
	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };
	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }
	            return latin1Chars.join('');
	        },
	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            var latin1StrLength = latin1Str.length;
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }
	            return new WordArray.init(words, latin1StrLength);
	        }
	    };
	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },
	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };
	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },
	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },
	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }
	            var nWordsReady = nBlocksReady * blockSize;
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    this._doProcessBlock(dataWords, offset);
	                }
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }
	            return new WordArray.init(processedWords, nBytesReady);
	        },
	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();
	            return clone;
	        },
	        _minBufferSize: 0
	    });
	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),
	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	            this.reset();
	        },
	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            BufferedBlockAlgorithm.reset.call(this);
	            this._doReset();
	        },
	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._append(messageUpdate);
	            this._process();
	            return this;
	        },
	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }
	            var hash = this._doFinalize();
	            return hash;
	        },
	        blockSize: 512/32,
	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },
	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });
	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};
	    return C;
	}(Math));
	(function (undefined) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;
	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};
	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }
	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	    });
	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];
	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },
	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }
	            return X32WordArray.create(x32Words, this.sigBytes);
	        },
	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            var words = clone.words = this.words.slice(0);
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }
	            return clone;
	        }
	    });
	}());
	(function () {
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var superInit = WordArray.init;
	    var subInit = WordArray.init = function (typedArray) {
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }
	        if (typedArray instanceof Uint8Array) {
	            var typedArrayByteLength = typedArray.byteLength;
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            superInit.apply(this, arguments);
	        }
	    };
	    subInit.prototype = WordArray;
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;
	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }
	            return utf16Chars.join('');
	        },
	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            var utf16StrLength = utf16Str.length;
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }
	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };
	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }
	            return utf16Chars.join('');
	        },
	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            var utf16StrLength = utf16Str.length;
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }
	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };
	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;
	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;
	            wordArray.clamp();
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }
	            return base64Chars.join('');
	        },
	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;
	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }
	            return parseLoop(base64Str, base64StrLength, reverseMap);
	        },
	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };
	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;
	    /**
	     * Base64url encoding strategy.
	     */
	    var Base64url = C_enc.Base64url = {
	        /**
	         * Converts a word array to a Base64url string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {string} The Base64url string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
	         */
	        stringify: function (wordArray, urlSafe=true) {
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = urlSafe ? this._safe_map : this._map;
	            wordArray.clamp();
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }
	            return base64Chars.join('');
	        },
	        /**
	         * Converts a Base64url string to a word array.
	         *
	         * @param {string} base64Str The Base64url string.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
	         */
	        parse: function (base64Str, urlSafe=true) {
	            var base64StrLength = base64Str.length;
	            var map = urlSafe ? this._safe_map : this._map;
	            var reverseMap = this._reverseMap;
	            if (!reverseMap) {
	                reverseMap = this._reverseMap = [];
	                for (var j = 0; j < map.length; j++) {
	                    reverseMap[map.charCodeAt(j)] = j;
	                }
	            }
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }
	            return parseLoop(base64Str, base64StrLength, reverseMap);
	        },
	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
	    };
	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	        var words = [];
	        var nBytes = 0;
	        for (var i = 0; i < base64StrLength; i++) {
	            if (i % 4) {
	                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	                var bitsCombined = bits1 | bits2;
	                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	                nBytes++;
	            }
	        }
	        return WordArray.create(words, nBytes);
	    }
	}());
	(function (Math) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;
	    var T = [];
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());
	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },
	        _doProcessBlock: function (M, offset) {
	            for (var i = 0; i < 16; i++) {
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            var H = this._hash.words;
	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);
	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;
	            this._process();
	            var hash = this._hash;
	            var H = hash.words;
	            for (var i = 0; i < 4; i++) {
	                var H_i = H[i];
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }
	            return hash;
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();
	            return clone;
	        }
	    });
	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }
	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }
	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }
	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;
	    var W = [];
	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },
	        _doProcessBlock: function (M, offset) {
	            var H = this._hash.words;
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }
	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }
	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;
	            this._process();
	            return this._hash;
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();
	            return clone;
	        }
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());
	(function (Math) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;
	    var H = [];
	    var K = [];
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }
	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
	                nPrime++;
	            }
	            n++;
	        }
	    }());
	    var W = [];
	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },
	        _doProcessBlock: function (M, offset) {
	            var H = this._hash.words;
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);
	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);
	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }
	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);
	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));
	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;
	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;
	            this._process();
	            return this._hash;
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();
	            return clone;
	        }
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;
	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },
	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);
	            hash.sigBytes -= 4;
	            return hash;
	        }
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());
	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },
	        _doProcessBlock: function (M, offset) {
	            var H = this._hash.words;
	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];
	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;
	            for (var i = 0; i < 80; i++) {
	                var Wil;
	                var Wih;
	                var Wi = W[i];
	                if (i < 16) {
	                    Wih = Wi.high = M[offset + i * 2]     | 0;
	                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;
	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;
	                    Wil = gamma0l + Wi7l;
	                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    Wil = Wil + gamma1l;
	                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    Wil = Wil + Wi16l;
	                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }
	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);
	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;
	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;
	            this._process();
	            var hash = this._hash.toX32();
	            return hash;
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();
	            return clone;
	        },
	        blockSize: 1024/32
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;
	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },
	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);
	            hash.sigBytes -= 16;
	            return hash;
	        }
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());
	(function (Math) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];
	    (function () {
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;
	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }
	                if (LFSR & 0x80) {
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }
	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());
	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),
	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }
	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },
	        _doProcessBlock: function (M, offset) {
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }
	            for (var round = 0; round < 24; round++) {
	                for (var x = 0; x < 5; x++) {
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    var tMsw;
	                    var tLsw;
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];
	                    if (rhoOffset < 32) {
	                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;
	            }
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;
	            this._process();
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }
	            return clone;
	        }
	    });
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	(function (Math) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);
	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);
	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },
	        _doProcessBlock: function (M, offset) {
	            for (var i = 0; i < 16; i++) {
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;
	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;
	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },
	        _doFinalize: function () {
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;
	            this._process();
	            var hash = this._hash;
	            var H = hash.words;
	            for (var i = 0; i < 5; i++) {
	                var H_i = H[i];
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }
	            return hash;
	        },
	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();
	            return clone;
	        }
	    });
	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));
	    }
	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }
	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }
	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }
	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));
	    }
	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }
	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;
	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            hasher = this._hasher = new hasher.init();
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }
	            key.clamp();
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
	            this.reset();
	        },
	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            var hasher = this._hasher;
	            hasher.reset();
	            hasher.update(this._iKey);
	        },
	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);
	            return this;
	        },
	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            var hasher = this._hasher;
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
	            return hmac;
	        }
	    });
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;
	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),
	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },
	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            var cfg = this.cfg;
	            var hmac = HMAC.create(cfg.hasher, password);
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();
	                    var intermediateWords = intermediate.words;
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }
	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;
	            return derivedKey;
	        }
	    });
	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;
	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),
	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },
	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            var block;
	            var cfg = this.cfg;
	            var hasher = cfg.hasher.create();
	            var derivedKey = WordArray.create();
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                block = hasher.update(password).finalize(salt);
	                hasher.reset();
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }
	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;
	            return derivedKey;
	        }
	    });
	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());
	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;
	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),
	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },
	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },
	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            this.cfg = this.cfg.extend(cfg);
	            this._xformMode = xformMode;
	            this._key = key;
	            this.reset();
	        },
	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            BufferedBlockAlgorithm.reset.call(this);
	            this._doReset();
	        },
	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            this._append(dataUpdate);
	            return this._process();
	        },
	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }
	            var finalProcessedData = this._doFinalize();
	            return finalProcessedData;
	        },
	        keySize: 128/32,
	        ivSize: 128/32,
	        _ENC_XFORM_MODE: 1,
	        _DEC_XFORM_MODE: 2,
	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }
	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },
	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });
	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            var finalProcessedBlocks = this._process(!!'flush');
	            return finalProcessedBlocks;
	        },
	        blockSize: 1
	    });
	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};
	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },
	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },
	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });
	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();
	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });
	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;
	                var thisBlock = words.slice(offset, offset + blockSize);
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);
	                this._prevBlock = thisBlock;
	            }
	        });
	        function xorBlock(words, offset, blockSize) {
	            var block;
	            var iv = this._iv;
	            if (iv) {
	                block = iv;
	                this._iv = undefined;
	            } else {
	                block = this._prevBlock;
	            }
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }
	        return CBC;
	    }());
	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};
	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            var blockSizeBytes = blockSize * 4;
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);
	            data.concat(padding);
	        },
	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	            data.sigBytes -= nPaddingBytes;
	        }
	    };
	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),
	        reset: function () {
	            var modeCreator;
	            Cipher.reset.call(this);
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                modeCreator = mode.createDecryptor;
	                this._minBufferSize = 1;
	            }
	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },
	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },
	        _doFinalize: function () {
	            var finalProcessedBlocks;
	            var padding = this.cfg.padding;
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                padding.pad(this._data, this.blockSize);
	                finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                finalProcessedBlocks = this._process(!!'flush');
	                padding.unpad(finalProcessedBlocks);
	            }
	            return finalProcessedBlocks;
	        },
	        blockSize: 128/32
	    });
	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },
	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });
	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};
	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            var wordArray;
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;
	            if (salt) {
	                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                wordArray = ciphertext;
	            }
	            return wordArray.toString(Base64);
	        },
	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            var salt;
	            var ciphertext = Base64.parse(openSSLStr);
	            var ciphertextWords = ciphertext.words;
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                salt = WordArray.create(ciphertextWords.slice(2, 4));
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }
	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };
	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),
	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            cfg = this.cfg.extend(cfg);
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);
	            var cipherCfg = encryptor.cfg;
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },
	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            cfg = this.cfg.extend(cfg);
	            ciphertext = this._parse(ciphertext, cfg.format);
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
	            return plaintext;
	        },
	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });
	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};
	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };
	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),
	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            cfg = this.cfg.extend(cfg);
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
	            cfg.iv = derivedParams.iv;
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
	            ciphertext.mixIn(derivedParams);
	            return ciphertext;
	        },
	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            cfg = this.cfg.extend(cfg);
	            ciphertext = this._parse(ciphertext, cfg.format);
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
	            cfg.iv = derivedParams.iv;
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
	            return plaintext;
	        }
	    });
	}());
	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();
	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;
	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });
	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;
	            var thisBlock = words.slice(offset, offset + blockSize);
	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
	            this._prevBlock = thisBlock;
	        }
	    });
	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        var keystream;
	        var iv = this._iv;
	        if (iv) {
	            keystream = iv.slice(0);
	            this._iv = undefined;
	        } else {
	            keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }
	    return CFB;
	}());
	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();
	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;
	            if (iv) {
	                counter = this._counter = iv.slice(0);
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });
	    CTR.Decryptor = Encryptor;
	    return CTR;
	}());
	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) {
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;
			if (b1 === 0xff)
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}
			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}
		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}
	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;
	            if (iv) {
	                counter = this._counter = iv.slice(0);
	                this._iv = undefined;
	            }
				incCounter(counter);
				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });
	    CTRGladman.Decryptor = Encryptor;
	    return CTRGladman;
	}());
	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();
	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });
	    OFB.Decryptor = Encryptor;
	    return OFB;
	}());
	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();
	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });
	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });
	    return ECB;
	}());
	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },
	    unpad: function (data) {
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	        data.sigBytes -= nPaddingBytes;
	    }
	};
	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        var blockSizeBytes = blockSize * 4;
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },
	    unpad: function (data) {
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	        data.sigBytes -= nPaddingBytes;
	    }
	};
	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },
	    unpad: function (data) {
	        CryptoJS.pad.ZeroPadding.unpad(data);
	        data.sigBytes--;
	    }
	};
	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        var blockSizeBytes = blockSize * 4;
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },
	    unpad: function (data) {
	        var dataWords = data.words;
	        var i = data.sigBytes - 1;
	        for (var i = data.sigBytes - 1; i >= 0; i--) {
	            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	                data.sigBytes = i + 1;
	                break;
	            }
	        }
	    }
	};
	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },
	    unpad: function () {
	    }
	};
	(function (undefined) {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;
	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },
	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];
	    (function () {
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            var t;
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;
	            var nRounds = this._nRounds = keySize + 6;
	            var ksRows = (nRounds + 1) * 4;
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    t = keySchedule[ksRow - 1];
	                    if (!(ksRow % keySize)) {
	                        t = (t << 8) | (t >>> 24);
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }
	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;
	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }
	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },
	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },
	        decryptBlock: function (M, offset) {
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },
	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            var nRounds = this._nRounds;
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];
	            var ksRow = 4;
	            for (var round = 1; round < nRounds; round++) {
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },
	        keySize: 256/32
	    });
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];
	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            var key = this._key;
	            var keyWords = key.words;
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                var subKey = subKeys[nSubKey] = [];
	                var bitShift = BIT_SHIFTS[nSubKey];
	                for (var i = 0; i < 24; i++) {
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },
	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },
	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },
	        _doCryptBlock: function (M, offset, subKeys) {
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);
	            for (var round = 0; round < 16; round++) {
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },
	        keySize: 64/32,
	        ivSize: 64/32,
	        blockSize: 64/32
	    });
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }
	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);
	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            var key = this._key;
	            var keyWords = key.words;
	            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
	                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
	            }
	            var key1 = keyWords.slice(0, 2);
	            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
	            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
	            this._des1 = DES.createEncryptor(WordArray.create(key1));
	            this._des2 = DES.createEncryptor(WordArray.create(key2));
	            this._des3 = DES.createEncryptor(WordArray.create(key3));
	        },
	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },
	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },
	        keySize: 192/32,
	        ivSize: 64/32,
	        blockSize: 64/32
	    });
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;
	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
	                j = (j + S[i] + keyByte) % 256;
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }
	            this._i = this._j = 0;
	        },
	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },
	        keySize: 256/32,
	        ivSize: 0
	    });
	    function generateKeystreamWord() {
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;
	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }
	        this._i = i;
	        this._j = j;
	        return keystreamWord;
	    }
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);
	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),
	        _doReset: function () {
	            RC4._doReset.call(this);
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;
	    var S  = [];
	    var C_ = [];
	    var G  = [];
	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            var K = this._key.words;
	            var iv = this.cfg.iv;
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];
	            this._b = 0;
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }
	            if (iv) {
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },
	        _doProcessBlock: function (M, offset) {
	            var X = this._X;
	            nextState.call(this);
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
	            for (var i = 0; i < 4; i++) {
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);
	                M[offset + i] ^= S[i];
	            }
	        },
	        blockSize: 128/32,
	        ivSize: 64/32
	    });
	    function nextState() {
	        var X = this._X;
	        var C = this._C;
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
	            G[i] = gh ^ gl;
	        }
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());
	(function () {
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;
	    var S  = [];
	    var C_ = [];
	    var G  = [];
	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            var K = this._key.words;
	            var iv = this.cfg.iv;
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];
	            this._b = 0;
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }
	            if (iv) {
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },
	        _doProcessBlock: function (M, offset) {
	            var X = this._X;
	            nextState.call(this);
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
	            for (var i = 0; i < 4; i++) {
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);
	                M[offset + i] ^= S[i];
	            }
	        },
	        blockSize: 128/32,
	        ivSize: 64/32
	    });
	    function nextState() {
	        var X = this._X;
	        var C = this._C;
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
	            G[i] = gh ^ gl;
	        }
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }
	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());
	return CryptoJS;
}));

