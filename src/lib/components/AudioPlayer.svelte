<script lang="ts">
  const { src } = $props();
  let audio: HTMLAudioElement | null = null;
  let playing = false;

  function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
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
  <div class="audio-player">
    <audio bind:this={audio} src={src} onplay={onPlay} onpause={onPause} preload="none"></audio>
    <button onclick={toggle}>{playing ? 'Pause' : 'Play'}</button>
  </div>
{:else}
  <div>No stream available</div>
{/if}

<style>
.audio-player button { margin-top: 0.25rem }
</style>
