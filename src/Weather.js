import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('hanoi');
    const [classNameBody, setClassNameBody] = useState('');
    const [classNameCard, setClassNameCard] = useState('');
    const classNameChangeBody = useRef(null);
    const classNameChangeCard = useRef(null);
   

   
    useEffect(() => {
        const handleWeather = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e3096efce0a79ee0cfef0ec94bdaca13`;
        const data = await fetch(url).then(responsive => responsive.json());
        if(data.cod === 200){
            if(data.main.temp < 283 ){
                setClassNameBody(classNameChangeBody.current.className = "cold");
                setClassNameCard(classNameChangeCard.current.className = "cold-theme");
            }else if(data.main.temp > 283){
                setClassNameBody(classNameChangeBody.current.className = "body");
                setClassNameCard(classNameChangeCard.current.className = "weather-card");
            }
            setCity(data)    
        }else{
            console.log("Not Found")
        }
        console.log(">>>>>>>", data);   
    }
   handleWeather();
}, [search])
  
    return (
        <>
        { city ?    
         <div ref={classNameChangeBody} className= {classNameBody}>
         <div ref={classNameChangeCard} className= {classNameCard}>       
             <input type="search" className="search" value={search}         
             onChange = {(event) => setSearch(event.target.value)}
              />
             <div className="city">
             <span>{city.name} - {city.sys.country}</span>
             </div>
             <div className="times">
                 <span>{new Date().toLocaleDateString('vi')}</span>
             </div>
             <div className="tempurature">
                 <span>{Math.floor(city.main.temp - 273.15)} <sup>o</sup>C </span>
             </div>
             <div className="desc">{city.weather[0].description}</div>
             <div className="more-desc">
                 <div className="visibility">
                     <i><FontAwesomeIcon icon={faEye} /></i>
                     <span>{city.visibility} m</span>
                 </div>
                 <div className="wind">
                     <i><FontAwesomeIcon icon={faWind} /></i>
                     <span>{city.wind.speed} m/s</span>
                 </div>
                 <div className="sun">
                     <i><FontAwesomeIcon icon={faSun} /></i>
                     <span>{city.wind.gust} %</span>
                 </div>
             </div>
         </div>
         </div>   
        :
       
        <div className="body">
        <span className="error">Không có dữ liệu</span>
        </div>
       
        }
        </>
    )
}

export default Weather;