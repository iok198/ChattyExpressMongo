import { expect } from "chai"
import sinon from "sinon"
import {mount, shallow} from "enzyme"
import React from "react"

import App from "../src/client/App.js"
import UserStore from "../src/client/stores/user.store"
import SigninPage from "../src/client/components/user/Signin" 

// describe("Signin tests", () => {
//     it("should redirect to profile when correct login", () => {

//     })

//     it("should stay on page and give error when incorrect login", () => {
        
//     })
// })


describe('<Foo />', () => {
  it('calls componentDidMount', () => {
    

    const wrapper = shallow(<SigninPage userStore={UserStore}/>);
    expect(wrapper.find("h1").at(0).text).to.equal("Sign in");
  });
});