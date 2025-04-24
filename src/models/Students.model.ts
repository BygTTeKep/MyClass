import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript';
import { LessonsModel } from './Lessons.model';
import { LessonStudents } from './LessonStudents.model';

@Table({
    tableName: 'students',
    modelName: 'Students',
    timestamps: false,
})
export class Students extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @BelongsToMany(() => LessonsModel, () => LessonStudents)
    lessons: LessonsModel[];
}
