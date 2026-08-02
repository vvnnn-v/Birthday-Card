import { useState } from "react";

/**
 * Polaroid-style photo frame with washi tape.
 *
 * Gracefully handles missing images: if the file doesn't exist yet,
 * it renders an elegant paper placeholder showing the expected
 * filename. Drop the real photo into public/assets/photos/ with the
 * same name and it appears automatically — no code changes needed.
 */
export default function PhotoFrame({ src, alt = "", caption = "", index = 0 }) {
  const [missing, setMissing] = useState(false);

  if (!src || missing) {
    const filename = src ? src.split("/").pop() : "photo.jpg";
    return (
      <figure className="photo-frame photo-frame--placeholder" style={{ "--photo-tilt": `${index % 2 ? 1.2 : -1.3}deg` }}>
        <div className="photo-frame__paper">
          <span className="photo-frame__filename">{filename}</span>
          <span className="photo-frame__hint">your photo will appear here</span>
        </div>
        {caption && <figcaption className="photo-frame__caption">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="photo-frame" style={{ "--photo-tilt": `${index % 2 ? 1.2 : -1.3}deg` }}>
      <div className="photo-frame__tape" aria-hidden="true" />
      <span className="photo-frame__corner photo-frame__corner--left" aria-hidden="true" />
      <span className="photo-frame__corner photo-frame__corner--right" aria-hidden="true" />
      <img
        className="photo-frame__img"
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setMissing(true)}
      />
      {index === 2 && <span className="photo-frame__flower" aria-hidden="true">❀</span>}
      {index === 3 && <span className="photo-frame__duck" aria-hidden="true">♒</span>}
      {caption && <figcaption className="photo-frame__caption">{caption}</figcaption>}
    </figure>
  );
}
