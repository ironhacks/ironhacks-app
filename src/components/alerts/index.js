import Swal from 'sweetalert2'

export const saveSuccessModal = (name = 'Settings') => {
  Swal.fire({
    icon: 'success',
    title: `${name} saved`,
    text: `${name} were saved sucessfully`,
  })
}
