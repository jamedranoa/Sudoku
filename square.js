(function(root) {
  var Sudoku = root.Sudoku = (root.Sudoku || {});
  
  var Square = Sudoku.Square = function (col, row, block, val, statusOk, seed,$el) {


    this.$el = $el || null;  
    this.statusOk = statusOk || true
    this.val = val || null ;
    this.seed = seed || false;
    

    
    this.col = col;
    this.row = row;
    this.block = block;
    
    this.setEl(col,row,block);
    
  }
  
  Square.prototype.changeVal = function (newVal) {
    if(this.seed){return null}
    this.val = newVal;
    this.$el.html(newVal);
  };
  
  Square.prototype.wrong = function () {
    this.statusOk = false;
    this.$el.addClass("wrong")
  };
  
  Square.prototype.ok = function () {
    this.statusOk = true;
    this.$el.removeClass("wrong")
  };
  
  Square.prototype.setEl = function (col,row,block) {
    
    this.$el = $(document.createElement("li"));
    this.$el.attr('id', row + "-" + col);
    if(_([2,4,,6,8]).include(block)){ this.$el.addClass("diff-block") }
    
    this.$el.data("col",col);
    this.$el.data("row",row);
    $("#board").append(this.$el);
  };
  
}(this));