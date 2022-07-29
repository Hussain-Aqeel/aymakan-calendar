import { ref } from 'vue';
import { appFirestore } from '../firebase/config';

const getSingleReservation = (id) => {
  const reservation = ref(null)
  const resError = ref(null)

  const loadReservation = async () => {
    try {
      let res = await appFirestore.collection('reservations').doc(id).get()
      reservation.value = { ...res.data(), id: res.id }

      if(!res.exists) {
        throw Error("the reservation does not exist")
      }

    } catch (err) {
      resError.value = err.message
      console.log(resError.value)
    }
  }

  return { reservation, resError, loadReservation }
}

export default getSingleReservation