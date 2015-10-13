/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
  // Go through columns
    // Recurse (rownumber) {
        // place in first 'open' square
          // check for conflicts
          // if conflict, move piece one column to the right in the same row and check again (recurse)
            // if conflict: 
              // recurse (colnumber ++)
              // if can't place, return false
          // else if valid, move on to the next row and repeat recurse with row + 1
    // call recurse with first row number


// base case: if (no conflict, place)
// termination condition: else if count < n
// else: recurse (rownumber++)

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n: n});
  var boardMatrix = board.rows();
  // 1. Place a rook at a random column in 1st row --> mark all in row and column as '-'
  
  // while (// cell is not '-')
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
    
  // 2. Place a rook at a random (available) in 2nd col --> mark all in row and column as taken
  // 3. Etc.

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function (n) {
    if (n === 0) {
      return 1;
    } else if (n == 1) {
      return 1;
    } else {
      return n * factorial (n-1);
    }
  };

  console.log('Number of solutions for ' + n + ' rooks:', factorial(n));
  return factorial(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, col) {

  var board = new Board ({n: n});
  var matrix = board.rows();

  var row = 0;
  if (col === undefined) {
    col = 0;
  }

  var noSolution = false;

  while (row < n && col < n && row >= 0 && col >= 0 && !noSolution) {
    board.togglePiece(row, col);
    // console.table(matrix);
    // console.table(matrix);
    if (board.hasAnyQueensConflicts() && col + 1 < n) {
      // console.log("row: " + row + ", col: " + col);
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
  return matrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0, solutions = [];
  // Iterate through n times
  for (var i = 0; i < n; i++) {
    var result = findNQueensSolution(n, i);
    var resultString = '"' + result + '"';
    var numPieces = _.reduce(result, function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    console.log(numPieces);
    if (!_.contains(solutions, resultString) && numPieces === n) {
      solutions.push(resultString);
      count++;
    }
    console.log(count);
  }
    // call findNQueensSolution starting at each column
    // if the result of the function call gives a count = n, count++

  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
























