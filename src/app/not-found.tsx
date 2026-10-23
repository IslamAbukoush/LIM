import { PageIntro, ActionLink } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container not-found">
      <PageIntro
        label="404"
        title="This page isn’t here."
        description="The page may have moved, or the address may be incomplete."
      />
      <ActionLink href="/">Return home</ActionLink>
    </div>
  );
}
