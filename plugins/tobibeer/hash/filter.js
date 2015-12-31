/*\
title: $:/plugins/tobibeer/hash/filter.js
type: application/javascript
module-type: filteroperator

A filter to encode and decode TiddlyWiki style uri hashes for tiddler titles.

@preserve
\*/
(function(){"use strict";exports.hash=function(e,t,i){var n,s,f="",o=[],r=[],u=t.operand,c=function(e){if(s){e=e.substr(e.indexOf("#")+1)}var t=e.indexOf(":");e=t<0?"%5B%5B"+e+"%5D%5D":e.substr(t+1);$tw.utils.each($tw.utils.parseStringArray(decodeURIComponent(e)),function(e){if(r.indexOf(e)<0){r.push(e)}})};$tw.utils.each((t.suffix||"").split(" "),function(e){e=e.trim().toLowerCase();switch(e){case"decode":n=1;break;case"full":s=1;break}});if(u){if(n){c(u)}else{o=[u]}}else{e(function(e,t){if(n){c(t)}else{o.push(t)}})}if(!n){f=encodeURIComponent(o[0]);if(o.length>1){f+=":"+encodeURIComponent($tw.utils.stringifyList(o))}r=[f]}return r}})();