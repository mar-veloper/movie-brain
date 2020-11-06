import React, { useContext, useRef } from 'react';
import MovieContext from '../../context/movies';
import Input from '../../components/common/Form/Input';
import Button from '../../components/common/Button';

const HomePage = ({ history }) => {
  const {
    searchValue,
    onChange,
    setLastSearched,
    setIsLoading,
    isLoading,
  } = useContext(MovieContext);

  const searchInput = useRef(null);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!searchValue) {
      return (searchInput.current.className = 'form-control is-invalid');
    }

    searchInput.current.className = 'form-control is-valid';
    setLastSearched(searchValue.toLowerCase());
    setIsLoading(true);
    history.push(`/movies/${searchValue.toLowerCase()}`);
  };

  return (
    <form>
      <Input
        ref={searchInput}
        label="Movie Title"
        value={searchValue}
        name="movieTitle"
        required={true}
        onChange={onChange}
        feedback="Please provide a movie title."
        help="Search a movie that you would like to add into your list."
      />
      <Button
        isLoading={isLoading}
        className="dark btn-lg btn-block"
        label="Search"
        type="submit"
        onClick={e => handleOnSubmit(e)}
      />
    </form>
  );
};

export default HomePage;
