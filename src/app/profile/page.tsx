import type { Metadata } from "next";
import { ProfileView } from "@/components/views/profile-view";
import { getProfile } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "自己紹介",
  description: "24歳、学生です。(大嘘)",
};

export default async function ProfilePage() {
  const profile = await getProfile();
  return <ProfileView profile={profile} />;
}
