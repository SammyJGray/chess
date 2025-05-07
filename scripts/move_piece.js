export function onMouseDown(e){
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
	
	function onMouseMove(e){
		piece.style.left = (e.clientX - offsetX) + 'px';
		piece.style.top = (e.clientY - offsetY) + 'px';
	}
		
	function onMouseUp(e){
		piece.style.display = 'none';
		const tile = document.elementFromPoint(e.clientX,e.clientY);
		piece.style.display = '';

		if (tile && tile.classList.contains('tile')){
			dropPiece(piece,tile);
		}
		else {
			dropPiece(piece,originalTile);
		}

		document.removeEventListener("mousemove",onMouseMove);
		document.removeEventListener("mouseup",onMouseUp);
	}

	document.addEventListener('mousemove',onMouseMove);
	document.addEventListener('mouseup',onMouseUp);
}


function dropPiece(piece,tile){
	tile.appendChild(piece);
	console.log("dropped");
	piece.style.position = "relative"
	piece.style.left = ''; piece.style.top = ''; piece.style.width = ''; piece.style.height = '';
}
