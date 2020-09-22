import {BookingPolicyService} from './booking-policy/resources/BookingPolicyService';
import {BookingService} from './booking/resources/BookingService';
import {CompanyService} from './company';
import {InMemoryCompanyRepository} from './company/repositories/InMemoryCompanyRepository';
import {HotelService} from './hotel';
import {InMemoryHotelRepository} from './hotel/repositories/InMemoryHotelRepository';

const hotelRepository = new InMemoryHotelRepository();
const companyRepository = new InMemoryCompanyRepository();

export const Services = {
	HotelService: new HotelService(hotelRepository),
	CompanyService: new CompanyService(companyRepository),
	BookingPolicyService: new BookingPolicyService(),
	BookingService: new BookingService(),
};
