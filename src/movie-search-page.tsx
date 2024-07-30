import React from 'react';

import { Loading, Movies, Search } from './components';
import { useSearchContext } from './provider';

const MovieSearchPage = () => {
  const { movies, status, searchValue } = useSearchContext();

  return (
    <>
      <header>
        <nav>
          <Search />
        </nav>
      </header>

      {status === 'pending' ? (
        <Loading />
      ) : !movies?.results ? (
        <h1 className="pt-20 text-center text-4xl">search something...</h1>
      ) : movies.results.length === 0 &&
        searchValue &&
        !(status === 'error') ? (
        <h1 className="pt-20 text-center text-4xl">There isn't any thing</h1>
      ) : (
        <main className="pt-12">
          <section className="container mx-auto">
            <Movies movies={movies.results} />
          </section>
        </main>
      )}
    </>
  );
};

export default MovieSearchPage;
