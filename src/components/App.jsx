import React, { useState } from "react";
import "./app.css";
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import Searchbar from "./finder/Searchbar";
import ImageGallery from "./finder/ImageGallery";
import Button from "./finder/Button";

axios.defaults.baseURL = "https://pixabay.com/api/";
const key = "37372386-536360ba144753f1ce789d08e";

export const App = () => {
  const [search, setSearch] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const onSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const search = form.elements.search.value;

    if (search !== "") {
      setIsLoading(true);
      setSearchArr([]);
      setPage(1);
      setSearch(search);

      // await new Promise((resolve) => setTimeout(resolve, 4000));

      try {
        const response = await axios.get(`?q=${search}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
        setSearchArr(response.data.hits);
        setTotalHits(response.data.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    form.reset();
  }

  const loadMore = async () => {
    setIsLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));

      const nextPage = page + 1;
      const response = await axios.get(`?q=${search}&page=${nextPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      setSearchArr([...searchArr, ...response.data.hits]);
      console.log(searchArr);
      setPage(nextPage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      
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

      {!isLoading && searchArr.length < totalHits && <Button loadMore={loadMore} />}
      
    </div>
  )
}