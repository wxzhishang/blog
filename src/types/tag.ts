export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
}

export interface CreateTagInput {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface UpdateTagInput extends Partial<CreateTagInput> {
  id: string;
} 