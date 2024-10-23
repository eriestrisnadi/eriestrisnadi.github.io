import Stagger from "@/components/stagger";
import Divider from "@/components/ui/divider";
import Intro from "@/app/(main)/intro";
import TechStack from "@/app/(main)/tech-stack";

export default function HomePage() {
  return (
    <Stagger>
      <Intro />
      <Divider />
      <TechStack />
    </Stagger>
  );
}
