// we want to filter the data coming from firebase with the search fields.
// if there is nothing selected in the search fields we want to display everything.
import React, { Component } from 'react';

class SearchWine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      displayWines: [],
      searchQuery: '',
      allWines: [],
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    console.log(itemValue);
    this.setState({ [itemName]: itemValue });
  }

  handleSelectColor(e) {
    const selectedColor = e.target.value.toLowerCase();
    const wineArrays = this.props.filterWine;
    const wineColors = [];
    wineArrays.forEach((element) => {
      const color = element.wineColor.toLowerCase();
      if (color === selectedColor) {
        wineColors.push(element);
      }
    });
    console.log(wineColors, selectedColor);
    this.setState({
      displayWines: wineColors,
      allWines: wineColors,
      color: '',
    });
  }

  render() {
    return (
      <div className="container-fluid mt-1">
        <div className="input-group">
          <div className="form-row">
            <select
              className="form-control"
              value={this.state.color}
              name="search color"
              onChange={this.handleSelectColor}
            >
              <option>Filter by Color</option>
              <option>Red</option>
              <option>White</option>
              <option>Orange</option>
              <option>Sparkling</option>
              <option>Fortified</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchWine;
