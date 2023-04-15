<script lang="ts">
  import logo from "$lib/assets/logo.png";

  let message: string;
  let content: string | undefined = undefined;
  let loading: boolean = false;

  const generate = async () => {
    if (loading || !message) return;
    loading = true;
    content = undefined;
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    content = data.choices[0].message.content;
    loading = false;
  };
</script>

<svelte:head>
  <title>Tweetly</title>
  <meta name="description" content="Tweet maker using OpenAI" />
</svelte:head>

<main class="container mx-auto max-w-md p-6 space-y-4">
  <h1>
    <img alt="Tweetly" src={logo} class="mx-auto" />
  </h1>
  <p class="text-xl text-slate-400 text-center">
    Having trouble creating your Tweets? <br />
    Use <b class="text-sky-500 font-mono">OpenAI</b> to help you
  </p>

  <form method="post" on:submit|preventDefault={generate} class="space-y-4">
    <input
      type="text"
      class="w-full outline-none border ring-2 ring-white focus:ring-sky-400 px-3 py-2 rounded"
      placeholder="What would the tweet be about..."
      bind:value={message}
    />
    {#if !loading}
      <button
        type="submit"
        class="w-full py-2 px-3 text-white bg-sky-600 hover:bg-sky-700 transition rounded"
      >
        Generate tweet
      </button>
    {:else}
      <div
        class="flex items-center justify-center space-x-2 text-white text-sm"
      >
        <i class="i-mdi-loading animate-spin w-4 h-4" />
        <span>Loading...</span>
      </div>
    {/if}
  </form>

  {#if content}
    <div class="bg-gray-50 rounded p-2 text-sm tracking-tight font-light">
      {content}
      <div class="flex justify-end">
        <button
          on:click={() => navigator.clipboard.writeText(String(content))}
          class="flex border rounded p-2 hover:opacity-70"
        >
          <i class="i-mdi-content-copy w-4 h-4" />
        </button>
      </div>
    </div>
  {/if}
</main>
