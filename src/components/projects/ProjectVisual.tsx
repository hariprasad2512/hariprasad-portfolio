import type { Project } from "@/content/schema";
import LisaVisual from "@/components/projects/visuals/LisaVisual";
import SpentlyVisual from "@/components/projects/visuals/SpentlyVisual";
import MaargamVisual from "@/components/projects/visuals/MaargamVisual";
import GenericVisual from "@/components/projects/visuals/GenericVisual";

type CustomType = "lisa" | "spently" | "maargam";

const customVisuals: Record<CustomType, typeof LisaVisual> = {
  lisa: LisaVisual,
  spently: SpentlyVisual,
  maargam: MaargamVisual,
};

function isCustom(type: Project["visual"]["type"]): type is CustomType {
  return type === "lisa" || type === "spently" || type === "maargam";
}

export default function ProjectVisual({ project }: { project: Project }) {
  const { type, label, note } = project.visual;

  if (isCustom(type)) {
    const Visual = customVisuals[type];
    return <Visual label={label} note={note} />;
  }

  return <GenericVisual type={type} label={label} note={note} />;
}
