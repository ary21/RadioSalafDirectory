<script lang="ts">
  const { form } = $props();

  let name = form?.values?.name ?? '';
  let city = form?.values?.city ?? '';
  let frequencyLabel = form?.values?.frequencyLabel ?? '';
  let websiteUrl = form?.values?.websiteUrl ?? '';
  let streamUrl = form?.values?.streamUrl ?? '';
  let tags = form?.values?.tags ?? '';
  let status = form?.values?.status ?? 'PENDING_REVIEW';
  let visibility = form?.values?.visibility ?? 'PRIVATE';
</script>

<main>
  <h1>New Station</h1>
  {#if form?.message}
    <div class="alert error">{form.message}</div>
  {/if}
  <form method="post">
    <label>
      Name
      <input name="name" bind:value={name} required />
      {#if form?.errors?.name}
        <span class="field-error">{form.errors.name}</span>
      {/if}
    </label>
    <label>
      City
      <input name="city" bind:value={city} />
    </label>
    <label>
      Frequency
      <input name="frequencyLabel" bind:value={frequencyLabel} />
    </label>
    <label>
      Website
      <input name="websiteUrl" bind:value={websiteUrl} />
      {#if form?.errors?.websiteUrl}
        <span class="field-error">{form.errors.websiteUrl}</span>
      {/if}
    </label>
    <label>
      Stream URL
      <input name="streamUrl" bind:value={streamUrl} />
      {#if form?.errors?.streamUrl}
        <span class="field-error">{form.errors.streamUrl}</span>
      {/if}
    </label>
    <label>
      Tags
      <input name="tags" bind:value={tags} placeholder="comma separated" />
    </label>
    <label>
      Status
      <select name="status" bind:value={status}>
        <option value="PENDING_REVIEW">Pending review</option>
        <option value="PENDING_PERMISSION">Pending permission</option>
        <option value="APPROVED_PUBLIC">Approved public</option>
        <option value="APPROVED_PRIVATE">Approved private</option>
        <option value="REJECTED">Rejected</option>
      </select>
      {#if form?.errors?.status}
        <span class="field-error">{form.errors.status}</span>
      {/if}
    </label>
    <label>
      Visibility
      <select name="visibility" bind:value={visibility}>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </select>
      {#if form?.errors?.visibility}
        <span class="field-error">{form.errors.visibility}</span>
      {/if}
    </label>
    <button type="submit">Create</button>
  </form>
</main>

<style>
  form { display: grid; gap: 1rem; max-width: 700px; }
  label { display: grid; gap: 0.35rem; font-weight: 600; }
  input, select, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 0.35rem; }
  .field-error { color: red; font-size: 0.9rem; }
  .alert.error { color: white; background: #b00; padding: 0.75rem; margin-bottom: 1rem; border-radius: 0.35rem; }
  button { padding: 0.85rem 1.25rem; background: #111; color: white; border: none; border-radius: 0.35rem; cursor: pointer; }
</style>
