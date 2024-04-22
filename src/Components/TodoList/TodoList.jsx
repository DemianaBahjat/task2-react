import React, { useState } from 'react';

const Todo = ({ todo, onDelete }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <span className='form-control w-50 m-3'>{todo}</span>
      <button onClick={onDelete} className='btn btn-primary'>Delete</button>
    </div>
  );
};

 const TodoList = () => {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e)
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className='container text-center m-5'>
      <input
        name="todo"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo} className='btn btn-primary m-5 '>Add Todo</button>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} onDelete={() => handleDeleteTodo(index)} />
      ))}
    </div>
  );
};

export default TodoList;
