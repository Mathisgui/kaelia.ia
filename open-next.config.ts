// Site 100 % pré-rendu, sans revalidation : le cache lit les pages générées au build
// dans les assets statiques du worker (pas de bucket R2 à payer ni à tenir).
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
