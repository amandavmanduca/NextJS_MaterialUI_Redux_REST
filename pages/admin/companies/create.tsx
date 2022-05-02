import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setInfo } from '../../../store/ducks/actions/main'

const ContactForm = (props: any) => {
  const teste = useSelector((state) => state.main)
  const dispatch = useDispatch()

  console.log(teste?.userInfo?.name)
  const { handleSubmit } = props
  return (
    <div>
      <div>
        <label htmlFor="firstName">First Name</label>

      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>

      </div>
      <div>
        <label htmlFor="email">Email</label>

      </div>
      <button onClick={() => dispatch(setInfo("teste"))}>Submit</button>
    </div>
  )
}

export default ContactForm
