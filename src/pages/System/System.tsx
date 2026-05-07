import { useEffect, useMemo, useRef, useState } from "react";
import Topbar from "../../components/navbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DepartmentPage from "./Department";
import DistributionChannelPage from "./DistributionChannel";
import EmployeePage from "./Employee";
import OfficePage from "./Office";
import OrganizationPage from "./Organization";
import { countryOptions, departments, distributionChannels, employees, offices, organizations, orgTypeOptions, tabOrder, type Department, type DistributionChannel, type Employee, type Organization, type OrganizationForm, type ViewName } from "./data";
import { BackIcon, CalendarIcon, CameraIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon, TabAnchorIcon } from "./SystemIcons";

function System() {
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
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
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
            <OrganizationPage filteredOrganizations={filteredOrganizations} organizationSearch={organizationSearch} setOrganizationSearch={setOrganizationSearch} handleRefresh={handleRefresh} setShowAddModal={setShowAddModal} showExports={showExports} setShowExports={setShowExports} showOrganizationDetails={showOrganizationDetails} openActionMenu={openActionMenu} setOpenActionMenu={setOpenActionMenu} />
          )}
          {activeView === "Distribution Channel" && (
            <DistributionChannelPage filteredDistributionChannels={filteredDistributionChannels} distributionSearch={distributionSearch} setDistributionSearch={setDistributionSearch} handleRefresh={handleRefresh} setShowDistributionModal={setShowDistributionModal} showExports={showExports} setShowExports={setShowExports} showDistributionDetails={showDistributionDetails} setEditDistributionChannel={setEditDistributionChannel} setShowEditDistributionModal={setShowEditDistributionModal} />
          )}
          {activeView === "Department" && (
            <DepartmentPage departments={departments} departmentSearch={departmentSearch} setDepartmentSearch={setDepartmentSearch} handleRefresh={handleRefresh} showExports={showExports} setShowExports={setShowExports} showDepartmentDetails={showDepartmentDetails} setDepartmentToEdit={setDepartmentToEdit} setShowEditDepartmentModal={setShowEditDepartmentModal} setDepartmentToDelete={setDepartmentToDelete} setShowDeleteDepartmentModal={setShowDeleteDepartmentModal} setShowAddDepartmentModal={setShowAddDepartmentModal} />
          )}
          {activeView === "Employee" && (
            <EmployeePage employees={employees} filteredEmployees={filteredEmployees} employeeSearch={employeeSearch} setEmployeeSearch={setEmployeeSearch} employeeViewMode={employeeViewMode} setEmployeeViewMode={setEmployeeViewMode} employeeFilterActive={employeeFilterActive} setEmployeeFilterActive={setEmployeeFilterActive} employeeFilterInactive={employeeFilterInactive} setEmployeeFilterInactive={setEmployeeFilterInactive} employeeActionMenu={employeeActionMenu} setEmployeeActionMenu={setEmployeeActionMenu} setShowAddEmployeeModal={setShowAddEmployeeModal} showExports={showExports} setShowExports={setShowExports} showEmployeeDetails={showEmployeeDetails} handleRefresh={handleRefresh} />
          )}
          {activeView === "Office" && (
            <OfficePage offices={offices} handleRefresh={handleRefresh} showExports={showExports} setShowExports={setShowExports} />
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
      {showAddDepartmentModal && <AddDepartmentModal onClose={() => setShowAddDepartmentModal(false)} />}
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

function AddDepartmentModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    organization: "",
    office: "",
    departmentCode: "",
    departmentType: "",
    departmentName: "",
  });

  const canContinue = useMemo(
    () =>
      form.organization.trim().length > 0 &&
      form.office.trim().length > 0 &&
      form.departmentCode.trim().length > 0 &&
      form.departmentType.trim().length > 0 &&
      form.departmentName.trim().length > 0,
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
      <section className="add-modal department-modal" role="dialog" aria-modal="true" aria-labelledby="add-department-title">
        <div className="modal-heading department-modal-heading">
          <div>
            <h2 id="add-department-title">Create New Department</h2>
          </div>
          <div className="stepper department-stepper">
            <div className="step-item">
              <span className={`step ${step === 1 ? "step-active" : ""}`}>1</span>
              <strong className={step === 1 ? "department-step-active-label" : ""}>Create New Department</strong>
            </div>
            <div className="step-item">
              <span className={`step ${step === 2 ? "step-active" : ""}`}>2</span>
              <strong className={step === 2 ? "department-step-active-label" : ""}>Preview</strong>
            </div>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            x
          </button>
        </div>

        <div className={`modal-body department-modal-body${step === 2 ? " preview-only" : ""}`}>
          {step === 1 ? (
            <div className="department-form-grid">
              <SelectField
                label="Org"
                required
                value={form.organization}
                options={["Reliance", "samsung", "test", "Mastishka", "MKG Organization", "Metro Carry and Cash"]}
                onChange={(value) => updateField("organization", value)}
              />
              <SelectField
                label="Office"
                required
                value={form.office}
                options={["OFFOO5 - Metro Hyderabad Store"]}
                onChange={(value) => updateField("office", value)}
              />
              <TextField
                label="Department Code"
                required
                half
                value={form.departmentCode}
                placeholder="Enter Department Code"
                onChange={(value) => updateField("departmentCode", value)}
              />
              <SelectField
                label="Department Type"
                required
                value={form.departmentType}
                options={["Logistic Department", "Sales  Department", "Service Department", "Account Department"]}
                onChange={(value) => updateField("departmentType", value)}
              />
              <TextField
                label="Department Name"
                required
                half
                value={form.departmentName}
                placeholder="Enter Department Name"
                onChange={(value) => updateField("departmentName", value)}
              />
            </div>
          ) : (
            <div className="department-preview-card">
              <PreviewItem label="Org" value={form.organization} />
              <PreviewItem label="Office" value={form.office} />
              <PreviewItem label="Department Code" value={form.departmentCode} />
              <PreviewItem label="Department Type" value={form.departmentType} />
              <PreviewItem label="Department Name" value={form.departmentName} />
            </div>
          )}
        </div>

        <div className="modal-footer department-modal-footer">
          {step === 2 && (
            <button className="cancel-button department-back-button" onClick={() => setStep(1)}>
              <BackIcon /> Back
            </button>
          )}
          <div className="form-note">
            <InfoIcon />
            {step === 1
              ? "Please fill the required details, click on 'Next' button to proceed"
              : "Verify detailed preview and click on 'Submit' to proceed"}
          </div>
          <div className="footer-actions">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="next-button" disabled={step === 1 ? !canContinue : false} onClick={handleAction}>
              {step === 1 ? "Next" : "Submit"} <ChevronRightIcon />
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
        <i>{checked ? "?" : ""}</i>
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

export default System;
