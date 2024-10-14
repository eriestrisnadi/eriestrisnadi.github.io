import Stagger from "@/components/stagger";
import Divider from "@/components/divider";
import Intro from "./intro";
import TechStack from "./tech-stack";

export default function HomePage() {
  return (
    <Stagger>
      <Intro />
      <Divider />
      <TechStack />
    </Stagger>
  );
}
