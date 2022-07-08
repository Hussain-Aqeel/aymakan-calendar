import { mount } from '@vue/test-utils';
import AppLoader from '@/components/AppLoader.vue';

describe('AppLoader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AppLoader)
  })
  
  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('loading class does exist', () => {
    expect(wrapper.find('.loading').exists()).toBe(true)
  })

  test('arc class does exist', () => {
    expect(wrapper.find('.arc').exists()).toBe(true)
  })
  
})