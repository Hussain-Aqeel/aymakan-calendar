import { shallowMount } from '@vue/test-utils';
import ErrorView from '@/views/ErrorView.vue';

describe('ErrorView.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ErrorView)
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})