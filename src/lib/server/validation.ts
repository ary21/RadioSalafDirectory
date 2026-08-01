export type StationFormValues = {
	name: string;
	city: string;
	frequencyLabel: string;
	websiteUrl: string;
	streamUrl: string;
	tags: string;
	status: string;
	visibility: string;
};

const ALLOWED_STATUSES = [
	'PENDING_REVIEW',
	'PENDING_PERMISSION',
	'APPROVED_PUBLIC',
	'APPROVED_PRIVATE',
	'REJECTED'
];

const ALLOWED_VISIBILITIES = ['PUBLIC', 'PRIVATE'];

export function isValidUrl(value: string) {
	if (!value) return true;
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

export function validateEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateStationForm(form: URLSearchParams) {
	const values: StationFormValues = {
		name: String(form.get('name') || '').trim(),
		city: String(form.get('city') || '').trim(),
		frequencyLabel: String(form.get('frequencyLabel') || '').trim(),
		websiteUrl: String(form.get('websiteUrl') || '').trim(),
		streamUrl: String(form.get('streamUrl') || '').trim(),
		tags: String(form.get('tags') || '').trim(),
		status: String(form.get('status') || 'PENDING_REVIEW'),
		visibility: String(form.get('visibility') || 'PRIVATE')
	};

	const errors: Partial<Record<keyof StationFormValues, string>> = {};

	if (!values.name) {
		errors.name = 'Name is required.';
	}

	if (values.websiteUrl && !isValidUrl(values.websiteUrl)) {
		errors.websiteUrl = 'Website URL must be valid.';
	}

	if (values.streamUrl && !isValidUrl(values.streamUrl)) {
		errors.streamUrl = 'Stream URL must be valid.';
	}

	if (!ALLOWED_STATUSES.includes(values.status)) {
		errors.status = 'Invalid status selection.';
	}

	if (!ALLOWED_VISIBILITIES.includes(values.visibility)) {
		errors.visibility = 'Invalid visibility selection.';
	}

	return { values, errors };
}
