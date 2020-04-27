const React = require("react");
let blockies = require("blockies-identicon");
let host = "https://institutmyloan.fr/Blockchain/";

async function loadMyMemes() {
  let link = host + "memesOf.php?addrSender=" + this.state.account;
  const res = await fetch(link);
  const mymemes = await res.json();
  console.log("Mymemes link ", link);
  const items = [];
  if (mymemes.length === 0) {
    this.setState({ htmlMyMemesCode: <h2>You have no memes uploaded</h2> });
    this.setState({ hasMore2: false });
  } else {
    var icon = blockies.create({
      seed: "0",
    });
    icon = blockies.create({
      seed: this.state.account,
    });

    for (const meme of mymemes) {
      const link = meme.memeLink;
      const dateUpload = meme.dateUpload;

      items.push(
        <div className="wrapperpost">
          <div>
            <img className="identicon" src={icon.toDataURL()} alt="identicon"/>
          </div>
          <span className="owner-name">{this.state.account}</span>
          <span className="upload-time">{dateUpload}</span>
          <img
            src={"https://ipfs.infura.io/ipfs/" + link}
            className="post-image"
            alt="meme"
          />
        </div>
      );
      items.push(<br></br>);
      items.push(<br></br>);
      items.push(<br></br>);
    }
    this.setState({
      htmlMyMemesCode: this.state.htmlMyMemesCode.concat(items),
    });
  }
}

module.exports.loadMyMemes = loadMyMemes;
