export interface FormationModule {
  id: string;
  title: string;
  subtitle: string;
  level: 'Iniciação' | 'Fundamentos' | 'Aprofundamento' | 'Espiritualidade';
  icon: string;
  lessons: FormationLesson[];
}

export interface FormationLesson {
  id: string;
  title: string;
  summary: string;
  references: string[];
  content: string[];
}

export interface FaqCategory {
  id: string;
  label: string;
  questions: FaqItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  source?: string;
}
