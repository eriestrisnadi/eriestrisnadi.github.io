import Stagger from "@/components/stagger";
import Divider from "@/components/ui/divider";
import Intro from "@/app/(main)/intro";
import TechStack from "@/app/(main)/tech-stack";
import LatestArticles from "@/app/(main)/latest-articles";

export default function HomePage() {
  return (
    <div>
      <Stagger viewport={{ once: true }}>
        <Intro />
        <Divider />
        <LatestArticles />
      </Stagger>
      <Stagger viewport={{ once: true }}>
        <Divider />
        <TechStack />
      </Stagger>
    </div>
  );
}
