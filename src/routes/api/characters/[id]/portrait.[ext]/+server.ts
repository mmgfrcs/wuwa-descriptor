import type { Character } from '$lib/models/character';
import pb from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import sharp from 'sharp';

export const prerender = true

export const entries: EntryGenerator = async () => {
    let chars = await pb
        .collection('characters')
        .getFullList<Character>({sort: "+name"})
    
    return chars.filter(x=>x.portrait && x.portrait != "").flatMap((x)=>{
        return [{id: x.id, ext: "png"}, {id: x.id, ext: "webp"}, {id: x.id, ext: "avif"}]
    })
};

export const GET: RequestHandler = async (req) => {
    let char = await pb
        .collection('characters')
        .getOne<Character>(req.params.id, {fetch, requestKey: null})

    if(!char.portrait || char.portrait === "") return error(404, "Portrait not found")
    
    let img = await req.fetch(pb.files.getUrl(char, char.portrait))

    let hdrs: {[x: string]: string} = {}
    img.headers.forEach((val, key) => {
        hdrs[key] = val
    })
    hdrs["Content-Type".toLowerCase()] = `image/${req.params.ext}`
    //Convert it
    let convImg = await sharp(await img.arrayBuffer())
        //@ts-ignore
        .toFormat(req.params.ext)
        .toBuffer({resolveWithObject: true})

    hdrs["Content-Length".toLowerCase()] = convImg.info.size.toString()
    return new Response(convImg.data, {headers: hdrs})
};