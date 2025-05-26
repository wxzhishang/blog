export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'author' | 'visitor';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: string;
  isActive: boolean;
  postCount: number;
  commentCount: number;
}

export interface CreateUserInput {
  username: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  role?: 'author' | 'visitor';
}

export interface UpdateUserInput extends Partial<Omit<CreateUserInput, 'password'>> {
  id: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UserProfile extends Omit<User, 'email'> {
  posts: number;
  comments: number;
  likes: number;
  following: number;
  followers: number;
} 