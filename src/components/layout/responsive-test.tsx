import { Container } from "./container";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export function ResponsiveTest() {
  const { breakpoint, isMobile, isTablet } = useBreakpoint(); // isDesktop non utilisé

  return (
    <Container>
      <div className="section-spacing">
        <h1 className="heading-responsive mb-8">Test de Responsivité</h1>

        {/* Indicateur de Breakpoint */}
        <div className="flex-responsive gap-4 mb-8">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            Breakpoint actuel: <strong>{breakpoint}</strong>
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            Type: {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}
          </div>
        </div>

        {/* Test de Grid */}
        <div className="grid-responsive mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="component-spacing bg-muted text-muted-foreground rounded-lg"
            >
              Item {item}
            </div>
          ))}
        </div>

        {/* Test de visibilité */}
        <div className="hidden-mobile p-4 bg-accent text-accent-foreground rounded-lg mb-4">
          Visible sur tablette et desktop uniquement
        </div>
        <div className="hidden-desktop p-4 bg-destructive text-destructive-foreground rounded-lg">
          Visible sur mobile uniquement
        </div>

        {/* Test de texte responsif */}
        <div className="margin-responsive">
          <p className="text-responsive">
            Ce texte change de taille selon le breakpoint
          </p>
        </div>
      </div>
    </Container>
  );
}
