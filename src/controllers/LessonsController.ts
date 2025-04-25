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
        const { error } = lessonsFilterSchema.validate(query);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const dateParts = query?.date?.toString().split(',');
        const studentsCountParts = query?.studentsCount?.toString().split(',');
        const date = { dateFrom: dateParts?.[0], dateTo: dateParts?.[1] };
        const studentsCount =
            studentsCountParts && studentsCountParts?.length > 1
                ? ([
                      Number(studentsCountParts?.[0]),
                      Number(studentsCountParts?.[1]),
                  ] as [number, number])
                : Number(studentsCountParts?.[0]);
        const convertParamseToFilter: Filter = {
            dateFrom: date.dateFrom,
            dateTo: date.dateTo,
            page: query.page ? Number(query.page) : 1,
            lessonsPerPage: query.lessonsPerPage
                ? Number(query.lessonsPerPage)
                : 5,
            teacherIds: query.teacherIds?.toString() ?? '',
            status: query.status ? Number(query.status) : undefined,
            studentsCount: studentsCount,
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
