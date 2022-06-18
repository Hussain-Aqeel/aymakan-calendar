import { ref } from 'vue';
import { appFirestore } from '@/firebase/config';

const getReservations = () => {
  const reservations = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await appFirestore.collection('reservations').get();

      reservations.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  }

  return { reservations, error, load }
}

export default getReservations;