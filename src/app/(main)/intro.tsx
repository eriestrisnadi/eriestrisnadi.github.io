import * as motion from "motion/react-client";
import { siteConfig } from "@/config/site";
import { fadeLeft, fadeUp } from "@/lib/animation";

export default function Intro() {
  const [alias] = (siteConfig.author.name ?? "").split(" ");
  const yearSpent = new Date().getFullYear() - siteConfig.since;

  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-2 text-3xl font-bold lg:text-4xl">
          <h2>
            <motion.span variants={fadeLeft} className="inline-flex">
              I&apos;m
            </motion.span>{" "}
            <motion.span variants={fadeLeft} className="inline-flex">
              a
            </motion.span>{" "}
            <motion.span
              variants={fadeLeft}
              className="text-primary inline-flex"
            >
              software engineer
            </motion.span>{" "}
            <br className="lg:hidden" />
            <motion.span variants={fadeLeft} className="inline-flex">
              when
            </motion.span>{" "}
            <br className="hidden lg:block" />
            <motion.span variants={fadeLeft} className="inline-flex">
              my wife
            </motion.span>{" "}
            <motion.span
              variants={fadeLeft}
              className="text-primary inline-flex"
            >
              allows it.
            </motion.span>
          </h2>
        </div>
      </div>

      <motion.h4
        variants={fadeUp}
        className="mt-6 leading-[1.8] md:leading-loose"
      >
        Meet {alias}, a dedicated Senior Software Engineer and Technical Team
        Lead, who&apos;s been taming code and herding cats (also known as
        developers) for over {yearSpent}+ years. With a knack for crafting
        cutting-edge web platforms and hybrid mobile apps, I turn caffeine into
        code while juggling deadlines and the occasional snack break. My
        technical skills shine as brightly as my collection of funny cat memes!
      </motion.h4>
    </>
  );
}
