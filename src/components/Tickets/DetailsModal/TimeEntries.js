import React from 'react';
import { fetchTimeEntryById, fetchTicketTimeEntryIds } from '../../../helpers/cw';

const TimeEntries = ({ticketNumber}) => {

  const [entries, setEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const displayEntries = () => {
    setIsLoading(true);

    fetchTicketTimeEntryIds(ticketNumber).then(results => {
      return Promise.all(results.map(result => {
        return fetchTimeEntryById(result);
      }));
    }).then(entries => {
      setIsLoading(false);
      setEntries(entries);
    });
  };

  React.useEffect(() => {
    displayEntries();
  }, []);

  const entryCard = (entry) => {
    const date = (new Date(entry.timeStart)).toLocaleDateString() + ' ' + (new Date(entry.timeStart)).toLocaleTimeString();
    return(
      <React.Fragment>
        <td>{entry.member.name}</td>
        <td>{entry.notes}</td>
        <td>{entry.actualHours}</td>
        <td>{date}</td>
      </React.Fragment>
    );
  };

  return (
    <div>
        <h4>Time Entries</h4>
        {isLoading && (<p style={{textAlign: 'center'}}>Loading &hellip;</p>)}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Notes</th>
              <th>Actual Hours</th>
              <th>Entry Date</th>
            </tr>
          </thead>
          <tbody>
          {entries
            .sort((a, b) => a.timeStart > b.timeStart ? -1 : a.timeStart < b.timeStart ? 1 : 0)
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

export default TimeEntries;
