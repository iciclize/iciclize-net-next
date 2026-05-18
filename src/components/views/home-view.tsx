"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { PageShell } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import type { StrapiArticle, StrapiTag } from "@/lib/strapi";
import { siteConfig } from "@/lib/site";
import { mq, rhythm } from "@/lib/style";

type HomeViewProps = {
  lifeArticles: StrapiArticle[];
  mainArticles: StrapiArticle[];
  tags: StrapiTag[];
  tagCounts: Record<string, number>;
};

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;

  ${mq[3]} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const MainColumn = styled.div`
  margin: 0 ${rhythm(5 / 12)} 1rem;
`;

const Posts = styled.ul`
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
`;

const Side = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  flex-wrap: wrap;
  margin: ${rhythm(10 / 12)} 0 0;

  ${mq[1]} {
    width: 740px;
    margin: ${rhythm(10 / 12)} auto 0;
    flex-direction: row;
  }

  ${mq[3]} {
    width: auto;
    margin: 0 0 0 1.5rem;
    flex-direction: column;
  }
`;

const SideInner = styled.section`
  flex: 1 1 40%;
  min-width: 25%;
  margin: 0 ${rhythm(8 / 12)} ${rhythm(12 / 12)};
`;

const SectionHeading = styled.div<{ $color: string }>`
  display: flex;
  padding-bottom: ${rhythm(6 / 12)};
  border-bottom: 1px solid #ddd;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    padding: ${rhythm(4 / 12)};
    margin-right: ${rhythm(8 / 12)};
    border: 4px solid ${(props) => props.$color};
  }

  h2 {
    margin: 0;
    font-size: ${rhythm(17 / 24)};
    line-height: calc(${rhythm(8 / 12)} + 8px);
    font-weight: 600;
  }
`;

const FeedWrapper = styled.div`
  padding-top: ${rhythm(8 / 12)};
`;

const FeedIframe = styled.iframe`
  width: 100%;
  min-height: 30rem;
  border: none;
`;

const FeatureList = styled.ul`
  display: grid;
  gap: ${rhythm(8 / 12)};
  max-width: 740px;
  margin: 0;
  padding-top: ${rhythm(8 / 12)};
  list-style: none;

  ${mq[0]} {
    grid-template-columns: 1fr 1fr;
  }

  ${mq[1]} {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.li`
  min-width: 30%;
  margin: 0;
  padding-left: ${rhythm(4 / 12)};
  border-left: 3px solid hsl(150, 65%, 79%);
`;

const FeatureTitle = styled.h3`
  margin: 0;
  font-weight: 400;
  font-size: ${rhythm(7 / 12)};
  line-height: ${rhythm(11 / 12)};
  letter-spacing: 0;

  a {
    color: #191919;
    text-decoration: none;
  }

  ${mq[1]} {
    font-size: ${rhythm(8 / 12)};
    line-height: ${rhythm(14 / 12)};
  }
`;

const FeatureDate = styled.div`
  margin: 0;
  color: hsl(0, 0%, 40%);
  font-size: ${rhythm(8 / 16)};

  ${mq[1]} {
    font-size: ${rhythm(9 / 16)};
  }
`;

const TagHeader = styled.h2`
  margin-bottom: ${rhythm(8 / 12)};
  padding-bottom: ${rhythm(6 / 12)};
  border-bottom: 1px solid #ddd;
  font-size: ${rhythm(17 / 24)};
  line-height: calc(1.5rem + 4px);
`;

const TagList = styled.ul`
  max-width: 740px;
  margin-left: ${rhythm(4 / 12)};
  list-style: none;
`;

const TagItem = styled.li`
  margin: 0 0 ${rhythm(3 / 12)};
  font-weight: 400;
  font-size: ${rhythm(7 / 12)};
  line-height: ${rhythm(10 / 12)};
  letter-spacing: ${rhythm(1 / 24)};

  a {
    color: hsl(208, 100%, 62%);
    text-decoration: none;
  }
`;

export function HomeView({ lifeArticles, mainArticles, tags, tagCounts }: HomeViewProps) {
  return (
    <PageShell width="full">
      <TwoColumn>
        <MainColumn>
          <Posts>
            {mainArticles.map((article, index) => (
              <PostCard key={article.slug} article={article} enlargeLatest={index === 0} />
            ))}
          </Posts>
        </MainColumn>
        <Side>
          <SideInner>
            <SectionHeading $color="hsl(194, 90%, 85%)">
              <h2>
                つぶやき <a href={siteConfig.feedIframeUrl}>🔗</a>
              </h2>
            </SectionHeading>
            <FeedWrapper>
              <FeedIframe title="Feeds" src={siteConfig.feedIframeUrl} />
            </FeedWrapper>
          </SideInner>
          <SideInner>
            <SectionHeading $color="hsl(150, 65%, 79%)">
              <h2>生活系エントリ新着</h2>
            </SectionHeading>
            <FeatureList>
              {lifeArticles.map((article) => (
                <FeatureItem key={article.slug}>
                  <FeatureTitle>
                    <Link href={`/posts/${article.slug}`}>{article.title}</Link>
                  </FeatureTitle>
                  <FeatureDate>{article.publish_date.slice(0, 10)}</FeatureDate>
                </FeatureItem>
              ))}
            </FeatureList>
          </SideInner>
          <SideInner>
            <TagHeader>タグ一覧</TagHeader>
            <TagList>
              {tags.map((tag) => (
                <TagItem key={tag.slug}>
                  <Link href={`/tags/${tag.slug}`}>
                    <span style={{ marginRight: "0.2rem" }}>#</span>
                    {tag.tagname} ({tagCounts[tag.slug] || 0})
                  </Link>
                </TagItem>
              ))}
            </TagList>
          </SideInner>
        </Side>
      </TwoColumn>
    </PageShell>
  );
}
