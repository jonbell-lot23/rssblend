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
          <TableHead>slug</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.url} className="even:bg-muted/50">
            <TableCell className="max-w-[400px]">
              <a
                href={post.url}
                className="text-blue-600 hover:underline truncate block"
              >
                {post.title}
              </a>
            </TableCell>
            <TableCell className="max-w-[400px] truncate">
              {post.description}
            </TableCell>
            <TableCell className="font-mono">
              {new Date(post.postdate).toISOString().split("T")[0]}
            </TableCell>
            <TableCell className="font-mono">{post.slug}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
