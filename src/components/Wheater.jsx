import { useEffect, useState} from "react"
import axios from 'axios';

const Wheater = ({ handleSubmit , kay }) => {
  
  //! SET
  // console.log({kay})
  const [isCelcius, setIsCelcius] = useState(true)

  const [theme, setTheme] = useState("dark")
  const element = document.documentElement
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
  
  //! Conversion de grados
  const kelvinToCelcius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(1)
  }

  const kelvinToFahrenheit = (tempKelvin) => {
    return (((tempKelvin - 273)* 9/5) + 32).toFixed(1)
  }

  //! Handle
  const handleChangeUnitTemp = () =>{
      setIsCelcius(!isCelcius)
  }

  const resultTempConvertion = isCelcius ? kelvinToCelcius(kay?.main.temp) : kelvinToFahrenheit(kay?.main.temp)

//! array del darkmode
const options = [
  {
    icon:"sunny",
    text:"light"
  },
  {
    icon:"moon",
    text:"dark"
  },
  {
    icon:"desktop-outline",
    text:"system"
  }
];

function onWindowMatch(){
  if(
    localStorage.theme === "dark" || (!("theme in localStorage") && darkQuery.matches)
  ){
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }
}
onWindowMatch();


  useEffect(() => {
    switch (theme){
      case `dark`:
        element.classList.add('dark')
        break;
      case 'light':
        element.classList.remove("dark");
        break;

      default:
      
        break;
    }
  }, [theme])
  

  return (
    
    <section className="text-center justify-center " >

              <section className='fixed top-5 rigth-10 duration-100 dark:bg-slate-900 bg-gray-100 rounded'>
                                
                                  {
                                    options.map(opt=>(
                                        <button key={opt.text} onClick= {() => setTheme(opt.text)} className={`w-8 h-8 leading-9 text-lg rounded-full m-1 ${theme === opt.text && "text-sky-600"}`}>
                                            <ion-icon name={opt.icon}></ion-icon>
                                        </button>
                                    ))
                                  }
                   
              </section>

      <h2 className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 items-center font-bold text-black text-xl bg-white/60 mb-2 p-2 rounded-full">{kay?.name}</h2>

      <section className="grid gap-4 sm:grid-cols-[auto_auto]">

        {/* seccion superior */}
        <section className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 bg-white/60 p-2 rounded-2xl grid grid-cols-2 items-center">
          <h4 className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 content-center col-span-2 text-black text-l">{kay?.weather[0].description}</h4>

          <span className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 text-4xl text-black">{resultTempConvertion}°{isCelcius ? "C" : "F"}</span>
          <div className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100">
            <img src={`https://openweathermap.org/img/wn/${kay?.weather[0].icon}@4x.png`} alt=""/>
          </div>
        </section>

        {/* seccion inferior */}
        <section className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 bg-white/60 text-black/80 p-2 py-4 rounded-2xl grid grid-cols-3 items-center sm:grid-cols-1">
          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="/images/wind.png" alt="" />
            </div>
            <span>{kay?.wind.speed}m/s</span>
          </article>

          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="/images/humidity.png" alt="" />
            </div>
            <span>{kay?.main.humidity}%</span>
          </article>

          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="/images/pressure.png" alt="" />
            </div>
            <span>{kay?.main.pressure}hPa</span>
          </article>
          
        </section>

      </section>

      <button onClick ={handleChangeUnitTemp} className="dark:text-gray-100 dark:bg-indigo-950 opacity-70 duration-100 px-7 py-1  mt-5 bg-rose-900 text-white text-lg rounded-full">Change to °{isCelcius ? "F" : "C"} </button>

      <section>
          <form onSubmit={handleSubmit} className="flex-col">
            <input autoComplete="off" id="cityNames" type="text" className="mt-4 px-2 py-1 text-black rounded-l-full h-10"/>
            <button className="dark:text-white dark:bg-indigo-950 opacity-70 bg-rose-900 rounded-r-full px-4 py-1 h-10 text-lg">Search</button>
          </form>
      </section>

    </section>
  )
}
export default Wheater