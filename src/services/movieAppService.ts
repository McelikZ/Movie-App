import axios from "axios";

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  fullPosterPath?: string;
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  cast?: CastMember[];
}

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchMovieService = async (
  endpoint: string,
  pageLimit: number = 3 // you can use that param instead of number
): Promise<Movie[]> => {
  if (!endpoint) {
    console.error("Endpoint undefined geldi!");
    return [];
  }

  const url =
    endpoint.startsWith("discover") || endpoint.includes("?")
      ? `${BASE_URL}/${endpoint}`
      : `${BASE_URL}/movie/${endpoint}`;

  try {
    const allMovies: Movie[] = [];

    for (let page = 1; page <= 1; page++) {
      const response = await axios.get<{ results: Movie[] }>(url, {
        params: { api_key: API_KEY, language: "en-US", page },
      });

      if (!response.data.results || response.data.results.length === 0) break;

      const moviesWithDetails = await Promise.all(
        response.data.results.map(async (movie) => {
          const fullPosterPath = movie.poster_path
            ? `${IMAGE_URL}${movie.poster_path}`
            : "";

          const videoRes = await axios.get(
            `${BASE_URL}/movie/${movie.id}/videos`,
            { params: { api_key: API_KEY, language: "en-US" } }
          );

          const castRes = await axios.get(
            `${BASE_URL}/movie/${movie.id}/credits`,
            { params: { api_key: API_KEY, language: "en-US" } }
          );

          return {
            ...movie,
            fullPosterPath,
            videos: videoRes.data,
            cast: castRes.data.cast?.slice(0, 10).map((c: any) => ({
              id: c.id,
              name: c.name,
              character: c.character,
              profile_path: c.profile_path,
            })),
          };
        })
      );

      allMovies.push(...moviesWithDetails);
    }

    return allMovies;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
