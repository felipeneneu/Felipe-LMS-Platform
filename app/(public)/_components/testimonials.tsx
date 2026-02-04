import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialCard = {
  image: string;
  name: string;
  handle: string;
  quote: string;
};

const cardsData: TestimonialCard[] = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Briar Martin",
    handle: "@neilstellar",
    quote:
      "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Avery Johnson",
    handle: "@averywrites",
    quote: "I cut launch time in half and our students noticed the difference.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    handle: "@jordantalks",
    quote: "The workflows are clear, fast, and simple to scale with our team.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Casey Brown",
    handle: "@caseybuilds",
    quote:
      "Our onboarding became much smoother after moving courses to this stack.",
  },
];

function VerifiedBadge() {
  return (
    <svg
      className="mt-0.5 size-3 fill-primary"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
      />
    </svg>
  );
}

function TestimonialItem({ card }: { card: TestimonialCard }) {
  return (
    <Card className="mx-3 w-72 shrink-0 border-border py-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardContent className="space-y-4 px-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={card.image} alt={`Foto de ${card.name}`} />
            <AvatarFallback>
              {card.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-card-foreground">
                {card.name}
              </p>
              <VerifiedBadge />
            </div>
            <p className="text-xs text-muted-foreground">{card.handle}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{card.quote}</p>
      </CardContent>
    </Card>
  );
}

export const Testimonials = () => {
  return (
    <section className="mb-32">
      <div className="mb-10 flex flex-col items-center space-y-6 text-center">
        <Badge variant="outline">Testimonials</Badge>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Loved by learners and teams
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-lg">
          Real feedback from people using the platform daily to launch courses,
          improve onboarding, and scale learning operations.
        </p>
      </div>

      <style>{`
        @keyframes testimonials-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .testimonials-marquee {
          animation: testimonials-marquee 25s linear infinite;
        }

        .testimonials-marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="relative mx-auto container  overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="testimonials-marquee flex min-w-[200%] transform-gpu py-3">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialItem key={`top-${index}`} card={card} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />
      </div>

      <div className="relative mx-auto mt-3 w-full max-w-5xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="testimonials-marquee testimonials-marquee-reverse flex min-w-[200%] transform-gpu py-3">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialItem key={`bottom-${index}`} card={card} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />
      </div>
    </section>
  );
};
