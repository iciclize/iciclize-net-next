"use client";

type PageShellProps = {
  children: React.ReactNode;
  width?: "narrow" | "wide" | "full";
};

export function PageShell({ children, width = "wide" }: PageShellProps) {
  return (
    <main className="page-main">
      <div className={`page-shell page-shell--${width}`}>{children}</div>
    </main>
  );
}
