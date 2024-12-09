import { useEffect } from 'react';
import {vacanciesStore} from "@store/vacanciesStore.ts";




export const useVacancies = () => {
    const { vacancies,isLoading, fetchVacancies, addVacancy, updateVacancy, deleteVacancy } = vacanciesStore();

    useEffect(() => {
        fetchVacancies();
    }, [fetchVacancies]);

    return {
        isLoading,
        vacancies,
        addVacancy,
        updateVacancy,
        deleteVacancy,
    };
};
