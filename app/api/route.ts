import { NextResponse, NextRequest } from "next/server";
import BlogsService from "@/data/blogs";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams

  const skip = params.get('skip'),
   limit = params.get('limit')
  
   const blogs = BlogsService.getBlogs({
    skip: skip ? parseInt(skip) : 0,
    limit: limit ? parseInt(limit) : 10
  })

  const totalBlogCount = BlogsService.getBlogCount()

  return NextResponse.json({
    status: 200,
    count: blogs.length,
    total: totalBlogCount,
    skip: skip || 0,
    limit: limit || 10,
    data: blogs
  })
}