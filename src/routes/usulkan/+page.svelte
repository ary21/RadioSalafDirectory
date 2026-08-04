<script lang="ts">
  import { onMount } from 'svelte';
  const { form, data } = $props();

  let name = form?.values?.name ?? '';
  let city = form?.values?.city ?? '';
  let frequencyLabel = form?.values?.frequencyLabel ?? '';
  let websiteUrl = form?.values?.websiteUrl ?? '';
  let streamUrlGuess = form?.values?.streamUrlGuess ?? '';
  let note = form?.values?.note ?? '';

  let submitting = false;
  let optimisticSuccess = false;
  let errors: Record<string, string> = form?.errors ?? {};

  // keep server-side submitted state as fallback
  let serverSubmitted = data?.submitted ?? false;

  onMount(() => {
    if (serverSubmitted) optimisticSuccess = true;
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const formEl = e.currentTarget as HTMLFormElement;
    const fd = new FormData(formEl);

    // optimistic UI: assume success, clear fields
    const prev = { name, city, frequencyLabel, websiteUrl, streamUrlGuess, note };
    submitting = true;
    optimisticSuccess = true;
    errors = {};
    name = city = frequencyLabel = websiteUrl = streamUrlGuess = note = '';

    try {
      const res = await fetch('/usulkan', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd
      });

      if (res.ok) {
        // keep success message
        submitting = false;
      } else {
        // server returned validation errors
        const body = await res.json().catch(() => ({}));
        optimisticSuccess = false;
        submitting = false;
        errors = body.errors ?? {};
        // restore previous values so user can fix
        ({ name, city, frequencyLabel, websiteUrl, streamUrlGuess, note } = prev);
      }
    } catch (err) {
      optimisticSuccess = false;
      submitting = false;
      errors = { _form: 'Network error. Please try again.' };
      ({ name, city, frequencyLabel, websiteUrl, streamUrlGuess, note } = prev);
    }
  }
</script>

<main>
  <h1>Usulkan Radio</h1>

  {#if optimisticSuccess}
    <div class="alert success">Terima kasih — usulan Anda telah dikirim untuk ditinjau.</div>
  {/if}

  {#if form?.message}
    <div class="alert error">{form.message}</div>
  {/if}

  {#if errors._form}
    <div class="alert error">{errors._form}</div>
  {/if}

  <form onsubmit={handleSubmit}>
    <label>
      Nama Radio
      <input name="name" bind:value={name} required />
      {#if errors.name}
        <span class="field-error">{errors.name}</span>
      {/if}
    </label>

    <label>
      Kota
      <input name="city" bind:value={city} />
    </label>

    <label>
      Frequency (label)
      <input name="frequencyLabel" bind:value={frequencyLabel} />
    </label>

    <label>
      Website (opsional)
      <input name="websiteUrl" bind:value={websiteUrl} placeholder="https://..." />
      {#if errors.websiteUrl}
        <span class="field-error">{errors.websiteUrl}</span>
      {/if}
    </label>

    <label>
      Stream URL (opsional)
      <input name="streamUrlGuess" bind:value={streamUrlGuess} placeholder="https://..." />
      {#if errors.streamUrlGuess}
        <span class="field-error">{errors.streamUrlGuess}</span>
      {/if}
    </label>

    <label>
      Catatan (opsional)
      <textarea name="note" bind:value={note}></textarea>
    </label>

    <button type="submit" disabled={submitting}>{submitting ? 'Mengirim...' : 'Kirim Usulan'}</button>
  </form>
</main>

<style>
  form { display: grid; gap: 1rem; max-width: 700px; }
  label { display: grid; gap: 0.35rem; font-weight: 600; }
  input, select, textarea { width: 100%; padding: 0.65rem; border: 1px solid #ccc; border-radius: 0.35rem; }
  .field-error { color: red; font-size: 0.9rem; }
  .alert { padding: 0.75rem; margin-bottom: 1rem; border-radius: 0.35rem; }
  .alert.success { background: #2ecc71; color: white; }
  .alert.error { background: #b00; color: white; }
  button { padding: 0.75rem 1rem; background: #111; color: white; border-radius: 0.35rem; border: none; }
</style>
