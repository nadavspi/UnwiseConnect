import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';
import TicketLink from '../TicketLink';

class TicketForm extends PureComponent {
  render() {
    return (
      <form>
        <button type="button" className="close-btn btn" aria-label="close" onClick={() => this.props.toggleCreateTicketForm()}>✕</button>
        <div>
          <label htmlFor="projects">Project</label>
          <input
            id="projects"
            className="form-control"
            disabled="disabled"
            value={`${this.props.selectedProject['company.name']} — ${this.props.selectedProject['project.name']}`}
          />
        </div>
        <div className="autocomplete-field">
          <label htmlFor="phases">Phase</label>
          <Autocomplete
            id="phases"
            items={this.props.phases}
            getItemValue={item => item.path}
            shouldItemRender={(item, value) => item.path.toLowerCase().indexOf(value.toLowerCase()) > -1}
            renderItem={item => (
              <div key={`${item.phaseId}-${item.ticketId}`}>
                {item.path}
              </div>
            )}
            value={this.props.phaseValue}
            inputProps={{ className: "autocomplete-input form-control" }}
            onChange={e => this.props.setPhaseValue(e.target.value)}
            onSelect={value => this.props.setPhaseValue(value)}
          />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <input
            className="form-control"
            type="text"
            id="summary"
            onChange={(e) => this.props.setSummary(e.target.value)}
            required
            value={this.props.summary}
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label htmlFor="budget-hours">Budget Hours</label>
          <input
            type="number"
            id="budget-hours"
            className="form-control"
            onChange={(e) => this.props.setBudget(e.target.value)}
            required
            min="0"
            step="0.25"
            placeholder="1"
            autoComplete="off"
            value={this.props.budget}
          ></input>
          {this.props.budget > 10 && (<p>Warning: This is a higher than normal budget</p>)}
        </div>
        <div>
          <label htmlFor="initial-description">Description</label>
          <textarea
            id="initial-description"
            rows="4"
            cols="50"
            className="form-control"
            placeholder="This is optional"
            value={this.props.initialDescription}
            onChange={(e) => this.props.setInitialDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-submit btn-primary"
          disabled={!this.props.budget || !this.props.summary || !this.props.phaseValue}
          onClick={() => {
            this.props.setTicketCompletionStatus(true);
            this.props.createNewTicket();
          }}
        >
          Create Ticket
        </button>
        {(this.props.hasCompletedTicket && (
          <React.Fragment>
            <div className="new-ticket-message">
              <p>You created a new ticket:
                {this.props.newTicketId && (
                  <TicketLink ticketNumber={this.props.newTicketId}/>
                )}
              </p>
            </div>
            <button type="button" className="btn btn-default btn-md btn-create-ticket" onClick={() => this.props.resetTicketDetails()}>Create another ticket</button>
          </React.Fragment>
        ))}
      </form>
    );
  }
}

export default TicketForm;
