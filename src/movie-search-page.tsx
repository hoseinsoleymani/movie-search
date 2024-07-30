import React from "react";
import { Movies, Search } from "./components";
import { useSearchContext } from "./provider";


const MovieSearchPage = () => {
    const { movies, status } = useSearchContext()

    return (
        <>
        <header>
            <nav>
                <Search />
            </nav>
        </header>

        {status === "pending" ? <h1>loading...</h1> : !movies?.results ? <h1>search something...</h1> : <main className="pt-12">
                <section className="container mx-auto">
                    <Movies movies={movies.results} />                
                </section>
            </main>
        }
        </>
    )
}

export default MovieSearchPage;
