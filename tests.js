QUnit.module("Time Formatting", {
    setup: function (assert) {
        this.testDate1 = new Date("January 1, 2014 12:02:03");
        this.testDate2 = new Date("Feb 1, 2014 3:06:22");
        this.testDate3 = new Date("April 1, 2014 5:08:44");
        this.testDate4 = new Date("June 1, 2014 16:08:44");
        this.testDate5 = new Date("September 1, 2014 20:08:44");
        this.testDate6 = new Date("December 23, 2014 10:37:20");
    },
    teardown: function (assert) {
        this.testDate1 = null;
        this.testDate2 = null;
        this.testDate3 = null;
        this.testDate4 = null;
        this.testDate5 = null;
        this.testDate6 = null;
    }
});
QUnit.test("colorwatch.getTimeHex, retrieves time in hexadecimal", function(assert) {
    assert.equal("#120203", colorwatch.getTimeHex(this.testDate1));
    assert.equal("#030622", colorwatch.getTimeHex(this.testDate2));
    assert.equal("#050844", colorwatch.getTimeHex(this.testDate3));
});

QUnit.test("colorwatch.getTimeString, retrieves time as formatted string", function(assert) {
    assert.equal("12:02:03 PM", colorwatch.getTimeString(this.testDate1));
    assert.equal("03:06:22 AM", colorwatch.getTimeString(this.testDate2));
    assert.equal("05:08:44 AM", colorwatch.getTimeString(this.testDate3));
});

QUnit.test("colorwatch.getTimeRGB, returns rgb string based on time", function(assert) {
    assert.equal("rgb(16, 55, 32)", colorwatch.getTimeRGB(this.testDate6));
    assert.equal("rgb(18, 2, 3)", colorwatch.getTimeRGB(this.testDate1));
});

QUnit.test("colorwatch.padWithZero, pads time with leading zero if needed", function(assert) {
    assert.equal("05", colorwatch.padWithZero(5));
    assert.equal("09", colorwatch.padWithZero(9));
    assert.equal("11", colorwatch.padWithZero(11));

    assert.notEqual("3", colorwatch.padWithZero(3));
    assert.notEqual("7", colorwatch.padWithZero(7));
    assert.notEqual("8", colorwatch.padWithZero(8));
});

QUnit.test("colorwatch.currentAMPM, returns AM or PM based on time", function(assert) {
    assert.equal("PM", colorwatch.currentAMPM(this.testDate1));
    assert.equal("AM", colorwatch.currentAMPM(this.testDate2));
    assert.equal("AM", colorwatch.currentAMPM(this.testDate3));
});

QUnit.test("colorwatch.currentHour, returns padded hour based on time", function(assert) {
    assert.equal("12", colorwatch.currentHour(this.testDate1));
    assert.equal("03", colorwatch.currentHour(this.testDate2, false));
    assert.equal("05", colorwatch.currentHour(this.testDate3, false));
    assert.equal("04", colorwatch.currentHour(this.testDate4, false));
    assert.equal("16", colorwatch.currentHour(this.testDate4, true));
    assert.equal("08", colorwatch.currentHour(this.testDate5, false));
    assert.equal("20", colorwatch.currentHour(this.testDate5, true));
});

QUnit.test("colorwatch.currentMinute, returns padded minute based on time", function(assert) {
    assert.equal("02", colorwatch.currentMinute(this.testDate1));
    assert.equal("06", colorwatch.currentMinute(this.testDate2));
});

/*** UI Test Suite ***/
QUnit.module("UI Tests", {
    setup: function (assert) {
        colorwatch.init();
        this.testDate = new Date("January 1, 2014 12:02:03");
        this.testContainer = $("#test-main");
    },
    teardown: function (assert) {
        this.testDate = null;
        this.testContainer.css("background-color", "#FFFFFF");
        this.testContainer.html('');
    }
});
QUnit.test("colorwatch.updateBackgroundColor, updates the body background color", function(assert) {
    var testColorHex = colorwatch.getTimeHex(this.testDate),
        testColorRGB = colorwatch.getTimeRGB(this.testDate);

    assert.notEqual(this.testContainer.css('background-color'), testColorRGB);
    colorwatch.updateBackgroundColor(testColorHex, this.testContainer);
    assert.equal(this.testContainer.css('background-color'), testColorRGB);
});

QUnit.test("colorwatch.updateTimeLabel, updates the time label for current time", function(assert) {
    var timeLabel = colorwatch.getTimeString(this.testDate);

    assert.notEqual(this.testContainer.html(), timeLabel);
    colorwatch.updateLabel(timeLabel, this.testContainer);
    assert.equal(this.testContainer.html(), timeLabel);
});

QUnit.test("colorwatch.updateColorLabel, updates the color label for current time", function(assert) {
    var colorLabel = colorwatch.getTimeHex(this.testDate);

    assert.notEqual(this.testContainer.html(), colorLabel);
    colorwatch.updateLabel(colorLabel, this.testContainer);
    assert.equal(this.testContainer.html(), colorLabel);
});

QUnit.test("colorwatch.updateRGBLabel, updates the rgb color label for current time", function(assert) {
    var colorRGBLabel = colorwatch.getTimeRGB(this.testDate);

    assert.notEqual(this.testContainer.html(), colorRGBLabel);
    colorwatch.updateLabel(colorRGBLabel, this.testContainer);
    assert.equal(this.testContainer.html(), colorRGBLabel);
});
