import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  let [cityname, setCityname] = useState('')
  let [wdetails, setWdetails] = useState('')

  let getdata = (event) => {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=549e949125517e3d686dbad51955570e&units=metric`)
      .then((res) => res.json())
      .then((finalres) => {
        if (finalres.cod == '404') {
          setWdetails('')
        }
        else
          setWdetails(finalres)
      })
    setCityname('')
  }

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <form onSubmit={getdata}>

          <div className="search-container">
            <input
              type="text"
              value={cityname}
              onChange={(event) => setCityname(event.target.value)}
              placeholder="Enter city name"
              className="city-input"

            />
            <button className="search-button">Search</button>
          </div>
        </form>

        {

          <>
            {(wdetails != '') ?
              <div className="weather-info">
                <div className="location">
                  <h2>{wdetails.name},{wdetails.sys.country}</h2>
                </div>

                <div className="temperature">
                  <h3>{wdetails.main.temp}</h3>
                  <p>{wdetails.weather[0].main}
                  </p>
                </div>

                <div className="additional-info">
                  <p>{wdetails.main.humidity} %</p>
                  <p>{wdetails.wind.speed} km/h</p>
                </div>
              </div>
              : <>
                <p className='text-gray-950'>no data</p>
              </>
            }
          </>
        }
      </div>
    </div>
  );
}

export default App;
