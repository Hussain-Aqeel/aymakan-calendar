<template>
    <div class="md:container mx-auto text-gray-700 min-h-full p-6 mb-10">

        <router-link :to="'/slots?date=' + $route.query.date"
                     class="self-start">
            <span
                  class="flex items-center hover:text-gray-500 md:text-2xl ml-10">
                <font-awesome-icon icon="fa-solid fa-square-caret-left"
                                   class="mr-1" />
                <p>Back</p>
            </span>
        </router-link>


        <div
             class="flex items-center space-x-8 lg:space-x-14 justify-center mt-20">
            <div id="slots"
                 class="drop-shadow-md mb-7 relative">
                <div class="absolute -left-4 -top-4 bg-amber-400 rounded-full">
                    <font-awesome-icon icon="fa-solid fa-calendar-days"
                                       class="p-4 lg:text-lg" />
                </div>
                <div
                     class="flex flex-col justify-center w-44 lg:w-64 h-40 p-3 bg-amber-400 rounded-xl font-bold">
                    <small
                           class="mt-4 mb-1 z-10 text-lg lg:text-2xl">{{ getDay($route.query.date) }}</small>
                    <small
                           class="lg:text-2xl my-1 text-lg">{{ $route.query.date }}</small>
                    <p class="text-2xl lg:text-3xl lg:font-bold my-1">9:00 -
                        10:30</p>
                </div>
            </div>


            <div id="slots text-center mr-4"
                 class="drop-shadow-md mb-7">
                <div
                     class="flex flex-col w-40 lg:w-64 h-40 p-3 bg-amber-400 rounded-xl font-bold text-center items-center">
                    <img :src="image($route.query.room)"
                         alt=""
                         :class="'mb-2 h-20 p-3 rounded-md ' + imageBackground + imageWidth"
                         srcset="">
                    <hr>
                    <strong class="lg:text-2xl font-bold mt-1">Meeting
                        Room</strong>

                </div>
            </div>

        </div>


        <div class="p-10 w-full mt-14 flex flex-col items-center">

            <form @submit.prevent="handleSubmit"
                  class="h-full w-full lg:w-2/3"
                  data-netlify="true"
                  data-netlify-recaptcha="true">
                <div class="mb-5">
                    <label for="name"
                           class="text-sm font-medium text-gray-700 lg:text-2xl">Name</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="name"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class=" text-sm font-medium text-gray-700 lg:text-2xl">Email</label>
                    <div class="mt-1 border-gray-300 ">
                        <input type="email"
                               v-model="email"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class=" text-sm font-medium text-gray-700 lg:text-2xl">Meeting
                        title</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="title"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="comment"
                           class=" text-sm font-medium text-gray-700 lg:text-2xl">Meeting
                        description / agenda</label>
                    <div class="mt-1">
                        <textarea rows="4"
                                  v-model="description"
                                  class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500"></textarea>
                    </div>
                </div>

                <button class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl w-full md:text-xl font-bold"
                        type="submit">Reserve</button>

            </form>
        </div>

    </div>
</template>

<script>
import lib from 'date-and-time';
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { appFirestore } from '@/firebase/config';
import { handler } from '../../functions/function-sendEmail/function-sendEmail';

export default {
    setup() {

        const name = ref('');
        const email = ref('');
        const title = ref('');
        const description = ref('');

        const route = useRoute();
        const router = useRouter();

        const handleSubmit = async (event) => {
            const reservation = {
                date: route.query.date,
                email: email.value,
                meeting_desc: description.value,
                meeting_title: title.value,
                name: name.value,
                slots: route.query.time
            }

            appFirestore.collection('reservations').add(reservation);

            // to send confirmation email
            handler(event)

            router.push({ name: 'welcome' })
        }

        const getDay = (date) => {
            const arr = date.split("-");
            const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
            return lib.format(dateObj, 'dddd, MMM DD');
        }

        let imageBackground = ref('');
        let imageWidth = ref('');

        const image = (img) => {
            if(img === "2"){
                imageBackground.value = 'bg-black ';
                imageWidth.value = 'lg:w-64 w-32 '
                return "/images/smartinfluence.png"
            } else {
                imageBackground.value = 'bg-white ';
                imageWidth.value = 'w-20 '
                return "/images/logo.png"
            }
        }

        return {
            getDay,
            image,
            handleSubmit,
            name, 
            email, 
            title, 
            description,
            imageBackground,
            imageWidth
        }
    }
}
</script>

<style>

</style>
