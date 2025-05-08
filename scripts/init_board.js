import {getTile} from "./helper.js";
import bitboard from "./bitboard.js";

const pieceType = ["pawn","rook","knight","bishop","queen","king"];
const color = ["white","black"];

function initPieces(bitboard, imageSrc, color, pieceType){

	for (let bit = 0n; bit < 64n; bit++){
		if ((bitboard >> bit) & 1n){
			let tile = getTile(bit);
			let piece = document.createElement('img');
			piece.src = imageSrc;
			piece.classList.add("chess-piece");
			piece.dataset.color = color;
			piece.dataset.piece = pieceType;
			tile.appendChild(piece);
		}
	}
}

export function initBoard(){
	
	const board = document.querySelector('#board');

	for (let pos = 1; pos <= 64; pos++){	
			const tile = document.createElement('div');
			const isDark = (pos + Math.floor((pos-1)/8))  % 2 == 1;
			tile.style.backgroundColor = isDark ? '#769656' : '#eeeed2';
			tile.dataset.pos = pos-1;
			tile.classList.add("tile");
			board.appendChild(tile);
	}

	pieceType.forEach(piece=>{
		color.forEach(color=>{
			initPieces(bitboard.pieces[color][piece],`assets/sprites/${color}-${piece}.svg`,color,piece);
		});
	});

}
