import CalendarAppConfig from './calendar/CalendarAppConfig';
import CalendarProviderConfig from './calendar-provider/CalendarProviderConfig';
import HomeAppConfig from './dashboards/home/HomeAppConfig';
import ConfirmAppointmentsConfig from './dashboards/confirm-appointments/ConfirmAppointmentsConfig';
import DashboardAppConfig from './dashboards/dashboard/DashboardAppConfig';
import FindAClinicAppConfig from './dashboards/find-a-clinic/FindAClinicAppConfig';
import DoctorsAppConfig from './dashboards/doctors/DoctorsAppConfig';
import AppointmentsAppConfig from './e-commerce/AppointmentsAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import NotesAppConfig from './my-diary/NotesAppConfig';
import ClinicAppConfig from './clinic/ClinicAppConfig';
import TreatmentsAppConfig from './treatments/TreatmentsAppConfig';
import ProviderAppConfig from './provider/ProviderAppConfig';
import FamilyMembersAppConfig from './family-members/FamilyMembersAppConfig';
import InvoicesAppConfig from './invoices/InvoicesAppConfig';


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
	AppointmentsAppConfig,
	ClinicAppConfig,
	TreatmentsAppConfig,
	ProviderAppConfig,
	NotesAppConfig,
	InvoicesAppConfig
];

export default appsConfigs;
