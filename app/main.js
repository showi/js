define(function(require) {
    var glob = require('./global');
    var util = require('./util');
    var tool = require('./Draw/tool');
    var DrawCanvas = require('./Draw/Canvas');
    var shape = require('./Draw/shape');
   
    console.log('----- Graphit (' + glob.version + ') -----');
    console.log('Context: ' + util.getContext());
    var width = height = 300;
    var canvas = new DrawCanvas(width, width);
    $('body').append(canvas.getElement());
    util.setContext(canvas.getContext());
    var ctx = util.getContext().ctx;
    var size = canvas.width / 2;
    var dsize = size / 2;
    var gCtx = window.graphit.gContext;
    var count = 0;
    var step = 0.3;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    shape.rectangle(-25, -25, 50, 50);
    for (var x = 0; x <= 180; x += step) {
        ctx.rotate(step);
        ctx.strokeStyle = tool.randomColor();
        shape.line(dsize/2, 0, size, 0);
        count += 1;
    }
    console.info('Lines: ' + count);
    return true;

//    console.log(c.toString());
//
//    var CDll = require('./List/Dl/List');
//
//    var l = new CDll();
//    l.insert('i01');
//    l.insert('i02');
//    l.insert('i03');
//    l.append('a01');
//    l.append('a02');
//    l.append('a03');
//    console.log('---[ Listing elements');
//    l.foreach(function(elm) {
//        console.log('Elm: ' + elm.content);
//    });
//    console.log('---[ Removing elements');
//    l.foreach(function(elm) {
//        console.log('Elm: ' + elm.content);
//        l.remove(elm);
//    });
//    l.append('a_n01');
//    l.insert('a_n03');
//    l.append('a_n02');
//    console.log('---[ Reverse Listing Elements');
//    l.foreach(function(elm) {
//        console.log('Elm: ' + elm.content);
//    });
//    console.log('---[ Popping Elements');
//    for (var item = l.pop(); item !== null; item = l.pop()) {
//        console.log('Popped Element: ' + item.content);
//    }
//    var callback = function() {
//        console.log('---[ Append Elements');
//        for (var i = 0; i < 10000000; i++) {
//            var item = l.append('a_' + i);
//            // console.log('Append Element: ' + item.content);
//        }
//        console.log(' - total: ' + l.count);
//        for (var item = l.pop(); item !== null; item = l.pop()) {
//            // console.log('Popped Element: ' + item.content);
//        }
//        setTimeout(callback, 1000);
//    };
    // callback();
    /*
     * var CCore = require('./CCore'); var core = new CCore();
     * 
     * var util = require('./util'); var log = require('./log');
     * 
     * 
     * log.log(core.toString());
     * 
     * var widgetFactory = require('./Widget/Base'); var widget =
     * widgetFactory('<div></div>', { width: 200, height: 200, visible: true,
     * }); widget.draggable(); widget.baseWidget('header').text(':: header ::');
     * widget.baseWidget('content').text("Lorem ipsum dolor sit amet,
     * consectetur adipiscing elit. Proin erat ligula, fringilla id diam
     * bibendum, accumsan tempus tortor. Vestibulum ultricies nunc ligula, eu
     * laoreet est aliquam at. Vivamus non convallis nunc. Praesent sodales
     * justo non tortor tristique, quis volutpat magna malesuada. Phasellus
     * aliquet faucibus fringilla. Donec aliquam quam in lacus malesuada, quis
     * pulvinar velit egestas. Cras cursus elit a ante interdum, in elementum
     * metus euismod. Nulla elementum semper faucibus. Donec ultrices, libero ac
     * scelerisque sollicitudin, lectus diam volutpat magna, mattis varius elit
     * nisl eu enim. Praesent ac tortor eu est porta venenatis sed in ante. Cras
     * vestibulum feugiat aliquet. Cras ut dolor iaculis, bibendum ante sed,
     * aliquet nisi. Donec sollicitudin eros vel mauris tempus fermentum.");
     * widget.baseWidget('content').unbind('ondrag'); console.log('Content: ' +
     * widget.baseWidget('content')); widget.css({'background-color': 'black',
     * color: 'white'}); widget.resizable(); jQuery('body').append(widget);
     * widget = widgetFactory('<div></div>', { width: 200, height: 200,
     * visible: true, }); widget.baseWidget('header').text(':: header ::');
     * widget.baseWidget('content').text("Lorem ipsum dolor sit amet,
     * consectetur adipiscing elit. Proin erat ligula, fringilla id diam
     * bibendum, accumsan tempus tortor. Vestibulum ultricies nunc ligula, eu
     * laoreet est aliquam at. Vivamus non convallis nunc. Praesent sodales
     * justo non tortor tristique, quis volutpat magna malesuada. Phasellus
     * aliquet faucibus fringilla. Donec aliquam quam in lacus malesuada, quis
     * pulvinar velit egestas. Cras cursus elit a ante interdum, in elementum
     * metus euismod. Nulla elementum semper faucibus. Donec ultrices, libero ac
     * scelerisque sollicitudin, lectus diam volutpat magna, mattis varius elit
     * nisl eu enim. Praesent ac tortor eu est porta venenatis sed in ante. Cras
     * vestibulum feugiat aliquet. Cras ut dolor iaculis, bibendum ante sed,
     * aliquet nisi. Donec sollicitudin eros vel mauris tempus fermentum.");
     * console.log('Content: ' + widget.baseWidget('content'));
     * widget.draggable(); widget.css({'background-color': 'black', color:
     * 'white'}); widget.resizable(); jQuery('body').append(widget);
     */
});