"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { getWorkAssetPath, type WorkEntry } from "@/lib/works-types";
import { mq, rhythm } from "@/lib/style";

type WorksNavProps = {
  prev: WorkEntry | null;
  next: WorkEntry | null;
};

const Container = styled.nav`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3.2rem -0.8rem 3rem;

  &::before {
    content: "";
    position: absolute;
    top: -0.8rem;
    right: 0;
    left: 0;
    margin: 0 0.8rem;
    border-top: 1px solid #ddd;
  }
`;

const NavItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0.8rem 0.8rem 0;

  ${mq[1]} {
    max-width: 45%;
  }
`;

const Label = styled.div`
  margin: 0 0 ${rhythm(3 / 12)};
  font-size: ${rhythm(14 / 24)};
`;

const Inner = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const NavImage = styled.img`
  width: 72px;
  margin: 0 12px 0 0;
`;

const Title = styled.div`
  flex: 1 0 0%;
`;

function Item({ label, work }: { label: string; work: WorkEntry | null }) {
  if (!work) {
    return null;
  }

  const imageUrl = work.imagename ? getWorkAssetPath(work, work.imagename) : null;

  return (
    <NavItem>
      <Label>{label}</Label>
      <Link href={`/works/${work.slug}`}>
        <Inner>
          {imageUrl ? <NavImage src={imageUrl} alt={work.title} /> : null}
          <Title>{work.title}</Title>
        </Inner>
      </Link>
    </NavItem>
  );
}

export function WorksNav({ prev, next }: WorksNavProps) {
  return (
    <Container aria-label="Works navigation">
      <Item label="次の作品" work={next} />
      <Item label="過去の作品" work={prev} />
    </Container>
  );
}
