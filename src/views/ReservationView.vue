<template>
    <div v-if="!loading"
         class="md:container mx-auto text-gray-700 min-h-[60vh] p-6 mb-10">

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
             class="flex items-center space-x-8 lg:space-x-14 justify-center mt-20 text-center">
            <div id="slots"
                 class="drop-shadow-md mb-7 relative">
                <div class="absolute -left-4 -top-4 bg-amber-400 rounded-full">
                    <font-awesome-icon icon="fa-solid fa-calendar-days"
                                       class="p-4 lg:text-lg" />
                </div>
                <div
                     class="justify-center lg:w-80 h-57 p-3 bg-amber-400 rounded-xl font-bold">
                    <div
                         class="mb-3 mt-5 border-b-2 border-black border-opacity-10">
                        <span
                              class="font-bold block pb-4">{{ printMeetingRoom($route.query.room) }}</span>
                    </div>
                    <img :src="image($route.query.room)"
                         alt="company logo"
                         class="my-6 h-30 p-3 rounded-md bg-white lg:w-80 w-60">
                    <div
                         class="mb-3 border-t border-2 border-black border-opacity-10 rounded-lg">
                    </div>
                    <small
                           class="mt-4 z-10 text-2xl lg:text-3xl">{{ getDay($route.query.date) }}</small>
                </div>
            </div>
        </div>


        <div class="p-5 w-full mt-5 flex flex-col items-center">

            <form @submit.prevent="handleSubmit($event)"
                  novalidate="true"
                  class="h-full w-full lg:w-2/3">

                <div class="w-full mb-10 flex">

                    <div v-for="(slot, index) in getSlots()"
                         :key="index">
                        <p class="bg-gray-100 rounded-full p-3 m-2">
                            {{ slot }}</p>
                    </div>
                </div>

                <p v-if="v$.$error"
                   class="p-5 bg-red-300 outline-red-500 text-xl m-2 rounded-lg mb-5">
                    Please make sure to write a name, meeting title. <br>
                    Also, make sure to write a valid email.
                </p>

                <div class="mb-5">
                    <label for="name"
                           class="text-sm font-bold text-gray-700 lg:text-2xl">Name</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="state.name"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500 rounded-md">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class=" text-sm font-bold text-gray-700 lg:text-2xl">Email</label>
                    <div class="mt-1 border-gray-300 ">
                        <input type="email"
                               v-model="state.email"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500 rounded-md">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class=" text-sm font-bold text-gray-700 lg:text-2xl">Meeting
                        title</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="state.title"
                               class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500 rounded-md">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="comment"
                           class=" text-sm font-bold text-gray-700 lg:text-2xl">Meeting
                        description / agenda</label>
                    <div class="mt-1">
                        <textarea rows="4"
                                  v-model="state.description"
                                  class="p-1 w-full border-0 bg-gray-100 ring-0 focus:ring-0
                             lg:text-2xl focus:outline-amber-500 rounded-md"></textarea>
                    </div>
                </div>

                <button class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl w-full text-lg md:text-2xl font-bold"
                        type="submit">Reserve</button>

            </form>
        </div>

    </div>
    <div v-else
         class="
         min-h-[40vh]
         grid
         place-content-center">
        <AppLoader />
    </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue';
import lib from 'date-and-time';
import { reactive, computed, ref } from 'vue';
import { required, email } from '@vuelidate/validators'
import  useValidate from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router';
import { appFirestore } from '@/firebase/config';
import { timestamp } from '../firebase/config';
import getTimeSlots from '../composables/getTimeSlots';

