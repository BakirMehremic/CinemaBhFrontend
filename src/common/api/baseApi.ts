import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const createApi = (baseURL: string = "") => {
  return axios.create({
    baseURL: `${API_BASE_URL}${baseURL}`,
  });
};

export const baseApi = createApi();
export const moviesApi = createApi("/movies");
export const venuesApi = createApi("/venues");
export const citiesApi = createApi("/cities");
export const genresApi = createApi("/genres");
export const projectionsApi = createApi("/projections");
