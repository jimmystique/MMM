const React = require("react");
let blockies = require("blockies-identicon");
let host = "https://institutmyloan.fr/Blockchain/";

const axios = require("axios").default;
const qs = require("qs");

var $ = require("jquery");

async function likeOrUnlikeAction(event) {
  console.log("*****", this.state.account, "*****");
  event.preventDefault();
  var id = event.target.id;
  var buttonid = ""
  if (event.target.value == null) {
    buttonid = "#like-button" + event.target.title;
  } else {
    buttonid = "#like-button" + event.target.value;
  }

  $(document).ready(function () {
    $(buttonid).toggleClass("is-active");
  });

  var likeOrUnlike = id.replace(/[0-9]/g, "");
  var id_number = id.replace(/[a-zA-Z]/g, "");

  const data = {
    meme_id: parseInt(id_number),
    likerAddress: this.state.account,
  };
  if (likeOrUnlike === "like") {
    let url_request = host + "likes.php";
    axios
      .post(url_request, qs.stringify(data), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("Like request sent  ...");
      })
      .catch((error) => {
        console.error("Error ... ", error);
      });
    event.target.id = "unlike" + id_number;
  } else if (likeOrUnlike === "unlike") {
    let url_request = host + "unlikes.php";
    axios
      .post(url_request, qs.stringify(data), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("Unlike request sent  ...");
      })
      .catch((error) => {
        console.error("Error ... ", error);
      });
    event.target.id = "like" + id_number;
  }
}

async function loadMemes() {
  let link = host + "loadMemes.php";
  const res = await fetch(link);
  const memes_list = await res.json();
  let liked_array = await this.getLikes();
  const items = [];
  var icons = [];
  var icon = blockies.create({ seed: "0" });
  for (var i = 0; i < memes_list.length; i++) {
    const meme_id = memes_list[i].id_meme;
    const ownerAddress = memes_list[i].ownerAddress;
    const memeLink = "https://ipfs.infura.io/ipfs/" + memes_list[i].memeLink;
    const dateUpload = memes_list[i].dateUpload;
    const id = i + this.state.htmlMemesCode.length;
    if (icons[ownerAddress] === undefined) {
      icon = blockies.create({ seed: ownerAddress });
      icons[ownerAddress] = icon;
    } else {
      icon = icons[ownerAddress];
    }
    if (liked_array.includes(meme_id)) {
      items.push(
        <div className="wrapperpost">
          <div>
            <img className="identicon" src={icon.toDataURL()} alt="identicon"/>
          </div>
          <span className="owner-name">{ownerAddress}</span>
          <span className="upload-time">{dateUpload}</span>
          <img
            src={memeLink}
            id={"unlike" + meme_id}
            title={id}
            className="post-image"
            onDoubleClick={likeOrUnlikeAction.bind(this)}
            alt="unlike"
          />
          <input
            type="hidden"
            id={meme_id}
            name="custId"
            value={memeLink}
          ></input>
          <div className="wrapperlike">
            <i className="like-button is-active" id={"like-button" + id}>
              <button
                className="button-like"
                id={"unlike" + meme_id}
                value={id}
                onClick={likeOrUnlikeAction.bind(this)}
                alt="like"
              ></button>
              <i className="material-icons not-liked bouncy">favorite_border</i>
              <i className="material-icons is-liked bouncy">favorite</i>
              <span className="like-overlay"></span>
            </i>
          </div>
        </div>
      );
    } else {
      items.push(
        <div className="wrapperpost">
          <div>
            <img className="identicon" src={icon.toDataURL()} alt="identicon" />
          </div>
          <span className="owner-name">{ownerAddress}</span>
          <img
            src={memeLink}
            className="post-image"
            id={"like" + meme_id}
            title={id}
            onDoubleClick={likeOrUnlikeAction.bind(this)}
            alt="memelike"
          />
          <input
            type="hidden"
            id={meme_id}
            name="custId"
            value={memeLink}
          ></input>
          <div className="wrapperlike">
            <i className="like-button" id={"like-button" + id}>
              <button
                className="button-like"
                id={"like" + meme_id}
                value={id}
                onClick={likeOrUnlikeAction.bind(this)}
              ></button>
              <i className="material-icons not-liked bouncy">favorite_border</i>
              <i className="material-icons is-liked bouncy">favorite</i>
              <span className="like-overlay"></span>
            </i>
          </div>
        </div>
      );
    }
    items.push(<br></br>);
    items.push(<br></br>);
    items.push(<br></br>);
  }
  this.setState({ htmlMemesCode: this.state.htmlMemesCode.concat(items) });
}

module.exports.loadMemes = loadMemes;
