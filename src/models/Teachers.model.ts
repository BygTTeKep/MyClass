import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { LessonsModel } from './Lessons.model';
import { LessonTeacher } from './LessonTeachers.model';

@Table({
    tableName: 'teachers',
    modelName: 'TeachersModel',
    timestamps: false,
})
export class TeachersModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @BelongsToMany(() => LessonsModel, () => LessonTeacher)
    lessons: LessonsModel[];
}
