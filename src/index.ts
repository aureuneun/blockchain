import * as CryptoJS from 'crypto-js';

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number,
  ): string =>
    CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, 'alksjdfkl', '', 'genesis', 12345);

const blockchain: Block[] = [genesisBlock];

const getBlockchaine = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => new Date().getTime();

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const previousHash: string = previousBlock.hash;

  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousHash,
    data,
    newTimestamp,
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousHash,
    data,
    newTimestamp,
  );
  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timestamp,
  );

const isBlockValid = (previousBlock: Block, candidateBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(getLatestBlock(), candidateBlock)) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('Second Block');
createNewBlock('Third Block');
createNewBlock('fourth Block');

console.log(getBlockchaine());
