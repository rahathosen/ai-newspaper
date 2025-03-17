import { Header } from "@/components/header"
import { FeaturedArticle } from "@/components/featured-article"
import { Sidebar } from "@/components/sidebar"
import { MoreStories } from "@/components/more-stories"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-section"
import { Separator } from "@/components/ui/separator"
import { Advertisement } from "@/components/advertisement"
// import { StickyAd } from "@/components/sticky-ad"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { LiveNewsTicker } from "@/components/live-news-ticker"
import { WeatherForecast } from "@/components/weather-forecast"
import { AreaNewsFilter } from "@/components/area-news-filter"
import { PollWidget } from "@/components/poll-widget"
import { InteractiveQuiz } from "@/components/interactive-quiz"
import { AiFeatures } from "@/components/ai-features"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GameAdvertisement } from "@/components/games/game-advertisement"

export default function Home() {
  // Mock data for news sections
  const politicsArticles = [
    {
      id: 1,
      title: "Senate Passes Landmark Infrastructure Bill After Months of Negotiations",
      excerpt:
        "The $1.2 trillion infrastructure package includes funding for roads, bridges, public transit, broadband, and more. The bill now moves to the House for consideration.",
      author: "Jennifer Reynolds",
      date: "2 hours ago",
      image: "/thumbnail.jpg?height=400&width=600&text=Politics",
    },
    {
      id: 2,
      title: "President to Address Nation on Economic Recovery Plan",
      excerpt: "The speech will outline new initiatives aimed at job creation and inflation control.",
      author: "Michael Chen",
      date: "4 hours ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Politics",
    },
    {
      id: 3,
      title: "Supreme Court to Hear Arguments on Voting Rights Case",
      excerpt: "The case could have far-reaching implications for future elections and voter access.",
      author: "Sarah Johnson",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Politics",
    },
    {
      id: 4,
      title: "Congressional Committee Advances Tax Reform Proposal",
      excerpt: "The bill includes changes to corporate tax rates and new deductions for middle-income families.",
      author: "David Wilson",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Politics",
    },
  ]

  const businessArticles = [
    {
      id: 1,
      title: "Tech Giant Announces $50 Billion Investment in U.S. Manufacturing",
      excerpt:
        "The company plans to build new facilities across five states, creating an estimated 20,000 jobs over the next decade. This marks one of the largest corporate investments in American manufacturing in recent years.",
      author: "Robert Williams",
      date: "3 hours ago",
      image: "/thumbnail.jpg?height=400&width=600&text=Business",
    },
    {
      id: 2,
      title: "Global Markets Rally as Inflation Concerns Ease",
      excerpt: "Stock indices reached new highs following positive economic data and central bank statements.",
      author: "Jennifer Lee",
      date: "5 hours ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Business",
    },
    {
      id: 3,
      title: "Retail Sales Surge in Post-Pandemic Shopping Boom",
      excerpt: "Consumer spending has exceeded pre-pandemic levels across most sectors, analysts report.",
      author: "Thomas Brown",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Business",
    },
    {
      id: 4,
      title: "Energy Company Unveils Carbon-Neutral Plan",
      excerpt: "The initiative aims to eliminate carbon emissions from operations by 2030.",
      author: "Maria Garcia",
      date: "2 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Business",
    },
  ]

  const technologyArticles = [
    {
      id: 1,
      title: "Revolutionary AI Model Can Predict Protein Structures with 98% Accuracy",
      excerpt:
        "Scientists have developed a new artificial intelligence system that can determine the 3D structure of proteins from their amino acid sequence, potentially revolutionizing drug discovery and biomedical research.",
      author: "Dr. Emily Chen",
      date: "Today",
      image: "/thumbnail.jpg?height=400&width=600&text=Technology",
    },
    {
      id: 2,
      title: "New Quantum Computing Breakthrough Achieves 'Quantum Advantage'",
      excerpt: "Researchers demonstrate a quantum computer solving problems impossible for classical systems.",
      author: "James Wilson",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Technology",
    },
    {
      id: 3,
      title: "Electric Vehicle Startup Unveils Revolutionary Battery Technology",
      excerpt: "The new batteries promise 600 miles of range and can charge to 80% in just 15 minutes.",
      author: "Sophia Rodriguez",
      date: "2 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Technology",
    },
    {
      id: 4,
      title: "Major Tech Companies Agree on New Data Privacy Standards",
      excerpt: "The framework aims to give users more control over their personal information.",
      author: "Daniel Kim",
      date: "3 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Technology",
    },
  ]

  const sportsArticles = [
    {
      id: 1,
      title: "Underdog Team Makes Historic Championship Run in Dramatic Final",
      excerpt:
        "In a stunning upset, the team overcame a 15-point deficit in the final quarter to claim their first championship in franchise history. The victory caps an improbable playoff run that has captivated fans nationwide.",
      author: "Marcus Johnson",
      date: "6 hours ago",
      image: "/thumbnail.jpg?height=400&width=600&text=Sports",
    },
    {
      id: 2,
      title: "Star Athlete Signs Record-Breaking Contract Extension",
      excerpt: "The deal makes them the highest-paid player in the league's history at $45 million per year.",
      author: "Jessica Thompson",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Sports",
    },
    {
      id: 3,
      title: "Olympic Committee Announces New Sports for 2028 Games",
      excerpt: "The additions include cricket, squash, and flag football, expanding the Olympic program.",
      author: "Carlos Mendez",
      date: "2 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Sports",
    },
    {
      id: 4,
      title: "Legendary Coach Announces Retirement After 30-Year Career",
      excerpt:
        "The Hall of Fame coach leaves behind an incredible legacy with five championships and numerous records.",
      author: "Alex Peterson",
      date: "3 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Sports",
    },
  ]

  const healthArticles = [
    {
      id: 1,
      title: "New Study Reveals Breakthrough in Alzheimer's Treatment",
      excerpt:
        "Researchers have identified a novel approach that significantly slows cognitive decline in early-stage patients. The clinical trials showed a 42% reduction in disease progression over an 18-month period.",
      author: "Dr. Sarah Johnson",
      date: "Today",
      image: "/thumbnail.jpg?height=400&width=600&text=Health",
    },
    {
      id: 2,
      title: "Mediterranean Diet Linked to Longer Lifespan, Comprehensive Study Finds",
      excerpt: "The 25-year study followed over 100,000 participants and found significant health benefits.",
      author: "Dr. Michael Rivera",
      date: "Yesterday",
      image: "/thumbnail.jpg?height=200&width=300&text=Health",
    },
    {
      id: 3,
      title: "Mental Health Awareness Campaign Launches Nationwide",
      excerpt: "The initiative aims to reduce stigma and improve access to mental health resources.",
      author: "Emma Thompson",
      date: "2 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Health",
    },
    {
      id: 4,
      title: "New Guidelines Released for Children's Screen Time",
      excerpt: "Pediatricians update recommendations based on latest research on digital media effects.",
      author: "Dr. James Wilson",
      date: "3 days ago",
      image: "/thumbnail.jpg?height=200&width=300&text=Health",
    },
  ]

  // Sample quiz questions
  const quizQuestions = [
    {
      id: "q1",
      question: "Which country recently announced the largest investment in renewable energy?",
      options: [
        { id: "a", text: "United States" },
        { id: "b", text: "China" },
        { id: "c", text: "Germany" },
        { id: "d", text: "India" },
      ],
      correctAnswer: "b",
      explanation:
        "China recently announced a $1.2 trillion investment in renewable energy over the next decade, the largest commitment of any nation.",
    },
    {
      id: "q2",
      question: "What was the major focus of the recent G20 summit?",
      options: [
        { id: "a", text: "Trade agreements" },
        { id: "b", text: "Climate change" },
        { id: "c", text: "Artificial intelligence regulation" },
        { id: "d", text: "Global health initiatives" },
      ],
      correctAnswer: "c",
      explanation:
        "The recent G20 summit primarily focused on establishing international frameworks for AI regulation and safety standards.",
    },
    {
      id: "q3",
      question: "Which technology company recently faced antitrust charges?",
      options: [
        { id: "a", text: "Apple" },
        { id: "b", text: "Microsoft" },
        { id: "c", text: "Amazon" },
        { id: "d", text: "Meta" },
      ],
      correctAnswer: "d",
      explanation:
        "Meta (formerly Facebook) recently faced new antitrust charges related to its social media and advertising practices.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 py-2">
        <Advertisement size="leaderboard" className="mx-auto" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="md:col-span-2">
            <FeaturedArticle />

            {/* In-content ad after featured article */}
            <div className="my-8">
              <Advertisement size="banner" className="mx-auto" />
            </div>

            {/* Area News Filter */}
            <div className="mb-8">
              <AreaNewsFilter />
            </div>

            {/* Poll Widget */}
            <div className="mb-8">
              <PollWidget
                id="climate-poll"
                question="Should governments prioritize climate action over economic growth?"
                options={[
                  { id: "a", text: "Yes, climate action must be the top priority", votes: 1245, percentage: 42 },
                  { id: "b", text: "Yes, but with balanced economic considerations", votes: 982, percentage: 33 },
                  { id: "c", text: "No, economic growth should come first", votes: 458, percentage: 15 },
                  { id: "d", text: "No, climate change is not a significant concern", votes: 298, percentage: 10 },
                ]}
                totalVotes={2983}
                expiresAt="2025-03-20T23:59:59"
                category="Politics"
              />
            </div>

            {/* Weather Forecast */}
            <div className="mb-8">
              <WeatherForecast />
            </div>

            {/* Interactive Quiz */}
            <div className="mb-8">
              <InteractiveQuiz
                title="Current Events Quiz"
                description="Test your knowledge of recent world events"
                questions={quizQuestions}
                timeLimit={30}
                category="News"
                difficulty="medium"
              />
            </div>

            {/* Game Advertisements */}
            <div className="mb-8 space-y-6">
              <GameAdvertisement
                title="Challenge Your Mind"
                description="Play our collection of brain-teasing games and puzzles"
                featured={["2048", "Sudoku"]}
                background="gradient"
              />
              <GameAdvertisement
                title="Word Games Tournament"
                description="Compete in our weekly Word Scramble challenge - prizes for top scores!"
                featured={["Word Scramble", "Wordle"]}
                background="pattern"
                variant="compact"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>

        {/* News Sections */}
        <div className="mt-12">
          <NewsSection
            title="Politics"
            category="U.S. & World"
            color="blue-600"
            articles={politicsArticles}
            viewAllLink="#politics"
          />

          {/* Ad between sections */}
          <div className="my-8">
            <Advertisement size="leaderboard" className="mx-auto" />
          </div>

          <Separator className="my-8" />

          <NewsSection
            title="Business"
            category="Economy & Markets"
            color="green-600"
            articles={businessArticles}
            viewAllLink="#business"
          />

          <Separator className="my-8" />

          <NewsSection
            title="Technology"
            category="Innovation & Science"
            color="purple-600"
            articles={technologyArticles}
            viewAllLink="#technology"
          />

          {/* Ad between sections */}
          <div className="my-8">
            <Advertisement size="leaderboard" className="mx-auto" />
          </div>

          <Separator className="my-8" />

          <NewsSection
            title="Sports"
            category="Games & Athletics"
            color="red-600"
            articles={sportsArticles}
            viewAllLink="#sports"
          />

          <Separator className="my-8" />

          <NewsSection
            title="Health & Wellness"
            category="Medicine & Lifestyle"
            color="teal-600"
            articles={healthArticles}
            viewAllLink="#health"
          />
        </div>

        {/* Ad before More Stories */}
        <div className="my-8">
          <Advertisement size="leaderboard" className="mx-auto" />
        </div>

        {/* More Stories */}
        <MoreStories />
      </main>

      {/* Footer Ad */}
      <div className="container mx-auto px-4 py-4">
        <Advertisement size="leaderboard" className="mx-auto" />
      </div>

      <Footer />

      {/* Sticky Ad */}
      {/* <StickyAd position="bottom" delay={2000} /> */}

      {/* Newsletter Popup */}
      <NewsletterPopup delay={15000} />

      {/* Live News Ticker */}
      <LiveNewsTicker />

      {/* AI Features */}
      <AiFeatures />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

