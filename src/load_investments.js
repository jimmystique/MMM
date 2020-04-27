const React = require("react");
let blockies = require("blockies-identicon");

async function loadMyInvestments() {
  const invts = await this.state.contract.methods
    .getMyInvestments(this.state.account)
    .call();
  const items = [];
  if (invts.length === 0) {
    this.setState({ htmlMyInvestmentsCode: <h2>You have no Investments</h2> });
    this.setState({ hasMore3: false });
  } else {
    var icons = [];
    var icon = blockies.create({ seed: "0" });
    for (const inv of invts) {
      const amount_in_wei = inv[1];
      const amount_in_eth = amount_in_wei / 1e18;
      const link = inv[2];
      if (icons[inv[2]] === undefined) {
        icon = blockies.create({ seed: inv[2] });
        icons[inv[2]] = icon;
      } else {
        icon = icons[inv[2]];
      }
      items.push(
        <div className="wrapperpost">
          <div>
            <img className="identicon" src={icon.toDataURL()} alt="identicon"/>
          </div>
          <span className="owner-name">Amount : {amount_in_eth} ETH</span>
          <img
            src={"https://ipfs.infura.io/ipfs/" + link}
            title={link}
            className="post-image"
            onDoubleClick={this.Popup}
            alt="meme"
          />
        </div>
      );
      items.push(<br></br>);
      items.push(<br></br>);
      items.push(<br></br>);
      items.push(<br></br>);
    }
    this.setState({
      htmlMyInvestmentsCode: this.state.htmlMyInvestmentsCode.concat(items),
    });
  }
}

module.exports.loadMyInvestments = loadMyInvestments;
