import React, { useState, useEffect, useRef } from 'react'
import './Weather.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import pressureIcon from '../assets/pressure.png'
import feelsLikeIcon from '../assets/feelslike.png'


function Weather() {

    const [weatherData, setWeatherData] = useState({});
    const [inputData, setInputData] = useState("Patna");
    const [errorInfo, setErrorInfo] = useState("");

    const allIcons = {
        "01d" : clearIcon,
        "01n" : clearIcon,
        "02d" : cloudIcon,
        "02n" : cloudIcon,
        "03d" : cloudIcon,
        "03n" : cloudIcon,
        "04d" : drizzleIcon,
        "04n" : drizzleIcon,
        "09d" : rainIcon,
        "09n" : rainIcon,
        "13d" : snowIcon,
        "13n" : snowIcon,
    }

    const search = async (city) => {
        if(city === '' || city === ' '){
            alert("Please Enter City Name!");
            return;
        }
        try {
            const url = `${import.meta.env.VITE_APP_BASE_URL}?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                setErrorInfo(data.message);
            }
            // console.log(data);

            const icon = allIcons[data.weather[0].icon] || clearIcon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                pressure: data.main.pressure,
                location: data.name,
                icon: icon,
                feelsLike: Math.floor(data.main.feels_like),
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error")
        }
    }

    useEffect(() => {
        search("Patna")
    }, [])

    let handleInputChange = (event) => {
        setInputData(event.target.value);
    }

    let handleFormSubmit = (event) => {
        event.preventDefault();
        search(inputData);
    }

  return (
    <div className='weather'>
        <h1>Weather forecast</h1>
        <Stack spacing={2} direction="row">
            <Box component="form" onSubmit={handleFormSubmit} sx={{width: '25rem'}} noValidate autoComplete="off">
            <TextField value={inputData} onChange={handleInputChange} sx={
                {width: '100%', 
                '& input': {color: 'white'}, 
                '& label': {color: 'white'},
                '& label.Mui-focused': {color: 'white'},
                '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },'&:hover fieldset': {
              borderColor: 'white',
            },'&.Mui-focused fieldset': {
              borderColor: 'white',
            },}
                }} id="outlined-basic" label="Enter city name" variant="outlined" />
            </Box>
            <Button onClick={() => search(inputData)} variant="contained" endIcon={<SearchIcon />} sx={{width: '150px'}}>Search</Button>
        </Stack>

        {
            weatherData ? 
            <>
                <Box component="section" sx={{ p: 2, marginTop: '1rem', display: 'flex', flexDirection:'column', alignItems:'center' }}>
                    <img src={weatherData.icon} alt="" className='weather-icon'/>
                    <p className='temp' style={{fontSize: '2.5rem', fontWeight: 400, color:'#fff'}}>{weatherData.temp}&deg;C</p>
                    <p className='location' style={{fontSize: '1.5rem', color:'#fff'}}>{weatherData.location}</p>
        
                    <div className="weather-data">
                        <div className="data">
                            <img src={humidityIcon} alt="" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
        
                        <div className="data">
                            <img src={windIcon} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
        
                        <div className="data">
                            <img src={pressureIcon} alt="" />
                            <div>
                                <p>{weatherData.pressure} atm</p>
                                <span>Pressure</span>
                            </div>
                        </div>
        
                        <div className="data">
                            <img src={feelsLikeIcon} alt="" />
                            <div>
                                <p>{weatherData.feelsLike}&deg;C</p>
                                <span>Feels like</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </> : 
            <>
                <h2 style={{textAlign: 'center', margin: '2rem 0', color: 'yellow', fontWeight: 500}}>Type Error : {errorInfo}</h2>
            </>
        }
        
        
    </div>
  )
}

export default Weather