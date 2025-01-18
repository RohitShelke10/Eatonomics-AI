import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Nutrition {
  protein: string;
  carbs: string;
  fats: string;
  quantity: string;
}

interface MealCardProps {
  day: string;
  meal: string;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  recipe: string;
}

export const MealCard = ({ day, meal, nutrition, ingredients, recipe }: MealCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-4">
            <span className="font-medium min-w-24">{day}</span>
            <span>{meal}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 space-y-4 bg-accent rounded-lg mt-2">
          <div>
            <h4 className="font-semibold mb-2">Nutrition Info</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>Protein: {nutrition.protein}</div>
              <div>Carbs: {nutrition.carbs}</div>
              <div>Fats: {nutrition.fats}</div>
              <div>Quantity: {nutrition.quantity}</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ingredients</h4>
            <ul className="space-y-1">
              {ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.name} - {ing.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recipe</h4>
            <pre className="whitespace-pre-wrap text-sm">{recipe}</pre>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};