export interface PropertyType {
  type: string;
  index?: boolean;
  store?: boolean;
  sortable?: boolean;
  highlightable?: boolean;
  aggregatable?: boolean;
}

export interface IndexMapping {
  properties: Record<string, PropertyType>;
}

export interface CreateIndexType {
  name: string;
  mappings: IndexMapping;
}

export interface ZincInstanceParams {
  readonly zincEndpoint?: string;
  readonly username: string;
  readonly password: string;
}

export interface SearchResultType {
  took: number;
  timed_out: boolean;
  hits: Hits;
  error: string;
}

export interface Hits {
  total: { value: number };
  max_score: number;
  hits: Hit[];
}

export interface Hit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  "@timestamp": string;
  _source: any;
}
