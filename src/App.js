import React, { Component } from 'react';
import faker from 'faker';
import FinishedCard from './FinishedCard';
import HowToPlayButton from './HowToPlayButton';
import InfoContainer from './InfoContainer';
import './App.css';

const NB_WORDS = 10; // number of words which will be generated
const SAFE_LENGTH_SCORE = 5; // how many numbers will be save after the coma for score
const GAMESTATE = {
  NOT_STARTED: 0,
  PLAYING: 1,
  FINISHED: 2,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoDisplayed: false,
      words: '',
      leftPadding: Array(80).fill(' ').join(''),
      outgoingChars: '',
      currentChar: '',
      incomingChars: '',
      state: GAMESTATE.NOT_STARTED,
      timer: 1,
      intervalID: 0,
      score: {
        keysClicked: 0,
        goodKeys: 0,
        kps: 0,
        acc: 0,
      }
    };
  }

  initialiseGame() {
    // generating words
    const words = Array(NB_WORDS).fill().map(word => faker.random.word()).join(' ');

    // starting timer for kps
    const intervalID = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        score: {
          ...prevState.score,
          kps: (prevState.score.keysClicked / this.state.timer).toFixed(SAFE_LENGTH_SCORE),
        }
      }))
    }, 1 * 1000);

    // initial state
    this.setState({
      words,
      leftPadding: Array(80).fill(' ').join(''),
      outgoingChars: '',
      currentChar: words.charAt(0),
      incomingChars: words.substr(1),
      state: GAMESTATE.NOT_STARTED,
      timer: 1,
      intervalID,
      score: {
        keysClicked: 0,
        goodKeys: 0,
        kps: 0,
        acc: 0,
      }
    });
  }

  componentDidMount() {
    this.initialiseGame();

    document.onkeydown = this.handleKeyDown.bind(this);

    // true if user is on mobile
    this.isMobile =
      navigator.userAgent.indexOf( "Mobile" ) !== -1 || 
      navigator.userAgent.indexOf( "iPhone" ) !== -1 || 
      navigator.userAgent.indexOf( "Android" ) !== -1 || 
      navigator.userAgent.indexOf( "Windows Phone" ) !== -1;
  }
  componentWillUnmount = () => clearInterval(this.state.intervalID);

  handleKeyDown = e => {
    // handling keydown
    const { currentChar, state } = this.state;
    const keyPressed = e.key;


    // for any keydown, +1 key clicked
    if (keyPressed !== 'Shift' && state !== GAMESTATE.FINISHED)
    this.setState(prevState => ({
      score: {
        ...prevState.score,
        keysClicked: prevState.score.keysClicked + 1,
        acc: ((this.state.score.goodKeys + 1) / (this.state.score.keysClicked + 1) * 100).toFixed(SAFE_LENGTH_SCORE),
      }}));


      // if good caracter
      if (keyPressed === currentChar)
      this.setState(prevState => {
        return {
          leftPadding: prevState.leftPadding.slice(-1),
          outgoingChars: `${prevState.outgoingChars}${currentChar}`,
          currentChar: prevState.incomingChars.charAt(0),
          incomingChars: prevState.incomingChars.substr(1),
          state: (prevState.incomingChars.length !== 0) ? GAMESTATE.PLAYING : GAMESTATE.FINISHED,
          score: {
            ...prevState.score,
            goodKeys: prevState.score.goodKeys + 1,
          },
        }
      }, () => {
        // last caracter has been typed
        if (this.state.state === GAMESTATE.FINISHED) clearInterval(this.state.intervalID);
      });
    };

  toggleInfo = () => this.setState({infoDisplayed: !this.state.infoDisplayed});

  render() {
    const { leftPadding, outgoingChars, currentChar, incomingChars, state, score, infoDisplayed } = this.state;

    return (
      <div
      className="container">
        { (infoDisplayed) ?
          <InfoContainer toggleInfo={this.toggleInfo} /> : null }

        { (state === GAMESTATE.NOT_STARTED) ?
          <HowToPlayButton
          infoDisplayed={infoDisplayed}
          toggleInfo={this.toggleInfo} /> : null }

        { (state !== GAMESTATE.FINISHED) ?
        <div>
          <div>
            <div className="score-out-container">
              { (state === GAMESTATE.NOT_STARTED) ?
                <h1 className="title lightEffect">
                  <img
                  src="./pen.svg"
                  alt="Pen" />&nbsp;
                  Prêt ?
                </h1> :
                <h1 className="title">Écrivez !</h1>}
              { (state !== GAMESTATE.NOT_STARTED) ?
              <div className="score-container">
                <p>KPS: { parseFloat(score.kps).toFixed(2) }</p>
                <p>ACC: { parseFloat(score.acc).toFixed(1) } %</p>
              </div> : null }
            </div>

            <div>
              <p className="wordList">
                <span className="outChars">
                  {(leftPadding + outgoingChars).slice(-20)}
                </span>
                <span className="currentChar">
                  {currentChar}
                </span>
                <span className="incomingChars">
                  {incomingChars.substr(0, 20)}
                </span>
              </p>
            </div>

            { (state === GAMESTATE.NOT_STARTED && this.isMobile) ? 
              <div className="openKeyBoardContainer">
                <button onClick={() => {}}>Ouvrir le clavier</button>
              </div> : null }
          </div>
        </div>

        : <FinishedCard
        score={{kps: parseFloat(score.kps).toFixed(4), acc: parseFloat(score.acc).toFixed(2)}}
        onReplay={this.initialiseGame.bind(this)} /> }
      </div>
    );
  }
}

export default App;
