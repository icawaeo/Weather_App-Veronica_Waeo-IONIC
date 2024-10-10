import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { getWeatherByCity } from '../services/weatherServices';

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number };
}

const Tab2: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchWeather = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setErrorMessage('');
    } catch (error) {
      setWeatherData(null);
      setErrorMessage('Failed to fetch weather data.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search City Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          className="city-input" // Tambahkan kelas input agar bisa di-style
          value={city}
          placeholder="Masukkan nama kota"  // Placeholder keterangan
          onIonChange={(e) => setCity(e.detail.value!)}
        />
        <IonButton expand="full" onClick={fetchWeather}>Search</IonButton>

        {weatherData ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{weatherData.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{weatherData.weather[0].description}</p>
              <h2>{weatherData.main.temp}°C</h2>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>{errorMessage}</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;