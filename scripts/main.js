import {renderBoard} from "./render_board.js";
import {onDown} from "./move_piece.js";

renderBoard();

document.addEventListener("pointerdown",onDown);
document.addEventListener("touchdown",onDown);
