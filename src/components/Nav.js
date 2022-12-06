import React, {useEffect, useState} from 'react';
import "./Nav.css"
import {useNavigate} from "react-router-dom";

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => { // 이벤트 생성
            // console.log("window.scrollY ", window.scrollY);
            if(window.scrollY > 50){
                setShow(true);
            } else{
                setShow(false);
            }
        })
        return () => {
            window.removeEventListener("scroll", () => {}); //  이벤트 삭제
        };
    }, []);

    const handleChange = (e) =>{
        let inputValue = e.target.value;
        setSearchValue(inputValue);
        navigate(`/search?q=${inputValue}`);
    }

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt='Netflix logo'
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                className='nav__logo'
                onClick={() => window.location.reload()}
            />
            <input value={searchValue} onChange={handleChange} className="nav__input" type="text" placeholder="영화를 검색해주세요."/>
            <img
                alt="User logged"
                src="http://occ-0-988-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                className="nav__avatar"
            />
        </nav>
    );
}