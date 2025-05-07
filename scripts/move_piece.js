export function onPointerDown(e){
	const target = e.target;

	if (target.classList.contains('chess-piece')){
		startDragging(target,e);
	}
}

function startDragging(piece,e){
	const originalTile = piece.parentElement;

	const rect = piece.getBoundingClientRect();

	piece.style.width = rect.width + 'px';
	piece.style.height = rect.height + 'px';

	piece.style.position = 'fixed';
	piece.style.zIndex = 1000;
	
	const offsetX = e.clientX - rect.left;
	const offsetY = e.clientY - rect.top;
	
	function onPointerMove(e){
		e.preventDefault();
		piece.style.left = (e.clientX - offsetX) + 'px';
		piece.style.top = (e.clientY - offsetY) + 'px';
	}
		
	function onPointerUp(e){
		piece.style.display = 'none';
		const tile = document.elementFromPoint(e.clientX,e.clientY);
		piece.style.display = '';

		if (tile && tile.classList.contains('tile')){
			dropPiece(piece,tile);
		}
		else {
			dropPiece(piece,originalTile);
		}

		document.removeEventListener("pointermove",onPointerMove);
		document.removeEventListener("pointerup",onPointerUp);
	}

	document.addEventListener('pointermove',onPointerMove,{passive:false});
	document.addEventListener('pointerup',onPointerUp);
}


function dropPiece(piece,tile){
	tile.appendChild(piece);
	console.log("dropped");
	piece.style.position = "relative"
	piece.style.left = ''; piece.style.top = ''; piece.style.width = ''; piece.style.height = '';
}
