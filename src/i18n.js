import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
	en: {
		translation: {
			'Welcome to React': 'Welcome to React and react-i18next',
			"CovidJorneyDesc": "As we are all learning from the COVID19 pandemic this tool was created to help you track your symptoms, feelings, questions, concerns and experience while experiencing symptoms of COVID19 with or without treatment.",
			"CovidHelpIntroduction":"This tool will help you track changes in your health (your perception), feelings and questions or concerns to share with your physician as a way to help more people understand the disease and how it may impact individuals like you."
		}
	},
	br: {
		translation: {
			'Welcome to React': 'Welcome to React and react-i18next',
			"yes": "sim",
			"Yes": "Sim",
			"No": "Não",
			"no": "não",
			"save": "salvar",
			"Save": "Salvar",
			"close": "fechar",
			"Close": "Fechar",
			"cancel": "cancelar",
			"Cancel": "Cancelar",
			"Find a Clinic/Doctor near You": "Encontre uma clínica ou médico perto de você",
			"Find": "Procurar",
			"Advanced Search": "Filtros avançados",
			"Location":"Endereço",
			"Specialty": "Especialidade",
			"CovidJorneyDesc": "As we are all learning from the COVID19 pandemic this tool was created to help you track your symptoms, feelings, questions, concerns and experience while experiencing symptoms of COVID19 with or without treatment.",
			"CovidHelpIntroduction":"This tool will help you track changes in your health (your perception), feelings and questions or concerns to share with your physician as a way to help more people understand the disease and how it may impact individuals like you.",
			"New Allergy": "Nova Alergia",
			"Allergies": "Alergias",
			"Allergic to": "Alergico a",
			"Age of Onset": "Idade de início",
			"Type": "Tipo",
			"Drug Allergies": "Alergia a Remédios",
			"Latex Allergies": "Alergia ao Latex",
			"Food Allergies": "Alergia a Comida",
			"Animals Allergies": "Alergia a Animais",
			"Plants Allergies": "Alergia a Plantas",
			"Environmental Allergies": "Alergias a Ambientes",
			"Other Allergies": "Outras Alergias",
			"Severity": "Gravidade",
			"Severe": "Grave",
			"Moderate": "Moderado",
			"Mild": "Brando",
			"Allergy" :"Alergia",
			"Allergies" :"Alergias",
			"Add Allergy": "Adicionar Alergia",
			"Actions": "Ações",
			"actions": "Ações",
			"Description": "Descrição",
			"description": "Descrição",
			"Deletar": "Deletar",
			"delete": "Deletar",
			"Date": "Data",
			"date": "Data",
			"Location": "Localização",
			"location": "Localização",
			"My Vaccines": "Minhas Vacinas",
			"Add Vaccine": "Adicionar Vacinas",
			"Vaccines": "Vacinas",
		},
	}
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en',

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;
