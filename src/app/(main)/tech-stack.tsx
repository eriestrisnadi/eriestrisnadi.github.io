"use client";

import Stacks from "@/components/stacks";
import SectionHeading from "@/components/section-heading";
import SectionSubHeading from "@/components/section-sub-heading";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

export default function TechStack() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="space-y-1 mt-6">
        <SectionHeading>Tech Stack</SectionHeading>
        <SectionSubHeading>
          Technologies I use to build and power my projects
        </SectionSubHeading>
      </motion.div>
      <Stacks />
    </div>
  );
}
