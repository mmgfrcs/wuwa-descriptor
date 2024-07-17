<script lang="ts">
    import Handlebars from 'handlebars'
    import { page } from '$app/stores';
	import { getSkillTypeString, processDescription } from '$lib';
    import pb from "$lib/pocketbase"
	import type { ChangeEventHandler } from 'svelte/elements';
	import { goto } from '$app/navigation';

    $: showModifiedDescription = true
    $: level = 1

    let selectedCharId: string = ""

    let onCheckClick: ChangeEventHandler<HTMLInputElement> = function(e) {
        console.log("Event!")
        if(e.currentTarget.dataset.charid == selectedCharId) goto("/"+selectedCharId)
        else selectedCharId = e.currentTarget.dataset.charid as string
    }
    

</script>

<div class="flex gap-4 mb-4 lg:flex-row flex-col">
    <div class="join join-horizontal">
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/aero.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/electro.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/fusion.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/glacio.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/havoc.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/spectro.png?enhanced" />
        </button>
    </div>
    <div class="join join-horizontal">
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/weapons/broadblade.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/weapons/gauntlet.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/weapons/gun.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/weapons/rectifier.png?enhanced" />
        </button>
        <button class="btn join-item">
            <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/weapons/sword.png?enhanced" />
        </button>
    </div>
    <div class="join join-horizontal">
        <div class="btn join-item">
            Original
            <input type="checkbox" class="toggle toggle-accent" bind:checked={showModifiedDescription}/>
            Modified
        </div>
    </div>
</div>

{#each $page.data.entries as d (d.id)}
    <div class="collapse collapse-arrow bg-base-200 mb-2">
        <input type="radio" class="cursor-pointer" name="character-entry" data-charid={d.id} on:click={onCheckClick} />
        <div class="collapse-title text-2xl font-medium">
            <img loading="lazy" class="inline w-12 mr-2" alt="Icon" src={pb.files.getUrl(d, d.icon, {thumb: "128x0"})} />
            <span>{d.name}</span>
            •
            {#await import(`$lib/assets/elements/${d.element.toLowerCase()}.png?enhanced`) then { default: src }}
                <enhanced:img loading="lazy" class="inline w-10 rounded-full" alt="Icon" src={src} />
            {/await}
            {#await import(`$lib/assets/weapons/${d.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
                <enhanced:img loading="lazy" class="inline w-10 rounded-full" alt="Icon" src={src} />
            {/await}
        </div>
        <div class="collapse-content">
            <img loading="lazy" alt="portrait" class="absolute opacity-10 bottom-0 right-0" src={pb.files.getUrl(d, d.portrait, {thumb: "720x0"})} />
            <div class="flex flex-col gap-2 py-4">
                {#if d.expand && d.expand.skills}
                    <div class="flex mb-4 items-center">
                        <div class="flex-none basis-24">Level {level}</div>
                        <input type="range" min="1" max="2" bind:value={level} class="range range-secondary range-sm" />
                    </div>
                    {#each d.expand.skills as sk, idx (sk.id)}
                        <div class="flex flex-row gap-6">
                            <div class="basis-24 flex-none rounded-xl">
                                <img loading="lazy" alt="Icon" src={pb.files.getUrl(sk, sk.icons[0], {thumb: "128x0"})} />
                            </div>
                            <div class="flex flex-col gap-2">
                                <h3 class="text-2xl">{sk.name} • <span class="text-xl">{getSkillTypeString(sk.type)}</span></h3>
                                
                                {#if showModifiedDescription}
                                    {@html Handlebars.compile(processDescription(sk.description))({...sk.values, level})}
                                {:else}
                                    {@html Handlebars.compile(processDescription(sk.original_description))({...sk.values, level})}
                                {/if}
                            </div>
                        </div>
                        {#if idx < d.expand.skills.length-1}
                            <div class="divider"></div>
                        {/if}
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/each}
