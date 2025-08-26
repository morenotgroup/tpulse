import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Wallpapers",
};

export default async function WallpapersPage() {
  // Carregar config.json
  const filePath = path.join(process.cwd(), "data", "config.json");
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Wallpapers T Group</h1>
      <p className="text-sm text-[color:var(--muted)] mb-6">
        Toque e segure para baixar no celular 📱
      </p>
      <div className="grid grid-cols-1 gap-6">
        {data.wallpapers.map((w: any, i: number) => (
          <div key={i} className="card">
            <img
              src={w.url}
              alt={w.title}
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm font-semibold">{w.title}</span>
              <a
                href={w.url}
                download
                className="text-xs text-[color:var(--accent2)] underline"
              >
                Baixar
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
