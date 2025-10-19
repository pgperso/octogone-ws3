"use client";

import { LaptopFrame } from "@/components/ui/laptop-frame";
import ToolsAnimatedChat from "./tools-animated-chat";

interface CortexChatWidgetProps {
  locale: string;
  onKeyConceptChange?: (concept: string) => void;
}

export default function CortexChatWidget({ locale, onKeyConceptChange }: CortexChatWidgetProps) {
  return (
    <div className="mt-32 mb-32">
      <LaptopFrame>
        <div style={{ height: '600px', position: 'relative' }}>
          <ToolsAnimatedChat locale={locale} onKeyConceptChange={onKeyConceptChange} />
        </div>
      </LaptopFrame>
    </div>
  );
}
