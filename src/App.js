import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      works: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((value, index) => {return {value, index}} ),
      draggingWork: null
    }
  }

  move(array,work,draggingWork) {
    let filterdWorks = array.filter(w => {return w.index !== draggingWork.index})
    filterdWorks.splice(work.index, 0, draggingWork)

    return filterdWorks
  }

  classList(work) {
    if (work.index === (this.state.draggingWork && this.state.draggingWork.index)) {
      return "column dragging"
    } else {
      return "column"
    }
  }

  // Handler
  handleDragStart = (work, env) => {
    this.setState({
      draggingWork: work
    })
  }

  handleDragEnter = (work) => {
    if (work.index === this.state.draggingWork.index) return;

    const insertedWorks = this.move(this.state.works, work, this.state.draggingWork).map((work, index) => {
      return {value: work.value, index: index}
    })

    this.setState({
      works: insertedWorks,
      draggingWork: insertedWorks[work.index]
    })
  }

  handleDragEnd = (event) => {
    event.preventDefault()
    event.stopPropagation()

    this.setState({
      draggingWork: null
    })

    return false
  }

  handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  // Render
  renderList() {
    return this.state.works.map((work, index) =>
      <div className={this.classList(work)} key={index} draggable="true" onDragStart={(env) => this.handleDragStart(work, env)} onDragEnter={() => this.handleDragEnter(work)} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop}>
        <header>{work.value}</header>
      </div>
    )
  }

  render() {
    return (
      <div id="columns">
        {this.renderList()}
      </div>

    );
  }
}

export default App;
