var select = function (s) {
  return document.querySelector(s);
};

function Popup(event) {
  event.preventDefault();
  var link = ""
  if (event.target.value == null) {
    link = event.target.title;
  } else {
    link = event.target.value;
  }
  var input = document.getElementById("amount");
  var investimage = document.getElementById("invested-image");
  investimage.src = "https://ipfs.infura.io/ipfs/" + link;
  input.id = "amount" + link;
  var bt = document.getElementById("invest");
  bt.value = link;
  var popup = document.querySelector(".popup");
  var cont = document.querySelector(".container");
  cont.style.filter = "blur(10px)";
  popup.classList.add("visible");
}

function closePopup(event) {
  event.preventDefault();
  var popup = select(".popup"),
    cont = select(".container");
  popup.classList.remove("visible");
  cont.style.filter = "none";
  var input = document.getElementsByName("amount");
  input[0].id = "amount";
  var bt = document.querySelector(".buttoninvest2");
  bt.value = "invest";
}

module.exports.Popup = Popup;
module.exports.closePopup = closePopup;
