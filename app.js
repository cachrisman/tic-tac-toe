/*
 * Tic-tac-toe game - waits for page to load then sets up game
 */
window.addEventListener("load", function() {
    /*
     * Initial variable declaration and setting.  
     * XsMove, turnCount and board will be set with resetBoard, so just declare
     * winningCombinations, playermove and notification don't change, so declare and set
     */
    var XsMove, turnCount, board = [],
        winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        playermove = document.querySelector("#playermove"),
        notification = document.querySelector("#notification");

    /*
     * Checks current board against winning conditions array, and returns winner if found
     * Otherwise returns false
     */
    var checkWinner = function() {
        var isWinner = function(symbol) {
            for (var i = 0; i < winningCombinations.length; i++) {
                if (board[winningCombinations[i][0]] === symbol &&
                    board[winningCombinations[i][1]] === symbol &&
                    board[winningCombinations[i][2]] === symbol)
                    return true;
            }
        };
        if (isWinner("X")) return "X";
        if (isWinner("O")) return "O";
        return false;
    };

    /*
     * Clears the board tracker, resets XsMove, turnCount, board, playermove, notification
     * div to inital conditions, and adds a click event listener on #board to call makeMove
     */
    var resetBoard = function(event) {
        XsMove = true;
        turnCount = 0;
        board = [null, null, null,
            null, null, null,
            null, null, null
        ];
        var temp = document.querySelectorAll(".box");
        for (var i = 0; i < temp.length; i++) {
            temp[i].innerHTML = "&nbsp;";
        }
        playermove.innerHTML = "X's move";
        notification.innerHTML = "";
        document.querySelector("#board").addEventListener("click", makeMove);
    };

    /*
     * When user clicks a square, this function checks whether the square has already been clicked,
     * if the square has been clicked, it updates notification div and alerts the user.
     *
     * If not it clears notification div, sets the square to the current player, updates playermove
     * div, updates the board tracker, swaps current player, increments turnCount and checks for a
     * winner.
     *
     * If there is a winner, it clears playermove div, updates notification space, removes 
     * the click event listener (to stop users from entering moves), and alerts user with winner.
     *
     * If turnCount equals 9, then it clears playermove, updates notification, removes click event
     * listener and alerts user of tie.
     */
    var makeMove = function(event) {
        if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
            notification.innerHTML = "Already selected";
            notification.style.backgroundColor = "red";
            playermove.innerHTML = "Still " + (XsMove ? "X" : "O") + "'s move";
            alert("Already selected. Still " + (XsMove ? "X" : "O") + "'s move");
        } else {
            notification.innerHTML = "&nbsp;";
            notification.style.backgroundColor = "";
            event.target.innerHTML = XsMove ? "X" : "O";
            playermove.innerHTML = (XsMove ? "O" : "X") + "'s move";
            board[event.target.id] = XsMove ? "X" : "O";
            XsMove = !XsMove;
            turnCount++;
            winner = checkWinner();
            if (winner) {
                playermove.innerHTML = "&nbsp;";
                notification.innerHTML = winner + " Wins!";
                notification.style.backgroundColor = "lime";
                document.querySelector("#board").removeEventListener("click", makeMove);
                alert(winner + " Wins!");
            } else if (turnCount == 9) {
                playermove.innerHTML = "&nbsp;";
                notification.innerHTML = "Its a Tie!!";
                notification.style.backgroundColor = "lime";
                document.querySelector("#board").removeEventListener("click", makeMove);
                alert("Its a Tie!!");
            }
        }
    };
    /*
     * Upon page load, resets board and sets up reset button click event listener
     */
    resetBoard();
    document.querySelector("button").addEventListener("click", resetBoard);
});
