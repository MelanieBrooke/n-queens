// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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

    // START HERE-------------------------
    // ROWS - run from left to right
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // Create variable to capture array at the given index from the board
      let row = this.get(rowIndex);
      // Create counter variable set at 0
      let counter = 0;
      // Iterate over the array
      // Add each item to the counter variable
      for (let i = 0; i < row.length; i++) {
        counter += row[i];
      }
      // If counter is greater than 1, return true
      // Else return false
      if (counter > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Capture this.attributes object
      // let board = this.attributes;
      // Capture this.attributes length
      // Iterate over the object by length
      // Use current index to capture the row from this
      // Create counter for each row
      // Iterate of the row
      // Keep track of counter
      // If ever > 1 return true
      // Exit loops
      let n = this.attributes.n;

      for (let i = 0; i < n; i++) {
        let row = this.get(i);
        let counter = 0;
        for (let j = 0; j < row.length; j++) {
          counter += row[j];
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // based on (n)
    // columnObj = {0: 0, 1: 0, 2: 0};

    // iterate through all rows
    // at every index, add the value to columnObj[i];

    // if columnObj[colIndex] > 1 then true

    hasColConflictAt: function(colIndex) {
      let n = this.attributes.n;
      let columnObj = {};
      for (let i = 0; i < n; i++) {
        columnObj[i] = 0;
      }

      for (let i = 0; i < n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          columnObj[j] += row[j];
        }
      }

      if (columnObj[colIndex] > 1) {
        return true;
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let n = this.attributes.n;
      let columnObj = {};
      for (let i = 0; i < n; i++) {
        columnObj[i] = 0;
      }

      for (let i = 0; i < n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          columnObj[j] += row[j];
        }
      }

      for (let col in columnObj) {
        if (columnObj[col] > 1) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------

    // test if a specific major diagonal on this board contains a conflict

    // if index of current coordpoint tuple is less than index of coord // point tuple it is being compared to (difference) good
    // else rearrange them, so that the coortuple that comes from gets
    // substracted from

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let coordinates = [];

      for (let i = 0; i < this.attributes.n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          let points = [];
          if (row[j] > 0) {
            points.push(i, j);
            coordinates.push(points);
          }
        }
      }

      let compareFrom = [0, majorDiagonalColumnIndexAtFirstRow];

      for (let i = 0; i < coordinates.length; i++) {
        let compareTo = coordinates[i];
        let differenceAt0 = compareFrom[0] - compareTo[0];
        let differenceAt1 = compareFrom[1] - compareTo[1];
        let bothAreEqual = differenceAt0 === differenceAt1;
        let bothAreNeg = differenceAt0 < 0 && differenceAt1 < 0;

        if (bothAreEqual && bothAreNeg) {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let coordinates = [];

      for (let i = 0; i < this.attributes.n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          let points = [];
          if (row[j] > 0) {
            points.push(i, j);
            coordinates.push(points);
          }
        }
      }

      for (let i = 0; i < coordinates.length; i++) {
        let indexOfCompareFrom = i;
        let compareFrom = coordinates[i];
        for (let j = 0; j < coordinates.length; j++) {
          let indexOfCompareTo = j;
          let compareTo = coordinates[j];
          let differenceAt0 = compareFrom[0] - compareTo[0];
          let differenceAt1 = compareFrom[1] - compareTo[1];

          let bothAreEqual = differenceAt0 === differenceAt1;
          let bothAreNeg = differenceAt0 < 0 && differenceAt1 < 0;

          if (bothAreEqual && bothAreNeg) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      for (let i = 0; i < this.attributes.n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          let points = [];
          if (row[j] > 0) {
            points.push(i, j);
            coordinates.push(points);
          }
        }
      }

      let compareFrom = [0, minorDiagonalColumnIndexAtFirstRow];

      for (let j = 0; j < coordinates.length; j++) {
        let compareTo = coordinates[j];

        let differenceAt0 = compareFrom[0] - compareTo[0];
        let differenceAt1 = compareFrom[1] - compareTo[1];

        let bothAreEqual = Math.abs(differenceAt0) === differenceAt1;
        let lessThan0 = differenceAt0 < 0;
        let greaterThan0 = differenceAt1 > 0;

        if (bothAreEqual && lessThan0 && greaterThan0) {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let coordinates = [];

      for (let i = 0; i < this.attributes.n; i++) {
        let row = this.get(i);
        for (let j = 0; j < row.length; j++) {
          let points = [];
          if (row[j] > 0) {
            points.push(i, j);
            coordinates.push(points);
          }
        }
      }

      for (let i = 0; i < coordinates.length; i++) {
        let indexOfCompareFrom = i;
        let compareFrom = coordinates[i];
        for (let j = 0; j < coordinates.length; j++) {
          let indexOfCompareTo = j;
          let compareTo = coordinates[j];
          let differenceAt0;
          let differenceAt1;

          if (indexOfCompareFrom > indexOfCompareTo) {
            differenceAt0 = compareTo[0] - compareFrom[0];
            differenceAt1 = compareTo[1] - compareFrom[1];
          } else {
            differenceAt0 = compareFrom[0] - compareTo[0];
            differenceAt1 = compareFrom[1] - compareTo[1];
          }

          let bothAreEqual = Math.abs(differenceAt0) === differenceAt1;
          let lessThan0 = differenceAt0 < 0;
          let greaterThan0 = differenceAt1 > 0;

          if (bothAreEqual && lessThan0 && greaterThan0) {
            return true;
          }
        }
      }

      return false; // fixme
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


var board = new Board([[0,0,1,0,0],[0,0,0,1,0],[0,0,1,0,1],[0,0,0,0,0],[0,0,0,0,1]]);