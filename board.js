(function(root) {
  var Sudoku = root.Sudoku = (root.Sudoku || {});
  
  var Board = Sudoku.Board = function () {
    this.squares = [];
    this.win = false;
    this.fillBoard();
    this.fillSeeds();
  };
  
  Board.prototype.fillBoard = function () {
    var that = this;
    _(9).times(function (col) {
      col += 1;
      _(9).times(function (row) {
        row += 1;
        that.squares.push(
          new Sudoku.Square(col,row,Board.determineBlock(col,row))
        );
      });
    });
  };
  
  Board.prototype.fillSeeds = function () {
    this.seed(3,1,2);
    this.seed(4,1,1);
    this.seed(8,1,6);
    this.seed(5,2,6);
    this.seed(8,2,7);
    this.seed(1,3,4);
    this.seed(2,3,8);
    this.seed(4,3,7);
    this.seed(8,3,1);
    this.seed(1,4,5);
    this.seed(2,4,1);
    this.seed(6,4,9);
    this.seed(7,4,8);
    this.seed(9,4,7);
    this.seed(2,5,6);
    this.seed(3,5,7);
    this.seed(4,5,3);
    this.seed(5,5,4);
    this.seed(6,5,8);
    this.seed(7,5,5);
    this.seed(8,5,9);
    this.seed(1,6,8);
    this.seed(3,6,9);
    this.seed(4,6,5);
    this.seed(8,6,2);
    this.seed(9,6,3);
    this.seed(2,7,9);
    this.seed(6,7,3);
    this.seed(8,7,5);
    this.seed(9,7,4);
    this.seed(2,8,3);
    this.seed(5,8,9);
    this.seed(2,9,2);
    this.seed(6,9,7);
    this.seed(7,9,9);
  };
  
  Board.prototype.seed = function (col,row,val) {
    var sqr = this.findSqr(col,row)
    sqr.val = val
    sqr.seed = true
  };
  
  Board.prototype.move = function (col,row,newVal) {
    this.findSqr(col,row).val = newVal;
    this.checkStatus();
    this.print();
  };
  
  Board.prototype.print = function () {
    console.log("   1   2   3   4   5   6   7   8   9")
    for (var i = 1; i <= 9; i++) {
      console.log(i.toString() + " " + this.rowToS(i) + i.toString())
    }
    console.log("   1   2   3   4   5   6   7   8   9")
    
  };
  
  Board.prototype.rowToS = function (n) {
    var row = _(this.squares).select(function (sqr) { return (sqr.row === n); })
    var rowString = ""
    _(row).each(function (sqr) {
      if (sqr.val) {
        rowString += "[" + sqr.val.toString() + "] "
      }else{ rowString += "[ ] " }
    })
    return rowString
  };
  
  Board.prototype.findSqr = function (col,row) {
    var square = _(this.squares).find(function (sqr) { 
                    return (sqr.row === row && sqr.col == col);
                  });
    return square;
  };
  
  Board.prototype.checkStatus = function () {
    this.win = true;
    var board = this;
    
    board.squares.forEach(function (sqr) {
      if(board.check(sqr)){
        sqr.ok();
      } else {
        board.win = false;
        sqr.wrong();
      }
    });
  };
  

  
  Board.prototype.check = function (sqr) {
    if (!sqr.val || sqr.seed) { return true; }
    
    var count = 0;
    var sqrs = this.squares;
    for (var i = 0; i < sqrs.length; i++) {
      var tem = sqrs[i];
      if(Board.compareSqrs(tem,sqr)) { count += 1; }
      if(count > 1) { return false; }
    }
    
    return true
  };
  
  Board.compareSqrs = function (sqr1,sqr2) {
    return (sqr1.val === sqr2.val 
      && (sqr1.col === sqr2.col || sqr1.row === sqr2.row || 
        sqr1.block === sqr2.block ))
  }
  
 
  
  Board.determineBlock = function (col,row) {
    if (col >= 1 && col <= 3 && row >= 1 && row <= 3){
      return 1
    }
    else if (col >= 4 && col <= 6 && row >= 1 && row <= 3){
      return 2
    }
    else if (col >= 7 && col <= 9 && row >= 1 && row <= 3){
      return 3
    }
    else if (col >= 1 && col <= 3 && row >= 4 && row <= 6){
      return 4
    }
    else if (col >= 4 && col <= 6 && row >= 4 && row <= 6){
      return 5
    }
    else if (col >= 7 && col <= 9 && row >= 4 && row <= 6){
      return 6
    }
    else if (col >= 1 && col <= 3 && row >= 7 && row <= 9){
      return 7
    }
    else if (col >= 4 && col <= 6 && row >= 7 && row <= 9){
      return 8
    }
    else{
      return 9
    }
  }
}(this));