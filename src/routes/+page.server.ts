import type { PageServerLoad } from './$types';
import pb from "$lib/pocketbase";

export const load: PageServerLoad = (async (par) => {
    let data = await pb.collection('characters').getFullList({sort: "+name", expand: "skills,chains"})
    return {entries: data}
})