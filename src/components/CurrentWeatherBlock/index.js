import React from "react";
import styled from "styled-components";
import {breakpoint} from "styled-components-breakpoint";
import WeatherIcon from "../WeatherIcons";
import {Row, Col, Tooltip} from 'antd'
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import moment from "moment";
import {addFavoriteCity, removeFavoriteCity} from "../../actions";
import {useDispatch, useSelector} from "react-redux";


const CurrentWeatherBlock = ({cityName, weather, cityKey }) => {
    const dispatch = useDispatch()
    const isCelsius = useSelector(({settingsReducer}) => settingsReducer.isCelsius)
    const favoriteCities = useSelector(({favoritesReducer})=>favoritesReducer.favoriteCitiesList)
    const isFavorite = favoriteCities.find((item) =>  item.cityKey === cityKey)
    const day = moment(weather.currentDate).format("dddd")
    const date = moment(weather.currentDate).format("MMM Do")

    return (
        <Wrapper>
            <Title>
                <div>
                    {day}
                </div>
                <div>
                    {date}
                </div>
            </Title>
            <InfoBlock>
                <CityName>
                    {cityName}
                    <ButtonFavorite  >
                            {
                                isFavorite ?
                                    <Tooltip title="Remove from favorites" color={'blue'} >
                                         <FaHeart  onClick={(e)=>{e.preventDefault(); dispatch(removeFavoriteCity(cityKey))}}/>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Add to favorites" color={'blue'} >
                                        <FaRegHeart onClick={(e)=>{e.preventDefault();dispatch(addFavoriteCity({cityKey, cityName}))}}/>
                                    </Tooltip>

                            }
                    </ButtonFavorite>

                </CityName>

                <WeatherBlock>
                    <Row>
                        <Col xs={10} md={12} >
                            <Temperature>
                                {isCelsius ?
                                    `${Math.round(weather.temperature.Metric.Value)}°С`
                                    :
                                    `${Math.round(weather.temperature.Imperial.Value)}°F` }
                            </Temperature>
                        </Col>
                        <Col xs={{span: 12, offset:2}} md={10}>
                            <IconContainer>
                                <WeatherIcon text={weather.text}/>
                            </IconContainer>
                        </Col>
                    </Row>
                </WeatherBlock>
                <WeatherInfo>
                    {weather.text}
                </WeatherInfo>
            </InfoBlock>
        </Wrapper>
    )
}


const Wrapper = styled.div`
  background-color: ${p => p.theme.color.primary_light};
  color: ${p => p.theme.color.text};
  border-radius: 10px;
  margin-bottom: 40px;
  transition: background-color 0.3s;
  
`

const InfoBlock = styled.div`
  padding: 20px;
`

const CityName = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Temperature = styled.div`
  font-size: 50px;
  ${breakpoint('xs', 'xl')`
     font-size: 45px;
  `};
 
`
const Title = styled.div`
  border-radius: 10px 10px 0 0;
  padding: 8px 20px;
  text-align: left;
  background-color: ${p => p.theme.color.primary_dark};
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-between;
  
`

const WeatherBlock = styled.div`
  margin-bottom: 10px;
`
const IconContainer = styled.div`
  font-size: 60px;
  color: ${p => p.theme.color.icons};
`

const WeatherInfo = styled.div`
  text-align: left;
  font-size: 16px;
`

const ButtonFavorite =styled.div`
  z-index: 999;
  color: #a80959;
  cursor: pointer;
`


export default CurrentWeatherBlock;