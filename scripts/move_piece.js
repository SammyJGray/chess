export function onDown(e){
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

	const isTouch = e.type.startsWith('touch');
	const clientX = isTouch ? e.touches[0].clientX : e.clientX;
	const clientY = isTouch ? e.touches[0].clientY : e.clientY;
	
	const offsetX = clientX - rect.left;
	const offsetY = clientY - rect.top;
	
	function onMove(e){
		e.preventDefault();

		const moveX = isTouch ? e.touches[0].clientX : e.clientX;
		const moveY = isTouch ? e.touches[0].clientY : e.clientY;

		piece.style.left = (moveX - offsetX) + 'px';
		piece.style.top = (moveY - offsetY) + 'px';
	}
		
	function onUp(e){
		piece.style.display = 'none';
		
		const finalX = isTouch ? e.touches[0].clientX : e.clientX;
		const finalY = isTouch ? e.touches[0].clientY : e.clientY;
		
		const tile = document.elementFromPoint(finalX,finalY);
		piece.style.display = '';

		if (tile && tile.classList.contains('tile')){
			dropPiece(piece,tile);
		}
		else {
			dropPiece(piece,originalTile);
		}

		if (isTouch){
			document.removeEventListener("touchmove",onMove);
			document.removeEventListener("touchup",onUp);
		}
		else {
			document.removeEventListener("pointermove",onMove);
			document.removeEventListener("pointerup",onUp);
		}
	}

	if (isTouch){
		document.addEventListener("touchmove",onMove,{passive:false});
		document.addEventListener("touchup",onUp);
	}
	else {
		document.addEventListener("pointermove",onMove,{passive:false});
		document.addEventListener("pointerup",onUp);
	}
}


function dropPiece(piece,tile){
	tile.appendChild(piece);
	console.log("dropped");
	piece.style.position = "relative"
	piece.style.left = ''; piece.style.top = ''; piece.style.width = ''; piece.style.height = '';
}
