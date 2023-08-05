import React, { Component } from "react";
import "./app.css";
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import Searchbar from "./finder/Searchbar";
import ImageGallery from "./finder/ImageGallery";
import Button from "./finder/Button";

axios.defaults.baseURL = "https://pixabay.com/api/";
const key = "37372386-536360ba144753f1ce789d08e";

export class App extends Component {

  state = {
    search: "",
    searchArr: [],
    totalHits: null,
    isLoading: false,
    error: null,
    page: 1,
  }

  onSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const search = form.elements.search.value;

    if (search !== "") {
      this.setState({ isLoading: true, searchArr: [], page: 1 });
      
      this.setState({ search: search });

      // await new Promise((resolve) => setTimeout(resolve, 4000));

      try {
        const response = await axios.get(`?q=${search}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
        this.setState({
          searchArr: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (error) {
        this.setState({error})
      } finally {
        this.setState({ isLoading: false });
      }
    }
    form.reset();
  }

  loadMore = async () => {
    this.setState({ isLoading: true });
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));

      const nextPage = this.state.page + 1;
      const response = await axios.get(`?q=${this.state.search}&page=${nextPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState({
        searchArr: [...this.state.searchArr, ...response.data.hits],
        page: nextPage,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // componentDidUpdate() {
  //   console.log("New search:", this.state.search);
  //   console.log("Answer:", this.state.searchArr);
  //   console.log(this.state.totalHits);
  // }

  render() {
    const { isLoading, error, searchArr, totalHits } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        {searchArr.length > 0 && <ImageGallery searchArr={searchArr} />}

        {
          isLoading &&
          <div className="loading">
            <Oval
              height={80}
              width={80}
              color="darkblue"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#3f51b5"
              strokeWidth={3}
              strokeWidthSecondary={5}
              
            />
          </div>
        }

        {!isLoading && searchArr.length < totalHits && <Button loadMore={this.loadMore} />}
        
      </div>
    )
  }
}
