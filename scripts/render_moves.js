import {getTile} from "./helper.js";
import bitboard from "./bitboard.js";

function renderMoves(moves){
	for (let bit = 0n; bit < 64n; bit++){
		if ((moves >> bit) & 1n){
			
			let tile = getTile(bit);
			let circle = document.createElement('div');
	
			circle.classList.add("circle");
		
			tile.appendChild(circle);
		}
	}
}

export function onHover(e){
	const target = e.target;

	const circles = document.querySelectorAll(".circle");	
	circles.forEach(circle=>circle.remove());
	
	if (target.classList.contains("chess-piece")){
		const tile = target.parentElement;
		const pos = BigInt(tile.dataset.pos);
		let moves = bitboard.getMoves(pos,target.dataset.piece,target.dataset.color);
		renderMoves(moves);
	}
}
