import React, { Component } from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenCity: '',
      longitude: '',
      latitude: '',
      showLocation: false,
      errorDisplay: false,
      errorMessage: 'Select existed city!'
    };
  }

  gettingCity = async (event) => {

    event.preventDefault();
    let city = event.target.cityName.value;

    try {
      let response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}=${city}&format=json`);
      console.log(response.cityData[0].display_name);
      console.log(city);

      this.setState({
        chosenCity: response.cityData[0].display_name,
        longitude: response.cityData[0].lon,
        latitude: response.cityData[0].lat,
        showLocation: true
      });
      console.log(response.cityData[0].display_name);
    } catch {
      this.setState({

        showLocation: false,
        errorDisplay: true
      });
    }
  }
  
  render() {
    console.log(this.state);
    return (
      <>
      <div>
        <Form onSubmit={this.gettingCity}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control name='cityName' type="text" placeholder="City name" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>
        </div>

        <p>{this.state.chosenCity}</p>
        {
          this.state.showLocation &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.a10de6b9367d6edc81178a904969c1de&center=${this.state.lat},${this.state.lon}`} alt='map' />
        }

        {
          this.state.errorDisplay &&
          this.state.erroMessage
        }
        </>
    );
  }
}

export default LocationForm;
