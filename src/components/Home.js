import React, { Component } from "react";
import BusinessList from "./BusinessList";
import BusinessByState from "./BusinessByState";
import Navbar from './Navbar'
import Maps from "./Maps";
import styled from "styled-components";

const HomeWrap = styled.div`
  .lists {
    display: flex;
  }
`;

class Home extends Component {
    state = {
        business: 'Groundfloor',
        newLat: '',
        newLng: '',
        bus: INITIAL_BUSINESS
    }
  
    mapUpdate = async(business) => {
        console.log(business)
        const bus= business.attributes
        await this.setState({
            business_name: bus.business_name,
            newLat: bus.latitude ,
            newLng: bus.longitude,
            bus: business
        })
        await this.child.geocodeLatLng()
    }
  render() {
    return (
      <HomeWrap>
        <Navbar business={this.props.business} mapUpdate={this.mapUpdate} />
        <div className="lists">
          <BusinessList business={this.props.business} mapUpdate={this.mapUpdate} />
          <Maps newLat={this.state.newLat} newLng={this.state.newLng} business={this.state.business_name} onRef={ref => (this.child = ref)} bus={this.state.bus}/>
          <BusinessByState business={this.props.business} mapUpdate={this.mapUpdate} />
        </div>

       
      </HomeWrap>
    );
  }
}

export default Home;

const INITIAL_BUSINESS = {
  id: 500,
  attributes: {
    business_name: 'Groundfloor',
    city: 'Atlanta',
    state: 'Georgia',
    latitude: 33.777443,
    longitude: -84.389123
  },
  type: 'businesses'

}



  
  