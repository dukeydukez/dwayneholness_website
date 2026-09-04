export type Lane = "film" | "build" | "stage" | "life";

export type TimelineEvent = {
  year: number;
  date?: string;
  lane: Lane;
  title: string;
  tag?: string;
  body?: string;
  quote?: string;
  /** Withheld from public view until an embargo lifts. */
  embargo?: string;
  /** A verified still. Caption states what the photograph actually shows. */
  plate?: { src: string; alt: string; caption: string; w: number; h: number };
};

export type Era = {
  id: string;
  from: number;
  to: number;
  name: string;
  /** Fits the rail, where a narrow act has very little room. */
  short: string;
  sub: string;
  hue: string;
};

export const ERAS: Era[] = [
  { id: "origins", from: 1988, to: 2006, name: "Origins", short: "Origins", sub: "Kingston to Jane and Finch", hue: "#D98E3C" },
  { id: "hustle", from: 2007, to: 2012, name: "The Hustle Years", short: "Hustle", sub: "School, sets, first ventures", hue: "#C64F6D" },
  { id: "corex", from: 2013, to: 2016, name: "Corex Begins", short: "Corex", sub: "FEVA TV, incorporation, Africa", hue: "#F37920" },
  { id: "scaling", from: 2017, to: 2018, name: "Scaling", short: "Scaling", sub: "Stages, series, a daily practice", hue: "#3E9E8F" },
  { id: "legacy", from: 2019, to: 2022, name: "Loss and Legacy", short: "Legacy", sub: "Hodan, the LCBO, the CBC debut", hue: "#6E63B8" },
  { id: "factory", from: 2023, to: 2026, name: "The Factory", short: "Factory", sub: "Systems, the book, Jamaica", hue: "#C9A84C" },
];

export const LANES: Record<Lane, { label: string; short: string }> = {
  film: { label: "Film and production", short: "Film" },
  build: { label: "Building", short: "Build" },
  stage: { label: "Recognition", short: "Stage" },
  life: { label: "Life and legacy", short: "Life" },
};

