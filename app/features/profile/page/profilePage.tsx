import { Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useCompanyContext } from "../context/companyContext";
import { Link } from "react-router";

const ProfilePage = () => {
  const { company } = useCompanyContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    createdAt: "",
    updatedAt: "",
    phone: "",
  });

  // If company data is available, set it to the state
  useEffect(() => {
    if (company) {
      setUser({
        name: company.name || "N/A",
        email: company.email || "N/A",
        address: company.address || "N/A",
        city: company.city || "N/A",
        state: company.state || "N/A",
        createdAt: company.createdAt || "N/A",
        updatedAt: company.updatedAt || "N/A",
        phone: company.phone || "N/A",
      });
    }
  }, [company]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Profile Header with Avatar and Information */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500 mt-2">{user.email}</p>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="font-semibold text-gray-700">Address</p>
          <p className="text-gray-500">{user.address}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">City</p>
          <p className="text-gray-500">{user.city}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">State</p>
          <p className="text-gray-500">{user.state}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Phone</p>
          <p className="text-gray-500">{user.phone}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Created At</p>
          <p className="text-gray-500">{user.createdAt}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Updated At</p>
          <p className="text-gray-500">{user.updatedAt}</p>
        </div>
      </div>
      <div>
        <Link to="/editProfile">Edit</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
