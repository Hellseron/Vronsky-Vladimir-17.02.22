import React from "react";
import {Row, Col} from 'antd'
import styled from "styled-components";
import ForecastCard from "../ForecastCard";


const ForecastList =({forecast, isCelsius})=>{
    const forecastRender =()=>{
        return forecast.map((day,i)=>{
            return (
                <Col key={i} lg={4} md={7} xs={11}>
                    <ForecastCard  delay={i} isCelsius={isCelsius} cardData={day}/>
                </Col>
            )
        })
    }
    return(
        <Wrapper>
            <StyledRow justify={'space-between'} gutter={[0, 20]}>
                {forecastRender(forecast)}
            </StyledRow>
        </Wrapper>
    )
}


const Wrapper= styled.div`
`

const StyledRow= styled(Row)`
 
`


export default ForecastList