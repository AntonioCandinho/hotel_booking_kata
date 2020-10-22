import {BookingService} from './booking';
import {BookingPolicyService} from './booking-policy';
import {InMemoryEmployeePolicyRepository} from './booking-policy/repositories/InMemoryEmployeePolicyRepository';
import {BookingPolicyGateway} from './booking/gateways/BookingPolicyGateway';
import {HotelServiceGateway} from './booking/gateways/HotelServiceGateway';
import {InMemoryBookingsRepository} from './booking/repositories/InMemoryBookingsRepository';
import {CompanyService} from './company';
import {InMemoryCompanyRepository} from './company/repositories/InMemoryCompanyRepository';
import {HotelService} from './hotel';
import {InMemoryHotelRepository} from './hotel/repositories/InMemoryHotelRepository';

const hotelRepository = new InMemoryHotelRepository();
const hotelService = new HotelService(hotelRepository);

const companyRepository = new InMemoryCompanyRepository();
const companyService = new CompanyService(companyRepository);

const policyEmployeeRepository = new InMemoryEmployeePolicyRepository();
const bookingPolicyService = new BookingPolicyService(policyEmployeeRepository);

const hotelGateway = new HotelServiceGateway(hotelService);
const policyGateway = new BookingPolicyGateway(bookingPolicyService);
const bookingsRepo = new InMemoryBookingsRepository();
const bookingService = new BookingService(
	hotelGateway,
	policyGateway,
	bookingsRepo,
);

export const Services = {
	HotelService: hotelService,
	CompanyService: companyService,
	BookingPolicyService: bookingPolicyService,
	BookingService: bookingService,
};
