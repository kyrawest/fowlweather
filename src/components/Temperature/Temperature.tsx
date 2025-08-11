//Types
import { TempUnit } from "types/TempUnit";

export type TemperatureProps = {
  tempUnit: TempUnit;
  temperature: number;
  prefix?: string;
  className?: string;
};

export default function Temperature({
  tempUnit,
  temperature,
  prefix,
  className,
}: TemperatureProps) {
  const unitContent = tempUnit == TempUnit.celsius ? "°C" : "°F";
  return (
    <div className={`temperature ${className}`}>
      <span>
        {prefix}
        {Math.round(temperature)}
        {unitContent}
      </span>
    </div>
  );
}
