import React from 'react'; 

const Field = ({ field, onChange }) => {
  switch (field.type) {
    case 'text': 
    case 'number':
      return (
        <span>
          <label 
            htmlFor={field.id}
            style={{ display: 'block' }}
          >
            {field.id}
          </label>
          <input 
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
        <span>
          <input 
            checked={field.value}
            id={field.id}
            onChange={onChange}
            type="checkbox"
          />
          {' '}
          <label 
            htmlFor={field.id}
          >
            {field.id}
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
            {field.id}
          </label>
        
          <select 
            id={field.id}
            onChange={onChange}
            required={field.required}
            value={field.value}
          >
            {field.values.map(option => (
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

    default:
      return null;
  }
};

const Fields = props => {
  return (
    <form className="dispatch-form">
      {props.fields.map(field => (
        <p key={field.id}>
          <Field 
            field={field}
            onChange={props.onChange.bind(null, field.id, field.type)}
          />
        </p>
      ))}
    </form>
  );
};

export default Fields;
