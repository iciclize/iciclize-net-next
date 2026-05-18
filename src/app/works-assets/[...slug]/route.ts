import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const worksRoot = path.join(process.cwd(), "content/works");

const contentTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

type RouteContext = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { slug } = await params;
  const targetPath = path.join(worksRoot, ...slug);
  const resolvedPath = path.resolve(targetPath);
  const resolvedRoot = path.resolve(worksRoot);

  if (!resolvedPath.startsWith(resolvedRoot)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(resolvedPath);
    const extension = path.extname(resolvedPath).toLowerCase();

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
