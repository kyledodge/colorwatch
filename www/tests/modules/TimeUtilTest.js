define([
        '../../app/TimeUtil'
], function(TimeUtil) {
    "use strict";

    var run = function() {
        var timeUtil = new TimeUtil(),
            testDate1 = new Date("January 1, 2014 12:02:03"),
            testDate2 = new Date("Feb 1, 2014 3:06:22"),
            testDate3 = new Date("April 1, 2014 5:08:44"),
            testDate4 = new Date("June 1, 2014 16:08:44"),
            testDate5 = new Date("September 1, 2014 20:08:44"),
            testDate6 = new Date("December 23, 2014 10:37:20");

        test("TimeUtil.getTimeHex, retrieves time in hexadecimal", function(assert) {
            assert.equal("#120203", timeUtil.getTimeHex(testDate1));
            assert.equal("#030622", timeUtil.getTimeHex(testDate2));
            assert.equal("#050844", timeUtil.getTimeHex(testDate3));
        });

        test("TimeUtil.getTimeString, retrieves time as formatted string", function(assert) {
            assert.equal("12:02:03 PM", timeUtil.getTimeString(testDate1));
            assert.equal("03:06:22 AM", timeUtil.getTimeString(testDate2));
            assert.equal("05:08:44 AM", timeUtil.getTimeString(testDate3));
        });

        test("TimeUtil.getTimeRGB, returns rgb string based on time", function(assert) {
            assert.equal("rgb(16, 55, 32)", timeUtil.getTimeRGB(testDate6));
            assert.equal("rgb(18, 2, 3)", timeUtil.getTimeRGB(testDate1));
        });

        test("TimeUtil.padWithZero, pads time with leading zero if needed", function(assert) {
            assert.equal("05", timeUtil.padWithZero(5));
            assert.equal("09", timeUtil.padWithZero(9));
            assert.equal("11", timeUtil.padWithZero(11));

            assert.notEqual("3", timeUtil.padWithZero(3));
            assert.notEqual("7", timeUtil.padWithZero(7));
            assert.notEqual("8", timeUtil.padWithZero(8));
        });

        test("TimeUtil.currentAMPM, returns AM or PM based on time", function(assert) {
            assert.equal("PM", timeUtil.currentAMPM(testDate1));
            assert.equal("AM", timeUtil.currentAMPM(testDate2));
            assert.equal("AM", timeUtil.currentAMPM(testDate3));
        });

        test("TimeUtil.currentHour, returns padded hour based on time", function(assert) {
            assert.equal("12", timeUtil.currentHour(testDate1));
            assert.equal("03", timeUtil.currentHour(testDate2, false));
            assert.equal("05", timeUtil.currentHour(testDate3, false));
            assert.equal("04", timeUtil.currentHour(testDate4, false));
            assert.equal("16", timeUtil.currentHour(testDate4, true));
            assert.equal("08", timeUtil.currentHour(testDate5, false));
            assert.equal("20", timeUtil.currentHour(testDate5, true));
        });

        test("TimeUtil.currentMinute, returns padded minute based on time", function(assert) {
            assert.equal("02", timeUtil.currentMinute(testDate1));
            assert.equal("06", timeUtil.currentMinute(testDate2));
        });
    };

    return {run: run}
});