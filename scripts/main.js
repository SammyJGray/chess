import {renderBoard} from "./render_board.js";
import {onPointerDown} from "./move_piece.js";

renderBoard();

document.addEventListener("pointerdown",onPointerDown);
