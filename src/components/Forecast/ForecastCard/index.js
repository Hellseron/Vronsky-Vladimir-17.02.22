import React  from "react";
import styled from "styled-components";
import WeatherIcon from "../../WeatherIcons";
import moment from "moment";
import {Row, Col} from 'antd'


const ForecastCard=({cardData, isCelsius, delay})=>{
    const {Date, Temperature: {Maximum, Minimum}, Day:{IconPhrase}} = cardData
    const metric = isCelsius? "°С" : "°F"
    const day = moment(Date).format("dddd")
    return(
        <Wrapper className={`animate__animated animate__fadeInLeft animate__delay-${delay}s  `}>
            <Title>{day}</Title>
            <WeatherBlock>
                <Temperature>
                    <TemperatureTitle>
                        <Row>
                            <Col md={12} xs={12}>
                              Night
                            </Col>
                            <Col md={12} xs={12}>
                                Day
                            </Col>
                        </Row>
                    </TemperatureTitle>

                    {`${Math.round(Minimum.Value)}${metric}  /  ${Math.round(Maximum.Value)}${metric}`}
                </Temperature>
                <IconContainer>
                    <WeatherIcon text={IconPhrase}/>
                </IconContainer>
                <WeatherInfo>
                    {IconPhrase}
                </WeatherInfo>
            </WeatherBlock>

        </Wrapper>
    )
}


const Wrapper =styled.div`
  background-color: ${p => p.theme.color.primary_dark};
  border-radius: 10px;
  color: ${p => p.theme.color.text};
  text-align: center;
  transition: background-color 0.3s;
 .animated{
   -webkit-animation-duration: 0.6s;
   animation-duration: 0.6s;
   -webkit-animation-fill-mode: both;
   animation-fill-mode: both;
}
`

const Title =styled.h2`
  border-radius: 10px 10px 0 0;
  background-color: ${p => p.theme.color.primary_light};
  color: ${p => p.theme.color.text};
  font-size: 16px;
  padding: 5px;
  transition: background-color 0.3s;
`

const WeatherBlock = styled.div`
`

const Temperature = styled.div`
  font-size: 30px;
`

const TemperatureTitle = styled.div`
  font-size: 12px;
`

const IconContainer = styled.div`
  font-size: 40px;
  color: ${p => p.theme.color.icons};
`

const WeatherInfo = styled.div`
  font-size: 14px;
  padding-bottom: 15px;
`

export default ForecastCard