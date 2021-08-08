import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'


class Movies extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moviesData: this.props.moviesData
        }
    }

    render() {
        return (
            <>
                {
                    this.props.showCard &&
                    this.props.moviesData.map(element => {
                        return (<Card style={{ border: 'groove', width: '860px' }} >
                            <Card.Header as="h5">
                                {element.title}
                            </Card.Header>

                            <Card.Text>
                            {element.overview}
                            </Card.Text>

                        </Card>
                        )
                    })
                }
            </>
        )
    }


}

export default Movies;