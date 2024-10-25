import * as motion from "framer-motion/client";
import SectionHeading from "@/components/section-heading";
import { fadeUp } from "@/lib/animation";
import RecentPostsCarousel from "@/app/(resources)/blog/recent-posts-carousel";

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
