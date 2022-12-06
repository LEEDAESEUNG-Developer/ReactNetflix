import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(query.get("q"), 500);

    console.log("debouncedSearchTerm ", debouncedSearchTerm);

    useEffect(() => {
        if(debouncedSearchTerm){ //searchTerm 값이 있을때만 사용
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]) //searchTerm 값이 변경이 될때마다 실행되게

    const fetchSearchMovie = async (searchTerm) => {
        console.log("searchTerm ", searchTerm);
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log("request -> ", request);
            setSearchResults(request.data.results);
        } catch (error){
            console.log("error ", error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? ( /* lentgh가 0 보다 클때 참*/
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    onClick={() => navigate(`/${movie.id}`)}
                                    className="movie_column-poster">
                                    <img
                                        src={movieImageUrl}
                                        alt="movie image"
                                        className="movie__poster"
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>
                        Your search for "{debouncedSearchTerm}" did not have any matches.
                    </p>
                    <p>Suggestions:</p>
                    <ul>
                        <li>Try different keywords</li>
                    </ul>
                </div>
            </section>
        );
    }

    return renderSearchResults();
}
