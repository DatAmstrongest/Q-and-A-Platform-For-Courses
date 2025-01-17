<script>
  import CourseCard from "./CourseCard.svelte"
  
  const getCourses = async () => {
    const res = await fetch('/api/courses');
    const courses = await res.json();
    return courses;
  };
  const coursesPromise = getCourses();
</script>

{#await coursesPromise}
{:then courses}
  <main class="my-8 px-4">
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each courses as course}
        <CourseCard course_id={course.id} course_name={course.name}></CourseCard>
      {/each}
    </section>
  </main>
  {/await}
  