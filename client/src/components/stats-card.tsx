import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color: "red" | "green" | "amber" | "blue";
}

const colorClasses = {
  red: {
    border: "border-l-red-500",
    bg: "bg-red-100",
    icon: "text-red-600",
  },
  green: {
    border: "border-l-green-500",
    bg: "bg-green-100",
    icon: "text-green-600",
  },
  amber: {
    border: "border-l-amber-500",
    bg: "bg-amber-100",
    icon: "text-amber-600",
  },
  blue: {
    border: "border-l-blue-500",
    bg: "bg-blue-100",
    icon: "text-blue-600",
  },
};

export default function StatsCard({ icon: Icon, value, label, color }: StatsCardProps) {
  const colors = colorClasses[color];
  
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${colors.border}`}>
      <div className="flex items-center">
        <div className={`${colors.bg} p-3 rounded-full`}>
          <Icon className={`${colors.icon} h-6 w-6`} />
        </div>
        <div className="ml-4">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}
