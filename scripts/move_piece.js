import bitboard from "./bitboard.js";

export function onDown(e){
	const target = e.target;
	e.preventDefault();
	if (target.classList.contains('chess-piece')){
		startDragging(target,e);
	}
}

function startDragging(piece,e){
	const originalTile = piece.parentElement;

	bitboard.removePiece(BigInt(originalTile.dataset.pos),piece.dataset.color,piece.dataset.piece)

	const rect = piece.getBoundingClientRect();

	piece.style.width = rect.width + 'px';
	piece.style.height = rect.height + 'px';

	piece.style.position = 'fixed';
	piece.style.zIndex = 1000;
	
	const offsetX = e.clientX - rect.left;
	const offsetY = e.clientY - rect.top;

	function onMove(e){
		e.preventDefault();

		piece.style.left = (e.clientX - offsetX) + 'px';
		piece.style.top = (e.clientY - offsetY) + 'px';
	}
		
	function onUp(e){
		piece.style.display = 'none';
		
		const tile = document.elementFromPoint(e.clientX,e.clientY);
		piece.style.display = '';
		
		if (tile && tile.classList.contains('tile') && !bitboard.isOccupied(BigInt(tile.dataset.pos))){
			dropPiece(piece,tile);
		}
		else {
			dropPiece(piece,originalTile);
		}

		document.removeEventListener("pointermove",onMove);
		document.removeEventListener("pointerup",onUp);
		
	}

	document.addEventListener("pointermove",onMove,{passive:false});
	document.addEventListener("pointerup",onUp);
}


function dropPiece(piece,tile){
	bitboard.addPiece(BigInt(tile.dataset.pos),piece.dataset.color,piece.dataset.piece)

	tile.appendChild(piece);
	
	piece.style.position = "relative"
	piece.style.left = ''; piece.style.top = ''; piece.style.width = ''; piece.style.height = ''; piece.style.zIndex = '';
}
