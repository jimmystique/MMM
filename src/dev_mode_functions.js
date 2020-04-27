const Tx = require("ethereumjs-tx").Transaction;
const bip39 = require("bip39");
const hdkey = require("ethereumjs-wallet/hdkey");
const React = require("react");

async function loadButtonsETHUpdate() {
  if (this.state.account === "0x340d10f3a238eaf78566017db25C5237F6664893") {
    let styles = {
      margin: "20px",
      width: "200px",
      height: "50px",
      backgroundColor: "#cbe6ef",
      fontSize: 14,
    };
    const items = [];
    items.push(
      <h2 style={{ color: "#44a6c6" }}>LOGGED WITH BRIDGE ACCOUNT</h2>
    );
    items.push(<h3 style={{ color: "#44a6c6" }}>DEV TOOLS : </h3>);
    items.push(
      <button style={styles} onClick={this.sendETHToContract.bind(this)}>
        Send 5 ETH to contract
      </button>
    );
    items.push(
      <button style={styles} onClick={this.updateBestMemes.bind(this)}>
        Update Best Memes
      </button>
    );
    items.push(
      <button style={styles} onClick={this.printPoolAmount.bind(this)}>
        Get Pool Money
      </button>
    );
    items.push(
      <button style={styles} onClick={this.sendrewards.bind(this)}>
        Send Rewards
      </button>
    );
    items.push(<br></br>);
    items.push(<br></br>);
    items.push(<br></br>);
    this.setState({ buttons_eth_update: items });
  }
}

async function sendETHToContract() {
  const nonce = await this.state.web3.eth.getTransactionCount(
    this.state.account,
    "pending"
  );
  const txETH = {
    nonce: nonce,
    gasLimit: 210000,
    to: this.state.contract_address,
    gasPrice: this.state.web3.utils.toHex(8 * (1e9).toString()),
    from: this.state.account,
    value: this.state.web3.utils.toHex(
      this.state.web3.utils.toWei("5", "ether")
    ),
    data: this.state.contract.methods.storeETH().encodeABI(),
  };
  await this.state.web3.eth.sendTransaction(txETH);
}

async function updateBestMemes() {
  alert("Loading best memes in progress, they will be available in a few seconds ...");
  const seed = await bip39.mnemonicToSeed(
    "vacuum market liberty mention source kiss behind chimney network glare forward visit"
  ); // mnemonic is the string containing the words
  const hdk = await hdkey.fromMasterSeed(seed);
  const addr_node = await hdk.derivePath("m/44'/60'/0'/0/1"); //m/44'/60'/0'/0/0 is derivation path for the first account. m/44'/60'/0'/0/1 is the derivation path for the second account and so on
  this.setState({ wallet: addr_node.getWallet() });
  console.log(
    "PRIVATE KEY : ",
    this.state.web3.utils.toHex(this.state.wallet.getPrivateKey())
  );
  const sk = "11b2bff1746e0972f258a683290180d71407e4ba8d925af70ba0931c0ff26c0a";
  console.log("MY SK : ", sk);
  const time = [31];
  for (const t of time) {
    const nonce2 = await this.state.web3.eth.getTransactionCount(
      this.state.account,
      "pending"
    );
    const oracleTX = {
      nonce: nonce2,
      gasLimit: 2100000,
      to: this.state.contract_address,
      gasPrice: this.state.web3.utils.toHex(8 * (1e9).toString()),
      from: this.state.account,
      data: this.state.contract.methods.updateMemes(t).encodeABI(),
    };
    var tx = new Tx(oracleTX);
    await tx.sign(new Buffer.from(sk, "hex"));
    console.log("SIGNED TX : ", tx);
    var serializedTx = await tx.serialize();
    const id_tx = "0x" + serializedTx.toString("hex");
    await this.state.web3.eth
      .sendSignedTransaction(id_tx)
      .on("receipt", console.log);
  }
}

async function printMyInvestments() {
  const my_investments = await this.state.contract.methods
    .getMyInvestments(this.state.account)
    .call();
  console.log("My investments : ", my_investments);
}

async function printPoolAmount() {
  const pool_amount = await this.state.contract.methods.getPoolAmount().call();
  const pool_amount_in_eth = pool_amount/1e18
  console.log("Pool Amount : ", pool_amount);
  // alert("Money Pool balance: " + String(pool_amount) + " WEI "+" ("+String(pool_amount_in_eth) +" ETH)");
  alert("Money Pool balance: " + pool_amount + " WEI = " + pool_amount_in_eth + " ETH");
}

// async function sendrewards() {
//   alert("Sending rewards ...");
// 
//   const nonce = await this.state.web3.eth.getTransactionCount(
//     this.state.account,
//     "pending"
//   );
//   const txETH = {
//     nonce: nonce,
//     gasLimit: 210000,
//     to: this.state.contract_address,
//     gasPrice: this.state.web3.utils.toHex(8 * (1e9).toString()),
//     from: this.state.account,
//     data: this.state.contract.methods.sendrewards().encodeABI(),
//   };
//   await this.state.web3.eth.sendTransaction(txETH);
// }

async function sendrewards() {
  alert("Sending rewards ...");

  await this.state.contract.methods.sendrewards().send({from: this.state.account})
}

module.exports.loadButtonsETHUpdate = loadButtonsETHUpdate;
module.exports.sendETHToContract = sendETHToContract;
module.exports.printMyInvestments = printMyInvestments;
module.exports.updateBestMemes = updateBestMemes;
module.exports.printPoolAmount = printPoolAmount;
module.exports.sendrewards = sendrewards;
