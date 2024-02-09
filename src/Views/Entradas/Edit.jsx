import FormEntradas from '../../Components/FormEntradas'
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); 
  return (
    <FormEntradas id={id} tittle='Editar Entrada'></FormEntradas>
  )
}

export default Edit
