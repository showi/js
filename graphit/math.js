define(function(require) {
console.log('Math', Math);
if (typeof Math.randInt != 'function') {
    console.log('Extend Math object with randInt method');
    Math.randInt = function (a, b){
      return Math.floor((Math.random() * b) + a);
    };
}
if (typeof Math.randFloat != 'function') {
    console.log('Extend Math object with randFloat method');
    Math.randFloat = function (a, b){
      return Math.random() * b + a;
    };
}
});