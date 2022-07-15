import { shallowMount } from '@vue/test-utils';
import CalendarView from '@/views/CalendarView.vue';

describe('CalendarView.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CalendarView)
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})