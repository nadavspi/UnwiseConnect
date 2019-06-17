import React from 'react';

export const customField = caption => {
  return {
    resolve: field => {
      if (!field) {
        return 'N/A';
      }

      const sprint = field.find(val => val.caption === caption);
      if (sprint && sprint.value) {
        return sprint.value;
      }

      return 'N/A';
    },
    formatters: [
      (field, { rowData }) => {
        if (field === 'N/A') {
          return <div />;
        }

        return <div>{field}</div>;
      }
    ],
  }
};
