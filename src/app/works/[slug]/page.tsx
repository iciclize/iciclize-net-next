import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetailView } from "@/components/views/work-detail-view";
import { getAdjacentWorks, getAllWorks, getWorkBySlug } from "@/lib/works";
import { getWorkAssetPath } from "@/lib/works-types";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const { next, prev } = await getAdjacentWorks(slug);
  const imageUrl = work.imagename ? getWorkAssetPath(work, work.imagename) : null;

  return <WorkDetailView work={work} next={next} prev={prev} imageUrl={imageUrl} />;
}
