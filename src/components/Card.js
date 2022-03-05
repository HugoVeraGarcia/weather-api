import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Card = () => {

const [weather, setWeather] = useState({});
const [temp, setTemp] = useState(0);
const [isCelsius, setIsCelsius] = useState(true);
const [icon, setIcon] = useState ('');
const [img, setImg] = useState('');


    const getImage = () => {
        //if (icon === '01d') setImg('../assets/broken_clouds.jpg');
        if (icon === '01d') {setImg('https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_960_720.jpg')}; //clear sky
        if (icon === '02d') {setImg('https://cdn.pixabay.com/photo/2012/06/08/06/19/clouds-49520_960_720.jpg')};//few clouds 
        if (icon === '03d') { setImg('https://cdn.pixabay.com/photo/2014/09/12/18/41/white-clouds-443166_960_720.jpg') }//scattered clouds
        if (icon === '04d') { setImg('https://cdn.pixabay.com/photo/2022/01/25/16/01/sky-6966721_960_720.jpg')}//broken clouds
        if (icon === '09d') { setImg('https://cdn.pixabay.com/photo/2020/05/08/11/44/rain-5145277_960_720.jpg')}//shower rain
        if (icon === '10d') { setImg('https://cdn.pixabay.com/photo/2020/05/08/11/44/rain-5145277_960_720.jpg')}//rain
        if (icon === '11d') { setImg('https://cdn.pixabay.com/photo/2019/12/22/22/00/lightning-4713379_960_720.jpg')}//thunderstorm
        if (icon === '13d') { setImg('https://cdn.pixabay.com/photo/2020/02/08/14/36/trees-4830285_960_720.jpg')}//snow
        if (icon === '50d') { setImg('https://cdn.pixabay.com/photo/2016/07/22/16/29/fog-1535201_960_720.jpg')}//mist

        if (icon === '01n') setImg('https://cdn.pixabay.com/photo/2017/06/08/06/03/british-columbia-2382640_960_720.jpg'); //clear sky
        if (icon === '02n') setImg('https://cdn.pixabay.com/photo/2020/05/26/20/38/moon-5224745_960_720.jpg');//few clouds
        if (icon === '03n') { setImg('https://cdn.pixabay.com/photo/2014/04/05/11/06/clouds-314476_960_720.jpg')}//scattered clouds
        if (icon === '04n') { setImg('https://cdn.pixabay.com/photo/2016/11/29/13/12/cloudy-1869753_960_720.jpg')}//broken clouds
        if (icon === '09n') { setImg('https://cdn.pixabay.com/photo/2020/05/08/11/44/rain-5145277_960_720.jpg')}//shower rain
        if (icon === '10n') { setImg('https://cdn.pixabay.com/photo/2020/05/08/11/44/rain-5145277_960_720.jpg')}//rain
        if (icon === '11n') { setImg('https://cdn.pixabay.com/photo/2020/07/12/20/47/thunderstorm-5398664_960_720.jpg')}//thunderstorm
        if (icon === '13n') { setImg('https://cdn.pixabay.com/photo/2018/05/04/07/55/snow-3373432_960_720.jpg')}//snow
        if (icon === '50n') { setImg('https://cdn.pixabay.com/photo/2016/11/18/15/36/fir-trees-1835402_960_720.jpg')}//mist
        console.log(icon, img);
    
    }
    const success = pos =>{
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const idKey = '534c120127d41a8820363cb05f55e278';
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${idKey}`)
            .then(res => {
                //console.log(res);
                setWeather(res);
                setTemp(res.data?.main?.temp - 273.15);
                setIcon(res.data?.weather?.[0]?.icon);
                getImage(); 
            });
    }

    useEffect(()=>{

        navigator.geolocation.getCurrentPosition(success);

    })

    const changeGrade = ()=>{
        console.log('hello')
        if(isCelsius){
            setTemp((weather.data?.main?.temp - 273.15) *9/5 + 32)
            setIsCelsius(!isCelsius)
            console.log((weather.data?.main?.temp - 273.15) *9/5 + 32)
        }else{
            setTemp((weather.data?.main?.temp - 273.15))
            setIsCelsius(!isCelsius)
            console.log((weather.data?.main?.temp - 273.15 - 32) * 5/9)
        }
    }

    //document.body.style = "background: red" ... ejemplo
    return (
        
        <div className='container' style={{
            backgroundImage: `url(${img})`
            }}>


            
            <div className='container__card'>
            <h1>Weather App</h1>
            <div className='container-data'><p className='label' >City - Country: </p> <p className='data' >{weather.data?.name} - {weather.data?.sys?.country}</p></div>

                <div className='card'>
                    <div className='container-icon'>
                    <img className='ico_weather' src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon weather" /> 
                        <p className='label'>{Math.round(temp)} {isCelsius ? '°C' : '°F' } </p>
                    </div>
                    <div>
                    
                        <div className='grid-data'>
                            <p className='label'>Description:</p> <p className='data'> {weather.data?.weather?.[0].description}</p> <p></p>
                            <p className='label'>Wind speed:</p>  <p className='data'> {weather.data?.wind?.speed}</p> <p className='label'>meter/sec</p>
                            <p className='label'>Humidity:</p>    <p className='data'> {weather.data?.main?.humidity} </p> <p className='label'>%</p>
                            <p className='label'>Pressure:</p>    <p className='data'> {weather.data?.main?.pressure} </p> <p className='label'>hPa</p>
                        </div>
                        <div className='button-container'> <button className='button' onClick={changeGrade}>Degress °F / °C</button> </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Card;