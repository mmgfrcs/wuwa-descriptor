import {injectSpeedInsights} from "@vercel/speed-insights/sveltekit"
import {inject} from "@vercel/analytics"
import {dev} from "$app/environment"

injectSpeedInsights({sampleRate: 0.1})
inject({mode: dev ? "development" : "production"})
