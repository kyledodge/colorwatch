define([
    'app/Clock',
    'app/TimeUtil',
    'jquery'
], function(Clock, TimeUtil, jquery) {
    "use strict";

    var run = function() {
        var clock = new Clock(),
            timeUtil = new TimeUtil(),
            testDate = new Date("January 1, 2014 12:02:03"),
            testContainer = jquery("#test-main");

        test("Clock.updateColor, updates the clock face background color", function(assert) {
            var testColorHex = timeUtil.getTimeHex(testDate),
                testColorRGB = timeUtil.getTimeRGB(testDate);

            assert.notEqual(testContainer.css('fill'), testColorRGB);
            clock.updateColor(testColorHex, testContainer);
            assert.equal(testContainer.css('fill'), testColorRGB);
        });

        test("Clock.updateTimeLabel, updates the time label for current time", function(assert) {
            var timeLabel = timeUtil.getTimeString(testDate);

            assert.notEqual(testContainer.html(), timeLabel);
            clock.updateLabel(timeLabel, testContainer);
            assert.equal(testContainer.html(), timeLabel);
        });

        test("Clock.updateColorLabel, updates the color label for current time", function(assert) {
            var colorLabel = timeUtil.getTimeHex(testDate);

            assert.notEqual(testContainer.html(), colorLabel);
            clock.updateLabel(colorLabel, testContainer);
            assert.equal(testContainer.html(), colorLabel);
        });

        test("Clock.updateRGBLabel, updates the rgb color label for current time", function(assert) {
            var colorRGBLabel = timeUtil.getTimeRGB(testDate);

            assert.notEqual(testContainer.html(), colorRGBLabel);
            clock.updateLabel(colorRGBLabel, testContainer);
            assert.equal(testContainer.html(), colorRGBLabel);
        });
    };

    return {run: run}
});