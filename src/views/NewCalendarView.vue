<template>

    <div class="container mx-auto min-h-[60vh] p-8">
      <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
      <section class="mt-12">
        <h2 class="font-semibold text-gray-900">Upcoming Meetings</h2>
        <ol
            class="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
          <li class="py-4 sm:flex">
            <time datetime="2022-01-17"
                  class="w-28 flex-none">Wed, Jan 12</time>
            <p class="mt-2 flex-auto sm:mt-0">Nothing on today’s schedule</p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-19"
                  class="w-28 flex-none">Thu, Jan 13</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">View
              house with real estate agent</p>
            <p class="flex-none sm:ml-6"><time datetime="2022-01-13T14:30">2:30
                PM</time> - <time datetime="2022-01-13T16:30">4:30 PM</time></p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-20"
                  class="w-28 flex-none">Fri, Jan 14</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
              Meeting
              with bank manager</p>
            <p class="flex-none sm:ml-6">All day</p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-18"
                  class="w-28 flex-none">Mon, Jan 17</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">Sign
              paperwork at lawyers</p>
            <p class="flex-none sm:ml-6"><time datetime="2022-01-17T10:00">10:00
                AM</time> - <time datetime="2022-01-17T10:15">10:15 AM</time>
            </p>
          </li>
        </ol>
      </section>
    </div>
    </div>

</template>

<script>
export default {

}
</script>

<style>

</style>