export default {
    components: { AppLoader },
    setup() {

        const loading = ref(false);
        
        const state = reactive({
            name: '',
            email: '',
            title: '',
            description: ''
        })

        const rules = computed(() => {
            return {
                name: { required },
                email: { required, email },
                title: { required },
            }
        })

        const v$ = useValidate(rules, state);

        const route = useRoute();
        const router = useRouter();

        // get time slots of this date 
        const { timeSlots, load, error } = getTimeSlots(route.query.date);

        load();

        const handleSubmit = async () => {
            loading.value = true;

            await v$.value.$validate();
            if (!v$.value.$error) {
                const reservation = {
                    date: route.query.date,
                    name: state.name,
                    email: state.email,
                    room: getRoom(),
                    meeting_title: state.title,
                    meeting_desc: state.description,
                    slots: getSlots().map(el => el + " "),
                    baseUrl: window.location.hostname + '/reservations/',
                    created_at: timestamp(),
                }

                appFirestore.collection('reservations').add(reservation);

                // here we will update the time slots and disable the reserved ones
                let slotsArr;

                if(timeSlots.value) {
                    if (route.query.room == '0') {
                        slotsArr = timeSlots.value.rooms.first.slots;
                        for (let i = 0; i < slotsArr.length; i++) {
                            for (let j = 0; j < getSlots().length; j++) {
                                if (slotsArr[i].base.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.first.slots[i].base.reserved = true;
                                }
                                if (slotsArr[i].half.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.first.slots[i].half.reserved = true;
                                }
                            }
                        }
                    }
                    if (route.query.room == '1') {
                        slotsArr = timeSlots.value.rooms.second.slots;
                        for (let i = 0; i < slotsArr.length; i++) {
                            for (let j = 0; j < getSlots().length; j++) {
                                if (slotsArr[i].base.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.second.slots[i].base.reserved = true;
                                }
                                if (slotsArr[i].half.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.second.slots[i].half.reserved = true;
                                }
                            }
                        }
                    }
                    if (route.query.room == '2') {
                        slotsArr = timeSlots.value.rooms.third.slots;
                        for (let i = 0; i < slotsArr.length; i++) {
                            for (let j = 0; j < getSlots().length; j++) {
                                if (slotsArr[i].base.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.third.slots[i].base.reserved = true;
                                }
                                if (slotsArr[i].half.slot == getSlots()[j]) {
                                    timeSlots.value.rooms.third.slots[i].half.reserved = true;
                                }
                            }
                        }
                    }
                    // delete the previous document
                    await appFirestore.collection('timeSlots').doc(timeSlots.value.id).delete();

                    // add the new document (updated value)
                    appFirestore.collection('timeSlots').add(timeSlots.value);

                    router.push({ name: 'success' })
                }
                
            } else {
                console.log('validation error')
            }
        }

        const getDay = (date) => {
            const arr = date.split("-");
            const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
            return lib.format(dateObj, 'dddd, MMM DD');
        }

        // const getSlotsNew = () => {
        //     let finalSlots = [];
        //     let slots = route.query.time.split(',');
        //     let slotsArrayReplica = slots;
            
        //     let tmp = [];

        //     for (let i = 0; i < slotsArrayReplica.length; i++) {
        //         if (i === 0) {
        //             if (isSlotAfter(slotsArrayReplica[i], slotsArrayReplica[i + 1]) && isSlotAfter(slotsArrayReplica[i + 1], slotsArrayReplica[i + 2])) {
        //                 tmp.push(slotsArrayReplica[i])
        //                 slots = slots.filter(item => item !== slotsArrayReplica[i + 1])
        //             }
        //         }
        //         else if (i + 1 < slotsArrayReplica.length) {
        //             if (isSlotAfter(slotsArrayReplica[i - 1], slotsArrayReplica[i]) && isSlotAfter(slotsArrayReplica[i], slotsArrayReplica[i + 1])) {
        //                 slots = slots.filter(item => item !== slotsArrayReplica[i])
        //             }
        //         }
        //     }

        //     console.log(slots)
        //     console.log(finalSlots)
        // }

        // const isSlotAfter = (a, b) => {
        //     return !!(b - a == 30 || b - a == 70 || (a == '1230' && b == '0100'));
        // }

        const getSlots = () => {
            const slots = route.query.time.split(',');
            return slots.map(slot => {
                return slot.substring(0, 2) + ":" + slot.substring(2)
            });
        }

        const getRoom = () => {
            if(route.query.room == '0') {
                return "Aymakan Meeting Room"
            } else if (route.query.room == '1') {
                return "Smart Influence Meeting Room"
            }

            return "General Meeting Room"
        }

        const image = (img) => {
            if(img === "1"){
                return "/images/smartinfluence-inverted.png"
            } else {
                return "/images/AyMakan-En.png"
            }
        }

        const printMeetingRoom = (roomNumber) => {
            if(roomNumber === "1") {
                return "Smart Influence Meeting Room"
            } else if (roomNumber === "0") {
                return "Aymakan Meeting Room"
            }

            return "General Meeting Room"
        }

        return {
            getDay,
            image,
            handleSubmit,
            getSlots,
            printMeetingRoom,
            loading,
            state,
            v$
        }
    }
}
</script>

<style>

</style>
