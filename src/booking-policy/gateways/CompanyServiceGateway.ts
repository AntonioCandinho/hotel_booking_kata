import {none, Option, some} from 'ts-option';
import {Company} from '../../company/entities/Company';
import {CompanyByEmployeeGetter} from './CompanyByEmployeeGetter';

export interface GetCompanyBy {
	getCompanyBy(employeeId: string): Company;
}

export class CompanyServiceGateway implements CompanyByEmployeeGetter {
	public constructor(private readonly getter: GetCompanyBy) {}

	public getCompanyIdBy(employeeId: string): Option<string> {
		try {
			const company = this.getter.getCompanyBy(employeeId);
			return some(company.getId());
		} catch (e) {
			return none;
		}
	}
}
