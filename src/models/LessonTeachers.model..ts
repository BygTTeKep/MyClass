import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { TeachersModel } from './Teachers.model';
import { LessonsModel } from './Lessons.model';

@Table({
    tableName: 'lesson_teachers',
    modelName: 'LessonTeacher',
    timestamps: false,
})
export class LessonTeacher extends Model {
    @ForeignKey(() => LessonsModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    lesson_id: number;

    @ForeignKey(() => TeachersModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    teacher_id: number;

    @BelongsTo(() => LessonsModel, { foreignKey: 'lesson_id' })
    lesson: LessonsModel;

    @BelongsTo(() => TeachersModel, { foreignKey: 'teacher_id' })
    teacher: TeachersModel;
}
