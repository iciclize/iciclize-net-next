import { HomeView } from "@/components/views/home-view";
import { getAllArticles, getAllTags } from "@/lib/strapi";

export default async function HomePage() {
  const [articles, tags] = await Promise.all([getAllArticles(), getAllTags()]);
  const lifeArticles = articles.filter((article) => article.tags.some((tag) => tag.slug === "life")).slice(0, 12);
  const mainArticles = articles.filter((article) => article.tags.every((tag) => tag.slug !== "life"));

  const tagCounts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      if (tag.slug === "dummy-tag") {
        continue;
      }

      tagCounts.set(tag.slug, (tagCounts.get(tag.slug) || 0) + 1);
    }
  }

  return (
    <HomeView
      lifeArticles={lifeArticles}
      mainArticles={mainArticles}
      tags={tags}
      tagCounts={Object.fromEntries(tagCounts)}
    />
  );
}
