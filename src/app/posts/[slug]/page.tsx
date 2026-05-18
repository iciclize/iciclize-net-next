import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView } from "@/components/views/post-view";
import { resolveMarkdownImageSrc } from "@/lib/markdown";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/strapi";
import { siteConfig } from "@/lib/site";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.summary || siteConfig.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const relatedArticles = getRelatedArticles(article, allArticles);
  const imageUrl = article.image?.url ? resolveMarkdownImageSrc(article.image.url) : null;

  return <PostView article={article} relatedArticles={relatedArticles} imageUrl={imageUrl} />;
}
