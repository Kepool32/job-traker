import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Vacancy, VacancyFormData } from '../../types/vacancyTypes';
import styles from './AddVacancyForm.module.scss';
import {vacancySchema} from "@validation/validationForm.ts";




interface AddVacancyFormProps {
    onSubmit: (vacancyData: VacancyFormData, id: string | null) => void;
    vacancy?: Vacancy | null;
    isOpen: boolean;
    onClose: () => void;
}

const AddVacancyForm: React.FC<AddVacancyFormProps> = ({ onSubmit, vacancy, isOpen, onClose }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacancyFormData>({
        resolver: yupResolver(vacancySchema),
        defaultValues: {
            company: vacancy?.company || '',
            position: vacancy?.position || '',
            salaryRange: vacancy?.salaryRange || '',
            applicationStatus: vacancy?.applicationStatus || '',
            note: vacancy?.note || '',
        },
    });

    useEffect(() => {
        if (vacancy) {
            setValue('company', vacancy.company);
            setValue('position', vacancy.position);
            setValue('salaryRange', vacancy.salaryRange);
            setValue('applicationStatus', vacancy.applicationStatus);
            setValue('note', vacancy.note);
        } else {
            setValue('company', '');
            setValue('position', '');
            setValue('salaryRange', '');
            setValue('applicationStatus', '');
            setValue('note', '');
        }
    }, [vacancy, setValue]);

    const onFormSubmit = (data: VacancyFormData) => {
        onSubmit(data, vacancy?._id || null);
    };

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onFormSubmit)} className={styles.addVacancyForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="company" className={styles.label}>Компания</label>
                        <input
                            type="text"
                            id="company"
                            aria-invalid={errors.company ? "true" : "false"}
                            {...register('company')}
                            className={styles.input}
                        />
                        {errors.company && <p className={styles.error}>{errors.company.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="position" className={styles.label}>Должность</label>
                        <input
                            type="text"
                            id="position"
                            aria-invalid={errors.position ? "true" : "false"}
                            {...register('position')}
                            className={styles.input}
                        />
                        {errors.position && <p className={styles.error}>{errors.position.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="salaryRange" className={styles.label}>Зарплата</label>
                        <input
                            type="text"
                            id="salaryRange"
                            aria-invalid={errors.salaryRange ? "true" : "false"}
                            {...register('salaryRange')}
                            className={styles.input}
                        />
                        {errors.salaryRange && <p className={styles.error}>{errors.salaryRange.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="applicationStatus" className={styles.label}>Статус</label>
                        <input
                            type="text"
                            id="applicationStatus"
                            aria-invalid={errors.applicationStatus ? "true" : "false"}
                            {...register('applicationStatus')}
                            className={styles.input}
                        />
                        {errors.applicationStatus && <p className={styles.error}>{errors.applicationStatus.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="note" className={styles.label}>Примечание</label>
                        <textarea
                            id="note"
                            {...register('note')}
                            aria-invalid={errors.note ? "true" : "false"}
                            className={styles.textarea}
                        />
                        {errors.note && <p className={styles.error}>{errors.note.message}</p>}
                    </div>

                    <button type="submit" className={styles.submitButton}>Сохранить</button>
                </form>
                <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть окно">×</button>
            </div>
        </div>
    );
};

export default AddVacancyForm;
