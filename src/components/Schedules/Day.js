import React from 'react';
import Item from './Item';

const Day = props => {
  return (
    <span>
      <p>{props.date}</p>
      <ul>
          {props.scheduleday.map(schedule => {
            return (
              <li className="assignment">
                  <Item scheduleitem={schedule} />
              </li>
            );
          })}
        </ul>
    </span>

  );
};

export default Day;
