import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    tasks: [],
  };

  // componentDidMount () {
  //   Promise.all([
  //     fetch(`http://21wsp4pw.course.tamk.cloud/api/v1/task/random`).then((res) => res.json()).then((json) => {this.setState({tasks: [...this.state.tasks, {index: json.message, complete: false, onCloud: true}]});}),
  //     fetch(`http://21wsp4pw.course.tamk.cloud/api/v1/task/random`).then((res) => res.json()).then((json) => {this.setState({tasks: [...this.state.tasks, {index: json.message, complete: false, onCloud: false}]});}),
  //     fetch(`http://21wsp4pw.course.tamk.cloud/api/v1/task/random`).then((res) => res.json()).then((json) => {this.setState({tasks: [...this.state.tasks, {index: json.message, complete: false, onCloud: false}]});}),
  //     fetch(`http://21wsp4pw.course.tamk.cloud/api/v1/task/random`).then((res) => res.json()).then((json) => {this.setState({tasks: [...this.state.tasks, {index: json.message, complete: false, onCloud: false}]});})
  //   ])
  // }

  handleSubmit = task => {
    this.setState({tasks: [...this.state.tasks, {index: task, complete: false, onCloud: false}]});
  }

  handleRandom = async() => {
    await fetch(`/api/v1/task/random`)
    .then((res) => res.json())
    .then((json) => {this.setState({tasks: [...this.state.tasks, {index: json.message, complete: false, onCloud: false}]});})
  }
  
  handleSave = async() => {
    let newArr = [...this.state.tasks];
    delete newArr['onCloud']
    await axios.post('/api/v1/task/list', newArr)
    .then(() => {
      const newList = this.state.tasks.map(todo => {
        // if this task has the same ID as the edited task
        if (todo.onCloud === false) {
           //
           return {
              ...todo,
              index: todo.index,
              complete: todo.complete,
              onCloud: true,
           }
        }
        return todo;
     })
     this.setState({tasks: newList});
    })
    .catch(function (error) {
      console.log(error);
    })
    
   
  }
  
  handleLoad = async() => {
    await axios.get("/api/v1/task/list/" + this.props.match.params.id)
      .then((response) => {
        this.setState({tasks:
            {
              index: response.message,
              complete: response.complete,
              onCloud: true,
            }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate = async() => {
    await axios.put("/api/v1/task/list/" + this.props.match.params.id)
      .then((response) => {
        this.setState({tasks:
            {
              index: response.message,
              complete: response.complete,
              onCloud: true,
            }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({tasks: newArr});
  }

  handleToggle = (index) => {
    const newArr = [...this.state.tasks];
    newArr[index]['complete'] = !newArr[index]['complete'];
    newArr[index]['onCloud'] = false;
    this.setState({tasks: newArr});
  }

  render() {
    return(
      <div className='wrapper h-screen w-screen flex items-center justify-center bg-green-200 font-sans'>
        <div className='card frame bg-white rounded shadow p-6 m-4 w-full lg:w-2/4 '>
          <Header numTodos={this.state.tasks.length} addRandom={this.handleRandom} onLoad={this.handleLoad} onUpdate={this.handleUpdate} onSave={this.handleSave}/>
          <SubmitForm onFormSubmit={this.handleSubmit} />
          <TodoList tasks={this.state.tasks} complete={this.handleToggle} onDelete={this.handleDelete} />
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
          className="transition-all shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-4 text-grey-darker"
        />
        <button className='transition-all flex-no-shrink p-2 border-2 rounded text-purple-500 mb-4 border-purple-500 hover:text-white hover:bg-purple-500'>Submit</button>
      </form>
    );
  }
}


const Header = (props) => {
  return(
    <div>
      <div className='todo flex mb-4 items-center'>
        <h1 className="antialiased w-full text-grey-darkest font-semibold text-xl">Todo List</h1>
        <button className={"transition-all antialiased flex-no-shrink p-1.5 mr-2 font-semibold border-0 rounded hover:text-white text-purple-500 hover:bg-purple-500"} onClick={() => {props.addRandom()}}>Random</button>
        <button className={"transition-all antialiased flex-no-shrink p-1.5 mr-2 font-semibold border-0 rounded hover:text-white text-purple-500 hover:bg-purple-500"} onClick={() => {props.onSave()}}>Save</button>
        <button className={"transition-all antialiased flex-no-shrink p-1.5 font-semibold border-0 rounded hover:text-white text-purple-500 hover:bg-purple-500"} onClick={() => {props.onLoad()}}>Load</button>
        <button className={"transition-all antialiased flex-no-shrink p-1.5 ml-2 font-semibold border-0 rounded hover:text-white text-purple-500 hover:bg-purple-500"} onClick={() => {props.onUpdate()}}>Update</button>
      </div>
      <div className='card-header'>
        <h1 className='card-header-title header'>
          You have {props.numTodos} Todos
        </h1>
      </div>
    </div>
  )
}


const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return <Todo content={todo.index} todo={todo} id={index} key={index} complete={props.complete} onDelete={props.onDelete} />
  })
  return( 
    <div className='list-wrapper'>
      {todos}
    </div>
  );
}

const Todo = (props) => {
  return(
    <div className="todo flex mb-4 items-center">
      <p className={props.todo.complete? "transition-all line-through text-green-400 antialiased w-full text-base font-normal":"transition-all text-grey-800 antialiased w-full text-base font-normal"}>{props.content}</p>
      <p className={props.todo.onCloud? "transition-all antialiased flex-no-shrink pl-2 pt-1 pb-1 pr-2 border-0 rounded-full text-xs	bg-green-400 text-white":"transition-all antialiased flex-no-shrink text-xs pl-2 pt-1 pb-1 pr-2 border-0 rounded-full bg-gray-300 text-white"}>{props.todo.onCloud? "Saved":"Unsave"}</p>
      <button className={props.todo.complete? "transition-all	flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-300 border-gray-300 hover:bg-gray-300":"transition-all	flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-400 hover:bg-green-400"}  onClick={() => {props.complete(props.id)}}>{props.todo.complete? "Undo":"Done"}</button>
      <button className="transition-all flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-400" onClick={() => {props.onDelete(props.id)}}>Remove</button>
    </div>
  );
}

export default App;
