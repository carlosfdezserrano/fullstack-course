import axios from 'axios'

const base_url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const weather_img = {"01":[0], "02":[1], "03":[2], "04":[3], "50":[45,48], "09":[80, 81, 82], "10":[51,53,55,56,57,61,63,65,66,67], "13":[71,73,75,77,85,86], "11":[95,96,99]}

const findKeyByNumber = (number) => {
    for (const key in weather_img) {
        if (weather_img[key].includes(number)) {
          return key;
        }
      }
    return null; // Number not found in any array
  }

const get_countries = () => {
    console.log("getting countries...")
    const request = axios.get(base_url)
    return request
}

const get_weather = (lat, long) => {
    console.log("getting weather")
    const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,weather_code,wind_speed_10m&wind_speed_unit=ms`)
    return request
}

const get_weather_img = (code, is_day) => {
    const dn = is_day ? "d" : "n"
    const img = findKeyByNumber(code)
    const url = `https://openweathermap.org/img/wn/${img}${dn}@2x.png`
    return url

}
export default {get_countries, get_weather, get_weather_img}