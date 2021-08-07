import React, { Component } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';


import Map from './Map';
import Weather from './Weather';
import Movies from './Movies';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      lon: '',
      lat: '',
      weatherData: [],
      moviesData: [],
      showLocation: false,
      errorDisplay: false,
      errorMessage: 'Select existed city!',
      showCard: false
    };
  }

  gettingCity = async (event) => {
    event.preventDefault();

    let searchQuery = event.target.cityName.value;
    let url = (`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${searchQuery}&format=json`);

    try {
      let responseLocation = await axios.get(url);

      this.setState({
        chosenCity: responseLocation.data[0].display_name,
        lon: responseLocation.data[0].lon,
        lat: responseLocation.data[0].lat,
        showLocation: true,
        showCard: true,
        errorDisplay: false
      });

      const urlServer = `${process.env.REACT_APP_LOCATION_SERVER_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${searchQuery}`
      let weatherResult = await axios.get(urlServer)
      this.setState({
        weatherData: weatherResult.data
      });

      const urlMovies = `${process.env.REACT_APP_LOCATION_SERVER_URL}/movies?searchQuery=${searchQuery}`
      let moviesResult = await axios.get(urlMovies)
      this.setState({
        moviesData: moviesResult.data
      });

    } catch (e) {
      this.setState({
        showLocation: false,
        errorDisplay: true,
        showCard: true
      });
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.gettingCity}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control name='cityName' type="text" placeholder="City name" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>

        <Map
          chosenCity={this.state.displayName}
          lon={this.state.lon}
          lat={this.state.lat}
          showLocation={this.state.showLocation}
          errorDisplay={this.state.errorDisplay}
          errorMessage={this.state.errorMessage}
          showCard={this.state.showCard}

        />
        <Weather showCard={this.state.showCard} weatherData={this.state.weatherData}></Weather>

        <Movies showCard={this.state.showCard} moviesData={this.state.moviesData}></Movies>

      </>
    );
  }
}

export default LocationForm;
