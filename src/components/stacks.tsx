"use client";

import { chunks, isEvenValue, resolveUrl } from "@/lib/utils";
import Marquee from "@/components/marquee";
import { fadeLeft } from "@/lib/animation";
import Fade from "@/components/fade";
import SkillTag from "@/components/skill-tag";
import { stacks } from "@/config/stacks";

const stackEntries = Object.entries(stacks);
const chunkedStacks = chunks(stackEntries, Math.round(stackEntries.length / 3));

export default function Stacks() {
  return (
    <Fade
      variants={fadeLeft}
      className="relative space-y-2.5 overflow-hidden w-full"
    >
      {chunkedStacks.map((list, listIndex) => (
        <Marquee
          key={listIndex}
          direction={isEvenValue(listIndex, "left", "right")}
        >
          {list.map(([stack, icon]) => (
            <SkillTag
              key={icon.src}
              icon={{
                alt: stack,
                src: resolveUrl(icon.src),
                asMask: icon.asMask,
                className: icon.className,
              }}
              className="mr-3"
            >
              <span>{stack}</span>
            </SkillTag>
          ))}
        </Marquee>
      ))}
    </Fade>
  );
}
