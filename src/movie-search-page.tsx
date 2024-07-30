import React from 'react';

import { MovieSearchResult, Search } from './components';

const MovieSearchPage = () => {
  return (
    <>
      <header>
        <nav>
          <Search />
        </nav>
      </header>

      <MovieSearchResult />
    </>
  );
};

export default MovieSearchPage;
