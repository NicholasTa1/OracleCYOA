export type Team = 'NetSuite Creative Team' | 'Sales Development Representative' | 'Technical Engagement Services' | 'None';

export type Certification = 'Oracle Certified Specialist (OCS)' | 'AI and Data Science Certification' | 'Cloud Certification' | 'None';

export interface GameState {
  step: string;
  title: string;
  salary: number;
  tenure: number; // in years
  team: Team;
  hasSideProject: boolean;
  certification: Certification;
  hasMentor: boolean;
  isLead: boolean;
  isManager: boolean;
  surveyAnswers: Record<string, number>;
  isGameOver: boolean;
  message?: string;
}

export interface Option {
  label: string;
  next: string;
  action?: (state: GameState) => Partial<GameState>;
}

export interface StoryNode {
  id: string;
  title: string;
  description: string;
  options: Option[];
  image?: string;
}

export const INITIAL_STATE: GameState = {
  step: 'applying',
  title: 'Candidate',
  salary: 0,
  tenure: 0,
  team: 'None',
  hasSideProject: false,
  certification: 'None',
  hasMentor: false,
  isLead: false,
  isManager: false,
  surveyAnswers: {},
  isGameOver: false,
};
