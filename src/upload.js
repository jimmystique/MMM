var $ = require("jquery");
const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const axios = require("axios").default;
const host = "https://institutmyloan.fr/Blockchain/";
const qs = require("qs");
const React = require("react");

async function addMeme(_hash) {
  let url_request = host + "uploadMeme.php";
  const data = {
    memeLink: _hash,
    ownerAddress: this.state.account,
  };

  axios
    .post(url_request, qs.stringify(data), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => {
      this.setState({ message: "Your meme has been uploaded !" });
      $(".message-success").addClass("active");
      $(".wrapperbt").removeClass("loading");
    })
    .catch((error) => {
      if (error.response.status === 406) {
        this.setState({ message: "This meme has already been uploaded ... " });
        $(".message-error").addClass("active");
        $(".wrapperbt").removeClass("loading");
      }
    });
}

function captureFile(event) {
  console.log("TRYING TO CAPTURE ");
  event.preventDefault();
  const file = event.target.files[0];
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) });
  };
}

async function uploadFile(event) {
  event.preventDefault();
  $(".wrapperbt").addClass("loading");
  ipfs.add(this.state.buffer, async (error, result) => {
    console.log("Ipfs result", result);
    if (error) {
      console.error(error);
      this.setState({ message: "Something wrong is happening ..." });
      setTimeout(function () {
        $(".wrapperbt").removeClass("loading");
      }, 1000);
      $(".message-error").addClass("active");
      return;
    }
    this.addMeme(result[0].hash);
  });
}

function Upload() {
  return (
    <form onSubmit={uploadFile.bind(this)}>
      <div className="wrapper">
        <div className="file-upload">
          <input type="file" onChange={captureFile.bind(this)} />
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>

      <div className="wrapperbt">
        <input type="submit" value="Upload" />
      </div>
    </form>
  );
}

module.exports.captureFile = captureFile;
module.exports.uploadFile = uploadFile;
module.exports.addMeme = addMeme;
module.exports.Upload = Upload;
