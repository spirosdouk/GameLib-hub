import axios, { AxiosInstance } from 'axios';

class ApiClients {
  private endpoint: string;
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = axios.create({
      baseURL: this.endpoint,
    });
  }
  
  async get<T>(path: string): Promise<T> {
    const response = await this.client.get<T>(path);
    return response.data;
  }

  async getAll<T>(): Promise<T[]> {
    const response = await this.client.get<T[]>('');
    return response.data;
  }

  async post<T>(data: T): Promise<T> {
    const response = await this.client.post<T>('', data);
    return response.data;
  }

}

export default ApiClients;
