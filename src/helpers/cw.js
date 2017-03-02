import ConnectWiseRest from 'connectwise-rest';

export const cw = new ConnectWiseRest({
  companyId: process.env.REACT_APP_CW_COMPANY_ID,
  companyUrl: process.env.REACT_APP_CW_COMPANY_URL,
  publicKey: process.env.REACT_APP_CW_PUBLIC_KEY,
  privateKey: process.env.REACT_APP_CW_PRIVATE_KEY,
});

export const fetchProject = projectId => cw.ServiceDeskAPI.Tickets.getTickets({
  conditions: `project/id = ${projectId}`,
});
