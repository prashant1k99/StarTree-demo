import blogs from './data.json';

export interface IBlog {
  userId: number;
  title: string;
  contentText: string;
  imageURL: string;
  createdAt: Date;
  id: number;
  description: string;
  contentHTML: string;
  category: string;
  updatedAt: Date;
}

export default class BlogsService {

  private static formatDate(date: string): Date {
    return new Date(date)
  }

  public static getBlogs(params?: {
    skip: number;
    limit: number;
  }): IBlog[] {
    if (!params) {
      return blogs.map((blog) => {
        return {
          ...blog,
          createdAt: this.formatDate(blog.createdAt),
          updatedAt: this.formatDate(blog.updatedAt)
        }
      })
    }
    return blogs.slice(params.skip, params.skip + params.limit).map((blog) => {
      return {
        ...blog,
        createdAt: this.formatDate(blog.createdAt),
        updatedAt: this.formatDate(blog.updatedAt)
      }
    })
  }

  public static getBlog(id: number): IBlog {
    const data = blogs.find((blog) => blog.id === id)
    if (!data) {
      throw new Error('Blog not found')
    }
    return {
      ...data,
      createdAt: this.formatDate(data.createdAt),
      updatedAt: this.formatDate(data.updatedAt)
    }
  }
  
}