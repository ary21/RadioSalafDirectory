<script lang="ts">
  import { onMount } from 'svelte';
  export let form: any;
  export let data: any;

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
        submitting = false;
      } else {
        const body = await res.json().catch(() => ({}));
        optimisticSuccess = false;
        submitting = false;
        errors = body.errors ?? {};
        ({ name, city, frequencyLabel, websiteUrl, streamUrlGuess, note } = prev);
      }
    } catch (err) {
      optimisticSuccess = false;
      submitting = false;
      errors = { _form: 'Terjadi masalah jaringan. Silakan coba kembali.' };
      ({ name, city, frequencyLabel, websiteUrl, streamUrlGuess, note } = prev);
    }
  }
</script>

<div class="min-h-screen bg-slate-50 flex flex-col">
  <!-- Navbar -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="/" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-semibold text-sm mr-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
          Kembali
        </a>
        <div class="h-6 w-px bg-slate-200"></div>
        <div>
          <span class="text-sm font-extrabold tracking-tight text-slate-900">Usulkan Radio Baru</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Container -->
  <main class="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-12">
    <div class="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-slate-900">Bantu Melengkapi Direktori</h2>
        <p class="text-sm text-slate-500 mt-1">
          Punya rekomendasi radio dakwah sunnah yang belum terdaftar? Ajukan usulan Anda agar divalidasi dan dihubungi oleh admin.
        </p>
      </div>

      {#if optimisticSuccess}
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <div>
            <h4 class="font-bold text-sm text-emerald-800">Usulan Berhasil Dikirim</h4>
            <p class="text-xs text-emerald-700/90 mt-0.5">Terima kasih atas kontribusi Anda. Admin akan meninjau dan memproses usulan ini secepatnya.</p>
          </div>
        </div>
      {/if}

      {#if form?.message}
        <div class="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 mb-6 text-sm font-semibold">
          {form.message}
        </div>
      {/if}

      {#if errors._form}
        <div class="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 mb-6 text-sm font-semibold">
          {errors._form}
        </div>
      {/if}

      <form onsubmit={handleSubmit} class="space-y-6">
        <div class="flex flex-col gap-1.5">
          <label for="name" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Stasiun Radio <span class="text-rose-500">*</span></label>
          <input 
            id="name"
            name="name" 
            bind:value={name} 
            placeholder="Contoh: Radio Sunnah Bandung" 
            required 
            class="w-full px-4 py-2.5 text-sm border {errors.name ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl focus:ring-2 focus:outline-none transition-all"
          />
          {#if errors.name}
            <span class="text-xs font-semibold text-rose-600 mt-1">{errors.name}</span>
          {/if}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="city" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Kota asal</label>
            <input 
              id="city"
              name="city" 
              bind:value={city} 
              placeholder="Contoh: Bandung"
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="frequencyLabel" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Frekuensi (Jika Ada)</label>
            <input 
              id="frequencyLabel"
              name="frequencyLabel" 
              bind:value={frequencyLabel} 
              placeholder="Contoh: 1476 AM atau 92.1 FM"
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="websiteUrl" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Situs Web Resmi (Opsional)</label>
          <input 
            id="websiteUrl"
            name="websiteUrl" 
            bind:value={websiteUrl} 
            placeholder="https://..." 
            class="w-full px-4 py-2.5 text-sm border {errors.websiteUrl ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl focus:ring-2 focus:outline-none transition-all"
          />
          {#if errors.websiteUrl}
            <span class="text-xs font-semibold text-rose-600 mt-1">{errors.websiteUrl}</span>
          {/if}
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="streamUrlGuess" class="text-xs font-bold text-slate-700 uppercase tracking-wider">URL Stream Audio (Jika Tahu)</label>
          <input 
            id="streamUrlGuess"
            name="streamUrlGuess" 
            bind:value={streamUrlGuess} 
            placeholder="https://..." 
            class="w-full px-4 py-2.5 text-sm border {errors.streamUrlGuess ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl focus:ring-2 focus:outline-none transition-all"
          />
          {#if errors.streamUrlGuess}
            <span class="text-xs font-semibold text-rose-600 mt-1">{errors.streamUrlGuess}</span>
          {/if}
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="note" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Catatan Tambahan</label>
          <textarea 
            id="note"
            name="note" 
            bind:value={note}
            rows="3"
            placeholder="Keterangan lain, jam siaran aktif, nama kontak penanggung jawab, dll."
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
          ></textarea>
        </div>

        <div class="pt-4">
          <button 
            type="submit" 
            disabled={submitting}
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Mengirim Usulan...' : 'Kirim Usulan Radio'}
          </button>
        </div>
      </form>
    </div>
  </main>
</div>
