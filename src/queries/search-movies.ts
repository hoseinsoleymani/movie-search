import { useMutation } from '@tanstack/react-query';

import { api } from '../lib';

export interface ErrorSearchMovies {}

export interface SearchMoviesResponse {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

const searchMovies = async (search: string) => {
  const response = await api.get<SearchMoviesResponse>('', {
    params: {
      query: search,
      include_adult: 'true',
      language: 'en',
      page: '1',
    },
  });

  return response.data;
};

export const useSearchMovies = (searchValue: string) =>
  useMutation<SearchMoviesResponse, ErrorSearchMovies>({
    mutationKey: ['movies'],
    mutationFn: () => searchMovies(searchValue),
  });
