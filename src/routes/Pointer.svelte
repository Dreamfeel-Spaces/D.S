<script>
    import { onMount } from 'svelte';
  
    let mouseX = 0;
    let mouseY = 0;
  
    onMount(() => {
      window.addEventListener('mousemove', handleMouseMove);
    });
  
    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  </script>
  
  <style>
    .pointer-trailer {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      transition: transform 0.2s ease-in-out;
      z-index: 9999999;
    }
  </style>
  
  <div class="pointer-trailer blur" style="left: {mouseX}px; top: {mouseY}px;"></div>
  