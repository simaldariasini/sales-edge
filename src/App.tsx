

import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import {
  csvIcon as CsvIcon,
  excelIcon as ExcelIcon,
  organizationIcon as OrganizationIcon,
  pdfIcon as PdfIcon,
  threedotIcon as ThreeDotIcon,
} from "./icons/icon";
import "./App.css";

type ViewName =
  | "Organization"
  | "Distribution Channel"
  | "Office"
  | "Department"
  | "Employee"
  | "Vehicles"
  | "Organization Details";

interface Organization {
  code: string;
  acronym: string;
  name: string;
  shortName: string;
  legalName: string;
  mobile: string;
  email: string;
  orgType: string;
  country: string;
  whatsApp: string;
  website: string;
  linkedIn: string;
  groupCompany: string;
  industry: string;
  description: string;
}

interface DistributionChannel {
  id: number;
  orgCode: string;
  orgName: string;
  distributionCode: string;
  distributionName: string;
  status: string;
}

interface Office {
  id: number;
  org: string;
  office: string;
  officeType: string;
  warehouse: string;
  contactName: string;
  phone: string;
  city: string;
  status: string;
}

interface OrganizationForm {
  organizationName: string;
  legalName: string;
  acronym: string;
  country: string;
  orgType: string;
  email: string;
  mobile: string;
}

const tabOrder: ViewName[] = [
  "Organization",
  "Distribution Channel",
  "Office",
  "Department",
  "Employee",
  "Vehicles",
  "Organization Details",
];

const organizations: Organization[] = [
  {
    code: "ORG-0004",
    acronym: "SIEL",
    name: "Samsung",
    shortName: "Samsung",
    legalName: "Samsung India Electronics Pvt Ltd",
    mobile: "9876500012",
    email: "support@samsung.com",
    orgType: "org",
    country: "-",
    whatsApp: "9876500000",
    website: "www.samsung.com/in",
    linkedIn: "linkedin.com/company/samsung",
    groupCompany: "Samsung Group",
    industry: "Consumer Electronics",
    description: "Leading electronics and appliance manufacturer",
  },
  {
    code: "ORG-0003",
    acronym: "METRO",
    name: "Metro Cash & C...",
    shortName: "Metro Cash &...",
    legalName: "Metro Cash & Carry",
    mobile: "8041777777",
    email: "info@metro.co...",
    orgType: "org",
    country: "-",
    whatsApp: "8041777777",
    website: "www.metro.co.in",
    linkedIn: "linkedin.com/company/metro",
    groupCompany: "Metro",
    industry: "Wholesale",
    description: "Wholesale and retail distribution business",
  },
  {
    code: "ORG-0002",
    acronym: "MKG",
    name: "MKG Organizati...",
    shortName: "MKG Organizati...",
    legalName: "M Karthik Or",
    mobile: "8639211701",
    email: "m.karthik@gmail...",
    orgType: "org",
    country: "-",
    whatsApp: "8639211701",
    website: "-",
    linkedIn: "-",
    groupCompany: "MKG",
    industry: "Distribution",
    description: "Regional sales and logistics organization",
  },
];

const countryOptions = [
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Egypt",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Philippines",
  "Singapore",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
].sort((a, b) => a.localeCompare(b));

const orgTypeOptions = ["vendor", "org", "customer", "supplier"];

