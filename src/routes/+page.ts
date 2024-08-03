import type { PageLoad } from './$types';
import pb from "$lib/pocketbase";

export const load: PageLoad = (async (par) => {
    let filter = []
    let elem = par.url.searchParams.get("element")
    if (elem !== null && ["AERO","GLACIO","SPECTRO","HAVOC", "ELECTRO", "FUSION"].includes(elem)) 
        filter.push(`element = "${elem}"`)

    let wep = par.url.searchParams.get("weapon")
    if (wep !== null && ["SWORD","BROADBLADE","RECTIFIER", "GUN", "GAUNTLET"].includes(wep)) 
        filter.push(`weapon = "${wep}"`)

    let data = await pb.collection('characters').getFullList({sort: "+name", expand: "skills,chains", filter: filter.join(" && "), fetch: par.fetch, cache: "default"})
    
    return {entries: data}
})