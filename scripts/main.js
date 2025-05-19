import {initBoard} from "./init_board.js";
import {onDown} from "./move_piece.js";
import bitboard from "./bitboard.js";
import {onHover} from "./render_moves.js";

initBoard();

document.addEventListener("pointerdown",onDown);

document.addEventListener("mouseover",onHover);
