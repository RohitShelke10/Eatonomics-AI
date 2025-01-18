import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type WeekNumber = 1 | 2;

interface WeekSelectorProps {
  selectedWeek: WeekNumber;
  onWeekChange: (week: WeekNumber) => void;
  weeks: number[];
}

export const WeekSelector = ({ selectedWeek, onWeekChange, weeks }: WeekSelectorProps) => {
  return (
    <div className="mb-6">
      <Select
        value={selectedWeek.toString()}
        onValueChange={(value) => onWeekChange(Number(value) as WeekNumber)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select week" />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((week) => (
            <SelectItem key={week} value={week.toString()}>
              Week {week}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};