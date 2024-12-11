import { useState } from "react";
import { deleteTeach } from "@services/teach.service.js";

const useRemoveTeachRelation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeRelations = async (subjectsToRemove) => {
        setLoading(true);
        setError(null);

        try {
            const promises = subjectsToRemove.map(async (subject) => {
                if (subject.relationId) {
                    await deleteTeach(subject.relationId);
                }
            });

            await Promise.all(promises);
        } catch (err) {
            console.error("Error al eliminar relaciones:", err);
            setError(err.message || "Error al eliminar relaciones");
        } finally {
            setLoading(false);
        }
    };

    return { removeRelations, loading, error };
};

export default useRemoveTeachRelation;