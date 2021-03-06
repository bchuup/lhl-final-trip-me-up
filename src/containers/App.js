import React from 'react';
import { connect } from 'react-redux'
import { fetchTrips, fetchDays, fetchUser, loginUser, logoutUser, fetchNotifications } from '../actions/index'
import Navigation from '../components/Navigation'
import User from './User'
import Home from '../components/Home'
import { Link } from 'react-router'


class App extends React.Component {

  componentDidMount() {
  }

  render() {
    const { trips, user, days, loginUser, logoutUser, isAuthenticated, errorMessage } = this.props
    return (
      <div>
        <Navigation
          user={user ? user : ['first_name': 'sign in']}
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          loginUser={loginUser}
          logoutUser={logoutUser}
          fetchNotifications={fetchNotifications}
        />
        { isAuthenticated ? null : <Home /> }
        {this.props.children}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.userTrips,
    days: state.tripDays,
    user: state.user,
    modalStatus: state.modalStatus,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchNotifications: (user_id) => dispatch(fetchNotifications(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
