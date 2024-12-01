import { FormFieldEnum } from "@/components/CustomForm";
import { Control } from "react-hook-form";

export interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldEnum;
}

export interface SubmitBtnProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

export interface StatCardProps {
    type: "appointments" | "pending" | "cancelled";
    count: number;
    label: string;
    icon: string;
}