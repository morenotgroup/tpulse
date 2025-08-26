import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";

export const metadata = { title: "Wallpapers" };

type WP = { title: string; url: string };

export default async function WallpapersPage() {
  const filePath = path.join(process.cwd(), "data", "config.json");
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  const wallpapers: WP[] = data.wallpapers ?? [];

  return (
    <main className="p-4 pb-24 space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Wallpapers T Group</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Toque e segure para salvar (iOS) ou use o botão “Baixar”.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {wallpapers.map((w, i) => (
          <article key={i} className="card">
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl">
              <Image
                src={w.url}
                alt={w.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 480px) 100vw, 480px"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">{w.title}</h2>
                <p className="text-xs text-[color:var(--muted)]">
                  4K retrato • PNG
                </p>
              </div>

              {/* Em alguns iOS o atributo download é ignorado; por isso target=_blank também ajuda */}
              <a
                href={w.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-xs px-3 py-2"
              >
                Baixar
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
