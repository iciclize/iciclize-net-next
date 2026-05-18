"use client";

import styled from "@emotion/styled";
import { PageShell } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import type { StrapiArticle } from "@/lib/strapi";
import { mq, rhythm } from "@/lib/style";

type TagViewProps = {
  tagname: string;
  slug: string;
  articles: StrapiArticle[];
};

const QueryDescription = styled.div<{ $isLife: boolean }>`
  width: 100vw;
  margin: 0 0 ${rhythm(1)} 0;
  padding: ${rhythm(1)};
  margin-left: calc(50% - 50vw);
  color: white;
  text-align: center;
  font-size: ${rhythm(10 / 12)};
  font-weight: 700;
  letter-spacing: ${rhythm(2 / 24)};
  background: ${(props) => (props.$isLife ? "hsl(150, 65%, 79%)" : "hsl(199, 100%, 84%)")};

  ${mq[1]} {
    padding: ${rhythm(18 / 12)};
    font-size: ${rhythm(1)};
  }
`;

const Wrap = styled.div`
  margin: 0 ${rhythm(5 / 12)} 1rem;
`;

const Posts = styled.ul<{ $isLife: boolean }>`
  display: grid;
  gap: ${rhythm(8 / 12)};
  max-width: 740px;
  margin: 0;
  list-style: none;

  ${mq[0]} {
    grid-template-columns: 1fr 1fr;
  }

  ${mq[1]} {
    gap: ${rhythm(10 / 12)};
    margin: 0 auto;
  }

  ${(props) =>
    props.$isLife
      ? `
    & > li {
      border-left-color: hsl(150, 65%, 79%);
    }
  `
      : ""}
`;

const Empty = styled.p`
  flex-basis: 100%;
  text-align: center;
`;

export function TagView({ tagname, slug, articles }: TagViewProps) {
  const isLife = slug === "life";

  return (
    <PageShell width="full">
      <QueryDescription $isLife={isLife}>#{tagname}</QueryDescription>
      <Wrap>
        <Posts $isLife={isLife}>
          {articles.length > 0 ? (
            articles.map((article) => <PostCard key={article.slug} article={article} />)
          ) : (
            <Empty>(該当する記事が)ないです。</Empty>
          )}
        </Posts>
      </Wrap>
    </PageShell>
  );
}
