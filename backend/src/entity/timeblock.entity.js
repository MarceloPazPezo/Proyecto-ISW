"use strict";
import { EntitySchema } from "typeorm";

const TimeblockSchema = new EntitySchema({
  name: "TimeBlock",
  tableName: "timeblocks",
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
    idCourse: {
      type: "int",
      nullable: false,
    },
    idSubject: {
      type: "int",
      nullable: false,
    },
    horaInicio: {
      type: "time",
      nullable: false,
    },
    horaTermino: {
      type: "time",
      nullable: false,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
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
    },
    course: {
      type: "many-to-one",
      target: "Course", 
      joinColumn: {
        name: "idCourse", 
        referencedColumnName: "id", 
      },
      nullable: true,
      cascade: true,
      onDelete: "CASCADE",
    },
    subject: {
      type: "many-to-one",
      target: "Subject", 
      joinColumn: {
        name: "idSubject", 
        referencedColumnName: "id", 
      },
      nullable: true,
      cascade: true,
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_TIMEBLOCK",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_TIMEBLOCK_IDTEACHER",
      columns: ["idTeacher"],
      unique: false,
    },
    {
      name: "IDX_TIMEBLOCK_IDCOURSE",
      columns: ["idCourse"],
      unique: false,
    },
    {
      name: "IDX_TIMEBLOCK_IDSUBJECT",
      columns: ["idSubject"],
      unique: false,
    }
  ],
});

export default TimeblockSchema;
