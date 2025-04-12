import { CheckCircle } from "lucide-react";

export function FeatureCard({ title, description }) {
  return (
    <div className="text-center p-4">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-100">{description}</p>
    </div>
  );
}
