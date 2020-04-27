var $ = require("jquery");

var select = function (s) {
  return document.querySelector(s);
};

async function investAction(event) {
  event.preventDefault();
  const link = event.target.value;
  console.log(link);
  const amount_in_eth = document.getElementById("amount" + link).value;
  const amount_in_wei = amount_in_eth * 1e18;
  console.log("INVESTISSEMNT SUR", link, "AU PRIX DE ", amount_in_eth);
  const nonce = await this.state.web3.eth.getTransactionCount(
    this.state.account,
    "pending"
  );
  console.log("link invest : ", link);
  var investTx = {
    nonce: nonce,
    gasLimit: this.state.web3.utils.toHex(5100000),
    to: this.state.contract_address,
    value: this.state.web3.utils.toHex(amount_in_wei),
    from: this.state.account,
    data: this.state.contract.methods
      .invest(link, amount_in_wei.toString())
      .encodeABI(),
  };
  await this.state.web3.eth.sendTransaction(investTx, function (err, res) {
    var popup = select(".popup"),
      cont = select(".container");
    popup.classList.remove("visible");
    cont.style.filter = "none";
    var input = document.getElementsByName("amount");
    input[0].id = "amount";
    var bt = document.querySelector(".buttoninvest2");
    bt.value = "invest";
    if (err) {
      $(".message-error").addClass("active");
    } else {
      $(".message-success").addClass("active");
    }
  });
}

module.exports.investAction = investAction;
