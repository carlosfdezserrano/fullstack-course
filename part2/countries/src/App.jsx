import { useState, useEffect} from 'react'
import api from "./services/api"

const Search = ({onChange}) => <div>find countries <input onChange={onChange} /></div>

const ShowButton = ({onClick}) => <button onClick={onClick}>show</button>

const Languages = ({languages}) =>
  <ul>
    {languages.map(language => <li key={language}>{language}</li>)}
  </ul>

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const lat = country.capitalInfo.latlng[0]
    const long = country.capitalInfo.latlng[1]
    useEffect(() => {
      api.get_weather(lat,long)
      .then(response => {
        console.log("weather got")
        console.log(response.data)
        setWeather(response.data)
        })
      .catch(error => {
        console.log("failed to retrieve weather")
        setWeather(null)
      })
    }, [])

    return(
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        {
          weather ? (
            <div>
              <p>temperature {weather.current.temperature_2m} Celsius</p>
              <img src={api.get_weather_img(weather.current.weather_code, weather.current.is_day)} />
              <p>wind {weather.current.wind_speed_10m} m/s</p>
            </div>
          ) : (
            <p> Weather could not be retrieved :( </p>
          )
        }
      </div>
    )
} 
const Country = ({country}) => 
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <h3>languages</h3>
    <Languages languages={Object.values(country.languages)} />
    <img src={country.flags.png} />
    <Weather country={country} />
  </div>

const CountryShow = ({country}) => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const onClick = () => {setButtonPressed(true);};
  return(
    <div>
      {buttonPressed ? (
        <Country country={country} />
      ) : (
        <p>{country.name.common} <ShowButton onClick={onClick} /></p>
      )}
    </div>
  )
}

const Content = ({countries}) => {
  if (!countries) return <p>No countries found</p>
  if (countries.length>10) return <p>Too many matches, specify another filter</p>
  if (countries.length>1 && countries.length<=10) 
  return(
    <div>
      {countries.map(
      country => <CountryShow key={country.name.common} country={country}/>
       )}
    </div>
  )
  if(countries.length === 1){
    return <Country country={countries[0]} />
  }
}

const App = () => {  
  
  const [newCountry, setNewCountry] = useState("")
  const [foundCountries, setFoundCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const onChange = (event) => {
    setNewCountry(event.target.value)
  }
  
  
  useEffect( () =>{
    if (allCountries.length === 0){
      api.get_countries()
      .then(response => {
        console.log("got countries")
        const countries = response.data.map(
          country => ({...country,["show"]: false}))
        setAllCountries(countries)
        console.log(countries)
      })
      .catch(error => console.log("could not get countries"))
    }
    else{
      if (newCountry){
        const countries = allCountries.filter(country =>
          country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
          setFoundCountries(countries)
          console.log(`found countries ${countries.length}`)
      }
    }
  }
  , [newCountry])

  return (
    <div>
      <Search onChange={onChange} />
      <Content countries={foundCountries}/>
    </div>
  )
}

export default App
