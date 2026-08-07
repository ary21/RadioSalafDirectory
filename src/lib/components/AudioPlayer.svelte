<script lang="ts">
  export let src: string;
  let audio: HTMLAudioElement | null = null;
  let playing = false;

  function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      // Pause other audio players on the page first
      const audios = document.querySelectorAll('audio');
      audios.forEach((el) => {
        if (el !== audio) el.pause();
      });
      audio.play().catch(() => {});
    }
  }

  function onPlay() {
    playing = true;
  }

  function onPause() {
    playing = false;
  }
</script>

{#if src}
  <div class="flex items-center gap-3">
    <audio bind:this={audio} src={src} onplay={onPlay} onpause={onPause} preload="none"></audio>
    <button 
      onclick={toggle} 
      class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
             {playing ? 'bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20'}"
    >
      {#if playing}
        <!-- Pause Icon -->
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <span>Muted / Pause</span>
      {:else}
        <!-- Play Icon -->
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <span>Putar Radio</span>
      {/if}
    </button>
    {#if playing}
      <span class="flex h-3 w-3 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <span class="text-xs text-emerald-600 font-medium">Siaran Berlangsung...</span>
    {/if}
  </div>
{:else}
  <div class="text-xs text-gray-400 italic">Stream tidak tersedia</div>
{/if}
