<script lang="ts">
  export var online: boolean;
</script>

<div class="badge badge-outline {online ? 'badge-success' : ''}">{online ? 'online' : 'offline'}</div>
