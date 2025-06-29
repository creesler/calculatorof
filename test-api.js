const testData = {
  title: "Pet Food Calculator",
  slug: "pet-food-calculator",
  category: ["pets", "nutrition"],
  seo: {
    title: "Pet Food Calculator - Calculate Perfect Portions",
    description: "Calculate the perfect food portions for your pets"
  },
  shortIntro: "Calculate optimal pet food portions",
  calculatorComponent: "PetFoodCalculator",
  descriptionHtml: "<p>Calculate the perfect portions for your pets.</p>",
  keywords: ["pet food", "calculator"],
  faqs: [
    {
      question: "How much should I feed my pet?",
      answer: "It depends on their weight and activity level."
    }
  ],
  externalLinks: [
    {
      label: "Pet Nutrition Guide",
      url: "https://example.com/guide"
    }
  ],
  screenshot: {
    imageUrl: "https://example.com/screenshot.jpg",
    altText: "Pet Food Calculator Screenshot"
  }
};

async function testApi() {
  try {
    const response = await fetch('http://localhost:3000/api/create-calculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testApi(); 