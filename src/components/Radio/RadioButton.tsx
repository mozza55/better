import React, { ChangeEvent, useContext, useState } from 'react';
import RadioGroupContext from './context';

type RadioButtonProps = {
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const RadioButton = (props: RadioButtonProps) => {
  const { value, children } = props;
  const groupContext = useContext(RadioGroupContext);
  const checked = value === groupContext?.value;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    groupContext?.onChange?.(e);
  };

  const radioProps = {
    value,
    onChange,
    checked,
  };

  return (
    <label className={checked ? 'radio-btn-checked' : 'radio-btn'}>
      <input type="radio" {...radioProps} />
      <span>{children}</span>
    </label>
  );
};

export default RadioButton;
