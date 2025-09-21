import { writable } from 'svelte/store';

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	image?: string;
	type: 'note' | 'scheme' | 'exam' | 'revision' | 'curriculum' | 'report' | 'lesson';
	slug: string;
	category: string;
	subject?: string;
	level?: string;
	term?: string;
}

// Dummy products data organized by type
export const dummyProducts: Record<Product['type'], Product[]> = {
	note: [
		{
			id: 'note-1',
			title: 'Form 1 Mathematics Notes',
			description: 'Comprehensive mathematics notes covering algebra, geometry, and statistics',
			price: 50,
			type: 'note',
			slug: 'form-1-mathematics-notes',
			category: 'Mathematics',
			subject: 'Mathematics',
			level: 'Form 1',
			term: 'Term 1'
		},
		{
			id: 'note-2',
			title: 'Form 2 Physics Notes',
			description: 'Complete physics notes with detailed explanations and examples',
			price: 50,
			type: 'note',
			slug: 'form-2-physics-notes',
			category: 'Sciences',
			subject: 'Physics',
			level: 'Form 2',
			term: 'Term 1'
		}
	],
	scheme: [
		{
			id: 'scheme-1',
			title: 'Biology Teaching Scheme',
			description: 'Detailed scheme of work with weekly lesson breakdowns',
			price: 50,
			type: 'scheme',
			slug: 'biology-teaching-scheme',
			category: 'Sciences',
			subject: 'Biology',
			level: 'Form 3',
			term: 'Term 2'
		},
		{
			id: 'scheme-2',
			title: 'English Language Scheme',
			description: 'Comprehensive language teaching scheme with grammar focus',
			price: 50,
			type: 'scheme',
			slug: 'english-language-scheme',
			category: 'Languages',
			subject: 'English',
			level: 'Form 2',
			term: 'Term 1'
		}
	],
	exam: [
		{
			id: 'exam-1',
			title: 'English Past Papers 2024',
			description: 'Collection of English papers with marking schemes',
			price: 60,
			type: 'exam',
			slug: 'english-past-papers-2024',
			category: 'Languages',
			subject: 'English',
			level: 'Form 4'
		},
		{
			id: 'exam-2',
			title: 'Mathematics Mock Exams',
			description: 'Set of 5 mock papers with solutions',
			price: 55,
			type: 'exam',
			slug: 'mathematics-mock-exams',
			category: 'Mathematics',
			subject: 'Mathematics',
			level: 'Form 4'
		}
	],
	revision: [
		{
			id: 'revision-1',
			title: 'Chemistry Revision Guide',
			description: 'Comprehensive revision materials with practice questions',
			price: 50,
			type: 'revision',
			slug: 'chemistry-revision-guide',
			category: 'Sciences',
			subject: 'Chemistry',
			level: 'Form 2'
		},
		{
			id: 'revision-2',
			title: 'Physics Practice Questions',
			description: 'Topic-wise questions with worked solutions',
			price: 50,
			type: 'revision',
			slug: 'physics-practice-questions',
			category: 'Sciences',
			subject: 'Physics',
			level: 'Form 4'
		}
	],
	curriculum: [
		{
			id: 'curriculum-1',
			title: 'CBC Mathematics Design',
			description: 'Complete CBC design with assessment rubrics',
			price: 60,
			type: 'curriculum',
			slug: 'cbc-mathematics-design',
			category: 'Mathematics',
			subject: 'Mathematics',
			level: 'Grade 7'
		},
		{
			id: 'curriculum-2',
			title: 'Science Curriculum Plan',
			description: 'Integrated science curriculum with learning outcomes',
			price: 70,
			type: 'curriculum',
			slug: 'science-curriculum-plan',
			category: 'Sciences',
			subject: 'Science',
			level: 'Grade 8'
		}
	],
	report: [
		{
			id: 'report-1',
			title: 'High School Report Template',
			description: 'Customizable report card with grade calculations',
			price: 40,
			type: 'report',
			slug: 'high-school-report-template',
			category: 'Administrative',
			subject: 'All Subjects',
			level: 'All Forms'
		},
		{
			id: 'report-2',
			title: 'CBC Assessment Report',
			description: 'CBC-aligned student assessment template',
			price: 40,
			type: 'report',
			slug: 'cbc-assessment-report',
			category: 'Administrative',
			subject: 'All Subjects',
			level: 'All Grades'
		}
	],
	lesson: [
		{
			id: 'lesson-1',
			title: 'Mathematics Lesson Plans',
			description: 'Week-by-week plans with objectives and resources',
			price: 50,
			type: 'lesson',
			slug: 'mathematics-lesson-plans',
			category: 'Mathematics',
			subject: 'Mathematics',
			level: 'Form 1',
			term: 'Term 1'
		},
		{
			id: 'lesson-2',
			title: 'Science Practical Plans',
			description: 'Detailed plans for practical sessions',
			price: 50,
			type: 'lesson',
			slug: 'science-practical-plans',
			category: 'Sciences',
			subject: 'Science',
			level: 'Form 2',
			term: 'Term 2'
		}
	]
};

function createProductsStore() {
	const { subscribe, set } = writable<Product[]>([]);

	return {
		subscribe,
		getByType: (type: Product['type']) => {
			set(dummyProducts[type] || []);
		},
		getAll: () => {
			const allProducts = Object.values(dummyProducts).flat();
			set(allProducts);
		},
		getById: (id: string) => {
			const all = Object.values(dummyProducts).flat();
			return all.find((p) => p.id === id);
		},
		getBySlug: (slug: string) => {
			const all = Object.values(dummyProducts).flat();
			return all.find((p) => p.slug === slug);
		},
		search: (query: string, filters: Partial<Product> = {}) => {
			const allProducts = Object.values(dummyProducts).flat();
			const filtered = allProducts.filter((product) => {
				const matchesQuery =
					!query ||
					product.title.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase());

				const matchesFilters = Object.entries(filters).every(
					([key, value]) => !value || product[key as keyof Product] === value
				);

				return matchesQuery && matchesFilters;
			});
			set(filtered);
		}
	};
}

export const productsStore = createProductsStore();
