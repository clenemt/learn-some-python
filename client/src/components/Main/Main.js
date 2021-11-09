import React from 'react';
import Nav from '../Nav/Nav';
import styles from './Main.module.css';

function Main({ children }) {
  return (
    <main className={styles.app}>
      <Nav />
      {children}
    </main>
  );
}

export default Main;
