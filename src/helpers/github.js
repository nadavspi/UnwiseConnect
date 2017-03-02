import GitHubApi from 'github-api';
import { checkStatus } from './utils';

export const isOrgMember = (token, name = 'sdinteractive') => {
  const gh = new GitHubApi({ token });
  return gh.getUser().listOrgs()
    .then(checkStatus)
    .then(({ data: orgs }) => {
      const result = orgs.find(org => org.login === name) != null;
      console.log({ result, name });
      return result;
    });
};

