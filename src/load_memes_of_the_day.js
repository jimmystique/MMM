const React = require("react");
let blockies = require("blockies-identicon");

async function loadMemesOfTheDay() {
  const motd = await this.state.contract.methods.getLinksAndOwnersMOTD().call();
  const items = [];
  var icons = [];
  var icon = blockies.create({ seed: "0" });
  if (motd.length === 0){
    this.setState({ htmlMemesOfTheDayCode: <h2> There are no memes to gamble on :( </h2> });
    return;
  }
  for (var i = 0; i < motd.length / 2; i++) {
    const link = motd[2 * i];
    const owner = motd[2 * i + 1];
    if (icons[owner] === undefined) {
      icon = blockies.create({ seed: owner });
      icons[owner] = icon;
    } else {
      icon = icons[owner];
    }
    items.push(
      <div className="wrapperpost">
        <button
          id={"buttoninvest" + link}
          className="buttoninvest"
          value={link}
          onClick={this.Popup}
        >
          Gamble
        </button>
        <div>
          <img className="identicon" src={icon.toDataURL()} alt="identicon"/>
        </div>
        <span className="owner-name">{owner}</span>
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
  }
  this.setState({ htmlMemesOfTheDayCode: items });
  function handleForm(event) {
    event.preventDefault();
  }
  var all_invest_forms = document.getElementsByClassName("invest_form");
  Array.from(all_invest_forms).forEach(function (el_form) {
    el_form.addEventListener("submit", handleForm);
  });
}

module.exports.loadMemesOfTheDay = loadMemesOfTheDay;
