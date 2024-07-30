import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import { queryClient } from './lib/queryClient';
import MovieSearchPage from './movie-search-page';
import { SearchMoviesProvider } from './provider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary
      fallback={<div>Something went wrong!</div>}
      onError={console.error}
    >
      <SearchMoviesProvider>
        <MovieSearchPage />
        <ToastContainer />
      </SearchMoviesProvider>
    </ErrorBoundary>
  </QueryClientProvider>,
);
