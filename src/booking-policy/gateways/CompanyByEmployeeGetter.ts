import {Option} from 'ts-option';

export interface CompanyByEmployeeGetter {
	getCompanyIdBy(employeeId: string): Option<string>;
}
