import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';
import FourInARowBoard from './FourInARowBoard';

const FourInARow = Game({
  setup: () => {
    const grid = {};
    for (var i = 0; i < 7; i++) {
      grid[i] = [0, 0, 0, 0, 0, 0, 0];
    }
    return ({ grid: grid });
  },
  moves: {
    selectColumn(G, ctx, columnIdx) {
      let grid = Object.assign({}, G.grid);
      for (var rowIdx = 5; rowIdx >= 0; rowIdx--) {
        if (grid[rowIdx][columnIdx] === 0) {
          grid[rowIdx][columnIdx] = parseInt(ctx.currentPlayer, 10) + 1;
          break;
        }
      }
      return {...G, grid};
    },
  },
  victory: (G, ctx) => {
    return IsVictory(G.grid, parseInt(ctx.currentPlayer, 10) + 1) ? ctx.currentPlayer : null;
  }
});

function IsVictory(grid, player) {
  // Victory algorithm by ferdelOlmo: https://stackoverflow.com/a/38211417/129967

  const width = 7;
  const height = 6;
  let i = 0;
  let j = 0;

  // horizontalCheck
  for (j = 0; j < height-3; j++) {
    for (i = 0; i < width; i++) {
      if (grid[i][j] === player && grid[i][j+1] === player && grid[i][j+2] === player && grid[i][j+3] === player) {
        return true;
      }
    }
  }

  // verticalCheck
  for (i = 0; i < width-3; i++) {
    for (j = 0; j < height; j++) {
      if (grid[i][j] === player && grid[i+1][j] === player && grid[i+2][j] === player && grid[i+3][j] === player) {
        return true;
      }
    }
  }

  // ascendingDiagonalCheck
  for ( i = 3; i < width; i++) {
    for (j = 0; j < height-3; j++) {
      if (grid[i][j] === player && grid[i-1][j+1] === player && grid[i-2][j+2] === player && grid[i-3][j+3] === player) {
        return true;
      }
    }
  }

  // descendingDiagonalCheck
  for (i = 3; i < width; i++) {
    for (j = 3; j < height; j++) {
      if (grid[i][j] === player && grid[i-1][j-1] === player && grid[i-2][j-2] === player && grid[i-3][j-3] === player) {
        return true;
      }
    }
  }
}

const App = Client({
  game: FourInARow,
  board: FourInARowBoard,
});

export default App;
