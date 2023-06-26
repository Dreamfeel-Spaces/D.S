<script>
  //@ts-nocheck
  import {
    Button,
    Modal,
    Heading,
    Label,
    Hr,
    Input,
    Textarea,
    Alert,
    Select,
    Avatar,
  } from "flowbite-svelte";
  import Dropzone from "svelte-file-dropzone";
  import axios from "axios";
  import { uploadCloudinary } from "$lib/mark/db/upload/upload";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";

  $: modalOpen = false;

  function toggleModal() {
    modalOpen = !modalOpen;
  }
  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    files.accepted.forEach(handleImgSrc);
  }

  function handleImgSrc(file) {
    const preview = document.querySelector("#preview");
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

  let title;
  let description;
  let category;
  let price = 0.0;

  let saving = false;
  let success = false;
  let error = false;
  let errorMsg = false;

  async function handleSubmit() {
    saving = true;

    const images = await uploadCloudinary(
      files.accepted.map((file, i) => ({ fileData: file, field: i }))
    );

    success = false;
    error = false;
    errorMsg = "";
    try {
      const response = await axios.post(`/dashboard/products/svr`, {
        title,
        description,
        images,
        category,
        price,
      });
      if (response) {
        success = true;
        saving = false;
        invalidateAll();
      }
    } catch (error) {
      saving = false;
      error = true;
      errorMsg = error.message;
    }
  }
</script>

<section class="p-6">
  <div class="flex">
    <Heading class="flex-1" tag="h5">PRODUCTS</Heading>
    <Button on:click={toggleModal}>Create Product</Button>
  </div>

  <Hr class="my-1" />

  <form on:submit|preventDefault={handleSubmit}>
    <Modal bind:open={modalOpen}>
      <Heading tag="h6" slot="header">Create procuct</Heading>

      {#if success}
        <div class="my-9">
          <Alert>Category has been saved!</Alert>
        </div>
      {/if}
      <Label>
        Title
        <Input placeholder="Shampoo..." required bind:value={title} />
      </Label>
      <Label>
        Price
        <Input placeholder="0.0" type="number" required bind:value={price} />
      </Label>
      <Label>
        Category
        <Select
          items={$page.data.categories.map((c) => ({
            value: c.id,
            name: c.title,
          }))}
          required
          bind:value={category}
        />
      </Label>
      <Label>
        Description
        <Textarea
          bind:value={description}
          rows={9}
          placeholder="Hair products..."
        />
      </Label>

      <Label>
        Images
        <Dropzone
          accept="image/*"
          multiple={true}
          on:drop={handleFilesSelect}
        />
      </Label>
      <div class="grid grid-cols-3" />
      <ol id="preview" />
      <Button disabled={saving} type="submit" slot="footer"
        >{#if saving} Saving... {:else} Save {/if}</Button
      >
    </Modal>
  </form>

  {#if $page.data.products.length}
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3" />
            <th scope="col" class="px-6 py-3"> Title </th>
            <th scope="col" class="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {#each $page.data.products as category}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Avatar src={category.media[0].url} />
              </th>
              <td class="px-6 py-4"> {category.title} </td>
              <td class="px-6 underline text-blue-600 py-4">
                <a href="/dashboard/products/{category.id}">View</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div>No products have been added</div>
  {/if}
</section>
