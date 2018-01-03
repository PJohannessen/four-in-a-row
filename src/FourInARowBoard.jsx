import React from 'react';
// Discs from http://fontawesome.io/icon/circle/
import WhiteDisc from './circular-shape-silhouette-white.svg';
import BlueDisc from './circular-shape-silhouette-blue.svg';
import RedDisc from './circular-shape-silhouette-red.svg';

class FourInARowBoard extends React.Component {
  onClick(columnIdx) {
    if (this.isActive(columnIdx)) {
      this.props.moves.selectColumn(columnIdx);
      this.props.endTurn();
    }
  }

  isActive(columnIdx) {
    if (this.props.ctx.winner !== null) return false;
    if (this.props.G.grid[0][columnIdx] !== 0) return false;
    return true;
  }

  render() {
    let winner = '';
    let currentPlayer = '';
    if (this.props.ctx.winner !== null) {
      winner = <span>Winner: Player {parseInt(this.props.ctx.winner, 10) + 1}</span>;
    } else {
      currentPlayer = <span>Current Player: Player {parseInt(this.props.ctx.currentPlayer, 10) + 1}</span>;
    }
    const selectors = [0, 1, 2, 3, 4, 5, 6].map(idx =>
      <ColumnSelector
        active={this.isActive(idx)}
        handleClick={() => this.onClick(idx)}
        key={idx}
      />
    );
    return (
      <div>
        <h1>Four In A Row</h1>
        <div>
          {currentPlayer}
          {winner}
        </div>
        {selectors}
        <Grid grid={this.props.G.grid} />
      </div>
    )
  }
}

const ColumnSelector = ({ active, handleClick }) => {
  return (
    <div style={{ padding: '5px', display: 'inline-block' }}>
      <button disabled={!active} onClick={handleClick} style={{ width: '50px' }}>Select</button>
    </div>
  );
}

const Grid = ({ grid }) => {
  let rows = [];
  for (var row = 0; row < 6; row++) {
    rows = rows.concat(
      <div key={row}>
        <Row row={grid[row]} />
      </div>
    );
  }
  return rows;
}

const Row = ({ row }) => {
  const cells = row.map((c, idx) => <Cell cell={c} key={idx} />);
  return cells;
}

const Cell = ({ cell }) => {
  let cellImage;
  switch (cell) {
    case 1:
      cellImage = RedDisc;
      break;
    case 2:
      cellImage = BlueDisc;
      break;
    default:
      cellImage = WhiteDisc;
      break;
  }
  return (
      <img alt="disc" src={cellImage} width="50" height="50" style={{ padding: '5px' }} />
  );
}

export default FourInARowBoard;
