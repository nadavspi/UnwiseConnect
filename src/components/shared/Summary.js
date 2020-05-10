import React from 'react';
import { getJiraIssueKey, CompanyJiraMapping } from "../../helpers/jira";

const Summary = ({ summary, company }) => {

  if (!CompanyJiraMapping.hasOwnProperty(company.identifier)) {
    return summary;
  }

  const jiraIssue = getJiraIssueKey(summary);

  return jiraIssue
    ? (<React.Fragment>
        <a href={`${CompanyJiraMapping[company.identifier]}/browse/${jiraIssue}`} target="_blank" rel="noopener">
          {jiraIssue}
        </a>
        {' '}
        {summary.replace(jiraIssue, '').trim()}
      </React.Fragment>
    )
    : summary
};

export default Summary;
