import { create } from 'zustand';
import {Vacancy, VacancyFormData} from '@/types/vacancyTypes';
import {addVacancy, deleteVacancy, getVacancies, updateVacancy} from "@api/vacanciesService.ts";



interface VacanciesStore {
    vacancies: Vacancy[];
    isLoading: boolean;
    fetchVacancies: () => void;
    addVacancy: (vacancyData: VacancyFormData) => void;
    updateVacancy: (id: string, vacancyData: VacancyFormData) => void;
    deleteVacancy: (id: string) => void;
}

export const vacanciesStore = create<VacanciesStore>((set) => ({
    vacancies: [],
    isLoading: false,

    fetchVacancies: async () => {
        set({ isLoading: true });
        try {
            const vacancies = await getVacancies();
            set({ vacancies });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    addVacancy: async (vacancyData: VacancyFormData) => {
        set({ isLoading: true });
        try {
            const newVacancy = await addVacancy(vacancyData);
            set((state) => ({
                vacancies: [...state.vacancies, newVacancy],
            }));
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateVacancy: async (id: string, vacancyData: VacancyFormData) => {
        set({ isLoading: true });
        try {
            const updatedVacancy = await updateVacancy(id, vacancyData);
            set((state) => ({
                vacancies: state.vacancies.map((vacancy) =>
                    vacancy._id === id ? updatedVacancy : vacancy
                ),
            }));
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteVacancy: async (id: string) => {
        set({ isLoading: true });
        try {
            await deleteVacancy(id);
            set((state) => ({
                vacancies: state.vacancies.filter((vacancy) => vacancy._id !== id),
            }));
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
