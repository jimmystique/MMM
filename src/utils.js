const Tx = require("ethereumjs-tx").Transaction;
var txDecoder = require("ethereum-tx-decoder");
const EthUtil = require("ethereumjs-util");

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getTransactionInfo(id_tx) {
  var decodedTx = txDecoder.decodeTx(id_tx);
  const tx = new Tx(id_tx);
  const eth_amount = this.state.web3.utils
    .toBN(decodedTx.value._hex)
    .toString();
  const sender = EthUtil.bufferToHex(tx.getSenderAddress());
  const data = tx.data;
  console.log(decodedTx);
  console.log("Sender : ", sender);
  console.log("ETHER AMOUNT : ", eth_amount);
  return [sender, eth_amount, data];
}

module.exports.shuffleArray = shuffleArray;
module.exports.getTransactionInfo = getTransactionInfo;
