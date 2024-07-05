<script lang="ts">
    import Handlebars from 'handlebars'
    import { page } from '$app/stores';
	import { getSkillTypeString, processDescription } from '$lib';
    import pb from "$lib/pocketbase"

    $: showModifiedDescription = true
    $: level = 1

</script>

<div class="join join-vertical lg:join-horizontal mb-4">
    <button class="btn join-item">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    </button>
    <button class="btn join-item">
        <enhanced:img class="inline w-8 rounded-full" alt="Icon" src="$lib/assets/elements/havoc.png?enhanced" />
    </button>
    <label class="btn swap">
        <input type="checkbox" bind:checked={showModifiedDescription}/>
        <div class="swap-on">Modified</div>
        <div class="swap-off">Original</div>
    </label>
</div>

<div class="flex mb-4 items-center">
    <div class="flex-none basis-24">Level {level}</div>
    <input type="range" min="1" max="2" bind:value={level} class="range range-secondary range-sm" />
</div>

{#each $page.data.entries as d (d.id)}
    <div class="collapse collapse-arrow bg-base-200 mb-2">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title text-2xl font-medium">
            <img class="inline w-12 mr-2" alt="Icon" src={pb.files.getUrl(d, d.icon, {thumb: "128x0"})} />
            <span>{d.name}</span>
            •
            {#await import(`$lib/assets/elements/${d.element.toLowerCase()}.png?enhanced`) then { default: src }}
                <enhanced:img class="inline w-10 mr-2 rounded-full" alt="Icon" src={src} />
            {/await}
        </div>
        <div class="collapse-content">
            <div class="flex flex-col gap-2 py-4">
                {#if d.expand && d.expand.skills}
                    {#each d.expand.skills as sk, idx (sk.id)}
                        <div class="flex flex-row gap-6">
                            <div class="basis-24 flex-none rounded-xl">
                                <img alt="Icon" src={pb.files.getUrl(sk, sk.icons[0], {thumb: "128x0"})} />
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
