export const navigation = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Our work" },
  { href: "/news", label: "News" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/mosque-project", label: "Mosque project" },
  { href: "/get-involved", label: "Get involved" },
];
export const images = {
  community: {
    src: "/images/community-illustration.webp",
    alt: "AI-generated illustration of fictional neighbours sharing a meal in a courtyard, not a real LIM event",
  },
  volunteer: {
    src: "/images/volunteer.webp",
    alt: "Volunteers working together — illustrative photography",
  },
  together: {
    src: "/images/together.webp",
    alt: "Friends gathering outdoors — illustrative photography",
  },
  architecture: {
    src: "/images/architecture.webp",
    alt: "Historic courtyard at the Alhambra in Spain — architectural inspiration, not the Moldova project",
  },
};
export type Programme = {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  assistance: string[];
  image: keyof typeof images;
  body: string;
};
export const programmes: Programme[] = [
  {
    slug: "community-care",
    title: "Community care",
    summary:
      "Practical support begins with listening. A place to explore how people can find a helping hand.",
    audience: "Individuals and families looking for community support.",
    assistance: [
      "Listening and understanding individual needs",
      "Information about potential support pathways",
      "Connections with community volunteers",
    ],
    image: "volunteer",
    body: "This example programme page shows how practical community support could be presented. Eligibility, available assistance and referral arrangements will be published after confirmation by LIM.",
  },
  {
    slug: "education-dialogue",
    title: "Education & dialogue",
    summary:
      "Creating room for questions, shared learning, and a better understanding of one another.",
    audience:
      "Young people, families and neighbours interested in learning together.",
    assistance: [
      "Community learning opportunities",
      "Spaces for respectful conversation",
      "Resources for understanding and inclusion",
    ],
    image: "together",
    body: "Learning can make unfamiliar experiences more approachable. This proposed content category provides space for future workshops, learning resources and community dialogue. No sessions or services are currently advertised through this prototype.",
  },
  {
    slug: "faith-belonging",
    title: "Faith & belonging",
    summary:
      "Making space for faith in everyday life, with dignity and a sense of belonging.",
    audience:
      "Community members seeking information about faith and shared spaces.",
    assistance: [
      "Community information",
      "Future gathering announcements",
      "Ways to take part in community life",
    ],
    image: "community",
    body: "This illustrative category brings together information about faith and community. Official guidance, gathering arrangements and service details will be supplied by LIM before publication.",
  },
];
export type Story = {
  slug: string;
  title: string;
  category: "Community" | "Announcements" | "Advocacy";
  date: string;
  image: keyof typeof images;
  excerpt: string;
  body: string[];
};
export const stories: Story[] = [
  {
    slug: "a-place-at-the-table",
    title: "A place at the table",
    category: "Community",
    date: "2026-10-20",
    image: "community",
    excerpt:
      "Exploring the simple connections that help a community feel like home.",
    body: [
      "A shared table can make space for conversations that might not happen elsewhere. Food, familiar stories and new perspectives offer a starting point for getting to know our neighbours.",
      "This sample editorial explores the idea of belonging. It demonstrates how a community story could appear on the LIM website; it does not describe an actual LIM event.",
      "Future stories will feature approved accounts, first-hand voices and photography shared with permission.",
    ],
  },
  {
    slug: "give-your-time",
    title: "Small acts. Shared purpose.",
    category: "Announcements",
    date: "2026-10-15",
    image: "volunteer",
    excerpt: "A first look at the future volunteer experience.",
    body: [
      "People bring different skills and different amounts of time. A welcoming volunteer experience should help everyone find a meaningful way to contribute.",
      "This prototype illustrates how future opportunities could be introduced. Volunteer roles, availability and safeguarding arrangements have not yet been confirmed.",
      "Try the sample application to explore the experience. It stays in this browser session and is not delivered to LIM.",
    ],
  },
  {
    slug: "listening-with-care",
    title: "Every experience deserves to be heard",
    category: "Advocacy",
    date: "2026-10-08",
    image: "together",
    excerpt:
      "Designing a more considered way to share experiences of discrimination.",
    body: [
      "Sharing a difficult experience can take courage. A reporting process should explain what is needed, allow time for reflection and be clear about what happens next.",
      "The proposed reporting experience uses short steps and a review screen. It asks only for information relevant to the report, with optional contact details.",
      "This is a design demonstration. No case is created, no information is sent to LIM and no response service is promised. The final process will require an approved privacy policy and operational arrangements.",
    ],
  },
];
export type Report = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  sections: string[];
};
export const reports: Report[] = [
  {
    slug: "community-perspectives",
    title: "Community perspectives",
    category: "Research",
    year: "2026",
    description:
      "An example format for listening, learning and presenting community perspectives.",
    sections: [
      "Purpose and scope",
      "Listening methodology",
      "Community perspectives",
      "Recommendations and next steps",
    ],
  },
  {
    slug: "dignity-and-inclusion",
    title: "Dignity & inclusion",
    category: "Advocacy",
    year: "2026",
    description:
      "A sample publication layout for future advocacy priorities and recommendations.",
    sections: [
      "Context and purpose",
      "Principles of inclusion",
      "Areas for further research",
      "Proposed recommendations",
    ],
  },
];
export const mosqueFaqs = [
  [
    "Is this the final mosque design?",
    "No. The photography is architectural inspiration from the Alhambra in Spain. It is not a rendering, approved design or existing LIM building.",
  ],
  [
    "What is the current project status?",
    "Confirmed status information has not been supplied. Land, approvals, budget, design team and construction dates are all awaiting official information.",
  ],
  [
    "Can I support the project now?",
    "You can explore the prototype support form. No money is collected and no enquiry is sent. Official support arrangements will be added after approval.",
  ],
  [
    "Where will future updates appear?",
    "This page is designed to hold verified milestones and announcements. The news section can also feature approved project updates.",
  ],
];
