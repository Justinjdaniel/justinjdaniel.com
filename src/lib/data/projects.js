export const projects = [
  {
    slug: "my-awesome-app",
    title: "My Awesome App",
    description:
      "A productivity app that helps you organize your tasks efficiently.",
    about: `It features a clean UI, dark mode, and real-time collaboration.
    Built with Next.js and Tailwind CSS.
    It is a full-stack application with a REST API and a MongoDB database.
    The app allows users to create, update, and delete tasks.
    It also includes user authentication and authorization.
    The app is responsive and works well on mobile devices.`,
    github: "https://github.com/justinjdaniel/my-awesome-app",
    demo: "https://myawesomeapp.vercel.app",
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
      launched: "2024-05-10",
      role: "Full Stack Developer",
    },
  },
  // ...more projects
];
