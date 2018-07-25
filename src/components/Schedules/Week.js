import React from 'react';
import Day from './Day';
import moment from 'moment';

const Week = props => {
  const days = Object.keys(props.scheduleweek);
  days.sort(function(a,b) {
    return moment(a)-moment(b);
  }); 
  console.log(days);

  	return (
    	<ul className="week">
    		{days.map(date => {
    			return (
    				<li className="day">
                <Day scheduleday={props.scheduleweek[date]} date={date} />
      			</li>
    			);
  			})}
    	</ul>
    );
};

export default Week;
