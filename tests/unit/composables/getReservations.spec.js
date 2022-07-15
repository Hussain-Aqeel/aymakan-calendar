import getReservations from '../composables/getReservations';

describe('getReservations.js', () => {

  test('getReservations', () => {
    const { reservations, load, error } = getReservations();

    expect(reservations.value.length).toBe(0);
    
    expect(error.value).toBeNull();

    load();

    expect(reservations.value.length).toBeGreaterThan(0);
  
  })
})

