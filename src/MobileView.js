import './MobileView.css';

const MobileView = () => (
	<div className="mobile-container">
		<img
		src="./mobile_error.svg"
		alt="Error" /><br/><br/>
		<h2>Oups..</h2><br/>
		<p>Le jeu n'est pas encore disponible sur smartphone :(<br/>
			Reviens sur PC en attendant !</p>
	</div>
);

export default MobileView;