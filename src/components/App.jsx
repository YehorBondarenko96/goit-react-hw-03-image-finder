import css from './Styles.module.css';
import { Component } from 'react';
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  inputValue = (evt) => {
    evt.preventDefault();
    const intV = evt.currentTarget.elements.search.value;
    console.log(intV);
  }
  render () {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.inputValue}/>
      </div>
    );
  }
};
