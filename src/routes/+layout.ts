import {injectSpeedInsights} from "@vercel/speed-insights/sveltekit"
import {inject} from "@vercel/analytics"
import {dev} from "$app/environment"

injectSpeedInsights({sampleRate: 0.1, scriptSrc: !dev ? "/util/script2.js" : undefined})
inject({mode: dev ? "development" : "production", scriptSrc: !dev ? "/util/script1.js" : undefined})    

