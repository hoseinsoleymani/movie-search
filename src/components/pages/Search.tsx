import type { FormEvent } from 'react';
import React from 'react';

import { useSearchContext } from '../../provider';
import { Button } from '../ui-kit/Button/Button';
import { TextField } from '../ui-kit/TextField/TextField';

export const Search = () => {
  const { searchValue, setSearchValue, searchMovies } = useSearchContext();

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    searchMovies();
  };

  return (
    <form onSubmit={submitForm} className="flex justify-center gap-4 pt-10">
      <TextField
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <Button variant="primary" type="submit">
        Search
      </Button>
    </form>
  );
};
