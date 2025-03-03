export interface StatBlockProps {
  value: string | number;
  label: string;
}

export type INavLink = {
  imageUrl: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId?: string;
  name?: string;
  bio?: string;
  email: string;
  username: string;
  imageUrl?: File[];
};

export type INewPost = {
  // userId: string;
  caption: string;
  // file?: File[];
  imageUrl: string;
  location?: string;
  tags?: { id: number; name: string }[];
};

export type IUpdatePost = {
  id: string;
  caption?: string;
  imageId: string;
  imageUrl?: URL | string | null;
  location?: string;
  tags?: { id: number; name: string }[];
};



export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  imageUrl?: string ;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type JWTPayload = {
  id: number;
  name: string;
  username: string;
  isAdmin: boolean;
}

export type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  imageUrl?: string;
  bio?: string;
};
export type UpdateComments = {
  text?: string;
}
export type ErrorResponse = {
  message: string;
  code?: number;
}
export type PostStatsProps = {
  postId: number;
  userId: number;
};







///////////////////////////
export interface Tag {
  id: number;
  name: string;
}

export interface IComments {
  id: number;
  text: string;
  postId: number;
  userId?: IUser;

}


export interface Save {
  id: number;
  userId: number;
  postId: number;
}

interface Like {
  id: number;
  userId: number;
  postId: number;
}

export interface IPost {
  id: number;
  caption: string;
  location?: string;
  tags: Tag[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: Date;
  comment: IComments[];
  Save: Save[];
  Like: Like[];
  user?: IUser;
  userId: number
}

export interface IUserPost extends IUser {
  post: IPost[];
  user: IUser[];
}

export type FormDataFile = Blob & {
  name?: string;
}
