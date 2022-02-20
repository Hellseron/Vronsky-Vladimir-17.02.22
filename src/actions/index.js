import axios from "axios";
import {toast} from "react-toastify";

const BASE_URL = 'https://dataservice.accuweather.com/'
const API_KEY = '0mkG3pgKJpotuAX0AeokHhPjS6DOjmiI'


// action creators

export const setCurrentCity= (city) => {
    return {
        type: 'SET_CURRENT_CITY',
        city: city
    }
}

export const setLoading = (load) => {
    return {
        type: 'SET_LOADING',
        isLoading: load
    }
}

export const setCurrentWeatherData = (weatherData) => {
    return {
        type: 'SET_CURRENT_WEATHER_DATA',
        data: weatherData
    }
}

export const setTheme = () => {
    return {
        type: "SET_THEME"
    }
}

export const setScale = () => {
    return {
        type: "SET_SCALE",
    }
}
export const setForecast = (data) => {
    return {
        type: "SET_FORECAST",
        forecastData: data
    }
}
export const setSearchList = (data) => {
    return {
        type: "SET_SEARCH_LIST",
        searchList: data
    }
}


export const addFavoriteCity = (city) => {
    return {
        type: "ADD_FAVORITE_CITY",
        city
    }
}

export const removeFavoriteCity = (cityKey) => {
    return {
        type: "REMOVE_FAVORITE_CITY",
        cityKey
    }
}

export const setFavoriteCities = (cities) => {
    return {
        type: "SET_FAVORITE_CITIES",
        cities
    }
}


// thunks


export const fetchCurrentWeather = (cityKey) => (dispatch) => {

    return axios.get(`${BASE_URL}currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
        .then(res => {
            if (res.status === 200) {
                const weatherData = {
                    temperature: res.data[0].Temperature,
                    text: res.data[0].WeatherText,
                    currentDate: res.data[0].LocalObservationDateTime
                }
                dispatch(setCurrentWeatherData(weatherData))
            }
            return res
        })
        .catch(() => {
            toast.error("Unfortunately, didn't manage to get weather information! Please, try again later.", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })


}

export const fetchForecast = (cityKey, metric) => (dispatch) => {

    return axios.get(`${BASE_URL}forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric}`)
        .then((res) => {
            dispatch(setForecast(res.data.DailyForecasts))
            return res
        })
        .catch(() => {
            toast.error("Unfortunately, didn't manage to get forecast information! Please, try again later.", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })


}

export const fetchAutocomplete = (searchText) => (dispatch) => {
    axios.get(`${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchText}`)
        .then(({data}) => {
            dispatch(setSearchList(data))
        })
        .catch(() => {
            toast.error("Oops, no luck with the search! Please, try something else", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })
}


export const fetchFavoriteCityWeather = (cityKey, cityName) => {
    return axios.get(`${BASE_URL}currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
        .then(res => {
            if (res.status === 200) {
                const weatherData = {
                    cityKey: cityKey,
                    cityName: cityName,
                    temperature: res.data[0].Temperature,
                    text: res.data[0].WeatherText,
                    currentDate: res.data[0].LocalObservationDateTime
                }
                return weatherData
            }
        })

}

export const fetchFavoriteCitiesData = (cities) => (dispatch) => {
    dispatch(setLoading(true))
    Promise.all(cities.map((city) => {
        return fetchFavoriteCityWeather(city.cityKey, city.cityName)
    })).then(res => {
            dispatch(setFavoriteCities(res))
            dispatch(setLoading(false))
    }).catch(() => {
        toast.error("Unfortunately, didn't manage to get your favorite cities weather information! Please, try again later.", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    })
}

export const fetchCurrentUserLocation = (lat, lng) => (dispatch) => {
    axios.get(`${BASE_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`)
        .then(({data}) => {
            dispatch(setCurrentCity({key: data.Key, name: data.EnglishName }))
        })
        .catch(() => {
            toast.error("Unfortunately, didn't manage to get your current location!", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })
}
