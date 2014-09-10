(function(root) {
  var Sudoku = root.Sudoku = (root.Sudoku || {});
  
  var Square = Sudoku.Square = function (col, row, block, val, statusOk, seed) {
    var col = col;
    var row = row;
    var block = block;

    
    this.statusOk = statusOk || true
    this.val = val || null ;
    this.seed = seed || false;
    
    this.col = function () {
      return col;
    };
    
    this.row = function () {
      return row;
    };
    
    this.block = function () {
      return block;
    };
    
    this.col = col;
    this.row = row;
    this.block = block;
    
  }
  
  Square.prototype.changeVal = function (newVal) {
    this.val = newVal;
  };
  
  Square.prototype.wrong = function () {
    this.statusOk = false;
  };
  
  Square.prototype.ok = function () {
    this.statusOk = true;
  };
  
}(this));