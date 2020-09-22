import {Company} from '../entities/Company';
import {CompanyRepository} from './CompanyRepository';

export class InMemoryCompanyRepository implements CompanyRepository {
	private map: Map<string, Company> = new Map();

	public save(company: Company): void {
		this.aseertNoDuplicateEmployees(company);
		this.deleteCompanyBy(company.getId());
		this.addCompany(company.clone());
	}

	private aseertNoDuplicateEmployees(company: Company) {
		for (const employee of company.getEmployees()) {
			if (
				this.map.has(employee) &&
				this.map.get(employee).getId() !== company.getId()
			) {
				throw Error(
					`Employee ${employee} already registered in company ${this.map
						.get(employee)
						.getId()} `,
				);
			}
		}
	}

	private addCompany(company: Company): void {
		for (const employee of company.getEmployees()) {
			this.map.set(employee, company);
		}
	}

	public findEmployeeCompanyBy(employeeId: string): Company {
		if (!this.map.has(employeeId)) {
			throw Error(`No company with employee ${employeeId}`);
		}
		const company = this.map.get(employeeId);
		return company.clone();
	}

	public findOneOrCreateBy(companyId: string): Company {
		for (const company of this.map.values()) {
			if (company.getId() === companyId) {
				return company;
			}
		}
		const company = new Company(companyId);
		this.addCompany(company);
		return company.clone();
	}

	public deleteCompanyBy(companyId: string): void {
		const companies = new Set(this.map.values());
		for (const company of companies) {
			if (company.getId() === companyId) {
				for (const employee of company.getEmployees()) {
					this.map.delete(employee);
				}
			}
		}
	}
}
