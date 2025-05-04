const board = document.querySelector('#board');

for (let row = 0; row < 8; row++){
	for (let col = 0; col < 8; col++){
		const tile = document.createElement('div');
		const isDark = (row+col) % 2 == 1;
		tile.style.backgroundColor = isDark ? '#769656' : '#eeeed2';
		board.appendChild(tile);
	}
}
