import type { Metadata } from "next";
import { WorksView } from "@/components/views/works-view";
import { getAllWorks } from "@/lib/works";

export const metadata: Metadata = {
  title: "作品集",
};

export default async function WorksPage() {
  const works = await getAllWorks();
  return <WorksView works={works} />;
}
