import { useEffect, useState} from "react"
import axios from 'axios';

const Wheater = ({ handleSubmit , kay }) => {
  
  //! SET
  // console.log({kay})
  const [isCelcius, setIsCelcius] = useState(true)
  
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


  return (
    <section className="text-center justify-center" >
      <h2 className="items-center font-bold text-black text-xl bg-white/60 mb-2 p-2 rounded-full">{kay?.name}</h2>

      <section className="grid gap-4 sm:grid-cols-[auto_auto]">

        {/* seccion superior */}
        <section className="bg-white/60 p-2 rounded-2xl grid grid-cols-2 items-center">
          <h4 className="content-center col-span-2 text-black text-l">{kay?.weather[0].description}</h4>

          <span className="text-4xl text-black">{resultTempConvertion}°{isCelcius ? "C" : "F"}</span>
          <div>
            <img src={`https://openweathermap.org/img/wn/${kay?.weather[0].icon}@4x.png`} alt=""/>
          </div>
        </section>

        {/* seccion inferior */}
        <section className="bg-white/60 text-black/80 p-2 py-4 rounded-2xl grid grid-cols-3 items-center sm:grid-cols-1">
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

      <button onClick ={handleChangeUnitTemp} className="px-7 py-1  mt-5 bg-black text-white text-lg rounded-full">Cambiar a °{isCelcius ? "F" : "C"} </button>

      <section>
          <form onSubmit={handleSubmit} className="flex-col">
            <input autoComplete="off" id="cityNames" type="text" className="mt-4 px-2 py-1 text-black rounded-l-full"/>
            <button className="bg-slate-900 rounded-r-full px-4 py-1">Search</button>
          </form>
      </section>

    </section>
  )
}
export default Wheater