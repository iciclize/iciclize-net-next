import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TagView } from "@/components/views/tag-view";
import { getAllTags, getArticlesByTag } from "@/lib/strapi";

type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) {
    return {};
  }

  return {
    title: `#${tag.tagname}`,
    description: `#${tag.tagname} のタグの付いた記事一覧`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) {
    notFound();
  }

  const articles = await getArticlesByTag(slug);

  return <TagView tagname={tag.tagname} slug={slug} articles={articles} />;
}
