import { type Dispatch, type SetStateAction } from "react";
import {
  csvIcon as CsvIcon,
  excelIcon as ExcelIcon,
  organizationIcon as OrganizationIcon,
  pdfIcon as PdfIcon,
  threedotIcon as ThreeDotIcon,
} from "../../icons/icon";
import type { Organization as OrganizationType } from "./data";
import { RefreshIcon, SearchIcon } from "./SystemIcons";

interface OrganizationProps {
  filteredOrganizations: OrganizationType[];
  organizationSearch: string;
  setOrganizationSearch: Dispatch<SetStateAction<string>>;
  handleRefresh: () => void;
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
  showExports: boolean;
  setShowExports: Dispatch<SetStateAction<boolean>>;
  showOrganizationDetails: (organization: OrganizationType) => void;
  openActionMenu: string | null;
  setOpenActionMenu: Dispatch<SetStateAction<string | null>>;
}

export default function Organization({ filteredOrganizations, organizationSearch, setOrganizationSearch, handleRefresh, setShowAddModal, showExports, setShowExports, showOrganizationDetails, openActionMenu, setOpenActionMenu }: OrganizationProps) {
  return (
    <section className="organization-page">
      <div className="organization-header">
        <div className="organization-title-row">
          <h1>Organization (3)</h1>
          <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </button>
        </div>
    
        <div className="organization-actions" onMouseDown={(event) => event.stopPropagation()}>
          <label className="distribution-search">
            <input
              value={organizationSearch}
              onChange={(event) => setOrganizationSearch(event.target.value)}
              placeholder="Search by Name / Code"
              aria-label="Search organizations"
            />
            <SearchIcon />
          </label>
          <button className="new-button" onClick={() => setShowAddModal(true)}>
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
    
      <div className="organization-grid">
        {filteredOrganizations.map((organization) => (
          <article className="organization-card"
             key={organization.code}
             onClick={() => showOrganizationDetails(organization)}>
            <div className="card-top">
              <div className="org-identity">
                <OrganizationIcon />
                <span>
                  <strong>{organization.name}</strong>
                  <small>
                    {organization.code} - {organization.acronym}
                  </small>
                </span>
              </div>
              <span className="status-pill">Active</span>
              <div className="card-more-wrapper">
                <button
                  className="card-more"
                  aria-label="Organization actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenActionMenu((current) => (current === organization.code ? null : organization.code));
                  }}
                >
                  <ThreeDotIcon />
                </button>
                {openActionMenu === organization.code && (
                  <div className="card-action-menu" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="action-item">
                      Edit
                    </button>
                    <button type="button" className="action-item action-item-danger">
                      Inactive
                    </button>
                  </div>
                )}
              </div>
            </div>
    
            <div className="card-mid">
              <div>
                <span>Org Type</span>
                <strong>{organization.orgType}</strong>
              </div>
              <div>
                <span>Country</span>
                <strong>{organization.country}</strong>
              </div>
            </div>
    
            <div className="card-info">
              <div>
                <span>Legal Name</span>
                <strong className="hover-detail" data-tooltip={organization.legalName}>
                  {organization.shortName}
                </strong>
              </div>
              <div>
                <span>Mobile No</span>
                <strong>{organization.mobile}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong className="hover-detail" data-tooltip={organization.email.replace("...", "")}>
                  {organization.email}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
