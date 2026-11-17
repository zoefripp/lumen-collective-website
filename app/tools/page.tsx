import Link from "next/link";
import { forms } from "@/lib/tools/forms";

export default function ToolsMenu() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-semibold text-charcoal mb-2">Recovery Coaching forms</h1>
      <p className="text-muted mb-8">Choose a form to complete together.</p>
      <div className="grid gap-4">
        {forms.map((form) => (
          <Link
            key={form.slug}
            href={`/tools/${form.slug}`}
            className="block rounded-2xl border border-gray-200 bg-white p-6 active:bg-teal/5"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-teal">{form.title}</h2>
              {form.sample && (
                <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800">
                  Sample
                </span>
              )}
            </div>
            <p className="mt-1 text-muted">{form.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
