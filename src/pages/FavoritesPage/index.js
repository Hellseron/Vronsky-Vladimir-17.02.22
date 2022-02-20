import React, {useEffect, useCallback} from "react";
import styled from "styled-components";
import {Row,Col} from "antd"
import Container from "../../components/Container";
import CurrentWeatherBlock from "../../components/CurrentWeatherBlock";
import {Link} from "react-router-dom"
import {Spinner} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavoriteCitiesData, setCurrentCity} from "../../actions";

const FavoritesPage = () => {

    const dispatch = useDispatch()
    const {isLoading} = useSelector(({weatherReducer}) => weatherReducer)
    const favoriteCities = useSelector(({favoritesReducer})=> favoritesReducer.favoriteCitiesList )
    const favoriteCitiesData = useSelector(({favoritesReducer})=> favoritesReducer.favoriteCitiesData )

    useEffect(()=>{
        dispatch(fetchFavoriteCitiesData(favoriteCities))
    },[favoriteCities])

    const renderFavoritesData = useCallback(
        (favoriteCitiesData) => {
            return favoriteCitiesData.map((item, i) => {
                return (
                    <Col key={i} xs={24} md={8} lg={12} xl={6} sm={12}>
                        <Link to="/">
                        <CardWrapper onClick={()=> dispatch(setCurrentCity({key: item.cityKey, name: item.cityName} ))}>
                            <CurrentWeatherBlock  cityKey={item.cityKey} weather={item} cityName={item.cityName}/>
                        </CardWrapper>
                        </Link>
                    </Col>
                )
            })
        }, []
    )
    return (
        <PageWrapper>
            <Title>
                Here you can check the weather of your favorite cities any time.
            </Title>
            <Container className="animate__animated animate__fadeIn">
                {isLoading ? <Spinner/>
                :  <>


                            {favoriteCitiesData.length>0?
                                    <Row className="none" gutter={[16,16]}>{renderFavoritesData(favoriteCitiesData)} </Row>
                                :
                                <Text className="animate__animated animate__fadeIn" >No favorite cities now. You can add them on the Home page</Text>
                            }
                    </>
                }

            </Container>

        </PageWrapper>
    )
}
const PageWrapper = styled.div`
  padding: 20px 0;
  min-height: 60vh;
  background-color: ${p=>p.theme.color.primary_third};
`
const Title = styled.h2`
  padding: 0;
  color: ${p=>p.theme.color.text_secondary};
  text-align: center;
`

const CardWrapper= styled.div`
z-index: 1;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`

const Text = styled.div`
  margin-top: 50px;
  color: ${p=>p.theme.color.text};
  font-size: 16px;
  text-align: center
`

export default FavoritesPage