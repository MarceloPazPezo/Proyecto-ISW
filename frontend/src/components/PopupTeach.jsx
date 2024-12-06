import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import { useState, useEffect } from "react";
import useSubjects from "@hooks/subjects/useGetSubject";
import useTeachesByTeacher from "@hooks/teach/useGetTeachesByTeacher";
import useAddTeachRelation from "@hooks/teach/useAddTeachRelation";
import useRemoveTeachRelation from "@hooks/teach/useRemoveTeachRelation";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

export default function PopupTeach({ show, setShow, data }) {
  const [teacherData, setTeacherData] = useState([]);
  const { subjects } = useSubjects();
  const rut = data?.[0]?.rut || null;
  const idTeacher = data?.[0]?.id || null;
  const nombreCompleto = data?.[0]?.nombreCompleto || null;
  const { subjectsByTeacher = [] } = useTeachesByTeacher(rut) || {};
  const { addRelations } = useAddTeachRelation();
  const { removeRelations } = useRemoveTeachRelation();

  const subjectsOptions = subjects.map((subject) => ({
    value: subject.id,
    label: subject.nombre,
  }));

  useEffect(() => {
    if (rut) {
      setTeacherData(subjectsByTeacher);
    }
  }, [rut, subjectsByTeacher]);

  const handleSubmit = async (formData) => {
    const selectedSubjects = formData.asignaturas || [];
    const existingSubjects = teacherData;

    const selectedSet = new Set(selectedSubjects.map((s) => s.value));
    const existingSet = new Set(existingSubjects.map((s) => s.value));

    const toAdd = selectedSubjects.filter((s) => !existingSet.has(s.value));
    const toRemove = existingSubjects.filter((s) => !selectedSet.has(s.value));

    try {
      if (toAdd.length > 0)
        await addRelations(idTeacher, toAdd);
      if (toRemove.length > 0)
        await removeRelations(toRemove);

      setTeacherData(selectedSubjects);
      showSuccessAlert('Guardado!', 'Relaciones guardadas exitosamente.');
      
      setShow(false);
    } catch (error) {
      console.error("Error al procesar cambios:", error);
      showErrorAlert('Cancelado', 'Ocurrió un error al guardar los cambios.');
    }
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <div className="popup-content">
          <button className="close" onClick={() => setShow(false)}>
            <img src={CloseIcon} />
          </button>
          <Form
            title="Asignaturas impartidas"
            fields={[
              {
                label: "Nombre completo",
                name: "nombreCompleto",
                defaultValue: nombreCompleto || "",
                fieldType: "input",
                type: "text",
                minLength: 15,
                maxLength: 50,
                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                patternMessage: "Debe contener solo letras y espacios",
                disabled: true,
              },
              {
                label: "Rut",
                name: "rut",
                defaultValue: rut || "",
                placeholder: "21.308.770-3",
                fieldType: "input",
                type: "text",
                minLength: 9,
                maxLength: 12,
                patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                disabled: true,
              },
              {
                label: "Asignaturas",
                name: "asignaturas",
                fieldType: "multiselect",
                options: subjectsOptions,
                defaultValue: teacherData,
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            buttonText="Guardar cambios"
            backgroundColor={"#fff"}
          />
        </div>
      </div>
    </div>
  );
}