"use strict";
import { EntitySchema } from "typeorm";

const ClassroomSchema = new EntitySchema({
  name: "Classroom",
  tableName: "classrooms",
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
  indices: [
    {
      name: "IDX_CLASSROOM",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_CLASSROOM_NOMBRE",
      columns: ["nombre"],
      unique: true,
    }
  ],
});

export default ClassroomSchema;