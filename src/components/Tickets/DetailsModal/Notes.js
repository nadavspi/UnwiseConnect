import React from 'react';
import { fetchTicketNotes } from '../../../helpers/cw';

const Notes = ({ ticketNumber }) => {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const displayNotes = () => {
    setIsLoading(true);
    fetchTicketNotes(ticketNumber).then(results => {
      const notes = results.map(note => ({
        createdBy: note.member.name,
        dateCreated: (new Date(note.dateCreated)).toLocaleDateString() + ' ' + (new Date(note.dateCreated)).toLocaleTimeString(),
        id: note.id,
        text: note.text,
      }));

      setIsLoading(false);
      setNotes(notes);
    });
  };

  React.useEffect(() => {
    displayNotes();
  }, []);

  return (
    <div>
      <h4>Notes</h4>
      {isLoading && (<p style={{textAlign: 'center'}}>Loading &hellip;</p>)}

      {notes.length
        ? <div className="ticket-notes">
          {notes.map(message =>
            <div key={message.id}>
              <p>{message.text}</p>
              <p><strong>{message.createdBy}, {message.dateCreated}</strong></p>
            </div>
          )}
        </div>
        : !isLoading ? 'No ticket notes found' : null
      }
    </div>
  );
};

export default Notes;
