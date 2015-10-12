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
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
