import { StoryNode, GameState, Team, Certification, INITIAL_STATE } from './types';

export const STORY_NODES: Record<string, StoryNode> = {
  applying: {
    id: 'applying',
    title: 'Applying at Oracle',
    description: 'Oracle Recruiting Cloud uses AI to match candidates with teams. Which keyword do you want to put in your resume when applying?',
    options: [
      {
        label: 'Graphic Design',
        next: 'negotiation',
        action: (state) => ({ team: 'NetSuite Creative Team', title: 'Graphic Designer' })
      },
      {
        label: 'Sales',
        next: 'negotiation',
        action: (state) => ({ team: 'Sales Development Representative', title: 'Sales Dev Rep' })
      },
      {
        label: 'Cloud Computing',
        next: 'negotiation',
        action: (state) => ({ team: 'Technical Engagement Services', title: 'Cloud Engineer' })
      }
    ]
  },
  negotiation: {
    id: 'negotiation',
    title: 'Salary Negotiation',
    description: 'You are offered $110,000. Oracle is very transparent on compensation; that\'s why you have the opportunity to negotiate. How do you want to proceed?',
    options: [
      {
        label: 'Accept the initial offer',
        next: 'onboarding',
        action: (state) => ({ salary: 110000, message: 'You accepted the initial offer of $110,000.' })
      },
      {
        label: 'Negotiate lightly',
        next: 'onboarding',
        action: (state) => ({ salary: 125000, message: 'Your light negotiation was successful! Your salary is now $125,000.' })
      },
      {
        label: 'Negotiate moderately',
        next: 'onboarding',
        action: (state) => ({ salary: 140000, message: 'Your moderate negotiation paid off! Your salary is now $140,000.' })
      },
      {
        label: 'Negotiate aggressively',
        next: 'applying',
        action: (state) => ({ message: 'You lost the job opportunity due to aggressive negotiation. Go back and try again.' })
      }
    ]
  },
  onboarding: {
    id: 'onboarding',
    title: 'Onboarding',
    description: 'Welcome to Oracle! Your journey begins with Oracle MyLearn, our comprehensive digital learning platform. Here, you will dive deep into the real-world impact of our technology, from Oracle Cloud Infrastructure (OCI) to the vast ecosystem of Oracle Fusion Applications. Through guided learning paths and interactive modules, you will master the tools and culture that define our mission to help people see data in new ways, discover insights, and unlock endless possibilities.',
    options: [
      {
        label: 'Start Working',
        next: 'project',
        action: (state) => ({ tenure: 0.5 })
      }
    ]
  },
  project: {
    id: 'project',
    title: 'Your First Project',
    description: '', // Will be dynamically set based on team
    options: [
      {
        label: 'Begin work on project',
        next: 'side_project_ask'
      }
    ]
  },
  side_project_ask: {
    id: 'side_project_ask',
    title: 'New Side Project!',
    description: 'Oracle gives people the opportunity to learn new skills. What side project do you want to do?',
    options: [
      {
        label: 'Skill Development Project',
        next: 'certification_choice',
        action: (state) => ({ hasSideProject: true })
      },
      {
        label: 'Internal Innovation Project',
        next: 'certification_choice',
        action: (state) => ({ hasSideProject: true })
      },
      {
        label: 'No side project',
        next: 'performance_review',
        action: (state) => ({ hasSideProject: false })
      }
    ]
  },
  certification_choice: {
    id: 'certification_choice',
    title: 'Choose a Certification',
    description: 'Which certification do you want to pursue?',
    options: [
      {
        label: 'Oracle Certified Specialist (OCS)',
        next: 'performance_review',
        action: (state) => ({ certification: 'Oracle Certified Specialist (OCS)' })
      },
      {
        label: 'AI and Data Science Certification',
        next: 'performance_review',
        action: (state) => ({ certification: 'AI and Data Science Certification' })
      },
      {
        label: 'Cloud Certification',
        next: 'performance_review',
        action: (state) => ({ certification: 'Cloud Certification' })
      },
      {
        label: 'Skip certification for now',
        next: 'performance_review',
        action: (state) => ({ certification: 'None' })
      }
    ]
  },
  performance_review: {
    id: 'performance_review',
    title: '6-Month Performance Review',
    description: '', // Will be dynamically set based on side project
    options: [
      {
        label: 'Continue',
        next: 'stay_or_leave_1'
      }
    ]
  },
  stay_or_leave_1: {
    id: 'stay_or_leave_1',
    title: 'Are you enjoying Oracle?',
    description: 'Would you like to stay or leave?',
    options: [
      {
        label: 'Stay',
        next: 'survey_q1'
      },
      {
        label: 'Leave',
        next: 'offboarding'
      }
    ]
  },
  survey_q1: {
    id: 'survey_q1',
    title: 'Employee Satisfaction Survey - Q1',
    description: '"All in all, I am satisfied with my job."',
    options: [
      { label: 'Strongly disagree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 1 } }) },
      { label: 'Disagree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 2 } }) },
      { label: 'Slightly disagree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 3 } }) },
      { label: 'Neither agree nor disagree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 4 } }) },
      { label: 'Slightly agree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 5 } }) },
      { label: 'Agree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 6 } }) },
      { label: 'Strongly agree', next: 'survey_q2', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q1: 7 } }) }
    ]
  },
  survey_q2: {
    id: 'survey_q2',
    title: 'Employee Satisfaction Survey - Q2',
    description: '"In general, I don’t like my job."',
    options: [
      { label: 'Strongly disagree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 1 } }) },
      { label: 'Disagree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 2 } }) },
      { label: 'Slightly disagree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 3 } }) },
      { label: 'Neither agree nor disagree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 4 } }) },
      { label: 'Slightly agree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 5 } }) },
      { label: 'Agree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 6 } }) },
      { label: 'Strongly agree', next: 'survey_q3', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q2: 7 } }) }
    ]
  },
  survey_q3: {
    id: 'survey_q3',
    title: 'Employee Satisfaction Survey - Q3',
    description: '"In general, I like working here."',
    options: [
      { label: 'Strongly disagree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 1 } }) },
      { label: 'Disagree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 2 } }) },
      { label: 'Slightly disagree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 3 } }) },
      { label: 'Neither agree nor disagree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 4 } }) },
      { label: 'Slightly agree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 5 } }) },
      { label: 'Agree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 6 } }) },
      { label: 'Strongly agree', next: 'mentor_ask', action: (state) => ({ surveyAnswers: { ...state.surveyAnswers, q3: 7 } }) }
    ]
  },
  mentor_ask: {
    id: 'mentor_ask',
    title: 'Mentorship Opportunity',
    description: 'Oracle encourages professional networking. Would you like to be matched with a senior mentor?',
    options: [
      {
        label: 'Yes',
        next: 'mentor_offer',
        action: (state) => ({ hasMentor: true })
      },
      {
        label: 'No',
        next: 'stay_or_leave_2',
        action: (state) => ({ hasMentor: false })
      }
    ]
  },
  mentor_offer: {
    id: 'mentor_offer',
    title: 'A New Opportunity',
    description: '', // Dynamically set
    options: [
      {
        label: 'Accept Offer',
        next: 'stay_or_leave_2',
        action: (state) => ({ 
          team: 'Strategic Initiatives Group', 
          title: 'Senior ' + state.title, 
          salary: state.salary * 1.2,
          message: 'You joined the Strategic Initiatives Group with a significant promotion!'
        })
      },
      {
        label: 'Decline Offer',
        next: 'stay_or_leave_2',
        action: (state) => ({
          message: 'You chose to stay with your current team, maintaining your strong relationships there.'
        })
      }
    ]
  },
  stay_or_leave_2: {
    id: 'stay_or_leave_2',
    title: 'Are you enjoying Oracle?',
    description: 'Would you like to stay or leave?',
    options: [
      {
        label: 'Stay',
        next: 'team_lead_ask',
        action: (state) => ({ tenure: 5 })
      },
      {
        label: 'Leave',
        next: 'offboarding'
      }
    ]
  },
  team_lead_ask: {
    id: 'team_lead_ask',
    title: '5-Year Anniversary',
    description: 'You have reached your 5-year anniversary at Oracle! Your contributions have been significant. Your manager sits you down to discuss your future. You are eligible for a salary increase regardless of your path.',
    options: [
      {
        label: 'Accept Team Lead Role',
        next: 'management_offer',
        action: (state) => ({ 
          isLead: true, 
          title: state.title + ' Team Lead', 
          salary: state.salary * 1.15, 
          tenure: 8,
          message: 'You are now a Team Lead! Your salary increased by 15%.'
        })
      },
      {
        label: 'Continue as Senior Individual Contributor',
        next: 'senior_review',
        action: (state) => ({ 
          isLead: false, 
          salary: state.salary * 1.10, 
          tenure: 8,
          message: 'You chose to focus on your technical expertise. Your salary increased by 10%.'
        })
      }
    ]
  },
  management_offer: {
    id: 'management_offer',
    title: '8-Year Mark: Management Offer',
    description: 'It\'s been 8 years at Oracle. Your experience as a Team Lead has not gone unnoticed. You are being offered a formal Management position. This comes with a substantial raise, but you can also choose to stay in your current lead role with a standard increase.',
    options: [
      {
        label: 'Accept Management Role',
        next: 'offboarding',
        action: (state) => ({ 
          isManager: true, 
          title: 'Manager', 
          salary: state.salary * 1.25,
          message: 'Congratulations on becoming a Manager! Your salary increased by 25%.'
        })
      },
      {
        label: 'Decline Management Role',
        next: 'offboarding',
        action: (state) => ({ 
          isManager: false, 
          salary: state.salary * 1.15,
          message: 'You chose to stay in your lead role. Your salary increased by 15%.'
        })
      }
    ]
  },
  senior_review: {
    id: 'senior_review',
    title: '8-Year Mark: Senior Review',
    description: '8 years at Oracle! You\'ve become a pillar of technical knowledge on your team. You receive your annual performance-based salary increase.',
    options: [
      {
        label: 'Continue',
        next: 'offboarding',
        action: (state) => ({ 
          salary: state.salary * 1.10,
          message: 'Your expertise continues to be valued. Your salary increased by 10%.'
        })
      }
    ]
  },
  offboarding: {
    id: 'offboarding',
    title: 'Offboarding Process',
    description: 'Your employment with Oracle is coming to an end. Please return all equipment to IT. Thank you for your hard work with our company and we wish you all the best.',
    options: [
      {
        label: 'Finish Game',
        next: 'end',
        action: (state) => ({ isGameOver: true })
      }
    ]
  },
  end: {
    id: 'end',
    title: 'Career Complete',
    description: 'You have completed your career simulation at Oracle.',
    options: [
      {
        label: 'Restart',
        next: 'applying',
        action: (state) => ({ ...INITIAL_STATE })
      }
    ]
  }
};

export const getProjectDescription = (team: Team): string => {
  switch (team) {
    case 'NetSuite Creative Team':
      return 'Graphic Design Project: Enhancing the user experience through visuals for enterprise applications.';
    case 'Sales Development Representative':
      return 'Sales Development Rep: A project analyzing territory customer needs through data collection.';
    case 'Technical Engagement Services':
      return 'Cloud Computing Project: Debug a high-scale software.';
    default:
      return 'Beginning work within team- working on a technical project.';
  }
};

export const getPerformanceReviewDescription = (hasSideProject: boolean, certification: string): string => {
  const hasCert = certification !== 'None';
  
  if (hasSideProject && hasCert) {
    return 'Performance review 6 months - your manager is incredibly impressed! By completing both a side project and earning a certification, you\'ve demonstrated exceptional initiative and are now on the fast track for leadership.';
  } else if (hasSideProject || hasCert) {
    return 'Performance review 6 months - your manager thinks you\'re doing a good job. You\'ve shown growth by taking on extra challenges, and they encourage you to keep building on this momentum.';
  } else {
    return 'Performance review 6 months - your manager notes that while you\'re meeting basic expectations, they\'d like to see more initiative. They mention that you haven\'t yet taken advantage of the skill development or side project opportunities available.';
  }
};

export const getMentorOfferDescription = (state: GameState): string => {
  const certPart = state.certification !== 'None' ? `your ${state.certification}` : 'your technical growth';
  const projectPart = state.hasSideProject ? 'your recent side project' : 'your consistent performance';
  
  return `Your mentor, a VP in the Strategic Initiatives Group, has been watching your progress closely. They were particularly impressed by ${certPart} and ${projectPart}. "I'm building a new high-impact team," they tell you. "I'd love for you to join us as a Senior lead. It's a different focus, but I think your skills are a perfect fit."`;
};
