import React from 'react';

const Item = props => {
  return (
  	<div className={"assignment " + (props.scheduleitem.doneFlag ? 'complete' : 'incomplete')}>
  		<span className="fld-ticket">{props.scheduleitem.ticket.id}</span>
  		<span className="fld-ticketname">{props.scheduleitem.ticket.summary}</span>
  		<span className="fld-company">{props.scheduleitem.ticket.company}</span>
  		<span className="fld-project">{props.scheduleitem.ticket.project}</span>
  		<span className="fld-phase">{props.scheduleitem.ticket.phase}</span>
  		<span className="fld-ticketname">{props.scheduleitem.ticket.status}</span>
  		<span className="fld-budget">{props.scheduleitem.ticket.actualHours} / {props.scheduleitem.ticket.budgetHours}</span>
  	</div>
  );
};

export default Item;
