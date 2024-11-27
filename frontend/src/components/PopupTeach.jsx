import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";
import { useState, useEffect } from "react";
import useSubjects from "@hooks/subjects/useGetSubject";
import useSubjectsByTeacher from "@hooks/teach/useGetTeachesByTeacher";

export default function PopupTeach({ show, setShow, data, action }) {
  const [teacherData, setTeacherData] = useState({});
  const { subjects } = useSubjects();
  const rut = data && data[0] ? data[0].rut : null;
  const nombreCompleto = data && data[0] ? data[0].nombreCompleto : null;
  const { subjectsByTeacher } = useSubjectsByTeacher(rut);

  const subjectsOptions = subjects.map((subject) => ({
    value: subject.id,
    label: subject.nombre,
  }));

  useEffect(() => {
    if (subjectsByTeacher.length > 0) {
      setTeacherData(subjectsByTeacher);
    }
  }, [subjectsByTeacher]);

  const handleSubmit = (formData) => {
    console.log(subjectsByTeacher);
    action(formData);
  };

  return (
    <div>
      {show && (
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
                      defaultValue: subjectsByTeacher,
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
      )}
    </div>
  );
}
