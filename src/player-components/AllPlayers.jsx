import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { deletePlayer } from "../API";

//taking in players and refresh handler
const AllPlayers = ({ players, refreshHandler }) => {
    const [playerList, setPlayerList] = useState(players);
    const [filteredPlayers, setFilteredPlayers] = useState(players);

    useEffect(() => {
        // The effect causing the use of useEffect -> Player list pr filtered player changing
        setPlayerList(players);
        setFilteredPlayers(players);
    }, [players]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const updatedPlayers = playerList.filter(player => player.name.toLowerCase().includes(searchTerm));
        setFilteredPlayers(updatedPlayers);
    }

    const onDelete = async (playerId) => {
        const result = await deletePlayer(playerId);
        if (result.success) {
            refreshHandler() //refresh handler resets page after delete 
        } else {
            console.error('Deletion failed:', result.error);
        }
    };

    const onInputChange = (event) => {
        console.log(event.target.value);
        const searchTerm = event.target.value.toLowerCase();
        const filtered = players.filter(player => player.name.toLowerCase().includes(searchTerm));
        setFilteredPlayers(filtered);
    };

    return(
        <>
       <input onChange={onInputChange} placeholder="Search players" className="search-box" />
            <div className="all-players-container">
              {filteredPlayers.map(player => (
                  <PlayerCard key={player.id} player={player} onDelete={() => onDelete(player.id)} />
              ))}
            </div>
        </>
    );
}

export default AllPlayers;