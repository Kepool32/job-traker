export interface Vacancy {
    _id: string;
    company: string;
    position: string;
    salaryRange: string;
    applicationStatus: string;
    note: string;
}

export interface VacancyFormData {
    company: string;
    position: string;
    salaryRange: string;
    applicationStatus: string;
    note?: string;
}
