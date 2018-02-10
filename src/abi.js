export const abiArray = [{
  "constant": false,
  "inputs": [{"name": "namespace", "type": "string"}, {"name": "key", "type": "bytes32"}, {
    "name": "player",
    "type": "string"
  }],
  "name": "voteAgainst",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "player", "type": "string"}],
  "name": "getPositive",
  "outputs": [{"name": "reputation", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "namespace", "type": "string"}, {"name": "key", "type": "bytes32"}],
  "name": "allow",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "player", "type": "string"}],
  "name": "getNegative",
  "outputs": [{"name": "reputation", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "namespace", "type": "string"}, {"name": "key", "type": "bytes32"}, {
    "name": "player",
    "type": "string"
  }],
  "name": "vote",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "namespace", "type": "string"}],
  "name": "createNamespace",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "namespace", "type": "string"}, {"name": "key", "type": "bytes32"}],
  "name": "getPendingVotes",
  "outputs": [{"name": "pendingVotes", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "name": "key", "type": "bytes32"}, {
    "indexed": false,
    "name": "player",
    "type": "string"
  }, {"indexed": false, "name": "namespace", "type": "string"}],
  "name": "Vote",
  "type": "event"
}];