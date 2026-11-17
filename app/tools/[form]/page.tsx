import { notFound } from "next/navigation";
import FormRunner from "@/components/tools/FormRunner";
import { forms, getForm } from "@/lib/tools/forms";

export function generateStaticParams() {
  return forms.map((form) => ({ form: form.slug }));
}

export function generateMetadata({ params }: { params: { form: string } }) {
  return { title: getForm(params.form)?.title ?? "Tools" };
}

export default function FormPage({ params }: { params: { form: string } }) {
  if (!getForm(params.form)) notFound();
  return <FormRunner slug={params.form} />;
}
