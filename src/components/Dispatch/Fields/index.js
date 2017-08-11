import React from 'react'; 

const renderField = (field, onChange) => {
  switch (field.type) {
    case 'text': 
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
            type="text"
            value={field.value}
          />
        </span>
      );
    default:
      return;
  }
};

const Fields = props => {
  return (
    <form className="dispatch-form">
      {props.fields.map(field => (
        <p>
          {renderField(field, props.onChange)}
        </p>
      ))}
    </form>
  );
};

export default Fields;
