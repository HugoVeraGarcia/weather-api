import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Card = () => {

const [weather, setWeather] = useState({});
const [temp, setTemp] = useState(0);
const [isCelsius, setIsCelsius] = useState(true);
const [icon, setIcon] = useState ('');

    const success = pos =>{
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const idKey = '534c120127d41a8820363cb05f55e278';
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${idKey}`;
        
        axios.get(url)
            .then(res => {
                setWeather(res);
                setTemp(res.data?.main?.temp - 273.15);
                setIcon(res.data?.weather?.[0]?.icon);
            });
            
        }
        
    useEffect(()=>{
            
            navigator.geolocation.getCurrentPosition(success);

    },[]);

    const changeGrade = ()=>{
        
        if(isCelsius){
            setTemp((weather.data?.main?.temp - 273.15) *9/5 + 32)
            setIsCelsius(!isCelsius)
        
        }else{
            setTemp((weather.data?.main?.temp - 273.15))
            setIsCelsius(!isCelsius)
        
        }
    }
    
    
    //document.body.style.backgroundImage = `url('${img}')`;
    
    console.log(icon);

    return (
        
        <div className='container'>

            
            <div className='container__card'>
            <h1>Weather App</h1>
            <div className='container-data'><p className='label' >City - Country: </p> <p className='data' >{weather.data?.name} - {weather.data?.sys?.country}</p></div>

                <div className='card'>
                    <div className='container-icon'>
                        <img className='ico_weather' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon weather" /> 
                        <p className='label'>{Math.round(temp)} {isCelsius ? '°C' : '°F' } </p>
                        <div className='button-container'> <button className='button' onClick={changeGrade}>Degress °F / °C</button> </div>
                    </div> 
                    <div>
                    
                        <div className='grid-data'>
                            <p className='label'>Description:</p> <p className='data'> {weather.data?.weather?.[0].description}</p> <p></p>
                            <p className='label'>Wind speed:</p>  <p className='data'> {weather.data?.wind?.speed}</p> <p className='label'>meter/sec</p>
                            <p className='label'>Humidity:</p>    <p className='data'> {weather.data?.main?.humidity} </p> <p className='label'>%</p>
                            <p className='label'>Pressure:</p>    <p className='data'> {weather.data?.main?.pressure} </p> <p className='label'>hPa</p>
                        </div>
                        
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Card;