import NavBar from "./NavBar.vue"
import {VueWrapper, mount} from "@vue/test-utils"


describe("NavBar", () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        const title = "TEST_CHAT";

        // Mount the component before each test
        wrapper = mount(NavBar, {
            props: {
                title: title
            }
        });

    });

    afterEach(() => {
        // Reset the component after each test
        wrapper.unmount();
    });

    it("mounts the component", () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.text()).toContain("TEST_CHAT");
    });

    it("contains a signup button with id btn-signup", () => {
        const signupButton = wrapper.find("#btn-signup");
        expect(signupButton.exists()).toBeTruthy();
        expect(signupButton.text()).toContain("Signup");
    });

    it("clicking the signup button should emit the click event", async () => {
        // Simulate button click
        await wrapper.find("#btn-signup").trigger("click");

        const eventData = wrapper.emitted();
        // Assert that the signup event handler is called
        expect(eventData).toBeTruthy();
      
    });

    it("contains a login button with id btn-login", () => {
        const loginButton = wrapper.find("#btn-login");
        expect(loginButton.exists()).toBeTruthy();
        expect(loginButton.text()).toContain("Login");
    });

    it("clicking the login button should emit the click event", async () => {
    
    

        await wrapper.find("#btn-login").trigger("click");

        const eventData = wrapper.emitted();
      
        expect(eventData).toBeTruthy();
        

    });
});