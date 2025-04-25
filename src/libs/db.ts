import { Sequelize } from 'sequelize-typescript';
import { LessonTeacher } from '../models/LessonTeachers.model.';
import { Students } from '../models/Students.model';
import { TeachersModel } from '../models/Teachers.model';
import { LessonsModel } from '../models/Lessons.model';
import { LessonStudents } from '../models/LessonStudents.model';
import 'dotenv/config';

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USERNAME;
const db_port = process.env.DB_PORT;
const db_host = process.env.DB_HOST;
const db_pass = process.env.DB_PASS;

export const sequelize = new Sequelize({
    database: db_name,
    dialect: 'postgres',
    username: db_user,
    password: db_pass,
    port: Number(db_port) ?? 5432,
    host: db_host ?? 'localhost',
    models: [
        LessonTeacher,
        Students,
        TeachersModel,
        LessonsModel,
        LessonStudents,
    ],
});

export const initializeDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Удалось подклчиться к бд');
    } catch (err) {
        console.error('Не удалось подключиться к бд', err);
        throw err;
    }
};
