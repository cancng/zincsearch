import axios, { AxiosInstance } from "axios";
import { CreateIndexType, SearchResultType, ZincInstanceParams } from "./types";

export class ZincSearch {
  private zincEndpoint: string;
  private username: string;
  private password: string;
  private credentials: string;
  private api: AxiosInstance;
  constructor({ username, password, zincEndpoint }: ZincInstanceParams) {
    this.zincEndpoint = zincEndpoint || "http://localhost:4080/api";
    this.username = username;
    this.password = password;

    this.credentials = Buffer.from(
      `${this.username}:${this.password}`
    ).toString("base64");

    this.api = axios.create({
      baseURL: this.zincEndpoint,
      headers: {
        Authorization: `Basic ${this.credentials}`,
      },
    });
  }

  async getIndexes() {
    const res = await this.api.get("/index");

    return res.data;
  }

  async createIndex(body: CreateIndexType) {
    const res = await this.api.put("/index", JSON.stringify(body));

    return res.data;
  }

  async addDocument<T>(indexName: string, body: T) {
    const res = await this.api.put(
      `/${indexName}/document`,
      JSON.stringify(body)
    );

    return res.data;
  }

  async deleteDocument(indexName: string, documentId: string) {
    const res = await this.api.delete(`/${indexName}/_doc/${documentId}`);

    return res.data();
  }

  async deleteIndex(indexName: string) {
    const res = await this.api.delete(`/index/${indexName}`);

    return res.data;
  }

  async search(
    indexName: string,
    term: string,
    maxResults?: number
  ): Promise<SearchResultType> {
    const res = await this.api.post(
      `/${indexName}/_search`,
      JSON.stringify({
        search_type: "querystring",
        query: {
          term: `${term}*`,
          start_time: null,
          end_time: null,
        },
        max_results: maxResults || 50,
        sort_fields: ["-@timestamp"],
      })
    );

    return res.data as Promise<SearchResultType>;
  }
}
