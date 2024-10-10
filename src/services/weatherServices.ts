import axios from 'axios';

const apiKey = '4e9fd383daa14450d405b4d313ce3359';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number };
  name: string;
}

export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
