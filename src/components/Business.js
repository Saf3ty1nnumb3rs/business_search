import React, { Component } from "react";
import styled from "styled-components";

const BusBox = styled.div`
  margin: 5px auto;

  button {
    display: flex;
    justify-content: space-between;
    font-family: "Anton", sans-serif;
    font-size: 14px;
    width: 100%;
    height: 100%;
    border: none;
  }
  .left {
    margin-left: 1vw;
  }
  .right {
    margin-right: 1vw;
  }
`;

class Business extends Component {

    handleClick = (business) => {
        this.props.mapUpdate(business)
    }

  render() {
    const business = this.props.business;
    const bus = business.attributes
    return (
      <BusBox>
        <button onClick={() => this.handleClick(business)}>
          {" "}
          <div className="left"> {bus.business_name}</div>
          <div className="right">
            {bus.city}, {bus.state}
          </div>
        </button>
      </BusBox>
    );
  }
}

export default Business;
