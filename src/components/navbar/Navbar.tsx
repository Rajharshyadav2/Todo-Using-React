import { useState } from 'react';
import './Navbar.css';
import type { CurrentNavItemType } from '../../types';
import NavButton from '../button/NavButton';
import Button from '../button/Button';

// Navbar component for displaying navigation buttons.
const Navbar = () => {
  const [currentNavItem, setCurrentNavItem] = useState<CurrentNavItemType>('All');

  return (
    <nav className="nav-bar">
      <ul className="nav-bar-items">
        <NavButton value="All" isActive={currentNavItem === 'All'} setCurrentNavItem={setCurrentNavItem} />

        <NavButton
          value="In Progress"
          isActive={currentNavItem === 'In Progress'}
          setCurrentNavItem={setCurrentNavItem}
        />

        <NavButton value="Completed" isActive={currentNavItem === 'Completed'} setCurrentNavItem={setCurrentNavItem} />
        <li id="add-btn">
          <Button className="nav-btn" handleClick={() => setCurrentNavItem('Add-Todo')}>
            +
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
