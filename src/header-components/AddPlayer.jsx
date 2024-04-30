import React, { useState } from "react";
import { addPlayer } from "../API";  

//refreshHandler is param so it can be called
const AddPlayer = ({ refreshHandler }) => {
    const [formData, setFormData] = useState({
        playerName: '',
        playerBreed: '',
        playerStatus: '',
        imageUrl: '',
        playerTeam: ''
    });

    const [playerName, setPlayerName] = useState('');
    const [playerBreed, setPlayerBreed] = useState('');
    const [playerStatus, setPlayerStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');


    const handleSubmit = async (event) => {
       event.preventDefault();

        console.log('I am Form!')

        const newPlayerObj = {
            name: playerName,
            breed: playerBreed,
            status: playerStatus,
            imageUrl: imageUrl,
            teamId: Number(playerTeam)


        };

        try {
            const response = await addPlayer(newPlayerObj); 
            if(!response.ok) {
                throw new Error('Error: ${response.status}');
            }
    
            refreshHandler(); // refresh list
    
            // reset my form
            setPlayerName('');
            setPlayerBreed('');
            setPlayerStatus('');
            setImageUrl('');
            setPlayerTeam('');
    
            } catch (error) {
                console.error('Error Adding Player!', error)
            }
        
        }

    return (
        <div className="new-player-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="playerName">Player:</label>
                <input id="playerName" type="text" value={playerName} onChange={(event) => setPlayerName(event.target.value)}/>

                <label htmlFor="playerBreed">Breed:</label>
                <input id="playerBreed" type="text" value={playerBreed} onChange={(event) => setPlayerBreed(event.target.value)}/>

                <label htmlFor="playerStatus">Status:</label>
                <input id="playerStatus" type="text" value={playerStatus} onChange={(event) => setPlayerStatus(event.target.value)}/>

                <label htmlFor="imageUrl">Photo:</label>
                <input id="imageUrl" type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>

                <label htmlFor="playerTeam">Team:</label>
                <input id="playerTeam" type="text" value={playerTeam} onChange={(event) => setPlayerTeam(event.target.value)}/>
                <button className="addPlayerButton" type="submit">Add Player</button>
            </form>
        </div>
    );
}

export default AddPlayer;
