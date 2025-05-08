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
}

const bitboardInstance = new Bitboard();
Object.freeze(bitboardInstance);
export default bitboardInstance;
