import React, { Component } from 'react';
import firebase from './Firebase';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { GoTrashcan } from 'react-icons/go';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWines: [],
      displayWines: [],
      wineNote: '',
    };
    this.deleteBottle = this.deleteBottle.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const ref = firebase.database().ref(`favorites/`);
    ref.on('value', (snapshot) => {
      let favorites = snapshot.val();
      let listOWine = [];
      for (let item in favorites) {
        listOWine.push({
          wineID: item,
          wineColor: favorites[item].wineColor,
          wineCountry: favorites[item].wineCountry,
          wineProducer: favorites[item].wineProducer,
          wineVarietal: favorites[item].wineVarietal,
          wineVintage: favorites[item].wineVintage,
          wineNote: favorites[item].note,
        });
      }
      this.setState({
        displayWines: listOWine,
        allWines: listOWine,
      });
    });
  }

  deleteBottle = (e, whichBottle) => {
    e.preventDefault();
    const ref = firebase.database().ref(`favorites/${whichBottle}`);
    ref.remove();
  };

  handleChange = (e) => {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    console.log(itemName, itemValue);
    this.setState({ [itemName]: itemValue });
  };

  addNotes = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  handleSubmit = (e, whichBottle) => {
    e.preventDefault();
    let note = { note: this.state.wineNote };
    console.log(note);
    const ref = firebase.database().ref(`favorites/${whichBottle}/`);
    ref.update(note);
    this.setState({
      wineNote: '',
      note: '',
    });
  };

  render() {
    // console.log(this.state.displayWines);
    const myFaves = this.state.displayWines.map((item) => {
      return (
        <ListGroup.Item className="d-flex" key={item.wineID}>
          <ButtonGroup className="align-self-center" role="group">
            <Button
              variant="outline-secondary"
              size="sm"
              title="Delete Bottle"
              onClick={(e) => this.deleteBottle(e, item.wineID)}
            >
              <GoTrashcan />
            </Button>
          </ButtonGroup>
          <section className="pl-3 text-left align-self-center">
            Color: {item.wineColor}
            <br />
            Country: {item.wineCountry}
            <br />
            Producer: {item.wineProducer}
            <br />
            Varietal(s): {item.wineVarietal}
            <br />
            Vintage: {item.wineVintage}
            <br />
            Notes: {item.wineNote}
          </section>
        </ListGroup.Item>
      );
    });
    return (
      <Container fluid className="mt-1">
        <Card>
          <Card.Title className="align-self-center font-weight-light">
            Here Are Your Favorite Wines
          </Card.Title>
          <ListGroup variant="flush">{myFaves} </ListGroup>
        </Card>
      </Container>
    );
  }
}

export default Favorites;
