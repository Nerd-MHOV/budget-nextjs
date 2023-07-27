export interface BudgetRows {
    id: number;
    desc: string;
    values: number[];
    total: number;
    noDiscount: number[];
    totalNoDiscount: number;
    discountApplied: number;
}
export interface BudgetForm {
    adult?: number;
    discount?: number;
    category?: string;
    pension?: string;
    numberPipe?: number;
}

export interface BudgetUnitaryDiscount {
    id: number;
    name: string;
    discount: number;
}

export interface BudgetRequirement {
    requirement: string;
    type: string;
    values: {
        adult: number;
        child: number[];
        amount: number;
    };
}

export interface EntityValues {
    adt: number
    adtex: number
    chd0: number
    chd4: number
    chd8: number
}

export type PetSize = "pequeno" | "médio" | "grande";