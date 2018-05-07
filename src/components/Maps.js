import React, { Component } from "react";
import  { Link } from 'react-router-dom'
import styled from "styled-components";
import loadJS from "loadjs";
// import GoogleMap from "./GoogleMap";
/*global google*/

class Maps extends Component {
  state = {
    lat: 33.777443,
    lng: -84.389123,
    location: {
      address: "Atlanta, GA"
    },
    isGeocodingError: false,
    foundAddress: INITIAL_LOCATION.address
  };
  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps === this.props) {
      this.setState({
        lat: this.props.newLat,
        lng: this.props.newLng
      });
      this.geocodeLatLng();
    }
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidMount() {
    this.getInitialState();
    window.initMap = this.initMap;
    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwWdWlA8jAUwM_ArlW_YP4EhYTZzETlfE&callback=initMap"
    );
    this.props.onRef(this);
  }

  initMap = () => {
    console.log("Map is initializing");
    this.map = new window.google.maps.Map(this.refs.map, {
      center: {
        lat: INITIAL_LOCATION.position.lat,
        lng: INITIAL_LOCATION.position.lng
      },
      zoom: 16
    });
    console.log(this.map);
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: this.state.lat,
        lng: this.state.lng
      }
    });

    this.geocoder = new google.maps.Geocoder();
  };

  getInitialState = initaddy => {
    this.setState({
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address
    });
  };

  getGeocode = async event => {
    event.preventDefault();
    const address = this.props.business.name;
    console.log(address);
    this.geocodeAddress(address);
  };

  geocodeLatLng = () => {
    var latlngStr = [this.props.newLat, this.props.newLng];
    console.log(latlngStr);
    var latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1])
    };
    this.geocoder.geocode(
      { location: latlng },
      function handleResults(results, status) {
        if (status === "OK") {
          console.log("handler");
          console.log(results);
          this.setState({
            foundAddress: results[0].formatted_address,
            isGeocodingError: false
          });
          console.log(results);
          console.log(status);
          this.map.setCenter(results[0].geometry.location);
          this.marker.setPosition(results[0].geometry.location);

          return;
        }

        this.setState({
          foundAddress: null,
          isGeocodingError: true
        });

        this.map.setCenter({
          lat: ATLANTIC_OCEAN.latitude,
          lng: ATLANTIC_OCEAN.longitude
        });

        this.marker.setPosition({
          lat: ATLANTIC_OCEAN.latitude,
          lng: ATLANTIC_OCEAN.longitude
        });
      }.bind(this)
    );
  };

  render() {
    return (
      <MapWrap>
        <div id="input">
          <div className="location">
            {this.state.isGeocodingError ? (
              <p className="bg-danger">Address not found.</p>
            ) : (
              <div>
                <Link to={`/business/${this.props.bus.id}`}><p className="bg-info">{this.props.business}, {this.state.foundAddress}</p></Link>
              </div>
            )}
          </div>
        </div>
        <div id="map" ref="map" />
      </MapWrap>
    );
  }
}

export default Maps;

const MapWrap = styled.div`
  width: 33vw;
  height: 33vw;
  margin: auto;
  margin-top: 48px;
  background-color: white;
  position: relative;
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.8);
  bottom: 0;
  .location {
    margin-top: 50px;
    background-color: silver;
    box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.8);
    a {
      text-decoration: none;
    }
    a:visited {
      color: black;
    }
    a:hover {
      color: white;
    }
  }
  @media (max-width: 600px) {
    .location {
      visibility: hidden;
    }
    button {
      width: 9vw;
    }
    input {
      width: 25vw;
    }
  }
  #input {
    position: absolute;
    z-index: 100;
    top: 5px;
    left: 0;
    right: 0;
    form {
      max-width: 91vw;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
    input {
      box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.8);
      margin-right: 5px;
    }
    button {
      box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.8);
      margin-left: 5px;
      background-color: silver;
      color: white;
    }
  }
`;

const ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

const INITIAL_LOCATION = {
  address: " 75 5th St NW #2170, Atlanta, GA 30308, USA",
  position: {
    lat: 33.777443,
    lng: -84.389123
  }
};
