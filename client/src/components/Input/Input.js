import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Input.module.css';

let counter = 0;

function Input({
  className,
  style,
  label,
  labelClassName,
  inputClassName,
  id: propsId,
  text,
  type = 'text',
  ...rest
}) {
  const [defaultId] = useState(() => `input-${counter++}`);
  const id = propsId || defaultId;

  const classes = clsx(styles.group, className);
  const inputClasses = clsx(styles.control, inputClassName);
  const labelClasses = clsx(styles.label, labelClassName);

  return (
    <div className={classes} style={style}>
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        id={id}
        {...(text && { 'aria-describedby': `${id}-help` })}
        {...rest}
      />
      {text && (
        <div className="form-text" id={`${id}-help`}>
          {text}
        </div>
      )}
    </div>
  );
}

export default Input;
