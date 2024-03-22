import Swal from 'sweetalert2'

export default function ShowNotification (text) {
  Swal.fire({
    title: text,
    heightAuto: false,
    timer: 1000
  })
}
