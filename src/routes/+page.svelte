<script lang="ts">
    import Handlebars from 'handlebars'
	import { getImagekitUrl, getSkillTypeString, processDescription } from '$lib';
	import type { ChangeEventHandler, MouseEventHandler } from 'svelte/elements';
	import type { Character } from '$lib/models/character';
    import type {PageData} from "./$types"
	import lightMode from '$lib/stores/lightmode';
    import { fly } from 'svelte/transition'
	import { goto } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import pb from '$lib/pocketbase';
	import AlertBanner from '$lib/components/AlertBanner.svelte';
	import { page } from '$app/stores';

    $: showModifiedDescription = true
    $: level = 1
    
    export let data: PageData

    $: filters = <string[]>[]
    $: chars = <Character[]>[]
    $: filteredChars = chars.filter(x=>filters.length <= 0 || filters.includes(x.element) || filters.includes(x.weapon) || filters.includes(x.rarity.toString()))

    let selectedCharId: string = ""
    let selectedChar: Character | undefined = undefined
    
    let onCheckClick: ChangeEventHandler<HTMLElement> = function(e) {
        selectedCharId = e.currentTarget.dataset.charid as string
        selectedChar = chars.find(x=>x.id === selectedCharId)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function onData(c: Character[]) {
        chars = c
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
    <meta property="og:url" content={$page.url.toString()} />
	<meta property="og:site_name" content="Wuthering Waves Descriptor" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Wuthering Waves Descriptor - Character List" />
	<meta property="og:image" content="https://ik.imagekit.io/wzvqps79m/T_Bg1_UI_wK69jXXIc.png?updatedAt=1731674557301" />
	<meta property="twitter:card" content="summary">
</svelte:head>

<main class="container mx-auto pb-6 px-4 flex-1">
    <div class="flex gap-4 mb-4 xl:flex-row xl:items-left flex-col">
        
        <div class="join join-horizontal max-md:hidden">
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
        <div class="join join-horizontal md:hidden">
            <button class="btn join-item" class:btn-primary={filters.includes("AERO")} on:click={onFilterClick("AERO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/aero.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("ELECTRO")} on:click={onFilterClick("ELECTRO")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/electro.png?enhanced" />
            </button>
            <button class="btn join-item" class:btn-primary={filters.includes("FUSION")} on:click={onFilterClick("FUSION")}>
                <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/fusion.png?enhanced" />
            </button>
        </div>
        <div class="join join-horizontal md:hidden">
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
            <button class="btn join-item gap-1" class:btn-primary={filters.includes("4")} on:click={onFilterClick("4")}>
                <span class="text-lg">4</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg>
                  
            </button>
            <button class="btn join-item gap-1" class:btn-primary={filters.includes("5")} on:click={onFilterClick("5")}>
                <span class="text-lg">5</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
        <button class="btn join-item">
            Original
            <input type="checkbox" class="toggle toggle-accent" bind:checked={showModifiedDescription} aria-label="Switch Description"/>
            Modified
        </button>
    </div>
    {#await data.entries}
        <div class="flex flex-col gap-4">
            {#each Array(12) as _}
                <div 
                    class="skeleton shadow-xl p-4 h-20">
                </div>
            {/each}
        </div>
    {:then ch} 
        {onData(ch) ?? ""}
        <div class="flex lg:flex-row flex-col-reverse gap-12">
            <div class="flex flex-col gap-4" class:flex-1={selectedCharId == ""} class:flex-none={selectedCharId != ""}>
                {#each filteredChars as d (d.id)}
                    <button 
                        type="button"
                        class={`${selectedCharId === d.id ? "bg-primary text-primary-content lg:sticky lg:top-4 lg:bottom-4 z-10" : "bg-base-200"} card card-side shadow-xl p-4 transition`} 
                        data-charid={d.id}
                        out:fly={{x: 100}}
                        in:fly={{delay: 200, x: -100}}
                        animate:flip={{duration: 400}}
                        on:click={onCheckClick}>
                            <figure>
                                <img loading="lazy" class="inline w-12 mr-4" alt="Icon" src={getImagekitUrl(pb.files.getUrl(d, d.icon))+"?tr=w-48"} />
                            </figure>
                            <div class="card-body p-0 self-center">
                                <h2 class="card-title text-2xl overflow-x-hidden">
                                    <!-- A workaround to get the link to register clicks before the button -->
                                    <a href={`/characters/${d.id}`} on:click|stopPropagation|preventDefault={x=> goto(`/characters/${d.id}`)} class="link link-hover text-left overflow-hidden">
                                        <span>{d.name}</span>
                                    </a>
                                    •
                                    {#await import(`$lib/assets/elements/${d.element.toLowerCase()}.png?enhanced`) then { default: src }}
                                        <enhanced:img loading="lazy" class="inline w-10 min-w-10 rounded-full" alt="Icon" src={src} />
                                    {/await}
                                    {#await import(`$lib/assets/weapons/${d.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
                                        <enhanced:img loading="lazy" class="inline w-10 min-w-10 rounded-full" class:invert={$lightMode && selectedCharId !== d.id} alt="Icon" src={src} />
                                    {/await}
                                    {#if new Date(d.expand.version.release_date).getTime() > Date.now()}
                                        <div class="badge badge-info md:inline hidden">Unreleased</div>
                                    {:else if !d.expand || !d.expand.skills || d.expand.skills.length == 0}
                                        <div class="badge badge-error md:inline hidden">Empty</div>
                                        <div class="badge badge-error md:inline hidden">TODO</div>
                                    {:else if d.expand.skills.findIndex(x=>!x.status || x.status == "TODO") != -1}
                                        <div class="badge badge-error md:inline hidden">TODO</div>
                                    {:else if d.expand.skills.findIndex(x=>x.status == "DRAFT") != -1}
                                        <div class="badge badge-warning md:inline hidden">Draft</div>
                                    {/if}
                                    <div class="badge badge-outline md:inline hidden">{d.expand.version.version}</div>
                                </h2>
                            </div>
                    </button>
                {/each}
            </div>
            {#if selectedChar}
                <div class="flex-1 flex flex-col gap-4 basis-1/4">
                    <h3 class="text-3xl my-4 mx-2"><a href={`/characters/${selectedCharId}`} class="link link-hover">{selectedChar.name}</a></h3>
                    {#if new Date(selectedChar.expand.version.release_date).getTime() > Date.now()}
                        <AlertBanner 
                            type="info" 
                            title="Unreleased Character" 
                            content="This is an unreleased character. Character data might be inaccurate." />
                    {/if}
                    {#if selectedChar.expand && selectedChar.expand.skills}
                        {#if selectedChar.expand.skills.findIndex(x=>!x.status || x.status == "TODO" || x.status == "DRAFT") != -1}
                            <AlertBanner 
                                type="warning" 
                                title="Description Incomplete" 
                                content="Some of the descriptions below might be incomplete and thus inaccurate." />
                        {/if}
                        <div class="flex m-4 items-center">
                            <div class="flex-none basis-24">Level {level}</div>
                            <input type="range" min="1" max="10" bind:value={level} class="range range-secondary range-sm" />
                        </div>
                        {#each selectedChar.expand.skills as sk, idx (sk.id)}
                            <div class="flex lg:flex-row flex-col gap-6">
                                <div class="basis-24 flex-none rounded-xl">
                                    {#each sk.icons as skIcon}
                                        <img loading="lazy" alt="Icon" class="max-w-[96px]" class:invert={$lightMode} src={getImagekitUrl(pb.files.getUrl(sk, skIcon))} />
                                    {/each}
                                </div>
                                <div class="flex flex-col gap-2 description">
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
                                        {@html Handlebars.compile(processDescription(sk.description))({...sk.values, level: level-1})}
                                    {:else}
                                        {@html Handlebars.compile(processDescription(sk.original_description))({...sk.values, level: level-1})}
                                    {/if}
                                </div>
                            </div>
                            {#if idx < selectedChar.expand.skills.length-1}
                                <div class="divider"></div>
                            {/if}
                        {/each}
                    {:else}
                    <AlertBanner 
                        type="warning" 
                        title="Description Unavailable" 
                        content="This is usually caused by the character being unreleased yet, but it could also be that the skills haven't been updated yet." />
                    {/if}
                </div>
            {/if}
        </div>
    {:catch}
        <AlertBanner 
            type="error" 
            title="Backend Unavailable" 
            content="Backend is currently unresponsive. Please try again later." />
    {/await}
    
</main>
