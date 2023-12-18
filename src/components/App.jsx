import css from './Styles.module.css';
import { Component } from 'react';
import fetchForSearch from '../services/api';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGellery } from './ImageGallery/ImageGallery';

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
      const messyResults = await fetchForSearch(this.intV, this.page);
      console.log(1);
      this.setState((state) => ({
        results: messyResults.map(messyResult => ({
          id: messyResult.id, 
          webformatURL: messyResult.webformatURL, 
          largeImageURL: messyResult.largeImageURL
        }))
      }));
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
    const results = this.state.results;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.inputValue}/>
        {results.length > 0 &&
        <ImageGellery results={results}/>}
      </div>
    );
  }
};
