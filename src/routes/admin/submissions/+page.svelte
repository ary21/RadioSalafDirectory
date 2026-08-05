<script lang="ts">
  export let data: any;
</script>

<main>
  <h1>Submissions</h1>
  {#if data.submissions.length}
    <ul>
      {#each data.submissions as s}
        <li>
          <strong>{s.name}</strong> {s.city && `— ${s.city}`}
          <div>{s.note}</div>
          <form method="post" style="display:inline" >
            <input type="hidden" name="id" value={s.id} />
            <button name="approve">Approve</button>
          </form>
          <form method="post" style="display:inline">
            <input type="hidden" name="id" value={s.id} />
            <button name="reject">Reject</button>
          </form>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No pending submissions.</p>
  {/if}
</main>
