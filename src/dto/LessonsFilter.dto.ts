import Joi from 'joi';

const dateSchema = Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}(,\d{4}-\d{2}-\d{2})?$/)
    .messages({
        'string.pattern.base':
            'date должна быть формата: YYYY-MM-DD или YYYY-MM-DD,YYYY-MM-DD',
    });

const statusSchema = Joi.number().valid(0, 1).messages({
    'number.base': 'status должен быть числом',
    'number.valid': 'status должен быть 0 или 1',
});

const teacherIdsSchema = Joi.string()
    .pattern(/^\d+(,\d+)*$/)
    .messages({
        'string.pattern.base':
            'teacherIds должен быть строкой чисел разбитой запятой. Пример 1,2,3',
    });

const studentsCountSchema = Joi.string()
    .pattern(/^\d+(,\d+)?$/)
    .messages({
        'string.pattern.base':
            'studentsCount должно быть числом или два числа разбитых запятой',
    });

const pageSchema = Joi.number().integer().min(1).default(1).messages({
    'number.base': 'page должен быть числом',
    'number.integer': 'page должен быть числом',
    'number.min': 'page должен быть >= 1',
});

const lessonsPerPageSchema = Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(5)
    .messages({
        'number.base': 'lessonsPerPage должен быть числом',
        'number.integer': 'lessonsPerPage должен быть числом',
        'number.min': 'lessonsPerPage должен быть >= 1',
        'number.max': 'lessonsPerPage должен быть <= 100',
    });

export const lessonsFilterSchema = Joi.object({
    date: dateSchema,
    status: statusSchema,
    teacherIds: teacherIdsSchema,
    studentsCount: studentsCountSchema,
    page: pageSchema,
    lessonsPerPage: lessonsPerPageSchema,
});
