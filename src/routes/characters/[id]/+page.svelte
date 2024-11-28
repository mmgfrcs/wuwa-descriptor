<script lang="ts">
	import Handlebars from 'handlebars'
	import { getImagekitUrl, getSkillTypeString, processDescription, toTitleCase } from "$lib";
	import lightMode from '$lib/stores/lightmode';
	import pb from '$lib/pocketbase.js';
	import {page} from "$app/stores"

	export let data

	$: showModifiedDescription = true
	$: level = 1

</script>

<svelte:head>
	<title>{data.char.name} - Wuthering Waves Descriptor</title>
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:site_name" content="Wuthering Waves Descriptor" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.char.name} />
	<meta property="og:image" content={getImagekitUrl(pb.files.getUrl(data.char, data.char.bg))+"?tr=w-1280"} />
	<meta property="og:description" content={`A ${toTitleCase(data.char.element)} ${toTitleCase(data.char.weapon)} character`} />
	<meta property="twitter:card" content="summary_large_image">
</svelte:head>

<div class="relative">
	{#if data.char.bg}
		<picture>
			<source srcset={getImagekitUrl(pb.files.getUrl(data.char, data.char.bg))+"?tr=e-contrast"} media="(min-width: 769px)" />
			<img alt="Banner" class="h-[100vh] w-full object-cover img-mask" src={getImagekitUrl(pb.files.getUrl(data.char, data.char.bg))+"?tr=w-iw_div_2,h-ih,x-iw_div_3,cm-extract,e-contrast"} loading="eager" />
		</picture>
	{:else}
		<div 
			class="h-[100vh] w-full object-cover img-mask"
			class:bg-red-950={data.char.element === "FUSION"}
			class:bg-yellow-950={data.char.element === "SPECTRO"}
			class:bg-blue-950={data.char.element === "GLACIO"}
			class:bg-purple-950={data.char.element === "ELECTRO"}
			class:bg-emerald-950={data.char.element === "AERO"}
			class:bg-rose-950={data.char.element === "HAVOC"}>
		</div>
	{/if}
	
	<div class="ml-6 flex flex-col items-start gap-4 absolute bottom-8">
		{#if data.char.icon}
			<img loading="lazy" class="flex-initial w-[192px]" alt="Icon" src={getImagekitUrl(pb.files.getUrl(data.char, data.char.icon))} />
		{/if}
		<div class="flex flex-row items-center gap-2">
			<h1 class="text-5xl">{data.char.name}</h1>
			<span class="text-5xl">•</span>
			{#await import(`$lib/assets/elements/${data.char.element.toLowerCase()}.png?enhanced`) then { default: src }}
					<enhanced:img loading="lazy" class="inline w-16 rounded-full" alt="Icon" src={src} />
			{/await}
			{#await import(`$lib/assets/weapons/${data.char.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
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
	
	{#if data.char.expand && data.char.expand.skills}
		<div class="flex mb-4 mx-8 items-center">
				<div class="flex-none basis-24">Level {level}</div>
				<input type="range" min="1" max="10" bind:value={level} class="range range-secondary range-sm" />
		</div>
		{#each data.char.expand.skills as sk, idx (sk.id)}
				<div class="flex flex-row gap-6">
						<div class="basis-24 flex-none rounded-xl">
							{#each sk.icons as skIcon}
								<img loading="lazy" alt="Icon" class:invert={$lightMode} src={getImagekitUrl(pb.files.getUrl(sk, skIcon))} />
							{/each}
						</div>
						<div class="flex-1">
							<div class="prose">
								<h3 class="text-2xl">{sk.name} • <span class="text-xl font-normal">{getSkillTypeString(sk.type)}</span></h3>
								
								{#if showModifiedDescription}
										{@html Handlebars.compile(processDescription(sk.description))({...sk.values, level})}
								{:else}
										{@html Handlebars.compile(processDescription(sk.original_description))({...sk.values, level})}
								{/if}
							</div>

						</div>
						<div class="basis-1/3 flex-none">
							<div class="prose">
								<h3 class="text-2xl">Gameplay Notes</h3>
								{#if sk.gameplay_notes != ""}
									{@html sk.gameplay_notes}
								{:else}
									<p>(No gameplay notes)</p>
								{/if}
								{#if showModifiedDescription}
									<h3 class="text-2xl">Description Notes</h3>
									{#if sk.description_notes != ""}
										{@html sk.description_notes}
									{:else}
										<p>(No description notes)</p>
									{/if}
								{/if}
							</div>
							
						</div>
				</div>
				{#if idx < data.char.expand.skills.length-1}
						<div class="divider"></div>
				{/if}
		{/each}
	{/if}
	{#if data.char.expand && data.char.expand.chains}
		{#if data.char.expand.skills.length > 0}
			<div class="divider"></div>
		{/if}
		{#each data.char.expand.chains as ch, idx (ch.id)}
				<div class="flex flex-row gap-6">
					<div class="basis-24 flex-none rounded-xl">
						{#if ch.icon}
							<img loading="lazy" alt="Icon" class:invert={$lightMode} src={getImagekitUrl(pb.files.getUrl(ch, ch.icon))} />
						{/if}
					</div>
					<div class="flex-1">
						<div class="prose">
							<h3 class="text-2xl">{ch.name} • <span class="text-xl font-normal">Sequence {ch.level}</span></h3>
							
							{#if showModifiedDescription}
									{@html Handlebars.compile(processDescription(ch.description))({...ch.values, level})}
							{:else}
									{@html Handlebars.compile(processDescription(ch.original_description))({...ch.values, level})}
							{/if}
						</div>

					</div>
					<div class="basis-1/3 flex-none">
						<div class="prose">
							<h3 class="text-2xl">Gameplay Notes</h3>
							{#if ch.gameplay_notes != ""}
								{@html ch.gameplay_notes}
							{:else}
								<p>(No gameplay notes)</p>
							{/if}
							{#if showModifiedDescription}
								<h3 class="text-2xl mt-4">Description Notes</h3>
								{#if ch.description_notes != ""}
									{@html ch.description_notes}
								{:else}
									<p>(No description notes)</p>
								{/if}
							{/if}
						</div>
					</div>
				</div>
				{#if idx < data.char.expand.skills.length-1}
						<div class="divider"></div>
				{/if}
		{/each}
	{/if}
</div>

