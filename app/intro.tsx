"use client";

import { motion } from "framer-motion";
import { fadeLeft, fadeUp, wave } from "@/lib/animation";
import { siteConfig } from "@/config/site";

export default function Intro() {
  const [alias] = (siteConfig.author.name ?? "").split(" ");
  const yearSpent = new Date().getFullYear() - siteConfig.since;

  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-2 text-2xl font-medium lg:text-3xl">
          <h1>
            <motion.span variants={fadeLeft} className="inline-flex">
              Hi,
            </motion.span>{" "}
            <motion.span variants={fadeLeft} className="inline-flex">
              I&apos;m {alias}
            </motion.span>
          </h1>
          <motion.div variants={fadeLeft} animate={wave} className="ml-0.5">
            👋
          </motion.div>
        </div>
        <div className="space-y-4">
          <ul className="ml-5 flex list-disc flex-col gap-1 lg:flex-row lg:gap-10">
            <motion.li
              variants={fadeLeft}
              className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              Based in Bandung, Indonesia <span className="ml-1">🇮🇩</span>
            </motion.li>
            <motion.li
              variants={fadeLeft}
              className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              Working remotely
            </motion.li>
          </ul>
        </div>
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-6 leading-[1.8] md:leading-loose"
      >
        A dedicated Senior Software Engineer, Technical Team Lead, and seasoned
        freelancer with a passion for crafting cutting-edge web platforms and
        hybrid mobile applications. With over {yearSpent}+ years of professional
        experience, I have honed my skills in both technical excellence and
        effective team management.
      </motion.p>
    </>
  );
}
