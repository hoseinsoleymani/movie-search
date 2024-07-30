import { SearchMoviesResponse } from "../../queries"
import React from "react";
import { Card } from "../";

interface MoviesProps {
    movies: SearchMoviesResponse["results"];
}

export const Movies = ({movies}: MoviesProps) => {
    return <div className="grid grid-cols-4 gap-12">{movies.map((movie) => <Movie {...movie} />)}</div>
}

const Movie = ({title, original_language,id,poster_path,release_date,vote_average,vote_count,popularity,overview}: SearchMoviesResponse["results"][number] ) => {
    return <Card title={title} description={overview} id={id} imageUrl={poster_path} avarage={vote_average} date={release_date} language={original_language} popularity={popularity} voteCount={vote_count} />
}