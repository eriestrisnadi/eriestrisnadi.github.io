'use client';

import { useMemo } from 'react';
import { format } from "timeago.js";
import { dateFormatter, parseDate } from "@/lib/utils";

export type TimeAgoProps = {
  date: string | number | Date;
};

export default function TimeAgo({ date }: TimeAgoProps) {
  const text = useMemo(() => format(dateFormatter(parseDate(date))), [date]);

  return <time>{text}</time>;
}
