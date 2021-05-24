import './HowToPlayButton.css';

const HowToPlayButton = (props) => {
	return (
		<button
          className="infoBtn"
          onClick={() => props.toggleInfo()}>
            { (!props.infoDisplayed) ?
              <img 
              src="./infoBtn.svg"
              alt="i" /> :
              <img
              src="./x-square.svg"
              alt="x" /> }
          </button>
    );
}

export default HowToPlayButton;