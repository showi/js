define(function(require) {

   function Node(obj) {
       this.parent = null;
       this.obj = obj;
       this.right = null;
       this.left = null;
   }
   
   function LAYER(max) {
       if (max === undefined) {
           max = 10;
       }
       this.max = max;
       this.setUp();
   }
   
   LAYER.prototype.setUp = function() {
       this.data = [];
       for (var i = 0; i < this.max; i++) {
           this.data[i] = null;
       }
   };
   
   LAYER.prototype.push = function(idx, node) {
       if (idx < 0 || idx > this.max) {
           throw 'LayerIndexRangeError('+idx+')';
       }
       if (node === undefined || node == null) {
           throw 'Cannot add undefined or null node';
       }
       if (this.data[idx] == null) {
           this.data[idx] = [];
       }
       this.data[idx].append(node);
   };
   
   LAYER.prototype.clear = function() {
       for(var i = 0; i < this.max; i++) {
           if (this.data[i] != null) {
               this.data[i] = [];
           }
       }
   };

   return LAYER;
});