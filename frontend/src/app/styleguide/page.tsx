import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";

export default function StyleguidePage() {
  return (
    <SmoothScroll>
      <main className="py-24 space-y-32">
        <Container>
          <div className="mb-24">
            <h1 className="text-display mb-4">Styleguide</h1>
            <p className="text-muted text-body max-w-2xl">
              A comprehensive overview of all design tokens, typography, UI components, and motion primitives.
            </p>
          </div>

          <section className="space-y-8 border-t border-hairline pt-16">
            <SectionHeading eyebrow="Typography" heading="Type Scale" />
            <div className="space-y-8">
              <div>
                <span className="text-muted text-small uppercase tracking-widest block mb-2">Display (64-96px)</span>
                <div className="text-display">The quick brown fox</div>
              </div>
              <div>
                <span className="text-muted text-small uppercase tracking-widest block mb-2">H2 (40-56px)</span>
                <div className="text-h2">The quick brown fox</div>
              </div>
              <div>
                <span className="text-muted text-small uppercase tracking-widest block mb-2">H3 (24-28px)</span>
                <div className="text-h3">The quick brown fox</div>
              </div>
              <div>
                <span className="text-muted text-small uppercase tracking-widest block mb-2">Body (16-18px)</span>
                <div className="text-body max-w-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
              <div>
                <span className="text-muted text-small uppercase tracking-widest block mb-2">Small (13-14px)</span>
                <div className="text-small text-muted max-w-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8 border-t border-hairline pt-16 mt-16">
            <SectionHeading eyebrow="Colors" heading="Tokens" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Background", var: "bg-background", text: "text-ink", hex: "#FFFFFF" },
                { name: "Surface", var: "bg-surface", text: "text-ink", hex: "#F7F7F8" },
                { name: "Ink", var: "bg-ink", text: "text-white", hex: "#0B0C10" },
                { name: "Muted", var: "bg-muted", text: "text-white", hex: "#6B7280" },
                { name: "Accent", var: "bg-accent", text: "text-white", hex: "#4F46E5" },
                { name: "Hairline", var: "bg-hairline", text: "text-ink", hex: "#ECECEF" },
              ].map((color) => (
                <div key={color.name} className="flex flex-col gap-2">
                  <div className={`h-24 rounded-lg border border-hairline ${color.var} flex items-center justify-center ${color.text} text-small font-medium`}>
                    Aa
                  </div>
                  <div className="text-small font-medium">{color.name}</div>
                  <div className="text-small text-muted">{color.hex}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 border-t border-hairline pt-16 mt-16">
            <SectionHeading eyebrow="Components" heading="Base UI" />
            
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-h3">Buttons</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large Button</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-h3">Badges & Tags</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge>Next.js</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge>Tailwind CSS</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-h3">Forms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                  <div className="space-y-2">
                    <label className="text-small font-medium">Input Field</label>
                    <Input placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-small font-medium">Disabled Input</label>
                    <Input disabled placeholder="Cannot type here" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-small font-medium">Textarea</label>
                    <Textarea placeholder="Type your message here..." />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-h3">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6">
                      <div className="w-12 h-12 bg-surface rounded-full mb-4 flex items-center justify-center">0{i}</div>
                      <h4 className="font-semibold mb-2">Card Title {i}</h4>
                      <p className="text-muted text-small">This is a standard card component for displaying grouped content or projects.</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Container>

        <section className="space-y-16 border-t border-hairline pt-16 mt-16 overflow-hidden">
          <Container>
            <SectionHeading eyebrow="Motion" heading="Animation Primitives" subheading="Turn on 'Reduce Motion' in your OS to see these gracefully degrade to static elements." />
          </Container>

          <Container className="space-y-24">
            <div className="space-y-8">
              <h3 className="text-h3">1. Reveal & TextReveal</h3>
              <div className="p-12 border border-hairline rounded-2xl bg-surface">
                <Reveal>
                  <span className="text-accent text-small font-medium block mb-4">Hello World</span>
                </Reveal>
                <div className="text-h2">
                  <TextReveal text="This heading reveals word by word on scroll." />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-h3">2. Stagger</h3>
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <StaggerItem key={i}>
                    <Card className="p-6 h-32 flex items-center justify-center bg-surface border-none shadow-none">
                      Item {i}
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="space-y-8">
              <h3 className="text-h3">3. Magnetic Button</h3>
              <div className="flex gap-8 p-12 border border-hairline rounded-2xl items-center justify-center bg-surface">
                <MagneticButton strength={0.3}>Hover Me Gently</MagneticButton>
                <MagneticButton variant="ghost" strength={0.5}>Pull Me Further</MagneticButton>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-h3">4. CountUp</h3>
              <div className="grid grid-cols-3 gap-4 text-center p-12 border border-hairline rounded-2xl bg-surface">
                <div>
                  <div className="text-h2 font-bold"><CountUp end={100} suffix="%" /></div>
                  <div className="text-small text-muted mt-2">Satisfaction</div>
                </div>
                <div>
                  <div className="text-h2 font-bold"><CountUp end={500} prefix="+" duration={3} /></div>
                  <div className="text-small text-muted mt-2">Commits</div>
                </div>
                <div>
                  <div className="text-h2 font-bold"><CountUp end={10} suffix="k" /></div>
                  <div className="text-small text-muted mt-2">Users</div>
                </div>
              </div>
            </div>
          </Container>

          <div className="space-y-8 pt-12">
            <Container>
              <h3 className="text-h3">5. Marquee</h3>
            </Container>
            <div className="flex flex-col gap-4">
              <Marquee speed="fast" className="bg-surface py-4">
                {Array(10).fill(["React", "Next.js", "TypeScript", "Node.js", "MongoDB"]).flat().map((tech, i) => (
                  <Badge key={i} variant="outline" className="text-body py-2 px-6 bg-white">{tech}</Badge>
                ))}
              </Marquee>
              <Marquee direction="right" speed="slow" className="bg-surface py-4">
                {Array(10).fill(["Design", "Development", "Deployment", "Maintenance"]).flat().map((tech, i) => (
                  <Badge key={i} variant="outline" className="text-body py-2 px-6 bg-white">{tech}</Badge>
                ))}
              </Marquee>
            </div>
          </div>

          <Container className="space-y-8 pb-32">
            <h3 className="text-h3">6. Parallax</h3>
            <div className="h-[600px] bg-surface rounded-2xl overflow-hidden relative border border-hairline">
              <Parallax speed={0.7} className="h-[120%] -top-[10%] relative flex items-center justify-center">
                <div className="w-[80%] h-[80%] bg-hairline rounded-full blur-3xl opacity-50 absolute"></div>
                <div className="text-h2 text-center max-w-lg relative z-10">
                  This background moves slightly slower than the scroll, creating depth.
                </div>
              </Parallax>
            </div>
          </Container>
        </section>
      </main>
    </SmoothScroll>
  );
}
