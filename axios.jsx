import axios from "axios";
import { environments } from "./src/environments/env.development";

const api = axios.create({
      baseURL: environments.BASE_API_URL
})


export default api;