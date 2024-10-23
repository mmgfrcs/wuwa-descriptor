<script lang="ts">
    import Handlebars from 'handlebars'
	import { getSkillTypeString, processDescription } from '$lib';
    import pb from "$lib/pocketbase"
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import type { Character } from '$lib/models/character';
    import type {PageData} from "./$types"
	import lightMode from '$lib/stores/lightmode';
    import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation';

    $: showModifiedDescription = true
    $: level = 1
    
    export let data: PageData

    let filters: string[]
    $: filters = <string[]>[]
    let filteredData: Character[]
    $: filteredData = data.entries.filter(x=>filters.length <= 0 || filters.includes(x.element) || filters.includes(x.weapon))
    
    let selectedCharId: string = ""
    let selectedChar: Character | undefined = undefined
    
    let onCheckClick: ChangeEventHandler<HTMLElement> = function(e) {
        selectedCharId = e.currentTarget.dataset.charid as string
        selectedChar = data.entries.find((x: { id: string; })=>x.id === selectedCharId)
    }

    function onFilterClick(ele: string) : MouseEventHandler<HTMLButtonElement> {
        return function(e) {
            //Remove filter if it exists
            if(filters.includes(ele)) 
                filters.splice(filters.indexOf(ele), 1);
            else filters.push(ele) //Add it otherwise

            filters = filters //Reactivity
        }
    }

</script>

<svelte:head>
    <title>Wuthering Waves Descriptor</title>
</svelte:head>

<main class="container mx-auto pb-6">
    <div class="flex gap-4 mb-4 lg:flex-row flex-col">
        <div class="join join-horizontal">
            <button class="btn join-item" class:btn-primary={filters.includes("AERO")} on:click={onFilterClick("AERO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/aero.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("ELECTRO")} on:click={onFilterClick("ELECTRO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/electro.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("FUSION")} on:click={onFilterClick("FUSION")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/fusion.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("GLACIO")} on:click={onFilterClick("GLACIO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/glacio.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("HAVOC")} on:click={onFilterClick("HAVOC")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/havoc.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("SPECTRO")} on:click={onFilterClick("SPECTRO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/spectro.png?enhanced" />
            </button>
        </div>
        <div class="join join-horizontal">
            <button class="btn join-item" class:btn-primary={filters.includes("BROADBLADE")} on:click={onFilterClick("BROADBLADE")}>
                <enhanced:img class="inline w-8 rounded-full" class:invert={$lightMode && !filters.includes("BROADBLADE")} alt="Icon" src="$lib/assets/weapons/broadblade.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("GAUNTLET")} on:click={onFilterClick("GAUNTLET")}>
                <enhanced:img class="inline w-8 rounded-full" class:invert={$lightMode && !filters.includes("GAUNTLET")} alt="Icon" src="$lib/assets/weapons/gauntlet.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("GUN")} on:click={onFilterClick("GUN")}>
                <enhanced:img class="inline w-8 rounded-full" class:invert={$lightMode && !filters.includes("GUN")} alt="Icon" src="$lib/assets/weapons/gun.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("RECTIFIER")} on:click={onFilterClick("RECTIFIER")}>
                <enhanced:img class="inline w-8 rounded-full" class:invert={$lightMode && !filters.includes("RECTIFIER")} alt="Icon" src="$lib/assets/weapons/rectifier.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("SWORD")} on:click={onFilterClick("SWORD")}>
                <enhanced:img class="inline w-8 rounded-full" class:invert={$lightMode && !filters.includes("SWORD")} alt="Icon" src="$lib/assets/weapons/sword.png?enhanced" />
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

    <div class="flex flex-row gap-12">
        <div class="flex-1 flex flex-col gap-4 transition-all">
            {#each filteredData as d (d.id)}
                <button 
                    type="button"
                    class={`${selectedCharId === d.id ? "bg-primary text-primary-content" : "bg-base-200"} card card-side shadow-xl p-4 transition`} 
                    data-charid={d.id} 
                    transition:slide
                    on:click={onCheckClick}>
                        <figure>
                            <img loading="lazy" class="inline w-12 mr-4" alt="Icon" src={pb.files.getUrl(d, d.icon, {thumb: "128x0"})} />
                        </figure>
                        <div class="card-body p-0 self-center">
                            <h2 class="card-title text-2xl overflow-x-hidden">
                                <a href={`/characters/${d.id}`} on:click|stopPropagation|preventDefault={x=> goto(`/characters/${d.id}`)} class="link link-hover text-left">
                                    <span>{d.name}</span>
                                </a>
                                •
                                {#await import(`$lib/assets/elements/${d.element.toLowerCase()}.png?enhanced`) then { default: src }}
                                    <enhanced:img loading="lazy" class="inline w-10 min-w-10 rounded-full" alt="Icon" src={src} />
                                {/await}
                                {#await import(`$lib/assets/weapons/${d.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
                                    <enhanced:img loading="lazy" class="inline w-10 min-w-10 rounded-full" class:invert={$lightMode && selectedCharId !== d.id} alt="Icon" src={src} />
                                {/await}
                                {#if !d.expand || !d.expand.skills || d.expand.skills.length == 0}
                                    <div class="badge badge-error">Empty</div>
                                    <div class="badge badge-error">TODO</div>
                                {:else if d.expand.skills.findIndex(x=>!x.status || x.status == "TODO") != -1}
                                    <div class="badge badge-error">TODO</div>
                                {:else if d.expand.skills.findIndex(x=>x.status == "DRAFT") != -1}
                                    <div class="badge badge-warning">Draft</div>
                                {/if}
                                
                            </h2>
                        </div>
                </button>
            {/each}
        </div>
        {#if selectedChar}
            <div class="flex-1 flex flex-col gap-4 basis-1/4">
                {#if selectedChar.expand && selectedChar.expand.skills}
                    <h3 class="text-3xl my-4 mx-2">{selectedChar.name}</h3>
                    <div class="flex m-4 items-center">
                        <div class="flex-none basis-24">Level {level}</div>
                        <input type="range" min="1" max="2" bind:value={level} class="range range-secondary range-sm" />
                    </div>
                    {#each selectedChar.expand.skills as sk, idx (sk.id)}
                        <div class="flex flex-row gap-6">
                            <div class="basis-24 flex-none rounded-xl">
                                <img loading="lazy" alt="Icon" class:invert={$lightMode} src={pb.files.getUrl(sk, sk.icons[0], {thumb: "128x0"})} />
                            </div>
                            <div class="flex flex-col gap-2">
                                <h3 class="text-2xl">
                                    {sk.name} • <span class="text-xl">{getSkillTypeString(sk.type)}</span>
                                    {#if sk.status != "OK"}
                                        <div 
                                            class="badge" 
                                            class:badge-error={!sk.status || sk.status == "TODO"}
                                            class:badge-warning={sk.status == "DRAFT"}>{sk.status || "TODO"}</div>
                                    {/if}
                                </h3>
                                
                                {#if showModifiedDescription}
                                    {@html Handlebars.compile(processDescription(sk.description))({...sk.values, level})}
                                {:else}
                                    {@html Handlebars.compile(processDescription(sk.original_description))({...sk.values, level})}
                                {/if}
                            </div>
                        </div>
                        {#if idx < selectedChar.expand.skills.length-1}
                            <div class="divider"></div>
                        {/if}
                    {/each}
                {:else}
                    <div role="alert" class="alert alert-warning">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 class="font-bold text-xl">Description Unavailable</h3>
                            <div class="text-base">This is usually caused by the character being unreleased yet, but it could also be that the skills haven't been updated yet.</div>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</main>
