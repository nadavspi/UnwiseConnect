import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';

function valuesAsArray(values, tickets, value) {
  if (Array.isArray(values)) {
    return values;
  }

  return values(tickets, value);
}

const Field = ({ field, onChange, tickets }) => {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <span>
          <label
            htmlFor={field.id}
            style={{ display: 'block' }}
          >
            {field.label || field.id}
          </label>
          <input
            className="form-control"
            id={field.id}
            onChange={onChange}
            required={field.required}
            type={field.type}
            value={field.value}
          />
        </span>
      );

    case 'boolean':
      return (
        <span className="checkbox">
          <label
            htmlFor={field.id}
          >
            <input
              checked={field.value}
              id={field.id}
              onChange={onChange}
              type="checkbox"
            />
            {field.label || field.id}
          </label>
        </span>
      );

    case 'select':
      return (
        <span>
          <label
            htmlFor={field.id}
            style={{ display: 'block' }}
          >
            {field.label || field.id}
          </label>

          <select
            className="form-control"
            id={field.id}
            onChange={onChange}
            required={field.required}
            value={field.value}
          >
            {valuesAsArray(field.values, tickets).map(option => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </span>
      );

    case 'react-select':
      const Element = field.allowCustom ? Creatable : Select;
      return (
        <span>
          <label
            htmlFor={field.id}
            style={{ display: 'block' }}
          >
            {field.label || field.id}
          </label>

          <Element
            name={field.id}
            value={{ value: field.value, label: field.value }}
            onChange={selected => onChange({ target: (selected || { value: '' }) })}
            options={valuesAsArray(field.values, tickets, field.value).map(value => ({ value, label: value }))}
            promptTextCreator={label => 'Custom: ' + label}
          />
        </span>
      );

    default:
      return null;
  }
};

const Fields = props => {
  return (
    <div className="dispatch-fields">
      {props.fields.map(field => (
        <div 
          className="form-group"
          key={field.id}
        >
          <Field
            field={field}
            onChange={props.onChange.bind(null, field.id, field.type)}
            tickets={props.tickets}
          />
        </div>
      ))}
    </div>
  );
};

export default Fields;
