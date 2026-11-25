export interface Sample {
  id: string;
  label: string;
  blurb: string;
  note: string;
  task: string;
}

export const SAMPLES: Sample[] = [
  {
    id: "case-note",
    label: "Housing case note",
    blurb: "Social work · home visit",
    task: "Summarise the open risks and the next three actions for this case.",
    note: `Home visit 2026-11-18, 14:20, 42 Bongcheon-ro 12-gil, Gwanak-gu, Seoul.
Client: Mira Han (DOB 1988-03-14, case SW-2026-0417), phone 010-4412-7788.
Lives with two children; the youngest has asthma and takes Montelukast daily.
Landlord Mr. Park has refused to fix the bathroom leak for the third time; the client says she was told to "wait until spring".
Income: 1,400,000 KRW per month from part-time cleaning at Greenline Office Services. Rent arrears 1,850,000 KRW since September.
Client reports feeling watched by the neighbour and describes low mood, no self-harm ideation. Referred to the district mental health centre, contact worker Yuna Seo, 02-889-4411.
Next visit 2026-11-25.`,
  },
  {
    id: "exit-interview",
    label: "Exit interview",
    blurb: "HR · people team",
    task: "Draft a neutral summary for the leadership review and list the follow-ups we owe this employee.",
    note: `Exit interview, 2026-11-20, conducted by HRBP Jaeho Lim.
Employee: Daniel Cho, senior backend engineer, employee EMP-2019-4471, personal mail d.cho@fastmail.com, phone 010-9931-2244.
Reason for leaving: accepted an offer elsewhere. Last day 2026-12-05.
Concerns raised: the on-call rotation is "unsustainable", and feedback from his manager Sunmi Park feels "dismissive".
He also said the payment outage on 2026-10-02 came from an unapproved config change by a contractor, whom he named in the room.
Severance expectation: 3 years 4 months of service, about 11,400,000 KRW.
He asked not to be contacted at his personal number after 2026-12-05.`,
  },
  {
    id: "support-ticket",
    label: "Billing dispute",
    blurb: "Customer support · refund",
    task: "Write a reply that acknowledges the double charge, states exactly what we will do, and gives a timeline.",
    note: `Ticket TICKET-48211 opened 2026-11-19 by Yerin Kim (yerin.kim@hanmail.net, 010-5521-8842), account ACCT-9931-4471-22.
She was charged 79,000 KRW twice on 2026-11-17 for a plan she cancelled on 2026-11-02.
Card ending 4417; billing address 17 Seolleung-ro 88-gil, Gangnam-gu.
She is eight months pregnant and asked to be contacted by email only; she cannot take calls during hospital appointments at Samsung Medical Center.
An agent promised a refund on the first call but nothing has arrived.`,
  },
];
