import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MealPlanner = () => {
  // Mock data with expanded information
  const weeklyData = {
    meals: [
      {
        day: "Monday",
        meal: "Grilled Chicken Salad",
        nutrition: {
          protein: "32g",
          carbs: "15g",
          fats: "12g",
          quantity: "400g"
        },
        ingredients: [
          { name: "Chicken breast", quantity: "200g" },
          { name: "Mixed greens", quantity: "100g" },
          { name: "Olive oil", quantity: "15ml" }
        ],
        recipe: "1. Season chicken breast\n2. Grill for 6-8 minutes each side\n3. Slice and serve over mixed greens\n4. Drizzle with olive oil"
      },
      {
        day: "Tuesday",
        meal: "Vegetable Stir Fry",
        nutrition: {
          protein: "15g",
          carbs: "30g",
          fats: "8g",
          quantity: "350g"
        },
        ingredients: [
          { name: "Mixed vegetables", quantity: "250g" },
          { name: "Tofu", quantity: "100g" },
          { name: "Soy sauce", quantity: "30ml" }
        ],
        recipe: "1. Cube tofu\n2. Stir fry vegetables\n3. Add tofu and sauce\n4. Cook until heated through"
      },
      {
        day: "Wednesday",
        meal: "Baked Salmon",
        nutrition: {
          protein: "42g",
          carbs: "0g",
          fats: "22g",
          quantity: "300g"
        },
        ingredients: [
          { name: "Salmon fillet", quantity: "200g" },
          { name: "Lemon", quantity: "1 piece" },
          { name: "Herbs", quantity: "10g" }
        ],
        recipe: "1. Preheat oven to 400°F\n2. Season salmon\n3. Bake for 12-15 minutes"
      }
    ],
    groceries: [
      { name: "Chicken breast", price: 8.99 },
      { name: "Mixed greens", price: 3.99 },
      { name: "Olive oil", price: 6.99 },
      { name: "Mixed vegetables", price: 4.99 },
      { name: "Tofu", price: 2.99 },
      { name: "Soy sauce", price: 3.49 },
      { name: "Salmon fillet", price: 12.99 },
      { name: "Lemon", price: 0.99 },
      { name: "Herbs", price: 1.99 }
    ]
  };

  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({});

  const toggleMeal = (day: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              Weekly Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.meals.map((item, index) => (
                <Collapsible
                  key={index}
                  open={expandedMeals[item.day]}
                  onOpenChange={() => toggleMeal(item.day)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="font-medium min-w-24">{item.day}</span>
                        <span>{item.meal}</span>
                      </div>
                      {expandedMeals[item.day] ? (
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
                          <div>Protein: {item.nutrition.protein}</div>
                          <div>Carbs: {item.nutrition.carbs}</div>
                          <div>Fats: {item.nutrition.fats}</div>
                          <div>Quantity: {item.nutrition.quantity}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Ingredients</h4>
                        <ul className="space-y-1">
                          {item.ingredients.map((ing, idx) => (
                            <li key={idx}>
                              {ing.name} - {ing.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recipe</h4>
                        <pre className="whitespace-pre-wrap text-sm">{item.recipe}</pre>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <List className="h-6 w-6" />
              Grocery List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {weeklyData.groceries.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <span>{item.name}</span>
                  <span className="font-medium">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanner;