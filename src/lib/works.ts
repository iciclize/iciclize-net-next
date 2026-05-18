import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import imageSize from "image-size";
import type { WorkEntry } from "@/lib/works-types";

const worksRoot = path.join(process.cwd(), "content/works");

async function readWork(directoryName: string) {
  const markdownPath = path.join(worksRoot, directoryName, "index.md");
  const source = await fs.readFile(markdownPath, "utf8");
  const { data, content } = matter(source);
  const imageName = data.imagename ? String(data.imagename) : undefined;
  let imageWidth: number | null = null;
  let imageHeight: number | null = null;

  if (imageName) {
    const imagePath = path.join(worksRoot, directoryName, imageName);

    try {
      const dimensions = imageSize(await fs.readFile(imagePath));
      imageWidth = dimensions.width ?? null;
      imageHeight = dimensions.height ?? null;
    } catch {
      imageWidth = null;
      imageHeight = null;
    }
  }

  return {
    slug: String(data.slug),
    date: String(data.date),
    title: String(data.title),
    description: String(data.description),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    imagename: imageName,
    imageWidth,
    imageHeight,
    content,
    directoryName,
  } satisfies WorkEntry;
}

function sortWorks(a: WorkEntry, b: WorkEntry) {
  return b.date.localeCompare(a.date);
}

export async function getAllWorks() {
  const directoryNames = await fs.readdir(worksRoot);
  const works = await Promise.all(directoryNames.map(readWork));
  return works.sort(sortWorks);
}

export async function getWorkBySlug(slug: string) {
  const works = await getAllWorks();
  return works.find((work) => work.slug === slug) || null;
}

export async function getAdjacentWorks(slug: string) {
  const works = await getAllWorks();
  const index = works.findIndex((work) => work.slug === slug);

  return {
    next: index > 0 ? works[index - 1] : null,
    prev: index >= 0 && index < works.length - 1 ? works[index + 1] : null,
  };
}
