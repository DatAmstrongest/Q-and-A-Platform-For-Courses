<script>
  import { userUuid } from "../stores/stores.js";
  
  const askSomething = async () => {
    const response = await fetch("/api/courses");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };
</script>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4"
  on:click={askSomething}
>
  Test!
</button>
