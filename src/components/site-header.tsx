"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { headerNavItems, siteConfig } from "@/lib/site";
import { breakpoints, mq, rhythm } from "@/lib/style";

const Container = styled.header`
  margin-bottom: ${rhythm(1)};

  ${mq[1]} {
    margin-bottom: ${rhythm(16 / 12)};
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 920px;
  padding: ${rhythm(8 / 12)} ${rhythm(6 / 12)} ${rhythm(6 / 12)};

  ${mq[0]} {
    padding: ${rhythm(10 / 12)} ${rhythm(10 / 12)} ${rhythm(8 / 12)};
  }

  ${mq[2]} {
    padding: ${rhythm(14 / 12)} ${rhythm(10 / 12)} ${rhythm(10 / 12)};
  }
`;

const Title = styled.div`
  display: inline-flex;
`;

const SiteTitle = styled.h1`
  margin: 0;
  font-weight: 400;
  font-size: ${rhythm(8 / 12)};
  line-height: ${rhythm(1)};

  a {
    color: #454545;
    text-decoration: none;
  }

  ${mq[0]} {
    font-size: ${rhythm(9 / 12)};
  }
`;

const Subtitle = styled.p`
  margin: ${rhythm(1 / 12)} 0 0;
  font-size: ${rhythm(5 / 12)};
  line-height: ${rhythm(1)};

  &::before {
    content: "";
    margin: 0 0 0 ${rhythm(4 / 12)};
    padding-left: ${rhythm(4 / 12)};
    border-left: 1px solid hsl(0, 0%, 86%);
  }

  ${mq[0]} {
    font-size: ${rhythm(6 / 12)};
  }
`;

const Background = styled.div`
  position: relative;
  z-index: -2;
  padding-bottom: 24%;
  background: url("/crystal.gif");
  background-size: 123%;

  ${mq[1]} {
    padding-bottom: 200px;
    background-size: 100%;
  }

  ${mq[2]} {
    background-size: ${breakpoints[2]}px;
  }
`;

const NavWrap = styled.div`
  position: relative;
  border-top: 3px solid hsl(204, 100%, 79%);
  background: white;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
    height: 5px;
    box-shadow: 0 -4px 14px 0 rgba(0, 0, 0, 0.18);
  }

  ${mq[1]} {
    border-top-width: 5px;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 ${rhythm(6 / 12)};
  list-style: none;

  ${mq[0]} {
    padding: 0 ${rhythm(10 / 12)};
  }

  ${mq[2]} {
    padding: 0 ${rhythm(10 / 12)};
  }
`;

const NavItem = styled.li`
  flex: 1 1 auto;
  margin: 0;
  text-align: center;

  a {
    display: block;
    margin: ${rhythm(1 / 12)};
    padding: ${rhythm(6 / 12)} ${rhythm(4 / 12)};
    color: #454545;
    font-size: ${rhythm(13 / 24)};
    text-decoration: none;
  }

  a:hover {
    transition: background 0.25s;
    background: aliceblue;
  }
`;

export function SiteHeader() {
  return (
    <Container>
      <Inner>
        <Title>
          <SiteTitle>
            <Link href="/">{siteConfig.title}</Link>
          </SiteTitle>
          <Subtitle>{siteConfig.phrase}</Subtitle>
        </Title>
      </Inner>
      <Background />
      <NavWrap>
        <nav aria-label="Primary">
          <NavList>
            {headerNavItems.map((item) => (
              <NavItem key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </NavItem>
            ))}
          </NavList>
        </nav>
      </NavWrap>
    </Container>
  );
}
