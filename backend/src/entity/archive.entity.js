"use strict"

import { EntitySchema } from "typeorm"

const ArchivosSchema = new EntitySchema({
    name: "Archivos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        archivo: {
            type: "varchar",
            nullable: false
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        idTeacher: {
            type: "int",
            nullable: false
        },
        mensaje: {
            type: "varchar",
            length: 700,
            nullable: false
        }
    },
    relations: {
        teacher: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "idTeacher",
                referencedColumnName: "id",
            },
            nullable: true,
            cascade: true,
            onDelete: "CASCADE",
        }
    }
});

export default ArchivosSchema;