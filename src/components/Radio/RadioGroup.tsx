import React, { ChangeEvent, ChangeEventHandler, useLayoutEffect, useState } from 'react';
import RadioGroupContext from './context';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

type RadioGroupProps = {
  defaultValue?: string;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
};

const RadioGroup = (props: RadioGroupProps) => {
  const { onChange, children } = props;
  const [value, setValue] = useMergedState(props.defaultValue, { value: props.value });

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;
    if (!('value' in props)) {
      setValue(_value);
    }
    if (onChange && _value !== value) {
      onChange(e);
    }
  };

  return (
    <div className="radio-group">
      <RadioGroupContext.Provider value={{ value, onChange: onRadioChange }}>{children}</RadioGroupContext.Provider>
    </div>
  );
};

export default RadioGroup;
