import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <>
        <h3>Weather</h3>
        {this.props.weather.map(weather => <>
            <h3>{weather.date}</h3>
            <p>{weather.description}</p>
          </>
          )}
      </>
    )
  }
}

export default Weather; 