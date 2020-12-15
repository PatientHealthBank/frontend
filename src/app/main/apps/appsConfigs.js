import CalendarAppConfig from './calendar/CalendarAppConfig';
import CalendarProviderConfig from './calendar-provider/CalendarProviderConfig';
import HomeAppConfig from './dashboards/home/HomeAppConfig';
import ConfirmAppointmentsConfig from './dashboards/confirm-appointments/ConfirmAppointmentsConfig';
import DashboardAppConfig from './dashboards/dashboard/DashboardAppConfig';
import FindAClinicAppConfig from './dashboards/find-a-clinic/FindAClinicAppConfig';
import DoctorsAppConfig from './dashboards/doctors/DoctorsAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import NotesAppConfig from './my-diary/NotesAppConfig';
import ClinicAppConfig from './clinic/ClinicAppConfig';
import TreatmentsAppConfig from './treatments/TreatmentsAppConfig';
import ProviderAppConfig from './provider/ProviderAppConfig';
import FamilyMembersAppConfig from './family-members/FamilyMembersAppConfig';


const appsConfigs = [
	FamilyMembersAppConfig,
	DashboardAppConfig,
	HomeAppConfig,
	ConfirmAppointmentsConfig,
	FindAClinicAppConfig,
	DoctorsAppConfig,
	FileManagerAppConfig,
	CalendarAppConfig,
	CalendarProviderConfig,
	ECommerceAppConfig,
	ClinicAppConfig,
	TreatmentsAppConfig,
	ProviderAppConfig,
	NotesAppConfig
];

export default appsConfigs;
