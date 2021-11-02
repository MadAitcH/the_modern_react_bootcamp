// I came up with this logic, but it's not perfect

export function isSolvableArray(arr: boolean[]): boolean {
  let i = 0;
  arr.forEach((v) => {
    if (!!v) i++;
  });

  if (i % 2 === 0) return true;

  return false;
}

export function isBoardSolvable(board: boolean[][]): boolean {
  for (let i = 0; i < board.length; i++) {
    const column = board.map((v) => v[i]);

    if (!isSolvableArray(column)) return false;
  }
  return true;
}

export function hasWonTheGame(board: boolean[][]): boolean {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j]) return false;
    }
  }

  return true;
}
