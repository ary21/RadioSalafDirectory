<script lang="ts">
  export let data: any;
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

<div class="min-h-screen bg-slate-50 flex flex-col">
  <!-- Navbar -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-emerald-600 text-white p-2 rounded-xl shadow-md shadow-emerald-500/10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
          </svg>
        </div>
        <div>
          <span class="text-lg font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">Radio Salaf</span>
          <span class="text-xs block font-semibold text-slate-500 tracking-wider uppercase">Directory</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <a 
          href="/usulkan" 
          class="flex items-center gap-1.5 px-4  py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Usulkan Radio
        </a>
        <a 
          href="/admin" 
          class="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
        >
          Portal Admin
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-emerald-800 to-teal-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-300 via-emerald-900 to-slate-950"></div>
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
        Dengarkan Kajian Islam Ilmiah & Murottal Al-Qur'an
      </h2>
      <p class="text-emerald-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
        Akses live streaming radio dakwah sunnah/salaf dari berbagai kota di Indonesia dalam satu pintu yang praktis dan ringan.
      </p>
    </div>
  </div>

  <!-- Search & Content Section -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search Bar -->
    <div class="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 mb-8">
      <form method="get" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div class="flex flex-col gap-1.5">
          <label for="q" class="text-xs font-bold text-slate-600 uppercase tracking-wider">Pencarian</label>
          <div class="relative">
            <input 
              id="q"
              name="q" 
              value={data.filters.q} 
              placeholder="Nama radio, kota, tag..." 
              class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"/>
            </svg>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="city" class="text-xs font-bold text-slate-600 uppercase tracking-wider">Kota</label>
          <input 
            id="city"
            name="city" 
            value={data.filters.city} 
            placeholder="Cari berdasarkan kota" 
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="tag" class="text-xs font-bold text-slate-600 uppercase tracking-wider">Tag / Kategori</label>
          <input 
            id="tag"
            name="tag" 
            value={data.filters.tag} 
            placeholder="Contoh: kajian, murottal" 
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <button 
            type="submit" 
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10"
          >
            Terapkan Filter
          </button>
        </div>
      </form>

      {#if data.filters.q || data.filters.city || data.filters.tag}
        <div class="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500 border-t border-slate-100 pt-4">
          <span>Menampilkan hasil penyaringan untuk:</span>
          {#if data.filters.q}
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">Cari: "{data.filters.q}"</span>
          {/if}
          {#if data.filters.city}
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">Kota: "{data.filters.city}"</span>
          {/if}
          {#if data.filters.tag}
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">Tag: "{data.filters.tag}"</span>
          {/if}
          <a href="/" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 ml-auto">Reset Pencarian</a>
        </div>
      {/if}
    </div>

    <!-- Stations Grid -->
    {#if data.stations && data.stations.length}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.stations as s}
          <div class="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <div>
              <div class="flex items-start justify-between gap-3 mb-2">
                <h3 class="font-bold text-lg text-slate-900 leading-tight">{s.name}</h3>
                {#if s.frequencyLabel}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
                    {s.frequencyLabel}
                  </span>
                {/if}
              </div>

              {#if s.city}
                <div class="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <svg class="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                  </svg>
                  <span>{s.city}</span>
                </div>
              {/if}

              {#if s.tags}
                <div class="flex flex-wrap gap-1.5 mb-6">
                  {#each s.tags.split(',') as tag}
                    {#if tag.trim()}
                      <span class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium transition-all">
                        #{tag.trim()}
                      </span>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <div class="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
              {#if s.streamUrl}
                <AudioPlayer src={s.streamUrl} />
              {:else}
                <span class="text-xs text-slate-400 italic">Offline / URL Streaming Tidak Ada</span>
              {/if}

              {#if s.websiteUrl}
                <a 
                  href={s.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-xs font-bold text-slate-500 hover:text-emerald-600 inline-flex items-center gap-0.5 hover:underline transition-all"
                >
                  Situs Web
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                  </svg>
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-xs">
        <div class="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
          </svg>
        </div>
        <h3 class="text-slate-900 font-bold text-lg mb-1">Radio Tidak Ditemukan</h3>
        <p class="text-slate-500 text-sm mb-6">
          Tidak ada radio berstatus aktif dan publik yang sesuai dengan kriteria filter pencarian Anda.
        </p>
        <a href="/" class="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all cursor-pointer">
          Reset Seluruh Filter
        </a>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-slate-200 mt-auto py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
      <p>&copy; {new Date().getFullYear()} Radio Salaf Directory. All rights reserved.</p>
    </div>
  </footer>
</div>
