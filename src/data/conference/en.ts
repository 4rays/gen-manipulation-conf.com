import type {ConferenceContent} from "./types";
import {SITE_TITLE, SITE_DESCRIPTION} from "@/consts";

export const conferenceEn = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  dateLabel: "28–29 January 2027",
  startDate: "2027-01-28",
  endDate: "2027-01-29",
  placeLabel: "KTH, Stockholm",
  hero: {
    lede: "Two days at KTH on how generative AI and algorithmic systems shape attention, choice and well-being, and on the safeguards that protect human autonomy.",
    programmeAction: "See the programme",
    contactAction: "Contact the organisers"
  },
  navigation: [
    {
      href: "#about",
      label: "About"
    },
    {
      href: "#speakers",
      label: "Speakers"
    },
    {
      href: "#programme",
      label: "Programme"
    },
    {
      href: "#venue",
      label: "Venue"
    }
  ],
  facts: [
    {
      label: "When",
      value: "28–29 January 2027"
    },
    {
      label: "Where",
      value: "Lecture room Q1, Malvinas väg 4, 3rd floor, KTH"
    },
    {
      label: "Format",
      value: "Keynotes, talks, round tables and breakout sessions"
    },
    {
      label: "For",
      value: "Scholars, policymakers and industry practitioners"
    }
  ],
  about: {
    heading: "About the conference",
    paragraphs: [
      "AI systems increasingly shape the information we encounter, the decisions we make and the attention we give. Their influence reaches beyond data privacy to questions of autonomy, mental well-being and democratic resilience, with particular risks for young people and older adults.",
      "This conference brings scholars, policymakers and industry practitioners together across engineering, cognitive neuroscience and social policy. Through keynotes, talks and collaborative discussions, we will examine algorithmic manipulation and explore safeguards that protect human agency."
    ],
    subjects: [
      "Influence and human agency",
      "Cognition, attention and well-being",
      "Law, governance and harmful manipulation",
      "Interdisciplinary safeguards and public welfare"
    ]
  },
  speakers: [
    {
      id: "su-ling-yeh",
      name: "Su-Ling Yeh",
      role: "Distinguished Professor",
      institution: "National Taiwan University",
      shortBio:
        "A cognitive neuroscientist studying consciousness, perception and attention, and how human-centric AI and digital technologies affect well-being.",
      fullBio: [
        "Dr. Su-Ling Yeh is the Dean of the College of Science at National Taiwan University (NTU), where she also serves as a Lifetime Distinguished Professor in the Department of Psychology. She earned her PhD in Psychology from the University of California, Berkeley, and has since established herself as a leading researcher in the fields of cognitive neuroscience and psychophysics. Her academic leadership extends across multiple interdisciplinary roles at NTU, including appointments at the Graduate Institute of Brain and Mind Sciences and the Center for Artificial Intelligence and Advanced Data Science.",
        "Throughout her career, Dr. Yeh has focused her research on understanding human consciousness, visual perception, attention, and multisensoric integration. In recent years, her work has increasingly bridged the gap between human cognition and technology, exploring how human-centric design can improve artificial intelligence and how digital technologies affect well-being across different generations. Her extensive contributions to the scientific community have earned her numerous prestigious honors, including the Academic Award from the Ministry of Education in Taiwan and multiple Distinguished Research Awards from the National Science and Technology Council."
      ],
      sessionIds: ["keynote-1"],
      profileUrl:
        "https://www.psy.ntu.edu.tw/index.php/people/faculty/fulltime-faculty/2247-yeh-su-ling"
    },
    {
      id: "aimen-taimur",
      name: "Aimen Taimur",
      role: "Postdoctoral Researcher",
      institution:
        "Institute for Information Law (IViR), University of Amsterdam",
      shortBio:
        "Studies AI, fundamental rights and technology governance, with a focus on cognitive freedom, manipulation and AI-enabled influence.",
      fullBio: [
        "Aimen Taimur is a Postdoctoral Researcher at the Institute for Information Law (IViR), University of Amsterdam, and the AI, Media and Democracy Lab. Her research examines the intersection of artificial intelligence, fundamental rights and technology governance, with a particular focus on cognitive freedom, manipulation, and the regulation of AI-enabled influence."
      ],
      sessionIds: ["eu-regulation"]
    },
    {
      id: "anders-hedman",
      name: "Anders Hedman",
      role: "Associate Professor",
      institution: "KTH – Royal Institute of Technology",
      shortBio:
        "Connects philosophy, computer science and psychology to examine AI, philosophy of mind and human–computer interaction.",
      fullBio: [
        "Anders Hedman is an Associate Professor and Docent in Media Technology and Interaction Design at KTH. His research and teaching combine philosophy, computer science and psychology, with a focus on AI, philosophy of mind and human-computer interaction. He holds a PhD in Human-Computer Interaction from KTH and a double BA in Philosophy and Psychology from the University of California at Berkeley. He has previously been a visiting scholar in the Department of Philosophy at UC Berkeley and worked as a National Expert in the Unit of Future and Emerging Technologies Open at the European Commission."
      ],
      profileUrl: "https://www.kth.se/profile/ahedman",
      sessionIds: ["conferred-agency"]
    },
    {
      id: "sam-verschooren",
      name: "Sam Verschooren",
      role: "Marie Skłodowska-Curie Postdoctoral Fellow",
      institution: "UiT – The Arctic University of Norway",
      shortBio:
        "Studies attention dynamics, interoceptive control, contemplative traditions and human–AI interactions.",
      fullBio: [
        "Sam Verschooren is a Marie Skłodowska-Curie Postdoctoral Fellow at UiT The Arctic University of Norway. He previously held fellowships at the Max Planck Institute for Human Cognitive and Brain Sciences, Humboldt University, Duke University, and Ghent University, where he was also awarded his PhD in Experimental Psychology in 2020. He obtained a Master’s degree in Philosophy (2014) and Psychology (2016). His main research lines focus on the transition dynamics of attention, interoceptive control, contemplative traditions, and human-AI interactions."
      ],
      profileUrl: "https://samverschooren.github.io/",
      sessionIds: ["sam-verschooren-talk"]
    }
  ],
  organisers: [
    {
      id: "anass-sedrati",
      name: "Anass Sedrati",
      role: "Researcher",
      institution: "KTH – Royal Institute of Technology",
      shortBio:
        "Works at the intersection of technology, regulation and governance, bringing together stakeholders across disciplines.",
      fullBio: [
        "Working at the intersection of technology, regulation, and governance, Dr. Sedrati is bridging gaps between these areas, and bringing together different stakeholders to the conference. His research interests include: AI Governance, AI in telecommunications, frequency allocation, sociotechnology and Internet of Things.",
        "Dr. Sedrati is the vice director of the SWEWIN research center at KTH, a research center dedicated to perform world-leading collaborative research, innovation, and education regarding next-generation wireless technologies, and is also a voting member in the Swedish national committee for AI standardization, representing KTH."
      ],
      profileUrl: "https://www.kth.se/profile/anass",
      sessionIds: ["welcome"]
    },
    {
      id: "reda-lemeden",
      name: "Reda Lemeden",
      role: "Founder & Software Engineer",
      institution: "Four Rays (consultancy)",
      shortBio:
        "Builds social and media software platforms for medium-sized and large enterprises.",
      fullBio: [
        "Reda Lemeden is the founder of Four Rays, a software consultancy. With a background in business and economics, Reda has helped build social and media software platforms for companies like Microsoft, Intel, Klarna, and most recently Circle Communities."
      ],
      profileUrl: "https://4rays.net",
      profileLabel: "Visit the Four Rays website",
      sessionIds: []
    }
  ],
  programme: [
    {
      id: "2027-01-28",
      label: "Day 1",
      dateLabel: "Thursday 28 January",
      sessions: [
        {
          id: "day-1-registration",
          day: "2027-01-28",
          start: "08:00",
          end: "09:00",
          kind: "logistics",
          title: "Registration",
          speakerIds: [],
          tbd: false
        },
        {
          id: "welcome",
          day: "2027-01-28",
          start: "09:00",
          end: "09:15",
          kind: "welcome",
          title: "Welcome address and conference context",
          speakerIds: ["anass-sedrati"],
          tbd: false
        },
        {
          id: "keynote-1",
          day: "2027-01-28",
          start: "09:15",
          end: "10:30",
          kind: "keynote",
          title: "Keynote",
          speakerIds: ["su-ling-yeh"],
          tbd: true
        },
        {
          id: "day-1-morning-coffee",
          day: "2027-01-28",
          start: "10:30",
          end: "11:00",
          kind: "break",
          title: "Coffee break",
          speakerIds: [],
          tbd: false
        },
        {
          id: "eu-regulation",
          day: "2027-01-28",
          start: "11:00",
          end: "11:30",
          kind: "talk",
          title: "The Evolution of EU Regulation of Harmful Manipulation",
          speakerIds: ["aimen-taimur"],
          tbd: false,
          abstractId: "eu-regulation"
        },
        {
          id: "conferred-agency",
          day: "2027-01-28",
          start: "11:30",
          end: "12:30",
          kind: "talk",
          title:
            "Manipulation Without a Manipulator: AI, Conferred Agency, and Social Reality",
          speakerIds: ["anders-hedman"],
          tbd: false,
          abstractId: "conferred-agency"
        },
        {
          id: "day-1-lunch",
          day: "2027-01-28",
          start: "12:30",
          end: "14:00",
          kind: "break",
          title: "Lunch",
          speakerIds: [],
          tbd: false
        },
        {
          id: "day-1-panel",
          day: "2027-01-28",
          start: "14:00",
          end: "15:00",
          kind: "panel",
          title: "Round table / panel",
          speakerIds: [],
          tbd: true
        },
        {
          id: "day-1-afternoon-coffee",
          day: "2027-01-28",
          start: "15:00",
          end: "15:30",
          kind: "break",
          title: "Group picture and coffee break",
          speakerIds: [],
          tbd: false
        },
        {
          id: "breakout-sessions",
          day: "2027-01-28",
          start: "15:30",
          end: "16:30",
          kind: "breakout",
          title: "Breakout sessions",
          speakerIds: [],
          tbd: false
        },
        {
          id: "day-1-closing",
          day: "2027-01-28",
          start: "16:30",
          end: "16:40",
          kind: "closing",
          title: "Closing of Day 1",
          speakerIds: [],
          tbd: false
        },
        {
          id: "conference-dinner",
          day: "2027-01-28",
          start: "18:00",
          end: "22:00",
          kind: "social",
          title: "Dinner in Stockholm",
          speakerIds: [],
          tbd: true
        }
      ]
    },
    {
      id: "2027-01-29",
      label: "Day 2",
      dateLabel: "Friday 29 January",
      sessions: [
        {
          id: "day-2-registration",
          day: "2027-01-29",
          start: "08:00",
          end: "09:00",
          kind: "logistics",
          title: "Registration",
          speakerIds: [],
          tbd: false
        },
        {
          id: "day-2-welcome",
          day: "2027-01-29",
          start: "09:00",
          end: "09:15",
          kind: "welcome",
          title: "Welcome and start of Day 2",
          speakerIds: [],
          tbd: false
        },
        {
          id: "keynote-2",
          day: "2027-01-29",
          start: "09:15",
          end: "10:30",
          kind: "keynote",
          title: "Keynote",
          speakerIds: [],
          tbd: true
        },
        {
          id: "day-2-morning-coffee",
          day: "2027-01-29",
          start: "10:30",
          end: "11:00",
          kind: "break",
          title: "Coffee break",
          speakerIds: [],
          tbd: false
        },
        {
          id: "sam-verschooren-talk",
          day: "2027-01-29",
          start: "11:00",
          end: "12:00",
          kind: "talk",
          title: "Presentation",
          speakerIds: ["sam-verschooren"],
          tbd: true
        },
        {
          id: "day-2-lunch",
          day: "2027-01-29",
          start: "12:00",
          end: "13:00",
          kind: "break",
          title: "Lunch",
          speakerIds: [],
          tbd: false
        },
        {
          id: "day-2-afternoon-talk",
          day: "2027-01-29",
          start: "13:00",
          end: "14:00",
          kind: "talk",
          title: "Presentation",
          speakerIds: [],
          tbd: true
        },
        {
          id: "day-2-panel",
          day: "2027-01-29",
          start: "14:00",
          end: "15:00",
          kind: "panel",
          title: "Round table / panel",
          speakerIds: [],
          tbd: true
        },
        {
          id: "day-2-closing",
          day: "2027-01-29",
          start: "15:00",
          end: "15:30",
          kind: "closing",
          title: "Coffee break and goodbye",
          speakerIds: [],
          tbd: false
        }
      ]
    }
  ],
  abstracts: [
    {
      id: "eu-regulation",
      title: "The Evolution of EU Regulation of Harmful Manipulation",
      speakerId: "aimen-taimur",
      paragraphs: [
        "As artificial intelligence increasingly mediates how individuals encounter information, form opinions and make decisions, concerns about harmful manipulation have acquired renewed significance within European regulatory debates. The talk traces the evolution of the European Union's approach to regulating harmful manipulation, examining how concerns traditionally addressed through consumer protection, data protection and fundamental rights have gradually entered the broader framework of AI governance. Particular attention will be given to the EU AI Act and the continuing challenges of distinguishing manipulation from legitimate persuasion, identifying legally recognizable harm and translating concerns about cognitive autonomy into enforceable regulatory standards."
      ]
    },
    {
      id: "conferred-agency",
      title:
        "Manipulation Without a Manipulator: AI, Conferred Agency, and Social Reality",
      speakerId: "anders-hedman",
      paragraphs: [
        "The first part of the talk examines the curious possibility of manipulation without a manipulator. Manipulation is a relation between two parties: an agent intentionally bypasses another’s rational agency. On the receiving end, two items are open for possible exclusion. One: that I am in fact being manipulated. Two: that there is a manipulator. Against a human, only the first is ever open to me. Even if the attempt to manipulate me fails, the manipulator remains to answer for it. Against a language model, the second can always be ruled out, and takes the first with it. To be manipulated is to be manipulated by someone, and a language model lacks agency. The model has no intentions. Its behavior may be identical to a human manipulator’s and its effect on me the same, but no one is manipulating me. Reading a particular book might make me want to join a cult and leave me brainwashed, but the book itself did not manipulate me. If anyone did, it was the author. The model is a book without an author. What remains is manipulation without a manipulator: the patient side without the agent side.",
        "The second half of the talk asks why, if the agent side is empty, many speak as though it were full. Drawing on John Searle’s account of social reality, we distinguish two ways the agent side gets filled. Instrumentally, by a company that designs the behavior to exploit the effects, as an author might write a book to do the same. Socially, by conferral: companies, institutions and experts speak and design as if the model has agency, the public accepts it, and the model comes to count as an agent. The conferral hides both the real manipulators and the dual exclusion. The consequences fall differently on the three perspectives of this conference. Law should look for its agent in the design, never in the model. Engineering cannot touch the problem, since alignment changes the behavior and not the conferral. For human cognition and mental well-being, the most immediate step is to demonstrate the conferral and make the dual exclusion perspicuous."
      ]
    }
  ],
  venue: {
    institution: "KTH – Royal Institute of Technology",
    room: "Lecture room Q1",
    street: "Malvinas väg 4",
    floor: "3rd floor",
    city: "Stockholm",
    country: "Sweden",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=KTH+Q1+Malvinas+v%C3%A4g+4+Stockholm",
    dinner: {
      day: "2027-01-28",
      start: "18:00",
      end: "22:00",
      description: "Dinner in central Stockholm on 28 January.",
      note: "Venue to be announced."
    }
  },
  contacts: [
    {
      name: "Anass Sedrati",
      email: "anass@kth.se",
      profile: {
        url: "https://www.kth.se/profile/anass",
        label: "View Anass’s KTH profile"
      }
    },
    {
      name: "Reda Lemeden",
      email: "reda@4rays.net"
    }
  ]
} satisfies ConferenceContent;
