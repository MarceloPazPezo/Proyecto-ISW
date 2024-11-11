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

  indices: [
    {
      name: "IDX_TIMEBLOCK",
      columns: ["id"],
      unique: true,
    }
  ],
});

export default TimeblockSchema;
