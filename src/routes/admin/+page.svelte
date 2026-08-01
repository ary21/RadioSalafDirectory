<script lang="ts">
  export let data: { stations: Array<any>; admin: any };
</script>

<main>
  <h1>Admin Dashboard</h1>
  <p>Signed in as {data.admin.email} — <form action="/admin/logout" method="post" style="display:inline"><button type="submit">Logout</button></form></p>

  <section>
    <h2>Stations</h2>
    <ul>
      {#each data.stations as s}
        <li>{s.name} — {s.status}</li>
      {/each}
    </ul>
  </section>
</main>
