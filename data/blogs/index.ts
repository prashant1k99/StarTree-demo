import blogs from './data.json';

export interface IBlog {
  userId: number;
  title: string;
  contentText: string;
  imageURL: string;
  createdAt: string;
  id: number;
  description: string;
  contentHTML: string;
  category: string;
  updatedAt: string;
}

export default class BlogsService {

  public static getBlogs(params?: {
    skip: number;
    limit: number;
  }): IBlog[] {
    if (!params) {
      return blogs
    }
    return blogs.slice(params.skip, params.skip + params.limit)
  }

  public static getBlogCount(): number { return blogs.length }

  public static getBlog(id: number): IBlog {
    const blog = blogs.find((blog) => blog.id === id)
    if (!blog) {
      throw new Error('Blog not found')
    }
    return blog
  }
  
}