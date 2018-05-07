import React, { Component } from "react";
import styled from "styled-components";

const SearchWrap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  div form {
      margin: auto;
  }
`;

class StateSearch extends Component {
  render() {
    return (
      <SearchWrap>
        <div> Search By State</div>
        <div>
          <form>
            <input
              type="text"
              value={this.props.search}
              onChange={this.props.updateSearch}
            />
          </form>
        </div>
      </SearchWrap>
    );
  }
}

export default StateSearch;
