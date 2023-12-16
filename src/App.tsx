import './global.css';
import Navbar from './components/navbar/Navbar';
import Todos from './components/todo/Todos';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import type { TodoType } from './types';
import { TodoServices } from './todo-services/todoServices';
import { useErrorBoundary } from 'react-error-boundary';

/**
 * Renders the main application component.
 *
 * @function
 * @returns {JSX.Element} The JSX element representing the main application component.
 */

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await TodoServices.getAllTodos();
        setTodos(response);
      } catch (error) {
        console.log(`from App.tsx: ${error}`);
        showBoundary(error);
      }
    };
    fetchTodos();
  }, []);
  return (
    <div className="h-full text-2xl pb-4 text-textColor font-primaryFont font-black text-center ">
      <h1 className="pt-3 mb-4">My Todo</h1>
      <Navbar setTodos={setTodos} />
      <Routes>
        <Route path="/" element={<Todos todos={todos} setTodos={setTodos} />}></Route>
        <Route
          path="/inprogress"
          element={<Todos todos={todos.filter((todo) => todo.status === 'Pending')} setTodos={setTodos} />}
        ></Route>
        <Route
          path="/completed"
          element={<Todos todos={todos.filter((todo) => todo.status === 'Completed')} setTodos={setTodos} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
