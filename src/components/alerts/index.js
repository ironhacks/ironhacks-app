import Swal from 'sweetalert2'

export const saveSuccessModal = () => {
  Swal.fire({
    icon: 'success',
    title: 'Results saved',
    text: 'Results were saved sucessfully',
  })
}
