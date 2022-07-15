import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import SingleReservationView from '@/views/SingleReservationView.vue';


const localVue = createLocalVue()

describe('SingleReservationView.vue', () => {

  let wrapper;

  beforeEach(() => {
    localVue.use(VueRouter)
    const router = new VueRouter();
    wrapper = shallowMount(SingleReservationView, {
      localVue,
      router
    })
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})