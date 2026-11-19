import Link from "next/link";
import { forms } from "@/lib/tools/forms";
import MailStatus from "@/components/tools/MailStatus";

export default function ToolsMenu() {
  // Keep the order forms are listed in, grouped under their headings.
  const groups: { name: string; items: typeof forms }[] = [];
  for (const form of forms) {
    const name = form.group ?? "Other forms";
    let group = groups.find((item) => item.name === name);
    if (!group) {
      group = { name, items: [] };
      groups.push(group);
    }
    group.items.push(form);
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-semibold text-charcoal mb-2">Recovery Coaching forms</h1>
      <p className="text-muted mb-6">Choose a form to start.</p>
      <MailStatus />
      {groups.map((group) => (
        <section key={group.name} className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">{group.name}</h2>
          <div className="grid gap-4">
            {group.items.map((form) => (
              <Link
                key={form.slug}
                href={`/tools/${form.slug}`}
                className="block rounded-2xl border border-gray-200 bg-white p-6 active:bg-teal/5"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-teal">{form.title}</h3>
                  {form.sessionMinutes && (
                    <span className="rounded-full bg-teal/10 px-3 py-0.5 text-xs font-semibold text-teal">
                      {form.sessionMinutes} min session
                    </span>
                  )}
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
        </section>
      ))}
    </div>
  );
}
