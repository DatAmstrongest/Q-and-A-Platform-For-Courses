<script>
  const getCourses = async () => {
    const res = await fetch('/api/courses');
    const courses = await res.json();
    return courses;
  };
  const coursesPromise = getCourses();
  </script>

  {#await coursesPromise}
  {:then courses}
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each courses as course}
        <li class="p-4 bg-white shadow rounded">
            <a
            href={`/courses/${course.id}`}
            class="block text-lg font-semibold text-blue-600 hover:underline"
            >
            {course.name}
            </a>
        </li>
        {/each}
    </ul>
  {/await}
  