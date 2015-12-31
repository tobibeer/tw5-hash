/*\
title: test-tobibeer/hash-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the hash filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test hash filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki({}),
		fakeWidget = {getVariable: function() {return "foo bar";}};

	// Tests
	it("no input titles against operand", function() {
		expect(wiki.filterTiddlers(
			"[[]hash[foo bar]]"
		,fakeWidget).join(",")).toBe("foo%20bar");
	});
	it("no input titles against operand as variable", function() {
		expect(wiki.filterTiddlers(
			"[[]hash<foo>]"
		,fakeWidget).join(",")).toBe("foo%20bar");
	});
	it("hash for input title", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]hash[]]"
		,fakeWidget).join(",")).toBe("foo%20bar");
	});
	it("hash for input titles", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]] baz [[mumble frotz gronk]] +[hash[]]"
		,fakeWidget).join(",")).toBe("foo%20bar:%5B%5Bfoo%20bar%5D%5D%20baz%20%5B%5Bmumble%20frotz%20gronk%5D%5D");
	});
	it("hash for input title with target prefix", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]hash[]addprefix[http://tiddlywiki.com#]]"
		,fakeWidget).join(",")).toBe("http://tiddlywiki.com#foo%20bar");
	});
	it("permaview for input titles with custom target", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]] baz +[hash[]addprefix[http://tiddlywiki.com#]]"
		,fakeWidget).join(",")).toBe("http://tiddlywiki.com#foo%20bar:%5B%5Bfoo%20bar%5D%5D%20baz");
	});
	it("decode: no input titles against operand", function() {
		expect(wiki.filterTiddlers(
			"[[]hash[foo bar]hash:decode[]]"
		,fakeWidget).join(",")).toBe("foo bar");
	});
	it("decode: no input titles against operand as variable", function() {
		expect(wiki.filterTiddlers(
			"[[]hash<foo>hash:decode[]]"
		,fakeWidget).join(",")).toBe("foo bar");
	});
	it("decode: hash for input title", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]hash[]hash:decode[]]"
		,fakeWidget).join(",")).toBe("foo bar");
	});
	it("decode:hash for input titles", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]] baz [[mumble frotz gronk]] +[hash[]hash:decode[]]"
		,fakeWidget).join(",")).toBe("foo bar,baz,mumble frotz gronk");
	});
	it("decode full: hash for input title with target prefix", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]hash[]addprefix[http://tiddlywiki.com#]hash:decode full[]]"
		,fakeWidget).join(",")).toBe("foo bar");
	});
	it("decode full: permaview for input titles with custom target", function() {
		expect(wiki.filterTiddlers(
			"[[foo bar]] baz +[hash[]addprefix[http://tiddlywiki.com#]hash:decode full[]]"
		,fakeWidget).join(",")).toBe("foo bar,baz");
	});
});

})();
