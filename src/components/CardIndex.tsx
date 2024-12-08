import { Image } from "astro:assets";

export default function Card({ href, imgSrc, title }: { href: string; imgSrc: string; title: string }) {
  return (
    <div className="card">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image class="rounded-lg" src={imgSrc} alt={`${title} Image`} width={400} height={300} />
      </a>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <h3 className="text-center text-white text-3xl bg-blue-600 py-2">{title}</h3>
      </a>
    </div>
  );
}
