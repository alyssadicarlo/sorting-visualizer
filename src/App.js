import React from 'react';
import BubbleSort from './Algorithms/BubbleSort';
import MergeSort from './Algorithms/MergeSort';
import QuickSort from './Algorithms/QuickSort';
import './App.css';
import Column from './Components/Column';

const BUBBLE_SORT = 'BubbleSort';
const QUICK_SORT = 'QuickSort';
const MERGE_SORT = 'MergeSort';
const STARTING_LENGTH = 25;
const STARTING_SPEED = 1;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.setSteps = this.setSteps.bind(this);
    this.animateSteps = this.animateSteps.bind(this);
    this.state = {
      array: [],
      steps: [],
      colors: [],
      colorStep: [],
      algorithm: BUBBLE_SORT,
      length: STARTING_LENGTH,
      speed: STARTING_SPEED,
    }
  }

  ALGO = {
    'BubbleSort': BubbleSort,
    'QuickSort': QuickSort,
    'MergeSort': MergeSort
  };

  componentDidMount() {
    this.generateArray();
  }

  generateArray() {
    let array = [];
    let colorStep = [];
    for (let i = 0; i < this.state.length; i++) {
      let rand = Math.random()*50;
      array.push(Math.floor(rand));
      colorStep.push("#A5E5D9");
    }
    this.setState({
      array: array,
      colorStep: [...colorStep]
    }, () => this.setSteps());
  }

  setAlgorithm(algo) {
    this.setState({
      algorithm: algo
    }, () => this.setSteps());
  }

  setLength(length) {
    if (this.state.length !== length) {
      this.setState({
        length: length 
      }, () => {
        this.generateArray(); 
        this.setSteps();
      });
    }
  }

  setSpeed(speed) {
    this.setState({
      speed: speed
    });
  }

  setSteps() {
    let array = this.state.array;
    let steps = this.state.steps;
    let colors = this.state.colors;

    this.ALGO[this.state.algorithm](array, steps, colors);

    this.setState({
      steps: steps,
      colors: colors
    });
  }

  animateSteps() {
    for (let i = 0; i < this.state.steps.length; i++) {
      setTimeout(() => {
        this.setState({
          array: this.state.steps[i],
          colorStep: this.state.colors[i]
        });
      }, (100/this.state.speed) * i);
    }
  }

  sort() {
    this.animateSteps();
  }

  render() {
    let columns = this.state.array.map((value, index) => <Column
      key={index}
      value={value}
      color={this.state.colorStep[index]}
    />);
    return (
      <div className="App">
        <h1>Sorting Algorithm Visualizer</h1>
        <div className="options">
          <div className="block algo">
            <h3>Algorithm</h3>
            <button className={this.state.algorithm === BUBBLE_SORT ? 'active' : ''} onClick={() => this.setAlgorithm(BUBBLE_SORT)}>Bubble Sort</button>
            <button className={this.state.algorithm === QUICK_SORT ? 'active' : ''} onClick={() => this.setAlgorithm(QUICK_SORT)} disabled>Quick Sort</button>
            <button className={this.state.algorithm === MERGE_SORT ? 'active' : ''} onClick={() => this.setAlgorithm(MERGE_SORT)} disabled>Merge Sort</button>
          </div>
          <div className="block length">
            <h3>Size</h3>
            <button className={this.state.length === 25 ? 'active' : ''} onClick={() => this.setLength(25)}>25</button>
            <button className={this.state.length === 50 ? 'active' : ''} onClick={() => this.setLength(50)}>50</button>
            <button className={this.state.length === 75 ? 'active' : ''} onClick={() => this.setLength(75)}>75</button>
          </div>
          <div className="block speed">
            <h3>Speed</h3>
            <button className={this.state.speed === 1 ? 'active' : ''} onClick={() => this.setSpeed(1)}>1x</button>
            <button className={this.state.speed === 2 ? 'active' : ''} onClick={() => this.setSpeed(2)}>2x</button>
            <button className={this.state.speed === 3 ? 'active' : ''} onClick={() => this.setSpeed(3)}>3x</button>
          </div>
          <div className="block algo">
            <button onClick={this.generateArray.bind(this)}>Generate New Array</button>
            <button onClick={this.sort}>Sort!</button>
          </div>
        </div>
        <div className="columns">
            {columns}
        </div>
      </div>
    );
  }
}  