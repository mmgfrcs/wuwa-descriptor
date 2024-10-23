import type { PageLoad } from './$types';

export const load: PageLoad = (async ({params, fetch}) => { 
    return {char: await fetch(`/api/characters/${params.id}.json`).then(x=>x.json())}
})