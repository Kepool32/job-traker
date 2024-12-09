import React from 'react';
import styles from './ProjectDescription.module.scss';
import Button from "@components/Button/Button.tsx";
import {Vacancy} from "@/types/vacancyTypes.ts";


interface ProjectDescriptionProps {
    onFeedbackClick: (vacancy: Vacancy | null) => void;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ onFeedbackClick }) => {
    return (
        <div className={styles.projectDescription}>
            <h2 className={styles.title}>Система контроля откликов</h2>
            <p className={styles.text}>
                Сервис для контроля откликов на вакансии, который позволяет быстро отслеживать статус кандидатов и упрощает процесс взаимодействия с соискателями.
            </p>

            <Button onClick={()=>onFeedbackClick(null)} color="primary" type="button" />
        </div>
    );
};

export default ProjectDescription;
