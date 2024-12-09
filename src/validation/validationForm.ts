import * as yup from "yup";

export const vacancySchema = yup.object().shape({
    company: yup.string().required('Компания обязательна'),
    position: yup.string().required('Должность обязательна'),
    salaryRange: yup
        .string()
        .matches(
            /^(\d+|\d+-\d+|-\d+)$/,
            'Зарплата должна быть числом или диапазоном чисел (например, "5000-10000")'
        )
        .required('Зарплата обязательна'),
    applicationStatus: yup.string().required('Статус обязательна'),
    note: yup
        .string()
        .max(30, 'Примечание не может быть длиннее 30 символов')
        .optional(),
});
