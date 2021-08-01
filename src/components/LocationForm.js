import React, { Component } from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LocationForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      cityData: {},
      longitude: null,
      latitude: null
    };
  }

    gettingCity = async (event) => {

      event.preventDefault();
      let city = event.target.cityName.value;
      let response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}=${city}&format=json`);
      console.log(response.cityData[0].display_name);
      console.log(city);

      this.setState({
        cityData: response.cityData[0].display_name,
        longitude: response.cityData[0].lon,
        latitude: response.cityData[0].lat
      });
    }

    render() {
      return (
          <div>
          <Form onSubmit = {this.gettingCity}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control name='cityName' type="text" placeholder="City name" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Explore
            </Button>
          </Form>
          </div>
      );
    }
}

export default LocationForm;
