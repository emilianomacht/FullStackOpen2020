/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';

export const useField = (name, type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    id: name,
    name,
    type,
    value,
    onChange,
  };
};
