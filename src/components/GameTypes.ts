  export interface Platform {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface PlatformResponse {
    count: number;
    results: Platform[];
  }
  
  export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
  }
  
  export interface GameGridProps {
    games: Game[];
    error: string;
  }
  