import type { PhilosophyData } from "@/lib/portfolio";

interface PhilosophyProps {
  philosophy: PhilosophyData;
}

export default function Philosophy({ philosophy }: PhilosophyProps) {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <div className="space-y-4 mb-8">
        {philosophy.title && (
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            {philosophy.title}
          </h3>
        )}
        {philosophy.paragraph1 && (
          <p className="leading-normal text-slate-400 text-sm">
            {philosophy.paragraph1}
          </p>
        )}
        {philosophy.paragraph2 && (
          <p className="leading-normal text-slate-500 text-xs font-mono">
            {philosophy.paragraph2}
          </p>
        )}
      </div>

      <p className="leading-relaxed">
        {philosophy.footer_text || (
          <>
            Loosely designed in{" "}
            <a
              href="https://www.figma.com/"
              className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Figma
            </a>{" "}
            and coded in{" "}
            <a
              href="https://code.visualstudio.com/"
              className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Visual Studio Code
            </a>
            . Built with{" "}
            <a
              href="https://nextjs.org/"
              className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com/"
              className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tailwind CSS
            </a>
            . All text is set in the{" "}
            <a
              href="https://rsms.me/inter/"
              className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Inter
            </a>{" "}
            typeface.
          </>
        )}
      </p>

      {philosophy.copyright && (
        <p className="mt-4 text-xs font-mono text-slate-600">
          {philosophy.copyright}
        </p>
      )}
    </footer>
  );
}
