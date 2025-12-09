// Snacks Database
const snacksData = [
    // Japanese Snacks
    {
        id: 1,
        name: "Pocky Strawberry",
        country: "Japan",
        category: "Cookies",
        price: 3.99,
        description: "Classic Japanese chocolate-covered biscuit sticks with strawberry flavor",
        icon: "🍓"
    },
    {
        id: 2,
        name: "Kit Kat Matcha",
        country: "Japan",
        category: "Chocolate",
        price: 5.99,
        description: "Green tea flavored Kit Kat, exclusive to Japan",
        icon: "🍵"
    },
    {
        id: 3,
        name: "Calbee Shrimp Chips",
        country: "Japan",
        category: "Chips",
        price: 4.49,
        description: "Crispy shrimp-flavored rice crackers",
        icon: "🦐"
    },
    {
        id: 4,
        name: "Tokyo Banana",
        country: "Japan",
        category: "Cookies",
        price: 8.99,
        description: "Soft banana-shaped cake with custard cream filling",
        icon: "🍌"
    },
    
    // Korean Snacks
    {
        id: 5,
        name: "Honey Butter Chips",
        country: "Korea",
        category: "Chips",
        price: 4.99,
        description: "Sweet and savory potato chips with honey butter flavor",
        icon: "🍯"
    },
    {
        id: 6,
        name: "Pepero Original",
        country: "Korea",
        category: "Cookies",
        price: 3.49,
        description: "Chocolate-coated biscuit sticks, Korea's favorite snack",
        icon: "🍫"
    },
    {
        id: 7,
        name: "Choco Pie",
        country: "Korea",
        category: "Cookies",
        price: 6.99,
        description: "Soft marshmallow sandwiched between cake and covered in chocolate",
        icon: "🎂"
    },
    {
        id: 8,
        name: "Shrimp Crackers",
        country: "Korea",
        category: "Crackers",
        price: 3.99,
        description: "Light and crispy shrimp-flavored crackers",
        icon: "🦐"
    },
    
    // American Snacks
    {
        id: 9,
        name: "Doritos Nacho Cheese",
        country: "USA",
        category: "Chips",
        price: 4.49,
        description: "Classic triangle-shaped tortilla chips with nacho cheese flavor",
        icon: "🧀"
    },
    {
        id: 10,
        name: "Oreo Original",
        country: "USA",
        category: "Cookies",
        price: 4.99,
        description: "America's favorite cookie with cream filling",
        icon: "🍪"
    },
    {
        id: 11,
        name: "Reese's Peanut Butter Cups",
        country: "USA",
        category: "Chocolate",
        price: 2.99,
        description: "Chocolate cups filled with peanut butter",
        icon: "🥜"
    },
    {
        id: 12,
        name: "Cheetos Flamin' Hot",
        country: "USA",
        category: "Chips",
        price: 4.29,
        description: "Spicy cheese-flavored puffed corn snack",
        icon: "🔥"
    },
    
    // Mexican Snacks
    {
        id: 13,
        name: "Takis Fuego",
        country: "Mexico",
        category: "Chips",
        price: 3.99,
        description: "Rolled tortilla chips with intense chili and lime flavor",
        icon: "🌶️"
    },
    {
        id: 14,
        name: "Pulparindo",
        country: "Mexico",
        category: "Candy",
        price: 2.49,
        description: "Tamarind-based candy with chili, sweet and sour flavor",
        icon: "🍬"
    },
    {
        id: 15,
        name: "Duvalin",
        country: "Mexico",
        category: "Candy",
        price: 1.99,
        description: "Creamy hazelnut and vanilla candy spread",
        icon: "🍨"
    },
    
    // UK Snacks
    {
        id: 16,
        name: "Walker's Salt & Vinegar",
        country: "UK",
        category: "Chips",
        price: 3.99,
        description: "Classic British crisps with tangy salt and vinegar flavor",
        icon: "🥔"
    },
    {
        id: 17,
        name: "Cadbury Dairy Milk",
        country: "UK",
        category: "Chocolate",
        price: 4.49,
        description: "Smooth and creamy milk chocolate bar",
        icon: "🍫"
    },
    {
        id: 18,
        name: "McVitie's Digestives",
        country: "UK",
        category: "Cookies",
        price: 4.99,
        description: "Whole wheat biscuits, perfect for tea time",
        icon: "☕"
    },
    
    // Thai Snacks
    {
        id: 19,
        name: "Pretz Tom Yum",
        country: "Thailand",
        category: "Crackers",
        price: 3.49,
        description: "Thin biscuit sticks with authentic Tom Yum flavor",
        icon: "🍜"
    },
    {
        id: 20,
        name: "Mango Sticky Rice Candy",
        country: "Thailand",
        category: "Candy",
        price: 4.99,
        description: "Candy inspired by Thailand's famous dessert",
        icon: "🥭"
    },
    {
        id: 21,
        name: "Coconut Chips",
        country: "Thailand",
        category: "Chips",
        price: 5.49,
        description: "Crispy roasted coconut chips, lightly sweetened",
        icon: "🥥"
    },
    
    // Additional Variety
    {
        id: 22,
        name: "Milky Way",
        country: "USA",
        category: "Chocolate",
        price: 1.99,
        description: "Chocolate bar with nougat and caramel",
        icon: "🌌"
    },
    {
        id: 23,
        name: "Haribo Gold Bears",
        country: "UK",
        category: "Candy",
        price: 3.49,
        description: "Classic fruit-flavored gummy bears",
        icon: "🐻"
    },
    {
        id: 24,
        name: "Yan Yan",
        country: "Japan",
        category: "Cookies",
        price: 2.99,
        description: "Biscuit sticks with chocolate dipping sauce",
        icon: "🍫"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { snacksData };
}