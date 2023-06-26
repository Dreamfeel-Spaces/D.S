<script lang="ts">
  //@ts-nocheck
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { uploadCloudinary } from "$lib/mark/db/upload/upload";
  import axios from "axios";
  import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    Label,
    Modal,
  } from "flowbite-svelte";
  import Svelecte from "svelecte";
  import Dropzone from "svelte-file-dropzone";

  let value = $page.data.config.LANDING_PAGE.carouselItems ?? [];
  let bannerValue = $page.data.config.LANDING_PAGE.bannerItems ?? [];
  let bannerImage = "";

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...acceptedFiles];
    files.rejected = [...fileRejections];

    files.accepted.forEach(handleImgSrc);
  }

  function handleImgSrc(file) {
    const preview = document.querySelector("#preview");
    preview.childNodes.forEach((c) => c.remove());
    let image;
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const image = new Image();
      image.height = 100;
      image.title = file.name;
      image.src = reader.result;
      preview.appendChild(image);
    });
    reader.readAsDataURL(file);

    return image;
  }

  const list = $page.data.categories
    ?.filter((product) => !value.includes(product))
    ?.map((product) => ({
      ...product,
      value: product.id,
    }));

  let carouselOpen = false;
  let featuredOpen = false;
  let bannerOpen = false;

  let selection = [];
  let selectedBannerItems = [];
  let savingCarousels = false;

  let selectedFeaturedItem = null;
  let featuredItem = $page.data.config.LANDING_PAGE.featuredItem ?? "";

  async function handleSubmit() {
    savingCarousels = true;
    let images = [];
    if (files.accepted.length) {
      images = await uploadCloudinary(
        files.accepted?.map((file, i) => ({ fileData: file, field: i }))
      );
    }
    try {
      let response = await axios.put(`/dashboard/settings/svr`, {
        ...$page.data.config,
        LANDING_PAGE: {
          carouselItems: value,
          featuredItem,
          [bannerOpen ? "bannerImage" : "images"]: images[0],
          bannerItems: bannerValue,
        },
      });
      if (response) {
        savingCarousels = false;
        invalidateAll();
      }
    } catch (error) {
      savingCarousels = false;
    }
  }
  let bannerProducts = $page.data.config.LANDING_PAGE.bannerItems?.map(
    (p: any) => {
      return $page.data.products.find((product) => product.id === p);
    }
  );
</script>

<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
  <Modal bind:open={carouselOpen}>
    <div slot="header">Add Carousel Products</div>
    <Svelecte
      options={list}
      bind:readSelection={selection}
      bind:value
      multiple
      highlightFirstItem={false}
      placeholder="Select products"
    />
    <div class="mb-48" />
    <Button slot="footer" type="submit"
      >{#if savingCarousels} Saving... {:else}Save{/if}</Button
    >
  </Modal>
  <Modal bind:open={featuredOpen}>
    <div slot="header">Select Featured Collections</div>
    <Svelecte
      options={list}
      inputId="country"
      bind:readSelection={selectedFeaturedItem}
      bind:value={featuredItem}
      placeholder="Select country"
    />
    <div class="mb-48" />
    <Button slot="footer" type="submit"
      >{#if savingCarousels} Saving... {:else}Save{/if}</Button
    >
  </Modal>
  <Modal bind:open={bannerOpen}>
    <div slot="header">Add Banner Products</div>
    <Svelecte
      options={list}
      bind:readSelection={selectedBannerItems}
      bind:value={bannerValue}
      multiple
      highlightFirstItem={false}
      placeholder="Select products"
    />
    <Label>
      Images
      <Dropzone accept="image/*" multiple={false} on:drop={handleFilesSelect} />
    </Label>
    <div id="preview" />
    <Button slot="footer" type="submit"
      >{#if savingCarousels} Saving... {:else}Save{/if}</Button
    >
  </Modal>
</form>

<div class="container px-6">
  <Card size="xl">
    <div class="text-2xl mb-6">Landing Page</div>
    <Accordion>
      <AccordionItem>
        <div slot="header" class="text-xl">Carousel</div>
        <div class="flex justify-end">
          <Button on:click={() => (carouselOpen = true)}
            >Add Carousel Products</Button
          >
        </div>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3"> CATALOGUE </th>
                <th scope="col" class="px-6 py-3"> Category </th>
                <th scope="col" class="px-6 py-3"> Price </th>
              </tr>
            </thead>
            <tbody>
              {#each bannerProducts ?? [] as product}
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </AccordionItem>
      <AccordionItem>
        <div slot="header" class="text-xl">Featured</div>
        <div class="flex justify-end">
          <Button on:click={() => (featuredOpen = true)}>Select Featured</Button
          >
        </div>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3"> CATALOGUE </th>
                <th scope="col" class="px-6 py-3"> Category </th>
                <th scope="col" class="px-6 py-3"> Price </th>
              </tr>
            </thead>
            <tbody>
              {#each $page.data.categories?.filter((prod) => prod.id === featuredItem) as product}
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </AccordionItem>
      <AccordionItem>
        <div slot="header" class="text-xl">Banner</div>
        <div class="flex justify-end">
          <Button on:click={() => (bannerOpen = true)}>Select Product</Button>
        </div>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3"> CATALOGUE </th>
                <th scope="col" class="px-6 py-3"> Category </th>
                <th scope="col" class="px-6 py-3"> Price </th>
              </tr>
            </thead>
            <tbody>
              {#each $page.data.categories?.filter((prod) => prod.id === featuredItem) as product}
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </AccordionItem>
      <AccordionItem>
        <div slot="header" class="text-xl">Socials</div>
        <div class="flex justify-end">
          <Button on:click={() => (bannerOpen = true)}>Add Posts</Button>
        </div>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3"> CATALOGUE </th>
                <th scope="col" class="px-6 py-3"> Category </th>
                <th scope="col" class="px-6 py-3"> Price </th>
              </tr>
            </thead>
            <tbody>
              {#each $page.data.categories?.filter((prod) => prod.id === featuredItem) as product}
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </AccordionItem>
    </Accordion>
  </Card>
</div>
