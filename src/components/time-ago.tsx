"use client";

import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { dateFormatter, parseDate } from "@/lib/utils";

export type TimeAgoProps = {
  date: string | number | Date;
  formatter?: typeof dateFormatter;
};

export default function TimeAgo({
  date,
  formatter = dateFormatter,
}: TimeAgoProps) {
  const [text, setText] = useState(formatter(parseDate(date)));

  useEffect(() => setText(format(date)), [date]);

  return <time>{text}</time>;
}
