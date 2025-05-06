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

function getTile(row,col){
	return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

const bitBoards = {
    white: {
        pawns:   0x000000000000FF00n,
        rooks:   0x0000000000000081n,
        knights: 0x0000000000000042n,
        bishops: 0x0000000000000024n,
        queen:   0x0000000000000008n,
        king:    0x0000000000000010n
    },
    black: {
        pawns:   0x00FF000000000000n,
        rooks:   0x8100000000000000n,
        knights: 0x4200000000000000n,
        bishops: 0x2400000000000000n,
        queen:   0x0800000000000000n,
        king:    0x1000000000000000n
    }
};

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

renderBitboard(bitBoards.white.pawns,"assets/sprites/white-pawn.svg");
renderBitboard(bitBoards.black.pawns,"assets/sprites/black-pawn.svg");

renderBitboard(bitBoards.white.rooks,"assets/sprites/white-rook.svg");
renderBitboard(bitBoards.black.rooks,"assets/sprites/black-rook.svg");

renderBitboard(bitBoards.white.knights,"assets/sprites/white-knight.svg");
renderBitboard(bitBoards.black.knights,"assets/sprites/black-knight.svg");

renderBitboard(bitBoards.white.bishops,"assets/sprites/white-bishop.svg");
renderBitboard(bitBoards.black.bishops,"assets/sprites/black-bishop.svg");

renderBitboard(bitBoards.white.queen,"assets/sprites/white-queen.svg");
renderBitboard(bitBoards.black.queen,"assets/sprites/black-queen.svg");

renderBitboard(bitBoards.white.king,"assets/sprites/white-king.svg");
renderBitboard(bitBoards.black.king,"assets/sprites/black-king.svg");


// Mouse movement

function onMouseDown(e){
	const target = e.target;

	if (target.classList.contains('chess-piece')){
		startDragging(target,e);
	}
}

function startDragging(piece,e){
	piece.style.position = 'fixed';
	piece.style.zIndex = 1000;

	const rect = piece.getBoundingClientRect();
	const offsetX = e.clientX - rect.left;
	const offsetY = e.clientY - rect.top;
	
	function onMouseMove(e){
		piece.style.left = (e.clientX - offsetX) + 'px';
		piece.style.top = (e.clientY - offsetY) + 'px';
	}
	
	console.log("Offsetx: ",offsetX, " OffsetY: ", offsetY);
	
	function onMouseUp(e){
		const tile = document.elementFromPoint(e.clientX,e.clientY);

		if (tile && tile.classList.contains('tile')){
			dropPiece(piece,tile);
		}

		document.removeEventListener("mousemove",onMouseMove);
		document.removeEventListener("mouseup",onMouseUp);
	}

	document.addEventListener('mousemove',onMouseMove);
	document.addEventListener('mouseup',onMouseUp);
}


function dropPiece(piece,tile){
	tile.appendChild(piece);
	piece.style.position = "relative"
	piece.style.left = ''; piece.style.top = '';
}

document.addEventListener("mousedown",onMouseDown);
