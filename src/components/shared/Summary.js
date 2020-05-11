import React from 'react';
import { getJiraIssueKey, CompanyJiraMapping } from "../../helpers/jira";

const Summary = ({ summary, company, value }) => {

  const dd = value.match(/^DD(\d+)-(\d+)/);

  if (dd) {
    return (
      <span>
          <a
            href={`https://sd.mydonedone.com/issuetracker/projects/${dd[1]}/issues/${dd[2]}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {dd[0]}
          </a>
        {value.slice(dd[0].length)}
          </span>
    );
  }

  const jiraIssue = CompanyJiraMapping.hasOwnProperty(company.identifier) ? getJiraIssueKey(summary) : null;

  if (jiraIssue) {
    return (<React.Fragment>
        <a href={`${CompanyJiraMapping[company.identifier]}/browse/${jiraIssue}`}
           target="_blank"
           rel="noopener noreferrer">
          {jiraIssue}
        </a>
        {' '}
        {summary.slice(jiraIssue.length)}
      </React.Fragment>
    )
  }

  return value;
}

export default Summary;
