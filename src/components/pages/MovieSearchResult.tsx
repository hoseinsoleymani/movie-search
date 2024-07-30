import React from 'react';

import { useSearchContext } from '../../provider';
import { Loading } from '../ui-kit/Loading/Loading';
import { Movies } from './Movies';

export const MovieSearchResult = () => {
  const { status, movies, searchValue } = useSearchContext();

  if (status === 'pending') return <Loading />;

  if (!movies?.results)
    return <h1 className="pt-20 text-center text-4xl">search something...</h1>;

  if (movies.results.length === 0 && searchValue && !(status === 'error'))
    return (
      <h1 className="pt-20 text-center text-4xl">There isn't any movie</h1>
    );

  return (
    <main className="pt-12">
      <section className="container mx-auto">
        <Movies movies={movies.results} />
      </section>
    </main>
  );
};
