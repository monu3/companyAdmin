import React, { useState } from "react";
import { HiOutlineMenu, HiViewGrid, HiPlus } from "react-icons/hi";
import AddEmployee from "../components/AddEmployee";

const employeePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h3>Employee</h3>
          <p>breadcrumbs</p>
        </div>
        <div className="flex gap-1">
          <button>
            <HiOutlineMenu />
          </button>
          <button>
            <HiViewGrid />
          </button>
          <button onClick={() => setIsOpen(true)}>
            <HiPlus />
          </button>
        </div>
      </div>
      {isOpen && <AddEmployee onClose={()=>setIsOpen(false)} />}
    </div>
  );
};

export default employeePage;
