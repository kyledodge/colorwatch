var colorwatch = {
    clockContainer: null,
    clockHexContainer: null,
    mainContainer: null,

    init: function () {
        this.clockContainer = $("#clock");
        this.clockHexContainer = $("#clockhex");
        this.clockRGBContainer = $("#clockrgb");
        this.mainContainer = $("#main");
    },

    tickUpdate: function(time) {
        this.updateLabel(this.getTimeString(time), this.clockContainer);
        this.updateLabel(this.getTimeHex(time), this.clockHexContainer);
        this.updateLabel(this.getTimeRGB(time), this.clockRGBContainer);
        this.updateBackgroundColor(this.getTimeHex(time), this.mainContainer);
    },

    updateLabel: function(label, $node) {
        $node.html(label);
    },

    updateBackgroundColor: function(color, $node) {
        $node.css("background-color", color);
    },

    currentHour: function (time, is24Hour) {
        var hours = time.getHours();

        if (!is24Hour) {
            hours = (hours > 12) ? hours - 12 : hours;
        }

        return this.padWithZero(hours);
    },

    currentMinute: function (time) {
        return this.padWithZero(time.getMinutes());
    },

    currentSecond: function (time) {
        return this.padWithZero(time.getSeconds());
    },

    currentAMPM: function (time) {
        return time.getHours() < 12 ? "AM" : "PM";
    },

    padWithZero: function (value) {
        return (value < 10 ? "0" : "") + value;
    },

    getTimeString: function (time) {
        return this.currentHour(time) + ":" +
            this.currentMinute(time) + ":" +
            this.currentSecond(time) + " " +
            this.currentAMPM(time);
    },

    getTimeHex: function (time) {
        return "#" + this.currentHour(time) +
            this.currentMinute(time) +
            this.currentSecond(time);
    },

    getTimeRGB: function (time) {
        var timeStr = this.getTimeHex(time);
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        timeStr = timeStr.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(timeStr);

        return "rgb(" +
            parseInt(result[1], 16) + ", " +
            parseInt(result[2], 16) + ", " +
            parseInt(result[3], 16) + ")";
    }
};

$(document).ready(function() {
    colorwatch.init();

    setInterval(function() {
        colorwatch.tickUpdate(new Date());
    }, 1000);
});