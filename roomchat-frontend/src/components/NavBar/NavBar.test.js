import NavBar from "./NavBar.vue"
import {mount} from "@vue/test-utils"

describe("NavBar", ()=>{
    test("mount component",async()=>{
        expect(NavBar).toBeTruthy();
    
        const title = "TEST_CHAT"
    
        const wrapper = mount(NavBar,{
            props:{
                title:title
            }
        })
    
        expect(wrapper.text()).toContain(title)
    })

    test("contains signup button with id btn-signup",async()=>{
        expect(NavBar).toBeTruthy();
    
        const title = "TEST_CHAT"
    
        const wrapper = mount(NavBar,{
            props:{
                title:title
            }
        })
    
        expect(wrapper.find("#btn-signup").text()).toContain("Signup")
    })

    test("contains login button with id btn-login",async()=>{
        expect(NavBar).toBeTruthy();
    
        const title = "TEST_CHAT"
    
        const wrapper = mount(NavBar,{
            props:{
                title:title
            }
        })
    
        expect(wrapper.find("#btn-login").text()).toContain("Login")
    })
})
