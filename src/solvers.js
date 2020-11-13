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
  var solution = [];
  var newBoard = new Board({n: n});

  var searchForSolution = function(board, i, j) {
    board = board;

    if (i !== undefined && j !== undefined) {
      if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
        return true;
      } else {
        return false;
      }
    }

    for (let i = 0; i < board.attributes.n; i++) {
      let row = board.get(i);
      for (let j = 0; j < row.length; j++) {
        row[j] = 1;
        board.set(i, row);
        if (!searchForSolution(board, i, j)) {
          row[j] = 0;
          board.set(i, row);
        }
      }
    }

    for (let i = 0; i < board.attributes.n; i++) {
      let row = board.get(i);
      solution.push(row);
    }
  };

  searchForSolution(newBoard);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.conflictCheck = function(board, i, j) {
  if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
    return true;
  } else {
    return false;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = [];
  var bucket = [];
  let counter = 0;

  var searchForSolution = function(board, i, j) {
    board = board || new Board({n: n});

    if (i !== undefined && j !== undefined) {
      if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
        return true;
      } else {
        return false;
      }
    }

    for (let i = 0; i < board.attributes.n; i++) {
      let row = board.get(i);
      for (let j = 0; j < row.length; j++) {
        row[j] = 1;
        board.set(i, row);
        if (!searchForSolution(board, i, j)) {
          row[j] = 0;
          board.set(i, row);
        }
      }
    }

    bucket.push(board.attributes);
    counter++;

    if (counter < n) {
      searchForSolution();
    }

    console.log(bucket);
  };

  searchForSolution();
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
