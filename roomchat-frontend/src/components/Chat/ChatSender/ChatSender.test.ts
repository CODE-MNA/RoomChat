// ChatSender.spec.ts
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';
import ChatSender from './ChatSender.vue';


describe('ChatSender', () => {
  let wrapper:  VueWrapper<InstanceType<typeof ChatSender>>;

  beforeEach(() => {
    wrapper = mount(ChatSender);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders input field and send button', () => {
    const input = wrapper.find('input[type="text"]');
    const button = wrapper.find('button');

    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  it('emits "messageSend" event with current message when Send button is clicked', async () => {
    const message = 'Hello, world!';
    const input = wrapper.find('input[type="text"]');
    await input.setValue(message);

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('messageSend')).toBeTruthy();
      const eventData : any  = wrapper.emitted('messageSend');
      expect(eventData).toBeTruthy();
    expect(eventData[0][0]).toEqual({
      sender: 'default',
      message,
      UTC_timestamp: expect.any(String),
    });
  });


  it('emits "messageSend" event with current message when user presses enter on keyboard', async () => {
    const message = 'Hello, world!';
   const input: DOMWrapper<HTMLInputElement> = wrapper.find('input[type="text"]') as DOMWrapper<HTMLInputElement> 
    await input.setValue(message);

    await input.trigger('keydown.enter')

    expect(wrapper.emitted('messageSend')).toBeTruthy();
      const eventData : any  = wrapper.emitted('messageSend');
      expect(eventData).toBeTruthy();
    expect(eventData[0][0]).toEqual({
      sender: 'default',
      message,
      UTC_timestamp: expect.any(String),
    });
  });




  it('clears input field after sending message', async () => {
    
    
    const input: DOMWrapper<HTMLInputElement> = wrapper.find('input') as DOMWrapper<HTMLInputElement> 

    await input.setValue('Test Message');

    
    const button = wrapper.find('button');
    await button.trigger('click');
    
    expect(wrapper.emitted('messageSend')).toBeTruthy();
   

    expect(input.element.value).not.toContain('Test Message');
    expect(input.element.value).toBe('')

  });
});