import { LessonsModel } from '../models/Lessons.model';
import {
    ILessonsRepository,
    lessonsRepository,
} from '../repositories/LessonsRepository';

export interface ILessonsService {
    findLessonsByFilter: (filter: any) => Promise<LessonsModel[]>;
}

export class LessonsService implements ILessonsService {
    private repository: ILessonsRepository;
    constructor(repository: ILessonsRepository) {
        this.repository = repository;
    }
    async findLessonsByFilter(filter: any) {
        const findetLessons = await this.repository.findLessonsByFilters(
            filter
        );
        return findetLessons;
    }
}

export const lessonsService: ILessonsService = new LessonsService(
    lessonsRepository
);
