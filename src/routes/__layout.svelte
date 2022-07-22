<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import NavBarLink from "$lib/components/NavBarLink.svelte";
  import WalletConnect from "../lib/components/WalletConnect.svelte";

  let currentPath: string;
  $: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen">
  <div class="bg-base-100 sticky top-0 z-30">
    <div
      class="navbar bg-secondary/30 text-primary
     mt-0 pt-0 pb-0 min-h-0 border-b-2 border-b-primary/25 shadow-lg mb-1">
      <div class="navbar-start space-x-2">
        <a class="btn btn-ghost rounded-none normal-case text-xl no-animation hover:bg-secondary/10" href="/"
        ><img src="https://aeternity.com/images/aeternity-logo.svg" /></a
        >
        <NavBarLink navUrl="/mypage" text="My Page" {currentPath} />
        <NavBarLink navUrl="/validators" text="Validators" {currentPath} />
      </div>
      <div class="navbar-end">
        <WalletConnect />
      </div>
    </div>
  </div>
  <div class="overflow-scroll">
    <div class="container mx-auto min-h-scren z-50">
      <slot />
    </div>

    <footer class="footer footer-center items-center text-primary p-2 mt-4 ">
      <div class="items-center grid-flow-row">
        <p>Copyright © 2022 - Aeternity developers</p>
      </div>
    </footer>
  </div>
</div>
