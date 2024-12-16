import PopupAddTimeBlock from '../components/PopupAddTimeBlock';
import '../styles/asignarHorario.css';

const AsignarHorario = () => {
    const handleSave = (data) => {
        
        console.log("Datos enviados desde el componente:", data);

    };

    return (
        <div className='main-container'>
            <PopupAddTimeBlock onSave={handleSave} />
        </div>
    );
};

export default AsignarHorario;
