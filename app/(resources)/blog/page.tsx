import Stagger from "@/components/stagger";
import FeaturedPostsCarousel from "@/app/(resources)/blog/featured-posts-carousel";
import Posts from "@/app/(resources)/blog/posts";

export default function BlogPage() {
  return (
    <Stagger>
      <FeaturedPostsCarousel />
      <Posts />
    </Stagger>
  );
}
