<script lang="ts">
  export let data: any;
  export let form: any;

  let name = form?.values?.name ?? data.station.name;
  let city = form?.values?.city ?? data.station.city ?? '';
  let frequencyLabel = form?.values?.frequencyLabel ?? data.station.frequencyLabel ?? '';
  let websiteUrl = form?.values?.websiteUrl ?? data.station.websiteUrl ?? '';
  let streamUrl = form?.values?.streamUrl ?? data.station.streamUrl ?? '';
  let tags = form?.values?.tags ?? data.station.tags ?? '';
  let status = form?.values?.status ?? data.station.status;
  let visibility = form?.values?.visibility ?? data.station.visibility;
  let message = form?.message ?? null;
  let errors: Record<string, string> = form?.errors ?? {};
</script>

<div class="min-h-screen bg-slate-50 flex flex-col">
  <!-- Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="/admin" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-semibold text-sm mr-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
          Dashboard
        </a>
        <div class="h-6 w-px bg-slate-200"></div>
        <div>
          <span class="text-sm font-extrabold tracking-tight text-slate-900">Sunting Stasiun: {data.station.name}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Form Area -->
  <main class="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
    <div class="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
      {#if message}
        <div class="bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-xl p-4 mb-6">
          {message}
        </div>
      {/if}

      <form method="post" action="?/update" class="space-y-6">
        <div class="flex flex-col gap-1.5">
          <label for="name" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Nama Stasiun <span class="text-rose-500">*</span></label>
          <input 
            id="name"
            name="name" 
            bind:value={name} 
            placeholder="Contoh: Radio Rodja"
            required 
            class="w-full px-4 py-2.5 text-sm border {errors.name ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl focus:ring-2 focus:outline-none transition-all"
          />
          {#if errors.name}
            <span class="text-xs font-semibold text-rose-600 mt-1">{errors.name}</span>
          {/if}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="city" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Kota</label>
            <input 
              id="city"
              name="city" 
              bind:value={city} 
              placeholder="Contoh: Bogor"
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="frequencyLabel" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Label Frekuensi</label>
            <input 
              id="frequencyLabel"
              name="frequencyLabel" 
              bind:value={frequencyLabel} 
              placeholder="Contoh: 756 AM"
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="websiteUrl" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Situs Web Resmi</label>
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
          <label for="streamUrl" class="text-xs font-bold text-slate-700 uppercase tracking-wider">URL Stream Audio</label>
          <input 
            id="streamUrl"
            name="streamUrl" 
            bind:value={streamUrl} 
            placeholder="https://..."
            class="w-full px-4 py-2.5 text-sm border {errors.streamUrl ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'} rounded-xl focus:ring-2 focus:outline-none transition-all"
          />
          {#if errors.streamUrl}
            <span class="text-xs font-semibold text-rose-600 mt-1">{errors.streamUrl}</span>
          {/if}
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="tags" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Tag Kategori (Pisahkan dengan Koma)</label>
          <input 
            id="tags"
            name="tags" 
            bind:value={tags} 
            placeholder="Contoh: kajian, sunnah, rodja"
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="status" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Status Izin</label>
            <select 
              id="status"
              name="status" 
              bind:value={status}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="PENDING_REVIEW">Perlu Tinjauan</option>
              <option value="PENDING_PERMISSION">Menunggu Izin</option>
              <option value="APPROVED_PUBLIC">Disetujui Publik</option>
              <option value="APPROVED_PRIVATE">Disetujui Privat</option>
              <option value="REJECTED">Ditolak</option>
            </select>
            {#if errors.status}
              <span class="text-xs font-semibold text-rose-600 mt-1">{errors.status}</span>
            {/if}
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="visibility" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Visibilitas</label>
            <select 
              id="visibility"
              name="visibility" 
              bind:value={visibility}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none bg-white transition-all"
            >
              <option value="PRIVATE">Privat</option>
              <option value="PUBLIC">Publik</option>
            </select>
            {#if errors.visibility}
              <span class="text-xs font-semibold text-rose-600 mt-1">{errors.visibility}</span>
            {/if}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button 
              type="submit" 
              formaction="?/delete" 
              formmethod="post" 
              class="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-bold text-sm py-2.5 px-6 rounded-xl transition-all cursor-pointer"
              onclick={(e) => { if (!confirm('Apakah Anda yakin ingin menghapus stasiun ini?')) e.preventDefault(); }}
            >
              Hapus Stasiun
            </button>
          </div>
          <div class="flex items-center gap-3">
            <a 
              href="/admin" 
              class="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Batal
            </a>
            <button 
              type="submit" 
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</div>
