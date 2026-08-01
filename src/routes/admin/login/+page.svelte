<script lang="ts">
  export let form: any;
  let email = '';
  let password = '';
</script>

<main>
  <h1>Admin Login</h1>
  {#if form?.error}
    <div class="error">{form.error}</div>
  {/if}
  <form method="post">
    <label>
      Email
      <input name="email" type="email" bind:value={email} required />
    </label>
    <label>
      Password
      <input name="password" type="password" bind:value={password} required />
    </label>
    <button type="submit">Login</button>
  </form>
</main>
