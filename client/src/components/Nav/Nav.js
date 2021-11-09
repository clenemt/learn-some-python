import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../assets/logo.svg';

const isActive = ({ isActive }) => (isActive ? styles.active : '');

function Nav() {
  return (
    <nav>
      <img src={logo} className={styles.logo} alt="Logo" />
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" className={isActive}>
            Tracks
          </NavLink>
        </li>
        <li>
          <NavLink className={isActive} to="/playlists">
            Playlists
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
