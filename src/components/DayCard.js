import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import DayEvents from './DayEvents'
import { showDayDropdown } from '../actions/days'
import { loginUser } from '../actions/users'


class DayCard extends React.Component {
  constructor(props) {
    super(props);
  }


  handleShowEvents = () => {
    if (this.props.showEventsForDay) {
      this.props.showDayDropdown(null)
    } else {
      this.props.showDayDropdown(this.props.day.id)
    }
  }


  render(){
    let date = moment.utc(this.props.day.date).format("DD MMM YYYY");
    let dayEndLoc;

    if (this.props.day.day_start_location === this.props.day.day_end_location) {
      dayEndLoc = '';
    } else {
      dayEndLoc = this.props.day.day_end_location
    }

    return (
      <div className="day-card" >

        <div className="day-card-container">

          <img className="day-card-img" src={this.props.day.day_img_url}/>

          <header className="day-card-header">
            <p>{this.props.day.day_start_location}</p>
            <p>{dayEndLoc}</p>
          </header>

          <div className="day-card-details">
            <div className="day-card-dates">
              <div style={{'fontSize':'20px'}} > {date}</div>
            </div>
          </div>

          <footer className="day-card-footer">
            <button className="show-events" type="button" onClick={this.handleShowEvents}>&#8681;</button>
          </footer>

        </div>

        <DayEvents className={this.props.showEventsForDay === this.props.day.id ? "event-dropdown" : ""} events={this.props.events} day={this.props.day}/>

      </div>
    )
  }
}

DayCard.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    showEventsForDay: state.showEventsForDay
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showDayDropdown: (id) => dispatch(showDayDropdown(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayCard)
