let host = "https://institutmyloan.fr/Blockchain/";

async function getLikes() {
  let link = host + "result.php?addrSender=" + this.state.account;
  const res = await fetch(link);
  const data = await res.json();
  var liked_array = [];
  data.forEach(function (item) {
    liked_array.push(item.Meme_id);
  });
  return liked_array;
}

module.exports.getLikes = getLikes;
