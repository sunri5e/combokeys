/* eslint-env node, browser, mocha */
/* eslint no-unused-expressions:0 */
"use strict";
require("es5-shim/es5-shim");
require("es5-shim/es5-sham");
var expect = require("chai").expect;
var sinon = require("sinon");
var Combokeys = require("../..");
var KeyEvent = require(".././lib/key-event");

afterEach(function() {
    Combokeys.reset();
});

describe("combokeys.record", function() {
    it("recording keys works", function(done) {
        var spy = sinon.spy();

        var combokeys = new Combokeys(document);
        require("../../plugins/record")(combokeys);
        combokeys.record(spy);

        KeyEvent.simulate("A".charCodeAt(0), 65);
        KeyEvent.simulate("B".charCodeAt(0), 66);
        KeyEvent.simulate("C".charCodeAt(0), 67);
        KeyEvent.simulate("O".charCodeAt(0), 79, ["meta", "shift"]);

        setTimeout(function() {
            expect(spy.callCount).to.equal(1, "callback should fire once");
            expect(spy.args[0][0]).to.deep.equal(
                ["a", "b", "c", "meta+shift+o"],
                "all key presses should be recorded"
            );
            done();
        }, 1000);
    });
});
