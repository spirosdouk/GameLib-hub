export interface Genre {
    id: number;
    name: string;
    image_background: string;
  }
  
  export interface GenreResponse {
    count: number;
    results: Genre[];
  }

