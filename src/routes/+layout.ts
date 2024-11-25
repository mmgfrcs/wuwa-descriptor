import {injectSpeedInsights} from "@vercel/speed-insights/sveltekit"
import {inject} from "@vercel/analytics"
import {dev} from "$app/environment"
import pb from "$lib/pocketbase"
import type { GameVersion } from "$lib/models/version.js"

injectSpeedInsights({sampleRate: 0.1, scriptSrc: !dev ? "/util/script2.js" : undefined})
inject({mode: dev ? "development" : "production", scriptSrc: !dev ? "/util/script1.js" : undefined})    

export async function load(par) {
    return {
        version: pb
          .collection('versions')
          .getFullList<GameVersion>({sort: "-release_date", fetch: par.fetch, cache: "default"})
    }
}