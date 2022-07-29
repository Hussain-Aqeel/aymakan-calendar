<template>
    <div v-if="!loading"
         class="md:container mx-auto text-gray-700 min-h-[60vh] p-6 mb-10">

        <router-link :to="'/slots?date=' + $route.query.date"
                     class="self-start">
            <span
                  class="flex items-center ml-10 hover:text-gray-500 md:text-2xl">
                <font-awesome-icon icon="fa-solid fa-square-caret-left"
                                   class="mr-1" />
                <p>Back</p>
            </span>
        </router-link>

        <div
             class="flex items-center justify-center mt-20 space-x-8 text-center lg:space-x-14">
            <div id="slots"
                 class="relative drop-shadow-md mb-7">
                <div class="absolute rounded-full -left-4 -top-4 bg-amber-400">
                    <font-awesome-icon icon="fa-solid fa-calendar-days"
                                       class="p-4 lg:text-lg" />
                </div>
                <div
                     class="justify-center p-3 font-bold lg:w-80 h-57 bg-amber-400 rounded-xl">
                    <div
                         class="mt-5 mb-3 border-b-2 border-black border-opacity-10">
                        <span
                              class="block pb-4 font-bold">{{ printMeetingRoom($route.query.room) }}</span>
                    </div>
                    <img :src="image($route.query.room)"
                         alt="company logo"
                         class="p-3 my-6 bg-white rounded-md h-30 lg:w-80 w-60">
                    <div
                         class="mb-3 border-2 border-t border-black rounded-lg border-opacity-10">
                    </div>
                    <small
                           class="z-10 mt-4 text-2xl lg:text-3xl">{{ getDay($route.query.date) }}</small>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center w-full p-5 mt-5">

            <form @submit.prevent="handleSubmit($event)"
                  novalidate="true"
                  class="w-full h-full lg:w-2/3">


                <div class="flex flex-wrap mb-10 space-x-2"
                     v-for="(slot, index) in getSlots()"
                     :key="index">
                    <span
                          class="flex px-4 py-2 text-sm font-semibold text-gray-500 transition duration-300 border border-gray-300 rounded-full cursor-pointer align-center w-max active:bg-gray-300 ease">
                        {{ slot }}
                    </span>
                </div>


                <p v-if="v$.$error"
                   class="p-5 m-2 mb-5 text-xl bg-red-300 rounded-lg outline-red-500">
                    Please make sure to write a name, meeting title. <br>
                    Also, make sure to write a valid email.
                </p>

                <div class="mb-5">
                    <label for="name"
                           class="text-sm font-bold text-gray-700 lg:text-2xl">Name</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="state.name"
                               class="w-full p-1 bg-gray-100 border-0 rounded-md ring-0 focus:ring-0 lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class="text-sm font-bold text-gray-700 lg:text-2xl">Email</label>
                    <div class="mt-1 border-gray-300 ">
                        <input type="email"
                               v-model="state.email"
                               class="w-full p-1 bg-gray-100 border-0 rounded-md ring-0 focus:ring-0 lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="name"
                           class="text-sm font-bold text-gray-700 lg:text-2xl">Meeting
                        title</label>
                    <div class="mt-1 border-gray-300">
                        <input type="text"
                               v-model="state.title"
                               class="w-full p-1 bg-gray-100 border-0 rounded-md ring-0 focus:ring-0 lg:text-2xl focus:outline-amber-500">
                    </div>
                </div>

                <div class="mb-5">
                    <label for="comment"
                           class="text-sm font-bold text-gray-700 lg:text-2xl">Meeting
                        description / agenda</label>
                    <div class="mt-1">
                        <textarea rows="4"
                                  v-model="state.description"
                                  class="w-full p-1 bg-gray-100 border-0 rounded-md ring-0 focus:ring-0 lg:text-2xl focus:outline-amber-500"></textarea>
                    </div>
                </div>

                <button class="w-full p-2 text-lg font-bold transition-colors duration-200 drop-shadow-md md:p-3 bg-amber-400 hover:bg-amber-300 rounded-xl md:text-2xl"
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

                // we will not reserve if there is an error fetching the time slots to disable them.
                if(!error) {
                    appFirestore.collection('reservations').add(reservation);

                    // here we will update the time slots and disable the reserved ones
                    let slotsArr;

                    if (timeSlots.value) {
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
                }
                
            } else {
                console.log('validation error')
            }
        }

        const convertTo24 = (date) => {
            if ((date.getHours() < 8)) {
                return lib.addHours(date, 12);
            }
            
            return date;
        }

        const getDay = (date) => {
            const arr = date.split("-");
            const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
            return lib.format(dateObj, 'dddd, MMM DD');
        }

        const processTimeSlots = () => {
            let slots = route.query.time.split(',');
        
            slots = 
                slots
                    .map(slot => {
                        return slot.substring(0, 2).padStart(2, '0') + ':' + slot.substring(2).padStart(2, '0');
                    }).map(slot => {
                        return lib.parse(slot, 'hh:mm');
                    }).map(slot => {
                        return convertTo24(slot);
                    })

            // console.log(slots);
            const slotsObject = Object.assign({}, slots);

            Object.entries(slotsObject).forEach(([key, value]) => {
                slotsObject[key] = { slot: value, isAfter: false };
            })
            
            const entries = Object.entries(slotsObject);

            let result = [];
            for (let i = 0; i < entries.length; i++) {
                let tmp = [];
                
                tmp.push(entries[i][1].slot);
                
                // check if the difference is 30 minutes
                while (i + 1 < entries.length && lib.subtract(entries[i + 1][1].slot, entries[i][1].slot).toMinutes() == 30) {
                    tmp.push(entries[i + 1][1].slot)
                    i++;
                }   
                                   
                result.push(tmp);
            }

            return result;
        }


        const finalTimeSlots = () => {
            let slots = processTimeSlots(); 
            
            for (let i = 0; i < slots.length; i++) {
                if (slots[i].length != 1) {
                    let lastSlot = slots[i][slots[i].length - 1];
                    slots[i][slots[i].length - 1] = lib.addMinutes(lastSlot, 30);
                } else {
                    slots[i][0] = [slots[i][0], lib.addMinutes(slots[i][0], 30)];     
                }     
            }

            slots = slots.map(slot => {
                return slot.map(arr => {
                    return lib.format(arr, 'hh:mm A');
                })
            })

            console.log(slots);
            return slots;
        }

        const getSlots = () => {
            let final = finalTimeSlots();
            let arr = [];
            
            for (let i = 0; i < final.length; i++) {
                arr.push(final[i][0] + '-' + final[i][final.length - 1])
                
            }
            return arr;
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
            finalTimeSlots,
            processTimeSlots,
            loading,
            state,
            v$
        }
    }
}
</script>
