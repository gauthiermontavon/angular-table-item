export interface Item {
  id: number;
  title: string;
  description: string;
  group?: string;
  tags: Array<string>;
  date: string;
  path: string;
  md5: string;
  author: string;
  source: string;
}
