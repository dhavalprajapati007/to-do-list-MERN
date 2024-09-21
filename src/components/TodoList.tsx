// TodoList.tsx
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaTrash } from 'react-icons/fa'; // Import an icon library

const TodoList = () => {
    const { todos, updateTodo, deleteTodo } = useContext(TodoContext)!;

    return (
        <ul className="todo-list">
            {todos.map((todo: any) => (
                <li key={todo._id} className="todo-item">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => updateTodo(todo._id, todo.title, !todo.completed)}
                        className="todo-checkbox"
                    />
                    <span className={todo.completed ? 'todo-title completed' : 'todo-title'}>
                        {todo.title}
                    </span>
                    <button onClick={() => deleteTodo(todo._id)} className="todo-delete">
                        <FaTrash />
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
