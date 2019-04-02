import React from 'react';

/**
 * Generate JSX elements from API error array
 * 
 * @function
 * @param {Array} errors - API errors array
 */
const errorsToJsx = errors => {
  let fieldErrors = {};
  for (let fieldName in errors) {
    if (errors.hasOwnProperty(fieldName)) {
      for (let fieldError of errors[fieldName]) {
        if (fieldErrors.hasOwnProperty(fieldName)) {
          fieldErrors[fieldName].push((<div>{fieldError}</div>));
        } else {
          fieldErrors[fieldName] = [(<div>{fieldError}</div>)];
        }
      }
    }
  }

  return fieldErrors;
};

export {
  errorsToJsx
};
