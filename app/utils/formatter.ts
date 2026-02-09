import { useDateFormat } from "@vueuse/core";

export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return useDateFormat(date, "MMM dd, yyyy").value;
}

export function formatJoinDate(dateString: string, style: "long" | "short" = "short"): string {
  const date = new Date(dateString);
  const format = style === "long" ? "MMMM YYYY" : "MMM YYYY";
  return `Joined ${useDateFormat(date, format).value}`;
}
