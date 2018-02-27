export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json();
}

export function multiInfix(term) {
  return {
    evaluate(value = '') {
      if (!value) {
        return false;
      }

      if (Array.isArray(value)) {
        return value.some(v => this.doMatch(term, v));
      }
      if (Array.isArray(term)) {
        return term.some(v => this.doMatch(v, value));
      }

      return this.doMatch(term, value);
    },

    doMatch(query, value) {
      return value.indexOf(query) !== -1;
    }
  };
}
