const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1339";

type RouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { slug } = await context.params;
  const upstreamUrl = `${STRAPI_URL}/uploads/${slug.map(encodeURIComponent).join("/")}`;
  const upstream = await fetch(upstreamUrl, {
    next: { revalidate: 60, tags: ["strapi"] },
  });

  if (!upstream.ok) {
    return new Response("Not found", { status: upstream.status });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  const cacheControl = upstream.headers.get("cache-control");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  headers.set("cache-control", cacheControl || "public, max-age=60, s-maxage=60");

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}
