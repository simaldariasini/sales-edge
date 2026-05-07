import { type Dispatch, type SetStateAction } from "react";
import { csvIcon as CsvIcon, excelIcon as ExcelIcon, pdfIcon as PdfIcon, threedotIcon as ThreeDotIcon } from "../../icons/icon";
import type { Office as OfficeType } from "./data";
import { BinIcon, EyeIcon, FilterIcon, PencilIcon, RefreshIcon, SearchIcon } from "./SystemIcons";

interface OfficeProps {
  offices: OfficeType[];
  handleRefresh: () => void;
  showExports: boolean;
  setShowExports: Dispatch<SetStateAction<boolean>>;
}

export default function Office({ offices, handleRefresh, showExports, setShowExports }: OfficeProps) {
  return (
    <section className="office-page">
      <div className="office-header">
        <div className="organization-title-row">
          <h1>Offices (6)</h1>
          <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </button>
        </div>
    
        <div className="office-actions" onMouseDown={(event) => event.stopPropagation()}>
          <label className="distribution-search office-search">
            <input placeholder="Enter here" />
            <SearchIcon />
          </label>
          <button className="new-button add-button">
            <span>+</span> Add
          </button>
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
    
      <article className="office-card">
        <table>
          <thead>
            <tr>
              <th>S No</th>
              <th>Org</th>
              <th>Office Code/Name</th>
              <th>Office Type</th>
              <th>Is Warehouse</th>
              <th>Contact Name</th>
              <th>Phone No</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.office}>
                <td>{office.id}</td>
                <td>{office.org}</td>
                <td>{office.office}</td>
                <td>{office.officeType}</td>
                <td>{office.warehouse}</td>
                <td>{office.contactName}</td>
                <td>{office.phone}</td>
                <td>{office.city}</td>
                <td>{office.status}</td>
                <td>
                  <div className="table-actions">
                    <button aria-label="Edit office">
                      <PencilIcon />
                    </button>
                    <button aria-label="Delete office">
                      <BinIcon />
                    </button>
                    <button aria-label="View office">
                      <EyeIcon />
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
