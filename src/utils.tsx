import { toast } from 'react-toastify';

export function addErrorMessage(error: any) {
  const message = error.message || 'Somemthing wrong happened';
  toast.error(message);
}
