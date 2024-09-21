// MyToDo.tsx
import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoList from '../components/TodoList';
import '../myTodo.css';

const MyToDo = () => {
    const { addTodo } = useContext(TodoContext)!;
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    };

    return (
        <div className="todo-container">
            <h2>Your To-Dos</h2>
            <div className="todo-card">
                <form onSubmit={handleSubmit} className="todo-form">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="New To-Do"
                        className="todo-input"
                    />
                    <button type="submit" className="todo-button">Add</button>
                </form>
                <TodoList />
            </div>
        </div>
    );
};

export default MyToDo;
