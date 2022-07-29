<template>
  <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto outline-none modal fade"
       :id="targetId"
       tabindex="-1"
       aria-labelledby="targetLabel"
       aria-modal="true"
       role="dialog">
    <div
         class="relative w-auto pointer-events-none modal-dialog modal-dialog-centered">
      <div
           class="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
        <div
             class="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md">
          <h5 class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel">
            {{ modalTitle }}
          </h5>
          <button type="button"
                  class="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="relative p-4 modal-body">
          <p>{{ modalContent }}</p>
        </div>
        <div
             class="flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t border-gray-200 modal-footer rounded-b-md">
          <button type="button"
                  class="inline-block px-6 py-2.5 bg-amber-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal">
            Close
          </button>
          <button type="button"
                  class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  @click="deleteReservation">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'modalTitle',
    'modalContent',
    'targetId'
  ],

  setup(context) {
    const deleteReservation = () => {
      context.emit('deleteReservation')
    }

    return {
      deleteReservation
    }
  }
}
</script>

<style>

</style>