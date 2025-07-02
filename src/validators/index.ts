// utils/validators.ts
import * as Yup from 'yup'

//**  Only allow letters, numbers, and spaces
export const noSpecialChars = Yup.string().matches(/^[a-zA-Z0-9 ]*$/, 'No special characters or symbols allowed')

//**  Required field with no special characters
export const requiredNoSpecialChars = noSpecialChars.required('This field is required')

//**  Example for email, optional field
export const optionalEmail = Yup.string().email('Invalid email format').nullable().notRequired()

// **  Example for password, required field
export const alphaOnly = Yup.string().matches(/^[a-zA-Z ]*$/, 'Only letters allowed')

// **  Example for alphanumeric, required field
export const alphanumeric = Yup.string().matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers allowed')

// **  Example for password, required field
export const passwordComplex = Yup.string().matches(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  'Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number'
)

// ** Reaquired
export const requiredNoSpecialCharsWithLabel = (label: string) =>
  Yup.string()
    .required(`${label} is required`)
    .matches(/^[a-zA-Z0-9 ]*$/, `${label} should not contain special characters or symbols`)
