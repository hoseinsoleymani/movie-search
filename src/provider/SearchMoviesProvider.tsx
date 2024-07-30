import type { UseMutateFunction } from '@tanstack/react-query';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import React, { useContext, useMemo, useState } from 'react';

import type { ErrorSearchMovies, SearchMoviesResponse } from '../mutations';
import { useSearchMovies } from '../mutations';

interface SearchMoviesContextProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  movies: SearchMoviesResponse | undefined;
  searchMovies: UseMutateFunction<SearchMoviesResponse, ErrorSearchMovies>;
  status: 'error' | 'idle' | 'pending' | 'success';
}

export const SearchMoviesContext =
  React.createContext<SearchMoviesContextProps | null>(null);

export const SearchMoviesProvider = ({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState('');

  const {
    data: movies,
    status,
    mutate: searchMovies,
  } = useSearchMovies(searchValue);

  const value = useMemo(
    () => ({ searchValue, setSearchValue, movies, searchMovies, status }),
    [searchValue, setSearchValue, movies, searchMovies, status],
  );

  return (
    <SearchMoviesContext.Provider value={value}>
      {children}
    </SearchMoviesContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchMoviesContext);

  if (!context) {
    throw Error('The context is null');
  }

  return {
    searchValue: context.searchValue,
    setSearchValue: context.setSearchValue,
    movies: context.movies,
    searchMovies: context.searchMovies,
    status: context.status,
  };
};
