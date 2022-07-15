import { shallowMount } from '@vue/test-utils';
import ReservationView from '@/views/ReservationView.vue';

import { useRouter, useRoute } from 'vue-router'

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => { }
  }))
}))

describe('ReservationView.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ReservationView)
  })

  test('snapshot', () => {
    useRoute.mockImplementationOnce(() => ({
      query: {
        date: "15-7-2022",
        room: "0",
        time: "1000,01000"
      }
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    expect(wrapper).toMatchSnapshot();
  })
})