import React, { FC, useState } from 'react';
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiHome,
  BiMoon,
  BiSun,
  BiWrench,
} from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';

import { R } from '@r/index';

import './styles.scss';
import { Button } from '../Button';
// import { Button } from '../Button';

export type Props = {
  /**
   * current location (URL) of the app
   */
  location: string;
  /**
   * sets wether the app is currently using dark mode
   */
  darkMode: boolean;
  /**
   * function to toggle dark mode
   */
  setDarkMode: (on: boolean) => void;
};

type Routes = { path: R; Icon: IconType; text: string }[];

const ROUTES: Routes = [
  {
    path: R.DASHBOARD,
    Icon: BiHome,
    text: 'Home',
  },
  {
    path: R.SETTINGS,
    Icon: BiWrench,
    text: 'Settings',
  },
];

const Sidebar: FC<Props> = ({ location, darkMode, setDarkMode }) => {
  const [shrinkText, setShrinkText] = useState(false);

  return (
    <div className="sidebar__wrapper">
      <nav className="sidebar__content">
        <div
          className={`sidebar__controls ${
            shrinkText ? 'sidebar__controls--col' : ''
          }`}
        >
          <Button
            onClick={() => setDarkMode(!darkMode)}
            Icon={darkMode ? BiSun : BiMoon}
            className="sidebar__controls-toggle-dark sidebar__controls-button"
          >
            <div
              className={`sidebar__link-text ${
                shrinkText ? 'sidebar__link-text--shrinked' : ''
              }`}
            >
              {darkMode ? 'Light' : 'Dark'}
            </div>
          </Button>
          <Button
            onClick={() => setShrinkText((prev) => !prev)}
            Icon={shrinkText ? BiChevronsRight : BiChevronsLeft}
            className="sidebar__controls-expand-shrink sidebar__controls-button"
          />
        </div>
        <ul className="sidebar__links-wrapper">
          {ROUTES.map(({ path, Icon, text }) => (
            <li className="sidebar__link" key={`link-${path}`}>
              <Link
                to={path}
                className={`sidebar__link-content ${
                  location === path ? 'sidebar__link-content--active' : ''
                }`}
              >
                <Icon className="sidebar__link-icon" />
                <div
                  className={`sidebar__link-text ${
                    shrinkText ? 'sidebar__link-text--shrinked' : ''
                  }`}
                >
                  {text}
                </div>
              </Link>
            </li>
          ))}
          {/* <li className="sidebar__link sidebar__link--logout">
        <Button type="remove" className="sidebar__logout">
          LOG OUT
        </Button>
      </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
