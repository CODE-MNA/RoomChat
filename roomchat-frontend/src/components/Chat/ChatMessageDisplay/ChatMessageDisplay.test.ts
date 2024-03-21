import { mount } from '@vue/test-utils';
import ChatMessageDisplay from './ChatMessageDisplay.vue';

describe('ChatMessageDisplayVue', () => {
  it('renders valid message', () => {
    const message = {
      sender: 'John',
      message: 'Hello, world!',
      UTC_timestamp: '2022-03-17T12:00:00Z',
    };
    const wrapper = mount(ChatMessageDisplay, {
      props: { message },
    });

    expect(wrapper.find('.message-container').exists()).toBe(true);
    expect(wrapper.find('.sender-name').text()).toBe(message.sender);
    expect(wrapper.find('.message-content').text()).toBe(message.message);
    expect(wrapper.find('.timestamp').text()).toBe(message.UTC_timestamp);
  });

 
  // Add more test cases for other error scenarios...

});
