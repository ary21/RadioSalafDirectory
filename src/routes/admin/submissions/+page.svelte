<script lang="ts">
  export let data: any;
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
          <span class="text-sm font-extrabold tracking-tight text-slate-900">Moderasi Usulan Masuk</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Container -->
  <main class="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-900">Usulan Radio dari Pengunjung</h2>
      <p class="text-sm text-slate-500 mt-1">
        Tinjau usulan stasiun radio baru. Menyetujui usulan akan membuat stasiun baru dengan status "Menunggu Izin".
      </p>
    </div>

    {#if data.submissions.length}
      <div class="space-y-4">
        {#each data.submissions as s}
          <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-6 hover:border-slate-300 transition-all">
            <div class="space-y-2">
              <div class="flex items-baseline gap-2 flex-wrap">
                <h4 class="font-bold text-slate-900 text-lg leading-tight">{s.name}</h4>
                {#if s.city}
                  <span class="text-xs font-semibold text-slate-400">({s.city})</span>
                {/if}
              </div>

              {#if s.frequencyLabel}
                <div class="text-xs font-bold text-slate-500">Frekuensi: {s.frequencyLabel}</div>
              {/if}

              {#if s.websiteUrl || s.streamUrlGuess}
                <div class="space-y-1 pt-1">
                  {#if s.websiteUrl}
                    <div class="text-xs text-slate-500">
                      Situs: <a href={s.websiteUrl} target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:underline font-semibold">{s.websiteUrl}</a>
                    </div>
                  {/if}
                  {#if s.streamUrlGuess}
                    <div class="text-xs text-slate-500">
                      Perkiraan Stream: <span class="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-sm font-mono break-all">{s.streamUrlGuess}</span>
                    </div>
                  {/if}
                </div>
              {/if}

              {#if s.note}
                <div class="bg-slate-50 rounded-xl p-3 border border-slate-200/50 mt-2 text-sm text-slate-600">
                  <span class="text-xs font-bold block uppercase tracking-wider text-slate-400 mb-1">Catatan Pengusul</span>
                  {s.note}
                </div>
              {/if}
            </div>

            <!-- Actions -->
            <div class="flex sm:flex-col items-stretch gap-2.5 shrink-0 pt-2 sm:pt-0">
              <form method="post" class="w-full">
                <input type="hidden" name="id" value={s.id} />
                <button 
                  name="approve"
                  class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  Setujui Usulan
                </button>
              </form>
              <form method="post" class="w-full">
                <input type="hidden" name="id" value={s.id} />
                <button 
                  name="reject"
                  class="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-semibold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer"
                  onclick={(e) => { if (!confirm('Apakah Anda yakin ingin menolak usulan ini?')) e.preventDefault(); }}
                >
                  Tolak Usulan
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-xs">
        <div class="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
          </svg>
        </div>
        <h3 class="text-slate-900 font-bold text-lg mb-1">Semua Bersih</h3>
        <p class="text-slate-500 text-sm">
          Saat ini tidak ada usulan baru dari pengunjung yang perlu dimoderasi.
        </p>
      </div>
    {/if}
  </main>
</div>
