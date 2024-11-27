"use strict";
import { EntitySchema } from "typeorm";

// -> servicios -> validations -> course.controller.js -> index.js

const CourseSchema = new EntitySchema({
  name: "Course",
  tableName: "course",
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
    idBossTeacher: {
      type: "int",
      nullable: false,
      unique: true,
    },
    idClassroom: {
      type: "int",
      nullable: false,
      unique: true,
    },
    cantidadAlumnos: {
      type: "int",
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
    teacher: {
      type: "one-to-one",  // Relación 
      target: "User", //Entidad      
      joinColumn: {
        name: "idBossTeacher",
      }, //Columna necesaria     
      nullable: false,  // no puede estar vacio
      cascade: true,
      onDelete: "CASCADE",
    },
    classroom: {
      type: "one-to-one",  // Relación 
      target: "Classroom", //Entidad      
      joinColumn: {
        name: "idClassroom",
      }, //Columna necesaria     
      nullable: false,  // no puede estar vacio
      cascade: true,
      onDelete: "CASCADE",
    }
  },
  indices: [
    {
      name: "IDX_COURSE",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_COURSE_NOMBRE",
      columns: ["nombre"],
      unique: true,
    },
    {
      name: "IDX_TEACHER_COURSE",
      columns: ["idBossTeacher"],
      unique: true,
    },
    {
      name: "IDX_CLASSROOM_COURSE",
      columns: ["idClassroom"],
      unique: true,
    },
  ],
});

export default CourseSchema;