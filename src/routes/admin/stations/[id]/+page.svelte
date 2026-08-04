<script lang="ts">
  const { data, form } = $props();

  let name = form?.values?.name ?? data.station.name;
  let city = form?.values?.city ?? data.station.city ?? '';
  let frequencyLabel = form?.values?.frequencyLabel ?? data.station.frequencyLabel ?? '';
  let websiteUrl = form?.values?.websiteUrl ?? data.station.websiteUrl ?? '';
  let streamUrl = form?.values?.streamUrl ?? data.station.streamUrl ?? '';
  let tags = form?.values?.tags ?? data.station.tags ?? '';
  let status = form?.values?.status ?? data.station.status;
  let visibility = form?.values?.visibility ?? data.station.visibility;
  let message = form?.message ?? null;
  let errors = form?.errors ?? {};
</script>

<main>
  <h1>Edit Station</h1>
  {#if message}
    <div class="alert error">{message}</div>
  {/if}
  <form method="post" action="?/update">
    <label>
      Name
      <input name="name" bind:value={name} required />
      {#if errors.name}
        <span class="field-error">{errors.name}</span>
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
      {#if errors.websiteUrl}
        <span class="field-error">{errors.websiteUrl}</span>
      {/if}
    </label>
    <label>
      Stream URL
      <input name="streamUrl" bind:value={streamUrl} />
      {#if errors.streamUrl}
        <span class="field-error">{errors.streamUrl}</span>
      {/if}
    </label>
    <label>
      Tags
      <input name="tags" bind:value={tags} />
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
      {#if errors.status}
        <span class="field-error">{errors.status}</span>
      {/if}
    </label>
    <label>
      Visibility
      <select name="visibility" bind:value={visibility}>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </select>
      {#if errors.visibility}
        <span class="field-error">{errors.visibility}</span>
      {/if}
    </label>
    <button type="submit">Save</button>
  </form>
</main>

<style>
  .field-error { color: red; font-size: 0.9rem; display: block; }
  .alert.error { color: white; background: #b00; padding: 0.75rem; margin-bottom: 1rem; }
</style>
