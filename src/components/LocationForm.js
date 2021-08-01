import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class LocationForm extends Component {

    submittedCity = (event) => {
        
        event.preventDefault();
        let city = event.target.cityName.value
        console.log(city);
    }

    render() {
        return (
            <div>
                <Form onSubmit = {this.submittedCity}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>City</Form.Label>
                        <Form.Control  name='cityName' type="text" placeholder="Name of city" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Explore
                    </Button>
                </Form>
            </div>
        )
    }
}

export default LocationForm
