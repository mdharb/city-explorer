import React, { Component } from 'react'
import LocationForm from './LocationForm'

export class Main extends Component {
    render() {
        return (
            <div>
                <h1>City Explorer</h1>
                <LocationForm />
            </div>
        )
    }
}

export default Main
