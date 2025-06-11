import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Welcome } from './components/Introduction/Welcome';
import { ContactForm } from './components/Introduction/ContactForm';
import { QuestionnaireContainer } from './components/Assessment/QuestionnaireContainer';
import { ResultsContainer } from './components/Results/ResultsContainer';
import { AssessmentProvider } from './context/AssessmentContext';
import { Stepper } from './components/Common/Stepper';
export function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{
    id: 0,
    name: 'Welcome',
    component: <Welcome onContinue={() => setCurrentStep(1)} />
  }, {
    id: 1,
    name: 'Contact Info',
    component: <ContactForm onContinue={() => setCurrentStep(2)} />
  }, {
    id: 2,
    name: 'Assessment',
    component: <QuestionnaireContainer onContinue={() => setCurrentStep(3)} />
  }, {
    id: 3,
    name: 'Results',
    component: <ResultsContainer onRestart={() => setCurrentStep(0)} />
  }];
  return <AssessmentProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="mt-8">{steps[currentStep].component}</div>
        </main>
        <Footer />
      </div>
    </AssessmentProvider>;
}