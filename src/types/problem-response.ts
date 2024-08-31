
export type ModelErrors = {
    [key: string]: string[];
};

export class ProblemResponse {
    status: number = 0;
    title: string = ""
    detail: string = ""
    errors: ModelErrors | null = null;
}

export function getAllErrors(errors: ModelErrors): string[] {
    if (!errors) {
        return [];
    }

    return Object.values(errors).flat();
}

export function getAllErrorsExclude(errors: ModelErrors, models: string[]): string[] {
    if (!errors) {
        return [];
    }

    return Object.keys(errors)
      .filter(key => !models.includes(key))
      .map(key => errors ? errors[key] : [])
      .flat();
}