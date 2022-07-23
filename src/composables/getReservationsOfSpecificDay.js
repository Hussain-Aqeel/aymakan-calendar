import { ref } from 'vue';
import { appFirestore } from '@/firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";

const getReservationsOfSpecificDay = (date) => {
  const reservations = ref([]);
  const error = ref(null);

  const load = async () => {

    try {
      const reservationsCollection = collection(appFirestore, 'reservations')
      const statement = query(reservationsCollection, where("date", "==", date))

      const querySnapshot = await getDocs(statement);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        reservations.value.push({ ...doc.data(), id: doc.id })
      });

    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { reservations, error, load }
}

export default getReservationsOfSpecificDay;