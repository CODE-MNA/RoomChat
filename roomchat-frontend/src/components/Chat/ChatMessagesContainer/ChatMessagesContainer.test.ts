import { mount, shallowMount } from '@vue/test-utils';
import ChatMessagesContainer from './ChatMessagesContainer.vue';
import { ChatMessage } from '@models/ChatMessage';

describe('ChatMessagesContainer', () => {
  it('renders all messages', () => {
    // Mock messages
    const messages: ChatMessage[] = [{
        sender:"System",
        message:"Hello user, this is default message!",
        UTC_timestamp: "2021-3-5"
    },
    {
        sender:"User",
        message:"Hello system, this is nice!",
        UTC_timestamp: "2021-3-5"
    },
    {
        sender:"Buddy",
        message:"Let's play football!",
        UTC_timestamp: "2021-3-5"
    }
];

    // Mount the component with props
    const wrapper = mount(ChatMessagesContainer, {
      props: {
        messageListProp: messages,
      },
    });

    // Assert that all messages are rendered
    const messageComponents = wrapper.findAllComponents({ name: 'ChatMessageDisplay' });
    expect(messageComponents.length).toBe(messages.length);

    expect(messageComponents.forEach(com => {
        expect(com.text()).toContain(com.props().message.sender)
        expect(com.text()).toContain(com.props().message.message)
        expect(com.text()).toContain(com.props().message.UTC_timestamp)
    }))
   

  
  });
});