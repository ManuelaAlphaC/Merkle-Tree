// 1. Import libreries. Use 'npm' package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheet oe Excel)
let whitelistAddresses = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
];

// 3. Create a new array of 'leafNodes' by hashing all indexes of the 'whitelistAddresses'
// using 'keccak256'. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

// 4. Get root hash of the 'merkleTree' in hexadecimal format (0x)
// Print out the Entire Merkle Tree
const rootHash = merkleTree.getRoot();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);




// CLIENT-SIDE: Use 'msg.sender' address to query and API thet returns the merkle proof
// required to derive the root hash of the Merkle Tree

//const claminingAddress = leafNodes[0];
const claminingAddress = "0x6B38Da6a701c568545dCfcB03FcB875f56beddC4";

// 'getHexProof' returns the neighbour leaf and all parent nodes hashes that will
// be required ti derive the Merkle Trees root hash.

const hexProof = merkleTree.getHexProof(claminingAddress);
console.log(hexProof);

// Verification

console.log(merkleTree.verify(hexProof, claminingAddress, rootHash));