export const EXPECTATIONS = [
  {
    title: "No small talk required",
    body: "Ask directly if you want to. You don't have to warm up to it first.",
  },
  {
    title: "Answers you can sit with",
    body: "Plain language, said once and said clearly. No jargon, no padding.",
  },
  {
    title: "Private, by default",
    body: "What you write here stays tied to your account. It isn't shared or scored.",
  },
] as const;

export const FAQS = [
  {
    q: "Is this therapy?",
    a: "No. NIVA is a place to think things through and get grounded answers. It doesn't replace a clinician, therapist, or doctor.",
  },
  {
    q: "Who is this for?",
    a: "Autistic people, and the parents, caregivers, or family members supporting them, looking for clear answers without a lot of searching.",
  },
  {
    q: "What if I don't like an answer?",
    a: "Ask again, ask differently, or stop. There's no pressure to keep going once you have what you need.",
  },
  {
    q: "Can I trust what it tells me?",
    a: "It's built to be careful and specific rather than confident for its own sake. If something needs a professional, it will say so plainly.",
  },
] as const;

export type Expectation = (typeof EXPECTATIONS)[number];
export type Faq = (typeof FAQS)[number];
