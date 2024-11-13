"use strict";
import { EntitySchema } from "typeorm";

const TeachSchema = new EntitySchema({
  name: "Teach",
  tableName: "teach",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    idTeacher: {
      type: "int",
      nullable: false,
    },
    idSubject: {
      type: "int",
      nullable: false,
    },
    year: {
      type: "int",
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_TEACH",
      columns: ["id"],
      unique: true,
    },
  ],
  relations: {
    teacher: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "idTeacher",
        referencedColumnName: "id",
      },
      eager: true,
    },
    subject: {
      type: "many-to-one",
      target: "Subject",
      joinColumn: {
        name: "idSubject",
        referencedColumnName: "id",
      },
      eager: true,
    },
  }
});

export default TeachSchema;