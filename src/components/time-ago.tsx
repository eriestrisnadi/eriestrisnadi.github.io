import { format } from "timeago.js";
import { dateFormatter, parseDate } from "@/lib/utils";

export type TimeAgoProps = {
  date: string | number | Date;
};

export default function TimeAgo({ date }: TimeAgoProps) {
  const text = format(dateFormatter(parseDate(date)));
  
  return <time>{text}</time>;
}
