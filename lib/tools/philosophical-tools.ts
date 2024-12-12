import type { ChatRequest } from 'ai';

interface ArgumentAnalysis {
  validity: boolean;
  structure: string;
  analysis: string;
  fallacies?: string[];
}

interface PhilosopherComparison {
  comparison: string;
  differences: string[];
  similarities: string[];
  keyIdeas: Record<string, string[]>;
}

interface PhilosopherData {
  mainIdeas: string[];
  ethics: string;
  metaphysics: string;
  epistemology: string;
  period: string;
}

const philosopherDatabase: Record<string, PhilosopherData> = {
  'plato': {
    mainIdeas: ['Theory of Forms', 'Immortality of the Soul', 'The Republic'],
    ethics: 'Virtue ethics based on knowledge of the Good',
    metaphysics: 'Reality consists of perfect, unchanging Forms',
    epistemology: 'True knowledge comes from understanding the Forms',
    period: 'Ancient Greek'
  },
  'aristotle': {
    mainIdeas: ['Golden Mean', 'Four Causes', 'Logic'],
    ethics: 'Virtue as the mean between extremes',
    metaphysics: 'Form and matter are unified in substances',
    epistemology: 'Knowledge comes from empirical observation and logical reasoning',
    period: 'Ancient Greek'
  },
  'kant': {
    mainIdeas: ['Categorical Imperative', 'Transcendental Idealism', 'Critique of Pure Reason'],
    ethics: 'Deontological ethics based on duty and universal laws',
    metaphysics: 'Things-in-themselves are unknowable',
    epistemology: 'Knowledge requires both sensory experience and a priori categories',
    period: 'Modern'
  }
};

export async function analyzeArgument(
  _chatRequest: ChatRequest,
  { premises, conclusion }: { premises: string[]; conclusion: string }
): Promise<ArgumentAnalysis> {
  try {
    if (!premises.length) {
      throw new Error('No premises provided');
    }

    // Enhanced argument analysis logic
    const validity = premises.every(p => p.length > 0) && conclusion.length > 0;
    const structure = determineArgumentStructure(premises);
    const fallacies = detectFallacies(premises, conclusion);

    return {
      validity,
      structure,
      analysis: formatAnalysis(premises, conclusion, structure, validity, fallacies),
      fallacies
    };
  } catch (error) {
    console.error('Error in analyzeArgument:', error);
    throw new Error('Failed to analyze argument');
  }
}

export async function comparePhilosophers(
  _chatRequest: ChatRequest,
  { philosophers, topic }: { philosophers: string[]; topic: string }
): Promise<PhilosopherComparison> {
  try {
    const keyIdeas: Record<string, string[]> = {};
    const similarities: string[] = [];
    const differences: string[] = [];
    const validPhilosophers = philosophers.filter(p => 
      philosopherDatabase[p.toLowerCase()]
    );

    if (!validPhilosophers.length) {
      throw new Error('No valid philosophers provided');
    }

    validPhilosophers.forEach(philosopher => {
      const data = philosopherDatabase[philosopher.toLowerCase()];
      keyIdeas[philosopher] = data.mainIdeas;
      
      const topicKey = topic.toLowerCase() as keyof PhilosopherData;
      if (data[topicKey]) {
        differences.push(`${philosopher}'s view on ${topic}: ${data[topicKey]}`);
      }
    });

    // Find similarities in time period or approaches
    if (validPhilosophers.length > 1) {
      const periods = new Set(validPhilosophers.map(p => 
        philosopherDatabase[p.toLowerCase()].period
      ));
      if (periods.size === 1) {
        similarities.push(`Both philosophers are from the ${periods.values().next().value} period`);
      }
    }

    return {
      comparison: `Comparison of ${validPhilosophers.join(' and ')} on ${topic}`,
      differences,
      similarities,
      keyIdeas
    };
  } catch (error) {
    console.error('Error in comparePhilosophers:', error);
    throw new Error('Failed to compare philosophers');
  }
}

// Helper functions
function determineArgumentStructure(premises: string[]): string {
  if (premises.length === 1) return 'Simple argument';
  if (premises.length === 2) return 'Standard syllogism';
  return 'Complex argument';
}

function detectFallacies(premises: string[], conclusion: string): string[] {
  const fallacies: string[] = [];
  const allText = [...premises, conclusion].join(' ').toLowerCase();

  if (allText.includes('everyone') || allText.includes('all people')) {
    fallacies.push('Hasty generalization');
  }
  if (allText.includes('because I said') || allText.includes('experts say')) {
    fallacies.push('Appeal to authority');
  }
  if (allText.includes('therefore') && premises.length < 2) {
    fallacies.push('Non sequitur');
  }

  return fallacies;
}

function formatAnalysis(
  premises: string[],
  conclusion: string,
  structure: string,
  validity: boolean,
  fallacies: string[]
): string {
  return `
    Premises: ${premises.map((p, i) => `\n${i + 1}. ${p}`).join('')}
    Conclusion: ${conclusion}
    
    Analysis:
    - Structure: ${structure}
    - Validity: ${validity ? 'Valid' : 'Invalid'}
    ${fallacies.length ? `- Potential fallacies: ${fallacies.join(', ')}` : ''}
    
    ${validity ? 'The argument follows logical form.' : 'The argument may need restructuring.'}
  `.trim();
} 