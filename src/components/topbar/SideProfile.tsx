import { useMemo, useRef, useState, type ChangeEvent } from "react";
import fileIcon from "../../assets/file.png";
import homeIcon from "../../assets/home.png";
import idIcon from "../../assets/id.png";

type ProfileSection = "profile" | "addresses" | "contacts" | "identities" | "history";
type ModalStep = 1 | 2;

interface ContactForm {
  mobile: string;
  alternativeMobile: string;
  whatsapp: string;
  personalEmail: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  website: string;
  instagram: string;
}

interface IdentityForm {
  type: string;
  number: string;
  name: string;
  issuedBy: string;
  document: string;
}

interface IdentityItem extends IdentityForm {
  id: number;
}

const profileDetails = [
  ["Employee Code", "12345"],
  ["First Name", "Krishna Kumar"],
  ["Middle Name", "-"],
  ["Last Name", "Kumar"],
  ["Display Name", "Krishna Kumar"],
  ["Acronym", "KK"],
  ["Gender", "Male"],
  ["Birth Date", "1997-02-05"],
  ["Joining Date", "2026-01-01"],
  ["Is Married", "Yes"],
  ["Marriage Date", "2026-01-01"],
  ["Nationality", "India"],
  ["Designation", "Manager"],
  ["Grade", "L1"],
  ["Mobile", "3456789011"],
  ["Office Email", "krishnakk@gmail.com"],
  ["Personal Email", "krishnakk@gmail.com"],
  ["Status", "Active"],
  ["Remarks", "Testing things"],
];

const initialContact: ContactForm = {
  mobile: "8099153877",
  alternativeMobile: "1234567890",
  whatsapp: "8099153877",
  personalEmail: "suresh@gmail.com",
  linkedin: "-",
  facebook: "-",
  twitter: "-",
  website: "-",
  instagram: "-",
};

