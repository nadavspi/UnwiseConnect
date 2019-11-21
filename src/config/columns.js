import React from 'react';

export const customField = caption => {
  return {
    resolve: (row, { rowData }) => {
      const fields = rowData.customFields;
      if (!fields) {
        return 'N/A';
      }

      const field = fields.find(val => val.caption === caption);
      if (field && field.value) {
        return field.value;
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
