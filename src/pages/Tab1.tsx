import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    fetchWeatherData('Manado');
  }, []);

  const fetchWeatherData = async (city: string) => {
    const apiKey = '4e9fd383daa14450d405b4d313ce3359'; // Ganti dengan API Key kamu
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (!weatherData) {
    return <IonContent>Loading...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-header">
          <IonTitle>Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid className="weather-container">
          <IonRow className="weather-main">
            <IonCol size="12" className="ion-text-center">
              {/* Wrapper untuk kartu cuaca */}
              <div className="weather-card">
                {/* Nama Kota */}
                <h2 className="city-name">{weatherData.name}</h2>
                {/* Ikon Cuaca */}
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt="weather icon"
                  className="weather-icon"
                />
                {/* Suhu */}
                <h1 className="temperature">{Math.round(weatherData.main.temp)}°C</h1>
                {/* Deskripsi Cuaca */}
                <p className="weather-description">
                  {weatherData.weather[0].description}
                </p>
                {/* Suhu Tertinggi dan Terendah */}
                <p className="temp-range">
                  H: {Math.round(weatherData.main.temp_max)}°C | L: {Math.round(weatherData.main.temp_min)}°C
                </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
