define(function () {
    "use strict";

    /***
     * Time utility module to provide functions for dealing with time and color as time
     * @constructor
     */
    function Time() {
    }

    Time.prototype = {

        /***
         * Retrieves the hour from a date object, formatted to 12 or 24 hour format
         * @param {date} time - The date object to get the hour from
         * @param {boolean} is24Hour - Flag for returning 12 or 24 hour format
         * @returns {number}
         */
        currentHour: function (time, is24Hour) {
            var hours = time.getHours();

            if (!is24Hour) {
                hours = (hours > 12) ? hours - 12 : hours;
            }

            return this.padWithZero(hours);
        },

        /***
         * Retrieves the minutes from a date object
         * @param {date} time - The date object to get the minutes from
         * @returns {number}
         */
        currentMinute: function (time) {
            return this.padWithZero(time.getMinutes());
        },

        /***
         * Retrieves the seconds from a date object
         * @param {date} time - The date object to get the seconds from
         * @returns {number}
         */
        currentSecond: function (time) {
            return this.padWithZero(time.getSeconds());
        },

        /***
         * Determines if current time is AM or PM
         * @param {date} time - The date object to get the time string from
         * @returns {string} - Possible results are 'AM' or 'PM'
         */
        currentAMPM: function (time) {
            return time.getHours() < 12 ? "AM" : "PM";
        },

        /***
         * Helper function to make sure all numbers are 2 digit values. If one digit, will pad with a zero.
         * @param {number} value - The number value to check
         * @returns {string}
         */
        padWithZero: function (value) {
            return (value < 10 ? "0" : "") + value;
        },

        /***
         * Retrieves the hh:mm:ss:AM/PM time string from a date object
         * @param {date} time - The date object to get the full time string from
         * @returns {string}
         */
        getTimeString: function (time) {
            return this.currentHour(time) + ":" +
                this.currentMinute(time) + ":" +
                this.currentSecond(time) + " " +
                this.currentAMPM(time);
        },

        /***
         * Retrieves the current time as a hexidecimal string with a # prepended.
         * @param {date} time - The date object to get the hexidecimal time string from
         * @returns {string}
         */
        getTimeHex: function (time) {
            return "#" + this.currentHour(time) +
                this.currentMinute(time) +
                this.currentSecond(time);
        },

        /***
         * Retrieves the current time as a rgb string.
         * @param {date} time - The date object to get the rgb time string from
         * @returns {string}
         */
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

    return Time;
});
