<script lang="ts">
  export let form: any;
  let email = form?.values?.email ?? '';
  let password = '';
</script>

<div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-md">
    <div class="text-center mb-8">
      <div class="inline-flex bg-emerald-100 text-emerald-800 p-3 rounded-2xl shadow-xs mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 13.5h13.5c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"/>
        </svg>
      </div>
      <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Portal Admin</h1>
      <p class="text-sm text-slate-500 mt-1">Masuk untuk mengelola stasiun radio dan submission</p>
    </div>

    {#if form?.error}
      <div class="bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-xl p-4 mb-6">
        {form.error}
      </div>
    {/if}

    <form method="post" class="space-y-6">
      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Alamat Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          bind:value={email} 
          placeholder="admin@example.com"
          required 
          class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Kata Sandi</label>
        <input 
          id="password"
          name="password" 
          type="password" 
          bind:value={password} 
          placeholder="••••••••"
          required 
          class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
        />
      </div>

      <button 
        type="submit" 
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10"
      >
        Masuk Dashboard
      </button>
    </form>

    <div class="text-center mt-6 pt-6 border-t border-slate-100">
      <a href="/" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-all inline-flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
        </svg>
        Kembali ke Halaman Utama
      </a>
    </div>
  </div>
</div>
