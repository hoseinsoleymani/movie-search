/** @jest-environment jsdom */
// @ts-nocheck @testing-library/cypress and @testing-library/jest-dom types has confilicts;

import '@testing-library/jest-dom/extend-expect';

import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { queryClient } from './lib/queryClient';
import MovieSearchPage from './movie-search-page';
import { SearchMoviesProvider } from './provider';

describe('MovieSearchPage Component', () => {
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <SearchMoviesProvider>
          <MovieSearchPage />
        </SearchMoviesProvider>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  it('should render the search input and button, then display loading and results', async () => {
    expect(screen.getByText('search something...')).toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const input = screen.getByRole('textbox') as any;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Hi' } });

    expect(input.value).toBe('Hi');

    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText('loading...')).toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(screen.queryByText('loading...')).not.toBeInTheDocument(),
    );
  });

  it('should display "There isn\'t any thing" when no results are found', async () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: 'No Movie Will Match This Search' },
    });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText('loading...')).toBeInTheDocument(),
    ).then(() => {
      void waitFor(() =>
        expect(screen.getByText("There isn't any thing")).toBeInTheDocument(),
      );
    });
  });
});
