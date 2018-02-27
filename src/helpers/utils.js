/* eslint no-cond-assign: ["error", "except-parens"] */

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

// This function converts 'Hello "foo bar" -baz' into:
// [ {text: 'Hello', semantic: '+'}, {text: 'foo bar', semantic: '+'}, {text: 'baz', semantic: '-'}]
function termToWords(term) {
  let words = [];

  let last = 0;
  const addWord = (end, quoted) => {
    // Skip blank words, even "".
    if (end !== last) {
      let text = term.substr(last, end - last);
      let semantic = '+';

      // If it's not quoted, check if it has a semantic prefix.
      if (!quoted) {
        const prefix = text.substr(0, 1);
        if (prefix === '-' || prefix === '+') {
          semantic = prefix;
          text = text.substr(1);
        }
      }

      words.push({ text, semantic });
    }

    // This always has a separator following it, skip that.
    last = end + 1;
  };

  let inQuotes = false;
  let reg = /"| /g;
  let next = null;
  // This will iterate through each separator.
  while ((next = reg.exec(term)) !== null) {
    const c = next[0];

    // Ignore any space inside quotes, and just keep going.
    if (c === ' ' && !inQuotes) {
      addWord(next.index, false);
    } else if (c === '"') {
      if (inQuotes) {
        // We already skipped the first quote when we set inQuotes.
        addWord(next.index, true);
        inQuotes = false;
      } else {
        // Everything up to the start quote is a word.
        addWord(next.index, false);
        inQuotes = true;
      }
    }
  }

  // Okay, and finally do the last word.  End quotes immediately, etc.
  if (last < term.length) {
    addWord(term.length, inQuotes);
  }

  return words;
}

function arrayInfix(term) {
  return {
    evaluate(value = '') {
      if (!value) {
        return false;
      }

      if (Array.isArray(value)) {
        return value.some(v => this.doMatch(term, v));
      }

      return term.some(v => this.doMatch(v, value));
    },

    doMatch(query, value) {
      return value.indexOf(query) !== -1;
    }
  };
}

function plainInfix(term) {
  return {
    evaluate(value = '') {
      if (!value) {
        return false;
      }

      if (Array.isArray(value)) {
        return value.some(v => this.doMatch(term, v));
      }

      return this.doMatch(term, value);
    },

    doMatch(query, value) {
      return value.indexOf(query) !== -1;
    }
  };
}

export function multiInfix(term) {
  if (Array.isArray(term)) {
    return arrayInfix(term);
  }

  // If term has any parts starting with -, exclude those.
  const words = termToWords(term);
  const positiveWords = words.filter(word => word.semantic === '+').map(word => word.text);
  const negativeWords = words.filter(word => word.semantic === '-').map(word => word.text);

  // For backwards compatible filter behavior, skip without negative words.
  // The difference is that this does word matching ("a" and "b"), not phrase matching ("a b".)
  if (negativeWords.length === 0) {
    return plainInfix(term);
  }

  return {
    evaluate(value = '') {
      if (!value) {
        return false;
      }

      if (Array.isArray(value)) {
        return value.some(v => this.doMatch(term, v));
      }

      if (negativeWords.some(v => this.doMatch(v, value))) {
        return false;
      }
      return positiveWords.every(v => this.doMatch(v, value));
    },

    doMatch(query, value) {
      return value.indexOf(query) !== -1;
    }
  };
}
