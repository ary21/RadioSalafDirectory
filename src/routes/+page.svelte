<script lang="ts">
  export let data: { stations: Array<any> };
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

<main>
  <h1>RadioSalafDirectory</h1>
  {#if data.stations && data.stations.length}
    <ul>
      {#each data.stations as s}
        <li>
          <strong>{s.name}</strong>
          {#if s.city}<span> — {s.city}</span>{/if}
          {#if s.tags}<div>Tags: {s.tags}</div>{/if}
          {#if s.streamUrl}
            <AudioPlayer src={s.streamUrl} />
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No public stations yet.</p>
  {/if}
</main>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
