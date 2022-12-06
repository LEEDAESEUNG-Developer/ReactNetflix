import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params: {
        api_key: "08cb8ea467ef1b78f3ad40cb782de3ee",
        language: "ko-KR",
    },
});

export default instance;