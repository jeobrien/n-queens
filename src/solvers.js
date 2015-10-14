/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// Place a rook in the first row in the first column; mark all in row and column as null
// 

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n: n});
  var boardMatrix = board.rows();
  // 1. Place a rook at a random column in 1st row
  for (var i = 0; i < boardMatrix.length; i++) {
    var indexCol = Math.floor(Math.random() * n);
    while (boardMatrix[i][indexCol] === null) {
      indexCol = Math.floor(Math.random() * n);
    }
    board.togglePiece(i, indexCol);
      // 1a) Mark all in row as taken
    for (var j = 0; j < boardMatrix.length; j++) {
      if (boardMatrix[i][j] === 1) {
        continue;
      } else {
        boardMatrix[i][j] = null;
      }
    }
    // console.table(boardMatrix);
    // 2a) Mark all in column as taken
    for (var k = 0; k < boardMatrix.length; k++) {
      if (boardMatrix[k][indexCol] === 1) {
        continue;
      } else {
        boardMatrix[k][indexCol] = null;
      }
    }
  }
  solution = boardMatrix;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board ({n: n});
  var count = 0;

  var solveNRooks = function (column, n, board) {

    if (column === n) {
      count++;
      return;
    }

    for (var row = 0; row < n; row++) {

      board.togglePiece(row, column);

      if (!board.hasAnyRooksConflicts()) {
        solveNRooks(column + 1, n, board);
      }

      board.togglePiece(row, column);
    }
  }

  solveNRooks(0, n, board);
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, col) {

  var board = new Board ({n: n});
  var matrix = board.rows();
  var row = 0;
  col === undefined ? col = 0 : col = col;
  var noSolution = false;

  while (row < n && col < n && row >= 0 && col >= 0 && !noSolution) {
    board.togglePiece(row, col);
    //console.table(matrix);
    if (board.hasAnyQueensConflicts() && col + 1 < n) {
      board.togglePiece(row, col);
      col++;
    } else if (board.hasAnyQueensConflicts() && col + 1 === n) {
      board.togglePiece(row, col);
      var previous = _.indexOf(board.get(row-1), 1);
      board.togglePiece(row-1, previous);
      col = previous + 1;
      row--;
      if (col === n) {
        previous = _.indexOf(board.get(row-1), 1);
        if (previous < 0) {
          noSolution = true;
        } else {
          board.togglePiece(row-1, previous);
          col = previous + 1;
          row--;
        }
      }
    } else {
      row++;
      col = 0;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(matrix));
  if (noSolution) {
    newMatrix = new Board({n: n});
    matrix = newMatrix.rows();
  } 
  console.table(matrix);
  return matrix;
};

window.findNumPieces = function (board) {
  return _.reduce(board, function(memo, row) {
    return memo + _.reduce(row, function(memo, col) {
      return memo + col;
    }, 0);
  }, 0);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board ({n: n});
  var count = 0;

  var solveNQueens = function (column, n, board) {

    if (column === n) {
      count++;
      return;
    }

    for (var row = 0; row < n; row++) {

      board.togglePiece(row, column);

      if (!board.hasAnyQueensConflicts()) {
        solveNQueens(column + 1, n, board);
      }

      board.togglePiece(row, column);
    }
  }

  solveNQueens(0, n, board);

  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};


var safeToPlace = function (board, row, col) {
  var safeToPlace = false;
  board.togglePiece(row, col);
  if (!board.hasAnyQueensConflicts()) {
    safeToPlace = true;
  } 
  board.togglePiece(row, col);
  return safeToPlace;
};























