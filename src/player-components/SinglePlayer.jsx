import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { fetchSinglePlayer } from "../API";

const SinglePlayer = () => {
    const [player, setPlayer] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { playerId } = useParams(); // DESTRUCTURE PARAMS
    const navigate = useNavigate();

    useEffect(() => {
      
        const getPlayerByID = async () => {
            try {
                setIsLoading(true);
                const player = await fetchSinglePlayer(playerId); //Putting PARAM (PARAMETER) IN FUNC
                console.log(`Data for player ${playerId}:`, player); 
                if (!player) throw new Error(`No data returned for player ${playerId}`)
                setPlayer(player);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch player details:", error);
                setError('Failed to load player details.');
                setIsLoading(false);
            }
        };

        getPlayerByID(); // Call the above function within useEffect --> learned in class...need to research this further, to see why it works
    }, [playerId]); // useEffect re-runs when playerId changes

    // Got from forms tutorial
    if (isLoading) return <h3>Loading...</h3>;
    if (error) return <h3>Error: {error}</h3>;
    if (!player) return <h3>404: Player Not Found!</h3>;

    return (
        <div className="single-player-view">
            <button onClick={() => navigate('/')}>Back</button>
            <h3>{player.name} <span id='player-id'>{`#${player.id}`} </span></h3>
            <img src={player.imageUrl} alt={player.name} />
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <p>team: {player.teamId}</p>
           
        </div>
    );
};

export default SinglePlayer;

