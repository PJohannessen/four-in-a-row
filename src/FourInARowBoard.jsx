import React from 'react';
import { emptyCell, numOfColumns, numOfRows, p1disc, p2disc, playerDiscLookup } from './constants';
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
    // If the top row of a column is not empty, we shouldn't allow another disc.
    if (this.props.G.grid[0][columnIdx] !== emptyCell) return false;
    return true;
  }

  render() {
    let message = '';
    if (this.props.ctx.winner !== null) {
      message = <span>Winner: Player {playerDiscLookup[this.props.ctx.currentPlayer]}</span>;
    } else {
      message = <span>Current Player: Player {playerDiscLookup[this.props.ctx.currentPlayer]}</span>;
    }
    const selectors = Array(numOfColumns).fill().map((_, i) => i).map(idx =>
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
          {message}
        </div>
        {selectors}
        <Grid grid={this.props.G.grid} />
      </div>
    )
  }
}

const ColumnSelector = ({ active, handleClick }) => {
  return (
    <div className="columnSelectorContainer">
      <button disabled={!active} onClick={handleClick} className="columnSelector">Select</button>
    </div>
  );
}

const Grid = ({ grid }) => {
  let rows = [];
  for (var rowIdx = 0; rowIdx < numOfRows; rowIdx++) {
    rows = rows.concat(
      <div key={rowIdx}>
        <Row row={grid[rowIdx]} />
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
    case p1disc:
      cellImage = RedDisc;
      break;
    case p2disc:
      cellImage = BlueDisc;
      break;
    default:
      cellImage = WhiteDisc;
      break;
  }
  return (
    <img alt="disc" src={cellImage} className="disc" />
  );
}

export default FourInARowBoard;
