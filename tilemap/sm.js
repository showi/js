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
    var math = require('graphit/math');
    var State = require('tile/state');


    function Sm() {
        this.state = {};
        this.current = undefined;
    }

    Sm.prototype.start = function(name) {
        if (!(name in this.state)) {
            throw 'InvalidState name: ' + name;
        }
        this.current = this.state[name];
        this.current.enteredOn = Date.now();
        this.current.enter();
    };
    Sm.prototype.addState = function(state) {
        if (state.name in this.state) {
            throw 'StateWithSameName';
        }
        this.state[state.name] = state;
    };
    
    Sm.prototype.step = function(elapsed) {
      console.log('Current step', this.current.name);
      var next = this.current.step(elapsed);
      if (next == null || next === undefined) {
          return false;
      }
      if (!(next in this.state)) {
          throw 'InvalidState name: ' + next;
      }
      var state = this.state[next];
      console.log('Entering new state', next);
      this.current.exit();
      state.enteredOn = Date.now();
      state.enter();
      this.current = state;
      return true;
    };
    
    return Sm;
});