import axios from "axios";

const client = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export default client;
