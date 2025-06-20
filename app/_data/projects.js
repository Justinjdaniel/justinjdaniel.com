export const projects = [
  {
    slug: "demo-app",
    title: "Demo App",
    description: "A demonstration application showcasing various features.",
    about: `It features a clean UI, dark mode, and real-time collaboration.
    Built with Next.js and Tailwind CSS.
    It is a full-stack application with a REST API and a MongoDB database.
    The app includes user authentication, allowing users to sign up and log in securely.
    Users can create, read, update, and delete items in their personal dashboard.
    The application also supports real-time updates using WebSockets, enabling collaborative features.
    The UI is designed to be intuitive and user-friendly, with a focus on accessibility.
    The app is responsive and works well on mobile devices.`,
    github: "https://github.com/justinjdaniel/demo-app",
    demo: "https://demoapp-justinjdaniel.vercel.app",
    stack: ["Next.js", "Tailwind CSS", "MongoDB"],
    media: [
      {
        type: "image",
        src: "https://www.example.com/show/452685/desktop.svg",
        alt: "Screenshot 1",
      },
      {
        type: "video",
        src: "https://www.example.com/media/my-awesome-app-demo.mp4",
        alt: "Demo video",
      },
    ],
    extra: {
      // Any other info, e.g. launch date, role, etc.
      launched: "2025-05-15",
      role: "Full Stack Developer",
      features: [
        "User authentication",
        "Real-time collaboration",
        "Responsive design",
        "Dark mode support",
      ],
    },
  },
  // ...more projects
];
