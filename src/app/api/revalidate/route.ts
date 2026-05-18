import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidatePayload = {
  uid?: string;
  action?: string;
  documentId?: string | null;
  locale?: string | null;
  reasons?: Array<{
    uid?: string;
    action?: string;
    documentId?: string | null;
    locale?: string | null;
  }>;
};

function isAuthorized(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  if (authorization === `Bearer ${secret}`) {
    return true;
  }

  return request.headers.get("x-revalidate-token") === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as RevalidatePayload;

  revalidateTag("strapi", "max");

  return NextResponse.json({
    ok: true,
    revalidated: "strapi",
    at: new Date().toISOString(),
    payload,
  });
}
