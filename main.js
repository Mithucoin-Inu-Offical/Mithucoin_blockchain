'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
  'bb9600e5c8775e6a8e7b4e4fe8412aa4416a6f58516abd7b98a239e0a9dd316e'
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const Mithucoin_Testnet = new Blockchain();

// Mine first block
Mithucoin_Testnet.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.sign(myKey);
Mithucoin_Testnet.addTransaction(tx1);

// Mine block
Mithucoin_Testnet.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.sign(myKey);
Mithucoin_Testnet.addTransaction(tx2);

// Mine block
Mithucoin_Testnet.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of xavier is ${Mithucoin_Testnet.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// Mithucoin_Testnet.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', Mithucoin_Testnet.isChainValid() ? 'Yes' : 'No');