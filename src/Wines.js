import React, { Component } from 'react';
import firebase from './Firebase';
import { GoTrashcan } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';

class Wines extends Component {
  constructor(props) {
    super(props);
    this.deleteBottle = this.deleteBottle.bind(this);
  }

  deleteBottle = (e, whichBottle) => {
    e.preventDefault();
    const ref = firebase.database().ref(`wine/${whichBottle}`);
    ref.remove();
  };

  faveBottle = (e, bottleInfo, whichBottle) => {
    e.preventDefault();
    console.log('Favorited', bottleInfo);
    const faveRef = firebase.database().ref(`favorites`);
    faveRef.push(bottleInfo);
    const deleteRef = firebase.database().ref(`wine/${whichBottle}`);
    deleteRef.remove();
  };

  render() {
    const { wines, userID } = this.props;
    console.log(wines);
    const myWines = wines.map((item) => {
      return (
        <div className="list-group-item d-flex" key={item.wineID}>
          <section className="btn-group align-self-center" role="group">
            {userID !== 'UvjYRMLQsoRdCjYzyUvYO9HjBRL2' ? (
              <span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  title="Delete Bottle"
                  onClick={(e) => this.deleteBottle(e, item.wineID)}
                >
                  <GoTrashcan />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  title="Favorite Bottle"
                  onClick={(e) => this.faveBottle(e, item, item.wineID)}
                >
                  <FaHeart />
                </button>
              </span>
            ) : null}
          </section>
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
          </section>
        </div>
      );
    });

    return <div>{myWines}</div>;
  }
}

export default Wines;
