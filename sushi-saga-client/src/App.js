import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"


class App extends Component {
  state = {
    sushiList: [],
    currentPage: 1,
    budget: 50,
    eatenSushi: []

  }

  getSushi = () => {
    fetch(API + `?_page=${this.state.currentPage}&_limit=4`)
      .then(response => response.json())
      .then(sushiList => this.setState({ sushiList }))

  }

  eatSushi = (singleSushi, index) => {
    if (this.state.budget - singleSushi.price > 0){
      this.chargeCustomer(singleSushi)
      let updatedImage = singleSushi
      updatedImage.img_url = ''
      this.setState({sushiList: [...this.state.sushiList.slice(0, index), updatedImage, ...this.state.sushiList.slice(index + 1)]})

      const oldEats = this.state.eatenSushi
      this.setState({eatenSushi: [...this.state.eatenSushi, index]})



    } else {
      alert('no money homie')
    }
    
    // this.setState({...sushiList, {sushiList[index]}: singleSushi.img_url: ''})
    // https://stackoverflow.com/questions/45673783/replace-array-entry-with-spread-syntax-in-one-line-of-code
  }

  chargeCustomer = (sushi) => {
    let newBudget = this.state.budget - sushi.price
    this.setState({budget: newBudget})
  }

  componentDidMount() {
    this.getSushi()
    // feels hacky to do this, but once page loads w/page 1 - update state so next click is page 2
    let x = this.state.currentPage
    this.setState({ currentPage: x + 1})
  }

  moreSushi = () => {
    let x = this.state.currentPage
    if (x === 25) {
      this.setState({ currentPage: 1})
    } else {
      this.setState({ currentPage: x + 1})
    }
    this.getSushi()
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushiList={this.state.sushiList}
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
        />
        <Table 
          budget={this.state.budget}
          eatenSushi={this.state.eatenSushi}
        />
      </div>
    );
  }
}

export default App;