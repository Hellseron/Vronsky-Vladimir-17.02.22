import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css'
import {Header} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import { DarkTheme } from "./theme/darkTheme";
import { GlobalTheme} from "./theme/globalTheme";
import { LightTheme} from "./theme/lightTheme";
import {HomePage, FavoritesPage} from "./pages";
import {GlobalStyle} from "./theme/globalStyle";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {
    fetchForecast,
    fetchCurrentWeather,
    fetchCurrentUserLocation,
    setCurrentCityKey,
    setCurrentCityName
} from "./actions";


function App() {

    const TelAvivCityKey = 215854
    const dispatch = useDispatch();
    const isDarkTheme = useSelector(({settingsReducer})=>settingsReducer.isDarkTheme)
    const {key} = useSelector(({weatherReducer}) => weatherReducer)
    const {isCelsius} = useSelector(({settingsReducer}) => settingsReducer)

    const compTheme = (isDark) => {
        const themeColor = isDark  ? DarkTheme : LightTheme
        return {
            ...GlobalTheme,
            ...themeColor
        }
    }



    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            dispatch(fetchCurrentUserLocation(position.coords.latitude, position.coords.longitude))
        },()=> {
            dispatch(setCurrentCityKey(TelAvivCityKey))
            dispatch(setCurrentCityName("Tel Aviv"))
        })
    },[])

    useEffect(() => {
        if(key){
            dispatch(fetchCurrentWeather(key))
        }

    }, [key])

    useEffect(() => {
        if(key){
            dispatch(fetchForecast(key, isCelsius))
        }
    }, [key,isCelsius])
  return (
          <ThemeProvider theme={ compTheme(isDarkTheme)}>
              <AppWrapper>
                  <GlobalStyle />
                  <BrowserRouter>
                      <Header/>
                      <Routes>
                          <Route path="/" element={<HomePage/>} exact/>
                          <Route path="/favorites" element={<FavoritesPage/>} exact/>
                      </Routes>
                  </BrowserRouter>
                  <ToastContainer
                  />
              </AppWrapper>
          </ThemeProvider>
  );
}

const AppWrapper= styled.div`
  background-color: ${p => p.theme.color.primary};
`




export default App;
