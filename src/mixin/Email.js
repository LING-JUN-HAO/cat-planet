import emailjs from '@emailjs/browser'

export function SendMsg (email) {
  const { VITE_SERVICEID, VITE_TEMPLATEID, VITE_PUBLICKKEY } = import.meta.env
  const templateParams = {
    to_email: email
  }
  console.log('templateParams', templateParams)
  emailjs
    .send(VITE_SERVICEID, VITE_TEMPLATEID, templateParams, {
      publicKey: VITE_PUBLICKKEY
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
      },
      (err) => {
        console.log('FAILED...', err)
      }
    )
}
