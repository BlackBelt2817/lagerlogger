import React, { Component } from 'react';
import './App.css';
import BeerImage from './BeerImage';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BeerName from './BeerName';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allBeers: null,
      fullData: null,
      beer_name: null,
      image: null,
      food: null,
      yeast: null,
      hops: null,
      brewed_before: null,
      brewed_after: null,
      abv_lt: null,
      abv_gt : null,
      ibu_lt: null,
      ibu_gt: null,
      ebc_gt: null,
      ebc_lt: null,
      malt: null,
      newbeer_name: null,
      newFood: null,
      newYeast: null,
      newHops: null,
      brewedOn: null,
      abv: null,
      ibu: null,
      ebc: null,
      newMalt: null,
      toBeMapped: null,
      ph: null,
      srm: null,
      description: null,
      tag: null,

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.random = this.random.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  handleSubmit() {
    let url = 'https://api.punkapi.com/v2/beers';
    if (
      this.state.hops ||
      this.state.beer_name ||
      this.state.food ||
      this.state.yeast ||
      this.state.malt ||
      this.state.brewed_before ||
      this.state.brewed_after ||
      this.state.abv_gt ||
      this.state.abv_lt ||
      this.state.ebc_gt ||
      this.state.ebc_lt ||
      this.state.ibu_gt ||
      this.state.ibu_lt
      ) {
      url += '?';
    }
    let name, food, yeast, hops, malt;
    if (this.state.beer_name) {
      name = this.state.beer_name.split(' ').join('_');
      url += `beer_name=${name}&`
    }
    if (this.state.food) {
      food = this.state.food.split(' ').join('_');
      url += `food=${food}&`;
    }
    if (this.state.yeast) {
      yeast = this.state.yeast.split(' ').join('_');
      url += `yeast=${yeast}&`;
    }
    if (this.state.hops) {
      yeast = this.state.hops.split(' ').join('_');
      url += `hops=${hops}&`;
    }
    if (this.state.malt) {
      malt = this.state.malt.split(' ').join('_');
      url += `malt=${malt}&`;
    }
    if (this.state.brewed_before) {
      url += `brewed_before=${this.state.brewed_before}&`;
    }
    if (this.state.brewed_after) {
      url += `brewed_after=${this.state.brewed_after}&`;
    }
    if (this.state.abv_lt) {
      url += `abv_lt=${this.state.abv_lt}&`;
    }
    if (this.state.abv_gt) {
      url += `abv_gt=${this.state.abv_gt}&`;
    }
    if (this.state.ebc_lt) {
      url += `ebc_lt=${this.state.ebc_lt}&`;
    }
    if (this.state.ebc_gt) {
      url += `ebc_gt=${this.state.ebc_gt}&`;
    }
    if (this.state.ibu_lt) {
      url += `ibu_lt=${this.state.ibu_lt}&`;
    }
    if (this.state.ibu_gt) {
      url += `ibu_gt=${this.state.ibu_gt}&`;
    }
    axios.get(url)
    .then(res => {
      console.log(res.data);
      if (res.data.length < 1) {
        this.random();
        alert('No Results Found! Here\'s a random beer!');
      } else {
        this.setState({
          allBeers: res.data
        });
      }
    })
  }

  random() {
    axios.get('https://api.punkapi.com/v2/beers/random')
    .then(res => {
      console.log(res.data);
      let foods = res.data[0].food_pairing;
      foods = foods.join(', ');
      this.setState({
      image: res.data[0]["image_url"],
      altImage: res.data[0]["name"],
      newbeer_name: res.data[0]["name"],
      allBeers: null,
      abv: res.data[0].abv,
      tag: res.data[0].tagline,
      newFood: foods,
      ibu: res.data[0].ibu,
      ebc: res.data[0].ebc,
      ph: res.data[0].ph,
      srm: res.data[0].srm,
      description: res.data[0].description
    })})
  }

  handleKeyPress = (e) => {
    if(e.charCode === 13){
      this.handleSubmit();
    }
  }

  componentDidMount() {
    axios.get('https://api.punkapi.com/v2/beers/random')
    .then(res => {
      console.log(res.data);
      let foods = res.data[0].food_pairing;
      foods = foods.join(', ');
      this.setState({
      image: res.data[0]["image_url"],
      altImage: res.data[0]["name"],
      newbeer_name: res.data[0]["name"],
      allBeers: null,
      abv: res.data[0].abv,
      tag: res.data[0].tagline,
      newFood: foods,
      ibu: res.data[0].ibu,
      ebc: res.data[0].ebc,
      ph: res.data[0].ph,
      srm: res.data[0].srm,
      description: res.data[0].description
    })})
  }

  resetAll(e) {
    
  }

  // componentWillMount() {
  //   console.log('WILL MOUNT');
  //   axios.get('https://api.punkapi.com/v2/beers/random')
  //   .then(res => {
  //     console.log(res.data[0]);
  //     this.setState({
  //     image: res.data[0]["image_url"],
  //     altImage: res.data[0]["name"],
  //     beer_name: res.data[0]["name"],
  //     fullData: res.data
  //   }, () => console.log(this.state.fullData.length))})
  // }

  render() {
    return (
      <div style={{backgroundImage: `url(${require('../src/beer1.jpeg')})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}} className="App">
        <h1 className="App-title"><i>Lager Logger</i></h1>
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <input onKeyPress={this.handleKeyPress} id='nameinput' onChange={e => this.setState({beer_name: e.target.value})} placeholder='By Name' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({food: e.target.value})} value={this.state.food_pairing} placeholder='Pairs Well With' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({abv_lt: e.target.value})} placeholder='Max ABV' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({abv_gt: e.target.value})} placeholder='Min ABV' className="search" type='text' />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({brewed_before: e.target.value})} placeholder='Before mm-yyyy' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({brewed_after: e.target.value})} placeholder='After mm-yyyy' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({ibu_lt: e.target.value})} placeholder='Max IBU' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({ibu_gt: e.target.value})} placeholder='Min IBU' className="search" type='text' />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <input onKeyPress={this.handleKeyPress} style={{width: 168}} onChange={e => this.setState({hops: e.target.value})} placeholder='Hops Name' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} style={{width: 168}} onChange={e => this.setState({yeast: e.target.value})} placeholder='Yeast Name' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} style={{width: 168}} onChange={e => this.setState({malt: e.target.value})} placeholder='Malt Name' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({ebc_lt: e.target.value})} placeholder='Max EBC' className="search" type='text' />
            <input onKeyPress={this.handleKeyPress} onChange={e => this.setState({ebc_gt: e.target.value})} placeholder='Min EBC' className="search" type='text' />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button onClick = {this.random} id="submitbutton">
              <i style={{fontSize: 32}} className="fas fa-question" alt="Random" />
            </Button>  
            <Button onClick = {this.handleSubmit} id="submitbutton">
              <i style={{fontSize: 32}} className="fas fa-beer"></i>
            </Button>
            {/*<Button onClick={() => alert('Form reset still needs to be implemented!')} id="submitbutton">
              <i style={{fontSize: 32, color: 'red'}} className="fas fa-trash-alt"></i>
            </Button>*/}
            
          </div>
        </div>
        <div>
        {
          this.state.allBeers ? null :
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <BeerImage id='beerpic' alt={this.state.altImage} src={this.state.image} />
              <div>
                <div className="beerdata">
                  <BeerName name={this.state.newbeer_name} alt={this.state.altImage} perc={this.state.abv} />
                  <i><h2>{this.state.tag}</h2></i>
                  <h3>Pairs well with {this.state.newFood}</h3>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: 24}}>
                    <span><i>IBU:</i> {this.state.ibu}</span>
                    <span><i>EBC:</i> {this.state.ebc}</span>
                    <span><i>PH:</i> {this.state.ph}</span>
                    <span><i>SRM:</i> {this.state.srm}</span>
                  </div>
                  <h2>{this.state.description}</h2>
                </div>
              </div>
            </div>
          }
        </div>

          <div className="beerdata">
          {this.state.allBeers ? this.state.allBeers.map((i) => (
            <div key={i.name}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25}}>
            <BeerImage id='beerpic' alt={i.name} src={i.image_url} />
            <div>
              <div className="beerdata">
                <BeerName className="beertitle" name={i.name} perc={i.abv} />
                <i><h2>{i.tagline}</h2></i>
                <h3>Pairs well with {i.food_pairing.join(', ')}</h3>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: 24}}>
                  <span><i>IBU:</i> {i.ibu}</span>
                  <span><i>EBC:</i> {i.ebc}</span>
                  <span><i>PH:</i> {i.ph}</span>
                  <span><i>SRM:</i> {i.srm}</span>
                </div>
                <h2>{i.description}</h2>
                
              </div>
            </div>
          </div>
            </div>)) : null}
          </div>
        </div>
    );
  }
}

export default App;
