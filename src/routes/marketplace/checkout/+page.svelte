<script lang="ts">
  import { basket } from "$lib/mark/cart";
  import axios from "axios";
  import { Button, Modal, Input, Label, Heading, Alert } from "flowbite-svelte";
  function getCartTotal() {
    return Object.values($basket).reduce((prev, curr, ind) => {
      return prev + curr.quantity * curr.price;
    }, 0);
  }
  let payOpen = false;

  let loading = false;
  let success = false;
  let error = false;
  let errorMsg = "";

  let address = {
    phone: "",
    name: "",
    county: "NAIROBI",
    street: "",
    town: "",
  };

  async function handleCreateOrder() {
    try {
      loading = true;
      success = false;
      error = false;
      errorMsg = "";
      const response = await axios.post(`/checkout/svr`, {
        basket: Object.values($basket),
        total: getCartTotal(),
        address,
      });
      if (response) {
        loading = false;
        success = true;
        error = false;
        errorMsg = "";
        payOpen = true;
      }
    } catch (error) {
      loading = false;
      success = true;
      error = false;
      errorMsg = "";
    }
  }

  let phone = "";

  let payloading = false;
  let paysuccess = false;
  let payerror = false;
  let payerrorMsg = "";
  async function processPay() {
    try {
      payloading = true;
      paysuccess = false;
      payerror = false;
      payerrorMsg = "";
      const response = await axios.put(`/checkout/svr`, {
        phone,
        amount: getCartTotal(),
      });
      if (response) {
        payloading = false;
        paysuccess = true;
        payerror = false;
        payerrorMsg = "";
      }
    } catch (error) {
      payloading = false;
      paysuccess = true;
      payerror = true;
      payerrorMsg = error as any;
    }
  }
</script>

<form on:submit|preventDefault={processPay}>
  <Modal bind:open={payOpen}>
    <Heading slot="header" tag="h5">Complete Payment</Heading>
    {#if payerror}
      <Alert accent dismissable>An error occured processing your request</Alert>
    {/if}
    <form class="mt-5 grid gap-6">
      <div class="relative">
        <input
          class="peer hidden"
          id="radio_1"
          type="radio"
          name="radio"
          checked
        />
        <span
          class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
        />
        <label
          class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          for="radio_1"
        >
          <img
            class="w-14 object-contain"
            src="https://res.cloudinary.com/dreamnerd/image/upload/v1683269032/MicrosoftTeams-image-removebg-preview_uw9vqw.png"
            alt=""
          />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Pay with M-PESA</span>
          </div>
        </label>
      </div>
    </form>

    <Label
      >Payment phone number
      <Input
        type="number"
        required
        bind:value={phone}
        placeholder="254 XX XXXXXX"
      />
    </Label>

    <div class="text-lg">
      Total: KES {getCartTotal()}
    </div>

    <Button type="submit" disabled={payloading}>
      {#if payloading}
        Processing Payment...
      {:else}
        Send request
      {/if}
    </Button>
  </Modal>
</form>

<div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div class="px-4 pt-8">
    <p class="text-xl font-medium">Order Summary</p>
    <p class="text-gray-400">
      Check your items. And select a suitable shipping method.
    </p>
    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {#each Object.values($basket) as item}
        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            class="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src={item.media[0]?.url}
            alt=""
          />
          <div class="flex w-full flex-col px-4 py-4">
            <span class="font-semibold">{item.title}</span>
            <!-- <span class="float-right text-gray-400">42EU - 8.5US</span> -->
            <p class="text-lg font-bold">KES {item.price}</p>
          </div>
        </div>
      {/each}
    </div>

    <p class="mt-8 text-lg font-medium">Shipping Methods</p>
    <form class="mt-5 grid gap-6">
      <div class="relative">
        <input
          class="peer hidden"
          id="radio_1"
          type="radio"
          name="radio"
          checked
        />
        <span
          class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
        />
        <label
          class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          for="radio_1"
        >
          <div class="ml-5">
            <span class="mt-2 font-semibold">Next Day Delivery</span>
            <p class="text-slate-500 text-sm leading-6">Delivery: 24 Hrs</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <form
    on:submit|preventDefault={handleCreateOrder}
    class="mt-10 bg-gray-50 rounded-2xl dark:bg-slate-900 dark:text-white px-4 pt-8 lg:mt-0"
  >
    <p class="text-xl font-medium">Address Details</p>
    <p class="text-gray-400">
      Complete your order by providing your payment details.
    </p>
    <div class="">
      <label for="email" class="mt-4 mb-2 block text-sm font-medium"
        >Contact phone</label
      >
      <div class="relative">
        <input
          required
          type="text"
          id="phone"
          bind:value={address.phone}
          name="phone"
          class="w-full dark:text-white dark:bg-gray-900 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="+254 XX XXXXXX"
        />
        <div
          class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
      </div>
      <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium"
        >Contact name</label
      >
      <div class="relative">
        <input
          required
          bind:value={address.name}
          type="text"
          id="card-holder"
          name="card-holder"
          class="w-full dark:text-white dark:bg-gray-900 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your name here"
        />
        <div
          class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
            />
          </svg>
        </div>
      </div>

      <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium"
        >Delivery Address</label
      >

      <div class="flex flex-col sm:flex-row">
        <select
          required
          bind:value={address.county}
          name="billing-state"
          class="w-full dark:text-white dark:bg-gray-900 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">County</option>
          <option value="NAIROBI">Nairobi</option>
        </select>
        <input
          bind:value={address.town}
          required
          type="text"
          class="flex-shrink-0 rounded-md border dark:text-white dark:bg-gray-900 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Town"
        />
        <div class="relative flex-shrink-0 sm:w-7/12">
          <input
            bind:value={address.street}
            type="text"
            id="billing-address"
            name="billing-address"
            class="w-full dark:text-white dark:bg-gray-900 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Street"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
          />
        </div>
      </div>

      <!-- Total -->
      <div class="mt-6 border-t border-b py-2">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            Subtotal
          </p>
          <p class="font-semibold text-gray-900 dark:text-white">
            KES {getCartTotal()}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            Shipping
          </p>
          <p class="font-semibold text-gray-900 dark:text-white">KES 0.00</p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900 dark:text-white">Total</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">
          KES {getCartTotal()}
        </p>
      </div>
    </div>
    <button
      class="mt-4 mb-8 w-full rounded-md dark:bg-gray-800 bg-gray-900 px-6 py-3 font-medium text-white"
    >
      {#if loading}
        Processing order...
      {:else}
        Place Order
      {/if}</button
    >
  </form>
</div>
