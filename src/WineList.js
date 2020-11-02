// 10/23 add ability to search by country of origin.
import React, { Component } from 'react';
import firebase from './Firebase';
import Wines from './Wines';
import FormError from './FormError';

class WineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      country: '',
      producer: '',
      varietal: '',
      vintage: '',
      errorMessage: null,
      searchColor: '',
      allWines: [],
      displayWines: [],
      searchCountry: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVintageChange = this.handleVintageChange.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
  }

  componentDidMount() {
    const ref = firebase.database().ref(`wine/`);
    ref.on('value', (snapshot) => {
      let wines = snapshot.val();
      let listOWine = [];
      for (let item in wines) {
        listOWine.push({
          wineID: item,
          wineColor: wines[item].color,
          wineCountry: wines[item].country,
          wineProducer: wines[item].producer,
          wineVarietal: wines[item].varietal,
          wineVintage: wines[item].vintage,
        });
      }
      this.setState({
        displayWines: listOWine,
        allWines: listOWine,
        searchColor: '',
      });
    });
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }

  handleVintageChange(e) {
    const vintageName = e.target.name;
    const vintageValue = e.target.value;

    this.setState({ [vintageName]: vintageValue }, () => {
      const vintage = this.state.vintage;
      // console.log(/\d*\.?\d+/.test(vintage), vintage.length);
      if (/\d*\.?\d+/.test(vintage) === false || vintage.length > 4) {
        this.setState({ errorMessage: 'Please enter a four digit number' });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let wineInfo = {
      color: this.state.color,
      country: this.state.country,
      producer: this.state.producer,
      varietal: this.state.varietal,
      vintage: this.state.vintage,
    };
    this.props.addWine(wineInfo);
    this.setState({
      color: '',
      country: '',
      producer: '',
      varietal: '',
      vintage: '',
    });
  }

  handleSelectColor(e) {
    // e.preventDefault();
    const selectedColor = e.target.value.toLowerCase();
    const wineArrays = this.props.filterWine;
    const wineColors = [];
    wineArrays.forEach((element) => {
      const color = element.wineColor.toLowerCase();
      if (color === selectedColor) {
        wineColors.push(element);
      }
      if (selectedColor === 'show all wine') {
        wineColors.push(element);
      }
    });
    console.log(wineColors, selectedColor);
    this.setState({
      displayWines: wineColors,
      allWines: wineColors,
      searchColor: '',
    });
  }

  handleSelectCountry(e) {
    const selectedCountry = e.target.value;
    const wineArrays = this.props.filterWine;
    const wineCountries = [];
    wineArrays.forEach((element) => {
      const country = element.wineCountry;
      if (country === selectedCountry) {
        wineCountries.push(element);
      }
      if (selectedCountry === 'Show all wine') {
        wineCountries.push(element);
      }
    });
    // console.log(wineCountries.length, selectedCountry);
    this.setState({
      displayWines: wineCountries,
      allWines: wineCountries,
      searchCountry: '',
    });
  }

  render() {
    const dataFilter = (item) =>
      item.wineColor
        .toLowerCase()
        .match(this.state.searchColor.toLowerCase()) && true;

    const filteredWine = this.state.displayWines.filter(dataFilter);
    // console.log(filteredWine);
    // const filteredWine = this.props.wines;
    // {
    //   this.props.userID === 'UvjYRMLQsoRdCjYzyUvYO9HjBRL2'
    //     ? console.log('guest')
    //     : console.log('not guest');
    // }
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Bottle</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.handleSubmit}>
                  {this.state.errorMessage !== null ? (
                    <FormError theMessage={this.state.errorMessage} />
                  ) : null}
                  <div>
                    <select
                      className="form-control"
                      name="color"
                      value={this.state.color}
                      onChange={this.handleChange}
                    >
                      <option>Choose a Color</option>
                      <option>Red</option>
                      <option>Rose</option>
                      <option>White</option>
                      <option>Orange</option>
                      <option>Sparkling</option>
                      <option>Fortified</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="form-control"
                      name="country"
                      value={this.state.country}
                      onChange={this.handleChange}
                    >
                      <option>Choose a Country of Origin</option>
                      <option>Argentina</option>
                      <option>Australia</option>
                      <option>Austria</option>
                      <option>Chile</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Italy</option>
                      <option>Portugal</option>
                      <option>Slovenia</option>
                      <option>Spain</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div>
                    <section>
                      <input
                        className="form-control"
                        name="producer"
                        placeholder="Enter Producer Name"
                        value={this.state.producer}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <div>
                    <section>
                      <input
                        className="form-control"
                        name="varietal"
                        placeholder="Enter Varietal"
                        value={this.state.varietal}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <div>
                    <section>
                      <input
                        className="form-control"
                        type="text"
                        min="1900"
                        max="3000"
                        name="vintage"
                        placeholder="Four Digit Vintage"
                        value={this.state.vintage}
                        onChange={this.handleVintageChange}
                      />
                    </section>
                  </div>
                  {this.props.userID !== 'UvjYRMLQsoRdCjYzyUvYO9HjBRL2' ? (
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-info btn-block"
                        id="buttonAdd"
                      >
                        +Wine
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="card-title font-weight-light mt-0">
                        You are a guest and cannot add wine to the cav.
                      </h4>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.wines && this.props.wines.length ? (
                <div className="card-body py-2">
                  {this.props.userID !== 'UvjYRMLQsoRdCjYzyUvYO9HjBRL2' ? (
                    <h4 className="card-title font-weight-light mt-0">
                      Your Wine List
                    </h4>
                  ) : (
                    <h4 className="card-title font-weight-light mt-0">
                      Our Wine List
                    </h4>
                  )}
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <select
                        className="form-control"
                        value={this.state.searchColor}
                        name="searchColor"
                        onChange={this.handleSelectColor}
                      >
                        <option>Filter by Color</option>
                        <option>Show all wine</option>
                        <option>Red</option>
                        <option>Rose</option>
                        <option>White</option>
                        <option>Orange</option>
                        <option>Sparkling</option>
                        <option>Fortified</option>
                      </select>
                    </div>
                  </div>
                  <div className="card bg-light mb-4">
                    <div className="card-body text-center">
                      <select
                        className="form-control"
                        value={this.state.searchCountry}
                        name="searchCountry"
                        onChange={this.handleSelectCountry}
                      >
                        <option>Filter by Country of Origin</option>
                        <option>Show all wine</option>
                        <option>Argentina</option>
                        <option>Australia</option>
                        <option>Austria</option>
                        <option>Chile</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Italy</option>
                        <option>Portugal</option>
                        <option>Slovenia</option>
                        <option>Spain</option>
                        <option>United States</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              {this.props.wines && (
                <div className="list-group list-group-flush">
                  <Wines wines={filteredWine} userID={this.props.userID} />
                </div>
              )}
              {this.state.displayWines.length < 1 ? (
                <div className="list-group list-group-flush">
                  <h4>You have no wine from this Country.</h4>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WineList;
