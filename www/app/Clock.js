define([
    'jquery',
    'app/TimeUtil'
], function (jquery, TimeUtil) {
    "use strict";

    function Clock() {
        this.clockContainer = jquery("#clock");
        this.clockHexContainer = jquery("#clockhex");
        this.clockRGBContainer = jquery("#clockrgb");
        this.clockFace = jquery("#clockFace");
        this.mainContainer = jquery("#main");
        this.hourHand = jquery("#hourHand");
        this.minuteHand = jquery("#minuteHand");
        this.secondHand = jquery("#secondHand");

        this.init();
    }

    Clock.prototype = {
        init: function() {
            this.startTimer();
            this.drawClock();
        },

        startTimer: function() {
            var me = this;
            setInterval(function() {
                me.tickUpdate(new Date());
            }, 1000);
        },

        drawClock: function() {
        },

        rotateHand: function ($hand, degree) {
            $hand.attr('transform', 'rotate('+ degree +' 50 50)')
        },

        tickUpdate: function(time) {
            this.updateLabel(TimeUtil.prototype.getTimeString(time), this.clockContainer);
            this.updateLabel(TimeUtil.prototype.getTimeHex(time), this.clockHexContainer);
            this.updateLabel(TimeUtil.prototype.getTimeRGB(time), this.clockRGBContainer);
            this.updateColor(TimeUtil.prototype.getTimeHex(time), this.clockFace);

            this.rotateHand(this.hourHand, 30 * (time.getHours() % 12) + time.getMinutes()/2);
            this.rotateHand(this.minuteHand, 6 * time.getMinutes());
            this.rotateHand(this.secondHand, 6 * time.getSeconds());
        },

        updateLabel: function(label, $node) {
            $node.html(label);
        },

        updateColor: function(color, $node) {
            $node.css("fill", color);
        }

    };

    return Clock;
});
