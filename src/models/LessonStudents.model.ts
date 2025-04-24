import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { LessonsModel } from './Lessons.model';
import { Students } from './Students.model';

@Table({
    tableName: 'lesson_students',
    modelName: 'LessonStudents',
    timestamps: false,
})
export class LessonStudents extends Model {
    @ForeignKey(() => LessonsModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    lesson_id: number;

    @ForeignKey(() => Students)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    student_id: number;

    @BelongsTo(() => LessonsModel, { foreignKey: 'lesson_id' })
    lesson: LessonsModel;

    @BelongsTo(() => Students, { foreignKey: 'student_id' })
    student: Students;

    @Column({
        type: DataType.BOOLEAN,
    })
    visit: boolean;
}
