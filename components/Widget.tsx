// components/widget.tsx
import React from "react";

interface WidgetProps {
  number: string;
  description: string;
}

const Widget: React.FC<WidgetProps> = ({ number, description }) => (
  <div className="px-4 py-8 text-center bg-white rounded">
    <p className="text-6xl font-bold">{number}</p>
    <p className="text-lg">{description}</p>
  </div>
);

export default Widget;
