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
  var result = [];
  var newBoard = new Board({n: n});

  var findSolution = function(board, i, j) {
    board = board;

    if (i !== undefined && j !== undefined) {
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        return true;
      } else {
        return false;
      }
    }


    for (let i = 0; i < n; i++) {
      let row = board.get(i);

      for (let j = 0; j < row.length; j++) {
        row[j] = 1;
        if (findSolution(board, i, j)) {
          row[j] = 0;
        }
      }
    }

    for (let i = 0; i < board.attributes.n; i++) {
      let row = board.get(i);
      result.push(row);
    }
  };

  findSolution(newBoard);

  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var result = 0;
  var rooksBoard = new Board({n: n});

  var placeRook = function(row, column) {
    if (rooksBoard.hasRowConflictAt(row) || rooksBoard.hasColConflictAt(column)) {
      return;
    }

    let currentRow = rooksBoard.get(row);

    currentRow[column] = 1;
    rooksBoard.set(row, currentRow);
    // console.log(`Attributes: ${JSON.stringify(rooksBoard.attributes)}, Updated Row: ${currentRow}`);

    if (row === rooksBoard.attributes.n - 1) {
      if (!rooksBoard.hasAnyRooksConflicts()) {
        result++;
      }
    } else {
      for (let c = 0; c < rooksBoard.attributes.n; c++) {
        placeRook(row + 1, c);
      }
    }

    currentRow[column] = 0;
    rooksBoard.set(row, currentRow);
  };

  for (let c = 0; c < rooksBoard.attributes.n; c++) {
    placeRook(0, c);
  }

  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var result = [];
  var bucket = [];
  var queensBoard = new Board({n: n});

  if (n === 0) {
    return queensBoard;
  }

  if (n === 2 || n === 3) {
    for (let i = 0; i < queensBoard.attributes.n; i++) {
      let row = queensBoard.get(i);
      result.push(row);
    }

    return result;
  }

  var placeQueen = function(row, column) {
    if (queensBoard.hasAnyQueensConflicts()) {
      return;
    }

    let currentRow = queensBoard.get(row);

    currentRow[column] = 1;
    queensBoard.set(row, currentRow);
    // console.log(`Attributes: ${JSON.stringify(queensBoard.attributes)}, Updated Row: ${currentRow}`);

    if (row === queensBoard.attributes.n - 1) {
      if (!queensBoard.hasAnyQueensConflicts()) {
        bucket.push(JSON.parse(JSON.stringify(queensBoard.attributes)));
      }
    } else {
      for (let c = 0; c < queensBoard.attributes.n; c++) {
        placeQueen(row + 1, c);
      }
    }

    currentRow[column] = 0;
    queensBoard.set(row, currentRow);
  };

  for (let c = 0; c < queensBoard.attributes.n; c++) {
    placeQueen(0, c);
  }

  let firstSolution = bucket[0];
  for (let i = 0; i < firstSolution.n; i++) {
    result.push(firstSolution[i]);
  }

  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var result = 0;
  var queensBoard = new Board({n: n});

  var placeQueen = function(row, column) {
    if (queensBoard.hasAnyQueensConflicts()) {
      return;
    }

    let currentRow = queensBoard.get(row);

    currentRow[column] = 1;
    queensBoard.set(row, currentRow);
    // console.log(`Attributes: ${JSON.stringify(queensBoard.attributes)}, Updated Row: ${currentRow}`);

    if (row === queensBoard.attributes.n - 1) {
      if (!queensBoard.hasAnyQueensConflicts()) {
        result++;
      }
    } else {
      for (let c = 0; c < queensBoard.attributes.n; c++) {
        placeQueen(row + 1, c);
      }
    }

    currentRow[column] = 0;
    queensBoard.set(row, currentRow);
  };

  for (let c = 0; c < queensBoard.attributes.n; c++) {
    placeQueen(0, c);
  }

  return result;
};
