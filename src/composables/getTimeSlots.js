import { ref } from 'vue';
import { appFirestore } from '../firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";

const getTimeSlots = (date) => {
  const timeSlots = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      const slots = collection(appFirestore, 'timeSlots')
      const statement = query(slots, where("date", "==", date))

      const querySnapshot = await getDocs(statement);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        timeSlots.value = { ...doc.data(), id: doc.id }
        console.log(timeSlots.value.slots)
      });

    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { timeSlots, error, load }
}

export default getTimeSlots