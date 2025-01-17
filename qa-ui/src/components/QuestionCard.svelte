<script>
    import { userUuid } from "../stores/stores.js";
    
    export let question;
    export let upvotes;
    export let isLiked;
    export let questionId;

    let fillColor = "none"

    let localUpvotes = parseInt(upvotes, 10); 
    const handleUpvote = async () =>{
        fillColor="#4F46E5FF";
        localUpvotes += 1;
        isLiked = true;

        let data = {
          user_id: $userUuid,
        }
        await fetch("/api/questions/"+questionId+"/like", {
          method: "POST",
          body: JSON.stringify(data),
        });
    }

</script>

<div class="bg-white text-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold mb-2">{question}</h3>
      </div>
      <div class="flex items-center">
        <!-- Upvote button with counter -->
          {#if isLiked}
            <button disabled class="flex items-center text-gray-700 text-2xl hover:text-indigo-600 focus:outline-none transition-all duration-300">
                <svg fill="#4F46E5FF" class="h-6 w-6 stroke-current text-gray-700 hover:text-indigo-600 transition-all duration-300">
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"></path>
                </svg>
            </button>
          {:else}
            <button on:click={handleUpvote} class="flex items-center text-gray-700 text-2xl hover:text-indigo-600 focus:outline-none transition-all duration-300">
              <svg fill="none" class="h-6 w-6 stroke-current text-gray-700 hover:text-indigo-600 transition-all duration-300">
                  <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"></path>
              </svg>
            </button>
          {/if}
        <span class="ml-2 text-sm text-gray-600">{localUpvotes}</span> <!-- Upvote Count -->
      </div>
    </div>
    <a href="#question2" class="text-indigo-600 hover:underline">View Answers</a>
  </div>