import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  RotateCcw, 
  Building2,
  AlertCircle,
  Users,
  Award,
  Cpu,
  Globe
} from 'lucide-react';
import { GameState, INITIAL_STATE, StoryNode, Option } from './types';
import { STORY_NODES, getProjectDescription, getPerformanceReviewDescription, getMentorOfferDescription } from './story';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('oracle_career_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  const [currentNode, setCurrentNode] = useState<StoryNode>(STORY_NODES[state.step]);

  useEffect(() => {
    localStorage.setItem('oracle_career_state', JSON.stringify(state));
    
    let node = STORY_NODES[state.step];
    if (state.step === 'project') {
      node = { ...node, description: getProjectDescription(state.team) };
    } else if (state.step === 'performance_review') {
      node = { ...node, description: getPerformanceReviewDescription(state.hasSideProject, state.certification) };
    } else if (state.step === 'mentor_offer') {
      node = { ...node, description: getMentorOfferDescription(state) };
    }
    setCurrentNode(node);
  }, [state]);

  const handleOptionClick = (option: Option) => {
    let nextState = { ...state };
    if (option.action) {
      const updates = option.action(state);
      nextState = { ...nextState, ...updates };
    }
    nextState.step = option.next;
    nextState.message = undefined;
    
    if (option.label === 'Negotiate Aggressively') {
      nextState.message = 'You lost the job opportunity. Go back and try again.';
    }
    
    setState(nextState);
  };

  const resetGame = () => {
    if (window.confirm("Are you sure you want to resign and start over?")) {
      setState(INITIAL_STATE);
    }
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-oracle-gray text-oracle-dark font-sans antialiased selection:bg-red-100">
      {/* Techy Header */}
      <header className="sticky top-0 z-10 bg-oracle-dark text-white border-b-2 border-oracle-red shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-oracle-red rounded-lg shadow-[0_0_15px_rgba(199,70,52,0.4)]">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none">Oracle</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Career_Sim_v2.4</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 text-xs font-mono">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Title</span>
              <span className="text-oracle-red font-bold">{state.title}</span>
            </div>
            
            <div className="h-8 w-px bg-gray-800" />

            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Salary</span>
              <span className="text-green-400 font-bold">{formatSalary(state.salary)}</span>
            </div>

            <div className="h-8 w-px bg-gray-800" />

            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Tenure</span>
              <span className="text-blue-400 font-bold">Y{state.tenure}</span>
            </div>

            {state.certification !== 'None' && (
              <>
                <div className="h-8 w-px bg-gray-800" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 bg-oracle-red/10 px-3 py-1 rounded border border-oracle-red/30"
                >
                  <Award className="w-3.5 h-3.5 text-oracle-red" />
                  <span className="text-oracle-red font-bold uppercase text-[10px]">{state.certification}</span>
                </motion.div>
              </>
            )}
          </div>

          <button 
            onClick={resetGame}
            className="p-2 text-gray-500 hover:text-oracle-red transition-all rounded hover:bg-white/5"
            title="Reset Simulation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* System Message */}
            {state.message && (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 bg-white border-l-4 border-oracle-red shadow-sm flex items-start gap-3 tech-border"
              >
                <Cpu className="shrink-0 mt-0.5 text-oracle-red" size={18} />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">System Notification</span>
                  <p className="text-sm font-medium text-gray-700">{state.message}</p>
                </div>
              </motion.div>
            )}

            {/* Story Card */}
            <div className="bg-white p-8 md:p-12 shadow-xl tech-border">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-oracle-red to-transparent opacity-30" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-oracle-red">
                    {currentNode.title}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-oracle-red to-transparent opacity-30" />
                </div>
                
                <div className="relative">
                  <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800 italic font-serif text-center">
                    "{currentNode.description}"
                  </p>
                </div>

                {/* Choices Grid */}
                <div className="grid gap-4 pt-4">
                  {currentNode.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(199, 70, 52, 0.02)' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleOptionClick(option)}
                      className="group flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded hover:border-oracle-red transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-oracle-red transition-all" />
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-gray-300 group-hover:text-oracle-red/50">0{index + 1}</span>
                        <span className="text-lg font-medium text-gray-700 group-hover:text-oracle-dark">
                          {option.label}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-oracle-red transition-all transform group-hover:translate-x-1" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Techy Metadata Footer */}
            <div className="flex items-center justify-between px-2 text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span>Global Infrastructure: Online</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Region: us-east-1</span>
                <span>Latency: 24ms</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Watermark */}
      <div className="fixed bottom-0 left-0 right-0 p-8 pointer-events-none opacity-[0.03] select-none overflow-hidden -z-10">
        <div className="text-[15rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap font-sans">
          Oracle Cloud
        </div>
      </div>
    </div>
  );
};

export default App;