export const EVENTS: TimelineEvent[] = [
  { year: 1988, date: "1 January", lane: "life", title: "Born in Kingston, Jamaica", body: "The starting point for everything that follows." },
  { year: 1993, lane: "life", title: "His mother moves them to Canada", tag: "The original risk",
    body: "Yvonne Robinson leaves Kingston with her son. He is five. Jane and Finch becomes home.",
    quote: "My biggest risk was taken by my mother when she decided to move to Canada from Jamaica." },

  { year: 2001, lane: "film", title: "First set. Forty-six dollars for eight hours.", tag: "Age 13",
    body: "A non-union background role on Soul Food. He nearly walks away from the whole idea after the first few sets.",
    quote: "This can't be real. At that age, I knew that this was peanuts." },
  { year: 2002, date: "27 June", lane: "film", title: "Street Time, an eight hundred dollar cheque, and the ACTRA card", tag: "Age 14",
    body: "On the HBO and Showtime series shooting in Hamilton, he improvises his way into a speaking part, playing himself. The role and the union card arrive the same day: a principal part is what puts a performer into ACTRA's system, and 27 June 2002 is his input date. It stays the only principal role of his entire performing career, and the only time his own name was the character. The jump from forty-six dollars to eight hundred becomes the founding pricing philosophy of Corex." },

  { year: 2003, lane: "life", title: "Starts a dance crew called Bad Newz", tag: "The dance era",
    body: "Everybody had a crew. His was Bad Newz. It is the first thing he ever built and put a name on, five years before he registered a company." },

  { year: 2004, lane: "life", title: "Captain of the team, leader of the Wolfpack, expelled", tag: "Grade 10",
    body: "At Western Technical-Commercial School he made the basketball team and became its captain. He tried football too and did not last, having decided he had no interest in playing through a Canadian winter. He was also leading the Wolfpack, a group that moved fifty deep through downtown, and that is what ended his time there partway through Grade 10. He finished Grades 10 to 12 at Emery Collegiate instead, back in his own neighbourhood. He is direct about what the Wolfpack taught him, and it is the uncomfortable part of the story: leadership and responsibility, learned first in the wrong room. Captain of a team and head of a crew in the same year, at sixteen." },

  { year: 2005, lane: "life", title: "First tattoo, for his grandmother", tag: "Age 17",
    body: "Edith Brown, 25 February 1952 to 2 October 2004, his mother's mother. She died the year before, at fifty-two, when he was sixteen. He was the grandchild who felt safest around her. The first thing he ever put on his body permanently was her, and he was seventeen when he did it. It is the only event on record from the years the archive goes quiet." },

  { year: 2003, lane: "life", title: "High school, and the record goes quiet", tag: "A gap, not a blank",
    body: "Between the Street Time era and March 2006 there is almost nothing on file. His ACTRA work history begins in 2006. So does his own archive, across nearly three million files. The one thread running through is an ACTRA minors trust paying out monthly until September 2005, months before he turned eighteen, which means money earned as a minor was still being held. Two things survive from inside it, and neither is paperwork: the expulsion from Western Tech in Grade 10, and the tattoo he got at seventeen for his grandmother. The rest of this stretch is still to be recovered." },

  { year: 2006, lane: "build", title: "Co-founds the NISE collective", tag: "Age 18",
    body: "His earliest creative collective, six years before the Corex name exists. By this year NISE is already staging a fashion show at Captain John's." },

  { year: 2006, lane: "film", title: "Already shooting", tag: "It starts with photography",
    body: "His own archive opens here, with 589 photographs across seven folders: the NISE fashion show, a jam night, behind the scenes from a shoot. Every file is a JPG. The first documented year of his creative work is photography, a year before he starts at Humber." },

  { year: 2006, date: "6 March", lane: "film", title: "First engagement on the union record", tag: "Age 18",
    body: "Step, later retitled How She Move, for Sienna Films. The Toronto dance film that premiered at Sundance." },

  { year: 2007, date: "29 August", lane: "build", title: "Starts Humber College", body: "The Multimedia Design and Production Technician program. He is nineteen." },
  
  { year: 2007, lane: "film", title: "Nine productions in one year", tag: "Age 19",
    body: "Background performer on all of them: The Incredible Hulk, Traitor, Little Mosque on the Prairie, and the first of five Degrassi seasons." },

  { year: 2008, date: "26 June", lane: "film", title: "Becomes a full member of ACTRA", tag: "Age 20",
    body: "Six years less a day after entering the system. Three days later his engagements begin carrying benefit remittances." },
  { year: 2008, date: "October", lane: "film", title: "Buys a Nikon D60", tag: "The first camera",
    body: "His first photographs are posted that month under the name Dukez Photography, with a caption calling himself a beginner and asking people to bear with him. Street portraits, mostly. He registers HighClass five weeks later." },

  { year: 2008, date: "7 November", lane: "build", title: "Registers HighClass", tag: "First company",
    plate: { src: "/images/writing/the-secret-to-winning-is-knowing-how-to-lose/3-first-cheques.jpg", w: 1600, h: 1200, alt: "Two HighClass Corporation cheques dated July 2009 beside a HighClass logo card.", caption: "HighClass cheques from July 2009. Nine thousand dollars on the 22nd, three thousand on the 24th." },
    body: "An Ontario general partnership in talent management, photography and sales. The t-shirt line and the youth employment work run under it." },
  { year: 2008, lane: "film", title: "Twelve productions", tag: "Background performer",
    body: "Degrassi, Aaron Stone, Victoria Day, 'Da Kink in My Hair, The Latest Buzz." },

  { year: 2009, date: "April", lane: "build", title: "Brings Beenie Man to Jane and Finch", tag: "Age 21",
    body: "A music video shoot for Versatile, an artist signed to Beenie Man. He was five months into HighClass, and the crowd in the footage is wearing I Am HighClass shirts. One of the biggest names in dancehall, standing in front of the towers.",
    plate: { src: "/images/beenie-man-2009.jpg", w: 1280, h: 720, alt: "Beenie Man in sunglasses and a black blazer speaking into a microphone outdoors, an apartment tower and low-rise block behind him in Jane and Finch.", caption: "Beenie Man in Jane and Finch, April 2009. Footage by Jane-Finch.com." } },

  { year: 2009, date: "June", lane: "build", title: "Starts Almost Famous", body: "A nightclub event series. He is twenty-one." },
  { year: 2009, date: "24 January", lane: "build", title: "The I Am HighClass shoot", tag: "Fifty-plus in the studio",
    body: "He was a Humber student with studio access, so he used it. Over fifty people turned up in I Am HighClass tees and 120 photographs came out of it across two sets, shot with four photographers including Maxwell Bonsu. D-Pryde was there, and he cut a HighClass freeverse. Marlon Palmer and Femi Lawson were part of the same movement. Two weeks later the Humber Daily Planet ran a profile of him as CEO of High Class Corp, three months into the company, with more than a thousand people already following it.",
    plate: { src: "/images/highclass-shoot-2009.jpg", w: 1208, h: 802, alt: "Around forty people crowded together on a white studio backdrop, every one of them in an I Am HighClass t-shirt, studio lights and gear visible at the edges of the frame.", caption: "The I Am HighClass shoot, 24 January 2009." } },

  { year: 2009, date: "5 February", lane: "build", title: "The Humber Daily Planet profiles him", tag: "First press",
    body: "Jennifer Conley's piece calls him a multimedia design and production technician student who started his own company and is running it on what he learns in class. He is twenty-one.",
    quote: "I'm learning branding while I am actually branding in my business." },

  { year: 2009, date: "6 October", lane: "build", title: "The Bigger Picture", tag: "First $10,000 grant",
    body: "A photography and graphic design workshop for youth aged fourteen to eighteen, run under HighClass Corp. at the Rexdale Pro Media Tech Centre at Finch and Albion. The first grant the company ever landed, ten thousand dollars, and it went into teaching. He had picked up his own first camera twelve months earlier and called himself a beginner. It ran again for young entrepreneurs in 2012.",
    plate: { src: "/images/writing/how-to-kill-a-snake/5-highclass.jpg", w: 1600, h: 1083, alt: "A group of young people in I Am HighClass shirts holding certificates of completion.", caption: "The Bigger Picture, certificates of completion in hand." } },

  { year: 2009, date: "19 November", lane: "build", title: "HighClass presents YouNightED", tag: "His own event",
    body: "A branded night staged under his own company, and he shot it himself. Five hundred and thirty-two photographs survive across two albums, every one carrying the YouNightED logo." },

  { year: 2009, lane: "film", title: "Fourteen productions, including Scott Pilgrim", tag: "Busiest year on record",
    body: "Background performer throughout: Scott Pilgrim vs. the World, Flashpoint, Copper, Harriet the Spy, Coin Flip." },
  { year: 2009, date: "October", lane: "film", title: "A Rogers television commercial",
    body: "Booked through Publicis Toronto. He is in front of a Rogers camera six years before he directs and cuts a campaign for them." },

  { year: 2010, lane: "stage", title: "Graduates Humber with honours", tag: "Top student",
    body: "Multimedia Design and Production Technician.",
    plate: { src: "/images/humber-2010.jpg", w: 1280, h: 960, alt: "A young Dwayne in a striped sweater on stage at a Humber College ceremony, shaking hands with a faculty member holding an award envelope, seated guests behind them.", caption: "Humber College, 2010." } },
  { year: 2010, lane: "stage", title: "YMCA Community Award", tag: "Age 22",
    body: "Recognition for the community work coming out of HighClass. Separate from The Bigger Picture, and separate from the grant." },
  { year: 2010, date: "1 June", lane: "film", title: "Shoots the Stylus Awards", tag: "dukeydukez.com",
    body: "Toronto's urban music awards, covered as the event photographer. Drake accepted an award at the podium that night, two weeks before Thank Me Later came out, and Dwayne shot it. Every frame is watermarked Dukey Dukez Photographer with a web address, so he had a named photography business online two years before Corexmedia.com existed.",
    plate: { src: "/images/stylus-awards-2010.jpg", w: 1440, h: 960, alt: "Drake in a yellow jacket at a clear podium on the Stylus Awards stage, award in hand, speaking into a microphone.", caption: "Drake at the podium, Stylus Awards, 1 June 2010. Watermark bottom right: dukeydukez.com." } },

  { year: 2010, lane: "build", title: "Founding member of 106 and York",
    body: "A talent showcase that started at York University and became a staple of the GTA circuit. Each one teach one, operating years before Corex." },

  { year: 2011, date: "22 October", lane: "film", title: "Goes through POV 3rd Street as a participant", tag: "Class of '11",
    body: "Presenting Our Vision, a six-month filmmaking workshop. He came in as a student. His project was The Book of Hope, and the treatment on the drive is filed under his own name. The graduating project put him on a national commercial for ParticipACTION the next year. Five years later he was running the program himself, as Program Manager and Facilitator. Take the seat, then teach the room.",
    plate: { src: "/images/pov-2011.jpg", w: 2000, h: 1333, alt: "Eight members of the POV cohort crouched and sprawled together, mugging for the camera in a bright loft kitchen.", caption: "The POV class of '11, 22 October 2011." } },

  { year: 2011, date: "15 February", lane: "film", title: "Directs Sad Streets for Calado in Jamaica", tag: "First music video",
    body: "His first music video, and he shot it on the island. A hundred and ninety-three clips came off the camera on the fifteenth alone, with prep from the eleventh and the edit running into March. It aired on local channels across Jamaica, so his first video went to broadcast rather than to YouTube. He was twenty-three." },

  { year: 2011, date: "February", lane: "life", title: "Back to Jamaica", tag: "The REAL Jamaica",
    body: "A week on the island photographing what he captioned the real Jamaica: street corners, a football pitch, Marcus Garvey Drive. Eighteen years after his mother took him off it, and there are HighClass shirts in the frames.",
    plate: { src: "/images/jamaica-2011.jpg", w: 1440, h: 960, alt: "A man in an I Am HighClass t-shirt and sunglasses seated on a wall at night in Jamaica, lit against dark foliage.", caption: "Jamaica, February 2011. HighClass on the ground." } },

  { year: 2011, lane: "film", title: "Twelve more productions", tag: "Background performer",
    body: "Total Recall, Bomb Girls, Transporter, The Listener, and the fifth season of Degrassi." },

  { year: 2012, lane: "stage", title: "Youth Arts Award, ArtReach Toronto", body: "For creating arts opportunities for youth and promoting equity and social justice." },
  { year: 2012, date: "August", lane: "stage", title: "Certificate of Appreciation from the Hon. Judy Sgro, M.P.", body: "For meaningful contribution to the people and communities of York West." },
  { year: 2012, date: "September", lane: "film", title: "Co-directs a national commercial for ParticipACTION", tag: "First national spot",
    body: "The Bring Back Play campaign, thirty seconds, shot for JWT and produced by Radke Films. It was the graduating project of POV 3rd Street, the program he had come through the year before, and it worked the way the program intends: industry mentors stood on set while the alumni directed. He shared the chair with Kobi Ntiri. They cast it themselves, sitting through more than a hundred kids and parents that July. The client's own behind-the-scenes film puts his credit on screen: Co-Director, POV Alumni.",
    plate: { src: "/images/participaction-2012.jpg", w: 1280, h: 720, alt: "Dwayne in a plaid shirt beside the camera and monitor on the ParticipACTION set, the operator working the rig beside him and crew behind.", caption: "On set, ParticipACTION Bring Back Play, summer 2012." } },

  { year: 2012, date: "8 January", lane: "film", title: "Co-directs a Joe Budden music video with Jordan Oram", tag: "A week after his birthday",
    body: "Jordan Oram's first music video, and Joe Budden was Dwayne's favourite artist at the time. It went up on YouTube on 8 January, seven days after his birthday, and he counts it as a present to himself. It lands eleven months before Corexmedia.com exists, so both of his first two directing credits predate the brand entirely.",
    quote: "That's a nice birthday present to myself." },

  { year: 2012, lane: "film", title: "Cinematographer on Seed of a Deadbeat", body: "Short film. He also books RoboCop and Suits that year." },
  { year: 2012, date: "18 December", lane: "build", title: "Corexmedia.com goes up", tag: "The brand begins",
    body: "Announced as coming soon on Facebook. The earliest public reference to Corex anywhere, two years before the company is incorporated." },

  { year: 2013, date: "21 November", lane: "stage", title: "Back at Emery Collegiate, speaking to the Grade 9s", tag: "Nine years later",
    body: "He and Femi Lawson returned to the school that took him in after the expulsion, to talk to fourteen-year-olds about bullying. Same building, opposite side of the room." },

  { year: 2013, date: "18 April", lane: "film", title: "Flies to Whitehorse to mentor filmmakers for Coca-Cola", tag: "Yukon",
    body: "He was at Gravity, a Toronto ad agency running Coca-Cola's film grant program under the Open Happiness campaign. The brief was real people and real stories with a documentary feel, up to two minutes, hunting unique perspectives on happiness from across Canada. Canada meant all of it, so the team flew to the Yukon. He went as a mentor to the filmmakers, four months before FEVA TV hired him.",
    plate: { src: "/images/whitehorse-2013.jpg", w: 2000, h: 1333, alt: "Dwayne in a black cap and fur-hooded parka standing alone in a snowbound sled dog yard, huskies on their kennel boxes around him, boreal forest and a snow-capped mountain behind.", caption: "Sled dog yard outside Whitehorse, 21 April 2013." } },

  { year: 2013, date: "August", lane: "build", title: "Producer and Creative Director at FEVA TV", tag: "Hired pre-launch",
    body: "The first Canadian television channel aimed at Black Canadians. FEVA stands for First Entertainment Voice of Africa. He joins one month before it launches." },
  { year: 2013, date: "September", lane: "build", title: "FEVA launches its platform",
    body: "He is on staff through the launch, leading creative and production direction for original programming." },

  { year: 2014, date: "28 August", lane: "build", title: "FEVA launches as a television channel", tag: "Bell and Rogers",
    body: "Carriage on Bell and Rogers, which is what turns a platform into an actual channel in Canadian homes. A year into the role and still there. On staff for both launches." },
  { year: 2014, lane: "life", title: "Hodan Nalayeh walks in", tag: "The meeting",
    body: "She comes to FEVA to pitch a home for Integration TV. On her way out she stops at his room. The pitch never closes and Integration TV never airs, which is what kept her building the channel herself. The professional door shuts and the personal one opens in the same afternoon.",
    quote: "I've heard about you." },
  { year: 2014, lane: "stage", title: "Runner-up, ArtReach youth arts pitch contest",
    body: "Scarborough Civic Centre. Twenty-five hundred dollars. The first time he pitches the business in public." },
  { year: 2014, date: "13 November", lane: "stage", title: "First recorded interview",
    body: "RoyaltyRadio. The earliest audio reference to Corex Creative Group anywhere." },

  { year: 2015, date: "31 January", lane: "build", title: "Corex Creative Ltd is incorporated", tag: "Official" },
  { year: 2015, date: "June", lane: "build", title: "Leaves FEVA TV after two years",
    body: "He worked on most of the early FEVA originals. Co-founder Lonzo Nzekwe later writes that he is a consummate professional with great leadership skills." },
  { year: 2015, date: "21 July", lane: "life", title: "First use of the words Calculated Steps", tag: "The book starts here",
    body: "A tweet. Chapter drafts surface on the drive three months later. The hashtag and the manuscript begin in the same year.",
    quote: "Today is going to be a special day. Today I'm going to make history." },
  { year: 2015, lane: "film", title: "Directs and edits the Rogers Outrank campaign", tag: "Rogers Communications",
    body: "Director and editor on the campaign, for a national telecom. Six years earlier he had been background talent in a Rogers commercial. Same client, opposite side of the camera. He also directs the Modo, Beard Gang music video that year." },

  { year: 2015, date: "9 December", lane: "life", title: "First time in Africa", tag: "Somalia, with Hodan",
    body: "Six months after leaving FEVA TV, where she had walked in to pitch him. Two and a half weeks across Somaliland and Somalia, then Nairobi, mapped by the GPS in 283 photographs. The first of six trips to the region, all of them now mapped from the GPS in his phone archive.",
    plate: { src: "/images/somalia-2015.jpg", w: 2000, h: 1333, alt: "Dwayne holding a phone up for a selfie in the Somali countryside with Hodan Nalayeh in a teal headscarf beside him and camels in the background.", caption: "Somalia, 9 December 2015." } },

  { year: 2016, date: "3 April", lane: "life", title: "His father's funeral", tag: "Jamaica",
    body: "He was born on the island and left it at five. He came back at twenty-eight to bury his father.",
    plate: { src: "/images/fathers-funeral-2016.jpg", w: 2000, h: 1333, alt: "A large gathering at a graveside in rural Jamaica, a white casket covered in red, white and blue floral sprays, red earth underfoot and green hills behind.", caption: "Jamaica, 3 April 2016." } },

  { year: 2016, lane: "film", title: "Mogadishu Rising", tag: "With Hodan",
    body: "Filmed with Hodan Nalayeh, on one of the trips they made to Somalia together." },
  { year: 2016, date: "24 to 29 January", lane: "life", title: "Back to Somalia, Kenya and Ethiopia", tag: "Second trip",
    body: "Five weeks after the first one ended he went again, this time adding Ethiopia. Seventy-three geotagged photographs place him across three countries in six days." },

  { year: 2016, date: "October", lane: "build", title: "Returns to POV 3rd Street as Program Manager and Facilitator", tag: "Participant to manager",
    body: "The same program he had come through as a student in 2011, now his to run. A workforce development program putting people into content production, taught in weekly cohorts. He was Program Manager and Facilitator for two years and kept mentoring its participants long after he left, giving notes on their edits and writing their reference letters.",
    plate: { src: "/images/pov-2017.jpg", w: 2000, h: 1333, alt: "Dwayne in a black jacket mid-explanation beside two cinema cameras on tripods, nine POV participants gathered around him in a bright loft studio.", caption: "POV 3rd Street, week seven, 25 February 2017." } },

  { year: 2016, date: "November", lane: "stage", title: "First long-form podcast appearances", body: "The Come Up Show, then Making It In Toronto." },

  { year: 2017, date: "4 June", lane: "film", title: "Shoots Ego in Los Angeles", tag: "His biggest music video",
    body: "For Just Chase, and about forty thousand dollars of production. Call time was ten in the morning at 5610 Soto Street in Huntington Park, with Department 4 running the floor and a second unit picking up aerials of the LA skyline and night driving under the palms. He cut it himself through June. Six weeks later he was on a plane to Somalia." },

  { year: 2017, date: "15 to 30 July", lane: "life", title: "Somalia, Tanzania, Kenya, then Istanbul", tag: "Four countries, sixteen days",
    body: "The longest of the six trips and the one that reached furthest. Nine days across Somalia, then down to Tanzania, a day in Kenya, and Turkey on the way home. The whole itinerary was recovered from phone GPS, because no folder on the drive records it." },

  { year: 2017, date: "24 January", lane: "stage", title: "Toronto Tastemakers panel", body: "YMCA Grosvenor. His first major in-person panel." },
  { year: 2017, date: "16 November", lane: "stage", title: "Featured in 6ix Rising", tag: "Credited on screen",
    body: "Shawney Cohen's seventy-seven minute documentary on Toronto's rap scene, released by Noisey. The film credits him on screen as Dukey Dukez, Video Director. He directed Friyie's Don't Worry that same year, and Friyie is one of the artists the film follows. Five days after it dropped he posted about it without mentioning that he was in it: go watch this, it is a big look for the city.",
    plate: { src: "/images/6ix-rising-2017.jpg", w: 2000, h: 1120, alt: "Dwayne laughing outdoors in a camo t-shirt and gold chain in a still from 6ix Rising, the on-screen caption reading Dukey Dukez, Video Director, with the Noisey logo in the corner.", caption: "6ix Rising, Noisey, 2017. His on-screen credit." } },

  { year: 2017, lane: "film", title: "Directing music videos and short film",
    body: "Just Chase, EGO and Friyie, Don't Worry, plus cinematography on Rich Africans." },

  { year: 2018, lane: "life", title: "One hundred and forty-three days of daily Instagram Live", tag: "Calculated Steps",
    body: "One hundred and forty-nine episodes archived, seventy-nine of them with guests including Randell Adjei, Hodan Nalayeh and Sasha Exeter. The method proven in public, daily." },
  { year: 2018, date: "8 July", lane: "life", title: "A line that becomes a philosophy",
    body: "The Epiphany Project episode takes its title from something he says in it.",
    quote: "If I get paid, they get paid, we gotta eat together." },
  { year: 2018, date: "4 August", lane: "life", title: "Hodan buys a one-way ticket",
    body: "She calls him in excitement. He journals it that night.",
    quote: "It's amazing how we can really commit to our words and make it happen even after a couple years." },
  { year: 2018, lane: "film", title: "Directs Manifesto 11, Afro Chic and Chronixx Gambia", body: "Plus the Ontario Works TESS campaign." },
  { year: 2018, date: "28 September to 12 October", lane: "life", title: "Back in Somalia with Hodan", tag: "Nine months left",
    body: "A working trip of about two weeks, with a Kenyan leg either side, and 190 photographs on a Sony A7 II beyond what his phone recorded. Regional airstrips and an Ocean Airlines turboprop, camel country, a camera in his hands the whole way. He did not know it at the time, but this is the last documented trip the two of them made together. She was killed nine months later.",
    plate: { src: "/images/somalia-2018.jpg", w: 2000, h: 1126, alt: "Dwayne in a mustard shirt filming with a cinema camera beside an Ocean Airlines turboprop on a Somali airstrip, a flight attendant in an orange hijab at the airstair and ground crew in ear defenders nearby.", caption: "Somalia, October 2018." } },

  { year: 2018, date: "July", lane: "film", title: "Reggae Sumfest, Jamaica", tag: "Chronixx tour",
    body: "Montego Bay. The biggest reggae festival on the island, and the first time the tour takes him home to work." },

  { year: 2018, date: "24 to 27 December", lane: "film", title: "Christmas in Spain, then Gambia", tag: "The 2am show",
    body: "Spain on Christmas Eve, then straight to Gambia for Christmas. He shot the show there from the stage at two in the morning on the twenty-seventh. The Chronixx Gambia film came out of these three days.",
    plate: { src: "/images/chronixx-2018.jpg", w: 1333, h: 2000, alt: "Chronixx photographed from behind on stage with one arm raised, facing a packed crowd lit by phone screens and flags.", caption: "On stage with Chronixx, 27 December 2018." } },

  { year: 2018, date: "4 to 14 November", lane: "life", title: "Kenya again, and Ethiopia", tag: "Sixth and last",
    body: "Three weeks after getting home from Somalia he was back on the continent. A hundred and nine geotagged frames across Kenya and Ethiopia. It is the last of the trips before she was killed." },

  { year: 2019, date: "12 July", lane: "life", title: "Hodan Nalayeh is killed in Kismayo", tag: "The turn",
    body: "He had been invited on the trip that became her last.",
    quote: "I was supposed to be there with her but by the grace of God, my mission wasn't done yet." },

  { year: 2020, date: "15 to 23 February", lane: "film", title: "On tour with Ms. Lauryn Hill", tag: "Creative Director",
    body: "His highest-profile artist engagement. Nine days and four venues: Westbury on Long Island, The VETS in Providence, the Capitol Theatre in Port Chester, and the United Palace in New York City. Every show ran past midnight, so the files land on two dates each. He came home with more than nine hundred frames. The dates after these were cancelled as COVID closed the touring industry, three weeks before the shutdown reached everyone else.",
    plate: { src: "/images/lauryn-hill-2020.jpg", w: 2000, h: 1333, alt: "The view from the wings of a packed theatre during a Lauryn Hill show, a performer lit green at the microphone with the balcony full behind them.", caption: "From the wings, 20 February 2020." } },

  { year: 2020, lane: "life", title: "Buys his mother a house", tag: "Twenty-seven years later",
    body: "Yvonne Robinson left Kingston in 1993 with a five-year-old and no plan beyond a belief that the other side of the ocean held something better. Twenty-seven years later her son bought her a house. This record opens with her risk. This is where it lands.",
    plate: { src: "/images/mother-house-2020.jpg", w: 1331, h: 2000, alt: "Dwayne and his mother Yvonne Robinson standing together in the driveway, the house behind them, both laughing.", caption: "Yvonne Robinson outside the house, 2020." } },

  { year: 2019, date: "February", lane: "film", title: "Colombia and Mexico", tag: "Chronixx tour",
    body: "Two countries in a month, with a Super 8 roll shot in Colombia alongside the digital." },

  { year: 2019, date: "March", lane: "film", title: "Jamaica again, for LWTF", tag: "Chronixx tour",
    body: "His second Jamaican leg in eight months." },

  { year: 2019, date: "21 to 30 June", lane: "film", title: "Germany, then Uganda", tag: "Chronixx tour",
    body: "Three days in Germany and then five in Uganda, where he shot the Nile River alongside the show. The camera he used was running a year behind, which is why this leg sat in the archive dated 2018 until his phone corrected it." },

  { year: 2019, date: "August", lane: "film", title: "Belize, Spain and the UK", tag: "The biggest leg",
    body: "Three countries. In the UK it is Boomtown, the O2 Warehouse and O2 Leeds, and this leg leaves behind more frames than any other on the tour." },

  { year: 2019, date: "December", lane: "film", title: "Negril and St. Lucia", tag: "Last leg",
    body: "The run closes where it feels like it should, back in Jamaica at Negril and then across to St. Lucia, where he shoots from a boat. Eighteen months and nine countries after Germany." },

  { year: 2020, lane: "film", title: "Chronixx, Soul Circle Writing Camp",
    body: "Director and editor. The camp itself was shot in September 2019, in a house turned into a studio. He also shoots the Bring Back Play campaign for South Riverdale CHC.",
    plate: { src: "/images/soul-circle-2020.jpg", w: 2000, h: 1333, alt: "Black and white photograph of Chronixx singing into a handheld microphone in a living room converted to a studio, audio gear in the foreground and light trails across the frame.", caption: "Soul Circle writing camp, September 2019." } },

  { year: 2021, lane: "film", title: "LCBO, Spirit of Sustainability", tag: "Largest campaign of the decade", body: "Director. He also edits Chronixx, Safe N Sound.",
    plate: { src: "/images/lcbo/lcbo-directing.jpg", w: 1600, h: 1067, alt: "Dwayne directing on the LCBO Spirit of Sustainability shoot.", caption: "Directing the Spirit of Sustainability campaign." } },
  { year: 2021, date: "28 October", lane: "build", title: "Joins the Program Advisory Committee at Centennial College",
    body: "An industry seat reviewing curriculum and program direction. He is still serving. After his first meeting the program coordinator writes to him.",
    quote: "Dwayne, you are a great addition, thanks for your input today." },
  { year: 2021, lane: "stage", title: "Toronto Caribbean and The Hype Magazine features", body: "Two profiles in one year." },

  { year: 2022, lane: "film", title: "Canadian Screen Awards, Academy commercial", body: "Director. He also directs The Answer for Mount Kailash featuring Chronixx." },
  { year: 2022, lane: "film", title: "The Blackburn Story for Historica Canada",
    body: "Director and editor. The couple who escaped enslavement in Kentucky and built Toronto's first taxi company." },
  { year: 2022, date: "8 October", lane: "film", title: "Hodan's Story premieres on CBC", tag: "Written and directed",
    body: "A portrait of the friend and mentor he met at FEVA TV, which he both wrote and directed. His CBC debut. Three years after her death, he puts her on national television himself.",
    plate: { src: "/images/writing/the-secret-to-winning-is-knowing-how-to-lose/2-hodan.jpg", w: 1600, h: 1067, alt: "A packed room watching a Hodan\u2019s Story screening, the CBC Docs poster on the screen behind two speakers.", caption: "A screening and question and answer for Hodan\u2019s Story." } },

  { year: 2023, lane: "stage", title: "The Business Anecdote interview", body: "Founder and chief executive, long form." },
  { year: 2021, date: "29 April", lane: "life", title: "Joins the Rotary Club of Innisfil", tag: "Service above self",
    body: "His member account is created the same week. Food drives in Sandy Cove Acres, Quiet Santa for kids who cannot manage a mall Santa, bottle drives. He had moved his life north to Simcoe County, and this is where the local roots go in." },

  { year: 2021, date: "21 October", lane: "stage", title: "President's Panel, Xcelerate Summit", tag: "Invited as a president",
    body: "Georgian College's Henry Bernick Entrepreneurship Centre put him on a panel of company presidents, alongside heads of a plastics manufacturer and a travel company. Virtual, run over Zoom. The director who invited him wrote afterward that it was the best one they had done.",
    quote: "It was so amazing to have you on our President's Panel. You were out of this World, I truly believe it was our best." },

  { year: 2023, date: "6 February", lane: "stage", title: "Speaks to the entrepreneurship class at Georgian College", tag: "Where speaking becomes the plan",
    body: "Sara Bentham, who runs the Henry Bernick Entrepreneurship Centre and had put him on the President's Panel two years earlier, invited him into her class. No set topic. Just tell them how you got here. She wrote the next morning to say the students had voted him their favourite speaker and offered to introduce him to speaking agencies. He wrote back that stepping further into speaking was exactly what he was aiming at that year. Everything after this is that decision compounding.",
    quote: "They shared that you have been their favourite speaker. They were engaged, inspired and felt included." },

  { year: 2023, date: "26 October", lane: "stage", title: "Speaks at the Xcelerate Summit",
    body: "Back a third year, this time on a panel billed From Rocks to Resilience at Georgian College's downtown Barrie campus. He had done the President's Panel in 2021 and a filmed pop-up talk, What's Your Brand Story, in 2022.",
    plate: { src: "/images/xcelerate-2023.jpg", w: 1600, h: 2000, alt: "Dwayne in a black leather jacket standing in front of an Xcelerate Summit step and repeat banner.", caption: "Xcelerate Summit, 26 October 2023." } },

  { year: 2024, date: "15 February", lane: "stage", title: "CanvasRebel Magazine", body: "A long-form question and answer profile." },
  { year: 2024, date: "1 March", lane: "stage", title: "Another Ep. with Stephen Rochester", tag: "Long form",
    body: "A sit-down on Stephen Rochester's show. He turned up in Corex orange, head to toe.",
    plate: { src: "/images/another-ep-2024.jpg", w: 2000, h: 1333, alt: "Dwayne in an orange shirt and matching orange cap, laughing in a leather armchair in a bright podcast studio, boom microphones and a mixing desk beside him.", caption: "Another Ep., 1 March 2024." } },
  { year: 2024, lane: "stage", title: "TIFF Next Wave, Thriving as an Artist",
    body: "A panel at the Toronto International Film Festival's youth program, presented with Toronto Film School.",
    plate: { src: "/images/tiff-nextwave-2024.jpg", w: 1333, h: 2000, alt: "A panel of speakers seated on stage at TIFF Next Wave, the screen behind them reading Thriving as an Artist.", caption: "TIFF Next Wave, Thriving as an Artist." } },

  { year: 2024, lane: "stage", title: "The CanadianSME Small Business Podcast", tag: "Visionary Storytelling in Business",
    body: "A full episode on storytelling as a business function. Partners on the season: RBC, UPS and Xero.",
    plate: { src: "/images/sme-podcast-2024.jpg", w: 2000, h: 981, alt: "Dwayne mid-gesture in a tan blazer and white turtleneck in the CanadianSME podcast studio, magazine covers on the wall behind him.", caption: "Visionary Storytelling in Business, CanadianSME Small Business Podcast, 2024." } },

  { year: 2024, date: "29 May", lane: "life", title: "Films the Hodan Nalayeh Legacy Day", tag: "First year covering it",
    body: "The Changemaker Awards at Hodan Nalayeh Secondary School in Vaughan, the school renamed for her. The Nalayeh family brought Corex in to shoot it. He has been back every year since.",
    plate: { src: "/images/legacy-day-2024.jpg", w: 2000, h: 1333, alt: "An overhead view of the school atrium during the Changemaker Awards, a Be A Changemaker banner above the stage and students seated across the floor.", caption: "Changemaker Awards, 29 May 2024." } },

  { year: 2024, date: "20 March", lane: "life", title: "Buys his own first place", tag: "Four years after his mother\'s",
    body: "Signing the pre-delivery inspection on a new build, on a bare counter in an empty unit. He bought his mother a house in 2020 and his own four years later. That order was not an accident.",
    plate: { src: "/images/condo-2024.jpg", w: 2000, h: 1333, alt: "Dwayne in a green overshirt and a cap reading Creative, bent over a kitchen counter signing Tarion pre-delivery inspection paperwork in an empty unfinished unit.", caption: "Pre-delivery inspection, 20 March 2024." } },
  { year: 2024, date: "10 July", lane: "stage", title: "Speaks at Success Beyond Limits",
    body: "A youth program he returns to. He would be back the following July.",
    plate: { src: "/images/sbl-2024.jpg", w: 1125, h: 2000, alt: "A lecture theatre filled with students during the Success Beyond Limits session.", caption: "Success Beyond Limits, 10 July 2024." } },

  { year: 2024, date: "10 July", lane: "build", title: "First Creative Connect podcast taping", tag: "The community gets a show",
    body: "Two and a half hours after he finished speaking at Success Beyond Limits that same morning. Three cameras, a softbox and two chairs in a lobby.",
    plate: { src: "/images/creative-connect-2024.jpg", w: 2000, h: 1126, alt: "Two men seated in armchairs in a bright lobby surrounded by three cameras on tripods, a softbox and monitors, during the first Creative Connect podcast taping.", caption: "First Creative Connect taping, 10 July 2024." } },

  { year: 2024, date: "24 July", lane: "stage", title: "Speaks at the Jean Augustine Chair",
    body: "Named for the first Black woman elected to the House of Commons.",
    plate: { src: "/images/jean-augustine-2024.jpg", w: 2000, h: 1127, alt: "A large group of young people in a lecture hall with hands raised, photographed in black and white.", caption: "Jean Augustine Chair, 24 July 2024." } },

  { year: 2024, date: "15 September", lane: "life", title: "Baptized at Kingsway Community Life Centre", tag: "The point it changed",
    body: "Baptized by Pastor Richard Brown, with Pastor Dennis Martin, on a Sunday. He describes surrender as the moment his life changed direction, and it is the anchor of chapter thirteen of his book. Three weeks later he proposed.",
    plate: { src: "/images/baptism-2024.jpg", w: 2000, h: 1125, alt: "Dwayne rising out of the baptism tank with both hands raised and laughing. Pastor Richard Brown stands over him on the left, Pastor Dennis Martin holds a white towel on the right, both in I Have Decided To Follow Jesus shirts.", caption: "Kingsway Community Life Centre, 15 September 2024." } },
  { year: 2024, date: "5 October", lane: "life", title: "Asks Tracy to marry him", tag: "Mexico",
    body: "On a beach in Mexico. The man who has spent twenty years documenting other people's milestones hired a photographer for his own.",
    plate: { src: "/images/proposal-2024.jpg", w: 1600, h: 2000, alt: "Dwayne on one knee on a beach in Mexico holding a ring box, Tracy standing over him laughing, palm trees behind them.", caption: "The proposal. Mexico, 5 October 2024." } },
  { year: 2024, date: "27 October", lane: "stage", title: "Innovate, Thrive and Network", tag: "FACE Coalition",
    body: "A Small Business Month panel for the FACE Coalition on the role of Black entrepreneurs in Canada's small business economy. A five hundred dollar honorarium. FACE would go on to become his largest client.",
    plate: { src: "/images/face-innovate-2024.jpg", w: 1333, h: 2000, alt: "Dwayne mid-gesture on a panel in front of a FACE Coalition backdrop, a fellow panellist seated beside him.", caption: "Innovate, Thrive and Network, FACE Coalition, 27 October 2024." } },

  { year: 2024, date: "30 November", lane: "life", title: "Marries Tracy", tag: "Eight weeks later",
    body: "Fifty-six days after the question. He wore a white dinner jacket, she wore a birdcage veil, and the photographs are the only ones in this record where he is the subject rather than the author.",
    plate: { src: "/images/wedding-2024.jpg", w: 1333, h: 2000, alt: "Dwayne in a white dinner jacket and black bow tie laughing beside Tracy in a white gown and birdcage veil holding a bouquet of white roses.", caption: "Dwayne and Tracy, 30 November 2024." } },

  { year: 2024, date: "4 December", lane: "film", title: "Co-directs Dexta Daps, Lockdown", tag: "With Louis Mensah",
    body: "A music video directed jointly with Louis Mensah.",
    plate: { src: "/images/dexta-shoot-2024.jpg", w: 2000, h: 1334, alt: "Dwayne in an orange cap leaning over a marble island on the Lockdown set, two crew members beside him under magenta lighting.", caption: "On the Lockdown set, 4 December 2024." } },

  { year: 2025, date: "5 December", lane: "film", title: "The Other Canada, season four", tag: "For FACE Coalition",
    body: "Produced and edited for the FACE Coalition, hosted by Danielle Pinnock. Shot on location with each guest through the autumn, delivered bilingual, and released an episode a month. Season five followed the next year." },

  { year: 2025, date: "18 November", lane: "film", title: "CSA Group, Policy Pathways", tag: "The whole crew",
    body: "Director. Two Policy Pathways films this year, one on aging in Canada and one on building a thriving Canadian economy.",
    plate: { src: "/images/csa-2025.jpg", w: 2000, h: 1333, alt: "Eight Corex crew members in black branded polos posing with cameras, gimbals and headsets in front of a city skyline wall.", caption: "The Corex crew on the Policy Pathways shoot, 18 November 2025." } },
  { year: 2025, date: "22 January", lane: "stage", title: "BMO and Creative Connect live podcast",
    body: "A live recording inside a BMO branch, pairing his own community with a bank's.",
    plate: { src: "/images/bmo-cc-2025.jpg", w: 1333, h: 2000, alt: "An audience seated inside a BMO branch for a live Creative Connect podcast recording.", caption: "BMO and Creative Connect, 22 January 2025." } },

  { year: 2025, date: "3 March", lane: "stage", title: "Creative Currency financial literacy workshop",
    body: "Week five of BusinessSmARTs at the Nia Centre for the Arts. Certificates at the end of it.",
    plate: { src: "/images/creative-currency-2025.jpg", w: 2000, h: 1125, alt: "Participants around a long wooden table holding certificates of completion and celebrating.", caption: "Creative Currency, Nia Centre for the Arts, 3 March 2025." } },

  { year: 2025, lane: "stage", title: "Community Hero Award", tag: "Reverence",
    body: "Named a Community Hero at the 2025 Reverence awards.",
    plate: { src: "/images/reverence-2025.jpg", w: 1633, h: 1104, alt: "Dwayne accepting a small gold award on stage, the screen behind reading Reverence 2025 Community Hero, Dwayne Dukez Holness.", caption: "Reverence Community Hero Award, 2025." } },

  { year: 2025, date: "10 August", lane: "stage", title: "Panel at The Shift Tradeshow",
    body: "The Shift: Changing of the Times, hosted by Storhouse. A free event for a room of up to four hundred, and he took it without an honorarium.",
    plate: { src: "/images/the-shift-2025.jpg", w: 2000, h: 1333, alt: "Six panellists standing together in front of a lit Storhouse sign after The Shift Tradeshow session.", caption: "The Shift Tradeshow, 10 August 2025." } },

  { year: 2025, date: "28 May", lane: "life", title: "Legacy Day, second year", tag: "Asked back",
    body: "Same school, same week in the calendar. Barwako Nalayeh asked him back directly: you did an amazing job last year.",
    plate: { src: "/images/legacy-day-2025.jpg", w: 2000, h: 1333, alt: "Students packed into the school atrium watching the Changemaker Awards, camera operators working in the foreground.", caption: "Changemaker Awards, 28 May 2025." } },

  { year: 2025, date: "23 July", lane: "stage", title: "Success Beyond Limits, second year", tag: "He came back",
    body: "A year and thirteen days after the first one.",
    plate: { src: "/images/sbl-2025.jpg", w: 1333, h: 2000, alt: "Dwayne in a black cap and all black, hands pressed together mid-sentence, speaking in front of a classroom whiteboard with students seated in the foreground.", caption: "Success Beyond Limits, 23 July 2025." } },

  { year: 2025, lane: "film", title: "Still booking union work at thirty-seven", tag: "Twenty years on set",
    body: "Two engagements on Precision for WildBrain. The most recent entries in a record that runs back to 2006." },
  { year: 2025, date: "November", lane: "life", title: "Co-founds Jamaica Strong", tag: "Twenty-two thousand raised",
    body: "After Hurricane Melissa displaces more than thirty thousand people, he raises over twenty thousand dollars in nine days, then self-funds a production trip through St. James, Westmoreland and St. Elizabeth. It becomes the short documentary Rising After The Storm." },

  { year: 2026, date: "1 January", lane: "life", title: "Chapter 38, Chosen, Tested, Trusted", body: "His birthday reflection, and the best performing post of his year." },
  { year: 2026, date: "February", lane: "film", title: "Canadian Tire Black History Month", body: "Event coverage. Randell Adjei keynote, eight hundred attendees.",
    plate: { src: "/images/BHMCorexCT-4870.jpeg", w: 863, h: 1293, alt: "Dwayne in conversation with an attendee at the Canadian Tire Black History Month event.", caption: "Between sessions at the Canadian Tire Black History Month event." } },
  { year: 2026, date: "25 February", lane: "stage", title: "IGNITE Toronto, Beyond the Breakthrough", tag: "From Jane and Finch to the IGNITE stage",
    body: "A panel for the Black Talent Initiative, alongside Deanne Gage of The Globe and Mail and Thomas Cumberbatch.", quote: "Your story is your strategy. Own it.",
    plate: { src: "/images/CorexRBC-5110.jpeg", w: 1222, h: 815, alt: "Dwayne on stage at IGNITE Toronto between two other panellists, the panel title projected behind them.", caption: "Beyond the Breakthrough at IGNITE Toronto, with Deanne Gage and Thomas Cumberbatch." } },
  { year: 2026, date: "March", lane: "build", title: "Launches the Creative AI Factory", tag: "Repositioning",
    body: "Fourteen custom production skills shipped, and a three-tier model: brand documentary, content system, creative factory." },
  { year: 2026, date: "18 March", lane: "life", title: "Calculated Steps is finished", tag: "Nineteen chapters",
    body: "Narratively complete and print ready, opening with a letter to his mother. He is targeting publication in 2027." },
  { year: 2026, date: "April", lane: "film", title: "The Other Canada, season five", tag: "Second season running",
    body: "Six episodes split between Montreal and Toronto. The second season Corex has produced for the FACE Coalition." },
  { year: 2026, date: "7 April", lane: "build", title: "Black Screen Office Symposium, year three", body: "Advisory board and symposium advisory." },
  { year: 2026, date: "28 May", lane: "life", title: "Legacy Day, third year", tag: "Three for three",
    body: "Three years running, all of them his. The friend who walked into FEVA TV in 2014 now has a school named after her, and he is the one who films the day it holds in her name. He cut the 2026 video overnight so the family could share it while the day was still fresh.",
    plate: { src: "/images/legacy-day-2026.jpg", w: 1333, h: 2000, alt: "A Corex crew member in a company shirt and headphones standing in the school atrium facing the Be A Changemaker banner.", caption: "Changemaker Awards, 28 May 2026." } },
  { year: 2026, lane: "build", title: "Awarded a Toronto Arts Council mentorship", tag: "As the mentor",
    body: "The Newcomer and Refugee Artist Mentorship, mentoring filmmaker Doyinsola Ajayi on her short film If Not You. Each one teach one, now with an arts council behind it." },
  { year: 2026, date: "27 June", lane: "stage", title: "GODfidence Conference", tag: "Toronto Pavilion",
    body: "Lekan Olawoye's inaugural faith and leadership conference at the Toronto Pavilion. He sat on a panel with Nneka Ezu and Mo Ekujumi, convened by Leading Ladies Connect, then took the conference recordings and cut the highlight film while travelling. Speaking and producing the same event. He was later offered a place in the inaugural GODfidence Leadership Cohort.",
    plate: { src: "/images/godfidence-2026.jpg", w: 1333, h: 2000, alt: "Dwayne on the GODfidence stage in a blue check suit, seated in a white armchair mid-answer, the conference hashtag lit on the screen behind him.", caption: "GODfidence Conference, 27 June 2026." } },

  { year: 2026, date: "17 July", lane: "build", title: "Mentor, CreaTech Incubator", tag: "Kingston, Jamaica",
    body: "A volunteer mentor with Kingston Creative, paired with a Jamaican founder for a full incubation cycle." },
  { year: 2026, date: "23 July", lane: "build", title: "Backs CTRL+ALT+BEAT", tag: "Mentor and sponsor",
    body: "Corex Creative sponsors the show and Dwayne mentors its two founders, Tisania Smith and Chelsi Campbell. Each one teach one, with a cheque attached.",
    plate: { src: "/images/ctrl-alt-beat-2026.jpg", w: 1333, h: 2000, alt: "Dwayne between the two CTRL+ALT+BEAT founders at the episode three live taping, all three laughing and posing for the camera.", caption: "At the CTRL+ALT+BEAT episode three taping, 23 July 2026." } },

  { year: 2026, date: "14 August", lane: "build", title: "Accepted into DMZ Innisfil", tag: "Fall 2026 cohort",
    body: "Toronto Metropolitan University's startup incubator. Still building." },
  { year: 2026, date: "1 September", lane: "stage", title: "Named a Jamaican Diaspora Impact Award recipient", tag: "Consulate-General of Jamaica",
    body: "Selected by an independent panel of judges for significant contribution to the development and empowerment of the Jamaican Canadian community. Presented at the JDIA Gala on 23 October 2026 at the Toronto Botanical Garden." },
];

