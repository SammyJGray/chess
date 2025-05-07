import {getTile} from "./helper.js";

const bitBoards = {
    white: {
        pawn:   0x000000000000FF00n,
        rook:   0x0000000000000081n,
        knight: 0x0000000000000042n,
        bishop: 0x0000000000000024n,
        queen:   0x0000000000000008n,
        king:    0x0000000000000010n
    },
    black: {
        pawn:   0x00FF000000000000n,
        rook:   0x8100000000000000n,
        knight: 0x4200000000000000n,
        bishop: 0x2400000000000000n,
        queen:   0x0800000000000000n,
        king:    0x1000000000000000n
    }
};

const pieceType = ["pawn","rook","knight","bishop","queen","king"];
const color = ["white","black"];

function renderBitboard(bitBoard, imageSrc){
	for (let row = 0n; row < 8n; row++){
		for (let col = 0n; col < 8n; col++){
			let index = (8n*(7n-row) + col)
			if ((bitBoard >> index) & 1n){
				let tile = getTile(row,col);
				let piece = document.createElement('img');
				piece.src = imageSrc;
				piece.classList.add("chess-piece");
				piece.setAttribute("draggable",false);
				tile.appendChild(piece);
			}
		}
	}
}

export function renderBoard(){
	
	const board = document.querySelector('#board');

	for (let row = 0; row < 8; row++){
		for (let col = 0; col < 8; col++){
			const tile = document.createElement('div');
			const isDark = (row+col) % 2 == 1;
			tile.style.backgroundColor = isDark ? '#769656' : '#eeeed2';
			tile.dataset.row = row; tile.dataset.col = col;
			tile.classList.add("tile");
			board.appendChild(tile);
		}
	}

	pieceType.forEach(piece=>{
		color.forEach(color=>{
			renderBitboard(bitBoards[color][piece],`/assets/sprites/${color}-${piece}.svg`);
		});
	});

}
