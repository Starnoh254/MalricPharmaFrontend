// src/components/checkout/CheckoutSteps.tsx
import { CheckCircle, Truck, CreditCard, ShieldCheck } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  {
    id: "shipping",
    name: "Shipping Information",
    description: "Where should we deliver?",
    icon: Truck,
  },
  {
    id: "payment",
    name: "Payment Method",
    description: "How would you like to pay?",
    icon: CreditCard,
  },
  {
    id: "confirmation",
    name: "Confirm Order",
    description: "Review and place your order",
    icon: ShieldCheck,
  },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex();
  };

  const isStepCurrent = (stepIndex: number) => {
    return stepIndex === getCurrentStepIndex();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8 mb-6 md:mb-8">
      <nav aria-label="Progress">
        {/* Mobile Layout (Vertical) */}
        <div className="block sm:hidden">
          <div className="space-y-4">
            {steps.map((step, stepIndex) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300 flex-shrink-0
                    ${
                      isStepCompleted(stepIndex)
                        ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 text-white"
                        : isStepCurrent(stepIndex)
                        ? "border-blue-500 text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100"
                        : "border-gray-200 text-gray-400 bg-gray-50"
                    }
                  `}
                  >
                    {isStepCompleted(stepIndex) ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}

                    {/* Animated ring for current step */}
                    {isStepCurrent(stepIndex) && (
                      <div className="absolute inset-0 rounded-xl border-2 border-blue-300 animate-pulse"></div>
                    )}
                  </div>

                  <div className="ml-4 flex-grow">
                    <p
                      className={`text-sm font-semibold transition-colors duration-200 ${
                        isStepCurrent(stepIndex)
                          ? "text-blue-600"
                          : isStepCompleted(stepIndex)
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Step number indicator */}
                  <div className="text-xs text-gray-400 font-medium ml-2">
                    {stepIndex + 1}/3
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet and Desktop Layout (Horizontal) */}
        <ol className="hidden sm:flex items-center justify-between">
          {steps.map((step, stepIndex) => {
            const StepIcon = step.icon;
            return (
              <li key={step.id} className="flex-1">
                <div className="flex items-center">
                  <div className="flex flex-col items-center group">
                    <div
                      className={`
                      relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl border-3 transition-all duration-300 shadow-lg
                      ${
                        isStepCompleted(stepIndex)
                          ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 text-white shadow-green-200"
                          : isStepCurrent(stepIndex)
                          ? "border-blue-500 text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 shadow-blue-200"
                          : "border-gray-200 text-gray-400 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                      }
                    `}
                    >
                      {isStepCompleted(stepIndex) ? (
                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />
                      ) : (
                        <StepIcon className="w-6 h-6 md:w-8 md:h-8" />
                      )}

                      {/* Animated ring for current step */}
                      {isStepCurrent(stepIndex) && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-blue-300 animate-pulse"></div>
                      )}
                    </div>

                    <div className="mt-3 md:mt-4 text-center max-w-28 md:max-w-32">
                      <p
                        className={`text-xs md:text-sm font-semibold transition-colors duration-200 ${
                          isStepCurrent(stepIndex)
                            ? "text-blue-600"
                            : isStepCompleted(stepIndex)
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 hidden md:block leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {stepIndex < steps.length - 1 && (
                    <div className="flex-1 mx-4 md:mx-6 hidden sm:block">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          isStepCompleted(stepIndex)
                            ? "bg-gradient-to-r from-green-500 to-green-400"
                            : "bg-gray-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
