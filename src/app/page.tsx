import { Manifesto } from "@/components/manifesto";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-black selection:text-white">
      <div className="relative z-10 w-full max-w-xl pt-40 pb-48">
        <Manifesto />

        {/* Bottom context label */}
        <div className="mt-32 pb-12 flex flex-col items-center opacity-30">
          <div className="w-[1px] h-24 bg-gradient-to-b from-black to-transparent mb-8" />
          <p className="uppercase tracking-[1em] whitespace-nowrap">
            Unbody Research Division
          </p>
          <p className="mt-4 tracking-[0.2em]">
            LATENT_SPACE_EXPLORATION_V.08
          </p>
        </div>
      </div>
    </main>
  );
}
