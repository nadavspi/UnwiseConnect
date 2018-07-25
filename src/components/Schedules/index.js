import * as togglActions from '../../actions/toggl';
import React, { Component } from 'react';
import moment from 'moment';
import Week from './Week';
import SummaryGraph from './SummaryGraph';
import Summary from './Summary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import * as ScheduleActions from '../../actions/schedules';

class Schedules extends Component {
  constructor() {
    super();
    this.currentDate = moment();
    this.currentDev = "";
    this.schedules = this.schedules.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.lastWeek = this.lastWeek.bind(this);
    this.scheduleSummary = this.scheduleSummary.bind(this);

  }

  schedules(developer) {
    this.currentDev = developer;
    this.props.dispatch(ScheduleActions.updateScheduleForDeveloper({ 'developer' : developer, 'date' : this.currentDate.format("YYYY-MM-DD")}));
    
  }

  scheduleSummary() {
    this.props.dispatch(ScheduleActions.updateScheduleSummary({'date' : this.currentDate.format("YYYY-MM-DD")}));
    
  }

  nextWeek() {
    
    this.currentDate = this.currentDate.add(7, 'days');
    console.log(this.currentDate);
    if (this.props.schedule.mode == "summary") {
      this.scheduleSummary();
    } else {
      this.schedules(this.currentDev);
    }
  }

  lastWeek() {
    console.log("Last Week");
    this.currentDate = this.currentDate.add(-7, 'days');
    if (this.props.schedule.mode == "summary") {
      this.scheduleSummary();
    } else {
      this.schedules(this.currentDev);
    }
  }

  componentDidMount() {
    this.scheduleSummary();
  }

 

  render() {
    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
          <div>
                <button onClick={this.nextWeek}>Next Week</button>
                <button onClick={this.lastWeek}>Last Week</button>
                </div>
           <h4>Ticket Center
              {this.props.schedule.loading ? (
                <small> Loading schedule</small>
              ) : (

                this.props.schedule.mode == "developer" ? (
                  <div className="schedule">
                  <button onClick={this.scheduleSummary}>Summary</button>
                    <SummaryGraph scheduleAggregate={this.props.schedule.scheduleAggregate.scheduleAggregate} />
                    <small> {this.props.schedule.developer.developer} schedule </small>
                    <Week scheduleweek={this.props.schedule.groupedAggregate.developerTimes[0].scheduleitems} />
                  </div>
                ) : (
                  
                  <div className="schedule">
                    
                    <Summary scheduleAggregate={this.props.schedule.scheduleAggregate.scheduleAggregate} scheduleLoad={this.schedules}  />                
                  </div>
                )
                
              )}

            </h4>
          </div>
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  schedule: state.schedule,
});


export default connect(mapStateToProps)(Schedules);
