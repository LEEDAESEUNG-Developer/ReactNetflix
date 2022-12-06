import React, {useEffect, useState} from 'react';
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

export default function Row({title, fetchUrl, isLargeRow, id}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [moveSelected, setMoveSelected] = useState({});

    useEffect(() => {           //필요한 정보를 가져온다??
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () =>{
        const request = await axios.get(fetchUrl);
        console.log("request => ", request);
        setMovies(request.data.results);
        return request;
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMoveSelected(movie);
    }

    return (
        <section className="row">
            {/*TITLE*/}
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <span className="arrow" onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}>
                        {"<"}
                    </span>
                </div>
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        loading="lazy"
                        alt={movie.name}
                        />
                    ))}
                </div>
                <div className="slider__arrow-right">
                    <span className="arrow" onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}>
                        {">"}
                    </span>
                </div>
            </div>

            {
                modalOpen && (
                    <MovieModal {...moveSelected} setModalOpen={setModalOpen}/>
                )
            }

        </section>
    );
}
