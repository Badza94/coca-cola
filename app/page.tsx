import ModelViewer from "@/components/model-viewer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-[#e0212c] min-h-screen">
      <ModelViewer url="/3d/coca_cola_can/scene.gltf" />
    </main>
  );
}
