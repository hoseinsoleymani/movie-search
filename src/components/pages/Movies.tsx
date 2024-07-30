/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

import type { SearchMoviesResponse } from '../../queries';
import { Card } from '../ui-kit/Card/Card';

const Movie = ({
  title,
  original_language,
  poster_path,
  release_date,
  vote_average,
  overview,
}: SearchMoviesResponse['results'][number]) => {
  return (
    <Card
      title={title}
      description={overview}
      imageUrl={poster_path}
      avarage={vote_average}
      date={release_date}
      language={original_language}
    />
  );
};

interface MoviesProps {
  movies: SearchMoviesResponse['results'];
}

export const Movies = ({ movies }: MoviesProps) => {
  return (
    <div className="grid grid-cols-4 gap-12">
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
};
