import Stagger from "@/components/stagger";
import Divider from "@/components/ui/divider";
import Intro from "@/app/(main)/intro";
import TechStack from "@/app/(main)/tech-stack";
import LatestArticles from "@/app/(main)/latest-articles";

export default function HomePage() {
  return (
    <Stagger>
      <Intro />
      <Divider />
      <LatestArticles />
      <Divider />
      <TechStack />
    </Stagger>
  );
}
