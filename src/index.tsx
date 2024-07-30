import "./index.css"

import { createRoot } from "react-dom/client";
import MovieSearchPage from "./movie-search-page";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SearchMoviesProvider } from "./provider";
import { ErrorBoundary } from 'react-error-boundary';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={<div>Something went wrong!</div>} onError={console.error}>
    <SearchMoviesProvider>
<MovieSearchPage />
    </SearchMoviesProvider>
    </ErrorBoundary>
</QueryClientProvider>);
