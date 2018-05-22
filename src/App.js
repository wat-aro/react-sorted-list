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
    if (array === []) {
      return []
    } else if (array[0].value === draggingWork.value) {
      return this.move(array.slice(1, array.length), work, draggingWork)
    } else if (array[0].value === work.value) {
      if (work.index < draggingWork.index) {
        return [draggingWork].concat(array.filter((work) => {return work.value !== draggingWork.value}))
      } else {
        return [work, draggingWork].concat(array.splice(1, array.length))
      }
    } else {
      return [array[0]].concat(this.move(array.slice(1, array.length), work, draggingWork))
    }
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

    const insertedWorks = this.move([...this.state.works], work, this.state.draggingWork).map((work, index) => {
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