const distributionChannels: DistributionChannel[] = [
  { id: 1, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0007", distributionName: "E-Commerce", status: "Active" },
  { id: 2, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0006", distributionName: "Distributor", status: "Active" },
  { id: 3, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0005", distributionName: "General Trade", status: "Active" },
  { id: 4, orgCode: "ORG-0002", orgName: "MKG Organization", distributionCode: "DC-0003", distributionName: "KGM Distribution", status: "Active" },
  { id: 5, orgCode: "ORG-0002", orgName: "MKG Organization", distributionCode: "DC-0001", distributionName: "MKG Distribution", status: "Active" },
];

const offices: Office[] = [
  { id: 1, org: "[ORG-0004] Samsung", office: "[OFF007] Samsung Hyderabad", officeType: "Regional Office", warehouse: "Yes", contactName: "Mahesh Kumar", phone: "4055667788", city: "Hyderabad", status: "Active" },
  { id: 2, org: "[ORG-0004] Samsung", office: "[OFF006] Samsung India HO Gurgaon", officeType: "Head Office", warehouse: "No", contactName: "Rajiv Mehta", phone: "1244888888", city: "Secunderabad", status: "Active" },
  { id: 3, org: "[ORG-0002] MKG Organization", office: "[OFF004] Mastishka", officeType: "Headoffice", warehouse: "Yes", contactName: "Naveen", phone: "9632587410", city: "Hyderabad", status: "Active" },
  { id: 4, org: "[ORG-0002] MKG Organization", office: "[OFF003] GKM", officeType: "MainBranch", warehouse: "Yes", contactName: "K Kumar", phone: "8099153866", city: "Secunderabad", status: "Active" },
  { id: 5, org: "[ORG-0002] MKG Organization", office: "[OFF002] KG office", officeType: "MainBranch", warehouse: "Yes", contactName: "Sai Kumar", phone: "9887766788", city: "Secunderabad", status: "Active" },
  { id: 6, org: "[ORG-0002] MKG Organization", office: "[OFF001] MKG Office", officeType: "Headoffice", warehouse: "Yes", contactName: "Karthik", phone: "8639211702", city: "Hyderabad", status: "Active" },
];

function App() {
  const [activeTabs, setActiveTabs] = useState<ViewName[]>([]);
  const [activeView, setActiveView] = useState<ViewName | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState(organizations[0]);
  const [showExports, setShowExports] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);

  useEffect(() => {
    const closeExports = () => setShowExports(false);
    document.addEventListener("mousedown", closeExports);
    return () => document.removeEventListener("mousedown", closeExports);
  }, []);

  const openView = (view: string) => {
    if (!tabOrder.includes(view as ViewName)) return;

    const typedView = view as ViewName;
    setActiveTabs((current) => {
      const withView = current.includes(typedView) ? current : [...current, typedView];
      return tabOrder.filter((tab) => withView.includes(tab));
    });
    setActiveView(typedView);
  };

  const closeView = (view: ViewName) => {
    setActiveTabs((current) => {
      const nextTabs = current.filter((tab) => tab !== view);

      if (activeView === view) {
        setActiveView(nextTabs.at(-1) ?? null);
      }

      return nextTabs;
    });
  };

  const showOrganizationDetails = (organization: Organization) => {
    setSelectedOrganization(organization);
    openView("Organization Details");
  };

  return (
    <div className="app-container">
      <Sidebar onOpenView={openView} />

      <div className="main">
        <Topbar />
        <div className="workspace-tabs">
          <div className="tab-anchor">
            <TabAnchorIcon />
          </div>
          {activeTabs.map((tab) => (
            <div
              key={tab}
              className={`workspace-tab ${activeView === tab ? "workspace-tab-active" : ""}`}
              onClick={() => setActiveView(tab)}
            >
              <span>{tab}</span>
              <button
                className="tab-close"
                aria-label={`Close ${tab}`}
                onClick={(event) => {
                  event.stopPropagation();
                  closeView(tab);
                }}
              >
                x
              </button>
            </div>
          ))}
          <div className="tab-spacer" />
          <button className="hamburger-button" aria-label="Menu">
            =
          </button>
        </div>

        <main className="content">
          {activeView === "Organization" && (
            <section className="organization-page">
              <div className="organization-header">
                <div className="organization-title-row">
                  <h1>Organization (3)</h1>
                  <button className="refresh-button" aria-label="Refresh">
                    <RefreshIcon />
                  </button>
                </div>

                <div className="organization-actions" onMouseDown={(event) => event.stopPropagation()}>
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
                {organizations.map((organization) => (
                  <article className="organization-card" key={organization.code}>
                    <div className="card-top">
                      <button
                        className="org-identity"
                        onClick={() => showOrganizationDetails(organization)}
                      >
                        <OrganizationIcon />
                        <span>
                          <strong>{organization.name}</strong>
                          <small>
                            {organization.code} - {organization.acronym}
                          </small>
                        </span>
                      </button>
                      <span className="status-pill">Active</span>
                      <button className="card-more" aria-label="Organization actions">
                        <ThreeDotIcon />
                      </button>
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
          )}

          {activeView === "Distribution Channel" && (
            <section className="distribution-page">
              <div className="distribution-header">
                <div className="organization-title-row">
                  <h1>Distribution Channels (5)</h1>
                  <button className="refresh-button" aria-label="Refresh">
                    <RefreshIcon />
                  </button>
                </div>

                <div className="distribution-actions" onMouseDown={(event) => event.stopPropagation()}>
                  <label className="distribution-search">
                    <input placeholder="Search Distribution Channels..." />
                    <SearchIcon />
                  </label>
                  <button className="new-button add-button" onClick={() => setShowDistributionModal(true)}>
                    <span>+</span> Add
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

              <article className="distribution-card">
                <table>
                  <thead>
                    <tr>
                      <th>S No</th>
                      <th>Org Code</th>
                      <th>Org Name</th>
                      <th>Distribution Code</th>
                      <th>Distribution Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distributionChannels.map((channel) => (
                      <tr key={channel.distributionCode}>
                        <td>{channel.id}</td>
                        <td>{channel.orgCode}</td>
                        <td>{channel.orgName}</td>
                        <td>{channel.distributionCode}</td>
                        <td>{channel.distributionName}</td>
                        <td>{channel.status}</td>
                        <td>
                          <div className="table-actions">
                            <button aria-label="View distribution channel">
                              <EyeIcon />
                            </button>
                            <button aria-label="Edit distribution channel">
                              <PencilIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </section>
          )}

          {activeView === "Office" && (
            <section className="office-page">
              <div className="office-header">
                <div className="organization-title-row">
                  <h1>Offices (6)</h1>
                  <button className="refresh-button" aria-label="Refresh">
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
          )}

          {activeView === "Organization Details" && (
            <section className="details-page">
              <h1>Organization Details</h1>
              <article className="details-card">
                <h2>Details</h2>
                <div className="details-grid">
                  <Detail label="Organization Code" value={selectedOrganization.code} />
                  <Detail label="Acronym" value={selectedOrganization.acronym} />
                  <Detail label="Organization Name" value={selectedOrganization.name.replace("...", "")} />
                  <Detail label="Legal Name" value={selectedOrganization.legalName} />
                  <Detail label="Org Type" value={selectedOrganization.orgType} />
                  <Detail label="Country" value={selectedOrganization.country} />
                  <Detail label="Email" value={selectedOrganization.email.replace("...", "")} />
                  <Detail label="Mobile No" value={selectedOrganization.mobile} />
                  <Detail label="WhatsApp Number" value={selectedOrganization.whatsApp} />
                  <Detail label="Website" value={selectedOrganization.website} />
                  <Detail label="LinkedIn" value={selectedOrganization.linkedIn} />
                  <Detail label="Group Company Name" value={selectedOrganization.groupCompany} />
                  <Detail label="Industry Group Name" value={selectedOrganization.industry} />
                  <Detail label="Description" value={selectedOrganization.description} wide />
                </div>
              </article>
            </section>
          )}

          {!activeView && <div className="empty-state"></div>}
        </main>
      </div>

      {showAddModal && <AddOrganizationModal onClose={() => setShowAddModal(false)} />}
      {showDistributionModal && <AddDistributionModal onClose={() => setShowDistributionModal(false)} />}
    </div>
  );
}

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`detail-item ${wide ? "detail-wide" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AddOrganizationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<OrganizationForm>({
    organizationName: "",
    legalName: "",
    acronym: "",
    country: "",
    orgType: "",
    email: "",
    mobile: "",
  });

  const canContinue = useMemo(
    () => Object.values(form).every((value) => value.trim().length > 0),
    [form],
  );

  const updateField = (field: keyof OrganizationForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="modal-backdrop">
      <section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-org-title">
        <div className="modal-heading">
          <div>
            <h2 id="add-org-title">Add New Organization</h2>
            <p>Fill in the details to create a new organization</p>
          </div>
          <div className="stepper">
            <span className="step step-active">1</span>
            <strong>Add New Organization</strong>
            <span className="step">2</span>
            <strong className="step-muted">Preview</strong>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal-body">
          <div className="form-top-row">
            <label className="code-field">
              <span>
                Organization Code <b>*</b>
              </span>
              <strong>ORG-0005</strong>
            </label>
            <label className="checkbox-field">
              <input type="checkbox" defaultChecked />
              <span>Is Active</span>
            </label>
          </div>

          <div className="form-grid">
            <TextField label="Organization Name" required value={form.organizationName} onChange={(value) => updateField("organizationName", value)} />
            <TextField label="Legal Name" required value={form.legalName} onChange={(value) => updateField("legalName", value)} />
            <TextField label="Acronym" required half value={form.acronym} onChange={(value) => updateField("acronym", value)} />
            <SelectField label="Country" required value={form.country} options={countryOptions} onChange={(value) => updateField("country", value)} />
            <SelectField label="Org Type" required value={form.orgType} options={orgTypeOptions} onChange={(value) => updateField("orgType", value)} />
            <TextField label="Email Address" required half value={form.email} onChange={(value) => updateField("email", value)} />
            <TextField label="Mobile Number" required half value={form.mobile} onChange={(value) => updateField("mobile", value)} />
            <TextField label="Website" half />
            <TextField label="WhatsApp Number" half />
            <TextField label="LinkedIn" half />
            <TextField label="Group Company Name" half />
            <TextField label="Industry Group Name" half />
            <label className="form-field form-full">
              <span>Description</span>
              <textarea placeholder="Enter here" />
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <div className="form-note">
            <span>i</span> Please fill the required details, click on 'Next' button to proceed
          </div>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="next-button" disabled={!canContinue}>
            Next &gt;
          </button>
        </div>
      </section>
    </div>
  );
}

function AddDistributionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop">
      <section className="add-modal distribution-modal" role="dialog" aria-modal="true" aria-labelledby="add-distribution-title">
        <div className="modal-heading">
          <div>
            <h2 id="add-distribution-title">Add Distribution Channel</h2>
          </div>
          <div className="stepper">
            <span className="step step-active">1</span>
            <strong>Add Distribution Channel</strong>
            <span className="step">2</span>
            <strong className="step-muted">Preview</strong>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal-body distribution-modal-body">
          <div className="distribution-form-grid">
            <SelectField label="Organization" required options={organizations.map((organization) => organization.name.replace("...", ""))} />
            <label className="code-field">
              <span>
                Distribution Channel Code <b>*</b>
              </span>
              <strong>DC-0008</strong>
            </label>
            <TextField label="Distribution Channel Name" required half />
            <label className="form-field distribution-description">
              <span>Description</span>
              <textarea placeholder="Enter here" />
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <div className="form-note">
            <span>i</span> Please fill the required details, click on 'Next' button to proceed
          </div>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="next-button" disabled>
            Next &gt;
          </button>
        </div>
      </section>
    </div>
  );
}

function TextField({
  label,
  required = false,
  half = false,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  half?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={`form-field ${half ? "" : "form-full"}`}>
      <span>
        {label} {required && <b>*</b>}
      </span>
      <input
        value={onChange ? value ?? "" : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Enter here"
      />
    </label>
  );
}

function SelectField({
  label,
  required = false,
  value,
  options = [],
  onChange,
}: {
  label: string;
  required?: boolean;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <select
        value={onChange ? value ?? "" : undefined}
        defaultValue={onChange ? undefined : ""}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="" disabled>
          Select here
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TabAnchorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g opacity="0.9">
        <path d="M13.45 11.55L15.5 9.5M10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.4 19.9999C4.93815 18.838 3.87391 17.2501 3.35478 15.4564C2.83564 13.6626 2.88732 11.7518 3.50265 9.98872C4.11797 8.22564 5.26647 6.69762 6.78899 5.61641C8.3115 4.5352 10.1326 3.95435 12 3.95435C13.8674 3.95435 15.6885 4.5352 17.211 5.61641C18.7335 6.69762 19.882 8.22564 20.4974 9.98872C21.1127 11.7518 21.1644 13.6626 20.6452 15.4564C20.1261 17.2501 19.0619 18.838 17.6 19.9999H6.4Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m13.5 6.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 7V4h6v3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6.5 7l1 13h9l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default App;
