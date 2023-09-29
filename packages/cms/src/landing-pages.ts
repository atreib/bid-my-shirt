const landingPages = {
  homepage: {
    path: "/",
    title: "Make some extra money with just a few steps",
    subtitle:
      "That shirt you don't use anymore may fit perfectly for someone else.",
    hero: {
      backgroundURL: "/bg.avif",
    },
  },
};

type LandingPage = keyof typeof landingPages;

type Content = {
  path: string;
  title: string;
  subtitle: string;
  hero: {
    backgroundURL: string;
  };
};

export function getLandingPageContent(lp: LandingPage): Content {
  return landingPages[lp];
}
