import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnswerOptionsGridProps<T> {
  options: T[];
  getKey: (option: T, index: number) => string;
  getLabel: (option: T) => string;
  isCorrectOption: (option: T) => boolean;
  selectedOption: T | null;
  showResult: boolean;
  isSelectionCorrect: boolean; // corresponds to state.isCorrect
  onSelect: (option: T) => void;
}

export function AnswerOptionsGrid<T>({
  options,
  getKey,
  getLabel,
  isCorrectOption,
  selectedOption,
  showResult,
  isSelectionCorrect,
  onSelect,
}: AnswerOptionsGridProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => {
        const key = getKey(option, index);
        const selected = selectedOption === option;
        const correct = isCorrectOption(option);
        const wrongSelection = showResult && selected && !isSelectionCorrect;
        const rightSelection = showResult && selected && isSelectionCorrect;
        const glowCorrect = showResult && !isSelectionCorrect && correct;

        const opacityClass = showResult
          ? (correct ? "opacity-100" : (wrongSelection ? "opacity-10" : "opacity-10"))
          : "opacity-100";

        return (
          <Button
            key={key}
            variant="outline"
            size="lg"
            className={cn(
              "h-16 text-lg font-medium game-button relative",
              opacityClass,
              showResult && "pointer-events-none",
              rightSelection && "answer-correct success-pop success-halo",
              wrongSelection && "answer-wrong shake-soft",
              glowCorrect && "answer-correct-target success-pop success-halo"
            )}
            onClick={() => !showResult && onSelect(option)}
          >
            {getLabel(option)}
            {showResult && selected && (
              <span
                className={cn(
                  "answer-floater text-2xl font-bold",
                  isSelectionCorrect ? "text-success" : "text-destructive"
                )}
              >
                {isSelectionCorrect ? "✓" : "X"}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}


