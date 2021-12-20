import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    tasks: ['Task 1', 'Task 2', 'Task 3'],
  };

  handleSubmit = task => {
    this.setState({tasks: [...this.state.tasks, task]});
  }
  
  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({tasks: newArr});
  }

  render() {
    return(
      <div className='wrapper h-screen w-screen flex items-center justify-center bg-green-200 font-sans'>
        <div className='card frame bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
          <h1 className="antialiased text-grey-darkest mb-4 font-semibold text-xl">Todo List</h1>
          <Header numTodos={this.state.tasks.length} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
        </div>
      </div>
    );
  } 
}


class SubmitForm extends React.Component {
  state = { term: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.term === '') return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className='flex mt-4'>
        <input 
          type='text'
          className='input'
          placeholder='Enter Item'
          value={this.state.term}
          onChange={(e) => this.setState({term: e.target.value})}
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-4 text-grey-darker"
        />
        <button className='flex-no-shrink p-2 border-2 rounded text-green-500 mb-4 border-green-500 hover:text-white hover:bg-green-500'>Submit</button>
      </form>
    );
  }
}


const Header = (props) => {
  return(
    <div className='card-header'>
      <h1 className='card-header-title header'>
        You have {props.numTodos} Todos
      </h1>
    </div>
  )
}


const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
  })
  return( 
    <div className='list-wrapper'>
      {todos}
    </div>
  );
}

const Todo = (props) => {
  return(
    <div className="flex mb-4 items-center">
      <p className="antialiased w-full text-grey-darkest text-base font-normal">{props.content}</p>
      <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-400" onClick={() => {props.onDelete(props.id)}}>Remove</button>
    </div>
  );
}

export default App;
