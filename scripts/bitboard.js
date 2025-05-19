class Bitboard {
	constructor(){	
		this.pieces = {
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
	}

	getAllPieces(){
		let allPieces = 0n;
		for (const color in this.pieces){
			for (const piece in this.pieces[color]){
				allPieces |= this.pieces[color][piece];
			}
		}
		return allPieces;
	}

	getWhitePieces(){
		let whitePieces = 0n;
		for (const piece in this.pieces["white"]){
			whitePieces |= this.pieces["white"][piece];
		}
		return whitePieces;
	}

	getBlackPieces(){
		let blackPieces = 0n;
		for (const piece in this.pieces["black"]){
			blackPieces |= this.pieces["black"][piece];
		}
		return blackPieces;
	}

	removePiece(pos,color,piece){
		const mask = 1n << pos;
		this.pieces[color][piece] &= ~mask;
	}

	addPiece(pos,color,piece){
		const mask = 1n << pos;
		this.pieces[color][piece] |= mask;
	}

	movePiece(from,to,color,piece){
		const fromMask = 1n << from;
		const toMask = 1n << to;

		this.pieces[color][piece] &= ~fromMask;
		this.pieces[color][piece] |= toMask;
	}

	isOccupied(pos){
		const mask = 1n << pos;
		return (this.getAllPieces() & mask) != 0n;
	}

	isOut(pos){
		return (pos < 0n || pos >= 64n);
	}

	getPawnMoves(pos,color){
		let moves = 0n;
		let bitPos = 1n << pos;

		let shift = color === 'white' ? 8n : -8n;

		//Forward
		if (!this.isOccupied(pos+shift)) moves |= bitPos << shift;
		
		return moves;
	}

	getKnightMoves(pos){
		let moves = 0n;
		let bitPos = 1n << pos;


		let moveList = [15n,17n,6n,10n,-17n,-15n,-10n,-6n];

		moveList.forEach(shift=>{
			if (this.isOut(pos+shift)) return;

			const diff = pos%8n - (pos+shift)%8n;
			const absDiff = diff < 0n ? -diff : diff;
			if (absDiff > 2n) return;

			if (this.isOccupied(pos+shift)) return;
			moves |= bitPos << shift;
		})
		return moves;
	}

	getRookMoves(pos){
		let moves = 0n;
		let bitPos = 1n << pos;

		// Left
		let left = pos % 8n;
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos-i)) break;			
			moves |= bitPos >> i;
		}

		// Right
		let right = 7n - left;
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos+i)) break;			
			moves |= bitPos << i;
		}

		// Up
		let up = pos / 8n;
		for (let i = 1n; i <= up; i++){
			if (this.isOccupied(pos-(i*8n))) break;			
			moves |= bitPos >> (i*8n);
		}

		// Down
		let down = 7n - up;
		for (let i = 1n; i <= down; i++){
			if (this.isOccupied(pos+(i*8n))) break;			
			moves |= bitPos << (i*8n);
		}
		return moves;
	}

	getBishopMoves(pos){
		let moves = 0n;
		let bitPos = 1n << pos;

		let left = pos % 8n;
		
		// Left Down
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos+7n*i)) break;
			moves |= bitPos << 7n*i;
		}

		// Left Up
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos-9n*i)) break;
			moves |= bitPos >> 9n*i;
		}

		let right = 7n - left;
		
		// Right Up
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos+9n*i)) break;
			moves |= bitPos << 9n*i;
		}

		// Right Down
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos-7n*i)) break;
			moves |= bitPos >> 7n*i;
		}

		return moves;
	}

	getQueenMoves(pos){
		let moves = 0n;
		let bitPos = 1n << pos;

		let left = pos % 8n;
		
		// Left
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos-i)) break;			
			moves |= bitPos >> i;
		}

		// Left Down
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos+7n*i)) break;
			moves |= bitPos << 7n*i;
		}

		// Left Up
		for (let i = 1n; i <= left; i++){
			if (this.isOccupied(pos-9n*i)) break;
			moves |= bitPos >> 9n*i;
		}

		let right = 7n - left;
		
		// Right
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos+i)) break;			
			moves |= bitPos << i;
		}

		// Right Down
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos+9n*i)) break;
			moves |= bitPos << 9n*i;
		}

		// Right Up
		for (let i = 1n; i <= right; i++){
			if (this.isOccupied(pos-7n*i)) break;
			moves |= bitPos >> 7n*i;
		}

		let up = pos / 8n;
		
		// Up
		for (let i = 1n; i <= up; i++){
			if (this.isOccupied(pos-(i*8n))) break;			
			moves |= bitPos >> (i*8n);
		}

		let down = 7n - up;
		
		// Down
		for (let i = 1n; i <= down; i++){
			if (this.isOccupied(pos+(i*8n))) break;			
			moves |= bitPos << (i*8n);
		}
		return moves;
	}

	getKingMoves(pos){
		let moves = 0n;
		let bitPos = 1n << pos;


		let moveList = [1n,7n,8n,9n,-1n,-7n,-8n,-9n];

		moveList.forEach(shift=>{
			if (this.isOut(pos+shift)) return;

			const diff = pos%8n - (pos+shift)%8n;
			const absDiff = diff < 0n ? -diff : diff;
			if (absDiff > 1n) return;

			if (this.isOccupied(pos+shift)) return;
			moves |= bitPos << shift;
		})
		return moves;
	}

	getMoves(pos,piece,color){
		let moves = 0n;

		if (piece === "pawn"){
			moves = this.getPawnMoves(pos,color);
		}

		else if (piece === "rook"){
			moves = this.getRookMoves(pos);
		}

		else if (piece === "knight"){
			moves = this.getKnightMoves(pos);
		}

		else if (piece === "bishop"){
			moves = this.getBishopMoves(pos);
		}

		else if (piece === "queen"){
			moves = this.getQueenMoves(pos);
		}

		else if (piece === "king"){
			moves = this.getKingMoves(pos);
		}
		return moves;
	}
}

const bitboardInstance = new Bitboard();
Object.freeze(bitboardInstance);
export default bitboardInstance;
