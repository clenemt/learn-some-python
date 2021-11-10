import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

function Button({
  type = 'button',
  variant = 'secondary',
  className,
  children,
  loading,
  disabled,
  text,
  active,
  ...rest
}) {
  const classes = clsx(
    styles.btn,
    variant.split(' ').map(v => styles[v]),
    { loading },
    className
  );

  return (
    <button
      className={classes}
      disabled={typeof disabled !== 'undefined' ? disabled : loading}
      aria-pressed={active}
      type={type}
      {...rest}
    >
      {text || children}
    </button>
  );
}

export default Button;
