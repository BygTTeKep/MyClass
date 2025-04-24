import { Request, Response } from 'express';
import { ILessonsService, lessonsService } from '../services/LessonsService';
import { lessonsFilterSchema } from '../dto/LessonsFilter.dto';
import { Filter } from '../repositories/LessonsRepository';

export class LessonsController {
    private services: ILessonsService;
    constructor(services: ILessonsService) {
        this.services = services;
        this.findLessonsByFilter = this.findLessonsByFilter.bind(this);
    }
    async findLessonsByFilter(req: Request, res: Response) {
        const query = req.query;
        const { error, value } = lessonsFilterSchema.validate(query);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        console.log(value);
        const convertParamseToFilter: Filter = {
            dateFrom: value.date.dateFrom,
            dateTo: value.date.dateTo,
            page: Number(value.page) ?? 1,
            lessonsPerPage: Number(value.lessonsPerPage) ?? 5,
            teacherIds: value.teacherIds,
            status: value.status,
            studentsCount: value.studentsCount,
        };
        const find = await this.services.findLessonsByFilter(
            convertParamseToFilter
        );
        res.status(200).json(find);
    }
}

export const lessonsController: LessonsController = new LessonsController(
    lessonsService
);
