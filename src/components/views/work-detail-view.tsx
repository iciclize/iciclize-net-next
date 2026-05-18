"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { MarkdownContent } from "@/components/markdown-content";
import { PageShell } from "@/components/page-shell";
import { WorksNav } from "@/components/works-nav";
import type { WorkEntry } from "@/lib/works-types";
import { mq, rhythm } from "@/lib/style";

type WorkDetailViewProps = {
  work: WorkEntry;
  next: WorkEntry | null;
  prev: WorkEntry | null;
  imageUrl: string | null;
};

const pageWidth = "700px";

const TopWrap = styled.article`
  width: min(700px, calc(100% - 32px));
  margin: 0 auto;
`;

const Timing = styled.div`
  color: hsl(0, 0%, 52%);
  text-align: center;
  font-size: ${rhythm(12 / 20)};

  ${mq[1]} {
    font-size: ${rhythm(13 / 20)};
  }
`;

const Title = styled.h1`
  margin: ${rhythm(4 / 12)} 0 ${rhythm(16 / 12)};
  text-align: center;
  font-size: ${rhythm(1)};
  font-weight: 700;
  letter-spacing: ${rhythm(1 / 24)};

  ${mq[1]} {
    font-size: ${rhythm(14 / 12)};
  }
`;

const Hero = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto ${rhythm(8 / 12)};

  img {
    display: block;
    width: 100%;
    margin: 0;
  }
`;

const BodyWrap = styled.article`
  width: min(700px, calc(100% - 32px));
  margin: 0 auto;
`;

export function WorkDetailView({ work, next, prev, imageUrl }: WorkDetailViewProps) {
  const imageWidth = work.imageWidth || 1200;
  const imageHeight = work.imageHeight || 675;

  return (
    <PageShell>
      <TopWrap>
        <Timing>{work.date}</Timing>
        <Title>{work.title}</Title>
      </TopWrap>
      {imageUrl ? (
        <Hero>
          <Image
            src={imageUrl}
            alt={work.title}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width: 732px) 700px, calc(100vw - 32px)"
          />
        </Hero>
      ) : null}
      <BodyWrap>
        <MarkdownContent content={work.content} baseAssetPath={`/works-assets/${work.directoryName}`} />
        <WorksNav next={next} prev={prev} />
      </BodyWrap>
    </PageShell>
  );
}