export type ThroughLine = {
  title: string;
  body: string;
  /** Placeholder art until the right still is chosen. Swap src, alt and caption. */
  img?: { src: string; alt: string; w: number; h: number; placeholder?: boolean; caption?: string };
};

export const THROUGH_LINES: ThroughLine[] = [
  { title: "His mother's risk", body: "Every origin story opens with her. She left Kingston with a five-year-old and no plan beyond the belief that the other side of the ocean held something better. In 2020 he bought her a house." },
  { title: "Jane and Finch as edge", body: "Not a footnote, a foundation. The neighbourhood gave him the eye and the ear to tell stories other people could not hear." },
  { title: "Each one teach one", body: "From a talent showcase at York University in 2010 to a mentorship seat in Kingston in 2026. Mentorship as a business model and a moral obligation.", img: { src: "/images/lcbo/lcbo-full-crew.jpg", alt: "Around thirty cast and crew gathered in a dance studio, hands raised, posing together at the end of a shoot day.", w: 6720, h: 4480, caption: "Cast and crew, LCBO Spirit of Sustainability, 2021." } },
  { title: "Hodan", body: "She believed in him at times he did not believe in himself. The through-line that runs from FEVA TV to the CBC to the first chapter of the book.", img: { src: "/images/hodan-dwayne.jpg", alt: "Dwayne and Hodan Nalayeh laughing together on a hillside road, green forested hills behind them, she in a pink headscarf and a brightly patterned dress.", w: 2000, h: 1825, caption: "Dwayne and Hodan Nalayeh." } },
  { title: "Faith as operating system", body: "Baptized at Kingsway Community Life Centre on 15 September 2024. He talks about surrender as the point his life changed direction." },
  { title: "Ownership as legacy", body: "Building something he owns, something he can leave. The reason the background years matter and the reason they ended.", img: { src: "/images/book-writing.jpg", alt: "Pages of the Calculated Steps manuscript spread across a table beside a spiral-bound copy, the printed title page reading draft, March 31st 2026.", w: 1500, h: 2000, caption: "The Calculated Steps manuscript, draft dated 31 March 2026." } },
];

