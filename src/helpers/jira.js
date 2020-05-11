export const CompanyJiraMapping = {
  'AB InBev': 'https://ab-inbev.atlassian.net'
}

export const getJiraIssueKey = name => {
  const match = new RegExp(/^[A-Z][A-Z0-9]+-[0-9]{1,5}/).exec(name);
  return match ? match[0] : null;
}
