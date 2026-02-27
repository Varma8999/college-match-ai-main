import { createContext, useContext, useState } from "react";
import { StudentFormData, College } from "@/types/college";

interface FormContextType {
  formData: Partial<StudentFormData>;
  results: College[] | null;
  setFormData: (data: Partial<StudentFormData>) => void;
  updateFormData: (data: Partial<StudentFormData>) => void;
  setResults: (colleges: College[] | null) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormDataState] = useState<Partial<StudentFormData>>({});
  const [results, setResults] = useState<College[] | null>(null);

  const setFormData = (data: Partial<StudentFormData>) => {
    setFormDataState(data);
  };

  const updateFormData = (data: Partial<StudentFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormDataState({});
    setResults(null);
  };

  return (
    <FormContext.Provider value={{ formData, results, setFormData, updateFormData, setResults, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within FormProvider");
  }
  return context;
};
