import { mount } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter.vue';

describe('AppFooter.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(AppFooter)
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
   })

   test('footer tag does exist', () => {
    expect(wrapper.find("footer").exists()).toBe(true);
   })
})