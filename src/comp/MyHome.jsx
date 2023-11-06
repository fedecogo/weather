import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cerca from '../assets/—Pngtree—search vector icon with transparent_5156942.png';

// Ciao stefano non avevo visto che la chiusura era a mezzanotte, Ho modificato poco la logica per una migliore ux e anche un po di css
function WeatherApp() {
  const [city, setCity] = useState('Milano');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTimeout, setFetchTimeout] = useState(null);

  const handleFetchData = (city2) => {
    setIsLoading(true);
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }
    const timeout = setTimeout(() => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city2}&APPID=60d5b2e652a7974548a20cbab5147ccc`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Problema nel recupero dei dati');
          }
        })
        .then((data) => {
          const temperatureInCelsius = data.main.temp - 273.15;
          const minTemperatureInCelsius = data.main.temp_min - 273.15;
          const maxTemperatureInCelsius = data.main.temp_max - 273.15;
          data.main.temp = temperatureInCelsius;
          data.main.temp_min = minTemperatureInCelsius;
          data.main.temp_max = maxTemperatureInCelsius;
          setWeatherData(data);
          setIsLoading(false);
          console.log(data);
        })
        .catch((error) => {
          console.error('Errore nella fetch', error);
          setIsLoading(false);
        });
    }, 1500);
    setFetchTimeout(timeout);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    handleFetchData(city);
  }, []);

  return (
    <div className='d-flex justify-content-center ' id='fullScreen'>
      <Row id='row1' className='mt-3 mb-5'>
        {isLoading ? (
          <div className="spazio_per_spinner">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
          <Row className='d-flex flex-column   '>
            <Col md={12} className='d-flex align-items-center justify-content-center mt-5' id='topBar'>
              <input type='text' className='cityinput' placeholder='Cerca Una Città' value={city} onChange={handleCityChange} />
              <img src={Cerca} onClick={() => handleFetchData(city)} style={{ width: "50px", cursor: "pointer" }} alt="Search Icon" />
            </Col>
            <Col id='min' md={12} className='d-flex align-items-center justify-content-center ssss mt-5 '>
              <p className="text-center mt-3 nomeBig"> {weatherData ? weatherData.name : 'CityName'}, {weatherData ? weatherData.sys.country : 'Country'}</p>
              <div>{weatherData && (
                <img id='SearchPng' src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
              )}
              </div>
            </Col>
            <Col  className='d-flex align-items-center justify-content-center ssss'>
              <p>{weatherData ? `${weatherData.weather[0].description}` : 'Condizione Meteo'}</p>
            </Col>
            <Col  className='d-flex align-items-center justify-content-center ssss'>
              {weatherData ? `Temperatura media: ${weatherData.main.temp.toFixed(2)}°C` : 'Temperatura in gradi'}
            </Col>
            <Col  className='d-flex align-items-center justify-content-center ssss'>
              <p>{weatherData ? ` Min: ${weatherData.main.temp_min.toFixed(2)}°C` : 'Temperatura in gradi'}              {weatherData ? ` Max: ${weatherData.main.temp_max.toFixed(2)}°C` : 'Temperatura in gradi'}</p>
            </Col>
           
            <Col  className='d-flex align-items-center justify-content-center ssss '>
            <p className='me-4'>{weatherData ? `Umidità: ${weatherData.main.humidity}%` : 'Umidità'}</p>
            <p>{weatherData ? `Nuvole: ${weatherData.clouds.all}%` : 'Nuvole'}</p>
            </Col>
            <Col  className='d-flex align-items-center justify-content-center ssss mb-5 '>
            <p className='me-4'>{weatherData ? `Velocità del vento: ${weatherData.wind.speed}%` : 'vento'}</p>
            <p>{weatherData ? `Nuvole: ${weatherData.clouds.all}%` : 'Nuvole'}</p>
            </Col>
          </Row>
        </>
        
        )}
      </Row>
    </div>
  );
}

export default WeatherApp;
