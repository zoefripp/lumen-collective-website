type Variant = "main" | "sage" | "white";

const SRC: Record<Variant, string> = {
  main: "/lumen-brand-files/lumen-logo-main.svg",
  sage: "/lumen-brand-files/lumen-logo-on-sage-transparent.svg",
  white: "/lumen-brand-files/lumen-logo-white.svg",
};

type Props = {
  variant?: Variant;
  className?: string;
};

export default function Logo({ variant = "main", className = "h-10 w-auto" }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={SRC[variant]} alt="Lumen Collective" className={className} />;
}
