import { Vacancy, VacancyFormData } from '@/types/vacancyTypes';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;


export const getVacancies = async (): Promise<Vacancy[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch vacancies');
    }
    return response.json();
};

export const addVacancy = async (vacancyData: VacancyFormData): Promise<Vacancy> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacancyData),
    });

    if (!response.ok) {
        throw new Error('Failed to add vacancy');
    }
    return response.json();
};


export const updateVacancy = async (id: string, vacancyData: VacancyFormData): Promise<Vacancy> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacancyData),
    });

    if (!response.ok) {
        throw new Error('Failed to update vacancy');
    }

    return response.json();
};

export const deleteVacancy = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete vacancy');
    }
};
