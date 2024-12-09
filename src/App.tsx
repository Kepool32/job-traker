import React, { useState } from 'react';
import { useVacancies } from './hooks/useVacancies';
import VacancyTable from "./components/VacancyTable/VacancyTable";
import AddVacancyForm from "./components/AddVacancyForm/AddVacancyForm";
import {Vacancy, VacancyFormData} from './types/vacancyTypes';
import ProjectDescription from "@components/ProjectDescription/ProjectDescription.tsx";
import Loader from "@components/Loader/Loader.tsx";


const App: React.FC = () => {
    const { vacancies, isLoading, addVacancy, updateVacancy, deleteVacancy } = useVacancies();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vacancyToEdit, setVacancyToEdit] = useState<Vacancy | null>(null);

    const handleOpenModal = (vacancy: Vacancy | null) => {
        setVacancyToEdit(vacancy || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setVacancyToEdit(null);
    };

    const handleSubmit = (vacancy: VacancyFormData, id?: string | null) => {
        if (id) {
            updateVacancy(id, vacancy);
        } else {
            addVacancy(vacancy);
        }
        handleCloseModal();
    };

    const handleDelete = (vacancyId: string) => {
        deleteVacancy(vacancyId);
    };

    return (
        <div>
            <ProjectDescription onFeedbackClick={handleOpenModal} />

            {isLoading && <Loader />}

            <VacancyTable vacancies={vacancies} onEdit={handleOpenModal} onDelete={handleDelete} />

            <AddVacancyForm
                vacancy={vacancyToEdit}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default App;
