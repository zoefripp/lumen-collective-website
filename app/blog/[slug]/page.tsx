import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    // Task 1: title only — layout template appends "| Lumen Collective" once
    title: post.title,
    description: post.excerpt,
    alternates: {
      // Use frontmatter canonical if set (e.g. to point to a location page to avoid duplicate content)
      canonical: post.canonical ?? `https://www.lumencollective.com.au/blog/${params.slug}`,
    },
  };
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const BASE_URL = "https://www.lumencollective.com.au";

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Lumen Collective" },
    publisher: {
      "@type": "Organization",
      name: "Lumen Collective",
      url: BASE_URL,
    },
    datePublished: post.date,
    url: `${BASE_URL}/blog/${params.slug}`,
  };

  return (
    <div className="bg-offwhite min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-[700px] mx-auto px-6 py-12 md:py-16">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[#1a6b6b] transition-colors duration-150 mb-10"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10 pb-8 border-b border-gray-200">
          <time
            dateTime={post.date}
            className="text-xs font-medium text-muted uppercase tracking-widest"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-3xl md:text-[2.25rem] font-semibold text-charcoal leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-[17px] text-muted leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* MDX content */}
        <article className="
          prose prose-base max-w-none
          prose-headings:font-semibold prose-headings:text-[#1a6b6b] prose-headings:leading-snug
          prose-h2:text-[1.4rem] prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-[1.15rem] prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[#1a1a1a] prose-p:leading-[1.8] prose-p:my-5 prose-p:text-[15px]
          prose-li:text-[#1a1a1a] prose-li:leading-[1.8] prose-li:text-[15px]
          prose-ul:my-5 prose-ul:space-y-2
          prose-strong:text-[#1a1a1a] prose-strong:font-semibold
          prose-a:text-[#1a6b6b] prose-a:no-underline prose-a:font-medium hover:prose-a:underline
        ">
          <MDXRemote source={post.content} />
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-[15px] text-muted leading-relaxed mb-5">
            Have questions about your NDIS plan or support coordination?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-150 text-sm"
          >
            Get in Touch
          </Link>
        </div>

      </div>
    </div>
  );
}
