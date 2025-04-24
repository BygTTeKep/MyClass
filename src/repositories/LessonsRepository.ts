import { literal, Literal, Op, sql } from '@sequelize/core';
import { LessonsModel } from '../models/Lessons.model';
import { Students } from '../models/Students.model';
import { TeachersModel } from '../models/Teachers.model';
import { sequelize } from '../libs/db';
import { attribute } from '@sequelize/core/lib/expression-builders/attribute';

export type Filter = {
    dateFrom?: string;
    dateTo?: string;
    status?: number;
    teacherIds?: string;
    studentsCount?: [number, number] | number;
    page: number;
    lessonsPerPage: number;
};

export interface ILessonsRepository {
    findLessonsByFilters: (filter: Filter) => Promise<LessonsModel[]>;
}
export class LessonsRepository {
    private lessons: typeof LessonsModel;
    constructor() {
        this.lessons = LessonsModel;
    }
    async findLessonsByFilters(filter: Filter): Promise<LessonsModel[]> {
        const where: any = {};

        if (filter.dateFrom && filter.dateTo) {
            where.date = {
                [Op.between]: [filter.dateFrom, filter.dateTo],
            };
        } else if (filter.dateFrom) {
            where.date = { [Op.gte]: filter.dateFrom };
        } else if (filter.dateTo) {
            where.date = { [Op.lte]: filter.dateTo };
        }

        if (typeof filter.status !== 'undefined') {
            where.status = filter.status;
        }

        const queryOptions: any = {
            where,
            include: [
                {
                    model: Students,
                    attributes: ['id', 'name'],
                    duplicating: false,
                    required: true,
                    through: { attributes: ['visit'] },
                },
            ],

            offset: (filter.page - 1) * filter.lessonsPerPage,
            limit: filter.lessonsPerPage,
            logging: console.log,
        };

        if (filter.studentsCount !== undefined) {
            const studentCountCondition =
                typeof filter.studentsCount === 'number'
                    ? { [Op.eq]: filter.studentsCount }
                    : { [Op.between]: filter.studentsCount };

            queryOptions.include.push({
                model: TeachersModel,
                as: 'teachers',
                duplicating: false,
                attributes: ['id', 'name'],
                required: !!filter.teacherIds?.length,
                through: {
                    attributes: [],
                },
            });

            queryOptions.group = [
                'LessonsModel.id',
                'students.id',
                'students->LessonStudents.lesson_id',
                'students->LessonStudents.student_id',
                'students->LessonStudents.visit',
                'teachers.id',
            ];
            queryOptions.having = sequelize.where(
                sequelize.fn(
                    'COUNT',
                    sequelize.col('students->LessonStudents.student_id')
                ),
                studentCountCondition
            );
        }
        const find = await this.lessons.findAll(queryOptions);
        const enriched = await Promise.all(
            find.map(async (lesson) => {
                const visitCount = lesson.students.filter((s) => {
                    if (s.dataValues.LessonStudents.visit) return s;
                }).length;

                //Убираем visit
                const studentsWithoutVisit = lesson.students.map(
                    (student: any) => {
                        const { LessonStudents, ...rest } = student.toJSON();
                        return rest;
                    }
                );

                return {
                    ...lesson.toJSON(),
                    students: studentsWithoutVisit,
                    visitCount,
                };
            })
        );
        return enriched;
    }
}

export const lessonsRepository = new LessonsRepository();
