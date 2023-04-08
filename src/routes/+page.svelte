<script lang="ts">
  export let message: string | undefined = undefined;
  export let tweet: string | undefined = undefined;

  const getTweet = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    tweet = data.choices[0].message.content;
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    to your new<br />SvelteKit app
  </h1>

  {tweet}
  {message}

  <input bind:value={message} type="text" />
  <button on:click|stopPropagation={getTweet}>teste</button>

  <h2>
    try editing <strong>src/routes/+page.svelte</strong>
  </h2>
</section>
