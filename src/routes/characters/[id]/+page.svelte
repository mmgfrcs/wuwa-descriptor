<script lang="ts">
	import Handlebars from 'handlebars'
	import { getImagekitUrl, getSkillTypeString, processDescription } from "$lib";
	import lightMode from '$lib/stores/lightmode';
	import pb from '$lib/pocketbase.js';

	export let data

	$: showModifiedDescription = true
	$: level = 1

</script>

<svelte:head>
	{#await data.char}
		<title>Loading... - Wuthering Waves Descriptor</title>
	{:then char} 
		<title>{char.name} - Wuthering Waves Descriptor</title>
	{/await}

</svelte:head>

{#await data.char}
	<div class="relative">
		<div class="bg-base-300 h-[100vh] w-full"></div>
		
		<div class="ml-6 flex flex-col items-start gap-4 absolute bottom-8">
			<div class="skeleton flex-initial h-[192px] w-[192px] rounded-full"></div>
			<div class="flex flex-row items-center gap-2">
				<h1 class="text-5xl">Loading...</h1>
				<span class="text-5xl">•</span>
				<div class="skeleton inline h-16 w-16 rounded-full"></div>
				<div class="skeleton inline h-16 w-16 rounded-full"></div>
			</div>
		</div>
	</div>
{:then char} 
	<div class="relative">
		<picture>
			<source srcset={getImagekitUrl(pb.files.getUrl(char, char.bg))} media="(min-width: 769px)" />
			<img alt="Banner" class="h-[100vh] w-full object-cover img-mask" src={getImagekitUrl(pb.files.getUrl(char, char.bg))+"?tr=w-iw_div_2,h-ih,x-iw_div_3,cm-extract"} />
		</picture>
		
		<div class="ml-6 flex flex-col items-start gap-4 absolute bottom-8">
			<img loading="lazy" class="flex-initial w-[192px]" alt="Icon" src={getImagekitUrl(pb.files.getUrl(char, char.icon))} />
			<div class="flex flex-row items-center gap-2">
				<h1 class="text-5xl">{char.name}</h1>
				<span class="text-5xl">•</span>
				{#await import(`$lib/assets/elements/${char.element.toLowerCase()}.png?enhanced`) then { default: src }}
						<enhanced:img loading="lazy" class="inline w-16 rounded-full" alt="Icon" src={src} />
				{/await}
				{#await import(`$lib/assets/weapons/${char.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
						<enhanced:img loading="lazy" class="inline w-16 rounded-full" alt="Icon" src={src} />
				{/await}
			</div>
			
		</div>
	</div>

	<div class="flex flex-col gap-4 py-4 mb-8 mx-4">
		<h2 class="text-3xl">Skills</h2>
		<div class="join join-horizontal">
			<div class="btn join-item">
				Original
				<input type="checkbox" class="toggle toggle-accent" bind:checked={showModifiedDescription}/>
				Modified
			</div>
		</div>
		
		{#if char.expand && char.expand.skills}
			<div class="flex mb-4 mx-8 items-center">
					<div class="flex-none basis-24">Level {level}</div>
					<input type="range" min="1" max="10" bind:value={level} class="range range-secondary range-sm" />
			</div>
			{#each char.expand.skills as sk, idx (sk.id)}
					<div class="flex flex-row gap-6">
							<div class="basis-24 flex-none rounded-xl">
								{#each sk.icons as skIcon}
									<img loading="lazy" alt="Icon" class:invert={$lightMode} src={getImagekitUrl(pb.files.getUrl(sk, skIcon))} />
								{/each}
							</div>
							<div class="flex flex-1 flex-col gap-2 description">
								<h3 class="text-2xl">{sk.name} • <span class="text-xl">{getSkillTypeString(sk.type)}</span></h3>
								
								{#if showModifiedDescription}
										{@html Handlebars.compile(processDescription(sk.description))({...sk.values, level})}
								{:else}
										{@html Handlebars.compile(processDescription(sk.original_description))({...sk.values, level})}
								{/if}
							</div>
							<div class="flex basis-1/3 flex-none flex-col gap-2">
								<h3 class="text-2xl">Gameplay Notes</h3>
								{#if sk.gameplay_notes != ""}
									{@html sk.gameplay_notes}
								{:else}
									<p>(No gameplay notes)</p>
								{/if}
								{#if showModifiedDescription}
									<h3 class="text-2xl mt-4">Description Notes</h3>
									{#if sk.description_notes != ""}
										{@html sk.description_notes}
									{:else}
										<p>(No description notes)</p>
									{/if}
								{/if}
							</div>
					</div>
					{#if idx < char.expand.skills.length-1}
							<div class="divider"></div>
					{/if}
			{/each}
		{/if}
	</div>
{/await}

