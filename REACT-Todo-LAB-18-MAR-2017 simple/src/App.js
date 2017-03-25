import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
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
      currentTodo.push(getTodo)
      this.setState({ todos: currentTodo })
      // console.log(snap.val());
    })

  }

  addTodo(ev) {
    let fire = firebase.database().ref("/Todo/")
    fire.push({ todo: this.refs.todo.value })
    ev.preventDefault()
    this.refs.todo.value = ""
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
            <div key={index}>
              <ul>
                <li>{v.todo}</li>
              </ul>

            </div>
          )
        }
        )}
      </div>
    );
  }
}

export default App;
