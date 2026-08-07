<script lang="ts">
  export let data: any;

  // Compute simple stats for dashboard
  $: totalStations = data.stations.length;
  $: publicStations = data.stations.filter((s: any) => s.status === 'APPROVED_PUBLIC').length;
  $: privateStations = data.stations.filter((s: any) => s.status === 'APPROVED_PRIVATE').length;
  $: pendingStations = data.stations.filter((s: any) => s.status.startsWith('PENDING')).length;
</script>

<div class="min-h-screen bg-slate-50 flex flex-col">
  <!-- Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="/" class="bg-emerald-600 text-white p-2 rounded-xl shadow-md shadow-emerald-500/10" aria-label="Kembali ke Halaman Utama">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
          </svg>
        </a>
        <div>
          <span class="text-sm font-extrabold tracking-tight text-slate-900">Dashboard Control Panel</span>
          <span class="text-xs block font-semibold text-slate-400">Masuk sebagai: {data.admin.email}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <form action="/admin/logout" method="post">
          <button 
            type="submit" 
            class="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4.5 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            Keluar (Logout)
          </button>
        </form>
      </div>
    </div>
  </header>

  <!-- Content -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Action buttons & Navigation -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Manajemen Direktori</h2>
        <p class="text-xs text-slate-500">Kelola daftar streaming radio sunnah yang tampil untuk publik maupun admin.</p>
      </div>
      <div class="flex items-center gap-3">
        <a 
          href="/admin/submissions" 
          class="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.5 4.5 0 1 1 9.01 0c0 .027-.001.053-.003.08m-9.004-.08a5.22 5.22 0 0 0-.012.285V16.5a2.25 2.25 0 0 0 2.25 2.25h1.278m0-16.5a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 13.5 15h1.5a2.25 2.25 0 0 0 2.25-2.25V7.5"/>
          </svg>
          Moderasi Usulan Publik
        </a>
        <a 
          href="/admin/stations/new" 
          class="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Tambah Stasiun Manual
        </a>
      </div>
    </div>

    <!-- Quick Stats Card -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Stasiun</span>
        <span class="text-3xl font-extrabold text-slate-900 block mt-1">{totalStations}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Aktif Publik</span>
        <span class="text-3xl font-extrabold text-emerald-600 block mt-1">{publicStations}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Aktif Privat</span>
        <span class="text-3xl font-extrabold text-blue-600 block mt-1">{privateStations}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Menunggu Izin/Tinjauan</span>
        <span class="text-3xl font-extrabold text-amber-500 block mt-1">{pendingStations}</span>
      </div>
    </div>

    <!-- Stations Table Section -->
    <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
      <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-bold text-slate-950 text-base">Daftar Stasiun Radio</h3>
      </div>

      {#if data.stations.length}
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-150 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th class="py-3.5 px-6">Nama Stasiun</th>
                <th class="py-3.5 px-4">Status Izin</th>
                <th class="py-3.5 px-4">Visibilitas</th>
                <th class="py-3.5 px-4">Kota</th>
                <th class="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              {#each data.stations as s}
                <tr class="hover:bg-slate-50/70 transition-all">
                  <td class="py-4 px-6 font-semibold text-slate-900">{s.name}</td>
                  <td class="py-4 px-4">
                    {#if s.status === 'APPROVED_PUBLIC'}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Disetujui Publik
                      </span>
                    {:else if s.status === 'APPROVED_PRIVATE'}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        Disetujui Privat
                      </span>
                    {:else if s.status === 'PENDING_PERMISSION'}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        Menunggu Izin
                      </span>
                    {:else if s.status === 'PENDING_REVIEW'}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Perlu Tinjauan
                      </span>
                    {:else}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        Ditolak
                      </span>
                    {/if}
                  </td>
                  <td class="py-4 px-4">
                    {#if s.visibility === 'PUBLIC'}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                        Publik
                      </span>
                    {:else}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        Privat
                      </span>
                    {/if}
                  </td>
                  <td class="py-4 px-4 text-slate-500">{s.city ?? '-'}</td>
                  <td class="py-4 px-6 text-right">
                    <a 
                      href={`/admin/stations/${s.id}`} 
                      class="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-0.5 transition-all"
                    >
                      Sunting / Edit
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                      </svg>
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <div class="p-12 text-center text-slate-400">
          <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
          </svg>
          <p class="text-sm font-semibold mb-1">Belum ada stasiun terdaftar</p>
          <p class="text-xs text-slate-500">Gunakan tombol di atas untuk menambahkan stasiun secara manual.</p>
        </div>
      {/if}
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-slate-200 mt-auto py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
      <p>&copy; {new Date().getFullYear()} Radio Salaf Directory. Portal Dashboard Admin.</p>
    </div>
  </footer>
</div>
