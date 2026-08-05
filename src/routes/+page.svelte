<script lang="ts">
  export let data: any;
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

<main>
  <h1>RadioSalafDirectory</h1>

  <form method="get" class="search-form">
    <input name="q" value={data.filters.q} placeholder="Search name, city, or tags" />
    <input name="city" value={data.filters.city} placeholder="Filter by city" />
    <input name="tag" value={data.filters.tag} placeholder="Filter by tag" />
    <button type="submit">Search</button>
  </form>

  {#if data.filters.q || data.filters.city || data.filters.tag}
    <p class="filter-summary">
      Showing results for
      {#if data.filters.q}<strong>{data.filters.q}</strong>{/if}
      {#if data.filters.city} city <strong>{data.filters.city}</strong>{/if}
      {#if data.filters.tag} tag <strong>{data.filters.tag}</strong>{/if}
    </p>
  {/if}

  {#if data.stations && data.stations.length}
    <ul class="station-list">
      {#each data.stations as s}
        <li class="station-card">
          <div>
            <strong>{s.name}</strong>
            {#if s.city}<span> — {s.city}</span>{/if}
          </div>
          {#if s.tags}<div class="station-tags">Tags: {s.tags}</div>{/if}
          {#if s.streamUrl}
            <AudioPlayer src={s.streamUrl} />
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No public stations match your search.</p>
  {/if}
</main>

<style>
  main { max-width: 900px; margin: 0 auto; padding: 2rem; }
  .search-form { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 0.75rem; margin-bottom: 1rem; }
  .search-form input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0.35rem; }
  .search-form button { padding: 0.75rem 1rem; background: #111; color: white; border: none; border-radius: 0.35rem; cursor: pointer; }
  .filter-summary { margin: 0 0 1rem; font-size: 0.95rem; color: #555; }
  .station-list { list-style: none; padding: 0; display: grid; gap: 1.5rem; }
  .station-card { border: 1px solid #ddd; border-radius: 0.5rem; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
  .station-tags { margin: 0.5rem 0; color: #555; font-size: 0.95rem; }
</style>
