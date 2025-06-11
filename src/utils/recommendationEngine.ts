import { modules } from '../data/modules';
interface Answer {
  questionId: string;
  value: string | number | string[];
}
export const calculateRecommendations = (answers: Answer[]) => {
  // This is a simplified recommendation engine
  // In a real implementation, this would be much more sophisticated
  const moduleScores = modules.map(module => {
    let score = 0;
    // Calculate score based on answers
    answers.forEach(answer => {
      // Example scoring logic for IT Service Management module
      if (module.id === 'itsm') {
        if (answer.questionId === 'bottlenecks' && Array.isArray(answer.value) && (answer.value.includes('it_support') || answer.value.includes('incident_resolution'))) {
          score += 10;
        }
        if (answer.questionId === 'service_disruptions' && typeof answer.value === 'number' && answer.value > 3) {
          score += 15;
        }
        if (answer.questionId === 'incident_response' && (answer.value === 'day' || answer.value === 'days' || answer.value === 'week_plus')) {
          score += 20;
        }
      }
      // Example scoring logic for IT Operations Management module
      if (module.id === 'itom') {
        if (answer.questionId === 'service_disruptions' && typeof answer.value === 'number' && answer.value > 2) {
          score += 10;
        }
        if (answer.questionId === 'leadership_visibility' && typeof answer.value === 'number' && answer.value < 3) {
          score += 15;
        }
      }
      // Example scoring logic for IT Business Management module
      if (module.id === 'itbm') {
        if (answer.questionId === 'leadership_visibility' && typeof answer.value === 'number' && answer.value < 4) {
          score += 20;
        }
      }
      // Example scoring logic for HR Service Delivery module
      if (module.id === 'hrsd') {
        if (answer.questionId === 'automation_priority' && Array.isArray(answer.value) && answer.value.includes('hr')) {
          score += 25;
        }
      }
      // Example scoring logic for Customer Service Management module
      if (module.id === 'csm') {
        if (answer.questionId === 'automation_priority' && Array.isArray(answer.value) && answer.value.includes('customer_service')) {
          score += 25;
        }
      }
    });
    return {
      ...module,
      score
    };
  });
  // Sort modules by score and take top recommendations
  return moduleScores.sort((a, b) => b.score - a.score).map((module, index) => ({
    ...module,
    priority: index + 1
  }));
};