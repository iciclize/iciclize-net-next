import { cache } from "react";

export type StrapiImage = {
  id?: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type StrapiTag = {
  id?: number;
  documentId?: string;
  slug: string;
  tagname: string;
};

export type StrapiArticle = {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  content: string;
  summary?: string | null;
  publish_date: string;
  update_date?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
  locale?: string;
  image?: StrapiImage | null;
  tags: StrapiTag[];
};

export type StrapiProfile = {
  id?: number;
  documentId?: string;
  content: string;
  update_date?: string | null;
  updatedAt?: string | null;
};

const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1339";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

type StrapiEntity<T> = {
  id?: number;
  documentId?: string;
  attributes?: T;
} & T;

type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntity<T>>;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
  meta?: Record<string, unknown>;
};

function buildHeaders() {
  const headers = new Headers();

  if (STRAPI_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`);
  }

  return headers;
}

async function strapiFetch<T>(pathname: string): Promise<T> {
  const response = await fetch(`${STRAPI_URL}${pathname}`, {
    headers: buildHeaders(),
    next: { revalidate: 60, tags: ["strapi"] },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${pathname}`);
  }

  return response.json() as Promise<T>;
}

function unwrapEntity<T extends Record<string, unknown>>(entity: StrapiEntity<T> | null | undefined) {
  if (!entity) {
    return null;
  }

  if ("attributes" in entity && entity.attributes) {
    return {
      id: entity.id,
      documentId: entity.documentId,
      ...entity.attributes,
    } as T & { id?: number; documentId?: string };
  }

  return entity as T & { id?: number; documentId?: string };
}

function normalizeImage(image: unknown): StrapiImage | null {
  const normalized = unwrapEntity(image as StrapiEntity<StrapiImage> | null);
  if (!normalized?.url) {
    return null;
  }

  return normalized;
}

function normalizeTag(tag: unknown): StrapiTag | null {
  const normalized = unwrapEntity(tag as StrapiEntity<StrapiTag> | null);
  if (!normalized?.slug || !normalized?.tagname) {
    return null;
  }

  return normalized;
}

function normalizeArticle(raw: StrapiEntity<Record<string, unknown>>): StrapiArticle {
  const entity = unwrapEntity(raw as StrapiEntity<StrapiArticle>) as StrapiArticle & {
    tags?: unknown;
    image?: unknown;
  };

  const rawTagsField = entity.tags as { data?: unknown[] } | unknown[] | undefined;
  const rawTags = Array.isArray(rawTagsField)
    ? rawTagsField
    : Array.isArray(rawTagsField?.data)
      ? rawTagsField.data
      : [];

  const rawImage =
    entity.image && typeof entity.image === "object" && "data" in (entity.image as Record<string, unknown>)
      ? (entity.image as { data?: unknown }).data
      : entity.image;

  return {
    id: entity.id,
    documentId: entity.documentId,
    title: entity.title,
    slug: entity.slug,
    content: entity.content,
    summary: entity.summary,
    publish_date: entity.publish_date,
    update_date: entity.update_date,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    publishedAt: entity.publishedAt,
    locale: entity.locale,
    image: normalizeImage(rawImage),
    tags: rawTags.map(normalizeTag).filter(Boolean) as StrapiTag[],
  };
}

function normalizeProfile(raw: StrapiEntity<Record<string, unknown>> | null): StrapiProfile | null {
  const entity = unwrapEntity(raw as StrapiEntity<StrapiProfile> | null);
  if (!entity?.content) {
    return null;
  }

  return entity;
}

export const getAllArticles = cache(async () => {
  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    "/api/articles?pagination[pageSize]=100&populate=*"
  );

  return response.data
    .map(normalizeArticle)
    .filter((article) => article.slug !== "dummy-post")
    .sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
});

export const getAllTags = cache(async () => {
  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    "/api/tags?pagination[pageSize]=100"
  );

  return response.data
    .map((tag) => normalizeTag(tag))
    .filter(Boolean)
    .filter((tag) => tag!.slug !== "dummy-tag") as StrapiTag[];
});

export const getArticleBySlug = cache(async (slug: string) => {
  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );

  const article = response.data[0];
  return article ? normalizeArticle(article) : null;
});

export const getArticlesByTag = cache(async (slug: string) => {
  const articles = await getAllArticles();
  return articles.filter((article) => article.tags.some((tag) => tag.slug === slug));
});

export const getProfile = cache(async () => {
  const response = await strapiFetch<StrapiSingleResponse<Record<string, unknown>>>(
    "/api/profile?populate=*"
  );

  return normalizeProfile(response.data);
});

export function getRelatedArticles(article: StrapiArticle, allArticles: StrapiArticle[]) {
  const targetTag = article.tags[0]?.slug;
  if (!targetTag) {
    return [];
  }

  const filtered = [...allArticles]
    .sort((a, b) => Date.parse(a.publish_date) - Date.parse(b.publish_date))
    .filter((entry) => entry.tags.some((tag) => tag.slug === targetTag));

  const index = filtered.findIndex((entry) => entry.slug === article.slug);
  if (index < 0) {
    return [];
  }

  const latter = filtered.slice(index + 1, index + 5);
  const previous = filtered.slice(Math.max(0, index - 4), index);

  return [...latter.reverse(), ...previous].slice(0, 8);
}
