import { Manifesto } from "@/components/manifesto";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-black selection:text-white">
      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl pt-40 pb-48 px-4">
        <Manifesto
          headerClassName="hidden"
          subHeaderClassName="text-sm font-normal mt-16 mb-4 text-black uppercase tracking-wider"
          paraClassName="mb-8 text-sm font-normal leading-relaxed text-neutral-600/90"
          sectionClassName="mb-20"
        />

        {/* Bottom context label */}
        <div className="mt-32 pb-12 flex flex-col items-center opacity-30">
          <div className="w-[1px] h-24 bg-gradient-to-b from-black to-transparent mb-8" />
          <p className="text-[9px] uppercase tracking-[1em] whitespace-nowrap">
            Unbody Research Division
          </p>
          <p className="text-[7px] mt-4 tracking-[0.2em]">
            LATENT_SPACE_EXPLORATION_V.08
          </p>
        </div>
      </div>
    </main>
  );
}
