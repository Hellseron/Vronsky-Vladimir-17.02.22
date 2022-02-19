import React from "react";
import SearchBlock from "../../components/SearchBlock";
import {useSelector} from "react-redux";
import styled from "styled-components";
import CurrentWeatherBlock from "../../components/CurrentWeatherBlock";
import cityView from './assets/city.jpg'
import {Row, Col} from 'antd'
import ForecastList from "../../components/Forecast/ForecastList";
import Container from "../../components/Container";
import Spinner from "../../components/Spinner"



const HomePage = () => {

    const {key,
        cityName,
        currentWeatherData,
        forecastData,
        searchList
    } = useSelector(({weatherReducer}) => weatherReducer)
    const {isCelsius} = useSelector(({settingsReducer}) => settingsReducer)


    return (

        <PageWrapper>
            <BGImage>
                <img src={cityView} alt=""/>
            </BGImage>
            <Container>
                <SearchBlock searchList={searchList}/>
                {
                    !currentWeatherData ||  !forecastData ?
                        <Spinner/>
                      :
                        <WeatherBlockWrapper  className="animate__animated animate__slideInLeft" >
                            <Row>
                                <Col xl={{span: 7, offset: 0}} lg={{span: 8, offset: 0}}
                                     sm={{span: 14, offset: 0}}
                                     md={{span: 10, offset: 0}} xs={{span: 22, offset: 1}}>
                                    <CurrentWeatherBlock  cityName={cityName} weather={currentWeatherData} cityKey={key}/>
                                </Col>
                            </Row>
                            <ForecastList isCelsius={isCelsius} forecast={forecastData}/>

                        </WeatherBlockWrapper>

                }

            </Container>
        </PageWrapper>

    )
}

const PageWrapper = styled.div`
  position: relative;

`

const BGImage = styled.div`
  position: absolute;
  object-fit: cover;
  width: 100%;

  img {
    width: 100%;
  }
`
const WeatherBlockWrapper = styled.div`
  z-index: 1;
`


export default HomePage;