import React, { useState, useRef } from 'react';
import { Vacancy } from '../../types/vacancyTypes';
import styles from './VacancyTable.module.scss';
import { FaEllipsisH, FaEdit, FaTrash } from 'react-icons/fa';
import useOutsideClick from "@hooks/useOutsideClick.ts";


interface VacancyTableProps {
    vacancies: Vacancy[];
    onEdit: (vacancy: Vacancy) => void;
    onDelete: (vacancyId: string) => void;
}

const VacancyTable: React.FC<VacancyTableProps> = ({ vacancies, onEdit, onDelete }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const menuRefs = useRef<(HTMLDivElement | null)[]>([]);


    useOutsideClick(menuRefs, (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        }
    });

    const handleMenuToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleEditClick = (vacancy: Vacancy) => {
        onEdit(vacancy);
    };

    const handleDeleteClick = (vacancyId: string) => {
        onDelete(vacancyId);
    };

    return (
        <div className={styles.vacancyTable}>
            <table>
                <thead>
                <tr>
                    <th>Компания</th>
                    <th>Должность</th>
                    <th>Зарплата $</th>
                    <th>Статус</th>
                    <th>Примечание</th>
                    <th className={styles.actionsColumn}>Действия</th>
                </tr>
                </thead>
                <tbody>
                {vacancies.map((vacancy, index) => (
                    <tr key={vacancy._id}>
                        <td>{vacancy.company}</td>
                        <td>{vacancy.position}</td>
                        <td>{vacancy.salaryRange}</td>
                        <td>{vacancy.applicationStatus}</td>
                        <td>{vacancy.note || 'Нет примечаний'}</td>
                        <td className={styles.actionsColumn}>
                            <div
                                className={styles.actions}
                                ref={(el) => menuRefs.current[index] = el}
                            >
                                <button
                                    className={styles.menuButton}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleMenuToggle(index);
                                    }}
                                >
                                    <FaEllipsisH />
                                </button>
                                {activeIndex === index && (
                                    <div
                                        className={styles.actionButtons}
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditClick(vacancy)}
                                        >
                                            <FaEdit /> Редактировать
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteClick(vacancy._id)}
                                        >
                                            <FaTrash /> Удалить
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VacancyTable;
