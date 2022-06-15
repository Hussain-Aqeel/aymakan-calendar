<template>

    <div class="w-full">
        <NavbarComponentVue />
        <div class="container mx-auto text-gray-700 min-h-full p-6 mb-10">
            <div id="slots"
                 class="drop-shadow-md mb-7 relative">
                <div
                     class="absolute -left-4 -top-4 bg-amber-400 rounded rounded-full">
                    <i class="fa-solid fa-calendar-days p-4"></i>
                </div>
                <div
                     class="flex flex-col w-32 p-3 bg-amber-400 rounded rounded-xl font-bold">
                    <small class="mt-2 z-10">Sunday</small>
                    <small>12-12-2020</small>
                    <p>9:00 - 10:30</p>
                </div>
            </div>
            <form class="h-full">
                <div class="mb-5">
                    <label for="name"
                           class="block text-sm font-medium text-gray-700">Name</label>
                    <div
                         class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                        <input type="text"
                               name="name"
                               id="name"
                               class="p-1 block w-full border-0 border-b border-transparent bg-gray-100  focus:outline outline-1
                            focus:outline-amber-400 sm:text-sm">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class="block text-sm font-medium text-gray-700">Email</label>
                    <div
                         class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                        <input type="email"
                               name="name"
                               id="name"
                               class="p-1 block w-full border-0 border-b border-transparent bg-gray-100 focus:outline outline-1
                        focus:outline-amber-400 sm:text-sm">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class="block text-sm font-medium text-gray-700">Meeting
                        title</label>
                    <div
                         class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                        <input type="text"
                               name="name"
                               id="name"
                               class="p-1 block w-full border-0 border-b border-transparent bg-gray-100 focus:outline outline-1
                        focus:outline-amber-400 sm:text-sm">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="comment"
                           class="block text-sm font-medium text-gray-700">Meeting
                        description / agenda</label>
                    <div class="mt-1">
                        <textarea rows="4"
                                  name="comment"
                                  id="comment"
                                  class="p-2 shadow-sm bg-gray-100 block w-full sm:text-sm border-gray-300 
                            focus:outline outline-1
                            focus:outline-amber-400"></textarea>
                    </div>
                </div>

                <button
                        class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded rounded-xl w-full md:text-xl font-bold">Reserve</button>

            </form>
        </div>
        <FooterComponentVue />
    </div>
</template>

<script>
import FooterComponentVue from './components/Footer-Component.vue';
import NavbarComponentVue from './components/Navbar-Component.vue';
export default {
    components: { FooterComponentVue, NavbarComponentVue }
}
</script>

<style>

</style>
