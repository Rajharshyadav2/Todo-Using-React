import './App.css';
import './reset.css';
import Navbar from './components/navbar/Navbar';

/**
 * Renders the main application component.
 *
 * @function
 * @returns {JSX.Element} The JSX element representing the main application component.
 */

function App() {
  return (
    <div className="todo-currentNavItem">
      <h1>My Todo</h1>
      <Navbar />
    </div>
  );
}

export default App;
