import React from 'react';
import { connect } from 'react-redux'
import { fetchTrips, showModal } from '../actions/index'
import UserTrips from '../components/UserTrips'
import NewTripForm from '../components/NewTripForm'
import { Button, Modal } from 'react-bootstrap';

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchTrips(1, 'trips')
  }

  openNewTripForm = () => {
    this.props.showModal(true)
    console.log('clicked')
  }

  closeNewTripForm = () => {
    this.props.showModal(false)
    console.log('clicked')
  }

  handleSubmit = (values) => {
    fetch(`http://localhost:8080/api/users/1/trips/new`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip_start: values.trip_start,
        trip_end: values.trip_end,
        trip_title: values.trip_title,
        trip_start_location: values.start_location,
        trip_destination: values.destination
      })
    })
    .then(response => response.json())
    .catch(err => console.log(err))

    this.props.showModal(false)
  }

  render() {
    const { trips, user, modalStatus } = this.props
    return (
      <div>
        <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.openNewTripForm}
          >Create your next trip!
        </Button>
        <Modal show={ modalStatus } onHide={this.closeNewTripForm} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Create a trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewTripForm
              onSubmit={this.handleSubmit}
              user={user ? user : [ 'status': 'Please log in!' ]}
            />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <UserTrips trips={trips ? trips : [{title: 'Loading..'}]}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.userTrips,
    user: state.user,
    modalStatus: state.modalStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrips: (trip_id, trips) => dispatch(fetchTrips(trip_id, trips)),
    showModal: (status) => dispatch(showModal(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)