import React, { Component } from "react";
import styled from "styled-components";
import Business from "./Business";

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  componentDidMount() {}

  showBusiness = () => {};

  updateSearch = event => {
    event.preventDefault();
    this.setState({ query: event.target.value.substr(0, 20) });
    console.log(this.state.query);
  };

  render() {
    const businesses = this.props.business;
    let filteredBusinesses = businesses.filter(business => {
      return (
        business.attributes.business_name
          .toLowerCase()
          .indexOf(this.state.query.toLowerCase()) !== -1
      );
    });
    let autoBusinesses = filteredBusinesses.map(business => {
      return (
        <li key={business.id}>
          <Business className="autocomplete-items" business={business} mapUpdate={this.props.mapUpdate} />
        </li>
      );
    });
    return (
      <FormWrap>
        <form className="autocomplete">
          <div>
            <input
              type="text"
              value={this.props.query}
              onChange={this.updateSearch}
              placeholder='Search Businesses'
            />
          </div>
        </form>
        {this.state.query.length > 1 ? <ul> {autoBusinesses}</ul> : null}
      </FormWrap>
    );
  }
}

export default Search;

const FormWrap = styled.div`
  display: block;
  position: absolute;
  top: 20px;
  form {
    display: inline;
  }
  .autocomplete {
    display: inline-flex;
  }
  input {
    border: 1px solid transparent;
    background-color: #f1f1f1;
    margin-bottom: 0;
    padding: 10px;
    font-size: 16px;
    
  }
  input[type="text"] {
    background-color: #f1f1f1;
    width: 18vw;
  }
  input[type="submit"] {
    background-color: DodgerBlue;
    color: #fff;
  }
  ul {
    position: relative;
    background: white;
    height: 5vw;
    overflow: auto;
    list-style: none;
    margin-top: 0;
    li {
      margin-left: -3vw;
      padding-left: 0;
      width: 18vw;
    }
  }
  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 200;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
 
`;
