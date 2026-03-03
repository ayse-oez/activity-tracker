export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export interface TMDBSearchResponse {
  results: TMDBMovie[];
}
