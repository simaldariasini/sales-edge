
import { HashRouter } from "react-router-dom";
<HashRouter><App /></HashRouter>
import { useEffect, useMemo, useRef, useState } from "react";
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
  | "Organization Details"
  | "Department Details"
  | "Distribution Details"
  | "Employee Details";

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
  website: string;
  whatsApp: string;
  linkedIn: string;
  groupCompany: string;
  industry: string;
  description: string;
}

const tabOrder: ViewName[] = [
  "Organization",
  "Distribution Channel",
  "Office",
  "Department",
  "Employee",
  "Vehicles",
  "Organization Details",
  "Department Details",
  "Distribution Details",
  "Employee Details",
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

const orgTypeOptions = ["Vendor", "Org", "Customer", "Supplier"];

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

interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  displayName: string;
  acronym: string;
  email: string;
  phone: string;
  department: string;
  office: string;
  organization: string;
  orgCode: string;
  designation: string;
  status: "Active" | "Inactive";
  gender: string;
  joiningDate: string;
}

const employees: Employee[] = [
  { id: 1, employeeCode: "EMP009", firstName: "Ajith", lastName: "Kumar", displayName: "Ajith Kumar", acronym: "AK", email: "vbn@gmail.com", phone: "7410258962", department: "[D002]Account Department", office: "[OFF01]MKG Office", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Salesman", status: "Active", gender: "Male", joiningDate: "01/15/2025" },
  { id: 2, employeeCode: "EMP001", firstName: "Bharath", lastName: "Yadav", displayName: "Bharath Yadav", acronym: "EBY", email: "bharath23@gmail.com", phone: "8639211702", department: "[D111]Sales Department", office: "[OFF01]MKG Office", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Manager", status: "Active", gender: "Male", joiningDate: "02/10/2025" },
  { id: 3, employeeCode: "EMP021", firstName: "Karthik", lastName: "", displayName: "Karthik", acronym: "", email: "karthik@gmail.com", phone: "1234567890", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Manager", status: "Inactive", gender: "Male", joiningDate: "03/05/2025" },
  { id: 4, employeeCode: "EMP019", firstName: "Tillu", lastName: "", displayName: "Tillu", acronym: "", email: "tilly@gmail.com", phone: "9464648484", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Manatee", status: "Inactive", gender: "Male", joiningDate: "03/12/2025" },
  { id: 5, employeeCode: "EMP010", firstName: "Edu Rahul", lastName: "Yadav", displayName: "Rahul Yadav", acronym: "ERY", email: "rahul745@gmail.com", phone: "9886655203", department: "[D111]Sales Department", office: "[OFF01]MKG Office", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Salesman", status: "Active", gender: "Male", joiningDate: "04/01/2025" },
  { id: 6, employeeCode: "-", firstName: "rajesh", lastName: "", displayName: "rajesh", acronym: "", email: "rajeshm@gmail.com", phone: "9640994699", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Store Manager", status: "Active", gender: "Male", joiningDate: "04/15/2025" },
  { id: 7, employeeCode: "-", firstName: "Kumar", lastName: "", displayName: "Kumar", acronym: "", email: "kumar@gmail.com", phone: "9966331234", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Store Incharge", status: "Active", gender: "Male", joiningDate: "05/01/2025" },
  { id: 8, employeeCode: "EMP005", firstName: "Marthand", lastName: "Satya", displayName: "Marthand Satya", acronym: "MS", email: "", phone: "1212121212", department: "[D002]Account Department", office: "[OFF01]MKG Office", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Checker", status: "Inactive", gender: "Male", joiningDate: "05/20/2025" },
  { id: 9, employeeCode: "EMP018", firstName: "hz", lastName: "", displayName: "hz", acronym: "", email: "vabbhs@gam.com", phone: "9494040400", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "gnah", status: "Active", gender: "Male", joiningDate: "06/10/2025" },
  { id: 10, employeeCode: "EMP022", firstName: "Harshith S", lastName: "Reddy", displayName: "Harish Reddy", acronym: "HSR", email: "harish.reddy@gmail.com", phone: "9876511001", department: "[D005]Warehouse", office: "[OFF007]Samsung Hyderabad", organization: "Samsung", orgCode: "ORG-0004", designation: "Service Executive", status: "Active", gender: "Male", joiningDate: "06/25/2025" },
  { id: 11, employeeCode: "EMP027", firstName: "Dinesh", lastName: "Yadav", displayName: "Dinesh Yadav", acronym: "DY", email: "dinesh.yadav@gmail.com", phone: "9876511006", department: "[D005]Warehouse", office: "[OFF007]Samsung Hyderabad", organization: "Samsung", orgCode: "ORG-0004", designation: "Warehouse Manager", status: "Active", gender: "Male", joiningDate: "07/01/2025" },
  { id: 12, employeeCode: "EMP017", firstName: "Arise", lastName: "", displayName: "Arise", acronym: "", email: "Arise@gmail.com", phone: "9767664848", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Salesman", status: "Active", gender: "Male", joiningDate: "07/15/2025" },
  { id: 13, employeeCode: "EMP020", firstName: "Mithil", lastName: "", displayName: "Mithil", acronym: "", email: "mithil@gmail.com", phone: "1212121212", department: "[-]-", office: "[-]-", organization: "MKG Organization", orgCode: "ORG-0002", designation: "Accountant", status: "Inactive", gender: "Male", joiningDate: "08/01/2025" },
];

interface Department {
  id: number;
  departmentCode: string;
  departmentName: string;
  departmentType: string;
  orgCode: string;
  orgName: string;
  officeCode: string;
  officeName: string;
  officeType: string;
  status: string;
}

const departments: Department[] = [
  { id: 1, departmentCode: "yhnbgf", departmentName: "bgdvf", departmentType: "Service", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF007", officeName: "Samsung Hyderabad", officeType: "Regional Office", status: "Active" },
  { id: 2, departmentCode: "D1234", departmentName: "demo23", departmentType: "Supply Chain", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF006", officeName: "Samsung India HO Gurgaon", officeType: "Head Office", status: "Active" },
  { id: 3, departmentCode: "DOO5", departmentName: "Warehouse Operations", departmentType: "Supply Chain", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF007", officeName: "Samsung Hyderabad", officeType: "Regional Office", status: "Active" },
  { id: 4, departmentCode: "DOO1", departmentName: "General Trade Sales", departmentType: "Sales", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF006", officeName: "Samsung India HO Gurgaon", officeType: "Head Office", status: "Active" },
  { id: 5, departmentCode: "DOO04", departmentName: "Sequal", departmentType: "LD125", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF003", officeName: "GKM", officeType: "MainBranch", status: "Active" },
  { id: 6, departmentCode: "DOO02", departmentName: "Account Department", departmentType: "AD554", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF001", officeName: "MKG Office", officeType: "Headoffice", status: "Active" },
  { id: 7, departmentCode: "DOO01", departmentName: "Sales Department", departmentType: "SD123", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF001", officeName: "MKG Office", officeType: "Headoffice", status: "Active" },
];

function App() {
  const [activeTabs, setActiveTabs] = useState<ViewName[]>([]);
  const [activeView, setActiveView] = useState<ViewName | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState(organizations[0]);
  const [showExports, setShowExports] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [showEditDistributionModal, setShowEditDistributionModal] = useState(false);
  const [editDistributionChannel, setEditDistributionChannel] = useState<DistributionChannel | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(departments[0]);
  const [selectedDistributionChannel, setSelectedDistributionChannel] = useState<DistributionChannel | null>(null);
  const [showDeleteDepartmentModal, setShowDeleteDepartmentModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState<Department | null>(null);
  const [organizationSearch, setOrganizationSearch] = useState("");
  const [distributionSearch, setDistributionSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeViewMode, setEmployeeViewMode] = useState<"table" | "grid">("table");
  const [employeeFilterActive, setEmployeeFilterActive] = useState(true);
  const [employeeFilterInactive, setEmployeeFilterInactive] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [employeeActionMenu, setEmployeeActionMenu] = useState<number | null>(null);

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(organizationSearch.toLowerCase()) ||
    organization.code.toLowerCase().includes(organizationSearch.toLowerCase()) ||
    organization.acronym.toLowerCase().includes(organizationSearch.toLowerCase()),
  );

  const filteredDistributionChannels = distributionChannels.filter((channel) =>
    channel.orgName.toLowerCase().includes(distributionSearch.toLowerCase()) ||
    channel.orgCode.toLowerCase().includes(distributionSearch.toLowerCase()) ||
    channel.distributionName.toLowerCase().includes(distributionSearch.toLowerCase()) ||
    channel.distributionCode.toLowerCase().includes(distributionSearch.toLowerCase()),
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.displayName.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.firstName.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.acronym.toLowerCase().includes(employeeSearch.toLowerCase());
    const matchesStatus =
      (employeeFilterActive && emp.status === "Active") ||
      (employeeFilterInactive && emp.status === "Inactive");
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  useEffect(() => {
    const closeExports = () => setShowExports(false);
    document.addEventListener("mousedown", closeExports);
    return () => document.removeEventListener("mousedown", closeExports);
  }, []);

  useEffect(() => {
    const closeActionMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".card-action-menu") && !target.closest(".card-more")) {
        setOpenActionMenu(null);
        setEmployeeActionMenu(null);
      }
    };
    document.addEventListener("mousedown", closeActionMenu);
    return () => document.removeEventListener("mousedown", closeActionMenu);
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

  const showDepartmentDetails = (department: Department) => {
    setSelectedDepartment(department);
    openView("Department Details");
  };

  const showDistributionDetails = (channel: DistributionChannel) => {
    setSelectedDistributionChannel(channel);
    openView("Distribution Details");
  };

  const showEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    openView("Employee Details");
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
    setOpenActionMenu(null);
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
          )}

          {activeView === "Distribution Channel" && (
            <section className="distribution-page">
              <div className="distribution-header">
                <div className="organization-title-row">
                  <h1>Distribution Channels (5)</h1>
                  <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
                    <RefreshIcon />
                  </button>
                </div>

                <div className="distribution-actions" onMouseDown={(event) => event.stopPropagation()}>
                  <label className="distribution-search">
                    <input
                      value={distributionSearch}
                      onChange={(event) => setDistributionSearch(event.target.value)}
                      placeholder="Search Distribution Channels..."
                      aria-label="Search distribution channels"
                    />
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
                    {filteredDistributionChannels.map((channel) => (
                      <tr key={channel.distributionCode}>
                        <td>{channel.id}</td>
                        <td>{channel.orgCode}</td>
                        <td>{channel.orgName}</td>
                        <td>{channel.distributionCode}</td>
                        <td>{channel.distributionName}</td>
                        <td>{channel.status}</td>
                        <td>
                          <div className="table-actions">
                            <button aria-label="View distribution channel" onClick={() => showDistributionDetails(channel)}>
                              <EyeIcon />
                            </button>
                            <button
                              aria-label="Edit distribution channel"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditDistributionChannel(channel);
                                setShowEditDistributionModal(true);
                              }}
                            >
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

          {activeView === "Department" && (
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
                  <button className="new-button add-button">
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
          )}

          {activeView === "Employee" && (
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
          )}

          {activeView === "Office" && (
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

          {activeView === "Distribution Details" && selectedDistributionChannel && (
            <section className="details-page">
              <h1>Distribution Channel Details</h1>
              <article className="details-card">
                <h2>Details</h2>
                <div className="details-grid">
                  <Detail label="Distribution Channel Code" value={selectedDistributionChannel.distributionCode} />
                  <Detail label="Distribution Channel Name" value={selectedDistributionChannel.distributionName} />
                  <Detail label="Organization Code" value={selectedDistributionChannel.orgCode} />
                  <Detail label="Organization Name" value={selectedDistributionChannel.orgName} />
                  <Detail label="Status" value={selectedDistributionChannel.status} />
                </div>
              </article>
            </section>
          )}

          {activeView === "Department Details" && selectedDepartment && (
            <section className="details-page">
              <h1>Department Details</h1>
              <article className="details-card">
                <h2>Details</h2>
                <div className="details-grid">
                  <Detail label="Department Code" value={selectedDepartment.departmentCode} />
                  <Detail label="Department Name" value={selectedDepartment.departmentName} />
                  <Detail label="Department Type" value={selectedDepartment.departmentType} />
                  <Detail label="Organization Code" value={selectedDepartment.orgCode} />
                  <Detail label="Organization Name" value={selectedDepartment.orgName} />
                  <Detail label="Office Code" value={selectedDepartment.officeCode} />
                  <Detail label="Office Name" value={selectedDepartment.officeName} />
                  <Detail label="Office Type" value={selectedDepartment.officeType} />
                  <Detail label="Status" value={selectedDepartment.status} />
                </div>
              </article>
            </section>
          )}

          {activeView === "Employee Details" && selectedEmployee && (
            <section className="details-page">
              <h1>Employee Details</h1>
              <article className="details-card">
                <h2>Details</h2>
                <div className="details-grid">
                  <Detail label="Employee Code" value={selectedEmployee.employeeCode} />
                  <Detail label="First Name" value={selectedEmployee.firstName} />
                  <Detail label="Last Name" value={selectedEmployee.lastName || "-"} />
                  <Detail label="Display Name" value={selectedEmployee.displayName} />
                  <Detail label="Acronym" value={selectedEmployee.acronym || "-"} />
                  <Detail label="Email" value={selectedEmployee.email || "-"} />
                  <Detail label="Phone No" value={selectedEmployee.phone} />
                  <Detail label="Gender" value={selectedEmployee.gender} />
                  <Detail label="Joining Date" value={selectedEmployee.joiningDate} />
                  <Detail label="Department" value={selectedEmployee.department} />
                  <Detail label="Office" value={selectedEmployee.office} />
                  <Detail label="Organization" value={selectedEmployee.organization} />
                  <Detail label="Designation" value={selectedEmployee.designation} />
                  <Detail label="Status" value={selectedEmployee.status} />
                </div>
              </article>
            </section>
          )}

          {!activeView && <div className="empty-state"></div>}
        </main>
      </div>

      {showAddModal && <AddOrganizationModal onClose={() => setShowAddModal(false)} />}
      {showDistributionModal && <AddDistributionModal onClose={() => setShowDistributionModal(false)} />}
      {showEditDistributionModal && editDistributionChannel && (
        <EditDistributionModal
          channel={editDistributionChannel}
          onClose={() => {
            setShowEditDistributionModal(false);
            setEditDistributionChannel(null);
          }}
        />
      )}
      {showEditDepartmentModal && departmentToEdit && (
        <EditDepartmentModal
          department={departmentToEdit}
          onClose={() => {
            setShowEditDepartmentModal(false);
            setDepartmentToEdit(null);
          }}
        />
      )}
      {showDeleteDepartmentModal && departmentToDelete && (
        <DeleteDepartmentModal
          department={departmentToDelete}
          onClose={() => {
            setShowDeleteDepartmentModal(false);
            setDepartmentToDelete(null);
          }}
        />
      )}
      {showAddEmployeeModal && <AddEmployeeModal onClose={() => setShowAddEmployeeModal(false)} />}
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
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<OrganizationForm>({
    organizationName: "",
    legalName: "",
    acronym: "",
    country: "",
    orgType: "",
    email: "",
    mobile: "",
    website: "",
    whatsApp: "",
    linkedIn: "",
    groupCompany: "",
    industry: "",
    description: "",
  });

  const emailError = form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "Invalid email" : "";
  const mobileError = form.mobile && !/^\d+$/.test(form.mobile) ? "Invalid phone number" : "";
  const whatsAppError = form.whatsApp && !/^\d+$/.test(form.whatsApp) ? "Invalid phone number" : "";

  const canContinue = useMemo(
    () =>
      form.organizationName.trim().length > 0 &&
      form.legalName.trim().length > 0 &&
      form.acronym.trim().length > 0 &&
      form.country.trim().length > 0 &&
      form.orgType.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.mobile.trim().length > 0 &&
      !emailError &&
      !mobileError &&
      !whatsAppError,
    [form, emailError, mobileError, whatsAppError],
  );

  const updateField = (field: keyof OrganizationForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAction = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <section className="add-modal org-modal" role="dialog" aria-modal="true" aria-labelledby="add-org-title">
        <div className="modal-heading">
          <div>
            <h2 id="add-org-title">Add New Organization</h2>
            <p>Fill in the details to create a new organization</p>
          </div>
          <div className="stepper">
            <div className="step-item">
              <span className={`step ${step === 1 ? "step-active" : ""}`}>1</span>
              <strong className="step-label">Add New Organization</strong>
            </div>
            <div className="step-item">
              <span className={`step ${step === 2 ? "step-active" : ""}`}>2</span>
              <strong className={`step-preview ${step === 2 ? "" : "step-muted"}`}>Preview</strong>
            </div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className={`modal-body${step === 2 ? " preview-only" : ""}`}>
          {step === 1 ? (
            <>
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
                <TextField label="Email Address" required half value={form.email} error={emailError} onChange={(value) => updateField("email", value)} />
                <TextField label="Mobile Number" required half value={form.mobile} error={mobileError} onChange={(value) => updateField("mobile", value)} />
                <TextField label="Website" half value={form.website} onChange={(value) => updateField("website", value)} />
                <TextField label="WhatsApp Number" half value={form.whatsApp} error={whatsAppError} onChange={(value) => updateField("whatsApp", value)} />
                <TextField label="LinkedIn" half value={form.linkedIn} onChange={(value) => updateField("linkedIn", value)} />
                <TextField label="Group Company Name" half value={form.groupCompany} onChange={(value) => updateField("groupCompany", value)} />
                <TextField label="Industry Group Name" half value={form.industry} onChange={(value) => updateField("industry", value)} />
                <label className="form-field form-full">
                  <span>Description</span>
                  <textarea
                    value={form.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Enter here"
                  />
                </label>
              </div>
            </>
          ) : (
            <div className="preview-card">
              <div className="preview-card-body preview-columns">
                <div className="preview-item preview-item-left">
                  <span>Organization Code</span>
                  <strong>ORG-0005</strong>
                </div>
                <div className="preview-item">
                  <span>Acronym</span>
                  <strong>{form.acronym || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Organization Name</span>
                  <strong>{form.organizationName || "-"}</strong>
                </div>
                <div className="preview-item">
                  <span>Legal Name</span>
                  <strong>{form.legalName || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Org Type</span>
                  <strong>{form.orgType || "-"}</strong>
                </div>
                <div className="preview-item">
                  <span>Country</span>
                  <strong>{form.country || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Email</span>
                  <strong>{form.email || "-"}</strong>
                </div>
                <div className="preview-item">
                  <span>Mobile No</span>
                  <strong>{form.mobile || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>WhatsApp Number</span>
                  <strong>{form.whatsApp || "-"}</strong>
                </div>
                <div className="preview-item">
                  <span>Website</span>
                  <strong>{form.website || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>LinkedIn</span>
                  <strong>{form.linkedIn || "-"}</strong>
                </div>
                <div className="preview-item">
                  <span>Group Company Name</span>
                  <strong>{form.groupCompany || "-"}</strong>
                </div>
                <div className="preview-item preview-item-full preview-item-left">
                  <span>Description</span>
                  <strong>{form.description || "-"}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={() => (step === 1 ? onClose() : setStep(1))}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <div className="form-note">
            <span>i</span>
            {step === 1
              ? "Please fill the required details, click on 'Next' button to proceed"
              : "Verify detailed preview and click on 'Submit' to proceed"}
          </div>
          <div className="footer-actions">
            {step === 2 && (
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            )}
            <button className="next-button" disabled={step === 1 ? !canContinue : false} onClick={handleAction}>
              {step === 1 ? "Next >" : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AddDistributionModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    organization: "",
    distributionName: "",
    description: "",
  });

  const canContinue = useMemo(
    () => form.organization.trim().length > 0 && form.distributionName.trim().length > 0,
    [form],
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAction = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <section className="add-modal distribution-modal" role="dialog" aria-modal="true" aria-labelledby="add-distribution-title">
        <div className="modal-heading">
          <div>
            <h2 id="add-distribution-title">Add Distribution Channel</h2>
          </div>
          <div className="stepper">
            <div className="step-item">
              <span className={`step ${step === 1 ? "step-active" : ""}`}>1</span>
              <strong className="step-label">Add Distribution Channel</strong>
            </div>
            <div className="step-item">
              <span className={`step ${step === 2 ? "step-active" : ""}`}>2</span>
              <strong className={`step-preview ${step === 2 ? "" : "step-muted"}`}>Preview</strong>
            </div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className={`modal-body distribution-modal-body${step === 2 ? " preview-only" : ""}`}>
          {step === 1 ? (
            <div className="distribution-form-grid">
              <label className="code-field form-full">
                <span>
                  Distribution Channel Code <b>*</b>
                </span>
                <strong>DC-0008</strong>
              </label>
              <SelectField
                label="Organization"
                required
                value={form.organization}
                options={organizations.map((organization) => organization.name.replace("...", ""))}
                onChange={(value) => updateField("organization", value)}
              />
              <TextField
                label="Distribution Channel Name"
                required
                half
                value={form.distributionName}
                onChange={(value) => updateField("distributionName", value)}
              />
              <label className="form-field distribution-description form-full">
                <span>Description</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Enter here"
                />
              </label>
            </div>
          ) : (
            <div className="preview-card distribution-preview-card">
              <div className="preview-card-body preview-columns">
                <div className="preview-item preview-item-full preview-item-left">
                  <span>Distribution Channel Code</span>
                  <strong>DC-0008</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Organization</span>
                  <strong>{form.organization || "-"}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Distribution Channel Name</span>
                  <strong>{form.distributionName || "-"}</strong>
                </div>
                <div className="preview-item preview-item-full preview-item-left">
                  <span>Description</span>
                  <strong>{form.description || "-"}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={() => (step === 1 ? onClose() : setStep(1))}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <div className="form-note">
            <span>i</span>
            {step === 1
              ? "Please fill the required details, click on 'Next' button to proceed"
              : "Verify detailed preview and click on 'Submit' to proceed"}
          </div>
          <div className="footer-actions">
            {step === 2 && (
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            )}
            <button className="next-button" disabled={step === 1 ? !canContinue : false} onClick={handleAction}>
              {step === 1 ? "Next >" : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function EditDistributionModal({ channel, onClose }: { channel: DistributionChannel; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    distributionName: channel.distributionName,
    description: "",
  });

  const canContinue = useMemo(() => form.distributionName.trim().length > 0, [form]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAction = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <section className="add-modal distribution-modal" role="dialog" aria-modal="true" aria-labelledby="edit-distribution-title">
        <div className="modal-heading">
          <div>
            <h2 id="edit-distribution-title">Edit Distribution Channel</h2>
          </div>
          <div className="stepper">
            <div className="step-item">
              <span className={`step ${step === 1 ? "step-active" : ""}`}>1</span>
              <strong className="step-label">Edit Distribution Channel</strong>
            </div>
            <div className="step-item">
              <span className={`step ${step === 2 ? "step-active" : ""}`}>2</span>
              <strong className={`step-preview ${step === 2 ? "" : "step-muted"}`}>Preview</strong>
            </div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className={`modal-body distribution-modal-body${step === 2 ? " preview-only" : ""}`}>
          {step === 1 ? (
            <div className="distribution-form-grid">
              <div className="form-field distribution-readonly">
                <span>Organization</span>
                <strong>{channel.orgName}</strong>
              </div>
              <label className="code-field">
                <span>Distribution Channel Code</span>
                <strong>{channel.distributionCode}</strong>
              </label>
              <TextField
                label="Distribution Channel Name"
                required
                half
                value={form.distributionName}
                onChange={(value) => updateField("distributionName", value)}
              />
              <label className="form-field distribution-description">
                <span>Description</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Enter here"
                />
              </label>
            </div>
          ) : (
            <div className="preview-card distribution-preview-card">
              <div className="preview-card-body preview-columns">
                <div className="preview-item preview-item-full preview-item-left">
                  <span>Distribution Channel Code</span>
                  <strong>{channel.distributionCode}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Organization</span>
                  <strong>{channel.orgName}</strong>
                </div>
                <div className="preview-item preview-item-left">
                  <span>Distribution Channel Name</span>
                  <strong>{form.distributionName || "-"}</strong>
                </div>
                <div className="preview-item preview-item-full preview-item-left">
                  <span>Description</span>
                  <strong>{form.description || "-"}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={() => (step === 1 ? onClose() : setStep(1))}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <div className="form-note">
            <span>i</span>
            {step === 1
              ? "Please fill the required details, click on 'Next' button to proceed"
              : "Verify detailed preview and click on 'Submit' to proceed"}
          </div>
          <div className="footer-actions">
            {step === 2 && (
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            )}
            <button className="next-button" disabled={!canContinue} onClick={handleAction}>
              {step === 1 ? "Next >" : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function EditDepartmentModal({ department, onClose }: { department: Department; onClose: () => void }) {
  const [form, setForm] = useState({
    departmentName: department.departmentName,
    departmentType: department.departmentType,
    departmentCode: department.departmentCode,
    officeName: department.officeName,
    status: department.status,
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="modal-backdrop">
      <section className="add-modal distribution-modal" role="dialog" aria-modal="true" aria-labelledby="edit-department-title">
        <div className="modal-heading">
          <div>
            <h2 id="edit-department-title">Edit Department</h2>
            <p>Edit the department information below</p>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal-body distribution-modal-body">
          <div className="distribution-form-grid">
            <div className="form-field distribution-readonly">
              <span>Org</span>
              <strong>{department.orgCode}</strong>
            </div>
            <div className="form-field distribution-readonly">
              <span>Office</span>
              <strong>{department.officeName}</strong>
            </div>
            <TextField label="Department Code" required half value={form.departmentCode} onChange={(value) => updateField("departmentCode", value)} />
            <TextField label="Department Type" required half value={form.departmentType} onChange={(value) => updateField("departmentType", value)} />
            <TextField label="Department Name" required half value={form.departmentName} onChange={(value) => updateField("departmentName", value)} />
            
          </div>
        </div>

        <div className="modal-footer">
          <div className="form-note">
            <span>i</span>
            Please fill the required details, click on 'Next' button to proceed
          </div>
          <div className="footer-actions">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="next-button" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function DeleteDepartmentModal({ department, onClose }: { department: Department; onClose: () => void }) {
  const [comments, setComments] = useState("");

  return (
    <div className="modal-backdrop">
      <section className="add-modal distribution-modal" role="dialog" aria-modal="true" aria-labelledby="delete-department-title">
        <div className="modal-heading">
          <div>
            <h2 id="delete-department-title">Delete Department {department.departmentName} - {department.departmentType}</h2>
            <p>Are you sure you want to delete this Department?</p>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal-body distribution-modal-body">
          <label className="form-field distribution-description">
            <span>Comments</span>
            <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="Enter your comments here"
            />
          </label>
        </div>

        <div className="modal-footer">
          <div className="form-note">
            <span>i</span>
            The department will be removed from the list after confirmation.
          </div>
          <div className="footer-actions">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="next-button" onClick={onClose}>
              Yes, Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState({
    employeeCode: "EMP029",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    acronym: "",
    gender: "",
    joiningDate: "",
    organization: "",
    office: "",
    department: "",
    employmentType: "",
    designation: "",
    manager: "",
    grade: "",
    effectiveStartDate: "",
    deskPhone: "",
    sittingLocation: "",
    birthDate: "",
    isMarried: false,
    marriageDate: "",
    mobile: "",
    alternativeMobile: "",
    personalEmail: "",
    officeEmail: "",
    nationality: "",
    remarks: "",
    employeeImage: "",
  });

  const canContinueEmployee = useMemo(
    () =>
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.displayName.trim().length > 0 &&
      form.acronym.trim().length > 0 &&
      form.gender.trim().length > 0 &&
      form.joiningDate.trim().length > 0,
    [form],
  );

  const canContinueJob = useMemo(
    () =>
      form.organization.trim().length > 0 &&
      form.office.trim().length > 0 &&
      form.department.trim().length > 0 &&
      form.employmentType.trim().length > 0 &&
      form.designation.trim().length > 0 &&
      form.grade.trim().length > 0 &&
      form.effectiveStartDate.trim().length > 0,
    [form],
  );

  const mobileError = form.mobile && !/^\d+$/.test(form.mobile) ? "Invalid number" : "";
  const alternativeMobileError = form.alternativeMobile && !/^\d+$/.test(form.alternativeMobile) ? "Invalid number" : "";
  const deskPhoneError = form.deskPhone && !/^\d+$/.test(form.deskPhone) ? "Invalid number" : "";
  const personalEmailError = form.personalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.personalEmail) ? "Invalid email" : "";
  const officeEmailError = form.officeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.officeEmail) ? "Invalid email" : "";

  const canContinueContact = useMemo(
    () =>
      form.birthDate.trim().length > 0 &&
      form.mobile.trim().length > 0 &&
      form.nationality.trim().length > 0 &&
      !mobileError &&
      !alternativeMobileError &&
      !deskPhoneError &&
      !personalEmailError &&
      !officeEmailError,
    [form, mobileError, alternativeMobileError, deskPhoneError, personalEmailError, officeEmailError],
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateBooleanField = (field: "isMarried", value: boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const goBack = () => {
    if (step === 1) {
      onClose();
      return;
    }
    setStep((current) => (current - 1) as 1 | 2 | 3 | 4);
  };

  const goNext = () => {
    if (step === 4) {
      onClose();
      return;
    }
    setStep((current) => (current + 1) as 1 | 2 | 3 | 4);
  };

  const canContinue = step === 1 ? canContinueEmployee : step === 2 ? canContinueJob : step === 3 ? canContinueContact : true;

  return (
    <div className="modal-backdrop">
      <section className="add-modal employee-modal" role="dialog" aria-modal="true" aria-labelledby="add-employee-title">
        <div className="modal-heading employee-modal-heading">
          <div>
            <h2 id="add-employee-title">Add New Employee</h2>
            <p>Fill in the details of the new employee</p>
          </div>
          <div className="stepper employee-stepper">
            {["Add Employee", "Job Position Details", "Contact Details", "Preview"].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isComplete = stepNumber < step;
              return (
                <div className="step-item" key={label}>
                  <span className={`step ${isActive ? "step-active" : ""} ${isComplete ? "step-complete" : ""}`}>{stepNumber}</span>
                  <strong className={isActive ? "employee-step-active-label" : isComplete ? "employee-step-complete-label" : "employee-step-muted-label"}>
                    {label}
                  </strong>
                </div>
              );
            })}
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal-body employee-modal-body">
          {step === 1 ? (
            <div className="employee-form-grid">
              <label className="code-field employee-code-field">
                <span>
                  Employee Code <b>*</b>
                </span>
                <strong>{form.employeeCode}</strong>
              </label>
              <div className="employee-grid-spacer" />
              <TextField label="Middle Name" half value={form.middleName} placeholder="Enter Middle Name" onChange={(value) => updateField("middleName", value)} />
              <TextField label="First Name" required half value={form.firstName} placeholder="Enter First Name" onChange={(value) => updateField("firstName", value)} />
              <TextField label="Display Name" required half value={form.displayName} placeholder="Enter Display Name" onChange={(value) => updateField("displayName", value)} />
              <TextField label="Last Name" required half value={form.lastName} placeholder="Enter Last Name" onChange={(value) => updateField("lastName", value)} />
              <SelectField label="Gender" required value={form.gender} placeholder="Select Gender" options={["Male", "Female", "Other"]} onChange={(value) => updateField("gender", value)} />
              <TextField label="Acronym" required half value={form.acronym} placeholder="Enter Acronym" onChange={(value) => updateField("acronym", value)} />
              <DateField label="Joining Date" required value={form.joiningDate} placeholder="Select Joining Date" onChange={(value) => updateField("joiningDate", value)} />
              <div className="employee-upload">
                <span>Employee Image</span>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => updateField("employeeImage", event.target.files?.[0]?.name ?? "")}
                  />
                  <CameraIcon />
                  {form.employeeImage || "Upload Image"}
                </label>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="employee-form-grid employee-job-grid">
              <SelectField label="Organization" required value={form.organization} placeholder="Select Organization" options={["Metro Cash & Carry", "MKG Organization", "Samsung"]} onChange={(value) => updateField("organization", value)} />
              <SelectField label="Office" required value={form.office} placeholder="Select Office" options={["OFFOO1 - MKG Office", "OFFOO1 - KG Office", "OFFOO3 - Mastishka", "OFFOO4 - GKM"]} onChange={(value) => updateField("office", value)} />
              <SelectField label="Department" required value={form.department} placeholder="Select Department" options={["Account Department", "Technical Department", "Demo 1"]} onChange={(value) => updateField("department", value)} />
              <SelectField label="Employment Type" required value={form.employmentType} placeholder="Select Employment Type" options={["Full Time", "Part Time", "Contract"]} onChange={(value) => updateField("employmentType", value)} />
              <SelectField label="Designation" required value={form.designation} placeholder="Select Designation" options={["Checker", "Accountant", "Salesman", "Warehouse Manager", "Manager", "Admin"]} onChange={(value) => updateField("designation", value)} />
              <SelectField label="Manager" value={form.manager} placeholder="Select Manager" options={["manager 1", "manager2"]} onChange={(value) => updateField("manager", value)} />
              <SelectField label="Grade" required value={form.grade} placeholder="Select Grade" options={["G1-L1", "G1-L2", "G1-L3", "G3-L1"]} onChange={(value) => updateField("grade", value)} />
              <DateField label="Effective Start Date" required value={form.effectiveStartDate} placeholder="Select Effective Start Date" onChange={(value) => updateField("effectiveStartDate", value)} />
            </div>
          ) : step === 3 ? (
            <div className="employee-form-grid employee-contact-grid">
              <NumberField label="Desk Phone" value={form.deskPhone} placeholder="Enter Desk Phone" error={deskPhoneError} onChange={(value) => updateField("deskPhone", value)} />
              <TextField label="Sitting Location" half value={form.sittingLocation} placeholder="Enter Sitting Location" onChange={(value) => updateField("sittingLocation", value)} />
              <DateField label="Birth Date" required value={form.birthDate} placeholder="Select Birth Date" onChange={(value) => updateField("birthDate", value)} />
              <ToggleField label="Is Married" checked={form.isMarried} onChange={(value) => updateBooleanField("isMarried", value)} />
              {form.isMarried && <DateField label="Marriage Date" value={form.marriageDate} placeholder="Select Marriage Date" onChange={(value) => updateField("marriageDate", value)} />}
              <NumberField label="Mobile" required value={form.mobile} placeholder="Enter Mobile" error={mobileError} onChange={(value) => updateField("mobile", value)} />
              <NumberField label="Alternative Mobile" value={form.alternativeMobile} placeholder="Enter Alternative Mobile" error={alternativeMobileError} onChange={(value) => updateField("alternativeMobile", value)} />
              <EmailField label="Personal Email" value={form.personalEmail} placeholder="Enter Personal Email" error={personalEmailError} onChange={(value) => updateField("personalEmail", value)} />
              <EmailField label="Office Email" value={form.officeEmail} placeholder="Enter Office Email" error={officeEmailError} onChange={(value) => updateField("officeEmail", value)} />
              <SelectField
                label="Nationality"
                required
                value={form.nationality}
                placeholder="Select Nationality"
                options={nationalityOptions}
                onChange={(value) => updateField("nationality", value)}
              />
              <label className="form-field employee-remarks">
                <span>Remarks</span>
                <textarea value={form.remarks} onChange={(event) => updateField("remarks", event.target.value)} placeholder="Enter Remarks" />
              </label>
            </div>
          ) : (
            <div className="employee-preview-grid">
              <PreviewItem label="Employee Code" value={form.employeeCode} />
              <PreviewItem label="First Name" value={form.firstName} />
              <PreviewItem label="Middle Name" value={form.middleName} />
              <PreviewItem label="Last Name" value={form.lastName} />
              <PreviewItem label="Display Name" value={form.displayName} />
              <PreviewItem label="Acronym" value={form.acronym} />
              <PreviewItem label="Gender" value={form.gender} />
              <PreviewItem label="Joining Date" value={form.joiningDate} />
              <PreviewItem label="Employment Type" value={form.employmentType} />
              <PreviewItem label="Designation" value={form.designation} />
              <PreviewItem label="Grade" value={form.grade} />
              <PreviewItem label="Manager" value={form.manager} />
              <PreviewItem label="Organization" value={form.organization} />
              <PreviewItem label="Office" value={form.office} />
              <PreviewItem label="Department" value={form.department} />
              <PreviewItem label="Birth Date" value={form.birthDate} />
              <PreviewItem label="Mobile" value={form.mobile} />
              <PreviewItem label="Personal Email" value={form.personalEmail} />
            </div>
          )}
        </div>

        <div className="modal-footer employee-modal-footer">
          {step > 1 && (
            <button className="cancel-button employee-back-button" onClick={goBack}>
              <BackIcon /> Back
            </button>
          )}
          <div className="form-note">
            <InfoIcon />
            {step === 1
              ? "Please fill the required details, click on 'Next' button to proceed"
              : step === 4
                ? "Verify detailed preview and click on 'Submit' to proceed"
                : "To modify the previous details, click on 'Back' button"}
          </div>
          <div className="footer-actions">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="next-button"
              disabled={!canContinue}
              onClick={goNext}
            >
              {step === 4 ? "Submit" : "Next"} <ChevronRightIcon />
            </button>
          </div>
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
  error,
  placeholder = "Enter here",
  onChange,
}: {
  label: string;
  required?: boolean;
  half?: boolean;
  value?: string;
  error?: string;
  placeholder?: string;
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
        placeholder={placeholder}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function NumberField({
  label,
  required = false,
  value,
  placeholder,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <input inputMode="numeric" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {error && <small className="field-error employee-field-error">{error}</small>}
    </label>
  );
}

function EmailField({
  label,
  value,
  placeholder,
  error,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input type="email" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {error && <small className="field-error employee-field-error">{error}</small>}
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="form-field employee-toggle-field">
      <span>{label}</span>
      <button type="button" className={`employee-toggle ${checked ? "employee-toggle-on" : ""}`} onClick={() => onChange(!checked)}>
        <i>{checked ? "✓" : ""}</i>
      </button>
      <strong>{checked ? "Yes" : "No"}</strong>
    </div>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="employee-preview-item">
      <span>{label}</span>
      <strong>{value || "-"}</strong>
    </div>
  );
}

function SelectField({
  label,
  required = false,
  value,
  options = [],
  placeholder = "Select here",
  onChange,
}: {
  label: string;
  required?: boolean;
  value?: string;
  options?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValue = value ?? "";

  return (
    <label className="form-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <div className="soft-select">
        <button type="button" onClick={() => setIsOpen((current) => !current)}>
          <em className={selectedValue ? "" : "soft-select-placeholder"}>{selectedValue || placeholder}</em>
          <ChevronDownIcon />
        </button>
        {isOpen && (
          <div className="soft-select-menu">
            {options.map((option) => (
              <button
                type="button"
                className={option === selectedValue ? "soft-select-selected" : ""}
                key={option}
                onClick={() => {
                  onChange?.(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const nationalityOptions = [
  "Indian",
  "American",
  "British",
  "Australian",
  "Canadian",
  "Chinese",
  "French",
  "German",
  "Indonesian",
  "Italian",
  "Japanese",
  "Malaysian",
  "Mexican",
  "Nepalese",
  "Singaporean",
  "South African",
  "Sri Lankan",
  "Thai",
  "UAE",
  "Other",
];

function formatDateValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
}

function parseDateValue(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function DateField({
  label,
  required = false,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const selectedDate = parseDateValue(value);
  const fieldRef = useRef<HTMLLabelElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date(2026, 2, 1));
  const [calendarPosition, setCalendarPosition] = useState({ left: 0, top: 0 });
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const leadingBlanks = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const moveMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  const selectDay = (day: number) => {
    onChange(formatDateValue(new Date(year, month, day)));
    setIsOpen(false);
  };

  const placeCalendar = () => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;

    const calendarWidth = 320;
    const calendarHeight = 360;
    const gap = 6;
    const viewportPadding = 12;
    const hasRoomBelow = rect.bottom + gap + calendarHeight <= window.innerHeight - viewportPadding;
    const top = hasRoomBelow
      ? rect.bottom + gap
      : Math.max(viewportPadding, rect.top - calendarHeight - gap);
    const left = Math.min(rect.left, window.innerWidth - calendarWidth - viewportPadding);

    setCalendarPosition({ left: Math.max(viewportPadding, left), top });
  };

  const toggleCalendar = () => {
    placeCalendar();
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    if (!isOpen) return;

    placeCalendar();
    window.addEventListener("resize", placeCalendar);
    window.addEventListener("scroll", placeCalendar, true);

    return () => {
      window.removeEventListener("resize", placeCalendar);
      window.removeEventListener("scroll", placeCalendar, true);
    };
  }, [isOpen]);

  return (
    <label className="form-field date-field" ref={fieldRef}>
      <span>
        {label} {required && <b>*</b>}
      </span>
      <input
        type="text"
        readOnly
        value={value}
        placeholder={placeholder}
        onClick={toggleCalendar}
      />
      <button type="button" className="date-icon-button" aria-label={`Open ${label} calendar`} onClick={toggleCalendar}>
        <CalendarIcon />
      </button>
      {isOpen && (
        <div className="calendar-popover" style={{ left: calendarPosition.left, top: calendarPosition.top }}>
          <div className="calendar-heading">
            <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month">
              <ChevronLeftIcon />
            </button>
            <strong>{monthNames[month]} {year}</strong>
            <button type="button" onClick={() => moveMonth(1)} aria-label="Next month">
              <ChevronRightIcon />
            </button>
          </div>
          <div className="calendar-weekdays">
            {["M", "T", "W", "T", "F", "S", "S"].map((weekday, index) => (
              <span key={`${weekday}-${index}`}>{weekday}</span>
            ))}
          </div>
          <div className="calendar-grid">
            <span className="calendar-month-label">{monthNames[month]}</span>
            {Array.from({ length: leadingBlanks }).map((_, index) => (
              <i key={`blank-${index}`} />
            ))}
            {days.map((day) => {
              const isSelected = selectedDate?.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;
              return (
                <button type="button" className={isSelected ? "calendar-day-selected" : ""} key={day} onClick={() => selectDay(day)}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
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

function GridIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="3" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="12" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="12" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 6h12M8 12h12M8 18h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4l2.2 4.7-1.8 1.4c1.1 2.2 2.8 3.9 5 5l1.5-1.8L18.5 16l-1.2 3.2c-.3.8-1.1 1.2-1.9 1C9.5 18.8 5.1 14.5 3.8 8.6c-.2-.8.3-1.6 1-1.9L7 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 7l1.5-2h5L16 7h2.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-7A2.5 2.5 0 0 1 5.5 7H8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3v4M16 3v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v6M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default App;
