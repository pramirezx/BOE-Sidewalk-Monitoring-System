import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polyline } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  
  onMarkerClick = (props, marker, e) =>(
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    },
    () => this.props.handler(props)
  ));

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    var points = []
    for(var i = 0 ; i < this.props.closestSidewalk.Shape.points.length; i++){
      points.push({
        lat: this.props.closestSidewalk.Shape.points[i].y,
        lng: this.props.closestSidewalk.Shape.points[i].x
      })
    }
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        className={'map'}
        initialCenter={ this.props.currentLocation }
        center={ this.props.currentLocation }
      >
        {this.props.allRoverData.map(marker => (
          <Marker
            position={{lat: marker.Shape.points[0].y, lng: marker.Shape.points[0].x}}
            key={marker.ID}
            name={this.props.closestSidewalk.SIDEWALK_ID}
            marker={marker}
            onClick={this.onMarkerClick}
          />
        ))}
        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>SidewalkID: {this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
        <Polyline
          path={points}
          // strokeColor="#0000FF"
          // strokeOpacity={0.8}
          // strokeWeight={2} />
          />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBhjZcRCd4OEOf2NtnaUdIQveG-qUVnPvg"
  // apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE'
})(MapContainer);
