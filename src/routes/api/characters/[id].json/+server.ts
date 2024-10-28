import type { Character } from '$lib/models/character';
import pb from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true

export const GET: RequestHandler = async (req) => {
    return json(await pb
        .collection('characters')
        .getOne<Character>(req.params.id, {expand: "skills,chains", fetch: fetch, cache: "force-cache"}))
};