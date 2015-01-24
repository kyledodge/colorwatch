"use strict";

require.config({
    paths: {
        'QUnit': 'lib/qunit',
        'app/Clock': '../app/Clock',
        'app/TimeUtil': '../app/TimeUtil',
        'jquery': '../lib/jquery'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

require([
    'QUnit',
    'modules/TimeUtilTest',
    'modules/ClockTest'
], function(QUnit, TimeUtilTest, ClockTest) {
    TimeUtilTest.run();
    ClockTest.run();

    QUnit.load();
    QUnit.start();
});