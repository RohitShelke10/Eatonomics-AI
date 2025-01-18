import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type WeekNumber = 1 | 2;

const MealPlanner = () => {
  const [expandedMeals, setExpandedMeals] = useState<{ [key: string]: boolean }>({});
  const [selectedWeek, setSelectedWeek] = useState<WeekNumber>(1);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  // Mock data with expanded information and week numbers
  const weeklyData = {
    1: {
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
    },
    2: {
      meals: [
        // ... Similar structure for week 2
      ],
      groceries: [
        // ... Similar structure for week 2
      ]
    }
  };

  const toggleMeal = (day: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const toggleGroceryItem = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const calculateTotal = (groceries: Array<{ name: string; price: number }>) => {
    return groceries.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const currentWeekData = weeklyData[selectedWeek];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Select
          value={selectedWeek.toString()}
          onValueChange={(value) => setSelectedWeek(Number(value) as WeekNumber)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(weeklyData).map((week) => (
              <SelectItem key={week} value={week}>
                Week {week}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
              {currentWeekData?.meals.map((item, index) => (
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
            <div className="space-y-3">
              {currentWeekData?.groceries.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={checkedItems[item.name]}
                      onCheckedChange={() => toggleGroceryItem(item.name)}
                    />
                    <span className={checkedItems[item.name] ? "line-through" : ""}>
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium">${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t">
                <span className="font-semibold">
                  Total: ${calculateTotal(currentWeekData?.groceries || [])}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanner;