import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
    Sequelize,
} from 'sequelize-typescript';
import { TeachersModel } from './Teachers.model';
import { Students } from './Students.model';
import { LessonStudents } from './LessonStudents.model';
import { LessonTeacher } from './LessonTeachers.model.';
import { BelongsToManyGetAssociationsMixinOptions } from '@sequelize/core';

@Table({ tableName: 'lessons', modelName: 'LessonsModel', timestamps: false })
export class LessonsModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.DATE,
    })
    date: Date;

    @Column({
        type: DataType.INTEGER,
    })
    status: number;

    @BelongsToMany(() => TeachersModel, () => LessonTeacher)
    teachers: TeachersModel[];

    @BelongsToMany(() => Students, () => LessonStudents)
    students: Students[];

    @HasMany(() => LessonTeacher)
    lesson_teachers: LessonTeacher[];
}
