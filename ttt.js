
// var possibleWins = [7, 56, 73, 84, 146, 273, 292, 448];
var turns = 0;
var player = "o"
var gameArray = [];
var winner;
var xScore = 0;
var oScore = 0;
var game = {};


var playerTurn = function playerTurn(){
//clears gamearray every turn
gameArray = [];

//as long as the cell is not occupied, it can then be filled
  if($(this).is(':empty')){
    //runs the turn with X player
    if(player === "o"){
      $(this).text("x");
      console.log("added x");
      turns++;
      player = "x";
    }
    else{
     // Runs the turn as o player
      $(this).text("o");
      console.log("added o");
      turns++;
      player = "o";
    }

    //runs through every gameboard cell and pulls out its content
    // and puts it into an array that is used for game logic.
    $('#cells div').each(function(){
     gameArray.push($(this).text());
    });
    //checkes for winner every turn
    winner = getWinner(player);
  }

};



//gameArray:
//[0][1][2]
//[3][4][5]
//[6][7][8]

//checks three blocks in the array for a winner.
var allThree = function allThree(player, cell1, cell2, cell3){
  return (cell1 === player) && (cell2 === player) && (cell3 === player);
};
// checks all horizontal combos
var winsRow = function winsRow(player){
  return allThree(player, gameArray[0], gameArray[1], gameArray[2]) ||
         allThree(player, gameArray[3], gameArray[4], gameArray[5]) ||
         allThree(player, gameArray[6], gameArray[7], gameArray[8]);
};

//checks all vertical combos
var winsColumn = function winsColumn(player) {
  return allThree(player, gameArray[0], gameArray[3], gameArray[6]) ||
         allThree(player, gameArray[1], gameArray[4], gameArray[7]) ||
         allThree(player, gameArray[2], gameArray[5], gameArray[8]);
};
// checks diagonal combos
var winsDiagonal = function winsDiagonal(player) {
  return allThree(player, gameArray[0], gameArray[4], gameArray[8]) ||
         allThree(player, gameArray[2], gameArray[4], gameArray[6]);
}
//incorporates all winning conditions and checks for winner.
var getWinner = function getWinner(player) {
     if(winsRow(player) || winsColumn(player)  || winsDiagonal(player)){
      //if there is a winner posts message to user in a header
      $(".title h2").text("The winner is " +  player);
      //shuts down empty cells from being clickable after winner is found
      $("#cells div").css("pointer-events", "none");
      //keeps track of x's score in the scoreboard
      if(player === "x"){
        xScore++;
      }
      //keeps track of o's score in the scoreboard
      else if(player === "o"){
        oScore++;
      }
      //Updates scoreboard
      $("#xScore").text("X Wins: " + xScore);
      $("#oScore").text("O Wins: " + oScore);
      return player;
    }
    //determines there is a draw on the 9th turn if there is no winner
    else if(turns === 9){
      $(".title h2").text("Cats Game");
    }
};
//clears the board and notification header and resets turn count to 0
var clearBoard = function clearBoard(){
    $("#cells div").text("");
    $(".title h2").text("");
    turns = 0;
  }


$(document).ready(function function_name (argument) {
  // body...
  $("#cells div").click(playerTurn);
  //clicking new game reactivates cells and clears the board
  $("#clear").click(function(){
      clearBoard();
      $("#cells div").css("pointer-events", "auto");
  });

});
