# tic-tac-toe
A simple game of tic tac toe

How the game was started.

read instructions required for project from client.

##Planning

Started with a [wireframe](wireframe.png) to get a picture of a very basic layout for my games web page.

I then followed up with creating some [userstories](Userstories-tictactoe.docx).
This allowed me to break my game into small pieces to solve.

##Coding
Once I had my plan laid out I began with creating my basic layout with HTML and CSS. All I did was arrange my divs on the page to the settings I wanted. I used some pretty crazy colors just so I could differentiate my divs and align them on the page to the exact layout I wanted.

Once I finished with my layout I began coding the game in javascript. I started with naming some functions that I knew I would need: getWinner(), playerTurn(), clearBoard(), etc.....

I started with playerTurn and only focused on being able to put an "x" into a div. Once I could accomplish this i started with alternating by creating a variable that switched back and forth on every click to determine whos turn it was.

Now that I had a way of placing my game pieces on the board I focused on the game logic. I remembered the game logic from the fundamentals pre-work and decided that this would be the way I would design my game logic.

I started by just solving for X in one horizontal row first and worked my way up step by step incorporating all rows and then columns and diagnols. Once I worked this out for x I worked on incorporating searching for 'o' as well.

##Beautify

Once I had a solid game that I couldn't break I wend back and visited my layout I used basic CSS to create a layout in a way that reminded me of how I used to play tic-tac-toe in grade school. In my note book with a pencil!

##Ajax

Once I had the game I wanted it was time to incorporate its game state into a server to save game state and eventually get a game working on multiple devices. Using jQuery and Ajax I was able to get a login and registration sent to the server along with a new game state and being able to update it when my game was played.

##unsolved puzzles

Time became a constraint towards the end and I began to set some priorities. Once I found out what the client could do without and what the client absolutly needed I focused on just what was absolutly needed. I was not able to get to multiplayer functionality with Ajax and some of the fun little animations I had envisioned but I was able to put out a good product with the requirements that were needed. Maybe later on I can come back and add the things I missed out on later.
