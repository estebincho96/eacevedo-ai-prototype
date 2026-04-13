import { useState, useEffect, useRef } from "react";

// ─── Asset URLs (Figma, valid ~7 days from 2026-03-19) ───────────────────────
const imgVideo =
  "https://www.figma.com/api/mcp/asset/72b1b4ac-b224-4218-a0e4-4e82f2ac2b47";
const imgCourseraWordmark =
  "https://www.figma.com/api/mcp/asset/37a61ced-04cc-4a23-9255-209c55c376d1";
const imgCourseraCIcon =
  "https://www.figma.com/api/mcp/asset/0d22e8aa-3da9-4381-b4c9-276115945728";
const imgGoogleLogo =
  "https://www.figma.com/api/mcp/asset/44fa65fc-12cf-453b-84b2-c901bde4c38f";
const imgCoachWordmark =
  "https://www.figma.com/api/mcp/asset/706aad89-6623-4528-84ff-ace069bb22bf";

// ─── YouTube video ────────────────────────────────────────────────────────────

const VIDEO_ID = "v3XSSG5cpJg";
const VIDEO_START = 8673; // seconds

interface YTPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { UNSTARTED: number; ENDED: number; PLAYING: number; PAUSED: number; BUFFERING: number; CUED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

// ─── Sidebar data ────────────────────────────────────────────────────────────

type ItemStatus = "completed" | "active" | "unvisited";

interface CourseItem {
  title: string;
  meta: string;
  status: ItemStatus;
}

const section1: CourseItem[] = [
  { title: "Introduction to communicating data insights", meta: "Video · 3 min", status: "completed" },
  { title: "Course 6 overview", meta: "Reading · 8 min", status: "completed" },
  { title: "Kevin: The power's in the data viz", meta: "Video · 2 min", status: "completed" },
  { title: "Helpful resources and tips", meta: "Reading · 4 min", status: "completed" },
];

const section2: CourseItem[] = [
  { title: "Why data visualization matters", meta: "Video · 6 min", status: "active" },
  { title: "Effective data visualizations", meta: "Reading · 8 min", status: "unvisited" },
  { title: "Connect images with data", meta: "Video · 6 min", status: "unvisited" },
  { title: "The beauty of visualizing", meta: "Reading · 8 min", status: "unvisited" },
  { title: "A recipe for a powerful visualization", meta: "Video · 5 min", status: "unvisited" },
  { title: "Correlation and causation", meta: "Reading · 8 min", status: "unvisited" },
  { title: "Dynamic visualizations", meta: "Video · 3 min", status: "unvisited" },
  { title: "The wonderful world of visualizations", meta: "Reading · 8 min", status: "unvisited" },
  { title: "Data grows on decision trees", meta: "Reading · 8 min", status: "unvisited" },
  { title: "Self-Reflection: Choose your visualization type", meta: "Practice Assignment · 20 min", status: "unvisited" },
  { title: "Test your knowledge on data visualizations", meta: "Practice Assignment · 8 min", status: "unvisited" },
];

// ─── Coach mock responses ─────────────────────────────────────────────────────

type CoachResponseKey =
  | "Give me practice questions"
  | "Explain this topic in simple terms"
  | "Give me a summary"
  | "Give me real-life examples";

const coachResponses: Record<CoachResponseKey, { body: string; followUps: string[] }> = {
  "Explain this topic in simple terms": {
    body: `Sure! The topic we're discussing is about why data visualization matters for understanding information quickly and clearly.\n\nData visualization is simply the practice of turning numbers and data into pictures — like charts, graphs, and maps. Our brains process images much faster than rows of numbers in a spreadsheet. Think of it like the difference between reading a list of temperatures for every day in a year versus glancing at a line chart that instantly shows you when it was hottest and coldest.\n\nGood visualizations help you spot patterns, catch outliers, and tell a story with your data. Bad ones can mislead or confuse. That's why learning the principles behind effective visualizations — choosing the right chart type, using color intentionally, and keeping things simple — is such a valuable skill in data analytics.\n\nIf you have any other concepts from the content that you'd like me to explain, feel free to ask!`,
    followUps: [
      "What makes a visualization misleading?",
      "What chart type should I use for comparisons?",
      "How does color affect readability?",
    ],
  },
  "Give me a summary": {
    body: `Here's a quick summary of the key ideas from this lesson:\n\nData visualization is the graphical representation of data, and it's one of the most important skills in a data analyst's toolkit. The lesson covers three main areas:\n\n1. **Why it matters** — Visualizations make complex data accessible. Stakeholders and decision-makers rarely have time to parse raw datasets, so a well-designed chart can communicate insights in seconds.\n\n2. **Types of visualizations** — You'll encounter bar charts, line graphs, scatter plots, heat maps, and more. Each type serves a different purpose: bar charts for comparisons, line graphs for trends over time, scatter plots for relationships between variables.\n\n3. **Design principles** — Effective visualizations follow key principles: choose the right chart for your data, use color with purpose, label clearly, and avoid clutter. The goal is always clarity over decoration.\n\nThe lesson sets the foundation for the rest of this module, where you'll practice building your own visualizations.`,
    followUps: [
      "Which visualization type is most versatile?",
      "What's the biggest mistake beginners make?",
      "How do I choose between a bar chart and a pie chart?",
    ],
  },
  "Give me practice questions": {
    body: `Great idea! Here are some practice questions to test your understanding:\n\n**Question 1:** A marketing team wants to show how their website traffic changed month-over-month for the past year. Which type of visualization would be most appropriate and why?\n\n**Question 2:** You have a dataset with three variables — sales revenue, number of employees, and customer satisfaction score — for 50 different stores. What visualization would help you explore relationships between these variables?\n\n**Question 3:** True or false: A pie chart is the best way to compare values across more than seven categories. Explain your reasoning.\n\n**Question 4:** Your manager asks you to present quarterly earnings to executives. The key story is that Q3 had an unexpected spike. How would you design a visualization that draws attention to that spike without misleading the audience?\n\n**Question 5:** What is the difference between an explanatory visualization and an exploratory visualization? Give an example of when you'd use each.`,
    followUps: [
      "Can you give me the answers?",
      "Give me harder questions",
      "Quiz me on chart types specifically",
    ],
  },
  "Give me real-life examples": {
    body: `Absolutely! Here are some real-world examples of data visualization in action:\n\n**Healthcare:** During the COVID-19 pandemic, the Johns Hopkins University dashboard became one of the most visited websites in the world. It used maps, line charts, and bar graphs to show case counts, death rates, and vaccination progress. Millions of people — not just data scientists — relied on it to understand the pandemic's trajectory.\n\n**Journalism:** The New York Times regularly publishes interactive visualizations. One famous example mapped every building in America, colored by age, revealing how cities grew outward over decades. No spreadsheet could tell that story as powerfully.\n\n**Business:** Spotify Wrapped is a masterclass in consumer-facing data visualization. It turns a year of your listening data into a personalized, shareable story with bold colors and simple charts. It drives massive social media engagement every December.\n\n**Science:** NASA uses heat maps to visualize global temperature changes over the past century. The progression from blue to red across decades makes climate change viscerally understandable in a way that a table of temperature anomalies never could.\n\nEach of these examples follows the same principle: the right visualization makes data feel immediate and human.`,
    followUps: [
      "How do I make my visualizations shareable?",
      "What tools do professionals use?",
      "Show me examples of bad visualizations",
    ],
  },
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function Icon({
  name,
  size = 20,
  fill = 0,
  className = "",
}: {
  name: string;
  size?: number;
  fill?: 0 | 1;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-rounded leading-none select-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  );
}

// Nav icon button shared by both breakpoints
function NavIconBtn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="w-32 h-32 flex items-center justify-center hover:bg-grey-50 active:bg-grey-100 rounded-8 transition-colors duration-fast"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function UserAvatar() {
  return (
    <button
      type="button"
      className="w-32 h-32 flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-full transition-colors duration-fast"
      aria-label="Profile"
    >
      <span className="cds-action-secondary text-white">N</span>
    </button>
  );
}

// Right-side nav icons (reused on both mobile + desktop)
function NavRightIcons() {
  return (
    <div className="flex items-center gap-4">
      <NavIconBtn label="Language">
        <Icon name="language" size={20} className="text-grey-975" />
      </NavIconBtn>
      <NavIconBtn label="Help">
        <Icon name="help" size={20} className="text-grey-975" />
      </NavIconBtn>
      <NavIconBtn label="Coach">
        <img src="/coach-icon.png" alt="Coach" className="w-24 h-24 object-contain" />
      </NavIconBtn>
      <UserAvatar />
    </div>
  );
}

// ─── Sidebar components ───────────────────────────────────────────────────────

function SidebarItem({ title, meta, status }: CourseItem) {
  const isActive = status === "active";
  const isCompleted = status === "completed";
  return (
    <button
      type="button"
      className={`flex gap-12 items-start px-8 py-8 rounded-8 w-full text-left transition-colors duration-fast ${
        isActive ? "bg-blue-25 hover:bg-blue-50" : "hover:bg-grey-50 active:bg-grey-100"
      }`}
    >
      <div className="shrink-0 w-20 h-20 flex items-center justify-center mt-[1px]">
        {isCompleted ? (
          <Icon name="check_circle" size={20} fill={1} className="text-green-700" />
        ) : (
          <Icon name="radio_button_unchecked" size={20} className="text-grey-400" />
        )}
      </div>
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p className={`text-[14px] leading-[20px] text-grey-975 ${isActive ? "font-semibold" : "font-normal"}`}>
          {title}
        </p>
        <p className="cds-body-tertiary text-grey-600">{meta}</p>
      </div>
    </button>
  );
}

// ─── Coach chips ──────────────────────────────────────────────────────────────

function CoachChip({
  label,
  fullWidth = false,
  onClick,
}: {
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 px-12 py-8 rounded-32 cds-action-secondary text-blue-700 bg-white border border-blue-700 hover:bg-blue-25 active:bg-blue-50 transition-colors duration-fast ${
        fullWidth ? "w-full" : "shrink-0"
      }`}
    >
      <Icon name="auto_awesome" size={16} fill={1} className="text-blue-700" />
      {label}
    </button>
  );
}

// ─── Mobile-only: tab row chips ───────────────────────────────────────────────

function MobileTab({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-8 h-32 px-8 rounded-4 border border-grey-400 cds-action-secondary text-grey-975 hover:bg-grey-50 active:bg-grey-100 transition-colors duration-fast shrink-0"
    >
      <Icon name={icon} size={20} className="text-grey-975" />
      {label}
    </button>
  );
}

// ─── Coach section (shared markup, different chip mode) ───────────────────────

function CoachSection({
  mobile = false,
  onChipClick,
}: {
  mobile?: boolean;
  onChipClick?: (label: CoachResponseKey) => void;
}) {
  const chips: CoachResponseKey[] = [
    "Give me practice questions",
    "Explain this topic in simple terms",
    "Give me a summary",
    "Give me real-life examples",
  ];
  return (
    <div className="bg-grey-25 rounded-8 p-16 flex flex-col gap-16">
      <button
        type="button"
        className="flex items-center justify-between w-full hover:opacity-70 transition-opacity duration-fast"
      >
        <img
          src={imgCoachWordmark}
          alt="coach"
          className="h-[14px] w-[52px] shrink-0 object-contain object-left"
        />
        <Icon name="expand_less" size={16} className="text-grey-600" />
      </button>
      <div className={`flex gap-8 ${mobile ? "flex-col" : "flex-wrap"}`}>
        {chips.map((label) => (
          <CoachChip
            key={label}
            label={label}
            fullWidth={mobile}
            onClick={() => onChipClick?.(label)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Feedback row ─────────────────────────────────────────────────────────────

function FeedbackRow() {
  return (
    <div className="flex items-center gap-4">
      {[
        { name: "thumb_up", label: "Thumbs up" },
        { name: "thumb_down", label: "Thumbs down" },
        { name: "flag", label: "Flag" },
      ].map(({ name, label }) => (
        <button
          key={name}
          type="button"
          className="w-32 h-32 flex items-center justify-center hover:bg-grey-50 active:bg-grey-100 rounded-8 transition-colors duration-fast group"
          aria-label={label}
        >
          <Icon
            name={name}
            size={20}
            className="text-grey-600 group-hover:text-grey-975 transition-colors duration-fast"
          />
        </button>
      ))}
    </div>
  );
}

// ─── Coach chat panel ────────────────────────────────────────────────────────

function CoachChatPanel({
  responseKey,
  onClose,
}: {
  responseKey: CoachResponseKey;
  onClose: () => void;
}) {
  const { body, followUps } = coachResponses[responseKey];
  return (
    <div className="bg-white rounded-16 w-[490px] h-full shrink-0 flex flex-col overflow-hidden">
      {/* Panel header */}
      <div className="shrink-0 flex items-center justify-between px-16 py-12 border-b border-grey-100">
        <img
          src={imgCoachWordmark}
          alt="Coach"
          className="h-[14px] w-[52px] object-contain object-left"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Coach"
          className="w-32 h-32 flex items-center justify-center hover:bg-grey-50 active:bg-grey-100 rounded-8 transition-colors duration-fast"
        >
          <Icon name="close" size={20} className="text-grey-600" />
        </button>
      </div>

      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto min-h-0 pl-24 pr-16 py-16">
        <div className="flex flex-col gap-24">
          {/* User chip (right-aligned) */}
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-4 px-12 py-8 rounded-32 bg-grey-25 cds-action-secondary text-grey-975">
              {responseKey}
            </span>
          </div>

          {/* AI response */}
          <div className="flex flex-col gap-12">
            <div className="cds-body-primary text-grey-975 whitespace-pre-line">
              {body}
            </div>

            <p className="cds-body-primary text-grey-975">
              And if you want to continue exploring this topic, try one of these follow-up questions:
            </p>

            {/* Follow-up chips */}
            {followUps.map((q) => (
              <button
                key={q}
                type="button"
                className="self-start flex items-center gap-4 px-12 py-8 rounded-32 cds-action-secondary text-blue-700 bg-white border border-blue-700 hover:bg-blue-25 active:bg-blue-50 transition-colors duration-fast"
              >
                <Icon name="auto_awesome" size={16} fill={1} className="text-blue-700" />
                {q}
              </button>
            ))}

            {/* Reaction icons */}
            <div className="flex items-center gap-8 px-8 py-4">
              {[
                { name: "thumb_up", label: "Helpful" },
                { name: "thumb_down", label: "Not helpful" },
                { name: "download", label: "Download" },
                { name: "refresh", label: "Regenerate" },
                { name: "more_horiz", label: "More" },
              ].map(({ name, label }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={label}
                  className="w-24 h-24 flex items-center justify-center hover:bg-grey-50 rounded-4 transition-colors duration-fast group"
                >
                  <Icon
                    name={name}
                    size={16}
                    className="text-grey-400 group-hover:text-grey-975 transition-colors duration-fast"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="shrink-0 p-16">
        <div className="bg-grey-25 rounded-16 p-16 flex flex-col gap-48">
          <p className="cds-body-secondary text-grey-600">Ask anything...</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <button type="button" aria-label="Filter" className="w-24 h-24 flex items-center justify-center hover:bg-grey-100 rounded-4 transition-colors duration-fast">
                <Icon name="tune" size={20} className="text-grey-600" />
              </button>
              <button type="button" aria-label="Point and ask" className="w-24 h-24 flex items-center justify-center hover:bg-grey-100 rounded-4 transition-colors duration-fast">
                <Icon name="near_me" size={20} className="text-grey-600" />
              </button>
            </div>
            <div className="flex items-center gap-16">
              <button type="button" aria-label="Voice input" className="w-24 h-24 flex items-center justify-center hover:bg-grey-100 rounded-4 transition-colors duration-fast">
                <Icon name="mic" size={24} className="text-grey-600" />
              </button>
              <button
                type="button"
                aria-label="Send"
                className="w-32 h-32 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-colors duration-fast"
              >
                <Icon name="arrow_forward" size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile coach bottom sheet ───────────────────────────────────────────────

function CoachBottomSheet({
  responseKey,
  onClose,
}: {
  responseKey: CoachResponseKey;
  onClose: () => void;
}) {
  const { body, followUps } = coachResponses[responseKey];
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-darken-500 transition-opacity duration-normal"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-[20px] shadow-elevation-3 max-h-[90vh] animate-slide-up">
        {/* Grabber */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 flex items-center justify-center pt-8 pb-4"
        >
          <div className="w-[158px] h-[6px] bg-grey-200 rounded-full" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto min-h-0 px-16 pb-24">
          <div className="flex flex-col gap-24">
            {/* User chip */}
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-4 px-12 py-8 rounded-32 bg-grey-25 cds-action-secondary text-grey-975">
                {responseKey}
              </span>
            </div>

            {/* AI response */}
            <div className="flex flex-col gap-12">
              <div className="cds-body-primary text-grey-975 whitespace-pre-line">
                {body}
              </div>

              <p className="cds-body-primary text-grey-975">
                And if you want to continue exploring this topic, try one of these follow-up questions:
              </p>

              {followUps.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="self-start flex items-center gap-4 px-12 py-8 rounded-32 cds-action-secondary text-blue-700 bg-white border border-blue-700 hover:bg-blue-25 active:bg-blue-50 transition-colors duration-fast"
                >
                  <Icon name="auto_awesome" size={16} fill={1} className="text-blue-700" />
                  {q}
                </button>
              ))}

              {/* Reaction icons */}
              <div className="flex items-center gap-8 px-8 py-4">
                {[
                  { name: "thumb_up", label: "Helpful" },
                  { name: "thumb_down", label: "Not helpful" },
                  { name: "download", label: "Download" },
                  { name: "refresh", label: "Regenerate" },
                  { name: "more_horiz", label: "More" },
                ].map(({ name, label }) => (
                  <button
                    key={name}
                    type="button"
                    aria-label={label}
                    className="w-24 h-24 flex items-center justify-center hover:bg-grey-50 rounded-4 transition-colors duration-fast group"
                  >
                    <Icon
                      name={name}
                      size={16}
                      className="text-grey-400 group-hover:text-grey-975 transition-colors duration-fast"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseFramePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [coachResponse, setCoachResponse] = useState<CoachResponseKey | null>(null);
  const [coachPosition, setCoachPosition] = useState<"right" | "left">("right");

  const handleCoachChipClick = (label: CoachResponseKey) => {
    setCoachResponse(label);
    setSidebarOpen(false);
  };

  const handleCloseCoach = () => {
    setCoachResponse(null);
    setSidebarOpen(true);
  };

  // ── YouTube player state ──────────────────────────────────────────────────
  const [desktopVideoPlaying, setDesktopVideoPlaying] = useState(false);
  const [mobileVideoPlaying, setMobileVideoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerDeskRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!desktopVideoPlaying) return;

    const init = () => {
      if (!playerDeskRef.current) return;
      ytPlayerRef.current = new window.YT.Player(playerDeskRef.current, {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 1, start: VIDEO_START, rel: 0, modestbranding: 1 },
        events: {
          onStateChange({ data }) {
            const { PLAYING, ENDED } = window.YT.PlayerState;
            if (data === PLAYING) {
              progressTimerRef.current = setInterval(() => {
                const p = ytPlayerRef.current;
                if (!p) return;
                const t = p.getCurrentTime();
                const d = p.getDuration();
                if (d > 0) setProgress((t / d) * 100);
              }, 500);
            } else {
              if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
                progressTimerRef.current = null;
              }
              if (data === ENDED) setProgress(100);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      init();
    } else {
      window.onYouTubeIframeAPIReady = init;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
    };
  }, [desktopVideoPlaying]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white md:bg-grey-25">

      {/* ════════════════════════════════════════════════════════════════════════
          MOBILE NAV  (< 1024px)
      ════════════════════════════════════════════════════════════════════════ */}
      <nav className="md:hidden bg-white border-b border-grey-100 flex items-center justify-between px-16 py-16 shrink-0">
        {/* Left: sidebar toggle + Coursera C icon */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="w-32 h-32 flex items-center justify-center hover:bg-grey-50 rounded-8 transition-colors duration-fast"
            aria-label="Course outline"
          >
            <Icon name="view_sidebar" size={24} className="text-grey-975" />
          </button>
          <img
            src={imgCourseraCIcon}
            alt="Coursera"
            className="w-24 h-24 shrink-0 object-contain"
          />
        </div>
        <NavRightIcons />
      </nav>

      {/* ════════════════════════════════════════════════════════════════════════
          DESKTOP NAV  (≥ 1024px)
      ════════════════════════════════════════════════════════════════════════ */}
      <nav className="hidden md:flex bg-grey-25 items-center justify-between px-16 py-16 shrink-0">
        {/* Left: logos */}
        <div className="flex items-center gap-12">
          <img
            src={imgCourseraWordmark}
            alt="Coursera"
            className="h-[15px] w-[104px] shrink-0 object-contain object-left"
          />
          <div className="w-px h-[24px] bg-grey-400 opacity-40 shrink-0" />
          <img
            src={imgGoogleLogo}
            alt="Google"
            className="h-[24px] w-[61px] shrink-0 object-contain object-left"
          />
        </div>

        {/* Centre: progress pill */}
        <div className="flex items-center gap-12 bg-white border border-grey-100 rounded-32 h-[36px] px-16">
          <p className="cds-body-secondary text-grey-975 whitespace-nowrap">
            1/4 learning items
          </p>
          <div className="w-[124px] h-[4px] bg-grey-200 rounded-full overflow-hidden shrink-0">
            <div
              className="h-full w-[100px] rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(106deg, rgb(166,120,245) 0%, rgb(74,15,171) 98%)",
              }}
            />
          </div>
          <div className="w-px h-[24px] bg-grey-100" />
          <button
            type="button"
            className="flex items-center gap-2 rounded-8 hover:bg-grey-50 active:bg-grey-100 transition-colors duration-fast px-4 py-2"
          >
            {[0, 1, 2].map((i) => (
              <Icon key={i} name="star" size={20} className="text-grey-400" />
            ))}
            <Icon name="expand_more" size={20} className="text-grey-600 ml-2" />
          </button>
        </div>

        {/* Right: icons */}
        <div className="flex items-center gap-8">
          {/* Coach position toggle — only visible when coach is open */}
          {coachResponse && (
            <div className="flex items-center bg-grey-50 rounded-8 p-2 gap-2">
              <button
                type="button"
                aria-label="Coach on left"
                onClick={() => setCoachPosition("left")}
                className={`w-28 h-28 flex items-center justify-center rounded-4 transition-colors duration-fast ${
                  coachPosition === "left" ? "bg-white shadow-elevation-1" : "hover:bg-grey-100"
                }`}
              >
                <Icon name="dock_to_left" size={16} className={coachPosition === "left" ? "text-blue-700" : "text-grey-600"} />
              </button>
              <button
                type="button"
                aria-label="Coach on right"
                onClick={() => setCoachPosition("right")}
                className={`w-28 h-28 flex items-center justify-center rounded-4 transition-colors duration-fast ${
                  coachPosition === "right" ? "bg-white shadow-elevation-1" : "hover:bg-grey-100"
                }`}
              >
                <Icon name="dock_to_right" size={16} className={coachPosition === "right" ? "text-blue-700" : "text-grey-600"} />
              </button>
            </div>
          )}
          <NavIconBtn label="Help">
            <Icon name="help" size={20} className="text-grey-975" />
          </NavIconBtn>
          <NavIconBtn label="Language">
            <Icon name="language" size={20} className="text-grey-975" />
          </NavIconBtn>
          <NavIconBtn label="Coach">
            <img src="/coach-icon.png" alt="Coach" className="w-24 h-24 object-contain" />
          </NavIconBtn>
          <UserAvatar />
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════════
          MOBILE CONTENT  (< 1024px)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden bg-white">
        {/* Full-bleed video */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          {mobileVideoPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${VIDEO_START}&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Why data visualization matters"
            />
          ) : (
            <>
              <img
                src={imgVideo}
                alt="Video thumbnail — Why data visualization matters"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Play video"
                onClick={() => setMobileVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-48 h-48 bg-white/90 rounded-full flex items-center justify-center shadow-elevation-2 group-hover:scale-110 transition-transform duration-normal">
                  <Icon name="play_arrow" size={28} fill={1} className="text-grey-975 translate-x-[2px]" />
                </div>
              </button>
            </>
          )}
        </div>

        {/* Scrollable content below video */}
        <div className="flex-1 overflow-y-auto min-h-0" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col gap-16 py-16">

            {/* Title + Save note */}
            <div className="flex items-center justify-between gap-12 px-16">
              <h2 className="cds-subtitle-md text-grey-975">
                Why data visualization matters
              </h2>
              <button
                type="button"
                className="flex items-center gap-4 px-12 py-8 rounded-8 cds-action-secondary text-blue-700 border border-blue-700 hover:bg-blue-25 active:bg-blue-50 transition-colors duration-fast shrink-0"
              >
                <Icon name="note_alt" size={16} className="text-blue-700" />
                Save note
              </button>
            </div>

            {/* Transcript / Notes / Files tab chips */}
            <div className="flex gap-8 px-16 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <MobileTab icon="subtitles" label="Transcript" />
              <MobileTab icon="edit_note" label="Notes" />
              <MobileTab icon="description" label="Files" />
            </div>

            {/* Coach section */}
            <div className="px-16">
              <CoachSection mobile onChipClick={handleCoachChipClick} />
            </div>

            {/* Feedback */}
            <div className="px-16">
              <FeedbackRow />
            </div>

            {/* Go to next item */}
            <div className="px-16 flex justify-end">
              <button
                type="button"
                className="flex items-center gap-8 px-16 py-8 rounded-8 cds-action-secondary text-blue-700 border border-blue-700 hover:bg-blue-25 active:bg-blue-50 transition-colors duration-fast"
              >
                Go to next item
                <Icon name="arrow_forward" size={16} className="text-blue-700" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile coach bottom sheet */}
      {coachResponse && (
        <div className="md:hidden">
          <CoachBottomSheet
            responseKey={coachResponse}
            onClose={handleCloseCoach}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          DESKTOP CONTENT  (≥ 1024px)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-1 gap-16 px-16 pb-16 overflow-hidden min-h-0">

        {/* ── Left Coach panel slot (active when coachPosition === "left") ──── */}
        <div
          className={`shrink-0 h-full overflow-hidden transition-all duration-normal ease-standard ${
            coachPosition === "left" && coachResponse ? "w-[490px] opacity-100" : "w-0 opacity-0"
          }`}
        >
          {coachPosition === "left" && coachResponse && (
            <CoachChatPanel
              responseKey={coachResponse}
              onClose={handleCloseCoach}
            />
          )}
        </div>

        {/* ── Left sidebar ───────────────────────────────────────────────────── */}
        <div className={`shrink-0 overflow-hidden transition-all duration-normal ease-standard ${
          coachPosition === "left" && coachResponse ? "w-0" : sidebarOpen ? "w-[344px]" : "w-0"
        }`}>
          <aside className="bg-white rounded-16 w-[344px] shrink-0 flex flex-col overflow-hidden h-full">
            {/* Sticky header */}
            <div className="px-16 py-16 border-b border-grey-100 shrink-0 relative">
              <div className="pr-32">
                <h1 className="cds-subtitle-lg text-grey-975 leading-[24px]">
                  Share Data Through the Art of Visualization
                </h1>
                <p className="cds-body-secondary text-grey-600 mt-4">4 modules</p>
              </div>
              <button
                type="button"
                className="absolute top-[14px] right-[14px] p-4 hover:bg-grey-50 rounded-4 transition-colors duration-fast"
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon name="view_sidebar" size={16} className="text-grey-975" />
              </button>
            </div>

            {/* Scrollable module list */}
            <div className="flex-1 overflow-y-auto min-h-0" style={{ scrollbarWidth: "none" }}>
              {/* Module 1 — expanded */}
              <div className="border-t border-grey-100">
                <button
                  type="button"
                  className="flex items-center justify-between px-16 py-16 bg-white w-full text-left hover:bg-grey-50 active:bg-grey-100 transition-colors duration-fast"
                >
                  <div className="flex flex-col gap-2">
                    <p className="cds-subtitle-sm text-grey-600">Module 1</p>
                    <p className="cds-subtitle-md text-grey-975">Visualize data</p>
                  </div>
                  <Icon name="expand_more" size={20} className="text-grey-600 shrink-0" />
                </button>
                <div className="px-16 pb-16">
                  <div className="py-8">
                    <p className="cds-subtitle-sm text-grey-600">Communicate data insights</p>
                  </div>
                  {section1.map((item, i) => <SidebarItem key={i} {...item} />)}
                  <div className="pt-8 pb-8">
                    <p className="cds-subtitle-sm text-grey-600">Understand data visualization</p>
                  </div>
                  {section2.map((item, i) => <SidebarItem key={i} {...item} />)}
                </div>
              </div>

              {/* Module 3 — collapsed */}
              <div className="border-t border-grey-100">
                <button
                  type="button"
                  className="flex items-center justify-between px-16 py-16 bg-white w-full text-left hover:bg-grey-50 active:bg-grey-100 transition-colors duration-fast"
                >
                  <div className="flex flex-col gap-2">
                    <p className="cds-subtitle-sm text-grey-600">Module 3</p>
                    <p className="cds-subtitle-md text-grey-975">Your career as a data professional</p>
                  </div>
                  <Icon name="expand_more" size={20} className="text-grey-600 shrink-0" />
                </button>
              </div>

              {/* Module 4 — collapsed */}
              <div className="border-t border-grey-100">
                <button
                  type="button"
                  className="flex items-center justify-between px-16 py-16 bg-white w-full text-left hover:bg-grey-50 active:bg-grey-100 transition-colors duration-fast"
                >
                  <div className="flex flex-col gap-2">
                    <p className="cds-subtitle-sm text-grey-600">Module 4</p>
                    <p className="cds-subtitle-md text-grey-975">Data applications and workflow</p>
                  </div>
                  <Icon name="expand_more" size={20} className="text-grey-600 shrink-0" />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Expand sidebar button — hidden when coach is left-positioned and open */}
        <button
          type="button"
          className={`shrink-0 self-start mt-[14px] p-4 hover:bg-grey-50 rounded-4 transition-all duration-normal ease-standard ${
            coachPosition === "left" && coachResponse
              ? "w-0 opacity-0 overflow-hidden"
              : sidebarOpen
                ? "w-0 opacity-0 overflow-hidden"
                : "opacity-100"
          }`}
          aria-label="Expand sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <Icon name="view_sidebar" size={16} className="text-grey-975" />
        </button>

        {/* ── Main content card ───────────────────────────────────────────────── */}
        <main className="bg-white rounded-16 flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Playback progress bar */}
          <div className="h-[3px] bg-grey-100 shrink-0 rounded-t-16 overflow-hidden">
            <div
              className="h-full bg-blue-700 transition-[width] duration-500 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex-1 flex overflow-hidden min-h-0">

            {/* Video panel */}
            <div className="flex-[5] overflow-y-auto min-h-0 min-w-0" style={{ scrollbarWidth: "none" }}>
              <div className="flex flex-col gap-24 p-16">
                <div className="relative w-full rounded-16 overflow-hidden bg-black aspect-video">
                  {desktopVideoPlaying ? (
                    <div ref={playerDeskRef} className="absolute inset-0 w-full h-full" />
                  ) : (
                    <>
                      <img
                        src={imgVideo}
                        alt="Video thumbnail — Why data visualization matters"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        aria-label="Play video"
                        onClick={() => setDesktopVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-64 h-64 bg-white/90 rounded-full flex items-center justify-center shadow-elevation-2 group-hover:scale-110 transition-transform duration-normal">
                          <Icon name="play_arrow" size={36} fill={1} className="text-grey-975 translate-x-[2px]" />
                        </div>
                      </button>
                    </>
                  )}
                </div>

                {/* Title + Save note */}
                <div className="flex items-center justify-between gap-16">
                  <h2 className="cds-title-xs text-grey-975">
                    Why data visualization matters
                  </h2>
                  <button
                    type="button"
                    className="flex items-center gap-4 px-12 py-8 rounded-8 cds-action-secondary text-blue-700 border border-blue-700 hover:bg-blue-25 active:bg-blue-50 active:border-blue-800 transition-colors duration-fast shrink-0"
                  >
                    <Icon name="note_alt" size={16} className="text-blue-700" />
                    Save note
                  </button>
                </div>

                {/* Feedback */}
                <FeedbackRow />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-grey-100 shrink-0" />

            {/* Reading panel */}
            <div className="flex-[6] overflow-y-auto min-h-0 min-w-0" style={{ scrollbarWidth: "none" }}>
              <div className="flex flex-col gap-24 p-16">
                <CoachSection onChipClick={handleCoachChipClick} />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="shrink-0 h-[68px] px-16 flex items-center justify-end border-t border-grey-100">
            <button
              type="button"
              className="flex items-center gap-8 px-16 py-8 rounded-8 cds-action-secondary text-blue-700 border border-blue-700 hover:bg-blue-25 active:bg-blue-50 active:border-blue-800 transition-colors duration-fast"
            >
              Go to next item
              <Icon name="arrow_forward" size={16} className="text-blue-700" />
            </button>
          </div>
        </main>

        {/* ── Coach chat panel (slides in from right) ─────────────────────── */}
        <div
          className={`shrink-0 h-full overflow-hidden transition-all duration-normal ease-standard ${
            coachPosition === "right" && coachResponse ? "w-[490px] opacity-100" : "w-0 opacity-0"
          }`}
        >
          {coachPosition === "right" && coachResponse && (
            <CoachChatPanel
              responseKey={coachResponse}
              onClose={handleCloseCoach}
            />
          )}
        </div>

      </div>
    </div>
  );
}
