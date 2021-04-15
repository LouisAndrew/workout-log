import React, { FC } from 'react';
import { BiHome, BiWrench } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';

import { R } from '@r/index';

import './styles.scss';

export type Props = {
  /**
   * current location (URL) of the app
   */
  location: string;
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
    text: 'Settings'
  }
];

const Sidebar: FC<Props> = () => (
  <nav className="sidebar__wrapper">
    <ul className="sidebar__links-wrapper">
      {ROUTES.map(({ path, Icon, text }) => (
        <li className="sidebar__link" key={`link-${path}`}>
          <Link to={path} className="sidebar__link-content">
            <Icon className="sidebar__link-icon" />
            <div className="siebar__link-text">
              {text}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