export const STATS = [
  { value: "38", label: "Years", detail: "Kingston 1988 to Toronto 2026" },
  { value: "66", label: "Screen productions", detail: "Background performer on all but one, 2006 to 2025" },
  { value: "9", label: "Ventures founded", detail: "From HighClass to Corex OS" },
  { value: "25+", label: "Public appearances", detail: "Panels, podcasts and features on record" },
];

export type Credit = { year: string; title: string; role: string; client?: string };
export type CreditGroup = { discipline: string; note: string; credits: Credit[] };

/** Directed and edited work. Distinct from the ACTRA performance record,
 *  which is background work and lives in the timeline itself. */
export const CREDITS: CreditGroup[] = [
  {
    discipline: "Documentary",
    note: "The work he would be introduced by.",
    credits: [
      { year: "2025", title: "Jamaica Strong: Rising After The Storm", role: "Director", client: "Self-funded" },
      { year: "2022", title: "Hodan's Story", role: "Writer, Director", client: "CBC Docs Shorts" },
      { year: "2022", title: "The Blackburn Story", role: "Director, Editor", client: "Historica Canada" },
      { year: "2020", title: "Chronixx, Soul Circle Writing Camp", role: "Director, Editor", client: "Soul Circle" },
      { year: "2016", title: "Mogadishu Rising", role: "Director, Cinematographer", client: "Integration TV" },
    ],
  },
  {
    discipline: "Advertising and branded",
    note: "Campaigns for national brands and public institutions.",
    credits: [
      { year: "2025", title: "Pathway Policy Conference", role: "Director", client: "CSA Group" },
      { year: "2022", title: "Academy commercial", role: "Director", client: "Canadian Screen Awards" },
      { year: "2022", title: "The Answer, featuring Chronixx", role: "Director", client: "Mount Kailash" },
      { year: "2021", title: "Spirit of Sustainability", role: "Director", client: "LCBO" },
      { year: "2020", title: "Bring Back Play", role: "Director", client: "South Riverdale CHC" },
      { year: "2019", title: "Kaela Kay SS19", role: "Director, Editor", client: "Kaela Kay" },
      { year: "2018", title: "TESS campaign", role: "Director", client: "Ontario Works" },
      { year: "2018", title: "Manifesto 11", role: "Director, Editor", client: "Manifesto" },
      { year: "2018", title: "Chronixx Gambia", role: "Director, Editor", client: "Gambia Tourism" },
      { year: "2017", title: "Afro Chic", role: "Director, Editor", client: "Afro Chic" },
      { year: "2017", title: "Take Back The Tap", role: "Director", client: "South Riverdale CHC" },
      { year: "2015", title: "Outrank", role: "Director, Editor", client: "Rogers Communications" },
      { year: "2012", title: "Bring Back Play", role: "Co-Director", client: "ParticipACTION" },
    ],
  },
  {
    discipline: "Live and tour",
    note: "",
    credits: [
      { year: "2019", title: "Lauryn Hill, tour", role: "Creative Director" },
      { year: "2018 to 2019", title: "Chronixx, tour", role: "Creative Director" },
    ],
  },
  {
    discipline: "Music video",
    note: "Fourteen on record, from 2011.",
    credits: [
      { year: "2025", title: "Dexta Daps, Lockdown", role: "Director" },
      { year: "2021", title: "Chronixx, Safe N Sound", role: "Editor" },
      { year: "2020", title: "Shope, Rikiki", role: "Director, Editor" },
      { year: "2019", title: "Shope, Tell A Man", role: "Director, Editor" },
      { year: "2018", title: "Gael Boom, Not For Me", role: "Director, Editor" },
      { year: "2018", title: "Khem and Shenseea, I Can", role: "Editor" },
      { year: "2018", title: "Reef, Like an Animal", role: "Director, Editor" },
      { year: "2017", title: "Just Chase, EGO", role: "Director, Editor" },
      { year: "2017", title: "Friyie, Don't Worry", role: "Director, Editor" },
      { year: "2015", title: "Modo, Beard Gang", role: "Director, Editor" },
      { year: "2014", title: "Corey Fila, You", role: "Director, Editor" },
      { year: "2012", title: "Joe Budden", role: "Co-Director" },
      { year: "2017", title: "Just Chase, Ego", role: "Director", client: "Los Angeles" },
      { year: "2011", title: "Calado, Sad Streets", role: "Director", client: "Jamaica, aired on local television" },
    ],
  },
  {
    discipline: "Short film and series",
    note: "",
    credits: [
      { year: "2018", title: "Integration TV", role: "Director, Editor" },
      { year: "2017", title: "Rich Africans", role: "Editor, Cinematographer" },
      { year: "2012", title: "Seed of a Deadbeat", role: "Cinematographer" },
    ],
  },
];

