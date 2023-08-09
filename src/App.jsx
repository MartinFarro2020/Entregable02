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
    const cityName = event.target.cityNames.value;
    const API_KEY = "abaecf8c077398a3d6239c90ded488b7"
    const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
   
    
    axios
        .get(newUrl)
        .then(({ data }) => setCity(data))
        .catch((err) => console.log(err));
    
  };

  const changeDarkMode= () =>{
    document.documentElement.classList.toggle("dark");
  }
  
  //! Variables:
  //! Carga en una variable una de las API
  const kay = city===null ? weatherInfo : city
 

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
    "03n": 'bg-[url("/images/scatteredClouds03n.jpg")]',
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
    <main className = {`flex-col dark:bg-gray-500 dark:text-white bg-black min-h-screen text-white font-lato flex justify-center items-center p-4 ${imagesWeather[kay?.weather[0].icon]} bg-cover`}>
          <>
          <div className='mb-10 w-10 h-10  text-center rounded-full'>
            {/* <button className='bg-[url("/images/pear.png")]'></button> */}

            <button onclick={changeDarkMode} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              {/* <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg> */}
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAa5JREFUSEu11TFoFUEQBuAvBrGwkpCAICjB9NbBxlhoaSHYK0khiqgYg1FMUFFR1MKkUXs7wS4BTWVtLdipgYgJVhaBRBnZJ8dy9/aevGxz7N3c/+/888/sgB1eAzuMrxeCiN1OB2r9X+tA/h6mbwS3sIj1TMLfiWQwez+Cs3iQS16XwSzu4hMmsFqo0wGs4DBm8LAaX0dwEO8xiqt4UiCYTqCf04G+lAjie6Q8iXsp+DTO41jav8MC3qT9DbzE9zYS5TGPUyZ1icxhvluGJRedwesEcCcVPrYXELWKdQLLTSQlgo84git4moF0zLCEkyWCqscjtkO8hV3Yh58ZyP7ksA0MZX3yD6MD1ESwid0NBGGENfzC3hJBU4YfMI6w4qMGiaIHol9qV6kGpypWjCI/xx5cxLWEGPpHHf6LIH7qZtOblV7piSD0PYf7lUa7hKNp/xavEM9Y4agXbRvtUJot8byMZ90aCdfTkItREZ3+tRpfV4NIO/SOYXcc3woEMexido21HXaBdzvNmh8ZeNO4HsZUXT1KLsqz7duFU6dKX2+0guztP/ciUXvUSuQfKVJOGWsIYBMAAAAASUVORK5CYII="/>
              </button>
          </div>
    
          <Wheater handleSubmit={handleSubmit} kay={kay}/>
          </>
          
    </main>
  )
}

export default App
