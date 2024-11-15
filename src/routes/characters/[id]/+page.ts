import type { Character } from '$lib/models/character';
import pb from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({params, fetch}) => { 
    return {
        char: await pb
            .collection('characters')
            .getOne<Character>(params.id, {expand: "skills,chains", fetch, cache: "force-cache"})
    }
})