import React, { Component } from "react";
import StateSearch from "./StateSearch";
import Business from "./Business";
import styled from "styled-components";

const StateBox = styled.div`
  margin-top: 16px;
  width: 28vw;
  position: relative;
  z-index: 0;
    right: 2vw;
  .inner-box {
    height: 33vw;
    overflow: auto;
    background-color: white;
    border: 1px solid black;
    box-shadow: 1px 3px 8px -1px black;
  }
`;

class BusinessByState extends Component {
  state = {
    search: ""
  };

  updateSearch = event => {
      event.preventDefault()
    this.setState({ search: event.target.value.substr(0, 20) });
  };

  render() {
    const businesses = this.props.business;
    let filteredBusinesses = businesses.filter(business => {
      return (
        business.attributes.state
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    let stateBusinesses = filteredBusinesses.map(business => {
      return <Business business={business} key={business.id} mapUpdate={this.props.mapUpdate} />;
    });
    
    return (
      <StateBox>
        <StateSearch
          search={this.state.search}
          updateSearch={this.updateSearch}
        />
        {stateBusinesses.length === 0 ? (
          <div className="inner-box">
            {" "}
            No results found for {this.state.search}
          </div>
        ) : (
          <div className="inner-box">{stateBusinesses}</div>
        )}
      </StateBox>
    );
  }
}

export default BusinessByState;
