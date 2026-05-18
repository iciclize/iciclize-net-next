"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { MarkdownContent } from "@/components/markdown-content";
import { PageShell } from "@/components/page-shell";
import { formatIsoDate } from "@/lib/markdown";
import type { StrapiProfile } from "@/lib/strapi";
import { rhythm } from "@/lib/style";

type ProfileViewProps = {
  profile: StrapiProfile | null;
};

const Wrap = styled.article`
  width: min(620px, calc(100% - 32px));
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: ${rhythm(1)};
  font-weight: 450;
`;

const Updated = styled.div`
  text-align: right;
  font-size: ${rhythm(6 / 12)};
`;

const Center = styled.p`
  text-align: center;
`;

const ProfileTable = styled.div`
  display: table;
  margin: 1.5rem 0 1rem;
`;

const ProfileCell = styled.div`
  display: table-cell;
  padding: 0 0.8rem;
  vertical-align: middle;
`;

const Name = styled.h2`
  margin: 0;
  padding: 0 0 0.6rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 400;
`;

const Socials = styled.div`
  font-size: 0.9rem;
`;

const Social = styled.span`
  display: inline-block;
  margin-right: 1.2rem;
`;

const Photos = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

const Photo = styled.div<{ $grow: number }>`
  position: relative;
  flex: ${(props) => props.$grow} 1 0;
  min-width: 0;
  height: 300px;

  img {
    margin: 0;
    object-fit: cover;
    object-position: center;
  }
`;

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <PageShell>
      <Wrap>
        <Title>自己紹介</Title>
        {profile?.update_date || profile?.updatedAt ? (
          <Updated>最終更新: {formatIsoDate(profile.update_date || profile.updatedAt)}</Updated>
        ) : null}
        <Center>インターネット自分語り許可エリア</Center>
        <ProfileTable>
          <Image
            src="https://www.gravatar.com/avatar/e5ef3698ccb90ecd2a50b1440dd7ee37?s=128"
            alt=""
            width={64}
            height={64}
          />
          <ProfileCell>
            <Name>いの</Name>
            <Socials>
              <Social>
                Twitter: <a href="https://twitter.com/iciclize">@iciclize</a>
              </Social>
              <Social>
                YouTube:{" "}
                <a href="https://www.youtube.com/channel/UC6-gqITzzm_Eez5SXbQyJrg">@szkfk</a>
              </Social>
              <Social>
                Instagram: <a href="https://www.instagram.com/iciqle/">@iciqle</a>
              </Social>
            </Socials>
          </ProfileCell>
        </ProfileTable>
        <b>写真</b>
        <Photos>
          <Photo $grow={1}>
            <Image
              fill
              sizes="(min-width: 652px) 200px, calc((100vw - 32px - 0.75rem) / 3)"
              src="https://nnyapi.iciclize.net/uploads/20260426_yino_0_fdc2d5a8cd.jpeg"
              alt="Y.Ino profile image 0 2026-04-26"
            />
          </Photo>
          <Photo $grow={2}>
            <Image
              fill
              sizes="(min-width: 652px) 400px, calc((100vw - 32px - 0.75rem) * 2 / 3)"
              src="https://nnyapi.iciclize.net/uploads/ino_atlier_renard_ae2f87bc53.jpg"
              alt="Y.Ino profile image 1 2026-05-10"
            />
          </Photo>
        </Photos>
        {profile?.content ? <MarkdownContent content={profile.content} /> : null}
      </Wrap>
    </PageShell>
  );
}
