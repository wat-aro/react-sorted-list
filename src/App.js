import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      works: 'ABCDE'.split('').map((value, index) => {return {value, index}} ),
      draggingWork: null
    }
  }

  swap(a,x,y) {
    a[x]=[a[y],a[y]=a[x]][0]
    return a
  }

  // Handler
  handleDragStart = (work, env) => {
    this.setState({
      draggingWork: work
    })
  }

  handleDragEnter = (work) => {
    if (work.index === this.state.draggingWork.index) return;

    const insertedWorks = this.swap([...this.state.works], work.index, this.state.draggingWork.index).map((work, index) => {
      return {value: work.value, index: index}
    })

    this.setState({
      works: insertedWorks,
      draggingWork: insertedWorks[work.index]
    })
  }

  // Render
  renderList() {
    return this.state.works.map((work, index) =>
      <div className="column" key={index} draggable="true" onDragStart={(env) => this.handleDragStart(work, env)} onDragEnter={() => this.handleDragEnter(work)}>
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
