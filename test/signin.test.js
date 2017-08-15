import { expect } from "chai"
import sinon from "sinon"
import { shallow } from "enzyme"
import React from "react"

import SigninPage from "../src/client/components/user/Signin"

describe("Signin tests", function() {
    before(function() {
      this.ComponentProps = {
        userStore: {
          token: "",
          loggedIn: false,
          login() { },
          signup() { }
        }
      }
    })

    it("should redirect to profile when correct login", function() {
      sinon.spy(this.ComponentProps.userStore, "login")
      const wrapper = shallow(<SigninPage {...this.ComponentProps} />)

      // const form = wrapper.find("form").first()

      // form.simulate("submit")

      wrapper.find('[type="submit"]').first().simulate("click")
      
      expect(this.ComponentProps.userStore.login.called).to.be.true
    })

    it("should stay on page and give error when incorrect login", function() {

    })

    after(function() {
      this.ComponentProps.userStore.login.restore()
    })
})
