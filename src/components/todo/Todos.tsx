import Todo from './Todo';
import { TodoType } from '../../types';

/**
 * Represents the properties of a Todos component in a React application.
 *
 * @interface TodosProps
 */

interface TodosProps {
  /**
   * An array of Todo items.
   *
   * @type {TodoType[]}
   */
  todos: TodoType[];
  /**
   * A function to update the state of Todo items.
   */
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const Todos = ({ todos, setTodos }: TodosProps) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id!}
          title={todo.title}
          description={todo.description}
          dueDate={todo.dueDate}
          status={todo.status}
          setTodos={setTodos}
        />
      ))}
    </>
  );
};

export default Todos;
