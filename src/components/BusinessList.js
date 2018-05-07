import React, { Component } from "react";
import styled from "styled-components";
import Business from "./Business";

const ListBox = styled.div`
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

class BusinessList extends Component {
  render() {
      const businesses = this.props.business
      console.log(businesses)
    const BusinessList = this.props.business.map(business => {
      return <Business business={business} key={business.id} mapUpdate={this.props.mapUpdate}/>;
    });
    return (
      <ListBox>
        <div className="index-head">Complete Business Index</div>
        <div className="inner-box">{BusinessList}</div>
      </ListBox>
    );
  }
}

export default BusinessList;
