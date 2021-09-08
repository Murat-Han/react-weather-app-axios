import axios from 'axios';

export const getWeatherData=async (cityname)=>{
    try {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);   
    return data;
    } catch (error) {
        throw (error);
    }
}