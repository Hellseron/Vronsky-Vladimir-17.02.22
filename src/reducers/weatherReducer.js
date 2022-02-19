

const initialState = {
    key: null,
    cityName: 'Tel Aviv',
    currentWeatherData: null,
    forecastData: null,
    isLoading: true ,
    searchList: null,
}



const weatherReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CITY_NAME' : {
            return {
                ...state,
                cityName: action.name
            }
        }
        case 'SET_CURRENT_CITY_KEY': {
            return {
                ...state,
                key: action.id
            }
        }
        case 'SET_LOADING':
            return{
                ...state,
                isLoading: action.isLoading
            }

        case 'SET_CURRENT_WEATHER_DATA': {
            return {
                ...state,
                currentWeatherData: action.data
            }
        }

        case "SET_FORECAST" :{
            return {
                ...state,
                forecastData: action.forecastData
            }
        }
        case "SET_SEARCH_LIST": {
            return {
                ...state,
                searchList: action.searchList
            }
        }

        default: return state
    }
}

export default weatherReducer