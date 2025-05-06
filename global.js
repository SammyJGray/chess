const board = document.querySelector('#board');

for (let row = 0; row < 8; row++){
	for (let col = 0; col < 8; col++){
		const tile = document.createElement('div');
		const isDark = (row+col) % 2 == 1;
		tile.style.backgroundColor = isDark ? '#769656' : '#eeeed2';
		tile.dataset.row = row; tile.dataset.col = col;
		board.appendChild(tile);
	}
}

function getTile(row,col){
	return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

const tile = getTile(1,4);
const piece = document.createElement('img');
piece.src = 'assets/sprites/black-queen.svg';
tile.appendChild(piece);

