import { useSelector} from "react-redux";
import { CELL_TYPE } from "../../constants";

function Cells({cellValue, r, c, handleCellClick}) {
  const playerPos = useSelector((state) => state.app.playerPos);

  let className = 'cell';
  let content = '';
  if (playerPos && playerPos.r === r && playerPos.c === c) {
      className += ' player';
      content = '☺';
  } else {
      switch (cellValue) {
          case CELL_TYPE.OBSTACLE:
              className += ' obstacle';
              content = '■';
              break;
          case CELL_TYPE.VISITED:
              className += ' visited';
              content = '*'; // Or some other indicator for visited
              break;
          case CELL_TYPE.EMPTY:
          default:
              className += ' empty';
              content = '.'; // Or empty string
              break;
      }
  }
  return (
      <div key={`${r}-${c}`} className={className} onClick={() => handleCellClick(r, c)}>
          {content}
      </div>
  );
}

export default Cells;