import React from 'react';
import DeveloperGraph from './DeveloperGraph';

const Summary = props => {
  const generalChartData = props.scheduleAggregate;
  

    return (
      <ul className="developer-graph">
        {generalChartData.map(developerGraph => {
          return (
            <li className="developer-schedule" onClick={props.scheduleLoad.bind(this, developerGraph.username)}>
                <DeveloperGraph developerSeries={developerGraph}  />
            </li>
          );
        })}
      </ul>
    );

};

export default Summary;
