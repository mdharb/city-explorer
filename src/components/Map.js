import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

class Map extends React.Component {

    render() {

        return (
            <>
                {this.props.showCard &&
                    <div class="card" style={{ width: '22rem', border: '1px solid black ', color: 'pink' }}>
                        <div class="card-header">
                            <h2> {this.props.chosenCity}</h2>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" style={{ border: '1px solid black ', color: 'green' }}>
                                <h6>{this.props.lon}</h6></li>
                            <li class="list-group-item" style={{ border: '1px solid black ', color: 'green' }}>
                                <h6>{this.props.lat}</h6></li>
                        </ul>
                    </div>
                }
                {this.props.showLocation &&
                    <div class="card" style={{ width: "30rem" }}>
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.props.lat},${this.props.lon}`} alt='map' />
                        <div class="card-body">
                            <p class="card-text">
                                {this.props.lon} , {this.props.lat}
                            </p>
                        </div>
                    </div>
                }
                {
                    this.props.errorDisplay &&
                    this.props.errorMessage
                }

            </>

        )

    }



}

export default Map;