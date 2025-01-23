"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Post {
  id: number;
  title: string;
  url: string;
  description: string | null;
  postdate: Date;
  source: string | null;
  slug: string | null;
  Source: {
    emoji: string;
    name: string;
    userid: number;
  } | null;
}

interface DataTableProps {
  posts: Post[];
}

export function DataTable({ posts }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>title & url</TableHead>
          <TableHead>description</TableHead>
          <TableHead>postdate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.url} className="even:bg-muted/50">
            <TableCell className="max-w-[240px] truncate">
              <div className="flex items-center">
                <a href={`/table/${post.Source?.userid}/1`}>
                  <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
                </a>
                <a
                  href={`/post/${post.slug}`}
                  className="text-blue-600 hover:underline truncate block"
                >
                  {post.title}
                </a>
              </div>
            </TableCell>
            <TableCell className="max-w-[640px] truncate">
              {post.description}
            </TableCell>
            <TableCell className="font-mono">
              {new Date(post.postdate).toISOString().split("T")[0]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
