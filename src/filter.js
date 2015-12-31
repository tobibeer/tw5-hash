/*\
title: $:/plugins/tobibeer/hash/filter.js
type: application/javascript
module-type: filteroperator

A filter to encode and decode TiddlyWiki style uri hashes for tiddler titles.

@preserve
\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
The make filter function...
*/
exports.hash = function(source,operator,options) {
	var decode,full,hash = "",
		titles = [],
		results = [],
		operand = operator.operand,
		addDecoded = function(text) {
			// Got a fully qualified url?
			if(full) {
				// Take only hash
				text = text.substr(text.indexOf("#")+1);
			}
			// Permaview?
			var perm = text.indexOf(":");
			// Get text as...
			text =
				// If permalink
				perm < 0 ?
				// Add hash-encoded double square brackets
				("%5B%5B" + text + "%5D%5D") :
				// Cut off everything before the colon
				text.substr(perm+1);
			// Loop each
			$tw.utils.each(
				// Parsed title from decoded string
				$tw.utils.parseStringArray(decodeURIComponent(text)),
				// Handle title...
				function(title) {
					// Not yet in results?
					if(results.indexOf(title) < 0) {
						// Add title to results
						results.push(title);
					}
				}
			);
		};
	// Loop suffixes
	$tw.utils.each((operator.suffix || "").split(" "), function(suffix){
		// Ignore blanks and case
		suffix = suffix.trim().toLowerCase();
		// Check suffix
		switch(suffix) {
			// Decode flag
			case "decode":
				decode = 1;
				break;
			// Full location url
			case "full":
				full = 1;
				break;
		}
	});
	// Got an operand?
	if(operand) {
		// Decoding?
		if(decode) {
			// Decode operand
			addDecoded(operand);
		// Encoding
		} else {
			// Take operand as target
			titles = [operand];
		}
	// No operand
	} else {
		// Loop input titles
		source(function(tiddler,title) {
			// Decoding?
			if(decode) {
				// Decode input title text
				addDecoded(title);
			// Encoding
			} else {
				// Add to titles
				titles.push(title);
			}
		});
	}
	// Encoding...
	if(!decode) {
		// Create permalink for first
		hash = encodeURIComponent(titles[0]);
		// Got more than one?
		if(titles.length > 1) {
			// Add stringified list to hash, spearated via colon
			hash += ":" + encodeURIComponent($tw.utils.stringifyList(titles));
		}
		// Generated hash is result
		results = [hash];
	}
	// Return results
	return results;
};

})();