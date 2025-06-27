// src/components/checkout/CheckoutSteps.tsx
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  {
    id: "shipping",
    name: "Shipping Information",
    description: "Where should we deliver?",
  },
  {
    id: "payment",
    name: "Payment Method",
    description: "How would you like to pay?",
  },
  {
    id: "confirmation",
    name: "Confirm Order",
    description: "Review and place your order",
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, stepIndex) => (
            <li key={step.id} className="flex-1">
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${
                      isStepCompleted(stepIndex)
                        ? "bg-green-600 border-green-600 text-white"
                        : isStepCurrent(stepIndex)
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-gray-300 text-gray-500"
                    }
                  `}
                  >
                    {isStepCompleted(stepIndex) ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        isStepCurrent(stepIndex)
                          ? "text-blue-600"
                          : isStepCompleted(stepIndex)
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>

                {stepIndex < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <ArrowRight
                      className={`w-5 h-5 mx-auto ${
                        isStepCompleted(stepIndex)
                          ? "text-green-600"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
