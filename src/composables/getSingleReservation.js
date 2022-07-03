import { ref } from 'vue';
import { appFirestore } from '../firebase/config';

const getSingleReservation = (id) => {
  const reservation = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await appFirestore.collection('reservations').doc(id).get()
      reservation.value = { ...res.data(), id: res.id }

      if(!res.exists) {
        throw Error("the reservation does not exist")
      }

    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { reservation, error, load }
}

export default getSingleReservation