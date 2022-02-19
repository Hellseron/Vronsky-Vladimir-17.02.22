const initialState = {
    isDarkTheme : true,
    isCelsius: true,
}

const settingsReducer = (state = initialState, action) =>{

    switch (action.type){
        case "SET_THEME": {
            return {
                ...state,
                isDarkTheme: !state.isDarkTheme
            }
        }
        case "SET_SCALE": {
            return {
                ...state,
                isCelsius: !state.isCelsius
            }
        }
        default : {
            return state
        }

    }
}

export default settingsReducer