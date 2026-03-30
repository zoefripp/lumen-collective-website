import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | NDIS Insights & Guides",
  description:
    "Practical guides and insights about the NDIS, support coordination, and navigating disability services from the team at Lumen Collective.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/blog",
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1a6b6b] mb-3">
            Resources
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4 leading-tight">
            Blog
          </h1>
          <p className="text-base text-muted leading-relaxed">
            Practical guides and insights about the NDIS, support coordination,
            and getting the most from your plan.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-muted">No posts yet — check back soon.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <article key={post.slug} className="py-10 first:pt-0 last:pb-0 group">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium text-muted uppercase tracking-widest"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-3 mb-3 text-xl md:text-2xl font-semibold text-charcoal leading-snug group-hover:text-[#1a6b6b] transition-colors duration-150">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-[15px] text-muted leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a6b6b] hover:text-[#154f4f] transition-colors duration-150"
                  >
                    Read more
                    <span aria-hidden="true" className="text-base leading-none">→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
