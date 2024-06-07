import axios from "axios";

export const getMovies = async (req, res) => {
    const BASE_URL = 'https://api.themoviedb.org/3';
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: process.env.API_KEY,
            language: 'en-US',
            page: 1,
            
          },
        });
       
        res.json(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
      }

   
}




