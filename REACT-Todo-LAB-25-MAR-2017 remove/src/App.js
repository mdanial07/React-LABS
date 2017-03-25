import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  componentWillMount() {
    let fire = firebase.database().ref("/Todo/")
    fire.on("child_added", (snap) => {
      let currentTodo = this.state.todos;
      let getTodo = snap.val()
      getTodo.id = snap.key
      currentTodo.push(getTodo)
      this.setState({ todos: currentTodo })
      // console.log(snap.val());
    })

  }

  addTodo(ev) {
    let fire = firebase.database().ref("/Todo/")
    fire.push({ todo: this.refs.todo.value})
    ev.preventDefault()
    this.refs.todo.value = ""
  }
  
  todoRemove(val){
    let fire = firebase.database().ref(`/Todo/${val.id}`)
    fire.remove().then((i) => {
      let alltodos = this.state.todos;
      let indexRemove;
      for (var i = 0; i < alltodos.length; i++) {
        if (alltodos[i].id === val.id) {
          console.log(alltodos[i])
            indexRemove = i;
        }
      }
                
                alltodos = alltodos.slice(0, indexRemove).concat(alltodos.slice(indexRemove + 1));
                
                this.setState({ todos: alltodos });
    })    
    // console.log(val.id);
  }
  

  render() {
    return (
      <div className="App">
       
        <br /><br /><br /><br />

        <form onSubmit={this.addTodo.bind(this)}>
          <input type="text" ref="todo" placeholder="add todo" autoFocus />
          <button >Add Todo</button>
        </form>
        <br /><br />
        {this.state.todos.map((v, index) => {
          return (
            <div key={index} className="abcc">
              <h3>{v.todo}  &nbsp;&nbsp;&nbsp;
              <button onClick={this.todoRemove.bind(this,v)}> Remove</button>   
              </h3>
            </div>
          )
        }
        )}
      </div>
    );
  }
}

export default App;
