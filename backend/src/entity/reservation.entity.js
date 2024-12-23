import { EntitySchema } from "typeorm";

const ReservationSchema = new EntitySchema({
    name: "Reservation",
    tableName: "reservations",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "true",
        },
        horaInicio: {
            type: "time", // Usar el tipo `time` para almacenar solo la hora
            nullable: false,
        },
        horaFin: {
            type: "time", // Usar el tipo `time` para almacenar solo la hora
            nullable: false,
        },
        fecha: {
            type: "date",
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
        idTeacher: {
            type: "int",
            nullable: true,
        },
        idResource: {
            type: "int",
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
        resource: {
            type: "many-to-one",
            target: "Resource",
            joinColumn: {
                name: "idResource",
                referencedColumnName: "id",
            },
            nullable: false,
            cascade: true,
            onDelete: "CASCADE",
        },
    },
    indices: [
        {
            name: "IDX_RESERVATION_RESOURCE",
            columns: ["idResource"],
        },
        {
            name: "IDX_RESERVATION_TEACHER",
            columns: ["idTeacher"],
        },
    ],
});

export default ReservationSchema;