const foodImg = (id) => "pot-food/" + id + ".jpg";
const PROTEINS = [
  { id: "beef", name: "Ground Beef", emo: "\ud83e\udd69", cal: 430, protein: 37, cost: 3.40, time: 12 },
  { id: "chicken", name: "Chicken Thigh", emo: "\ud83c\udf57", cal: 320, protein: 40, cost: 2.80, time: 14 },
  { id: "turkey", name: "Ground Turkey", emo: "\ud83e\udd83", cal: 300, protein: 42, cost: 2.60, time: 12 },
  { id: "pork", name: "Pork", emo: "\ud83d\udc37", cal: 380, protein: 36, cost: 2.90, time: 14 },
  { id: "shrimp", name: "Shrimp", emo: "\ud83e\udd90", cal: 200, protein: 42, cost: 6.20, time: 8 },
  { id: "salmon", name: "Salmon", emo: "\ud83d\udc1f", cal: 420, protein: 46, cost: 7.40, time: 10 },
  { id: "eggs", name: "Eggs", emo: "\ud83e\udd5a", cal: 280, protein: 24, cost: 1.50, time: 7 }
];
const VEG = [
  { id: "broccoli", name: "Broccoli", emo: "\ud83e\udd66", cal: 68, protein: 6, fiber: 5.2, cost: 1.20 },
  { id: "spinach", name: "Spinach", emo: "\ud83e\udd6c", cal: 46, protein: 6, fiber: 4.4, cost: 1.50 },
  { id: "zucchini", name: "Zucchini", emo: "\ud83e\udd52", cal: 38, protein: 3, fiber: 2.2, cost: 1.10 },
  { id: "peppers", name: "Peppers", emo: "\ud83e\uded1", cal: 62, protein: 2, fiber: 4.0, cost: 1.40 },
  { id: "mushrooms", name: "Mushrooms", emo: "\ud83c\udf44", cal: 50, protein: 6, fiber: 2.0, cost: 1.80 },
  { id: "cabbage", name: "Cabbage", emo: "\ud83e\udd6c", cal: 50, protein: 3, fiber: 4.6, cost: 0.70 },
  { id: "onion", name: "Onion", emo: "\ud83e\uddc5", cal: 80, protein: 2, fiber: 3.4, cost: 0.60 },
  { id: "greenbeans", name: "Green Beans", emo: "\ud83e\uded8", cal: 70, protein: 4, fiber: 6.0, cost: 1.20 },
  { id: "cauliflower", name: "Cauliflower", emo: "\ud83e\udd0d", cal: 50, protein: 4, fiber: 4.0, cost: 1.30 },
  { id: "carrots", name: "Carrots", emo: "\ud83e\udd55", cal: 82, protein: 2, fiber: 5.6, cost: 0.80 }
];
const FLAVORS = [
  { id: "mexican", name: "Mexican", emo: "\ud83c\udf2e", spices: ["Cumin", "Chili Powder", "Garlic", "Oregano"], finish: "Lime", spicy: true },
  { id: "italian", name: "Italian", emo: "\ud83c\uddee\ud83c\uddf9", spices: ["Oregano", "Basil", "Garlic", "Chili Flake"], finish: "Parsley", spicy: false },
  { id: "puertorican", name: "Puerto Rican", emo: "\ud83c\uddf5\ud83c\uddf7", spices: ["Sofrito", "Adobo", "Sazon", "Oregano"], finish: "Cilantro", spicy: false },
  { id: "greek", name: "Greek", emo: "\ud83c\uddec\ud83c\uddf7", spices: ["Oregano", "Lemon", "Garlic", "Dill"], finish: "Lemon", spicy: false },
  { id: "indian", name: "Indian", emo: "\ud83c\uddee\ud83c\uddf3", spices: ["Cumin", "Turmeric", "Garam Masala", "Garlic"], finish: "Cilantro", spicy: true },
  { id: "cajun", name: "Cajun", emo: "\ud83c\udf36", spices: ["Cajun spice", "Paprika", "Garlic", "Thyme"], finish: "Hot sauce", spicy: true },
  { id: "asian", name: "Asian Ginger-Garlic", emo: "\ud83e\udd62", spices: ["Ginger", "Garlic", "Soy", "Scallion"], finish: "Sesame", spicy: false },
  { id: "mediterranean", name: "Mediterranean", emo: "\ud83e\uded2", spices: ["Oregano", "Cumin", "Garlic", "Paprika"], finish: "Olive oil + lemon", spicy: false }
];
const COMBOS = [
  { id: "taco-beef", name: "Taco Beef Pot", emo: "\ud83c\udf2e", protein: "beef", veg: ["peppers", "onion"], flavor: "mexican", delicious: 5 },
  { id: "italian-beef", name: "Italian Beef Pot", emo: "\ud83c\uddee\ud83c\uddf9", protein: "beef", veg: ["zucchini", "onion"], flavor: "italian", delicious: 4 },
  { id: "sofrito-beef", name: "Sofrito Beef Pot", emo: "\ud83c\uddf5\ud83c\uddf7", protein: "beef", veg: ["peppers", "onion"], flavor: "puertorican", delicious: 5 },
  { id: "cabbage-beef", name: "Beef & Cabbage Pot", emo: "\ud83c\udf72", protein: "beef", veg: ["cabbage", "onion"], flavor: "cajun", delicious: 4 },
  { id: "ginger-chicken", name: "Ginger Chicken Pot", emo: "\ud83e\udd62", protein: "chicken", veg: ["broccoli", "carrots"], flavor: "asian", delicious: 5 },
  { id: "greek-chicken", name: "Greek Chicken Pot", emo: "\ud83c\uddec\ud83c\uddf7", protein: "chicken", veg: ["zucchini", "peppers"], flavor: "greek", delicious: 5 },
  { id: "cajun-chicken", name: "Cajun Chicken Pot", emo: "\ud83c\udf36", protein: "chicken", veg: ["peppers", "onion"], flavor: "cajun", delicious: 4 },
  { id: "italian-turkey", name: "Italian Turkey Pot", emo: "\ud83c\uddee\ud83c\uddf9", protein: "turkey", veg: ["zucchini", "spinach"], flavor: "italian", delicious: 4 },
  { id: "taco-turkey", name: "Turkey Taco Pot", emo: "\ud83c\udf2e", protein: "turkey", veg: ["peppers", "onion"], flavor: "mexican", delicious: 4 },
  { id: "med-turkey", name: "Mediterranean Turkey", emo: "\ud83e\uded2", protein: "turkey", veg: ["cauliflower", "spinach"], flavor: "mediterranean", delicious: 4 },
  { id: "cajun-pork", name: "Cajun Pork Pot", emo: "\ud83c\udf36", protein: "pork", veg: ["cabbage", "peppers"], flavor: "cajun", delicious: 5 },
  { id: "sofrito-pork", name: "Sofrito Pork Pot", emo: "\ud83c\uddf5\ud83c\uddf7", protein: "pork", veg: ["peppers", "onion"], flavor: "puertorican", delicious: 5 },
  { id: "ginger-pork", name: "Ginger Pork Pot", emo: "\ud83e\udd62", protein: "pork", veg: ["greenbeans", "carrots"], flavor: "asian", delicious: 4 },
  { id: "cajun-shrimp", name: "Cajun Shrimp Pot", emo: "\ud83e\udd90", protein: "shrimp", veg: ["peppers", "zucchini"], flavor: "cajun", delicious: 5 },
  { id: "garlic-shrimp", name: "Ginger-Garlic Shrimp", emo: "\ud83e\udd62", protein: "shrimp", veg: ["broccoli", "mushrooms"], flavor: "asian", delicious: 5 },
  { id: "greek-shrimp", name: "Greek Shrimp Pot", emo: "\ud83c\uddec\ud83c\uddf7", protein: "shrimp", veg: ["spinach", "zucchini"], flavor: "greek", delicious: 4 },
  { id: "med-salmon", name: "Mediterranean Salmon", emo: "\ud83e\uded2", protein: "salmon", veg: ["spinach", "zucchini"], flavor: "mediterranean", delicious: 5 },
  { id: "ginger-salmon", name: "Ginger Salmon Pot", emo: "\ud83e\udd62", protein: "salmon", veg: ["broccoli", "carrots"], flavor: "asian", delicious: 5 },
  { id: "cajun-salmon", name: "Cajun Salmon Pot", emo: "\ud83c\udf36", protein: "salmon", veg: ["peppers", "onion"], flavor: "cajun", delicious: 4 },
  { id: "indian-eggs", name: "Masala Egg Pot", emo: "\ud83c\uddee\ud83c\uddf3", protein: "eggs", veg: ["spinach", "onion"], flavor: "indian", delicious: 4 },
  { id: "med-eggs", name: "Mediterranean Eggs", emo: "\ud83e\uded2", protein: "eggs", veg: ["spinach", "peppers"], flavor: "mediterranean", delicious: 4 },
  { id: "italian-eggs", name: "Italian Egg Pot", emo: "\ud83c\uddee\ud83c\uddf9", protein: "eggs", veg: ["zucchini", "spinach"], flavor: "italian", delicious: 3 }
];
