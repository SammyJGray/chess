import {renderBoard} from "./render_board.js";
import {onMouseDown} from "./move_piece.js";

renderBoard();

document.addEventListener("mousedown",onMouseDown);
