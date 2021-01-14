import React from 'react';
import Autocomplete from 'react-autocomplete';

const EditForm = (props) => {
  if (!props.ticketDetails) {
    return null;
  }

  return (
    <form>
      <button
        type="button"
        className="close-btn btn"
        aria-label="close"
        onClick={() => props.toggleEditModal()}
      >
        ✕
      </button>
      <h3>Project: <strong>{props.fullName}</strong></h3>
      <div className="autocomplete-field">
        <label htmlFor="phases">Phase</label>
        <Autocomplete
          id="phases"
          items={props.phases}
          inputProps={{ className: "autocomplete-input form-control" }}
          getItemValue={item => item.path}
          shouldItemRender={(item, value) => item.path && item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={item => (
            <div key={`${item.id}-${item.path}`}>
              {item.path}
            </div>
          )}
          value={props.phaseValue}
          onChange={e => props.setPhaseValue(e.target.value)}
          onSelect={value => props.setPhaseValue(value)}
        />
      </div>
      <div>
        <label htmlFor="summary">Summary</label>
        <input
          autoComplete="off"
          className="form-control"
          id="summary"
          onChange={(e) => props.setSummary(e.target.value)}
          type="text"
          value={props.summary}
        ></input>
      </div>
      <div>
        <label htmlFor="budget-hours">Budget Hours</label>
        <input
          autoComplete="off"
          className="form-control"
          id="budget-hours"
          onChange={(e) => props.setBudget(e.target.value)}
          min="0"
          step="0.25"
          type="number"
          value={props.budget}
        ></input>
      </div>
      {/* <div>
        <label htmlFor="description">Description</label>
        <textarea
          autoComplete="off"
          className="form-control"
          cols="50"
          id="description"
          onChange={(e) => props.setDescription(e.target.value)}
          placeholder="This is optional"
          rows="4"
          value={props.description}
        />
      </div> */}
      <button
        type="button"
        className="btn btn-submit btn-primary"
        disabled={!props.budget || !props.summary || !props.phaseValue}
        onClick={() => {
          props.updateTicketDetails();
        }}
      >
        {!props.hasCompletedTicket ? 'Update ticket' : (
          props.updatingTicket ? 'Updating ticket' : 'Updated ticket'
        )}
      </button>
    </form>
  );
};

export default EditForm;
