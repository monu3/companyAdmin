import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Company } from "../types/types";
import { fetchCompanyInfo, updateCompanyInfo } from "../service/companyService";

interface CompanyContextType {
  company: Company | null;
  loading: boolean;
  fetchCompany: () => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompany = async () => {
    try {
      const companyData = await fetchCompanyInfo();
      setCompany(companyData);
    } catch (error) {
      console.error("Error fetching company information:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (updatedCompany: Company) => {
    try {
      const updatedData = await updateCompanyInfo(updatedCompany);
      setCompany(updatedData); // Update the state with the new company data
    } catch (error) {
      console.error("Error updating company information:", error);
    }
  };

  useEffect(() => {
    fetchCompany(); // Fetch the company data when the component mounts
  }, []);

  return (
    <CompanyContext.Provider
      value={{ company, loading, fetchCompany, updateCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
