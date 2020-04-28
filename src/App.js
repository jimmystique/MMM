import React, { Component } from "react";
import "./App.scss";
import "font-awesome/css/font-awesome.min.css";
import logo from "./Images/MMMlogo.png";
import { Switch, Route } from "react-router-dom";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  componentDidMount,
  loadWeb3,
  loadBlockchainData,
  loadContract,
} from "./loading_principal";
import { getLikes } from "./likes";
import {
  sendETHToContract,
  updateBestMemes,
  printMyInvestments,
  printPoolAmount,
  loadButtonsETHUpdate,
  sendrewards
} from "./dev_mode_functions.js";
import { loadMemes } from "./load_memes.js";
import { loadMyInvestments } from "./load_investments.js";
import { loadMemesOfTheDay } from "./load_memes_of_the_day.js";
import { loadMyMemes } from "./load_my_memes.js";
import { captureFile,  addMeme, Upload } from "./upload.js";
import { investAction } from "./invest.js";
import { Popup, closePopup } from "./popups.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadMemeHash: "",
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      memes: null,
      htmlMemesCode: [],
      htmlOffersCode: [],
      htmlMyMemesCode: [],
      htmlMyInvestmentsCode: [],
      contract_address: null,
      buttons_eth_update: null,
      hasMore: true,
      hasMore2: true,
      hasMore3: true,
      message: null,
      messagesuccess: "Investment Done !",
      messageerror: "An error occured !",
    };

    this.componentDidMount = componentDidMount;
    this.loadWeb3 = loadWeb3;
    this.loadBlockchainData = loadBlockchainData;
    this.getLikes = getLikes;
    this.sendETHToContract = sendETHToContract;
    this.updateBestMemes = updateBestMemes;
    this.printMyInvestments = printMyInvestments;
    this.printPoolAmount = printPoolAmount;
    this.loadContract = loadContract;
    this.loadButtonsETHUpdate = loadButtonsETHUpdate;
    this.loadMemes = loadMemes;
    this.loadMyInvestments = loadMyInvestments;
    this.loadMemesOfTheDay = loadMemesOfTheDay;
    this.loadMyMemes = loadMyMemes;
    this.captureFile = captureFile;
    this.addMeme = addMeme;
    this.Upload = Upload;
    this.investAction = investAction;
    this.Popup = Popup;
    this.closePopup = closePopup;
    this.sendrewards = sendrewards;
  }

  closeMessage = (event) => {
    event.preventDefault();
    $(".message-" + event.target.id).removeClass("active");
  };

  render_home() {
    return (
      <>
        <div className="App-subtitle">
          <h2>Home</h2>
        </div>
        <div className="message message-success">
          <div className="title">Well done</div>
          <div className="msg">{this.state.message}</div>
          <div className="close" id="success" onClick={this.closeMessage}>
            x
          </div>
        </div>
        <div className="message message-error">
          <div className="title">Something went wrong</div>
          <div className="msg">{this.state.message}</div>
          <div className="close" id="error" onClick={this.closeMessage}>
            x
          </div>
        </div>
        {this.state.buttons_eth_update}
        <div id="load_data" className="container">
          {this.Upload()}
          <div>
            <InfiniteScroll
              dataLength={this.state.htmlMemesCode.length}
              next={this.loadMemes.bind(this)}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<div></div>}
            >
              {this.state.htmlMemesCode}
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }

  render_myMemes() {
    return (
      <>
        <div className="App-subtitle">
          <h2>My Memes</h2>
        </div>
        <div id="load_data" className="container">
          {/* {this.Upload()} */}
          <div>
            <InfiniteScroll
              dataLength={this.state.htmlMyMemesCode.length}
              next={this.loadMyMemes.bind(this)}
              hasMore={this.state.hasMore2}
              loader={<h4>Loading...</h4>}
              endMessage={<div></div>}
            >
              {this.state.htmlMyMemesCode}
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }

  render_memesoftheday() {
    return (
      <>
        <div className="App-subtitle">
          <h2>Home</h2>
        </div>
        <div className="message message-success">
          <div className="title">Well done</div>
          <div className="msg">{this.state.messagesuccess}</div>
          <div className="close" id="success" onClick={this.closeMessage}>
            x
          </div>
        </div>

        <div className="message message-error">
          <div className="title">Something went wrong</div>
          <div className="msg">{this.state.messageerror}</div>
          <div className="close" id="error" onClick={this.closeMessage}>
            x
          </div>
        </div>

        <div className="App-subtitle">
          <h2>Memes Of The Day</h2>
        </div>
        <div className="popup">
          <div className="Imagediv">
            <img src="" id="invested-image" alt="investedimage"></img>
          </div>
          <h1>Gamble on</h1>
          <hr />
          <span id="close" onClick={this.closePopup}>
            <h2 id="closeb">x</h2>
          </span>
          <div className="investissement">
            <h2>ETH</h2>
            <input
              type="number"
              placeholder="Amount to bet in Ether "
              className="input-field"
              step="1e-5"
              min="1e-5"
              id="amount"
              name="amount"
            ></input>

            <button
              className="buttoninvest2"
              id="invest"
              name="invest"
              value="0"
              onClick={this.investAction.bind(this)}
            >
              {" "}
              Gamble{" "}
            </button>
          </div>
        </div>
        <div id="load_data" className="container">
          {this.state.htmlMemesOfTheDayCode}
        </div>
      </>
    );
  }

  render_myinvestments() {
    return (
      <>
        <div className="App-subtitle">
          <h2>My Bets</h2>
        </div>
        <div id="load_data" className="container">
          <InfiniteScroll
            dataLength={this.state.htmlMyInvestmentsCode.length}
            next={this.loadMyInvestments.bind(this)}
            hasMore={this.state.hasMore3}
            loader={<h4>Loading...</h4>}
            endMessage={<div></div>}
          >
            {this.state.htmlMyInvestmentsCode}
          </InfiniteScroll>
        </div>
      </>
    );
  }

  Navigation() {
    return (
      <>
        <div className="App-title">
          <img src={logo} className="MMMlogo" alt="MMMlogo" />
        </div>
        <div className="menu-wrap">
          <input type="checkbox" className="toggler"></input>
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu">
            <div>
              <div>
                <ul>
                  <li>
                    <a className="menu-item" href="/">
                      <span className="fa fa-home"></span> Home
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/memesoftheday">
                      <span className="fa fa-list-alt"></span> Memes of the day
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/mymemes">
                      <span className="fa fa-image"></span> My Memes
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/mybets">
                      <FontAwesomeIcon icon={faEthereum} /> My Bets
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  Main() {
    return (
      <Switch>
        <Route exact path="/">
          {this.render_home()}
        </Route>
        <Route exact path="/memesoftheday">
          {this.render_memesoftheday()}
        </Route>
        <Route exact path="/mybets">
          {this.render_myinvestments()}
        </Route>
        <Route exact path="/mymemes">
          {this.render_myMemes()}
        </Route>
      </Switch>
    );
  }

  render() {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <div>
          {this.Navigation()}
          {this.Main()}
        </div>
      </>
    );
  }
}

export default App;
