export const siteConfig = {
  title: "迫真の氷結晶",
  phrase: "初投稿です。",
  description:
    "いの(@iciclize)による、技術・ブログだったりポートフォリオサイトだったりします。",
  siteUrl: "https://iciclize.net",
  author: "@iciclize",
  feedIframeUrl: process.env.FEED_IFRAME_URL || "https://memos.iciclize.net/u/1",
};

export const headerNavItems = [
  { href: "/", label: "HOME" },
  { href: "/profile", label: "自己紹介" },
  { href: "/works", label: "作品集" },
  { href: "/tags/life", label: "生活系" },
];

export const footerNavItems = [
  { href: "/", label: "Posts" },
  { href: "/posts/about", label: "About" },
  { href: "/profile", label: "Profile" },
  { href: "/works", label: "Works" },
];
