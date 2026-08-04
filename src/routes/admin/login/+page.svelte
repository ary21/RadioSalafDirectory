<script lang="ts">
  const { form } = $props();
  let email = form?.values?.email ?? '';
  let password = '';
</script>

<main>
  <h1>Admin Login</h1>
  {#if form?.error}
    <div class="alert error">{form.error}</div>
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

<style>
  .alert.error { color: white; background: #b00; padding: 0.75rem; margin-bottom: 1rem; }
  label { display: block; margin-bottom: 1rem; }
  input { width: 100%; padding: 0.5rem; margin-top: 0.25rem; }
</style>
