define(function(require) {

    var Node = require('graphit/tree/node/element');
    var Primitive = require('graphit/tree/node/primitive');
    var Vector2D = require('graphit/math/vector2d');
    var Canvas = require('graphit/draw/Canvas');
    var shape = require('graphit/draw/shape');
    var Line = require('graphit/math/line');
    var util = require('graphit/draw/tool');

    function TREE() {
        this.__MODULE__ = 'graphit/test/tree';
    }

    TREE.prototype.run = function() {
        console.log('----- Testing tree -----');
//        wrapper('Testing DOM Element', test_domnode);
        wrapper('Testing our Custom Node', test_node);        
    };
    
    function randomBool(limit) {
        if (Math.random() > limit) {
            return true;
        }
        return false;
    }

    function randInt(max) {
        return Math.floor(Math.random()* max) ;
    }

    function randLine() {
        var max = 400;
        return new Line(new Vector2D(randInt(max), randInt(max)),
                        new Vector2D(randInt(max), randInt(max)));
    }
    function randomTree(root, max, depth) {
        if (root.path === undefined) {
            root.path = root.uid;
        }
        if (depth <= 0) {
            return;
        }
//        console.log(root.uid, 'randomTree',max, depth);
        depth--;
        var count = 0;
        for(var i = 0; i < max; i++) {
            if (randomBool(0.1)) {
                var child = null;
                if (randomBool(0.1)) {
                    child = new Node();
                } else {
                    child = new Primitive();
                    for (var _i = 0; _i < randInt(10); _i++) {
                        child.appendChild(randLine());
                    }
                }
                child.path = root.path + '.' + child.uid;
                count++;
                root.appendChild(child);
                if (randomBool(0.5)) {
                    randomTree(child, max, depth);
                }
            }
        }
//        console.log(root.oid, 'Child created', count);
    }
    function wrapper(name, fn) {
        console.log('----- ---- ----- ---- -----');
        console.log(name);
        var startDate = new Date();
        var count = fn(1000000);
        var endDate = new Date();
        var diffTime = endDate - startDate;
        console.log('Time', diffTime);        
        console.log('Count', count);
    }
    function traverseDom(root, fn) {
        fn(root);
        var child = root.firstChild;
        while(child != null) {
            traverseDom(child, fn);
            child = child.nextSibling;
        }
    }
    function test_domnode(num) {
        var root = document.createElement('div');
        var count = 0;
        for(var i = 0; i < num; i++) {
            root.appendChild(document.createElement('div'));
        }
        traverseDom(root, function(node) {
           count++; 
        });
        return count;
    }
    function choice(choices) {
        return choices[randInt(choices.length)];
    }
    function test_node(num) {
        var width = 640;
        var height = 480;
        var canvas = new Canvas({width: width, height: height});
        var ctx = canvas.getCtx();
        ctx.fillStyle = '#fff';
        shape.rectangle(ctx, 0, 0, width, height);
        jQuery(canvas.getElement()).draggable();
        jQuery('body').append(canvas.getElement());
        var root = new Node();
//        for(var i = 0; i < num; i++) {
//            root.appendChild(new Node());
//        }
        randomTree(root, 5, 8);
        var count = 0;
        root.preTraverse(function(node) {
//           console.log(node.__namespace__, node.uid, node.path);
           if ('render' in node) {
               ctx.strokeStyle = util.randomColor();
               ctx.lineWidth = randInt(10);
               ctx.lineCap = choice(['butt', 'round', 'square']);
               node.render(shape, ctx);
           }
           count ++;
        });
        window.rootNode = root;
        return count;
    }

    return new TREE();
});