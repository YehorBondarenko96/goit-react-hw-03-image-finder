import css from './Styles.module.css';
import { Bars } from 'react-loader-spinner';
import { Component } from 'react';
import fetchForSearch from '../services/api';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGellery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';

export class App extends Component {
  state = {
    results: [],
    isLoading: false,
    error: null,
    intV: '',
    page: 1
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const messyResults = await fetchForSearch(this.state.intV, this.state.page);
      this.setState((state) => ({
        results: messyResults.map(messyResult => ({
          id: messyResult.id, 
          webformatURL: messyResult.webformatURL, 
          largeImageURL: messyResult.largeImageURL
        }))
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  inputValue = (evt) => {
    evt.preventDefault();
    const intV = evt.currentTarget.elements.search.value;
    this.setState({intV})
  };

  forLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }))
  };

  async componentDidUpdate(prevProps, prevState){
    if(this.state.intV !== prevState.intV || this.state.page !== prevState.page){
      this.setState({ isLoading: true });

    try {
      const messyResults = await fetchForSearch(this.state.intV, this.state.page);
      if(this.state.intV === prevState.intV){
        this.setState((prevState) => ({
          results: [...prevState.results, ...messyResults.map(messyResult => ({
            id: messyResult.id, 
            webformatURL: messyResult.webformatURL, 
            largeImageURL: messyResult.largeImageURL
          }))]
        }));
      } else{
        this.setState((state) => ({
          results: messyResults.map(messyResult => ({
            id: messyResult.id, 
            webformatURL: messyResult.webformatURL, 
            largeImageURL: messyResult.largeImageURL
          }))
        }));
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
    }
  };

  render () {
    const {results, isLoading} = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.inputValue}/>
        {isLoading ? (
        <div className={css.spiner}>
        <Bars
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </div>
        ) : (
          results.length > 0 &&
          <>
          <ImageGellery results={results}/>
          <LoadMore onClick={this.forLoadMore}/>
          </>
          )}
      </div>
    );
  }
};
