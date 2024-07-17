<script lang="ts">
	import Handlebars from 'handlebars'
	import { page } from "$app/stores";
	import { getSkillTypeString, processDescription } from "$lib";
	import pb from "$lib/pocketbase";

	$: showModifiedDescription = true
	$: level = 1
</script>

<div class="relative">
	<img alt="Banner" class="h-[800px] w-full object-cover img-mask" src={pb.files.getUrl($page.data.char, $page.data.char.bg)} />
	<div class="ml-6 flex flex-col items-start gap-4 absolute -bottom-8">
		<img alt="Icon" class="flex-initial" src={pb.files.getUrl($page.data.char, $page.data.char.icon, {thumb: "192x0"})} />
		<div class="flex flex-row items-center gap-2">
			<h1 class="text-5xl">{$page.data.char.name}</h1>
			<span class="text-5xl">•</span>
			{#await import(`$lib/assets/elements/${$page.data.char.element.toLowerCase()}.png?enhanced`) then { default: src }}
					<enhanced:img loading="lazy" class="inline w-16 rounded-full" alt="Icon" src={src} />
			{/await}
			{#await import(`$lib/assets/weapons/${$page.data.char.weapon.toLowerCase()}.png?enhanced`) then { default: src }}
					<enhanced:img loading="lazy" class="inline w-16 rounded-full" alt="Icon" src={src} />
			{/await}
		</div>
		
	</div>
</div>

<div class="flex flex-col gap-4 py-4 mt-20 mb-8 mx-4">
	<h2 class="text-3xl">Skills</h2>
	<div class="btn">
		Original
		<input type="checkbox" class="toggle toggle-accent" bind:checked={showModifiedDescription}/>
		Modified
	</div>
	{#if $page.data.char.expand && $page.data.char.expand.skills}
		<div class="flex mb-4 mx-8 items-center">
				<div class="flex-none basis-24">Level {level}</div>
				<input type="range" min="1" max="2" bind:value={level} class="range range-secondary range-sm" />
		</div>
		{#each $page.data.char.expand.skills as sk, idx (sk.id)}
				<div class="flex flex-row gap-6">
						<div class="basis-24 flex-none rounded-xl">
								<img loading="lazy" alt="Icon" src={pb.files.getUrl(sk, sk.icons[0], {thumb: "128x0"})} />
						</div>
						<div class="flex flex-1 flex-col gap-2">
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
				{#if idx < $page.data.char.expand.skills.length-1}
						<div class="divider"></div>
				{/if}
		{/each}
	{/if}
</div>

