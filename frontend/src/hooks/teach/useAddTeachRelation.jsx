import { useState } from "react";
import { addTeach } from "@services/teach.service.js";

const useAddTeachRelation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addRelations = async (idTeacher, subjectsToAdd) => {
        setLoading(true);
        setError(null);

        try {
            const promises = subjectsToAdd.map(async (subject) => {
                await addTeach({
                    idTeacher,
                    idSubject: subject.value,
                    year: "2024",
                });
            });

            await Promise.all(promises);
        } catch (err) {
            console.error("Error al agregar relaciones:", err);
            setError(err.message || "Error al agregar relaciones");
        } finally {
            setLoading(false);
        }
    };

    return { addRelations, loading, error };
};

export default useAddTeachRelation;