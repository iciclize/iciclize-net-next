export type WorkEntry = {
  slug: string;
  date: string;
  title: string;
  description: string;
  keywords: string[];
  imagename?: string;
  imageWidth?: number | null;
  imageHeight?: number | null;
  content: string;
  directoryName: string;
};

export function getWorkAssetPath(work: Pick<WorkEntry, "directoryName">, filename: string) {
  return `/works-assets/${work.directoryName}/${filename}`;
}
