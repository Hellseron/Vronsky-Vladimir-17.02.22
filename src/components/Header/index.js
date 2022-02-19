import React, {useCallback, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom"
import styled from "styled-components";
import {Row, Col, Switch, Tooltip} from 'antd'
import {breakpoint} from "styled-components-breakpoint";
import {Container} from "../index";
import {setScale, setTheme} from "../../actions";

const Header = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const param = location.pathname

    const toggleTheme = useCallback(() => {
        dispatch(setTheme())
    },[])
    const toggleScale = useCallback(()=>{
        dispatch(setScale())
    },[])
    return (
        <Container>
            <HeaderWrapper>
                <Wrapper>
                    <StyledRow align={'middle'} >
                        <Col xl={16} lg={14} md={10} xs={11} sm={7}>
                            <Title>
                                Herolo Weather Task
                            </Title>
                        </Col>
                        <Col xl={4} lg={5} md={7} xs={13} sm={8}>
                            <NavMenu>
                                <Link to="/">
                                    <Button className={param === "/" && "active"}> Home </Button>
                                </Link>
                                <Link to="/favorites">
                                    <Button className={param === "/favorites" && "active"}> Favorites </Button>
                                </Link>
                            </NavMenu>
                        </Col>
                        <Col xl={4} lg={5} md={7} xs={24} sm={9}>
                            <Switches>
                                <SwitchContainer>
                                    <span>  Toggle theme </span>
                                    <Tooltip title="Better stay on the darkside!" color="blue">
                                        <Switch onChange={toggleTheme} defaultChecked/>
                                    </Tooltip>
                                </SwitchContainer>
                                <SwitchContainer>
                                    <span>  °F / °С </span>
                                    <Tooltip title="Anybody knows why are we using it?" color="blue">
                                        <Switch onChange={toggleScale} defaultChecked/>
                                    </Tooltip>

                                </SwitchContainer>
                            </Switches>

                        </Col>
                    </StyledRow>
                </Wrapper>
            </HeaderWrapper>
        </Container>
    )
}


const HeaderWrapper = styled.div`
  background-color: ${p => p.theme.color.primary};
  `
const Wrapper = styled.div`
  height: 100px;
`


const StyledRow = styled(Row)`
  height: 100%;
`

const Title = styled.h1`
  color: ${p => p.theme.color.primary_second};
  font-size: 20px;
  margin: 0;
  font-weight: bold;
  ${breakpoint('xs', 'md')`
     font-size: 14px;
  `};
`

const Button = styled.button`
  padding: 5px 15px;
  font-weight: bold;
  background-color: transparent;
  color: ${p => p.theme.color.primary_second};
  border: 1px solid ${p => p.theme.color.primary_second};
  border-radius: 18px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.5s;
  ${breakpoint('xs', 'md')`
     padding: 4px 8px;
     font-size: 14px;
  `};
  

  &:hover, &.active {
    background-color: ${p => p.theme.color.primary_second};
    color: ${p => p.theme.color.primary};
  }
`
const NavMenu = styled.div``
const SwitchContainer = styled.div`
  text-align: right;
  color: ${p => p.theme.color.text};
  padding: 5px;
  span {
    margin-right: 10px;
    color: ${p => p.theme.color.primary_second};
  }
`

const Switches =styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint("xs", "md")`
    // flex-direction: row;
    justify-content: space-between;
  `
  }
  ${breakpoint("xs", "sm")`
    flex-direction: row;
  `
  }
`

export default Header;