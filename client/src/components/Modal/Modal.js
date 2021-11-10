import clsx from 'clsx';
import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { KEYS } from '../../utils/constants';
import Button from '../Button/Button';
import styles from './Modal.module.css';

export const Modal = ({
  closable = true,
  closeOnClick = true,
  className,
  children,
  onClose,
  open = true,
  ...rest
}) => {
  const dialog = useRef(null);
  const lastFocus = useRef();

  const onBackdropClick = event => {
    if (closable && closeOnClick && onClose) onClose(event);
  };

  const onKeyUp = event => {
    if (!closable || event.key !== KEYS.ESCAPE) return;
    if (onClose) onClose(event);
  };

  const focusDialog = useCallback(() => {
    if (!dialog.current) return;

    const focus = document.activeElement;
    const isDialogFocused =
      focus === dialog.current || dialog.current.contains(focus);

    if (!isDialogFocused) {
      lastFocus.current = focus;
      dialog.current.focus();
    }
  }, []);

  const restoreFocus = useCallback(() => {
    lastFocus.current?.focus();
    lastFocus.current = null;
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      focusDialog();
      document.addEventListener('focus', focusDialog, true);
    } else {
      document.removeEventListener('focus', focusDialog, true);
      restoreFocus();
    }
  }, [open, focusDialog, restoreFocus]);

  // Cleanup effect
  useEffect(
    () => () => {
      restoreFocus();
      document.body.style.overflow = '';
      document.removeEventListener('focus', focusDialog, true);
    },
    [restoreFocus, focusDialog]
  );

  return (
    <>
      {open
        ? createPortal(
            <div
              className={clsx(styles.modal, className)}
              role="dialog"
              {...rest}
            >
              <div
                className={styles.backdrop}
                aria-hidden
                onClick={onBackdropClick}
              />
              <div className={styles.dialog} role="document">
                <div
                  className={styles.content}
                  ref={dialog}
                  role="presentation"
                  onKeyUp={onKeyUp}
                  tabIndex={-1}
                >
                  {closable && (
                    <Button
                      variant="naked"
                      className={styles.close}
                      aria-label="Close"
                      onClick={onClose}
                    />
                  )}
                  {children}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
