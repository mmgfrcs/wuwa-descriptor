import type { Character, Skill } from '$lib/models/character';
import pb from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true

export const entries: EntryGenerator = async () => {
    let chars = await pb
        .collection('skills')
        .getFullList<Skill>({sort: "+name"})
    
	return chars.filter(x=>x.icons && x.icons.length != 0).flatMap(x=>{
        return x.icons.map(y=>{return {id: x.id, name: y}}) 
    })
};

export const GET: RequestHandler = async (req) => {
    let sk = await pb.autoCancellation(false)
        .collection('skills')
        .getOne<Skill>(req.params.id, {fetch})

    if(!sk.icons || sk.icons.length == 0 || sk.icons.find(x=>x === req.params.name) === undefined) 
        return error(404, "Icon not found")
    
    let img = await req.fetch(pb.files.getUrl(sk, sk.icons.find(x=>x === req.params.name)!))

    return new Response(img.body, {headers: img.headers})
};