import pb from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({params, fetch}) => {
    let charId = params.id
    let data = await pb.collection('characters').getOne(charId, {fetch: fetch, expand: "skills,chains"})
    return {char: data}
})