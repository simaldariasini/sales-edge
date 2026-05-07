import { type Dispatch, type SetStateAction } from "react";
import { csvIcon as CsvIcon, excelIcon as ExcelIcon, pdfIcon as PdfIcon, threedotIcon as ThreeDotIcon } from "../../icons/icon";
import type { Employee as EmployeeType } from "./data";
import { EyeIcon, FilterIcon, GridIcon, ListIcon, MailIcon, PhoneIcon, RefreshIcon, SearchIcon } from "./SystemIcons";

interface EmployeeProps {
  employees: EmployeeType[];
  filteredEmployees: EmployeeType[];
  employeeSearch: string;
  setEmployeeSearch: Dispatch<SetStateAction<string>>;
  employeeViewMode: "table" | "grid";
  setEmployeeViewMode: Dispatch<SetStateAction<"table" | "grid">>;
  employeeFilterActive: boolean;
  setEmployeeFilterActive: Dispatch<SetStateAction<boolean>>;
  employeeFilterInactive: boolean;
  setEmployeeFilterInactive: Dispatch<SetStateAction<boolean>>;
  employeeActionMenu: number | null;
  setEmployeeActionMenu: Dispatch<SetStateAction<number | null>>;
  setShowAddEmployeeModal: Dispatch<SetStateAction<boolean>>;
  showExports: boolean;
  setShowExports: Dispatch<SetStateAction<boolean>>;
  showEmployeeDetails: (employee: EmployeeType) => void;
  handleRefresh: () => void;
}

export default function Employee({ employees, filteredEmployees, employeeSearch, setEmployeeSearch, employeeViewMode, setEmployeeViewMode, employeeFilterActive, setEmployeeFilterActive, employeeFilterInactive, setEmployeeFilterInactive, employeeActionMenu, setEmployeeActionMenu, setShowAddEmployeeModal, showExports, setShowExports, showEmployeeDetails, handleRefresh }: EmployeeProps) {
  return (
    <section className="employee-page">
      <div className="employee-header">
        <div className="organization-title-row">
          <h1>Employee ({employees.length})</h1>
          <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </button>
        </div>
    
        <div className="employee-actions" onMouseDown={(event) => event.stopPropagation()}>
          <div className="employee-status-filter" aria-label="Employee status filters">
            <strong>Status:</strong>
            <label>
              <input
                type="checkbox"
                checked={employeeFilterActive}
                onChange={(event) => setEmployeeFilterActive(event.target.checked)}
              />
              Active
            </label>
            <label>
              <input
                type="checkbox"
                checked={employeeFilterInactive}
                onChange={(event) => setEmployeeFilterInactive(event.target.checked)}
              />
              InActive
            </label>
          </div>
          <label className="distribution-search employee-search">
            <input
              value={employeeSearch}
              onChange={(event) => setEmployeeSearch(event.target.value)}
              placeholder="Search by Employee Name/Acronym"
              aria-label="Search employees"
            />
            <SearchIcon />
          </label>
          <button className="new-button employee-new-button" onClick={() => setShowAddEmployeeModal(true)}>
            <span>+</span> New
          </button>
          <div className="employee-view-toggle" aria-label="Employee view mode">
            <button
              className={employeeViewMode === "grid" ? "view-toggle-active" : ""}
              aria-label="Grid view"
              onClick={() => setEmployeeViewMode("grid")}
            >
              <GridIcon />
            </button>
            <button
              className={employeeViewMode === "table" ? "view-toggle-active" : ""}
              aria-label="List view"
              onClick={() => setEmployeeViewMode("table")}
            >
              <ListIcon />
            </button>
          </div>
          <button className="filter-button" aria-label="Filter">
            <FilterIcon />
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
    
      {employeeViewMode === "table" ? (
        <article className="employee-table-card">
          <table>
            <thead>
              <tr>
                <th>S No</th>
                <th>Employee Code / Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Department</th>
                <th>Office</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={`${employee.employeeCode}-${employee.id}`}>
                  <td>{index + 1}</td>
                  <td>[{employee.employeeCode}] {employee.displayName}</td>
                  <td>{employee.email || "-"}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>{employee.office}</td>
                  <td>[{employee.orgCode}]{employee.organization}</td>
                  <td>{employee.status}</td>
                  <td>
                    <div className="table-actions employee-row-actions">
                      <button aria-label="View employee" onClick={() => showEmployeeDetails(employee)}>
                        <EyeIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ) : (
        <div className="employee-card-grid">
          {filteredEmployees.map((employee) => (
            <article className="employee-card" key={`${employee.employeeCode}-${employee.id}`} onClick={() => showEmployeeDetails(employee)}>
              <div className="employee-card-top">
                <span className={`employee-card-status ${employee.status === "Active" ? "employee-card-status-active" : ""}`}>
                  {employee.status}
                </span>
                <div className="card-more-wrapper">
                  <button
                    className="card-more"
                    aria-label="Employee actions"
                    onClick={(event) => {
                      event.stopPropagation();
                      setEmployeeActionMenu((current) => (current === employee.id ? null : employee.id));
                    }}
                  >
                    <ThreeDotIcon />
                  </button>
                  {employeeActionMenu === employee.id && (
                    <div className="card-action-menu" onClick={(event) => event.stopPropagation()}>
                      <button type="button" className="action-item">
                        Edit
                      </button>
                      <button type="button" className="action-item action-item-danger">
                        {employee.status === "Active" ? "Inactive" : "Active"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="employee-avatar">{employee.acronym || ""}</div>
              <h2>{employee.displayName}{employee.acronym ? ` (${employee.acronym})` : ""}</h2>
              <p>{employee.employeeCode} &bull; {employee.designation}</p>
              <div className="employee-card-contact">
                <span><PhoneIcon /> {employee.phone}</span>
                <span><MailIcon /> {employee.email || "-"}</span>
                <span><MailIcon /> {employee.organization}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
