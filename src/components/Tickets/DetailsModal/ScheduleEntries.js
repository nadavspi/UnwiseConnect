import React from 'react';
import { fetchScheduleEntryById, fetchTicketScheduleEntryIds } from '../../../helpers/cw';

const ScheduleEntries = ({ ticketNumber }) =>  {

  const [entries, setEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const displayEntries = () => {
    setIsLoading(true);
    fetchTicketScheduleEntryIds(ticketNumber).then(results => {
      return Promise.all(results.map(result => {
        return fetchScheduleEntryById(result);
      }));
    }).then(entries => {
      setEntries(entries);
      setIsLoading(false);
    });
  };

  React.useEffect(() =>  {
      displayEntries();
  }, []);

  const entryCard = entry => {
    let startDate = entry.dateStart;
    let endDate = entry.dateEnd;

    if (startDate) {
      const startDateObj = new Date(startDate);
      startDate = startDateObj.toLocaleDateString() + ' ' + startDateObj.toLocaleTimeString();
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      endDate = endDateObj.toLocaleDateString() + ' ' + endDateObj.toLocaleTimeString();
    }

    return(
      <React.Fragment>
        <td>{entry.member.name}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{entry.hours}</td>
        <td>{(entry.doneFlag) ? <div className="glyphicon glyphicon-ok" aria-hidden="true" /> : ''}</td>
      </React.Fragment>
    );
  };

  return (
    <div>
        <h4>Schedule Entries</h4>
        {isLoading && (<p style={{textAlign: 'center'}}>Loading &hellip;</p>)}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Hours</th>
              <th>Done</th>
            </tr>
          </thead>

          <tbody>
            {entries
              .sort((a, b) => a.dateStart > b.dateStart ? -1 : a.dateStart < b.dateStart ? 1 : 0)
              .map(entry =>
              <tr key={entry.id}>
                {entryCard(entry)}
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
};

export default ScheduleEntries;
