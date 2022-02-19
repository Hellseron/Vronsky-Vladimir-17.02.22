import React from "react";
import styled from "styled-components";
import {Spin} from 'antd'

const Spinner = () => {
    return(
        <SpinnerWrapper>
            <Spin size={'large'}/>
        </SpinnerWrapper>
    )
}


const SpinnerWrapper=styled.div`
  display: flex;
  justify-content: center;

  .ant-spin-dot {
    font-size: 50px;
  }

  i {
    background-color: #fcfcfc;
    width: 25px !important;
    height: 25px !important;
  }

`

export default Spinner