var Web3 = require("web3");
var Meme = require("./build/contracts/Meme.json");

async function componentDidMount() {
  await this.loadWeb3();
  await this.loadBlockchainData();
  // await this.loadOffers()
}

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  }
  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert("Please use Metamask");
  }
}

async function loadBlockchainData() {
  const web3 = window.web3;
  this.setState({ web3: web3 });
  const accounts = await web3.eth.getAccounts();
  this.setState({ account: accounts[0] });
  const networkId = await web3.eth.net.getId();
  const networkData = Meme.networks[networkId];
  if (networkData) {
    this.loadContract(web3, networkData);
    this.loadMemesOfTheDay();
    this.loadMemes();
    this.loadMyMemes();
    this.loadButtonsETHUpdate();
    this.loadMyInvestments();
  } else {
    window.alert("Smart contract not deployed to detected network.");
  }
}

async function loadContract(web3, networkData) {
  const contract = new web3.eth.Contract(Meme.abi, networkData.address);
  this.setState({ contract });
  this.setState({ contract_address: networkData.address });
  console.log("CONTRACT : ", networkData.address);
  console.log(
    "SMART CONTRACT BALANCE : ",
    await contract.methods.getSmartContractBalance().call()
  );
}

module.exports.componentDidMount = componentDidMount;
module.exports.loadWeb3 = loadWeb3;
module.exports.loadBlockchainData = loadBlockchainData;
module.exports.loadContract = loadContract;
