"use client";

import { Globe, Smartphone, Bot, Code, Database } from "lucide-react";
import { Container } from "../ui/Container";
import { Stagger, StaggerItem } from "../motion/Stagger";

const DEFAULT_SERVICES = [
  { title: "Web Apps", description: "Performant, accessible, and scalable web applications built with Next.js, React, and Node.js.", icon: "globe" },
  { title: "Mobile Apps", description: "Cross-platform mobile experiences using React Native, bridging the gap between web and mobile.", icon: "smartphone" },
  { title: "AI & Automation", description: "Intelligent agentic systems, LLM integrations, and custom automations that solve real problems.", icon: "bot" },
];

const IconMap: Record<string, any> = {
  globe: Globe,
  smartphone: Smartphone,
  bot: Bot,
  code: Code,
  database: Database,
};

export const WhatIDo = ({ data }: { data?: any[] }) => {
  const servicesData = (data && data.length > 0) ? data : DEFAULT_SERVICES;

  return (
    <section className="py-24 border-y border-hairline bg-white">
      <Container>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {servicesData.map((service, index) => {
            const IconComponent = IconMap[service.icon] || Globe;
            return (
              <StaggerItem key={index} className={`pt-8 md:pt-0 ${index !== 0 ? 'md:pl-12' : ''}`}>
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 rounded-2xl bg-surface border border-hairline">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-h4 font-semibold text-ink">{service.title}</h3>
                  <p className="text-body text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
};
