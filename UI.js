$(document).ready(function(){
  console.log($("#1"))
  var currentNum = 1;
  var board = new Sudoku.Board()
  var temp = ""
   
   $(".buttons > ul > li").on("click",function (event) {
     $(".buttons > ul >li").removeClass("selected")
     currentNum = parseInt($(event.currentTarget).text())
     $(event.currentTarget).addClass("selected")
   });
   
   $(".board > ul > li").on("click", function (event) {
     temp = currentNum
   })
   
   $(".board > ul > li").on("mouseover", function (event) {
     var $sqr = $(event.currentTarget)
     temp = $(event.currentTarget).html()
     board.move($sqr.data("col"),$sqr.data("row"),currentNum)
   })
   
   $(".board > ul > li").on("mouseout", function (event) {
     var $sqr = $(event.currentTarget)
     board.move($sqr.data("col"),$sqr.data("row"),parseInt(temp))
   })
 })