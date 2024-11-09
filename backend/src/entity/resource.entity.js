import { EntitySchema } from "typeorm";
import User from "./user.entity.js"; 

const ResourceSchema = new EntitySchema({
    name: "Resource",
    tableName: "resources",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations: {
        manager: {
            type: "many-to-one",
            target: "User", // Especifica que se relaciona con la entidad "User"
            joinColumn: {
                name: "idManager", // Nombre de la columna en la tabla "resources"
                referencedColumnName: "id", // Columna en "User" a la que se hace referencia
            },
            nullable: false,
        },
    },
});

export default ResourceSchema;
