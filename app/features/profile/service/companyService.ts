import { apiRequest } from "~/common/api/backendApi";
import { getUserEmail } from "~/common/utils/getUserEmail";
import type { Company } from "../types/types";

const emailCompany = getUserEmail(); // Get the company email from local storage

// Function to create or update company information
export const saveCompany = async (company: Company): Promise<any> => {
  if (!emailCompany) {
    throw new Error("No user email found in local storage.");
  }

  // If company has an ID, it's likely an update, so use PUT instead of POST
  const method = company.id ? "PUT" : "POST";
  const endpoint = company.id ? `/companies/${company.id}` : "/companies"; // Update URL if ID is provided

  return apiRequest(endpoint, {
    method,
    body: { company, emailCompany },
  });
};

// Function to fetch company information
export const fetchCompanyInfo = async (): Promise<Company> => {
  if (!emailCompany) {
    throw new Error("No user email found in local storage.");
  }

  try {
    const company = await apiRequest(`/companies?emailCompany=${emailCompany}`);
const API_BASE_URL = "http://localhost:8080/api";

    return company; // Return the company data fetched from the backend
  } catch (error) {
    console.error("Error fetching company information:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to update company information (e.g., settings, profile)
export const updateCompanyInfo = async (company: Company): Promise<Company> => {
  try {
    const updatedCompany = await saveCompany(company); // Reuse the save function for updating
    return updatedCompany;
  } catch (error) {
    console.error("Error updating company information:", error);
    throw error;
  }
};

// Function to delete a company by its ID (optional, depending on your use case)
export const deleteCompany = async (companyId: string): Promise<any> => {
  if (!companyId) {
    throw new Error("Company ID is required for deletion.");
  }

  const endpoint = `/companies/${companyId}`;

  try {
    return await apiRequest(endpoint, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(`Error deleting company: ${error}`);
  }
};
