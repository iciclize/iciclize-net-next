"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { getWorkAssetPath, type WorkEntry } from "@/lib/works-types";
import { mq, rhythm } from "@/lib/style";
import { PageShell } from "@/components/page-shell";

type WorksViewProps = {
  works: WorkEntry[];
};

const WorksContainer = styled.div`
  max-width: 940px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: ${rhythm(1)};
  font-weight: 450;
`;

const Subtitle = styled.p`
  text-align: center;
`;

const WorksList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -${rhythm(6 / 12)} ${rhythm(3 / 12)} 60px;
  list-style: none;

  &::after {
    content: "";
    width: 34%;
  }

  ${mq[0]} {
    margin: 0 ${rhythm(6 / 12)} 60px;
  }
`;

const Item = styled.li`
  display: flex;
  flex: 1 1 45%;
  flex-direction: column;
  margin: ${rhythm(4 / 12)} ${rhythm(4 / 12)};

  ${mq[1]} {
    flex-basis: 30%;
    padding: ${rhythm(8 / 12)} ${rhythm(6 / 12)} ${rhythm(8 / 12)};
  }
`;

const Time = styled.div`
  position: relative;
  padding: 0 0 ${rhythm(4 / 12)} 0;
  text-align: right;
  font-size: ${rhythm(13 / 24)};
`;

const Title = styled.h2`
  margin: ${rhythm(6 / 12)} 0 ${rhythm(2 / 12)};
  font-size: ${rhythm(17 / 24)};
  line-height: ${rhythm(22 / 24)};
  font-weight: 700;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Keyword = styled.div`
  margin-right: ${rhythm(3 / 12)};
  padding: 1px 4px;
  border-radius: 2px;
  background-color: #999;
  color: white;
  font-size: ${rhythm(10 / 24)};
  font-weight: 500;

  ${mq[1]} {
    font-size: ${rhythm(12 / 24)};
  }
`;

const Description = styled.div`
  margin-top: ${rhythm(2 / 24)};
  font-size: ${rhythm(14 / 24)};
  line-height: ${rhythm(22 / 24)};

  ${mq[1]} {
    margin-top: ${rhythm(4 / 24)};
  }
`;

const WorkImage = styled.img`
  display: block;
  width: 100%;
  margin: 0;
`;

export function WorksView({ works }: WorksViewProps) {
  return (
    <PageShell width="wide">
      <WorksContainer>
        <PageTitle>作品集</PageTitle>
        <Subtitle>サムネイルが映えないのはご愛嬌</Subtitle>
        <WorksList>
          {works.map((work) => {
            const imageUrl = work.imagename ? getWorkAssetPath(work, work.imagename) : null;

            return (
              <Item key={work.slug}>
                <Time>{work.date}</Time>
                {imageUrl ? (
                  <Link href={`/works/${work.slug}`}>
                    <WorkImage src={imageUrl} alt={work.title} />
                  </Link>
                ) : null}
                <Title>
                  <Link href={`/works/${work.slug}`}>{work.title}</Link>
                </Title>
                <Keywords>
                  {work.keywords.map((keyword) => (
                    <Keyword key={`${work.slug}-${keyword}`}>{keyword}</Keyword>
                  ))}
                </Keywords>
                <Description>{work.description}</Description>
              </Item>
            );
          })}
        </WorksList>
      </WorksContainer>
    </PageShell>
  );
}
