import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function WeatherApp() {
  const [city, setCity] = useState('Milano');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=60d5b2e652a7974548a20cbab5147ccc`)
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
    };

    const timeout = setTimeout(fetchData, 1500);
    return () => clearTimeout(timeout)
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

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
          <Row>
            <Col md={12} className='d-flex align-items-center justify-content-evenly ' id='topBar'>
              <input type='text' className='cityinput' placeholder='Cerca Una Città' value={city} onChange={handleCityChange} />
            </Col>
            <Col id='min' md={12} className='d-flex align-items-center justify-content-center ssss'>
              <div> {weatherData ? weatherData.name : 'CityName'}</div>
              <div className='ms-2'>{weatherData ? weatherData.sys.country : 'Country'}</div>
              <div>{weatherData && (
                <img id='SearchPng' src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
              )}
              </div>
            </Col>
         
            <Col xs={12} className='d-flex align-items-center justify-content-center ssss'>
              {weatherData ? `Temperatura media : ${weatherData.main.temp.toFixed(2)}°C` : 'Temperatura in gradi'}
             
            </Col>
           
            <Col className='ssss mb-5 '>{weatherData ? `Temperatura min : ${weatherData.main.temp_min.toFixed(2)}°C` : 'Temperatura in gradi'}</Col>
            <Col className='ssss mb-5'>{weatherData ? `Temperatura max : ${weatherData.main.temp_max.toFixed(2)}°C` : 'Temperatura in gradi'}</Col></Row>
          </>
        )}
      </Row>
    </div>
  );
}

export default WeatherApp;
