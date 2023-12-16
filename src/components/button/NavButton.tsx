import classNames from 'classnames';
import Button from './Button';
import { CurrentNavItemType } from '../../types';

/**
 * Represents the properties of a navigation button in a Navbar component.
 *
 * @interface NavButtonProps
 */
interface NavButtonProps {
  /**
   *  The value of the navigation button, representing 'All', 'In Progress', 'Completed', or 'Add-Todo'.
   *
   * @type {CurrentNavItemType}
   */
  value: CurrentNavItemType;

  /**
   * Indicates whether the navigation button is currently active.
   *
   * @type {boolean}
   */
  isActive: boolean;
  /**
   * A function to update the header value in the parent component.
   *
   * @param {CurrentNavItemType}
   * @returns {void}
   */
  setCurrentNavItem: (value: CurrentNavItemType) => void;
}

const NavButton = ({ value, isActive, setCurrentNavItem }: NavButtonProps) => {
  return (
    <li>
      <Button
        handleClick={() => setCurrentNavItem(value)}
        className={classNames('btn', { 'text-orange-500': isActive })}
      >
        {value}
      </Button>
    </li>
  );
};

export default NavButton;
