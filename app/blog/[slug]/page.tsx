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
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-[700px] mx-auto px-6 py-12 md:py-16">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-brown/60 hover:text-sage transition-colors duration-150 mb-10"
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
        <header className="mb-10 pb-8 border-b border-sage-soft">
          <time
            dateTime={post.date}
            className="text-xs font-medium text-brown/50 uppercase tracking-widest"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-3xl md:text-[2.25rem] font-semibold text-brown leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-[17px] text-brown/85 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* MDX content */}
        <article className="
          prose prose-base max-w-none
          prose-headings:font-semibold prose-headings:text-brown prose-headings:leading-snug
          prose-h2:text-[1.4rem] prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-[1.15rem] prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-brown prose-p:leading-[1.8] prose-p:my-5 prose-p:text-[15px]
          prose-li:text-brown prose-li:leading-[1.8] prose-li:text-[15px]
          prose-ul:my-5 prose-ul:space-y-2
          prose-strong:text-brown prose-strong:font-semibold
          prose-a:text-sage prose-a:no-underline prose-a:font-medium hover:prose-a:underline
        ">
          <MDXRemote source={post.content} />
        </article>

        {/* Footer CTA */}
        {post.tags?.includes("Counselling") ? (
          <div className="mt-16 -mx-6 bg-peach-tint px-6 py-12 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-4">
              Counselling
            </p>
            <h2 className="text-2xl font-semibold text-brown mb-4">
              Ready to get started?
            </h2>
            <p className="text-[15px] text-brown/85 leading-relaxed mb-6 max-w-md">
              The first step is a free, no-pressure intro call to see if we are a good fit.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/contact?topic=intro-call"
                className="inline-block bg-peach text-brown font-semibold rounded-full px-6 py-2.5 hover:bg-peach/90 transition-colors text-sm"
              >
                Book a free intro call
              </Link>
              <Link
                href="/counselling"
                className="text-sm text-brown/85 font-medium underline underline-offset-4 hover:text-brown transition-colors"
              >
                More about counselling
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-16 pt-8 border-t border-sage-soft">
            <p className="text-[15px] text-brown/85 leading-relaxed mb-5">
              Have questions about your NDIS plan or support coordination?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-6 py-2.5 hover:bg-peach/90 transition-colors text-sm"
            >
              Get in touch
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
