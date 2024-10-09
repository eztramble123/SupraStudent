'use client'
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
  ThumbsUp,
  ThumbsDown,
  DollarSign,
  Rocket,
  TrendingUp
} from "lucide-react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@radix-ui/react-alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images."

const users = [
  {
    name: ' SmiAlic.eth',
    avatar: '/image.png',
    post: 'lol i hate crypto',
    upvotes: 42,
    downvotes: 3,
  },
  {
    name: 'MVP',
    avatar: '/mvp.jpg',
    post: 'lowkey bullish on bearchain... so whos with me?',
    upvotes: 120,
    downvotes: 5,
  },
  {
    name: 'Carol Davis',
    avatar: '/ben.png',
    post: 'lmao why did i laugh for 10 hours at this',
    image: '/brian.png',
    upvotes: 78,
    downvotes: 2,
  },
  {
    name: 'David Wilson',
    avatar: '/avatars/david.png',
    post: 'Loving the new SupraStudent updates. Keep up the great work!',
    upvotes: 65,
    downvotes: 1,
  },
  {
    name: 'Emma Brown',
    avatar: '/avatars/emma.png',
    post: 'Had a great time at the community barbecue. Thanks to everyone who showed up!',
    upvotes: 89,
    downvotes: 0,
  },
  {
    name: 'Frank Green',
    avatar: '/avatars/frank.png',
    post: 'Working on a new project, hope to share more about it soon. Exciting things ahead!',
    upvotes: 34,
    downvotes: 4,
  },
];

const questions = [
  {
    question: "When was Supra established?",
    answer: "Supra was established in 2018 by a group of blockchain enthusiasts.",
    tokens: 10,
    liked: true,
  },
  {
    question: "What is the capital of California?",
    answer: "The capital of California is Sacramento.",
    tokens: 5,
    liked: false,
  },
  {
    question: "How do you solve the quadratic equation?",
    answer: "The quadratic equation can be solved using the formula: x = (-b ± √(b² - 4ac)) / 2a.",
    tokens: 15,
    liked: true,
  },
  {
    question: "What is Berkeley known for?",
    answer: "Berkeley is known for its prestigious university, UC Berkeley, and its history of political activism.",
    tokens: null,
    liked: false,
  },
  {
    question: "How do I derive the product rule?",
    answer: "The product rule can be derived using the limit definition of the derivative.",
    tokens: null,
    liked: false,
    image: "/math.png",
  },
]

const mockEvents = [
  {
    subject: "Blockchain Meetup",
    location: "San Francisco",
    time: "7:00 PM",
  },
  {
    subject: "AI & Machine Learning Workshop",
    location: "New York",
    time: "6:00 PM",
  },
  {
    subject: "React Beginners Course",
    location: "Online",
    time: "5:00 PM",
  },
  {
    subject: "Next.js Deep Dive",
    location: "Utah",
    time: "8:00 PM",
  },
];

