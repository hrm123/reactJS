import './App.css';
import TodoList from './components/todoList';
import CounterDemo from './components/counterDemo';

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        demos
      </header>
      
      <div>
        <CounterDemo />
        <TodoList userId={1} />
      </div>
    </div>
  );
}

export default App;
