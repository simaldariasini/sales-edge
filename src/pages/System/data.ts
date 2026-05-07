export type ViewName =
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

export interface Organization {
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

export interface DistributionChannel {
  id: number;
  orgCode: string;
  orgName: string;
  distributionCode: string;
  distributionName: string;
  status: string;
}

export interface Office {
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

export interface OrganizationForm {
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

export const tabOrder: ViewName[] = [
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

export const organizations: Organization[] = [
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

export const countryOptions = [
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

export const orgTypeOptions = ["Vendor", "Org", "Customer", "Supplier"];

export const distributionChannels: DistributionChannel[] = [
  { id: 1, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0007", distributionName: "E-Commerce", status: "Active" },
  { id: 2, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0006", distributionName: "Distributor", status: "Active" },
  { id: 3, orgCode: "ORG-0004", orgName: "Samsung", distributionCode: "DC-0005", distributionName: "General Trade", status: "Active" },
  { id: 4, orgCode: "ORG-0002", orgName: "MKG Organization", distributionCode: "DC-0003", distributionName: "KGM Distribution", status: "Active" },
  { id: 5, orgCode: "ORG-0002", orgName: "MKG Organization", distributionCode: "DC-0001", distributionName: "MKG Distribution", status: "Active" },
];

export const offices: Office[] = [
  { id: 1, org: "[ORG-0004] Samsung", office: "[OFF007] Samsung Hyderabad", officeType: "Regional Office", warehouse: "Yes", contactName: "Mahesh Kumar", phone: "4055667788", city: "Hyderabad", status: "Active" },
  { id: 2, org: "[ORG-0004] Samsung", office: "[OFF006] Samsung India HO Gurgaon", officeType: "Head Office", warehouse: "No", contactName: "Rajiv Mehta", phone: "1244888888", city: "Secunderabad", status: "Active" },
  { id: 3, org: "[ORG-0002] MKG Organization", office: "[OFF004] Mastishka", officeType: "Headoffice", warehouse: "Yes", contactName: "Naveen", phone: "9632587410", city: "Hyderabad", status: "Active" },
  { id: 4, org: "[ORG-0002] MKG Organization", office: "[OFF003] GKM", officeType: "MainBranch", warehouse: "Yes", contactName: "K Kumar", phone: "8099153866", city: "Secunderabad", status: "Active" },
  { id: 5, org: "[ORG-0002] MKG Organization", office: "[OFF002] KG office", officeType: "MainBranch", warehouse: "Yes", contactName: "Sai Kumar", phone: "9887766788", city: "Secunderabad", status: "Active" },
  { id: 6, org: "[ORG-0002] MKG Organization", office: "[OFF001] MKG Office", officeType: "Headoffice", warehouse: "Yes", contactName: "Karthik", phone: "8639211702", city: "Hyderabad", status: "Active" },
];

export interface Employee {
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

export const employees: Employee[] = [
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

export interface Department {
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

export const departments: Department[] = [
  { id: 1, departmentCode: "yhnbgf", departmentName: "bgdvf", departmentType: "Service", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF007", officeName: "Samsung Hyderabad", officeType: "Regional Office", status: "Active" },
  { id: 2, departmentCode: "D1234", departmentName: "demo23", departmentType: "Supply Chain", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF006", officeName: "Samsung India HO Gurgaon", officeType: "Head Office", status: "Active" },
  { id: 3, departmentCode: "DOO5", departmentName: "Warehouse Operations", departmentType: "Supply Chain", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF007", officeName: "Samsung Hyderabad", officeType: "Regional Office", status: "Active" },
  { id: 4, departmentCode: "DOO1", departmentName: "General Trade Sales", departmentType: "Sales", orgCode: "ORG-0004", orgName: "Samsung", officeCode: "OFF006", officeName: "Samsung India HO Gurgaon", officeType: "Head Office", status: "Active" },
  { id: 5, departmentCode: "DOO04", departmentName: "Sequal", departmentType: "LD125", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF003", officeName: "GKM", officeType: "MainBranch", status: "Active" },
  { id: 6, departmentCode: "DOO02", departmentName: "Account Department", departmentType: "AD554", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF001", officeName: "MKG Office", officeType: "Headoffice", status: "Active" },
  { id: 7, departmentCode: "DOO01", departmentName: "Sales Department", departmentType: "SD123", orgCode: "ORG-0002", orgName: "MKG Organization", officeCode: "OFF001", officeName: "MKG Office", officeType: "Headoffice", status: "Active" },
];
