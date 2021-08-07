import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {
  render() {
    return (
      <>

        {this.props.showCard &&
          this.props.weatherData.map(weather => {
            return (<Card style={{ border: 'groove', width: '500px' }} >
              <Card.Header as="h5">
                {weather.date}
              </Card.Header>

              <Card.Header as="h5">
                {weather.description}
              </Card.Header>
            </Card>
            )
          })
        }

      </>
    )
  }
}

export default Weather;