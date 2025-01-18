import { useState } from "react";
import { WeekSelector } from "@/components/meal-planner/WeekSelector";
import { MealList } from "@/components/meal-planner/MealList";
import { GroceryList } from "@/components/meal-planner/GroceryList";

type WeekNumber = 1 | 2;

const MealPlanner = () => {
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
      meals: [],
      groceries: []
    }
  };

  const toggleGroceryItem = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const currentWeekData = weeklyData[selectedWeek];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <WeekSelector
        selectedWeek={selectedWeek}
        onWeekChange={setSelectedWeek}
        weeks={Object.keys(weeklyData).map(Number)}
      />
      <div className="space-y-8">
        <MealList meals={currentWeekData.meals} />
        <GroceryList
          groceries={currentWeekData.groceries}
          checkedItems={checkedItems}
          onToggleItem={toggleGroceryItem}
        />
      </div>
    </div>
  );
};

export default MealPlanner;