const initialIdentity: IdentityItem[] = [
  { id: 1, type: "Voter Id", number: "wer", name: "dfghj=d", issuedBy: "Government", document: "Group.svg" },
  { id: 2, type: "Voter Id", number: "123456", name: "qwert", issuedBy: "Government", document: "org.svg" },
];

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 7l1.5-2h5L16 7h2.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-7A2.5 2.5 0 0 1 5.5 7H8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="19" r="1.8" fill="currentColor" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v10m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17v3h14v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
    </svg>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="profile-detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, required = false, value, placeholder, onChange }: { label: string; required?: boolean; value: string; placeholder: string; onChange: (value: string) => void }) {
  return (
    <label className="profile-modal-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, required = false, value, placeholder, options, onChange }: { label: string; required?: boolean; value: string; placeholder: string; options: string[]; onChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <label className="profile-modal-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <div className="profile-soft-select">
        <button type="button" onClick={() => setIsOpen((current) => !current)}>
          <em className={value ? "" : "profile-soft-select-placeholder"}>{value || placeholder}</em>
          <ChevronRightIcon />
        </button>
        {isOpen && (
          <div className="profile-soft-select-menu">
            {options.map((option) => (
              <button
                type="button"
                className={option === value ? "profile-soft-select-selected" : ""}
                key={option}
                onClick={() => {
                  onChange(option);
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

function StepHeader({ title, step, firstLabel, onClose }: { title: string; step: ModalStep; firstLabel: string; onClose: () => void }) {
  return (
    <div className="profile-modal-heading">
      <h2>{title}</h2>
      <div className="profile-modal-stepper">
        <span className="profile-step-item">
          <i className={step === 1 ? "profile-step-active" : ""}>1</i> {firstLabel}
        </span>
        <span className="profile-step-item">
          <i className={step === 2 ? "profile-step-active" : ""}>2</i> Preview
        </span>
        <button className="profile-modal-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

function ModalFooter({ canContinue, finalStep, onCancel, onNext }: { canContinue: boolean; finalStep: boolean; onCancel: () => void; onNext: () => void }) {
  return (
    <div className="profile-modal-footer">
      <div className="profile-form-note">
        <InfoIcon />
        {finalStep ? "Verify detailed preview and click on 'Submit' to proceed" : "Please fill the required details, click on 'Next' button to proceed"}
      </div>
      <div className="profile-modal-actions">
        <button className="profile-cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="profile-next-button" disabled={!canContinue} onClick={onNext}>
          {finalStep ? "Submit" : "Next"} <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

export default function SideProfile() {
  const [section, setSection] = useState<ProfileSection>("profile");
  const [avatarName, setAvatarName] = useState("");
  const [contact, setContact] = useState(initialContact);
  const [contactDraft, setContactDraft] = useState(initialContact);
  const [contactStep, setContactStep] = useState<ModalStep>(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [identities, setIdentities] = useState(initialIdentity);
  const [identityDraft, setIdentityDraft] = useState<IdentityForm>({ type: "", number: "", name: "", issuedBy: "", document: "" });
  const [identityStep, setIdentityStep] = useState<ModalStep>(1);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [identityMenu, setIdentityMenu] = useState<number | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const details = useMemo(() => profileDetails.map(([label, value]) => <DetailItem key={label} label={label} value={value} />), []);

  const updateContact = (field: keyof ContactForm, value: string) => setContactDraft((current) => ({ ...current, [field]: value }));
  const updateIdentity = (field: keyof IdentityForm, value: string) => setIdentityDraft((current) => ({ ...current, [field]: value }));
  const contactCanContinue = Boolean(contactDraft.mobile.trim() && contactDraft.alternativeMobile.trim() && contactDraft.whatsapp.trim() && contactDraft.personalEmail.trim());
  const identityCanContinue = Boolean(identityDraft.type.trim() && identityDraft.number.trim() && identityDraft.name.trim() && identityDraft.issuedBy.trim());

  const openContactEditor = () => {
    setContactDraft(contact);
    setContactStep(1);
    setShowContactModal(true);
  };

  const openIdentityEditor = () => {
    setIdentityDraft({ type: "", number: "", name: "", issuedBy: "", document: "" });
    setIdentityStep(1);
    setShowIdentityModal(true);
  };

  const saveContact = () => {
    setContact(contactDraft);
    setShowContactModal(false);
  };

  const saveIdentity = () => {
    setIdentities((current) => [...current, { id: Date.now(), ...identityDraft }]);
    setShowIdentityModal(false);
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => setAvatarName(event.target.files?.[0]?.name ?? "");
  const handleIdentityFile = (event: ChangeEvent<HTMLInputElement>) => updateIdentity("document", event.target.files?.[0]?.name ?? "");

  return (
    <div className="profile-workspace">
      <aside className="side-profile">
        <span className="side-profile-badge">Full Time</span>
        <div className="side-profile-avatar">
          <span>{avatarName ? avatarName.slice(0, 2).toUpperCase() : "No Image"}</span>
          <button aria-label="Upload profile image" onClick={() => photoInputRef.current?.click()}>
            <CameraIcon />
          </button>
          <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <h2>Krishna Kumar (KK)</h2>
        <p>Manager</p>
        <nav className="side-profile-nav">
          {[
            ["profile", "Profile"],
            ["addresses", "Addresses"],
            ["contacts", "Contacts"],
            ["identities", "Identities"],
            ["history", "History"],
          ].map(([key, label]) => (
            <button key={key} className={section === key ? "side-profile-nav-active" : ""} onClick={() => setSection(key as ProfileSection)}>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="profile-content">
        {section === "profile" && (
          <>
            <h1>Profile</h1>
            <article className="profile-details-card">
              <h2>Details</h2>
              <div className="profile-detail-grid">{details}</div>
            </article>
          </>
        )}

        {section === "addresses" && (
          <>
            <h1>Addresses</h1>
            <article className="profile-address-card">
              <div className="profile-address-title">
                <img src={homeIcon} alt="" />
                <strong>Primary Address</strong>
                <button aria-label="Address options"><MoreIcon /></button>
              </div>
              <p>301, 3rd floor - Balaji Apartments, Street No 8, Majid Banda, Near Rising High School, Gachibowli, Hyderabad. 500090</p>
            </article>
          </>
        )}

        {section === "contacts" && (
          <>
            <div className="profile-section-header">
              <h1>Contact Details</h1>
              <button className="profile-primary-button" onClick={openContactEditor}><span>+</span> Edit</button>
            </div>
            <article className="profile-details-card">
              <h2>Contact Details</h2>
              <div className="profile-detail-grid">
                <DetailItem label="Mobile" value={contact.mobile} />
                <DetailItem label="Alternative Mobile" value={contact.alternativeMobile} />
                <DetailItem label="WhatsApp" value={contact.whatsapp} />
                <DetailItem label="Personal Email" value={contact.personalEmail} />
                <DetailItem label="LinkedIn" value={contact.linkedin} />
                <DetailItem label="Facebook" value={contact.facebook} />
                <DetailItem label="Twitter" value={contact.twitter} />
                <DetailItem label="Website" value={contact.website} />
                <DetailItem label="Instagram" value={contact.instagram} />
              </div>
            </article>
          </>
        )}

        {section === "identities" && (
          <>
            <div className="profile-section-header">
              <h1>Identities ({identities.length})</h1>
              <button className="profile-primary-button" onClick={openIdentityEditor}><span>+</span> New</button>
            </div>
            <div className="identity-grid">
              {identities.map((identity) => (
                <article className="identity-card" key={identity.id}>
                  <div className="identity-card-top">
                    <img src={idIcon} alt="" />
                    <div>
                      <h2>{identity.type}</h2>
                      <p>{identity.name} <span>•</span> {identity.number}</p>
                    </div>
                    <button aria-label="Identity options" onClick={() => setIdentityMenu((current) => (current === identity.id ? null : identity.id))}><MoreIcon /></button>
                    {identityMenu === identity.id && (
                      <div className="identity-action-menu">
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    )}
                  </div>
                  <p className="identity-issued">Issue By : {identity.issuedBy}</p>
                  <h3>Attachments (1)</h3>
                  <div className="identity-attachment">
                    <img src={fileIcon} alt="" />
                    <div>
                      <strong>{identity.document}</strong>
                      <span>Mar 25, 2026 • 3 KB</span>
                    </div>
                    <button aria-label="Download attachment"><DownloadIcon /></button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {section === "history" && (
          <article className="profile-history">
            <h1>History</h1>
            <p>No history records found for this employee.</p>
          </article>
        )}
      </section>

      {showContactModal && (
        <div className="profile-modal-backdrop">
          <section className="profile-edit-modal" role="dialog" aria-modal="true">
            <StepHeader title="Edit Contact" step={contactStep} firstLabel="Edit Contact" onClose={() => setShowContactModal(false)} />
            <div className="profile-modal-body">
              {contactStep === 1 ? (
                <div className="profile-modal-grid">
                  <Field label="Mobile No" required value={contactDraft.mobile} placeholder="Enter Mobile No" onChange={(value) => updateContact("mobile", value)} />
                  <Field label="Alternative Mobile" required value={contactDraft.alternativeMobile} placeholder="Enter Alternative Mobile" onChange={(value) => updateContact("alternativeMobile", value)} />
                  <Field label="WhatsApp Number" required value={contactDraft.whatsapp} placeholder="Enter WhatsApp Number" onChange={(value) => updateContact("whatsapp", value)} />
                  <Field label="Personal Email" required value={contactDraft.personalEmail} placeholder="Enter Personal Email" onChange={(value) => updateContact("personalEmail", value)} />
                  <Field label="LinkedIn URL" value={contactDraft.linkedin === "-" ? "" : contactDraft.linkedin} placeholder="Enter LinkedIn profile URL" onChange={(value) => updateContact("linkedin", value || "-")} />
                  <Field label="Facebook URL" value={contactDraft.facebook === "-" ? "" : contactDraft.facebook} placeholder="Enter Facebook profile URL" onChange={(value) => updateContact("facebook", value || "-")} />
                  <Field label="Twitter URL" value={contactDraft.twitter === "-" ? "" : contactDraft.twitter} placeholder="Enter Twitter profile URL" onChange={(value) => updateContact("twitter", value || "-")} />
                  <Field label="Website URL" value={contactDraft.website === "-" ? "" : contactDraft.website} placeholder="Enter website URL" onChange={(value) => updateContact("website", value || "-")} />
                  <Field label="Instagram URL" value={contactDraft.instagram === "-" ? "" : contactDraft.instagram} placeholder="Enter Instagram profile URL" onChange={(value) => updateContact("instagram", value || "-")} />
                </div>
              ) : (
                <div className="profile-modal-preview">
                  {Object.entries(contactDraft).map(([key, value]) => <DetailItem key={key} label={key.replace(/([A-Z])/g, " $1")} value={value || "-"} />)}
                </div>
              )}
            </div>
            <ModalFooter canContinue={contactCanContinue} finalStep={contactStep === 2} onCancel={() => setShowContactModal(false)} onNext={() => (contactStep === 1 ? setContactStep(2) : saveContact())} />
          </section>
        </div>
      )}

      {showIdentityModal && (
        <div className="profile-modal-backdrop">
          <section className="profile-edit-modal" role="dialog" aria-modal="true">
            <StepHeader title="Add New Identity" step={identityStep} firstLabel="Edit Identity Details" onClose={() => setShowIdentityModal(false)} />
            <div className="profile-modal-body">
              {identityStep === 1 ? (
                <div className="profile-modal-grid">
                  <SelectField label="Identity Type" required value={identityDraft.type} placeholder="Select Identity Type" options={["Voter Id", "Passport", "PAN Card"]} onChange={(value) => updateIdentity("type", value)} />
                  <Field label="Identity Number" required value={identityDraft.number} placeholder="Enter Identity Number" onChange={(value) => updateIdentity("number", value)} />
                  <Field label="Identity Name" required value={identityDraft.name} placeholder="Enter Identity Name" onChange={(value) => updateIdentity("name", value)} />
                  <SelectField label="Issued By" required value={identityDraft.issuedBy} placeholder="Enter Issued By" options={["Government", "Organization", "Other"]} onChange={(value) => updateIdentity("issuedBy", value)} />
                  <label className="identity-upload">
                    <span>Upload Document</span>
                    <input type="file" onChange={handleIdentityFile} />
                    <i><CameraIcon />{identityDraft.document || "Upload Document"}</i>
                  </label>
                </div>
              ) : (
                <div className="profile-modal-preview">
                  <DetailItem label="Identity Type" value={identityDraft.type} />
                  <DetailItem label="Identity Number" value={identityDraft.number} />
                  <DetailItem label="Identity Name" value={identityDraft.name} />
                  <DetailItem label="Issued By" value={identityDraft.issuedBy} />
                  <DetailItem label="Upload Document" value={identityDraft.document || "-"} />
                </div>
              )}
            </div>
            <ModalFooter canContinue={identityCanContinue} finalStep={identityStep === 2} onCancel={() => setShowIdentityModal(false)} onNext={() => (identityStep === 1 ? setIdentityStep(2) : saveIdentity())} />
          </section>
        </div>
      )}
    </div>
  );
}
