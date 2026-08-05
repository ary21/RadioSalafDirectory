<script lang="ts">
  export let data: any;
</script>

<main>
  <h1>Admin Dashboard</h1>
  <div class="admin-header">
    <p>Signed in as {data.admin.email}</p>
    <form action="/admin/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  </div>

  <nav class="admin-nav">
    <a href="/admin/stations/new">Create station</a>
    <a href="/admin/submissions">Moderate submissions</a>
  </nav>

  <section>
    <h2>Stations</h2>
    {#if data.stations.length}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Visibility</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.stations as s}
            <tr>
              <td>{s.name}</td>
              <td><span class="badge status-{s.status.toLowerCase()}">{s.status.replaceAll('_', ' ')}</span></td>
              <td><span class="badge visibility-{s.visibility.toLowerCase()}">{s.visibility}</span></td>
              <td>{s.city ?? '-'}</td>
              <td><a href={`/admin/stations/${s.id}`}>Edit</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>No stations found yet.</p>
    {/if}
  </section>
</main>

<style>
  .admin-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .admin-nav { display: flex; gap: 1rem; margin-bottom: 1rem; }
  .admin-nav a { padding: 0.5rem 0.75rem; background: #333; color: white; border-radius: 0.25rem; text-decoration: none; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 0.75rem 0.5rem; border-bottom: 1px solid #ddd; }
  .badge { padding: 0.25rem 0.5rem; border-radius: 0.5rem; font-size: 0.85rem; text-transform: capitalize; }
  .status-pending_review, .status-pending_permission { background: #f5a623; color: #111; }
  .status-approved_public, .status-approved_private { background: #2ecc71; color: white; }
  .status-rejected { background: #e74c3c; color: white; }
  .visibility-public { background: #3498db; color: white; }
  .visibility-private { background: #95a5a6; color: white; }
</style>
