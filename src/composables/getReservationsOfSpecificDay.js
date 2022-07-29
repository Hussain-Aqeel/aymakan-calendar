import { ref } from 'vue';
import { appFirestore } from '@/firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";

const getReservationsOfSpecificDay = (date) => {
  const reservations = ref([]);
  const error = ref(null);
  const emptyResult = ref(false);

  const load = async () => {

    try {
      const reservationsCollection = collection(appFirestore, 'reservations')
      const statement = query(reservationsCollection, where("date", "==", date))

      const querySnapshot = await getDocs(statement);
      let docs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docs.push({ ...doc.data(), id: doc.id })
      });

      if (docs.length === 0) {
        emptyResult.value = true;
      } else {
        reservations.value = docs;
      }

    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { reservations, error, emptyResult, load }
}

export default getReservationsOfSpecificDay;