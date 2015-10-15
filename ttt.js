
// var possibleWins = [7, 56, 73, 84, 146, 273, 292, 448];
var turns = 0;
var player = "o"
var gameArray = [];
var winner;
var xScore = 0;
var oScore = 0;
var playerTurn = function playerTurn(){
  gameArray = [];


  if($(this).is(':empty')){
    if(player === "o"){
      $(this).text("x");
      console.log("added x");
      turns++;
      console.log(turns);
      player = "x";
    }
    else{
      $(this).text("o");
      console.log("added o");
      turns++;
      console.log(turns);
      player = "o";
    }
    $('#cells div').each(function(){
      gameArray.push($(this).text());
    });
  }
  winner = getWinner(player);
};



//gameArray:
//[0][1][2]
//[3][4][5]
//[6][7][8]

var allThree = function allThree(player, cell1, cell2, cell3){
  return (cell1 === player) && (cell2 === player) && (cell3 === player);
};

var winsRow = function winsRow(player){
  return allThree(player, gameArray[0], gameArray[1], gameArray[2]) ||
         allThree(player, gameArray[3], gameArray[4], gameArray[5]) ||
         allThree(player, gameArray[6], gameArray[7], gameArray[8]);
};


var winsColumn = function winsColumn(player) {
  return allThree(player, gameArray[0], gameArray[3], gameArray[6]) ||
         allThree(player, gameArray[1], gameArray[4], gameArray[7]) ||
         allThree(player, gameArray[2], gameArray[5], gameArray[8]);
};

var winsDiagonal = function winsDiagonal(player) {
  return allThree(player, gameArray[0], gameArray[4], gameArray[8]) ||
         allThree(player, gameArray[2], gameArray[4], gameArray[6]);
}

var getWinner = function getWinner(player) {
     if(winsRow(player) || winsColumn(player)  || winsDiagonal(player)){
      $(".title h2").text("The winner is " +  player);
      $("#cells div").css("pointer-events", "none");
      if(player === "x"){
        xScore++;
      }
      else if(player === "o"){
        oScore++;
      }
      $("#xScore").text("X Wins: " + xScore);
      $("#oScore").text("O Wins: " + oScore);
      return player;
    }
    else if(turns === 9){
      $(".title h2").text("Cats Game");
    }
};

var clearBoard = function clearBoard(){
    $("#cells div").text("");
    $(".title h2").text("");
    turns = 0;
  }


$(document).ready(function function_name (argument) {
  // body...
  $("#cells div").click(playerTurn);
  $("#clear").click(function(){
    // if(getWinner(player) || turns === 9){
      clearBoard();
      $("#cells div").css("pointer-events", "auto");
    // };
  });
});
