<script>
    import { page } from '$app/stores';
</script>

<div class="mx-4 text-center h-[640px]">
    <h2 class="text-4xl">{$page.status}</h2>
    <h3 class="text-xl">{$page.error?.message}</h3>
</div>
