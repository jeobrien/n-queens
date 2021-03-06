// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0, board = this.rows();
      // Loop through row, where row = board[rowIndex]
      for (var i = 0; i < board[rowIndex].length; i++) {
        // if cell = 1, add to count, where cell = board[rowIndex][i]
        if (board[rowIndex][i] === 1) {
          count++;
        }
      }
      // if count > 1, return true
      // else, return false  
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false, board = this.rows();
      // Loop through board rows
      for (var i = 0; i < board.length; i++) {
        // For each row, loop through columns
        var countForRow = 0, row = board[i];
        for (var j = 0; j < row.length; j++) {
          // If cell = 1, add to count
          if (row[j] === 1) {
            countForRow++;
          }
        }
        // if Count for the row > 1, conflict has occurred
        if (countForRow > 1) {
          result = true;
          break;
        }
      }
      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0, board = this.rows();
      var countforCol = {}, result = false;
      // Loop through col, where col = board[colIndex]
      for (var i = 0; i < board.length; i++) {
        // if cell = 1, add to count, where cell = board[colIndex][i]
        if (board[i][colIndex] === 1) {
          if (!countforCol[colIndex]) {
            countforCol[colIndex] = 0;
          }
          countforCol[colIndex]++;
        }
      }
      for (var key in countforCol) {
        if (countforCol[key] > 1) {
          result = true;
        }
      }
      // if count > 1, return true
      // else, return false  
      return result;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false, board = this.rows();
      var countforCol = {};
       // Loop through board
      for (var i = 0; i < board.length; i++) {
        var column = board[i];
        for (var j = 0; j < column.length; j++) {
          if (board[i][j] === 1) {
            if (!countforCol[j]) {
              countforCol[j] = 0;
            }
            countforCol[j]++;
          }
        }
      }
      for (var key in countforCol) {
        if (countforCol[key] > 1) {
          result = true;
          break;
        }
      }
      return result;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(row, col) {
      var total = 0;

      while (this.get(row)) {
        if (this.get(row)[col] === 1) {
          total++;
        }
        row++;
        col++;
      }

      return total > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.attributes.n;

      // for column 0
      for (var row = 0; row < n-1; row++) {
        if (this.hasMajorDiagonalConflictAt(row, 0)) {
          return true;
        }
      }

      // for all others
      for (var col = 1; col < n-1; col++) {
        if (this.hasMajorDiagonalConflictAt(0, col)) {
          return true;
        }
      }

      return false;      
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(row, col) {
      var total = 0;

      while (this.get(row)) {
        if (this.get(row)[col] === 1) {
          total++;
        }
        row--;
        col++;
      }

      return total > 1 ? true : false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;

      // for column 0
      for (var col = 0; col < n-1; col++) {
        if (this.hasMinorDiagonalConflictAt(n-1, col)) {
          return true;
        }
      }

      // for all others
      for (var row = 1; row < n-1; row++) {
        if (this.hasMinorDiagonalConflictAt(row, 0)) {
          return true;
        }
      }

      return false;  
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
