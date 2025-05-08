import {initBoard} from "./init_board.js";
import {onDown} from "./move_piece.js";
import bitboard from "./bitboard.js";

initBoard();

document.addEventListener("pointerdown",onDown);
document.addEventListener("touchdown",onDown);
