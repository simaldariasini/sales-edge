import { type Dispatch, type SetStateAction } from "react";
import { csvIcon as CsvIcon, excelIcon as ExcelIcon, pdfIcon as PdfIcon, threedotIcon as ThreeDotIcon } from "../../icons/icon";
import type { Department as DepartmentType } from "./data";
import { BinIcon, EyeIcon, PencilIcon, RefreshIcon, SearchIcon } from "./SystemIcons";

interface DepartmentProps {
  departments: DepartmentType[];
  departmentSearch: string;
  setDepartmentSearch: Dispatch<SetStateAction<string>>;
  handleRefresh: () => void;
  showExports: boolean;
  setShowExports: Dispatch<SetStateAction<boolean>>;
  showDepartmentDetails: (department: DepartmentType) => void;
  setDepartmentToEdit: Dispatch<SetStateAction<DepartmentType | null>>;
  setShowEditDepartmentModal: Dispatch<SetStateAction<boolean>>;
  setDepartmentToDelete: Dispatch<SetStateAction<DepartmentType | null>>;
  setShowDeleteDepartmentModal: Dispatch<SetStateAction<boolean>>;
  setShowAddDepartmentModal: Dispatch<SetStateAction<boolean>>;
}

export default function Department({ departments, departmentSearch, setDepartmentSearch, handleRefresh, showExports, setShowExports, showDepartmentDetails, setDepartmentToEdit, setShowEditDepartmentModal, setDepartmentToDelete, setShowDeleteDepartmentModal, setShowAddDepartmentModal }: DepartmentProps) {
  return (
    <section className="department-page">
      <div className="department-header">
        <div className="organization-title-row">
          <h1>Departments ({departments.length})</h1>
          <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </button>
        </div>
    
        <div className="department-actions" onMouseDown={(event) => event.stopPropagation()}>
          <label className="distribution-search">
            <input value={departmentSearch} onChange={(event) => setDepartmentSearch(event.target.value)} placeholder="Search by Name / Code" />
            <SearchIcon />
          </label>
          <button className="new-button add-button" onClick={() => setShowAddDepartmentModal(true)}>
            <span>+</span> New
          </button>
          <button
            className="more-button"
            aria-label="Export options"
            onClick={() => setShowExports((value) => !value)}
          >
            <ThreeDotIcon />
          </button>
    
          {showExports && (
            <div className="export-menu">
              <button className="export-item">
                <ExcelIcon /> Export to Excel
              </button>
              <button className="export-item">
                <PdfIcon /> Export to PDF
              </button>
              <button className="export-item">
                <CsvIcon /> Export to CSV
              </button>
            </div>
          )}
        </div>
      </div>
    
      <article className="department-card">
        <table>
          <thead>
            <tr>
              <th>S No</th>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Department Type</th>
              <th>Org</th>
              <th>Office</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments
              .filter((department) =>
                department.departmentName.toLowerCase().includes(departmentSearch.toLowerCase()) ||
                department.departmentCode.toLowerCase().includes(departmentSearch.toLowerCase()),
              )
              .map((department) => (
                <tr key={department.departmentCode}>
                  <td>{department.id}</td>
                  <td>{department.departmentCode}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.departmentType}</td>
                  <td>{`[${department.orgCode}] ${department.orgName}`}</td>
                  <td>{`[${department.officeCode}] ${department.officeName}`}</td>
                  <td>{department.status}</td>
                  <td>
                    <div className="table-actions">
                      <button aria-label="View department" onClick={() => showDepartmentDetails(department)}>
                        <EyeIcon />
                      </button>
                      <button
                        aria-label="Edit department"
                        onClick={() => {
                          setDepartmentToEdit(department);
                          setShowEditDepartmentModal(true);
                        }}
                      >
                        <PencilIcon />
                      </button>
                      <button
                        aria-label="Delete department"
                        onClick={() => {
                          setDepartmentToDelete(department);
                          setShowDeleteDepartmentModal(true);
                        }}
                      >
                        <BinIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
