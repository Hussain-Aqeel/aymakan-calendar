import { mount } from '@vue/test-utils';
import AppNavbar from '@/components/AppNavbar.vue';

describe('AppNavbar.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(AppNavbar)
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('nav tag does exist', () => {
    expect(wrapper.find("nav").exists()).toBe(true);
  })
})