"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { MarkdownContent } from "@/components/markdown-content";
import { PageShell } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { formatIsoDate } from "@/lib/markdown";
import type { StrapiArticle } from "@/lib/strapi";
import { mq, rhythm } from "@/lib/style";

type PostViewProps = {
  article: StrapiArticle;
  relatedArticles: StrapiArticle[];
  imageUrl: string | null;
};

const pageWidth = "700px";

const HeroImage = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto ${rhythm(10 / 12)};

  img {
    display: block;
    width: 100%;
    margin: 0;
  }
`;

const ArticleWrap = styled.article`
  width: min(700px, calc(100% - 32px));
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${rhythm(1)};
  line-height: 1.25;
  letter-spacing: ${rhythm(1 / 24)};

  ${mq[1]} {
    font-size: ${rhythm(13 / 12)};
  }
`;

const PostedDate = styled.div`
  color: hsl(0, 0%, 52%);
  font-size: ${rhythm(11 / 20)};
`;

const TagList = styled.ul`
  margin: ${rhythm(8 / 12)} 0 ${rhythm(14 / 12)};
  list-style: none;
`;

const TagItem = styled.li`
  display: inline-block;
  margin: 0 ${rhythm(4 / 12)} ${rhythm(1 / 12)} 0;

  a {
    padding: ${rhythm(1 / 12)};
    color: hsl(208, 100%, 62%);
    font-size: ${rhythm(10 / 16)};
    text-decoration: none;
  }

  ${mq[1]} {
    a {
      font-size: ${rhythm(11 / 16)};
    }
  }
`;

const Separator = styled.hr`
  margin: 1.4rem 0 1rem;
`;

const RelatedTitle = styled.h3`
  margin: 1.4rem 0 1rem;
`;

const RelatedPosts = styled.ul`
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
  }
`;

export function PostView({ article, relatedArticles, imageUrl }: PostViewProps) {
  const imageWidth = article.image?.width || 1200;
  const imageHeight = article.image?.height || 630;

  return (
    <PageShell>
      {imageUrl ? (
        <HeroImage>
          <Image
            src={imageUrl}
            alt={article.image?.alternativeText || article.title}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width: 732px) 700px, calc(100vw - 32px)"
          />
        </HeroImage>
      ) : null}
      <ArticleWrap>
        <Title>{article.title}</Title>
        <PostedDate>
          {formatIsoDate(article.publish_date)}
          {article.update_date ? `(更新: ${formatIsoDate(article.update_date)})` : ""}
        </PostedDate>
        {article.tags.length > 0 ? (
          <TagList>
            {article.tags.map((tag) => (
              <TagItem key={tag.slug}>
                <Link href={`/tags/${tag.slug}`}>#{tag.tagname}</Link>
              </TagItem>
            ))}
          </TagList>
        ) : null}
        <MarkdownContent content={article.content} />
        <Separator />
        {relatedArticles.length > 0 ? (
          <>
            <RelatedTitle>ほかの記事</RelatedTitle>
            <RelatedPosts>
              {relatedArticles.map((entry) => (
                <PostCard key={entry.slug} article={entry} />
              ))}
            </RelatedPosts>
          </>
        ) : null}
      </ArticleWrap>
    </PageShell>
  );
}
