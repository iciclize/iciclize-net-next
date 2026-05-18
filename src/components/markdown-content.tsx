/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Tweet } from "react-tweet";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { normalizeMarkdownHref, resolveMarkdownImageSrc } from "@/lib/markdown";

type MarkdownContentProps = {
  content: string;
  baseAssetPath?: string;
};

type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function getClassNames(node?: HastNode) {
  const className = node?.properties?.className;
  if (Array.isArray(className)) {
    return className.filter((value): value is string => typeof value === "string");
  }
  if (typeof className === "string") {
    return className.split(/\s+/).filter(Boolean);
  }
  return [];
}

function walk(node: HastNode | undefined, visit: (current: HastNode) => string | null): string | null {
  if (!node) {
    return null;
  }

  const direct = visit(node);
  if (direct) {
    return direct;
  }

  for (const child of node.children || []) {
    const nested = walk(child, visit);
    if (nested) {
      return nested;
    }
  }

  return null;
}

function extractTweetId(node: HastNode | undefined) {
  const href = walk(node, (current) => {
    if (current.tagName !== "a") {
      return null;
    }
    const value = current.properties?.href;
    return typeof value === "string" && /\/status\/\d+/.test(value) ? value : null;
  });

  return href?.match(/\/status\/(\d+)/)?.[1] || null;
}

export function MarkdownContent({ content, baseAssetPath }: MarkdownContentProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.iframely?.load) {
      window.iframely.load();
    }
  }, [content]);

  const components: Components = {
    a: ({ href, children, ...props }) => {
      const { node, ...anchorProps } = props as typeof props & { node?: unknown };
      void node;

      const normalizedHref = normalizeMarkdownHref(href || "");
      const isInternal =
        normalizedHref.startsWith("/") ||
        normalizedHref.startsWith("#") ||
        normalizedHref.startsWith("../");

      if (isInternal && !normalizedHref.startsWith("#")) {
        return (
          <Link href={normalizedHref} {...anchorProps}>
            {children}
          </Link>
        );
      }

      return (
        <a href={normalizedHref} {...anchorProps}>
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => {
      const { node, ...imageProps } = props as typeof props & { node?: unknown };
      void node;
      if (!src || typeof src !== "string") {
        return null;
      }

      return (
        <img
          src={resolveMarkdownImageSrc(src, baseAssetPath)}
          alt={alt || ""}
          loading="lazy"
          {...imageProps}
        />
      );
    },
    blockquote: ({ node, children, ...props }) => {
      const hastNode = node as unknown as HastNode;
      const classNames = getClassNames(hastNode);
      if (classNames.includes("twitter-tweet")) {
        const tweetId = extractTweetId(hastNode);
        if (tweetId) {
          const TweetNotFoundFallback = () => <blockquote {...props}>{children}</blockquote>;
          return (
            <div className="tweet-embed">
              <Tweet id={tweetId} components={{ TweetNotFound: TweetNotFoundFallback }} />
            </div>
          );
        }
      }

      return <blockquote {...props}>{children}</blockquote>;
    },
  };

  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
