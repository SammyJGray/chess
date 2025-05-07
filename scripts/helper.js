export function getTile(row,col){
	return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}
