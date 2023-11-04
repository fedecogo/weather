import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchPng from '../assets/—Pngtree—search vector icon with transparent_5156942.png';

function WeatherApp() {
  const [city, setCity] = useState('Milano');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
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
        data.main.temp = temperatureInCelsius;
        setWeatherData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Errore nella fetch', error);
      });
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Container className='d-flex align-items-center justify-content-center' id='fullScreen'>
      <Row id='row1'>
        <Col xs={12} className='d-flex align-items-center justify-content-evenly' id='topBar'>
          <input type='text' className='cityinput' placeholder='Cerca Una Città' value={city} onChange={handleCityChange} />
          <div>
            <img src={SearchPng} alt='' id='SearchPng' />
          </div>
        </Col>
        <Col xs={12} className='d-flex align-items-center justify-content-center'>
          {weatherData ? weatherData.name : 'CityName'}
        </Col>
        <Col xs={12} className='d-flex align-items-center justify-content-center'>
          {weatherData ? `Temperatura: ${weatherData.main.temp.toFixed(2)}°C` : 'Temperatura in gradi'}
        </Col>
      </Row>
    </Container>
  );
}

export default WeatherApp;
