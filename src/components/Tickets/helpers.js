import sortBy from 'sort-by';

export const getPhases = (ticketDetails, tickets) => {
  let phases = [];
  const companyName = ticketDetails.company ? ticketDetails.company.name : ticketDetails['company.name'];
  const projectName = ticketDetails.project ? ticketDetails.project.name : ticketDetails['project.name'];

  tickets.map(ticket => {
    if (projectName === ticket.project.name && companyName === ticket.company.name) {
      phases.push({
        path: ticket.phase.path,
        id: ticket.phase.id,
      });
    }
  });

  const deduplicatedPhases = phases.reduce((uniquePhases, currentPhase) => {
    if (!uniquePhases.some(phase => phase.path === currentPhase.path)) {
      uniquePhases.push(currentPhase);
    }
    return uniquePhases;
  }, []);

  const sortedDeduplicatedPhases = deduplicatedPhases.sort(sortBy('path'));
  return sortedDeduplicatedPhases;
}
