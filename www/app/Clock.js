define([
    'jquery',
    'app/TimeUtil'
], function (jquery, TimeUtil) {
    "use strict";

    /***
     * Clock module that handles updating both text labels and the svg clock
     * @constructor
     */
    function Clock() {
        //get a reference to the dom elements that need to be updated later
        this.clockContainer = jquery("#clock");
        this.clockHexContainer = jquery("#clockhex");
        this.clockRGBContainer = jquery("#clockrgb");
        this.clockFace = jquery("#clockFace");
        this.hourHand = jquery("#hourHand");
        this.minuteHand = jquery("#minuteHand");
        this.secondHand = jquery("#secondHand");

        this.init();
    }

    Clock.prototype = {

        /***
         * Initializes the Clock component by starting the timer and drawing
         * the SVG clock
         */
        init: function() {
            this.startTimer();
            this.drawClock();
        },

        /***
         * Starts a 1 second interval timer for updating the clock
         */
        startTimer: function() {
            var me = this;
            setInterval(function() {
                me.tickUpdate(new Date());
            }, 1000);
        },

        /***
         * Rotates the clock hand passed in by a specific degree
         * @param {object} $hand - The jquery object for the hand
         * @param {number} degree - Amount to rotate the hand
         */
        rotateHand: function ($hand, degree) {
            $hand.attr('transform', 'rotate('+ degree +' 50 50)')
        },

        /***
         * Called at each 1 second interval to update the clock and UI labels
         * @param {date} time - Date object for the current interval time
         */
        tickUpdate: function(time) {
            //update the UI labels
            this.updateLabel(TimeUtil.prototype.getTimeString(time), this.clockContainer);
            this.updateLabel(TimeUtil.prototype.getTimeHex(time), this.clockHexContainer);
            this.updateLabel(TimeUtil.prototype.getTimeRGB(time), this.clockRGBContainer);
            this.updateColor(TimeUtil.prototype.getTimeHex(time), this.clockFace);

            //update the svg clock
            this.rotateHand(this.hourHand, 30 * (time.getHours() % 12) + time.getMinutes()/2);
            this.rotateHand(this.minuteHand, 6 * time.getMinutes());
            this.rotateHand(this.secondHand, 6 * time.getSeconds());
        },

        /***
         * Helper function to update the html of a label
         * @param {string} label - The text content to be used for the label
         * @param $node - The jquery object of the label to be updated
         */
        updateLabel: function(label, $node) {
            $node.html(label);
        },

        /***
         * Helper function to update the color of a dom element
         * @param {string} color - The hex/rgb color to be used for the fill color of the element
         * @param $node - The jquery object of the element to be colored
         */
        updateColor: function(color, $node) {
            $node.css("fill", color);
        }

    };

    return Clock;
});
