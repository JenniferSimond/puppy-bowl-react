import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchAllPlayers } from "./API";
import AllPlayers from "./player-components/AllPlayers";
import SinglePlayer from "./player-components/SinglePlayer";
import AddPlayer from "./header-components/AddPlayer";
import './App.css';

//wanted all players to be set and refreshed in state so children could use it 
function App() {
 const [players, setPlayers] = useState([])
 const [pageRefresh, setPageRefresh] = useState(false) //refresh page after new player added to form

 useEffect(() =>{

  
  const getPlayers = async () => {
    try {
      const fetchedPlayers = await fetchAllPlayers();
      console.log('player >--->', fetchedPlayers) 
      setPlayers(fetchedPlayers)
    } catch (error) {
      console.error(error)
    }


  };
  getPlayers();
 }, [pageRefresh])

 const refreshHandler = () => {
  setPageRefresh(!pageRefresh)
 }
  return (
    <>
    <div className="form-and-header">
      <h1>Puppy Bowl 2024</h1>
      <AddPlayer refreshHandler={refreshHandler} />
    </div>


    <Routes>
      <Route path='/' element={<AllPlayers players={players} refreshHandler={refreshHandler}/>} />
      <Route path='/players' element={<AllPlayers players={players} refreshHandler={refreshHandler}/>} />
      <Route path='/players/:playerId' element={<SinglePlayer />} />
    </Routes>
    </>
  )
}

export default App
