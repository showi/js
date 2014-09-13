/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
 */
define(function(require) {

    'use strict';
    
    var Sm = require('tile/sm');
    var State = require('tile/state');
 
    var IdleState = new State('idle', {
        enter: function() {
            
        },
        step: function(elapsed) {
            console.log('enteredOn', this.enteredOn, Date.now());
            if (this.enteredOn + 2500 < Date.now()) {
                return 'patrol';
            }
        },
        exit: function() {
            
        },
    });
    
    var PatrolState = new State('patrol', {
        enter: function() {
            
        },
        step: function(elapsed) {
            if (this.enteredOn + 4000 < Date.now()) {
                return 'idle';
            }            
        },
        exit: function() {
            
        },
    });
    
    var SmPatrol = new Sm();
    SmPatrol.addState(PatrolState);
    SmPatrol.addState(IdleState);
    SmPatrol.start('idle');
    console.log('sm', SmPatrol);
    var startTime;
    function loop() {
        var now = Date.now();
        var elapsed = now - startTime;
        startTime = now;
        SmPatrol.step(elapsed);
        console.log('step');
        setTimeout(loop, 1000);
    }
    loop();namespace

});