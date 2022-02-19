import React from "react";
import { FaRegSnowflake, FaCloudRain, FaCloud, FaSun, FaWind, FaMoon } from 'react-icons/fa';
import { WiAlien } from "react-icons/wi";


const WeatherIcon = ({text}) => {

        text= text.toLowerCase()

        if (text.indexOf('snow')>=0 || text.indexOf('flurries')>=0) {
            return <FaRegSnowflake />
        }
        else if (text.indexOf('sun')>=0) {
            return  <FaSun/>
        }
        else if (text.indexOf('rain')>=0 || text.indexOf('shower')>=0) {
            return <FaCloudRain/>
        }
        else if (text.indexOf('cloud')>=0) {
            return  <FaCloud/>
        }
        else if (text.indexOf('wind')>=0) {
            return  <FaWind/>
        }
        else if (text.indexOf('clear')>=0) {
            return  <FaMoon/>
        }else {
            return <WiAlien/>
        }

}



export default WeatherIcon