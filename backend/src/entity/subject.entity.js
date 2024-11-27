"use strict";
import { EntitySchema } from "typeorm";

// -> servicios -> validations -> subject.controller.js -> index.js -> routes
const SubjectSchema = new EntitySchema({
name: "Subject",
tableName: "subjects",
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
            unique: true,
        },
        departamento: {
            type: "varchar",
            length: 255,
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
    indices: [
        {
          name: "IDX_SUBJECT",
          columns: ["id"],
          unique: true,
        },
        {
          name: "IDX_SUBJECT_NOMBRE",
          columns: ["nombre"],
          unique: true,
        }
      ],
});

export default SubjectSchema;