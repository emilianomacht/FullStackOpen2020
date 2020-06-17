/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';

export const useField = (name, type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    id: name,
    name,
    type,
    value,
    onChange,
    onReset,
  };
};
