import React from 'react';
import Autocomplete from 'react-autocomplete';
import TicketLink from '../TicketLink';

const TicketForm = (props) => {
  return (
    <form>
      <button
        type="button"
        className="close-btn btn"
        aria-label="close"
        onClick={() => props.toggleTicketModal()}
      >
        ✕
      </button>
      <div>
        <label htmlFor="projects">Project</label>
        <input
          id="projects"
          className="form-control"
          disabled="disabled"
          value={`${props.selectedProject['company.name']} — ${props.selectedProject['project.name']}`}
        />
      </div>
      <div className="autocomplete-field">
        <label htmlFor="phases">Phase</label>
        <Autocomplete
          id="phases"
          items={props.phases}
          getItemValue={item => item.path}
          shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={item => (
            <div key={`${item.phaseId}-${item.ticketId}`}>
              {item.path}
            </div>
          )}
          value={props.phaseValue}
          inputProps={{ className: "autocomplete-input form-control" }}
          onChange={e => props.setPhaseValue(e.target.value)}
          onSelect={value => props.setPhaseValue(value)}
        />
      </div>
      <div>
        <label htmlFor="summary">Summary</label>
        <input
          className="form-control"
          type="text"
          id="summary"
          onChange={(e) => props.setSummary(e.target.value)}
          required
          value={props.summary}
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label htmlFor="budget-hours">Budget Hours</label>
        <input
          type="number"
          id="budget-hours"
          className="form-control"
          onChange={(e) => props.setBudget(e.target.value)}
          required
          min="0"
          step="0.25"
          autoComplete="off"
          value={props.budget}
        ></input>
        {props.budget > 10 && (
          <p>Warning: This is a higher than normal budget</p>
        )}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="4"
          cols="50"
          className="form-control"
          placeholder="This is optional"
          autoComplete="off"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-submit btn-primary"
        disabled={!props.budget || !props.summary || !props.phaseValue || props.hasCompletedTicket}
        onClick={() => {
          props.setTicketCompleted(true);
          props.createNewTicket();
        }}
      >
        Create Ticket
      </button>
      {(props.hasCompletedTicket && (
        <>
          <div className="new-ticket-message">
            {props.newTicketId ? (
              <p>Created ticket:
                <TicketLink ticketNumber={props.newTicketId}/>
              </p>
            ) : (
              <p>Creating ticket ...</p>
            )}
          </div>
          <button
            type="button"
            className="btn btn-default btn-md btn-create-ticket"
            onClick={() => props.resetTicketDetails()}
          >
            Create another ticket
          </button>
        </>
      ))}
    </form>
  );
};

export default TicketForm;
