/**
 * Represents the properties of a button component in a React application.
 *
 * @interface ButtonProps
 *
 * @property {React.ReactNode} children - The content within the button.
 * @property {() => void} handleClick - A function to be called when the button is clicked.
 * @property {string} [className] - (Optional) The CSS class for styling the button.
 */
interface ButtonType {
  children: React.ReactNode;
  className: string;
  handleClick: () => void;
}

const Button = ({ children, className, handleClick }: ButtonType) => {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
