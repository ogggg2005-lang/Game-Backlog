export type Member = {
  name: string;
  image: string;
};

export type Band = {
  id: number;
  name: string;
  foundedYear: number;
  genre: string;
  members: Member[];
  image: string;
  imagePosition?: string;
  description?: string;
};