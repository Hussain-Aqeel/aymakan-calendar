import { shallowMount } from '@vue/test-utils';
import SuccessfulReservationView from '@/views/SuccessfulReservationView.vue';

describe('SuccessfulReservationView.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SuccessfulReservationView)
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})