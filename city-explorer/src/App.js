import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LocationForm from './components/LocationForm';

export class App extends Component {
  render() {
    return (
      <div>
        <LocationForm />
      </div>
    )
  }
}

export default App
