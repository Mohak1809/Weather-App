import { useState, useEffect } from 'react'
import WeatherInfo from './CustomHook/WeatherInfo'

function App() {
  const [city, setCity] = useState(null);
  const [inputcity, setinputcity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, sethumidity] = useState("");
  const [wind, setwind] = useState("");
  const [image, setimage] = useState("");
  const [displaycity, setDisplayCity] = useState("");
  const [invalid, setinvalid] = useState(false);

  const weatherData = WeatherInfo(city);
  const GetInfo = () => {
    setCity(inputcity);  // Update the city to trigger the WeatherInfo hook
  };

  useEffect(() => {
    if (weatherData && city) {
      setTemp(Math.round(weatherData.main.temp) + "°C");
      sethumidity(weatherData.main.humidity + "%");
      setwind(weatherData.wind.speed + " km/hr");
      setimage(Picture(weatherData.weather[0].main));
      setinvalid(false);
      setDisplayCity(city);
    } else if (!weatherData && city) {
      setinvalid(true);
    } else {
      setinvalid(false);
    }
  }, [weatherData]);

  

  function Picture(image) {
    switch (image) {
      case "Clouds":
        return "clouds.png";
      case "Clear":
        return "clear.png";
      case "Rain":
        return "rain.png";
      case "Drizzle":
        return "drizzle.png";
      case "Mist":
        return "mist.png";
      case "Haze":
        return "mist.png";
      case "Snow":
        return "snow.png"
    }
  }




  return (
    <div className='h-screen w-screen bg-black overflow-hidden'>
      <div className='max-w-[470px] w-[90%] bg-gradient text-white rounded-2xl p-[35px]
                      mt-10 mx-auto text-center' >
        <div className='w-full flex items-center justify-between'>
          <input type="text" placeholder='Enter City Name'
            value={inputcity}
            className='bg-[#ebfffc] text-[#555] border-none outline-none py-[10px] px-[25px] h-[60px] w-80 rounded-3xl mr-4 text-lg'
            onChange={(e) => setinputcity(e.target.value)} />
          <button
            className='border-none outline-none bg-[#ebfffc] rounded-[50%] w-[60px] h-[60px] cursor-pointer
                     flex items-center justify-center'
            onClick={GetInfo}>
            <img src="search.png"
              className='w-[16px]' /></button>
        </div>
        <div className={`${weatherData ? 'flex' : 'hidden'} flex-col items-center justify-center`}>
          <img src={image}
            className='w-[170px] mt-[30px]' />
          <h1 className='text-[80px] font-medium'>{temp}</h1>
          <h2 className='text-[45px] font-normal mt-[-10px]'>{displaycity}</h2>
          <div className='flex items-center justify-between px-5 mt-[50px] w-full'>
            <div className='flex items-center text-left'>
              <img src="humidity.png"
                className='w-10 mr-3' />
              <div>
                <p className='text-3xl mt-[-6px]'>{humidity}</p>
                <p >Humidity</p>
              </div>
            </div>
            <div className={`flex items-center text-left`}>
              <img src="wind.png"
                className='w-10 mr-3' />
              <div>
                <p className='text-3xl mt-[-6px]'>{wind}</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${invalid ? 'block' : 'hidden'}  text-2xl mt-5 text-green-900 font-semibold`}>
          Invalid City Name!
        </div>
      </div>
    </div>
  )
}

export default App
