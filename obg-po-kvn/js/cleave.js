!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cleave=t():n.Cleave=t()}(this,function(){return function(n){function t(r){if(i[r])return i[r].exports;var u=i[r]={exports:{},id:r,loaded:!1};return n[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var i={};return t.m=n,t.c=i,t.p="",t(0)}([function(n,t,i){(function(t){"use strict";var r=function(n,t){var i=this,u=!1;if("string"==typeof n?(i.element=document.querySelector(n),u=document.querySelectorAll(n).length>1):"undefined"!=typeof n.length&&n.length>0?(i.element=n[0],u=n.length>1):i.element=n,!i.element)throw new Error("[cleave.js] Please check the element");if(u)try{console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.")}catch(f){}t.initValue=i.element.value;i.properties=r.DefaultProperties.assign({},t);i.init()};r.prototype={init:function(){var n=this,t=n.properties;return t.numeral||t.phone||t.creditCard||t.time||t.date||0!==t.blocksLength||t.prefix?(t.maxLength=r.Util.getMaxLength(t.blocks),n.isAndroid=r.Util.isAndroid(),n.lastInputValue="",n.isBackward="",n.onChangeListener=n.onChange.bind(n),n.onKeyDownListener=n.onKeyDown.bind(n),n.onFocusListener=n.onFocus.bind(n),n.onCutListener=n.onCut.bind(n),n.onCopyListener=n.onCopy.bind(n),n.initSwapHiddenInput(),n.element.addEventListener("input",n.onChangeListener),n.element.addEventListener("keydown",n.onKeyDownListener),n.element.addEventListener("focus",n.onFocusListener),n.element.addEventListener("cut",n.onCutListener),n.element.addEventListener("copy",n.onCopyListener),n.initPhoneFormatter(),n.initDateFormatter(),n.initTimeFormatter(),n.initNumeralFormatter(),void((t.initValue||t.prefix&&!t.noImmediatePrefix)&&n.onInput(t.initValue))):void n.onInput(t.initValue)},initSwapHiddenInput:function(){var n=this,i=n.properties,t;i.swapHiddenInput&&(t=n.element.cloneNode(!0),n.element.parentNode.insertBefore(t,n.element),n.elementSwapHidden=n.element,n.elementSwapHidden.type="hidden",n.element=t,n.element.id="")},initNumeralFormatter:function(){var t=this,n=t.properties;n.numeral&&(n.numeralFormatter=new r.NumeralFormatter(n.numeralDecimalMark,n.numeralIntegerScale,n.numeralDecimalScale,n.numeralThousandsGroupStyle,n.numeralPositiveOnly,n.stripLeadingZeroes,n.prefix,n.signBeforePrefix,n.tailPrefix,n.delimiter))},initTimeFormatter:function(){var t=this,n=t.properties;n.time&&(n.timeFormatter=new r.TimeFormatter(n.timePattern,n.timeFormat),n.blocks=n.timeFormatter.getBlocks(),n.blocksLength=n.blocks.length,n.maxLength=r.Util.getMaxLength(n.blocks))},initDateFormatter:function(){var t=this,n=t.properties;n.date&&(n.dateFormatter=new r.DateFormatter(n.datePattern,n.dateMin,n.dateMax),n.blocks=n.dateFormatter.getBlocks(),n.blocksLength=n.blocks.length,n.maxLength=r.Util.getMaxLength(n.blocks))},initPhoneFormatter:function(){var t=this,n=t.properties;if(n.phone)try{n.phoneFormatter=new r.PhoneFormatter(new n.root.Cleave.AsYouTypeFormatter(n.phoneRegionCode),n.delimiter)}catch(i){throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib");}},onKeyDown:function(n){var t=this,i=n.which||n.keyCode;t.lastInputValue=t.element.value;t.isBackward=8===i},onChange:function(n){var t=this,i=t.properties,f=r.Util,u;t.isBackward=t.isBackward||"deleteContentBackward"===n.inputType;u=f.getPostDelimiter(t.lastInputValue,i.delimiter,i.delimiters);i.postDelimiterBackspace=t.isBackward&&u?u:!1;this.onInput(this.element.value)},onFocus:function(){var t=this,n=t.properties;t.lastInputValue=t.element.value;n.prefix&&n.noImmediatePrefix&&!t.element.value&&this.onInput(n.prefix);r.Util.fixPrefixCursor(t.element,n.prefix,n.delimiter,n.delimiters)},onCut:function(n){r.Util.checkFullSelection(this.element.value)&&(this.copyClipboardData(n),this.onInput(""))},onCopy:function(n){r.Util.checkFullSelection(this.element.value)&&this.copyClipboardData(n)},copyClipboardData:function(n){var i=this,t=i.properties,e=r.Util,u=i.element.value,f=t.copyDelimiter?u:e.stripDelimiters(u,t.delimiter,t.delimiters);try{n.clipboardData?n.clipboardData.setData("Text",f):window.clipboardData.setData("Text",f);n.preventDefault()}catch(o){}},onInput:function(n){var u=this,t=u.properties,i=r.Util,f=i.getPostDelimiter(n,t.delimiter,t.delimiters);return t.numeral||!t.postDelimiterBackspace||f||(n=i.headStr(n,n.length-t.postDelimiterBackspace.length)),t.phone?(t.result=!t.prefix||t.noImmediatePrefix&&!n.length?t.phoneFormatter.format(n):t.prefix+t.phoneFormatter.format(n).slice(t.prefix.length),void u.updateValueState()):t.numeral?(t.result=t.prefix&&t.noImmediatePrefix&&0===n.length?"":t.numeralFormatter.format(n),void u.updateValueState()):(t.date&&(n=t.dateFormatter.getValidatedDate(n)),t.time&&(n=t.timeFormatter.getValidatedTime(n)),n=i.stripDelimiters(n,t.delimiter,t.delimiters),n=i.getPrefixStrippedValue(n,t.prefix,t.prefixLength,t.result,t.delimiter,t.delimiters,t.noImmediatePrefix,t.tailPrefix,t.signBeforePrefix),n=t.numericOnly?i.strip(n,/[^\d]/g):n,n=t.uppercase?n.toUpperCase():n,n=t.lowercase?n.toLowerCase():n,t.prefix&&(t.tailPrefix?n+=t.prefix:n=t.prefix+n,0===t.blocksLength)?(t.result=n,void u.updateValueState()):(t.creditCard&&u.updateCreditCardPropsByValue(n),n=i.headStr(n,t.maxLength),t.result=i.getFormattedValue(n,t.blocks,t.blocksLength,t.delimiter,t.delimiters,t.delimiterLazyShow),void u.updateValueState()))},updateCreditCardPropsByValue:function(n){var i,f=this,t=f.properties,u=r.Util;u.headStr(t.result,4)!==u.headStr(n,4)&&(i=r.CreditCardDetector.getInfo(n,t.creditCardStrictMode),t.blocks=i.blocks,t.blocksLength=t.blocks.length,t.maxLength=u.getMaxLength(t.blocks),t.creditCardType!==i.type&&(t.creditCardType=i.type,t.onCreditCardTypeChanged.call(f,t.creditCardType)))},updateValueState:function(){var n=this,u=r.Util,t=n.properties;if(n.element){var i=n.element.selectionEnd,e=n.element.value,f=t.result;if(i=u.getNextCursorPosition(i,e,f,t.delimiter,t.delimiters),n.isAndroid)return void window.setTimeout(function(){n.element.value=f;u.setSelection(n.element,i,t.document,!1);n.callOnValueChanged()},1);n.element.value=f;t.swapHiddenInput&&(n.elementSwapHidden.value=n.getRawValue());u.setSelection(n.element,i,t.document,!1);n.callOnValueChanged()}},callOnValueChanged:function(){var n=this,t=n.properties;t.onValueChanged.call(n,{target:{name:n.element.name,value:t.result,rawValue:n.getRawValue()}})},setPhoneRegionCode:function(n){var t=this,i=t.properties;i.phoneRegionCode=n;t.initPhoneFormatter();t.onChange()},setRawValue:function(n){var t=this,i=t.properties;n=void 0!==n&&null!==n?n.toString():"";i.numeral&&(n=n.replace(".",i.numeralDecimalMark));i.postDelimiterBackspace=!1;t.element.value=n;t.onInput(n)},getRawValue:function(){var i=this,n=i.properties,u=r.Util,t=i.element.value;return n.rawValueTrimPrefix&&(t=u.getPrefixStrippedValue(t,n.prefix,n.prefixLength,n.result,n.delimiter,n.delimiters,n.noImmediatePrefix,n.tailPrefix,n.signBeforePrefix)),t=n.numeral?n.numeralFormatter.getRawValue(t):u.stripDelimiters(t,n.delimiter,n.delimiters)},getISOFormatDate:function(){var t=this,n=t.properties;return n.date?n.dateFormatter.getISOFormatDate():""},getISOFormatTime:function(){var t=this,n=t.properties;return n.time?n.timeFormatter.getISOFormatTime():""},getFormattedValue:function(){return this.element.value},destroy:function(){var n=this;n.element.removeEventListener("input",n.onChangeListener);n.element.removeEventListener("keydown",n.onKeyDownListener);n.element.removeEventListener("focus",n.onFocusListener);n.element.removeEventListener("cut",n.onCutListener);n.element.removeEventListener("copy",n.onCopyListener)},toString:function(){return"[Cleave Object]"}};r.NumeralFormatter=i(1);r.DateFormatter=i(2);r.TimeFormatter=i(3);r.PhoneFormatter=i(4);r.CreditCardDetector=i(5);r.Util=i(6);r.DefaultProperties=i(7);("object"==typeof t&&t?t:window).Cleave=r;n.exports=r}).call(t,function(){return this}())},function(n){"use strict";var t=function(n,i,r,u,f,e,o,s,h,c){var l=this;l.numeralDecimalMark=n||".";l.numeralIntegerScale=i>0?i:0;l.numeralDecimalScale=r>=0?r:2;l.numeralThousandsGroupStyle=u||t.groupStyle.thousand;l.numeralPositiveOnly=!!f;l.stripLeadingZeroes=e!==!1;l.prefix=o||""===o?o:"";l.signBeforePrefix=!!s;l.tailPrefix=!!h;l.delimiter=c||""===c?c:",";l.delimiterRE=c?new RegExp("\\"+c,"g"):""};t.groupStyle={thousand:"thousand",lakh:"lakh",wan:"wan",none:"none"};t.prototype={getRawValue:function(n){return n.replace(this.delimiterRE,"").replace(this.numeralDecimalMark,".")},format:function(n){var f,u,o,r,i=this,e="";switch(n=n.replace(/[A-Za-z]/g,"").replace(i.numeralDecimalMark,"M").replace(/[^\dM-]/g,"").replace(/^\-/,"N").replace(/\-/g,"").replace("N",i.numeralPositiveOnly?"":"-").replace("M",i.numeralDecimalMark),i.stripLeadingZeroes&&(n=n.replace(/^(-)?0+(?=\d)/,"$1")),u="-"===n.slice(0,1)?"-":"",o="undefined"!=typeof i.prefix?i.signBeforePrefix?u+i.prefix:i.prefix+u:u,r=n,n.indexOf(i.numeralDecimalMark)>=0&&(f=n.split(i.numeralDecimalMark),r=f[0],e=i.numeralDecimalMark+f[1].slice(0,i.numeralDecimalScale)),"-"===u&&(r=r.slice(1)),i.numeralIntegerScale>0&&(r=r.slice(0,i.numeralIntegerScale)),i.numeralThousandsGroupStyle){case t.groupStyle.lakh:r=r.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+i.delimiter);break;case t.groupStyle.wan:r=r.replace(/(\d)(?=(\d{4})+$)/g,"$1"+i.delimiter);break;case t.groupStyle.thousand:r=r.replace(/(\d)(?=(\d{3})+$)/g,"$1"+i.delimiter)}return i.tailPrefix?u+r.toString()+(i.numeralDecimalScale>0?e.toString():"")+i.prefix:o+r.toString()+(i.numeralDecimalScale>0?e.toString():"")}};n.exports=t},function(n){"use strict";var t=function(n,t,i){var r=this;r.date=[];r.blocks=[];r.datePattern=n;r.dateMin=t.split("-").reverse().map(function(n){return parseInt(n,10)});2===r.dateMin.length&&r.dateMin.unshift(0);r.dateMax=i.split("-").reverse().map(function(n){return parseInt(n,10)});2===r.dateMax.length&&r.dateMax.unshift(0);r.initBlocks()};t.prototype={initBlocks:function(){var n=this;n.datePattern.forEach(function(t){"Y"===t?n.blocks.push(4):n.blocks.push(2)})},getISOFormatDate:function(){var t=this,n=t.date;return n[2]?n[2]+"-"+t.addLeadingZero(n[1])+"-"+t.addLeadingZero(n[0]):""},getBlocks:function(){return this.blocks},getValidatedDate:function(n){var t=this,i="";return n=n.replace(/[^\d]/g,""),t.blocks.forEach(function(r,u){if(n.length>0){var f=n.slice(0,r),e=f.slice(0,1),o=n.slice(r);switch(t.datePattern[u]){case"d":"00"===f?f="01":parseInt(e,10)>3?f="0"+e:parseInt(f,10)>31&&(f="31");break;case"m":"00"===f?f="01":parseInt(e,10)>1?f="0"+e:parseInt(f,10)>12&&(f="12")}i+=f;n=o}}),this.getFixedDateString(i)},getFixedDateString:function(n){var c,f,s,e=this,u=e.datePattern,i=[],l=0,a=0,v=0,o=0,r=0,t=0,h=!1;return 4===n.length&&"y"!==u[0].toLowerCase()&&"y"!==u[1].toLowerCase()&&(o="d"===u[0]?0:2,r=2-o,c=parseInt(n.slice(o,o+2),10),f=parseInt(n.slice(r,r+2),10),i=this.getFixedDate(c,f,0)),8===n.length&&(u.forEach(function(n,t){switch(n){case"d":l=t;break;case"m":a=t;break;default:v=t}}),t=2*v,o=l<=v?2*l:2*l+2,r=a<=v?2*a:2*a+2,c=parseInt(n.slice(o,o+2),10),f=parseInt(n.slice(r,r+2),10),s=parseInt(n.slice(t,t+4),10),h=4===n.slice(t,t+4).length,i=this.getFixedDate(c,f,s)),4!==n.length||"y"!==u[0]&&"y"!==u[1]||(r="m"===u[0]?0:2,t=2-r,f=parseInt(n.slice(r,r+2),10),s=parseInt(n.slice(t,t+2),10),h=2===n.slice(t,t+2).length,i=[0,f,s]),6!==n.length||"Y"!==u[0]&&"Y"!==u[1]||(r="m"===u[0]?0:4,t=2-.5*r,f=parseInt(n.slice(r,r+2),10),s=parseInt(n.slice(t,t+4),10),h=4===n.slice(t,t+4).length,i=[0,f,s]),i=e.getRangeFixedDate(i),e.date=i,0===i.length?n:u.reduce(function(n,t){switch(t){case"d":return n+(0===i[0]?"":e.addLeadingZero(i[0]));case"m":return n+(0===i[1]?"":e.addLeadingZero(i[1]));case"y":return n+(h?e.addLeadingZeroForYear(i[2],!1):"");case"Y":return n+(h?e.addLeadingZeroForYear(i[2],!0):"")}},"")},getRangeFixedDate:function(n){var r=this,u=r.datePattern,t=r.dateMin||[],i=r.dateMax||[];return!n.length||t.length<3&&i.length<3?n:u.find(function(n){return"y"===n.toLowerCase()})&&0===n[2]?n:i.length&&(i[2]<n[2]||i[2]===n[2]&&(i[1]<n[1]||i[1]===n[1]&&i[0]<n[0]))?i:t.length&&(t[2]>n[2]||t[2]===n[2]&&(t[1]>n[1]||t[1]===n[1]&&t[0]>n[0]))?t:n},getFixedDate:function(n,t,i){return n=Math.min(n,31),t=Math.min(t,12),i=parseInt(i||0,10),(t<7&&t%2==0||t>8&&t%2==1)&&(n=Math.min(n,2===t?this.isLeapYear(i)?29:28:30)),[n,t,i]},isLeapYear:function(n){return n%4==0&&n%100!=0||n%400==0},addLeadingZero:function(n){return(n<10?"0":"")+n},addLeadingZeroForYear:function(n,t){return t?(n<10?"000":n<100?"00":n<1e3?"0":"")+n:(n<10?"0":"")+n}};n.exports=t},function(n){"use strict";var t=function(n,t){var i=this;i.time=[];i.blocks=[];i.timePattern=n;i.timeFormat=t;i.initBlocks()};t.prototype={initBlocks:function(){var n=this;n.timePattern.forEach(function(){n.blocks.push(2)})},getISOFormatTime:function(){var n=this,t=n.time;return t[2]?n.addLeadingZero(t[0])+":"+n.addLeadingZero(t[1])+":"+n.addLeadingZero(t[2]):""},getBlocks:function(){return this.blocks},getTimeFormatOptions:function(){var n=this;return"12"===String(n.timeFormat)?{maxHourFirstDigit:1,maxHours:12,maxMinutesFirstDigit:5,maxMinutes:60}:{maxHourFirstDigit:2,maxHours:23,maxMinutesFirstDigit:5,maxMinutes:60}},getValidatedTime:function(n){var i=this,r="",t;return n=n.replace(/[^\d]/g,""),t=i.getTimeFormatOptions(),i.blocks.forEach(function(u,f){if(n.length>0){var e=n.slice(0,u),o=e.slice(0,1),s=n.slice(u);switch(i.timePattern[f]){case"h":parseInt(o,10)>t.maxHourFirstDigit?e="0"+o:parseInt(e,10)>t.maxHours&&(e=t.maxHours+"");break;case"m":case"s":parseInt(o,10)>t.maxMinutesFirstDigit?e="0"+o:parseInt(e,10)>t.maxMinutes&&(e=t.maxMinutes+"")}r+=e;n=s}}),this.getFixedTimeString(r)},getFixedTimeString:function(n){var f,e,o,i=this,c=i.timePattern,t=[],a=0,s=0,h=0,l=0,r=0,u=0;return 6===n.length&&(c.forEach(function(n,t){switch(n){case"s":a=2*t;break;case"m":s=2*t;break;case"h":h=2*t}}),u=h,r=s,l=a,f=parseInt(n.slice(l,l+2),10),e=parseInt(n.slice(r,r+2),10),o=parseInt(n.slice(u,u+2),10),t=this.getFixedTime(o,e,f)),4===n.length&&i.timePattern.indexOf("s")<0&&(c.forEach(function(n,t){switch(n){case"m":s=2*t;break;case"h":h=2*t}}),u=h,r=s,f=0,e=parseInt(n.slice(r,r+2),10),o=parseInt(n.slice(u,u+2),10),t=this.getFixedTime(o,e,f)),i.time=t,0===t.length?n:c.reduce(function(n,r){switch(r){case"s":return n+i.addLeadingZero(t[2]);case"m":return n+i.addLeadingZero(t[1]);case"h":return n+i.addLeadingZero(t[0])}},"")},getFixedTime:function(n,t,i){return i=Math.min(parseInt(i||0,10),60),t=Math.min(t,60),n=Math.min(n,60),[n,t,i]},addLeadingZero:function(n){return(n<10?"0":"")+n}};n.exports=t},function(n){"use strict";var t=function(n,t){var i=this;i.delimiter=t||""===t?t:" ";i.delimiterRE=t?new RegExp("\\"+t,"g"):"";i.formatter=n};t.prototype={setFormatter:function(n){this.formatter=n},format:function(n){var i=this;i.formatter.clear();n=n.replace(/[^\d+]/g,"");n=n.replace(/^\+/,"B").replace(/\+/g,"").replace("B","+");n=n.replace(i.delimiterRE,"");for(var r,t="",f=!1,u=0,e=n.length;u<e;u++)r=i.formatter.inputDigit(n.charAt(u)),/[\s()-]/g.test(r)?(t=r,f=!0):f||(t=r);return t=t.replace(/[()]/g,""),t=t.replace(/[\s-]/g,i.delimiter)}};n.exports=t},function(n){"use strict";var t={blocks:{uatp:[4,5,6],amex:[4,6,5],diners:[4,6,4],discover:[4,4,4,4],mastercard:[4,4,4,4],dankort:[4,4,4,4],instapayment:[4,4,4,4],jcb15:[4,6,5],jcb:[4,4,4,4],maestro:[4,4,4,4],visa:[4,4,4,4],mir:[4,4,4,4],unionPay:[4,4,4,4],general:[4,4,4,4]},re:{uatp:/^(?!1800)1\d{0,14}/,amex:/^3[47]\d{0,13}/,discover:/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,diners:/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,mastercard:/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,dankort:/^(5019|4175|4571)\d{0,12}/,instapayment:/^63[7-9]\d{0,13}/,jcb15:/^(?:2131|1800)\d{0,11}/,jcb:/^(?:35\d{0,2})\d{0,12}/,maestro:/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,mir:/^220[0-4]\d{0,12}/,visa:/^4\d{0,15}/,unionPay:/^(62|81)\d{0,14}/},getStrictBlocks:function(n){var t=n.reduce(function(n,t){return n+t},0);return n.concat(19-t)},getInfo:function(n,i){var u=t.blocks,e=t.re,r,f;i=!!i;for(r in e)if(e[r].test(n))return f=u[r],{type:r,blocks:i?this.getStrictBlocks(f):f};return{type:"unknown",blocks:i?this.getStrictBlocks(u.general):u.general}}};n.exports=t},function(n){"use strict";var t={noop:function(){},strip:function(n,t){return n.replace(t,"")},getPostDelimiter:function(n,t,i){if(0===i.length)return n.slice(-t.length)===t?t:"";var r="";return i.forEach(function(t){n.slice(-t.length)===t&&(r=t)}),r},getDelimiterREByDelimiter:function(n){return new RegExp(n.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),"g")},getNextCursorPosition:function(n,t,i,r,u){return t.length===n?i.length:n+this.getPositionOffset(n,t,i,r,u)},getPositionOffset:function(n,t,i,r,u){var e,o,f;return e=this.stripDelimiters(t.slice(0,n),r,u),o=this.stripDelimiters(i.slice(0,n),r,u),f=e.length-o.length,0!==f?f/Math.abs(f):0},stripDelimiters:function(n,t,i){var r=this,u;return 0===i.length?(u=t?r.getDelimiterREByDelimiter(t):"",n.replace(u,"")):(i.forEach(function(t){t.split("").forEach(function(t){n=n.replace(r.getDelimiterREByDelimiter(t),"")})}),n)},headStr:function(n,t){return n.slice(0,t)},getMaxLength:function(n){return n.reduce(function(n,t){return n+t},0)},getPrefixStrippedValue:function(n,t,i,r,u,f,e,o,s){var c,h;return 0===i?n:n===t&&""!==n?"":s&&"-"==n.slice(0,1)?(c="-"==r.slice(0,1)?r.slice(1):r,"-"+this.getPrefixStrippedValue(n.slice(1),t,i,c,u,f,e,o,s)):r.slice(0,i)!==t&&!o?e&&!r&&n?n:"":r.slice(-i)!==t&&o?e&&!r&&n?n:"":(h=this.stripDelimiters(r,u,f),n.slice(0,i)===t||o?n.slice(-i)!==t&&o?h.slice(0,-i-1):o?n.slice(0,-i):n.slice(i):h.slice(i))},getFirstDiffIndex:function(n,t){for(var i=0;n.charAt(i)===t.charAt(i);)if(""===n.charAt(i++))return-1;return i},getFormattedValue:function(n,t,i,r,u,f){var e="",s=u.length>0,o="";return 0===i?n:(t.forEach(function(t,h){if(n.length>0){var c=n.slice(0,t),l=n.slice(t);o=s?u[f?h-1:h]||o:r;f?(h>0&&(e+=o),e+=c):(e+=c,c.length===t&&h<i-1&&(e+=o));n=l}}),e)},fixPrefixCursor:function(n,t,i,r){var u,e,f;n&&(u=n.value,e=i||r[0]||" ",!n.setSelectionRange||!t||t.length+e.length<=u.length||(f=2*u.length,setTimeout(function(){n.setSelectionRange(f,f)},1)))},checkFullSelection:function(n){try{var t=window.getSelection()||document.getSelection()||{};return t.toString().length===n.length}catch(i){}return!1},setSelection:function(n,t,i){if(n===this.getActiveElement(i)&&!(n&&n.value.length<=t))if(n.createTextRange){var r=n.createTextRange();r.move("character",t);r.select()}else try{n.setSelectionRange(t,t)}catch(u){console.warn("The input element type does not support selection")}},getActiveElement:function(n){var t=n.activeElement;return t&&t.shadowRoot?this.getActiveElement(t.shadowRoot):t},isAndroid:function(){return navigator&&/android/i.test(navigator.userAgent)},isAndroidBackspaceKeydown:function(n,t){return!!(this.isAndroid()&&n&&t)&&t===n.slice(0,-1)}};n.exports=t},function(n,t){(function(t){"use strict";var i={assign:function(n,i){return n=n||{},i=i||{},n.creditCard=!!i.creditCard,n.creditCardStrictMode=!!i.creditCardStrictMode,n.creditCardType="",n.onCreditCardTypeChanged=i.onCreditCardTypeChanged||function(){},n.phone=!!i.phone,n.phoneRegionCode=i.phoneRegionCode||"AU",n.phoneFormatter={},n.time=!!i.time,n.timePattern=i.timePattern||["h","m","s"],n.timeFormat=i.timeFormat||"24",n.timeFormatter={},n.date=!!i.date,n.datePattern=i.datePattern||["d","m","Y"],n.dateMin=i.dateMin||"",n.dateMax=i.dateMax||"",n.dateFormatter={},n.numeral=!!i.numeral,n.numeralIntegerScale=i.numeralIntegerScale>0?i.numeralIntegerScale:0,n.numeralDecimalScale=i.numeralDecimalScale>=0?i.numeralDecimalScale:2,n.numeralDecimalMark=i.numeralDecimalMark||".",n.numeralThousandsGroupStyle=i.numeralThousandsGroupStyle||"thousand",n.numeralPositiveOnly=!!i.numeralPositiveOnly,n.stripLeadingZeroes=i.stripLeadingZeroes!==!1,n.signBeforePrefix=!!i.signBeforePrefix,n.tailPrefix=!!i.tailPrefix,n.swapHiddenInput=!!i.swapHiddenInput,n.numericOnly=n.creditCard||n.date||!!i.numericOnly,n.uppercase=!!i.uppercase,n.lowercase=!!i.lowercase,n.prefix=n.creditCard||n.date?"":i.prefix||"",n.noImmediatePrefix=!!i.noImmediatePrefix,n.prefixLength=n.prefix.length,n.rawValueTrimPrefix=!!i.rawValueTrimPrefix,n.copyDelimiter=!!i.copyDelimiter,n.initValue=void 0!==i.initValue&&null!==i.initValue?i.initValue.toString():"",n.delimiter=i.delimiter||""===i.delimiter?i.delimiter:i.date?"/":i.time?":":i.numeral?",":(i.phone," "),n.delimiterLength=n.delimiter.length,n.delimiterLazyShow=!!i.delimiterLazyShow,n.delimiters=i.delimiters||[],n.blocks=i.blocks||[],n.blocksLength=n.blocks.length,n.root="object"==typeof t&&t?t:window,n.document=i.document||n.root.document,n.maxLength=0,n.backspace=!1,n.result="",n.onValueChanged=i.onValueChanged||function(){},n}};n.exports=i}).call(t,function(){return this}())}])});!function(){function w(n,t){var r=n.split("."),i=si,u;for((r[0]in i)||!i.execScript||i.execScript("var "+r[0]);r.length&&(u=r.shift());)r.length||void 0===t?i=i[u]?i[u]:i[u]={}:i[u]=t}function c(n,t){function i(){}i.prototype=t.prototype;n.M=t.prototype;n.prototype=new i;n.prototype.constructor=n;n.N=function(n,i){for(var u=Array(arguments.length-2),r=2;r<arguments.length;r++)u[r-2]=arguments[r];return t.prototype[i].apply(n,u)}}function i(n){null!=n&&this.a.apply(this,arguments)}function t(n){n.b=""}function ti(n,t){n.sort(t||ii)}function ii(n,t){return n>t?1:n<t?-1:0}function ri(n){var t,i=[],r=0;for(t in n)i[r++]=n[t];return i}function ui(n,t){var i,r;for(this.b=n,this.a={},i=0;i<t.length;i++)r=t[i],this.a[r.b]=r}function fi(n){return n=ri(n.a),ti(n,function(n,t){return n.b-t.b}),n}function ei(n,t){switch(this.b=n,this.g=!!t.v,this.a=t.c,this.i=t.type,this.h=!1,this.a){case li:case ai:case vi:case yi:case pi:case ci:case hi:this.h=!0}this.f=t.defaultValue}function u(){this.a={};this.f=this.j().a;this.b=this.g=null}function st(n,t){for(var r,u,i,f,c=fi(n.j()),o=0;o<c.length;o++)if(i=c[o],r=i.b,null!=t.a[r])if(n.b&&delete n.b[i.b],u=11==i.a||10==i.a,i.g)for(i=s(t,r)||[],f=0;f<i.length;f++){var e=n,h=r,l=u?i[f].clone():i[f];e.a[h]||(e.a[h]=[]);e.a[h].push(l);e.b&&delete e.b[h]}else i=s(t,r),u?(u=s(n,r))?st(u,i):v(n,r,i.clone()):v(n,r,i)}function s(n,t){var i=n.a[t],f,u,e,r;if(null==i)return null;if(n.g){if(!(t in n.b)){if(f=n.g,u=n.f[t],null!=i)if(u.g){for(e=[],r=0;r<i.length;r++)e[r]=f.b(u,i[r]);i=e}else i=f.b(u,i);return n.b[t]=i}return n.b[t]}return i}function r(n,t,i){var r=s(n,t);return n.f[t].g?r[i||0]:r}function f(n,t){var i,u;if(null!=n.a[t])i=r(n,t,void 0);else n:{if(i=n.f[t],void 0===i.f)if(u=i.i,u===Boolean)i.f=!1;else if(u===Number)i.f=0;else{if(u!==String){i=new u;break n}i.f=i.h?"0":""}i=i.f}return i}function b(n,t){return n.f[t].g?null!=n.a[t]?n.a[t].length:0:null!=n.a[t]?1:0}function v(n,t,i){n.a[t]=i;n.b&&(n.b[t]=i)}function k(n,t){var i,r=[];for(i in t)0!=i&&r.push(new ei(i,t[i]));return new ui(n,r)}function e(){u.call(this)}function n(){u.call(this)}function o(){u.call(this)}function y(){}function d(){}function l(){}function h(){this.a={}}function ht(n){return 0==n.length||di.test(n)}function g(n,t){if(null==t)return null;t=t.toUpperCase();var i=n.a[t];if(null==i){if(i=ot[t],null==i)return null;i=(new l).a(o.j(),i);n.a[t]=i}return i}function ct(n){return n=et[n],null==n?"ZZ":n[0]}function a(n){this.H=RegExp(" ");this.C="";this.m=new i;this.w="";this.i=new i;this.u=new i;this.l=!0;this.A=this.o=this.F=!1;this.G=h.b();this.s=0;this.b=new i;this.B=!1;this.h="";this.a=new i;this.f=[];this.D=n;this.J=this.g=nt(this,this.D)}function nt(n,t){var i;if(null!=t&&isNaN(t)&&t.toUpperCase()in ot){if(i=g(n.G,t),null==i)throw Error("Invalid region code: "+t);i=f(i,10)}else i=0;return i=g(n.G,ct(i)),null!=i?i:gt}function lt(n){for(var h,c,i,u,e,o,l,a=n.f.length,s=0;s<a;++s){if(h=n.f[s],c=f(h,1),n.w==c)return!1;if(i=n,o=h,u=f(o,1),-1!=u.indexOf("|")?i=!1:(u=u.replace(gi,"\\d"),u=u.replace(nr,"\\d"),t(i.m),e=i,o=f(o,2),l="999999999999999".match(u)[0],l.length<e.a.b.length?e="":(e=l.replace(new RegExp(u,"g"),o),e=e.replace(RegExp("9","g")," ")),0<e.length?(i.m.a(e),i=!0):i=!1),i)return n.w=c,n.B=ni.test(r(h,4)),n.s=0,!0}return n.l=!1}function at(n,t){for(var i,f=[],e=t.length-3,o=n.f.length,u=0;u<o;++u)i=n.f[u],0==b(i,3)?f.push(n.f[u]):(i=r(i,3,Math.min(e,b(i,3)-1)),0==t.search(i)&&f.push(n.f[u]));n.f=f}function oi(n,i){var u,r;if(n.i.a(i),r=i,ki.test(r)||1==n.i.b.length&&bi.test(r)?(r=i,"+"==r?(u=r,n.u.a(r)):(u=wi[r],n.u.a(u),n.a.a(u)),i=u):(n.l=!1,n.F=!0),!n.l){if(!n.F)if(bt(n)){if(kt(n))return vt(n)}else if(0<n.h.length&&(r=n.a.toString(),t(n.a),n.a.a(n.h),n.a.a(r),r=n.b.toString(),u=r.lastIndexOf(n.h),t(n.b),n.b.a(r.substring(0,u))),n.h!=wt(n))return n.b.a(" "),vt(n);return n.i.toString()}switch(n.u.b.length){case 0:case 1:case 2:return n.i.toString();case 3:if(!bt(n))return n.h=wt(n),tt(n);n.A=!0;default:return n.A?(kt(n)&&(n.A=!1),n.b.toString()+n.a.toString()):0<n.f.length?(r=dt(n,i),u=yt(n),0<u.length?u:(at(n,n.a.toString()),lt(n)?pt(n):n.l?p(n,r):n.i.toString())):tt(n)}}function vt(n){return n.l=!0,n.A=!1,n.f=[],n.s=0,t(n.m),n.w="",tt(n)}function yt(n){for(var i,e,t=n.a.toString(),o=n.f.length,u=0;u<o;++u)if(i=n.f[u],e=f(i,1),new RegExp("^(?:"+e+")$").test(t))return n.B=ni.test(r(i,4)),t=t.replace(new RegExp(e,"g"),r(i,2)),p(n,t);return""}function p(n,t){var i=n.b.b.length;return n.B&&0<i&&" "!=n.b.toString().charAt(i-1)?n.b+" "+t:n.b+t}function tt(n){var i=n.a.toString(),t;if(3<=i.length){for(var e=n.o&&0==n.h.length&&0<b(n.g,20)?s(n.g,20)||[]:s(n.g,19)||[],o=e.length,u=0;u<o;++u)t=e[u],0<n.h.length&&ht(f(t,4))&&!r(t,6)&&null==t.a[5]||(0!=n.h.length||n.o||ht(f(t,4))||r(t,6))&&tr.test(f(t,2))&&n.f.push(t);return at(n,i),i=yt(n),0<i.length?i:lt(n)?pt(n):n.i.toString()}return p(n,i)}function pt(n){var r=n.a.toString(),u=r.length,i,t;if(0<u){for(i="",t=0;t<u;t++)i=dt(n,r.charAt(t));return n.l?p(n,i):n.i.toString()}return n.b.toString()}function wt(n){var i,f=n.a.toString(),u=0;return 1!=r(n.g,10)?i=!1:(i=n.a.toString(),i="1"==i.charAt(0)&&"0"!=i.charAt(1)&&"1"!=i.charAt(1)),i?(u=1,n.b.a("1").a(" "),n.o=!0):null!=n.g.a[15]&&(i=new RegExp("^(?:"+r(n.g,15)+")"),i=f.match(i),null!=i&&null!=i[0]&&0<i[0].length&&(n.o=!0,u=i[0].length,n.b.a(f.substring(0,u)))),t(n.a),n.a.a(f.substring(u)),f.substring(0,u)}function bt(n){var u=n.u.toString(),i=new RegExp("^(?:\\+|"+r(n.g,11)+")"),i=u.match(i);return null!=i&&null!=i[0]&&0<i[0].length&&(n.o=!0,i=i[0].length,t(n.a),n.a.a(u.substring(i)),t(n.b),n.b.a(u.substring(0,i)),"+"!=u.charAt(0)&&n.b.a(" "),!0)}function kt(n){var r,u,e,o,f;if(0==n.a.b.length)return!1;u=new i;n:{if(r=n.a.toString(),0!=r.length&&"0"!=r.charAt(0))for(o=r.length,f=1;3>=f&&f<=o;++f)if(e=parseInt(r.substring(0,f),10),e in et){u.a(r.substring(f));r=e;break n}r=0}return 0!=r&&(t(n.a),n.a.a(u.toString()),u=ct(r),"001"==u?n.g=g(n.G,""+r):u!=n.D&&(n.g=nt(n,u)),n.b.a(""+r).a(" "),n.h="",!0)}function dt(n,i){var r=n.m.toString(),u;return 0<=r.substring(n.s).search(n.H)?(u=r.search(n.H),r=r.replace(n.H,i),t(n.m),n.m.a(r),n.s=u,r.substring(0,n.s+1)):(1==n.f.length&&(n.l=!1),n.w="",n.i.toString())}var si=this,it,rt,ut,ft,et,ot;i.prototype.b="";i.prototype.set=function(n){this.b=""+n};i.prototype.a=function(n,t){if(this.b+=String(n),null!=t)for(var i=1;i<arguments.length;i++)this.b+=arguments[i];return this};i.prototype.toString=function(){return this.b};var hi=1,ci=2,li=3,ai=4,vi=6,yi=16,pi=18;u.prototype.set=function(n,t){v(this,n.b,t)};u.prototype.clone=function(){var n=new this.constructor;return n!=this&&(n.a={},n.b&&(n.b={}),st(n,this)),n};c(e,u);it=null;c(n,u);rt=null;c(o,u);ut=null;e.prototype.j=function(){var n=it;return n||(it=n=k(e,{0:{name:"NumberFormat",I:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",v:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}})),n};e.j=e.prototype.j;n.prototype.j=function(){var t=rt;return t||(rt=t=k(n,{0:{name:"PhoneNumberDesc",I:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},9:{name:"possible_length",v:!0,c:5,type:Number},10:{name:"possible_length_local_only",v:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String}})),t};n.j=n.prototype.j;o.prototype.j=function(){var t=ut;return t||(ut=t=k(o,{0:{name:"PhoneMetadata",I:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:n},2:{name:"fixed_line",c:11,type:n},3:{name:"mobile",c:11,type:n},4:{name:"toll_free",c:11,type:n},5:{name:"premium_rate",c:11,type:n},6:{name:"shared_cost",c:11,type:n},7:{name:"personal_number",c:11,type:n},8:{name:"voip",c:11,type:n},21:{name:"pager",c:11,type:n},25:{name:"uan",c:11,type:n},27:{name:"emergency",c:11,type:n},28:{name:"voicemail",c:11,type:n},29:{name:"short_code",c:11,type:n},30:{name:"standard_rate",c:11,type:n},31:{name:"carrier_specific",c:11,type:n},33:{name:"sms_services",c:11,type:n},24:{name:"no_international_dialling",c:11,type:n},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,type:Boolean},19:{name:"number_format",v:!0,c:11,type:e},20:{name:"intl_number_format",v:!0,c:11,type:e},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}})),t};o.j=o.prototype.j;y.prototype.a=function(n){throw new n.b,Error("Unimplemented");};y.prototype.b=function(n,t){if(11==n.a||10==n.a)return t instanceof u?t:this.a(n.i.prototype.j(),t);if(14==n.a){if("string"==typeof t&&ft.test(t)){var i=Number(t);if(0<i)return i}return t}if(!n.h)return t;if(i=n.i,i===String){if("number"==typeof t)return String(t)}else if(i===Number&&"string"==typeof t&&("Infinity"===t||"-Infinity"===t||"NaN"===t||ft.test(t)))return Number(t);return t};ft=/^-?[0-9]+$/;c(d,y);d.prototype.a=function(n,t){var i=new n.b;return i.g=this,i.a=t,i.b={},i};c(l,d);l.prototype.b=function(n,t){return 8==n.a?!!t:y.prototype.b.apply(this,arguments)};l.prototype.a=function(n,t){return l.M.a.call(this,n,t)};et={55:["BR"]};ot={BR:[null,[null,null,"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",null,null,null,null,null,null,[8,9,10,11]],[null,null,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",null,null,null,"1123456789",null,null,[10],[8]],[null,null,"(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-9]|9\\d)\\d{7}",null,null,null,"11961234567",null,null,[10,11],[8]],[null,null,"800\\d{6,7}",null,null,null,"800123456",null,null,[9,10]],[null,null,"(?:300|[59]00\\d?)\\d{6}",null,null,null,"300123456",null,null,[9,10]],[null,null,"(?:300\\d(?:\\d{2})?|4(?:0(?:0\\d|20)|370))\\d{4}",null,null,null,"40041234",null,null,[8,10]],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",null,null,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",null,null,[[null,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[null,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[null,"(\\d{3,5})","$1",["1[125689]"]],[null,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:0[1-9]|[1-9])"]],[null,"(\\d{5})(\\d{4})","$1-$2",["9(?:0[1-9]|[1-9])"]],[null,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[null,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[[null,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[null,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[null,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[null,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,"(?:300\\d|40(?:0\\d|20))\\d{4}",null,null,null,null,null,null,[8]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]]};h.b=function(){return h.a?h.a:h.a=new h};var wi={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"},bi=RegExp("[+＋]+"),ki=RegExp("([0-9０-９٠-٩۰-۹])"),di=/^\(?\$1\)?$/,gt=new o;v(gt,11,"NA");var gi=/\[([^\[\]])*\]/g,nr=/\d(?=[^,}][^,}])/g,tr=RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"),ni=/[- ]/;a.prototype.K=function(){this.C="";t(this.i);t(this.u);t(this.m);this.s=0;this.w="";t(this.b);this.h="";t(this.a);this.l=!0;this.A=this.o=this.F=!1;this.f=[];this.B=!1;this.g!=this.J&&(this.g=nt(this,this.D))};a.prototype.L=function(n){return this.C=oi(this,n)};w("Cleave.AsYouTypeFormatter",a);w("Cleave.AsYouTypeFormatter.prototype.inputDigit",a.prototype.L);w("Cleave.AsYouTypeFormatter.prototype.clear",a.prototype.K)}.call("object"==typeof global&&global?global:window)