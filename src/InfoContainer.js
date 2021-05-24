import './InfoContainer.css';

const InfoContainer = (props) => {
	return (
		<div
          className="info"
          onClick={() => props.toggleInfo()}>
            <div className="infoImg">
              <img
              src="./info.svg"
              alt="info" />
            </div>
            <p><b>Comment jouer ?</b><br/><br/>
            Avec ton clavier, tape les mots le plus vite possible.<br/>
            L'objectif est de réaliser le meilleur temps possible (kps) avec la meilleure précision.<br/>
            Entraîne-toi et deviens le meilleur mon khey</p>
            <br/>
            <em>Clique ici pour jouer</em>
        </div>
	);
}

export default InfoContainer;