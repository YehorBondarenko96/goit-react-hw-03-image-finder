import css from './Styles.module.css';
import { Component } from 'react';
import fetchForSearch from '../services/api';
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    results: [],
    isLoading: false,
    error: null,
  };

  intV = '';
  page = 1;


  async componentDidMount() {
    this.setState({ isLoading: true });


    try {
      const results = await fetchForSearch(this.intV, this.page);
      console.log(1);
      this.setState({ results });
    } catch (error) {
      console.log(2);
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  inputValue = (evt) => {
    evt.preventDefault();
    this.intV = evt.currentTarget.elements.search.value;
    console.log(this.intV);
  }
  render () {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.inputValue}/>
      </div>
    );
  }
};
