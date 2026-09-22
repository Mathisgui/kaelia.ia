import { rssResponse } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return rssResponse("en");
}
