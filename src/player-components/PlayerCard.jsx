import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerCard = ({ player, onDelete, refreshHandler}) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/players/${player.id}`);
    };

    return (
        <div className="player-card">
            <h3>{player.name} <span id='player-id'>{`#${player.id}`} </span></h3>
            <img src={player.imageUrl} alt={player.name} />
            <div id="button-div" >
                <button className='details-button' onClick={handleDetailsClick}>See Details</button>
                <button className='delete-button' onClick={onDelete} >Remove From Roster</button>
            </div>
        </div>
    );
}

export default PlayerCard;
