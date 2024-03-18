import { useToast } from 'vue-toast-notification'

const Toast = useToast()

export default function ToastNotification (type, message) {
  Toast.open({
    message: `${message}`,
    type: `${type}`,
    position: 'top-right',
    duration: 1000
  })
}
