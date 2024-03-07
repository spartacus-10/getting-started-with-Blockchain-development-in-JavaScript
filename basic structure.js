const SHA256=require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();

    }
    calculateHash(){
        return SHA256(this.index +this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"13/02/2024","Genesisblock","0");
    }

    getLatestblock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getLatestblock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);

    }
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let Barbariancoin=new Blockchain();
Barbariancoin.addBlock(new Block(1,"23/02/2024",{amount: 4}));
Barbariancoin.addBlock(new Block(2,"24/02/2024",{amount: 38}));

console.log(JSON.stringify( Barbariancoin,null,4));//representing our blockchain

