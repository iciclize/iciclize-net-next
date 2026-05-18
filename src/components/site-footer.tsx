"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { footerNavItems, siteConfig } from "@/lib/site";
import { mq, rhythm } from "@/lib/style";

const Footer = styled.footer`
  margin-top: auto;
  font-size: 13px;
  color: white;
  background: gray;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 920px;
  margin: 0 auto;
  padding: 20px ${rhythm(6 / 12)} 60px;

  section,
  nav {
    line-height: ${rhythm(1)};
  }

  ${mq[0]} {
    padding: 20px ${rhythm(10 / 12)} 60px;
  }

  ${mq[2]} {
    padding: 20px ${rhythm(10 / 12)} 60px;
  }

  ${mq[1]} {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Copy = styled.section`
  margin-top: 0.4rem;
`;

const Nav = styled.nav`
  display: flex;
  margin-top: 0.4rem;

  a {
    position: relative;
    color: white;
    text-decoration: none;
  }

  a + a {
    margin-left: 20px;
  }

  a + a::before {
    content: "";
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
  }
`;

export function SiteFooter() {
  return (
    <Footer>
      <Inner>
        <Copy>
          {siteConfig.title} © {new Date().getFullYear()}
        </Copy>
        <Nav aria-label="Footer">
          {footerNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </Nav>
      </Inner>
    </Footer>
  );
}
