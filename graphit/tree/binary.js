define(function(require) {

   function Node(obj) {
       this.parent = null;
       this.obj = obj;
       this.right = null;
       this.left = null;
   }
   
   function BINT() {
       this.root = null;
       this.node_key = 'value';
   }
   
   BINT.prototype.push(node) {
       if (node === undefined || node == null) {
           throw 'Cannot add undefined or null node';
       }
       if (!(this.node_key in node) || node[this.node_key] === undefined) {
           throw 'No node_key['+this.node_key+'] in node';
       }
       if (this.root == null) {
           this.root = node;
           return this;
       }
       var value = node[this.node_key];
       var last = this.root;
       while(last.left != null || last.right != null) {
           if (value > root.value) {
               last = last.right;
           } else {
               last = last.left;
           }
       }
   }
});