const initialState = {
    favoriteCitiesList: [],
    favoriteCitiesData: [],

}

const favoritesReducer = (state = initialState, action) => {
    switch (action.type){
        case "ADD_FAVORITE_CITY" : {
            return {
                ...state,
                favoriteCitiesList: [
                    ...state.favoriteCitiesList,
                    action.city
                ]
            }
        }
        case "REMOVE_FAVORITE_CITY" :{
            const newArray = [...state.favoriteCitiesList]
            const removeIndex = newArray.findIndex((item) => item.cityKey === action.cityKey)
            newArray.splice(removeIndex,1)
            return {
                ...state,
                favoriteCitiesList: newArray
            }
        }
        case "SET_FAVORITE_CITIES": {
            return {
                ...state,
                favoriteCitiesData: action.cities
            }
        }
        default : {
            return state
        }
    }
}

export default favoritesReducer