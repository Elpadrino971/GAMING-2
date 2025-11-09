import { Question, DebateArgument, ArgumentEvaluation } from '../types';

/**
 * Simulates AI debate evaluation
 * In production, this would call Claude API or similar
 */
export const evaluateArgument = async (
  question: Question,
  selectedAnswer: number,
  userArgument: string
): Promise<DebateArgument> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const isCorrect = selectedAnswer === question.correctAnswer;
  const argumentLength = userArgument.length;
  const hasExamples = /example|exemple|par exemple|for instance/i.test(userArgument);
  const hasFacts = /\d{4}|\d+%|statistics|données|étude/i.test(userArgument);
  const isWellStructured = argumentLength > 100 && userArgument.includes('.');

  // Calculate scores
  let logic = Math.min(10, Math.floor((argumentLength / 50) + (isCorrect ? 3 : 0)));
  let relevance = Math.min(10, Math.floor((argumentLength / 40) + (hasExamples ? 2 : 0)));
  let evidence = Math.min(10, Math.floor((argumentLength / 60) + (hasFacts ? 3 : 0)));
  let clarity = Math.min(10, Math.floor((argumentLength / 45) + (isWellStructured ? 2 : 0)));

  // Add some randomness for realism
  logic += Math.floor(Math.random() * 2);
  relevance += Math.floor(Math.random() * 2);
  evidence += Math.floor(Math.random() * 2);
  clarity += Math.floor(Math.random() * 2);

  // Cap at 10
  logic = Math.min(10, logic);
  relevance = Math.min(10, relevance);
  evidence = Math.min(10, evidence);
  clarity = Math.min(10, clarity);

  const totalScore = Math.floor((logic + relevance + evidence + clarity) * 2.5);

  // Generate AI response based on the argument quality
  const aiResponse = generateAIResponse(
    question,
    selectedAnswer,
    userArgument,
    isCorrect,
    totalScore
  );

  // Generate feedback
  const feedback = generateFeedback(logic, relevance, evidence, clarity, totalScore);

  const evaluation: ArgumentEvaluation = {
    logic,
    relevance,
    evidence,
    clarity,
    totalScore,
    feedback,
  };

  return {
    id: `debate-${Date.now()}`,
    questionId: question.id,
    userArgument,
    aiResponse,
    score: totalScore,
    evaluation,
    timestamp: Date.now(),
  };
};

const generateAIResponse = (
  question: Question,
  selectedAnswer: number,
  userArgument: string,
  isCorrect: boolean,
  totalScore: number
): string => {
  const responses = {
    high: [
      `Excellent argument! Tu as présenté une analyse nuancée et bien structurée. ${
        isCorrect
          ? "Ta réponse était correcte et tu l'as défendue avec brio."
          : "Même si ta réponse n'était pas correcte, ton raisonnement démontre une réflexion approfondie."
      } J'apprécie particulièrement ta capacité à ${
        userArgument.includes('exemple') || userArgument.includes('example')
          ? 'illustrer tes points avec des exemples concrets'
          : 'structurer ton argumentation de manière cohérente'
      }.`,
      `Impressionnant! Ton argument montre une compréhension solide du sujet. ${
        isCorrect
          ? "Non seulement tu as choisi la bonne réponse, mais tu l'as aussi justifiée de manière convaincante."
          : "Bien que ce ne soit pas la bonne réponse, ton processus de réflexion est louable."
      } Continue à développer tes arguments avec autant de profondeur.`,
    ],
    medium: [
      `Bon argument, mais il pourrait être renforcé. ${
        isCorrect
          ? "Ta réponse est correcte, mais l'argumentation pourrait être plus développée."
          : "Ta réponse n'est pas correcte, et voici pourquoi : " + question.explanation.substring(0, 100) + "..."
      } Pour améliorer ton score, essaie d'ajouter plus d'exemples concrets ou de données factuelles.`,
      `Tu es sur la bonne voie! ${
        isCorrect
          ? 'Ta réponse correcte montre que tu as compris le concept.'
          : 'Même si ce n\'est pas la bonne réponse, ton raisonnement a du mérite.'
      } Pour atteindre un score plus élevé, développe davantage ta pensée et structure mieux tes idées.`,
    ],
    low: [
      `Ton argument nécessite plus de développement. ${
        isCorrect
          ? "Bien que ta réponse soit correcte, tu n'as pas suffisamment justifié ton choix."
          : "Ta réponse n'est pas correcte : " + question.explanation.substring(0, 80) + "..."
      } Pour améliorer : donne des exemples concrets, cite des faits, et structure ton raisonnement en plusieurs points.`,
      `Il faut approfondir ton argumentation. ${
        isCorrect
          ? 'Tu as trouvé la bonne réponse, mais sans la défendre vraiment.'
          : 'Cette réponse est incorrecte. ' + question.explanation.substring(0, 80) + '...'
      } Pense à développer pourquoi tu penses cela, avec des preuves et des exemples.`,
    ],
  };

  const category = totalScore >= 70 ? 'high' : totalScore >= 40 ? 'medium' : 'low';
  const responseList = responses[category];
  return responseList[Math.floor(Math.random() * responseList.length)];
};

const generateFeedback = (
  logic: number,
  relevance: number,
  evidence: number,
  clarity: number,
  totalScore: number
): string => {
  const feedbacks = [];

  if (logic >= 8) {
    feedbacks.push('Ton raisonnement logique est excellent');
  } else if (logic <= 4) {
    feedbacks.push('Travaille sur la structure logique de ton argumentation');
  }

  if (relevance >= 8) {
    feedbacks.push('Tu restes parfaitement dans le sujet');
  } else if (relevance <= 4) {
    feedbacks.push('Assure-toi que tes arguments sont directement liés à la question');
  }

  if (evidence >= 8) {
    feedbacks.push('Tes preuves et exemples sont convaincants');
  } else if (evidence <= 4) {
    feedbacks.push('Ajoute plus de faits, données ou exemples pour renforcer ton argument');
  }

  if (clarity >= 8) {
    feedbacks.push('Ton expression est claire et facile à suivre');
  } else if (clarity <= 4) {
    feedbacks.push('Améliore la clarté de ton expression en structurant mieux tes phrases');
  }

  if (feedbacks.length === 0) {
    return 'Performance correcte. Continue à pratiquer pour améliorer tous les aspects de ton argumentation.';
  }

  return feedbacks.join('. ') + '.';
};

/**
 * Generate shareable debate snippet for social media
 */
export const generateShareableDebate = (debate: DebateArgument, question: Question): string => {
  return `🎯 Truth Battle - Score: ${debate.score}/100

Question: ${question.question}

Mon argument:
${debate.userArgument.substring(0, 150)}${debate.userArgument.length > 150 ? '...' : ''}

📊 Évaluation IA:
Logique: ${debate.evaluation.logic}/10
Pertinence: ${debate.evaluation.relevance}/10

#TruthBattle #DebateIA #QuizGame`;
};