export default function Home() {
  const [questionList, setQuestionList] = useState(questions);
  const [eventList, setEventList] = useState(mockEvents);
  interface Event {
    subject: string;
    location: string;
    time: string;
  }

  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [chatMessages, setChatMessages] = useState(users);

  const addQuestion = (newQuestionText: string, bidValue: number) => {
    const newQuestion = {
      question: newQuestionText,
      answer: "Unanswered",
      tokens: bidValue,
      liked: false,
    };
    setQuestionList([newQuestion, ...questionList]);
  };

  const addEvent = (subject: string, location: string, time: string) => {
    const newEvent = { subject, location, time };
    setEventList([newEvent, ...eventList]);
  };

  const joinEvent = (event: { subject: string; location: string; time: string; }) => {
    setJoinedEvents([...joinedEvents, event]);
  };

  const addChatMessage = (name: string, avatar: string, post: string, image?: string) => {
    const newMessage = {
      name,
      avatar,
      post,
      image,
      upvotes: 0,
      downvotes: 0,
    };
    setChatMessages([newMessage, ...chatMessages]);
  };

  const { setTheme } = useTheme()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Supra<span className="text-red-500">Student</span>
          </h1>
          <div className="flex gap-4 ml-auto"></div>
          <div className="relative flex-2 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/supra_image.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 grid-cols-12">
          <div className="col-span-12 md:col-span-3 lg:col-span-3 p-4">
            <div className="flex items-center gap-4">
              <Card x-chunk="dashboard-07-chunk-6">
                <CardHeader>
                                    <div className="flex justify-between items-center">
                    <CardTitle>Your SupraStudent Status</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Lottery</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Lottery</DialogTitle>
                        </DialogHeader>
                        <SpinCircle />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>
                    Check your current token holding and rank.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Image src="/supra_image.png" width={40} height={40} alt="Avatar" className="rounded-full" />
                      <span className="text-lg font-semibold">Your SupraStudents: 662</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="text-lg">Rank: </span>
                      <span className="font-bold text-blue-500">High</span>
                    </div>
                    <Component></Component>

                    <div className="text-sm text-muted-foreground">
                      Keep up the good work! You are among the top token holders in SupraStudent.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Joined Events</CardTitle>
              </CardHeader>
              <CardContent>
                {joinedEvents.length > 0 ? (
                  <ul>
                    {joinedEvents.map((event, index) => (
                      <li key={index} className="p-2 border-b">
                        <div className="font-semibold">{event.subject}</div>
                        <div className="text-sm text-muted-foreground">Location: {event.location}</div>
                        <div className="text-sm text-muted-foreground">Time: {event.time}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No events joined yet.</p>
                )}
              </CardContent>
            </Card>

          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 p-4">
            <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
              <div className="flex justify-between items-center">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Create or Join an Event
                </h1>
                <div className="flex gap-2">
                  {/* Create Event Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Create Event</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Event</DialogTitle>
                        <DialogDescription>What type of event would you like to create?</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Subject
                          </Label>
                          <Input id="subject" defaultValue="" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location
                          </Label>
                          <Input id="location" defaultValue="" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="time" className="text-right">
                            Time
                          </Label>
                          <Input id="time" defaultValue="" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => {
                            const subjectElement = document.getElementById("subject");
                            const subject = subjectElement ? (subjectElement as HTMLInputElement).value : '';
                            const locationElement = document.getElementById("location");
                            const location = locationElement ? (locationElement as HTMLInputElement).value : '';
                            const timeElement = document.getElementById("time");
                            const time = timeElement ? (timeElement as HTMLInputElement).value : '';
                            if (subject && location && time) {
                              addEvent(subject, location, time);
                            }
                          }}
                        >
                          Save Event
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Join Event Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-red-500 text-white">
                        Join Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px] sm:max-h-[800px]">
                      <DialogHeader>
                        <DialogTitle>Join Event</DialogTitle>
                        <DialogDescription>Choose an event to join:</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[500px] w-[800px] rounded-md border p-4">
                        <div className="grid gap-4">
                          {eventList.map((event, index) => (
                            <div
                              key={index}
                              className="p-4 border rounded-lg cursor-pointer hover:bg-muted/20"
                              onClick={() => joinEvent(event)}
                            >
                              <div className="font-semibold">{event.subject}</div>
                              <div className="text-sm text-muted-foreground">Location: {event.location}</div>
                              <div className="text-sm text-muted-foreground">Time: {event.time}</div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                        <Button type="button">Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Question Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">

                    <div className="grid gap-3">
                      <Label htmlFor="name">Category</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue="Blockchain"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="When was Supra established?"
                        className="min-h-32"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="bid">Willing to pay for your question?</Label>
                      <Input
                        id="bid"
                        type="number"
                        className="w-full"
                        placeholder="Enter your bid"
                      />
                    </div>
                    <Button variant="outline" onClick={() => {
                      const categoryElement = document.getElementById('name');
                      const category = categoryElement ? (categoryElement as HTMLInputElement).value : '';
                      const descriptionElement = document.getElementById('description');
                      const description = descriptionElement ? (descriptionElement as HTMLTextAreaElement).value : '';
                      const bidElement = document.getElementById('bid');
                      const bid = bidElement ? parseFloat((bidElement as HTMLInputElement).value) : 0;
                      if (category && description && bid) {
                        addQuestion(`${category}: ${description}`, bid);
                      }
                    }}>Submit Question</Button>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Question and Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  {questionList.map((q, index) => (
                    <React.Fragment key={index}>
                      <hr className="border-t-2 border-red-400 my-4" />
                      <div className="flex gap-4">
                        <div className="flex items-start">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedQuestions = questionList.map((question, idx) => {
                                  if (idx === index) {
                                    return { ...question, liked: !question.liked };
                                  }
                                  return question;
                                });
                                setQuestionList(updatedQuestions);
                              }}
                            >
                              {q.liked ? (
                                <ThumbsUp className="h-5 w-5 text-green-500" />
                              ) : (
                                <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedQuestions = questionList.map((question, idx) => {
                                  if (idx === index) {
                                    return { ...question, liked: false };
                                  }
                                  return question;
                                });
                                setQuestionList(updatedQuestions);
                              }}
                            >
                              {!q.liked ? (
                                <ThumbsDown className="h-5 w-5 text-red-500" />
                              ) : (
                                <ThumbsDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold">{q.question}</div>
                            {q.tokens && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Image
                                  src="/supra_image.png"
                                  width={36}
                                  height={36}
                                  alt="Avatar"
                                  className="overflow-hidden rounded-full"
                                />
                                <span>{q.tokens} Supra</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {q.answer}
                          </div>
                          {q.image && (
                            <Image
                              src={q.image}
                              width={500}
                              height={500}
                              alt=""
                              className="rounded-lg mt-4"
                            />
                          )}
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder={`Answer question and earn ${q.tokens} Supra`}
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 lg:col-span-3 p-4">
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card
                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
              >
                <CardHeader>
                  <CardTitle>SupChat</CardTitle>
                  <CardDescription>
                    Memes, Jokes, What's up chat?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="chatMessage" className="text-right">
                        Message
                      </Label>
                      <Input id="chatMessage" defaultValue="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="chatImage" className="text-right">
                        Image URL
                      </Label>
                      <Input id="chatImage" defaultValue="" className="col-span-3" />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const messageElement = document.getElementById("chatMessage");
                        const message = messageElement ? (messageElement as HTMLInputElement).value : '';
                        const imageElement = document.getElementById("chatImage");
                        const image = imageElement ? (imageElement as HTMLInputElement).value : '';
                        if (message) {
                          addChatMessage('You', '/supra_image.png', message, image);
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle> Feed </CardTitle>
                  <CardDescription>
                    Say what you want to say!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>{/* User feed starts here */}</div>
                  {chatMessages.map((user, index) => (
                    <div key={index} className="p-4 border-b border-red-300">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar}
                          width={40}
                          height={40}
                          alt="Avatar"
                          className="rounded-full"
                        />
                        <div className="font-bold text-lg">{user.name}</div>
                      </div>
                      <div className="mt-2">
                        {user.post}
                      </div>
                      {user.image && (
                        <Image
                          src={user.image}
                          width={300}
                          height={200}
                          alt="Post Image"
                          className="rounded-lg mt-3"
                        />
                      )}
                      <div className="flex items-center mt-3 gap-4 text-gray-600">
                        <div className="flex items-center">
                          <button className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {user.upvotes}
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4" />
                            {user.downvotes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 275, fill: "var(--color-firefox)" },
]

const chartConfig = {
  visitors: {
    label: "Points",
  },
  chrome: {
    label: "Questions",
    color: "hsl(0, 100%, 80%)", // Light red
  },
  safari: {
    label: "Answers",
    color: "hsl(0, 100%, 50%)", // Red
  },
  firefox: {
    label: "SupChat",
    color: "hsl(0, 100%, 30%)", // Dark red
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Activity Metrics</CardTitle>
        <CardDescription>The more the better!</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}





// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// Dataset for the spin wheel
// Example array of comments with names
const comments = [
  { name: "Alice", comment: "Great post!" },
  { name: "Bob", comment: "Very informative." },
  { name: "Charlie", comment: "Thanks for sharing." },
  { name: "David", comment: "Interesting read." },
  { name: "Eve", comment: "Loved it!" },
  { name: "Frank", comment: "Nice article." },
  { name: "Grace", comment: "Well written." },
  { name: "Hank", comment: "Good job!" },
];

// Colors for the dataset
const colors = [
  "#ffcccc", // Light red
  "#ff9999", // Light pink
  "#ff6666", // Medium red
  "#ff4d4d", // Medium pink
  "#ff3333", // Dark red
  "#ff1a1a", // Dark pink
  "#e60000", // Darker red
  "#b30000", // Even darker red
];

// Map the comments to the datasetValues array
const datasetValues = comments.map((comment, index) => ({
  value: Math.random() * 100, // Random value for demonstration
  color: colors[index % colors.length], // Cycle through colors
  label: comment.name, // Use the name as the label
}));

export function SpinCircle() {
  // State variables
  const [countdown, setCountdown] = useState<number>(Math.floor(Math.random() * 60) + 1);
  const [nextRoundCountdown, setNextRoundCountdown] = useState<number>(10);
  const [nextRoundOn, setNextRoundOn] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [randomRotation, setRandomRotation] = useState<number>(0);
  const [winningAmount, setWinningAmount] = useState<number>(0);
  const chartRef = useRef<ChartJS<
    "doughnut",
    (number | [number, number] | any | any | any)[],
    unknown
  > | null>(null);

  // Data for the Doughnut chart
  const data = {
    datasets: [
      {
        data: datasetValues.map((item) => item.value),
        backgroundColor: datasetValues.map((item) => item.color),
        borderColor: datasetValues.map((item) => item.color),
        cutout: "67%", // Adjusted for a larger gap
        rotation: randomRotation,
      },
    ],
    labels: datasetValues.map((item) => item.label),
    hoverOffset: 3,
  };

  // Function to handle rotation
  function Rotation() {
    const chart = chartRef.current;
    if (chart) {
      const randomRotation = Math.random() * 3600; // Increased rotation for a longer spin
      setRandomRotation(randomRotation);
      chart.update();
    }
  }

  useEffect(() => {
    setWinningAmount(parseFloat((Math.random() * (1 - 0.0001) + 0.0001).toFixed(6)));
  }, []);


  
  // UseEffect hooks for countdown and spinning logic
  useEffect(() => {
    if (countdown > 0) {
      const counterTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(counterTimer);
    } else {
      setSpinning(true);
      Rotation();
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * datasetValues.length);
        setWinnerIndex(randomIndex);
      setWinningAmount(parseFloat((Math.random() * (1 - 0.0001) + 0.0001).toFixed(6)));
        setNextRoundCountdown(10);
        setNextRoundOn(true);
        setSpinning(false);
      }, 4000); // Spin duration is now 4 seconds
    }
  }, [countdown]);

  useEffect(() => {
    if (nextRoundOn && nextRoundCountdown > 0) {
      const nextRoundCounter = setInterval(() => {
        setNextRoundCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(nextRoundCounter);
    } else if (nextRoundOn && nextRoundCountdown === 0) {
      setNextRoundOn(false);
      setCountdown(60);
    }
  }, [nextRoundOn, nextRoundCountdown]);

  // Define SVG Elements for Countdown Circle
  const circleSize = 200; // Size of the countdown circle
  const circleRadius = circleSize / 2;
  const circumference = 2 * Math.PI * circleRadius; // Circumference of the circle
  const progress = ((60 - countdown) / 60) * circumference; // Progress based on countdown (reverse direction)

  // Render the component
  return (
    <div className="relative w-[340px] h-[340px] md:w-[410px] md:h-[410px] flex items-center justify-center p-4">
      <div
        onClick={Rotation}
        className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-center z-10 text-white"
      >
        {countdown > 0 ? (
          <div className="flex -mt-12 flex-row justify-center text-2xl font-bold text-gray-300">
            {winningAmount.toFixed(6)} Supra
          </div>
        ) : winnerIndex !== null && nextRoundOn ? (
          <div className="flex items-center flex-col">
            <div className="flex -mt-12 flex-row justify-center text-2xl font-bold text-gray-300">
              {winningAmount.toFixed(6)} Supra
            </div>
            <div className="flex items-center flex-row justify-center uppercase font-bold text-gray-200">
              Winner: {datasetValues[winnerIndex].label}
            </div>
            {nextRoundOn && (
              <div className="flex items-center flex-row justify-center text-sm text-gray-500">
                Next Round: {nextRoundCountdown}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center flex-row justify-center uppercase font-bold text-gray-200">
            Spinning...
          </div>
        )}
        {!nextRoundOn && countdown > 0 && (
          <div className="text-sm text-gray-400 mt-2">Time left: {countdown} seconds</div>
        )}
      </div>
      <div className="relative w-[300px] h-[300px] md:w-[368px] md:h-[368px] p-4">
        <Doughnut
          data={data}
          options={{ plugins: { legend: { display: false } }, rotation: -90 }}
          ref={chartRef}
        />
        <svg
          className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[368px] md:h-[368px] pointer-events-none -rotate-90"
          viewBox={`0 0 ${circleSize + 11} ${circleSize + 11}`}
        >
          <circle
            className="fill-none stroke-gray-500"
            cx="50%"
            cy="50%"
            r={circleRadius}
            strokeWidth="2"
          />
          <circle
            className="fill-none stroke-white transition-all duration-1000"
            cx="50%"
            cy="50%"
            r={circleRadius}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div
          id="arrow-icon"
          className="absolute top-1.5 md:top-[7px] left-1/2 transform -translate-x-1/2 text-white rotate-180"
        >
          <svg
            className="h-7 w-7 text-white z-20"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 22 22 2 22"></polygon>
          </svg>
        </div>
      </div>
    </div>
  );
}
