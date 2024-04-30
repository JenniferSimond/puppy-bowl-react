const cohortName = '2401-FTB-MT-WEB-PT';
export const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    const puppies = await response.json();
    console.log(puppies);
    console.log(puppies.data.players);
    return puppies.data.players;
  } catch (error) {
    console.error('Uh oh, trouble fetching players!', error);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`);
    const puppy = await response.json();
    console.log('See Details Button');
    console.log(`Single pup: ${puppy.data.player}`);
    return puppy.data.player;
  } catch (error) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, error);
  }
};

const deletePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the player');
    }
    return { success: true }; // Return a success object or the response body as needed
  } catch (error) {
    console.error(`Failed to delete player #${playerId}:`, error);
    return { success: false, error: error }; // Return an error object for further handling
  }
};

export { fetchAllPlayers, fetchSinglePlayer, deletePlayer };
