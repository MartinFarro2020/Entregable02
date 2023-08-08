import { useEffect, useState } from 'react';
import './App.css';
import Wheater from "./components/Wheater"
import axios from 'axios';



function App() {
  //!SET
const [weatherInfo, setWeatherInfo] = useState(null)
const [city, setCity] = useState(null)

 //!CARGAR LA API 
  const success = (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    console.log({lat, lon})
    const API_KEY = "abaecf8c077398a3d6239c90ded488b7"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    console.log(url)

    axios.get(url)
      .then(({data}) => setWeatherInfo(data))
      .catch((err) => console.log(err))
  }

  //! HANDLE
  const handleSubmit = (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const API_KEY = "abaecf8c077398a3d6239c90ded488b7"
    const newUrl = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    console.log(newUrl)
    
    axios
        .get(newUrl)
        .then(({ data }) => setCity(data))
        .catch((err) => console.log(err));
    
  };
  
  //! Variables:
  //! Carga en una variable una de las API
  const kay = city===null ? weatherInfo : city
  console.log (kay)

  //! constante que constiene las imagenes de fondo

  const imagesWeather = {
    "01d": 'bg-[url("/images/clearSky01d.png")]',
    "02d": 'bg-[url("/images/fewClouds02d.png")]',
    "03d": 'bg-[url("/images/scatteredClouds03d.png")]',
    "04d": 'bg-[url("/images/brokenClouds04d.png")]',
    "09d": 'bg-[url("/images/showerRain09d.jpg")]',
    "10d": 'bg-[url("/images/rain10d.jpg")]',
    "11d": 'bg-[url("/images/thunderstorm11d.png")]',
    "13d": 'bg-[url("/images/snow13d.png")]',
    "50d": 'bg-[url("/images/mist50d.png")]',
    "01n": 'bg-[url("/images/clearSky01n.jpg")]',
    "02n": 'bg-[url("/images/fewClouds02n.png")]',
    "03n": 'bg-[url("/images/scatteredClouds03n.png")]',
    "04n": 'bg-[url("/images/brokenClouds04n.jpg")]',
    "09n": 'bg-[url("/images/showerRain09n.jpg")]',
    "10n": 'bg-[url("/images/rain10n.png")]',
    "11n": 'bg-[url("/images/thunderstorm11n.png")]',
    "13n": 'bg-[url("/images/snow13n.png")]',
    "50n": 'bg-[url("/images/mist50n.png")]',
  };


  //! useEffect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  

  return (
    <main className = {`bg-black min-h-screen text-white font-lato flex justify-center items-center p-4 ${imagesWeather[kay?.weather[0].icon]} bg-cover`}>
          {/* <img clasName = "w-full" src="/images/despejado.png"/> */}
          <Wheater handleSubmit={handleSubmit} kay={kay}/>
    </main>
  )
}

export default App
