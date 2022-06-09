export interface UserList {
  id: number;
  name: string;
  image: string;
  skills: string[];
  information: string;
  email: string;
  phone: string;
  website: string;
  charge: number;
  readTime: string;
  shares: string;
  retweets: string;
  topic: string;
}

const userList: UserList[] = [];
export default userList;
