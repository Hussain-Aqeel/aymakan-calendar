<template>
    <WrapperViewVue>
        <div
             class="container mx-auto text-gray-700 w-full min-h-full p-6 mb-10 flex flex-col justify-center">

            <router-link to="/slots"
                         class="self-start">
                <span
                      class="flex items-center hover:text-gray-500 md:text-2xl ml-10">
                    <font-awesome-icon icon="fa-solid fa-square-caret-left"
                                       class="mr-1" />
                    <p>Back</p>
                </span>
            </router-link>



            <div class="p-10 w-full mt-14 self-center">
                <div class="grid grid-cols-2 sm:w-5/12 self-center">
                    <div id="slots"
                         class="drop-shadow-md mb-7 relative">
                        <div
                             class="absolute -left-4 -top-4 bg-amber-400 rounded-full">
                            <font-awesome-icon icon="fa-solid fa-calendar-days"
                                               class="p-4" />
                        </div>
                        <div
                             class="flex flex-col justify-center w-40 lg:w-64 h-36 p-3 bg-amber-400 rounded-xl font-bold">
                            <small
                                   class="my-1 z-10 text-lg lg:text-3xl">{{ getDay($route.query.date) }}</small>
                            <small
                                   class="lg:text-lg my-1 text-lg">{{ $route.query.date }}</small>
                            <p class="text-2xl lg:font-bold my-1">9:00 -
                                10:30</p>
                        </div>
                    </div>


                    <div id="slots text-center"
                         class="drop-shadow-md mb-7">
                        <div
                             class="flex flex-col w-40 lg:w-64 h-36 p-3 bg-amber-400 rounded-xl font-bold text-center items-center">
                            <img :src="image($route.query.room)"
                                 alt=""
                                 class="mb-2 w-20 h-20 bg-white p-3 rounded-md"
                                 srcset="">
                            <hr>
                            <strong
                                    class="lg:text-2xl font-extrabold mt-1">Meeting
                                Room</strong>

                        </div>
                    </div>

                </div>


                <form class="h-full w-full md:w-2/3 self-center">
                    <div class="mb-5">
                        <label for="name"
                               class="block text-sm font-medium text-gray-700 lg:text-2xl">Name</label>
                        <div
                             class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                            <input type="text"
                                   name="name"
                                   id="name"
                                   class="p-1 block w-full border-0 border-b border-transparent bg-gray-100  focus:outline outline-2
                            focus:outline-amber-400 lg:text-2xl">
                        </div>
                    </div>

                    <div class="mb-5">
                        <label for="name"
                               class="block text-sm font-medium text-gray-700 lg:text-2xl">Email</label>
                        <div
                             class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                            <input type="email"
                                   name="name"
                                   id="name"
                                   class="p-1 block w-full border-0 border-b border-transparent bg-gray-100 focus:outline outline-2
                        focus:outline-amber-400 lg:text-2xl">
                        </div>
                    </div>

                    <div class="mb-5">
                        <label for="name"
                               class="block text-sm font-medium text-gray-700 lg:text-2xl">Meeting
                            title</label>
                        <div
                             class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                            <input type="text"
                                   name="name"
                                   id="name"
                                   class="p-1 block w-full border-0 border-b border-transparent bg-gray-100 focus:outline outline-2
                        focus:outline-amber-400 lg:text-2xl">
                        </div>
                    </div>

                    <div class="mb-5">
                        <label for="comment"
                               class="block text-sm font-medium text-gray-700 lg:text-2xl">Meeting
                            description / agenda</label>
                        <div class="mt-1">
                            <textarea rows="4"
                                      name="comment"
                                      id="comment"
                                      class="p-2 shadow-sm bg-gray-100 block w-full sm:text-sm border-gray-300 
                            focus:outline outline-2
                            focus:outline-amber-400 lg:text-xl"></textarea>
                        </div>
                    </div>

                    <button
                            class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl w-full md:text-xl font-bold">Reserve</button>

                </form>
            </div>

        </div>
    </WrapperViewVue>

</template>

<script>
import WrapperViewVue from './WrapperView.vue';
import lib from 'date-and-time';
export default {
    components: { WrapperViewVue },
    setup() {

        

        const getDay = (date) => {
            const arr = date.split("-");
            const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
            return lib.format(dateObj, 'dddd, MMM DD');
        }

        const image = (img) => {
            if(img === "Smart Influence Meeting Room"){
                return "/images/smartinfluence.svg"
            } else {
                return "/images/logo.png"
            }
        }

        return {
            getDay,
            image
        }
    }
}
</script>

<style>

</style>
