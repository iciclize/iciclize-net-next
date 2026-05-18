"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import type { StrapiArticle } from "@/lib/strapi";
import { formatIsoDate, resolveMarkdownImageSrc } from "@/lib/markdown";
import { mq, rhythm } from "@/lib/style";

type PostCardProps = {
  article: StrapiArticle;
  enlargeLatest?: boolean;
};

const PostTitle = styled.h2`
  margin: 0 0 ${rhythm(1 / 12)};
  font-weight: 500;
  font-size: ${rhythm(7 / 12)};
  line-height: ${rhythm(11 / 12)};
  letter-spacing: 0;

  a {
    color: #191919;
    text-decoration: none;
  }

  ${mq[1]} {
    font-size: ${rhythm(9 / 12)};
    line-height: ${rhythm(13 / 12)};
  }
`;

const PublishDate = styled.div`
  margin: 0;
  font-size: ${rhythm(8 / 16)};
  color: hsl(0, 0%, 40%);

  ${mq[1]} {
    font-size: ${rhythm(9 / 16)};
  }
`;

const PostTags = styled.ul`
  margin: ${rhythm(-2 / 12)} 0 0;
  list-style: none;

  ${mq[1]} {
    margin: 0;
  }
`;

const PostTag = styled.li`
  display: inline-block;
  margin: 0 ${rhythm(4 / 12)} ${rhythm(1 / 12)} 0;

  a {
    padding: ${rhythm(1 / 12)};
    color: hsl(208, 100%, 62%);
    font-size: ${rhythm(8 / 16)};
    text-decoration: none;
  }

  ${mq[1]} {
    a {
      font-size: ${rhythm(9 / 16)};
    }
  }
`;

const PostSummary = styled.div`
  margin: ${rhythm(1 / 12)} 0 ${rhythm(2 / 12)};
  color: hsl(0, 0%, 40%);
  font-size: ${rhythm(8 / 16)};
  line-height: ${rhythm(12 / 16)};
  font-weight: 400;

  ${mq[1]} {
    font-size: ${rhythm(9 / 16)};
    line-height: ${rhythm(15 / 16)};
  }
`;

const PostContainer = styled.li<{ $enlargeLatest: boolean; $isLifeTag: boolean }>`
  min-width: 30%;
  margin: 0;
  padding: 0 0 0 ${rhythm(3 / 12)};
  border-left: 3px solid
    ${(props) => (props.$isLifeTag ? "hsl(150, 65%, 79%)" : "hsl(204, 100%, 79%)")};

  ${mq[0]} {
    padding-left: ${rhythm(4 / 12)};

    ${(props) =>
      props.$enlargeLatest
        ? `
      &:first-of-type {
        grid-column: 1 / 3;
      }
    `
        : ""}
  }
`;

const PostHead = styled.div``;

const PostImage = styled.div`
  float: right;
  width: 50%;
  max-width: 11rem;
  max-height: 6rem;
  margin: 0 0 0.4rem 0.4rem;

  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }

  ${mq[0]} {
    float: none;
    width: unset;
    max-width: none;
    max-height: none;
    margin: 0 0 ${rhythm(4 / 12)} 0;
  }
`;

export function PostCard({ article, enlargeLatest = false }: PostCardProps) {
  const imageUrl = article.image?.url ? resolveMarkdownImageSrc(article.image.url) : null;
  const imageWidth = article.image?.width || 1000;
  const imageHeight = article.image?.height || 414;
  const isLifeTag = article.tags[0]?.slug === "life";

  return (
    <PostContainer $enlargeLatest={enlargeLatest} $isLifeTag={isLifeTag}>
      <PostHead>
        {imageUrl ? (
          <PostImage>
            <Link href={`/posts/${article.slug}`}>
              <Image
                src={imageUrl}
                alt={article.image?.alternativeText || article.title}
                width={imageWidth}
                height={imageHeight}
                unoptimized
                priority={enlargeLatest}
              />
            </Link>
          </PostImage>
        ) : null}
        <PostTitle>
          <Link href={`/posts/${article.slug}`}>{article.title}</Link>
        </PostTitle>
        <PublishDate>{formatIsoDate(article.publish_date)}</PublishDate>
        {article.tags.length > 0 ? (
          <PostTags>
            {article.tags.map((tag) => (
              <PostTag key={`${article.slug}-${tag.slug}`}>
                <Link href={`/tags/${tag.slug}`}>
                  <span style={{ marginRight: "0.1rem" }}>#</span>
                  {tag.tagname}
                </Link>
              </PostTag>
            ))}
          </PostTags>
        ) : null}
      </PostHead>
      {article.summary ? <PostSummary>{article.summary}</PostSummary> : null}
    </PostContainer>
  );
}
