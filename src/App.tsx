import { Routes, Route } from 'react-router';
import './App.css';
import './reset.css';
import Navbar from './components/navbar/Navbar';
import Todos from './components/todo/Todos';

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
      <Routes>
        <Route path="/" element={<Todos todoRequest="all" />}></Route>
        <Route path="/inprogress" element={<Todos todoRequest="inprogress" />}></Route>
        <Route path="/completed" element={<Todos todoRequest="completed" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
