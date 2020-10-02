import {BookingPolicyService} from './booking-policy';
import {InMemoryEmployeePolicyRepository} from './booking-policy/repositories/InMemoryEmployeePolicyRepository';
import {BookingService} from './booking/resources/BookingService';
import {CompanyService} from './company';
import {InMemoryCompanyRepository} from './company/repositories/InMemoryCompanyRepository';
import {HotelService} from './hotel';
import {InMemoryHotelRepository} from './hotel/repositories/InMemoryHotelRepository';

const hotelRepository = new InMemoryHotelRepository();
const companyRepository = new InMemoryCompanyRepository();
const companyPolicyEmployeeRepository = new InMemoryEmployeePolicyRepository();

export const Services = {
	HotelService: new HotelService(hotelRepository),
	CompanyService: new CompanyService(companyRepository),
	BookingPolicyService: new BookingPolicyService(
		companyPolicyEmployeeRepository,
	),
	BookingService: new BookingService(),
};
