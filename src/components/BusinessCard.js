import React, { Component } from "react";
import styled from "styled-components";

const CardBox = styled.div`
  margin-top: 16px;
  width: 28vw;
  position: relative;
  left: 2vw;
  .index-head {
    height: 30px;
  }
  .inner-box {
    height: 33vw;
    overflow: auto;
    background-color: white;
    border: 1px solid black;
    box-shadow: 1px 3px 8px -1px black;
  }
`;
class BusinessCard extends Component {
    componentDidMount(){
       console.log(this.props.index)
       console.log(this.props.business)
        console.log(this.props.business[this.props.index])
    }
  render() {
      
      const index = this.props.index
      
    return (
      <CardBox>
        <div className="index-head">{}</div>
        <div className="inner-box">Stuff</div>
      </CardBox>
    );
  }
}

export default BusinessCard;
