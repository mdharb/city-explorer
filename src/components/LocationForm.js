import React, { Component } from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenCity: '',
      lon: '',
      lat: '',
      weatherData: [],
      showLocation: false,
      errorDisplay: false,
      errorMessage: 'Select existed city!'
    };
  }

  gettingCity = async (event) => {

    event.preventDefault();
    let city = event.target.cityName.value;
    let url = (`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${city}&format=json`);

    try {
      let response = await axios.get(url);
      let locationIqData = response.data[0];
      let splittedCityName = locationIqData.display_name.split(',')[0];
      let weatherForecast = await axios.get(`${process.env.REACT_APP_LOCATION_SERVER_URL}/weather?searchQuery=${splittedCityName}&lat=${locationIqData.lat}&lon=${locationIqData.lon}`);


      this.setState({
        chosenCity: response.data[0].display_name,
        lon: response.data[0].lon,
        lat: response.data[0].lat,
        showLocation: true,
        weatherData: weatherForecast.data
      });

    } catch (e) {
      this.setState({
        showLocation: false,
        errorDisplay: true
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


        <p className="name">{this.state.chosenCity}</p>
        <p className="name">{this.state.lat}</p>
        <p className="name">{this.state.lon}</p>

        {
          this.state.showLocation &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.lat},${this.state.lon}`} alt='map' />
        }

        {
          this.state.weatherData.map(weather => {
            return (
              <ul>
                <li>{weather.valid_date}</li>
                <li>{weather.description}</li>
                </ul>
            )
          })
        }

        {
          this.state.errorDisplay &&
          <p>{this.state.errorMessage}</p>
        }


      </>
    );
  }
}

export default LocationForm;
