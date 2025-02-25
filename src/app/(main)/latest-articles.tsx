import * as motion from "motion/react-client";
import SectionHeading from "@/components/section-heading";
import RecentPostsCarousel from "@/app/(resources)/blog/recent-posts-carousel";
import { fadeUp } from "@/lib/animation";

export default function LatestArticles() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="mt-6">
        <SectionHeading>Latest Articles</SectionHeading>
      </motion.div>
      <RecentPostsCarousel />
    </div>
  );
}
