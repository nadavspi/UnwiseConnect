import Fields from './Fields';
import React, { Component } from 'react';
import classnames from 'classnames';

class Dispatch extends Component {
  constructor() {
    super();

    this.state = {
      fields: [
        {
          id: 'memberIdentifier',
          value: '',
          type: 'text',
          required: true,
        },
        {
          id: 'startDate',
          value: '2017-08-09',
          type: 'text',
          required: true,
        },
        {
          id: 'endDate',
          value: '2017-08-10',
          type: 'text',
          required: false,
        },
        {
          id: 'timezone',
          values: [
            'America/New_York',
            'America/Los_Angeles',
          ],
          value: 'America/New_York',
          type: 'select',
          require: true,
        },
        {
          id: 'startHour',
          value: 9,
          type: 'number',
          require: true,
        },
        {
          id: 'daily',
          value: 9,
          type: 'number',
          require: true,
        },
        {
          id: 'capTotalHours',
          value: null,
          type: 'number',
          require: false,
        },
        {
          id: 'skipByStatus',
          value: true,
          type: 'boolean',
        },
        {
          id: 'skipDuplicateMode',
          value: 'subtract',
          values: [
            'subtract',
            'skip',
          ],
          type: 'text',
          required: false,
        },
        {
          id: 'setAssigned',
          value: true,
          type: 'boolean',
        },
        {
          id: 'dry',
          value: true,
          type: 'boolean',
        },
        {
          id: 'tickets',
          type: 'tickets',
          value: [
            { id: "343893" },
            { id: "343899" },
          ],
          required: true,
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Dispatch Center</h4>
          </div>
          <div className="panel-body">
            <Fields 
              fields={this.state.fields} 
              onChange={(e) => console.log(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dispatch;
