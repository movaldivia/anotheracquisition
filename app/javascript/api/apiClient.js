import axios from "axios";

const eventlyAPI = axios.create({ baseURL: `http://localhost:3000/` });

export default eventlyAPI;
