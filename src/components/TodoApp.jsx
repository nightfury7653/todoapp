import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const updateTodo = (id) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
      ));
      setEditingId(null);
      setEditValue('');
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">
            Task Manager
          </h1>
          <p className="text-blue-50 text-center mt-2 text-lg">
            {todos.filter(t => !t.completed).length} tasks remaining
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Add Todo Form */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <form onSubmit={addTodo} className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-6 py-4 rounded-lg text-black bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all text-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`p-6 transition-all duration-200 hover:bg-gray-50 ${
                  todo.completed ? 'bg-gray-50' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 text-black px-6 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-blue-500 text-lg"
                      autoFocus
                    />
                    <button
                      onClick={() => updateTodo(todo.id)}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <label className="flex items-center flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="w-6 h-6 rounded border-gray-300 text-blue-500 focus:ring-blue-200"
                      />
                      <span className={`ml-4 text-lg ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}>
                        {todo.text}
                      </span>
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(todo)}
                        className="px-4 py-2 text-base bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-4 py-2 text-base bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className="text-base text-gray-600">
                {todos.filter(t => t.completed).length} completed
              </span>
              <button
                onClick={clearCompleted}
                className="px-4 py-2 text-base text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                Clear completed
              </button>
            </div>
          )}

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <p className="text-xl">Your task list is empty</p>
              <p className="text-base mt-2">Add some tasks to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;