export type Venture = { name: string; role: string; span: string; note: string; live: boolean };

export const VENTURES: Venture[] = [
  { name: "Corex Creative", role: "Founder and Creative Director", span: "2012", note: "The agency. Corexmedia.com in 2012, incorporated in 2015.", live: true },
  { name: "Perus Technology", role: "Co-Founder and CMO", span: "2025", note: "A platform company. He is a founder, not a client.", live: true },
  { name: "Corex OS", role: "Founder", span: "2026", note: "A skills library for creative teams.", live: true },
  { name: "Million Dollar Club", role: "Co-Founder", span: "2025", note: "Financial education, built with Aaron Charles.", live: true },
  { name: "Jamaica Strong", role: "Co-Founder", span: "2025", note: "Hurricane Melissa relief. Ninety-eight donors in nine days.", live: true },
  { name: "Creative Connect", role: "Founder and Host", span: "2020", note: "A community for creative entrepreneurs.", live: true },
  { name: "Calculated Steps", role: "Author", span: "2015", note: "Nineteen chapters, print ready, publishing 2027.", live: true },
  { name: "FEVA TV", role: "Producer and Creative Director", span: "2013 to 2015", note: "Employment, not ownership. On staff for both launches.", live: false },
  { name: "106 and York", role: "Founding member", span: "2010 to 2011", note: "A talent showcase that started at York University.", live: false },
  { name: "Almost Famous", role: "Founder", span: "2009", note: "A nightclub event series.", live: false },
  { name: "HighClass", role: "Founder", span: "2008 to 2013", note: "His first registered company. Talent, photography, youth employment.", live: false },
  { name: "NISE Collective", role: "Co-Founder", span: "2006", note: "The earliest one, before Corex existed by name.", live: false },
];

export const CLIENT_LOGOS = [
  { src: "/images/logos/8.png", alt: "Canadian Tire", w: 110 },
  { src: "/images/logos/4.png", alt: "TD Bank", w: 145 },
  { src: "/images/logos/3.png", alt: "LCBO", w: 115 },
  { src: "/images/logos/7.png", alt: "CBC", w: 130 },
  { src: "/images/logos/2.png", alt: "CSA Group", w: 115 },
  { src: "/images/logos/1.png", alt: "Fasken", w: 130 },
  { src: "/images/logos/5.png", alt: "RE/MAX", w: 130 },
  { src: "/images/logos/6.png", alt: "Rotary", w: 115 },
];

export const CLIENTS_MORE =
  "Lauryn Hill · Rogers Communications · Historica Canada · Academy of Canadian Cinema and Television · Ontario Centre for Workforce Innovation · City of Toronto · Ontario Works · Manifesto · South Riverdale Community Health Centre · FACE Coalition · BNI";
