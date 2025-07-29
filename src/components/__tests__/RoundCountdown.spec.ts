import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import RoundCountdown from '../RoundCountdown.vue';

describe('RountCountdown', () => {
  it('renders properly', () => {
    const wrapper = mount(RoundCountdown, { props: { countdownTime: 5 } });
    expect(wrapper.text()).toContain('5');
    wrapper.vm.startCountdown();
    setTimeout(() => {
      expect(wrapper.text()).toContain('4');
    }, 1200);
  });
});
