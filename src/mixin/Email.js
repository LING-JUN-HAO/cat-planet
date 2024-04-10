import emailjs from '@emailjs/browser'

export function SendMsg (email) {
  const { VITE_SERVICEID, VITE_TEMPLATEID, VITE_PUBLICKKEY } = import.meta.env
  const templateParams = {
    to_email: email
  }
  emailjs
    .send(VITE_SERVICEID, VITE_TEMPLATEID, templateParams, {
      publicKey: VITE_PUBLICKKEY
    })
    .then()
}
