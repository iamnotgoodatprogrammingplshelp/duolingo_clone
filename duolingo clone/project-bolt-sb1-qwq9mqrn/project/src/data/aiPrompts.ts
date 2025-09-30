interface LessonPrompts {
  [key: string]: {
    introduction: string;
    questions: string[];
    followUps: string[];
  };
}

export const lessonPrompts: LessonPrompts = {
  'basic-greetings': {
    introduction: "Hello! I'm your AI language tutor. Today we're practicing greetings. I'll ask you questions and you can respond naturally. Let's start!",
    questions: [
      "How would you greet someone you're meeting for the first time in a formal setting?",
      "What would you say when you see a close friend after a long time?",
      "How do you typically say goodbye at the end of a workday?",
      "What's an appropriate greeting when entering someone's home?",
      "How would you greet your teacher at the beginning of class?"
    ],
    followUps: [
      "That's great! Can you think of a more casual way to say that?",
      "Perfect! What if you were talking to someone much older?",
      "Excellent! How about in a more formal situation?",
      "Good response! Can you add something to ask how they are?",
      "Nice! What would you say if it was evening instead?"
    ]
  },
  'family-vocabulary': {
    introduction: "Welcome! Today we're exploring family vocabulary. I'll describe situations and ask you to respond using family terms. Ready to begin?",
    questions: [
      "Tell me about the people in your immediate family using proper family terms.",
      "How would you introduce your mother's sister to a friend?",
      "What do you call your father's parents?",
      "Describe the relationship between you and your sibling's child.",
      "How would you refer to your spouse's family members?"
    ],
    followUps: [
      "Great! Can you use those terms in a complete sentence?",
      "Perfect! What about extended family on your father's side?",
      "Excellent! How would you explain that relationship to a child?",
      "Good! Can you think of the formal term for that relationship?",
      "Nice work! What's another way to say that?"
    ]
  },
  'present-tense': {
    introduction: "Let's practice present tense verbs! I'll give you scenarios and you respond using correct present tense forms. Here we go!",
    questions: [
      "Describe what you do every morning using present tense verbs.",
      "Tell me about your friend's daily work routine.",
      "What happens when you go to a restaurant?",
      "Describe what students do in a typical classroom.",
      "Explain what a chef does during lunch service."
    ],
    followUps: [
      "Excellent! Can you change that to third person singular?",
      "Great! Now try making that sentence negative.",
      "Perfect! What's the question form of that statement?",
      "Good! Can you use a different subject pronoun?",
      "Nice! How would you make that more specific with time?"
    ]
  },
  'food-ordering': {
    introduction: "Time to practice ordering food! I'll create restaurant scenarios and you respond as if you're actually ordering. Let's dive in!",
    questions: [
      "You're at a nice restaurant and the waiter approaches. How do you start your order?",
      "The waiter asks about drinks. What do you say?",
      "You want to know about today's special. How do you ask?",
      "You need to specify how you want your steak cooked. What do you tell them?",
      "It's time for dessert. How do you inquire about options?"
    ],
    followUps: [
      "Perfect! What if you have dietary restrictions to mention?",
      "Great! How would you ask about the ingredients?",
      "Excellent! What if you want to change your order?",
      "Good! How would you ask for the check?",
      "Nice! What if you want to compliment the chef?"
    ]
  },
  'travel-phrases': {
    introduction: "Let's prepare for travel! I'll create travel situations and you practice the essential phrases you'd need. Ready for your virtual trip?",
    questions: [
      "You're at airport security. How do you respond when they ask about your luggage?",
      "You need directions to your hotel. What do you ask a local?",
      "You're checking into your hotel. What do you tell the receptionist?",
      "You want to order a taxi. How do you communicate your destination?",
      "You're at a tourist information center. How do you ask for recommendations?"
    ],
    followUps: [
      "Great! What if they don't understand your accent?",
      "Perfect! How do you ask them to repeat more slowly?",
      "Excellent! What if there's a problem with your reservation?",
      "Good! How do you confirm the price before getting in?",
      "Nice! How would you ask about opening hours?"
    ]
  },
  'business-vocabulary': {
    introduction: "Welcome to business communication practice! I'll present professional scenarios and you respond using appropriate business vocabulary. Let's get started!",
    questions: [
      "You're introducing yourself in a business meeting. What do you say?",
      "How do you professionally disagree with a colleague's proposal?",
      "You need to schedule a follow-up meeting. What do you suggest?",
      "How do you ask for clarification on a complex project requirement?",
      "You want to propose a new initiative to your team. How do you present it?"
    ],
    followUps: [
      "Excellent! How would you make that sound more confident?",
      "Great! What if you were talking to a senior executive?",
      "Perfect! How do you handle scheduling conflicts?",
      "Good! What if the explanation is still unclear?",
      "Nice! How do you address potential concerns about your proposal?"
    ]
  }
};