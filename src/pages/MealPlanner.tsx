import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Calendar } from "lucide-react";

const MealPlanner = () => {
  // Mock data for demonstration
  const weeklyData = {
    meals: [
      { day: "Monday", meal: "Grilled Chicken Salad" },
      { day: "Tuesday", meal: "Vegetable Stir Fry" },
      { day: "Wednesday", meal: "Baked Salmon" },
      { day: "Thursday", meal: "Quinoa Bowl" },
      { day: "Friday", meal: "Pasta Primavera" }
    ],
    groceries: [
      "Chicken breast",
      "Mixed salad greens",
      "Vegetables for stir fry",
      "Salmon fillet",
      "Quinoa",
      "Pasta",
      "Olive oil",
      "Seasonings"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {weeklyData.meals.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <span className="font-medium">{item.day}</span>
                  <span>{item.meal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Grocery List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weeklyData.groceries.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanner;