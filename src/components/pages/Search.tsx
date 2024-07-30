import React, { FormEvent } from "react";
import { TextField } from "../ui-kit/TextField/TextField";
import { Button } from "../ui-kit/Button/Button";
import { useSearchContext } from "../../provider";

export const Search = () => { 

    const { searchValue, setSearchValue, searchMovies } = useSearchContext()

    const submitForm = (e: FormEvent) => {
        e.preventDefault();

        searchMovies()
    }

    return ( <form onSubmit={submitForm} className="pt-10 gap-4 flex justify-center">
       <TextField value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value)
        }}/>

       <Button variant="primary" type="submit">
        Search
       </Button>
    </form> )
}